
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
    if(typeof L !== 'undefined' && typeof map !== 'undefined' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();
