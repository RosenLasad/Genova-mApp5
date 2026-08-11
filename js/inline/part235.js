
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-voltri'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['voltri']){ try{ map.removeLayer(QR['voltri']); }catch(e){} try{ QR['voltri']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
