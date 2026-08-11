
(function(){
  function isSubscribedUI(){
    try{
      var btn = document.getElementById('btn-sub');
      if(!btn) return false;
      // prefer class flag if present
      if(btn.classList && btn.classList.contains('is-gold')) return true;
      if(btn.classList && btn.classList.contains('active')) return true;
      // fallback: check img src
      var img = btn.querySelector('img');
      if(img && /coin-gold\.svg/i.test(img.src)) return true;
      return false;
    }catch(e){ return false; }
  }
  function toNoCookie(u){
    try{
      var url = new URL(u, window.location.origin);
      if(/youtube\.com$/i.test(url.hostname) || /youtube-nocookie\.com$/i.test(url.hostname)){
        url.hostname = 'www.youtube-nocookie.com';
      }
      return url.toString();
    }catch(e){ return u; }
  }
  function normalizeYT(urlStr, subscribed){
    try{
      var url = new URL(toNoCookie(urlStr), window.location.origin);
      // Only handle /embed/ URLs
      if(!/\/embed\//.test(url.pathname)) return url.toString();
      var sp = url.searchParams;
      // Common flags
      sp.set('playsinline','1');
      sp.set('rel','0');
      sp.set('modestbranding','1');
      sp.set('enablejsapi','1');
      // Never force autoplay for docs
      sp.delete('autoplay');
      if(subscribed){
        sp.delete('end');
        sp.set('controls','1');
      }else{
        sp.set('end','10');
        sp.set('controls','0');
      }
      return url.toString();
    }catch(e){ return urlStr; }
  }
  function applyToIframe(iframe){
    if(!iframe || !iframe.src) return;
    var src = iframe.src;
    if(!/youtube(?:-nocookie)?\.com\/embed\//.test(src)) return;
    var want = normalizeYT(src, isSubscribedUI());
    if(want !== src){
      try{ iframe.src = want; }catch(_){}
    }
  }
  function applyAll(){
    // Panel iframe
    applyToIframe(document.getElementById('yt-iframe'));
    // Any docs inline iframe in popups
    document.querySelectorAll('iframe.doc-yt-embed, .leaflet-popup-content iframe').forEach(applyToIframe);
  }

  // Observe DOM for new iframes (e.g., when apri popup documentari)
  var obs;
  function startObs(){
    if(obs) obs.disconnect();
    obs = new MutationObserver(function(muts){
      // Throttle to next microtask
      Promise.resolve().then(applyAll);
    });
    obs.observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['src']});
  }

  function onCoinToggleHook(){
    // If setSubscribed exists, wrap it so that we also re-apply gating
    try{
      var orig = window.setSubscribed;
      if(!orig || orig.__wrapped__) return;
      function wrapped(v){
        try{ orig.call(window, v); }catch(_){}
        try{ applyAll(); }catch(_){}
      }
      wrapped.__wrapped__ = true;
      window.setSubscribed = wrapped;
    }catch(_){}
    // Also bind click directly (in case setSubscribed differs)
    var btn = document.getElementById('btn-sub');
    if(btn && !btn.__gateUI){
      btn.addEventListener('click', function(){ setTimeout(applyAll, 50); });
      btn.__gateUI = true;
    }
  }

  function init(){
    applyAll();
    startObs();
    onCoinToggleHook();
    // Re-apply on load and when window regains focus (e.g., after localStorage change)
    window.addEventListener('load', applyAll);
    window.addEventListener('focus', applyAll);
    window.addEventListener('storage', function(e){
      if(e && e.key && /sub/i.test(e.key)) setTimeout(applyAll, 0);
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
