
(function(){
  // Create a vertical rail of language flags using the existing template & wiring.
  function mountFlagRail(){
    if(document.getElementById('flag-rail')) return true;
    var tpl = document.getElementById('tpl-mh-flags');
    if(!tpl) return false;
    var wrap = document.createElement('div');
    wrap.id = 'flag-rail';
    wrap.setAttribute('role','toolbar');
    wrap.setAttribute('aria-label','Lingue');
    // clone the inner of template (it contains <div id="mh-flags" class="mh-flags"> ... )
    var tmp = document.createElement('div');
    tmp.innerHTML = tpl.innerHTML.trim();
    var flags = tmp.firstElementChild;
    if(!flags) return false;
    // Avoid duplicate IDs: rename to mh-flags-rail but keep class "mh-flags"
    if(flags.id) flags.id = 'mh-flags-rail';
    wrap.appendChild(flags);
    document.body.appendChild(wrap);
    // Use the existing helper to bind behavior
    if(typeof wireFlags === 'function'){
      wireFlags(flags);
    } else {
      // Fallback: basic click handler calling setLang
      flags.addEventListener('click', function(e){
        var btn = e.target.closest && e.target.closest('.flag');
        if(!btn) return;
        var lang = btn.getAttribute('data-lang');
        if(typeof setLang === 'function') setLang(lang);
      });
    }
    return true;
  }

  // Try now, and retry a few times in case template or helpers load late
  var tries = 0;
  (function tick(){
    if(mountFlagRail()) return;
    if(++tries < 20) setTimeout(tick, 150);
  })();

  // Re-apply selection highlight on language change
  
})();
