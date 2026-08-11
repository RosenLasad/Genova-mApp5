
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
    it:  'Stazione funicolare/ascensore',
    en:  'Funicular / elevator station',
    es:  'Estación de funicular/ascensor',
    fr:  'Station de funiculaire/ascenseur',
    ar:  'محطة فونيكولار/مصعد',
    ru:  'Станция фуникулёра/лифта',
    zh:  '缆车/电梯站',
    lij: 'Stasciòn de funicolâ/ascensô'
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

  function popupHTMLFuni(name){
    var lang = normalizeLang(rawLang());
    var title = TITLE_LABEL[lang] || TITLE_LABEL.it;
    var linkLabel = LINK_LABEL[lang] || LINK_LABEL.it;
    var rtl = (lang === 'ar');
    var dirAttr = rtl ? 'rtl' : 'ltr';
    var bodyStyle = rtl ? 'direction:rtl;text-align:justify;' : '';

    var html = ''
      + '<div class="mh-popup funi-popup" dir="' + dirAttr + '">'
      +   '<div class="mh-popup-header">'
      +     '<span class="mh-popup-title">' + esc(title) + '</span>'
      +   '</div>'
      +   '<div class="mh-popup-body" style="' + bodyStyle + '">';

    if(name){
      html += '<p class="mh-popup-desc">' + esc(name) + '</p>';
    }
    html +=   '<div class="mh-popup-link">'
      +         '<a href="https://www.amt.genova.it/amt/trasporto-multimodale/ascensori/" target="_blank" rel="noopener">'
      +           esc(linkLabel)
      +         '</a>'
      +       '</div>'
      +   '</div>'
      + '</div>';
    return html;
  }

  function isFuniMarker(layer){
    try{
      if(!window.L || !L.Marker) return false;
      if(!(layer instanceof L.Marker)) return false;
      var icon = layer.options && layer.options.icon;
      var cls  = icon && icon.options && icon.options.className;
      return cls === 'funi-ico';
    }catch(_){
      return false;
    }
  }

  function decorateFuniMarker(m){
    if(!m || typeof m.getPopup !== 'function') return;

    if(!m._funiName){
      var popup = m.getPopup && m.getPopup();
      var raw   = popup && typeof popup.getContent === 'function'
                ? popup.getContent()
                : '';
      if(typeof raw === 'string' && raw.indexOf('<') === -1){
        m._funiName = raw;
      }else if(!m._funiName){
        m._funiName = '';
      }
    }

    var html = popupHTMLFuni(m._funiName || '');
    var popup = m.getPopup && m.getPopup();

    if(popup && typeof popup.setContent === 'function'){
      popup.setContent(html);
      if(popup.options){
        popup.options.className = 'mh-popup funi-popup';
      }
    }else{
      m.bindPopup(html, { className: 'mh-popup funi-popup' });
    }
  }

  function updateFuniPopups(){
    try{
      if(!window.map || typeof map.eachLayer !== 'function') return;
      map.eachLayer(function(layer){
        if(isFuniMarker(layer)){
          decorateFuniMarker(layer);
        }
      });
    }catch(_){}
  }

  function refreshOpenFuniPopup(){
    try{
      if(!window.map || typeof map.eachLayer !== 'function') return;
      map.eachLayer(function(layer){
        if(!isFuniMarker(layer)) return;
        if(layer.isPopupOpen && layer.isPopupOpen()){
          decorateFuniMarker(layer);
        }
      });
    }catch(_){}
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-funi');
    if(!btn || !window.map) return false;

    btn.addEventListener('click', function(){
      setTimeout(updateFuniPopups, 0);
    }, true);

    setTimeout(updateFuniPopups, 300);

    return true;
  }

  try{
    document.addEventListener('app:set-lang', function(){
      updateFuniPopups();
      refreshOpenFuniPopup();
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
