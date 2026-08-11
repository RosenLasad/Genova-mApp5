
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
