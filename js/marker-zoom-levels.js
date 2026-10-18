/* Genova mApp - tre livelli di zoom per i soli marker dei luoghi. */
(function(){
  'use strict';
  var supported = /(?:^|\s)(?:chiese-marker|museum-ico|palazzi-marker|forti-marker|doc-ico|locali-marker|parks-ico|parks-marker|cinema-marker|teatri-marker|sport-marker|mostre-marker)(?:\s|$)/;
  var attached = null;
  function sync(){
    var map = window.__LEAFLET_MAP__ || window.map;
    if (!map || typeof map.getZoom !== 'function' || !map.getContainer) return;
    var container = map.getContainer();
    if(!container) return;
    var z=map.getZoom();
    container.classList.toggle('gm-zoom-medium', z>=13 && z<15);
    container.classList.toggle('gm-zoom-far', z<13);
    // Sono esclusi: GPS, marker temporanei/percorsi, QR e controlli della mappa.
    var icons=container.querySelectorAll('.leaflet-marker-icon');
    for(var i=0;i<icons.length;i++){
      var el=icons[i];
      if(supported.test(el.className.baseVal || el.className)) el.classList.add('gm-zoom-place');
    }
    if(attached!==map){
      attached=map;
      map.on('zoomend',sync);
      map.on('layeradd',function(){ requestAnimationFrame(sync); });
    }
  }
  function wait(){
    var map=window.__LEAFLET_MAP__ || window.map;
    if(map && typeof map.getZoom==='function') {sync();return;}
    setTimeout(wait,250);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',wait,{once:true});
  else wait();
})();
