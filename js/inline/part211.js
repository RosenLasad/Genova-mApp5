
(function(){
  function debounce(fn, ms){ var t; return function(){ var a=arguments; clearTimeout(t); t=setTimeout(function(){ fn.apply(null,a); }, ms); }; }
  var onResize = debounce(function(){
    try{
      if (window.map && typeof map.invalidateSize === 'function'){ map.invalidateSize(); }
      // If you want to rescale image-based markers, call your layer rescaler here.
      // Example: if (window.fortiGroup) rescaleAllMarkers(fortiGroup);
    }catch(e){ /* no-op */ }
  }, 150);
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);
})();
