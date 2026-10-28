
document.addEventListener('DOMContentLoaded', function(){
  var btnQR = null /* btn-qr removed */;
  var qrMenu = document.getElementById('qr-menu');
  var btnStoria = document.getElementById('btn-opere');
  var storiaMenu = document.getElementById('opere-menu');
  if(!btnQR || !qrMenu) return;

  function isVisible(el){
    if(!el) return false;
    var cs = window.getComputedStyle(el);
    return cs && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
  }

  // Prevent-close guard for the same click tick
  var qrJustOpened = false;
  function armGuard(){ qrJustOpened = true; setTimeout(function(){ qrJustOpened = false; }, 0); }

  btnQR.addEventListener('click', function(e){
    e.stopPropagation();
    var qrOpen = isVisible(qrMenu);
    if(qrOpen){
      // Toggle: close if already open
      qrMenu.style.display = 'none';
      return;
    }
    // Ensure single click on QR always opens it immediately,
    // even if Storia is currently open.
    if(storiaMenu) storiaMenu.style.display = 'none';
    qrMenu.style.display = 'block';
    armGuard();
  });

  // Optional symmetry: clicking Storia closes QR (doesn't open it here)
  if(btnStoria){
    btnStoria.addEventListener('click', function(){
      if(qrMenu) qrMenu.style.display = 'none';
    });
  }

  // Global click: close QR when clicking outside, but ignore the same-tick open
  document.addEventListener('click', function(e){
    if(qrJustOpened) return;
    if(qrMenu && !qrMenu.contains(e.target) && e.target !== btnQR){
      qrMenu.style.display = 'none';
    }
  });
});

;

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

;

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

;

(function(){
  window.whenMapReady = function(fn){
    // Se la mappa è già pronta e ha addLayer, esegui subito
    if (typeof window !== 'undefined' && window.map && typeof map.addLayer === 'function') {
      fn();
      return;
    }
    // Altrimenti, aspetta il load della pagina e riprova
    window.addEventListener('load', function(){
      if (window.map && typeof map.addLayer === 'function') {
        fn();
      }
    });
  };
})();

