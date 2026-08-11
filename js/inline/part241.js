
// Delegated: click on row/label toggles its checkbox (except when clicking directly on input/a/button)
(function ensureRouteRowClickToggleDelegated(){
  var menu = document.getElementById('routes-menu');
  if(!menu) return;
  menu.addEventListener('click', function(e){
    var row = e.target.closest('.doc-row[data-route-id]');
    if(!row || !menu.contains(row)) return;
    if(e.target.closest('input, a, button')) return;
    var chk = row.querySelector('input.route-chk');
    if(!chk) return;
    e.preventDefault();
    chk.checked = !chk.checked;
    chk.dispatchEvent(new Event('change', {bubbles:false}));
  });
})();
