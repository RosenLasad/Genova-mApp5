
(function(){
  // Palette fornita (fallback: se non riesco a leggere il colore dal vecchio elenco)
  var PALETTE_MURA = {
    'storia-mura-pre-romane':    '#db2777',
    'storia-mura-carolinge':     '#0d9488',
    'storia-mura-barbarossa':    '#76B6FF',
    'storia-mura-molo':          '#1e40af',
    'storia-mura-repubblica':    '#f95800',
    'storia-mura-rinascimento':  '#6b21a8',
    'storia-mura-nuove':         '#dc2626'
  };

  function getLegacyDotColor(legacyCb){
    try{
      var lab = legacyCb && legacyCb.closest('label');
      var dot = lab ? lab.querySelector('.dot') : null;
      if(dot){
        var cs = getComputedStyle(dot);
        return (dot.style.background || cs.backgroundColor || cs.color || '').trim();
      }
    }catch(_){}
    return '';
  }

  function applyColorById(rowCbId){
    var cb = document.getElementById(rowCbId);
    if(!cb) return;
    var row = cb.closest('label'); if(!row) return;

    // Prova a “copiare” il colore dal vecchio elenco (cerca una label con lo stesso testo)
    var legacy = null;
    var txt = (row.textContent || '').trim().toLowerCase();
    var labels = document.querySelectorAll('label');
    for(var i=0;i<labels.length;i++){
      var L = labels[i];
      var t = (L.textContent || '').trim().toLowerCase();
      if(t && txt && t.indexOf(txt) >= 0 && L !== row){
        var c = L.querySelector('input[type="checkbox"]');
        if(c){ legacy = c; break; }
      }
    }
    var color = getLegacyDotColor(legacy);
    if(!color){ color = PALETTE_MURA[rowCbId] || ''; }

    if(color){ row.style.setProperty('--c', color); }
  }

  function applyMuraColors(){
    [
      'storia-mura-pre-romane',
      'storia-mura-carolinge',
      'storia-mura-barbarossa',
      'storia-mura-molo',
      'storia-mura-repubblica',
      'storia-mura-rinascimento',
      'storia-mura-nuove'
    ].forEach(applyColorById);
  }

  function boot(){
    applyMuraColors();
    // Se il pannello Mura viene aggiornato dinamicamente, riapplica
    try{
      var host = document.getElementById('storia-mura-items');
      if(host){
        new MutationObserver(function(){ applyMuraColors(); })
          .observe(host, {childList:true, subtree:true});
      }
    }catch(_){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
