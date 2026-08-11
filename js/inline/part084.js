
/* DOC icon: cinecamera */
function docIcon(){
  var html = '<div class="past-map-marker past-marker-minidoc"><img src="icons/passato/minidoc.svg" alt=""></div>';
  return L.divIcon({ className:'doc-ico', html:html, iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-15] });
}
