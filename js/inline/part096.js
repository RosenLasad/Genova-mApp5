
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
    if(typeof L !== 'undefined' && typeof map !== 'undefined' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();
