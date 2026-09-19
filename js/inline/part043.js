
(function(){
  function releaseVideo(video){
    if(!video) return;
    try{ video.pause(); }catch(e){}
    try{
      video.removeAttribute('src');
      video.load();
    }catch(e){}
  }

  function defineClose(){
    if (window.__qrClosePanel) return;
    window.__qrClosePanel = function(){
      var panel = document.getElementById('panel');
      if(!panel) return;
      // Stop the active QR videos and release their network/buffer resources.
      var vidToday = document.getElementById('media-video-today');
      var vidPast  = document.getElementById('media-video');
      releaseVideo(vidToday);
      releaseVideo(vidPast);
      panel.classList.remove('open');
    };
  }
  function bind(){
    defineClose();
    // Close on map click
    if (window.map && map.on){
      map.on('click', function(){ window.__qrClosePanel && window.__qrClosePanel(); });
    } else {
      window.addEventListener('load', function(){
        if (window.map && map.on){
          map.on('click', function(){ window.__qrClosePanel && window.__qrClosePanel(); });
        }
      });
    }
    // Close on clicks outside the panel (toolbar, checkboxes, icons, etc.)
    document.addEventListener('click', function(e){
      var panel = document.getElementById('panel');
      if(!panel) return;
      if (panel.contains(e.target)) return; // ignore clicks inside the panel
      // Do not close when clicking a marker icon: that opens the panel
      var t = e.target;
      if (t.closest && (t.closest('.leaflet-marker-icon') || t.closest('.leaflet-tooltip'))) return;
      window.__qrClosePanel && window.__qrClosePanel();
    }, true);
    // Close on ESC
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape'){ window.__qrClosePanel && window.__qrClosePanel(); }
    });
  }
  if (document.readyState === 'complete'){ bind(); } else { window.addEventListener('load', bind); }
})();
