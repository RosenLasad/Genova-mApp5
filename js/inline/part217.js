
(function(){
  try {
    document.addEventListener('app:set-lang', function(ev){
      var lang = (ev && ev.detail && ev.detail.lang) || document.documentElement.lang || 'it';
      document.documentElement.setAttribute('dir', (lang === 'ar') ? 'rtl' : 'ltr');
    });
    var initLang = document.documentElement.lang || 'it';
    document.documentElement.setAttribute('dir', (initLang === 'ar') ? 'rtl' : 'ltr');
  } catch(e){ /* no-op */ }
})();
