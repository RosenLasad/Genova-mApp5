
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
  function norm(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim(); }
  function findOriginalCheckbox(){
    var byId = document.querySelector('#chk-wall-romane');
    if(byId) return byId;
    var wanted = norm('Mura Romane');
    var labels = document.querySelectorAll('label');
    for(var i=0;i<labels.length;i++){
      var L = labels[i];
      var txt = norm(L.textContent);
      if(txt.indexOf(wanted) >= 0){
        var cb = L.querySelector('input[type="checkbox"]');
        if(cb) return cb;
      }
    }
    return null;
  }
  function addRow(host, original){
    var row = document.createElement('label');
    row.className = 'st-row';
    var cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = 'storia-mura-pre-romane';
    var span = document.createElement('span'); span.className = 'st-label'; span.textContent = 'Mura Pre-Romane (544 - 458 a.C.)';
    row.appendChild(cb); row.appendChild(span);
    host.appendChild(row);

    function syncFromOriginal(){
      try{
        var on = !!original.checked;
        cb.indeterminate = false;
        cb.checked = on;
      }catch(_){}
    }
    function applyToOriginal(state){
      try{
        if(original.tagName === 'INPUT' && original.type === 'checkbox'){
          if(!!original.checked !== !!state){ original.click(); }
        } else {
          if(state){ original.click(); } else { original.click(); }
        }
      }catch(_){}
    }

    cb.addEventListener('change', function(){ applyToOriginal(cb.checked); });
    try{ original.addEventListener('change', syncFromOriginal); }catch(_){}
    syncFromOriginal();
  }

  function bootOnce(){
    var host = ensureMuraItemsContainer();
    if(!host) return false;
    var orig = findOriginalCheckbox();
    if(!orig) return false;
    if(document.getElementById('storia-mura-pre-romane')) return true;
    addRow(host, orig);
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
