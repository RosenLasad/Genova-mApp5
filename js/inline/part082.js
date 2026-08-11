
(function(){
  function setup(){
    // Home può essere "menu-home" o "menu-home-extra" a seconda della versione
    var home    = document.getElementById('menu-home') || document.getElementById('menu-home-extra');
    var qtPanel = document.getElementById('quick-toggles');
    if (!home || !qtPanel){
      setTimeout(setup, 400);
      return;
    }

    // Classi dei quick toggle -> data-shortcut nei bubble del menu Home
    function shortcutFromQuick(btn){
      if (!btn) return null;
      var c = btn.className || '';

      // COME MUOVERSI
      if (c.indexOf('qt-bus')        !== -1) return 'bus';
      if (c.indexOf('qt-train')      !== -1) return 'treni';
      if (c.indexOf('qt-metro')      !== -1) return 'metro';
      if (c.indexOf('qt-funi')       !== -1) return 'funi';
      if (c.indexOf('qt-mare')       !== -1) return 'mare';
      if (c.indexOf('qt-aereo')      !== -1) return 'aereo';

        // INTRATTENIMENTO
  if (c.indexOf('qt-parchi')     !== -1) return 'parchi';
  if (c.indexOf('qt-sport')      !== -1) return 'sport';
  if (c.indexOf('qt-locali')     !== -1) return 'locali';

  // nuovi: Cinema / Teatri / Mostre
  if (c.indexOf('qt-cinema')     !== -1) return 'cinema';
  if (c.indexOf('qt-teatri')     !== -1) return 'teatri';
  if (c.indexOf('qt-mostre')     !== -1) return 'mostre';

   

      // STORIA
      if (c.indexOf('qt-museum')     !== -1) return 'musei';
      if (c.indexOf('qt-forti')      !== -1) return 'forti';
      if (c.indexOf('qt-mura')       !== -1) return 'mura';
      if (c.indexOf('qt-chiese')     !== -1) return 'chiese';
      if (c.indexOf('qt-palazzi')    !== -1) return 'palazzi';

      // Percorsi & QR (sia quick-toggles generali che "Passato")
      if (c.indexOf('qt-percorsi')   !== -1 || c.indexOf('qt-percorsi-all') !== -1) return 'percorsi';
      if (c.indexOf('qt-qr')         !== -1 || c.indexOf('qt-qr-all')       !== -1) return 'qr';

      // QUI il pezzo che ti mancava:
      // DOCUMENTARI (tutti) -> bubble "Documentari"
      if (c.indexOf('qt-doc-all')    !== -1 || c.indexOf('qt-documentari') !== -1)
        return 'documentari';

      // ACQUEDOTTI (tutti) -> bubble "Acquedotti"
      if (c.indexOf('qt-acq-all')    !== -1 || c.indexOf('qt-acquedotti')  !== -1)
        return 'acquedotti';

      return null;
    }

    function syncOne(btn){
      var shortcut = shortcutFromQuick(btn);
      if (!shortcut) return;

      var on = btn.getAttribute('aria-pressed') === 'true';

      home.querySelectorAll('.mh-actions .mh-btn[data-shortcut="'+shortcut+'"]')
        .forEach(function(chip){
          chip.classList.toggle('mh-chip-on', on);
        });
    }

    function syncAll(){
      qtPanel.querySelectorAll('.qt-btn').forEach(syncOne);
    }

    // Allinea subito lo stato iniziale
    syncAll();

    // E poi ogni volta che clicchi un quick toggle
    qtPanel.addEventListener('click', function(ev){
      var btn = ev.target.closest('.qt-btn');
      if (!btn) return;
      // aspetta che gli script dei toggle abbiano aggiornato aria-pressed
      setTimeout(function(){ syncOne(btn); }, 0);
    }, true);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setup, {once:true});
  } else {
    setup();
  }
})();
