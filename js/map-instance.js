(function(){
  'use strict';
  // Evita che l'elemento HTML con id="map" venga scambiato per l'istanza Leaflet
  // dai moduli caricati prima dell'evento window.load.
  if(!window.map || typeof window.map.eachLayer !== 'function') window.map=null;
  if(!window.L || typeof window.L.map !== 'function' || window.L.map.__gmCapturesInstance) return;
  var createMap=window.L.map;
  function capturedMap(){
    var instance=createMap.apply(this,arguments);
    window.map=instance;
    window.__LEAFLET_MAP__=instance;
    return instance;
  }
  capturedMap.__gmCapturesInstance=true;
  window.L.map=capturedMap;
})();
