
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
