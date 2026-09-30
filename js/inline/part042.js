
(function(){
  window.whenMapReady = function(fn){
    // Se la mappa è già pronta e ha addLayer, esegui subito
    if (typeof window !== 'undefined' && window.map && typeof map.addLayer === 'function') {
      fn();
      return;
    }
    // Altrimenti, aspetta il load della pagina e riprova
    window.addEventListener('load', function(){
      if (window.map && typeof map.addLayer === 'function') {
        fn();
      }
    });
  };
})();
