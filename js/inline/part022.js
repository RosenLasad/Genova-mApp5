
  (function(){
    var BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    var statusEl = document.getElementById('status');
    function showStatus(msg){ statusEl.textContent = msg; statusEl.style.display = 'block'; }
    function hideStatus(){ statusEl.style.display = 'none'; }

// --- GPS state ---
var gpsMarker = null;
var gpsAccuracy = null;
var gpsActive = false;
var firstFixDone = false;
var gpsLocked = false;
// --- Manual override: fixed coordinates (centro storico)
var MANUAL_OVERRIDE = false; // true = usa coordinate fisse
var MANUAL_COORDS = L.latLng(44.406849639039166, 8.930551057692641);

var gpsLastLatLng = null; // ultima posizione accettata (per deadband)

    // URL encoder per media (gestisce spazi e caratteri speciali)
    function srcURL(u){ try { return encodeURI(u); } catch(e){ return u; } }
function prefixScorci(u){ try{ if(!u) return u; if(/^https?:\/\//i.test(u)) return u; if(/[\/\\]/.test(u)) return u; return 'scorci_media/' + u; }catch(e){ return u; } }

// --- GPS helpers ---
function ensureGpsLayers(){
  if(!gpsMarker){
    gpsMarker = L.circleMarker([0,0], { radius: 8, weight: 1.6, color: '#ffffff', fillColor: '#22c55e', fillOpacity: .22 });
    gpsMarker.on('click', function(){
      if(gpsMarker && gpsMarker.getLatLng){ map.setView(gpsMarker.getLatLng(), map.getZoom(), { animate:true }); }
    });
}
  if(!gpsAccuracy){
    gpsAccuracy = L.circle([0,0], { radius: 0, weight: 1, color:'#22c55e', opacity:.6, fillOpacity: .22 });
  }
}
function setGpsOn(on){
  gpsActive = !!on;
  var btn = document.getElementById('btn-gps');
  if(btn) btn.classList.toggle('active', gpsActive);
  if(btn){(function(){var _b=document.getElementById('btn-gps'); if(!_b)return; var _l=(gpsActive?'Nascondimi':'Sono qui'); var _show = /nascondimi/i.test(_l); _b.setAttribute('title',_l); _b.setAttribute('aria-label',_l); var _sr=_b.querySelector('.sr-only'); if(_sr) _sr.textContent=_l; _b.classList.toggle('active', _show);})();}
// [disabled by GPT] if(gpsMarker && gpsMarker._path && gpsMarker._path.classList){
// [disabled by GPT]     // [disabled by GPT] if(gpsActive){ gpsMarker._path.classList.add('gps-pulse'); }
// [disabled by GPT]     // [disabled by GPT] else{ gpsMarker._path.classList.remove('gps-pulse'); }
// [disabled by GPT]   }
  if(gpsActive){
    firstFixDone = false;
    gpsLastLatLng = null;
    ensureGpsLayers();
    try{ gpsMarker.addTo(map); gpsAccuracy.addTo(map);  // Manual override: fissa il pallino sulle coordinate date
  if(MANUAL_OVERRIDE){
    try{ map.stopLocate(); }catch(e){}
    gpsLastLatLng = MANUAL_COORDS;
    gpsMarker.setLatLng(MANUAL_COORDS);
    gpsAccuracy.setLatLng(MANUAL_COORDS);
    gpsAccuracy.setRadius(8);
    firstFixDone = true;
    map.setView(MANUAL_COORDS, Math.max(map.getZoom(), 10), { animate:true });
  }
}
catch(e){}
    

  }
}

    // Bypass owner con ?me=1
    var urlParams = new URLSearchParams(window.location.search);
    var isOwner = localStorage.getItem('genovaqr_owner') === '1' || urlParams.get('me') === '1';
    if(urlParams.get('me') === '1'){ localStorage.setItem('genovaqr_owner','1'); isOwner = true; }

    // --- DATI (versione stabile) ---
    var PLACES = [];

    // --- MAPPA (versione stabile) ---
    var map, tiles; var markersById = {}; var groupBlue=null, groupOrange=null; var blueCluster=null; var SAN_TEODORO_CLUSTER_IDS=[];
// Aggregazione S.Teodoro (punto blu scuro + 3 azzurri)
var SAN_TEODORO_AGG_COORDS = [44.4137974975145, 8.914131666431476];
var sanAggMarker = null;
var sanAggThresholdZoom = null; // = zoom iniziale + 3



    
function wallsVisibilityLoad(){ try { return JSON.parse(localStorage.getItem('walls_visible')||'{}'); } catch(e){ return {}; } }
function wallsVisibilitySave(v){ try{ localStorage.setItem('walls_visible', JSON.stringify(v||{})); }catch(e){} }

function wallNodeStyle(type, wallColor){
  var base = { color: wallColor, weight: 1.2, opacity: 1, fillColor: wallColor, fillOpacity: 1 };
  if(type==='Rocca'){ base.radius = 9; base.weight = 2; }
  else if(type==='Forte'){ base.radius = 9; base.weight = 2; }
  else if(type==='Porta'){ base.radius = 8; base.weight = 2; }
  else if(type==='Portello'){ base.radius = 6.5; }
  else { base.radius = 5; } // Torre
  return base;
}

function wireWalls(){
  var wrap = document.getElementById('walls');
  var btn = document.getElementById('walls-btn');
  var menu = document.getElementById('walls-menu');
  var chk = document.getElementById('chk-wall-barbarossa');
  var chkNuove = document.getElementById('chk-wall-nuove');
  var chkRepubblica=document.getElementById('chk-wall-repubblica');var chkRinascimento=document.getElementById('chk-wall-rinascimento');var chkCarolinge=document.getElementById('chk-wall-carolinge');var chkPorto=document.getElementById('chk-wall-porto');var chkRomane=document.getElementById('chk-wall-romane');if(!wrap || !btn || !menu || !chk) return;
  var vis = wallsVisibilityLoad();
  if(typeof vis["mura-repubblica"]==="undefined") vis["mura-repubblica"]=false; if(typeof vis["mura-rinascimento"]==="undefined") vis["mura-rinascimento"]=false; if(typeof vis["mura-carolinge"]==="undefined") vis["mura-carolinge"]=false; if(typeof vis["mura-porto"]==="undefined") vis["mura-porto"]=false; if(typeof vis["mura-romane"]==="undefined") vis["mura-romane"]=false; if(typeof vis["mura-barbarossa"]==="undefined") vis["mura-barbarossa"]=false; if(typeof vis["mura-nuove"]==="undefined") vis["mura-nuove"]=false; if(typeof vis['mura-barbarossa']==='undefined') vis['mura-barbarossa']=false;
  chk.checked = !!vis['mura-barbarossa'];
  if(chkNuove) chkNuove.checked = !!vis['mura-nuove'];

  if(chkRepubblica) chkRepubblica.checked=!!vis['mura-repubblica'];if(chkRinascimento) chkRinascimento.checked=!!vis['mura-rinascimento'];if(chkCarolinge) chkCarolinge.checked=!!vis['mura-carolinge'];if(chkPorto) chkPorto.checked=!!vis['mura-porto'];if(chkRomane) chkRomane.checked=!!vis['mura-romane'];function toggleOpen(e){
    if(e) e.stopPropagation();
    var shown = (menu.style.display === 'block');
    menu.style.display = shown ? 'none' : 'block';
  }
  btn.addEventListener('click', toggleOpen);
  menu.addEventListener('click', function(e){ e.stopPropagation(); });
  document.addEventListener('click', function(){ if(menu) menu.style.display='none'; });

  chk.addEventListener('change', function(){
    var v = wallsVisibilityLoad(); v['mura-barbarossa'] = !!this.checked; wallsVisibilitySave(v);
    renderWalls();
    updateWallNodesVisibility();
  })
  if(chkNuove) chkNuove.addEventListener('change', function(){
    var v = wallsVisibilityLoad(); v['mura-nuove'] = !!this.checked; wallsVisibilitySave(v);
    renderWalls();
    updateWallNodesVisibility();
  });
;

  if(chkRomane) chkRomane.addEventListener('change', function(){
    var v=wallsVisibilityLoad(); v['mura-romane']=!!this.checked; wallsVisibilitySave(v); renderWalls(); updateWallNodesVisibility();
  });

  if(chkCarolinge) chkCarolinge.addEventListener('change', function(){
    var v=wallsVisibilityLoad(); v['mura-carolinge']=!!this.checked; wallsVisibilitySave(v); renderWalls(); updateWallNodesVisibility();
  });
  if(chkPorto) chkPorto.addEventListener('change', function(){
    var v=wallsVisibilityLoad(); v['mura-porto']=!!this.checked; wallsVisibilitySave(v); renderWalls(); updateWallNodesVisibility();
  });

  if(chkRepubblica) chkRepubblica.addEventListener('change', function(){
    var v=wallsVisibilityLoad(); v['mura-repubblica']=!!this.checked; wallsVisibilitySave(v); renderWalls(); updateWallNodesVisibility();
  });
  if(chkRinascimento) chkRinascimento.addEventListener('change', function(){
    var v=wallsVisibilityLoad(); v['mura-rinascimento']=!!this.checked; wallsVisibilitySave(v); renderWalls(); updateWallNodesVisibility();
  });

  // === Master toggle: "Mostra tutte" ===
  try {
    var chkAll = document.getElementById('chk-wall-all');
    var __allIds = ['chk-wall-romane','chk-wall-carolinge','chk-wall-barbarossa','chk-wall-porto','chk-wall-repubblica','chk-wall-rinascimento','chk-wall-nuove'];
    function __updateMaster(){
      if(!chkAll) return;
      var total=0, checked=0;
      for (var i=0;i<__allIds.length;i++){
        var el = document.getElementById(__allIds[i]);
        if(!el) continue; total++; if(el.checked) checked++;
      }
      chkAll.indeterminate = (checked>0 && checked<total);
      chkAll.checked = (checked===total && total>0);
    }
    // Initial sync
    __updateMaster();
    // React to individual toggles (only update master state; existing listeners already refresh map)
    for (var i=0;i<__allIds.length;i++){
      (function(id){
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('change', function(){ __updateMaster(); });
      })(__allIds[i]);
    }
    // When master toggles, set all + persist + redraw
    if (chkAll){
      chkAll.addEventListener('change', function(){
        var makeOn = !!this.checked;
        var vis = wallsVisibilityLoad();
        for (var i=0;i<__allIds.length;i++){
          var el = document.getElementById(__allIds[i]);
          if(!el) continue;
          el.checked = makeOn;
          var key = 'mura-' + __allIds[i].replace('chk-wall-','');
          vis[key] = makeOn;
        }
        wallsVisibilitySave(vis);
        try { renderWalls(); } catch(e) {}
        try { updateWallNodesVisibility(); } catch(e) {}
        __updateMaster();
      });
    }
  } catch(e){ /* no-op */ }

}

var groupWallsLine=null, groupWallsNodes=null, WALLS_NODES_MIN_ZOOM=15;

function computeWallsNodesMinZoom(){ WALLS_NODES_MIN_ZOOM = 15; }

// --- Label helper: dash for descriptive periods, parentheses for numeric years/ranges
function wallLabel(name, period){
  try{
    const p = (period||'').toString().trim();
    if(!p) return name;
    const hasYearRange = /\d\s*[–-]\s*\d/.test(p);
    const hasYear = /\b\d{3,4}\b/.test(p);
    return (hasYearRange || hasYear) ? `${name} (${p})` : `${name} - ${p}`;
  }catch(e){ return name + (period ? (' - ' + period) : ''); }
}
const WALL_LINES_INTERACTIVE = false;
function renderWalls(){
  if(!groupWallsLine || !groupWallsNodes) return;
  groupWallsLine.clearLayers();
  groupWallsNodes.clearLayers();
  var v = wallsVisibilityLoad();
  if (v['mura-barbarossa'] && MURA_DATA['mura-barbarossa']) {
  var wallColorBarb = '#76B6FF'; // colore del tracciato Barbarossa (azzurro)

  var gjBarb = L.geoJSON(MURA_DATA['mura-barbarossa'], {
    interactive: WALL_LINES_INTERACTIVE,
    style: function (f) {
      var w = (f.properties && f.properties['stroke-width']) ? f.properties['stroke-width'] : 3;
      return { color: wallColorBarb, weight: w, opacity: 0.9, smoothFactor: 1.2 };
    },
    onEachFeature: function (feature, layer) {
      var name = (feature.properties && feature.properties.name) ? feature.properties.name : 'Cinta muraria';
      var period = (feature.properties && feature.properties.period) ? feature.properties.period : '';
      if (WALL_LINES_INTERACTIVE) layer.bindTooltip(wallLabel(name, period), { direction: 'top', sticky: true, offset: [8, 8] });
    }
  });
  gjBarb.addTo(groupWallsLine);

  var nodesB = (typeof WALL_NODES!=='undefined' && WALL_NODES['mura-barbarossa']) ? WALL_NODES['mura-barbarossa'] : [];
  nodesB.forEach(function(n){
    var marker = L.circleMarker([n.coords[0], n.coords[1]], wallNodeStyle(n.type, wallColorBarb));

    // Congela il colore per questo marker (evita che cambi quando si renderizzano altre cinte)
    var baseColor = marker.options.color || wallColorBarb || '#76B6FF';
    marker.__popupColor = baseColor;

    try {
      var __t = (n.type||'').toString();
      var __name = (n.name||'').toString();

      // Helper RGBA dal colore del tracciato
      function rgbaFromHex(hex, a){
        try{
          var h = hex.replace('#',''); if(h.length===3){ h=h.split('').map(function(cc){return cc+cc}).join(''); }
          var r=parseInt(h.substr(0,2),16), g=parseInt(h.substr(2,2),16), b=parseInt(h.substr(4,2),16);
          return 'rgba('+r+','+g+','+b+','+(a==null?1:a)+')';
        }catch(e){ return hex; }
      }

      var __html = (function(){
        // lingua + i18n (usa __TEXTS se presente, altrimenti n.i18n)
        var langRaw = (typeof currentLang==='function' ? currentLang() : (document.documentElement.getAttribute('lang')||localStorage.getItem('lang')||'it'));
        var lang = (typeof normalizeLang==='function' ? normalizeLang(langRaw) : (langRaw||'it')).toLowerCase();
        var __TX = (window.__TEXTS && window.__TEXTS['mura-barbarossa'] && window.__TEXTS['mura-barbarossa'][n.id]) || null;
        var t = (__TX && (__TX[lang] || __TX['it'] || __TX['en'])) || (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

        var _nid = (n.id||(n.name+'_'+(n.coords||[]).join('_'))).replace(/[^a-z0-9_\-]+/gi,'-').toLowerCase();
        var rtl = (lang==='ar') ? 'direction:rtl;text-align:right' : '';

        var CATS = {
          "porta":    { "it":"Porta","en":"Gate","es":"Puerta","fr":"Porte","ar":"بوابة","ru":"Ворота","zh":"城门","lij":"Pòrta" },
          "portello": { "it":"Portello","en":"Wicket","es":"Portillo","fr":"Poterne","ar":"بوّابة صغيرة","ru":"Калитка","zh":"便门","lij":"Portéllo" },
          "torre":    { "it":"Torre","en":"Tower","es":"Torre","fr":"Tour","ar":"برج","ru":"Башня","zh":"塔","lij":"Torre" },
          "forte":    { "it":"Forte","en":"Fort","es":"Fuerte","fr":"Fort","ar":"حصن","ru":"Форт","zh":"堡垒","lij":"Fòrte" },
          "altro":    { "it":"Elemento","en":"Feature","es":"Elemento","fr":"Élément","ar":"عنصر","ru":"Объект","zh":"要素","lij":"Eleménto" }
        };
        var catLabel = ''; try{ var c=(CATS[n.type]||{}); catLabel = c[lang] || c['it'] || c['en'] || ''; }catch(e){}

        // Sfondi con gradazione (categoria pieno, titolo medio, anno leggero) — sempre dal colore congelato
        var catBG   = rgbaFromHex(baseColor, 1.00);
        var titleBG = rgbaFromHex(baseColor, 0.18);
        var yearBG  = rgbaFromHex(baseColor, 0.10);

        var __title = (n.name||'').toString();
        var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
        var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.45;text-align:justify;text-justify:inter-word;hyphens:auto">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

        var cat = catLabel ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>` : '';

        var header = `<div style="margin-bottom:.35rem">
            ${cat}
            <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
            ${__year}
          </div>`;

        const body = `<div style="max-width:250px;margin:0 auto">
            <div style="min-width:0">${__descr}</div>
            <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
          </div>`;

        return `<div style="min-width:260px;max-width:540px;line-height:1.3;${rtl}">
            ${header}
            ${body}
          </div>`;
      })();

      marker.bindPopup(__html, { closeButton:true, autoPan:true, maxWidth:640, className:'mura-popup' });

      // Ricostruzione su apertura (lingua) + media, usando SEMPRE il colore congelato del marker
      marker.on('popupopen', function(){
        try{
          var langRaw = (typeof currentLang==='function' ? currentLang() : (document.documentElement.getAttribute('lang')||'it'));
          var lang = (typeof normalizeLang==='function' ? normalizeLang(langRaw) : (langRaw||'it')).toLowerCase();
          var __TX = (window.__TEXTS && window.__TEXTS['mura-barbarossa'] && window.__TEXTS['mura-barbarossa'][n.id]) || null;
          var t = (__TX && (__TX[lang] || __TX['it'] || __TX['en'])) || (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

          var CATS = {
            "porta":    { "it":"Porta","en":"Gate","es":"Puerta","fr":"Porte","ar":"بوابة","ru":"Ворота","zh":"城门","lij":"Pòrta" },
            "portello": { "it":"Portello","en":"Wicket","es":"Portillo","fr":"Poterne","ar":"بوّابة صغيرة","ru":"Калитка","zh":"便门","lij":"Portéllo" },
            "torre":    { "it":"Torre","en":"Tower","es":"Torre","fr":"Tour","ar":"برج","ru":"Башня","zh":"塔","lij":"Torre" },
            "forte":    { "it":"Forte","en":"Fort","es":"Fuerte","fr":"Fort","ar":"حصن","ru":"Форт","zh":"堡垒","lij":"Fòrte" },
            "altro":    { "it":"Elemento","en":"Feature","es":"Elemento","fr":"Élément","ar":"عنصر","ru":"Объект","zh":"要素","lij":"Eleménto" }
          };
          var catLabel = ''; try{ var c=(CATS[n.type]||{}); catLabel = c[lang] || c['it'] || c['en'] || ''; }catch(e){}

          var frozen = this.__popupColor || this.options.color || wallColorBarb || '#76B6FF';
          function rgbaFromHex(hex, a){
            try{
              var h = hex.replace('#',''); if(h.length===3){ h=h.split('').map(function(cc){return cc+cc}).join(''); }
              var r=parseInt(h.substr(0,2),16), g=parseInt(h.substr(2,2),16), b=parseInt(h.substr(4,2),16);
              return 'rgba('+r+','+g+','+b+','+(a==null?1:a)+')';
            }catch(e){ return hex; }
          }
          var catBG   = rgbaFromHex(frozen, 1.00);
          var titleBG = rgbaFromHex(frozen, 0.18);
          var yearBG  = rgbaFromHex(frozen, 0.10);

          var _nid = (n.id||(n.name+'_'+(n.coords||[]).join('_'))).replace(/[^a-z0-9_\-]+/gi,'-').toLowerCase();
          var __title = (n.name||'').toString();
          var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
          var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.45;text-align:justify;text-justify:inter-word;hyphens:auto">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

          var cat = catLabel ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>` : '';

          var header = `<div style="margin-bottom:.35rem">
              ${cat}
              <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
              ${__year}
            </div>`;

          const body = `<div style="max-width:250px;margin:0 auto">
              <div style="min-width:0">${__descr}</div>
              <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
            </div>`;

          this.getPopup().setContent(`<div style="min-width:260px;max-width:540px;line-height:1.3">${header}${body}</div>`);

          // Media: se c'è n.media[0] (string), uso quello; altrimenti fallback ensureMedia
          try{
            var host = this.getPopup().getElement().querySelector('#media-'+_nid);
            if (host){
              host.innerHTML = '';
              if (n.media && n.media.length && typeof n.media[0] === 'string'){
                var src = n.media[0]; // uso il path così com'è, come nel tuo index originale
                var img = document.createElement('img');
                img.src = src; img.alt = __title; img.loading = 'lazy';
                img.style.width = '100%'; img.style.height = 'auto';
                img.onerror = function(){ host.innerHTML = '<div style="font-size:.85rem;opacity:.75">Immagine non trovata: '+src+'</div>'; };
                host.appendChild(img);
              } else if (window.__mura_media && typeof __mura_media.ensureMedia==='function'){
                __mura_media.ensureMedia('mura-barbarossa', n, this.getPopup().getElement());
              }
            }
          }catch(e){}
        }catch(e){}
      });
    } catch(e) {}

    try{ marker.bindTooltip(n.name, {direction:'top', offset:[0,-10], sticky:true, opacity:0.95}); }catch(e){}
    marker.on('mouseover', function(){ try{ this.openTooltip(); }catch(e){} });
    marker.on('mouseout', function(){ try{ this.closeTooltip(); }catch(e){} });
    marker.on('touchstart', function(){ try{ this.openTooltip(); }catch(e){} });
    marker.on('touchend', function(){ var self=this; setTimeout(function(){ try{ self.closeTooltip(); }catch(e){} }, 1200); });

    marker.addTo(groupWallsNodes);
  });
  }

  
// --- Mura Nuove (1626–1639) ---
  if (v['mura-nuove'] && MURA_DATA['mura-nuove']) {
  var wallColor2 = '#dc2626';
  var gj2 = L.geoJSON(MURA_DATA['mura-nuove'], {
    interactive: WALL_LINES_INTERACTIVE,
    style: function (f) {
      var p = f.properties || {};
      return { color: p.stroke || wallColor2, weight: p['stroke-width'] || 5, opacity: p['stroke-opacity'] || 0.9, smoothFactor: 1.2 };
    },
    onEachFeature: function (feature, layer) {
      var name = (feature.properties && feature.properties.name) ? feature.properties.name : 'Cinta muraria';
      var period = (feature.properties && feature.properties.period) ? feature.properties.period : '';
      if (WALL_LINES_INTERACTIVE) layer.bindTooltip(wallLabel(name, period), { direction: 'top', sticky: true, offset: [8, 8] });
    }
  });
  gj2.addTo(groupWallsLine);

  var nodes2 = (typeof WALL_NODES !== 'undefined' && WALL_NODES['mura-nuove']) ? WALL_NODES['mura-nuove'] : [];
  nodes2.forEach(function (n) {
    var marker = L.circleMarker([n.coords[0], n.coords[1]], wallNodeStyle(n.type, wallColor2));
    try {
      // helper per alpha dal colore del tracciato
      function rgbaFromHex(hex, a) {
        try {
          var h = hex.replace('#', '');
          if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
          var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
          return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
        } catch (e) { return hex; }
      }
      var __t = (n.type || '').toString();
      var __name = (n.name || '').toString();
      var __html = (function () {
        var flagEl = (document.querySelector && document.querySelector('.flag.selected')) ? document.querySelector('.flag.selected') : null;
        var raw = flagEl ? (flagEl.getAttribute('data-lang') || '') : '';
        var langRaw = raw || (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || localStorage.getItem('lang') || 'it'));
        var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
        var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};
        var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_')).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase());
        var rtl = (lang === 'ar') ? 'direction:rtl;text-align:right;' : '';
        var CATS = {
          "porta":    { "it": "Porta",    "en": "Gate",   "es": "Puerta",   "fr": "Porte",   "ar": "بوابة",         "ru": "Ворота",   "zh": "城门",   "lij": "Pòrta" },
          "portello": { "it": "Portello", "en": "Wicket", "es": "Portillo", "fr": "Poterne", "ar": "بوّابة صغيرة",   "ru": "Калитка",  "zh": "便门",   "lij": "Portéllo" },
          "torre":    { "it": "Torre",    "en": "Tower",  "es": "Torre",    "fr": "Tour",    "ar": "برج",           "ru": "Башня",    "zh": "塔",     "lij": "Torre" },
          "forte":    { "it": "Forte",    "en": "Fort",   "es": "Fuerte",   "fr": "Fort",    "ar": "حصن",           "ru": "Форт",     "zh": "堡垒",   "lij": "Fòrte" },
          "altro":    { "it": "Elemento", "en": "Feature","es": "Elemento", "fr": "Élément", "ar": "عنصر",          "ru": "Объект",   "zh": "要素",   "lij": "Eleménto" }
        };
        var catLabel = '';
        try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) { }

        // palette di sfondi (categoria pieno, titolo medio, anno leggero)
        var catBG   = rgbaFromHex(wallColor2, 1.00);
        var titleBG = rgbaFromHex(wallColor2, 0.18);
        var yearBG  = rgbaFromHex(wallColor2, 0.10);

        var __title = (n.name || '').toString();
        // ⬇️ verticali: block + width:max-content
        var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
        var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

        // ⬇️ categoria a blocco (riga propria)
        var cat = catLabel ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>` : '';

        // ⬇️ titolo a blocco (riga propria)
        var header = `<div style="margin-bottom:.35rem">
            ${cat}
            <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
            ${__year}
          </div>`;

        const body = `<div style="max-width:250px;margin:0 auto">
                <div style="min-width:0">${__descr}</div>
                <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
              </div>`;

        return `<div style="min-width:260px;max-width:540px;line-height:1.3;${rtl}">
            ${header}
            ${body}
          </div>`;
      })();

      marker.bindPopup(__html, { closeButton: true, autoPan: true, maxWidth: 640, className: 'mura-popup' });

      // Rebuild popup on open per lingua + media, con gli stessi sfondi
      try {
        marker.on('popupopen', function () {
          try {
            var langRaw = (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || 'it'));
            var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
            var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};
            var CATS = {
              "porta":    { "it": "Porta",    "en": "Gate",   "es": "Puerta",   "fr": "Porte",   "ar": "بوابة",         "ru": "Ворота",   "zh": "城门",   "lij": "Pòrta" },
              "portello": { "it": "Portello", "en": "Wicket", "es": "Portillo", "fr": "Poterne", "ar": "بوّابة صغيرة",   "ru": "Калитка",  "zh": "便门",   "lij": "Portéllo" },
              "torre":    { "it": "Torre",    "en": "Tower",  "es": "Torre",    "fr": "Tour",    "ar": "برج",           "ru": "Башня",    "zh": "塔",     "lij": "Torre" },
              "forte":    { "it": "Forte",    "en": "Fort",   "es": "Fuerte",   "fr": "Fort",    "ar": "حصن",           "ru": "Форт",     "zh": "堡垒",   "lij": "Fòrte" },
              "altro":    { "it": "Elemento", "en": "Feature","es": "Elemento", "fr": "Élément", "ar": "عنصر",          "ru": "Объект",   "zh": "要素",   "lij": "Eleménto" }
            };
            function rgbaFromHex(hex, a) {
              try {
                var h = hex.replace('#', '');
                if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
                var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
                return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
              } catch (e) { return hex; }
            }
            var catBG   = rgbaFromHex(wallColor2, 1.00);
            var titleBG = rgbaFromHex(wallColor2, 0.18);
            var yearBG  = rgbaFromHex(wallColor2, 0.10);

            var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) { }
            var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_')).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase());
            var __title = (n.name || '').toString();
            // ⬇️ verticali: block + width:max-content
            var __year = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
            var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';
            // ⬇️ categoria a blocco
            var cat = catLabel ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>` : '';

            // ⬇️ titolo a blocco
            var header = `<div style="margin-bottom:.35rem">${cat}
                <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
                ${__year}
              </div>`;
            const body = `<div style="max-width:250px;margin:0 auto">
                <div style="min-width:0">${__descr}</div>
                <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
              </div>`;
            var htmlNow = `<div style="min-width:260px;max-width:540px;line-height:1.3">${header}${body}</div>`;
            this.getPopup().setContent(htmlNow);

            // media: esplicita o fallback
            try {
              var host = this.getPopup().getElement().querySelector('#media-' + _nid);
              if (host && n.media && n.media.length && typeof n.media[0] === 'string') {
                var src = n.media[0];
                host.innerHTML = '';
                var img = document.createElement('img');
                img.src = src; img.alt = __title; img.loading = 'lazy'; img.style.width = '100%'; img.style.height = 'auto';
                img.onerror = function () { host.innerHTML = '<div style="font-size:.85rem;opacity:.75">Immagine non trovata: ' + src + '</div>'; };
                host.appendChild(img);
              }
            } catch (e) { }
            try {
              if ((!n.media || !n.media.length) && window.__mura_media && typeof __mura_media.ensureMedia === 'function') {
                __mura_media.ensureMedia('mura-nuove', n, this.getPopup().getElement());
              }
            } catch (e) { }
          } catch (e) { }
        });
      } catch (e) { }

    } catch (e) { }
    try { marker.bindTooltip(n.name, { direction: 'top', offset: [0, -10], sticky: true, opacity: 0.95 }); } catch (e) { }
    marker.on('mouseover', function () { try { this.openTooltip(); } catch (e) { } });
    marker.on('mouseout', function () { try { this.closeTooltip(); } catch (e) { } });
    marker.on('touchstart', function () { try { this.openTooltip(); } catch (e) { } });
    marker.on('touchend', function () { var self = this; setTimeout(function () { try { self.closeTooltip(); } catch (e) { } }, 1200); });
    marker.addTo(groupWallsNodes);
  });
  }

  // --- Mura Romane ---
  if (v['mura-romane'] && MURA_DATA['mura-romane']) {
  var wallColor = '#db2777';
  var gjR = L.geoJSON(MURA_DATA['mura-romane'], {
    interactive: WALL_LINES_INTERACTIVE,
    style: function (f) {
      var w = (f.properties && f.properties['stroke-width']) ? f.properties['stroke-width'] : 3;
      return { color: wallColor, weight: w, opacity: 0.9, smoothFactor: 1.2 };
    },
    onEachFeature: function (feature, layer) {
      var name = (feature.properties && feature.properties.name) ? feature.properties.name : 'Cinta muraria';
      var period = (feature.properties && feature.properties.period) ? feature.properties.period : '';
      if (WALL_LINES_INTERACTIVE) layer.bindTooltip(wallLabel(name, period), { direction: 'top', sticky: true, offset: [8, 8] });
    }
  });
  gjR.addTo(groupWallsLine);

  var nodes = (typeof WALL_NODES !== 'undefined' && WALL_NODES['mura-romane']) ? WALL_NODES['mura-romane'] : [];
  nodes.forEach(function (n) {
    var marker = L.circleMarker([n.coords[0], n.coords[1]], wallNodeStyle(n.type, wallColor));

    var baseColor = marker.options.color || wallColor || '#db2777';
    marker.__popupColor = baseColor;

    try {
      function rgbaFromHex(hex, a) {
        try {
          var h = hex.replace('#', '');
          if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
          var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
          return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
        } catch (e) { return hex; }
      }

      var __html = (function () {
        var flagEl = (document.querySelector && document.querySelector('.flag.selected')) ? document.querySelector('.flag.selected') : null;
        var raw = flagEl ? (flagEl.getAttribute('data-lang') || '') : '';
        var langRaw = raw || (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || localStorage.getItem('lang') || 'it'));
        var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
        var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

        var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
        var rtl = (lang === 'ar') ? 'direction:rtl;text-align:right;' : '';

        var CATS = {
          "porta":    { "it":"Porta",    "en":"Gate",   "es":"Puerta",   "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
          "portello": { "it":"Portello", "en":"Wicket", "es":"Portillo", "fr":"Poterne", "ar":"بوّابة صغيرة",   "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
          "torre":    { "it":"Torre",    "en":"Tower",  "es":"Torre",    "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
          "forte":    { "it":"Forte",    "en":"Fort",   "es":"Fuerte",   "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
          "altro":    { "it":"Elemento", "en":"Feature","es":"Elemento", "fr":"Élément", "ar":"عنصر",          "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
        };
        var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) {}

        var catBG   = rgbaFromHex(baseColor, 1.00);
        var titleBG = rgbaFromHex(baseColor, 0.18);
        var yearBG  = rgbaFromHex(baseColor, 0.10);

        var __title = (n.name || '').toString();
        var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
        var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.45;text-align:justify;text-justify:inter-word;hyphens:auto">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

        var cat = catLabel
          ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>`
          : '';

        var header = `<div style="margin-bottom:.35rem">
            ${cat}
            <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
            ${__year}
          </div>`;

        const body = `<div style="max-width:250px;margin:0 auto">
            <div style="min-width:0">${__descr}</div>
            <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
          </div>`;

        return `<div style="min-width:260px;max-width:540px;line-height:1.3;${rtl}">
            ${header}
            ${body}
          </div>`;
      })();

      marker.bindPopup(__html, { closeButton: true, autoPan: true, maxWidth: 640, className: 'mura-popup' });

      // Ricostruzione su apertura (lingua) + MEDIA (usa percorso 'mura_data/media/mura-romane/')
      marker.on('popupopen', function () {
        try {
          var langRaw = (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || 'it'));
          var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
          var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

          var CATS = {
            "porta":    { "it":"Porta",    "en":"Gate",   "es":"Puerta",   "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
            "portello": { "it":"Portello", "en":"Wicket", "es":"Portillo", "fr":"Poterne", "ar":"بوّابة صغيرة",   "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
            "torre":    { "it":"Torre",    "en":"Tower",  "es":"Torre",    "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
            "forte":    { "it":"Forte",    "en":"Fort",   "es":"Fuerte",   "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
            "altro":    { "it":"Elemento", "en":"Feature","es":"Elemento", "fr":"Élément", "ar":"عنصر",          "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
          };
          var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) { }

          var frozen = this.__popupColor || this.options.color || wallColor || '#db2777';
          function rgbaFromHex(hex, a) {
            try {
              var h = hex.replace('#', '');
              if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join('');
              var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
              return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
            } catch (e) { return hex; }
          }
          var catBG   = rgbaFromHex(frozen, 1.00);
          var titleBG = rgbaFromHex(frozen, 0.18);
          var yearBG  = rgbaFromHex(frozen, 0.10);

          var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
          var __title = (n.name || '').toString();
          var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
          var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.45;text-align:justify;text-justify:inter-word;hyphens:auto">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

          var cat = catLabel
            ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>`
            : '';

          var header = `<div style="margin-bottom:.35rem">
              ${cat}
              <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
              ${__year}
            </div>`;

          const body = `<div style="max-width:250px;margin:0 auto">
              <div style="min-width:0">${__descr}</div>
              <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
            </div>`;

          this.getPopup().setContent(`<div style="min-width:260px;max-width:540px;line-height:1.3">${header}${body}</div>`);

          // --- MEDIA (Romane): path base corretto 'mura_data/media/mura-romane/'
          try {
            var host = this.getPopup().getElement().querySelector('#media-' + _nid);
            if (host) {
              host.innerHTML = '';
              if (n.media && n.media.length && typeof n.media[0] === 'string') {
                var src = n.media[0];
                // se è solo il filename, aggiungo la cartella corretta accanto all'index
                if (src.indexOf('/') === -1) src = 'mura_data/media/mura-romane/' + src;

                var img = document.createElement('img');
                img.src = src;
                img.alt = __title;
                img.loading = 'lazy';
                img.style.width = '100%';
                img.style.height = 'auto';
                img.onerror = function () {
                  host.innerHTML = '<div style="font-size:.85rem;opacity:.75">Immagine non trovata: ' + src + '</div>';
                };
                host.appendChild(img);
              } else if (window.__mura_media && typeof __mura_media.ensureMedia === 'function') {
                __mura_media.ensureMedia('mura-romane', n, this.getPopup().getElement());
              }
            }
          } catch (e) {}

        } catch (e) {}
      });
    } catch (e) {}

    try { marker.bindTooltip(n.name, { direction: 'top', offset: [0, -10], sticky: true, opacity: 0.95 }); } catch (e) {}
    marker.on('mouseover',  function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('mouseout',   function () { try { this.closeTooltip(); } catch (e) {} });
    marker.on('touchstart', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('touchend',   function () { var self = this; setTimeout(function () { try { self.closeTooltip(); } catch (e) {} }, 1200); });
    marker.addTo(groupWallsNodes);
  });

  }
  // ensure group shown if any wall visible
  try {
    if ((v['mura-barbarossa']||v['mura-nuove']||v['mura-romane']) && !map.hasLayer(groupWallsLine)) groupWallsLine.addTo(map);
  } catch(e){}

  // --- Mura Carolinge ---
  if (v['mura-carolinge'] && MURA_DATA['mura-carolinge']) {
  var wallColorC = '#0d9488';
  var gjC = L.geoJSON(MURA_DATA['mura-carolinge'], {
    interactive: WALL_LINES_INTERACTIVE,
    style: function (f) {
      var w = (f.properties && f.properties['stroke-width']) ? f.properties['stroke-width'] : 3;
      return { color: wallColorC, weight: w, opacity: 0.9, smoothFactor: 1.2 };
    },
    onEachFeature: function (feature, layer) {
      var name = (feature.properties && feature.properties.name) ? feature.properties.name : 'Cinta muraria';
      var period = (feature.properties && feature.properties.period) ? feature.properties.period : '';
      if (WALL_LINES_INTERACTIVE) layer.bindTooltip(wallLabel(name, period), { direction: 'top', sticky: true, offset: [8, 8] });
    }
  });
  gjC.addTo(groupWallsLine);

  var nodes = (typeof WALL_NODES !== 'undefined' && WALL_NODES['mura-carolinge']) ? WALL_NODES['mura-carolinge'] : [];
  nodes.forEach(function (n) {
    var marker = L.circleMarker([n.coords[0], n.coords[1]], wallNodeStyle(n.type, wallColorC));

    // congela il colore di questa cinta per il singolo marker (evita interferenze di altre cinte)
    var baseColor = marker.options.color || wallColorC || '#0d9488';
    marker.__popupColor = baseColor;

    try {
      var __t = (n.type || '').toString();
      var __name = (n.name || '').toString();

      // helper per alpha dal colore del tracciato
      function rgbaFromHex(hex, a) {
        try {
          var h = hex.replace('#', '');
          if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
          var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
          return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
        } catch (e) { return hex; }
      }

      var __html = (function () {
        // lingua + i18n (come nel tuo blocco originale Carolinge)
        var flagEl = (document.querySelector && document.querySelector('.flag.selected')) ? document.querySelector('.flag.selected') : null;
        var raw = flagEl ? (flagEl.getAttribute('data-lang') || '') : '';
        var langRaw = raw || (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || localStorage.getItem('lang') || 'it'));
        var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
        var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

        var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
        var rtl = (lang === 'ar') ? 'direction:rtl;text-align:right;' : '';

        var CATS = {
          "porta":    { "it":"Porta", "en":"Gate",  "es":"Puerta",  "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
          "portello": { "it":"Portello","en":"Wicket","es":"Portillo","fr":"Poterne","ar":"بوّابة صغيرة", "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
          "torre":    { "it":"Torre", "en":"Tower", "es":"Torre",   "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
          "forte":    { "it":"Forte", "en":"Fort",  "es":"Fuerte",  "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
          "altro":    { "it":"Elemento","en":"Feature","es":"Elemento","fr":"Élément","ar":"عنصر",        "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
        };
        var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) { }

        // palette (categoria pieno, titolo medio, anno leggero)
        var catBG   = rgbaFromHex(baseColor, 1.00);
        var titleBG = rgbaFromHex(baseColor, 0.18);
        var yearBG  = rgbaFromHex(baseColor, 0.10);

        var __title = (n.name || '').toString();
        var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
        var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

        var cat = catLabel ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>` : '';

        var header = `<div style="margin-bottom:.35rem">
            ${cat}
            <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
            ${__year}
          </div>`;

        const body = `<div style="max-width:250px;margin:0 auto">
            <div style="min-width:0">${__descr}</div>
            <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
          </div>`;

        return `<div style="min-width:260px;max-width:540px;line-height:1.3;${rtl}">
            ${header}
            ${body}
          </div>`;
      })();

      marker.bindPopup(__html, { closeButton: true, autoPan: true, maxWidth: 640, className: 'mura-popup' });

      // Rebuild popup su apertura (lingua) + media, usando il colore congelato
      marker.on('popupopen', function () {
        try {
          var langRaw = (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || 'it'));
          var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
          var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

          var CATS = {
            "porta":    { "it":"Porta", "en":"Gate",  "es":"Puerta",  "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
            "portello": { "it":"Portello","en":"Wicket","es":"Portillo","fr":"Poterne","ar":"بوّابة صغيرة", "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
            "torre":    { "it":"Torre", "en":"Tower", "es":"Torre",   "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
            "forte":    { "it":"Forte", "en":"Fort",  "es":"Fuerte",  "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
            "altro":    { "it":"Elemento","en":"Feature","es":"Elemento","fr":"Élément","ar":"عنصر",        "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
          };
          var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) { }

          function rgbaFromHex(hex, a) {
            try {
              var h = hex.replace('#', '');
              if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
              var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
              return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
            } catch (e) { return hex; }
          }
          var frozen = this.__popupColor || this.options.color || wallColorC || '#0d9488';
          var catBG   = rgbaFromHex(frozen, 1.00);
          var titleBG = rgbaFromHex(frozen, 0.18);
          var yearBG  = rgbaFromHex(frozen, 0.10);

          var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
          var __title = (n.name || '').toString();
          var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
          var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

          var cat = catLabel ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>` : '';

          var header = `<div style="margin-bottom:.35rem">
              ${cat}
              <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
              ${__year}
            </div>`;

          const body = `<div style="max-width:250px;margin:0 auto">
              <div style="min-width:0">${__descr}</div>
              <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
            </div>`;

          this.getPopup().setContent(`<div style="min-width:260px;max-width:540px;line-height:1.3">${header}${body}</div>`);

          // media esplicita + fallback
          try {
            var host = this.getPopup().getElement().querySelector('#media-' + _nid);
            if (host && n.media && n.media.length && typeof n.media[0] === 'string') {
              var src = n.media[0];
              host.innerHTML = '';
              var img = document.createElement('img');
              img.src = src; img.alt = __title; img.loading = 'lazy';
              img.style.width = '100%'; img.style.height = 'auto';
              img.onerror = function () { host.innerHTML = '<div style="font-size:.85rem;opacity:.75">Immagine non trovata: ' + src + '</div>'; };
              host.appendChild(img);
            } else if (window.__mura_media && typeof __mura_media.ensureMedia === 'function') {
              __mura_media.ensureMedia('mura-carolinge', n, this.getPopup().getElement());
            }
          } catch (e) {}
        } catch (e) {}
      });
    } catch (e) {}

    try { marker.bindTooltip(n.name, { direction: 'top', offset: [0, -10], sticky: true, opacity: 0.95 }); } catch (e) {}
    marker.on('mouseover', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('mouseout', function () { try { this.closeTooltip(); } catch (e) {} });
    marker.on('touchstart', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('touchend', function () { var self = this; setTimeout(function () { try { self.closeTooltip(); } catch (e) {} }, 1200); });
    marker.addTo(groupWallsNodes);
  });

  }

  // --- Mura del Molo (XIII sec.)
  if (v['mura-porto'] && MURA_DATA['mura-porto']) {
  var wallColorP = '#1e40af';
  var gjP = L.geoJSON(MURA_DATA['mura-porto'], {
    interactive: WALL_LINES_INTERACTIVE,
    style: function (f) {
      var w = (f.properties && f.properties['stroke-width']) ? f.properties['stroke-width'] : 3;
      return { color: wallColorP, weight: w, opacity: 0.9, smoothFactor: 1.2 };
    },
    onEachFeature: function (feature, layer) {
      var name = (feature.properties && feature.properties.name) ? feature.properties.name : 'Cinta muraria';
      var period = (feature.properties && feature.properties.period) ? feature.properties.period : '';
      if (WALL_LINES_INTERACTIVE) layer.bindTooltip(wallLabel(name, period), { direction: 'top', sticky: true, offset: [8, 8] });
    }
  });
  gjP.addTo(groupWallsLine);

  var nodes = (typeof WALL_NODES !== 'undefined' && WALL_NODES['mura-porto']) ? WALL_NODES['mura-porto'] : [];
  nodes.forEach(function (n) {
    var marker = L.circleMarker([n.coords[0], n.coords[1]], wallNodeStyle(n.type, wallColorP));

    // Congela il colore per questo marker (evita che altre cinte lo sovrascrivano)
    var baseColor = marker.options.color || wallColorP || '#1e40af';
    marker.__popupColor = baseColor;

    try {
      // helper RGBA dal colore del tracciato
      function rgbaFromHex(hex, a) {
        try {
          var h = hex.replace('#', '');
          if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
          var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
          return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
        } catch (e) { return hex; }
      }

      var __html = (function () {
        // lingua + i18n
        var flagEl = (document.querySelector && document.querySelector('.flag.selected')) ? document.querySelector('.flag.selected') : null;
        var raw = flagEl ? (flagEl.getAttribute('data-lang') || '') : '';
        var langRaw = raw || (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || localStorage.getItem('lang') || 'it'));
        var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
        var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

        var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
        var rtl = (lang === 'ar') ? 'direction:rtl;text-align:right;' : '';

        var CATS = {
          "porta":    { "it":"Porta",    "en":"Gate",   "es":"Puerta",   "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
          "portello": { "it":"Portello", "en":"Wicket", "es":"Portillo", "fr":"Poterne", "ar":"بوّابة صغيرة",   "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
          "torre":    { "it":"Torre",    "en":"Tower",  "es":"Torre",    "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
          "forte":    { "it":"Forte",    "en":"Fort",   "es":"Fuerte",   "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
          "altro":    { "it":"Elemento", "en":"Feature","es":"Elemento", "fr":"Élément", "ar":"عنصر",          "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
        };
        var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) {}

        // palette sfondi (categoria pieno, titolo medio, anno leggero)
        var catBG   = rgbaFromHex(baseColor, 1.00);
        var titleBG = rgbaFromHex(baseColor, 0.18);
        var yearBG  = rgbaFromHex(baseColor, 0.10);

        var __title = (n.name || '').toString();
        var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
        var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

        var cat = catLabel
          ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>`
          : '';

        var header = `<div style="margin-bottom:.35rem">
            ${cat}
            <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
            ${__year}
          </div>`;

        const body = `<div style="max-width:250px;margin:0 auto">
            <div style="min-width:0">${__descr}</div>
            <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
          </div>`;

        return `<div style="min-width:260px;max-width:540px;line-height:1.3;${rtl}">
            ${header}
            ${body}
          </div>`;
      })();

      marker.bindPopup(__html, { closeButton: true, autoPan: true, maxWidth: 640, className: 'mura-popup' });

      // Ricostruzione su apertura (lingua) + media (usa sempre il colore "congelato")
      try {
        marker.on('popupopen', function () {
          try {
            var langRaw = (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || 'it'));
            var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
            var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

            var CATS = {
              "porta":    { "it":"Porta",    "en":"Gate",   "es":"Puerta",   "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
              "portello": { "it":"Portello", "en":"Wicket", "es":"Portillo", "fr":"Poterne", "ar":"بوّابة صغيرة",   "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
              "torre":    { "it":"Torre",    "en":"Tower",  "es":"Torre",    "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
              "forte":    { "it":"Forte",    "en":"Fort",   "es":"Fuerte",   "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
              "altro":    { "it":"Elemento", "en":"Feature","es":"Elemento", "fr":"Élément", "ar":"عنصر",          "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
            };
            var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) {}

            // usa il colore congelato del marker
            var frozen = this.__popupColor || this.options.color || wallColorP || '#1e40af';
            function rgbaFromHex(hex, a) {
              try {
                var h = hex.replace('#', '');
                if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join('');
                var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
                return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
              } catch (e) { return hex; }
            }
            var catBG   = rgbaFromHex(frozen, 1.00);
            var titleBG = rgbaFromHex(frozen, 0.18);
            var yearBG  = rgbaFromHex(frozen, 0.10);

            var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
            var __title = (n.name || '').toString();
            var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
            var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

            var cat = catLabel
              ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>`
              : '';

            var header = `<div style="margin-bottom:.35rem">
                ${cat}
                <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
                ${__year}
              </div>`;

            const body = `<div style="max-width:250px;margin:0 auto">
                <div style="min-width:0">${__descr}</div>
                <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
              </div>`;

            this.getPopup().setContent(`<div style="min-width:260px;max-width:540px;line-height:1.3">${header}${body}</div>`);

            // media esplicita + fallback solo se manca
            try {
              var host = this.getPopup().getElement().querySelector('#media-' + _nid);
              if (host && n.media && n.media.length && typeof n.media[0] === 'string') {
                var src = n.media[0];
                host.innerHTML = '';
                var img = document.createElement('img');
                img.src = src; img.alt = __title; img.loading = 'lazy';
                img.style.width = '100%'; img.style.height = 'auto';
                img.onerror = function () { host.innerHTML = '<div style="font-size:.85rem;opacity:.75">Immagine non trovata: ' + src + '</div>'; };
                host.appendChild(img);
              } else if (window.__mura_media && typeof __mura_media.ensureMedia === 'function') {
                __mura_media.ensureMedia('mura-porto', n, this.getPopup().getElement());
              }
            } catch (e) {}
          } catch (e) {}
        });
      } catch (e) {}

    } catch (e) {}
    try { marker.bindTooltip(n.name, { direction: 'top', offset: [0, -10], sticky: true, opacity: 0.95 }); } catch (e) {}
    marker.on('mouseover', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('mouseout', function () { try { this.closeTooltip(); } catch (e) {} });
    marker.on('touchstart', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('touchend', function () { var self = this; setTimeout(function () { try { self.closeTooltip(); } catch (e) {} }, 1200); });
    marker.addTo(groupWallsNodes);
  });
}
 // --- Mura della Repubblica ---
 if (v['mura-repubblica'] && MURA_DATA['mura-repubblica']) {
  var wallColorRep = '#f95800';
  var gjRep = L.geoJSON(MURA_DATA['mura-repubblica'], {
    interactive: WALL_LINES_INTERACTIVE,
    style: function (f) {
      var w = (f.properties && f.properties['stroke-width']) ? f.properties['stroke-width'] : 3;
      return { color: wallColorRep, weight: w, opacity: 0.9, smoothFactor: 1.2 };
    },
    onEachFeature: function (feature, layer) {
      var name = (feature.properties && feature.properties.name) ? feature.properties.name : 'Cinta muraria';
      var period = (feature.properties && feature.properties.period) ? feature.properties.period : '';
      if (WALL_LINES_INTERACTIVE) layer.bindTooltip(wallLabel(name, period), { direction: 'top', sticky: true, offset: [8, 8] });
    }
  });
  gjRep.addTo(groupWallsLine);

  var nodes = (typeof WALL_NODES !== 'undefined' && WALL_NODES['mura-repubblica']) ? WALL_NODES['mura-repubblica'] : [];
  nodes.forEach(function (n) {
    var marker = L.circleMarker([n.coords[0], n.coords[1]], wallNodeStyle(n.type, wallColorRep));

    // Congela il colore per questo marker (evita interferenze da altre cinte)
    var baseColor = marker.options.color || wallColorRep || '#f95800';
    marker.__popupColor = baseColor;

    try {
      // helper RGBA dal colore del tracciato
      function rgbaFromHex(hex, a) {
        try {
          var h = hex.replace('#', '');
          if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
          var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
          return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
        } catch (e) { return hex; }
      }

      var __html = (function () {
        // lingua + i18n
        var flagEl = (document.querySelector && document.querySelector('.flag.selected')) ? document.querySelector('.flag.selected') : null;
        var raw = flagEl ? (flagEl.getAttribute('data-lang') || '') : '';
        var langRaw = raw || (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || localStorage.getItem('lang') || 'it'));
        var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
        var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

        var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
        var rtl = (lang === 'ar') ? 'direction:rtl;text-align:right;' : '';

        var CATS = {
          "porta":    { "it":"Porta",    "en":"Gate",   "es":"Puerta",   "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
          "portello": { "it":"Portello", "en":"Wicket", "es":"Portillo", "fr":"Poterne", "ar":"بوّابة صغيرة",   "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
          "torre":    { "it":"Torre",    "en":"Tower",  "es":"Torre",    "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
          "forte":    { "it":"Forte",    "en":"Fort",   "es":"Fuerte",   "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
          "altro":    { "it":"Elemento", "en":"Feature","es":"Elemento", "fr":"Élément", "ar":"عنصر",          "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
        };
        var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) {}

        // palette sfondi (categoria pieno, titolo medio, anno leggero)
        var catBG   = rgbaFromHex(baseColor, 1.00);
        var titleBG = rgbaFromHex(baseColor, 0.18);
        var yearBG  = rgbaFromHex(baseColor, 0.10);

        var __title = (n.name || '').toString();
        var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
        var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

        var cat = catLabel
          ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>`
          : '';

        var header = `<div style="margin-bottom:.35rem">
            ${cat}
            <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
            ${__year}
          </div>`;

        const body = `<div style="max-width:250px;margin:0 auto">
            <div style="min-width:0">${__descr}</div>
            <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
          </div>`;

        return `<div style="min-width:260px;max-width:540px;line-height:1.3;${rtl}">
            ${header}
            ${body}
          </div>`;
      })();

      marker.bindPopup(__html, { closeButton: true, autoPan: true, maxWidth: 640, className: 'mura-popup' });

      // Ricostruzione su apertura (lingua) + media (usa sempre il colore "congelato")
      try {
        marker.on('popupopen', function () {
          try {
            var langRaw = (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || 'it'));
            var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
            var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

            var CATS = {
              "porta":    { "it":"Porta",    "en":"Gate",   "es":"Puerta",   "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
              "portello": { "it":"Portello", "en":"Wicket", "es":"Portillo", "fr":"Poterne", "ar":"بوّابة صغيرة",   "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
              "torre":    { "it":"Torre",    "en":"Tower",  "es":"Torre",    "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
              "forte":    { "it":"Forte",    "en":"Fort",   "es":"Fuerte",   "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
              "altro":    { "it":"Elemento", "en":"Feature","es":"Elemento", "fr":"Élément", "ar":"عنصر",          "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
            };
            var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) {}

            // usa il colore congelato del marker
            var frozen = this.__popupColor || this.options.color || wallColorRep || '#f95800';
            function rgbaFromHex(hex, a) {
              try {
                var h = hex.replace('#', '');
                if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join('');
                var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
                return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
              } catch (e) { return hex; }
            }
            var catBG   = rgbaFromHex(frozen, 1.00);
            var titleBG = rgbaFromHex(frozen, 0.18);
            var yearBG  = rgbaFromHex(frozen, 0.10);

            var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
            var __title = (n.name || '').toString();
            var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
            var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

            var cat = catLabel
              ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>`
              : '';

            var header = `<div style="margin-bottom:.35rem">
                ${cat}
                <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
                ${__year}
              </div>`;

            const body = `<div style="max-width:250px;margin:0 auto">
                <div style="min-width:0">${__descr}</div>
                <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
              </div>`;

            this.getPopup().setContent(`<div style="min-width:260px;max-width:540px;line-height:1.3">${header}${body}</div>`);

            // Media esplicita + fallback (corretto sulla chiave 'mura-repubblica')
            try {
              var host = this.getPopup().getElement().querySelector('#media-' + _nid);
              if (host && n.media && n.media.length && typeof n.media[0] === 'string') {
                var src = n.media[0];
                host.innerHTML = '';
                var img = document.createElement('img');
                img.src = src; img.alt = __title; img.loading = 'lazy';
                img.style.width = '100%'; img.style.height = 'auto';
                img.onerror = function () { host.innerHTML = '<div style="font-size:.85rem;opacity:.75">Immagine non trovata: ' + src + '</div>'; };
                host.appendChild(img);
              } else if (window.__mura_media && typeof __mura_media.ensureMedia === 'function') {
                __mura_media.ensureMedia('mura-repubblica', n, this.getPopup().getElement());
              }
            } catch (e) {}
          } catch (e) {}
        });
      } catch (e) {}

    } catch (e) {}
    try { marker.bindTooltip(n.name, { direction: 'top', offset: [0, -10], sticky: true, opacity: 0.95 }); } catch (e) {}
    marker.on('mouseover', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('mouseout', function () { try { this.closeTooltip(); } catch (e) {} });
    marker.on('touchstart', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('touchend', function () { var self = this; setTimeout(function () { try { self.closeTooltip(); } catch (e) {} }, 1200); });
    marker.addTo(groupWallsNodes);
  });
}

  // --- Mura del Rinascimento ---
  if (v['mura-rinascimento'] && MURA_DATA['mura-rinascimento']) {
  var wallColorRin = '#6b21a8';
  var gjRin = L.geoJSON(MURA_DATA['mura-rinascimento'], {
    interactive: WALL_LINES_INTERACTIVE,
    style: function (f) {
      var w = (f.properties && f.properties['stroke-width']) ? f.properties['stroke-width'] : 3;
      return { color: wallColorRin, weight: w, opacity: 0.9, smoothFactor: 1.2 };
    },
    onEachFeature: function (feature, layer) {
      var name = (feature.properties && feature.properties.name) ? feature.properties.name : 'Cinta muraria';
      var period = (feature.properties && feature.properties.period) ? feature.properties.period : '';
      if (WALL_LINES_INTERACTIVE) layer.bindTooltip(wallLabel(name, period), { direction: 'top', sticky: true, offset: [8, 8] });
    }
  });
  gjRin.addTo(groupWallsLine);

  var nodes = (typeof WALL_NODES !== 'undefined' && WALL_NODES['mura-rinascimento']) ? WALL_NODES['mura-rinascimento'] : [];
  nodes.forEach(function (n) {
    var marker = L.circleMarker([n.coords[0], n.coords[1]], wallNodeStyle(n.type, wallColorRin));

    // Congela il colore per questo marker (evita interferenze da altre cinte)
    var baseColor = marker.options.color || wallColorRin || '#6b21a8';
    marker.__popupColor = baseColor;

    try {
      // helper RGBA dal colore del tracciato
      function rgbaFromHex(hex, a) {
        try {
          var h = hex.replace('#', '');
          if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
          var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
          return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
        } catch (e) { return hex; }
      }

      var __html = (function () {
        // lingua + i18n (come nel tuo estratto)
        var flagEl = (document.querySelector && document.querySelector('.flag.selected')) ? document.querySelector('.flag.selected') : null;
        var raw = flagEl ? (flagEl.getAttribute('data-lang') || '') : '';
        var langRaw = raw || (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || localStorage.getItem('lang') || 'it'));
        var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
        var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

        var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
        var rtl = (lang === 'ar') ? 'direction:rtl;text-align:right;' : '';

        var CATS = {
          "porta":    { "it":"Porta",    "en":"Gate",   "es":"Puerta",   "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
          "portello": { "it":"Portello", "en":"Wicket", "es":"Portillo", "fr":"Poterne", "ar":"بوّابة صغيرة",   "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
          "torre":    { "it":"Torre",    "en":"Tower",  "es":"Torre",    "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
          "forte":    { "it":"Forte",    "en":"Fort",   "es":"Fuerte",   "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
          "altro":    { "it":"Elemento", "en":"Feature","es":"Elemento", "fr":"Élément", "ar":"عنصر",          "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
        };
        var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) {}

        // palette sfondi (categoria pieno, titolo medio, anno leggero)
        var catBG   = rgbaFromHex(baseColor, 1.00);
        var titleBG = rgbaFromHex(baseColor, 0.18);
        var yearBG  = rgbaFromHex(baseColor, 0.10);

        var __title = (n.name || '').toString();
        // ⬇️ verticali: block + width:max-content
        var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
        var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

        // categoria a blocco (riga propria)
        var cat = catLabel
          ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>`
          : '';

        // titolo a blocco (riga propria)
        var header = `<div style="margin-bottom:.35rem">
            ${cat}
            <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
            ${__year}
          </div>`;

        const body = `<div style="max-width:250px;margin:0 auto">
            <div style="min-width:0">${__descr}</div>
            <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
          </div>`;

        return `<div style="min-width:260px;max-width:540px;line-height:1.3;${rtl}">
            ${header}
            ${body}
          </div>`;
      })();

      marker.bindPopup(__html, { closeButton: true, autoPan: true, maxWidth: 640, className: 'mura-popup' });

      // Ricostruzione su apertura (lingua) + media (usa sempre il colore "congelato")
      try {
        marker.on('popupopen', function () {
          try {
            var langRaw = (typeof currentLang === 'function' ? currentLang() : (document.documentElement.getAttribute('lang') || 'it'));
            var lang = (typeof normalizeLang === 'function' ? normalizeLang(langRaw) : (langRaw || 'it')).toLowerCase();
            var t = (n.i18n && (n.i18n[lang] || n.i18n['it'] || n.i18n['en'])) || {};

            var CATS = {
              "porta":    { "it":"Porta",    "en":"Gate",   "es":"Puerta",   "fr":"Porte",   "ar":"بوابة",         "ru":"Ворота",   "zh":"城门",   "lij":"Pòrta" },
              "portello": { "it":"Portello", "en":"Wicket", "es":"Portillo", "fr":"Poterne", "ar":"بوّابة صغيرة",   "ru":"Калитка",  "zh":"便门",   "lij":"Portéllo" },
              "torre":    { "it":"Torre",    "en":"Tower",  "es":"Torre",    "fr":"Tour",    "ar":"برج",           "ru":"Башня",    "zh":"塔",     "lij":"Torre" },
              "forte":    { "it":"Forte",    "en":"Fort",   "es":"Fuerte",   "fr":"Fort",    "ar":"حصن",           "ru":"Форт",     "zh":"堡垒",   "lij":"Fòrte" },
              "altro":    { "it":"Elemento", "en":"Feature","es":"Elemento", "fr":"Élément", "ar":"عنصر",          "ru":"Объект",   "zh":"要素",   "lij":"Eleménto" }
            };
            var catLabel = ''; try { var c = (CATS[n.type] || {}); catLabel = c[lang] || c['it'] || c['en'] || ''; } catch (e) {}

            // colore congelato del marker
            var frozen = this.__popupColor || this.options.color || wallColorRin || '#6b21a8';
            function rgbaFromHex(hex, a) {
              try {
                var h = hex.replace('#', '');
                if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join('');
                var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
                return 'rgba(' + r + ',' + g + ',' + b + ',' + (a == null ? 1 : a) + ')';
              } catch (e) { return hex; }
            }
            var catBG   = rgbaFromHex(frozen, 1.00);
            var titleBG = rgbaFromHex(frozen, 0.18);
            var yearBG  = rgbaFromHex(frozen, 0.10);

            var _nid = (n.id || (n.name + '_' + (n.coords || []).join('_'))).replace(/[^a-z0-9_\-]+/gi, '-').toLowerCase();
            var __title = (n.name || '').toString();
            var __year  = t.year ? `<div style="display:block;background:${yearBG};padding:.06rem .35rem;border-radius:.35rem;font-size:.9rem;opacity:.95;margin-top:.18rem;width:max-content">${t.year}</div>` : '';
            var __descr = t.descr ? `<div style="font-size:.95rem;line-height:1.35;text-align:justify;text-justify:inter-word">${t.descr}</div>` : '<div style="font-size:.85rem;opacity:.8">Aggiungi note…</div>';

            var cat = catLabel
              ? `<div style="display:block;background:${catBG};color:#fff;padding:.08rem .38rem;border-radius:.35rem;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.18rem;width:max-content">${catLabel}</div>`
              : '';

            var header = `<div style="margin-bottom:.35rem">
                ${cat}
                <div style="font-weight:800;font-size:1.1rem;display:block;background:${titleBG};padding:.08rem .38rem;border-radius:.38rem;margin-top:.12rem;width:max-content">${__title}</div>
                ${__year}
              </div>`;

            const body = `<div style="max-width:250px;margin:0 auto">
                <div style="min-width:0">${__descr}</div>
                <div id="media-${_nid}" class="mura-media" style="width:100%;margin:.5rem auto 0; padding-left:0"></div>
              </div>`;

            this.getPopup().setContent(`<div style="min-width:260px;max-width:540px;line-height:1.3">${header}${body}</div>`);

            // Media: esplicita + fallback (chiave corretta 'mura-rinascimento')
            try {
              var host = this.getPopup().getElement().querySelector('#media-' + _nid);
              if (host && n.media && n.media.length && typeof n.media[0] === 'string') {
                var src = n.media[0];
                host.innerHTML = '';
                var img = document.createElement('img');
                img.src = src; img.alt = __title; img.loading = 'lazy';
                img.style.width = '100%'; img.style.height = 'auto';
                img.onerror = function () { host.innerHTML = '<div style="font-size:.85rem;opacity:.75">Immagine non trovata: ' + src + '</div>'; };
                host.appendChild(img);
              } else if (window.__mura_media && typeof __mura_media.ensureMedia === 'function') {
                __mura_media.ensureMedia('mura-rinascimento', n, this.getPopup().getElement());
              }
            } catch (e) {}
          } catch (e) {}
        });
      } catch (e) {}

    } catch (e) {}
    try { marker.bindTooltip(n.name, { direction: 'top', offset: [0, -10], sticky: true, opacity: 0.95 }); } catch (e) {}
    marker.on('mouseover', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('mouseout', function () { try { this.closeTooltip(); } catch (e) {} });
    marker.on('touchstart', function () { try { this.openTooltip(); } catch (e) {} });
    marker.on('touchend', function () { var self = this; setTimeout(function () { try { self.closeTooltip(); } catch (e) {} }, 1200); });
    marker.addTo(groupWallsNodes);
  });

  }

  // ensure group shown if any wall visible
  try {
    if ((v['mura-barbarossa']||v['mura-nuove']||v['mura-romane']||v['mura-carolinge']||v['mura-porto']||v['mura-repubblica']||v['mura-rinascimento']) && !map.hasLayer(groupWallsLine)) groupWallsLine.addTo(map);
  } catch(e){}

}

function updateWallNodesVisibility(){
  try{
    if(!window.map || !groupWallsNodes) return;
    if (!window.map.hasLayer(groupWallsNodes)) groupWallsNodes.addTo(window.map);
  }catch(e){}
}
function start(){ hideStatus();
      try {
        map = L.map('map', { zoomControl: true });
        window.map = map; // PATCH 2025-09-14: expose map globally for QR

        var comuneBounds = L.latLngBounds([[44.10, 8.40],[44.75, 9.35]]);
map.fitBounds(comuneBounds, { padding:[0,0] });
        map.setMaxBounds(comuneBounds.pad(0.04));
        map.options.maxBoundsViscosity = 1.0;
        var z = map.getBoundsZoom(comuneBounds, true);
        map.setMinZoom(9);

        // Base map: OSM standard con etichette
        tiles = L.tileLayer('https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.png?key=' + window.MAPTILER_KEY + '&language=it', {
  tileSize: 512,
  zoomOffset: -1,
  maxZoom: 20,
  attribution: '© OpenStreetMap contributors • MapTiler'
}).addTo(map);
map.attributionControl.setPosition('topleft');
map.attributionControl.setPrefix(false);


        tiles.on('tileerror', function(){ showStatus('Impossibile caricare alcune tessere della mappa. Controlla la connessione internet.'); });
        // Layer groups per legenda
        groupBlue = L.layerGroup(); /* keep off-map by default */
        groupOrange = L.layerGroup().addTo(map);
        // Cinte murarie: linea sempre; nodi con zoom
        groupWallsLine = L.layerGroup().addTo(map);
        groupWallsNodes = L.layerGroup();

// --- GPS wiring ---
var gpsBtn = document.getElementById('btn-gps');
if(gpsBtn){
  gpsBtn.addEventListener('click', function(){
    if(!gpsActive){
      // Start locating
      ensureGpsLayers();
      try{ gpsMarker.addTo(map); gpsAccuracy.addTo(map);}catch(e){}
    

      setGpsOn(true);
      map.locate({ watch:true, enableHighAccuracy:true, maximumAge:10000, timeout:10000, setView:false });
    } else {
      // Stop locating
      setGpsOn(false);
      try{ map.stopLocate(); }catch(e){}
      try{ if(gpsMarker) map.removeLayer(gpsMarker); }catch(e){}
      try{ if(gpsAccuracy) map.removeLayer(gpsAccuracy); }catch(e){}
    }
  });
}

map.on('locationfound', function(e){
  if(!gpsActive) return;
          if(window.gpsLocked || (typeof MANUAL_OVERRIDE!=='undefined' && MANUAL_OVERRIDE)) return;
          if(MANUAL_OVERRIDE){ try{ map.stopLocate(); }catch(e){} return; }

  ensureGpsLayers();
  var acc = e.accuracy || 0;
  var latlng = e.latlng;
  // Accetta sempre la PRIMA fix
  if(!gpsLastLatLng){
    gpsLastLatLng = latlng;
  } else {
    // anti-jitter leggero dopo la prima fix
    if(acc > 100) return; // troppo impreciso
    if(gpsLastLatLng.distanceTo && gpsLastLatLng.distanceTo(latlng) < 10) return; // meno di 10m: ignora
    gpsLastLatLng = latlng;
  }
  gpsMarker.setLatLng(gpsLastLatLng);
  gpsAccuracy.setLatLng(gpsLastLatLng);
  gpsAccuracy.setRadius(acc);
  if(!firstFixDone){
    firstFixDone = true;
    map.setView(gpsLastLatLng, Math.max(map.getZoom(), 17), { animate:true });
  }
});
map.on('locationerror', function(err){
  showStatus('GPS non disponibile: ' + (err && err.message ? err.message : err));
  setGpsOn(false);
  try{ map.stopLocate(); }catch(e){}
  try{ if(gpsMarker) map.removeLayer(gpsMarker); }catch(e){}
  try{ if(gpsAccuracy) map.removeLayer(gpsAccuracy); }catch(e){}
});

        // Cluster per i tre punti azzurri di San Teodoro
        blueCluster = L.markerClusterGroup({
          disableClusteringAtZoom: 17,
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
          maxClusterRadius: 60,
          iconCreateFunction: function(cluster){
            return L.divIcon({
              html: '',
              className: 'cluster-azzurro',
              iconSize: [20,20]
            });
          }
        });
        // click sul cluster -> zoom nel suo bounds
        blueCluster.on('clusterclick', function(e){
          map.fitBounds(e.layer.getBounds(), { padding:[40,40] });
        });
        groupBlue.addLayer(blueCluster);
      } catch(err){
        document.getElementById('map').innerHTML = '<div style="padding:1rem">Errore nel caricare la mappa: '+(err && err.message ? err.message : err)+'</div>';
        console.error(err); return;
      }

      renderMarkers();

// === Aggregazioni multiple (punti Blu quando si è lontani) ===
var AGGREGATES = [
  {
    id:'agg-s-teodoro',
    label:'S.Teodoro',
    coords:[44.4137974975145, 8.914131666431476],
    members:['via-buozzi','san-teodoro-azzurro','nuova-san-teodoro']
  },
  {
    id:'agg-villa-doria',
    label:'Villa Doria',
    coords:[44.41612047846311, 8.919390925348477],
    members:['il-dinegro','villa-del-principe']
  },
  {
    id:'agg-de-ferrari',
    label:'Pz. de Ferrari',
    coords:[44.406833128849726, 8.933693466668242],
    members:['piazza-matteotti','teatro-carlo-felice']
  }
];

var aggMarkers = {}; // id -> L.Marker
var sanAggThresholdZoom = null; // zoom iniziale + 3

function buildAggregateMarker(agg){
  if(aggMarkers[agg.id]) return aggMarkers[agg.id];
  var icon = L.divIcon({ className:'blue-dot-dark', iconSize:[18,18] });
  var m = L.marker(agg.coords, { icon: icon, keyboard:false });
  m.bindTooltip(agg.label);
  m.on('click', function(){
    var pts = agg.members.map(function(id){ return markersById[id]; }).filter(Boolean).map(function(m){ return m.getLatLng(); });
    if(pts.length){
      var b = L.latLngBounds(pts);
      map.fitBounds(b, { padding:[40,40] });
    }
  });
  aggMarkers[agg.id] = m;
  return m;
}

function removeBlueMarkerEverywhere(m){
  if(!m) return;
  try{ if(groupBlue && groupBlue.hasLayer(m)) groupBlue.removeLayer(m); }catch(e){}
  try{ if(typeof blueCluster!=='undefined' && blueCluster && blueCluster.hasLayer(m)) blueCluster.removeLayer(m); }catch(e){}
}

function addBlueMarkerBack(m){
  if(!m) return;
  try{ if(groupBlue && !groupBlue.hasLayer(m)) groupBlue.addLayer(m); }catch(e){}
}

function setAggregatesVisible(showAggregates){
  if(!groupBlue) return;
  if(showAggregates){
    // Nascondi tutti i membri azzurri di tutte le aggregazioni
    AGGREGATES.forEach(function(agg){
      (agg.members||[]).forEach(function(id){
        removeBlueMarkerEverywhere(markersById[id]);
      });
    });
    // Mostra tutti i punti Blu aggregati
    AGGREGATES.forEach(function(agg){
      var m = buildAggregateMarker(agg);
      if(m && !groupBlue.hasLayer(m)) groupBlue.addLayer(m);
    });
  } else {
    // Rimuovi tutti i punti Blu aggregati
    Object.keys(aggMarkers).forEach(function(k){
      var m = aggMarkers[k];
      if(m){ try{ groupBlue.removeLayer(m); }catch(e){} }
    });
    // Riaggiungi i membri azzurri
    AGGREGATES.forEach(function(agg){
      (agg.members||[]).forEach(function(id){
        addBlueMarkerBack(markersById[id]);
      });
    });
  }
}

// Calibrazione soglia (primi 3 click)
sanAggThresholdZoom = map.getZoom() + 3;
setAggregatesVisible(true);

map.on('zoomend', function(){
  var wantAgg = (map.getZoom() < sanAggThresholdZoom);
  setAggregatesVisible(wantAgg);
});
// === fine aggregazioni multiple ===

      // --- S.Teodoro: marker aggregato + logica zoom ---
      function buildSanTeodoroAggMarker(){
        if(sanAggMarker) return;
        var aggIcon = L.divIcon({ className:'blue-dot-dark', iconSize:[16,16] });
        sanAggMarker = L.marker(SAN_TEODORO_AGG_COORDS, { icon: aggIcon, keyboard:false });
        sanAggMarker.bindTooltip('S.Teodoro');
        sanAggMarker.on('click', function(){
          var pts = (typeof SAN_TEODORO_CLUSTER_IDS!=='undefined'?SAN_TEODORO_CLUSTER_IDS:[])
            .map(function(id){ return markersById[id]; })
            .filter(Boolean)
            .map(function(m){ return m.getLatLng(); });
          if(pts.length){
            var b = L.latLngBounds(pts);
            map.fitBounds(b, { padding:[40,40] });
          }
        });
      }
      function setSanTeodoroAggregation(showAggregate){
        if(!groupBlue || !blueCluster) return;
        buildSanTeodoroAggMarker();
        if(showAggregate){
          // nascondi i 3 azzurri e mostra il blu unico
          (typeof SAN_TEODORO_CLUSTER_IDS!=='undefined'?SAN_TEODORO_CLUSTER_IDS:[]).forEach(function(id){
            var m = markersById[id]; if(m){ try{ blueCluster.removeLayer(m); }catch(e){} }
          });
          if(sanAggMarker && !groupBlue.hasLayer(sanAggMarker)) groupBlue.addLayer(sanAggMarker);
        } else {
          // mostra i 3 azzurri e togli il blu unico
          if(sanAggMarker && groupBlue.hasLayer(sanAggMarker)) groupBlue.removeLayer(sanAggMarker);
          (typeof SAN_TEODORO_CLUSTER_IDS!=='undefined'?SAN_TEODORO_CLUSTER_IDS:[]).forEach(function(id){
            var m = markersById[id]; if(m){ try{ blueCluster.addLayer(m); }catch(e){} }
          });
        }
      }
      if(map && typeof map.getZoom==='function'){
        sanAggThresholdZoom = map.getZoom() + 3; // primi 3 click
        setSanTeodoroAggregation(false);
        map.on('zoomend', function(){
          var z = map.getZoom();
          var wantAggregate = (z < sanAggThresholdZoom);
          setSanTeodoroAggregation(wantAggregate);
        });
      }

      wireLegend();
      wireWalls();
      
      if(typeof wireRoutes === 'function') wireRoutes();

      if(typeof wireRoutesAccordion === 'function') wireRoutesAccordion();
// Chiudi la tendina 'Legenda' quando clicchi sulla mappa
      map.on('click', function(){ var w=document.getElementById('legend'); if(w) w.classList.remove('open'); var m=document.getElementById('walls-menu'); if(m) m.style.display='none'; });
      map.on('click', function(){ var m=document.getElementById('routes-menu'); if(m) m.style.display='none'; });
      applyLegendVisibility();
      wirePanel();
      
      // Render walls and gate nodes by zoom
      renderWalls();
      computeWallsNodesMinZoom();
      updateWallNodesVisibility();
      map.on('zoomend', updateWallNodesVisibility);
      deepLink();
    }

    function renderMarkers(){
      // svuota gruppi e mappa markers
      if(groupBlue) groupBlue.clearLayers();
      if(groupOrange) groupOrange.clearLayers();
      markersById = {};
      PLACES.forEach(function(p){
        var isOrange = (p.iconColor || p.category==='premium');
        var marker;
        if(isOrange){
          marker = L.marker(p.coords, { icon: docIcon() });
          marker.addTo(groupOrange);
        } else {
          marker = L.marker(p.coords);
          marker.addTo(groupBlue);
        }
        marker.bindTooltip(p.name);
        marker.on('click', function(){ openPlace(p.id); });
        markersById[p.id]=marker;
      });
    }

    function wireLegend(){
      var btn = document.getElementById('legend-btn');
      var wrap = document.getElementById('legend');
      var chkBlue = document.querySelector('input.blue-sub[data-key="santeodoro"]');
      var chkOrange = document.getElementById('chk-orange');
      // stato persistito
      var showBlue = (localStorage.getItem('legend_blue')!=='0');
      var showOrange = (localStorage.getItem('legend_orange')!=='0');
      if(chkBlue){ chkBlue.checked = showBlue; }
      if(chkOrange){ chkOrange.checked = showOrange; }
      function toggleOpen(){ wrap.classList.toggle('open'); }
      btn.addEventListener('click', function(e){ e.stopPropagation(); toggleOpen(); });
      // Rimuovo auto-close su click esterno
      //document.addEventListener('click', function(){ wrap.classList.remove('open'); }); });
      chkBlue.addEventListener('change', function(){ localStorage.setItem('legend_blue', this.checked?'1':'0'); applyLegendVisibility(); });
      chkOrange.addEventListener('change', function(){ localStorage.setItem('legend_orange', this.checked?'1':'0'); applyLegendVisibility(); });
    }

    function applyLegendVisibility(){
      var chkBlue = document.querySelector('input.blue-sub[data-key="santeodoro"]');
      var chkOrange = document.getElementById('chk-orange');
      var wantBlue = chkBlue ? chkBlue.checked : true;
      var wantOrange = chkOrange ? chkOrange.checked : true;
      if(groupBlue){ if(wantBlue && !map.hasLayer(groupBlue)) groupBlue.addTo(map); else if(!wantBlue && map.hasLayer(groupBlue)) map.removeLayer(groupBlue); }
      if(groupOrange){ if(wantOrange && !map.hasLayer(groupOrange)) groupOrange.addTo(map); else if(!wantOrange && map.hasLayer(groupOrange)) map.removeLayer(groupOrange); }
    }

    // --- PANNELLO ---
    var panel=document.getElementById('panel');
    var elTitle=document.getElementById('place-title');
    var elMeta=document.getElementById('place-meta');
    var elDesc=document.getElementById('place-desc');
    var elDeep=document.getElementById('deep-link');
    var badgePremium=document.getElementById('badge-premium');

    var imgToday=document.getElementById('media-today');
    var vidToday=document.getElementById('media-video-today');
    var imgPast=document.getElementById('media-past');
    var vidPast=document.getElementById('media-video');
    var ytWrap=document.getElementById('media-yt');
    var ytIframe=document.getElementById('yt-iframe');
    var paywall=document.getElementById('paywall');

    var btnToday=document.getElementById('btn-today');
    var btnPast=document.getElementById('btn-past');
    var btnSfx=document.getElementById('btn-sfx');
    var prevBtn=document.getElementById('prev');
    var nextBtn=document.getElementById('next');
    var counter=document.getElementById('counter');

    function wirePanel(){
      var closePanelBtn=document.getElementById('close'); if(closePanelBtn) closePanelBtn.addEventListener('click', function(){ panel.classList.remove('open'); stopAllMedia(); });
      var closeOverlayBtn=document.getElementById('btn-close-overlay'); if(closeOverlayBtn) closeOverlayBtn.addEventListener('click', function(){ hidePaywall(); });
      var subscribeBtn=document.getElementById('btn-subscribe'); if(subscribeBtn) subscribeBtn.addEventListener('click', function(){ setSubscribed(true); });
      if(btnToday) btnToday.addEventListener('click', function(){ setMode('today'); });
      if(btnPast) btnPast.addEventListener('click', function(){ setMode('past'); });
      if(btnSfx) btnSfx.addEventListener('click', function(){ setMode('sfx'); });
      if(prevBtn) prevBtn.addEventListener('click', function(){ var g=getCurrentGallery(); if(!g.length) return; decIndex(); renderMedia(); });
      if(nextBtn) nextBtn.addEventListener('click', function(){ var g=getCurrentGallery(); if(!g.length) return; incIndex(); renderMedia(); });
    }

    function show(el){ if(el) el.style.display = 'block'; }
    function hide(el){ if(el) el.style.display = 'none'; }
    function showPaywall(){ show(paywall); }
    function hidePaywall(){ hide(paywall); }
    function stopAllMedia(){ try{ vidToday.pause(); }catch(e){} try{ vidPast.pause(); }catch(e){} if(ytIframe){ try{ ytIframe.src = ytIframe.src; }catch(e){} } }

    var current=null, galleryToday=[], galleryPast=[], gallerySfx=[], idxToday=0, idxPast=0, idxSfx=0, currentMode='today';
    var previewTimer=null; var PREVIEW_MS=10000; // 10s anteprima

    function setMode(mode){
      currentMode=(mode==='past'||mode==='sfx')?mode:'today';
      btnToday.classList.toggle('active', currentMode==='today');
      btnPast.classList.toggle('active', currentMode==='past');
      btnSfx.classList.toggle('active', currentMode==='sfx');
      var label = (currentMode==='today')
        ? (current&&current.labelToday||'Oggi')
        : (currentMode==='past')
          ? (current&&current.labelPast||'Ieri')
          : 'SFX';
      elMeta.textContent = label + ' • QR: ' + (current?current.id:'');
      renderMedia();
    }

    function buildGalleries(place){
      galleryToday=[]; galleryPast=[]; gallerySfx=[]; idxToday=0; idxPast=0; idxSfx=0;
      if(place.videoToday) galleryToday.push({type:'video', src:place.videoToday, title:place.labelToday});
      if(place.today)      galleryToday.push({type:'image', src:place.today, title:place.labelToday});
      if(Array.isArray(place.galleryToday)) place.galleryToday.forEach(function(it){ if(it&&it.src) galleryToday.push({type:(it.type==='video')?'video':(it.type==='youtube'?'youtube':'image'), src:it.src, title:it.title||place.labelToday}); });
      if(place.videoPast) galleryPast.push({type:'video', src:place.videoPast, title:place.labelPast});
      if(place.past)      galleryPast.push({type:'image', src:place.past, title:place.labelPast});
      if(Array.isArray(place.galleryPast)) place.galleryPast.forEach(function(it){ if(it&&it.src) galleryPast.push({type:(it.type==='video')?'video':(it.type==='youtube'?'youtube':'image'), src:it.src, title:it.title||place.labelPast}); });
      if(Array.isArray(place.sfx)) place.sfx.forEach(function(it){ if(it&&it.src) gallerySfx.push({type:(it.type==='video')?'video':(it.type==='youtube'?'youtube':'image'), src:it.src, title:it.title||'SFX'}); });
    }

    function getCurrentGallery(){
      return currentMode==='today' ? galleryToday : (currentMode==='past' ? galleryPast : gallerySfx);
    }
    function getCurrentIndex(){
      return currentMode==='today' ? idxToday : (currentMode==='past' ? idxPast : idxSfx);
    }
    function setCurrentIndex(v){
      if(currentMode==='today') idxToday=v; else if(currentMode==='past') idxPast=v; else idxSfx=v;
    }
    function decIndex(){ var g=getCurrentGallery(); var i=getCurrentIndex(); setCurrentIndex((i-1+g.length)%g.length); }
    function incIndex(){ var g=getCurrentGallery(); var i=getCurrentIndex(); setCurrentIndex((i+1)%g.length); }

    function clearPreview(){ if(previewTimer){ clearTimeout(previewTimer); previewTimer=null; } hidePaywall(); }
    function startPreviewIfNeeded(item){
      clearPreview(); if(!current) return;
      var isPremium=current.category==='premium';
      if(!isPremium || isSubscribed || isOwner) return;
      if(!(item && (item.type==='video'||item.type==='youtube'))) return;
      previewTimer=setTimeout(function(){
        if(currentMode==='today'){ try{ vidToday.pause(); }catch(e){} } else { try{ vidPast.pause(); }catch(e){} }
        if(item.type==='youtube' && ytIframe){ try{ ytIframe.src=ytIframe.src; }catch(e){} }
        showPaywall();
      }, PREVIEW_MS);
    }

    function renderMedia(){
      var gallery = getCurrentGallery();
      var idx = getCurrentIndex();
      var showPager = gallery.length>1;
      if(prevBtn) prevBtn.style.display = showPager ? 'inline-flex' : 'none';
      if(nextBtn) nextBtn.style.display = showPager ? 'inline-flex' : 'none';
      if(counter){ counter.style.display = showPager ? 'inline' : 'none'; if(showPager){ counter.textContent=(idx+1)+'/'+gallery.length; } }

      hide(imgToday); hide(imgPast); hide(vidToday); hide(vidPast); hide(ytWrap); clearPreview();
      var item=gallery[idx]; if(!item){ imgToday.src=BLANK_IMG; imgPast.src=BLANK_IMG; return; }

      var baseLabel = (currentMode==='today') ? (current&&current.labelToday||'Oggi') : (currentMode==='past' ? (current&&current.labelPast||'Ieri') : 'SFX');
      elMeta.textContent=(item.title||baseLabel)+' • QR: '+(current?current.id:'');

      if(item.type==='youtube'){
        if(ytIframe){
          var src=item.src||''; var embed=src;
          if(/youtu\.be\//.test(src)) embed='https://www.youtube-nocookie.com/embed/'+src.split('/').pop();
          else if(/youtube\.com\/.+v=([^&]+)/.test(src)) embed='https://www.youtube-nocookie.com/embed/'+(src.match(/v=([^&]+)/)||[])[1];
          else if(/^[a-zA-Z0-9_-]{11}$/.test(src)) embed='https://www.youtube-nocookie.com/embed/'+src;
          if(embed.indexOf('?')===-1) embed+='?rel=0&modestbranding=1&playsinline=1&enablejsapi=1';
          else embed+='&rel=0&modestbranding=1&playsinline=1&enablejsapi=1';
          ytIframe.src=embed; show(ytWrap); startPreviewIfNeeded(item);
        }
        return;
      }

      // Per semplicità, usiamo i "canali" esistenti: per SFX sfruttiamo il canale "past" (video/img)
      var useTodayChannel = (currentMode==='today');
      if(useTodayChannel){
        if(item.type==='video'){
          vidToday.innerHTML=''; var s=document.createElement('source'); s.src = srcURL(prefixScorci(item.src)); s.type='video/mp4'; vidToday.appendChild(s); vidToday.loop=true; vidToday.load(); vidToday.onerror=function(){ showStatus('Errore video (OGGI): '+item.src); }; show(vidToday); startPreviewIfNeeded(item);
        } else { imgToday.src=srcURL(item.src)||BLANK_IMG; imgToday.onerror=function(){ this.src=BLANK_IMG; showStatus('Errore immagine (OGGI): '+item.src); }; show(imgToday); }
      } else {
        if(item.type==='video'){
          vidPast.innerHTML=''; var p=document.createElement('source'); p.src = srcURL(prefixScorci(item.src)); p.type='video/mp4'; vidPast.appendChild(p); vidPast.loop=true; vidPast.load(); vidPast.onerror=function(){ showStatus('Errore video (IERI/SFX): '+item.src); }; show(vidPast); startPreviewIfNeeded(item);
        } else { imgPast.src=srcURL(item.src)||BLANK_IMG; imgPast.onerror=function(){ this.src=BLANK_IMG; showStatus('Errore immagine (IERI/SFX): '+item.src); }; show(imgPast); }
      }
    }

    function openPlace(id){
      var place = findById(PLACES, id);
 if(!place) return; current=place;
      elTitle.textContent=place.name; elDesc.textContent=place.caption||''; imgToday.src=BLANK_IMG; imgPast.src=BLANK_IMG; vidToday.innerHTML=''; vidPast.innerHTML='';
      badgePremium.style.display=(place.category==='premium')?'inline-block':'none';
      buildGalleries(place);
      // Premium: nascondi OGGI e rinomina IERI -> MiniDoc
      btnToday.style.display=(place.category==='premium')?'none':'inline-flex';
      btnPast.textContent=(place.category==='premium')?'MiniDoc':'Ieri';
      // SFX: mostra il bottone solo se esistono voci in place.sfx
      btnSfx.style.display = (Array.isArray(place.sfx) && place.sfx.length>0) ? 'inline-flex' : 'none';

      var defaultMode=(place.category==='premium')?'past':(galleryToday.length>0?'today':(gallerySfx.length>0?'sfx':'past'));
      var url=new URL(window.location.href); url.searchParams.set('id', place.id); elDeep.href=url.toString();
      panel.classList.add('open'); setMode(defaultMode);
      var marker=markersById[place.id]; if(marker){ map.setView(marker.getLatLng(), 17, {animate:true}); }
    }

    function deepLink(){
      var params=new URLSearchParams(window.location.search); var deepId=params.get('id');
      if(deepId){ setTimeout(function(){ openPlace(deepId); }, 300); }
      if(!deepId && window.location.hash){ var hashId=window.location.hash.replace('#',''); if(hashId) setTimeout(function(){ openPlace(hashId); }, 300); }
    }

    // Avvio
    if(document.readyState==='complete') start(); else window.addEventListener('load', start);
  })();
;
  