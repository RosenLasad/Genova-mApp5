
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-quarto'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['quarto']){ try{ map.removeLayer(QR['quarto']); }catch(e){} try{ QR['quarto']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
