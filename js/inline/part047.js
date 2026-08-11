
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-piazzaportello'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['piazzaportello']){ try{ map.removeLayer(QR['piazzaportello']); }catch(e){} try{ QR['piazzaportello']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
