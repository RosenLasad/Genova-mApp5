
// === Percorsi: Master 'Mostra tutti' (batch, robusto) ===
(function installRoutesMasterHandlers(){
  var menu = document.getElementById('routes-menu');
  if(!menu) return;

  // Flag batch
  window.__routesBatch = false;

  // Click sulla riga: toggla il master (escludendo input/link/bottoni)
  menu.addEventListener('click', function(e){
    var row = e.target.closest('#routes-menu .doc-row[data-action="show-all"]');
    if(!row) return;
    if(e.target.closest('input, a, button')) return;
    var master = row.querySelector('input.route-master-chk');
    if(!master) return;
    e.preventDefault();
    master.checked = !master.checked;
    master.dispatchEvent(new Event('change', {bubbles:false}));
  });

  // Cambio master -> batch toggle di tutti i figli
  document.addEventListener('change', async function(e){
    var master = e.target.matches && e.target.matches('#routes-menu input.route-master-chk') ? e.target : null;
    if(!master) return;
    var sec = master.closest('.acc-section');
    if(!sec) return;
    var items = Array.from(sec.querySelectorAll('.doc-row[data-route-id] input.route-chk'));
    var target = master.checked;
    window.__routesBatch = true;
    try{
      for (const chk of items){
        if (chk.checked !== target){
          chk.checked = target;
          chk.dispatchEvent(new Event('change', {bubbles:false}));
        }
      }
    } finally {
      window.__routesBatch = false;
      // Sync finale
      master.indeterminate = false;
      master.checked = target;
      if (target && typeof fitRoutesBounds === 'function') if(!window.__routesBatch) fitRoutesBounds();
    }
  }, true);

  // Cambio item -> sync del master (se non in batch)
document.addEventListener('change', function(e){
  var item = (e.target && e.target.matches && e.target.matches('#routes-menu .doc-row[data-route-id] input.route-chk'))
    ? e.target
    : null;
  if(!item) return;
  if(window.__routesBatch) return;

  var sec = item.closest ? item.closest('.acc-section') : null;
  if(!sec) return;

  var master = sec.querySelector('input.route-master-chk');
  if(!master) return;

  var checks = Array.prototype.slice.call(
    sec.querySelectorAll('.doc-row[data-route-id] input.route-chk')
  );

  var allOn = checks.every(function(c){ return c.checked; });
  var someOn = checks.some(function(c){ return c.checked; });

  master.checked = allOn;
  master.indeterminate = !allOn && someOn;
}, true);
})();

