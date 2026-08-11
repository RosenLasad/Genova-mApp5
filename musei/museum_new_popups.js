(function(){
  'use strict';

  var previous = window.museumSpecialPopups;

  function language(){
    try{
      return (localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it')
        .toLowerCase().split('-')[0];
    }catch(_){ return 'it'; }
  }

  function translated(value){
    if(!value || typeof value !== 'object') return value || '';
    var lang = language();
    return value[lang] || value.it || value.en || '';
  }

  function escapeHtml(value){
    if(typeof window.esc === 'function') return window.esc(value);
    return String(value || '').replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function popupHtml(place){
    var html = window.museumPopupHTML
      ? window.museumPopupHTML(place)
      : '<div class="mh-popup"><span class="mh-popup-title">' + escapeHtml(place.name) + '</span></div>';
    var access = translated(place.access);
    if(!access) return html;

    var status = '<p class="mh-popup-access" role="status">' + escapeHtml(access) + '</p>';
    var anchor = '<div class="mh-popup-addr">';
    if(html.indexOf(anchor) !== -1) return html.replace(anchor, status + anchor);
    return html.replace('</div>', status + '</div>');
  }

  window.museumSpecialPopups = function(place, marker){
    if(!place || !place.genovaMappAccess){
      if(typeof previous === 'function') return previous(place, marker);
      return;
    }

    var initial = popupHtml(place);
    marker.bindPopup(initial, {className:'mh-popup'});
    marker.on('popupopen', function(event){
      try{ event.popup.setContent(popupHtml(place)); }catch(_){}
    });
    document.addEventListener('app:set-lang', function(){
      try{
        if(marker && marker.isPopupOpen && marker.isPopupOpen()) marker.setPopupContent(popupHtml(place));
      }catch(_){}
    });
  };
})();
