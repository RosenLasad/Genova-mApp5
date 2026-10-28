
/* === Place quick-toggles below the Home button === */
(function(){
  function getHomeEl(){
    // Try known selectors
    var sels = ['.map-home-button', '#map-home-button', '.btn-home', '#btn-home', '.home-btn', '#home-btn', '[data-role="home-button"]'];
    for (var i=0;i<sels.length;i++){
      var el = document.querySelector(sels[i]);
      if (el) return el;
    }
    // Fallback: find a floating button with aria-label containing 'Home'
    var nodes = document.querySelectorAll('button, a');
var guess = null;
for (var i = 0; i < nodes.length; i++){
  var n = nodes[i];
  var l = ((n.getAttribute('aria-label') || n.title || '') + '').toLowerCase();
  if (l.indexOf('home') !== -1 || l.indexOf('inizio') !== -1 || l.indexOf('reset vista') !== -1){
    guess = n;
    break;
  }
}
return guess || null;

    return guess || null;
  }

  function positionDock(){
    var dock = document.getElementById('quick-toggles');
    if (!dock) return;
    var home = getHomeEl();
    if (home){
      var r = home.getBoundingClientRect();
      var topPx = r.bottom + 10; // 10px below Home
      // Translate viewport coords to page coords considering scrollY
      dock.style.top = (topPx + window.scrollY) + 'px';
    }else{
      // If we can't find Home, fall back to 150px below top-right toolbar baseline
      dock.style.top = '250px';
    }
  }

  // Reposition on load and on resize/zoom orientation change
  var tries=0, max=60;
  var iv = setInterval(function(){
    var dockReady = document.getElementById('quick-toggles');
    if (dockReady){
      clearInterval(iv);
      positionDock();
      window.addEventListener('resize', positionDock, {passive:true});
      window.addEventListener('orientationchange', positionDock);
      // If map resizes, also reposition
      if (typeof map !== 'undefined' && map && typeof map.on === 'function') {
        map.on('resize', positionDock);
      }
    }
    if (++tries>=max) clearInterval(iv);
  }, 150);
})();

;

/* PATCH: Home → Storia → Acquedotti = comportati come la voce "Acquedotti" nella toolbar Storia (solo toggle elenco) */
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else cb(); }

  function clickToolbarStoria(){
    try{
      var el = document.getElementById('btn-opere')
            || document.getElementById('btn-storia')
            || document.querySelector('[data-action="storia"], .toolbar [title="Storia"], .toolbar button[aria-label="Storia"]');
      if(el && typeof el.click==='function') el.click();
    }catch(_){}
  }

  function findSectionToggle(title){
    var secList = document.querySelectorAll('#opere-menu .opere-accordion .acc-section, #opere-menu .acc-section');
    for(var i=0;i<secList.length;i++){
      var sec = secList[i];
      var titleEl = sec.querySelector('.acc-title');
      if(titleEl && titleEl.textContent.trim().toLowerCase() === title.toLowerCase()){
        return sec.querySelector('.acc-head') || titleEl;
      }
    }
    // fallback explicit markers if any
    return document.querySelector('#opere-menu [data-role="acq-toggle"]') || document.getElementById('opere-acq-toggle');
  }

  function ensureSectionToggle(title, then){
    var tries = 0;
    (function tick(){
      var t = findSectionToggle(title);
      if(t){ then(t); return; }
      if(++tries < 60) setTimeout(tick, 100);
    })();
  }

  function openStoriaAndToggleAcq(){
    clickToolbarStoria();
    ensureSectionToggle('Acquedotti', function(tgl){
      if(typeof tgl.click === 'function') tgl.click();
    });
  }

  ready(function(){
    document.addEventListener('click', function(e){
      var t = e.target;
      var btn = t && (t.id === 'st-acquedotti' ? t : (t.closest && t.closest('#st-acquedotti')));
      if(!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      openStoriaAndToggleAcq();
    }, true);
  });
})();

;

/* PATCH: Home → Storia → Mura = comportati come la voce "Mura" nella toolbar Storia (solo toggle elenco) */
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else cb(); }

  function clickToolbarStoria(){
    try{
      var el = document.getElementById('btn-opere')
            || document.getElementById('btn-storia')
            || document.querySelector('[data-action="storia"], .toolbar [title="Storia"], .toolbar button[aria-label="Storia"]');
      if(el && typeof el.click==='function') el.click();
    }catch(_){}
  }

  function findSectionToggleByTitle(title){
    var secList = document.querySelectorAll('#opere-menu .opere-accordion .acc-section, #opere-menu .acc-section');
    for(var i=0;i<secList.length;i++){
      var sec = secList[i];
      var titleEl = sec.querySelector('.acc-title');
      if(titleEl && titleEl.textContent.trim().toLowerCase() === title.toLowerCase()){
        return sec.querySelector('.acc-head') || titleEl;
      }
    }
    return null;
  }

  function findWallsToggle(){
    // First try by title "Mura"
    var t = findSectionToggleByTitle('mura');
    if(t) return t;
    // Fallback explicit markers if any
    return document.querySelector('#opere-menu [data-role="walls-toggle"]') || document.getElementById('opere-walls-toggle');
  }

  function ensureWallsToggle(then){
    var tries = 0;
    (function tick(){
      var tgl = findWallsToggle();
      if(tgl){ then(tgl); return; }
      if(++tries < 60) setTimeout(tick, 100);
    })();
  }

  function openStoriaAndToggleMura(){
    clickToolbarStoria();
    ensureWallsToggle(function(tgl){
      if(typeof tgl.click === 'function') tgl.click();
    });
  }

  ready(function(){
    document.addEventListener('click', function(e){
      var t = e.target;
      var btn = t && (t.id === 'st-mura' ? t : (t.closest && t.closest('#st-mura')));
      if(!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      openStoriaAndToggleMura();
    }, true);
  });
})();

