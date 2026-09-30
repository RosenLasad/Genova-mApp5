
(function(){
  function ready(fn){
    if(document.readyState === 'complete' || document.readyState === 'interactive'){ fn(); }
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }

  ready(function(){
    var btn = document.querySelector('#qt-cat-passato .qt-cat-items .qt-acq-all');
    if(!btn) return;

    // master: il checkbox "Mostra tutto" degli Acquedotti nella toolbar Storia
    function masterChk(){
      return document.getElementById('storia-acquedotti-all');
    }

    function syncFromMaster(){
      var m = masterChk();
      if(m){
        btn.setAttribute('aria-pressed', m.checked ? 'true' : 'false');
      } else {
        btn.setAttribute('aria-pressed', 'false');
      }
    }

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();

      var m = masterChk();

      // Se esiste la funzione "pulita" che usi già dal menu Home, la riutilizziamo
      if(typeof window.openStoriaAcqAllOnly === 'function'){
        try{
          window.openStoriaAcqAllOnly();
          setTimeout(syncFromMaster, 0);
          return;
        }catch(_){}
      }

      // fallback: toggle diretto del master checkbox
      if(m){
        m.checked = !m.checked;
        var evChange = new Event('change', {bubbles:true});
        try{ m.dispatchEvent(evChange); }catch(_){}
        setTimeout(syncFromMaster, 0);
      }
    });

    // Se il master cambia da un altro punto dell’interfaccia, tieni il bottone allineato
    try{
      var m = masterChk();
      if(m){
        m.addEventListener('change', syncFromMaster);
        syncFromMaster();
      }
    }catch(_){}
  });
})();
