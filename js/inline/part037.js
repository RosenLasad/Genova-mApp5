
// QR Select-All behaviour
document.addEventListener('DOMContentLoaded', function(){
  var menu = document.getElementById('qr-menu');
  var chkAll = document.getElementById('chk-qr-all');
  if(!menu || !chkAll) return;

  function allItemCheckboxes(){
    return Array.from(menu.querySelectorAll('input[id^="chk-qr-"]:not(#chk-qr-all)'));
  }

  function applyAll(checked){
    allItemCheckboxes().forEach(function(cb){
      if(cb.checked !== checked){
        cb.checked = checked;
        cb.dispatchEvent(new Event('change', { bubbles:true }));
      }
    });
  }

  function refreshAllState(){
    var boxes = allItemCheckboxes();
var checked = boxes.filter(function(b){ return b.checked; }).length;
    chkAll.indeterminate = checked > 0 && checked < boxes.length;
    chkAll.checked = checked === boxes.length && boxes.length > 0;
  }

  chkAll.addEventListener('change', function(){
    applyAll(chkAll.checked);
    refreshAllState();
  });

  // Keep "Mostra tutti" in sync when individual items change
  menu.addEventListener('change', function(e){
    if(e.target && e.target.id && e.target.id.startsWith('chk-qr-') && e.target.id !== 'chk-qr-all'){
      refreshAllState();
    }
  });

  // Initialize state on open/load
  refreshAllState();
});
