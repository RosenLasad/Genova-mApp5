/* Genova mApp - Chiusura popup luoghi (fix click X 2026-10-29 v5).
   Mantiene il comportamento di chiusura New Home e non interviene sui popup delle Mura. */
(function(){
  'use strict';

  function leafletMap(){
    var m = window.__LEAFLET_MAP__ || window.map || window.__map;
    return m && typeof m.closePopup === 'function' ? m : null;
  }
  window.GMCloseMapPopup = function(){
    var m = leafletMap();
    if(m) { try { m.closePopup(); } catch (_) {} }
  };

  function isWallPopup(container){
    var content = container && container.querySelector('.leaflet-popup-content');
    return !!(content && content.querySelector(
      '.mura-media, [class*="mura-popup"], [class*="wall-popup"], [data-wall-id], [data-wall-key]'
    ));
  }

  function decorate(container, leafletPopup){
    if(!container || !container.isConnected || isWallPopup(container)) return;
    if(container.querySelector('.gm-map-popup-close')) return;

    var wrapper = container.querySelector('.leaflet-popup-content-wrapper');
    if(!wrapper) return;

    // Il pulsante nativo puo essere presente ma invisibile o sovrapposto:
    // usiamo sempre una sola X esplicita per i popup dei luoghi.
    var nativeButton = container.querySelector('.leaflet-popup-close-button');
    if(nativeButton) nativeButton.style.setProperty('display', 'none', 'important');

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'gm-map-popup-close';
    button.textContent = '\u00d7';
    button.setAttribute('aria-label', 'Chiudi popup');
    button.title = 'Chiudi';
    button.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();

      // Leaflet collega il proprio handler al pulsante nativo anche quando
      // quest'ultimo e nascosto via CSS. E il riferimento piu affidabile:
      // funziona anche per popup rilevati dal MutationObserver, senza
      // bisogno di conoscere la variabile che contiene la mappa.
      var nativeClose = container.querySelector('.leaflet-popup-close-button');
      if(nativeClose){
        try { nativeClose.click(); } catch (_) {}
        if(!container.isConnected) return;
      }

      // Se l'evento popupopen ha fornito il popup originale, usa la
      // mappa a cui quel popup appartiene (non una mappa globale presunta).
      if(leafletPopup){
        try {
          if(leafletPopup._map && typeof leafletPopup._map.closePopup === 'function'){
            leafletPopup._map.closePopup(leafletPopup);
            if(!container.isConnected) return;
          }
          if(typeof leafletPopup._close === 'function'){
            leafletPopup._close();
            if(!container.isConnected) return;
          }
        } catch (_) {}
      }

      // Ultima alternativa: chiusura del popup attivo sulla mappa globale.
      var map = leafletMap();
      if(map){
        try { map.closePopup(); } catch (_) {}
      }
    });
    wrapper.appendChild(button);
  }

  function scan(){
    document.querySelectorAll('#map .leaflet-popup').forEach(function(node){
      decorate(node, null);
    });
  }

  var css = document.createElement('style');
  css.textContent =
    '#map .leaflet-popup-content-wrapper{position:relative!important;overflow:visible!important}' +
    '#map .gm-map-popup-close{' +
    'position:absolute!important;top:10px!important;right:10px!important;left:auto!important;bottom:auto!important;' +
    'z-index:2147483640!important;display:flex!important;visibility:visible!important;opacity:1!important;' +
    'align-items:center!important;justify-content:center!important;' +
    'min-width:32px!important;width:32px!important;min-height:32px!important;height:32px!important;' +
    'margin:0!important;padding:0!important;transform:none!important;' +
    'border:2px solid #fff!important;border-radius:50%!important;' +
    'background:#172337!important;color:#fff!important;-webkit-text-fill-color:#fff!important;' +
    'font-family:Arial,sans-serif!important;font-size:26px!important;font-weight:700!important;line-height:26px!important;' +
    'text-align:center!important;text-decoration:none!important;text-indent:0!important;' +
    'cursor:pointer!important;pointer-events:auto!important;touch-action:manipulation!important;' +
    'box-shadow:0 2px 7px rgba(0,0,0,.4)!important}' +
    '#map .gm-map-popup-close:hover{background:#000!important}' +
    '#map .gm-map-popup-close:focus-visible{outline:3px solid #f6c65b!important;outline-offset:2px!important}';
  (document.head || document.documentElement).appendChild(css);

  function boot(){
    var root = document.getElementById('map');
    if(!root) return;
    var map = leafletMap();
    if(map && typeof map.on === 'function'){
      map.on('popupopen', function(e){
        if(e && e.popup) decorate(e.popup.getElement && e.popup.getElement(), e.popup);
      });
    }
    var pending = false;
    new MutationObserver(function(){
      if(pending) return;
      pending = true;
      Promise.resolve().then(function(){ pending = false; scan(); });
    }).observe(root, {childList:true, subtree:true});
    scan();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
