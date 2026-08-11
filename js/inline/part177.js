
(function ensureQrToggleInRoutes(){
  var menu = document.getElementById('routes-menu');
  if(!menu) return;
  var firstSection = menu.querySelector('.acc-section');
  if(!firstSection) return;
  var container = firstSection.parentElement;
  var row = container.querySelector('.doc-row[data-action="show-qr"]');
  if(!row){
    row = document.createElement('div');
    row.className = 'doc-row';
    row.setAttribute('data-action','show-qr');
    row.innerHTML = '<label class="doc-line">'
      + '<input type="checkbox" class="route-master-chk" />'
      + '<span class="chip">QR</span>'
      + '<span class="label">Mostra QR</span>'
      + '</label>';
    container.insertBefore(row, firstSection);
    row.addEventListener('change', function(e){
      var master = e.target.closest('#chk-qr-all'); if(!master) return;
      try{ window.__qrToggleAll && window.__qrToggleAll(master.checked); }catch(_){}
      try{ if(master.checked) window.__qrBuildAll && window.__qrBuildAll(); }catch(_){}
    });
  }
})();
