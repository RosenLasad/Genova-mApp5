// Tracciato della Metropolitana di Genova, Brin - Brignole.
// Geometria derivata da OpenStreetMap, relazione 2177189 (ODbL),
// semplificata a circa 2 metri per una visualizzazione fluida.
(function () {
  "use strict";

  var METRO_LINE_COORDS = [
    [44.428232, 8.8952072],
    [44.4276914, 8.896177],
    [44.4267986, 8.897484],
    [44.4264864, 8.8978445],
    [44.4156515, 8.907636],
    [44.4152276, 8.9079837],
    [44.4139668, 8.9088537],
    [44.4135224, 8.9092211],
    [44.4133968, 8.9093658],
    [44.4132202, 8.9096656],
    [44.4131316, 8.9099963],
    [44.4131257, 8.9101737],
    [44.4131378, 8.9103404],
    [44.413239, 8.9106802],
    [44.413946, 8.912238],
    [44.4151058, 8.9150654],
    [44.4152056, 8.9152434],
    [44.4156269, 8.9157866],
    [44.4160745, 8.916629],
    [44.416555, 8.9177474],
    [44.4165805, 8.9179424],
    [44.4165737, 8.9180403],
    [44.4164698, 8.9183528],
    [44.4156074, 8.9206555],
    [44.4153002, 8.9223954],
    [44.4151355, 8.922968],
    [44.4149721, 8.9233883],
    [44.4147567, 8.9238178],
    [44.4128616, 8.9267939],
    [44.4125721, 8.9271096],
    [44.4114348, 8.9279938],
    [44.4109692, 8.9283051],
    [44.4105698, 8.9284657],
    [44.4100667, 8.9285876],
    [44.4093199, 8.9286201],
    [44.4086129, 8.9284919],
    [44.406961, 8.9277972],
    [44.406638, 8.9276956],
    [44.4063392, 8.9276735],
    [44.4058874, 8.9277775],
    [44.4055834, 8.9279703],
    [44.4046194, 8.9290553],
    [44.4044537, 8.9292945],
    [44.4042087, 8.92981],
    [44.4040957, 8.9303466],
    [44.4040828, 8.9309091],
    [44.4041642, 8.9314652],
    [44.4042625, 8.9317634],
    [44.4044434, 8.9320751],
    [44.4045697, 8.9322386],
    [44.4075478, 8.9351859],
    [44.407905, 8.9354384],
    [44.4088522, 8.9359428],
    [44.4091236, 8.936157],
    [44.4093308, 8.936501],
    [44.4098944, 8.9378509],
    [44.4100519, 8.9385875],
    [44.4100685, 8.9391195],
    [44.4100014, 8.9396636],
    [44.4088907, 8.9442924],
    [44.4088806, 8.9450129],
    [44.4089866, 8.9459307],
    [44.4089765, 8.9462482],
    [44.4089016, 8.9466537],
    [44.4087963, 8.9469117],
    [44.4086484, 8.9471307],
    [44.4085058, 8.9472724],
    [44.4078564, 8.9477319],
    [44.4075682, 8.9480169],
    [44.4070466, 8.948838]
  ];

  var metroLineLayer = null;
  var metroButton = null;
  var mapRef = null;

  window.METRO_LINE_COORDS = METRO_LINE_COORDS;

  function findMap() {
    mapRef = window.map || window.__map || window.MAP || null;
    return mapRef;
  }

  function buildLine() {
    if (metroLineLayer || !window.L) return metroLineLayer;

    metroLineLayer = L.layerGroup([
      L.polyline(METRO_LINE_COORDS, {
        color: "#0f172a",
        weight: 9,
        opacity: 0.76,
        lineCap: "round",
        lineJoin: "round",
        interactive: false
      }),
      L.polyline(METRO_LINE_COORDS, {
        color: "#ef4444",
        weight: 5,
        opacity: 0.98,
        lineCap: "round",
        lineJoin: "round",
        interactive: false
      })
    ]);

    return metroLineLayer;
  }

  function metroIsActive() {
    return metroButton &&
      metroButton.getAttribute("aria-pressed") === "true";
  }

  function syncLineVisibility() {
    var map = findMap();
    var line = buildLine();
    if (!map || !line) return;

    if (metroIsActive()) {
      if (!map.hasLayer(line)) line.addTo(map);
      if (typeof line.bringToBack === "function") line.bringToBack();
    } else if (map.hasLayer(line)) {
      map.removeLayer(line);
    }
  }

  function attach() {
    metroButton = document.querySelector("#quick-toggles .qt-metro");
    if (!metroButton || !findMap() || !window.L) return false;

    metroButton.addEventListener("click", function () {
      window.setTimeout(syncLineVisibility, 0);
    });

    if (typeof window.MutationObserver === "function") {
      new MutationObserver(syncLineVisibility).observe(metroButton, {
        attributes: true,
        attributeFilter: ["aria-pressed"]
      });
    }

    syncLineVisibility();
    return true;
  }

  var tries = 0;
  var timer = window.setInterval(function () {
    if (attach() || ++tries >= 40) {
      window.clearInterval(timer);
    }
  }, 150);
})();
