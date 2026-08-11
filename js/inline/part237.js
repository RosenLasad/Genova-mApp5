
(function(){
  document.addEventListener('click', function(e){
    var t = e.target;
    var btn = t && (t.id === 'st-mura' ? t : (t.closest && t.closest('#st-mura')));
    if(!btn) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    if(typeof openStoriaMuraAllOnly === 'function') openStoriaMuraAllOnly();
  }, true);
})();
