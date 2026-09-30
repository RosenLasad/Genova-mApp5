
(function(){
  var STORAGE_KEY = 'gmapp_qt_state_v1';

  // Se vuoi escludere qualcosa dalla memoria, mettila qui.
  // Esempio: non memorizzare "qt-clear" (reset), ovvio.
  var EXCLUDE = new Set(['qt-clear']);

  function btnKey(btn){
    // usa la prima classe "qt-xxx" (escludendo qt-btn)
    var cls = Array.from(btn.classList).filter(function(c){
      return c.indexOf('qt-') === 0 && c !== 'qt-btn' && !EXCLUDE.has(c);
    });
    return cls[0] || btn.id || null;
  }

  function readState(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    }catch(_){
      return {};
    }
  }

  function writeState(state){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state || {}));
    }catch(_){}
  }

  function snapshotToStorage(){
    var state = readState();
    var btns = document.querySelectorAll('#quick-toggles .qt-btn');
    btns.forEach(function(btn){
      var k = btnKey(btn);
      if(!k) return;
      state[k] = (btn.getAttribute('aria-pressed') === 'true');
    });
    writeState(state);
  }

  function restoreOnce(){
    var state = readState();
    var btns = document.querySelectorAll('#quick-toggles .qt-btn');
    if(!btns || !btns.length) return false;

    var didSomething = false;

    btns.forEach(function(btn){
      var k = btnKey(btn);
      if(!k) return;

      if(state[k] === true && btn.getAttribute('aria-pressed') !== 'true'){
        // Accendi solo se è spento
        try{ btn.click(); didSomething = true; }catch(_){}
      }
    });

    return didSomething;
  }

  // 1) Salva stato ogni volta che clicchi un quick toggle (capture così prende tutto)
  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('#quick-toggles .qt-btn') : null;
    if(!btn) return;

    // Se è il reset, pulisci memoria e basta
    if(btn.classList.contains('qt-clear')){
      writeState({});
      // dopo il click, aggiorna comunque lo snapshot (porta tutto a false)
      setTimeout(snapshotToStorage, 0);
      return;
    }

    // Aspetta che il toggle aggiorni aria-pressed, poi salva
    setTimeout(snapshotToStorage, 0);
  }, true);

  // 2) Ripristino all’avvio con piccoli retry (perché alcuni toggle si “agganciano” dopo)
  var tries = 0;
  var maxTries = 30;      // ~7-8 secondi se interval 250ms
  var iv = setInterval(function(){
    tries++;

    // se riesce a fare qualcosa, riprova ancora un paio di volte per completare tutto
    restoreOnce();

    if(tries >= maxTries){
      clearInterval(iv);
      // snapshot finale, così lo storage riflette lo stato reale dopo eventuali auto-sync
      setTimeout(snapshotToStorage, 300);
    }
  }, 250);

})();
