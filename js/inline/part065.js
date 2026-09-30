
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-circonvallazione-a-mare'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['circonvallazione_a_mare']){ try{ map.removeLayer(QR['circonvallazione_a_mare']); }catch(e){} try{ QR['circonvallazione_a_mare']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
