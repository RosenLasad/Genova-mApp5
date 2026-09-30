
// === Percorsi consigliati: persistenza dei tracciati attivi ===
(function(){
  'use strict';

  var STORAGE_KEY = 'genova_routes_selected_v1';
  var restoring = false;

  function routeIdForCheckbox(checkbox){
    if(!checkbox) return '';
    var row = checkbox.closest('.doc-row[data-route-id]');
    return row ? String(row.getAttribute('data-route-id') || '') : '';
  }

  function loadSelected(){
    var selected = {};
    try{
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if(Array.isArray(parsed)){
        parsed.forEach(function(id){ if(id) selected[String(id)] = true; });
      }else if(parsed && typeof parsed === 'object'){
        Object.keys(parsed).forEach(function(id){
          if(parsed[id]) selected[String(id)] = true;
        });
      }
    }catch(_e){}
    return selected;
  }

  function saveSelected(){
    var selected = {};
    document.querySelectorAll('#routes-menu .doc-row[data-route-id] input.route-chk').forEach(function(checkbox){
      var routeId = routeIdForCheckbox(checkbox);
      if(routeId && checkbox.checked) selected[routeId] = true;
    });
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(selected)); }catch(_e){}
    return selected;
  }

  function applySavedToMenu(){
    var hasSavedState = false;
    try{ hasSavedState = localStorage.getItem(STORAGE_KEY) !== null; }catch(_e){}
    if(!hasSavedState) return false;

    var selected = loadSelected();
    var boxes = document.querySelectorAll('#routes-menu .doc-row[data-route-id] input.route-chk');
    if(!boxes.length) return false;

    restoring = true;
    boxes.forEach(function(checkbox){
      var routeId = routeIdForCheckbox(checkbox);
      var shouldBeChecked = !!selected[routeId];
      if(checkbox.checked !== shouldBeChecked){
        checkbox.checked = shouldBeChecked;
        checkbox.dispatchEvent(new Event('change', { bubbles:true }));
      }else if(shouldBeChecked){
        // La checkbox puo essere gia stata ripristinata prima che Leaflet fosse
        // pronto. In tal caso ridisegna comunque il percorso: addRoute e'
        // idempotente e non crea duplicati se il tracciato esiste gia.
        try{
          if(window.__routesFallback && typeof window.__routesFallback.addRoute === 'function'){
            window.__routesFallback.addRoute(routeId);
          }
        }catch(_e){}
      }
    });
    restoring = false;
    return true;
  }

  window.routesSelectionStore = {
    key: STORAGE_KEY,
    loadSelected: loadSelected,
    saveSelected: saveSelected,
    applySavedToMenu: applySavedToMenu
  };

  // Memorizza ogni attivazione/disattivazione proveniente dal menu principale,
  // dalla New Home o dal menu laterale Percorsi.
  document.addEventListener('change', function(event){
    if(restoring || !event.target || !event.target.matches) return;
    if(!event.target.matches('#routes-menu input.route-chk')) return;
    window.setTimeout(saveSelected, 0);
  }, true);

  // I dati e i controlli dei percorsi sono caricati poco prima di questo blocco;
  // i tentativi successivi coprono anche avvii piu lenti su dispositivi mobili.
  var attempts = 0;
  (function restoreWhenReady(){
    attempts += 1;
    var boxesReady = document.querySelector('#routes-menu .doc-row[data-route-id] input.route-chk');
    var dataReady = window.__ROUTE_DATA && Object.keys(window.__ROUTE_DATA).length;
    var mapReady = window.map && window.L && window.map._loaded;
    var routesReady = window.__routesFallback && typeof window.__routesFallback.addRoute === 'function';
    if(boxesReady && dataReady && mapReady && routesReady){
      applySavedToMenu();
      return;
    }
    if(attempts < 100) window.setTimeout(restoreWhenReady, 100);
  })();
})();
