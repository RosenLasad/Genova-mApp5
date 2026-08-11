
// Close Mura menu when clicking the Acquedotti toolbar icon (capture phase)
(function(){
  if (window.__walls_close_on_acq__) return; window.__walls_close_on_acq__ = true;
  function closeWalls(){ try{ var m = document.getElementById('walls-menu'); if(m) m.style.display='none'; }catch(e){} }
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  ready(function(){
    var acqBtn = document.getElementById('acq-btn');
    if(acqBtn){
      acqBtn.addEventListener('click', function(){ closeWalls(); }, true);
    }
  });
})();
