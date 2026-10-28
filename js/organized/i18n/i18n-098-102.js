
(function(){
  var palazziLayer = null;
  var palazziBuilt = false;
  var mapRef = null;

  function ensureMap(){
    if(mapRef && typeof L !== 'undefined') return true;
    try{
      if(typeof map !== 'undefined') mapRef = map;
    }catch(e){}
    return !!mapRef;
  }

  function currentLang(){
    var raw = (document.documentElement.getAttribute('lang')
              || (typeof localStorage!=='undefined' && localStorage.getItem('lang'))
              || 'it');
    return (raw || 'it').toLowerCase().split('-')[0];
  }

  function normalizeLang(l){
    l = (l||'').toLowerCase();
    if(l.indexOf('lij')===0) return 'lij';
    if(l.indexOf('zh')===0)  return 'zh';
    if(l.indexOf('en')===0)  return 'en';
    if(l.indexOf('es')===0)  return 'es';
    if(l.indexOf('fr')===0)  return 'fr';
    if(l.indexOf('ar')===0)  return 'ar';
    if(l.indexOf('ru')===0)  return 'ru';
    return 'it';
  }

  function popupHTML(p){
    var lang = normalizeLang(currentLang());
    var desc = '';
    if(p.desc){
      if(typeof p.desc === 'string') desc = p.desc;
      else desc = p.desc[lang] || p.desc.it || p.desc.en || '';
    }
    var title = (p.name || '').toString();
    var addr  = (p.addr || p.address || '').toString();
    var rtl   = (lang === 'ar') ? 'direction:rtl;text-align:justify;' : '';

    var addrLabelMap = {
      it:'Indirizzo', en:'Address', es:'Dirección', fr:'Adresse',
      ar:'العنوان', ru:'Адрес', zh:'地址', lij:'Indirisso'
    };
    var addrLabel = addrLabelMap[lang] || addrLabelMap.it;

    var addrHTML = addr
      ? '<div style="margin-top:.35rem;font-size:.86rem;opacity:.9">'
        + '<strong>'+addrLabel+':</strong> '+addr+'</div>'
      : '';

    var descHTML = desc
      ? '<p class="mh-popup-desc" style="'+rtl+'">'+desc+'</p>'
      : '<p class="mh-popup-desc" style="opacity:.7">…</p>';

  var url  = (p.url || '').toString().trim();

  var linkLabelMap = {
    it:'Sito / Info',
    en:'Website / Info',
    es:'Sitio / Info',
    fr:'Site / Infos',
    ar:'موقع / معلومات',
    ru:'Сайт / информация',
    zh:'网站 / 信息',
    lij:'Sito / Informazioni'
  };
  var linkLabel = linkLabelMap[lang] || linkLabelMap.it;

  var linkHTML = url
    ? '<div class="mh-popup-link" style="margin-top:.25rem;font-size:.86rem;">'
      + '<a href="'+url+'" target="_blank" rel="noopener">'
      + linkLabel+
      '</a></div>'
    : '';

  var img  = (p.img || '').toString().trim();

  var imgHTML = img
    ? '<div class="mh-popup-img-wrap" style="margin-top:.35rem;">'
      + '<img class="mh-popup-img" src="'+img+'" alt="'+title+'" '
      + 'loading="lazy" />'
      + '</div>'
    : '';


    return ''+
      '<div class="mh-popup palazzi-popup" style="min-width:240px;max-width:420px">'+
      '  <div class="mh-popup-header">'+
      '    <span class="mh-popup-title">'+title+'</span>'+
      '  </div>'+
      '  <div class="mh-popup-body">'+imgHTML+descHTML+addrHTML+linkHTML+'</div>'+
      '</div>';
  }

  function buildLayer(){
    if(palazziBuilt || !ensureMap() || typeof L === 'undefined') return;
    palazziBuilt = true;
    palazziLayer = L.layerGroup();

    var iconHTML = '<div class="past-map-marker past-marker-palaces"><img src="icons/passato/palazzi.svg" alt=""></div>';

    var palazzoIcon = L.divIcon({
      className: 'palazzi-marker',
      iconSize: [30,30],
      iconAnchor: [15,15],
      popupAnchor: [0,-15],
      html: iconHTML
    });

    function addPoint(p){
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if(!lat || !lng || !isFinite(lat) || !isFinite(lng)) return;

      var m = L.marker([lat, lng], {
        icon: palazzoIcon,
        title: (p.name || '').toString()
      });

      var html0 = popupHTML(p);
      m.bindPopup(html0, { className: 'mh-popup' });

      m.on('popupopen', function(ev){
        try{ ev.popup.setContent(popupHTML(p)); }catch(_){}
      });

      try{
        document.addEventListener('app:set-lang', function(){
          try{
            if(m.isPopupOpen && m.isPopupOpen()){
              m.setPopupContent(popupHTML(p));
            }
          }catch(_){}
        });
      }catch(_){}

      palazziLayer.addLayer(m);
    }

    fetch('palazzi/palazzi_points.json')
      .then(function(r){ return r.json(); })
      .then(function(list){
        if(!Array.isArray(list)) return;
        list.forEach(addPoint);
      })
      .catch(function(err){
        try{ console.warn('Errore dati PALAZZI', err); }catch(_){}
      });
  }

  function toggleLayer(){
    if(!ensureMap()) return;
    buildLayer();
    if(!palazziLayer) return;
    if(mapRef.hasLayer(palazziLayer)) mapRef.removeLayer(palazziLayer);
    else palazziLayer.addTo(mapRef);
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-palazzi');
    if(!btn) return false;

    btn.setAttribute('aria-pressed','false');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
      if(palazziLayer && mapRef){
        btn.setAttribute('aria-pressed', mapRef.hasLayer(palazziLayer).toString());
      }
    });
    return true;
  }

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(typeof L !== 'undefined' && map && typeof map.hasLayer === 'function' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();

;

(function(){
  var cinemaLayer = null;
  var cinemaBuilt = false;
  var mapRef = null;

  function ensureMap(){
    if (cinemaLayer && mapRef && typeof L !== 'undefined') return true;
    try{
      if(typeof map !== 'undefined') mapRef = map;
    }catch(e){}
    return !!mapRef;
  }

  function currentLang(){
    var raw = (document.documentElement.getAttribute('lang')
              || (typeof localStorage!=='undefined' && localStorage.getItem('lang'))
              || 'it');
    return (raw || 'it').toLowerCase().split('-')[0];
  }

  function normalizeLang(l){
    l = (l||'').toLowerCase();
    if(l.indexOf('lij')===0) return 'lij';
    if(l.indexOf('zh')===0)  return 'zh';
    if(l.indexOf('en')===0)  return 'en';
    if(l.indexOf('es')===0)  return 'es';
    if(l.indexOf('fr')===0)  return 'fr';
    if(l.indexOf('ar')===0)  return 'ar';
    if(l.indexOf('ru')===0)  return 'ru';
    return 'it';
  }

  function popupHTML(p){
    var lang = normalizeLang(currentLang());
    var desc = '';
    if(p.desc){
      if(typeof p.desc === 'string') desc = p.desc;
      else desc = p.desc[lang] || p.desc.it || p.desc.en || '';
    }
    var title = (p.name || '').toString();
    var addr  = (p.addr || p.address || '').toString();
    var rtl   = (lang === 'ar') ? 'direction:rtl;text-align:justify;' : '';

    var addrLabelMap = {
      it:'Indirizzo',
      en:'Address',
      es:'Dirección',
      fr:'Adresse',
      ar:'العنوان',
      ru:'Адрес',
      zh:'地址',
      lij:'Indirisso'
    };
    var addrLabel = addr ? (addrLabelMap[lang] || addrLabelMap.it) : '';

    var descHTML = desc ? (
      '<div class="mh-popup-desc" style="margin-bottom:.45rem;'+rtl+'">'+
      desc+
      '</div>'
    ) : '';

    var addrHTML = addr ? (
      '<div class="mh-popup-addr" style="font-size:.85rem;opacity:.9;margin-bottom:.35rem;">'+
      '<strong>'+(addrLabel || 'Indirizzo')+':</strong> '+addr+
      '</div>'
    ) : '';

    var linkHTML = '';
    if(p.url){
      var label = (lang === 'en') ? 'Website'
                : (lang === 'fr') ? 'Site web'
                : (lang === 'es') ? 'Sitio web'
                : (lang === 'ru') ? 'Сайт'
                : (lang === 'ar') ? 'الموقع'
                : (lang === 'zh') ? '网站'
                : 'Sito';
      linkHTML =
        '<div class="mh-popup-link" style="margin-top:.25rem;">'+
        '<a href="'+p.url+'" target="_blank" rel="noopener noreferrer">'+label+'</a>'+
        '</div>';
    }

    var imgHTML = '';
    if(p.img){
      imgHTML =
        '<div class="mh-popup-img" style="margin-bottom:.45rem;">'+
        '<img src="'+p.img+'" alt="'+title+'" style="max-width:100%;border-radius:8px;display:block;"/>'+
        '</div>';
    }

    return ''+
      '<div class="mh-popup cinema-popup" style="min-width:240px;max-width:420px">'+
      '  <div class="mh-popup-header">'+
      '    <span class="mh-popup-title">'+title+'</span>'+
      '  </div>'+
      '  <div class="mh-popup-body">'+imgHTML+descHTML+addrHTML+linkHTML+'</div>'+
      '</div>';
  }

  function buildLayer(){
    if(cinemaBuilt || !ensureMap() || typeof L === 'undefined') return;
    cinemaBuilt = true;
    cinemaLayer = L.layerGroup();

    var iconHTML = '<div class="entertainment-map-marker entertainment-marker-cinema"><img src="icons/intrattenimento/cinema.svg" alt=""></div>';

    var cinemaIcon = L.divIcon({
      className: 'cinema-marker',
      iconSize: [30,30],
      iconAnchor: [15,15],
      popupAnchor: [0,-15],
      html: iconHTML
    });

    function addPoint(p){
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if(!lat || !lng || !isFinite(lat) || !isFinite(lng)) return;

      var m = L.marker([lat, lng], {
        icon: cinemaIcon,
        title: (p.name || '').toString()
      });

      var html0 = popupHTML(p);
      m.bindPopup(html0, { className: 'mh-popup' });

      m.on('popupopen', function(ev){
        try{ ev.popup.setContent(popupHTML(p)); }catch(_){}
      });

      try{
        document.addEventListener('app:set-lang', function(){
          try{
            if(m.isPopupOpen && m.isPopupOpen()){
              m.setPopupContent(popupHTML(p));
            }
          }catch(_){}
        });
      }catch(_){}

      cinemaLayer.addLayer(m);
    }

    fetch('cinema/cinema_points.json')
      .then(function(r){ return r.json(); })
      .then(function(list){
        if(!Array.isArray(list)) return;
        list.forEach(addPoint);
      })
      .catch(function(err){
        try{ console.warn('Errore dati CINEMA', err); }catch(_){}
      });
  }

  function toggleLayer(){
    if(!ensureMap()) return;
    buildLayer();
    if(!cinemaLayer) return;
    if(mapRef.hasLayer(cinemaLayer)) mapRef.removeLayer(cinemaLayer);
    else cinemaLayer.addTo(mapRef);
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-cinema');
    if(!btn) return false;

    btn.setAttribute('aria-pressed','false');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
      if(cinemaLayer && mapRef){
        btn.setAttribute(
          'aria-pressed',
          mapRef.hasLayer(cinemaLayer).toString()
        );
      }
    });
    return true;
  }

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(typeof L !== 'undefined' && map && typeof map.hasLayer === 'function' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();

;

(function(){
  var sportLayer = null;
  var sportBuilt = false;
  var mapRef = null;

  function ensureMap(){
    if (sportLayer && mapRef && typeof L !== 'undefined') return true;
    try{
      if(typeof map !== 'undefined') mapRef = map;
    }catch(e){}
    return !!mapRef;
  }

  function currentLang(){
    var raw = (document.documentElement.getAttribute('lang')
              || (typeof localStorage!=='undefined' && localStorage.getItem('lang'))
              || 'it');
    return (raw || 'it').toLowerCase().split('-')[0];
  }

  function normalizeLang(l){
    l = (l||'').toLowerCase();
    if(l.indexOf('lij')===0) return 'lij';
    if(l.indexOf('zh')===0)  return 'zh';
    if(l.indexOf('en')===0)  return 'en';
    if(l.indexOf('es')===0)  return 'es';
    if(l.indexOf('fr')===0)  return 'fr';
    if(l.indexOf('ar')===0)  return 'ar';
    if(l.indexOf('ru')===0)  return 'ru';
    return 'it';
  }

  function popupHTML(p){
    var lang = normalizeLang(currentLang());
    var desc = '';
    if(p.desc){
      if(typeof p.desc === 'string') desc = p.desc;
      else desc = p.desc[lang] || p.desc.it || p.desc.en || '';
    }
    var title = (p.name || '').toString();
    var addr  = (p.addr || p.address || '').toString();
    var rtl   = (lang === 'ar') ? 'direction:rtl;text-align:justify;' : '';

    var addrLabelMap = {
      it:'Indirizzo', en:'Address', es:'Dirección', fr:'Adresse',
      ar:'العنوان', ru:'Адрес', zh:'地址', lij:'Indirisso'
    };
    var addrLabel = addrLabelMap[lang] || addrLabelMap.it;

    var addrHTML = addr
      ? '<div style="margin-top:.35rem;font-size:.86rem;opacity:.9">'
        + '<strong>'+addrLabel+':</strong> '+addr+'</div>'
      : '';

    var descHTML = desc
      ? '<p class="mh-popup-desc" style="'+rtl+'">'+desc+'</p>'
      : '<p class="mh-popup-desc" style="opacity:.7">…</p>';

  var url  = (p.url || '').toString().trim();

  var linkLabelMap = {
    it:'Sito / Info',
    en:'Website / Info',
    es:'Sitio / Info',
    fr:'Site / Infos',
    ar:'موقع / معلومات',
    ru:'Сайт / информация',
    zh:'网站 / 信息',
    lij:'Sito / Informazioni'
  };
  var linkLabel = linkLabelMap[lang] || linkLabelMap.it;

  var linkHTML = url
    ? '<div class="mh-popup-link" style="margin-top:.25rem;font-size:.86rem;">'
      + '<a href="'+url+'" target="_blank" rel="noopener">'
      + linkLabel+
      '</a></div>'
    : '';

  var img  = (p.img || '').toString().trim();

  var imgHTML = img
    ? '<div class="mh-popup-img-wrap" style="margin-top:.35rem;">'
      + '<img class="mh-popup-img" src="'+img+'" alt="'+title+'" '
      + 'loading="lazy" />'
      + '</div>'
    : '';


    return ''+
      '<div class="mh-popup sport-popup" style="min-width:240px;max-width:420px">'+
      '  <div class="mh-popup-header">'+
      '    <span class="mh-popup-title">'+title+'</span>'+
      '  </div>'+
      '  <div class="mh-popup-body">'+imgHTML+descHTML+addrHTML+linkHTML+'</div>'+
      '</div>';
  }

  function buildLayer(){
    if(sportBuilt || !ensureMap() || typeof L === 'undefined') return;
    sportBuilt = true;
    sportLayer = L.layerGroup();

    var iconHTML = '<div class="entertainment-map-marker entertainment-marker-sport"><img src="icons/intrattenimento/sport.svg" alt=""></div>';

    var sportIcon = L.divIcon({
      className: 'sport-marker',
      iconSize: [30,30],
      iconAnchor: [15,15],
      popupAnchor: [0,-15],
      html: iconHTML
    });

    function addPoint(p){
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if(!lat || !lng || !isFinite(lat) || !isFinite(lng)) return;

      var m = L.marker([lat, lng], {
        icon: sportIcon,
        title: (p.name || '').toString()
      });

      var html0 = popupHTML(p);
      m.bindPopup(html0, { className: 'mh-popup' });

      m.on('popupopen', function(ev){
        try{ ev.popup.setContent(popupHTML(p)); }catch(_){}
      });

      try{
        document.addEventListener('app:set-lang', function(){
          try{
            if(m.isPopupOpen && m.isPopupOpen()){
              m.setPopupContent(popupHTML(p));
            }
          }catch(_){}
        });
      }catch(_){}

      sportLayer.addLayer(m);
    }

    fetch('sport/sport_points.json')
      .then(function(r){ return r.json(); })
      .then(function(list){
        if(!Array.isArray(list)) return;
        list.forEach(addPoint);
      })
      .catch(function(err){
        try{ console.warn('Errore dati SPORT', err); }catch(_){}
      });
  }

  function toggleLayer(){
    if(!ensureMap()) return;
    buildLayer();
    if(!sportLayer) return;
    if(mapRef.hasLayer(sportLayer)) mapRef.removeLayer(sportLayer);
    else sportLayer.addTo(mapRef);
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-sport');
    if(!btn) return false;

    btn.setAttribute('aria-pressed','false');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
      if(sportLayer && mapRef){
        btn.setAttribute('aria-pressed', mapRef.hasLayer(sportLayer).toString());
      }
    });
    return true;
  }

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(typeof L !== 'undefined' && map && typeof map.hasLayer === 'function' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();

;

(function(){
  var teatriLayer = null;
  var teatriBuilt = false;
  var mapRef = null;

  function ensureMap(){
    if(mapRef && typeof mapRef.setView === 'function') return true;
    try{
      var m = window.__map || window.map || window.MAP;
      if(m && typeof m.setView === 'function'){
        mapRef = m;
        return true;
      }
    }catch(_){}
    return false;
  }

  function currentLang(){
  var raw = (
    document.documentElement.getAttribute('lang') ||
    (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) ||
    'it'
  );
  return (raw || 'it').toLowerCase().split('-')[0];
}


  function normalizeLang(lang){
    if(!lang) return 'it';
    lang = String(lang).toLowerCase();
    if(lang.startsWith('it')) return 'it';
    if(lang.startsWith('en')) return 'en';
    if(lang.startsWith('es')) return 'es';
    if(lang.startsWith('fr')) return 'fr';
    if(lang.startsWith('ar')) return 'ar';
    if(lang.startsWith('ru')) return 'ru';
    if(lang.startsWith('zh')) return 'zh';
    if(lang.startsWith('lij')) return 'lij';
    return 'it';
  }

    function popupHTML(p){
    var lang = normalizeLang(currentLang());

    function pick(field, fallback){
      if(!field) return fallback || '';
      if(typeof field === 'string') return field;
      if(typeof field === 'object'){
        return field[lang] || field.it || field.en || fallback || '';
      }
      return fallback || '';
    }

    // accettiamo sia title/descr/site, sia name/desc/url per stare vicini a Cinema
    var title = pick(p.title || p.name, 'Teatro senza nome');
    var descr = pick(p.descr || p.desc, '');
    var addr  = pick(p.addr  || p.address, '');
    var site  = pick(p.site  || p.url, '');

    var img   = null;
    if(p.img){
      if(typeof p.img === 'string'){
        img = p.img;
      }else if(typeof p.img === 'object'){
        img = p.img[lang] || p.img.it || p.img.en || null;
      }
    }

    var addrLabelMap = {
      it:'Indirizzo',
      en:'Address',
      es:'Dirección',
      fr:'Adresse',
      ar:'العنوان',
      ru:'Адрес',
      zh:'地址',
      lij:'Indirisso'
    };

    var siteLabelMap = {
      it:'Sito ufficiale',
      en:'Official website',
      es:'Sitio oficial',
      fr:'Site officiel',
      ar:'الموقع الرسمي',
      ru:'Официальный сайт',
      zh:'官方网站',
      lij:'Sito uffiçiale'
    };

    var addrLabel = addr ? (addrLabelMap[lang] || addrLabelMap.it) : '';
    var siteLabel = site ? (siteLabelMap[lang] || siteLabelMap.it) : '';

    var rtl = (lang === 'ar') ? 'direction:rtl;text-align:justify;' : '';

    function safeText(v){
      if(v == null) return '';
      return String(v);
    }

    var html = '' +
      '<div class="mh-popup teatri-popup" style="max-width:260px">' +
        '<div class="mh-popup-header">' +
          '<span class="mh-popup-title">'+ safeText(title) +'</span>' +
        '</div>' +
        '<div class="mh-popup-body" style="'+ rtl +'">';

    if(img){
      html += '<div class="mh-popup-media" style="margin:0 0 .4rem 0">' +
                '<img src="'+ safeText(img) +'" alt="'+ safeText(title) +'" style="max-width:100%;border-radius:6px;display:block"/>' +
              '</div>';
    }

    if(descr){
      html += '<div class="mh-popup-desc">'+ safeText(descr) +'</div>';
    }

    if(addr){
      html += '<div class="mh-popup-addr" style="font-size:.82rem;opacity:.9;margin-top:.15rem">' +
                '<strong>'+ safeText(addrLabel) +':</strong> '+ safeText(addr) +
              '</div>';
    }

    if(site){
      html += '<div class="mh-popup-site" style="font-size:.82rem;margin-top:.25rem">' +
                '<a href="'+ safeText(site) +'" target="_blank" rel="noopener noreferrer">'+ safeText(siteLabel) +'</a>' +
              '</div>';
    }

    html +=   '</div>' +
      '</div>';

    return html;
  }


  function buildLayer(){
    if(teatriBuilt || !ensureMap() || typeof L === 'undefined') return;
    teatriBuilt = true;

    teatriLayer = L.layerGroup();

    var iconHTML = '<div class="entertainment-map-marker entertainment-marker-theater"><img src="icons/intrattenimento/teatri.svg" alt=""></div>';

    var teatriIcon = L.divIcon({
      className: 'teatri-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
      html: iconHTML
    });

    function addPoint(p){
  if (!p || typeof p.lat !== 'number' || typeof p.lng !== 'number') return;

  var marker = L.marker([p.lat, p.lng], { icon: teatriIcon });

  // primo render del popup
  var html0 = popupHTML(p);
  marker.bindPopup(html0, { className: 'mh-popup' });

  // quando apro il popup, rigenero HTML con la lingua corrente
  marker.on('popupopen', function(ev){
    try {
      ev.popup.setContent(popupHTML(p));
    } catch (_) {}
  });

  // quando cambia la lingua (evento globale), se il popup è aperto lo aggiorno
  try {
    document.addEventListener('app:set-lang', function(){
      try {
        if (marker.isPopupOpen && marker.isPopupOpen()) {
          marker.setPopupContent(popupHTML(p));
        }
      } catch (_) {}
    });
  } catch (_) {}

  teatriLayer.addLayer(marker);
}


    fetch('teatri/teatri_points.json')
      .then(function(r){ return r.json(); })
      .then(function(data){
        if(Array.isArray(data)){
          data.forEach(addPoint);
        }else if(Array.isArray(data.points)){
          data.points.forEach(addPoint);
        }else{
          console.warn('Formato JSON TEATRI non riconosciuto', data);
        }
      })
      .catch(function(err){
        console.error('Errore nel caricamento teatri_points.json', err);
      });
  }

  function toggleLayer(){
    if(!ensureMap()) return;
    buildLayer();
    if(!teatriLayer) return;

    var btn = document.querySelector('#quick-toggles .qt-teatri');

    if(mapRef.hasLayer(teatriLayer)){
      mapRef.removeLayer(teatriLayer);
      if(btn) btn.setAttribute('aria-pressed', 'false');
    }else{
      teatriLayer.addTo(mapRef);
      if(btn) btn.setAttribute('aria-pressed', 'true');
    }
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-teatri');
    if(!btn) return false;

    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
    });

    if(teatriLayer && mapRef){
      btn.setAttribute('aria-pressed', mapRef.hasLayer(teatriLayer).toString());
    }

    return true;
  }

  var tries = 0;
  var maxTries = 80;
  var iv = setInterval(function(){
    if(attach() || (++tries > maxTries)){
      clearInterval(iv);
    }
  }, 150);
})();

;

(function(){
  var mostreLayer = null;
  var mostreBuilt = false;
  var mapRef = null;

  function ensureMap(){
    if(mapRef && typeof mapRef.setView === 'function') return true;
    try{
      var m = window.__map || window.map || window.MAP;
      if(m && typeof m.setView === 'function'){
        mapRef = m;
        return true;
      }
    }catch(_){}
    return false;
  }

  function currentLang(){
    var raw = (
      document.documentElement.getAttribute('lang') ||
      (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) ||
      'it'
    );
    return (raw || 'it').toLowerCase().split('-')[0];
  }

  function normalizeLang(lang){
    if(!lang) return 'it';
    lang = String(lang).toLowerCase();
    if(lang.startsWith('it')) return 'it';
    if(lang.startsWith('en')) return 'en';
    if(lang.startsWith('es')) return 'es';
    if(lang.startsWith('fr')) return 'fr';
    if(lang.startsWith('ar')) return 'ar';
    if(lang.startsWith('ru')) return 'ru';
    if(lang.startsWith('zh')) return 'zh';
    if(lang.startsWith('lij')) return 'lij';
    return 'it';
  }

  function popupHTML(p){
    var lang = normalizeLang(currentLang());

    function pick(field, fallback){
      if(!field) return fallback || '';
      if(typeof field === 'string') return field;
      if(typeof field === 'object'){
        return field[lang] || field.it || field.en || fallback || '';
      }
      return fallback || '';
    }

    // accettiamo sia title/descr/site, sia name/desc/url
    var title = pick(p.title || p.name, 'Mostra senza nome');
    var descr = pick(p.descr || p.desc, '');
    var addr  = pick(p.addr  || p.address, '');
    var site  = pick(p.site  || p.url, '');

    var img   = null;
    if(p.img){
      if(typeof p.img === 'string'){
        img = p.img;
      }else if(typeof p.img === 'object'){
        img = p.img[lang] || p.img.it || p.img.en || null;
      }
    }

    var addrLabelMap = {
      it:'Indirizzo',
      en:'Address',
      es:'Dirección',
      fr:'Adresse',
      ar:'العنوان',
      ru:'Адрес',
      zh:'地址',
      lij:'Indirisso'
    };

    var siteLabelMap = {
      it:'Sito ufficiale',
      en:'Official website',
      es:'Sitio oficial',
      fr:'Site officiel',
      ar:'الموقع الرسمي',
      ru:'Официальный сайт',
      zh:'官方网站',
      lij:'Sito uffiçiale'
    };

    var addrLabel = addr ? (addrLabelMap[lang] || addrLabelMap.it) : '';
    var siteLabel = site ? (siteLabelMap[lang] || siteLabelMap.it) : '';

    var rtl = (lang === 'ar') ? 'direction:rtl;text-align:justify;' : '';

    function safeText(v){
      if(v == null) return '';
      return String(v);
    }

    var html = '' +
      '<div class="mh-popup mostre-popup" style="max-width:260px">' +
        '<div class="mh-popup-header">' +
          '<span class="mh-popup-title">'+ safeText(title) +'</span>' +
        '</div>' +
        '<div class="mh-popup-body" style="'+ rtl +'">';

    if(img){
      html += '<div class="mh-popup-media" style="margin:0 0 .4rem 0">' +
                '<img src="'+ safeText(img) +'" alt="'+ safeText(title) +'" style="max-width:100%;border-radius:6px;display:block"/>' +
              '</div>';
    }

    if(descr){
      html += '<div class="mh-popup-desc">'+ safeText(descr) +'</div>';
    }

    if(addr){
      html += '<div class="mh-popup-addr" style="font-size:.82rem;opacity:.9;margin-top:.15rem">' +
                '<strong>'+ safeText(addrLabel) +':</strong> '+ safeText(addr) +
              '</div>';
    }

    if(site){
      html += '<div class="mh-popup-site" style="font-size:.82rem;margin-top:.25rem">' +
                '<a href="'+ safeText(site) +'" target="_blank" rel="noopener noreferrer">'+ safeText(siteLabel) +'</a>' +
              '</div>';
    }

    html +=   '</div>' +
      '</div>';

    return html;
  }

  function buildLayer(){
    if(mostreBuilt || !ensureMap() || typeof L === 'undefined') return;
    mostreBuilt = true;

    mostreLayer = L.layerGroup();

    var iconHTML = '<div class="entertainment-map-marker entertainment-marker-exhibitions"><img src="icons/intrattenimento/mostre.svg" alt=""></div>';

    var mostreIcon = L.divIcon({
      className: 'mostre-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
      html: iconHTML
    });

    function addPoint(p){
  if (!p || typeof p.lat !== 'number' || typeof p.lng !== 'number') return;

  var marker = L.marker([p.lat, p.lng], { icon: mostreIcon });

  // primo render del popup
  var html0 = popupHTML(p);
  marker.bindPopup(html0, { className: 'mh-popup mostre-popup' });

  // quando apro il popup, rigenero HTML con la lingua corrente
  marker.on('popupopen', function(ev){
    try {
      ev.popup.setContent(popupHTML(p));
    } catch (_) {}
  });

  // quando cambia la lingua (evento globale), se il popup è aperto lo aggiorno
  try {
    document.addEventListener('app:set-lang', function(){
      try {
        if (marker.isPopupOpen && marker.isPopupOpen()) {
          marker.setPopupContent(popupHTML(p));
        }
      } catch (_) {}
    });
  } catch (_) {}

  mostreLayer.addLayer(marker);
}


    fetch('mostre/mostre_points.json')
      .then(function(r){ return r.json(); })
      .then(function(data){
        if(Array.isArray(data)){
          data.forEach(addPoint);
        }else if(Array.isArray(data.points)){
          data.points.forEach(addPoint);
        }else{
          try{ console.warn('Formato JSON MOSTRE non riconosciuto', data); }catch(_){}
        }
      })
      .catch(function(err){
        try{ console.error('Errore nel caricamento mostre_points.json', err); }catch(_){}
      });
  }

  function toggleLayer(){
    if(!ensureMap()) return;
    buildLayer();
    if(!mostreLayer) return;

    var btn = document.querySelector('#quick-toggles .qt-mostre');

    if(mapRef.hasLayer(mostreLayer)){
      mapRef.removeLayer(mostreLayer);
      if(btn) btn.setAttribute('aria-pressed', 'false');
    }else{
      mostreLayer.addTo(mapRef);
      if(btn) btn.setAttribute('aria-pressed', 'true');
    }
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-mostre');
    if(!btn) return false;

    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
    });
    return true;
  }

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(typeof L !== 'undefined' && map && typeof map.hasLayer === 'function' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();

