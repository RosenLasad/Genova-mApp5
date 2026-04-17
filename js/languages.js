// --- extracted from inline part 1 ---
(function () {
  try {
    var stored = localStorage.getItem('lang');
    var lang = stored || 'it';

    // aggiorno l'HTML
    document.documentElement.setAttribute('lang', lang);

    // se non c'era niente, salvo 'it' una volta sola
    if (!stored) {
      localStorage.setItem('lang', lang);
    }
  } catch (e) {
    document.documentElement.setAttribute('lang', 'it');
  }
})();

// --- extracted from inline part 109 ---
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

// --- extracted from inline part 110 ---
(function(){
  
  var DICT = {
  "it": {
    }
};
  var lang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
  function t(k){ return (DICT[lang] && DICT[lang][k]) || k; }

  
  // Wire global setter for flags
  window.setLang = function(newLang){
  lang = newLang || 'it';
  try{ localStorage.setItem('lang', lang); }catch(_){}
  try{ document.documentElement.setAttribute('lang', lang); }catch(_){}

  try{ document.dispatchEvent(new CustomEvent('app:set-lang', {detail:{lang:lang}})); }catch(_){}
  try{ window.dispatchEvent(new Event('i18n:changed')); }catch(_){}

  try{ applyGiochiLabel(); }catch(_){}

  // Se Info Ã¨ aperto, aggiorna subito (senza costringere a chiudere/riaprire)
  try{
  var _bubble = document.getElementById('mh-bubble');
  var _key = _bubble && _bubble.dataset ? _bubble.dataset.key : '';
  var _isOpen = _bubble && !_bubble.classList.contains('hidden');

  // Se una sezione Home Ã¨ aperta, ricaricala nella nuova lingua
  if(_bubble && _isOpen && _key
     && window.__gmHomePanel
     && typeof window.__gmHomePanel.openSection === 'function'){
    window.__gmHomePanel.openSection(_key);
    return;
  }

  // fallback: chiudi
  if(_bubble){
    if(typeof closeBubble === 'function'){ closeBubble(); }
    else { _bubble.classList.add('hidden'); }
  }
}catch(_){}

};

})();

// --- extracted from inline part 111 ---
(function(){
      document.addEventListener('click', function(e){
        var btn = e.target.closest && e.target.closest('#mh-flags .flag, #flag-ribbon .flag');
        if(!btn) return;
        var lang = btn.getAttribute('data-lang');
        if(lang){ e.preventDefault(); if(window.setLang) window.setLang(lang); }
      }, true);
    })();

// --- extracted from inline part 112 ---
(function(){
  function refreshFlags(){
    try{
      var cur = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
      document.querySelectorAll('#mh-flags .flag, #flag-ribbon .flag').forEach(function(btn){
        var on = btn.getAttribute('data-lang') === cur;
        btn.classList.toggle('selected', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }catch(_){}
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', refreshFlags, {once:true});
  }else{
    refreshFlags();
  }
  document.addEventListener('app:set-lang', refreshFlags);
})();

// --- extracted from inline part 118 ---
// [removed duplicate flag rail]


// --- extracted from inline part 119 ---
// [removed duplicate flag rail]


// --- extracted from inline part 120 ---
// [removed duplicate flag rail]


// --- extracted from inline part 121 ---
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

// --- extracted from inline part 122 ---
(function(){
  function placeSwitcher(){
    try{
      var btn = document.getElementById('flag-switcher');
      if(!btn) return;
      // Bottom-left fixed, near help
      btn.style.left = '16px';
      btn.style.bottom = '16px';
      btn.style.top = '';
    }catch(_){}
  }
  function init(){
    placeSwitcher();
    window.addEventListener('resize', placeSwitcher, {passive:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();

// --- extracted from inline part 128 ---
(function(){
  try{
    var allowedSel = '#flag-ribbon, #mh-flags, #flag-menu, #mh-flags-rail, #mh-flags-dropdown';
    Array.from(document.querySelectorAll('.fr-flag')).forEach(function(node){
      if(!node.closest(allowedSel)){ node.remove(); }
    });
    Array.from(document.querySelectorAll('body > svg')).forEach(function(svg){ svg.remove(); });
  }catch(e){}
})();

// --- extracted from inline part 161 ---
(function(){
  function positionFlagMenuUp(){
    var menu = document.getElementById('flag-menu');
    if(!menu) return;
    menu.style.position = 'fixed';
    menu.style.left = '16px';
    menu.style.top = '';
    menu.style.bottom = 'calc(16px + 38px + 8px)';
    menu.style.zIndex = '2000';
  }
  function bind(){
    positionFlagMenuUp();
    var sw = document.getElementById('flag-switcher');
    if(sw){
      sw.addEventListener('click', function(){
        // Defer to allow any toggle logic to change display, then fix position
        setTimeout(positionFlagMenuUp, 0);
      });
    }
    // Also re-apply on window resize (safe guard)
    window.addEventListener('resize', positionFlagMenuUp);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  }else{
    bind();
  }
})();

// --- extracted from inline part 162 ---
(function(){
  function bind(){
    var sw = document.getElementById('flag-switcher');
    var menu = document.getElementById('flag-menu');
    if(sw){ sw.addEventListener('click', function(e){ e.stopPropagation(); }, false); }
    if(menu){ menu.addEventListener('click', function(e){ e.stopPropagation(); }, false); }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  }else{
    bind();
  }
})();

// --- extracted from inline part 164 ---
(function(){
  window.normalizeLang = function(lang){
    try{
      var s = (lang||'').toString().trim();
      if(!s) return 'it';
      s = s.replace('_','-').toLowerCase();
      // common aliases -> base
      var map = {
        'en-us':'en','en-gb':'en','en-au':'en','en-ca':'en',
        'es-es':'es','es-mx':'es','es-ar':'es','es-cl':'es',
        'fr-fr':'fr','fr-ca':'fr',
        'pt-br':'pt','pt-pt':'pt',
        'zh-cn':'zh','zh-tw':'zh','zh-hans':'zh','zh-hant':'zh'
      };
      if(map[s]) return map[s];
      // take primary subtag as base
      s = s.split('-')[0];
      return s || 'it';
    }catch(e){ return 'it'; }
  };
})();

// --- extracted from inline part 165 ---
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

// --- extracted from inline part 217 ---
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
