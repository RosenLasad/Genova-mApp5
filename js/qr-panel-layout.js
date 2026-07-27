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
    return window.map &&
      typeof window.map.latLngToContainerPoint === "function" &&
      typeof window.map.panBy === "function"
      ? window.map
      : null;
  }

  function offsetQrPoint(point) {
    var map = getMap();
    if (!map || !point || !isFinite(point.lat) || !isFinite(point.lng)) return;

    var mapElement = map.getContainer && map.getContainer();
    if (!mapElement) return;

    var mapRect = mapElement.getBoundingClientRect();
    var panelRect = panel.getBoundingClientRect();
    var visibleTop = mapRect.top + 18;
    var visibleBottom = Math.min(mapRect.bottom - 18, panelRect.top - 18);

    if (visibleBottom <= visibleTop + 40) return;

    var desiredX = mapRect.width / 2;
    var desiredY = (visibleTop + visibleBottom) / 2 - mapRect.top;
    var current = map.latLngToContainerPoint([point.lat, point.lng]);
    var dx = current.x - desiredX;
    var dy = current.y - desiredY;

    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return;

    map.panBy([dx, dy], {
      animate: true,
      duration: 0.28
    });
  }

  function centerMapOnQrPoint(point) {
    var map = getMap();
    if (!map || !point || !isFinite(point.lat) || !isFinite(point.lng)) return;

    var adjusted = false;
    var adjustOnce = function () {
      if (adjusted) return;
      adjusted = true;
      window.requestAnimationFrame(function () {
        updateBottomClearance();
        offsetQrPoint(point);
      });
    };

    try {
      map.once("moveend", adjustOnce);
      map.panTo([point.lat, point.lng], {
        animate: true,
        duration: 0.3
      });
    } catch (_) {
      adjustOnce();
    }

    window.setTimeout(adjustOnce, 380);
  }

  function applyQrLayout(point, moveMap) {
    activeQrPoint = point;
    panel.classList.add("qr-point-panel");
    updateBottomClearance();

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        updateBottomClearance();
        if (moveMap) centerMapOnQrPoint(point);
        else offsetQrPoint(point);
      });
    });
  }

  function installWrapper() {
    var original = window.__qrOpenChildPanel;
    if (typeof original !== "function") return false;
    if (original.__qrCenteredLayout) return true;

    function openQrPanel(title, descr, media, qrid) {
      var point = findQrPoint(title, media, qrid);
      var result = original.apply(this, arguments);

      if (point) {
        applyQrLayout(point, true);
      } else {
        clearQrLayout();
      }

      return result;
    }

    openQrPanel.__qrCenteredLayout = true;
    openQrPanel.__qrOriginal = original;
    window.__qrOpenChildPanel = openQrPanel;
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
        applyQrLayout(activeQrPoint, false);
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
        applyQrLayout(activeQrPoint, false);
      }
    }, 320);
  });

  /*
   * Evita che la disposizione QR rimanga applicata quando la scheda viene
   * chiusa e il pannello viene poi riutilizzato da un altro tipo di luogo.
   */
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
