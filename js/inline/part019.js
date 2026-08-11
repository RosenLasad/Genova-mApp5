
(function(){
  function ready(cb){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', cb, {once:true});
    } else cb();
  }

  function getLang(){
    try{
      return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
    }catch(_){
      return document.documentElement.getAttribute('lang') || 'it';
    }
  }

  var LBL = {
    it:['Mostra QR','Nascondi QR'],
    en:['Show QR','Hide QR'],
    es:['Mostrar QR','Ocultar QR'],
    fr:['Afficher QR','Masquer QR'],
    ar:['إظهار QR','إخفاء QR'],
    ru:['Показать QR','Скрыть QR'],
    zh:['显示 QR','隐藏 QR'],
    lij:['Mostra QR','Ascundi QR']
  };

  function labelFor(on){
    var lang = (getLang()||'it').toLowerCase();
    var base = lang.split('-')[0];
    var pair = LBL[lang] || LBL[base] || LBL.it;
    return on ? pair[1] : pair[0];
  }

  function masterChk(){ return document.getElementById('chk-qr-all'); }

  

  function isOn(){
    try{
      return !!(window.map && window.QR_ALL && window.map.hasLayer(window.QR_ALL));
    }catch(_){
      return false;
    }
  }
function createQrBtn(){
    var btn = document.getElementById('btn-qr-removed');
    if(btn) return btn;

    btn = document.createElement('button');
    btn.id = 'btn-qr-removed';
    btn.type = 'button';
    btn.className = 'qt-item qt-cat qt-pill qt-pill-qr';
    btn.innerHTML = '<span aria-hidden="true" class="qt-icon"><img alt="" draggable="false" height="32" src="toolbar/qr.svg" width="32"/></span><span class="sr-only">QR</span>';

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      try{
        var on = isOn();
        if(typeof window.__qrToggleAll === 'function'){
          window.__qrToggleAll(!on);
        }else if(typeof window.toggleQR === 'function'){
          window.toggleQR();
        }else{
          // Fallback: toggle the master checkbox if it exists
          var m = masterChk();
          if(m){
            m.checked = !m.checked;
            m.dispatchEvent(new Event('change', {bubbles:true}));
          }
        }
      }catch(_){ }
      setTimeout(syncLabel, 0);
    });

    return btn;
  }

  function syncLabel(){
    var btn = document.getElementById('btn-qr-removed');
    if(!btn) return;
    var on = isOn();
    try{
      var m = masterChk();
      if(m) m.checked = on;
    }catch(_){ }
    var t  = labelFor(on);
    btn.title = t;
    btn.setAttribute('aria-label', t);
    // Visual state: highlight when active
    btn.classList.toggle('is-active', on);
  }

  function placeQrBtn(){
    var rail = document.getElementById('quick-toggles');
    if(!rail) return;

    var btn = createQrBtn();

    // Se era finito nella toolbar, toglilo da lì
    try{
      var bar = document.querySelector('.toolbar-buttons');
      if(bar && bar.contains(btn)) bar.removeChild(btn);
    }catch(_){}

    // Mettilo in alto nella colonna destra (prima delle pillole categorie)
    if(rail.firstElementChild !== btn){
      rail.insertBefore(btn, rail.firstElementChild);
    }
    syncLabel();
  }

  ready(function(){
    placeQrBtn();

    // Mantieni il bottone in posizione anche se il DOM viene ricreato
    var obs = new MutationObserver(function(){
      placeQrBtn();
    });
    try{
      obs.observe(document.getElementById('map') || document.body, {childList:true, subtree:true});
    }catch(_){}

    var m = masterChk();
    if(m){
      m.addEventListener('change', syncLabel);
    }
  });
})();
