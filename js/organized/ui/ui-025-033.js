
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
      var rawClass = t.className;
      var cls = (typeof rawClass === 'string' ? rawClass : (rawClass && rawClass.baseVal) || '').toLowerCase();
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

;

(function(){
  function qs(sel,root){return (root||document).querySelector(sel);}
  var chip = document.querySelector('#legend .chip:nth-of-type(1)'); // safer selection: first chip is Scorci in this menu
  // Better: find chip containing 'Scorci'
  chip = (function(){
    var c = null;
    document.querySelectorAll('#legend .chip').forEach(function(x){
      if(/Scorci/.test(x.textContent||'')) c = x;
    });
    return c;
  })();
  var sub = document.getElementById('legend-blue-sublist');
  if(chip && sub){
    function toggle(e){
      try{ e && e.stopPropagation(); }catch(_){}
      var open = sub.style.display !== 'none';
      sub.style.display = open ? 'none' : 'block';
      var caret = chip.querySelector('.caret');
      if(caret) caret.textContent = open ? '▸' : '▾';
    }
    chip.addEventListener('click', toggle);
  }
})();

;

// Keep Scorci/blue markers OFF by default (no UI). Leave Documentari intact.
try{
  localStorage.setItem('legend_blue','0');
  var cb = document.getElementById('chk-blue-hidden');
  if(cb) cb.checked = false;
}catch(e){}

;

(function(){
  function domReady(cb){
    if(document.readyState === 'interactive' || document.readyState === 'complete'){ cb(); return; }
    document.addEventListener('DOMContentLoaded', cb, {once:true});
  }
  function txt(el){ return (el && el.textContent || '').trim().toLowerCase(); }

  domReady(function(){
    try{
      /* Documentari duplicates fixer removed */
    }catch(e){}
  });
})();

;

// removed legacy wireAcqStatic

;

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

;

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

;

(function(){
  if (window.__opere_btn__) return; window.__opere_btn__ = true;
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  ready(function(){
    var btn = document.getElementById('btn-opere');
    if(!btn) return;
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      try{ var m = document.getElementById('acq-menu'); if(m) m.style.display='none'; }catch(_){}
      try{ var w = document.getElementById('walls-menu'); if(w) w.style.display='none'; }catch(_){}
      // Placeholder: no dropdown yet. This is just the icon.
    }, true);
  });
})();

;

(function(){
  if (window.__opere_merge_v1__) return; window.__opere_merge_v1__ = true;
  function $(id){ return document.getElementById(id); }
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }

  ready(function(){
    var btn = $('btn-opere'), menu = $('opere-menu');
    var wallsMenu = $('walls-menu'), acqMenu = $('acq-menu');
    var wallsWrap = $('walls'), acqWrap = $('acq');
    var ow = $('opere-walls'), oa = $('opere-acq');
    if(!btn || !menu || !ow || !oa) return;

    // Build titles
    var wTitle = document.createElement('div');
    wTitle.style.fontWeight='600'; wTitle.style.margin='.2rem 0 .2rem 0'; wTitle.textContent='Mura';
    ow.appendChild(wTitle);
    var aTitle = document.createElement('div');
    aTitle.style.fontWeight='600'; aTitle.style.margin='.2rem 0 .2rem 0'; aTitle.textContent='Acquedotti';
    oa.appendChild(aTitle);

    // Move the original menu contents (not clones) so listeners stay attached
    function moveChildren(src, dst){
      if(!src || !dst) return;
      var nodes = Array.prototype.slice.call(src.childNodes);
      nodes.forEach(function(n){ dst.appendChild(n); });
    }
    moveChildren(wallsMenu, ow);
    moveChildren(acqMenu, oa);

    // Hide the original wrappers/buttons (keep in DOM to preserve code paths)
    [wallsWrap, acqWrap, $('walls-btn'), $('acq-btn'), wallsMenu, acqMenu].forEach(function(el){
      if(!el) return;
      el.style.display='none';
      el.style.pointerEvents='none';
      el.setAttribute('aria-hidden','true');
    });

    // Wiring: open/close Opere
    function toggleOpen(e){ if(e) e.stopPropagation(); menu.style.display = (menu.style.display==='block') ? 'none' : 'block'; }
    btn.addEventListener('click', toggleOpen, true);
    menu.addEventListener('click', function(e){ e.stopPropagation(); }, false);
    
    // Close when clicking elsewhere
    document.addEventListener('click', function(e){   if(!menu) return;   var t = e.target;   if(menu.contains(t) || (btn && btn.contains(t))) return;   menu.style.display='none'; }, true);

    // Close on Esc
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ menu.style.display='none'; } }, true);

    // When opening Opere, make sure legacy dropdowns are closed (if any style left)
    btn.addEventListener('click', function(){
      try{ if(wallsMenu) wallsMenu.style.display='none'; }catch(_){}
      try{ if(acqMenu) acqMenu.style.display='none'; }catch(_){}
    }, true);
  });
})();

