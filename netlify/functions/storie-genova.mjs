import Stripe from 'stripe';
import {getDeployStore} from '@netlify/blobs';
import {authenticatedUser,deletedUserStore,isAdminUser} from './_shared/billing-store.mjs';
import {createHandler} from './_shared/storie-genova-service.mjs';
import {stripeMovies,problem} from './_shared/storie-stripe.mjs';
import {cloudflareMovie} from './_shared/storie-cloudflare.mjs';

const env=name=>Netlify.env.get(name);
export default createHandler({
 storeFactory:()=>getDeployStore({name:'storie-genova-paid-pair-v1',consistency:'strong'}),
 authenticate:authenticatedUser,
 isDeleted:async id=>!!await deletedUserStore().get(`deleted-${id}`,{type:'json'}),
 paymentsFactory:()=>{
  const key=(env('STORIE_STRIPE_SECRET_KEY')||env('STRIPE_SECRET_KEY')||'').trim();
  if(!/^(?:sk|rk)_(?:live|test)_/.test(key))throw problem('stripe_configuration','Gli acquisti non sono ancora disponibili. Riprova più tardi.');
  return stripeMovies({stripe:new Stripe(key,{timeout:8000,maxNetworkRetries:1}),liveMode:/^(?:sk|rk)_live_/.test(key),previewUser:isAdminUser});
 },
 videoFactory:()=>cloudflareMovie({env}),
 salesEnabled:()=>env('STORIE_SALES_ENABLED')==='true',
});
export const config={rateLimit:{action:'rate_limit',aggregateBy:['ip','domain'],windowSize:60,windowLimit:90}};
