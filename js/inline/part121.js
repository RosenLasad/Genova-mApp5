
(function(){
  function curLang(){
    try{
      return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
    }catch(_){ return 'it'; }
  }
  function getTemplateFlags(){
    var tpl = document.getElementById('tpl-mh-flags');
    if(!tpl) return null;
    var tmp = document.createElement('div');
    tmp.innerHTML = tpl.innerHTML.trim();
    return tmp.firstElementChild; // <div class="mh-flags" id="mh-flags">...</div>
  }
  function renderButtonIcon(btn, lang){
    if(!btn) return;
    var flags = getTemplateFlags();
    if(!flags) return;
    var el = flags.querySelector('.flag[data-lang="'+lang+'"]');
    var svg = el ? el.querySelector('svg') : null;
    btn.innerHTML = '<span class="sr-only">Lingua</span>';
    var ico = document.createElement('div');
    ico.className = 'flag-ico';
    if(svg){
      ico.innerHTML = svg.outerHTML;
    }
    btn.appendChild(ico);
  }
  function mount(){
    if(document.getElementById('flag-switcher')) return true;
    // Build button
    var btn = document.createElement('button');
    btn.id = 'flag-switcher';
    btn.setAttribute('aria-haspopup','menu');
    btn.setAttribute('aria-expanded','false');
    // Build menu
    var menu = document.createElement('div');
    menu.id = 'flag-menu';
    menu.setAttribute('role','menu');
    // Fill menu with flags from template
    var flags = getTemplateFlags();
    if(!flags) return false;
    // Avoid duplicate IDs
    if(flags.id) flags.id = 'mh-flags-dropdown';
    menu.appendChild(flags);
    document.body.appendChild(btn);
    document.body.appendChild(menu);

    // Wire flags using existing helper when available
    if(typeof wireFlags === 'function'){
      wireFlags(flags);
    } else {
      flags.addEventListener('click', function(e){
        var f = e.target.closest && e.target.closest('.flag');
        if(!f) return;
        var lang = f.getAttribute('data-lang');
        if(typeof setLang === 'function') setLang(lang);
      });
    }

    // Toggle menu
    function closeMenu(){ menu.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    function openMenu(){ menu.classList.add('open'); btn.setAttribute('aria-expanded','true'); repositionMenuUp();}

    btn.addEventListener('click', function(e){
      e.preventDefault();
      if(menu.classList.contains('open')) closeMenu(); else openMenu();
    });

    // Close on outside click / Esc
    document.addEventListener('click', function(e){
      if(menu.classList.contains('open')){
        if(!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)){
          closeMenu();
        }
      }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeMenu();
    });

    // Sync selection in menu + icon when language changes
    function sync(){
      var lang = curLang();
      renderButtonIcon(btn, lang);
      if(typeof updateSelection === 'function'){
        updateSelection(flags);
      } else {
        // minimal: toggle selected on menu buttons
        flags.querySelectorAll('.flag').forEach(function(b){
          var on = b.getAttribute('data-lang') === lang;
          b.classList.toggle('selected', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
      }
    }
    sync();
    document.addEventListener('app:set-lang', sync);

    // Also close menu after a selection
    // removed auto-close on selection

    // Keep menu aligned under the button if layout changes (header height, etc.)
    function reposition(){
      try{
        var b = btn.getBoundingClientRect();
        menu.style.left = (b.left|0) + 'px';
        menu.style.top  = (b.bottom + 4|0) + 'px';
      }catch(_){}
    }
    window.addEventListener('resize', reposition, {passive:true});
    window.addEventListener('scroll',  reposition, {passive:true});
    reposition();

    return true;
  }

  var tries = 0;
  (function tick(){
    if(mount()) return;
    if(++tries < 20) setTimeout(tick, 150);
  })();
})();
