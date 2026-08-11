
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

    // Bindings
    btn.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); toggleHelp(); }, true);
    if(closeBtn) closeBtn.addEventListener('click', function(e){ e.preventDefault(); closeHelp(); }, true);

    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeHelp(); });
    document.addEventListener('click', function(e){
      if(!helpBox.classList.contains('open')) return;
      var flagBtn = document.getElementById('flag-switcher');
      var flagMenu = document.getElementById('flag-menu');
      var inside = helpBox.contains(e.target) || btn.contains(e.target) ||
                   (flagBtn && (flagBtn===e.target || flagBtn.contains(e.target))) ||
                   (flagMenu && (flagMenu===e.target || flagMenu.contains(e.target)));
      if(!inside) closeHelp();
    });

    // Nessun auto-open
// var seen = false; try { seen = localStorage.getItem('help_seen') === '1'; } catch(e){}
// if(!seen) openHelp();

  });
})();
