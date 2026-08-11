
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-sturla'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['sturla']){ try{ map.removeLayer(QR['sturla']); }catch(e){} try{ QR['sturla']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
