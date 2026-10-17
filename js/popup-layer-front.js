/* Genova mApp: keep Leaflet popups above map buttons without raising map tiles.
   The popup pane is reparented as a direct child of the map container;
   its offset mirrors Leaflet's map-pane translation during panning. */
(function () {
  'use strict';
  var installed = false;
  function install() {
    if (installed) return true;
    var map = window.map || window.__LEAFLET_MAP__;
    if (!map || typeof map.getPane !== 'function') return false;
    var container = map.getContainer();
    var mapPane = map.getPane('mapPane');
    var popupPane = map.getPane('popupPane');
    if (!container || !mapPane || !popupPane) return false;
    if (popupPane.parentNode !== mapPane && popupPane.parentNode !== container) return false;

    function syncOffset() {
      popupPane.style.transform = mapPane.style.transform || '';
      popupPane.style.webkitTransform = mapPane.style.webkitTransform || '';
    }
    syncOffset();
    if (popupPane.parentNode !== container) container.appendChild(popupPane);
    popupPane.classList.add('gm-popup-front-pane');
    var observer = new MutationObserver(syncOffset);
    observer.observe(mapPane, { attributes: true, attributeFilter: ['style'] });
    map.on('move zoom viewreset resize', syncOffset);
    installed = true;
    return true;
  }
  if (install()) return;
  var attempts = 0;
  var timer = setInterval(function () {
    if (install() || ++attempts >= 120) clearInterval(timer);
  }, 250);
})();
