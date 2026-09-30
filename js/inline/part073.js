
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-marassi'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['marassi']){ try{ map.removeLayer(QR['marassi']); }catch(e){} try{ QR['marassi']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
