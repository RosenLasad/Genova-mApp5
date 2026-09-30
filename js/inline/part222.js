
  // Nasconde il toggle "Mostra tutti" del menu QR (ridondante con il nuovo bottone QR nella colonna destra)
  document.addEventListener('DOMContentLoaded', function(){
    try{
      var qrMenu = document.getElementById('qr-menu');
      if(!qrMenu) return;
      var master = qrMenu.querySelector('input#chk-qr-all');
      if(!master) return;
      var lab = master.closest('label');
      if(lab) lab.style.display = 'none';
      else master.style.display = 'none';
    }catch(e){}
  });
