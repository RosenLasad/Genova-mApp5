
// === Percorsi: persistenza selezioni DISABILITATA ===
(function(){
  // Questo stub disattiva qualsiasi caricamento/salvataggio
  // Tutte le checkbox devono partire spente e niente viene ricordato
  window.routesSelectionStore = {
    loadSelected: function(){ return {}; },
    saveSelected: function(){},
    applySavedToMenu: function(){
      var boxes = document.querySelectorAll('#routes-menu input.route-chk');
      boxes.forEach(function(chk){
        chk.checked = false;
      });
    }
  };
})();
