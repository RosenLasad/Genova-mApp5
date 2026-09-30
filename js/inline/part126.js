
(function(){
  function clickToolbarStoria(){
    try{
      var menu = document.getElementById('opere-menu');
      var needOpen = !menu || (getComputedStyle(menu).display==='none');
      if(needOpen){ var el = document.getElementById('btn-opere') || document.getElementById('btn-storia') || document.querySelector('[data-action="storia"], .toolbar [title="Storia"], .toolbar button[aria-label="Storia"]'); if(el && typeof el.click==='function') el.click(); }
    }catch(_){}
  }
  function findAcqAll(){ return document.querySelector('#storia-acquedotti-all'); }
  function ensureAcqAll(then){
    var tries = 0;
    (function tick(){
      var el = findAcqAll();
      if(el){ then(el); return; }
      if(++tries < 80) setTimeout(tick, 100);
    })();
  }
  function openStoriaAcqAllOnly(){
    ensureAcqAll(function(chk){
      chk.checked = !chk.checked;
        try{ chk.dispatchEvent(new Event('change', {bubbles:true})); }catch(_){ var ev=document.createEvent('Event'); ev.initEvent('change', true, true); chk.dispatchEvent(ev); }
    });
  }
  // High-priority click handler to prevent other handlers from opening the list
  document.addEventListener('click', function(e){
    var t = e.target;
    var btn = t && (t.id === 'st-acquedotti' ? t : (t.closest && t.closest('#st-acquedotti')));
    if(!btn) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    openStoriaAcqAllOnly();
  }, true);
})();
