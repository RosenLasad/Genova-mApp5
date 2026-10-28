
(function(){
  var btn  = document.getElementById('routes-btn');
  var menu = document.getElementById('routes-menu');
  if(!btn || !menu) return;

  function initAccordion(){
    if(menu.getAttribute('data-accordion-init') === '1') return;
    menu.setAttribute('data-accordion-init','1');

    var sections = menu.querySelectorAll('.acc-section');
    sections.forEach(function(sec){
      var head = sec.querySelector('.acc-head');
      var body = sec.querySelector('.acc-body');
      var chev = sec.querySelector('.acc-chevron');
      if(!head || !body) return;

      // stato iniziale sempre aperto
      body.style.display = 'block';
      sec.setAttribute('aria-expanded','true');
      if(chev) { chev.style.transform = 'rotate(90deg)'; }

      // disabilita toggle
      head.addEventListener('click', function(ev){
        ev.stopPropagation();
        if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      }, true);

      head.addEventListener('keydown', function(e){
        if(e.key==='Enter' || e.key===' '){
          e.preventDefault();
          e.stopPropagation();
          if(e.stopImmediatePropagation) e.stopImmediatePropagation();
        }
      }, true);
    });
  }

  function isOpen(){
    return menu.style.display !== 'none';
  }
  function openMenu(){
    menu.style.display = 'block';
    btn.setAttribute('aria-expanded','true');
    initAccordion();
    if (typeof window.updateRoutesMenuLabels === 'function'){
      try { window.updateRoutesMenuLabels(); } catch(e){}
    }
  }
  function closeMenu(){
    menu.style.display = 'none';
    btn.setAttribute('aria-expanded','false');
  }
  function toggleMenu(){
    if(isOpen()) closeMenu(); else openMenu();
  }

  btn.setAttribute('aria-haspopup','true');
  btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  }, true);

  // chiudi cliccando fuori
  document.addEventListener('click', function(e){
    if(!isOpen()) return;
    var flagRail = document.getElementById('flag-rail');
    var insideLang = flagRail && flagRail.contains(e.target);
    var inside = menu.contains(e.target) || btn.contains(e.target) || insideLang;
    if(!inside) closeMenu();
  }, true);

  // chiudi con ESC
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && isOpen()) closeMenu();
  }, true);
})();

;

(function(){
  function doRefresh(){
    if (window.refreshRoutePopups){
      try { window.refreshRoutePopups(); } catch(e){ /* meh */ }
    }
  }

  // 1) Osserva cambi dell'attributo lang su <html lang="...">
  try {
    var htmlEl = document.documentElement;
    var mo = new MutationObserver(function(muts){
      for (var i=0;i<muts.length;i++){
        var m = muts[i];
        if (m.type === 'attributes' && m.attributeName === 'lang'){
          doRefresh();
          break;
        }
      }
    });
    mo.observe(htmlEl, { attributes:true, attributeFilter:['lang'] });
  } catch(e){ /* non piangiamo */ }

  

  // 3) Fallback: se l'app salva la lingua su localStorage('lang'), rileva cambi periodici
  (function(){
    var last = null;
    try { last = localStorage.getItem('lang'); } catch(e){ last = null; }
    setInterval(function(){
      var cur = null;
      try { cur = localStorage.getItem('lang'); } catch(e){ cur = null; }
      if (cur !== last){
        last = cur;
        doRefresh();
      }
    }, 600);
  })();
})();

