
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
    if(typeof L !== 'undefined' && typeof map !== 'undefined' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();
