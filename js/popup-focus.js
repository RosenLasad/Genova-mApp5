/* Porta i marker dei normali punti informativi al 50% X / 70% Y. */
(function () {
  "use strict";
  if (window.__GENOVA_POPUP_FOCUS__) return;
  window.__GENOVA_POPUP_FOCUS__ = true;

  var EXCLUDED_POPUPS = /(?:mura-popup|route-pop|doc-pop|aqueduct-popup|gm-aqueduct-popup|qr-)/i;

  function targetCenter(map, latlng) {
    if (!map || !latlng || !window.L || !window.L.point) return null;
    var zoom = Number(map.getZoom && map.getZoom());
    var size = map.getSize && map.getSize();
    if (!isFinite(zoom) || !size || size.x <= 0 || size.y <= 0) return null;

    var point = map.project(latlng, zoom);
    var desired = window.L.point(size.x * 0.50, size.y * 0.70);
    var viewportCenter = window.L.point(size.x * 0.50, size.y * 0.50);
    return map.unproject(point.add(viewportCenter.subtract(desired)), zoom);
  }

  function shouldFocus(popup) {
    if (!popup || !popup._source || typeof popup._source.getLatLng !== "function") return false;
    if (popup._source.options && popup._source.options.genovaKeepMapPosition) return false;
    var className = String((popup.options && popup.options.className) || "");
    if (popup._container) className += " " + String(popup._container.className || "");
    return !EXCLUDED_POPUPS.test(className);
  }

  function install() {
    var map = window.map;
    if (!map || typeof map.on !== "function" || map.__genovaPopupFocusInstalled) return false;
    map.__genovaPopupFocusInstalled = true;

    map.on("popupopen", function (event) {
      var popup = event && event.popup;
      if (!shouldFocus(popup)) return;
      var latlng = popup._source.getLatLng();
      function focus(animate) {
        var center = targetCenter(map, latlng);
        if (!center || map._popup !== popup) return;
        try { map.panTo(center, { animate: animate, duration: 0.35 }); } catch (_) {}
      }

      // Leaflet completa prima il proprio auto-pan; il nostro movimento finale
      // mantiene il marker nella posizione richiesta senza chiudere il popup.
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          focus(true);
        });
      });

      // Alcuni popup aggiungono immagini e comandi subito dopo l'apertura e
      // Leaflet esegue un secondo auto-pan. Un assestamento finale conserva il
      // 50/70 anche in quei pannelli piu' ricchi.
      window.setTimeout(function () { focus(false); }, 500);
    });
    return true;
  }

  if (!install()) {
    window.addEventListener("load", function () {
      if (install()) return;
      var attempts = 0;
      var timer = window.setInterval(function () {
        attempts++;
        if (install() || attempts >= 20) window.clearInterval(timer);
      }, 150);
    }, { once: true });
  }
})();
