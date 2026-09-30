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
