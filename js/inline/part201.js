
(function(){
  function tagStoriaRoutes(){
    var box = document.getElementById('storia-percorsi-items');
    if (!box) return false;

    box.querySelectorAll('.doc-row[data-route-id]').forEach(function(row){
      var rid = row.getAttribute('data-route-id');
      if (!rid) return;

      // cerchiamo la label che mostra il nome del percorso
      var labelEl = row.querySelector('.st-label') || row.querySelector('.label');
      if (!labelEl) return;

      labelEl.setAttribute('data-i18n-route', rid);
    });

    // aggiorna subito i testi con la lingua corrente, se la funzione esiste
    if (window.refreshMenuLabels) {
      window.refreshMenuLabels();
    }

    return true;
  }

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once:true });
    } else {
      fn();
    }
  }

  ready(function(){
    var tries = 0, max = 40;
    (function tick(){
      if (tagStoriaRoutes()) return;   // aggancio riuscito
      if (++tries >= max) return;      // dopo un po' smette di provare
      setTimeout(tick, 150);
    })();
  });
})();
