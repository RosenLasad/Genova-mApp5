
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
