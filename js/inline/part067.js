
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-darsena'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['darsena']){ try{ map.removeLayer(QR['darsena']); }catch(e){} try{ QR['darsena']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
