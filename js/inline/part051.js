
(function(){
  var URL = 'https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.png?key=' + (window.MAPTILER_KEY||'') + '&language=it';
  function ensure(){
    if (typeof L==='undefined' || typeof map==='undefined') return;
    var has = false;
    map.eachLayer(function(l){ if(l instanceof L.TileLayer) has=true; });
    if(!has){ L.tileLayer(URL, { tileSize:512, zoomOffset:-1, maxZoom:20, attribution:'© OpenStreetMap contributors • MapTiler' }).addTo(map); }
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', ensure); else ensure();
})();
