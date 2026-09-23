/* Genova mApp - "Vicino a me" / raggio 300 m - fase 1.1
   Mostra in un layer indipendente i punti selezionati entro 300 m dal GPS.
   I marker usano le stesse icone delle categorie normali e restano cliccabili.
   Non modifica i normali toggle/layer della mappa. */
(function(){
  'use strict';
  if(window.__GENOVA_NEARBY_V1__) return;
  window.__GENOVA_NEARBY_V1__ = true;

  var RADIUS_METERS = 300;
  var STORAGE_KEY = 'genova_mapp_nearby_v1';
  var nearbyActive = false;
  var lastPosition = null;
  var lastAccuracy = null;
  var markerLayer = null;
  var radiusCircle = null;
  var markerByKey = Object.create(null);
  var gpsObserver = null;
  var positionRaf = 0;

  var TEXT = {
    it:{
      button:'Vicino a me', gpsFirst:'Attiva prima il GPS', title:'Vicino a me',
      intro:'Mostra sulla mappa i luoghi delle categorie selezionate che si trovano entro 300 metri dalla tua posizione.',
      radius:'Raggio', categories:'Categorie', all:'Tutte', none:'Nessuna', circle:'Mostra il cerchio dei 300 m',
      activate:'Attiva', deactivate:'Disattiva', apply:'Aggiorna', close:'Chiudi',
      waiting:'In attesa della posizione GPS…', gpsOff:'Attiva il GPS per usare Vicino a me.',
      selectOne:'Seleziona almeno una categoria.', found0:'Nessun luogo selezionato entro 300 m.',
      found1:'1 luogo entro 300 m.', foundN:'{n} luoghi entro 300 m.',
      groupHistory:'Storia e cultura', groupFun:'Luoghi e attività', groupFood:'Mangiare e dormire', groupMove:'Trasporti',
      qr:'Punti QR', minidoc:'MiniDoc', forts:'Forti', museums:'Musei', churches:'Chiese', palaces:'Palazzi e ville',
      exhibitions:'Mostre', theatres:'Teatri', cinemas:'Cinema', parks:'Parchi e piazze', sport:'Sport',
      venues:'Locali', restaurants:'Ristoranti', takeaway:'Take-away', lodging:'Alberghi e B&B',
      bus:'Bus', metro:'Metropolitana', trains:'Treni', funi:'Funicolari e ascensori', sea:'Navi e battelli', air:'Aereo'
    },
    en:{
      button:'Near me', gpsFirst:'Turn on GPS first', title:'Near me',
      intro:'Show places from the selected categories that are within 300 metres of your current position.',
      radius:'Radius', categories:'Categories', all:'All', none:'None', circle:'Show the 300 m circle',
      activate:'Activate', deactivate:'Deactivate', apply:'Update', close:'Close',
      waiting:'Waiting for GPS position…', gpsOff:'Turn on GPS to use Near me.', selectOne:'Select at least one category.',
      found0:'No selected places within 300 m.', found1:'1 place within 300 m.', foundN:'{n} places within 300 m.',
      groupHistory:'History and culture', groupFun:'Places and activities', groupFood:'Eat and stay', groupMove:'Transport',
      qr:'QR points', minidoc:'MiniDoc', forts:'Forts', museums:'Museums', churches:'Churches', palaces:'Palaces and villas',
      exhibitions:'Exhibitions', theatres:'Theatres', cinemas:'Cinemas', parks:'Parks and squares', sport:'Sport',
      venues:'Venues', restaurants:'Restaurants', takeaway:'Take-away', lodging:'Hotels and B&Bs',
      bus:'Bus', metro:'Metro', trains:'Trains', funi:'Funiculars and lifts', sea:'Boats and ferries', air:'Airport'
    },
    es:{
      button:'Cerca de mí', gpsFirst:'Activa primero el GPS', title:'Cerca de mí',
      intro:'Muestra en el mapa los lugares de las categorías seleccionadas que estén a menos de 300 metros de tu posición.',
      radius:'Radio', categories:'Categorías', all:'Todas', none:'Ninguna', circle:'Mostrar el círculo de 300 m',
      activate:'Activar', deactivate:'Desactivar', apply:'Actualizar', close:'Cerrar', waiting:'Esperando la posición GPS…',
      gpsOff:'Activa el GPS para usar Cerca de mí.', selectOne:'Selecciona al menos una categoría.',
      found0:'Ningún lugar seleccionado a menos de 300 m.', found1:'1 lugar a menos de 300 m.', foundN:'{n} lugares a menos de 300 m.',
      groupHistory:'Historia y cultura', groupFun:'Lugares y actividades', groupFood:'Comer y dormir', groupMove:'Transportes',
      qr:'Puntos QR', minidoc:'MiniDoc', forts:'Fortalezas', museums:'Museos', churches:'Iglesias', palaces:'Palacios y villas',
      exhibitions:'Exposiciones', theatres:'Teatros', cinemas:'Cines', parks:'Parques y plazas', sport:'Deporte',
      venues:'Locales', restaurants:'Restaurantes', takeaway:'Comida para llevar', lodging:'Hoteles y B&B',
      bus:'Autobús', metro:'Metro', trains:'Trenes', funi:'Funiculares y ascensores', sea:'Barcos y ferris', air:'Aeropuerto'
    },
    fr:{
      button:'Autour de moi', gpsFirst:'Activez d’abord le GPS', title:'Autour de moi',
      intro:'Affiche sur la carte les lieux des catégories sélectionnées situés à moins de 300 mètres de votre position.',
      radius:'Rayon', categories:'Catégories', all:'Toutes', none:'Aucune', circle:'Afficher le cercle de 300 m',
      activate:'Activer', deactivate:'Désactiver', apply:'Actualiser', close:'Fermer', waiting:'En attente de la position GPS…',
      gpsOff:'Activez le GPS pour utiliser Autour de moi.', selectOne:'Sélectionnez au moins une catégorie.',
      found0:'Aucun lieu sélectionné dans un rayon de 300 m.', found1:'1 lieu dans un rayon de 300 m.', foundN:'{n} lieux dans un rayon de 300 m.',
      groupHistory:'Histoire et culture', groupFun:'Lieux et activités', groupFood:'Manger et dormir', groupMove:'Transports',
      qr:'Points QR', minidoc:'MiniDoc', forts:'Forts', museums:'Musées', churches:'Églises', palaces:'Palais et villas',
      exhibitions:'Expositions', theatres:'Théâtres', cinemas:'Cinémas', parks:'Parcs et places', sport:'Sport',
      venues:'Établissements', restaurants:'Restaurants', takeaway:'À emporter', lodging:'Hôtels et B&B',
      bus:'Bus', metro:'Métro', trains:'Trains', funi:'Funiculaires et ascenseurs', sea:'Bateaux et ferries', air:'Aéroport'
    },
    ar:{
      button:'بالقرب مني', gpsFirst:'فعّل GPS أولاً', title:'بالقرب مني',
      intro:'يعرض على الخريطة الأماكن من الفئات المحددة الواقعة ضمن 300 متر من موقعك الحالي.',
      radius:'النطاق', categories:'الفئات', all:'الكل', none:'لا شيء', circle:'إظهار دائرة 300 م',
      activate:'تفعيل', deactivate:'إيقاف', apply:'تحديث', close:'إغلاق', waiting:'بانتظار موقع GPS…',
      gpsOff:'فعّل GPS لاستخدام بالقرب مني.', selectOne:'اختر فئة واحدة على الأقل.',
      found0:'لا توجد أماكن محددة ضمن 300 م.', found1:'مكان واحد ضمن 300 م.', foundN:'{n} أماكن ضمن 300 م.',
      groupHistory:'التاريخ والثقافة', groupFun:'أماكن وأنشطة', groupFood:'الطعام والإقامة', groupMove:'النقل',
      qr:'نقاط QR', minidoc:'أفلام قصيرة', forts:'الحصون', museums:'المتاحف', churches:'الكنائس', palaces:'القصور والفلل',
      exhibitions:'المعارض', theatres:'المسارح', cinemas:'دور السينما', parks:'الحدائق والساحات', sport:'الرياضة',
      venues:'أماكن الترفيه', restaurants:'المطاعم', takeaway:'طعام جاهز', lodging:'فنادق وB&B',
      bus:'الحافلات', metro:'المترو', trains:'القطارات', funi:'القطارات المعلقة والمصاعد', sea:'القوارب والعبّارات', air:'المطار'
    },
    ru:{
      button:'Рядом со мной', gpsFirst:'Сначала включите GPS', title:'Рядом со мной',
      intro:'Показывает на карте места выбранных категорий в радиусе 300 метров от вашего местоположения.',
      radius:'Радиус', categories:'Категории', all:'Все', none:'Ничего', circle:'Показывать круг 300 м',
      activate:'Включить', deactivate:'Выключить', apply:'Обновить', close:'Закрыть', waiting:'Ожидание позиции GPS…',
      gpsOff:'Включите GPS, чтобы использовать функцию «Рядом со мной».', selectOne:'Выберите хотя бы одну категорию.',
      found0:'Нет выбранных мест в радиусе 300 м.', found1:'1 место в радиусе 300 м.', foundN:'{n} мест в радиусе 300 м.',
      groupHistory:'История и культура', groupFun:'Места и занятия', groupFood:'Еда и проживание', groupMove:'Транспорт',
      qr:'QR-точки', minidoc:'Мини-док', forts:'Форты', museums:'Музеи', churches:'Церкви', palaces:'Дворцы и виллы',
      exhibitions:'Выставки', theatres:'Театры', cinemas:'Кинотеатры', parks:'Парки и площади', sport:'Спорт',
      venues:'Заведения', restaurants:'Рестораны', takeaway:'Еда навынос', lodging:'Отели и B&B',
      bus:'Автобусы', metro:'Метро', trains:'Поезда', funi:'Фуникулёры и лифты', sea:'Катера и паромы', air:'Аэропорт'
    },
    zh:{
      button:'附近', gpsFirst:'请先开启 GPS', title:'附近',
      intro:'在地图上显示距您当前位置 300 米以内、属于所选类别的地点。',
      radius:'半径', categories:'类别', all:'全选', none:'全不选', circle:'显示 300 米范围圈',
      activate:'启用', deactivate:'关闭', apply:'更新', close:'关闭', waiting:'正在等待 GPS 位置…',
      gpsOff:'请开启 GPS 后使用“附近”。', selectOne:'请至少选择一个类别。', found0:'300 米内没有所选地点。',
      found1:'300 米内有 1 个地点。', foundN:'300 米内有 {n} 个地点。',
      groupHistory:'历史与文化', groupFun:'地点与活动', groupFood:'餐饮与住宿', groupMove:'交通',
      qr:'QR 点位', minidoc:'迷你纪录片', forts:'堡垒', museums:'博物馆', churches:'教堂', palaces:'宫殿与别墅',
      exhibitions:'展览', theatres:'剧院', cinemas:'电影院', parks:'公园与广场', sport:'体育',
      venues:'休闲场所', restaurants:'餐厅', takeaway:'外带', lodging:'酒店与民宿',
      bus:'公交', metro:'地铁', trains:'火车', funi:'缆车与电梯', sea:'船舶与渡轮', air:'机场'
    },
    lij:{
      button:'A-o me vexin', gpsFirst:'Ativa primma o GPS', title:'A-o me vexin',
      intro:'Mostra in sciâ mappa i leughi de categorie çernue che son drento 300 metri da-a teu posiçion.',
      radius:'Raggio', categories:'Categorie', all:'Tutte', none:'Nisciunn-a', circle:'Mostra o çercio de 300 m',
      activate:'Ativa', deactivate:'Disativa', apply:'Agiorna', close:'Særa', waiting:'Aspetto a posiçion GPS…',
      gpsOff:'Ativa o GPS pe deuvi A-o me vexin.', selectOne:'Çerni armanco unn-a categoria.',
      found0:'Nisciun leugo çernuo drento 300 m.', found1:'1 leugo drento 300 m.', foundN:'{n} leughi drento 300 m.',
      groupHistory:'Stöia e cultua', groupFun:'Leughi e attivitæ', groupFood:'Mangiâ e dormî', groupMove:'Trasporti',
      qr:'Ponti QR', minidoc:'MiniDoc', forts:'Forti', museums:'Muzei', churches:'Gexe', palaces:'Palaçi e ville',
      exhibitions:'Mostre', theatres:'Teatri', cinemas:'Cinema', parks:'Parchi e ciassæ', sport:'Sport',
      venues:'Locæ', restaurants:'Ristoranti', takeaway:'Da asporto', lodging:'Alberghi e B&B',
      bus:'Bus', metro:'Metro', trains:'Tren', funi:'Funicolari e asensôi', sea:'Navi e battelli', air:'Aeropòrto'
    }
  };

  var GROUPS = [
    {key:'groupHistory', items:['qr','minidoc','forts','museums','churches','palaces']},
    {key:'groupFun', items:['exhibitions','theatres','cinemas','parks','sport']},
    {key:'groupFood', items:['venues','restaurants','takeaway','lodging']},
    {key:'groupMove', items:['bus','metro','trains','funi','sea','air']}
  ];

  var CATEGORIES = {
    qr:{icon:'toolbar/qr.svg', defaultOn:true},
    minidoc:{icon:'punti_doc/icona_doc.svg', defaultOn:true},
    forts:{icon:'icons/passato/forti.svg', defaultOn:true, arrays:['FORTI_DATA'], index:'__FAV_INDEX_FORTI'},
    museums:{icon:'icons/passato/musei.svg', defaultOn:true, arrays:['MUSEI_DATA','MUSEI'], index:'__FAV_INDEX_MUSEI'},
    churches:{icon:'icons/passato/chiese.svg', defaultOn:true, arrays:['CHIESE_POINTS','CHIESE_DATA','CHIESE'], index:'__FAV_INDEX_CHIESE'},
    palaces:{icon:'icons/passato/palazzi.svg', defaultOn:true, arrays:['PALAZZI_POINTS','PALAZZI_DATA','PALAZZI'], index:'__FAV_INDEX_PALAZZI'},
    exhibitions:{icon:'icons/intrattenimento/mostre.svg', defaultOn:true, arrays:['MOSTRE_POINTS','MOSTRE_DATA'], index:'__FAV_INDEX_MOSTRE'},
    theatres:{icon:'icons/intrattenimento/teatri.svg', defaultOn:true, arrays:['TEATRI_POINTS','TEATRI_DATA'], index:'__FAV_INDEX_TEATRI'},
    cinemas:{icon:'icons/intrattenimento/cinema.svg', defaultOn:true, arrays:['CINEMA_POINTS','CINEMA_DATA'], index:'__FAV_INDEX_CINEMA'},
    parks:{icon:'icons/intrattenimento/parchi-piazze.svg', defaultOn:true, arrays:['PARKS_POINTS','PIAZZE_POINTS'], indexes:['__FAV_INDEX_PARCHI','__FAV_INDEX_PIAZZE']},
    sport:{icon:'icons/intrattenimento/sport.svg', defaultOn:true, arrays:['SPORT_POINTS','SPORT_DATA'], index:'__FAV_INDEX_SPORT'},
    venues:{icon:'icons/mangiare-dormire/01-locali.svg', defaultOn:true, foodKind:'locale'},
    restaurants:{icon:'icons/mangiare-dormire/02-ristoranti.svg', defaultOn:true, foodKind:'ristorante'},
    takeaway:{icon:'icons/mangiare-dormire/03-take-away.svg', defaultOn:true, foodKind:'take-away'},
    lodging:{icon:'icons/mangiare-dormire/04-alloggi.svg', defaultOn:true, foodKind:'alloggio'},
    bus:{icon:'icons/come-muoversi/autobus.svg', defaultOn:false, arrays:['BUS_STATIONS'], index:'__FAV_INDEX_BUS'},
    metro:{icon:'icons/come-muoversi/metropolitana.svg', defaultOn:false, arrays:['METRO_STATIONS'], index:'__FAV_INDEX_METRO'},
    trains:{icon:'icons/come-muoversi/treni.svg', defaultOn:false, arrays:['TRAIN_STATIONS'], index:'__FAV_INDEX_TRENI'},
    funi:{icon:'icons/come-muoversi/impianti-verticali.svg', defaultOn:false, arrays:['FUNI_POINTS'], index:'__FAV_INDEX_FUNI'},
    sea:{icon:'icons/come-muoversi/navi-battelli.svg', defaultOn:false, arrays:['__GM_MARE_POINTS']},
    air:{icon:'icons/come-muoversi/aereo.svg', defaultOn:false, arrays:['AEREO_POINTS'], index:'__FAV_INDEX_AEREO'}
  };

  function currentLang(){
    var lang = 'it';
    try{ lang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it'; }catch(_e){}
    lang = String(lang || 'it').toLowerCase();
    if(lang === 'lij' || lang.indexOf('lij-') === 0 || lang.indexOf('lij_') === 0) return 'lij';
    lang = lang.split(/[-_]/)[0];
    return TEXT[lang] ? lang : 'it';
  }

  function T(){ return TEXT[currentLang()] || TEXT.it; }

  var NEARBY_ACCESS_TEXT = {
    it:'Accedi o registrati per utilizzare Raggio / Vicino a me.',
    en:'Log in or sign up to use Radius / Near me.',
    es:'Inicia sesión o regístrate para usar Radio / Cerca de mí.',
    fr:'Connectez-vous ou inscrivez-vous pour utiliser Rayon / À proximité.',
    ar:'سجّل الدخول أو أنشئ حساباً لاستخدام النطاق / بالقرب مني.',
    ru:'Войдите или зарегистрируйтесь, чтобы использовать Радиус / Рядом со мной.',
    zh:'登录或注册后即可使用半径 / 附近功能。',
    lij:'Intra ò registrite pe adêuviâ Raggio / A-o me vexin.'
  };
  function nearbyAllowed(){
    try{if(window.GenovaEntitlements)return window.GenovaEntitlements.allows('nearby');}catch(_e){}
    try{var st=window.GenovaAccount&&window.GenovaAccount.getState?window.GenovaAccount.getState():null;return !!(st&&st.user);}catch(_e){return false;}
  }
  function nearbyAccessMessage(){ return NEARBY_ACCESS_TEXT[currentLang()] || NEARBY_ACCESS_TEXT.it; }
  function requestNearbyAccess(){
    if(nearbyAllowed()) return true;
    try{window.alert(nearbyAccessMessage());}catch(_e){}
    try{if(window.GenovaAuth&&typeof window.GenovaAuth.open==='function')window.GenovaAuth.open('login');}catch(_e){}
    return false;
  }

  function mapInstance(){
    var m = window.map || window.__map || window.__LEAFLET_MAP__;
    return m && typeof m.eachLayer === 'function' ? m : null;
  }

  function gpsButton(){ return document.getElementById('btn-gps'); }
  function gpsIsActive(){ var b=gpsButton(); return !!(b && b.classList.contains('active')); }

  function loadSettings(){
    var data = null;
    try{ data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }catch(_e){}
    var selected = {};
    Object.keys(CATEGORIES).forEach(function(key){
      selected[key] = data && data.selected && typeof data.selected[key] === 'boolean'
        ? data.selected[key]
        : !!CATEGORIES[key].defaultOn;
    });
    return { selected:selected, showCircle: data && typeof data.showCircle === 'boolean' ? data.showCircle : true };
  }

  var settings = loadSettings();

  function saveSettings(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({selected:settings.selected, showCircle:settings.showCircle})); }catch(_e){}
  }

  function textValue(value){
    if(value == null) return '';
    if(typeof value === 'string' || typeof value === 'number') return String(value);
    if(typeof value === 'object'){
      var lang = currentLang();
      return String(value[lang] || value.it || value.en || value.name || value.title || '');
    }
    return '';
  }

  function pointName(item){
    if(!item) return '';
    return textValue(item.name || item.title || item.nome || item.label || item.id || '');
  }

  function pointLatLng(item){
    if(!item) return null;
    var lat = null, lng = null;
    if(Array.isArray(item.coords) && item.coords.length >= 2){ lat=Number(item.coords[0]); lng=Number(item.coords[1]); }
    if(lat == null || !isFinite(lat)) lat=Number(item.lat != null ? item.lat : item.latitude);
    if(lng == null || !isFinite(lng)) lng=Number(item.lng != null ? item.lng : (item.lon != null ? item.lon : item.longitude));
    return isFinite(lat) && isFinite(lng) ? [lat,lng] : null;
  }

  function norm(value){
    return String(value || '').trim().toLocaleLowerCase('it').replace(/\s+/g,' ');
  }

  function pushPoint(out, seen, category, item, fallbackName){
    var ll = pointLatLng(item);
    if(!ll) return;
    var name = pointName(item) || String(fallbackName || '');
    var key = category + '|' + ll[0].toFixed(6) + '|' + ll[1].toFixed(6) + '|' + norm(name);
    if(seen[key]) return;
    seen[key] = true;
    out.push({key:key, category:category, name:name, lat:ll[0], lng:ll[1], source:item || null});
  }

  function addIndexPoints(out, seen, category, indexName){
    var index = window[indexName];
    if(!index || typeof index !== 'object') return;
    Object.keys(index).forEach(function(name){
      var ll = index[name];
      if(Array.isArray(ll) && ll.length >= 2) pushPoint(out, seen, category, {name:name, lat:Number(ll[0]), lng:Number(ll[1])}, name);
    });
  }

  function collectCategory(category){
    var def = CATEGORIES[category];
    var out = [], seen = Object.create(null);
    if(!def) return out;

    if(category === 'qr'){
      (window.__QR_SOURCES || []).forEach(function(src){
        (src && Array.isArray(src.children) ? src.children : []).forEach(function(item){
          var wrapped = Object.assign({}, item || {});
          wrapped.__gmQrParent = src && src.parent ? src.parent : {};
          pushPoint(out, seen, category, wrapped);
        });
      });
      return out;
    }

    if(category === 'minidoc'){
      var docs = Array.isArray(window.__GM_DOCS) ? window.__GM_DOCS : [];
      docs.forEach(function(item){ pushPoint(out, seen, category, item); });
      return out;
    }

    if(def.foodKind){
      (Array.isArray(window.LOCALI_POINTS) ? window.LOCALI_POINTS : []).forEach(function(item){
        if(String(item && item.kind || '').toLowerCase() === def.foodKind) pushPoint(out, seen, category, item);
      });
      return out;
    }

    (def.arrays || []).forEach(function(globalName){
      var arr = window[globalName];
      if(Array.isArray(arr)) arr.forEach(function(item){ pushPoint(out, seen, category, item); });
    });
    if(def.index) addIndexPoints(out, seen, category, def.index);
    (def.indexes || []).forEach(function(indexName){ addIndexPoints(out, seen, category, indexName); });
    return out;
  }

  var MARKER_VISUALS = {
    minidoc:{ className:'doc-ico', html:'<div class="past-map-marker past-marker-minidoc"><img src="icons/passato/minidoc.svg" alt=""></div>' },
    forts:{ className:'forti-marker', html:'<div class="past-map-marker past-marker-forts"><img src="icons/passato/forti.svg" alt=""></div>' },
    museums:{ className:'museum-ico', html:'<div class="past-map-marker past-marker-museums"><img src="icons/passato/musei.svg" alt=""></div>' },
    churches:{ className:'chiese-marker', html:'<div class="past-map-marker past-marker-churches"><img src="icons/passato/chiese.svg" alt=""></div>' },
    palaces:{ className:'palazzi-marker', html:'<div class="past-map-marker past-marker-palaces"><img src="icons/passato/palazzi.svg" alt=""></div>' },
    exhibitions:{ className:'mostre-marker', html:'<div class="entertainment-map-marker entertainment-marker-exhibitions"><img src="icons/intrattenimento/mostre.svg" alt=""></div>' },
    theatres:{ className:'teatri-marker', html:'<div class="entertainment-map-marker entertainment-marker-theater"><img src="icons/intrattenimento/teatri.svg" alt=""></div>' },
    cinemas:{ className:'cinema-marker', html:'<div class="entertainment-map-marker entertainment-marker-cinema"><img src="icons/intrattenimento/cinema.svg" alt=""></div>' },
    parks:{ className:'parks-ico', html:'<div class="entertainment-map-marker entertainment-marker-parks"><img src="icons/intrattenimento/parchi-piazze.svg" alt=""></div>' },
    sport:{ className:'sport-marker', html:'<div class="entertainment-map-marker entertainment-marker-sport"><img src="icons/intrattenimento/sport.svg" alt=""></div>' },
    bus:{ className:'bus-ico', html:'<div class="transport-map-marker transport-marker-bus"><img src="icons/come-muoversi/autobus.svg" alt=""></div>' },
    metro:{ className:'metro-ico', html:'<div class="transport-map-marker transport-marker-metro"><img src="icons/come-muoversi/metropolitana.svg" alt=""></div>' },
    trains:{ className:'train-ico', html:'<div class="transport-map-marker transport-marker-train"><img src="icons/come-muoversi/treni.svg" alt=""></div>' },
    funi:{ className:'funi-ico', html:'<div class="transport-map-marker transport-marker-funi"><img src="icons/come-muoversi/impianti-verticali.svg" alt=""></div>' },
    sea:{ className:'mare-marker', html:'<div class="transport-map-marker transport-marker-sea"><img src="icons/come-muoversi/navi-battelli.svg" alt=""></div>' },
    air:{ className:'aereo-marker', html:'<div class="transport-map-marker transport-marker-air"><img src="icons/come-muoversi/aereo.svg" alt=""></div>' }
  };

  var FOOD_VISUALS = {
    venues:{ className:'locali-marker locali-marker-locale', icon:'icons/mangiare-dormire/marker-01-locali.svg' },
    restaurants:{ className:'locali-marker locali-marker-ristorante', icon:'icons/mangiare-dormire/marker-02-ristoranti.svg' },
    takeaway:{ className:'locali-marker locali-marker-take-away', icon:'icons/mangiare-dormire/marker-03-take-away.svg' },
    lodging:{ className:'locali-marker locali-marker-alloggio', icon:'icons/mangiare-dormire/marker-04-alloggi.svg' }
  };

  function categoryIcon(category){
    if(category === 'qr'){
      return L.icon({
        iconUrl:'qr_azzurri/marker-azzurro-qr-notch-24.svg',
        iconSize:[24,26], iconAnchor:[12,26], popupAnchor:[0,-22], className:'qr-azzurro-icon'
      });
    }
    if(FOOD_VISUALS[category]){
      var food = FOOD_VISUALS[category];
      return L.divIcon({
        className:food.className,
        html:'<img class="food-marker-icon" src="'+food.icon+'" alt="">',
        iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-13]
      });
    }
    var visual = MARKER_VISUALS[category];
    if(visual){
      return L.divIcon({
        className:visual.className,
        html:visual.html,
        iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-15]
      });
    }
    var def = CATEGORIES[category] || CATEGORIES.qr;
    return L.divIcon({
      className:'gm-nearby-marker-fallback',
      html:'<img src="'+def.icon+'" alt="">',
      iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-15]
    });
  }

  function escHtml(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function fallbackPopupHtml(point){
    var source = point && point.source || {};
    var name = point && point.name || pointName(source) || '';
    var desc = textValue(source.desc || source.descr || source.description || source.info || '');
    var addr = textValue(source.addr || source.address || source.indirizzo || '');
    var img = textValue(source.img || source.image || source.photo || '');
    var url = textValue(source.url || source.site || source.website || '');
    var html = '<div class="mh-popup"><div class="mh-popup-header"><span class="mh-popup-title">'+escHtml(name)+'</span></div><div class="mh-popup-body">';
    if(img) html += '<div class="mh-popup-img"><img src="'+escHtml(img)+'" alt="'+escHtml(name)+'"></div>';
    if(desc) html += '<p class="mh-popup-desc">'+escHtml(desc)+'</p>';
    if(addr) html += '<p class="mh-popup-addr">'+escHtml(addr)+'</p>';
    if(url) html += '<div class="mh-popup-link"><a href="'+escHtml(url)+'" target="_blank" rel="noopener">Info</a></div>';
    return html + '</div></div>';
  }

  function bindStandardPopup(marker, point, category){
    if(!marker || !point) return;
    var source = point.source || {};
    marker._mhData = source;
    if(category === 'parks') marker._genovaParkData = source;
    if(FOOD_VISUALS[category]){
      marker._genovaLocaliData = source;
      marker._genovaFoodKind = String(source.kind || '').toLowerCase();
    }
    if(category === 'museums' && typeof window.museumSpecialPopups === 'function'){
      try{ window.museumSpecialPopups(source, marker); }catch(_e){}
    }
    if(category === 'sea' && typeof window.__GM_MARE_POPUP_HTML === 'function'){
      try{
        marker.bindPopup(window.__GM_MARE_POPUP_HTML(source), {className:'mh-popup'});
      }catch(_e){}
    }
    if(!marker.getPopup || !marker.getPopup()){
      marker.bindPopup(fallbackPopupHtml(point), {className:'mh-popup', maxWidth:370});
    }
    marker.on('popupopen', function(ev){
      try{
        if(category === 'sea' && typeof window.__GM_MARE_POPUP_HTML === 'function'){
          ev.popup.setContent(window.__GM_MARE_POPUP_HTML(source));
        }
      }catch(_e){}
      try{
        if(window.GenovaPlacePopup && typeof window.GenovaPlacePopup.decorate === 'function'){
          window.GenovaPlacePopup.decorate(ev.popup);
        }
      }catch(_e){}
    });
  }

  function openQrPoint(point){
    var source = point && point.source || {};
    var parent = source.__gmQrParent || {};
    var qrid = String(parent.id || 'qr') + '/' + String(source.id || 'item');
    try{
      if(typeof window.__qrOpenChildPanel === 'function'){
        window.__qrOpenChildPanel(source.label || source.name || point.name || '', source.descr || source.desc || '', source.media || {}, qrid);
        return true;
      }
    }catch(_e){}
    return false;
  }

  function openMiniDocPoint(point){
    var source = point && point.source || {};
    var id = source.id || '';
    var map = mapInstance();
    var originals = window.__GM_DOC_MARKERS || {};
    var original = id && originals[id];
    if(original && map){
      var wasVisible = map.hasLayer(original);
      var previousOpacity = original.options && isFinite(Number(original.options.opacity)) ? Number(original.options.opacity) : 1;
      try{
        if(!wasVisible){
          if(typeof original.setOpacity === 'function') original.setOpacity(0);
          original.addTo(map);
        }
        original.openPopup();
        if(!wasVisible){
          original.once('popupclose', function(){
            try{ if(map.hasLayer(original)) map.removeLayer(original); }catch(_e){}
            try{ if(typeof original.setOpacity === 'function') original.setOpacity(previousOpacity); }catch(_e){}
          });
        }
        return true;
      }catch(_e){
        try{ if(!wasVisible && map.hasLayer(original)) map.removeLayer(original); }catch(__){}
        try{ if(typeof original.setOpacity === 'function') original.setOpacity(previousOpacity); }catch(__){}
      }
    }
    if(map && window.L){
      try{ L.popup({maxWidth:360,className:'doc-pop'}).setLatLng([point.lat,point.lng]).setContent(fallbackPopupHtml(point)).openOn(map); return true; }catch(_e){}
    }
    return false;
  }

  function createNearbyMarker(point, category){
    var marker = L.marker([point.lat,point.lng], {
      pane:'gmNearbyPane', icon:categoryIcon(category), title:point.name || '',
      interactive:true, keyboard:true, zIndexOffset:800
    });
    marker._gmNearbyPoint = point;
    marker._gmNearbyCategory = category;
    if(category === 'qr'){
      try{ marker.bindTooltip(point.name || '', {direction:'top', offset:[0,-6], className:'qr-tooltip'}); }catch(_e){}
      marker.on('click', function(){ openQrPoint(point); });
    }else if(category === 'minidoc'){
      marker.on('click', function(){ openMiniDocPoint(point); });
    }else{
      bindStandardPopup(marker, point, category);
    }
    return marker;
  }

  function ensureLayers(){
    var map = mapInstance();
    if(!map || !window.L) return false;
    if(!map.getPane('gmNearbyRadiusPane')){
      var rp = map.createPane('gmNearbyRadiusPane');
      rp.style.zIndex = '390';
      rp.style.pointerEvents = 'none';
    }
    if(!map.getPane('gmNearbyPane')){
      var mp = map.createPane('gmNearbyPane');
      mp.style.zIndex = '640';
      mp.style.pointerEvents = '';
    }
    if(!markerLayer) markerLayer = L.layerGroup().addTo(map);
    else if(!map.hasLayer(markerLayer)) markerLayer.addTo(map);
    return true;
  }

  function clearMarkers(){
    if(markerLayer) try{ markerLayer.clearLayers(); }catch(_e){}
    markerByKey = Object.create(null);
  }

  function removeRadius(){
    var map = mapInstance();
    if(radiusCircle && map){ try{ map.removeLayer(radiusCircle); }catch(_e){} }
    radiusCircle = null;
  }

  function syncRadius(){
    var map = mapInstance();
    if(!nearbyActive || !lastPosition || !settings.showCircle || !map || !window.L){ removeRadius(); return; }
    if(!radiusCircle){
      radiusCircle = L.circle(lastPosition, {
        pane:'gmNearbyRadiusPane', radius:RADIUS_METERS,
        color:'#38bdf8', weight:2, opacity:.9, dashArray:'7 7',
        fillColor:'#38bdf8', fillOpacity:.07, interactive:false
      }).addTo(map);
    }else{
      radiusCircle.setLatLng(lastPosition);
      radiusCircle.setRadius(RADIUS_METERS);
      if(!map.hasLayer(radiusCircle)) radiusCircle.addTo(map);
    }
  }

  function selectedCount(){
    var n=0; Object.keys(CATEGORIES).forEach(function(key){ if(settings.selected[key]) n++; }); return n;
  }

  function distanceMeters(aLat, aLng, bLat, bLng){
    try{
      if(window.L && L.latLng){ return L.latLng(aLat,aLng).distanceTo(L.latLng(bLat,bLng)); }
    }catch(_e){}
    var rad=Math.PI/180, dLat=(bLat-aLat)*rad, dLng=(bLng-aLng)*rad;
    var x=Math.sin(dLat/2), y=Math.sin(dLng/2);
    var h=x*x+Math.cos(aLat*rad)*Math.cos(bLat*rad)*y*y;
    return 12742000*Math.asin(Math.min(1,Math.sqrt(h)));
  }

  function updateStatus(count, override){
    var el = document.getElementById('gm-nearby-status');
    if(!el) return;
    var txt = T();
    if(override){ el.textContent=override; return; }
    if(!gpsIsActive()){ el.textContent=txt.gpsOff; return; }
    if(nearbyActive && !lastPosition){ el.textContent=txt.waiting; return; }
    if(typeof count === 'number'){
      el.textContent = count === 0 ? txt.found0 : (count === 1 ? txt.found1 : txt.foundN.replace('{n}',String(count)));
      return;
    }
    el.textContent = nearbyActive ? txt.waiting : txt.intro;
  }

  function updateNearby(){
    if(!nearbyActive || !gpsIsActive()) return;
    if(!lastPosition){ clearMarkers(); syncRadius(); updateStatus(); return; }
    if(!ensureLayers()) return;

    var wanted = Object.create(null);
    var count = 0;
    Object.keys(CATEGORIES).forEach(function(category){
      if(!settings.selected[category]) return;
      collectCategory(category).forEach(function(point){
        var distance = distanceMeters(lastPosition.lat,lastPosition.lng,point.lat,point.lng);
        if(distance > RADIUS_METERS) return;
        wanted[point.key] = point;
        count++;
        if(markerByKey[point.key]) return;
        var marker = createNearbyMarker(point, category);
        marker.addTo(markerLayer);
        markerByKey[point.key] = marker;
      });
    });

    Object.keys(markerByKey).forEach(function(key){
      if(wanted[key]) return;
      try{ markerLayer.removeLayer(markerByKey[key]); }catch(_e){}
      delete markerByKey[key];
    });
    syncRadius();
    updateStatus(count);
  }

  function deactivateNearby(reason){
    nearbyActive = false;
    clearMarkers();
    removeRadius();
    var btn = document.getElementById('btn-nearby');
    if(btn){ btn.classList.remove('active'); btn.setAttribute('aria-pressed','false'); }
    syncMainAction();
    if(reason) updateStatus(null, reason); else updateStatus();
  }

  function activateNearby(){
    if(!requestNearbyAccess()) return false;
    var txt=T();
    if(!gpsIsActive()){ updateStatus(null,txt.gpsOff); return false; }
    if(!selectedCount()){ updateStatus(null,txt.selectOne); return false; }
    nearbyActive = true;
    var btn = document.getElementById('btn-nearby');
    if(btn){ btn.classList.add('active'); btn.setAttribute('aria-pressed','true'); }
    syncMainAction();
    updateNearby();
    return true;
  }

  function panelIsOpen(){ var p=document.getElementById('gm-nearby-panel'); return !!(p && p.classList.contains('open')); }

  function closePanel(){
    var p=document.getElementById('gm-nearby-panel'); var b=document.getElementById('btn-nearby');
    if(p){ p.classList.remove('open'); p.setAttribute('aria-hidden','true'); }
    if(b) b.setAttribute('aria-expanded','false');
  }

  function openPanel(){
    var p=document.getElementById('gm-nearby-panel'); var b=document.getElementById('btn-nearby');
    if(!p || !b) return;
    if(!requestNearbyAccess()) return;
    if(b.disabled) return;
    applyTexts();
    p.classList.add('open'); p.setAttribute('aria-hidden','false'); b.setAttribute('aria-expanded','true');
    positionControls();
  }

  function togglePanel(){ if(panelIsOpen()) closePanel(); else openPanel(); }

  function radarSvg(){
    return '<svg data-nearby-icon="radar" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">'+
      '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>'+
      '<path d="M12 12 18 7"/><path d="M12 3v2M21 12h-2M12 21v-2M3 12h2"/></svg>';
  }

  function categoryRow(key){
    var def=CATEGORIES[key];
    return '<label class="gm-nearby-category" data-nearby-category="'+key+'">'+
      '<input type="checkbox" value="'+key+'"'+(settings.selected[key]?' checked':'')+'>'+ 
      '<span class="gm-nearby-cat-icon"><img src="'+def.icon+'" alt="" aria-hidden="true"></span>'+ 
      '<span class="gm-nearby-cat-label" data-nearby-label="'+key+'"></span></label>';
  }

  function buildPanel(){
    if(document.getElementById('gm-nearby-panel')) return;
    var panel=document.createElement('section');
    panel.id='gm-nearby-panel'; panel.className='gm-nearby-panel'; panel.setAttribute('aria-hidden','true'); panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','false'); panel.setAttribute('aria-labelledby','gm-nearby-title');
    var groups=GROUPS.map(function(group){
      return '<fieldset class="gm-nearby-group"><legend data-nearby-group="'+group.key+'"></legend><div class="gm-nearby-grid">'+group.items.map(categoryRow).join('')+'</div></fieldset>';
    }).join('');
    panel.innerHTML =
      '<div class="gm-nearby-head"><div><h3 id="gm-nearby-title"></h3><span class="gm-nearby-radius"><span data-nearby-text="radius"></span> 300 m</span></div><button type="button" class="gm-nearby-close" aria-label="">×</button></div>'+ 
      '<p class="gm-nearby-intro" data-nearby-text="intro"></p>'+ 
      '<div class="gm-nearby-toolbar"><strong data-nearby-text="categories"></strong><span><button type="button" data-nearby-select="all"></button><button type="button" data-nearby-select="none"></button></span></div>'+ 
      '<div class="gm-nearby-groups">'+groups+'</div>'+ 
      '<label class="gm-nearby-circle-option"><input id="gm-nearby-circle" type="checkbox"'+(settings.showCircle?' checked':'')+'><span data-nearby-text="circle"></span></label>'+ 
      '<div id="gm-nearby-status" class="gm-nearby-status" role="status" aria-live="polite"></div>'+ 
      '<div class="gm-nearby-actions"><button type="button" id="gm-nearby-main"></button></div>';
    document.body.appendChild(panel);

    panel.querySelector('.gm-nearby-close').addEventListener('click', closePanel);
    panel.querySelector('[data-nearby-select="all"]').addEventListener('click', function(){ setAllCategories(true); });
    panel.querySelector('[data-nearby-select="none"]').addEventListener('click', function(){ setAllCategories(false); });
    panel.querySelectorAll('.gm-nearby-category input').forEach(function(input){
      input.addEventListener('change', function(){
        settings.selected[this.value]=!!this.checked; saveSettings();
        if(nearbyActive) updateNearby();
        syncMainAction();
      });
    });
    panel.querySelector('#gm-nearby-circle').addEventListener('change', function(){
      settings.showCircle=!!this.checked; saveSettings(); syncRadius();
    });
    panel.querySelector('#gm-nearby-main').addEventListener('click', function(){
      if(nearbyActive){ deactivateNearby(); closePanel(); }
      else if(activateNearby()){ closePanel(); }
    });
    panel.addEventListener('pointerdown', function(event){ event.stopPropagation(); });
    panel.addEventListener('click', function(event){ event.stopPropagation(); });
  }

  function setAllCategories(on){
    Object.keys(CATEGORIES).forEach(function(key){ settings.selected[key]=!!on; });
    var panel=document.getElementById('gm-nearby-panel');
    if(panel) panel.querySelectorAll('.gm-nearby-category input').forEach(function(input){ input.checked=!!on; });
    saveSettings(); if(nearbyActive) updateNearby(); syncMainAction();
  }

  function syncMainAction(){
    var button=document.getElementById('gm-nearby-main'); if(!button) return;
    var txt=T();
    button.textContent = nearbyActive ? txt.deactivate : txt.activate;
    button.classList.toggle('is-stop',nearbyActive);
    button.disabled = !nearbyAllowed() || (!nearbyActive && (!gpsIsActive() || selectedCount()===0));
  }

  function applyTexts(){
    var txt=T(), button=document.getElementById('btn-nearby'), panel=document.getElementById('gm-nearby-panel');
    if(button){
      var actionLabel = nearbyAllowed() ? (gpsIsActive()?txt.button:txt.gpsFirst) : nearbyAccessMessage();
      button.setAttribute('title', actionLabel);
      button.setAttribute('aria-label', actionLabel);
    }
    if(!panel) return;
    panel.setAttribute('dir',currentLang()==='ar'?'rtl':'ltr');
    var title=panel.querySelector('#gm-nearby-title'); if(title) title.textContent=txt.title;
    panel.querySelectorAll('[data-nearby-text]').forEach(function(el){ var k=el.getAttribute('data-nearby-text'); if(txt[k]) el.textContent=txt[k]; });
    panel.querySelectorAll('[data-nearby-group]').forEach(function(el){ var k=el.getAttribute('data-nearby-group'); el.textContent=txt[k]||k; });
    panel.querySelectorAll('[data-nearby-label]').forEach(function(el){ var k=el.getAttribute('data-nearby-label'); el.textContent=txt[k]||k; });
    var all=panel.querySelector('[data-nearby-select="all"]'); if(all) all.textContent=txt.all;
    var none=panel.querySelector('[data-nearby-select="none"]'); if(none) none.textContent=txt.none;
    var close=panel.querySelector('.gm-nearby-close'); if(close) close.setAttribute('aria-label',txt.close);
    syncMainAction(); updateStatus();
  }

  function ensureButton(){
    var gps=gpsButton(); if(!gps) return null;
    var button=document.getElementById('btn-nearby');
    if(!button){
      button=document.createElement('button');
      button.id='btn-nearby'; button.type='button'; button.className='gm-nearby-button';
      button.innerHTML=radarSvg(); button.setAttribute('aria-controls','gm-nearby-panel'); button.setAttribute('aria-expanded','false'); button.setAttribute('aria-pressed','false');
      document.body.appendChild(button);
      button.addEventListener('click', function(event){ event.preventDefault(); event.stopPropagation(); togglePanel(); });
      button.addEventListener('pointerdown', function(event){ event.stopPropagation(); });
    }
    return button;
  }

  function positionControls(){
    if(positionRaf) cancelAnimationFrame(positionRaf);
    positionRaf=requestAnimationFrame(function(){
      positionRaf=0;
      var gps=gpsButton(), button=document.getElementById('btn-nearby'), panel=document.getElementById('gm-nearby-panel');
      if(!gps || !button) return;
      var r=gps.getBoundingClientRect(); if(!r.width || !r.height) return;
      /* v44: il GPS e' volutamente un po' piu' grande; il pulsante Raggio
         conserva invece una dimensione piu' discreta e viene distanziato
         leggermente di piu' verso l'alto. */
      var size=Math.max(32,Math.min(40,Math.round(Math.max(r.width,r.height)-6)));
      var verticalGap=12;
      var nearbyTop=Math.max(8,r.top-size-verticalGap);
      button.style.setProperty('--gm-nearby-size',size+'px');
      button.style.left=Math.round(r.left+r.width/2)+'px';
      button.style.top=Math.round(nearbyTop)+'px';
      if(panel && panelIsOpen()){
        panel.style.bottom=Math.round(Math.max(72,window.innerHeight-nearbyTop+12))+'px';
      }
    });
  }

  function syncGpsState(){
    var button=ensureButton(); if(!button) return;
    var on=gpsIsActive(), allowed=nearbyAllowed();
    // Il Visitatore può premere il pulsante per ricevere il messaggio di accesso,
    // ma non può aprire o attivare la funzione.
    button.disabled=allowed ? !on : false;
    button.classList.toggle('gps-ready',on && allowed);
    button.classList.toggle('account-required',!allowed);
    if(!allowed && nearbyActive) deactivateNearby(nearbyAccessMessage());
    else if(!on && nearbyActive) deactivateNearby(T().gpsOff);
    if(!allowed && panelIsOpen()) closePanel();
    else if(!on && panelIsOpen()) updateStatus(null,T().gpsOff);
    applyTexts(); positionControls();
  }

  function acceptLocation(event){
    if(!event || !event.latlng || !gpsIsActive()) return;
    var acc=Number(event.accuracy || 0);
    if(isFinite(acc) && acc > 100) return;
    var next={lat:Number(event.latlng.lat),lng:Number(event.latlng.lng)};
    if(!isFinite(next.lat)||!isFinite(next.lng)) return;
    if(lastPosition && distanceMeters(lastPosition.lat,lastPosition.lng,next.lat,next.lng)<8) return;
    lastPosition=next; lastAccuracy=isFinite(acc)?acc:null;
    if(nearbyActive) updateNearby();
  }

  function bindMap(){
    var map=mapInstance(); if(!map || map.__gmNearbyBound) return !!map;
    map.__gmNearbyBound=true;
    map.on('locationfound',acceptLocation);
    map.on('locationerror',function(){ syncGpsState(); });
    return true;
  }

  function bindGpsObserver(){
    var gps=gpsButton(); if(!gps) return;
    if(gpsObserver) try{ gpsObserver.disconnect(); }catch(_e){}
    if(window.MutationObserver){
      gpsObserver=new MutationObserver(function(){ syncGpsState(); });
      gpsObserver.observe(gps,{attributes:true,attributeFilter:['class','aria-busy','disabled']});
    }
    if(!gps.__gmNearbyClickBound){
      gps.__gmNearbyClickBound=true;
      gps.addEventListener('click',function(){ setTimeout(syncGpsState,0); setTimeout(syncGpsState,150); });
    }
  }

  function boot(){
    buildPanel(); ensureButton(); bindGpsObserver(); bindMap(); syncGpsState(); applyTexts(); positionControls();
    var tries=0, iv=setInterval(function(){
      bindMap();
      if(!document.getElementById('btn-nearby')) ensureButton();
      if(++tries>30 || (mapInstance() && gpsButton())) clearInterval(iv);
    },250);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
  window.addEventListener('resize',positionControls,{passive:true});
  window.addEventListener('load',function(){ setTimeout(positionControls,60); },{once:true});
  window.addEventListener('orientationchange',function(){ setTimeout(positionControls,120); });
  document.addEventListener('app:set-lang',function(){ setTimeout(function(){ applyTexts(); if(nearbyActive) updateNearby(); },0); });
  document.addEventListener('genova:auth-changed',function(){ setTimeout(syncGpsState,0); });
  document.addEventListener('genova:subscription-changed',function(){ setTimeout(syncGpsState,0); });
  window.addEventListener('i18n:changed',function(){ setTimeout(function(){ applyTexts(); if(nearbyActive) updateNearby(); },0); });
  document.addEventListener('pointerdown',function(event){
    var panel=document.getElementById('gm-nearby-panel'), button=document.getElementById('btn-nearby');
    if(!panelIsOpen()) return;
    if((panel&&panel.contains(event.target)) || (button&&button.contains(event.target))) return;
    closePanel();
  });
  document.addEventListener('keydown',function(event){ if(event.key==='Escape' && panelIsOpen()) closePanel(); });
  document.addEventListener('gm:documentari-ready',function(){ if(nearbyActive) updateNearby(); });

  window.__gmNearby={
    refresh:updateNearby,
    open:openPanel,
    close:closePanel,
    activate:activateNearby,
    deactivate:deactivateNearby,
    getState:function(){ return {active:nearbyActive,position:lastPosition,accuracy:lastAccuracy,radius:RADIUS_METERS,selected:Object.assign({},settings.selected)}; }
  };
})();
