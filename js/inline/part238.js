
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else cb(); }
  function clickToolbarStoria(){
    try{
      var menu = document.getElementById('opere-menu');
      var needOpen = !menu || (getComputedStyle(menu).display==='none');
      if(needOpen){ var el = document.getElementById('btn-opere') || document.getElementById('btn-storia') || document.querySelector('[data-action="storia"], .toolbar [title="Storia"], .toolbar button[aria-label="Storia"]'); if(el && typeof el.click==='function') el.click(); }
    }catch(_){}
  }
  function findWallAll(){ return document.querySelector('#storia-mura-all'); }
  function ensureWallAll(then){
    var tries = 0;
    (function tick(){
      var el = findWallAll();
      if(el){ then(el); return; }
      if(++tries < 80) setTimeout(tick, 100);
    })();
  }
  function openStoriaMuraAllOnly(){
    ensureWallAll(function(chk){
      chk.checked = !chk.checked;
        try{ chk.dispatchEvent(new Event('change', {bubbles:true})); }catch(_){ var ev=document.createEvent('Event'); ev.initEvent('change', true, true); chk.dispatchEvent(ev); }
    });
  }
  window.openStoriaMuraAllOnly = openStoriaMuraAllOnly;
})();
