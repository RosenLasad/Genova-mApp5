
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    try{
      var m = document.getElementById('chk-qr-all');
      var row = m && m.closest('.doc-row');
      if(row){ row.classList.add('qr-master-row-outer'); }
    }catch(_){}
  });
})();
