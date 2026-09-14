(function () {
  "use strict";

  var panel = document.getElementById("panel");
  var activeQrPoint = null;
  var resizeTimer = 0;

  if (!panel) return;

  function clearQrLayout() {
    activeQrPoint = null;
    panel.classList.remove("qr-point-panel");
    panel.style.removeProperty("--qr-panel-bottom");
  }

  function sameText(a, b) {
    return String(a || "").trim() === String(b || "").trim();
  }

  function findQrPoint(title, media, qrid) {
    var sources = window.__QR_SOURCES || [];
    var idParts = String(qrid || "").split("/");
    var parentId = idParts.length > 1 ? idParts[0] : "";
    var childId = idParts.length > 1 ? idParts[1] : "";
    var today = media && media.oggi ? String(media.oggi) : "";
    var titleMatch = null;

    for (var s = 0; s < sources.length; s++) {
      var source = sources[s] || {};
      var parent = source.parent || {};
      var children = source.children || [];

      for (var c = 0; c < children.length; c++) {
        var child = children[c] || {};

        if (
          parentId &&
          childId &&
          String(parent.id) === parentId &&
          String(child.id) === childId
        ) {
          return child;
        }

        if (
          today &&
          child.media &&
          child.media.oggi &&
          String(child.media.oggi) === today
        ) {
          return child;
        }

        if (!titleMatch && sameText(child.label, title)) {
          titleMatch = child;
        }
      }
    }

    return titleMatch;
  }

  function updateBottomClearance() {
    var bottomBar = document.getElementById("bottom-bar");
    var clearance = window.innerWidth <= 768 ? 70 : 76;

    if (bottomBar) {
      var style = window.getComputedStyle(bottomBar);
      var rect = bottomBar.getBoundingClientRect();
      var visible =
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0;

      if (visible) {
        clearance = Math.max(clearance, window.innerHeight - rect.top + 14);
      }
    }

    panel.style.setProperty(
      "--qr-panel-bottom",
      Math.min(Math.round(clearance), 150) + "px"
    );
  }

  function getMap() {
    var map = window.map || window.__map || window.__LEAFLET_MAP__;
    return map &&
      typeof map.getSize === "function" &&
      typeof map.project === "function" &&
      typeof map.unproject === "function"
      ? map
      : null;
  }

  /*
   * Posizione desiderata del marker QR nell'area REALE della mappa:
   * X = 50% (centro orizzontale)
   * Y = 70% dall'alto = 30% dal bordo inferiore.
   *
   * Invece di spostare graficamente il marker, calcoliamo il centro geografico
   * che deve avere la mappa affinche' quel marker cada esattamente nel punto
   * 50/70 del contenitore Leaflet.
   */
  function centerForQrPoint(map, point, zoom) {
    if (!window.L || !window.L.point || !window.L.latLng) return null;

    var size = map.getSize();
    if (!size || !isFinite(size.x) || !isFinite(size.y) || size.x <= 0 || size.y <= 0) return null;

    var latlng = window.L.latLng(Number(point.lat), Number(point.lng));
    var projectedTarget = map.project(latlng, zoom);
    var desired = window.L.point(size.x * 0.50, size.y * 0.70);
    var viewportCenter = window.L.point(size.x * 0.50, size.y * 0.50);
    var projectedCenter = projectedTarget.add(viewportCenter.subtract(desired));

    return map.unproject(projectedCenter, zoom);
  }

  function focusQrPoint(point, done, options) {
    options = options || {};
    var map = getMap();
    if (!map || !point || !isFinite(point.lat) || !isFinite(point.lng)) {
      if (done) done();
      return;
    }

    var currentZoom = Number(map.getZoom && map.getZoom());
    if (!isFinite(currentZoom)) currentZoom = 16;
    var targetZoom = options.keepZoom ? currentZoom : Math.max(currentZoom, 17);
    var center = centerForQrPoint(map, point, targetZoom);

    if (!center) {
      if (done) done();
      return;
    }

    var finished = false;
    var timeoutId = 0;
    function finish() {
      if (finished) return;
      finished = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      try { map.off("moveend", finish); } catch (_) {}
      if (done) done();
    }

    try { if (typeof map.stop === "function") map.stop(); } catch (_) {}

    if (options.animate === false) {
      try {
        map.setView(center, targetZoom, { animate: false });
      } catch (_) {}
      finish();
      return;
    }

    try { map.once("moveend", finish); } catch (_) {}
    timeoutId = window.setTimeout(finish, 800);

    try {
      if (typeof map.flyTo === "function") {
        map.flyTo(center, targetZoom, {
          animate: true,
          duration: 0.42,
          easeLinearity: 0.35
        });
      } else {
        map.setView(center, targetZoom, { animate: true });
      }
    } catch (_) {
      finish();
    }
  }

  function preparePanel(point) {
    activeQrPoint = point;
    panel.classList.add("qr-point-panel");
    updateBottomClearance();
  }

  function installWrapper() {
    var original = window.__qrOpenChildPanel;
    if (typeof original !== "function") return false;
    if (original.__qrCenteredLayout) return true;

    function openQrPanel(title, descr, media, qrid) {
      var point = findQrPoint(title, media, qrid);
      if (!point) {
        clearQrLayout();
        return original.apply(this, arguments);
      }

      preparePanel(point);

      /*
       * Costruiamo subito il contenuto del pannello ma lo teniamo invisibile
       * durante l'unico movimento della mappa. In questo modo URL, video e stato
       * Oggi/Ieri vengono preparati normalmente, mentre visivamente il pannello
       * compare soltanto quando il marker ha raggiunto la posizione 50/70.
       */
      var previousVisibility = panel.style.visibility;
      var previousPointerEvents = panel.style.pointerEvents;
      panel.style.visibility = "hidden";
      panel.style.pointerEvents = "none";

      var result = original.apply(this, arguments);

      focusQrPoint(point, function () {
        preparePanel(point);
        panel.style.visibility = previousVisibility;
        panel.style.pointerEvents = previousPointerEvents;
      });

      return result;
    }

    openQrPanel.__qrCenteredLayout = true;
    openQrPanel.__qrOriginal = original;
    window.__qrOpenChildPanel = openQrPanel;

    /* API minima utile agli altri moduli QR e ai test. */
    window.__qrFocusPoint = function (point, callback, options) {
      focusQrPoint(point, callback, options || {});
    };

    return true;
  }

  function installWhenReady(triesLeft) {
    if (installWrapper() || triesLeft <= 0) return;
    window.setTimeout(function () {
      installWhenReady(triesLeft - 1);
    }, 100);
  }

  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (
        activeQrPoint &&
        panel.classList.contains("open") &&
        panel.classList.contains("qr-point-panel")
      ) {
        updateBottomClearance();
        focusQrPoint(activeQrPoint, null, { animate: false, keepZoom: true });
      }
    }, 160);
  });

  window.addEventListener("orientationchange", function () {
    window.setTimeout(function () {
      if (
        activeQrPoint &&
        panel.classList.contains("open") &&
        panel.classList.contains("qr-point-panel")
      ) {
        updateBottomClearance();
        focusQrPoint(activeQrPoint, null, { animate: false, keepZoom: true });
      }
    }, 320);
  });

  if (typeof window.MutationObserver === "function") {
    new MutationObserver(function () {
      if (!panel.classList.contains("open") && activeQrPoint) {
        clearQrLayout();
      }
    }).observe(panel, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  installWhenReady(30);
})();
