
(function(){
  if(window.__gps_btn_ready__) return; window.__gps_btn_ready__ = true;

  function getMap(){
    return window.map || window.MAP || window.leafletMap || (window.L && window.L.map && window.__leafletMap) || null;
  }

  function ensureBar(){
    var bar = document.getElementById('bottom-bar');
    if(!bar){
      bar = document.createElement('div');
      bar.id = 'bottom-bar';
      document.body.appendChild(bar);
    }
    return bar;
  }

  function createBtn(){
    var btn = document.getElementById('btn-gps');
    if(btn) return btn;
    btn = document.createElement('button');
    btn.id = 'btn-gps';
    btn.className = 'fab-btn';
    btn.title = 'GPS';
    btn.setAttribute('aria-label','GPS');
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 2v3a6 6 0 016 6h3v2h-3a6 6 0 01-6 6v3h-2v-3a6 6 0 01-6-6H2v-2h3a6 6 0 016-6V2h2zm1 9a2 2 0 10-4 0 2 2 0 004 0z" fill="currentColor"/></svg>';
    return btn;
  }

  function placeBtn(){
    var bar = ensureBar();
    var btn = createBtn();
    if(!bar.contains(btn)){
      // Insert as the 3rd button: after Help and before FAB QR
      var help = document.getElementById('help-fab');
      var qr = document.getElementById('map-qr-fab') || document.getElementById('btn-scan');
      if(help && qr && qr.parentElement === bar){
        bar.insertBefore(btn, qr);
      }else if(help && help.parentElement === bar){
        // If QR not found yet, insert right after Help, it will shift when QR appears
        if(help.nextSibling) bar.insertBefore(btn, help.nextSibling);
        else bar.appendChild(btn);
      }else{
        // Fallback: append, then we'll reorder later if elements appear
        bar.appendChild(btn);
      }
    }
  }

  function locate(){
    var btn = document.getElementById('btn-gps');
    var m = getMap();
    if(!navigator.geolocation || !m){ return; }
    btn.setAttribute('aria-busy','true');
    navigator.geolocation.getCurrentPosition(function(pos){
      try{
        var lat = pos.coords.latitude, lng = pos.coords.longitude;
        if(m.flyTo) m.flyTo([lat,lng], Math.max(12, m.getZoom ? Math.min(13, (m.getZoom()||12)) : 12), {animate:true, duration:1.0});
        else if(m.setView) m.setView([lat,lng], 13);
        // Optional: brief ripple effect
      }finally{
        btn.removeAttribute('aria-busy');
      }
    }, function(){
      btn.removeAttribute('aria-busy');
    }, {enableHighAccuracy:true, timeout:8000, maximumAge:10000});
  }

  function wire(){
    placeBtn();
    var btn = document.getElementById('btn-gps');
    if(!btn){ setTimeout(wire, 120); return; }
    btn.addEventListener('click', function(e){
  // Se il GPS è già acceso (btn ha classe "active"), stai spegnendo: niente animazioni.
  if (btn.classList.contains('active')) return;

  e.preventDefault();
  locate(); // animazione solo quando lo accendi
}, {capture:true});

  }

  function maintainOrder(){
    // If QR appears later, ensure GPS stays before QR
    var bar = document.getElementById('bottom-bar');
    var btn = document.getElementById('btn-gps');
    var qr = document.getElementById('map-qr-fab') || document.getElementById('btn-scan');
    var help = document.getElementById('help-fab');
    if(bar && btn && help && qr && qr.parentElement === bar){
      if(btn.nextSibling !== qr){
        bar.insertBefore(btn, qr);
      }
    }
  }

  function init(){
    wire();
    setTimeout(maintainOrder, 300);
    setTimeout(maintainOrder, 1200);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
