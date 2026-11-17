import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import {MOVIE_PRICE,MOVIE_CURRENCY,problem} from './storie-stripe.mjs';

export const PAIRING_TTL=10*60*1000;
export const VIEWING_TTL=6*60*60*1000;
const hash=value=>createHash('sha256').update(value).digest('hex');
const normalize=value=>typeof value==='string'?value.toUpperCase().replace(/[\s-]/g,''):'';
const json=(value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});

export function createHandler({storeFactory,authenticate,isDeleted,paymentsFactory,videoFactory,salesEnabled,progressKeyFactory=()=>'',now=Date.now}) {
 return async request=>{
  if(request.method!=='POST')return json({error:'Metodo non consentito.'},405);
  if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'Origine della richiesta non consentita.'},403);
  if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))return json({error:'Formato della richiesta non valido.'},415);
  try{
   const raw=await request.text();if(raw.length>3072)return json({error:'Richiesta troppo grande.'},413);
   let body;try{body=JSON.parse(raw)}catch{return json({error:'Richiesta non valida.'},400)}
   if(!body||typeof body!=='object'||Array.isArray(body))return json({error:'Richiesta non valida.'},400);
   const {action}=body;
   if(!['catalog','create','inspect','approve','status','revoke','access','checkout','playback','tv-playback'].includes(action))return json({error:'Operazione non valida.'},400);
   const origin=new URL(request.url).origin;
   async function availability(){
    try{await videoFactory().ready(origin);return{ready:true,message:''};}
    catch(error){return{ready:false,message:error.code==='video_not_ready'?'Il film è ancora in elaborazione. Riprova più tardi.':'La sala è in preparazione. La visione e gli acquisti saranno disponibili a breve.'};}
   }
   if(action==='catalog'){
    const availabilityResult=await availability();
    let testMode=false,paymentReady=false;
    try{testMode=paymentsFactory().testMode;paymentReady=true;}catch{}
    return json({...availabilityResult,price:MOVIE_PRICE,currency:MOVIE_CURRENCY,testMode,purchasable:availabilityResult.ready&&paymentReady&&salesEnabled()});
   }
   let user,payments;
   if(['approve','access','checkout','playback'].includes(action)){
    user=await authenticate(request);
    if(!user?.id||await isDeleted(user.id))throw problem('unauthorized','Accedi al tuo account Genova mApp per continuare.',401);
    payments=paymentsFactory();
    if(action==='access'){
     const owned=await payments.purchase(user,body.receiptSession);
     const available=await availability();
     return json({...available,progressKey:owned.owned?progressKeyFactory(user.id,payments.testMode):'',owned:owned.owned,...(owned.receiptSession?{receiptSession:owned.receiptSession}:{}),preview:owned.preview||false,testMode:payments.testMode,purchasable:available.ready&&salesEnabled(),price:MOVIE_PRICE,currency:MOVIE_CURRENCY});
    }
    if(action==='checkout'){
     if(!salesEnabled())throw problem('sales_disabled','Gli acquisti non sono ancora attivi. Riprova più tardi.');
     await videoFactory().ready(origin);
     const result=await payments.checkout(user,{receipt:body.receiptSession,code:normalize(body.code),requestId:body.requestId,origin});
     return json(result);
    }
    if(action==='playback'){
     const owned=await payments.purchase(user,body.receiptSession);
     if(!owned.owned)throw problem('purchase_required','Acquista il documentario per avviare la visione.',402);
     return json({...await videoFactory().playback(origin),preview:owned.preview||false,testMode:payments.testMode,progressKey:progressKeyFactory(user.id,payments.testMode)});
    }
   }
   const store=storeFactory();
   if(action==='create'){
    for(let attempt=0;attempt<4;attempt++){
     const code=randomBytes(5).toString('hex').toUpperCase(),secret=randomBytes(32).toString('hex'),expires=now()+PAIRING_TTL;
     const result=await store.setJSON(`sessions/${code}`,{secretHash:hash(secret),expires},{onlyIfNew:true});
     if(result.modified)return json({code,secret,expires});
    }
    throw problem('pairing_unavailable','Non è stato possibile creare il codice. Riprova.');
   }
   const code=normalize(body.code);
   if(!/^[A-F0-9]{10}$/.test(code))throw problem('invalid_code','Controlla il codice visualizzato sulla TV.',400);
   const session=await store.get(`sessions/${code}`,{type:'json'});
   if(!session)throw problem('code_not_found','Codice non trovato. Genera un nuovo QR sulla TV.',404);
   if(['status','revoke','tv-playback'].includes(action)){
    if(typeof body.secret!=='string'||!/^[a-f0-9]{64}$/.test(body.secret)||!timingSafeEqual(Buffer.from(hash(body.secret),'hex'),Buffer.from(session.secretHash,'hex')))throw problem('invalid_session','Sessione TV non valida.',403);
   }
   if(await store.get(`revoked/${code}`,{type:'json'}))throw problem('revoked','TV scollegata. Genera un nuovo QR per continuare.',410);
   if(action==='revoke'){
    await store.setJSON(`revoked/${code}`,{at:now()},{onlyIfNew:true});return json({ok:true});
   }
   if(action==='inspect'||action==='approve'){
    if(session.expires<=now())throw problem('expired','Codice scaduto. Genera un nuovo QR sulla TV. Il tuo eventuale acquisto rimane disponibile.',410);
    if(action==='approve'){
     const owned=await payments.purchase(user,body.receiptSession);
     if(!owned.owned)throw problem('purchase_required','Acquista il documentario per autorizzare questa TV.',402);
     await videoFactory().ready(origin);
     await store.setJSON(`approved/${code}`,{userId:user.id,...(owned.preview?{preview:true,email:user.email||''}:{paymentIntentId:owned.paymentIntentId}),until:now()+VIEWING_TTL},{onlyIfNew:true});
     const grant=await store.get(`approved/${code}`,{type:'json'});
     if(grant?.userId!==user.id)throw problem('already_authorized','Questa TV è già collegata a un altro account. Genera un nuovo QR.',409);
    }
    return json({ok:true,code,expires:session.expires});
   }
   const grant=await store.get(`approved/${code}`,{type:'json'});
   if(grant&&grant.until>now()){
    if(await isDeleted(grant.userId))throw problem('unauthorized','Account non più disponibile. Collega nuovamente la TV.',401);
    if(action==='tv-playback'){
     payments=paymentsFactory();
     const owned=grant.preview?payments.previewUser({id:grant.userId,email:grant.email}):await payments.verifyIntent(grant.paymentIntentId,grant.userId);
     if(!owned)throw problem('purchase_required','L’acquisto non risulta disponibile. Verificalo dal tuo account sul telefono.',402);
     return json({...await videoFactory().playback(origin),preview:grant.preview||false,testMode:payments.testMode,progressKey:progressKeyFactory(grant.userId,payments.testMode)});
    }
    return json({approved:true,until:grant.until,progressKey:progressKeyFactory(grant.userId,paymentsFactory().testMode)});
   }
   if(session.expires<=now())throw problem('expired','Sessione scaduta. Collega nuovamente la TV.',410);
   if(action==='tv-playback')throw problem('not_authorized','Autorizza prima la TV dal telefono.',403);
   return json({approved:false,expires:session.expires});
  }catch(error){
   console.error('[Storie di Genova]',error?.code||error?.name||'Error');
   const expected=typeof error?.status==='number';
   return json({error:expected?error.message:'Servizio temporaneamente non disponibile. Riprova tra poco.',code:expected?error.code:'service_unavailable'},expected?error.status:503);
  }
 };
}
