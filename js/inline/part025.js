
(function(){
  if (window.__legendSafeCloseV2__) return; window.__legendSafeCloseV2__ = true;

  function isVisible(el){
    try{ return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); }catch(e){ return false; }
  }
  function within(el, container){
    if(!el || !container) return false;
    var n = el;
    while(n){
      if(n === container) return true;
      n = n.parentElement;
    }
    return false;
  }

  function init(){
    var btn = document.getElementById('legend-btn');
    var menu = document.getElementById('legend-menu') || document.getElementById('legend');
    if(!btn || !menu) return false;

    function closeLegendIfOpen(){
      if(isVisible(menu)){
        try{ btn.click(); }catch(e){ /* fallback hide */ try{ menu.style.display='none'; }catch(_){} }
      }
    }

    // Close on map interactions
    var mapEl = document.querySelector('.leaflet-container');
    if(mapEl){
      ['click','mousedown','touchstart'].forEach(function(t){
        mapEl.addEventListener(t, function(){ closeLegendIfOpen(); }, true);
      });
    }

    // Close on clicks on any clickable control outside the legend itself
    document.addEventListener('click', function(ev){
      var t = ev.target;
      // ignore clicks on the legend button or inside the legend menu
      if (t === btn || within(t, btn) || within(t, menu)) return;
      // Also ignore clicks inside flag switcher/menu
      var flagBtn = document.getElementById('flag-switcher');
      var flagMenu = document.getElementById('flag-menu');
      if ((flagBtn && (t===flagBtn || (typeof within==='function' && within(t, flagBtn)))) || (flagMenu && (t===flagMenu || (typeof within==='function' && within(t, flagMenu))))) return;

      // If click is on a candidate control (button/link/role=button)
      var tag = t.tagName;
      var role = (t.getAttribute && t.getAttribute('role')) || '';
      var cls = (t.className || '').toLowerCase();
      var clickable = tag === 'BUTTON' || tag === 'A' || role === 'button' || cls.includes('btn') || typeof t.onclick === 'function';
      if (clickable) closeLegendIfOpen();
    }, true);

    return true;
  }

  var tries = 0;
  (function tick(){
    tries++;
    if(init()) return;
    if(tries < 40) setTimeout(tick, 300);
  })();
})();
