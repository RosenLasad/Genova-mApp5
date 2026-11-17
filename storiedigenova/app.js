/* Sala del documentario: acquisto unico Stripe e riproduzione protetta Cloudflare. */
(function(){
'use strict';
var ENDPOINT='/.netlify/functions/storie-genova',BASE='/storiedigenova',SESSION_KEY='gm-storie-tv-v3';
var ids=['home','direct-login','purchase','pair','authorize','ready','watch'];
var session=null,viewing='direct',view='home',checked='',approved=false;
var pollTimer=null,clockTimer=null,generation=0,creating=false,initialized=false;
var entitlement=null,catalog=null,accessLoading=false,buying=false,accessVersion=0,lastUserId='';
var pendingReceipt='',checkoutRequest=null;
var resumeStorage;try{resumeStorage=window.localStorage;}catch(_){}
var bookmarks=window.StorieResume.create({storage:resumeStorage}),tracker=null,playbackVersion=0,playingRequest=false,streamPromise=null;
function progressKey(){return viewing==='tv'?session?.progressKey:entitlement?.progressKey;}
function renderResume(){
 var point=bookmarks.read(progressKey());
 el('play').textContent=point?'▶ Riprendi da '+StorieResume.format(point.position):'▶ Riproduci il documentario';
 el('restart').hidden=!point;el('restart').disabled=el('play').disabled;
 el('resume-note').hidden=!point;
 el('resume-note').textContent=point?'Hai interrotto a '+StorieResume.format(point.position)+'. Il punto è ricordato per questo account su questo browser.':'';
}
function loadStream(){
 if(window.Stream)return Promise.resolve(window.Stream);
 if(streamPromise)return streamPromise;
 streamPromise=new Promise(function(resolve){
  var script=document.createElement('script'),timer,finished=false;
  function done(){if(finished)return;finished=true;clearTimeout(timer);resolve(window.Stream||null);}
  script.src='https://embed.cloudflarestream.com/embed/sdk.latest.js';script.async=true;script.onload=done;script.onerror=done;
  timer=setTimeout(done,8000);document.head.appendChild(script);
 });
 return streamPromise;
}
function el(id){return document.getElementById(id);}
function user(){return window.GenovaAuth?window.GenovaAuth.getUser():null;}
function show(id){view=id;ids.forEach(function(x){el(x).hidden=x!==id;});el('error').hidden=true;var first=el(id).querySelector('button:not([hidden]),input');if(first&&first.getClientRects().length&&!first.disabled)first.focus();}
function fail(error){el('error').textContent=error.message||'Si è verificato un errore. Riprova.';el('error').hidden=false;}
function notice(text){el('notice').textContent=text;el('notice').hidden=!text;}
function stop(){generation++;clearTimeout(pollTimer);clearInterval(clockTimer);}
function format(code){return code.slice(0,5)+' '+code.slice(5);}
function save(){try{if(session)sessionStorage.setItem(SESSION_KEY,JSON.stringify(session));else sessionStorage.removeItem(SESSION_KEY);}catch(_){}}
function clearReturn(){try{sessionStorage.removeItem('gm-storie-auth-return');localStorage.removeItem('gm-storie-auth-return');}catch(_){}}
function hidePlayer(){playbackVersion++;if(tracker){tracker.detach();tracker=null;}el('player-wrap').replaceChildren();}
function setRoute(query){history.replaceState(null,'',BASE+(query?'?'+query:''));}
function receipt(){
 if(pendingReceipt)return pendingReceipt;
 try{return user()?localStorage.getItem('gm-storie-receipt:'+user().id)||'':'';}catch(_){return '';}
}
async function api(action,data,authenticated){
 var headers={'Content-Type':'application/json'},body=Object.assign({action:action},data||{});
 if(authenticated){
  try{headers.authorization='Bearer '+await window.GenovaAuth.token();}catch(_){throw Object.assign(new Error('Accedi al tuo account Genova mApp per continuare.'),{status:401});}
  if(!body.receiptSession)body.receiptSession=receipt();
 }
 var controller=new AbortController(),timeout=setTimeout(function(){controller.abort();},45000);
 try{
  var response=await fetch(ENDPOINT,{method:'POST',headers:headers,cache:'no-store',signal:controller.signal,body:JSON.stringify(body)}),result;
  try{result=await response.json();}catch(_){throw new Error('Servizio documentario non disponibile. Riprova tra poco.');}
  if(!response.ok)throw Object.assign(new Error(result.error||'Servizio temporaneamente non disponibile.'),{status:response.status,code:result.code});
  return result;
 }catch(error){if(error.name==='AbortError')throw new Error('La connessione sta impiegando troppo tempo. Riprova.');throw error;}finally{clearTimeout(timeout);}
}
function openLogin(mode){
 var query=view==='authorize'&&checked?'tv='+checked:'guarda=1';
 var pending=JSON.stringify({path:BASE+'?'+query,at:Date.now()});
 try{sessionStorage.setItem('gm-storie-auth-return',pending);localStorage.setItem('gm-storie-auth-return',pending);}catch(_){}
 setRoute(query);
 if(!window.GenovaAuth||!window.netlifyIdentity){fail(new Error('Il servizio account non è disponibile. Controlla la connessione e ricarica la pagina.'));return;}
 window.GenovaAuth.open(mode);
}
function renderAccess(){
 var account=user(),state=entitlement||catalog||{},owned=!!entitlement?.owned;
 el('authorize-login').hidden=!!account;el('authorize-logged').hidden=!account;
 el('authorize-owned').hidden=!owned||!state.ready;el('authorize-purchase').hidden=owned||!entitlement||accessLoading;
 el('authorize-account').textContent=accessLoading?'Verifica del tuo acquisto…':owned?(entitlement.preview?'Anteprima amministratore: puoi autorizzare la TV.':'Il documentario è nel tuo account. Puoi autorizzare questa TV.'):'L’acquisto del film è separato dall’abbonamento alla mappa.';
 var availabilityText=accessLoading?'Verifica dell’accesso in corso…':!state.ready?(state.message||'Verifica della disponibilità in corso…'):!state.purchasable&&!owned?'Gli acquisti non sono ancora attivi. Riprova più tardi.':'';
 document.querySelectorAll('[data-availability]').forEach(function(node){node.textContent=availabilityText;});
 document.querySelectorAll('[data-buy]').forEach(function(button){button.disabled=buying||accessLoading||!entitlement||!state.purchasable||owned;});
 document.querySelectorAll('[data-check-access]').forEach(function(button){button.disabled=accessLoading||buying;});
 el('approve').disabled=approved||accessLoading||!owned||!state.ready;
 if(viewing==='direct'&&view==='ready')el('play').disabled=!owned||!state.ready;
 if(view==='ready')renderResume();
 var modes=[];if(state.testMode)modes.push('MODALITÀ DI PROVA — i pagamenti non addebitano importi reali.');
 if(entitlement?.preview)modes.push('Anteprima amministratore: nessun acquisto registrato.');
 el('mode-notice').textContent=modes.join(' ');el('mode-notice').hidden=!modes.length;
 el('home-auth').textContent=account?(owned?'Il documentario è già nel tuo account.':accessLoading?'Verifica del tuo account…':'Il tuo account Genova mApp è collegato.'):'';
}
function ready(mode){
 viewing=mode;el('ready-description').textContent=mode==='tv'?'La TV è autorizzata. Puoi lasciare libero il telefono.':entitlement?.preview?'Puoi verificare il documentario con l’anteprima amministratore.':'Il documentario è nel tuo account. Puoi guardarlo su questo dispositivo.';
 el('disconnect').hidden=mode!=='tv';show('ready');el('play').disabled=false;renderAccess();
}
async function checkAccess(route){
 if(!user()){entitlement=null;renderAccess();return;}
 var version=++accessVersion,id=user().id;accessLoading=true;renderAccess();
 try{
  var result=await api('access',{},true);if(version!==accessVersion||user()?.id!==id)return;
  entitlement=result;
  if(result.receiptSession){
   try{localStorage.setItem('gm-storie-receipt:'+id,result.receiptSession);sessionStorage.removeItem('gm-storie-pending-receipt');}catch(_){}
   pendingReceipt='';notice('Acquisto confermato. Il documentario è disponibile nel tuo account.');
  }
  if(route&&(view==='direct-login'||view==='purchase')){if(result.owned){ready('direct');clearReturn();}else show('purchase');}
 }catch(error){if(version!==accessVersion)return;if(error.status===401){entitlement=null;if(view!=='authorize')show('direct-login');}fail(error);}
 finally{if(version===accessVersion){accessLoading=false;renderAccess();}}
}
function updateAuth(){
 var account=user(),id=account?.id||'';el('account-label').textContent=account?'Il mio account':'Accedi / Registrati';
 var changed=id!==lastUserId;if(changed){lastUserId=id;entitlement=null;accessVersion++;accessLoading=false;}
 renderAccess();if(!initialized)return;
 if(!account){if((view==='watch'||view==='ready')&&viewing==='direct'){hidePlayer();show('direct-login');}return;}
 if(changed||view==='direct-login')checkAccess(view==='direct-login'||view==='purchase');
}
function direct(){stop();hidePlayer();setRoute('guarda=1');viewing='direct';if(!user())show('direct-login');else{show('purchase');checkAccess(true);}}
function home(){stop();hidePlayer();clearReturn();setRoute('');notice('');show('home');renderAccess();}
function renderPair(){
 show('pair');el('tv-code').textContent=format(session.code);el('manual-url').textContent=location.origin+BASE;el('waiting').textContent='In attesa dell’autorizzazione…';
 var link=location.origin+BASE+'?tv='+session.code;
 if(window.QRCode)QRCode.toCanvas(el('qr'),link,{width:300,margin:4,errorCorrectionLevel:'M',color:{dark:'#102a30',light:'#ffffff'}}).catch(function(){fail(new Error('QR non disponibile: usa l’indirizzo e il codice indicati.'));});
 else fail(new Error('QR non disponibile: usa l’indirizzo e il codice indicati.'));
 var captured=session;
 function clock(){var n=Math.max(0,Math.ceil((captured.expires-Date.now())/1000));el('countdown').textContent='Il codice scade tra '+Math.floor(n/60)+':'+String(n%60).padStart(2,'0');if(!n){clearInterval(clockTimer);el('waiting').textContent='Se non hai ancora autorizzato la TV, genera un nuovo QR. Il tuo acquisto resta disponibile.';}}
 clock();clockTimer=setInterval(clock,1000);
}
async function poll(ticket,version){
 if(version!==generation||session!==ticket)return;
 try{
  var result=await api('status',{code:ticket.code,secret:ticket.secret});if(version!==generation||session!==ticket)return;
  if(result.approved){stop();ticket.until=result.until;ticket.progressKey=result.progressKey;save();ready('tv');return;}el('waiting').textContent='In attesa dell’autorizzazione…';
 }catch(error){
  if(version!==generation||session!==ticket)return;
  if([401,403,404,410].indexOf(error.status)>=0){stop();session=null;save();show('pair');el('waiting').textContent='Collega nuovamente la TV con un nuovo QR.';fail(error);return;}
  el('waiting').textContent='Connessione interrotta. Nuovo tentativo tra pochi secondi…';
 }
 if(version===generation)pollTimer=setTimeout(function(){poll(ticket,version);},4000);
}
async function start(){
 if(creating)return;creating=true;stop();var version=generation;el('start').disabled=true;el('regenerate').disabled=true;
 try{
  if(session){var old=session;session=null;save();await api('revoke',{code:old.code,secret:old.secret}).catch(function(){});}
  var created=await api('create');if(version!==generation)return;session=created;save();setRoute('');renderPair();poll(session,version);
 }catch(error){if(version===generation)fail(error);}finally{creating=false;el('start').disabled=false;el('regenerate').disabled=false;}
}
async function inspect(code){
 approved=false;checked='';el('confirmation').hidden=true;el('phone-status').textContent='Verifica del codice…';el('error').hidden=true;
 try{
  var result=await api('inspect',{code:code});checked=result.code;setRoute('tv='+checked);el('confirm-code').textContent=format(checked);el('code-form').hidden=true;el('confirmation').hidden=false;el('change-code').hidden=false;
  el('phone-status').textContent='';renderAccess();if(user())await checkAccess(false);else el('authorize-login').querySelector('button').focus();
 }catch(error){el('code-form').hidden=false;el('phone-status').textContent='';fail(error);}
}
async function buy(){
 if(buying)return;if(!user()){openLogin('login');return;}
 buying=true;renderAccess();el('error').hidden=true;
 var code=view==='authorize'?checked:'';
 try{
  if(!checkoutRequest||checkoutRequest.code!==code||checkoutRequest.userId!==user().id){checkoutRequest={code:code,userId:user().id,id:crypto.randomUUID()};}
  var result=await api('checkout',{code:code,requestId:checkoutRequest.id},true);
  if(result.alreadyOwned){await checkAccess(true);return;}
  var target=new URL(result.url);if(target.protocol!=='https:'||target.hostname!=='checkout.stripe.com')throw new Error('Collegamento al pagamento non valido.');
  location.assign(target.href);
 }catch(error){if(error.status===401)openLogin('login');fail(error);}finally{buying=false;renderAccess();}
}
el('start').onclick=start;el('regenerate').onclick=start;el('watch-here').onclick=direct;
el('phone').onclick=function(){stop();show('authorize');el('code-form').hidden=false;el('confirmation').hidden=true;setRoute('telefono=1');el('code-input').focus();};
el('code-form').onsubmit=function(event){event.preventDefault();inspect(el('code-input').value);};
el('change-code').onclick=function(){checked='';approved=false;el('confirmation').hidden=true;el('code-form').hidden=false;el('phone-status').textContent='';this.hidden=true;el('code-input').focus();setRoute('telefono=1');};
el('approve').onclick=async function(){
 if(approved||!checked)return;this.disabled=true;el('error').hidden=true;
 try{await api('approve',{code:checked},true);approved=true;clearReturn();el('confirmation').hidden=true;el('phone-status').textContent='TV autorizzata! Torna al televisore e scegli «Riproduci il documentario». Puoi chiudere questa pagina.';}
 catch(error){if(error.status===401)openLogin('login');if(error.status===402)await checkAccess(false);fail(error);}
 finally{renderAccess();}
};
async function playDocumentary(restart){
 if(playingRequest)return;playingRequest=true;
 hidePlayer();var version=playbackVersion,mode=viewing,accountId=user()?.id,ticket=session;
 el('play').disabled=true;el('restart').disabled=true;el('error').hidden=true;
 try{
  var sdk=loadStream();
  var result=mode==='tv'&&ticket?await api('tv-playback',{code:ticket.code,secret:ticket.secret}):await api('playback',{},true);
  if(version!==playbackVersion||(mode==='direct'&&user()?.id!==accountId))return;
  var target=new URL(result.url);
  if(result.provider!=='cloudflare'||target.protocol!=='https:'||!/^customer-[a-z0-9-]+\.cloudflarestream\.com$/i.test(target.hostname)||result.until<=Date.now())throw new Error('Sorgente video non disponibile.');
  var key=result.progressKey,point=bookmarks.read(key),startTime=restart?0:Math.floor(point?.position||0);
  target.searchParams.set('startTime',String(startTime));
  if(mode==='tv'&&ticket){ticket.progressKey=key;save();}else if(entitlement)entitlement.progressKey=key;
  show('watch');var frame=document.createElement('iframe');frame.title='Storie di Genova — documentario';frame.src=target.href;
  frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';el('player-wrap').appendChild(frame);frame.focus();
  if(restart&&point)bookmarks.write(key,0,point.duration,false);
  el('resume-status').textContent=startTime?'Ripresa da '+StorieResume.format(startTime)+'. Usa Play nel video se necessario.':'Il punto di visione viene ricordato automaticamente in questo browser.';
  var stream=await sdk;
  if(version!==playbackVersion)return;
  if(stream){
   tracker=bookmarks.attach({player:stream(frame),key:key,startTime:startTime,onSave:function(state){
    el('resume-status').textContent=!state.persistent?'Il browser non consente il salvataggio: il punto resterà disponibile solo finché questa pagina rimane aperta.':state.ended?'Visione completata. La prossima volta il film partirà dall’inizio.':'Punto di visione ricordato su questo browser: '+StorieResume.format(state.position)+'.';
   }});
  }else el('resume-status').textContent='Puoi vedere il film, ma il salvataggio del punto non è disponibile in questo momento. Ricarica la pagina per riprovare.';
 }catch(error){
  if(version!==playbackVersion)return;
  if(error.status===401&&viewing==='direct'){show('direct-login');openLogin('login');}
  if(error.status===402&&viewing==='direct'){show('purchase');await checkAccess(true);}
  fail(error);
 }finally{playingRequest=false;el('play').disabled=false;el('restart').disabled=false;if(view==='ready')renderAccess();}
}
el('play').onclick=function(){playDocumentary(false);};
el('restart').onclick=function(){playDocumentary(true);};
el('close-player').onclick=function(){hidePlayer();ready(viewing);};
el('disconnect').onclick=async function(){this.disabled=true;try{if(session)await api('revoke',{code:session.code,secret:session.secret});session=null;save();home();}catch(error){fail(error);}finally{this.disabled=false;}};
document.querySelectorAll('[data-home]').forEach(function(button){button.onclick=home;});
document.querySelectorAll('[data-login]').forEach(function(button){button.onclick=function(){openLogin(button.getAttribute('data-login'));};});
document.querySelectorAll('[data-buy]').forEach(function(button){button.onclick=buy;});
document.querySelectorAll('[data-check-access]').forEach(function(button){button.onclick=function(){checkAccess(true);};});
el('privacy').onclick=function(){el('info').showModal();};el('close-info').onclick=function(){el('info').close();};
document.addEventListener('genova:auth-changed',updateAuth);
document.addEventListener('keydown',function(event){
 if(el('info').open||document.getElementById('gcl-overlay')||!document.getElementById('auth-account-modal')?.hidden)return;
 if(['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].indexOf(event.key)<0||['INPUT','IFRAME'].indexOf(document.activeElement.tagName)>=0)return;
 var items=Array.from(document.querySelectorAll('header button,header a,main button,main input,footer button,footer a')).filter(function(node){return node.getClientRects().length&&!node.disabled;}),index=items.indexOf(document.activeElement),step=event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1;
 if(index>=0){event.preventDefault();items[(index+step+items.length)%items.length].focus();}
});
window.addEventListener('pagehide',function(){stop();if(tracker)tracker.flush();});
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden'&&tracker)tracker.flush();});
window.addEventListener('pageshow',function(event){if(event.persisted){buying=false;updateAuth();if(view==='pair'&&session){stop();renderPair();poll(session,generation);}else if(user())checkAccess(view==='purchase');}});
async function boot(){
 var params=new URLSearchParams(location.search),candidate=params.get('session_id');
 if(/^cs_(?:test_|live_)?[a-zA-Z0-9]+$/.test(candidate||'')){
  pendingReceipt=candidate;try{sessionStorage.setItem('gm-storie-pending-receipt',JSON.stringify({id:candidate,at:Date.now()}));}catch(_){}
 }else{try{var pending=JSON.parse(sessionStorage.getItem('gm-storie-pending-receipt')||'null');if(pending&&Date.now()-pending.at<6*60*60*1000)pendingReceipt=pending.id;}catch(_){}}
 if(params.get('acquisto')==='success')notice('Verifica del pagamento in corso…');
 if(params.get('acquisto')==='annullato')notice('Se hai annullato il pagamento, puoi riprovare qui. Se hai già acquistato, premi «Verifica accesso».');
 api('catalog').then(function(result){catalog=result;renderAccess();}).catch(function(){});
 if(window.GenovaAuth)await window.GenovaAuth.whenReady();initialized=true;updateAuth();
 var code=params.get('tv');
 if(code){show('authorize');el('code-input').value=code;await inspect(code);return;}
 if(params.has('telefono')){show('authorize');return;}
 if(params.has('guarda')){direct();return;}
 try{session=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');}catch(_){}
 if(session&&/^[A-F0-9]{10}$/.test(session.code)&&/^[a-f0-9]{64}$/.test(session.secret)&&(session.until>Date.now()||session.expires>Date.now())){renderPair();poll(session,generation);}
 else{session=null;save();show('home');if(user())checkAccess(false);}
}
boot().catch(fail);
})();
