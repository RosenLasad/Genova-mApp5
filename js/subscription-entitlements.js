/* Genova mApp - catalogo centrale dei livelli di accesso.
   Le interfacce leggono qui i limiti funzionali; account Netlify, coupon e Stripe
   determinano il livello effettivo dell'utente. */
(function(){
  'use strict';
  if(window.GenovaEntitlements)return;

  var TIERS={
    guest:{
      code:'guest',
      eventSearchesPer24h:0,
      gps:true,
      nearby:false,
      notes:true,
      cloudSync:false,
      favoritePoints:0,
      customRoutes:0,
      miniDocPreviewSeconds:10,
      miniDocFull:false
    },
    free:{
      code:'free',
      eventSearchesPer24h:5,
      gps:true,
      nearby:true,
      notes:true,
      cloudSync:true,
      favoritePoints:10,
      customRoutes:1,
      miniDocPreviewSeconds:10,
      miniDocFull:false
    },
    premium:{
      code:'premium',
      eventSearchesPer24h:30,
      gps:true,
      nearby:true,
      notes:true,
      cloudSync:true,
      favoritePoints:null,
      customRoutes:null,
      miniDocPreviewSeconds:null,
      miniDocFull:true
    }
  };

  function accountState(){
    try{return window.GenovaAccount?window.GenovaAccount.getState():null;}
    catch(_e){return null;}
  }

  function currentTier(){
    var state=accountState();
    if(state&&state.active)return'premium';
    if(state&&state.user)return'free';
    return'guest';
  }

  function get(tier){
    var code=tier&&TIERS[tier]?tier:currentTier();
    return Object.assign({},TIERS[code]);
  }

  function allows(feature,tier){
    var value=get(tier)[feature];
    return value===true||value===null||(typeof value==='number'&&value>0);
  }

  window.GenovaEntitlements={
    tiers:TIERS,
    currentTier:currentTier,
    get:get,
    allows:allows
  };
})();
