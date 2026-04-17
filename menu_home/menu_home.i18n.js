(function(){
  const CACHE = {};
  function getLang(){
    return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
  }
  async function loadDict(lang){
    if(CACHE[lang]) return CACHE[lang];
    const res = await fetch(`menu_home/${lang}.json`, {cache:'no-store'});
    const dict = await res.json();
    CACHE[lang] = dict;
    return dict;
  }
  function applyDict(dict){
    // Text nodes (labels)
    document.querySelectorAll('[data-i18n^="menu_home."]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if(val != null){
        if(el.hasAttribute('data-i18n-html')) el.innerHTML = val;
        else el.textContent = val;
      }
    });
    // Attributes (title, aria-label, etc.)
    document.querySelectorAll('[data-i18n-attr]').forEach(el=>{
      const attrs = el.getAttribute('data-i18n-attr').split(',').map(s=>s.trim()).filter(Boolean);
      attrs.forEach(attr=>{
        const key = el.getAttribute(`data-i18n-${attr}`);
        if(key && dict[key] != null){
          el.setAttribute(attr, dict[key]);
        }
      });
    });
  }
  async function applyMenuHomeI18N(lang){
    const dict = await loadDict(lang);
    applyDict(dict);
  }
  // Expose a simple API
  window.menuHomeI18N = { apply: applyMenuHomeI18N };
  // Auto-apply on DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>applyMenuHomeI18N(getLang()), {once:true});
  }else{
    applyMenuHomeI18N(getLang());
  }
  // Optional: listen to a custom event when the app changes language elsewhere
  document.addEventListener('app:set-lang', (e)=>{
    const lang = e && e.detail && e.detail.lang;
    if(lang) applyMenuHomeI18N(lang);
  });
})();
