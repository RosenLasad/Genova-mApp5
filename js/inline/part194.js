
(function(){
  function ensureMuraItemsContainer(){
    var panel = document.getElementById('storia-mura-panel') || document.querySelector('#storia-menu [data-sec="mura"] .st-panel');
    if(!panel) return null;
    var host = document.getElementById('storia-mura-items');
    if(!host){
      host = document.createElement('div');
      host.id = 'storia-mura-items';
      panel.appendChild(host);
    }
    return host;
  }
  function addRowBinding(host, rowId, labelText, legacySelector, legacyLabelFallback){
    if(document.getElementById(rowId)) return; // avoid duplicates
    var legacy = document.querySelector(legacySelector);
    if(!legacy && legacyLabelFallback){
      // fallback by matching label text
      var wanted = legacyLabelFallback.toLowerCase();
      var labels = document.querySelectorAll('label');
      for(var i=0;i<labels.length;i++){
        var L = labels[i];
        var txt = (L.textContent||'').toLowerCase();
        if(txt.indexOf(wanted) >= 0){
          var cb = L.querySelector('input[type="checkbox"]');
          if(cb){ legacy = cb; break; }
        }
      }
    }
    if(!legacy) return; // if still not found, skip silently

    var row = document.createElement('label');
    row.className = 'st-row';
    var cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = rowId;
    var span = document.createElement('span'); span.className = 'st-label'; span.textContent = labelText;
    row.appendChild(cb); row.appendChild(span);
    host.appendChild(row);

    function syncFromLegacy(){
      try{
        cb.indeterminate = false;
        cb.checked = !!legacy.checked;
      }catch(_){}
    }
    function applyToLegacy(state){
      try{
        if(legacy.tagName === 'INPUT' && legacy.type === 'checkbox'){
          if(!!legacy.checked !== !!state){ legacy.click(); }
        } else {
          if(state){ legacy.click(); } else { legacy.click(); }
        }
      }catch(_){}
    }
    cb.addEventListener('change', function(){ applyToLegacy(cb.checked); });
    try{ legacy.addEventListener('change', syncFromLegacy); }catch(_){}
    syncFromLegacy();
  }

  function bootOnce(){
    var host = ensureMuraItemsContainer();
    if(!host) return false;
    // Insert the 6 remaining items
    addRowBinding(host, 'storia-mura-carolinge',    'Mura Carolinge (848 - 889 d.C.)',      '#chk-wall-carolinge',    'Mura Carolinge');
    addRowBinding(host, 'storia-mura-barbarossa',   'Mura del Barbarossa (1155 - 1159)',    '#chk-wall-barbarossa',   'Mura del Barbarossa');
    addRowBinding(host, 'storia-mura-molo',         'Mura del Molo (1269)',                 '#chk-wall-porto',        'Mura del Molo');
    addRowBinding(host, 'storia-mura-repubblica',   'Mura della Repubblica (1346 – 1358)',  '#chk-wall-repubblica',   'Mura della Repubblica');
    addRowBinding(host, 'storia-mura-rinascimento', 'Mura del Rinascimento (1536 – 1553)',  '#chk-wall-rinascimento', 'Mura del Rinascimento');
    addRowBinding(host, 'storia-mura-nuove',        'Mura Nuove (1626 – 1639)',             '#chk-wall-nuove',        'Mura Nuove');
    return true;
  }

  function waitAndRun(maxTries){
    var tries = 0, h = setInterval(function(){
      tries++;
      if(bootOnce()){ clearInterval(h); }
      else if(tries >= maxTries){ clearInterval(h); }
    }, 150);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ waitAndRun(50); });
  } else {
    waitAndRun(50);
  }
})();
