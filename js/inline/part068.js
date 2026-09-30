
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-pcaricamento'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['pcaricamento']){ try{ map.removeLayer(QR['pcaricamento']); }catch(e){} try{ QR['pcaricamento']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
