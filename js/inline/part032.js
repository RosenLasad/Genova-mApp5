
(function(){
  if (window.__opere_btn__) return; window.__opere_btn__ = true;
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  ready(function(){
    var btn = document.getElementById('btn-opere');
    if(!btn) return;
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      try{ var m = document.getElementById('acq-menu'); if(m) m.style.display='none'; }catch(_){}
      try{ var w = document.getElementById('walls-menu'); if(w) w.style.display='none'; }catch(_){}
      // Placeholder: no dropdown yet. This is just the icon.
    }, true);
  });
})();
