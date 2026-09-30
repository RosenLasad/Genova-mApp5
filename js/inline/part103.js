
(function(){
  var aereoLayer = null;
  var aereoBuilt = false;
  var mapRef = null;

  function ensureMap(){
    if (aereoLayer && mapRef && typeof L !== 'undefined') return true;
    try{
      if (typeof map !== 'undefined') mapRef = map;
    }catch(e){}
    return !!mapRef;
  }

  function buildLayer(){
    if (aereoBuilt || !ensureMap() || typeof L === 'undefined') return;
    aereoBuilt = true;
    aereoLayer = L.layerGroup();

    var iconHTML = '<div class="transport-map-marker transport-marker-air"><img src="icons/come-muoversi/aereo.svg" alt=""></div>';

    var aereoIcon = L.divIcon({
      className: 'aereo-marker',
      iconSize: [30,30],
      iconAnchor: [15,15],
      popupAnchor: [0,-15],
      html: iconHTML
    });

    // Dati punto: Aereoporto Cristoforo Colombo
    var p = {
      name: 'Aereoporto Cristoforo Colombo',
      desc: 'Aereoporto di Genova',
      addr: "Via Pionieri e Aviatori d\'Italia, 1, 16154 Genova",
      url: 'https://www.airport.genova.it/',
      lat: 44.4149038775052,
      lng: 8.850570043188567
    };

    function getLang(){
      try{
        return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
      }catch(_){
        return document.documentElement.getAttribute('lang') || 'it';
      }
    }


            function popupHTML(pt){
      var lang = getLang();
      var dir  = /^ar/i.test(lang) ? 'rtl' : 'ltr';

      // Etichetta "Indirizzo" tradotta
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
      var addrLabel = (ADDR_LABEL[lang] || ADDR_LABEL.it);

      // Etichetta "Sito / informazioni" tradotta
      var LINK_LABEL = {
        it: "Sito / informazioni",
        en: "Website / info",
        es: "Sitio / información",
        fr: "Site / informations",
        ar: "الموقع / معلومات",
        ru: "Сайт / информация",
        zh: "网站 / 信息",
        lij:"Sîto / informaçioìn"
      };
      var linkLabel = (LINK_LABEL[lang] || LINK_LABEL.it);

      // Descrizione tradotta
      var DESC_LABEL = {
        it: "Aereoporto di Genova",
        en: "Genoa Airport",
        es: "Aeropuerto de Génova",
        fr: "Aéroport de Gênes",
        lij:"Aeroporto de Zêna",
        ru:"Аэропорт Генуи",
        zh:"热那亚机场",
        ar:"مطار جنوة"
      };

      var title = (pt.name || "").toString();
      var desc  = DESC_LABEL[lang] || DESC_LABEL.it;
      var addr  = (pt.addr || "").toString();
      var url   = (pt.url  || "").toString();

      var html =
        '<div class="mh-popup" dir="'+dir+'">'+
        '  <h3 class="mh-popup-title">'+title+'</h3>';

      if (desc){
        html +=
          '  <p class="mh-popup-desc">'+desc+'</p>';
      }

      if (addr){
        html +=
          '  <div style="margin-top:.35rem;font-size:.86rem;opacity:.9">'+
          '    <strong>'+addrLabel+':</strong> '+addr+
          '  </div>';
      }

      if (url){
        html +=
          '  <div class="mh-popup-link" style="margin-top:.25rem;font-size:.86rem;">'+
          '    <a href="'+url+'" target="_blank" rel="noopener">'+
          '      '+linkLabel+
          '    </a>'+
          '  </div>';
      }

      html += '</div>';
      return html;
    }


    var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
    if (!lat || !lng || !isFinite(lat) || !isFinite(lng)) return;

    var marker = L.marker([lat, lng], {
      icon: aereoIcon,
      title: p.name || ''
    });

    var html0 = popupHTML(p);
    marker.bindPopup(html0, { className: 'mh-popup' });

    marker.on('popupopen', function(ev){
      try{
        ev.popup.setContent(popupHTML(p));
      }catch(_){}
    });

    try{
      document.addEventListener('app:set-lang', function(){
        try{
          if (marker.isPopupOpen && marker.isPopupOpen()){
            marker.setPopupContent(popupHTML(p));
          }
        }catch(_){}
      });
    }catch(_){}


    aereoLayer.addLayer(marker);
 }

  function toggleLayer(){
    if (!ensureMap()) return;
    buildLayer();
    if (!aereoLayer) return;
    if (mapRef.hasLayer(aereoLayer)) mapRef.removeLayer(aereoLayer);
    else aereoLayer.addTo(mapRef);
  }

  function attach(){
    // Il bottone clonato nei quick toggles
    var btn = document.querySelector('#quick-toggles .qt-aereo');
    if (!btn) return false;

    btn.setAttribute('aria-pressed','false');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
      if (aereoLayer && mapRef){
        btn.setAttribute(
          'aria-pressed',
          mapRef.hasLayer(aereoLayer).toString()
        );
      }
    });

    return true;
  }

  // Aspetta che mappa e quick toggles siano pronti
  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if (typeof L !== 'undefined' &&
        typeof map !== 'undefined' &&
        attach()){
      clearInterval(iv);
    }else if (++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();
