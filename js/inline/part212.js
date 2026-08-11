
(function(){
  var dock = document.getElementById('quick-toggles');
  if(!dock) return;

  function getPanel(btn){
    if(!btn) return null;
    var id = btn.getAttribute('aria-controls');
    return id ? document.getElementById(id) : null;
  }

  function align(btn, panel){
  try{
    var pr = btn.getBoundingClientRect();
    var dr = dock.getBoundingClientRect();

    // centro verticale del bottone rispetto al dock
    var offset = (pr.top - dr.top) + (pr.height / 2);

    panel.style.setProperty('--qt-cat-offset', offset + 'px');
  }catch(_){}
}


  function closeAll(exceptId){
    var panels = dock.querySelectorAll('.qt-cat-panel');
    panels.forEach(function(p){
      if(p.id !== exceptId){ p.setAttribute('hidden',''); }
    });
    var pills = dock.querySelectorAll('.qt-cat.qt-pill');
    pills.forEach(function(b){
      if(b.id + '' !== (exceptId ? (exceptId + '-btn') : '')){
        b.setAttribute('aria-expanded','false');
      }
    });
  }

  dock.addEventListener('click', function(ev){
    var btn = ev.target.closest('.qt-cat.qt-pill');
    if(!btn) return;
    if(!dock.contains(btn)) return;

    var panel = getPanel(btn);
    if(!panel) return;

    ev.preventDefault();
    ev.stopPropagation();

    var isOpen = btn.getAttribute('aria-expanded') === 'true';
    if(isOpen){
      btn.setAttribute('aria-expanded','false');
      panel.setAttribute('hidden','');
      return;
    }
    closeAll(panel.id);
    align(btn, panel);
    btn.setAttribute('aria-expanded','true');
    panel.removeAttribute('hidden');

    var f = panel.querySelector('.qt-btn,button,[href],input,select,textarea');
    if(f && f.focus){ try{ f.focus(); }catch(_){ } }
  });

  document.addEventListener('click', function(ev){
    if(dock.contains(ev.target)) return;
    closeAll(null);
  });

  window.addEventListener('resize', function(){
    var openBtn = dock.querySelector('.qt-cat.qt-pill[aria-expanded="true"]');
    var openPanel = getPanel(openBtn);
    if(openBtn && openPanel){ align(openBtn, openPanel); }
  }, {passive:true});

  window.addEventListener('scroll', function(){
    var openBtn = dock.querySelector('.qt-cat.qt-pill[aria-expanded="true"]');
    var openPanel = getPanel(openBtn);
    if(openBtn && openPanel){ align(openBtn, openPanel); }
  }, true);
})();
