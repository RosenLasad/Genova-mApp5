(function(){
  function clickSel(sel){
    var el = document.querySelector(sel);
    if(el && typeof el.click === 'function'){ el.click(); return true; }
    return false;
  }

  function hasDeepLink(){
    try{
      return !!(location.hash && location.hash.length>1) || /[?&](id|qr|place|p|doc)=/i.test(location.search || '');
    }catch(_){ return false; }
  }

  var showTimer = null;

  function show(){
    // Don't re-open if already seen
    try{
      if(localStorage.getItem('gm_welcome_seen') === '1') return;
    }catch(_){}
    var ov = document.getElementById('gm-welcome-overlay');
    if(!ov) return;
    ov.hidden = false;
  }

  // NEW: manual open (from Settings -> Benvenuto)
  function openWelcomeManual(){
    var ov = document.getElementById('gm-welcome-overlay');
    if(!ov) return;

    // prevent pending show() from racing
    if(showTimer){ try{ clearTimeout(showTimer); }catch(_){ } showTimer = null; }

    // open regardless of gm_welcome_seen
    ov.hidden = false;
  }

  function hide(setSeen){
    var ov = document.getElementById('gm-welcome-overlay');
    if(!ov) return;
    // prevent any pending show() from re-opening after a click
    if(showTimer){ try{ clearTimeout(showTimer); }catch(_){ } showTimer = null; }
    ov.hidden = true;
    if(setSeen){
      try{ localStorage.setItem('gm_welcome_seen','1'); }catch(_){}
    }
  }

  function openHome(){
    clickSel('#title-btn');
  }

  function openHomeItem(key){
    openHome();
    setTimeout(function(){
      clickSel('#menu-home .mh-item[data-key="'+key+'"]');
    }, 60);
  }

  function openFavSection(sectionKey){
    openHomeItem('preferiti');
    setTimeout(function(){
      clickSel('#fav-menu .fav-acc-section[data-key="'+sectionKey+'"] .fav-acc-head');
    }, 220);
  }

  function handleAction(act){
    if(act === 'close'){ hide(true); return; }

    if(act === 'sqorci'){ openHomeItem('sqorci'); hide(true); return; }

    if(act === 'trasporti'){ openFavSection('cat-transport'); hide(true); return; }

    if(act === 'patrimonio'){ openFavSection('cat-past'); hide(true); return; }

    if(act === 'intrattenimento'){ openFavSection('cat-places'); hide(true); return; }

    if(act === 'percorsi'){
  hide(true);

  // Apri la sezione "Percorsi storici" (menu Home -> Storia)
  setTimeout(function(){
    // apre Home e clicca "storia"
    openHomeItem('storia');
  }, 80);

  return;
}

    hide(true);
  }

  function boot(){
    var ov = document.getElementById('gm-welcome-overlay');
    if(!ov){
      var tries = 0;
      var t = setInterval(function(){
        tries++;
        if(document.getElementById('gm-welcome-overlay')){ clearInterval(t); boot(); }
        if(tries>30) clearInterval(t);
      }, 100);
      return;
    }

    ov.addEventListener('click', function(ev){
      if(ev.target === ov) hide(true);
    });

    ov.addEventListener('click', function(ev){
      var btn = ev.target && ev.target.closest ? ev.target.closest('.gm-welcome-btn') : null;
      if(!btn) return;
      ev.preventDefault();
      ev.stopPropagation();
      handleAction(btn.getAttribute('data-action') || 'close');
    }, true);

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && !ov.hidden) hide(true);
    }, true);

    // NEW: Settings -> Benvenuto
    // (attach after DOM exists; welcome.js is loaded at end of body in your index)
    try{
      var wbtn = document.getElementById('welcome-open-btn');
      if(wbtn){
        wbtn.addEventListener('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          openWelcomeManual();
        });
      }
    }catch(_){}

    // show rules: only once per device, and not on deep link
    try{
      var seen = localStorage.getItem('gm_welcome_seen') === '1';
      if(!seen && !hasDeepLink()){
        showTimer = setTimeout(show, 350);
      }
    }catch(_){
      if(!hasDeepLink()){
        showTimer = setTimeout(show, 350);
      }
    }
  }

  boot();

  // Optional: expose for debugging / future hooks
  window.gmOpenWelcome = openWelcomeManual;
})();