
/* === Home Menu Flags wiring === */
(function(){
  function setLang(lang){
    try{
      localStorage.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
      // Notify any i18n modules
      document.dispatchEvent(new CustomEvent('app:set-lang', { detail: { lang } }));
      // If a global i18n engine exists, prefer it
      if(window.i18n && typeof window.i18n.setLang === 'function'){
        window.i18n.setLang(lang);
      } else if (window.menuHomeI18N && typeof window.menuHomeI18N.apply === 'function'){
        window.menuHomeI18N.apply(lang);
      }
    }catch(_){}
  }

  function currentLang(){
    return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
  }

  function updateSelection(root){
    var cur = currentLang();
    root.querySelectorAll('.flag').forEach(btn=>{
      var on = (btn.getAttribute('data-lang') === cur);
      btn.classList.toggle('selected', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function initFlags(container){
    if(!container) return;
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', 'Lingua');
    container.addEventListener('click', function(e){
      var btn = e.target.closest && e.target.closest('.flag');
      if(!btn || !container.contains(btn)) return;
      e.preventDefault();
      var lang = btn.getAttribute('data-lang');
      setLang(lang);
      updateSelection(container);
    });
    // Init state
    updateSelection(container);
    document.addEventListener('app:set-lang', function(){ updateSelection(container); });
  }

  // Auto-init on DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      initFlags(document.getElementById('mh-flags'));
    }, {once:true});
  } else {
    initFlags(document.getElementById('mh-flags'));
  }
})();
