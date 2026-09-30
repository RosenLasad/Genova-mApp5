
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
