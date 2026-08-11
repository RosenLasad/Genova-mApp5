
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-castello'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['castello']){ try{ map.removeLayer(QR['castello']); }catch(e){} try{ QR['castello']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
