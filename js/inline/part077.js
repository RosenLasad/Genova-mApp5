
(function(){

  whenMapReady(function(){
    var chk = document.getElementById('chk-qr-piazza-principe'); if(!chk) return;
    function nuke(){
      try{ if(window.QR && QR['piazza_principe']){ try{ map.removeLayer(QR['piazza_principe']); }catch(e){} try{ QR['piazza_principe']=null; }catch(e){} } }catch(e){}
    }
    chk.addEventListener('change', function(){ setTimeout(nuke,0); setTimeout(nuke,50); setTimeout(nuke,150); });
    map.on('zoomend', function(){ setTimeout(nuke,0); });
    setTimeout(nuke, 200);
  });
})();
