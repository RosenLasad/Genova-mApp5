
(function(){
  function placeSwitcher(){
    try{
      var btn = document.getElementById('flag-switcher');
      if(!btn) return;
      // Bottom-left fixed, near help
      btn.style.left = '16px';
      btn.style.bottom = '16px';
      btn.style.top = '';
    }catch(_){}
  }
  function init(){
    placeSwitcher();
    window.addEventListener('resize', placeSwitcher, {passive:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
