
(function(){
  function ensureQRInBar(bar){
    var qrFab = document.getElementById('map-qr-fab');
    if(qrFab && !bar.contains(qrFab)){
      qrFab.classList.add('fab-btn');
      bar.insertBefore(qrFab, document.getElementById('btn-home')); // to the left of Home
    }
  }
  function run(){
    var bar = document.getElementById('bottom-bar');
    if(!bar){ requestAnimationFrame(run); return; }
    ensureQRInBar(bar);
  }
  // run after original script likely created the FAB
  setTimeout(run, 50);
  setTimeout(run, 300);
  setTimeout(run, 1000);
})();
