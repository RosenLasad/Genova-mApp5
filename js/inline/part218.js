
(function(){
  // Palette Acquedotti
  var PALETTE_ACQ = {
    'storia-acq-romano':  '#8b5cf6', // Acquedotto Romano (III sec. a.C.)
    'storia-acq-storico': '#16a34a'  // Acquedotto Storico (XVII sec.)
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

  function applyColorById(rowCbId, legacyName){
    var cb = document.getElementById(rowCbId);
    if(!cb) return;
    var row = cb.closest('label'); if(!row) return;

    // prova a individuare il checkbox legacy per nome (vecchio menu)
    var legacy = null;
    var wanted = (legacyName || '').toLowerCase();
    var labels = document.querySelectorAll('label');
    for(var i=0;i<labels.length;i++){
      var L = labels[i];
      var t = (L.textContent || '').trim().toLowerCase();
      if(t && wanted && t.indexOf(wanted) >= 0 && L !== row){
        var c = L.querySelector('input[type="checkbox"]');
        if(c){ legacy = c; break; }
      }
    }

    var color = getLegacyDotColor(legacy);
    if(!color){ color = PALETTE_ACQ[rowCbId] || ''; }
    if(color){ row.style.setProperty('--c', color); }
  }

  function applyAcqColors(){
    applyColorById('storia-acq-romano',  'Acquedotto Romano');
    applyColorById('storia-acq-storico', 'Acquedotto Storico');
  }

  function boot(){
    applyAcqColors();
    // se la lista cambia dinamicamente, riapplica
    try{
      var host = document.getElementById('storia-acquedotti-items');
      if(host){
        new MutationObserver(function(){ applyAcqColors(); })
          .observe(host, {childList:true, subtree:true});
      }
    }catch(_){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
