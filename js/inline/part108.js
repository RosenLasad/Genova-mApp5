
/* PATCH: Home → Storia → Mura = comportati come la voce "Mura" nella toolbar Storia (solo toggle elenco) */
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else cb(); }

  function clickToolbarStoria(){
    try{
      var el = document.getElementById('btn-opere')
            || document.getElementById('btn-storia')
            || document.querySelector('[data-action="storia"], .toolbar [title="Storia"], .toolbar button[aria-label="Storia"]');
      if(el && typeof el.click==='function') el.click();
    }catch(_){}
  }

  function findSectionToggleByTitle(title){
    var secList = document.querySelectorAll('#opere-menu .opere-accordion .acc-section, #opere-menu .acc-section');
    for(var i=0;i<secList.length;i++){
      var sec = secList[i];
      var titleEl = sec.querySelector('.acc-title');
      if(titleEl && titleEl.textContent.trim().toLowerCase() === title.toLowerCase()){
        return sec.querySelector('.acc-head') || titleEl;
      }
    }
    return null;
  }

  function findWallsToggle(){
    // First try by title "Mura"
    var t = findSectionToggleByTitle('mura');
    if(t) return t;
    // Fallback explicit markers if any
    return document.querySelector('#opere-menu [data-role="walls-toggle"]') || document.getElementById('opere-walls-toggle');
  }

  function ensureWallsToggle(then){
    var tries = 0;
    (function tick(){
      var tgl = findWallsToggle();
      if(tgl){ then(tgl); return; }
      if(++tries < 60) setTimeout(tick, 100);
    })();
  }

  function openStoriaAndToggleMura(){
    clickToolbarStoria();
    ensureWallsToggle(function(tgl){
      if(typeof tgl.click === 'function') tgl.click();
    });
  }

  ready(function(){
    document.addEventListener('click', function(e){
      var t = e.target;
      var btn = t && (t.id === 'st-mura' ? t : (t.closest && t.closest('#st-mura')));
      if(!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      openStoriaAndToggleMura();
    }, true);
  });
})();
