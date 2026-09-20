(function () {
  'use strict';

  if (window.__qrGroupMapFeatureReady) return;
  window.__qrGroupMapFeatureReady = true;

  var groupOnlyLayer = null;
  var activeGroupId = '';
  var baseToggleAll = null;
  var masterWrapped = false;
  var enhanceScheduled = false;

  var LABELS = {
    it:  { show: 'Mostra sulla mappa', hide: 'Nascondi dalla mappa' },
    en:  { show: 'Show on map', hide: 'Hide from map' },
    es:  { show: 'Mostrar en el mapa', hide: 'Ocultar del mapa' },
    fr:  { show: 'Afficher sur la carte', hide: 'Masquer de la carte' },
    ar:  { show: 'عرض على الخريطة', hide: 'إخفاء من الخريطة' },
    ru:  { show: 'Показать на карте', hide: 'Скрыть с карты' },
    zh:  { show: '在地图上显示', hide: '从地图隐藏' },
    lij: { show: 'Mostra inta mappa', hide: 'Ascundi da mappa' }
  };

  var MASTER_LABELS = {
    it:  ['Mostra QR', 'Nascondi QR'],
    en:  ['Show QR', 'Hide QR'],
    es:  ['Mostrar QR', 'Ocultar QR'],
    fr:  ['Afficher QR', 'Masquer QR'],
    ar:  ['إظهار QR', 'إخفاء QR'],
    ru:  ['Показать QR', 'Скрыть QR'],
    zh:  ['显示 QR', '隐藏 QR'],
    lij: ['Mostra i QR', 'Ascundi i QR']
  };

  function currentLang() {
    var lang = 'it';
    try {
      lang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
    } catch (_) {
      lang = document.documentElement.getAttribute('lang') || 'it';
    }
    lang = String(lang || 'it').toLowerCase();
    if (lang.indexOf('lij') === 0) return 'lij';
    lang = lang.split('-')[0];
    return LABELS[lang] ? lang : 'it';
  }

  function mapInstance() {
    return window.map || window.__map || window.__LEAFLET_MAP__ || null;
  }

  function sourceById(groupId) {
    var all = window.__QR_SOURCES || [];
    for (var i = 0; i < all.length; i++) {
      var source = all[i] || {};
      var parent = source.parent || {};
      if (String(parent.id || '') === String(groupId || '')) return source;
    }
    return null;
  }

  function ensureLayer() {
    if (!groupOnlyLayer && window.L) groupOnlyLayer = window.L.layerGroup();
    window.QR_GROUP_ONLY = groupOnlyLayer;
    return groupOnlyLayer;
  }

  function globalAllIsOn() {
    var map = mapInstance();
    try { return !!(map && window.QR_ALL && map.hasLayer(window.QR_ALL)); } catch (_) { return false; }
  }

  function syncMasterControls() {
    var lang = currentLang();
    var pair = MASTER_LABELS[lang] || MASTER_LABELS.it;
    var on = globalAllIsOn();
    var label = on ? pair[1] : pair[0];

    var homeMaster = document.getElementById('qr-master-toggle');
    if (homeMaster) {
      homeMaster.textContent = label;
      homeMaster.setAttribute('title', label);
      homeMaster.setAttribute('aria-label', label);
    }

    var toolbarMaster = document.getElementById('btn-qr-removed');
    if (toolbarMaster) {
      toolbarMaster.classList.toggle('is-active', on);
      toolbarMaster.setAttribute('aria-pressed', on ? 'true' : 'false');
      toolbarMaster.setAttribute('title', label);
      toolbarMaster.setAttribute('aria-label', label);
    }

    var masterChk = document.getElementById('chk-qr-all');
    if (masterChk) masterChk.checked = on;
  }

  function emitChange() {
    syncButtons();
    syncMasterControls();
    try {
      window.dispatchEvent(new CustomEvent('qr:group-only-change', {
        detail: { groupId: activeGroupId }
      }));
    } catch (_) {}
  }

  function clearGroupOnly(silent) {
    var map = mapInstance();
    if (groupOnlyLayer) {
      try { groupOnlyLayer.clearLayers(); } catch (_) {}
      try { if (map && map.hasLayer(groupOnlyLayer)) map.removeLayer(groupOnlyLayer); } catch (_) {}
    }
    activeGroupId = '';
    if (!silent) emitChange();
  }

  function uncheckIndividualGroups() {
    var boxes = document.querySelectorAll('#qr-menu input[id^="chk-qr-"]:not(#chk-qr-all)');
    for (var i = 0; i < boxes.length; i++) {
      var chk = boxes[i];
      if (!chk.checked) continue;
      chk.checked = false;
      try { chk.dispatchEvent(new Event('change', { bubbles: true })); } catch (_) {}
    }
  }

  function ensureQrPane(map) {
    if (!map || typeof map.getPane !== 'function' || typeof map.createPane !== 'function') return null;
    var name = 'pane-qr-group-only';
    try {
      if (!map.getPane(name)) {
        map.createPane(name);
        map.getPane(name).style.zIndex = 651;
      }
    } catch (_) {}
    return name;
  }

  function groupIcon() {
    if (!window.L) return null;
    return window.L.icon({
      iconUrl: 'qr_azzurri/marker-azzurro-qr-notch-24.svg',
      iconSize: [24, 26],
      iconAnchor: [12, 26],
      className: 'qr-azzurro-icon'
    });
  }

  function fitGroup(children) {
    var map = mapInstance();
    if (!map || !window.L || !children || !children.length) return;
    var pts = [];
    for (var i = 0; i < children.length; i++) {
      var child = children[i] || {};
      if (typeof child.lat === 'number' && typeof child.lng === 'number') pts.push([child.lat, child.lng]);
    }
    if (!pts.length) return;

    try {
      if (pts.length === 1) {
        map.setView(pts[0], Math.max(Number(map.getZoom && map.getZoom()) || 16, 17), { animate: true });
      } else {
        map.fitBounds(window.L.latLngBounds(pts), {
          padding: [42, 42],
          maxZoom: 17,
          animate: true
        });
      }
    } catch (_) {}
  }

  function showOnlyGroup(groupId) {
    groupId = String(groupId || '');
    if (!groupId) return false;

    if (activeGroupId === groupId) {
      clearGroupOnly(false);
      return false;
    }

    var source = sourceById(groupId);
    var map = mapInstance();
    var layer = ensureLayer();
    if (!source || !map || !layer || !window.L) return false;

    if (typeof baseToggleAll === 'function') {
      try { baseToggleAll(false); } catch (_) {}
    } else if (typeof window.__qrToggleAll === 'function') {
      try { window.__qrToggleAll(false); } catch (_) {}
    }

    uncheckIndividualGroups();
    clearGroupOnly(true);
    layer = ensureLayer();

    var parent = source.parent || {};
    var children = source.children || [];
    var icon = groupIcon();

    for (var i = 0; i < children.length; i++) {
      (function (child) {
        if (!child || typeof child.lat !== 'number' || typeof child.lng !== 'number') return;
        var qrid = String(parent.id || groupId) + '/' + String(child.id || 'item');
        var marker = window.L.marker([child.lat, child.lng], {
          pane: ensureQrPane(map) || undefined,
          icon: icon,
          title: child.label || ''
        });
        marker.__qrVisitId = qrid;
        try {
          marker.bindTooltip(child.label || '', {
            direction: 'top',
            offset: [0, -6],
            className: 'qr-tooltip'
          });
        } catch (_) {}
        marker.on('click', function () {
          try {
            if (window.__qrOpenChildPanel) {
              window.__qrOpenChildPanel(
                child.label || '',
                child.descr || '',
                child.media || { oggi: null, ieri: [] },
                qrid
              );
            }
          } catch (_) {}
        });
        layer.addLayer(marker);
        try { if (window.QRVisited && window.QRVisited.syncMarker) window.QRVisited.syncMarker(marker); } catch (_) {}
      })(children[i]);
    }

    try { layer.addTo(map); } catch (_) {}
    activeGroupId = groupId;
    fitGroup(children);
    emitChange();
    return true;
  }

  function installMasterWrapper() {
    if (masterWrapped) return true;
    var current = window.__qrToggleAll;
    if (typeof current !== 'function') return false;
    if (current.__qrGroupOnlyWrapped) {
      masterWrapped = true;
      baseToggleAll = current.__qrGroupOnlyBase || null;
      return true;
    }

    baseToggleAll = current;
    function wrapped(on) {
      clearGroupOnly(true);
      var result = baseToggleAll.apply(this, arguments);
      emitChange();
      return result;
    }
    wrapped.__qrGroupOnlyWrapped = true;
    wrapped.__qrGroupOnlyBase = baseToggleAll;
    window.__qrToggleAll = wrapped;
    masterWrapped = true;
    return true;
  }

  function iconMarkup() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M3.5 5.5l5-2 7 2.5 5-2v14.5l-5 2-7-2.5-5 2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M8.5 3.5v14.5M15.5 6v14.5" fill="none" stroke="currentColor" stroke-width="1.35" opacity=".75"/>' +
      '<circle cx="12" cy="11" r="2.2" fill="currentColor"/>' +
      '</svg>';
  }

  function labelFor(active) {
    var T = LABELS[currentLang()] || LABELS.it;
    return active ? T.hide : T.show;
  }

  function syncButton(button) {
    if (!button) return;
    var gid = button.getAttribute('data-qr-group-map') || '';
    var active = !!gid && gid === activeGroupId;
    var label = labelFor(active);
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    button.setAttribute('title', label);
    button.setAttribute('aria-label', label);
  }

  function syncButtons() {
    var buttons = document.querySelectorAll('.qr-group-map-btn[data-qr-group-map]');
    for (var i = 0; i < buttons.length; i++) syncButton(buttons[i]);
  }

  function enhanceGroupButtons() {
    enhanceScheduled = false;
    var groups = document.querySelectorAll('#qr-groups .qr-group[data-group-id]');
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      var gid = group.getAttribute('data-group-id') || '';
      var head = group.querySelector('[data-qr-acc="head"]');
      if (!gid || !head) continue;

      group.classList.add('qr-group-with-map-action');
      var button = group.querySelector('.qr-group-map-btn[data-qr-group-map="' + cssEscape(gid) + '"]');
      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.className = 'qr-group-map-btn';
        button.setAttribute('data-qr-group-map', gid);
        button.innerHTML = iconMarkup();
        button.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          var id = this.getAttribute('data-qr-group-map') || '';
          showOnlyGroup(id);
        });
        group.insertBefore(button, head.nextSibling);
      }
      syncButton(button);
    }
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(value);
    return String(value || '').replace(/(["\\])/g, '\\$1');
  }

  function scheduleEnhance() {
    if (enhanceScheduled) return;
    enhanceScheduled = true;
    if (window.requestAnimationFrame) window.requestAnimationFrame(enhanceGroupButtons);
    else window.setTimeout(enhanceGroupButtons, 0);
  }

  function observeHome() {
    var root = document.getElementById('mh-bubble') || document.body;
    if (!root || typeof MutationObserver === 'undefined') return;
    try {
      var observer = new MutationObserver(scheduleEnhance);
      observer.observe(root, { childList: true, subtree: true });
    } catch (_) {}
  }

  function languageChanged() {
    syncButtons();
    syncMasterControls();
  }

  window.__qrShowOnlyGroup = showOnlyGroup;
  window.__qrToggleGroupOnly = showOnlyGroup;
  window.__qrClearGroupOnly = function () { clearGroupOnly(false); };
  window.__qrActiveGroupOnly = function () { return activeGroupId; };
  window.__qrSyncGroupMapButtons = syncButtons;

  (function boot(attempt) {
    installMasterWrapper();
    scheduleEnhance();
    syncMasterControls();
    if (!masterWrapped && attempt < 100) {
      window.setTimeout(function () { boot(attempt + 1); }, 100);
    }
  })(0);

  observeHome();
  document.addEventListener('qr:list-rendered', scheduleEnhance);

  try {
    var langObserver = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === 'lang') {
          languageChanged();
          break;
        }
      }
    });
    langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  } catch (_) {}

  window.addEventListener('i18n:changed', languageChanged);
  document.addEventListener('app:set-lang', languageChanged);
})();
