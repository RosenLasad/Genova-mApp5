(function () {
  "use strict";

  var panel = document.getElementById("panel");
  var activeQrPoint = null;
  var resizeTimer = 0;

  if (!panel) return;

  function clearQrLayout() {
    activeQrPoint = null;
    panel.classList.remove("qr-point-panel");
    panel.style.removeProperty("--qr-panel-anchor-x");
    panel.style.removeProperty("--qr-panel-anchor-y");
    panel.style.removeProperty("--qr-panel-max-height");
    var badge = panel.querySelector(".qr-parent-badge");
    if (badge && badge.parentNode) badge.parentNode.removeChild(badge);
  }

  function sameText(a, b) {
    return String(a || "").trim() === String(b || "").trim();
  }

  function findQrContext(title, media, qrid) {
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
          return { point: child, parent: parent };
        }

        if (
          today &&
          child.media &&
          child.media.oggi &&
          String(child.media.oggi) === today
        ) {
          return { point: child, parent: parent };
        }

        if (!titleMatch && sameText(child.label, title)) {
          titleMatch = { point: child, parent: parent };
        }
      }
    }

    return titleMatch;
  }

  function syncParentBadge(parent) {
    var header = panel.querySelector("header");
    if (!header) return;

    var label = String((parent && (parent.label || parent.id)) || "").trim();
    var id = String((parent && parent.id) || "").trim();
    var badge = header.querySelector(".qr-parent-badge");

    if (!label) {
      if (badge && badge.parentNode) badge.parentNode.removeChild(badge);
      return;
    }

    if (!badge) {
      badge = document.createElement("span");
      badge.className = "qr-parent-badge";
      header.appendChild(badge);
    }

    badge.textContent = label;
    badge.setAttribute("data-qr-parent-id", id);
    badge.setAttribute("data-qr-parent-label", label);
    badge.setAttribute("title", "Area: " + label);
    badge.setAttribute("aria-label", "Area: " + label);
  }

  /*
   * Ancora il bordo inferiore del pannello poco sopra il marker QR.
   *
   * I marker dei singoli Punti QR usano normalmente un'icona alta 26 px con
   * iconAnchor sul bordo inferiore. Il loro LatLng corrisponde quindi alla base
   * dell'icona. Lasciamo 10 px di aria sopra l'icona: 26 + 10 = 36 px.
   *
   * Le coordinate sono calcolate sul rettangolo REALE del contenitore mappa,
   * non sull'intera finestra del browser.
   */
  function updatePanelAnchor() {
    var map = getMap();
    if (!map) return;

    var container = null;
    try { container = map.getContainer && map.getContainer(); } catch (_) {}
    if (!container || !container.getBoundingClientRect) return;

    var rect = container.getBoundingClientRect();
    var width = Number(rect.width);
    var height = Number(rect.height);
    if (!isFinite(width) || !isFinite(height) || width <= 0 || height <= 0) return;

    var markerX = rect.left + width * 0.50;
    var markerY = rect.top + height * 0.70;
    var markerIconHeight = 26;
    var visualGap = 10;
    var panelBottomY = markerY - markerIconHeight - visualGap;
    var topMargin = 12;
    var availableHeight = Math.max(180, panelBottomY - rect.top - topMargin);

    panel.style.setProperty("--qr-panel-anchor-x", Math.round(markerX) + "px");
    panel.style.setProperty("--qr-panel-anchor-y", Math.round(panelBottomY) + "px");
    panel.style.setProperty("--qr-panel-max-height", Math.round(availableHeight) + "px");
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

  var QR_MEDIA_UI = {
    it: {
      compare: "Confronta",
      audioguide: "Audioguida",
      minidoc: "MiniDoc",
      share: "Condividi",
      sharePoint: "Condividi questo punto",
      comingSoon: "In arrivo",
      actionsAria: "Strumenti multimediali del punto QR"
    },
    en: {
      compare: "Compare",
      audioguide: "Audio guide",
      minidoc: "Mini-documentary",
      share: "Share",
      sharePoint: "Share this point",
      comingSoon: "Coming soon",
      actionsAria: "Multimedia tools for this QR point"
    },
    es: {
      compare: "Comparar",
      audioguide: "Audioguía",
      minidoc: "Mini documental",
      share: "Compartir",
      sharePoint: "Compartir este punto",
      comingSoon: "Próximamente",
      actionsAria: "Herramientas multimedia de este punto QR"
    },
    fr: {
      compare: "Comparer",
      audioguide: "Audioguide",
      minidoc: "Mini-documentaire",
      share: "Partager",
      sharePoint: "Partager ce point",
      comingSoon: "Bientôt disponible",
      actionsAria: "Outils multimédias de ce point QR"
    },
    ar: {
      compare: "مقارنة",
      audioguide: "دليل صوتي",
      minidoc: "وثائقي قصير",
      share: "مشاركة",
      sharePoint: "مشاركة هذه النقطة",
      comingSoon: "قريبًا",
      actionsAria: "أدوات الوسائط المتعددة لنقطة QR هذه"
    },
    ru: {
      compare: "Сравнить",
      audioguide: "Аудиогид",
      minidoc: "Мини-док",
      share: "Поделиться",
      sharePoint: "Поделиться этой точкой",
      comingSoon: "Скоро",
      actionsAria: "Мультимедийные инструменты этой QR-точки"
    },
    zh: {
      compare: "对比",
      audioguide: "语音导览",
      minidoc: "迷你纪录片",
      share: "分享",
      sharePoint: "分享此地点",
      comingSoon: "即将推出",
      actionsAria: "此 QR 点的多媒体工具"
    },
    lij: {
      compare: "Confronta",
      audioguide: "Audioguida",
      minidoc: "MiniDoc",
      share: "Condividdi",
      sharePoint: "Condividdi sto ponto",
      comingSoon: "Presto",
      actionsAria: "Strumenti multimediali do ponto QR"
    }
  };

  function currentQrUiLanguage(forced) {
    var value = forced || "";
    if (!value) {
      try {
        value = localStorage.getItem("lang") || document.documentElement.getAttribute("lang") || "it";
      } catch (_) {
        value = document.documentElement.getAttribute("lang") || "it";
      }
    }
    value = String(value || "it").toLowerCase();
    if (value.indexOf("lij") === 0) return "lij";
    value = value.split("-")[0];
    return QR_MEDIA_UI[value] ? value : "it";
  }

  function qrUiStrings(forced) {
    var code = currentQrUiLanguage(forced);
    return { code: code, text: QR_MEDIA_UI[code] || QR_MEDIA_UI.it };
  }

  function audioGuideIcon() {
    return '<svg class="qr-action-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 13v-1a8 8 0 0 1 16 0v1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><rect x="3" y="12" width="4" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="1.9"/><rect x="17" y="12" width="4" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M19 19c0 1.1-.9 2-2 2h-3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>';
  }

  function miniDocIcon() {
    return '<svg class="qr-action-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9h18M7 5l2.3 4M13 5l2.3 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10 12.2v4.2l4-2.1-4-2.1z" fill="currentColor"/></svg>';
  }

  function shareIcon() {
    return '<svg class="qr-share-ico qr-action-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 7.91a3 3 0 1 0-3-3c0 .24.04.47.09.7L8.04 9.72A2.99 2.99 0 0 0 6 8.91a3 3 0 1 0 0 6c.96 0 1.82-.45 2.37-1.15l6.98 4.07c-.05.21-.08.43-.08.65a3 3 0 1 0 3-3z"/></svg>';
  }

  function ensurePlaceholderButton(id, key, className, iconMarkup) {
    var button = document.getElementById(id);
    if (!button) {
      button = document.createElement("button");
      button.id = id;
      button.type = "button";
      button.className = "btn qr-placeholder-action " + className;
      button.setAttribute("aria-disabled", "true");
      button.setAttribute("data-qr-placeholder", "true");
    }

    button.setAttribute("data-qr-i18n-key", key);
    if (iconMarkup) {
      button.innerHTML = iconMarkup + '<span class="qr-action-label"></span>';
    }

    if (!button.__qrPlaceholderBlocked) {
      button.__qrPlaceholderBlocked = true;
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    }
    return button;
  }

  function applyMultimediaI18n(forced) {
    var ui = qrUiStrings(forced);
    var code = ui.code;
    var T = ui.text;

    var compare = document.getElementById("btn-compare-qr");
    if (compare) {
      compare.textContent = T.compare;
      compare.title = T.compare + " — " + T.comingSoon;
      compare.setAttribute("aria-label", T.compare + ". " + T.comingSoon);
    }

    var audio = document.getElementById("btn-audioguide-qr");
    if (audio) {
      var audioLabel = audio.querySelector(".qr-action-label");
      if (audioLabel) audioLabel.textContent = T.audioguide;
      audio.title = T.audioguide + " — " + T.comingSoon;
      audio.setAttribute("aria-label", T.audioguide + ". " + T.comingSoon);
    }

    var miniDoc = document.getElementById("btn-minidoc-qr");
    if (miniDoc) {
      var miniLabel = miniDoc.querySelector(".qr-action-label");
      if (miniLabel) miniLabel.textContent = T.minidoc;
      miniDoc.title = T.minidoc + " — " + T.comingSoon;
      miniDoc.setAttribute("aria-label", T.minidoc + ". " + T.comingSoon);
    }

    var share = document.getElementById("btn-share-qr");
    if (share) {
      var shareLabel = share.querySelector(".qr-share-label");
      if (shareLabel) shareLabel.textContent = T.share;
      share.title = T.sharePoint;
      share.setAttribute("aria-label", T.sharePoint);
    }

    var actions = panel.querySelector(".qr-extra-actions");
    if (actions) {
      actions.setAttribute("aria-label", T.actionsAria);
      actions.setAttribute("lang", code);
      actions.setAttribute("dir", code === "ar" ? "rtl" : "ltr");
    }
  }

  /*
   * Nuova barra multimediale QR.
   *
   * Riga 1 (subito sotto il riquadro media): Oggi / Ieri / SFX / Confronta.
   * Riga 2 (sotto la descrizione): Audioguida / MiniDoc / Condividi.
   *
   * Confronta, Audioguida e MiniDoc sono volutamente placeholder inattivi:
   * la struttura e' pronta, ma nessun Punto QR deve ancora dichiarare nuovi
   * media o collegamenti. Il bottone Condividi conserva invece tutta la logica
   * esistente e viene soltanto spostato nella nuova riga inferiore.
   */
  function ensureMultimediaControls() {
    var swap = panel.querySelector(".swap");
    var description = document.getElementById("place-desc");
    if (!swap || !description) return;

    var compare = ensurePlaceholderButton(
      "btn-compare-qr",
      "compare",
      "qr-compare-placeholder",
      ""
    );
    if (compare.parentNode !== swap) swap.appendChild(compare);

    var actions = panel.querySelector(".qr-extra-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "qr-extra-actions";
      if (description.nextSibling) {
        description.parentNode.insertBefore(actions, description.nextSibling);
      } else {
        description.parentNode.appendChild(actions);
      }
    }

    var audio = ensurePlaceholderButton(
      "btn-audioguide-qr",
      "audioguide",
      "qr-audioguide-placeholder qr-extra-action",
      audioGuideIcon()
    );
    var miniDoc = ensurePlaceholderButton(
      "btn-minidoc-qr",
      "minidoc",
      "qr-minidoc-placeholder qr-extra-action",
      miniDocIcon()
    );

    actions.appendChild(audio);
    actions.appendChild(miniDoc);

    var share = document.getElementById("btn-share-qr");
    if (share) {
      share.classList.add("qr-extra-action", "qr-share-action");
      share.innerHTML = shareIcon() + '<span class="qr-share-label qr-action-label"></span>';
      actions.appendChild(share);
    }

    applyMultimediaI18n();
  }

  function preparePanel(point, parent) {
    activeQrPoint = point;
    panel.classList.add("qr-point-panel");
    updatePanelAnchor();
    if (parent) syncParentBadge(parent);
  }

  function installWrapper() {
    var original = window.__qrOpenChildPanel;
    if (typeof original !== "function") return false;
    if (original.__qrCenteredLayout) return true;

    function openQrPanel(title, descr, media, qrid) {
      var context = findQrContext(title, media, qrid);
      var point = context && context.point;
      var parent = context && context.parent;
      if (!point) {
        clearQrLayout();
        return original.apply(this, arguments);
      }

      preparePanel(point, parent);

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
      syncParentBadge(parent);
      ensureMultimediaControls();

      focusQrPoint(point, function () {
        preparePanel(point, parent);
        ensureMultimediaControls();
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

  document.addEventListener("app:set-lang", function (event) {
    var detail = event && event.detail;
    applyMultimediaI18n(detail && detail.lang);
  });

  window.addEventListener("i18n:changed", function () {
    applyMultimediaI18n();
  });

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
        updatePanelAnchor();
        focusQrPoint(activeQrPoint, function () {
          updatePanelAnchor();
        }, { animate: false, keepZoom: true });
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
        updatePanelAnchor();
        focusQrPoint(activeQrPoint, function () {
          updatePanelAnchor();
        }, { animate: false, keepZoom: true });
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
