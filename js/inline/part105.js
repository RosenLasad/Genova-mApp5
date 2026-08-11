
/* === Place quick-toggles below the Home button === */
(function(){
  function getHomeEl(){
    // Try known selectors
    var sels = ['.map-home-button', '#map-home-button', '.btn-home', '#btn-home', '.home-btn', '#home-btn', '[data-role="home-button"]'];
    for (var i=0;i<sels.length;i++){
      var el = document.querySelector(sels[i]);
      if (el) return el;
    }
    // Fallback: find a floating button with aria-label containing 'Home'
    var nodes = document.querySelectorAll('button, a');
var guess = null;
for (var i = 0; i < nodes.length; i++){
  var n = nodes[i];
  var l = ((n.getAttribute('aria-label') || n.title || '') + '').toLowerCase();
  if (l.indexOf('home') !== -1 || l.indexOf('inizio') !== -1 || l.indexOf('reset vista') !== -1){
    guess = n;
    break;
  }
}
return guess || null;

    return guess || null;
  }

  function positionDock(){
    var dock = document.getElementById('quick-toggles');
    if (!dock) return;
    var home = getHomeEl();
    if (home){
      var r = home.getBoundingClientRect();
      var topPx = r.bottom + 10; // 10px below Home
      // Translate viewport coords to page coords considering scrollY
      dock.style.top = (topPx + window.scrollY) + 'px';
    }else{
      // If we can't find Home, fall back to 150px below top-right toolbar baseline
      dock.style.top = '250px';
    }
  }

  // Reposition on load and on resize/zoom orientation change
  var tries=0, max=60;
  var iv = setInterval(function(){
    var dockReady = document.getElementById('quick-toggles');
    if (dockReady){
      clearInterval(iv);
      positionDock();
      window.addEventListener('resize', positionDock, {passive:true});
      window.addEventListener('orientationchange', positionDock);
      // If map resizes, also reposition
      if (typeof map !== 'undefined' && map.on) {
        map.on('resize', positionDock);
      }
    }
    if (++tries>=max) clearInterval(iv);
  }, 150);
})();
