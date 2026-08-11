
(function(){
  // Robust click delegation: any element with [data-lang] triggers setLang
  document.addEventListener('click', function(ev){
    try{
      var el = ev.target && ev.target.closest ? ev.target.closest('[data-lang]') : null;
      if(!el) return;
      var lang = el.getAttribute('data-lang') || (el.dataset ? el.dataset.lang : '');
      if(!lang) return;
      if (typeof setLang === 'function') {
        setLang(lang);
      } else {
        // Fallback: set attributes directly if setLang is not present
        try{
          localStorage.setItem('lang', lang);
          document.documentElement.setAttribute('lang', lang);
          document.dispatchEvent(new CustomEvent('app:set-lang', { detail: { lang: lang } }));
        }catch(e){}
      }
    }catch(e){}
  }, true);
})();
