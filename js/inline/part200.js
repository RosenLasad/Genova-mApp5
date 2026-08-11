
(function(){
  function setup(){
    var routesMenu = document.getElementById('routes-menu');
    var storiaBox  = document.getElementById('storia-percorsi-items');
    if (!routesMenu || !storiaBox) return false;

    // evita doppie inizializzazioni
    if (storiaBox.getAttribute('data-routes-built') === '1') return true;

    // ricostruisci l'elenco Percorsi dentro Storia partendo dal menu alto Percorsi
    storiaBox.innerHTML = '';

    var map = {};

    routesMenu.querySelectorAll('.doc-row[data-route-id]').forEach(function(row){
      var rid = row.getAttribute('data-route-id');
      var masterChk = row.querySelector('input.route-chk');
      if (!rid || !masterChk) return;

      var clone = row.cloneNode(true);
      var cloneChk = clone.querySelector('input.route-chk');
      if (cloneChk) {
        cloneChk.checked = masterChk.checked;
      }

      storiaBox.appendChild(clone);
      map[rid] = { master: masterChk, clones: cloneChk ? [cloneChk] : [] };
    });

    function syncFromMaster(rid){
      var entry = map[rid];
      if (!entry) return;
      entry.clones.forEach(function(chk){
        chk.checked = entry.master.checked;
      });
    }

    // ORIGINALI -> COPIE
    document.addEventListener('change', function(e){
      if (!e.target.matches('#routes-menu input.route-chk')) return;
      var row = e.target.closest('.doc-row[data-route-id]');
      if (!row) return;
      var rid = row.getAttribute('data-route-id');
      syncFromMaster(rid);
    }, true);

    // COPIE -> ORIGINALI
    document.addEventListener('change', function(e){
      if (!e.target.matches('#storia-percorsi-items input.route-chk')) return;
      var row = e.target.closest('.doc-row[data-route-id]');
      if (!row) return;
      var rid = row.getAttribute('data-route-id');
      var entry = map[rid];
      if (!entry) return;
      var chk = e.target;
      if (entry.master.checked !== chk.checked){
        entry.master.checked = chk.checked;
        entry.master.dispatchEvent(new Event('change', {bubbles:true}));
      }
    }, true);

    Object.keys(map).forEach(syncFromMaster);

    storiaBox.setAttribute('data-routes-built', '1');

    // rietichetta subito i percorsi, se la funzione c'è
    try{ if (window.refreshMenuLabels) window.refreshMenuLabels(); }catch(_){}
    try{ if (window.updateRoutesMenuLabels) window.updateRoutesMenuLabels(); }catch(_){}

    return true;
  }

  function ready(fn){
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', fn, {once:true});
    } else {
      fn();
    }
  }

  ready(function(){
    var tries = 0, max = 40;
    (function tick(){
      if (setup()) return;
      if (++tries >= max) return;
      setTimeout(tick, 150);
    })();
  });
})();
