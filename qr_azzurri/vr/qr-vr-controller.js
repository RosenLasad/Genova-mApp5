(function () {
  "use strict";

  var activeKey = "";
  var activeSpec = null;
  var activeTitle = "";
  var viewer = null;
  var overlay = null;
  var availabilityToken = 0;
  var availabilityCache = Object.create(null);
  var hintTimer = 0;

  var I18N = {
    it: { vr:"VR", loading:"Caricamento del video...", close:"Chiudi", gyro:"Giroscopio", gyroOff:"Disattiva giroscopio", sound:"Audio", mute:"Disattiva audio", unmute:"Attiva audio", fullscreen:"Schermo intero", exitFullscreen:"Esci da schermo intero", hint:"Muovi lo smartphone per guardarti intorno oppure trascina la scena con il dito.", error:"Impossibile caricare il contenuto VR." },
    en: { vr:"VR", loading:"Loading video...", close:"Close", gyro:"Gyroscope", gyroOff:"Disable gyroscope", sound:"Audio", mute:"Mute audio", unmute:"Enable audio", fullscreen:"Fullscreen", exitFullscreen:"Exit fullscreen", hint:"Move your phone to look around, or drag the scene with your finger.", error:"Unable to load VR content." },
    es: { vr:"VR", loading:"Cargando vídeo...", close:"Cerrar", gyro:"Giroscopio", gyroOff:"Desactivar giroscopio", sound:"Audio", mute:"Silenciar audio", unmute:"Activar audio", fullscreen:"Pantalla completa", exitFullscreen:"Salir de pantalla completa", hint:"Mueve el teléfono para mirar alrededor o arrastra la escena con el dedo.", error:"No se puede cargar el contenido VR." },
    fr: { vr:"VR", loading:"Chargement de la vidéo...", close:"Fermer", gyro:"Gyroscope", gyroOff:"Désactiver le gyroscope", sound:"Audio", mute:"Couper le son", unmute:"Activer le son", fullscreen:"Plein écran", exitFullscreen:"Quitter le plein écran", hint:"Bougez le téléphone pour regarder autour de vous ou faites glisser la scène avec le doigt.", error:"Impossible de charger le contenu VR." },
    ar: { vr:"VR", loading:"جارٍ تحميل الفيديو...", close:"إغلاق", gyro:"الجيروسكوب", gyroOff:"إيقاف الجيروسكوب", sound:"الصوت", mute:"كتم الصوت", unmute:"تشغيل الصوت", fullscreen:"ملء الشاشة", exitFullscreen:"الخروج من ملء الشاشة", hint:"حرّك الهاتف للنظر حولك أو اسحب المشهد بإصبعك.", error:"تعذر تحميل محتوى VR." },
    ru: { vr:"VR", loading:"Загрузка видео...", close:"Закрыть", gyro:"Гироскоп", gyroOff:"Выключить гироскоп", sound:"Звук", mute:"Выключить звук", unmute:"Включить звук", fullscreen:"На весь экран", exitFullscreen:"Выйти из полноэкранного режима", hint:"Двигайте смартфон, чтобы осматриваться, или перетаскивайте сцену пальцем.", error:"Не удалось загрузить VR-контент." },
    zh: { vr:"VR", loading:"正在加载视频...", close:"关闭", gyro:"陀螺仪", gyroOff:"关闭陀螺仪", sound:"声音", mute:"静音", unmute:"开启声音", fullscreen:"全屏", exitFullscreen:"退出全屏", hint:"移动手机环顾四周，或用手指拖动场景。", error:"无法加载 VR 内容。" },
    lij: { vr:"VR", loading:"Caregamento do video...", close:"Særa", gyro:"Giroscopio", gyroOff:"Disattiva giroscopio", sound:"Audio", mute:"Disattiva audio", unmute:"Attiva audio", fullscreen:"Schermo intrego", exitFullscreen:"Sciorti da-o schermo intrego", hint:"Mescia o telefonin pe vardâse in gio oppure strascinna a scena co-o dido.", error:"No se riesce a caregâ o contegnuo VR." }
  };

  function language() {
    var code = "it";
    try { code = (localStorage.getItem("lang") || document.documentElement.lang || "it").toLowerCase(); } catch (_) {}
    if (code.indexOf("zh") === 0) code = "zh";
    else if (code.indexOf("ar") === 0) code = "ar";
    else if (code.indexOf("ru") === 0) code = "ru";
    else if (code.indexOf("lij") === 0) code = "lij";
    else code = code.slice(0, 2);
    return I18N[code] ? code : "it";
  }
  function T() { return I18N[language()]; }

  function stableKey(point, parent, qrid) {
    var raw = String(qrid || "").trim();
    if (raw.indexOf("/") > 0) return raw;
    var pid = String(parent && parent.id || "").trim();
    var cid = String(point && point.id || "").trim();
    return pid && cid ? pid + "/" + cid : raw;
  }

  function configFor(key) {
    var registry = window.__QR_VR_POINTS || {};
    var spec = registry[key];
    return spec && String(spec.src || "").trim() ? spec : null;
  }

  function ensureButton() {
    var panel = document.getElementById("panel");
    var swap = panel && panel.querySelector(".swap");
    if (!swap) return null;
    var target = swap.querySelector(".qr-swap-right") || swap;
    var button = document.getElementById("btn-vr-qr");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.id = "btn-vr-qr";
      button.className = "btn qr-media-mode qr-media-vr";
      button.textContent = "VR";
      button.hidden = true;
      button.setAttribute("data-qr-access", "public");
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!activeSpec) return;
        openVr();
      });
    }
    var sfx = document.getElementById("btn-sfx");
    if (sfx && sfx.parentNode === target) target.insertBefore(button, sfx.nextSibling);
    else if (button.parentNode !== target) target.appendChild(button);
    return button;
  }

  function setButtonVisible(visible) {
    var button = ensureButton();
    if (!button) return;
    button.textContent = T().vr;
    button.title = T().vr;
    button.setAttribute("aria-label", T().vr);
    button.hidden = !visible;
    button.style.display = visible ? "" : "none";
    button.setAttribute("aria-hidden", visible ? "false" : "true");
    if (!visible) button.classList.remove("active");
  }

  function urlExists(url) {
    url = String(url || "").trim();
    if (!url) return Promise.resolve(false);
    if (availabilityCache[url] === true) return Promise.resolve(true);
    if (availabilityCache[url] && typeof availabilityCache[url].then === "function") return availabilityCache[url];

    /*
     * Come per la modalità Confronta, evitiamo HEAD: alcuni hosting/CDN
     * possono gestirlo diversamente dagli MP4. Un GET minimale con Range
     * verifica l'URL reale senza scaricare l'intero video.
     */
    var check = fetch(url, {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
      headers: { "Range": "bytes=0-1" }
    }).then(function (response) {
      if (!response || !response.ok) return false;
      var type = String(response.headers && response.headers.get ? (response.headers.get("content-type") || "") : "").toLowerCase();
      if (type.indexOf("text/html") !== -1) return false;
      try { if (response.body && typeof response.body.cancel === "function") response.body.cancel(); } catch (_) {}
      return true;
    }).catch(function () { return false; })
      .then(function (ok) {
        if (ok) availabilityCache[url] = true;
        else delete availabilityCache[url];
        return ok;
      });
    availabilityCache[url] = check;
    return check;
  }

  function prepare(point, parent, media, qrid) {
    closeVr(true);
    var key = stableKey(point, parent, qrid);
    var spec = configFor(key);
    activeKey = key;
    activeSpec = spec;
    activeTitle = String(point && (point.label || point.name || point.id) || "");
    var token = ++availabilityToken;
    setButtonVisible(false);
    if (!spec) return;

    var expected = key;
    urlExists(spec.src).then(function (ready) {
      if (token !== availabilityToken || activeKey !== expected) return;
      if (!ready) return;
      setButtonVisible(true);
    });
  }

  function clear() {
    ++availabilityToken;
    activeKey = "";
    activeSpec = null;
    activeTitle = "";
    setButtonVisible(false);
    closeVr(true);
  }

  function svgIcon(kind) {
    if (kind === "close") return "×";
    if (kind === "sound") return "🔊";
    if (kind === "mute") return "🔇";
    if (kind === "gyro") return "◉";
    if (kind === "fullscreen") return "⛶";
    return "•";
  }

  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.id = "qr-vr-overlay";
    overlay.className = "qr-vr-overlay";
    overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<div class="qr-vr-stage">' +
        '<canvas id="qr-vr-canvas" class="qr-vr-canvas"></canvas>' +
        '<div id="qr-vr-loader" class="qr-vr-loader" hidden></div>' +
        '<div id="qr-vr-error" class="qr-vr-error" hidden></div>' +
      '</div>' +
      '<div class="qr-vr-topbar">' +
        '<button id="qr-vr-close" class="qr-vr-icon-btn" type="button">×</button>' +
        '<div id="qr-vr-title" class="qr-vr-title"></div>' +
      '</div>' +
      '<div id="qr-vr-hint" class="qr-vr-hint" hidden></div>' +
      '<div class="qr-vr-controls">' +
        '<button id="qr-vr-sound" class="qr-vr-icon-btn" type="button">🔊</button>' +
        '<button id="qr-vr-gyro" class="qr-vr-icon-btn" type="button">◉</button>' +
        '<button id="qr-vr-fullscreen" class="qr-vr-icon-btn" type="button">⛶</button>' +
      '</div>';
    document.body.appendChild(overlay);

    document.getElementById("qr-vr-close").addEventListener("click", function () { closeVr(false); });
    document.getElementById("qr-vr-sound").addEventListener("click", function () {
      if (!viewer) return;
      viewer.toggleMuted();
      syncControls();
    });
    document.getElementById("qr-vr-gyro").addEventListener("click", function () {
      if (!viewer) return;
      if (viewer.gyro) {
        viewer.disableGyro();
        syncControls();
        return;
      }
      viewer.requestGyro().then(syncControls).catch(function () { syncControls(); });
    });
    document.getElementById("qr-vr-fullscreen").addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", syncControls);
    document.addEventListener("webkitfullscreenchange", syncControls);
    document.addEventListener("keydown", function (event) {
      if (!overlay || overlay.hidden || event.key !== "Escape") return;
      closeVr(false);
    });
    return overlay;
  }

  function fullscreenElement() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
  function toggleFullscreen() {
    if (!overlay) return;
    if (fullscreenElement() === overlay) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) try { exit.call(document); } catch (_) {}
      return;
    }
    var request = overlay.requestFullscreen || overlay.webkitRequestFullscreen;
    if (request) try { request.call(overlay); } catch (_) {}
  }

  function syncControls() {
    if (!overlay) return;
    var text = T();
    var sound = document.getElementById("qr-vr-sound");
    var gyro = document.getElementById("qr-vr-gyro");
    var full = document.getElementById("qr-vr-fullscreen");
    var close = document.getElementById("qr-vr-close");
    var hint = document.getElementById("qr-vr-hint");

    if (close) { close.title = text.close; close.setAttribute("aria-label", text.close); }
    if (sound && viewer) {
      var muted = viewer.isMuted();
      sound.textContent = svgIcon(muted ? "mute" : "sound");
      sound.title = muted ? text.unmute : text.mute;
      sound.setAttribute("aria-label", muted ? text.unmute : text.mute);
    }
    if (gyro) {
      var supported = !!(viewer && viewer.supportsGyro());
      gyro.hidden = !supported;
      gyro.style.display = supported ? "" : "none";
      gyro.classList.toggle("is-active", !!(viewer && viewer.gyro));
      gyro.title = viewer && viewer.gyro ? text.gyroOff : text.gyro;
      gyro.setAttribute("aria-label", gyro.title);
    }
    if (full) {
      var supportedFs = !!(overlay.requestFullscreen || overlay.webkitRequestFullscreen);
      full.hidden = !supportedFs;
      full.style.display = supportedFs ? "" : "none";
      var active = fullscreenElement() === overlay;
      full.classList.toggle("is-active", active);
      full.title = active ? text.exitFullscreen : text.fullscreen;
      full.setAttribute("aria-label", full.title);
    }
    if (hint && !hint.hidden) hint.textContent = text.hint;
  }

  function showHint() {
    if (!overlay) return;
    var hint = document.getElementById("qr-vr-hint");
    if (!hint) return;
    var mobile = false;
    try { mobile = window.matchMedia && window.matchMedia("(pointer: coarse)").matches; } catch (_) {}
    if (!mobile) return;
    hint.textContent = T().hint;
    hint.classList.remove("is-fading");
    hint.hidden = false;
    if (hintTimer) clearTimeout(hintTimer);
    hintTimer = setTimeout(function () {
      hint.classList.add("is-fading");
      setTimeout(function () { hint.hidden = true; hint.classList.remove("is-fading"); }, 400);
    }, 4200);
  }

  function pauseStandardMedia() {
    ["media-video-today", "media-video"].forEach(function (id) {
      var v = document.getElementById(id);
      try { if (v) v.pause(); } catch (_) {}
    });
  }

  function openVr() {
    if (!activeSpec || !window.VRViewer) return;
    ensureOverlay();
    pauseStandardMedia();
    overlay.hidden = false;
    document.documentElement.classList.add("qr-vr-open");
    document.body.classList.add("qr-vr-open");

    var title = document.getElementById("qr-vr-title");
    if (title) title.textContent = activeTitle || "VR";
    var loader = document.getElementById("qr-vr-loader");
    var error = document.getElementById("qr-vr-error");
    loader.textContent = T().loading;
    loader.hidden = false;
    error.hidden = true;

    if (viewer) { try { viewer.destroy(); } catch (_) {} viewer = null; }
    try {
      viewer = new window.VRViewer(document.getElementById("qr-vr-canvas"));
    } catch (e) {
      loader.hidden = true;
      error.textContent = T().error + " " + (e && e.message ? e.message : "");
      error.hidden = false;
      return;
    }

    var spec = activeSpec;
    var angle = isFinite(+spec.angle) ? +spec.angle : 180;
    var verticalAngle = isFinite(+spec.verticalAngle) ? +spec.verticalAngle : 120;
    var minYaw = spec.minYaw != null ? +spec.minYaw : -angle / 2;
    var maxYaw = spec.maxYaw != null ? +spec.maxYaw : angle / 2;
    var minPitch = spec.minPitch != null ? +spec.minPitch : -Math.min(80, verticalAngle / 2);
    var maxPitch = spec.maxPitch != null ? +spec.maxPitch : Math.min(80, verticalAngle / 2);

    viewer.setProjection(spec.projection || "flatvr");
    viewer.setContentAngle(angle);
    viewer.setVerticalAngle(verticalAngle);
    viewer.setLimits({ minYaw:minYaw, maxYaw:maxYaw, minPitch:minPitch, maxPitch:maxPitch });
    viewer.setView({ yaw:spec.yaw || 0, pitch:spec.pitch || 0, fov:spec.fov != null ? spec.fov : 80 });
    viewer.onMuteChange = syncControls;
    syncControls();

    viewer.load(spec.src, spec.type || "video", {
      loop: spec.loop !== false,
      audio: spec.audio !== false,
      volume: spec.volume == null ? 1 : spec.volume
    }).then(function () {
      loader.hidden = true;
      syncControls();
      showHint();
    }).catch(function (e) {
      loader.hidden = true;
      error.textContent = T().error + (e && e.message ? " " + e.message : "");
      error.hidden = false;
    });
  }

  function closeVr(silent) {
    if (hintTimer) { clearTimeout(hintTimer); hintTimer = 0; }
    if (viewer) { try { viewer.destroy(); } catch (_) {} viewer = null; }
    if (overlay) {
      overlay.hidden = true;
      var hint = document.getElementById("qr-vr-hint");
      if (hint) hint.hidden = true;
      if (!silent && fullscreenElement() === overlay) {
        var exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) try { exit.call(document); } catch (_) {}
      }
    }
    document.documentElement.classList.remove("qr-vr-open");
    document.body.classList.remove("qr-vr-open");
  }

  window.__qrVrPrepare = prepare;
  window.__qrVrClear = clear;
  window.__qrVrOpen = openVr;
  window.__qrVrClose = function () { closeVr(false); };

  window.addEventListener("i18n:changed", function () { setButtonVisible(!!activeSpec && !document.getElementById("btn-vr-qr")?.hidden); syncControls(); });
  document.addEventListener("app:set-lang", function () { setButtonVisible(!!activeSpec && !document.getElementById("btn-vr-qr")?.hidden); syncControls(); });
})();
