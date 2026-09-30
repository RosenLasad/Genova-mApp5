
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
