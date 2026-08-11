
(function(){
  function ready(fn){
    if(document.readyState === 'complete' || document.readyState === 'interactive'){ fn(); }
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }
  ready(function(){
    var btn = document.querySelector('#qt-cat-passato .qt-cat-items .qt-qr');
    if(!btn) return;

    function masterChk(){ return document.getElementById('chk-qr-all'); }
    function toolbarBtn(){
      return document.querySelector('[data-action="toggle-qr"], #btn-qr, .btn-qr, button[title*="Mostra QR"], button[title*="QR"]');
    }

    function syncFromMaster(){
  var m = masterChk();
  if(m){
    var on = !!m.checked;
    // sincronizza il quick toggle QR nel pannello Passato
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');

    // sincronizza anche il chip "Punti QR" nel bubble STORIA (menu Home)
    try{
      var home = document.getElementById('menu-home') || document.querySelector('.menu-home');
      if(home){
        var chip = home.querySelector('.mh-bubble.theme-red .mh-actions .mh-btn[data-shortcut="qr"]');
        if(chip){
          chip.classList.toggle('mh-chip-on', on);
        }
      }
    }catch(e){}

    // avvisa comunque lo script generico dei bubble (per sicurezza)
    try{
      document.dispatchEvent(new CustomEvent('qt:sync-bubbles'));
    }catch(e){}
  }
}


    // Click handler: prefer toggling the master checkbox so the existing logic runs
    
btn.addEventListener('click', function(ev){
  ev.preventDefault();
  ev.stopPropagation();
  var m = masterChk();
  if(m){
    m.checked = !m.checked;
    var evChange = new Event('change', {bubbles:true});
    m.dispatchEvent(evChange);
    setTimeout(syncFromMaster, 0);
    return;
  }
  var tb = toolbarBtn();
  if(tb){
    // Try change on an associated checkbox if the toolbar uses one
    var chk = tb.matches('input[type="checkbox"]') ? tb : tb.querySelector('input[type="checkbox"]');
    if(chk){
      chk.checked = !chk.checked;
      var evCh = new Event('change', {bubbles:true});
      chk.dispatchEvent(evCh);
    }else{
      // As a last option, simulate click but guard by stopping propagation here
      tb.click();
    }
    setTimeout(syncFromMaster, 0);
    return;
  }
  try{
    if(typeof window.toggleQR === 'function'){ window.toggleQR(); setTimeout(syncFromMaster, 0); return; }
    if(typeof window.__qrToggleAll === 'function'){ window.__qrToggleAll(); setTimeout(syncFromMaster, 0); return; }
  }catch(_){}
}); 
// Keep in sync if the user toggles from the toolbar/master
    var m = masterChk();
    if(m){
      m.addEventListener('change', syncFromMaster);
      // initial paint
      syncFromMaster();
    }else{
      // no master? ensure a sane default
      btn.setAttribute('aria-pressed','false');
    }
  });
})();
