(function () {
  "use strict";

  var panel = document.getElementById("panel");
  var today = document.getElementById("media-video-today");
  var past = document.getElementById("media-video");
  if (!panel || !today || !past) return;

  var controls = null;
  var playButton = null;
  var progress = null;
  var timeLabel = null;
  var settingsButton = null;
  var settingsMenu = null;
  var fullscreenButton = null;
  var activeVideo = null;
  var seeking = false;

  var STRINGS = {
    it: { play: "Riproduci", pause: "Pausa", settings: "Impostazioni", speed: "Velocità", fullscreen: "Schermo intero", exitFullscreen: "Esci da schermo intero" },
    en: { play: "Play", pause: "Pause", settings: "Settings", speed: "Speed", fullscreen: "Fullscreen", exitFullscreen: "Exit fullscreen" },
    es: { play: "Reproducir", pause: "Pausa", settings: "Ajustes", speed: "Velocidad", fullscreen: "Pantalla completa", exitFullscreen: "Salir de pantalla completa" },
    fr: { play: "Lecture", pause: "Pause", settings: "Paramètres", speed: "Vitesse", fullscreen: "Plein écran", exitFullscreen: "Quitter le plein écran" },
    ar: { play: "تشغيل", pause: "إيقاف مؤقت", settings: "الإعدادات", speed: "السرعة", fullscreen: "ملء الشاشة", exitFullscreen: "الخروج من ملء الشاشة" },
    ru: { play: "Воспроизвести", pause: "Пауза", settings: "Настройки", speed: "Скорость", fullscreen: "Во весь экран", exitFullscreen: "Выйти из полноэкранного режима" },
    zh: { play: "播放", pause: "暂停", settings: "设置", speed: "速度", fullscreen: "全屏", exitFullscreen: "退出全屏" },
    lij: { play: "Avvia", pause: "Pösa", settings: "Inpostaçioin", speed: "Veloçitæ", fullscreen: "Schermo intrego", exitFullscreen: "Sciòrti da-o schermo intrego" }
  };

  function lang() {
    var code = "it";
    try { code = String(localStorage.getItem("lang") || document.documentElement.lang || "it").toLowerCase(); } catch (_) {}
    if (code.indexOf("-") !== -1) code = code.split("-")[0];
    return STRINGS[code] ? code : "it";
  }

  function tx() { return STRINGS[lang()]; }

  function svgPlay() {
    return '<svg class="qr-video-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  }
  function svgPause() {
    return '<svg class="qr-video-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
  }
  function svgSettings() {
    return '<svg class="qr-video-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.07-.94l2.03-1.58-1.92-3.32-2.39.96a7.1 7.1 0 0 0-1.63-.95L14.86 3h-3.84l-.36 2.17c-.58.24-1.12.56-1.62.94l-2.39-.95-1.92 3.32 2.03 1.58c-.05.31-.08.65-.08.98s.03.65.08.96l-2.03 1.58 1.92 3.32 2.39-.96c.5.39 1.04.71 1.62.95l.36 2.17h3.84l.36-2.17c.59-.24 1.13-.56 1.63-.95l2.39.96 1.92-3.32zM12.94 15.5A3.5 3.5 0 1 1 12.94 8a3.5 3.5 0 0 1 0 7.5z"/></svg>';
  }
  function svgFullscreen() {
    return '<svg class="qr-video-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zm-3-12v2h3v3h2V5h-5z"/></svg>';
  }

  function buildControls() {
    if (controls) return;
    var media = panel.querySelector(".media");
    if (!media) return;

    controls = document.createElement("div");
    controls.className = "qr-video-controls";
    controls.id = "qr-video-controls";
    controls.setAttribute("role", "group");
    controls.innerHTML =
      '<button class="qr-video-control-btn qr-video-play" type="button"></button>' +
      '<div class="qr-video-progress-wrap"><input class="qr-video-progress" type="range" min="0" max="1000" value="0" step="1" aria-label="Timeline"></div>' +
      '<span class="qr-video-time" aria-live="off">0:00 / 0:00</span>' +
      '<div class="qr-video-settings-wrap">' +
        '<button class="qr-video-control-btn qr-video-settings" type="button" aria-expanded="false"></button>' +
        '<div class="qr-video-settings-menu" hidden>' +
          '<div class="qr-video-settings-title"></div>' +
          '<button type="button" class="qr-video-speed-option" data-speed="0.75">0.75×</button>' +
          '<button type="button" class="qr-video-speed-option" data-speed="1">1×</button>' +
          '<button type="button" class="qr-video-speed-option" data-speed="1.25">1.25×</button>' +
          '<button type="button" class="qr-video-speed-option" data-speed="1.5">1.5×</button>' +
          '<button type="button" class="qr-video-speed-option" data-speed="2">2×</button>' +
        '</div>' +
      '</div>' +
      '<button class="qr-video-control-btn qr-video-fullscreen" type="button"></button>';

    media.insertAdjacentElement("afterend", controls);
    playButton = controls.querySelector(".qr-video-play");
    progress = controls.querySelector(".qr-video-progress");
    timeLabel = controls.querySelector(".qr-video-time");
    settingsButton = controls.querySelector(".qr-video-settings");
    settingsMenu = controls.querySelector(".qr-video-settings-menu");
    fullscreenButton = controls.querySelector(".qr-video-fullscreen");

    playButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var v = currentVideo();
      if (!v) return;
      try {
        if (v.paused) {
          var p = v.play();
          if (p && typeof p.catch === "function") p.catch(function () {});
        } else {
          v.pause();
        }
      } catch (_) {}
    });

    progress.addEventListener("pointerdown", function () { seeking = true; });
    progress.addEventListener("pointerup", function () { seeking = false; seekFromControl(); });
    progress.addEventListener("change", function () { seeking = false; seekFromControl(); });
    progress.addEventListener("input", function () {
      var v = currentVideo();
      if (!v || !isFinite(v.duration) || v.duration <= 0) return;
      var preview = (Number(progress.value) / 1000) * v.duration;
      updateTimeLabel(preview, v.duration);
    });

    settingsButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var open = settingsMenu.hasAttribute("hidden");
      if (open) settingsMenu.removeAttribute("hidden");
      else settingsMenu.setAttribute("hidden", "");
      settingsButton.setAttribute("aria-expanded", open ? "true" : "false");
    });

    settingsMenu.addEventListener("click", function (event) {
      var button = event.target.closest("[data-speed]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      var speed = parseFloat(button.getAttribute("data-speed"));
      var v = currentVideo();
      if (v && isFinite(speed) && speed > 0) {
        try { v.playbackRate = speed; } catch (_) {}
      }
      settingsMenu.setAttribute("hidden", "");
      settingsButton.setAttribute("aria-expanded", "false");
      syncSettingsState();
    });

    fullscreenButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      toggleFullscreen();
    });

    document.addEventListener("click", function (event) {
      if (!settingsMenu || settingsMenu.hasAttribute("hidden")) return;
      if (controls && controls.contains(event.target)) return;
      settingsMenu.setAttribute("hidden", "");
      settingsButton.setAttribute("aria-expanded", "false");
    }, true);

    [today, past].forEach(bindVideoEvents);
    document.addEventListener("fullscreenchange", function () { updateLabels(); });
    document.addEventListener("webkitfullscreenchange", function () { updateLabels(); });
    window.addEventListener("i18n:changed", updateLabels);
    document.addEventListener("app:set-lang", updateLabels);

    var observer = new MutationObserver(function () { refresh(); });
    observer.observe(panel, { attributes: true, attributeFilter: ["class"] });
    observer.observe(today, { attributes: true, attributeFilter: ["style", "src"] });
    observer.observe(past, { attributes: true, attributeFilter: ["style", "src"] });

    refresh();
  }

  function bindVideoEvents(video) {
    ["play", "pause", "loadedmetadata", "durationchange", "timeupdate", "seeking", "seeked", "ratechange", "emptied"].forEach(function (name) {
      video.addEventListener(name, function () {
        if (video === currentVideo()) updateFromVideo();
      });
    });
  }

  function visible(video) {
    if (!video) return false;
    var style = window.getComputedStyle(video);
    return style.display !== "none" && style.visibility !== "hidden" && !!video.getAttribute("src");
  }

  function currentVideo() {
    if (visible(today)) return today;
    if (visible(past)) return past;
    return null;
  }

  function refresh() {
    var v = currentVideo();
    activeVideo = v;
    var shouldShow = panel.classList.contains("qr-point-panel") && !!v && !panel.classList.contains("qr-compare-active");
    panel.classList.toggle("qr-standard-video-visible", shouldShow);
    if (controls) controls.setAttribute("aria-hidden", shouldShow ? "false" : "true");
    updateFromVideo();
  }

  function formatTime(seconds) {
    seconds = Number(seconds);
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    var whole = Math.floor(seconds);
    var h = Math.floor(whole / 3600);
    var m = Math.floor((whole % 3600) / 60);
    var s = whole % 60;
    if (h > 0) return h + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    return m + ":" + String(s).padStart(2, "0");
  }

  function updateTimeLabel(current, duration) {
    if (!timeLabel) return;
    timeLabel.textContent = formatTime(current) + " / " + formatTime(duration);
  }

  function updateFromVideo() {
    var v = currentVideo();
    if (!v) {
      if (progress) progress.value = "0";
      updateTimeLabel(0, 0);
      updateLabels();
      return;
    }

    if (!seeking && progress) {
      var duration = Number(v.duration);
      var current = Number(v.currentTime);
      var ratio = isFinite(duration) && duration > 0 ? Math.max(0, Math.min(1, current / duration)) : 0;
      progress.value = String(Math.round(ratio * 1000));
      updateTimeLabel(current, duration);
    }
    syncSettingsState();
    updateLabels();
  }

  function seekFromControl() {
    var v = currentVideo();
    if (!v || !progress || !isFinite(v.duration) || v.duration <= 0) return;
    try { v.currentTime = (Number(progress.value) / 1000) * v.duration; } catch (_) {}
    updateFromVideo();
  }

  function syncSettingsState() {
    var v = currentVideo();
    if (!settingsMenu || !v) return;
    var rate = Number(v.playbackRate) || 1;
    settingsMenu.querySelectorAll("[data-speed]").forEach(function (button) {
      var speed = parseFloat(button.getAttribute("data-speed"));
      button.classList.toggle("is-active", Math.abs(speed - rate) < 0.01);
      button.setAttribute("aria-pressed", Math.abs(speed - rate) < 0.01 ? "true" : "false");
    });
  }

  function isPanelFullscreen() {
    return document.fullscreenElement === panel || document.webkitFullscreenElement === panel;
  }

  function toggleFullscreen() {
    var v = currentVideo();
    if (!v) return;

    if (isPanelFullscreen()) {
      try {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      } catch (_) {}
      return;
    }

    try {
      if (panel.requestFullscreen) {
        var p = panel.requestFullscreen();
        if (p && typeof p.catch === "function") p.catch(function () {});
        return;
      }
      if (panel.webkitRequestFullscreen) {
        panel.webkitRequestFullscreen();
        return;
      }
      if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      }
    } catch (_) {}
  }

  function updateLabels() {
    if (!playButton || !settingsButton || !fullscreenButton) return;
    var T = tx();
    var v = currentVideo();
    var playing = !!(v && !v.paused && !v.ended);

    playButton.innerHTML = playing ? svgPause() : svgPlay();
    playButton.title = playing ? T.pause : T.play;
    playButton.setAttribute("aria-label", playing ? T.pause : T.play);

    settingsButton.innerHTML = svgSettings();
    settingsButton.title = T.settings;
    settingsButton.setAttribute("aria-label", T.settings);

    var title = settingsMenu && settingsMenu.querySelector(".qr-video-settings-title");
    if (title) title.textContent = T.speed;

    fullscreenButton.innerHTML = svgFullscreen();
    fullscreenButton.title = isPanelFullscreen() ? T.exitFullscreen : T.fullscreen;
    fullscreenButton.setAttribute("aria-label", isPanelFullscreen() ? T.exitFullscreen : T.fullscreen);
  }

  buildControls();
})();
