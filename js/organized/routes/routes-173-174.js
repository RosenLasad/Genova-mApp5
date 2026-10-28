
(function(){
  var btn = document.querySelector('#qt-cat-passato .qt-btn.qt-percorsi-all');
  if(!btn) return;

  // ci sono percorsi attivi?
  function areAnyRoutesActive(){
    return !!document.querySelector('#routes-menu input.route-chk:checked');
  }

  function syncPressedState(){
    btn.setAttribute('aria-pressed', areAnyRoutesActive() ? 'true' : 'false');
  }

  function toggleAllRoutes(ev){
    if(ev){
      ev.preventDefault();
      ev.stopPropagation();
    }

    var shouldEnable = !areAnyRoutesActive();

    // tutte le checkbox dei percorsi nel menu Percorsi
    var rows = document.querySelectorAll('#routes-menu .doc-row[data-route-id]');
    rows.forEach(function(row){
      var chk = row.querySelector('input.route-chk');
      if(!chk) return;

      // evita eventi inutili se è già nello stato giusto
      if(chk.checked === shouldEnable) return;

      chk.checked = shouldEnable;
      // scatena il listener esistente che aggiunge/rimuove il percorso dalla mappa
      chk.dispatchEvent(new Event('change', {bubbles:false}));
    });

    syncPressedState();
  }

  // click sul toggle "Percorsi (tutti)" in Passato
  btn.addEventListener('click', toggleAllRoutes);

  // se l'utente attiva/disattiva percorsi dal menu Percorsi,
  // aggiorniamo lo stato ARIA del bottone in Passato
  document.addEventListener('change', function(e){
    if(!e.target.matches('#routes-menu input.route-chk')) return;
    syncPressedState();
  });

  // stato iniziale coerente (nel caso in cui tratturi siano già attivi)
  syncPressedState();
})();

;

(function(){
  function areAnyRoutesActive(){
    return !!document.querySelector('#routes-menu input.route-chk:checked');
  }

  function setAllRoutes(on){
    var rows = document.querySelectorAll('#routes-menu .doc-row[data-route-id]');
    rows.forEach(function(row){
      var chk = row.querySelector('input.route-chk');
      if(!chk) return;
      if(chk.checked === on) return;
      chk.checked = on;
      chk.dispatchEvent(new Event('change', {bubbles:false}));
    });
  }

  function setup(){
    var all = document.getElementById('storia-percorsi-all');
    if (!all) return false;

    function sync(){
      all.indeterminate = false;
      all.checked = areAnyRoutesActive();
    }

    all.addEventListener('change', function(e){
      e.stopPropagation();
      setAllRoutes(!!all.checked);
      setTimeout(sync, 0);
    });

    document.addEventListener('change', function(e){
      if (!e.target.matches('#routes-menu input.route-chk')) return;
      sync();
    });

    sync();
    return true;
  }

  function ready(cb){
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', cb, { once:true });
    } else {
      cb();
    }
  }

  ready(function(){
    var tries = 0, max = 60;
    (function tick(){
      if (setup()) return;
      if (++tries >= max) return;
      setTimeout(tick, 150);
    })();
  });
})();

