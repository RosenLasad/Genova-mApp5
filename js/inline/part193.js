
(function(){
  // Mantieni APERTO il menu quando si clicca dentro il pannello Mura/Acquedotti/Doc
  function keepStoriaMenuOpen(){
    var menu = document.getElementById('storia-menu');
    if(!menu) return;
    ['pointerdown','mousedown','click'].forEach(function(ev){
      menu.addEventListener(ev, function(e){
        // Se il click è dentro il menu (voci, pannelli, righe), non farlo “uscire”
        if (e.target.closest('.st-panel') || e.target.closest('.st-items') || e.target.closest('.st-row')) {
          e.stopPropagation();
        }
      }, true); // fase capture: prima degli handler globali
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', keepStoriaMenuOpen);
  } else {
    keepStoriaMenuOpen();
  }
})();
