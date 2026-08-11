
(function(){
  function intercept(id, handler){
    document.addEventListener('click', function(e){
      var t = e.target;
      var btn = t && (t.id === id ? t : (t.closest && t.closest('#'+id)));
      if(!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      handler();
    }, true); // capture: before legacy handlers
  }
  // Hook MiniDoc/Mura/Acquedotti without opening toolbar
  if (typeof openStoriaDocAllOnly === 'function'){
    intercept('st-minidoc', openStoriaDocAllOnly);
  }
  if (typeof openStoriaMuraAllOnly === 'function'){
    intercept('st-mura', openStoriaMuraAllOnly);
  }
  if (typeof openStoriaAcqAllOnly === 'function'){
    intercept('st-acquedotti', openStoriaAcqAllOnly);
  }
})();
