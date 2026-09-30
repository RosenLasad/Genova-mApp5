
(function(){
  try {
    // Force both walls off at startup and sync UI
    localStorage.setItem('walls_visible', JSON.stringify({'mura-barbarossa':false,'mura-nuove':false}));
    var cb1 = document.getElementById('chk-wall-barbarossa');
    var cb2 = document.getElementById('chk-wall-nuove');
    if (cb1) cb1.checked = false;
    if (cb2) cb2.checked = false;
    if (typeof renderWalls === 'function') renderWalls();
    if (typeof updateWallNodesVisibility === 'function') updateWallNodesVisibility();
  } catch(e) { /* noop */ }
})();
