
(function(){
  var chieseLayer = null;
  var chieseBuilt = false;
  var mapRef = null;

  function ensureMap(){
    if(mapRef && typeof L !== 'undefined') return true;
    try{
      if(typeof map !== 'undefined') mapRef = map;
    }catch(e){}
    return !!mapRef;
  }

  function currentLang(){
    var raw = (document.documentElement.getAttribute('lang')
              || (typeof localStorage!=='undefined' && localStorage.getItem('lang'))
              || 'it');
    return (raw || 'it').toLowerCase().split('-')[0];
  }

  function normalizeLang(l){
    l = (l||'').toLowerCase();
    if(l.indexOf('lij')===0) return 'lij';
    if(l.indexOf('zh')===0)  return 'zh';
    if(l.indexOf('en')===0)  return 'en';
    if(l.indexOf('es')===0)  return 'es';
    if(l.indexOf('fr')===0)  return 'fr';
    if(l.indexOf('ar')===0)  return 'ar';
    if(l.indexOf('ru')===0)  return 'ru';
    return 'it';
  }

  function popupHTML(p){
    var lang = normalizeLang(currentLang());
    var desc = '';
    if(p.desc){
      if(typeof p.desc === 'string') desc = p.desc;
      else desc = p.desc[lang] || p.desc.it || p.desc.en || '';
    }
    var title = (p.name || '').toString();
    var addr  = (p.addr || p.address || '').toString();
    var rtl   = (lang === 'ar') ? 'direction:rtl;text-align:right;' : '';

    var addrLabelMap = {
      it:'Indirizzo', en:'Address', es:'Dirección', fr:'Adresse',
      ar:'العنوان', ru:'Адрес', zh:'地址', lij:'Indirisso'
    };
    var addrLabel = addrLabelMap[lang] || addrLabelMap.it;

    var addrHTML = addr
      ? '<div style="margin-top:.35rem;font-size:.86rem;opacity:.9">'
        + '<strong>'+addrLabel+':</strong> '+addr+'</div>'
      : '';

    var descHTML = desc
      ? '<p class="mh-popup-desc" style="'+rtl+'">'+desc+'</p>'
      : '<p class="mh-popup-desc" style="opacity:.7">…</p>';

  var url  = (p.url || '').toString().trim();

  var linkLabelMap = {
    it:'Sito / Info',
    en:'Website / Info',
    es:'Sitio / Info',
    fr:'Site / Infos',
    ar:'موقع / معلومات',
    ru:'Сайт / информация',
    zh:'网站 / 信息',
    lij:'Sito / Informazioni'
  };
  var linkLabel = linkLabelMap[lang] || linkLabelMap.it;

  var linkHTML = url
    ? '<div class="mh-popup-link" style="margin-top:.25rem;font-size:.86rem;">'
      + '<a href="'+url+'" target="_blank" rel="noopener">'
      + linkLabel+
      '</a></div>'
    : '';

  var img  = (p.img || '').toString().trim();

  var imgHTML = img
  ? '<div class="mh-popup-img-wrap" style="margin-top:.35rem;">'
    + '<img class="mh-popup-img" src="'+img+'" alt="'+title+'" loading="lazy" />'
    + '</div>'
  : '';



    return ''+
      '<div class="mh-popup chiese-popup" style="min-width:240px;max-width:420px">'+
      '  <div class="mh-popup-header" style="margin-bottom:.25rem">'+
      '    <span class="mh-popup-title">'+title+'</span>'+
      '  </div>'+
      '  <div class="mh-popup-body">'+imgHTML+descHTML+addrHTML+linkHTML+'</div>'+
      '</div>';
  }

  function buildLayer(){
    if(chieseBuilt || !ensureMap() || typeof L === 'undefined') return;
    chieseBuilt = true;
    chieseLayer = L.layerGroup();

    var iconHTML = '<div class="past-map-marker past-marker-churches"><img src="icons/passato/chiese.svg" alt=""></div>';

// Icona Leaflet (usa lo stesso SVG del bottone)
var churchIcon = L.divIcon({
  className: 'chiese-marker',
  iconSize: [30,30],
  iconAnchor: [15,15],
  popupAnchor: [0,-15],
  html: iconHTML
});



    function addPoint(p){
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if(!lat || !lng || !isFinite(lat) || !isFinite(lng)) return;

      var m = L.marker([lat, lng], {
        icon: churchIcon,
        title: (p.name || '').toString()
      });

      var html0 = popupHTML(p);
      m.bindPopup(html0, { className: 'mh-popup' });

      m.on('popupopen', function(ev){
        try{ ev.popup.setContent(popupHTML(p)); }catch(_){}
      });

      try{
        document.addEventListener('app:set-lang', function(){
          try{
            if(m.isPopupOpen && m.isPopupOpen()){
              m.setPopupContent(popupHTML(p));
            }
          }catch(_){}
        });
      }catch(_){}

      chieseLayer.addLayer(m);
    }

    // Carichiamo i dati da /chiese/chiese_points.json
    fetch('chiese/chiese_points.json')
      .then(function(r){ return r.json(); })
      .then(function(list){
        if(!Array.isArray(list)) return;
        list.forEach(addPoint);
      })
      .catch(function(err){
        try{ console.warn('Errore dati CHIESE', err); }catch(_){}
      });
  }

  function toggleLayer(){
    if(!ensureMap()) return;
    buildLayer();
    if(!chieseLayer) return;
    if(mapRef.hasLayer(chieseLayer)) mapRef.removeLayer(chieseLayer);
    else chieseLayer.addTo(mapRef);
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-chiese');
    if(!btn) return false;

    btn.setAttribute('aria-pressed','false');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
      if(chieseLayer && mapRef){
        btn.setAttribute('aria-pressed', mapRef.hasLayer(chieseLayer).toString());
      }
    });
    return true;
  }

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(typeof L !== 'undefined' && typeof map !== 'undefined' && attach()){
      clearInterval(iv);
    }else if(++tries >= max){
      clearInterval(iv);
    }
  }, 150);
})();
