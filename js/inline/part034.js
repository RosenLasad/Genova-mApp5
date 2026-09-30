
// Acquedotti loader (Romano ready; Storico placeholder).
// Reads: acq/romano/traccia.geojson and acq/romano/poi/manifest.json
(function(){
  if (window.__acq_loader_v2__) return; window.__acq_loader_v2__ = true;

  var ZOOM_MIN_POI = 15;
  var COLORS = { romano: '#8b5cf6', storico: '#16a34a' };

  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  function withMap(cb){
    var m = window.map || window.__LEAFLET_MAP__;
    if(m) return cb(m);
    var t=0;(function k(){ t++; var mm = window.map || window.__LEAFLET_MAP__; if(mm){cb(mm);return;} if(t<150) setTimeout(k,120); })();
  }
  function ensureDefaults(v){ v=v||{}; if(typeof v['acq-romano']==='undefined') v['acq-romano']=false; if(typeof v['acq-storico']==='undefined') v['acq-storico']=false; return v; }
  function loadVis(){ try{return JSON.parse(localStorage.getItem('acq_visibility')||'{}');}catch(e){return{};} }
  function saveVis(v){ try{localStorage.setItem('acq_visibility', JSON.stringify(v||{}));}catch(e){} }

  var acq = {
    romano:  { line:null, pois:null, loaded:false, fitted:false, bounds:null },
    storico: { line:null, pois:null, loaded:false, fitted:false, bounds:null }
  };

  function loadRomano(cb){
    if(acq.romano.loaded){ if(cb) cb(); return; }
    withMap(function(m){
      acq.romano.line = L.geoJSON(null, { style: { color: COLORS.romano, weight: 3, opacity: 1 } });
      acq.romano.pois = L.layerGroup();

      // traccia
      
      // Fallback: if inline data are available, use them immediately
      try{
        if (Array.isArray(window.ACQUEDOTTO_ROMANO) && window.ACQUEDOTTO_ROMANO.length){
          var gj_inline = { "type":"FeatureCollection", "features":[
            { "type":"Feature",
              "geometry": { "type":"LineString", "coordinates": window.ACQUEDOTTO_ROMANO.map(function(ll){ return [ll[1], ll[0]]; }) },
              "properties": { "name":"Acquedotto Romano (III sec. a.C.)" }
            }
          ]};
          acq.romano.line.addData(gj_inline);
          try{ acq.romano.bounds = acq.romano.line.getBounds(); }catch(e){}
        }
      }catch(e){}
      // Also perform fetch if available (will merge/override if duplicate)
if (window.USE_ACQ_EXTERNAL) {
  fetch('acq/romano/traccia.geojson')
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(gj){
      if(!gj) return;
      acq.romano.line.addData(gj);
      try{
        acq.romano.bounds = acq.romano.line.getBounds();
      }catch(e){}
    })
    .catch(function(e){ console.warn('[Acq Romano] traccia.geojson missing', e); });

  // manifest punti
  fetch('acq/romano/poi/manifest.json')
    .then(function(r){ return r.ok ? r.json() : []; })
    .then(function(list){
      (list||[]).forEach(function(p){
        var latlng = Array.isArray(p.coords) ? [p.coords[0], p.coords[1]] : null;
        if(!latlng) return;

        var marker = L.circleMarker(latlng, {
          radius: 5,
          color: COLORS.romano,
          weight: 2,
          fillColor: COLORS.romano,
          fillOpacity: .22
        });

        var pid = (p.id || (p.name||'p').toString().toLowerCase().replace(/\s+/g,'-'));
        var mediaId = 'acq-media-romano-' + pid;
        var title = p.name || pid;
        var descHtml = p.desc ? '<div class="desc">'+p.desc+'</div>' : '';


        marker.bindPopup(
          '<div class="popup">'
          + '<h3>'+title+'</h3>'
          + '<div id="'+mediaId+'"></div>'
          + descHtml
          + '</div>'
        );

        marker.on('popupopen', function(){ ensureAcqMedia('romano', p, mediaId); });


        acq.romano.pois.addLayer(marker);
      });
    })
    .catch(function(e){ console.warn('[Acq Romano] manifest.json missing', e); });
}

acq.romano.loaded = true;
if(cb) cb();

      });
  }


  function loadStorico(cb){
    if(acq.storico.loaded){ if(cb) cb(); return; }
    withMap(function(m){
      acq.storico.line = L.geoJSON(null, { style: { color: COLORS.storico, weight: 3, opacity: 1 } });
      acq.storico.pois = L.layerGroup();

      // traccia
      try{
        if (Array.isArray(window.ACQUEDOTTO_STORICO) && window.ACQUEDOTTO_STORICO.length){
          var gj_inline = { "type":"FeatureCollection", "features":[
            { "type":"Feature",
              "geometry": { "type":"LineString", "coordinates": window.ACQUEDOTTO_STORICO.map(function(ll){ return [ll[1], ll[0]]; }) },
              "properties": { "name":"Acquedotto Storico (XVII sec.)" }
            }
          ]};
          acq.storico.line.addData(gj_inline);
          try{ acq.storico.bounds = acq.storico.line.getBounds(); }catch(e){}
        }
      }catch(e){}

      if (window.USE_ACQ_EXTERNAL) {
  fetch('acq/storico/traccia.geojson')
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(gj){
      if(!gj) return;
      try{ acq.storico.line.addData(gj); }catch(_){}
      try{ acq.storico.bounds = acq.storico.line.getBounds(); }catch(_){}
    })
    .catch(function(e){ console.warn('[Acq Storico] traccia.geojson missing', e); });

  // manifest punti (vuoto per ora)
  fetch('acq/storico/poi/manifest.json')
    .then(function(r){ return r.ok ? r.json() : []; })
    .then(function(list){ /* none for now */ })
    .catch(function(e){ console.warn('[Acq Storico] manifest.json missing', e); });
}

acq.storico.loaded = true;
if(cb) cb();

      });
  }


  function ensureAcqMedia(key, p, mediaId){
    var box = document.getElementById(mediaId);
    if(!box || box.getAttribute('data-loaded')==='1') return;
    box.setAttribute('data-loaded','1');
    (p.images||[]).forEach(function(fn){
      var img = document.createElement('img');
      img.loading='lazy'; img.decoding='async';
      img.style.maxWidth='100%'; img.style.height='auto'; img.style.borderRadius='10px';
      img.src = 'acq/'+key+'/poi/'+(p.folder||p.id)+'/'+fn;
      box.appendChild(img);
    });
    var infoUrl = 'acq/'+key+'/poi/'+(p.folder||p.id)+'/info.json';
    fetch(infoUrl).then(function(r){ return r.ok ? r.json() : null; }).then(function(info){
      if(info && (info.text || info.desc)){
        var d = document.createElement('div');
        d.className = 'desc';
        d.innerHTML = info.text || info.desc;
        box.appendChild(d);
      }
    }).catch(function(){});
  }

  function applyAcq(){
    var vis = ensureDefaults(loadVis());
    withMap(function(m){
      // Romano
      if(vis['acq-romano']){
        if(!acq.romano.loaded) { loadRomano(function(){ applyAcq(); }); return; }
        if(acq.romano.line && !m.hasLayer(acq.romano.line)) m.addLayer(acq.romano.line);
        var showPois = m.getZoom() >= ZOOM_MIN_POI;
        if(showPois && acq.romano.pois && !m.hasLayer(acq.romano.pois)) m.addLayer(acq.romano.pois);
        if(!showPois && acq.romano.pois && m.hasLayer(acq.romano.pois)) m.removeLayer(acq.romano.pois);
        // no auto-fit for Romano
      }else{
        if(acq.romano.line && m.hasLayer(acq.romano.line)) m.removeLayer(acq.romano.line);
        if(acq.romano.pois && m.hasLayer(acq.romano.pois)) m.removeLayer(acq.romano.pois);
      }

      // Storico
      if(vis['acq-storico']){
        if(!acq.storico.loaded) { loadStorico(function(){ applyAcq(); }); return; }
        if(acq.storico.line && !m.hasLayer(acq.storico.line)) m.addLayer(acq.storico.line);
        var showSPois = m.getZoom() >= ZOOM_MIN_POI;
        if(showSPois && acq.storico.pois && !m.hasLayer(acq.storico.pois)) m.addLayer(acq.storico.pois);
        if(!showSPois && acq.storico.pois && m.hasLayer(acq.storico.pois)) m.removeLayer(acq.storico.pois);
        // no auto-fit for Storico
      }else{
        if(acq.storico.line && m.hasLayer(acq.storico.line)) m.removeLayer(acq.storico.line);
        if(acq.storico.pois && m.hasLayer(acq.storico.pois)) m.removeLayer(acq.storico.pois);
      }
    });
}

  // Wire checkboxes con tri-state per 'Mostra tutti'
  ready(function(){
    var chkAll = document.getElementById('chk-acq-all');
    var chkR = document.getElementById('chk-acq-romano');
    var chkS = document.getElementById('chk-acq-storico');

    function updateMasterVisual(){
      if(!chkAll) return;
      var r = !!(chkR && chkR.checked);
      var s = !!(chkS && chkS.checked);
      chkAll.indeterminate = ((r || s) && !(r && s));
      chkAll.checked = (r && s);
    }

    function syncFromStorage(){
      var v = ensureDefaults(loadVis());
      if(chkR) chkR.checked = !!v['acq-romano'];
      if(chkS) chkS.checked = !!v['acq-storico'];
      updateMasterVisual();
    }

    function saveSinglesAndApply(){
      var v = ensureDefaults(loadVis());
      if(chkR) v['acq-romano'] = !!chkR.checked;
      if(chkS) v['acq-storico'] = !!chkS.checked;
      saveVis(v);
      updateMasterVisual();
      applyAcq();
    }

    if(chkR) chkR.addEventListener('change', saveSinglesAndApply);
    if(chkS) chkS.addEventListener('change', saveSinglesAndApply);
    if(chkAll) chkAll.addEventListener('change', function(){
      var on = !!this.checked;
      if(chkR) chkR.checked = on;
      if(chkS) chkS.checked = on;
      this.indeterminate = false;
      saveSinglesAndApply();
    });

    syncFromStorage();
    applyAcq();
  });

  // Update on zoom
  withMap(function(m){ m.on('zoomend', applyAcq); });
})();
