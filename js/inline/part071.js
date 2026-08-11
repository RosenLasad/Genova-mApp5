
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-pcorvetto'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['pcorvetto']){ try{ map.removeLayer(QR['pcorvetto']); }catch(e){} try{ QR['pcorvetto']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
