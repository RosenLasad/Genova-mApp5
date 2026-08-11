
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-pannunziata'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['pannunziata']){ try{ map.removeLayer(QR['pannunziata']); }catch(e){} try{ QR['pannunziata']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
