
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-piazza-dante'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['piazza_dante']){ try{ map.removeLayer(QR['piazza_dante']); }catch(e){} try{ QR['piazza_dante']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
