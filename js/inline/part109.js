
(function(){
  function currentLang(){
    return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
  }
  function setLang(lang){
    try{
      localStorage.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
      document.dispatchEvent(new CustomEvent('app:set-lang', { detail: { lang: lang } }));
      if(window.i18n && typeof window.i18n.setLang === 'function'){
        window.i18n.setLang(lang);
      } else if (window.menuHomeI18N && typeof window.menuHomeI18N.apply === 'function'){
        window.menuHomeI18N.apply(lang);
      }
    }catch(_){}
  }
  function wireFlags(container){
    if(!container || container.__wired) return;
    container.__wired = true;
    container.addEventListener('click', function(e){
      var btn = e.target.closest && e.target.closest('.flag');
      if(!btn || !container.contains(btn)) return;
      e.preventDefault();
      var lang = btn.getAttribute('data-lang');
      setLang(lang);
      updateSelection(container);
    });
    updateSelection(container);
    
  }
  function updateSelection(container){
    var cur = currentLang();
    container.querySelectorAll('.flag').forEach(function(btn){
      var on = (btn.getAttribute('data-lang') === cur);
      btn.classList.toggle('selected', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function insertFlags(){
    var title = document.querySelector('.menu-home .mh-title');
    if(!title) return false;
    // Already present?
    if(title.nextElementSibling && title.nextElementSibling.id === 'mh-flags') {
      wireFlags(title.nextElementSibling);
      return true;
    }
    var tpl = document.getElementById('tpl-mh-flags');
    if(!tpl) return false;
    var clone = document.createElement('div');
    clone.innerHTML = tpl.innerHTML.trim();
    var flags = clone.firstElementChild;
    if(!flags) return false;
    title.parentNode.insertBefore(flags, title.nextSibling);
    wireFlags(flags);
    return true;
  }
  function tryInsertRepeated(maxTries){
    var tries = 0;
    (function tick(){
      if(insertFlags()) return;
      if(++tries < maxTries) setTimeout(tick, 150);
    })();
  }
  // Run now, then observe DOM for late mounts of menu-home
  tryInsertRepeated(25);
  var mo = new MutationObserver(function(){
    insertFlags();
  });
  mo.observe(document.documentElement, {childList:true, subtree:true});
})();
