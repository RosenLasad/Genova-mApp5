
(function(){
  function curLang(){
    try{
      return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
    }catch(_){ return 'it'; }
  }
  function updateRailSelection(container){
    if(!container) return;
    var lang = curLang();
    var btns = container.querySelectorAll('.flag');
    btns.forEach(function(btn){
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('selected', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function ensureHandlers(){
    var rail = document.getElementById('mh-flags-rail');
    if(!rail) return false;
    // Click -> setLang + refresh selection
    rail.addEventListener('click', function(e){
      var btn = e.target.closest && e.target.closest('.flag');
      if(!btn || !rail.contains(btn)) return;
      var lang = btn.getAttribute('data-lang');
      if(typeof setLang === 'function'){ setLang(lang); }
      updateRailSelection(rail);
    });
    // React on global lang change (e.g., Home menu flags or other triggers)
    
    // Initial sync
    updateRailSelection(rail);
    return true;
  }
  var tries = 0;
  (function tick(){
    if(ensureHandlers()) return;
    if(++tries < 20) setTimeout(tick, 150);
  })();
})();
