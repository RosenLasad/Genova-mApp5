(function () {
  'use strict';

  if (window.QRVisited && window.QRVisited.__ready) return;

  var STORAGE_KEY = 'gm-qr-visited-v1';
  var activePointId = '';
  var trackedMarkers = [];
  var mapHooked = false;
  var openHooked = false;

  var UI = {
    it:  { off: 'Punto QR non visitato', on: 'Punto QR visitato', shortOff: 'Non visitato', shortOn: 'Visitato' },
    en:  { off: 'QR point not visited', on: 'QR point visited', shortOff: 'Not visited', shortOn: 'Visited' },
    es:  { off: 'Punto QR no visitado', on: 'Punto QR visitado', shortOff: 'No visitado', shortOn: 'Visitado' },
    fr:  { off: 'Point QR non visite', on: 'Point QR visite', shortOff: 'Non visite', shortOn: 'Visite' },
    ar:  { off: 'نقطة QR غير مزارة', on: 'نقطة QR تمت زيارتها', shortOff: 'غير مزارة', shortOn: 'تمت زيارتها' },
    ru:  { off: 'QR-точка не посещена', on: 'QR-точка посещена', shortOff: 'Не посещено', shortOn: 'Посещено' },
    zh:  { off: 'QR 点未访问', on: 'QR 点已访问', shortOff: '未访问', shortOn: '已访问' },
    lij: { off: 'Ponto QR no vixitou', on: 'Ponto QR vixitou', shortOff: 'No vixitou', shortOn: 'Vixitou' }
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
    return UI[lang] ? lang : 'it';
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state || {})); } catch (_) {}
  }

  function entryVisited(entry) {
    if (entry === true) return true;
    if (entry === false || entry == null) return false;
    return !!(entry && typeof entry === 'object' && entry.visited === true);
  }

  function isVisited(id) {
    if (!id) return false;
    var state = loadState();
    return entryVisited(state[String(id)]);
  }

  function setVisited(id, value) {
    id = String(id || '');
    if (!id) return false;
    var state = loadState();
    /* Conserviamo anche il passaggio a "Non visitato" con un timestamp:
       cosi' la sincronizzazione fra dispositivi puo' propagare correttamente
       sia Visitato sia Non visitato, invece di trattare l'assenza come dato ignoto. */
    state[id] = { visited: !!value, updatedAt: Date.now() };
    saveState(state);
    refreshMarkers(id);
    if (activePointId === id) syncPanelButton(id);
    emitChange(id, !!value);
    return !!value;
  }

  function toggleVisited(id) {
    return setVisited(id, !isVisited(id));
  }

  function emitChange(id, visited) {
    try {
      window.dispatchEvent(new CustomEvent('qr:visited-change', {
        detail: { id: id, visited: visited }
      }));
    } catch (_) {}
  }

  function sources() {
    return window.__QR_SOURCES || [];
  }

  function resolvePointId(title, media, qrid) {
    var parts = String(qrid || '').split('/');
    if (parts.length > 1 && parts[0] && parts[1]) {
      for (var s = 0; s < sources().length; s++) {
        var source = sources()[s] || {};
        var parent = source.parent || {};
        if (String(parent.id || '') !== parts[0]) continue;
        var children = source.children || [];
        for (var c = 0; c < children.length; c++) {
          if (String((children[c] || {}).id || '') === parts[1]) return parts[0] + '/' + parts[1];
        }
      }
    }

    var today = media && media.oggi ? String(media.oggi) : '';
    var wantedTitle = String(title || '').trim();
    var labelMatch = '';

    /* I pannelli dei marker-padre non rappresentano un Punto QR visitabile.
       Tutti i Punti QR attivi hanno media.oggi: senza qrid o video Oggi non
       usiamo il solo titolo, cosi' un quartiere con lo stesso nome di un
       proprio punto non eredita per errore lo stato Visitato. */
    if (!today) return '';

    for (var i = 0; i < sources().length; i++) {
      var src = sources()[i] || {};
      var p = src.parent || {};
      var kids = src.children || [];
      if (!p.id) continue;
      for (var j = 0; j < kids.length; j++) {
        var child = kids[j] || {};
        if (today && child.media && String(child.media.oggi || '') === today) {
          return String(p.id) + '/' + String(child.id || 'item');
        }
        if (!labelMatch && wantedTitle && String(child.label || '').trim() === wantedTitle) {
          labelMatch = String(p.id) + '/' + String(child.id || 'item');
        }
      }
    }

    return labelMatch;
  }

  function pointCandidatesByTitle(title) {
    var out = [];
    title = String(title || '').trim();
    if (!title) return out;
    for (var s = 0; s < sources().length; s++) {
      var src = sources()[s] || {};
      var parent = src.parent || {};
      var kids = src.children || [];
      if (!parent.id) continue;
      for (var c = 0; c < kids.length; c++) {
        var child = kids[c] || {};
        if (String(child.label || '').trim() === title) {
          out.push({
            id: String(parent.id) + '/' + String(child.id || 'item'),
            lat: Number(child.lat),
            lng: Number(child.lng)
          });
        }
      }
    }
    return out;
  }

  function markerPointId(marker) {
    if (!marker) return '';
    if (marker.__qrVisitId) return String(marker.__qrVisitId);

    var title = marker.options && marker.options.title ? marker.options.title : '';
    var candidates = pointCandidatesByTitle(title);
    if (!candidates.length) return '';
    if (candidates.length === 1) return candidates[0].id;

    var ll = null;
    try { ll = marker.getLatLng && marker.getLatLng(); } catch (_) {}
    if (!ll) return candidates[0].id;

    var best = candidates[0];
    var bestScore = Infinity;
    for (var i = 0; i < candidates.length; i++) {
      var dLat = Number(ll.lat) - candidates[i].lat;
      var dLng = Number(ll.lng) - candidates[i].lng;
      var score = dLat * dLat + dLng * dLng;
      if (score < bestScore) {
        bestScore = score;
        best = candidates[i];
      }
    }
    return best.id;
  }

  function markerLooksQr(marker) {
    try {
      var icon = marker && marker.options && marker.options.icon;
      var cls = icon && icon.options ? String(icon.options.className || '') : '';
      if (cls.indexOf('qr-azzurro-icon') !== -1) return true;
    } catch (_) {}
    return !!markerPointId(marker);
  }

  function rememberMarker(marker) {
    for (var i = 0; i < trackedMarkers.length; i++) {
      if (trackedMarkers[i] === marker) return;
    }
    trackedMarkers.push(marker);
  }

  function syncMarker(marker) {
    if (!marker || !markerLooksQr(marker)) return;
    var id = markerPointId(marker);
    if (!id) return;
    marker.__qrVisitId = id;
    rememberMarker(marker);

    var el = null;
    try { el = marker.getElement && marker.getElement(); } catch (_) {}
    if (!el) {
      window.setTimeout(function () { syncMarker(marker); }, 30);
      return;
    }

    var visited = isVisited(id);
    el.setAttribute('data-qr-visit-id', id);
    el.classList.remove('qr-visit-visited', 'qr-visit-unvisited');
    el.classList.add(visited ? 'qr-visit-visited' : 'qr-visit-unvisited');
  }

  function refreshMarkers(id) {
    for (var i = trackedMarkers.length - 1; i >= 0; i--) {
      var marker = trackedMarkers[i];
      if (!marker) {
        trackedMarkers.splice(i, 1);
        continue;
      }
      if (!id || String(marker.__qrVisitId || markerPointId(marker)) === String(id)) syncMarker(marker);
    }
  }

  function scanMapMarkers() {
    var map = window.map || window.__map || window.__LEAFLET_MAP__;
    if (!map || typeof map.eachLayer !== 'function') return;
    try {
      map.eachLayer(function (layer) {
        if (layer && typeof layer.getLatLng === 'function' && layer.options) syncMarker(layer);
      });
    } catch (_) {}
  }

  function hookMap() {
    if (mapHooked) return true;
    var map = window.map || window.__map || window.__LEAFLET_MAP__;
    if (!map || typeof map.on !== 'function') return false;
    mapHooked = true;
    map.on('layeradd', function (event) {
      var layer = event && event.layer;
      if (layer && typeof layer.getLatLng === 'function') {
        window.setTimeout(function () { syncMarker(layer); }, 0);
      }
    });
    scanMapMarkers();
    return true;
  }

  function ensurePanelButton() {
    var panel = document.getElementById('panel');
    if (!panel) return null;
    var header = panel.querySelector('header');
    var h2 = header && header.querySelector('h2');
    if (!header || !h2) return null;

    var button = document.getElementById('qr-visit-toggle');
    if (!button) {
      button = document.createElement('button');
      button.id = 'qr-visit-toggle';
      button.type = 'button';
      button.className = 'qr-visit-toggle';
      button.innerHTML = '<span class="qr-visit-status-dot" aria-hidden="true"></span><span class="qr-visit-label"></span>';
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!activePointId) return;
        toggleVisited(activePointId);
      });
    }

    if (button.parentNode !== header || button.previousElementSibling !== h2) {
      if (h2.nextSibling) header.insertBefore(button, h2.nextSibling);
      else header.appendChild(button);
    }
    return button;
  }

  function syncPanelButton(id) {
    var button = ensurePanelButton();
    if (!button) return;
    id = String(id || '');
    activePointId = id;

    if (!id) {
      button.hidden = true;
      button.removeAttribute('data-qr-visit-id');
      return;
    }

    var visited = isVisited(id);
    var T = UI[currentLang()] || UI.it;
    button.hidden = false;
    button.setAttribute('data-qr-visit-id', id);
    button.setAttribute('aria-pressed', visited ? 'true' : 'false');
    button.classList.toggle('is-visited', visited);
    button.classList.toggle('is-unvisited', !visited);
    button.title = visited ? T.on : T.off;
    button.setAttribute('aria-label', visited ? T.on : T.off);
    var label = button.querySelector('.qr-visit-label');
    if (label) label.textContent = visited ? T.shortOn : T.shortOff;
  }

  function wrapOpenPanel() {
    if (openHooked) return true;
    var original = window.__qrOpenChildPanel;
    if (typeof original !== 'function') return false;
    if (original.__qrVisitedWrapped) {
      openHooked = true;
      return true;
    }

    function wrapped(title, descr, media, qrid) {
      var pointId = resolvePointId(title, media, qrid);
      var result = original.apply(this, arguments);
      window.setTimeout(function () { syncPanelButton(pointId); }, 0);
      return result;
    }

    wrapped.__qrVisitedWrapped = true;
    wrapped.__qrVisitedOriginal = original;
    window.__qrOpenChildPanel = wrapped;
    openHooked = true;
    return true;
  }

  function refreshLanguage() {
    if (activePointId) syncPanelButton(activePointId);
  }

  window.QRVisited = {
    __ready: true,
    isVisited: isVisited,
    setVisited: setVisited,
    toggle: toggleVisited,
    refreshMarkers: refreshMarkers,
    syncMarker: syncMarker,
    resolvePointId: resolvePointId,
    storageKey: STORAGE_KEY
  };

  (function boot(attempt) {
    hookMap();
    wrapOpenPanel();
    if ((!mapHooked || !openHooked) && attempt < 100) {
      window.setTimeout(function () { boot(attempt + 1); }, 100);
    } else {
      scanMapMarkers();
      var shareId = '';
      try { shareId = window.__QR_SHARE_STATE && window.__QR_SHARE_STATE.id || ''; } catch (_) {}
      if (document.getElementById('panel') && document.getElementById('panel').classList.contains('qr-point-panel')) {
        syncPanelButton(resolvePointId('', null, shareId));
      }
    }
  })(0);

  try {
    var langObserver = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === 'lang') {
          refreshLanguage();
          break;
        }
      }
    });
    langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  } catch (_) {}

  window.addEventListener('i18n:changed', refreshLanguage);
  document.addEventListener('app:set-lang', refreshLanguage);
  document.addEventListener('genova:data-synced', function () {
    refreshMarkers();
    if (activePointId) syncPanelButton(activePointId);
  });
})();
