
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-quinto'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['quinto']){ try{ map.removeLayer(QR['quinto']); }catch(e){} try{ QR['quinto']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
