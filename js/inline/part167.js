
// Assicura che esista il gruppo Leaflet per i percorsi
function ensureRouteLayer(){
  if(!window.map) return null;
  if(!window.routeLayer){
    window.routeLayer = L.featureGroup().addTo(window.map);
  }
  return window.routeLayer;
}

// Carica i dati del percorso (route.data o __ROUTE_DATA[..])
async function ensureRouteData(route){
  if (route.data) return route.data;
  if (window.__ROUTE_DATA && window.__ROUTE_DATA[route.id]) {
    route.data = window.__ROUTE_DATA[route.id];
    return route.data;
  }
  console.warn("Nessun dato trovato per percorso:", route.id);
  return null;
}

// Disegna polilinea + marker inizio/fine con popup provvisori
function drawRouteFeature(routeData, colorOverride){
  if(!window.L) return [];
  var rl = ensureRouteLayer();
  if(!rl) return [];
  const color = colorOverride || routeData.color || "#e53935";

  const poly = L.polyline(routeData.polyline, {
    color: color,
    weight: 4,
    opacity: 0.9
  }).addTo(rl);

  function buildPopup(label){
    const title = getRouteDisplayName(routeData.id);
    return "<div><strong>"+title+"</strong><br>"+label+"</div>";
  }

  const startMarker = L.circleMarker(
    [routeData.start.lat, routeData.start.lng],
    {
      radius: 6,
      weight: 2,
      color: color,
      fillColor: "#fff",
      fillOpacity: 1
    }
  )
  .bindTooltip("Inizio", {direction:"top"})
  .bindPopup(buildPopup("Inizio percorso"), {maxWidth:260})
  .addTo(rl);

  const endMarker = L.circleMarker(
    [routeData.end.lat, routeData.end.lng],
    {
      radius: 6,
      weight: 2,
      color: color,
      fillColor: "#fff",
      fillOpacity: 1
    }
  )
  .bindTooltip("Fine", {direction:"top"})
  .bindPopup(buildPopup("Fine percorso"), {maxWidth:260})
  .addTo(rl);

  return [ poly, startMarker, endMarker ];
}

// Aggiunge alla mappa un percorso attivato
async function addRouteToMap(route){
  window.routeLayersById = window.routeLayersById || {};
  ensureRouteLayer();
  if(!window.map || !window.routeLayer) return;
  if(window.routeLayersById[route.id]) return; // già attivo

  const data = await ensureRouteData(route);
  if(!data) return;

  const layers = drawRouteFeature(data, route.color) || [];
  window.routeLayersById[route.id] = layers;
}

// Rimuove dalla mappa un percorso disattivato
function removeRouteFromMap(routeId){
  ensureRouteLayer();
  if(!window.map || !window.routeLayer) return;
  if(!window.routeLayersById || !window.routeLayersById[routeId]) return;

  (window.routeLayersById[routeId] || []).forEach(function(layer){
    try { window.routeLayer.removeLayer(layer); } catch(e){}
  });
  delete window.routeLayersById[routeId];
}

