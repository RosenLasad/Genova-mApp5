

// PATCH: Legend toggle (help)

(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  ready(function(){
    var helpBox = document.getElementById('help-legend');
    var btn     = document.getElementById('help-fab');
    if(!helpBox || !btn) return;
    var closeBtn = helpBox.querySelector('.help-close');

    function openHelp(){ helpBox.classList.add('open'); btn.setAttribute('aria-expanded','true'); try{ localStorage.setItem('help_seen','1'); }catch(e){} }
    function closeHelp(){ helpBox.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    function toggleHelp(){ helpBox.classList.contains('open') ? closeHelp() : openHelp(); }

    btn.addEventListener('click', toggleHelp);
    if(closeBtn) closeBtn.addEventListener('click', closeHelp);

    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeHelp(); });
    document.addEventListener('click', function(e){
      if(!helpBox.classList.contains('open')) return;
      var inside = helpBox.contains(e.target) || btn.contains(e.target);
      if(!inside) closeHelp();
    });

    });
})();
