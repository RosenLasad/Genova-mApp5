
(function(){
  const FAB_ID = 'map-qr-fab';

  function ensureFab(mapEl){
    let btn = document.getElementById(FAB_ID);
    if(!btn){
      btn = document.createElement('button');
      btn.id = FAB_ID;
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Apri scanner QR');
      btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">        <path fill="currentColor" d="M3 3h6v2H5v4H3V3zm12 0h6v6h-2V5h-4V3zM3 15h2v4h4v2H3v-6zm16 0h2v6h-6v-2h4v-4zM7 7h10v2H7V7zm0 4h6v2H7v-2z"/>      </svg>';
      mapEl.appendChild(btn);

      function openScanner(){
        const card = document.getElementById('qr-scan');
        if(card && window.__qr_open) window.__qr_open();
      }
      btn.addEventListener('click', openScanner);
      btn.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openScanner(); }
      });
      btn.addEventListener('mousedown', function(e){ e.stopPropagation(); }, true);
      btn.addEventListener('touchstart', function(e){ e.stopPropagation(); }, {passive:true, capture:true});
    }
    return btn;
  }

  function initFab(){
    const mapEl = document.getElementById('map');
    if(!mapEl){ requestAnimationFrame(initFab); return; }
    ensureFab(mapEl);
  }
  requestAnimationFrame(initFab);
})();
