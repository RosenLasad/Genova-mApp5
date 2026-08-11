
if (window.__forti_toggle_v3__) { /* already loaded */ }
else { window.__forti_toggle_v3__ = true; (function(){
(function(){
  var btnBound = false;
  var fortiLayer = null;
  var built = false;

  function ensureButton(){
    var root = document.getElementById('quick-toggles');
    if(!root) return null;
    var btn = root.querySelector('.qt-forti');
    return btn || null;
  }

  function getMap(){
    return window.map || window.MAP || window.leafletMap || null;
  }

  function ensureClickBinding(btn){
    if(btnBound || !btn) return;
    btnBound = true;
    // default OFF unless attribute says otherwise
    if(!btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed','true'); // always-on by default
    btn.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      var on = btn.getAttribute('aria-pressed') === 'true';
      var willOn = !on;
      btn.setAttribute('aria-pressed', willOn ? 'true' : 'false');
      // if layer exists, toggle immediately
      var mapRef = getMap();
      if(fortiLayer && mapRef){
        if(willOn){
          if(!mapRef.hasLayer(fortiLayer)) fortiLayer.addTo(mapRef);
        }else{
          if(mapRef.hasLayer(fortiLayer)) mapRef.removeLayer(fortiLayer);
        }
      }
    });
  }

  function esc(s){
    return String(s).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]) || m; });
  }

function buildLayer(mapRef){
    if(built || !mapRef || typeof L === 'undefined') return;
    fortiLayer = L.layerGroup();
    var fortiSvg = '<div class="past-map-marker past-marker-forts"><img src="icons/passato/forti.svg" alt=""></div>';

    var fortiIcon = L.divIcon({
      className: 'forti-marker',
      html: fortiSvg,
      iconSize: [30,30],
      iconAnchor: [15,15],
      popupAnchor: [0,-15]
    });


    function getLang(){
      try{
        return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
      }catch(_){
        return document.documentElement.getAttribute('lang') || 'it';
      }
    }

    function esc(s){
      return String(s).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]) || m; });
    }

    function popupHTML(p){
      var lang = getLang();
      var dir  = /^ar/i.test(lang) ? 'rtl' : 'ltr';
// NEW: etichetta "Indirizzo" tradotta
var ADDR_LABEL = {
  it: "Indirizzo",
  en: "Address",
  fr: "Adresse",
  es: "Dirección",
  ar: "العنوان",
  ru: "Адрес",
  zh: "地址",
  lij:"Indirìsso"
};
var addrLabel = (ADDR_LABEL[lang] || ADDR_LABEL.it) + ": ";

var LINK_LABEL = {
  it:  "sito/link",
  en:  "website / link",
  es:  "sitio/enlace",
  fr:  "site / lien",
  ar:  "الموقع / الرابط",
  ru:  "сайт / ссылка",
  zh:  "网站/链接",
  lij: "sito/link"
};
var linkLabel = LINK_LABEL[lang] || LINK_LABEL.it;


      var name = p.name || p.title || 'Forte';
      var addr = p.addr || p.address || '';
      var site = p.site || p.url || '';
      var img  = p.img || '';
      var desc = '';
      if(p.desc && typeof p.desc === 'object'){
        desc = p.desc[lang] || p.desc.it || p.desc.en || '';
      }else{
        desc = p.desc || p.description || '';
      }
      return (
'<div class="mh-popup forti-popup" dir="'+dir+'">'
        + '<span class="mh-popup-title">' + esc(name) + '</span>'
         + (img ? (
        '<div class="mh-popup-img">'
        + '<img src="'+esc(img)+'" alt="'+esc(name)+'" '
        + 'style="display:block;max-width:100%;height:auto;'
        + 'margin:6px 0 4px;border-radius:6px;" />'
        + '</div>'
      ) : '')
        + (desc ? '<p class="mh-popup-desc">' + esc(desc) + '</p>' : '')
        + (addr ? '<div class="mh-popup-addr"><strong>' + esc(addrLabel) + '</strong>' + esc(addr) + '</div>' : '')
+ (site ? '<div class="mh-popup-link"><a href="'+esc(site)+'" target="_blank" rel="noopener">' + esc(linkLabel) + '</a></div>' : '')
        + '</div>'
      );
    }

    var data = (window.FORTI_DATA || []).filter(Boolean);

data.forEach(function(p){
  if(!p || typeof p.lat !== 'number' || typeof p.lng !== 'number') return;

  var m = L.marker([p.lat, p.lng], { icon: fortiIcon });
  m._fortiData = p;

  // UNA sola bindPopup. Se vuoi più classi, le metti nella stringa:
  m.bindPopup(popupHTML(p), { className: 'mh-popup forti-popup-wrap' });

  // popup sempre rigenerato con lingua corrente quando si apre
  m.on('popupopen', function(ev){
    try{
      ev.popup.setContent(popupHTML(p));
    }catch(_){}
  });

  fortiLayer.addLayer(m);
});


    try {
      var mo = new MutationObserver(function(){
        fortiLayer.eachLayer(function(layer){
          if(layer && layer.getPopup && layer.isPopupOpen && layer.isPopupOpen()){
            layer.setPopupContent(popupHTML(layer._fortiData || {}));
          }
        });
      });
      mo.observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
    } catch(_){}

    built = true;
    return fortiLayer;
}
var tries = 0, max = 200;
  var iv = setInterval(function(){
    var btn = ensureButton();
    if(btn) ensureClickBinding(btn);
    var mapRef = getMap();
    if(mapRef && !built){
      var lyr = buildLayer(mapRef);
      if(lyr){
        var shouldOn = (btn && btn.getAttribute('aria-pressed') === 'true');
        if(shouldOn){ lyr.addTo(mapRef); }
      }
    }
    if(++tries >= max){ clearInterval(iv); }
      }, 120);
})();
})(); }
