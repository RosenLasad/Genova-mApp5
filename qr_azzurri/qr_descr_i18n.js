// qr_azzurri/qr_descr_i18n.js
(function(){

  // 1) Rileva la lingua corrente (coerente con il resto del sito)
  function currentLang(){
    var raw =
      document.documentElement.getAttribute('lang') ||
      (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) ||
      'it';
    return (raw || 'it').toLowerCase();
  }

  function normalizeLang(l){
    l = (l || 'it').toLowerCase();
    if(l.indexOf('it') === 0) return 'it';
    if(l.indexOf('en') === 0) return 'en';
    if(l.indexOf('es') === 0) return 'es';
    if(l.indexOf('fr') === 0) return 'fr';
    if(l.indexOf('ar') === 0) return 'ar';
    if(l.indexOf('ru') === 0) return 'ru';
    if(l.indexOf('zh') === 0) return 'zh';
    if(l.indexOf('lij') === 0) return 'lij';
    return 'it';
  }

  // 2) Dizionario delle descrizioni per i punti QR, indicizzati per TITOLO (label)
  //    Puoi aggiungere tutte le lingue che vuoi: it, en, es, fr, ar, ru, zh, lij...
  window.QR_DESCR_I18N = window.QR_DESCR_I18N || 

{};

  // 3) Wrap di __qrOpenChildPanel: sostituisce la descrizione con la versione tradotta
  var orig = window.__qrOpenChildPanel;
  if (typeof orig !== 'function') {
    // Se per qualche motivo non esiste ancora, non facciamo nulla.
    return;
  }

  window.__qrOpenChildPanel = function(title, descr, media){
    var lang = normalizeLang(currentLang());
    var map  = window.QR_DESCR_I18N || {};
    var entry = map[title];
    var outDescr = descr;

    if (entry && typeof entry === 'object') {
      // Priorità: lingua corrente -> italiano -> inglese -> fallback originale
      outDescr = entry[lang] || entry.it || entry.en || descr;
    }

    return orig(title, outDescr, media);
  };

})();
