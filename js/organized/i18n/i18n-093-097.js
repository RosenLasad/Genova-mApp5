(function(){
  var mapRef = null;
  var layers = Object.create(null);
  var built = Object.create(null);

  var FOOD = {
    'locale':     { selector:'.qt-locali',     markerClass:'locali-marker-locale',     markerIcon:'icons/mangiare-dormire/marker-01-locali.svg' },
    'ristorante': { selector:'.qt-ristoranti', markerClass:'locali-marker-ristorante', markerIcon:'icons/mangiare-dormire/marker-02-ristoranti.svg' },
    'take-away':  { selector:'.qt-take-away',  markerClass:'locali-marker-take-away',  markerIcon:'icons/mangiare-dormire/marker-03-take-away.svg' },
    'alloggio':   { selector:'.qt-alloggi',    markerClass:'locali-marker-alloggio',   markerIcon:'icons/mangiare-dormire/marker-04-alloggi.svg' }
  };

  var UI_LABELS = {
    it:{main:'Mangiare e dormire',locale:'Locali',ristorante:'Ristoranti','take-away':'Take-away',alloggio:'Alberghi e B&B'},
    en:{main:'Food and accommodation',locale:'Venues',ristorante:'Restaurants','take-away':'Take-away',alloggio:'Hotels and B&Bs'},
    es:{main:'Comer y dormir',locale:'Locales',ristorante:'Restaurantes','take-away':'Comida para llevar',alloggio:'Hoteles y B&B'},
    fr:{main:'Manger et dormir',locale:'Établissements',ristorante:'Restaurants','take-away':'À emporter',alloggio:'Hôtels et chambres d’hôtes'},
    ar:{main:'الطعام والإقامة',locale:'أماكن السهر',ristorante:'مطاعم','take-away':'طعام سفري',alloggio:'فنادق وبيوت ضيافة'},
    ru:{main:'Еда и проживание',locale:'Заведения',ristorante:'Рестораны','take-away':'Еда навынос',alloggio:'Отели и B&B'},
    zh:{main:'餐饮与住宿',locale:'休闲场所',ristorante:'餐厅','take-away':'外带餐饮',alloggio:'酒店与民宿'},
    lij:{main:'Mangia e dormî',locale:'Locali',ristorante:'Ristoranti','take-away':'Mangia da portâ via',alloggio:'Hotel e B&B'}
  };

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
    if(lang.indexOf('lij') === 0) return 'lij';
    if(lang.indexOf('it')  === 0) return 'it';
    if(lang.indexOf('en')  === 0) return 'en';
    if(lang.indexOf('es')  === 0) return 'es';
    if(lang.indexOf('fr')  === 0) return 'fr';
    if(lang.indexOf('ar')  === 0) return 'ar';
    if(lang.indexOf('ru')  === 0) return 'ru';
    if(lang.indexOf('zh')  === 0 || lang.indexOf('cn') === 0) return 'zh';
    return 'it';
  }

  function pick(field, fallback){
    if(!field) return fallback || '';
    if(typeof field === 'string') return field;
    if(typeof field === 'object'){
      var lang = normalizeLang(currentLang());
      return field[lang] || field.it || field.en || fallback || '';
    }
    return fallback || '';
  }

  function esc(str){
    return String(str == null ? '' : str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function popupHTML(p){
    var lang = normalizeLang(currentLang());
    var title = pick(p.name, 'Locale senza nome');
    var descr = pick(p.desc, '');
    var addr  = pick(p.addr || p.address, '');
    var site  = pick(p.site || p.url, '');
    var img = typeof p.img === 'string' ? p.img
      : (p.img && (p.img[lang] || p.img.it || p.img.en)) || null;
    var addrLabels = {it:'Indirizzo',en:'Address',es:'Dirección',fr:'Adresse',ar:'العنوان',ru:'Адрес',zh:'地址',lij:'Indirisso'};
    var siteLabels = {it:'Sito / social',en:'Website / social',es:'Web / redes',fr:'Site / réseaux',ar:'موقع / سوشيال',ru:'Сайт / соцсети',zh:'网站 / 社交',lij:'Sito / social'};
    var h = '<div class="mh-popup locali-popup" dir="'+(lang === 'ar' ? 'rtl' : 'ltr')+'">';
    h += '<div class="mh-popup-header"><span class="mh-popup-title">'+esc(title)+'</span></div>';
    h += '<div class="mh-popup-body">';
    if(img) h += '<div class="mh-popup-img"><img src="'+esc(img)+'" alt="'+esc(title)+'"></div>';
    if(descr) h += '<p class="mh-popup-desc">'+esc(descr)+'</p>';
    if(addr){
      h += '<span class="mh-popup-addr-label">'+esc(addrLabels[lang] || addrLabels.it)+'</span>';
      h += '<p class="mh-popup-addr">'+esc(addr)+'</p>';
    }
    if(site){
      h += '<div class="mh-popup-link"><a href="'+esc(site)+'" target="_blank" rel="noopener">';
      h += esc(siteLabels[lang] || siteLabels.it)+'</a></div>';
    }
    return h+'</div></div>';
  }

  function pointKind(point){
    var kind = String(point && point.kind || 'locale').toLowerCase();
    return FOOD[kind] ? kind : 'locale';
  }

  function buildLayer(kind){
    if(built[kind] && layers[kind]) return layers[kind];
    if(!ensureMap() || !Array.isArray(window.LOCALI_POINTS) || !FOOD[kind]) return null;
    var markers = [];
    window.LOCALI_POINTS.forEach(function(p){
      if(!p || pointKind(p) !== kind || typeof p.lat !== 'number' || typeof p.lng !== 'number') return;
      var icon = L.divIcon({
        className:'locali-marker '+FOOD[kind].markerClass,
        html:'<img class="food-marker-icon" src="'+FOOD[kind].markerIcon+'" alt="">',
        iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-13]
      });
      var marker = L.marker([p.lat,p.lng], {icon:icon, keyboard:false});
      marker._genovaLocaliData = p;
      marker._genovaFoodKind = kind;
      marker.bindPopup(popupHTML(p), {maxWidth:260, className:'locali-popup'});
      marker.on('popupopen', function(ev){
        if(marker._genovaLocaliData) ev.popup.setContent(popupHTML(marker._genovaLocaliData));
      });
      markers.push(marker);
    });
    layers[kind] = L.layerGroup(markers);
    built[kind] = true;
    return layers[kind];
  }

  function syncButton(kind){
    var cfg = FOOD[kind];
    var btn = cfg && document.querySelector('#quick-toggles '+cfg.selector);
    if(btn) btn.setAttribute('aria-pressed', !!(mapRef && layers[kind] && mapRef.hasLayer(layers[kind])) ? 'true' : 'false');
  }

  function applyUiLabels(){
    var lang = normalizeLang(currentLang());
    var labels = UI_LABELS[lang] || UI_LABELS.it;
    var main = document.getElementById('qt-cat-food-btn');
    if(main){
      main.setAttribute('aria-label',labels.main);
      main.setAttribute('title',labels.main);
      var hidden = main.querySelector('.sr-only');
      if(hidden) hidden.textContent = labels.main;
    }
    Object.keys(FOOD).forEach(function(kind){
      var button = document.querySelector('#quick-toggles '+FOOD[kind].selector);
      if(!button) return;
      button.setAttribute('aria-label',labels[kind]);
      button.setAttribute('title',labels[kind]);
      var label = button.querySelector('.qt-food-label');
      if(label) label.textContent = labels[kind];
    });
    var panel = document.getElementById('qt-cat-food');
    if(panel) panel.setAttribute('aria-label',labels.main);
  }

  function setVisible(kind, visible){
    if(!FOOD[kind] || !ensureMap()) return false;
    var layer = buildLayer(kind);
    if(!layer) return false;
    if(visible && !mapRef.hasLayer(layer)) layer.addTo(mapRef);
    if(!visible && mapRef.hasLayer(layer)) mapRef.removeLayer(layer);
    syncButton(kind);
    return mapRef.hasLayer(layer);
  }

  function toggle(kind){
    var layer = buildLayer(kind);
    if(!layer || !ensureMap()) return false;
    return setVisible(kind, !mapRef.hasLayer(layer));
  }

  function attach(){
    var keys = Object.keys(FOOD);
    var buttons = [];
    for(var i=0;i<keys.length;i++){
      var btn = document.querySelector('#quick-toggles '+FOOD[keys[i]].selector);
      if(!btn) return false;
      buttons.push(btn);
    }
    keys.forEach(function(kind, index){
      var btn = buttons[index];
      if(btn.__genovaFoodBound) return;
      btn.__genovaFoodBound = true;
      btn.setAttribute('aria-pressed','false');
      btn.addEventListener('click', function(ev){
        ev.preventDefault(); ev.stopPropagation(); toggle(kind); syncButton(kind);
      });
    });
    return true;
  }

  window.GenovaFoodLayers = {
    show:function(kind){ return setVisible(pointKind({kind:kind}), true); },
    hide:function(kind){ return setVisible(pointKind({kind:kind}), false); },
    toggle:toggle,
    isVisible:function(kind){
      kind = pointKind({kind:kind});
      return !!(ensureMap() && layers[kind] && mapRef.hasLayer(layers[kind]));
    }
  };

  document.addEventListener('app:set-lang', function(){
    applyUiLabels();
    if(!ensureMap()) return;
    var pop = mapRef && mapRef._popup;
    if(!pop || !pop._source || !pop._source._genovaLocaliData) return;
    pop.setContent(popupHTML(pop._source._genovaLocaliData));
  });

  window.addEventListener('i18n:changed', applyUiLabels);

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(typeof L !== 'undefined' && (window.__map || window.map || window.MAP) && attach()){
      applyUiLabels();
      clearInterval(iv);
    }
    else if(++tries >= max) clearInterval(iv);
  },150);
})();

;

(function(){
  var chieseLayer = null;
  var chieseBuilt = false;
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
    var rtl   = (lang === 'ar') ? 'direction:rtl;text-align:right;' : '';

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
    + '<img class="mh-popup-img" src="'+img+'" alt="'+title+'" loading="lazy" />'
    + '</div>'
  : '';



    return ''+
      '<div class="mh-popup chiese-popup" style="min-width:240px;max-width:420px">'+
      '  <div class="mh-popup-header" style="margin-bottom:.25rem">'+
      '    <span class="mh-popup-title">'+title+'</span>'+
      '  </div>'+
      '  <div class="mh-popup-body">'+imgHTML+descHTML+addrHTML+linkHTML+'</div>'+
      '</div>';
  }

  function buildLayer(){
    if(chieseBuilt || !ensureMap() || typeof L === 'undefined') return;
    chieseBuilt = true;
    chieseLayer = L.layerGroup();

    var iconHTML = '<div class="past-map-marker past-marker-churches"><img src="icons/passato/chiese.svg" alt=""></div>';

// Icona Leaflet (usa lo stesso SVG del bottone)
var churchIcon = L.divIcon({
  className: 'chiese-marker',
  iconSize: [30,30],
  iconAnchor: [15,15],
  popupAnchor: [0,-15],
  html: iconHTML
});



    function addPoint(p){
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if(!lat || !lng || !isFinite(lat) || !isFinite(lng)) return;

      var m = L.marker([lat, lng], {
        icon: churchIcon,
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

      chieseLayer.addLayer(m);
    }

    // Carichiamo i dati da /chiese/chiese_points.json
    fetch('chiese/chiese_points.json')
      .then(function(r){ return r.json(); })
      .then(function(list){
        if(!Array.isArray(list)) return;
        list.forEach(addPoint);
      })
      .catch(function(err){
        try{ console.warn('Errore dati CHIESE', err); }catch(_){}
      });
  }

  function toggleLayer(){
    if(!ensureMap()) return;
    buildLayer();
    if(!chieseLayer) return;
    if(mapRef.hasLayer(chieseLayer)) mapRef.removeLayer(chieseLayer);
    else chieseLayer.addTo(mapRef);
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-chiese');
    if(!btn) return false;

    btn.setAttribute('aria-pressed','false');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
      if(chieseLayer && mapRef){
        btn.setAttribute('aria-pressed', mapRef.hasLayer(chieseLayer).toString());
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
  function rawLang(){
    try{
      return (document.documentElement.getAttribute('lang')
              || (typeof localStorage !== 'undefined' && localStorage.getItem('lang'))
              || 'it');
    }catch(_){
      return 'it';
    }
  }

  function normalizeLang(lang){
    if(!lang) return 'it';
    lang = String(lang).toLowerCase();
    if(lang.indexOf('lij') === 0) return 'lij';
    if(lang.indexOf('zh')  === 0) return 'zh';
    if(lang.indexOf('en')  === 0) return 'en';
    if(lang.indexOf('es')  === 0) return 'es';
    if(lang.indexOf('fr')  === 0) return 'fr';
    if(lang.indexOf('ar')  === 0) return 'ar';
    if(lang.indexOf('ru')  === 0) return 'ru';
    if(lang.indexOf('it')  === 0) return 'it';
    return 'it';
  }

  var TITLE_LABEL = {
    it:  'Stazione treno',
    en:  'Train station',
    es:  'Estación de tren',
    fr:  'Gare ferroviaire',
    ar:  'محطة قطار',
    ru:  'Железнодорожная станция',
    zh:  '火车站',
    lij: 'Stasciòn de treno'
  };

  var LINK_LABEL = {
    it:  'Vai al sito Trenitalia',
    en:  'Open Trenitalia website',
    es:  'Abrir sitio de Trenitalia',
    fr:  'Ouvrir le site de Trenitalia',
    ar:  'زيارة موقع ترينيتاليا',
    ru:  'Открыть сайт Trenitalia',
    zh:  '访问 Trenitalia 网站',
    lij: 'Vànni in scito Trenitalia'
  };

  function esc(str){
    return String(str == null ? '' : str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function popupHTMLTrain(name){
    var lang = normalizeLang(rawLang());
    var title = TITLE_LABEL[lang] || TITLE_LABEL.it;
    var linkLabel = LINK_LABEL[lang] || LINK_LABEL.it;
    var rtl = (lang === 'ar');
    var dirAttr = rtl ? 'rtl' : 'ltr';
    var bodyStyle = rtl ? 'direction:rtl;text-align:justify;' : '';

    var html = ''
      + '<div class="mh-popup train-popup" dir="' + dirAttr + '">'
      +   '<div class="mh-popup-header">'
      +     '<span class="mh-popup-title">' + esc(title) + '</span>'
      +   '</div>'
      +   '<div class="mh-popup-body" style="' + bodyStyle + '">';
    if(name){
      html += '<p class="mh-popup-desc">' + esc(name) + '</p>';
    }
    html +=   '<div class="mh-popup-link">'
      +         '<a href="https://www.trenitalia.com/" target="_blank" rel="noopener">'
      +           esc(linkLabel)
      +         '</a>'
      +       '</div>'
      +   '</div>'
      + '</div>';
    return html;
  }

  function isTrainMarker(layer){
    try{
      if(!window.L || !L.Marker) return false;
      if(!(layer instanceof L.Marker)) return false;
      var icon = layer.options && layer.options.icon;
      var cls  = icon && icon.options && icon.options.className;
      return cls === 'train-ico';
    }catch(_){
      return false;
    }
  }

  function decorateTrainMarker(m){
    if(!m || typeof m.getPopup !== 'function') return;
    if(!m._stationName){
      var popup = m.getPopup && m.getPopup();
      var raw   = popup && typeof popup.getContent === 'function'
                ? popup.getContent()
                : '';
      // Se il contenuto è già HTML, evitiamo di ri-parsarlo
      if(typeof raw === 'string'){
        if(raw.indexOf('<') === -1){
          m._stationName = raw;
        }else{
          // fallback: nessun nome sicuro, ma non è grave
          m._stationName = '';
        }
      }
    }
    var html = popupHTMLTrain(m._stationName || '');
    m.bindPopup(html, { className: 'mh-popup train-popup' });
  }

  function updateTrainPopups(){
    try{
      if(!window.map || typeof map.eachLayer !== 'function') return;
      map.eachLayer(function(layer){
        if(isTrainMarker(layer)){
          decorateTrainMarker(layer);
        }
      });
    }catch(_){}
  }

  function refreshOpenTrainPopup(){
    try{
      if(!window.map || typeof map.eachLayer !== 'function') return;
      map.eachLayer(function(layer){
        if(!isTrainMarker(layer)) return;
        if(layer.isPopupOpen && layer.isPopupOpen()){
          var name = layer._stationName || '';
          var popup = layer.getPopup && layer.getPopup();
          if(popup && typeof popup.setContent === 'function'){
            popup.setContent(popupHTMLTrain(name));
          }
        }
      });
    }catch(_){}
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-train');
    if(!btn || !window.map) return false;

    // Dopo ogni toggle del layer Treni, rigenero i popup
    btn.addEventListener('click', function(){
      // Lascio che lo script originale crei/mostri i marker, poi sistemo i popup
      setTimeout(updateTrainPopups, 0);
    }, true);

    // Primo tentativo di decorare (se il layer fosse già attivo)
    setTimeout(updateTrainPopups, 300);

    return true;
  }

  // Al cambio lingua (evento globale già usato altrove) aggiorno il popup aperto
  try{
    document.addEventListener('app:set-lang', function(){
      refreshOpenTrainPopup();
    });
  }catch(_){}




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
  function rawLang(){
    try{
      return (document.documentElement.getAttribute('lang')
              || (typeof localStorage !== 'undefined' && localStorage.getItem('lang'))
              || 'it');
    }catch(_){
      return 'it';
    }
  }

  function normalizeLang(lang){
    if(!lang) return 'it';
    lang = String(lang).toLowerCase();
    if(lang.indexOf('lij') === 0) return 'lij';
    if(lang.indexOf('it')  === 0) return 'it';
    if(lang.indexOf('en')  === 0) return 'en';
    if(lang.indexOf('es')  === 0) return 'es';
    if(lang.indexOf('fr')  === 0) return 'fr';
    if(lang.indexOf('ar')  === 0) return 'ar';
    if(lang.indexOf('ru')  === 0) return 'ru';
    if(lang.indexOf('zh')  === 0 || lang.indexOf('cn') === 0) return 'zh';
    return 'it';
  }

  var TITLE_LABEL = {
    it:  'Metropolitana',
    en:  'Metro',
    es:  'Metro',
    fr:  'Métro',
    ar:  'مترو',
    ru:  'Метро',
    zh:  '地铁',
    lij: 'Metro'
  };

  var LINK_LABEL = {
    it:  'sito/link',
    en:  'website / link',
    es:  'sitio/enlace',
    fr:  'site / lien',
    ar:  'الموقع / الرابط',
    ru:  'сайт / ссылка',
    zh:  '网站/链接',
    lij: 'sito/link'
  };

  function esc(str){
    return String(str == null ? '' : str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function popupHTMLMetro(name){
    var lang = normalizeLang(rawLang());
    var title = TITLE_LABEL[lang] || TITLE_LABEL.it;
    var linkLabel = LINK_LABEL[lang] || LINK_LABEL.it;
    var rtl = (lang === 'ar');
    var dirAttr = rtl ? 'rtl' : 'ltr';
    var bodyStyle = rtl ? 'direction:rtl;text-align:justify;' : '';

    var html = ''
      + '<div class="mh-popup metro-popup" dir="' + dirAttr + '">'
      +   '<div class="mh-popup-header">'
      +     '<span class="mh-popup-title">' + esc(title) + '</span>'
      +   '</div>'
      +   '<div class="mh-popup-body" style="' + bodyStyle + '">';

    if(name){
      html += '<p class="mh-popup-desc">' + esc(name) + '</p>';
    }
    html +=   '<div class="mh-popup-link">'
      +         '<a href="https://www.amt.genova.it/amt/trasporto-multimodale/metropolitana/" target="_blank" rel="noopener">'
      +           esc(linkLabel)
      +         '</a>'
      +       '</div>'
      +   '</div>'
      + '</div>';
    return html;
  }

  function isMetroMarker(layer){
    try{
      if(!window.L || !L.Marker) return false;
      if(!(layer instanceof L.Marker)) return false;
      var icon = layer.options && layer.options.icon;
      var cls  = icon && icon.options && icon.options.className;
      return cls === 'metro-ico';
    }catch(_){
      return false;
    }
  }

  function decorateMetroMarker(m){
    if(!m || typeof m.getPopup !== 'function') return;

    // Recupero e memorizzo il nome della fermata una volta sola
    if(!m._metroName){
      var popup = m.getPopup && m.getPopup();
      var raw   = popup && typeof popup.getContent === 'function'
                ? popup.getContent()
                : '';
      if(typeof raw === 'string' && raw.indexOf('<') === -1){
        m._metroName = raw;
      }else if(!m._metroName){
        m._metroName = '';
      }
    }

    var html = popupHTMLMetro(m._metroName || '');
    var popup = m.getPopup && m.getPopup();

    // QUI la differenza: se il popup esiste già (anche se è aperto) uso setContent,
    // così si aggiorna "in diretta". Altrimenti faccio bindPopup al primo giro.
    if(popup && typeof popup.setContent === 'function'){
      popup.setContent(html);
      if(popup.options){
        // garantisco la classe CSS
        popup.options.className = 'mh-popup metro-popup';
      }
    }else{
      m.bindPopup(html, { className: 'mh-popup metro-popup' });
    }
  }

  function updateMetroPopups(){
    try{
      if(!window.map || typeof map.eachLayer !== 'function') return;
      map.eachLayer(function(layer){
        if(isMetroMarker(layer)){
          decorateMetroMarker(layer);
        }
      });
    }catch(_){}
  }

  // Volendo questa ora è quasi ridondante, ma non fa male.
  function refreshOpenMetroPopup(){
    try{
      if(!window.map || typeof map.eachLayer !== 'function') return;
      map.eachLayer(function(layer){
        if(!isMetroMarker(layer)) return;
        if(layer.isPopupOpen && layer.isPopupOpen()){
          decorateMetroMarker(layer);
        }
      });
    }catch(_){}
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-metro');
    if(!btn || !window.map) return false;

    // Al click del toggle, dopo che i marker sono stati creati/mostrati,
    // aggiorniamo la struttura dei popup.
    btn.addEventListener('click', function(){
      setTimeout(updateMetroPopups, 0);
    }, true);

    // Primo giro di decorazione, nel caso il layer sia già visibile
    setTimeout(updateMetroPopups, 300);

    return true;
  }

  // Cambio lingua: rigenero TUTTI i popup metro + quello eventualmente aperto.
  try{
    document.addEventListener('app:set-lang', function(){
      updateMetroPopups();
      refreshOpenMetroPopup();
    });
  }catch(_){}

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
  function rawLang(){
    try{
      return (document.documentElement.getAttribute('lang')
              || (typeof localStorage !== 'undefined' && localStorage.getItem('lang'))
              || 'it');
    }catch(_){
      return 'it';
    }
  }

  function normalizeLang(lang){
    if(!lang) return 'it';
    lang = String(lang).toLowerCase();
    if(lang.indexOf('lij') === 0) return 'lij';
    if(lang.indexOf('it')  === 0) return 'it';
    if(lang.indexOf('en')  === 0) return 'en';
    if(lang.indexOf('es')  === 0) return 'es';
    if(lang.indexOf('fr')  === 0) return 'fr';
    if(lang.indexOf('ar')  === 0) return 'ar';
    if(lang.indexOf('ru')  === 0) return 'ru';
    if(lang.indexOf('zh')  === 0 || lang.indexOf('cn') === 0) return 'zh';
    return 'it';
  }

  var TITLE_LABEL = {
    it:  'Stazioni autobus',
    en:  'Bus stops',
    es:  'Paradas de autobús',
    fr:  'Arrêts de bus',
    ar:  'محطات حافلات',
    ru:  'Автобусные остановки',
    zh:  '公交车站',
    lij: 'Stasciòn de òtobus'
  };

  var LINK_LABEL = {
    it:  'link/sito',
    en:  'link/website',
    es:  'enlace/sitio',
    fr:  'lien/site',
    ar:  'رابط/موقع',
    ru:  'ссылка/сайт',
    zh:  '链接/网站',
    lij: 'link/sito'
  };

  function esc(str){
    return String(str == null ? '' : str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function popupHTMLBus(name){
    var lang = normalizeLang(rawLang());
    var title = TITLE_LABEL[lang] || TITLE_LABEL.it;
    var linkLabel = LINK_LABEL[lang] || LINK_LABEL.it;
    var rtl = (lang === 'ar');
    var dirAttr = rtl ? 'rtl' : 'ltr';
    var bodyStyle = rtl ? 'direction:rtl;text-align:justify;' : '';

    var html = ''
      + '<div class="mh-popup bus-popup" dir="' + dirAttr + '">'
      +   '<div class="mh-popup-header">'
      +     '<span class="mh-popup-title">' + esc(title) + '</span>'
      +   '</div>'
      +   '<div class="mh-popup-body" style="' + bodyStyle + '">';

    if(name){
      html += '<p class="mh-popup-desc">' + esc(name) + '</p>';
    }
    html +=   '<div class="mh-popup-link">'
      +         '<a href="https://www.amt.genova.it/amt/trasporto-multimodale/linee-bus-urbane/" target="_blank" rel="noopener">'
      +           esc(linkLabel)
      +         '</a>'
      +       '</div>'
      +   '</div>'
      + '</div>';
    return html;
  }

  function isBusMarker(layer){
    try{
      if(!window.L || !L.Marker) return false;
      if(!(layer instanceof L.Marker)) return false;
      var icon = layer.options && layer.options.icon;
      var cls  = icon && icon.options && icon.options.className;
      return cls === 'bus-ico';
    }catch(_){
      return false;
    }
  }

  function decorateBusMarker(m){
    if(!m || typeof m.getPopup !== 'function') return;

    if(!m._busName){
      var popup = m.getPopup && m.getPopup();
      var raw   = popup && typeof popup.getContent === 'function'
                ? popup.getContent()
                : '';
      if(typeof raw === 'string' && raw.indexOf('<') === -1){
        m._busName = raw;
      }else if(!m._busName){
        m._busName = '';
      }
    }

    var html = popupHTMLBus(m._busName || '');
    var popup = m.getPopup && m.getPopup();

    if(popup && typeof popup.setContent === 'function'){
      popup.setContent(html);
      if(popup.options){
        popup.options.className = 'mh-popup bus-popup';
      }
    }else{
      m.bindPopup(html, { className: 'mh-popup bus-popup' });
    }
  }

  function updateBusPopups(){
    try{
      if(!window.map || typeof map.eachLayer !== 'function') return;
      map.eachLayer(function(layer){
        if(isBusMarker(layer)){
          decorateBusMarker(layer);
        }
      });
    }catch(_){}
  }

  function refreshOpenBusPopup(){
    try{
      if(!window.map || typeof map.eachLayer !== 'function') return;
      map.eachLayer(function(layer){
        if(!isBusMarker(layer)) return;
        if(layer.isPopupOpen && layer.isPopupOpen()){
          decorateBusMarker(layer);
        }
      });
    }catch(_){}
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-bus');
    if(!btn || !window.map) return false;

    btn.addEventListener('click', function(){
      setTimeout(updateBusPopups, 0);
    }, true);

    setTimeout(updateBusPopups, 300);

    return true;
  }

  try{
    document.addEventListener('app:set-lang', function(){
      updateBusPopups();
      refreshOpenBusPopup();
    });
  }catch(_){}

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(typeof L !== 'undefined' && map && typeof map.hasLayer === 'function' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();

