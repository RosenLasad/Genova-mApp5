
/* === PARKS markers toggle (icone Intrattenimento coordinate, 30x30) === */
(function(){
    // Coordinates provided by Vespucci
  function buildParksOnce(){
  if (parksBuilt) return;
  var data = window.PARKS_POINTS || [];
  data.forEach(function(p){
  var m = L.marker([p.lat, p.lng], { icon: parksIconSmall() });

  // salvo i dati sul marker (come fai coi Locali)
  m._genovaParkData = p;

  // primo contenuto popup
  m.bindPopup(buildParkPopupHtml(p), { className: 'parks-popup-wrap' });

  // ogni volta che si apre, rigenera nella lingua corrente
  m.on('popupopen', function(ev){
    try{
      if (this && this._genovaParkData){
        ev.popup.setContent(buildParkPopupHtml(this._genovaParkData));
      }
    }catch(_){}
  });

  groupParks.addLayer(m);
});

  parksBuilt = true;
}


function parksIconSmall(){
  const svg = '<div class="entertainment-map-marker entertainment-marker-parks"><img src="icons/intrattenimento/parchi-piazze.svg" alt=""></div>';
  return L.divIcon({
    className:'parks-ico',
    html: svg,
    iconSize:[30,30],
    iconAnchor:[15,15],
    popupAnchor:[0,-15]
  });
}

  var groupParks = L.layerGroup();
  var parksBuilt = false;

 

  function toggleParks(){
    try{
      buildParksOnce();
      if (map.hasLayer(groupParks)) map.removeLayer(groupParks);
      else groupParks.addTo(map);
    }catch(e){
  if (typeof console !== 'undefined' && console.warn) console.warn('Parks toggle error', e);
}
}

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-parchi');
    if (!btn) return false;
    btn.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      toggleParks();
      btn.setAttribute('aria-pressed', (map.hasLayer(groupParks)).toString());
    });
    return true;
  }

// Quando cambia la lingua (evento globale dell'app), aggiorna il popup Parchi aperto
document.addEventListener('app:set-lang', function(){
  try{
    if (typeof map === 'undefined') return;
    var pop = map && map._popup;
    if(!pop || !pop._source || !pop._source._genovaParkData) return;
    pop.setContent(buildParkPopupHtml(pop._source._genovaParkData));
  }catch(_){}
});


function currentLang(){
  try{
    return (window.localStorage && localStorage.getItem('lang'))
      || document.documentElement.getAttribute('lang')
      || 'it';
  }catch(e){
    return document.documentElement.getAttribute('lang') || 'it';
  }
}

var PARKS_I18N = {
  it:  { title: 'Parchi e piazze', addrLabel: 'Indirizzo' },
  en:  { title: 'Parks & squares', addrLabel: 'Address' },
  es:  { title: 'Parques y plazas', addrLabel: 'Dirección' },
  fr:  { title: 'Parcs et places', addrLabel: 'Adresse' },
  ar:  { title: 'الحدائق والساحات', addrLabel: 'العنوان' },
  ru:  { title: 'Парки и площади', addrLabel: 'Адрес' },
  zh:  { title: '公园与广场', addrLabel: '地址' },
  lij: { title: 'Parchi e ciassæ', addrLabel: 'Indirisso' } // genovese “pratico”
};

function escHtml(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function normalizeParkImg(p){
  var img = p.img || p.image || p.photo || '';
  if (!img) return '';
  // se mi dai solo il nome file, lo metto sotto /parchi/
  if (img.indexOf('/') === -1) img = 'parchi/' + img;
  return img;
}

function buildParkPopupHtml(p){
  var lang = currentLang();
  var t = PARKS_I18N[lang] || PARKS_I18N.it;
  var isRtl = (lang === 'ar');
  var dir = isRtl ? 'rtl' : 'ltr';
  var bodyStyle = isRtl ? 'text-align:right;' : '';

  var name = escHtml(p.name || '');
  var desc = escHtml(p.desc || p.description || p.name || ''); // NON tradurre: va bene così
  var addr = escHtml(p.address || p.addr || p.indirizzo || '');
  var img = normalizeParkImg(p);

  var imgHtml = img
    ? '<div class="mh-popup-img"><img src="'+escHtml(img)+'" alt="'+name+'"></div>'
    : '';

  var addrHtml = addr
  ? ('<div class="mh-popup-addr"><strong>'+escHtml(t.addrLabel)+':</strong> '+addr+'</div>')
  : '';


  return ''
    + '<div class="mh-popup parks-popup" dir="'+dir+'" style="'+bodyStyle+'">'
    +   '<div class="mh-popup-header">'
        +     '<span class="badge" style="background:#16a34a;color:#0f172a;border-color:rgba(0,0,0,0.35);margin-left:.35rem;">'
    +       escHtml(t.title)
    +     '</span>'
    +   '</div>'
    +   imgHtml
    +   '<div class="mh-popup-body">'
    +     '<p class="mh-popup-desc">'+desc+'</p>'
    +     addrHtml
    +   '</div>'
    + '</div>';
}


  var tries=0, max=60;
  var iv = setInterval(function(){
    if (typeof L !== 'undefined' && typeof map !== 'undefined' && attach()) { clearInterval(iv); }
    if (++tries >= max) clearInterval(iv);
  }, 150);
})();
