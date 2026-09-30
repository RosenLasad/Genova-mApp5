
(function(){
  // Fallback centering per browser senza :has()
  document.addEventListener('DOMContentLoaded', function(){
    try{
      var m = document.getElementById('chk-qr-all');
      var row = m && (m.closest('label.doc-line') || m.parentElement);
      if(row){ row.classList.add('qr-master-row'); }
    }catch(_){}
  });
})();
