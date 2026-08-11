
(function(){
  function turnOn(){
    try{
      // preferito: aggiorna anche UI/label e checkbox master
      if (typeof window.__ensureQrOn === 'function'){
        window.__ensureQrOn();
        return true;
      }
    }catch(_){}

    try{
      // fallback: accende il layer QR_ALL e spunta il master
      if (typeof window.__qrToggleAll === 'function'){
        window.__qrToggleAll(true);
        var chk = document.getElementById('chk-qr-all');
        if (chk) chk.checked = true;
        return true;
      }
    }catch(_){}

    return false;
  }

  
})();
