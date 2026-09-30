
// --- CLEANUP: rimuovi il titolo duplicato dentro i corpi delle sezioni (sopra "Mostra tutti") ---
(function(){
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  function clean(){
    try{
      var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
      secs.forEach(function(sec){
        var headTitle = sec.querySelector('.acc-title');
        var body = sec.querySelector('.acc-body');
        if(!headTitle || !body) return;
        var t = (headTitle.textContent||'').trim().toLowerCase();
        // esamina i primi figli del body (quelli tipicamente usati come intestazione doppia)
        var firsts = Array.prototype.slice.call(body.children, 0, 3);
        firsts.forEach(function(node){
          if(!node) return;
          var text = (node.textContent||'').trim().toLowerCase();
          var isDuplicate =
              (text === t) ||
              (text === t + ':') ||
              (text.startsWith(t + '\n')) ||
              // vecchie intestazioni inline con font-weight alto
              ((node.tagName === 'DIV' || node.tagName === 'SPAN' || node.tagName === 'LABEL') &&
               text.indexOf(t) === 0 &&
               (node.getAttribute('style')||'').toLowerCase().indexOf('font-weight') !== -1);
          if(isDuplicate){
            try{ node.remove(); }catch(_){}
          }
        });
      });
    }catch(_){}
  }
  ready(function(){
    // dopo che l'accordion e le liste sono state costruite
    setTimeout(clean, 0);
    setTimeout(clean, 200);
  });
})();
