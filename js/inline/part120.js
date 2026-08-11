
(function(){
  function placeRail(){
    var rail = document.getElementById('flag-rail');
    var map  = document.getElementById('map');
    if(!rail || !map) return;
    try{
      var r = map.getBoundingClientRect();
      var top = Math.max(8, r.top + 12);        // slightly below map's top edge
      rail.style.top = top + 'px';
    }catch(_){ /* fallback to CSS default */ }
  }
  ['load','resize','scroll'].forEach(function(ev){
    window.addEventListener(ev, placeRail, { passive:true });
  });
  // Observe layout changes that might affect map position
  var mo = new MutationObserver(placeRail);
  mo.observe(document.documentElement, {childList:true, subtree:true, attributes:true});
  // initial
  setTimeout(placeRail, 0);
  setTimeout(placeRail, 250);
})();
