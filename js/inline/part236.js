
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-molo'); if(!chk) return;
    function nuke(){
      try{
        if (window.QR && QR['molo']) {
          try{ map.removeLayer(QR['molo']); }catch(e){}
          try{ QR['molo'] = null; }catch(e){}
        }
      }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
