
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
