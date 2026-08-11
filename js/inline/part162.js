
(function(){
  function bind(){
    var sw = document.getElementById('flag-switcher');
    var menu = document.getElementById('flag-menu');
    if(sw){ sw.addEventListener('click', function(e){ e.stopPropagation(); }, false); }
    if(menu){ menu.addEventListener('click', function(e){ e.stopPropagation(); }, false); }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  }else{
    bind();
  }
})();
