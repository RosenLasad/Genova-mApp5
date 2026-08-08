// Tracciato della rete ferroviaria passeggeri visibile insieme alle stazioni.
(function () {
  "use strict";

  var trainLineLayer = null;
  var trainButton = null;
  var mapRef = null;

  function findMap() {
    mapRef = window.map || window.__map || window.MAP || null;
    return mapRef;
  }

  function lineStyle(kind, outline) {
    var tunnel = kind === "tunnel";
    return {
      color: outline ? "#0f172a" : "#f59e0b",
      weight: outline ? 3 : 2.2,
      opacity: outline ? 0.72 : 0.96,
      dashArray: tunnel ? "7 7" : null,
      lineCap: tunnel ? "butt" : "round",
      lineJoin: "round",
      interactive: false
    };
  }

  function offsetPoint(lat, lng, bearing, metres) {
    var radius = 6371000;
    var distance = metres / radius;
    var angle = bearing * Math.PI / 180;
    var lat1 = lat * Math.PI / 180;
    var lon1 = lng * Math.PI / 180;
    var lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(distance) +
      Math.cos(lat1) * Math.sin(distance) * Math.cos(angle)
    );
    var lon2 = lon1 + Math.atan2(
      Math.sin(angle) * Math.sin(distance) * Math.cos(lat1),
      Math.cos(distance) - Math.sin(lat1) * Math.sin(lat2)
    );
    return [lat2 * 180 / Math.PI, lon2 * 180 / Math.PI];
  }

  function arrowIcon(bearing) {
    var html = ""
      + '<span class="train-line-arrow-shape" style="transform:rotate(' + bearing + 'deg)">'
      +   '<svg viewBox="0 0 24 24" aria-hidden="true">'
      +     '<path d="M12 2 L20 18 L12 14.2 L4 18 Z"></path>'
      +   '</svg>'
      + '</span>';

    return L.divIcon({
      className: "train-line-arrow",
      html: html,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
  }

  function buildLine() {
    if (trainLineLayer || !window.L) return trainLineLayer;

    trainLineLayer = L.layerGroup();
    var segments = window.TRAIN_LINE_SEGMENTS || [];
    var arrows = window.TRAIN_LINE_ARROWS || [];

    segments.forEach(function (segment) {
      if (!segment || !Array.isArray(segment.coords) || segment.coords.length < 2) return;
      trainLineLayer.addLayer(L.polyline(segment.coords, lineStyle(segment.kind, true)));
      trainLineLayer.addLayer(L.polyline(segment.coords, lineStyle(segment.kind, false)));
    });

    arrows.forEach(function (arrow) {
      if (!arrow || !isFinite(arrow.lat) || !isFinite(arrow.lng)) return;
      var position = offsetPoint(arrow.lat, arrow.lng, arrow.bearing, 105);
      trainLineLayer.addLayer(L.marker(position, {
        icon: arrowIcon(arrow.bearing),
        interactive: false,
        keyboard: false,
        zIndexOffset: -50
      }));
    });

    return trainLineLayer;
  }

  function trainIsActive() {
    return trainButton && trainButton.getAttribute("aria-pressed") === "true";
  }

  function sendLinesBehindMarkers() {
    if (!trainLineLayer || typeof trainLineLayer.eachLayer !== "function") return;
    trainLineLayer.eachLayer(function (layer) {
      if (layer && typeof layer.bringToBack === "function") layer.bringToBack();
    });
  }

  function syncLineVisibility() {
    var map = findMap();
    var line = buildLine();
    if (!map || !line) return;

    if (trainIsActive()) {
      if (!map.hasLayer(line)) line.addTo(map);
      sendLinesBehindMarkers();
    } else if (map.hasLayer(line)) {
      map.removeLayer(line);
    }
  }

  function attach() {
    trainButton = document.querySelector("#quick-toggles .qt-train");
    if (!trainButton || !findMap() || !window.L) return false;

    trainButton.addEventListener("click", function () {
      window.setTimeout(syncLineVisibility, 0);
    });

    if (typeof window.MutationObserver === "function") {
      new MutationObserver(syncLineVisibility).observe(trainButton, {
        attributes: true,
        attributeFilter: ["aria-pressed"]
      });
    }

    syncLineVisibility();
    return true;
  }

  var tries = 0;
  var timer = window.setInterval(function () {
    if (attach() || ++tries >= 40) window.clearInterval(timer);
  }, 150);
})();
