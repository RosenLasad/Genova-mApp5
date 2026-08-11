
(function(){
  function positionFlagMenuUp(){
    var menu = document.getElementById('flag-menu');
    if(!menu) return;
    menu.style.position = 'fixed';
    menu.style.left = '16px';
    menu.style.top = '';
    menu.style.bottom = 'calc(16px + 38px + 8px)';
    menu.style.zIndex = '2000';
  }
  function bind(){
    positionFlagMenuUp();
    var sw = document.getElementById('flag-switcher');
    if(sw){
      sw.addEventListener('click', function(){
        // Defer to allow any toggle logic to change display, then fix position
        setTimeout(positionFlagMenuUp, 0);
      });
    }
    // Also re-apply on window resize (safe guard)
    window.addEventListener('resize', positionFlagMenuUp);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  }else{
    bind();
  }
})();
