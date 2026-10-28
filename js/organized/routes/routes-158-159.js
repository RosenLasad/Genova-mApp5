
(function(){
  var btn = document.getElementById('routes-btn');
  if(!btn) return;

  var label = (btn.getAttribute('aria-label') || btn.title || btn.textContent || 'Percorsi').trim();
  btn.setAttribute('aria-label', label);
  btn.setAttribute('title', label);
  btn.classList.add('icon-only');

  // Zig-zag path icon: polyline-like route + start dot + destination pin
  btn.innerHTML = ''
    + '<span class="sr-only">'+ label +'</span>'
    + '<svg class="icon-route" viewBox="0 0 24 24" aria-hidden="true">'
    + '  <path d="M4 18 L10 12 L14 16 L20 8"'
    + '        fill="none" stroke="currentColor" stroke-width="2"'
    + '        stroke-linecap="round" stroke-linejoin="round"/>'
    + '  <circle cx="4" cy="18" r="2" fill="currentColor"/>'
    + '  <path d="M18 6a3 3 0 1 1 6 0c0 2.5-3 5.5-3 5.5S18 8.5 18 6Z" fill="currentColor"/>'
    + '</svg>';
})();

;

(function(){
  function swapNodes(a, b){
    if(!a || !b) return false;
    var aParent = a.parentNode, bParent = b.parentNode;
    if(!aParent || !bParent) return false;
    var aNext = a.nextSibling, bNext = b.nextSibling;
    // Move b into a's position
    aParent.insertBefore(b, aNext);
    // Move a into b's position
    bParent.insertBefore(a, bNext);
    return true;
  }

  function doSwap(){
    var routes = document.getElementById('routes');      // dropdown container
    var gpsBtn = document.getElementById('btn-gps');     // GPS button
    if(!routes || !gpsBtn) return;

    // Some toolbars wrap buttons inside <div class="toolbar-buttons">; ensure layout stays neat
    // Try swapping the container 'routes' with the GPS button node
    var ok = swapNodes(routes, gpsBtn);
    if(!ok){
      // Fallback: move routes before gps
      try{ gpsBtn.parentNode.insertBefore(routes, gpsBtn); }catch(_){}
    }

    // Ensure routes button keeps compact icon-only spacing in toolbar after move
    var rbtn = document.getElementById('routes-btn');
    if(rbtn){
      rbtn.classList.add('icon-only');
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', doSwap);
  }else{
    doSwap();
  }
})();

