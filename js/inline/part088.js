
/* === FUNI markers toggle (icons smaller than dock, 28x28) === */
(function(){

  function funiIconSmall(){
    const html = '<div class="transport-map-marker transport-marker-funi"><img src="icons/come-muoversi/impianti-verticali.svg" alt=""></div>';
    return L.divIcon({ className:'funi-ico', html:html, iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-15] });
  }

  var groupFuni = L.layerGroup();
  var funiBuilt = false;

function findBy(arr, test){
  for (var i = 0; i < arr.length; i++){
    if (test(arr[i])) return arr[i];
  }
  return null;
}


  function buildFuniOnce(){
    if (funiBuilt) return;

    var data = window.FUNI_POINTS || [];

    data.forEach(function(p){
      var m = L.marker([p.lat, p.lng], { icon: funiIconSmall() }).bindPopup(p.name);
      groupFuni.addLayer(m);
    });

    // === Polyline example: Funicolare Sant'Anna (bassa ↔ alta) ===
    try {
      var santAnnaBassa = findBy(data, function(p){
  return /Funicolare Sant'Anna \(bassa\)/.test(p.name);
});
var santAnnaAlta  = findBy(data, function(p){
  return /Funicolare Sant'Anna \(alta\)/.test(p.name);
});

      if (santAnnaBassa && santAnnaAlta && typeof L !== 'undefined') {
        var santAnnaLine = L.polyline(
          [[santAnnaBassa.lat, santAnnaBassa.lng], [santAnnaAlta.lat, santAnnaAlta.lng]],
          { color: "#b67a69", weight: 3, opacity: 0.95 }
        );
        groupFuni.addLayer(santAnnaLine);
      }
    } catch(e){
      typeof console !== 'undefined' && console.warn && console.warn("Sant'Anna line error", e);
    }

    // === Polyline example: Ascensore Castelletto Levante (bassa ↔ alta) ===
    try {
      var castLevBassa = findBy(data, function(p){
  return /Ascensore (?:di\s+)?Castelletto Levante \(bassa\)/.test(p.name);
});
var castLevAlta  = findBy(data, function(p){
  return /Ascensore (?:di\s+)?Castelletto Levante \(alta\)/.test(p.name);
});

      if (castLevBassa && castLevAlta && typeof L !== 'undefined') {
        var castLevLine = L.polyline(
          [[castLevBassa.lat, castLevBassa.lng], [castLevAlta.lat, castLevAlta.lng]],
          { color: "#b67a69", weight: 3, opacity: 0.95 }
        );
        groupFuni.addLayer(castLevLine);
      }
    } catch(e){
      typeof console !== 'undefined' && console.warn && console.warn("Castelletto Levante line error", e);
    }

    // === Polyline example: Ascensore d'Albertis–Monteg(a)l(let)to (bassa ↔ alta) ===
    try {
      var albertisBassa = findBy(data, function(p){
  return p.name === "Ascensore d'Albertis-Montegalletto (bassa)";
});
var albertisAlta  = findBy(data, function(p){
  return p.name === "Ascensore d'Albertis-Montegalletto (alta)";
}) || findBy(data, function(p){
  return p.name === "Ascensore d'Albertis-Montegalletto (alta)";
});

      if (albertisBassa && albertisAlta && typeof L !== 'undefined') {
        var albertisLine = L.polyline(
          [[albertisBassa.lat, albertisBassa.lng], [albertisAlta.lat, albertisAlta.lng]],
          { color: "#b67a69", weight: 3, opacity: 0.95 }
        );
        groupFuni.addLayer(albertisLine);
      }
    } catch(e){
      typeof console !== 'undefined' && console.warn && console.warn("D'Albertis–Montegalletto line error", e);
    }

    // === Polyline: Cremagliera di Granarolo (Principe -> ... -> Granarolo) ===
    try {
// helper unico per trovare un punto per nome (senza arrow e senza .find)
function _gp(n){
  return findBy(data, function(p){
    return p && p.name === n;
  });
}

      var Principe = _gp("Cremagliera Principe/Granarolo - Principe");
      var Centurione = _gp("Cremagliera Principe/Granarolo - Centurione");
      var Bari = _gp("Cremagliera Principe/Granarolo - Bari");
      var Cambiaso = _gp("Cremagliera Principe/Granarolo - Cambiaso");
      var SalitaGranarolo = _gp("Cremagliera Principe/Granarolo - Salita Granarolo");
      var Chiassaiuola = _gp("Cremagliera Principe/Granarolo - Chiassaiuola");
      var Granarolo = _gp("Cremagliera Principe/Granarolo - Granarolo");

      // unnamed bend vertex (not a marker)
      var bendVertex = { lat: 44.42046916572655, lng: 8.916739496488168 };

      var chain = [Principe, Centurione, bendVertex, Bari, Cambiaso, SalitaGranarolo, Chiassaiuola, Granarolo]
        .filter(Boolean)
        .map(function(p){ return [p.lat, p.lng]; });


      if (chain.length >= 2 && typeof L !== 'undefined') {
        var granaroloLine = L.polyline(chain, { color: "#b67a69", weight: 3, opacity: 0.95 });
        groupFuni.addLayer(granaroloLine);
      }
    } catch(e){
      typeof console !== 'undefined' && console.warn && console.warn("Granarolo line error", e);
    }

    // === Polyline: Funicolare Zecca–Righi (Zecca -> ... -> Righi) ===
    try {
      function _gp2(n){
  return findBy(data, function(p){
    return p && p.name === n;
  });
}


      var Zecca      = _gp2("Funicolare Zecca/Righi - Zecca");
      var Carbonara  = _gp2("Funicolare Zecca/Righi - Carbonara");
      var SanNicola  = _gp2("Funicolare Zecca/Righi - San Nicola");
      var Madonnetta = _gp2("Funicolare Zecca/Righi - Madonnetta");
      var Preve      = _gp2("Funicolare Zecca/Righi - Preve");
      var SanSimone  = _gp2("Funicolare Zecca/Righi - San Simone");
      var Righi      = _gp2("Funicolare Zecca/Righi - Righi");

      // unnamed bend vertices (not markers)
      var bend1 = { lat: 44.42041293646634, lng: 8.931948548806067 };
      var bend2 = { lat: 44.42179854258535, lng: 8.933115362852206 };

      var chain2 = [Zecca, Carbonara, SanNicola, bend1, Madonnetta, bend2, Preve, SanSimone, Righi]
        .filter(Boolean)
        .map(function(p){ return [p.lat, p.lng]; });


      if (chain2.length >= 2 && typeof L !== 'undefined') {
        var zeccaRighiLine = L.polyline(chain2, { color: "#b67a69", weight: 3, opacity: 0.95 });
        groupFuni.addLayer(zeccaRighiLine);
      }
    } catch(e){
      typeof console !== 'undefined' && console.warn && console.warn("Zecca–Righi line error", e);
    }

    funiBuilt = true;
  }

  function toggleFuni(){
    try{
      buildFuniOnce();
      if (map.hasLayer(groupFuni)) map.removeLayer(groupFuni);
      else groupFuni.addTo(map);
    }catch(e){
      typeof console !== 'undefined' && console.warn && console.warn('FUNI toggle error', e);
    }
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-funi');
    if (!btn) return false;
    btn.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      toggleFuni();
      btn.setAttribute('aria-pressed', (map.hasLayer(groupFuni)).toString());
    });
    return true;
  }

  var tries=0, max=60;
  var iv = setInterval(function(){
    if (typeof L !== 'undefined' && typeof map !== 'undefined' && attach()) { clearInterval(iv); }
    if (++tries >= max) clearInterval(iv);
  }, 150);

})();
