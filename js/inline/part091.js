
/* === MUSEI markers toggle — 28x28 icons with temple glyph === */
(function(){
  

  function museumIconSmall(){
    const svg = '<div class="past-map-marker past-marker-museums"><img src="icons/passato/musei.svg" alt=""></div>';
    return L.divIcon({ className:'museum-ico', html:svg, iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-15] });
  }

  var groupMuseums = L.layerGroup();
  var museumsBuilt = false;

  function buildMuseumsOnce(){
    if (museumsBuilt) return;

    var pts = (window.MUSEI_DATA || []);
    if (!Array.isArray(pts) || !pts.length) return;

    pts.forEach(function(p){
      var m = L.marker([p.lat, p.lng], { icon: museumIconSmall() });
      
if (m && m.unbindPopup) m.unbindPopup();
groupMuseums.addLayer(m);

     if (window.museumSpecialPopups) {
   window.museumSpecialPopups(p, m);
 }


  });
  museumsBuilt = true;
  }

  function toggleMuseums(){
    try{
      buildMuseumsOnce();
      if (map.hasLayer(groupMuseums)) map.removeLayer(groupMuseums);
      else groupMuseums.addTo(map);
    }catch(e){ typeof console !== 'undefined' && console.warn && console.warn(
'Museums toggle error', e); }
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-museum');
    if (!btn) return false;
    btn.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      toggleMuseums();
      btn.setAttribute('aria-pressed', (map.hasLayer(groupMuseums)).toString());
    });
    return true;
  }

  var tries=0, max=60;
  var iv = setInterval(function(){
    if (typeof L !== 'undefined' && typeof map !== 'undefined' && attach()) { clearInterval(iv); }
    if (++tries >= max) clearInterval(iv);
  }, 150);
})();
