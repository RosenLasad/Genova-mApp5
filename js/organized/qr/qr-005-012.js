
window.__TEXTS = window.__TEXTS || {};
window.__MURA_BARBAROSSA_TEXTS_URL = window.__MURA_BARBAROSSA_TEXTS_URL || "mura_data/mura_barbarossa_texts.json";

/* NUOVO: JSON per il popup "Info e contatti" */
window.__INFO_TEXTS_URL = window.__INFO_TEXTS_URL || "info/info_popup_texts.json";

async function __loadTexts(layerKey, url){
  if(window.__TEXTS[layerKey]) return window.__TEXTS[layerKey];
  try {
    const res = await fetch(url);
    if(res.ok){
      window.__TEXTS[layerKey] = await res.json();
      return window.__TEXTS[layerKey];
    }
  } catch(e){ /* silent */ }
  window.__TEXTS[layerKey] = {};
  return window.__TEXTS[layerKey];
}


;

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
;

(function(){
  function ensureQRInBar(bar){
    var qrFab = document.getElementById('map-qr-fab');
    if(qrFab && !bar.contains(qrFab)){
      qrFab.classList.add('fab-btn');
      bar.insertBefore(qrFab, document.getElementById('btn-home')); // to the left of Home
    }
  }
  function run(){
    var bar = document.getElementById('bottom-bar');
    if(!bar){ requestAnimationFrame(run); return; }
    ensureQRInBar(bar);
  }
  // run after original script likely created the FAB
  setTimeout(run, 50);
  setTimeout(run, 300);
  setTimeout(run, 1000);
})();

;

(function(){
  function moveGPSIntoBar(){
    var bar = document.getElementById('bottom-bar');
    if(!bar){ requestAnimationFrame(moveGPSIntoBar); return; }

    var gps = document.getElementById('btn-gps');
    if(!gps){ setTimeout(moveGPSIntoBar, 150); return; }

    // Clean positioning inherited from toolbar
    ['position','left','right','top','bottom','transform','marginLeft','marginRight'].forEach(function(prop){
      try{ gps.style[prop] = ''; }catch(_){}
    });

    // Insert as FIRST in the bar
    if(!bar.contains(gps)){
      gps.classList.add('fab-btn');
      if(bar.firstChild) bar.insertBefore(gps, bar.firstChild);
      else bar.appendChild(gps);
    }
  }
  // Run after other UI scripts
  setTimeout(moveGPSIntoBar, 0);
  setTimeout(moveGPSIntoBar, 200);
  setTimeout(moveGPSIntoBar, 800);
})();

;

(function(){
  function run(){
    var bar = document.getElementById('bottom-bar');
    var help = document.getElementById('help-fab');
    if(!bar || !help){ setTimeout(run, 120); return; }
    if(!bar.contains(help)){
      bar.insertBefore(help, bar.firstChild); // primo a sinistra
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  setTimeout(run, 200);
  setTimeout(run, 800);
})();

;

(function(){
  function positionMenuAboveBtn(){
    var btn = document.getElementById('btn-lang');
    var rail = document.getElementById('mh-flags');
    if(!btn || !rail) return;
    
    // Get the button's position
    var rect = btn.getBoundingClientRect();
    
    // Position the menu directly above the button, with some offset
    rail.style.left = (rect.left + window.scrollX + rect.width / 2 - rail.offsetWidth / 2) + 'px';
    rail.style.bottom = (window.innerHeight - rect.top + window.scrollY + 6) + 'px'; // Small offset from the button
  }
  
  // Call on initialization and on window resize to adjust position
  window.addEventListener('resize', positionMenuAboveBtn);
  window.addEventListener('DOMContentLoaded', positionMenuAboveBtn);
  setTimeout(positionMenuAboveBtn, 300);
})();

;

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

