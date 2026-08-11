(function(){
  'use strict';
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
