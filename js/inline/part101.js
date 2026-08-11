
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
