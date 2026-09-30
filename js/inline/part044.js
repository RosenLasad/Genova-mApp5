
(function(){
  function whenReady(fn){
    if (document.readyState === 'complete') fn();
    else window.addEventListener('load', fn);
  }
  whenReady(function(){
    var chk = document.getElementById('chk-qr-piazza-de-ferrari');
    if(!chk) return;
    function nuke(){
      try{
        if (window.QR && QR['piazza_de_ferrari']) {
          try{ map.removeLayer(QR['piazza_de_ferrari']); }catch(e){}
          try{ QR['piazza_de_ferrari'] = null; }catch(e){}
        }
      }catch(e){}
    }
    // Run on change, and also shortly after (in case legacy handler runs later)
    chk.addEventListener('change', function(){
      setTimeout(nuke, 0);
      setTimeout(nuke, 50);
      setTimeout(nuke, 150);
    });
    // Also heal after zooms or layer changes
    if (window.map && map.on){
      map.on('zoomend layeradd layerremove', function(){ setTimeout(nuke, 0); });
    }
    // One initial cleanup
    setTimeout(nuke, 200);
  });
})();
