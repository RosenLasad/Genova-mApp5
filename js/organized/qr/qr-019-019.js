
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
    btn.innerHTML =
      '<span aria-hidden="true" class="qt-icon"><svg viewBox="0 0 24 24" focusable="false">' +
        '<path fill="#f5f8fa" d="M1 12c2.4-4 6.7-6.7 11-6.7s8.6 2.7 11 6.7c-2.4 4-6.7 6.7-11 6.7S3.4 16 1 12Z"/>' +
        '<circle cx="12" cy="12" r="5.3" fill="#004aad"/>' +
        '<circle cx="12" cy="12" r="2.8" fill="#172334"/>' +
        '<circle cx="13.6" cy="10.3" r="1.2" fill="#f5f8fa"/>' +
        '<g class="qr-visibility-slash" fill="none" stroke-linecap="round">' +
          '<path d="M4 4l16 16" stroke="#172334" stroke-width="4"/>' +
          '<path d="M4 4l16 16" stroke="#f5f8fa" stroke-width="1.8"/>' +
        '</g>' +
      '</svg></span><span class="sr-only">QR</span>';

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
    var btn = createQrBtn();
    var bar = document.getElementById('bottom-bar');

    // Il comando Mostra QR appartiene al gruppo operativo in basso,
    // insieme a GPS e Scan QR. ui-layout-v2.js rifinisce poi l'ordine.
    if(bar && btn.parentNode !== bar){
      if(bar.firstChild) bar.insertBefore(btn, bar.firstChild);
      else bar.appendChild(btn);
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

