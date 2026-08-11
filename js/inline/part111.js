
    (function(){
      document.addEventListener('click', function(e){
        var btn = e.target.closest && e.target.closest('#mh-flags .flag, #flag-ribbon .flag');
        if(!btn) return;
        var lang = btn.getAttribute('data-lang');
        if(lang){ e.preventDefault(); if(window.setLang) window.setLang(lang); }
      }, true);
    })();