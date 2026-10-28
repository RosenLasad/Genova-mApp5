
(function(){
  // Make "Mostra tutto" in the new Storia menu control all child checkmarks for Mura/Acquedotti/Documentari
  function bindSectionAll(section){
    var all = document.getElementById('storia-' + section + '-all');
    var host = document.getElementById('storia-' + section + '-items');
    if(!all || !host) return;

    function items(){
      return Array.from(host.querySelectorAll('label .st-label')).map(function(span){
        var lab = span.closest('label'); if(!lab) return null;
        var cb = lab.querySelector('input[type="checkbox"]'); return cb || null;
      }).filter(Boolean);
    }

    function updateAll(){
      var cs = items();
      var total = cs.length;
      var on = cs.filter(function(c){ return !!c.checked; }).length;
      all.indeterminate = (on > 0 && on < total);
      all.checked = (total > 0 && on === total);
    }

    all.addEventListener('change', function(){
      var cs = items();
      var want = !!all.checked;
      cs.forEach(function(c){
        if(!!c.checked !== want){ c.click(); }  // click to respect each row's binding to legacy checkbox
      });
      updateAll();
    });

    // keep "Mostra tutto" in sync when individual items change
    var cs0 = items();
    cs0.forEach(function(c){ c.addEventListener('change', updateAll); });
    updateAll();

    // If future items are added dynamically, observe and rebind
    try{
      new MutationObserver(function(){
        var cs = items();
        cs.forEach(function(c){ c.removeEventListener('change', updateAll); c.addEventListener('change', updateAll); });
        updateAll();
      }).observe(host, {childList:true, subtree:true});
    }catch(_){}
  }

  function bootAll(){
    ['mura','acquedotti','doc'].forEach(bindSectionAll);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootAll);
  else bootAll();
})();

;

(function(){
  // Non ci fidiamo del markup: alcune toolbar vengono costruite via JS.
  var LABELS = [
    "storia","history","historia","histoire",
    "история","تاريخ","历史"
  ];

  function looksLikeStoria(el){
    if(!el) return false;
    var s = [
      el.id||"",
      el.className||"",
      el.getAttribute && (el.getAttribute("data-tool")||""),
      el.getAttribute && (el.getAttribute("title")||""),
      el.getAttribute && (el.getAttribute("aria-label")||""),
      (el.textContent||"")
    ].join(" ").toLowerCase();
    // match parole intere dove possibile, ma accettiamo anche substring per sicurezza
    return LABELS.some(function(w){ return s.indexOf(w) !== -1; });
  }

  function removeOnce(){
  try{
    var root = document.querySelector("header") || document.body;
    if(!root) return false;

    var nodes = Array.prototype.slice.call(
      root.querySelectorAll(".toolbar button, .toolbar [role='button'], .toolbar .tool, header button, header [role='button']")
    );

    var target = null;
    for (var i = 0; i < nodes.length; i++){
      if (looksLikeStoria(nodes[i])){
        target = nodes[i];
        break;
      }
    }

    if (target && target.parentNode){
      target.parentNode.removeChild(target);
      return true;
    }
  }catch(_){}

  return false;
}


  function arm(){
    // prova subito
    removeOnce();
    // e poi osserva, perché certe toolbar compaiono dopo
    try{
      var obs = new MutationObserver(function(){
        removeOnce();
      });
      obs.observe(document.documentElement, {childList:true, subtree:true});
    }catch(_){}
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", arm);
  else arm();
})();

;

(function(){
  function setHeaderH(){
    var h = document.querySelector('header');
    if(!h) return;
    document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
  }
  window.addEventListener('load', setHeaderH);
  window.addEventListener('resize', setHeaderH);
  setHeaderH();
})();

;

(function(){
  var b = document.getElementById('btn-opere');
  if(b){
    b.setAttribute('aria-hidden','true');
    b.setAttribute('tabindex','-1');
    b.style.display='none';
    b.style.pointerEvents='none';
    b.addEventListener('click', function(e){ e.stopImmediatePropagation(); }, true);
    b.addEventListener('pointerdown', function(e){ e.stopImmediatePropagation(); }, true);
  }
})();

