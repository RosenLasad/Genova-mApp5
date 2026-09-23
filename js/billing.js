/* Collegamento client tra il pannello Premium e le funzioni Stripe su Netlify. */
(function(){
  'use strict';
  if(window.__GENOVA_BILLING__)return;
  window.__GENOVA_BILLING__=true;

  async function token(){
    if(!window.GenovaAuth||typeof window.GenovaAuth.token!=='function')throw new Error('not_authenticated');
    return window.GenovaAuth.token();
  }

  async function post(endpoint,payload){
    var jwt=await token();
    var response=await fetch(endpoint,{
      method:'POST',
      headers:{authorization:'Bearer '+jwt,'content-type':'application/json','cache-control':'no-store'},
      body:JSON.stringify(payload||{})
    });
    var result={};try{result=await response.json();}catch(_e){}
    if(!response.ok)throw new Error(result.error||('http_'+response.status));
    return result;
  }

  window.GenovaBilling={
    createCheckoutSession:function(options){return post('/.netlify/functions/stripe-checkout',options||{});},
    createPortalSession:function(){return post('/.netlify/functions/stripe-portal',{});},
    redeemCoupon:function(code){return post('/.netlify/functions/coupon-redeem',{code:code});}
  };

  try{
    var returned=new URLSearchParams(window.location.search).get('subscription');
    if(returned==='success'||returned==='portal-return'){
      var tries=0;(function refresh(){
        if(window.GenovaAccount&&typeof window.GenovaAccount.syncNow==='function'){
          window.GenovaAccount.syncNow();return;
        }
        if(++tries<40)window.setTimeout(refresh,150);
      })();
    }
  }catch(_e){}
})();
