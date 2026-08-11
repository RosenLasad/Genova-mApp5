
(function(){
  var btn = document.getElementById('btn-settings');
  var dd = document.getElementById('settings-dropdown');
  if(!btn || !dd) return;

  var wrap = btn.parentNode;

  // Close Home menu (title dropdown) so Settings dropdown isn't covered
  function closeHomeMenu(){
    try{
      var home = document.getElementById('menu-home');
      if(home && home.classList && !home.classList.contains('hidden')){
        home.classList.add('hidden');
      }
      var titleBtn = document.getElementById('title-btn');
      if(titleBtn){
        try{ titleBtn.classList.remove('active'); }catch(_e){}
        try{ titleBtn.setAttribute('aria-expanded','false'); }catch(_e){}
      }
      var bubble = document.getElementById('mh-bubble');
      if(bubble){
        try{ bubble.style.maxHeight = "0px"; }catch(_e){}
        try{ bubble.classList.add('hidden'); }catch(_e){}
        try{ bubble.dataset.key = ""; }catch(_e){}
      }
    }catch(_){}
  }

  function isOpen(){
    return wrap.classList && wrap.classList.contains('open');
  }
  function openMenu(){
    if(wrap.classList) wrap.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu(){
    if(wrap.classList) wrap.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu(){
    if(isOpen()) closeMenu();
    else openMenu();
  }

  btn.addEventListener('click', function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    closeHomeMenu();
    toggleMenu();
  });

  dd.addEventListener('click', function(ev){
    ev.stopPropagation();
  });

  document.addEventListener('click', function(){
    closeMenu();
  });

  document.addEventListener('keydown', function(ev){
    if(ev && (ev.key === 'Escape' || ev.key === 'Esc')) closeMenu();
  });

  var contactBtn = dd.querySelector('.settings-row[data-action="contact"]');
  if(contactBtn){
    contactBtn.addEventListener('click', function(ev){
      ev.preventDefault();
      closeMenu();
      // Placeholder: verrà collegato al pannello "Contattaci" nel prossimo step
      try{
        var evt;
        if (typeof CustomEvent === 'function') evt = new CustomEvent('settings:contact');
        else { evt = document.createEvent('Event'); evt.initEvent('settings:contact', true, true); }
        document.dispatchEvent(evt);
      }catch(_){}
    });
  }
})();
