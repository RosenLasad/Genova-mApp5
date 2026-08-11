
(function(){
  // mappa dei percorsi attivi sulla mappa
  var activeRoutes = {};

  // lingua corrente sicura
  function getLangSafe(){
    try {
      if (window.CURRENT_LANG) return window.CURRENT_LANG;
      var raw = (localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it');
      return (raw || 'it');
    } catch(e){
      return 'it';
    }
  }

  // prova a ricavare i metadati del percorso (nome, colore) dalla struttura PERCORSI
  function getRouteMeta(routeId){
    var sources = [];
    if (window.PERCORSI) sources.push(window.PERCORSI);
    try {
      if (typeof PERCORSI !== 'undefined') sources.push(PERCORSI);
    } catch(e){}
    for (var s = 0; s < sources.length; s++){
      var src = sources[s];
      for (var cat in src){
        if(!Object.prototype.hasOwnProperty.call(src, cat)) continue;
        var arr = src[cat] || [];
        for (var i=0;i<arr.length;i++){
          if (arr[i].id === routeId){
            return arr[i];
          }
        }
      }
    }
    return null;
  }

  // tenta a ricavare un nome localizzato del percorso dalle traduzioni route-labels
  function getLocalizedRouteName(routeId, lang){
    var dict = null;
    if (window.I18N_ROUTES) dict = window.I18N_ROUTES;
    else {
      try { if (typeof I18N_ROUTES !== 'undefined') dict = I18N_ROUTES; } catch(e){}
    }
    if (!dict) return null;

    var entry = dict[routeId];
    if (!entry) return null;

    if (entry[lang]) return entry[lang];
    var base = String(lang).split('-')[0];
    if (entry[base]) return entry[base];
    if (entry.it) return entry.it;
    for (var k in entry){
      if (entry[k]) return entry[k];
    }
    return null;
  }

  // costruisce l'HTML del popup inizio/fine con descrizione multilingua
  function makePopupHTML(routeId, mode){
    // mode: 'start' | 'end'
    var lang = getLangSafe();

    // 1. titolo percorso (nome visibile in alto)
    var localizedTitle = getLocalizedRouteName(routeId, lang);
    if (!localizedTitle){
        var meta = getRouteMeta(routeId) || {};
        localizedTitle = meta.name || routeId;
    }

    // 2. dati popup localizzati
    var popupRoot = null;
    if (window.I18N_POPUP) {
      popupRoot = window.I18N_POPUP;
    } else {
      try {
        if (typeof I18N_POPUP !== 'undefined') popupRoot = I18N_POPUP;
      } catch(e){}
    }

    var popupData = popupRoot && popupRoot[routeId] && popupRoot[routeId][mode];

    function pickLang(obj){
      if(!obj) return null;
      if(obj[lang]) return obj[lang];
      var base = String(lang).split('-')[0];
      if(obj[base]) return obj[base];
      if(obj.it) return obj.it;
      for (var k in obj){ if(obj[k]) return obj[k]; }
      return null;
    }

    var chosen = pickLang(popupData) || {};

    // 3. colore della barra del popup
    var color = null;
    var meta2 = getRouteMeta(routeId) || {};
    if (meta2 && meta2.color) color = meta2.color;
    if (!color && window.__ROUTE_DATA && window.__ROUTE_DATA[routeId] && window.__ROUTE_DATA[routeId].color){
      color = window.__ROUTE_DATA[routeId].color;
    }
    if (!color) color = '#3388ff';

    // 4. costruiamo l'HTML finale
    var htmlParts = [];
    htmlParts.push('<div style="border-radius:6px; overflow:hidden; font-family:sans-serif; font-size:14px; line-height:1.4;">');
    htmlParts.push('<div style="height:6px; background:'+color+';"></div>');
    htmlParts.push('<div style="padding:8px 10px 10px 10px;">');
    htmlParts.push('<div style="font-weight:600; font-size:15px; margin-bottom:4px;">'+localizedTitle+'</div>');
    if (chosen.section){
      htmlParts.push('<div style="font-size:13px; font-weight:500; color:#444; margin-bottom:2px;">'+chosen.section+'</div>');
    } else {
      htmlParts.push('<div style="font-size:13px; font-weight:500; color:#444; margin-bottom:2px;">'+(mode==='start'?'Inizio percorso':'Fine percorso')+'</div>');
    }
    if (chosen.duration){
      htmlParts.push('<div style="font-size:12px; color:#666; margin-bottom:6px;">'+chosen.duration+'</div>');
    }
    if (chosen.desc){
      htmlParts.push('<div style="font-size:13px; color:#222; text-align:justify;">'+chosen.desc+'</div>');
    }
    htmlParts.push('</div></div>');

    return htmlParts.join('');
  }

  // crea (se serve) il layerGroup per le rotte
  function ensureRouteLayer(){
    if (!window.map || !window.L) return null;
    if (!window.routeLayer2){
      window.routeLayer2 = window.L.layerGroup().addTo(window.map);
    }
    return window.routeLayer2;
  }

  function addRoute(routeId){
    if (activeRoutes[routeId]) return; // già attivo
    if (!window.__ROUTE_DATA || !window.__ROUTE_DATA[routeId]) return;
    if (!window.L || !window.map) return;

    var routeData = window.__ROUTE_DATA[routeId];
    var layerGroup = ensureRouteLayer();
    if (!layerGroup) return;

    var meta = getRouteMeta(routeId) || {};
    var color = routeData.color || meta.color || '#3388ff';

    // linea del percorso
    var poly = window.L.polyline(routeData.polyline, {
  color: color,
  weight: 4,
  opacity: 0.9,
  dashArray: "4,6"
    }).addTo(layerGroup);

    // marker inizio
    var startMarker = window.L.circleMarker(
      [routeData.start.lat, routeData.start.lng],
      {
        radius: 6,
        weight: 2,
        color: color,
        fillColor: "#fff",
        fillOpacity: 1
      }
    )
    .bindTooltip("Inizio", {direction:"top"})
.bindPopup(window.buildPopupHTML(routeId, 'start', color), {maxWidth:260, className:"route-pop"})
    .addTo(layerGroup);

    // marker fine
    var endMarker = window.L.circleMarker(
      [routeData.end.lat, routeData.end.lng],
      {
        radius: 6,
        weight: 2,
        color: color,
        fillColor: "#fff",
        fillOpacity: 1
      }
    )
    .bindTooltip("Fine", {direction:"top"})
.bindPopup(window.buildPopupHTML(routeId, 'end', color), {maxWidth:260, className:"route-pop"})
    .addTo(layerGroup);

    activeRoutes[routeId] = {
      poly: poly,
      startMarker: startMarker,
      endMarker: endMarker
    };
  }

  function removeRoute(routeId){
    var entry = activeRoutes[routeId];
    if(!entry) return;
    var layerGroup = ensureRouteLayer();
    if(layerGroup){
      if(entry.poly) layerGroup.removeLayer(entry.poly);
      if(entry.startMarker) layerGroup.removeLayer(entry.startMarker);
      if(entry.endMarker) layerGroup.removeLayer(entry.endMarker);
    }
    delete activeRoutes[routeId];
  }

  // forza l'aggiornamento dei popup (per cambio lingua live)
  function refreshRoutePopups(){
  for (var rid in activeRoutes){
    if(!activeRoutes[rid]) continue;
    var entry = activeRoutes[rid];

    var rd = (window.__ROUTE_DATA && window.__ROUTE_DATA[rid]) ? window.__ROUTE_DATA[rid] : {};
    var meta = (typeof getRouteMeta === 'function') ? (getRouteMeta(rid) || {}) : {};
    var c = rd.color || meta.color || '#3388ff';

    if (entry.startMarker){
      entry.startMarker.setPopupContent(window.buildPopupHTML(rid, 'start', c));
    }
    if (entry.endMarker){
      entry.endMarker.setPopupContent(window.buildPopupHTML(rid, 'end', c));
    }
  }
}


  // listener su tutte le checkbox dei percorsi
document.addEventListener('change', function(e){
  if(!e.target.matches('input.route-chk')) return;
  var row = e.target.closest('.doc-row[data-route-id]');
  if(!row) return;
  var rid = row.getAttribute('data-route-id');
  if(!rid) return;

  if(e.target.checked){
    // accendi il percorso
    addRoute(rid);


    // se è "Giornata del marinaio", accendi solo il doc "Seno di Giano"
if (rid === 'cs-giornata-marinaio') {

  var docChk = document.getElementById('storia-doc-seno-di-giano');
  if (docChk && !docChk.checked) {
    docChk.checked = true;
    try {
      docChk.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (_) {
      var ev2 = document.createEvent('Event');
      ev2.initEvent('change', true, true);
      docChk.dispatchEvent(ev2);
    }
  }
}

// se è "Strada del Balilla", accendi anche il doc "San Teodoro"
if (rid === 'dm-strada-balilla') {

  var docChk2 = document.getElementById('storia-doc-san-teodoro');
  if (docChk2 && !docChk2.checked) {
    docChk2.checked = true;
    try {
      docChk2.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (_) {
      var ev = document.createEvent('Event');
      ev.initEvent('change', true, true);
      docChk2.dispatchEvent(ev);
    }
  }
}

// se è "Strada Borghese", accendi anche i doc "Piazza de Ferrari" + "Via XX Settembre"
if (rid === 'fm-strada-borghese') {

  var docIds = ['storia-doc-piazza', 'storia-doc-viaxx'];

  docIds.forEach(function(id){
    var cb = document.getElementById(id);
    if (cb && !cb.checked) {
      cb.checked = true;
      try {
        cb.dispatchEvent(new Event('change', { bubbles: true }));
      } catch (_) {
        var ev = document.createEvent('Event');
        ev.initEvent('change', true, true);
        cb.dispatchEvent(ev);
      }
    }
  });
}



} else {
  // spegni il percorso
removeRoute(rid);

// se è "Giornata del marinaio", spegni solo il doc collegato
if (rid === 'cs-giornata-marinaio') {

  var docChkOff = document.getElementById('storia-doc-seno-di-giano');
  if (docChkOff && docChkOff.checked) {
    docChkOff.checked = false;
    try {
      docChkOff.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (_) {
      var ev3 = document.createEvent('Event');
      ev3.initEvent('change', true, true);
      docChkOff.dispatchEvent(ev3);
    }
  }
}

// se è "Strada del Balilla", spegni anche il doc "San Teodoro"
if (rid === 'dm-strada-balilla') {

  var docChkOff2 = document.getElementById('storia-doc-san-teodoro');
  if (docChkOff2 && docChkOff2.checked) {
    docChkOff2.checked = false;
    try {
      docChkOff2.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (_) {
      var ev4 = document.createEvent('Event');
      ev4.initEvent('change', true, true);
      docChkOff2.dispatchEvent(ev4);
    }
  }
}

// se è "Strada Borghese", spegni anche i doc collegati
if (rid === 'fm-strada-borghese') {
  var docIdsOff = ['storia-doc-piazza', 'storia-doc-viaxx'];

  docIdsOff.forEach(function(id){
    var cb = document.getElementById(id);
    if (cb && cb.checked) {
      cb.checked = false;
      try {
        cb.dispatchEvent(new Event('change', { bubbles: true }));
      } catch (_) {
        var ev = document.createEvent('Event');
        ev.initEvent('change', true, true);
        cb.dispatchEvent(ev);
      }
    }
  });
}

}

}, true);



  // esponi funzioni globali che ci servono altrove
  window.__routesFallback = {
    addRoute:addRoute,
    removeRoute:removeRoute,
    refreshRoutePopups:refreshRoutePopups
  };
  window.refreshRoutePopups = refreshRoutePopups;

})();
