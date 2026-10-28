
// --- CLEANUP: rimuovi il titolo duplicato dentro i corpi delle sezioni (sopra "Mostra tutti") ---
(function(){
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  function clean(){
    try{
      var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
      secs.forEach(function(sec){
        var headTitle = sec.querySelector('.acc-title');
        var body = sec.querySelector('.acc-body');
        if(!headTitle || !body) return;
        var t = (headTitle.textContent||'').trim().toLowerCase();
        // esamina i primi figli del body (quelli tipicamente usati come intestazione doppia)
        var firsts = Array.prototype.slice.call(body.children, 0, 3);
        firsts.forEach(function(node){
          if(!node) return;
          var text = (node.textContent||'').trim().toLowerCase();
          var isDuplicate =
              (text === t) ||
              (text === t + ':') ||
              (text.startsWith(t + '\n')) ||
              // vecchie intestazioni inline con font-weight alto
              ((node.tagName === 'DIV' || node.tagName === 'SPAN' || node.tagName === 'LABEL') &&
               text.indexOf(t) === 0 &&
               (node.getAttribute('style')||'').toLowerCase().indexOf('font-weight') !== -1);
          if(isDuplicate){
            try{ node.remove(); }catch(_){}
          }
        });
      });
    }catch(_){}
  }
  ready(function(){
    // dopo che l'accordion e le liste sono state costruite
    setTimeout(clean, 0);
    setTimeout(clean, 200);
  });
})();

;

  // Configurazione: vista iniziale della mappa (modifica qui se vuoi cambiare default)
  // Default: Piazza de Ferrari
  window.START_CENTER = [44.40838225709695, 8.924881305964991];
  window.START_ZOOM = 14;

;

(function(){
  var TARGET_CENTER = [44.40838225709695, 8.924881305964991];
  var TARGET_ZOOM = null; // will be computed from WALLS_NODES_MIN_ZOOM if available

  function computeTargetZoom(){
    try{ if(typeof computeWallsNodesMinZoom === 'function') computeWallsNodesMinZoom(); }catch(_){}
    if (typeof window.WALLS_NODES_MIN_ZOOM === 'number') return window.WALLS_NODES_MIN_ZOOM;
    return 15;
  }

  function relaxMinZoom(m, desired){
    try{
      var cur = (typeof m.getMinZoom==='function') ? m.getMinZoom() : null;
      var newMin = (cur==null) ? (desired-2) : Math.min(cur, desired-2);
      if (!Number.isFinite(newMin)) newMin = desired-2;
      if (newMin < 0) newMin = 0;
      if (typeof m.setMinZoom === 'function') m.setMinZoom(newMin);
    }catch(_){}
  }

  function applyOnce(){
    var m = window.map;
    if(!m || !m.setView) return false;
    // compute target zoom if not set
    if (TARGET_ZOOM == null) TARGET_ZOOM = computeTargetZoom();
    // allow zooming out a bit from start
    relaxMinZoom(m, TARGET_ZOOM);
    m.setView(TARGET_CENTER, TARGET_ZOOM, {animate:false});
    return true;
  }

  function afterLoad(){
    var tries = 0, maxTries = 10;
    function tick(){
      var ok = applyOnce();
      tries++;
      if(tries < maxTries){ setTimeout(tick, 180); }
    }
    if(window.map && typeof window.map.whenReady === 'function'){
      window.map.whenReady(function(){ setTimeout(tick, 0); });
    } else {
      tick();
    }
    // final guard: if qualcosa rimette i bounds, riapplica una volta
    var done = false;
    function guard(){
      if(done) return;
      done = true;
      try{ applyOnce(); }catch(_){}
    }
    setTimeout(guard, 2200);
  }

  if (document.readyState === 'complete') afterLoad();
  else window.addEventListener('load', afterLoad, { once:true });
})();

