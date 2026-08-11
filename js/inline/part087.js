
/* === BUS markers toggle (icons smaller than dock, 28x28) === */
(function(){

  function busIconSmall(){
    const html = '<div class="transport-map-marker transport-marker-bus"><img src="icons/come-muoversi/autobus.svg" alt=""></div>';
    return L.divIcon({ className:'bus-ico', html:html, iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-15] });
  }

  var groupBus = L.layerGroup(); // start hidden
  var busBuilt = false;

  function buildBusOnce(){
    if (busBuilt) return;

    var data = window.BUS_STATIONS || [];
    data.forEach(function(p){
      var m = L.marker([p.lat, p.lng], { icon: busIconSmall() }).bindPopup(p.name);
      groupBus.addLayer(m);
    });

    busBuilt = true;
  }

  function toggleBus(){
    try{
      buildBusOnce();
      if (map.hasLayer(groupBus)) map.removeLayer(groupBus);
      else groupBus.addTo(map);
    }catch(e){
      typeof console !== 'undefined' && console.warn && console.warn('BUS toggle error', e);
    }
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-bus');
    if (!btn) return false;

    btn.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      toggleBus();
      btn.setAttribute('aria-pressed', (map.hasLayer(groupBus)).toString());
    });
    return true;
  }

  var tries=0, max=60;
  var iv = setInterval(function(){
    if (typeof L !== 'undefined' && typeof map !== 'undefined' && attach()) { clearInterval(iv); }
    if (++tries >= max) clearInterval(iv);
  }, 150);

})();
