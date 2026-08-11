
/* Position quick toggles under the toolbar (preview-only, no behavior yet) */
(function(){
  function placeDock(){
    var mapEl = document.getElementById('map');
    var dock = document.getElementById('quick-toggles');
    if(!mapEl || !dock) return false;
    var toolbar = document.querySelector('.toolbar-buttons')
               || (document.getElementById('btn-sub') && document.getElementById('btn-sub').parentElement)
               || (null /* btn-qr removed */ && null /* btn-qr removed */.parentElement);
    if(!toolbar) return false;
    try{
      var mapRect = mapEl.getBoundingClientRect();
      var tRect = toolbar.getBoundingClientRect();
      var topPx = (tRect.bottom - mapRect.top) + 18; // 10px sotto la toolbar
      dock.style.top = topPx + 'px';
      return true;
    }catch(e){ return false; }
  }
  var tries=0, max=40;
  var iv = setInterval(function(){ if(placeDock()) clearInterval(iv); if(++tries>=max) clearInterval(iv); }, 150);
  window.addEventListener('resize', placeDock);
  window.addEventListener('orientationchange', placeDock);
})();
