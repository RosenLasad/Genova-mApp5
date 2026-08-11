
(function(){
  var mareLayer   = null;
  var mareBuilt   = false;
  var mapRef      = null;
  var mareMarkers = [];

  function ensureMap(){
    if (mareLayer && mapRef && typeof L !== 'undefined') return true;
    try{
      if (typeof map !== 'undefined') mapRef = map;
    }catch(e){}
    return !!mapRef;
  }

  function getLang(){
    try{
      return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
    }catch(_){
      return document.documentElement.getAttribute('lang') || 'it';
    }
  }

  function popupHTML(pt){
    var lang = (getLang() || 'it').toLowerCase();
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
    var addrLabel = ADDR_LABEL[lang] || ADDR_LABEL.it;

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
    var linkLabel = LINK_LABEL[lang] || LINK_LABEL.it;

    // Descrizioni tradotte per i 4 punti "mare"
    var DESC = {
      terminal_traghetti: {
        it: "Imbarco per traghetti diretti in Sardegna, Sicilia, Corsica e Nord Africa.",
        en: "Ferry departures to Sardinia, Sicily, Corsica and North Africa.",
        es: "Embarque para ferris con destino a Cerdeña, Sicilia, Córcega y el Norte de África.",
        fr: "Embarquement pour ferries à destination de la Sardaigne, de la Sicile, de la Corse et de l'Afrique du Nord.",
        lij:"Inbarco pe traghetti pe Sardegna, Sicilia, Còrsega e Nord Affrica.",
        ru:"Посадка на паромы до Сардинии, Сицилии, Корсики и Северной Африки.",
        zh:"开往撒丁岛、西西里岛、科西嘉和北非的渡轮登船处。",
        ar:"صعود العَبَّارات المتجهة إلى سردينيا وصقلية وكورسيكا وشمال أفريقيا."
      },
      terminal_crociere: {
        it: "Imbarco per navi da crociera.",
        en: "Cruise ship departures.",
        es: "Embarque para cruceros.",
        fr: "Embarquement pour navires de croisière.",
        lij:"Inbarco pe nave da croxêa.",
        ru:"Посадка на круизные лайнеры.",
        zh:"邮轮登船处。",
        ar:"صعود السفن السياحية (الكروز)."
      },
      golfo_paradiso: {
        it: "Imbarco per battelli diretti a Recco, Camogli, Pegli.",
        en: "Boats to Recco, Camogli and Pegli.",
        es: "Embarque para barcos hacia Recco, Camogli y Pegli.",
        fr: "Embarquement pour bateaux vers Recco, Camogli et Pegli.",
        lij:"Inbarco pe batèi pe Recco, Camoggi e Peggi.",
        ru:"Посадка на катера до Рекко, Камольи и Пегли.",
        zh:"前往雷科、卡莫利和佩利的游船登船处。",
        ar:"صعود القوارب المتجهة إلى ريكّو وكامولي وبيغلي."
      },
      navebus: {
        it: "Imbarco battelli per Genova Porto Antico.",
        en: "Boats to Genoa Porto Antico.",
        es: "Embarque para barcos hacia Génova Porto Antico.",
        fr: "Embarquement pour bateaux vers Gênes Porto Antico.",
        lij:"Inbarco pe batèi pe Zêna Porto Antîgo.",
        ru:"Посадка на катера до Генуя Порто Антико.",
        zh:"前往热那亚旧港（Porto Antico）的渡船登船处。",
        ar:"صعود القوارب المتجهة إلى جنوة بورتو أنتيكو."
      }
    };

    var title = (pt.name || "").toString();
    var addr  = (pt.addr || "").toString();
    var url   = (pt.url  || "").toString();

    var dMap  = DESC[pt.id] || DESC.terminal_traghetti;
    var desc  = dMap[lang] || dMap.it;

    var html =
      '<div class="mh-popup" dir="'+dir+'">'+
      '  <h3 class="mh-popup-title">'+title+'</h3>';

    if (desc){
      html += '  <p class="mh-popup-desc">'+desc+'</p>';
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

  function buildLayer(){
    if (mareBuilt || !ensureMap() || typeof L === 'undefined') return;
    mareBuilt = true;
    mareLayer = L.layerGroup();

    var iconHTML = '<div class="transport-map-marker transport-marker-sea"><img src="icons/come-muoversi/navi-battelli.svg" alt=""></div>';

    var mareIcon = L.divIcon({
      className: 'mare-marker',
      iconSize: [30,30],
      iconAnchor: [15,15],
      popupAnchor: [0,-15],
      html: iconHTML
    });

    // I 4 punti "Mare"
    var points = [
      {
        id:   'terminal_traghetti',
        name: 'Terminal Traghetti',
        addr: 'Piazzale dei Traghetti Iqbal Masih, 16126 Genova.',
        url:  'https://www.portsofgenoa.com/it',
        lat:  44.410861509772516,
        lng:  8.909000848098751
      },
      {
        id:   'terminal_crociere',
        name: 'Terminal Crociere',
        addr: 'Piazzale dei Traghetti Iqbal Masih, 16126 Genova.',
        url:  'https://www.smge.it/',
        lat:  44.41403997760142,
        lng:  8.918763277125333
      },
      {
        id:   'golfo_paradiso',
        name: 'Battelli Golfo Paradiso',
        addr: 'Calata Mandraccio, 16128 Genova.',
        url:  'http://www.golfoparadiso.it/',
        lat:  44.40834000106329,
        lng:  8.925844033875116
      },
      {
        id:   'navebus',
        name: 'Navebus',
        addr: 'Lungomare di Pegli, Genova GE',
        url:  'https://www.amt.genova.it/amt/trasporto-multimodale/navebus/',
        lat:  44.424590682110654,
        lng:  8.81937896387239
      }
    ];

    points.forEach(function(p){
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if (!lat || !lng || !isFinite(lat) || !isFinite(lng)) return;

      var m = L.marker([lat, lng], {
        icon: mareIcon,
        title: (p.name || '').toString()
      });

      m._mhData = p;

      var html0 = popupHTML(p);
      m.bindPopup(html0, { className: 'mh-popup' });

      m.on('popupopen', function(ev){
        try{
          ev.popup.setContent(popupHTML(p));
        }catch(_){}
      });

      mareMarkers.push(m);
      mareLayer.addLayer(m);
    });

    // Aggiorna i popup aperti quando cambia lingua
    try{
      document.addEventListener('app:set-lang', function(){
        mareMarkers.forEach(function(m){
          try{
            if (m.isPopupOpen && m.isPopupOpen()){
              m.setPopupContent(popupHTML(m._mhData));
            }
          }catch(_){}
        });
      });
    }catch(_){}
  }

  function toggleLayer(){
    if (!ensureMap()) return;
    buildLayer();
    if (!mareLayer) return;
    if (mapRef.hasLayer(mareLayer)) mapRef.removeLayer(mareLayer);
    else mareLayer.addTo(mapRef);
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-mare');
    if (!btn) return false;

    btn.setAttribute('aria-pressed','false');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
      if (mareLayer && mapRef){
        btn.setAttribute(
          'aria-pressed',
          mapRef.hasLayer(mareLayer).toString()
        );
      }
    });

    return true;
  }

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
