
(function(){
  function getMap(){
    try{ return window.map || window.__map || window.MAP || null; }catch(_){ return null; }
  }

  function applyZoomAnchor(){
    var map = getMap();
    if(!map || !map.zoomControl || !map.getContainer) return false;

    // 1) posizione Leaflet (logica)
    try{ map.zoomControl.setPosition('bottomright'); }catch(_){}

    var el = map.getContainer().querySelector('.leaflet-control-zoom');
    if(!el) return false;

    // 2) offset in % rispetto alla MAPPA (fisica, ma calcolata)
    var r = map.getContainer().getBoundingClientRect();
    var isSmall = window.matchMedia && window.matchMedia('(max-width: 400px)').matches;

    var bottomPct = isSmall ? 0.016 : 0.017;
    var rightPct  = isSmall ? 0.015 : 0.015;

    var mb = Math.round(r.height * bottomPct);
    var mr = Math.round(r.width  * rightPct);

    // Forza i valori (anche se ti scappa ancora un !important in giro)
    el.style.setProperty('margin-bottom', mb + 'px', 'important');
    el.style.setProperty('margin-right',  mr + 'px', 'important');

    // Assicuriamoci di non “ricadere” in position:absolute da CSS vecchi
    el.style.setProperty('position', 'relative', 'important');

    // 3) mobile: scala (se la vuoi ancora)
    if(isSmall){
      el.style.setProperty('transform', 'scale(0.7)', 'important');
      el.style.setProperty('transform-origin', 'bottom right', 'important');
    }else{
      el.style.removeProperty('transform');
      el.style.removeProperty('transform-origin');
    }

    return true;
  }

  // prova finché la mappa non esiste
  var tries = 0, t = setInterval(function(){
    if(applyZoomAnchor() || ++tries > 80) clearInterval(t);
  }, 150);

  // aggiorna quando cambia dimensione
  window.addEventListener('resize', function(){ applyZoomAnchor(); });

  // se Leaflet emette resize (quando cambia container)
  try{
    var map = getMap();
    if(map && map.on) map.on('resize', applyZoomAnchor);
  }catch(_){}
})();
