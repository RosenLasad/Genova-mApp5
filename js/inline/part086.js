
/* === METRO markers toggle (icons smaller than dock, 28x28) === */
(function(){

  // Build a small Metro icon (28x28) matching the dock style (red square, dark 'M')
  function metroIconSmall(){
    const html = '<div class="transport-map-marker transport-marker-metro"><img src="icons/come-muoversi/metropolitana.svg" alt=""></div>';
    return L.divIcon({ className:'metro-ico', html:html, iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-15] });
  }

  var groupMetro = L.layerGroup(); // start hidden
  var metroBuilt = false;

  function buildMetroOnce(){
    if (metroBuilt) return;

    var data = window.METRO_STATIONS || [];
    data.forEach(function(p){
      var m = L.marker([p.lat, p.lng], { icon: metroIconSmall() }).bindPopup(p.name);
      groupMetro.addLayer(m);
    });

    metroBuilt = true;
  }


  function toggleMetro(){
    try{
      buildMetroOnce();
      if (map.hasLayer(groupMetro)) {
        map.removeLayer(groupMetro);
      } else {
        groupMetro.addTo(map);
      }
    }catch(e){ typeof console !== 'undefined' && console.warn && console.warn(
'Metro toggle error', e); }
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-metro');
    if(!btn) return false;
    btn.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      toggleMetro();
      
      // Sync aria-pressed with actual layer visibility
      btn.setAttribute('aria-pressed', (map.hasLayer(groupMetro)).toString());
    
    });
    return true;
  }

  var tries=0, max=60;
  var iv = setInterval(function(){
    if (typeof L !== 'undefined' && typeof map !== 'undefined' && attach()) { clearInterval(iv); }
    if (++tries >= max) clearInterval(iv);
  }, 150);
})();
