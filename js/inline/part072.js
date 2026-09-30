
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-albaro'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['albaro']){ try{ map.removeLayer(QR['albaro']); }catch(e){} try{ QR['albaro']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
