
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
