
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-sampierdarena'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['sampierdarena']){ try{ map.removeLayer(QR['sampierdarena']); }catch(e){} try{ QR['sampierdarena']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
