(function () {
  "use strict";

  var panel = document.getElementById("panel");
  var activeQrPoint = null;
  var activeQrParent = null;
  var activeQrId = "";
  var activeCompareSpec = null;
  var compareCheckToken = 0;
  var compareAvailabilityCache = Object.create(null);
  var compareSyncRaf = 0;
  var resizeTimer = 0;

  if (!panel) return;

  function clearQrLayout() {
    resetCompareMode(true);
    compareCheckToken++;
    activeQrPoint = null;
    activeQrParent = null;
    activeQrId = "";
    activeCompareSpec = null;
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
  /*
   * Posizione verticale responsive dei Punti QR.
   * - schermi stretti/mobile (<= 768 px): 80% dall'alto
   * - schermi larghi/desktop:            75% dall'alto
   *
   * Lo stesso valore viene usato sia per il centraggio Leaflet sia per
   * l'ancoraggio del pannello, cosi' marker e pannello restano allineati.
   */
  function qrMarkerYRatio() {
    try {
      if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) return 0.80;
    } catch (_) {}
    try {
      if (isFinite(window.innerWidth) && window.innerWidth <= 768) return 0.80;
    } catch (_) {}
    return 0.75;
  }

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
    var markerY = rect.top + height * qrMarkerYRatio();
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
   * Y = 80% dall'alto su schermi <= 768 px, 75% su schermi piu' larghi.
   *
   * Invece di spostare graficamente il marker, calcoliamo il centro geografico
   * che deve avere la mappa affinche' quel marker cada esattamente nella
   * posizione responsive prevista nel contenitore Leaflet.
   */
  function centerForQrPoint(map, point, zoom) {
    if (!window.L || !window.L.point || !window.L.latLng) return null;

    var size = map.getSize();
    if (!size || !isFinite(size.x) || !isFinite(size.y) || size.x <= 0 || size.y <= 0) return null;

    var latlng = window.L.latLng(Number(point.lat), Number(point.lng));
    var projectedTarget = map.project(latlng, zoom);
    var desired = window.L.point(size.x * 0.50, size.y * qrMarkerYRatio());
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

  var QR_COMPARE_UI = {
    it: { today:"Oggi", past:"Ieri", play:"Riproduci confronto", pause:"Metti in pausa il confronto" },
    en: { today:"Today", past:"Past", play:"Play comparison", pause:"Pause comparison" },
    es: { today:"Hoy", past:"Ayer", play:"Reproducir comparación", pause:"Pausar comparación" },
    fr: { today:"Aujourd’hui", past:"Hier", play:"Lire la comparaison", pause:"Mettre la comparaison en pause" },
    ar: { today:"اليوم", past:"أمس", play:"تشغيل المقارنة", pause:"إيقاف المقارنة مؤقتًا" },
    ru: { today:"Сегодня", past:"Вчера", play:"Воспроизвести сравнение", pause:"Пауза сравнения" },
    zh: { today:"今天", past:"过去", play:"播放对比", pause:"暂停对比" },
    lij: { today:"Ancöe", past:"Véi", play:"Reproduxi o confronto", pause:"Mette in pösa o confronto" }
  };

  function compareUiStrings(forced) {
    var code = currentQrUiLanguage(forced);
    return QR_COMPARE_UI[code] || QR_COMPARE_UI.it;
  }

  function stableQrId(point, parent, qrid) {
    var id = String(qrid || "").trim().replace(/^\/+|\/+$/g, "");
    if (id.indexOf("/") > 0) return id;
    var parentId = String((parent && parent.id) || "").trim();
    var childId = String((point && point.id) || "").trim();
    return parentId && childId ? parentId + "/" + childId : "";
  }

  function compareSpecFor(point, parent, media, qrid) {
    var explicit = media && media.confronta;
    var today = "";
    var past = "";

    if (explicit && typeof explicit === "object") {
      today = String(explicit.oggi || explicit.today || explicit.presente || explicit.current || "").trim();
      past = String(explicit.ieri || explicit.past || explicit.storico || explicit.history || "").trim();
    } else if (typeof explicit === "string" && explicit.trim()) {
      var base = explicit.trim().replace(/\/+$/g, "");
      today = base + "/oggi.mp4";
      past = base + "/ieri.mp4";
    }

    var id = stableQrId(point, parent, qrid);
    if ((!today || !past) && id) {
      var parts = id.split("/");
      if (parts.length >= 2) {
        var root = String(window.__QR_COMPARE_ROOT || "/qr_confronta").replace(/\/+$/g, "");
        // Il percorso convenzionale e' assoluto rispetto alla root del sito,
        // cosi' resta corretto anche se l'app viene aperta da URL non-root.
        if (!/^https?:\/\//i.test(root) && root.charAt(0) !== "/") root = "/" + root;
        var parentId = encodeURIComponent(parts[0]);
        var childId = encodeURIComponent(parts.slice(1).join("/"));
        var folder = root + "/" + parentId + "/" + childId;
        today = today || folder + "/oggi.mp4";
        past = past || folder + "/ieri.mp4";
      }
    }

    if (!today || !past) return null;
    return { id: id, today: today, past: past };
  }

  function urlExists(url) {
    if (!url || typeof window.fetch !== "function") return Promise.resolve(false);
    if (compareAvailabilityCache[url]) return compareAvailabilityCache[url];

    /*
     * Non usiamo HEAD: alcuni hosting/CDN possono trattarlo diversamente dai
     * normali GET degli MP4. Facciamo invece un GET minimale con Range e
     * no-store, poi annulliamo subito il body. In questo modo controlliamo
     * esattamente lo stesso URL che usera' il player senza scaricare il video.
     */
    var check = window.fetch(url, {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
      headers: { "Range": "bytes=0-1" }
    }).then(function (response) {
      if (!response || !response.ok) return false;
      var type = String(response.headers && response.headers.get ? (response.headers.get("content-type") || "") : "").toLowerCase();
      // Evita falsi positivi se un hosting restituisce index.html con status 200.
      if (type.indexOf("text/html") !== -1) return false;
      try {
        if (response.body && typeof response.body.cancel === "function") response.body.cancel();
      } catch (_) {}
      return true;
    }).catch(function () { return false; }).then(function (ready) {
      // Manteniamo in cache solo i successi: un 404 temporaneo non deve
      // bloccare il bottone fino al successivo reload della pagina.
      if (!ready) delete compareAvailabilityCache[url];
      return ready;
    });

    compareAvailabilityCache[url] = check;
    return check;
  }

  function setCompareButtonReady(ready) {
    var button = document.getElementById("btn-compare-qr");
    if (!button) return;
    button.setAttribute("data-qr-compare-ready", ready ? "true" : "false");
    button.setAttribute("aria-disabled", ready ? "false" : "true");
    button.classList.toggle("qr-placeholder-action", !ready);
    if (!ready) button.classList.remove("active");
    applyMultimediaI18n();
  }

  function prepareCompareForPoint(point, parent, media, qrid) {
    resetCompareMode(true);
    activeQrParent = parent || null;
    activeQrId = stableQrId(point, parent, qrid);
    activeCompareSpec = compareSpecFor(point, parent, media, activeQrId);
    var token = ++compareCheckToken;
    setCompareButtonReady(false);

    if (!activeCompareSpec) return;
    var expectedId = activeQrId;
    Promise.all([urlExists(activeCompareSpec.today), urlExists(activeCompareSpec.past)])
      .then(function (results) {
        if (token !== compareCheckToken || expectedId !== activeQrId) return;
        setCompareButtonReady(!!(results[0] && results[1]));
      });
  }

  function formatCompareTime(value) {
    value = Math.max(0, Number(value) || 0);
    var minutes = Math.floor(value / 60);
    var seconds = Math.floor(value % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function updateComparePosition(percent) {
    var stage = panel.querySelector(".qr-compare-stage");
    if (!stage) return;
    percent = Math.max(1, Math.min(99, Number(percent) || 50));
    stage.style.setProperty("--qr-compare-pos", percent.toFixed(2) + "%");
    var divider = stage.querySelector(".qr-compare-divider");
    if (divider) divider.setAttribute("aria-valuenow", String(Math.round(percent)));
  }

  function updateCompareTime() {
    var stage = panel.querySelector(".qr-compare-stage");
    if (!stage) return;
    var master = stage.querySelector('[data-qr-compare-role="today"]');
    var out = stage.querySelector(".qr-compare-time");
    if (!master || !out) return;
    var duration = isFinite(master.duration) ? master.duration : 0;
    out.textContent = formatCompareTime(master.currentTime) + (duration ? " / " + formatCompareTime(duration) : "");
  }

  function updateComparePlayButton(forced) {
    var stage = panel.querySelector(".qr-compare-stage");
    if (!stage) return;
    var master = stage.querySelector('[data-qr-compare-role="today"]');
    var button = stage.querySelector(".qr-compare-play");
    if (!master || !button) return;
    var playing = typeof forced === "boolean" ? forced : !master.paused;
    var T = compareUiStrings();
    button.textContent = playing ? "❚❚" : "▶";
    button.setAttribute("aria-label", playing ? T.pause : T.play);
    button.title = playing ? T.pause : T.play;
  }

  function stopCompareSyncLoop() {
    if (compareSyncRaf) {
      try { window.cancelAnimationFrame(compareSyncRaf); } catch (_) {}
      compareSyncRaf = 0;
    }
  }

  function startCompareSyncLoop() {
    stopCompareSyncLoop();
    function tick() {
      if (!panel.classList.contains("qr-compare-active")) {
        compareSyncRaf = 0;
        return;
      }
      var stage = panel.querySelector(".qr-compare-stage");
      var master = stage && stage.querySelector('[data-qr-compare-role="today"]');
      var slave = stage && stage.querySelector('[data-qr-compare-role="past"]');
      if (master && slave && !master.paused) {
        try {
          if (Math.abs((slave.currentTime || 0) - (master.currentTime || 0)) > 0.10) {
            slave.currentTime = master.currentTime || 0;
          }
          if (slave.paused) {
            var p = slave.play();
            if (p && typeof p.catch === "function") p.catch(function () {});
          }
        } catch (_) {}
        updateCompareTime();
      }
      compareSyncRaf = window.requestAnimationFrame(tick);
    }
    compareSyncRaf = window.requestAnimationFrame(tick);
  }

  function playCompareVideos() {
    var stage = panel.querySelector(".qr-compare-stage");
    if (!stage) return;
    var master = stage.querySelector('[data-qr-compare-role="today"]');
    var slave = stage.querySelector('[data-qr-compare-role="past"]');
    if (!master || !slave) return;
    try { slave.currentTime = master.currentTime || 0; } catch (_) {}
    try {
      var p1 = master.play();
      if (p1 && typeof p1.catch === "function") p1.catch(function () { updateComparePlayButton(false); });
    } catch (_) {}
    try {
      var p2 = slave.play();
      if (p2 && typeof p2.catch === "function") p2.catch(function () {});
    } catch (_) {}
    updateComparePlayButton(true);
    startCompareSyncLoop();
  }

  function pauseCompareVideos() {
    var stage = panel.querySelector(".qr-compare-stage");
    if (!stage) return;
    var master = stage.querySelector('[data-qr-compare-role="today"]');
    var slave = stage.querySelector('[data-qr-compare-role="past"]');
    try { if (master) master.pause(); } catch (_) {}
    try { if (slave) slave.pause(); } catch (_) {}
    stopCompareSyncLoop();
    updateComparePlayButton(false);
    updateCompareTime();
  }

  function resetCompareMode(clearSources) {
    pauseCompareVideos();
    panel.classList.remove("qr-compare-active");
    var compare = document.getElementById("btn-compare-qr");
    if (compare) compare.classList.remove("active");
    var stage = panel.querySelector(".qr-compare-stage");
    if (stage) {
      stage.classList.remove("is-loading");
      stage.setAttribute("aria-hidden", "true");
      if (clearSources) {
        var videos = stage.querySelectorAll("video");
        for (var i = 0; i < videos.length; i++) {
          try {
            videos[i].pause();
            videos[i].removeAttribute("src");
            videos[i].load();
          } catch (_) {}
        }
        stage.setAttribute("data-qr-compare-id", "");
      }
    }
  }

  function ensureCompareStage() {
    var mediaWrap = panel.querySelector(".media");
    if (!mediaWrap) return null;
    var stage = mediaWrap.querySelector(".qr-compare-stage");
    if (stage) return stage;

    stage = document.createElement("div");
    stage.className = "qr-compare-stage";
    stage.setAttribute("aria-hidden", "true");
    stage.innerHTML =
      '<video class="qr-compare-video qr-compare-today" data-qr-compare-role="today" muted loop playsinline preload="metadata"></video>' +
      '<video class="qr-compare-video qr-compare-past" data-qr-compare-role="past" muted loop playsinline preload="metadata"></video>' +
      '<span class="qr-compare-label qr-compare-label-past"></span>' +
      '<span class="qr-compare-label qr-compare-label-today"></span>' +
      '<div class="qr-compare-divider" role="slider" tabindex="0" aria-valuemin="1" aria-valuemax="99" aria-valuenow="50" aria-orientation="horizontal"><span class="qr-compare-handle" aria-hidden="true">↔</span></div>' +
      '<div class="qr-compare-playback"><button class="qr-compare-play" type="button">▶</button><span class="qr-compare-time">0:00</span></div>';
    mediaWrap.appendChild(stage);
    updateComparePosition(50);

    var divider = stage.querySelector(".qr-compare-divider");
    var playButton = stage.querySelector(".qr-compare-play");
    var master = stage.querySelector('[data-qr-compare-role="today"]');
    var slave = stage.querySelector('[data-qr-compare-role="past"]');
    var dragging = false;

    function percentFromClientX(clientX) {
      var rect = stage.getBoundingClientRect();
      if (!rect.width) return 50;
      return ((clientX - rect.left) / rect.width) * 100;
    }

    if (divider) {
      divider.addEventListener("pointerdown", function (event) {
        dragging = true;
        try { divider.setPointerCapture(event.pointerId); } catch (_) {}
        updateComparePosition(percentFromClientX(event.clientX));
        event.preventDefault();
      });
      divider.addEventListener("pointermove", function (event) {
        if (!dragging) return;
        updateComparePosition(percentFromClientX(event.clientX));
        event.preventDefault();
      });
      function stopDrag(event) {
        dragging = false;
        try { divider.releasePointerCapture(event.pointerId); } catch (_) {}
      }
      divider.addEventListener("pointerup", stopDrag);
      divider.addEventListener("pointercancel", stopDrag);
      divider.addEventListener("keydown", function (event) {
        var current = parseFloat((stage.style.getPropertyValue("--qr-compare-pos") || "50").replace("%", "")) || 50;
        var next = current;
        if (event.key === "ArrowLeft") next = current - 2;
        else if (event.key === "ArrowRight") next = current + 2;
        else if (event.key === "Home") next = 1;
        else if (event.key === "End") next = 99;
        else return;
        updateComparePosition(next);
        event.preventDefault();
      });
    }

    if (playButton) {
      playButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (master && !master.paused) pauseCompareVideos();
        else playCompareVideos();
      });
    }

    if (master && slave) {
      master.addEventListener("play", function () {
        try {
          if (slave.paused) {
            var p = slave.play();
            if (p && typeof p.catch === "function") p.catch(function () {});
          }
        } catch (_) {}
        updateComparePlayButton(true);
        startCompareSyncLoop();
      });
      master.addEventListener("pause", function () {
        try { slave.pause(); } catch (_) {}
        updateComparePlayButton(false);
        stopCompareSyncLoop();
      });
      master.addEventListener("seeking", function () {
        try { slave.currentTime = master.currentTime || 0; } catch (_) {}
        updateCompareTime();
      });
      master.addEventListener("timeupdate", updateCompareTime);
      master.addEventListener("loadedmetadata", updateCompareTime);
      slave.addEventListener("loadedmetadata", function () {
        try { slave.currentTime = master.currentTime || 0; } catch (_) {}
      });
      function compareMediaError() {
        if (!panel.classList.contains("qr-compare-active")) return;
        stage.classList.remove("is-loading");
        resetCompareMode(false);
        setCompareButtonReady(false);
      }
      master.addEventListener("error", compareMediaError);
      slave.addEventListener("error", compareMediaError);
    }

    return stage;
  }

  function enterCompareMode() {
    var button = document.getElementById("btn-compare-qr");
    if (!button || button.getAttribute("data-qr-compare-ready") !== "true" || !activeCompareSpec) return;
    var stage = ensureCompareStage();
    if (!stage) return;

    var master = stage.querySelector('[data-qr-compare-role="today"]');
    var slave = stage.querySelector('[data-qr-compare-role="past"]');
    if (!master || !slave) return;

    var loadedId = stage.getAttribute("data-qr-compare-id") || "";
    if (loadedId !== activeCompareSpec.id) {
      pauseCompareVideos();
      stage.classList.add("is-loading");
      stage.setAttribute("data-qr-compare-id", activeCompareSpec.id || "");
      master.src = activeCompareSpec.today;
      slave.src = activeCompareSpec.past;
      try { master.load(); slave.load(); } catch (_) {}
      updateComparePosition(50);
      var pending = 2;
      function readyOne() {
        pending--;
        if (pending <= 0) stage.classList.remove("is-loading");
      }
      master.addEventListener("canplay", readyOne, { once: true });
      slave.addEventListener("canplay", readyOne, { once: true });
    }

    var standardToday = document.getElementById("media-video-today");
    var standardPast = document.getElementById("media-video");
    try { if (standardToday) standardToday.pause(); } catch (_) {}
    try { if (standardPast) standardPast.pause(); } catch (_) {}

    panel.classList.add("qr-compare-active");
    stage.setAttribute("aria-hidden", "false");
    var today = document.getElementById("btn-today");
    var past = document.getElementById("btn-past");
    var sfx = document.getElementById("btn-sfx");
    if (today) today.classList.remove("active");
    if (past) past.classList.remove("active");
    if (sfx) sfx.classList.remove("active");
    button.classList.add("active");
    updateComparePosition(50);
    applyMultimediaI18n();
    playCompareVideos();
  }

  function wireStandardModeExit() {
    ["btn-today", "btn-past", "btn-sfx"].forEach(function (id) {
      var button = document.getElementById(id);
      if (!button || typeof button.onclick !== "function" || button.onclick.__qrCompareExitWrapped) return;
      var original = button.onclick;
      function wrapped(event) {
        resetCompareMode(false);
        return original.call(this, event);
      }
      wrapped.__qrCompareExitWrapped = true;
      button.onclick = wrapped;
    });
  }

  function applyMultimediaI18n(forced) {
    var ui = qrUiStrings(forced);
    var code = ui.code;
    var T = ui.text;

    var compare = document.getElementById("btn-compare-qr");
    if (compare) {
      var compareReady = compare.getAttribute("data-qr-compare-ready") === "true";
      compare.textContent = T.compare;
      compare.title = compareReady ? T.compare : (T.compare + " — " + T.comingSoon);
      compare.setAttribute("aria-label", compareReady ? T.compare : (T.compare + ". " + T.comingSoon));
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

    var stage = panel.querySelector(".qr-compare-stage");
    if (stage) {
      var C = compareUiStrings(forced);
      var pastLabel = stage.querySelector(".qr-compare-label-past");
      var todayLabel = stage.querySelector(".qr-compare-label-today");
      if (pastLabel) pastLabel.textContent = C.past;
      if (todayLabel) todayLabel.textContent = C.today;
      updateComparePlayButton();
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
   * Confronta viene abilitato automaticamente quando trova entrambi i video
   * nella cartella convenzionale qr_confronta/<parent>/<child>/ (o quando il
   * Punto QR dichiara media.confronta). Audioguida e MiniDoc restano invece
   * placeholder inattivi. Condividi conserva tutta la logica esistente.
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
    if (!compare.__qrCompareBound) {
      compare.__qrCompareBound = true;
      compare.addEventListener("click", function (event) {
        if (compare.getAttribute("data-qr-compare-ready") !== "true") return;
        event.preventDefault();
        event.stopPropagation();
        enterCompareMode();
      });
    }

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

    ensureCompareStage();
    wireStandardModeExit();
    applyMultimediaI18n();
  }

  function preparePanel(point, parent) {
    activeQrPoint = point;
    activeQrParent = parent || null;
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

      resetCompareMode(true);
      compareCheckToken++;
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
      prepareCompareForPoint(point, parent, media, qrid);

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
