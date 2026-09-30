
(function(){
  var URL = 'https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.png?key=' + (window.MAPTILER_KEY||'') + '&language=it';
  function ensure(){
    var activeMap = window.__LEAFLET_MAP__ || window.map;
    if (typeof L==='undefined' || !activeMap || typeof activeMap.eachLayer!=='function' || typeof activeMap.hasLayer!=='function') return;
    var has = !!(window.__GENOVA_BASEMAP_LAYER && activeMap.hasLayer(window.__GENOVA_BASEMAP_LAYER));
    if (!has) activeMap.eachLayer(function(l){ if(l instanceof L.TileLayer) has=true; });
    if(!has){
      window.__GENOVA_BASEMAP_LAYER = L.tileLayer(URL, { tileSize:512, zoomOffset:-1, maxZoom:20, attribution:'© OpenStreetMap contributors • MapTiler' }).addTo(activeMap);
      window.__GENOVA_BASEMAP_MODE = 'raster-fallback';
    }
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', ensure); else ensure();
})();
