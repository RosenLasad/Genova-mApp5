
document.addEventListener('DOMContentLoaded', function(){
  var menu = document.getElementById('qr-menu');
  if(!menu) return;

  function sortQrList(){
    var labels = Array.from(menu.querySelectorAll('label'));
    var header = menu.querySelector('div'); // the "QR" header
    var allCtrl = menu.querySelector('input#chk-qr-all') ? menu.querySelector('input#chk-qr-all').closest('label') : null;
    var items = labels.filter(function(lab){
      var inp = lab.querySelector('input');
      return inp && inp.id !== 'chk-qr-all';
    });
    items.sort(function(a, b){
      function textOf(l){
        var chip = l.querySelector('.chip');
        return (chip ? chip.textContent : l.textContent).trim().toLowerCase();
      }
      return textOf(a).localeCompare(textOf(b), 'it', {sensitivity:'base'});
    });
    // Re-append in order
    menu.innerHTML = '';
    if (header){ menu.appendChild(header); }
    if (allCtrl){ menu.appendChild(allCtrl); }
    items.forEach(function(l){ menu.appendChild(l); });
  }

  sortQrList();
  // Re-sort again after a tick (in case other scripts add labels later)
  setTimeout(sortQrList, 0);
});
