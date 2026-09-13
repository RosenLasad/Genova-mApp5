/* Genova mApp: modalita 3D MapTiler e adattatore dei marker Leaflet visibili. */
(function(){
  'use strict';
  if(window.__GENOVA_MAP_3D_INIT__) return;
  window.__GENOVA_MAP_3D_INIT__ = true;

  var SOURCE_ID = 'gm-3d-visible-points';
  var CLUSTER_ID = 'gm-3d-clusters';
  var CLUSTER_COUNT_ID = 'gm-3d-cluster-count';
  var POINT_ID = 'gm-3d-points';
  var LINE_SOURCE_ID = 'gm-3d-visible-lines';
  var LINE_SOLID_ID = 'gm-3d-lines-solid';
  var LINE_DASHED_ID = 'gm-3d-lines-dashed';
  var LINE_HIT_ID = 'gm-3d-lines-hit';
  var active = false;
  var ready = false;
  var map3d = null;
  var container = null;
  var toggle = null;
  var hint = null;
  var popup = null;
  var pointLayers = Object.create(null);
  var lineLayers = Object.create(null);
  var pendingView = null;
  var syncTimer = null;
  var selectionId = 0;
  var lastPoints = '';
  var lastLines = '';
  var trackedPoints = Object.create(null);
  var trackedLines = Object.create(null);
  var loadTimer = null;
  var languageTimer = null;
  var notice = null;
  var noticeKind = '';
  var mouseChord = null;
  var joystickLookMode = false;

  // MouseEvent.buttons: il pulsante centrale (rotellina) vale 4.
  // Intercetta il trascinamento prima dei controlli nativi di MapTiler.
  function installMouseChord(instance){
    if(!instance.getCanvas) return null;
    var canvas = instance.getCanvas();
    var dragging = false;
    var consuming = false;
    var lastX = 0, lastY = 0;
    var handlers = [];
    var suppressClickUntil = 0;
    function stopEvent(event){ event.preventDefault(); event.stopImmediatePropagation(); }
    function restore(){
      handlers.forEach(function(handler){ handler.enable(); });
      handlers = [];
      dragging = false;
    }
    function cancel(){
      restore(); consuming = false;
    }
    function down(event){
      if(!active || map3d !== instance) return;
      if(!consuming && (event.target !== canvas || event.button !== 1)) return;
      // Impedisce l'autoscorrimento del browser alla pressione della rotellina.
      if(event.button === 1) event.preventDefault();
      if(!(event.buttons & 4) || (event.buttons & 2)) return;
      stopEvent(event);
      if(dragging) return;
      instance.stop();
      [instance.dragPan, instance.dragRotate].forEach(function(handler){
        if(handler && handler.isEnabled()){
          handlers.push(handler);
          handler.disable();
        }
      });
      dragging = true; consuming = true;
      lastX = event.clientX; lastY = event.clientY;
    }
    function move(event){
      if(!consuming) return;
      stopEvent(event);
      if(!(event.buttons & 4)){
        restore();
        if(!event.buttons){ consuming = false; }
        return;
      }
      if(!dragging) return;
      var dx = event.clientX - lastX, dy = event.clientY - lastY;
      lastX = event.clientX; lastY = event.clientY;
      // Stessa risposta lineare di CTRL + sinistro, con limiti di inclinazione.
      instance.jumpTo({
        bearing:instance.getBearing() + dx * .8,
        pitch:Math.max(instance.getMinPitch(), Math.min(instance.getMaxPitch(), instance.getPitch() - dy * .5))
      });
    }
    function up(event){
      if(consuming){
        stopEvent(event);
        suppressClickUntil = Date.now() + 300;
        if(!(event.buttons & 4)) restore();
      }
      if(!(event.buttons & 5)){ consuming = false; }
    }
    function click(event){
      if(event.target === canvas && Date.now() < suppressClickUntil) stopEvent(event);
    }
    function auxclick(event){
      if(active && map3d === instance && event.target === canvas && event.button === 1) stopEvent(event);
    }
    function visibility(){ if(document.hidden) cancel(); }
    var events = {mousedown:down, mousemove:move, mouseup:up, click:click, auxclick:auxclick, blur:cancel, pointercancel:cancel};
    Object.keys(events).forEach(function(name){ window.addEventListener(name, events[name], true); });
    document.addEventListener('visibilitychange', visibility);
    return {
      cancel:cancel,
      dispose:function(){
        cancel();
        Object.keys(events).forEach(function(name){ window.removeEventListener(name, events[name], true); });
        document.removeEventListener('visibilitychange', visibility);
      }
    };
  }
  var messages = {
    it:['Attiva la visualizzazione 3D','Torna alla mappa 2D','Caricamento della mappa 3D…','La mappa 3D non è disponibile. Puoi continuare in 2D e riprovare.','Alcuni dati della mappa non sono stati caricati. Puoi riprovare.','Riprova','Chiudi','Trascina con CTRL + sinistro oppure rotellina premuta per ruotare e inclinare · touch: due dita'],
    en:['Enable 3D map','Return to 2D map','Loading the 3D map…','The 3D map is unavailable. You can continue in 2D and try again.','Some map data could not be loaded. You can try again.','Try again','Close','Drag with CTRL + left button or middle button to rotate and tilt · touch: two fingers'],
    es:['Activar mapa 3D','Volver al mapa 2D','Cargando el mapa 3D…','El mapa 3D no está disponible. Puedes continuar en 2D e intentarlo de nuevo.','No se han cargado algunos datos del mapa. Puedes volver a intentarlo.','Reintentar','Cerrar','Arrastra con CTRL + botón izquierdo o central para girar e inclinar · táctil: dos dedos'],
    fr:['Activer la carte 3D','Revenir à la carte 2D','Chargement de la carte 3D…','La carte 3D est indisponible. Vous pouvez continuer en 2D et réessayer.','Certaines données de la carte n’ont pas été chargées. Vous pouvez réessayer.','Réessayer','Fermer','Glissez avec CTRL + bouton gauche ou bouton central pour tourner et incliner · tactile : deux doigts'],
    ar:['تفعيل الخريطة ثلاثية الأبعاد','العودة إلى الخريطة ثنائية الأبعاد','جارٍ تحميل الخريطة ثلاثية الأبعاد…','الخريطة ثلاثية الأبعاد غير متاحة. يمكنك المتابعة بالخريطة ثنائية الأبعاد والمحاولة مجددًا.','تعذر تحميل بعض بيانات الخريطة. يمكنك المحاولة مجددًا.','إعادة المحاولة','إغلاق','اسحب مع CTRL والزر الأيسر أو الزر الأوسط للتدوير والإمالة · اللمس: إصبعان'],
    ru:['Включить карту 3D','Вернуться к карте 2D','Загрузка карты 3D…','Карта 3D недоступна. Можно продолжить в 2D и повторить попытку.','Некоторые данные карты не загружены. Можно повторить попытку.','Повторить','Закрыть','Перетаскивайте с CTRL + левой кнопкой или средней кнопкой для поворота и наклона · сенсорный экран: два пальца'],
    zh:['启用3D地图','返回2D地图','正在加载3D地图…','3D地图暂不可用。您可以继续使用2D地图并重试。','部分地图数据未能加载。您可以重试。','重试','关闭','按住CTRL和左键或按住中键拖动以旋转和倾斜 · 触摸屏：双指'],
    lij:['Attiva a mappa 3D','Torna a-a mappa 2D','Caregamento da mappa 3D…','A mappa 3D a no l’é disponibile. Ti peu anâ avanti in 2D e provâ torna.','Quarchedun di dæti da mappa o no l’é stæto caregou. Ti peu provâ torna.','Preuva torna','Serra','Strascina con CTRL + sinistro ò rotellina premua pe giâ e inclinâ · touch: doe die']
  };
  function uiText(index){
    var lang = String(document.documentElement.lang || 'it').split('-')[0];
    return (messages[lang] || messages.it)[index];
  }
  function showNotice(kind){
    noticeKind = kind;
    if(!notice){
      var host = document.getElementById('map');
      if(!host) return;
      notice = document.createElement('div');
      notice.className = 'gm-3d-status';
      notice.setAttribute('role','status');
      var text = document.createElement('span');
      var retry = document.createElement('button');
      retry.type = 'button';
      retry.addEventListener('click', function(){ if(active) exit3D(); dispose3D(); enter3D(); });
      var dismiss = document.createElement('button');
      dismiss.type = 'button';
      dismiss.addEventListener('click', function(){ if(noticeKind === 'loading') exit3D(); showNotice(''); });
      notice.appendChild(text); notice.appendChild(retry); notice.appendChild(dismiss);
      host.appendChild(notice);
      if(window.L && window.L.DomEvent) window.L.DomEvent.disableClickPropagation(notice);
    }
    notice.hidden = !kind;
    notice.dir = document.documentElement.dir || 'ltr';
    notice.children[0].textContent = uiText(kind === 'loading' ? 2 : kind === 'partial' ? 4 : 3);
    notice.children[1].textContent = uiText(5);
    notice.children[1].hidden = kind === 'loading';
    notice.children[2].textContent = uiText(kind === 'loading' ? 1 : 6);
  }
  function clearLoadTimer(){ if(loadTimer) window.clearTimeout(loadTimer); loadTimer = null; }
  function dispose3D(){
    if(mouseChord){ mouseChord.dispose(); mouseChord = null; }
    clearLoadTimer();
    var old = map3d;
    map3d = null; ready = false; pendingView = null;
    lastPoints = ''; lastLines = ''; hint = null;
    if(old){ try{ old.remove(); }catch(_e){} }
    if(container){ container.dataset.mapReady = 'false'; container.removeAttribute('aria-busy'); }
  }
  function fail3D(instance){
    if(instance && map3d !== instance) return;
    var wasActive = active;
    if(active) exit3D();
    dispose3D();
    if(wasActive) showNotice('error');
  }
  function watchLoad(){
    clearLoadTimer();
    var instance = map3d;
    if(ready) return;
    showNotice('loading');
    container.setAttribute('aria-busy','true');
    loadTimer = window.setTimeout(function(){ if(active && !ready) fail3D(instance); }, 20000);
  }

  function refreshLanguage(){
    setButtonState();
    if(hint) hint.textContent = uiText(7);
    if(notice) showNotice(noticeKind);
    if(languageTimer) window.clearTimeout(languageTimer);
    var hosted = popup;
    var original = hosted && hosted.__leafletPopup;
    // I moduli legacy aggiornano alcune categorie con ritardi fino a 300 ms.
    languageTimer = window.setTimeout(function(){
      languageTimer = null;
      if(!active) return;
      if(hosted && popup === hosted && original){
        if(window.GenovaPlacePopup) window.GenovaPlacePopup.decorate(original, true);
        var wall = window.__gmWallPopupMarkupForLayer && window.__gmWallPopupMarkupForLayer(original._source);
        if(wall) original.setContent(wall);
        original.update();
        var element = original.getElement();
        if(element){ element.scrollTop = 0; element.dir = document.documentElement.dir || 'ltr'; }
        var close = hosted.getElement().querySelector('.maplibregl-popup-close-button');
        if(close) close.setAttribute('aria-label', uiText(6));
        document.dispatchEvent(new CustomEvent('app:popup-3d-refresh', {detail:{popup:original}}));
      }
      schedulePointSync();
    }, 450);
  }

  // Leaflet non emette un evento per ogni modifica di stile o contenuto.
  // Conserva i metodi originali e segnala solo modifiche ai livelli esportati.
  function observeLayerUpdates(){
    var L = window.L;
    if(!L) return;
    [L.Layer, L.Marker, L.Path, L.CircleMarker, L.Circle, L.Polyline, L.Popup, L.Tooltip].forEach(function(Type){
      if(!Type) return;
      ['setLatLng','setLatLngs','addLatLng','setStyle','setIcon','setOpacity','setRadius','bindPopup','unbindPopup','setPopupContent','bindTooltip','setTooltipContent','setContent'].forEach(function(name){
        var proto = Type.prototype;
        if(!Object.prototype.hasOwnProperty.call(proto, name)) return;
        var original = proto[name];
        if(typeof original !== 'function' || original.__gm3dObserved) return;
        function updated(){
          var result = original.apply(this, arguments);
          var layer = this._source || this;
          var id = layer._leaflet_id;
          if(active && (trackedPoints[id] || trackedLines[id])) schedulePointSync();
          return result;
        }
        updated.__gm3dObserved = true;
        proto[name] = updated;
      });
    });
  }

  /* Sposta il DOM vivo del popup, mantenendo eventi, immagini e pulsanti.
     Leaflet resta responsabile dei contenuti; MapTiler del posizionamento. */
  function showLeafletPopup(event){
    if(!active || !map3d || !event.popup) return;
    var original = event.popup;
    var element = original.getElement();
    var ll = original.getLatLng();
    if(!element || !ll) return;
    if(popup) popup.remove();
    var hosted = new window.maptilersdk.Popup({closeButton:true, closeOnClick:false, anchor:'center', maxWidth:'390px', className:'gm-3d-popup gm-3d-live-popup'})
      .setLngLat([ll.lng, ll.lat])
      .setDOMContent(element)
      .addTo(map3d);
    popup = hosted;
    hosted.__leafletPopup = original;
    original.__gm3DHosted = true;
    var closeButton = hosted.getElement().querySelector('.maplibregl-popup-close-button');
    if(closeButton) closeButton.setAttribute('aria-label', uiText(6));
    var observer;
    var layoutTimer;
    function keepVisible(){
      window.clearTimeout(layoutTimer);
      layoutTimer = window.setTimeout(function(){
        if(popup !== hosted || !active) return;
        if(map3d.isMoving && map3d.isMoving()){ keepVisible(); return; }
        var rect = hosted.getElement().getBoundingClientRect();
        var bounds = container.getBoundingClientRect();
        var dx = Math.max(0, rect.right - (bounds.right - 90)) || Math.min(0, rect.left - (bounds.left + 12));
        var dy = Math.max(0, rect.bottom - (bounds.bottom - 75)) || Math.min(0, rect.top - (bounds.top + 16));
        if(dx || dy) map3d.panBy([dx, dy], {duration:200});
      }, 100);
    }
    if(window.ResizeObserver){
      observer = new window.ResizeObserver(keepVisible);
      observer.observe(element);
    }
    keepVisible();
    hosted.on('close', function(){
      original.__gm3DHosted = false;
      if(observer) observer.disconnect();
      window.clearTimeout(layoutTimer);
      if(popup === hosted) popup = null;
      var map = leafletMap();
      if(map && map.hasLayer(original)) map.closePopup(original);
    });
  }

  function openLayer(layer, latlng){
    if(!active || !layer) return false;
    var map = leafletMap();
    var original = layer.getPopup && layer.getPopup();
    if(original) original.options.autoPan = false;
    // Include i marker QR e i percorsi che costruiscono la scheda al click.
    if(layer.fire) layer.fire('click', {latlng:latlng || (layer.getLatLng && layer.getLatLng())});
    original = layer.getPopup && layer.getPopup();
    if(original && map && !map.hasLayer(original)){
      original.options.autoPan = false;
      var ll = latlng || (layer.getLatLng && layer.getLatLng());
      if(ll) original.setLatLng(ll);
      // Funziona anche per marker contenuti in un cluster della mappa 2D.
      original.openOn(map);
    }
    return true;
  }

  function openPlace(latlng, name){
    if(!active) return false;
    var request = ++selectionId;
    var attempts = 0;
    var target = window.L.latLng(latlng);
    function normalize(value){ return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim(); }
    function find(){
      if(!active || request !== selectionId) return;
      ++attempts;
      collectVisiblePoints();
      var candidates = Object.keys(pointLayers).map(function(id){ return pointLayers[id]; }).filter(function(layer){
        return (!layer.options || layer.options.pane !== 'pane-fav-stars') && layer.getLatLng().distanceTo(target) < 12;
      });
      var wanted = normalize(name);
      var match = candidates.find(function(layer){ return normalize(layerLabel(layer)).indexOf(wanted) !== -1; });
      if(match || (candidates.length && attempts >= 10)){
        openLayer(match || candidates[0], target);
      }else if(attempts < 20){
        window.setTimeout(find, 150);
      }else{
        window.L.popup({autoPan:false}).setLatLng(target).setContent(popupContent(null, name, '')).openOn(leafletMap());
      }
    }
    find();
    return true;
  }

  function leafletMap(){
    return window.map || window.__LEAFLET_MAP__ || window.__map || null;
  }

  function usable(){
    return !!(window.maptilersdk && window.maptilersdk.Map && window.MAPTILER_KEY);
  }

  function setButtonState(){
    if(!toggle) return;
    toggle.setAttribute('aria-pressed', active ? 'true' : 'false');
    toggle.setAttribute('aria-label', uiText(active ? 1 : 0));
    toggle.setAttribute('title', uiText(active ? 1 : 0));
  }

  function makeContainer(){
    var host = document.getElementById('map');
    if(!host) return false;
    container = document.getElementById('gm-map-3d');
    if(!container){
      container = document.createElement('div');
      container.id = 'gm-map-3d';
      container.hidden = true;
      container.setAttribute('aria-label', 'Mappa tridimensionale di Genova');
      host.appendChild(container);
    }
    if(window.L && window.L.DomEvent && !container.__gmEventsIsolated){
      window.L.DomEvent.disableClickPropagation(container);
      window.L.DomEvent.disableScrollPropagation(container);
      container.__gmEventsIsolated = true;
    }
    return true;
  }

  function makeControl(){
    var anchor = document.getElementById('ui-zoom-anchor');
    if(!anchor) return false;
    toggle = document.getElementById('gm-3d-toggle');
    if(!toggle){
      toggle = document.createElement('button');
      toggle.id = 'gm-3d-toggle';
      toggle.type = 'button';
      toggle.textContent = '3D';
      var zoom = anchor.querySelector('.leaflet-control-zoom');
      anchor.insertBefore(toggle, zoom || anchor.firstChild);
      toggle.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        if(active) exit3D();
        else enter3D();
      });
    }
    toggle.disabled = false;
    setButtonState();
    wireZoom(anchor);
    return true;
  }

  function wireZoom(anchor){
    if(anchor.__gm3dZoomWired) return;
    anchor.__gm3dZoomWired = true;
    anchor.addEventListener('click', function(event){
      if(!active || !map3d) return;
      var control = event.target && event.target.closest
        ? event.target.closest('.leaflet-control-zoom-in, .leaflet-control-zoom-out')
        : null;
      if(!control) return;
      event.preventDefault();
      event.stopPropagation();
      if(event.stopImmediatePropagation) event.stopImmediatePropagation();
      if(control.classList.contains('leaflet-control-zoom-in')) map3d.zoomIn({duration:220});
      else map3d.zoomOut({duration:220});
    }, true);
  }

  function featureColor(layer){
    var options = layer && layer.options || {};
    if(options.fillColor && !/^#?(fff|ffffff)$/i.test(String(options.fillColor))) return options.fillColor;
    if(options.color && options.color !== '#3388ff') return options.color;
    if(options.fillColor) return options.fillColor;
    var icon = options.icon && options.icon.options || {};
    var text = [icon.className, icon.iconUrl, options.className].filter(Boolean).join(' ').toLowerCase();
    if(/document|doc-ico|orange|cinema/.test(text)) return '#f97316';
    if(/qr|azzurr|blue|bus|metro|train|mare|aereo/.test(text)) return '#2563eb';
    if(/wall|mura|red|storia/.test(text)) return '#dc2626';
    if(/museum|muse|palazz|violet|purple/.test(text)) return '#8b5cf6';
    if(/parch|green|sport/.test(text)) return '#16a34a';
    if(/chies|yellow|gold|prefer/.test(text)) return '#ca8a04';
    if(/local|food|ristor|alber|pink/.test(text)) return '#db2777';
    return '#2563eb';
  }

  function textFromContent(content){
    if(content == null) return '';
    if(content && content.nodeType === 1) return String(content.textContent || '').trim();
    var temp = document.createElement('div');
    temp.innerHTML = String(content);
    return String(temp.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function layerLabel(layer){
    try{
      var tooltip = layer.getTooltip && layer.getTooltip();
      if(tooltip){
        var value = tooltip.getContent();
        if(typeof value === 'function') value = value.call(layer, layer);
        var label = textFromContent(value);
        if(label) return label.slice(0, 160);
      }
    }catch(_e){}
    try{
      var boundPopup = layer.getPopup && layer.getPopup();
      if(boundPopup){
        var content = boundPopup.getContent();
        if(typeof content === 'function') content = content.call(layer, layer);
        var popupLabel = textFromContent(content);
        if(popupLabel) return popupLabel.slice(0, 160);
      }
    }catch(_e){}
    return 'Punto sulla mappa';
  }

  function layerPopupMarkup(layer){
    try{
      if(typeof window.__gmWallPopupMarkupForLayer === 'function'){
        var wallMarkup = window.__gmWallPopupMarkupForLayer(layer);
        if(wallMarkup) return wallMarkup;
      }
      var boundPopup = layer && layer.getPopup && layer.getPopup();
      if(!boundPopup) return '';
      var content = boundPopup.getContent();
      if(typeof content === 'function') content = content.call(layer, layer);
      if(content && content.nodeType === 1) return content.outerHTML || content.innerHTML || '';
      return content == null ? '' : String(content);
    }catch(_e){ return ''; }
  }

  function isPointLayer(layer){
    if(!layer || !window.L) return false;
    if(window.L.MarkerCluster && layer instanceof window.L.MarkerCluster) return false;
    return (window.L.Marker && layer instanceof window.L.Marker) ||
      (window.L.CircleMarker && layer instanceof window.L.CircleMarker);
  }

  function isLineLayer(layer){
    if(!layer || !window.L || !window.L.Polyline) return false;
    return layer instanceof window.L.Polyline && !isPointLayer(layer);
  }

  function collectVisiblePoints(){
    var map = leafletMap();
    var features = [];
    var visited = Object.create(null);
    pointLayers = Object.create(null);
    trackedPoints = Object.create(null);
    if(!map || !window.L || typeof map.eachLayer !== 'function') return features;

    function walk(layer){
      if(!layer) return;
      var stamp;
      try{ stamp = String(window.L.stamp(layer)); }catch(_e){ return; }
      if(visited[stamp]) return;
      visited[stamp] = true;

      if(isPointLayer(layer) && typeof layer.getLatLng === 'function'){
        trackedPoints[stamp] = layer;
        var latlng;
        try{ latlng = layer.getLatLng(); }catch(_e){ latlng = null; }
        if(!latlng || !isFinite(latlng.lat) || !isFinite(latlng.lng)) return;
        if(layer.options && (layer.options.opacity === 0 || layer.options.fillOpacity === 0)) return;
        pointLayers[stamp] = layer;
        features.push({
          type:'Feature',
          id:Number(stamp),
          geometry:{type:'Point', coordinates:[Number(latlng.lng), Number(latlng.lat)]},
          properties:{
            gm3dId:stamp,
            color:featureColor(layer),
            radius:window.L.CircleMarker && layer instanceof window.L.CircleMarker && !(window.L.Circle && layer instanceof window.L.Circle) ? Number(layer.options.radius) : null,
            opacity:typeof layer.options.fillOpacity === 'number' ? layer.options.fillOpacity : (typeof layer.options.opacity === 'number' ? layer.options.opacity : .94),
            label:layerLabel(layer),
            popupHtml:layerPopupMarkup(layer)
          }
        });
        return;
      }

      if(typeof layer.eachLayer === 'function'){
        try{ layer.eachLayer(walk); }catch(_e){}
      }
    }

    try{ map.eachLayer(walk); }catch(_e){}
    return features;
  }

  function collectVisibleLines(){
    var map = leafletMap();
    var features = [];
    var visited = Object.create(null);
    lineLayers = Object.create(null);
    trackedLines = Object.create(null);
    if(!map || !window.L || typeof map.eachLayer !== 'function') return features;

    function appendPaths(value, paths){
      if(!Array.isArray(value) || !value.length) return;
      if(value[0] && isFinite(value[0].lat) && isFinite(value[0].lng)){
        var path = value.map(function(item){ return [Number(item.lng), Number(item.lat)]; });
        if(path.length > 1) paths.push(path);
        return;
      }
      value.forEach(function(child){ appendPaths(child, paths); });
    }

    function walk(layer){
      if(!layer) return;
      var stamp;
      try{ stamp = String(window.L.stamp(layer)); }catch(_e){ return; }
      if(visited[stamp]) return;
      visited[stamp] = true;

      if(isLineLayer(layer) && typeof layer.getLatLngs === 'function'){
        trackedLines[stamp] = layer;
        var options = layer.options || {};
        if(options.opacity === 0 || options.weight === 0) return;
        var paths = [];
        try{ appendPaths(layer.getLatLngs(), paths); }catch(_e){ paths = []; }
        if(paths.length){
          lineLayers[stamp] = layer;
          features.push({
            type:'Feature',
            id:Number(stamp),
            geometry:paths.length === 1
              ? {type:'LineString', coordinates:paths[0]}
              : {type:'MultiLineString', coordinates:paths},
            properties:{
              gm3dId:stamp,
              color:options.color || '#2563eb',
              width:Math.max(1, Math.min(8, Number(options.weight) || 3)),
              opacity:isFinite(options.opacity) ? Number(options.opacity) : .9,
              dashed:!!options.dashArray,
              label:layerLabel(layer),
              popupHtml:layerPopupMarkup(layer)
            }
          });
        }
        return;
      }

      if(typeof layer.eachLayer === 'function'){
        try{ layer.eachLayer(walk); }catch(_e){}
      }
    }

    try{ map.eachLayer(walk); }catch(_e){}
    return features;
  }

  function geoJson(){
    var features = collectVisiblePoints();
    if(container){
      container.dataset.pointCount = String(features.length);
      container.dataset.popupCount = String(features.filter(function(feature){
        return !!(feature.properties && feature.properties.popupHtml);
      }).length);
      container.dataset.popupImageCount = String(features.filter(function(feature){
        return /<img\b/i.test(String(feature.properties && feature.properties.popupHtml || ''));
      }).length);
    }
    return {type:'FeatureCollection', features:features};
  }

  function linesGeoJson(){
    var features = collectVisibleLines();
    if(container){
      container.dataset.lineCount = String(features.length);
      container.dataset.linePopupCount = String(features.filter(function(feature){
        return !!(feature.properties && feature.properties.popupHtml);
      }).length);
    }
    return {type:'FeatureCollection', features:features};
  }

  function addPointLayers(){
    if(!map3d || !map3d.getSource || map3d.getSource(SOURCE_ID)) return;
    map3d.addSource(SOURCE_ID, {
      type:'geojson',
      data:geoJson(),
      cluster:true,
      clusterMaxZoom:15,
      clusterRadius:42
    });
    map3d.addLayer({
      id:CLUSTER_ID,
      type:'circle',
      source:SOURCE_ID,
      filter:['has','point_count'],
      paint:{
        'circle-color':'#1d4ed8',
        'circle-radius':['step',['get','point_count'],17,25,21,100,26],
        'circle-stroke-color':'#ffffff',
        'circle-stroke-width':2,
        'circle-opacity':.9
      }
    });

    map3d.addSource(LINE_SOURCE_ID, {
      type:'geojson',
      data:linesGeoJson()
    });
    map3d.addLayer({
      id:LINE_SOLID_ID,
      type:'line',
      source:LINE_SOURCE_ID,
      filter:['!=',['get','dashed'],true],
      layout:{'line-cap':'round','line-join':'round'},
      paint:{
        'line-color':['coalesce',['get','color'],'#2563eb'],
        'line-width':['coalesce',['get','width'],3],
        'line-opacity':['coalesce',['get','opacity'],.9]
      }
    }, CLUSTER_ID);
    map3d.addLayer({
      id:LINE_DASHED_ID,
      type:'line',
      source:LINE_SOURCE_ID,
      filter:['==',['get','dashed'],true],
      layout:{'line-cap':'round','line-join':'round'},
      paint:{
        'line-color':['coalesce',['get','color'],'#2563eb'],
        'line-width':['coalesce',['get','width'],3],
        'line-opacity':['coalesce',['get','opacity'],.9],
        'line-dasharray':[2,2]
      }
    }, CLUSTER_ID);
    map3d.addLayer({
      id:LINE_HIT_ID,
      type:'line',
      source:LINE_SOURCE_ID,
      layout:{'line-cap':'round','line-join':'round'},
      paint:{'line-width':12,'line-opacity':.01}
    }, CLUSTER_ID);
    map3d.addLayer({
      id:CLUSTER_COUNT_ID,
      type:'symbol',
      source:SOURCE_ID,
      filter:['has','point_count'],
      layout:{'text-field':['get','point_count_abbreviated'],'text-size':12},
      paint:{'text-color':'#ffffff'}
    });
    map3d.addLayer({
      id:POINT_ID,
      type:'circle',
      source:SOURCE_ID,
      filter:['!',['has','point_count']],
      paint:{
        'circle-color':['coalesce',['get','color'],'#2563eb'],
        // L'espressione basata sullo zoom deve essere al livello principale.
        'circle-radius':['interpolate',['linear'],['zoom'],
          9,['coalesce',['get','radius'],5],
          16,['coalesce',['get','radius'],8]],
        'circle-stroke-color':'#ffffff',
        'circle-stroke-width':2,
        'circle-opacity':['coalesce',['get','opacity'],.94]
      }
    });

    map3d.on('click', POINT_ID, openPointPopup);
    map3d.on('click', function(event){
      if(!popup) return;
      var hits = map3d.queryRenderedFeatures(event.point, {layers:[POINT_ID, CLUSTER_ID, LINE_HIT_ID]});
      if(!hits.length){ ++selectionId; popup.remove(); }
    });
    map3d.on('click', CLUSTER_ID, expandCluster);
    map3d.on('click', LINE_HIT_ID, function(event){
      var feature = event.features && event.features[0];
      if(feature) openLinePopup(feature, event.lngLat);
    });
    [POINT_ID, CLUSTER_ID, LINE_HIT_ID].forEach(function(id){
      map3d.on('mouseenter', id, function(){ map3d.getCanvas().style.cursor = 'pointer'; });
      map3d.on('mouseleave', id, function(){ map3d.getCanvas().style.cursor = ''; });
    });
  }

  function syncPoints(){
    if(!active || !ready || !map3d) return;
    var source = map3d.getSource(SOURCE_ID);
    if(source && typeof source.setData === 'function'){
      var points = geoJson();
      var pointsText = JSON.stringify(points);
      if(pointsText !== lastPoints){ source.setData(points); lastPoints = pointsText; }
      if(container) container.dataset.pointsReady = 'true';
    }
    var lineSource = map3d.getSource(LINE_SOURCE_ID);
    if(lineSource && typeof lineSource.setData === 'function'){
      var lines = linesGeoJson();
      var linesText = JSON.stringify(lines);
      if(linesText !== lastLines){ lineSource.setData(lines); lastLines = linesText; }
      if(container) container.dataset.linesReady = 'true';
    }
    if(popup && popup.__leafletPopup){
      var ll = popup.__leafletPopup.getLatLng();
      if(ll) popup.setLngLat([ll.lng, ll.lat]);
    }
  }

  function schedulePointSync(){
    if(!active) return;
    if(syncTimer) return;
    syncTimer = window.setTimeout(function(){
      syncTimer = null;
      syncPoints();
    }, 80);
  }

  function scheduleUiPointSync(){
    if(!active) return;
    schedulePointSync();
    window.setTimeout(schedulePointSync, 180);
    window.setTimeout(schedulePointSync, 520);
  }

  function popupContent(layer, fallbackLabel, fallbackHtml){
    var wrap = document.createElement('div');
    wrap.className = 'gm-3d-popup-content leaflet-popup-content';
    var content = null;
    try{
      var boundPopup = layer && layer.getPopup && layer.getPopup();
      if(boundPopup){
        content = boundPopup.getContent();
        if(typeof content === 'function') content = content.call(layer, layer);
      }
    }catch(_e){ content = null; }
    if(fallbackHtml && String(fallbackHtml).trim()) wrap.innerHTML = String(fallbackHtml);
    else if(content && content.nodeType === 1) wrap.appendChild(content.cloneNode(true));
    else if(content != null && String(content).trim()) wrap.innerHTML = String(content);
    else{
      var title = document.createElement('p');
      title.className = 'gm-3d-popup-title';
      title.textContent = fallbackLabel || 'Punto sulla mappa';
      wrap.appendChild(title);
    }
    return wrap;
  }

  function openPointPopup(event){
    var feature = event.features && event.features[0];
    if(!feature) return;
    var id = String(feature.properties && feature.properties.gm3dId || '');
    var layer = pointLayers[id];
    ++selectionId;
    if(openLayer(layer)) return;
    var label = feature.properties && feature.properties.label;
    var html = feature.properties && feature.properties.popupHtml;
    if(!html && (!label || label === 'Punto sulla mappa')) return;
    if(popup) popup.remove();
    popup = new window.maptilersdk.Popup({closeButton:true, closeOnClick:true, maxWidth:'360px', className:'gm-3d-popup'})
      .setLngLat(feature.geometry.coordinates)
      .setDOMContent(popupContent(
        layer,
        label,
        html
      ))
      .addTo(map3d);
  }

  function openLinePopup(feature, lngLat){
    if(!feature) return;
    var id = String(feature.properties && feature.properties.gm3dId || '');
    var layer = lineLayers[id];
    ++selectionId;
    if(openLayer(layer, window.L.latLng(lngLat.lat, lngLat.lng))) return;
    var html = feature.properties && feature.properties.popupHtml;
    var label = feature.properties && feature.properties.label;
    if(!html && (!label || label === 'Punto sulla mappa')) return;
    if(popup) popup.remove();
    popup = new window.maptilersdk.Popup({closeButton:true, closeOnClick:true, maxWidth:'360px', className:'gm-3d-popup'})
      .setLngLat(lngLat)
      .setDOMContent(popupContent(layer, label, html))
      .addTo(map3d);
  }

  function expandCluster(event){
    var feature = event.features && event.features[0];
    var source = map3d && map3d.getSource(SOURCE_ID);
    if(!feature || !source || typeof source.getClusterExpansionZoom !== 'function') return;
    var handled = false;
    function applyZoom(zoom){
      if(handled || !isFinite(zoom)) return;
      handled = true;
      map3d.easeTo({center:feature.geometry.coordinates, zoom:zoom, duration:350});
    }
    try{
      var result = source.getClusterExpansionZoom(feature.properties.cluster_id, function(error, zoom){
        if(!error) applyZoom(zoom);
      });
      if(result && typeof result.then === 'function') result.then(applyZoom).catch(function(){});
    }catch(_e){}
  }

  function showHint(){
    if(!container) return;
    if(!hint){
      hint = document.createElement('div');
      hint.className = 'gm-3d-hint';
      hint.textContent = uiText(7);
      container.appendChild(hint);
    }
    hint.classList.remove('is-hidden');
    window.setTimeout(function(){ if(hint) hint.classList.add('is-hidden'); }, 4200);
  }

  function current2DView(){
    var map = leafletMap();
    if(!map) return {center:[8.9463,44.4056], zoom:12};
    var center = map.getCenter();
    return {center:[center.lng, center.lat], zoom:Math.max(0, map.getZoom() - 1)};
  }

  /* Le chiamate dell'app usano coordinate [lat, lng] e zoom Leaflet.
     La vista 3D usa [lng, lat] e tessere da 512 px: uno zoom in meno. */
  function focus(latlng, zoom, options){
    if(!active || !map3d || !latlng) return false;
    ++selectionId;
    var lat = Number(Array.isArray(latlng) ? latlng[0] : latlng.lat);
    var lng = Number(Array.isArray(latlng) ? latlng[1] : latlng.lng);
    if(!isFinite(lat) || !isFinite(lng) || !isFinite(zoom)) return false;
    options = options || {};
    var targetZoom = Number(zoom) - 1;
    if(options.minZoom) targetZoom = Math.max(targetZoom, map3d.getZoom());
    targetZoom = Math.max(map3d.getMinZoom(), Math.min(map3d.getMaxZoom(), targetZoom));
    var view = {center:[lng, lat], zoom:targetZoom};
    if(popup){ popup.remove(); popup = null; }
    // Anche prima di load la camera accetta jumpTo; conserva l'ultima scelta.
    if(!ready){
      pendingView = view;
      map3d.jumpTo(view);
    }else{
      map3d.easeTo({center:view.center, zoom:view.zoom, duration:350});
    }
    schedulePointSync();
    return true;
  }

  function createMap3D(view){
    window.maptilersdk.config.apiKey = window.MAPTILER_KEY;
    var options = {
      container:container,
      style:window.GENOVA_BASEMAP_STYLE_ID,
      center:view.center,
      zoom:view.zoom,
      pitch:55,
      bearing:0,
      maxPitch:70,
      dragRotate:true,
      aroundCenter:false,
      pitchWithRotate:true,
      touchPitch:true,
      touchZoomRotate:true,
      navigationControl:false,
      geolocateControl:false,
      attributionControl:true
    };
    var leaflet = leafletMap();
    if(leaflet){
      var minZoom = leaflet.getMinZoom();
      var maxZoom = leaflet.getMaxZoom();
      if(isFinite(minZoom)) options.minZoom = minZoom - 1;
      if(isFinite(maxZoom)) options.maxZoom = maxZoom - 1;
    }
    map3d = new window.maptilersdk.Map(options);
    var instance = map3d;
    mouseChord = installMouseChord(instance);
    instance.on('error', function(event){
      if(map3d !== instance) return;
      var error = event && event.error || {};
      if(error.status === 401 || error.status === 403){ fail3D(instance); return; }
      if(active && ready) showNotice('partial');
    });
    instance.on('webglcontextlost', function(){ fail3D(instance); });
    instance.once('load', function(){
      if(map3d !== instance) return;
      try{
      addPointLayers();
      if(!map3d || !map3d.getLayer(POINT_ID)) throw new Error('Missing 3D points layer');
      ready = true;
      clearLoadTimer();
      container.removeAttribute('aria-busy');
      showNotice('');
      if(container) container.dataset.mapReady = 'true';
      if(pendingView){
        map3d.jumpTo({center:pendingView.center, zoom:pendingView.zoom, pitch:55});
        pendingView = null;
      }
      syncPoints();
      }catch(_e){ fail3D(instance); }
    });
  }

  function enter3D(){
    if(active || !makeContainer()) return;
    if(!usable()){ showNotice('error'); return; }
    showNotice('');
    var leaflet = leafletMap();
    if(leaflet && leaflet.stop) leaflet.stop();
    var view = current2DView();
    active = true;
    joystickLookMode = false;
    document.documentElement.classList.remove('gm-map-3d-look-mode');
    container.hidden = false;
    document.documentElement.classList.add('gm-map-3d-active');
    setButtonState();
    try{ var map = leafletMap(); if(map) map.closePopup(); }catch(_e){}
    try{
      if(!map3d) createMap3D(view);
      else{
        map3d.resize();
        map3d.jumpTo({center:view.center, zoom:view.zoom, pitch:55});
        if(ready) syncPoints();
        else pendingView = view;
      }
    }catch(_e){
      fail3D(map3d);
      return;
    }
    watchLoad();
    showHint();
    document.dispatchEvent(new CustomEvent('app:map-3d-change', {detail:{active:true}}));
  }

  function exit3D(){
    if(!active) return;
    if(mouseChord) mouseChord.cancel();
    active = false;
    joystickLookMode = false;
    document.documentElement.classList.remove('gm-map-3d-look-mode');
    clearLoadTimer();
    if(languageTimer) window.clearTimeout(languageTimer);
    languageTimer = null;
    showNotice('');
    if(syncTimer) window.clearTimeout(syncTimer);
    syncTimer = null;
    ++selectionId;
    var map = leafletMap();
    try{
      if(map3d && map){
        map3d.stop();
        var center = map3d.getCenter();
        // Conserva anche gli zoom intermedi ottenuti con rotella o touch in 3D.
        var zoomSnap = map.options.zoomSnap;
        try{
          map.options.zoomSnap = 0;
          map.setView([center.lat, center.lng], map3d.getZoom() + 1, {animate:false});
        }finally{ map.options.zoomSnap = zoomSnap; }
      }
    }catch(_e){}
    pendingView = null;
    if(popup){ try{ popup.remove(); }catch(_e){} popup = null; }
    container.hidden = true;
    document.documentElement.classList.remove('gm-map-3d-active');
    setButtonState();
    try{ if(map) map.invalidateSize(false); }catch(_e){}
    document.dispatchEvent(new CustomEvent('app:map-3d-change', {detail:{active:false}}));
  }

  function setJoystickLookMode(on){
    on = !!on && active;
    if(joystickLookMode === on){
      document.documentElement.classList.toggle('gm-map-3d-look-mode', !!(active && on));
      return joystickLookMode;
    }
    joystickLookMode = on;
    document.documentElement.classList.toggle('gm-map-3d-look-mode', !!(active && on));
    try{
      document.dispatchEvent(new CustomEvent('app:map-3d-joystick-mode', {
        detail:{active:joystickLookMode}
      }));
    }catch(_e){}
    return joystickLookMode;
  }

  function toggleJoystickLookMode(){
    if(!active) return false;
    return setJoystickLookMode(!joystickLookMode);
  }

  /* Modalita joystick "Rotazione": assi volutamente invertiti rispetto
     al vettore del joystick. Destra/sinistra modifica il bearing in senso
     opposto; alto/basso modifica il pitch in senso opposto. */
  function lookBy(x, y){
    if(!active || !map3d || !joystickLookMode) return false;
    x = Number(x) || 0;
    y = Number(y) || 0;
    try{
      var minPitch = typeof map3d.getMinPitch === 'function' ? map3d.getMinPitch() : 0;
      var maxPitch = typeof map3d.getMaxPitch === 'function' ? map3d.getMaxPitch() : 70;
      var nextPitch = map3d.getPitch() + y * .18;
      nextPitch = Math.max(minPitch, Math.min(maxPitch, nextPitch));
      map3d.jumpTo({
        bearing:map3d.getBearing() - x * .32,
        pitch:nextPitch
      });
      return true;
    }catch(_e){ return false; }
  }

  function panBy(x, y){
    if(!active || !map3d) return false;
    try{ map3d.panBy([x, y], {duration:0}); return true; }catch(_e){ return false; }
  }

  function boot(){
    makeContainer();
    document.addEventListener('app:set-lang', refreshLanguage);
    window.addEventListener('i18n:changed', refreshLanguage);
    var bindAttempts = 0;
    (function bindMap(){
    var map = leafletMap();
    if(map && typeof map.on === 'function'){
      observeLayerUpdates();
      map.on('layeradd layerremove', schedulePointSync);
      map.on('popupopen', showLeafletPopup);
      map.on('popupclose', function(event){
        if(popup && popup.__leafletPopup === event.popup) popup.remove();
      });
    }else if(++bindAttempts < 100) window.setTimeout(bindMap, 100);
    })();
    var quickToggles = document.getElementById('quick-toggles');
    if(quickToggles && !quickToggles.__gm3dSyncWired){
      quickToggles.__gm3dSyncWired = true;
      /* La fase capture intercetta anche i comandi che fermano la propagazione,
         come "Disattiva tutti i Marker". */
      quickToggles.addEventListener('click', scheduleUiPointSync, true);
      quickToggles.addEventListener('change', scheduleUiPointSync, true);
    }
    var attempts = 0;
    (function controlTick(){
      if(makeControl()) return;
      if(++attempts < 80) window.setTimeout(controlTick, 50);
    })();
  }

  window.__gmMap3D = {
    enter:enter3D,
    exit:exit3D,
    toggle:function(){ if(active) exit3D(); else enter3D(); },
    isActive:function(){ return active; },
    focus:focus,
    openPlace:openPlace,
    syncPoints:syncPoints,
    panBy:panBy,
    lookBy:lookBy,
    isJoystickLookMode:function(){ return !!(active && joystickLookMode); },
    setJoystickLookMode:setJoystickLookMode,
    toggleJoystickLookMode:toggleJoystickLookMode
  };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
