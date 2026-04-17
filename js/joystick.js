// Estratto da inline.js - part209.js

(function(){
  // Guard to avoid double init
  if (window.__joystick_init) return;
  window.__joystick_init = true;

  let map, joy, thumb, dragging = false, vec = {x:0, y:0}, radius = 32, maxSpeed = 8, dead = 10, rafId = null;

  function getMap(){
    try{ return window.map || window.__map || null; }catch(_){ return null; }
  }

  function recalcRadius(){
    if(!joy) return;
    const r = Math.max(joy.offsetWidth, joy.offsetHeight) / 2;
    radius = Math.max(16, r - 10);
  }

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function applyThumb(px, py){
    if(!thumb) return;
    thumb.style.transform = 'translate(' + (px||0) + 'px,' + (py||0) + 'px)';
  }

  function startDrag(e){
    dragging = true;
    try{ joy.setPointerCapture(e.pointerId); }catch(_){}
    updateFromEvent(e);
    loop();
    joy.classList.add('active');
  }

  function endDrag(e){
    dragging = false;
    vec.x = vec.y = 0;
    applyThumb(0,0);
    joy.classList.remove('active');
    if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
  }

  function updateFromEvent(e){
    if(!dragging) return;
    const rect = joy.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const clamped = Math.min(dist, radius);
    const nx = dist ? dx / dist : 0;
    const ny = dist ? dy / dist : 0;
    const px = nx * clamped;
    const py = ny * clamped;
    applyThumb(px, py);

    // dead zone
    if (clamped < dead){ vec.x = 0; vec.y = 0; return; }

    // speed scales with distance
    const k = clamped / radius; // 0..1
    vec.x = nx * maxSpeed * k;
    vec.y = ny * maxSpeed * k;
  }

  function loop(){
    if(!map) map = getMap();
    if(vec.x || vec.y){
      try{
        const c = map.getCenter();
        const latlng = map.layerPointToLatLng(map.latLngToLayerPoint(c).add([vec.x, vec.y]));
        map.panTo(latlng, {animate:false});
      }catch(_){}
    }
    if(dragging) rafId = requestAnimationFrame(loop);
  }

  function init(){
    joy = document.querySelector('.joystick');
    thumb = joy ? joy.querySelector('.thumb') : null;
    if(!joy || !thumb){ requestAnimationFrame(init); return; }
    recalcRadius();

    joy.addEventListener('pointerdown', startDrag);
    joy.addEventListener('pointermove', updateFromEvent);
    joy.addEventListener('pointerup', endDrag);
    joy.addEventListener('pointercancel', endDrag);
    window.addEventListener('resize', recalcRadius, {passive:true});

    // Accessibility: stop map drag on joystick interaction start
    joy.addEventListener('mousedown', function(e){ e.stopPropagation(); }, true);
    joy.addEventListener('touchstart', function(e){ e.stopPropagation(); }, {passive:true, capture:true});

    document.addEventListener('visibilitychange', function(){
      if(document.hidden) endDrag({});
    });
  }

  requestAnimationFrame(init);
})();
