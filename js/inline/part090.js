
/* === TRAIN markers toggle (icons smaller than dock, 28x28) === */
(function(){
  // Coordinates provided by Vespucci

  function currentLang(){
    try{
      return (window.localStorage && localStorage.getItem('lang'))
        || document.documentElement.getAttribute('lang')
        || 'it';
    }catch(e){
      return document.documentElement.getAttribute('lang') || 'it';
    }
  }

  var TRAIN_I18N = {
    it:  { title: 'Stazione treno',          linkLabel: 'Vai al sito Trenitalia' },
    en:  { title: 'Train station',           linkLabel: 'Open Trenitalia website' },
    es:  { title: 'Estación de tren',        linkLabel: 'Ir al sitio de Trenitalia' },
    fr:  { title: 'Gare ferroviaire',        linkLabel: 'Ouvrir le site de Trenitalia' },
    ar:  { title: 'محطة قطار',              linkLabel: 'فتح موقع ترينيتاليا' },
    ru:  { title: 'Железнодорожная станция', linkLabel: 'Открыть сайт Trenitalia' },
    zh:  { title: '火车站',                  linkLabel: '打开 Trenitalia 网站' },
    lij: { title: 'Stasciòn de treno',       linkLabel: 'Vanni in sciô sito Trenitalia' }
  };

  function buildTrainPopupHtml(stationName){
    var lang = currentLang();
    var t = TRAIN_I18N[lang] || TRAIN_I18N.it;
    var isRtl = (lang === 'ar');
    var dir = isRtl ? 'rtl' : 'ltr';
    var bodyStyle = isRtl ? 'text-align:right;' : '';

    return ''
      + '<div class="mh-popup train-popup" dir="' + dir + '">'
      +   '<div class="mh-popup-header">'
      +     '<span class="mh-popup-title">' + t.title + '</span>'
      +   '</div>'
      +   '<div class="mh-popup-body" style="' + bodyStyle + '">'
      +     '<p class="mh-popup-desc">' + stationName + '</p>'
      +     '<div class="mh-popup-link">'
      +       '<a href="https://www.trenitalia.com/" target="_blank" rel="noopener noreferrer">'
      +         t.linkLabel
      +       '</a>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  function trainIconSmall(){
    const html = '<div class="transport-map-marker transport-marker-train"><img src="icons/come-muoversi/treni.svg" alt=""></div>';
    return L.divIcon({ className:'train-ico', html:html, iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-15] });
  }

  var groupTrain = L.layerGroup();
  var trainBuilt = false;

  function buildTrainOnce(){
    if (trainBuilt) return;
    var data = window.TRAIN_STATIONS || (typeof TRAIN_STATIONS !== 'undefined' ? TRAIN_STATIONS : []);
    data.forEach(function(p){
      var m = L.marker([p.lat, p.lng], { icon: trainIconSmall() });
      m._stationName = p.name;  // rimane identico in tutte le lingue
      m.bindPopup(buildTrainPopupHtml(p.name));
      groupTrain.addLayer(m);
    });
    trainBuilt = true;
  }

  function updateTrainPopupsForLang(){
    if (!trainBuilt) return;
    groupTrain.eachLayer(function(layer){
      if (layer._stationName){
        layer.setPopupContent(buildTrainPopupHtml(layer._stationName));
      }
    });
  }

  function toggleTrain(){
    try{
      buildTrainOnce();
      if (map.hasLayer(groupTrain)) map.removeLayer(groupTrain);
      else groupTrain.addTo(map);
    }catch(e){
      if (typeof console !== 'undefined' && console.warn) console.warn('Train toggle error', e);
    }
  }

  function attach(){
    var btn = document.querySelector('#quick-toggles .qt-train');
    if (!btn) return false;
    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleTrain();
      btn.setAttribute('aria-pressed', (map.hasLayer(groupTrain)).toString());
    });
    return true;
  }

  // Quando cambia lingua aggiorniamo TUTTI i popup treno già creati
  try{
    document.addEventListener('app:set-lang', function(){
      updateTrainPopupsForLang();
    });
  }catch(e){}

  var tries = 0, max = 60;
  var iv = setInterval(function(){
    if (typeof L !== 'undefined' && typeof map !== 'undefined' && attach()){
      clearInterval(iv);
    }
    if (++tries >= max) clearInterval(iv);
  }, 150);
})();
