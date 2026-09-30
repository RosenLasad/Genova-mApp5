
(function(){
  var GAP = 8;
  var SAFE = { top: 10, right: 12, bottom: 12, left: 12 };

  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  function measure(el){
    // Ensure we can measure even if it's hidden
    var prevVis = el.style.visibility;
    var prevDisp = el.style.display;
    var needTemp = !el.classList.contains('open') || getComputedStyle(el).display === 'none';
    if(needTemp){
      el.style.visibility = 'hidden';
      el.style.display = 'block';
    }
    var w = el.offsetWidth, h = el.offsetHeight;
    if(needTemp){
      el.style.display = prevDisp || '';
      el.style.visibility = prevVis || '';
    }
    return {w:w, h:h};
  }

  function positionHelpLegend(){
    var box = document.getElementById('help-legend');
    var btn = document.getElementById('help-fab');
    if(!box || !btn) return;

    var br = btn.getBoundingClientRect();
    var size = measure(box);
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    // Preferred: ABOVE the button, left-aligned to button
    var top  = br.top - size.h - GAP;
    var left = br.left;

    // If not enough space above, place BELOW
    if(top < SAFE.top){
      top = br.bottom + GAP;
    }

    // Keep inside left/right margins
    left = clamp(left, SAFE.left, vw - size.w - SAFE.right);

    // If overflows bottom, shift up
    if(top + size.h > vh - SAFE.bottom){
      top = Math.max(SAFE.top, vh - size.h - SAFE.bottom);
    }

    // Apply
    box.style.position = 'fixed';
    box.style.left = Math.round(left) + 'px';
    box.style.top  = Math.round(top)  + 'px';
    box.style.right = '';
    box.style.bottom = '';
    box.style.zIndex = (box.style.zIndex || 10000);
    box.style.transform = '';
  }

  function onOpenIfVisible(){
    var box = document.getElementById('help-legend');
    if(!box) return;
    if(box.classList.contains('open')){
      // Position after layout updates
      setTimeout(positionHelpLegend, 0);
    }
  }

  function bind(){
    var box = document.getElementById('help-legend');
    var btn = document.getElementById('help-fab');
    if(!box || !btn) return;

    // Reposition when clicking the button (after toggle)
    btn.addEventListener('click', function(){ setTimeout(positionHelpLegend, 0); }, false);

    // Observe class changes on the box to catch programmatic opens
    var mo = new MutationObserver(function(muts){
      for(var i=0;i<muts.length;i++){
        if(muts[i].attributeName === 'class'){ onOpenIfVisible(); }
      }
    });
    mo.observe(box, { attributes: true });

    // Keep it anchored on resize/scroll
    window.addEventListener('resize', onOpenIfVisible);
    window.addEventListener('scroll', onOpenIfVisible, { passive: true });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  }else{
    bind();
  }
})();
