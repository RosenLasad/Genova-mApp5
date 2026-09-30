
(function(){
  function num(v, d){ var n = parseFloat(v); return isFinite(n) ? n : d; }
  function int(v, d){ var n = parseInt(v, 10); return isFinite(n) ? n : d; }

  function hasDeepLink(sp){
    // estendi se hai altre chiavi "deep"
    return sp.has('doc') || sp.has('id');
  }

  function applyStartupView(){
    if (typeof map === 'undefined' || !map.setView) return;
    var url = new URL(location.href);
    var sp  = url.searchParams;

    // 1) deep link? non forzare vista iniziale
    if (hasDeepLink(sp)) return;

    // 2) parametri URL espliciti
    var lat = num(sp.get('lat'), null);
    var lng = num(sp.get('lng'), null);
    var z   = int(sp.get('z'),   null);
    if (lat !== null && lng !== null && z !== null){
      map.setView([lat, lng], z, { animate:false });
      return;
    }

    // 3) default presi da 8.7
    var DEF_LAT  = 44.407;
    var DEF_LNG  = 8.934;
    var DEF_ZOOM = 12;

    map.setView([DEF_LAT, DEF_LNG], DEF_ZOOM, { animate:false });
  }

  if (document.readyState === 'complete') applyStartupView();
  else window.addEventListener('load', applyStartupView, { once:true });
})();
