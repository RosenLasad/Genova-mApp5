
(function(){
  
  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-viasettembre'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['viasettembre']){ try{ map.removeLayer(QR['viasettembre']); }catch(e){} try{ QR['viasettembre']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
