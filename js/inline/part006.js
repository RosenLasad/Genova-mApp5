
(function(){
  function getMap(){
    return window.map || window.MAP || window.leafletMap || null;
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

  // NOTE: legacy behavior (disabled):
  // This used to move the toolbar QR scan button (#btn-scan) into the bottom bar,
  // causing a duplicate Scan QR button. We keep the function for future use,
  // but we DO NOT call it anymore (Option A).
  function moveQR(bar){
    var qr = document.getElementById('btn-scan');
    if(qr && !bar.contains(qr)){
      qr.classList.add('fab-btn');
      bar.appendChild(qr);
    }
  }

  function makeHome(bar){
    if(document.getElementById('btn-home')) return;

    var btn = document.createElement('button');
    btn.id = 'btn-home';
    btn.className = 'fab-btn';
    btn.setAttribute('aria-label','Home');
    btn.setAttribute('title','Home');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 3l9 8h-3v8h-5v-5h-2v5H6v-8H3l9-8z" fill="currentColor"/>' +
      '</svg>';

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      var m = getMap();
      if(!m) return;

      var lat = 44.40828969466985, lng = 8.925709664312661, z = 15;
      try{
        if(m.flyTo) m.flyTo([lat,lng], z, {animate:true, duration: 1.0});
        else if(m.setView) m.setView([lat,lng], z);
      }catch(_){}
    });

    bar.appendChild(btn);
  }

  function init(){
    var bar = ensureBar();

    // DISABLED (Option A): do not move #btn-scan into the bottom bar
    // moveQR(bar);

    makeHome(bar);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();