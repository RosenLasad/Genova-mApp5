
(function(){
  const PANE = 'pane-qr-azzurri-all';
  const VISIBILITY_KEY = 'gm-qr-points-visible';
  var visibilityChosen = false;
  var restoreAttempts = 0;
  function ensurePane(){
    if(!map.getPane(PANE)){
      map.createPane(PANE);
      map.getPane(PANE).style.zIndex = 651;
    }
    return PANE;
  }
  function ensureGroup(){
    if(!window.QR_ALL){
      ensurePane();
      window.QR_ALL = L.layerGroup();
    }
    return window.QR_ALL;
  }
  
  // Porta il punto QR in una posizione "sicura" nello schermo:
  // X = centro, Y = 35% dall'alto (così resta sopra il pannello video).
  function panQRToSafeSpot(latlng){
    try{
      var mp = (typeof map !== 'undefined' && map) ? map : (window.map || null);
      if(!mp || !mp.getSize || !mp.latLngToContainerPoint) return;
      var size = mp.getSize();
      var target = L.point(size.x * 0.5, size.y * 0.35);
      var cur = mp.latLngToContainerPoint(latlng);
      var delta = cur.subtract(target);
      // evita micro-spostamenti fastidiosi
      if (Math.abs(delta.x) < 5 && Math.abs(delta.y) < 5) return;
      mp.panBy([delta.x, delta.y], { animate:true, duration:0.35 });
    }catch(_){}
  }

window.__QR_SOURCES = window.__QR_SOURCES || [];
  window.__qrAddSource = function(parent, children){
    try{ window.__QR_SOURCES.push({parent: parent||{}, children: children||[]}); }catch(_){}
  };
  window.__qrBuildAll = function(){
    const grp = ensureGroup(); grp.clearLayers();
    const icon = L.icon({ iconUrl:'qr_azzurri/marker-azzurro-qr-notch-24.svg', iconSize:[24,26], iconAnchor:[12,26], className:'qr-azzurro-icon' });
    (window.__QR_SOURCES||[]).forEach(function(src){
      (src.children||[]).forEach(function(c){
        if(typeof c.lat==='number' && typeof c.lng==='number'){
          const m = L.marker([c.lat, c.lng], { pane: ensurePane(), icon, title: c.label||'' });
          try{ m.bindTooltip(c.label||'', {direction:'top', offset:[0,-6], className:'qr-tooltip'}); }catch(_){}
m.on('click', function(e){
  try{
var qrid = (src && src.parent && src.parent.id ? src.parent.id : 'qr')
         + '/'
         + (c && c.id ? c.id : 'item');

window.__qrOpenChildPanel && window.__qrOpenChildPanel(c.label, c.descr, c.media, qrid);
  }catch(_){}
  try{
    var ll = (e && e.latlng) ? e.latlng : (m.getLatLng ? m.getLatLng() : null);
    if(!ll) return;
    setTimeout(function(){ panQRToSafeSpot(ll); }, 120);
  }catch(_){}
});
          grp.addLayer(m);
        }
      });
    });
    return grp;
  };
  window.__qrToggleAll = function(on){
    const grp = ensureGroup();
    if(typeof on !== 'boolean') on = !map.hasLayer(grp);
    if(on){
      if(!map.hasLayer(grp)) map.addLayer(grp);
      window.__qrBuildAll();
    }else{
      if(map.hasLayer(grp)) map.removeLayer(grp);
    }
    visibilityChosen = true;
    try{ localStorage.setItem(VISIBILITY_KEY, on ? '1' : '0'); }catch(_){}
    var master = document.getElementById('chk-qr-all');
    if(master) master.checked = on;
    var button = document.getElementById('btn-qr-removed');
    if(button){
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-pressed', String(on));
    }
  };
  function restoreVisibility(){
    if(visibilityChosen) return;
    // La mappa viene inizializzata in modo asincrono, anche dopo DOMContentLoaded.
    if(typeof map === 'undefined' || !map || typeof map.hasLayer !== 'function' || typeof L === 'undefined'){
      if(++restoreAttempts < 200) setTimeout(restoreVisibility, 100);
      return;
    }
    var on = false;
    try{ on = localStorage.getItem(VISIBILITY_KEY) === '1'; }catch(_){}
    window.__qrToggleAll(on);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', restoreVisibility, {once:true});
  else restoreVisibility();
})();
