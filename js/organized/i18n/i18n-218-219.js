
(function(){
  // Palette Acquedotti
  var PALETTE_ACQ = {
    'storia-acq-romano':  '#8b5cf6', // Acquedotto Romano (III sec. a.C.)
    'storia-acq-storico': '#16a34a'  // Acquedotto Storico (XVII sec.)
  };

  function getLegacyDotColor(legacyCb){
    try{
      var lab = legacyCb && legacyCb.closest('label');
      var dot = lab ? lab.querySelector('.dot') : null;
      if(dot){
        var cs = getComputedStyle(dot);
        return (dot.style.background || cs.backgroundColor || cs.color || '').trim();
      }
    }catch(_){}
    return '';
  }

  function applyColorById(rowCbId, legacyName){
    var cb = document.getElementById(rowCbId);
    if(!cb) return;
    var row = cb.closest('label'); if(!row) return;

    // prova a individuare il checkbox legacy per nome (vecchio menu)
    var legacy = null;
    var wanted = (legacyName || '').toLowerCase();
    var labels = document.querySelectorAll('label');
    for(var i=0;i<labels.length;i++){
      var L = labels[i];
      var t = (L.textContent || '').trim().toLowerCase();
      if(t && wanted && t.indexOf(wanted) >= 0 && L !== row){
        var c = L.querySelector('input[type="checkbox"]');
        if(c){ legacy = c; break; }
      }
    }

    var color = getLegacyDotColor(legacy);
    if(!color){ color = PALETTE_ACQ[rowCbId] || ''; }
    if(color){ row.style.setProperty('--c', color); }
  }

  function applyAcqColors(){
    applyColorById('storia-acq-romano',  'Acquedotto Romano');
    applyColorById('storia-acq-storico', 'Acquedotto Storico');
  }

  function boot(){
    applyAcqColors();
    // se la lista cambia dinamicamente, riapplica
    try{
      var host = document.getElementById('storia-acquedotti-items');
      if(host){
        new MutationObserver(function(){ applyAcqColors(); })
          .observe(host, {childList:true, subtree:true});
      }
    }catch(_){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
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
    if(typeof L !== 'undefined' && map && typeof map.hasLayer === 'function' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();

