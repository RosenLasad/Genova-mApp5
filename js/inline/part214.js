
(function(){
  function ready(fn){
    if(document.readyState === 'complete' || document.readyState === 'interactive'){ fn(); }
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }
  ready(function(){
    var btn = document.querySelector('#qt-cat-passato .qt-cat-items .qt-mura-all');
    if(!btn) return;

    // Try to find a master checkbox/button for "Mostra tutto" in Mura (Storia toolbar)
    function masterChk(){
      return document.querySelector('#chk-mura-all, input[type="checkbox"][id*="mura"][id*="all"], input[type="checkbox"][name*="mura"][name*="all"]');
    }
    function masterBtn(){
      // common candidates
      var c = document.querySelector('[data-action*="mura"][data-action*="all"], #btn-mura-all, .btn-mura-all');
      if(c) return c;
      // text-based fallback within Storia or Mura sections
      var candidates = Array.from(document.querySelectorAll('button, a'));
      for(var i=0;i<candidates.length;i++){
        var t = (candidates[i].textContent||'').trim().toLowerCase();
        if(/mostra tutto/.test(t)){
          var el = candidates[i];
          var anc = el.closest('[id*="mura"],[class*="mura"],[data-cat*="mura"],[data-section*="mura"],[id*="storia"],[class*="storia"]');
          if(anc){ return el; }
        }
      }
      return null;
    }

    function syncFromMaster(){
      var m = masterChk();
      if(m){
        btn.setAttribute('aria-pressed', m.checked ? 'true' : 'false');
      }
    }

    // Click: keep panel open and toggle master state
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
      var b = masterBtn();
      if(b){
        // If the button has an associated checkbox inside, prefer change
        var chk = b.matches('input[type="checkbox"]') ? b : b.querySelector('input[type="checkbox"]');
        if(chk){
          chk.checked = !chk.checked;
          var evCh = new Event('change', {bubbles:true}); chk.dispatchEvent(evCh);
        }else{
          // last resort: programmatic click; shouldn't close the panel since it doesn't bubble from user interaction
          b.click();
        }
        setTimeout(syncFromMaster, 0);
        return;
      }
      // Globals fallback
      try{
        if(typeof window.__muraToggleAll === 'function'){ window.__muraToggleAll(); setTimeout(syncFromMaster, 0); return; }
        if(typeof window.toggleMuraAll === 'function'){ window.toggleMuraAll(); setTimeout(syncFromMaster, 0); return; }
      }catch(_){}
    });

    // Listen to master changes to stay in sync
    var m = masterChk();
    if(m){
      m.addEventListener('change', syncFromMaster);
      syncFromMaster();
    }else{
      // default state
      btn.setAttribute('aria-pressed','false');
    }
  });
})();
