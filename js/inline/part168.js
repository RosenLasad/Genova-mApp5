
(function(){
  var btn  = document.getElementById('routes-btn');
  var menu = document.getElementById('routes-menu');
  if(!btn || !menu) return;

  function closeIfOutside(e){
    if(!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)){
      menu.style.display = 'none';
    }
  }

  btn.addEventListener('click', function(ev){
    ev.preventDefault();
    var isOpen = (menu.style.display === 'block');
    menu.style.display = isOpen ? 'none' : 'block';

    // refresh traduzioni dinamiche del menu, se esiste
    if(!isOpen && typeof window.updateRoutesMenuLabels === 'function'){
      try { window.updateRoutesMenuLabels(); } catch(e){}
    }
  });

  document.addEventListener('click', closeIfOutside, true);
})();
