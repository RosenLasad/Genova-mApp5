
// Close Acquedotti menu when other toolbar icons are clicked (capture phase)
(function(){
  if (window.__acq_close_on_toolbar__) return; window.__acq_close_on_toolbar__ = true;
  function closeAcq(){ try{ var m = document.getElementById('acq-menu'); if(m) m.style.display='none'; }catch(e){} }
  function on(el){ if(!el) return; try{ el.addEventListener('click', closeAcq, true); }catch(e){} }
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  ready(function(){
    on(document.getElementById('walls-btn'));
    on(document.getElementById('legend-btn'));
    on(document.getElementById('btn-gps'));
    on(document.getElementById('btn-sub'));
    // If a top 'walls-btn-top' exists in some builds, capture it too.
    on(document.getElementById('walls-btn-top'));
  });
})();
