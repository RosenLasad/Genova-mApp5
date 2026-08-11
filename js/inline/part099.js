
(function(){
  var cinemaLayer = null;
  var cinemaBuilt = false;
  var mapRef = null;

  function ensureMap(){
    if (cinemaLayer && mapRef && typeof L !== 'undefined') return true;
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
    var rtl   = (lang === 'ar') ? 'direction:rtl;text-align:justify;' : '';

    var addrLabelMap = {
      it:'Indirizzo',
      en:'Address',
      es:'Dirección',
      fr:'Adresse',
      ar:'العنوان',
      ru:'Адрес',
      zh:'地址',
      lij:'Indirisso'
    };
    var addrLabel = addr ? (addrLabelMap[lang] || addrLabelMap.it) : '';

    var descHTML = desc ? (
      '<div class="mh-popup-desc" style="margin-bottom:.45rem;'+rtl+'">'+
      desc+
      '</div>'
    ) : '';

    var addrHTML = addr ? (
      '<div class="mh-popup-addr" style="font-size:.85rem;opacity:.9;margin-bottom:.35rem;">'+
      '<strong>'+(addrLabel || 'Indirizzo')+':</strong> '+addr+
      '</div>'
    ) : '';

    var linkHTML = '';
    if(p.url){
      var label = (lang === 'en') ? 'Website'
                : (lang === 'fr') ? 'Site web'
                : (lang === 'es') ? 'Sitio web'
                : (lang === 'ru') ? 'Сайт'
                : (lang === 'ar') ? 'الموقع'
                : (lang === 'zh') ? '网站'
                : 'Sito';
      linkHTML =
        '<div class="mh-popup-link" style="margin-top:.25rem;">'+
        '<a href="'+p.url+'" target="_blank" rel="noopener noreferrer">'+label+'</a>'+
        '</div>';
    }

    var imgHTML = '';
    if(p.img){
      imgHTML =
        '<div class="mh-popup-img" style="margin-bottom:.45rem;">'+
        '<img src="'+p.img+'" alt="'+title+'" style="max-width:100%;border-radius:8px;display:block;"/>'+
        '</div>';
    }

    return ''+
      '<div class="mh-popup cinema-popup" style="min-width:240px;max-width:420px">'+
      '  <div class="mh-popup-header">'+
      '    <span class="mh-popup-title">'+title+'</span>'+
      '  </div>'+
      '  <div class="mh-popup-body">'+imgHTML+descHTML+addrHTML+linkHTML+'</div>'+
      '</div>';
  }

  function buildLayer(){
    if(cinemaBuilt || !ensureMap() || typeof L === 'undefined') return;
    cinemaBuilt = true;
    cinemaLayer = L.layerGroup();

    var iconHTML = '<div class="entertainment-map-marker entertainment-marker-cinema"><img src="icons/intrattenimento/cinema.svg" alt=""></div>';

    var cinemaIcon = L.divIcon({
      className: 'cinema-marker',
      iconSize: [30,30],
      iconAnchor: [15,15],
      popupAnchor: [0,-15],
      html: iconHTML
    });

    function addPoint(p){
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if(!lat || !lng || !isFinite(lat) || !isFinite(lng)) return;

      var m = L.marker([lat, lng], {
        icon: cinemaIcon,
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

      cinemaLayer.addLayer(m);
    }

    fetch('cinema/cinema_points.json')
      .then(function(r){ return r.json(); })
      .then(function(list){
        if(!Array.isArray(list)) return;
        list.forEach(addPoint);
      })
      .catch(function(err){
        try{ console.warn('Errore dati CINEMA', err); }catch(_){}
      });
  }

  function toggleLayer(){
    if(!ensureMap()) return;
    buildLayer();
    if(!cinemaLayer) return;
    if(mapRef.hasLayer(cinemaLayer)) mapRef.removeLayer(cinemaLayer);
    else cinemaLayer.addTo(mapRef);
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-cinema');
    if(!btn) return false;

    btn.setAttribute('aria-pressed','false');

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleLayer();
      if(cinemaLayer && mapRef){
        btn.setAttribute(
          'aria-pressed',
          mapRef.hasLayer(cinemaLayer).toString()
        );
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
