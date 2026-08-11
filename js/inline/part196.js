
(function(){
  function ensureAcqContainer(){
    var panel = document.getElementById('storia-acquedotti-panel') || document.querySelector('#storia-menu [data-sec="acquedotti"] .st-panel');
    if(!panel) return null;
    var host = document.getElementById('storia-acquedotti-items');
    if(!host){
      host = document.createElement('div');
      host.id = 'storia-acquedotti-items';
      panel.appendChild(host);
    }
    return host;
  }
  function norm(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim(); }
  function findLegacy(selector, labelFallback){
    var el = document.querySelector(selector);
    if(el) return el;
    if(labelFallback){
      var wanted = norm(labelFallback);
      var labels = document.querySelectorAll('label');
      for(var i=0;i<labels.length;i++){
        var L = labels[i];
        var txt = norm(L.textContent);
        if(txt.indexOf(wanted) >= 0){
          var cb = L.querySelector('input[type="checkbox"]');
          if(cb) return cb;
        }
      }
    }
    return null;
  }
  function addRow(host, rowId, i18nKey, fallbackText, legacySelector, legacyLabelFallback){
    if(document.getElementById(rowId)) return;
    var legacy = findLegacy(legacySelector, legacyLabelFallback);
    if(!legacy) return;

    var row = document.createElement('label');
    row.className = 'st-row';
    var cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = rowId;
    var span = document.createElement('span'); span.className = 'st-label'; span.setAttribute('data-i18n', i18nKey); span.textContent = fallbackText;
    row.appendChild(cb); row.appendChild(span);
    host.appendChild(row);

    function sync(){ try{ cb.indeterminate = false; cb.checked = !!legacy.checked; }catch(_){} }
    function apply(state){
      try{
        if(legacy.tagName === 'INPUT' && legacy.type === 'checkbox'){
          if(!!legacy.checked !== !!state){ legacy.click(); }
        } else { if(state){ legacy.click(); } else { legacy.click(); } }
      }catch(_){}
    }
    cb.addEventListener('change', function(){ apply(cb.checked); });
    try{ legacy.addEventListener('change', sync); }catch(_){}
    sync();
  }

  function boot(){
    var host = ensureAcqContainer();
    if(!host) return false;
    addRow(host, 'storia-acq-romano',  'storia.acq.romano',  'Acquedotto Romano (III sec. a.C.)',   '#chk-acq-romano',  'Acquedotto Romano');
    addRow(host, 'storia-acq-storico', 'storia.acq.storico', 'Acquedotto Storico (XVII sec.)',       '#chk-acq-storico', 'Acquedotto Storico');
    return true;
  }

  function waitAndRun(maxTries){
    var tries = 0, h = setInterval(function(){
      tries++;
      if(boot()){ clearInterval(h); }
      else if(tries >= maxTries){ clearInterval(h); }
    }, 150);
  }
  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', function(){ waitAndRun(50); }); }
  else { waitAndRun(50); }
})();
