
(function(){
  function isMobile(){
    return window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  }

  function boot(){
    var header = document.querySelector('header');
    var center = header && header.querySelector('.toolbar-center');
    var wrap   = document.getElementById('tb-search');
    var input  = document.getElementById('tb-search-input');
    if(!header || !center || !wrap || !input) return;

    // evita doppioni
    if(document.getElementById('tb-search-btn')) return;

    // crea bottone lente
    var btn = document.createElement('button');
    btn.id = 'tb-search-btn';
    btn.type = 'button';
    btn.className = 'btn';
    btn.setAttribute('aria-label', 'Cerca');
    btn.setAttribute('title', 'Cerca');
    btn.innerHTML =
      '<span class="sr-only">Cerca</span>' +
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '  <path d="M10 18a8 8 0 1 1 6.32-3.1l4.39 4.39-1.42 1.42-4.39-4.39A7.96 7.96 0 0 1 10 18Zm0-2a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" fill="currentColor"/>' +
      '</svg>';

    // metti il bottone in toolbar-center (prima della search “vera”)
    center.insertBefore(btn, wrap);

    function openPanel(){
      header.classList.add('tb-search-open');
      // focus dopo il layout
      setTimeout(function(){ try{ input.focus(); }catch(_){ } }, 0);
    }
    function closePanel(){
      header.classList.remove('tb-search-open');
    }
    function togglePanel(){
      if(header.classList.contains('tb-search-open')) closePanel();
      else openPanel();
    }

    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      if(isMobile()) togglePanel();
      else { try{ input.focus(); }catch(_){ } }
    });

    // chiudi cliccando fuori (solo mobile)
    document.addEventListener('pointerdown', function(e){
      if(!isMobile()) return;
      if(!header.classList.contains('tb-search-open')) return;
      var t = e.target;
      if(t && t.closest && (t.closest('#tb-search') || t.closest('#tb-search-btn'))) return;
      closePanel();
    }, true);

    // ESC chiude
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closePanel();
    }, true);

    // se ruoti / allarghi, chiudi per evitare stati strani
    window.addEventListener('resize', function(){
      if(!isMobile()) closePanel();
    }, {passive:true});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
