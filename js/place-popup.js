(function(){
  'use strict';

  if(window.GenovaPlacePopup) return;

  var LANGS = ['it','en','es','fr','ar','ru','zh','lij'];

  var TEXT = {
    it:  { official:'Sito ufficiale', address:'Indirizzo', rooms:'Sale', service:'Servizio', info:'Informazioni e storia', openInfo:'Apri informazioni', closeInfo:'Chiudi informazioni', imagePending:'Fotografia in preparazione' },
    en:  { official:'Official website', address:'Address', rooms:'Screens', service:'Service', info:'Information and history', openInfo:'Open information', closeInfo:'Close information', imagePending:'Photograph coming soon' },
    es:  { official:'Sitio oficial', address:'Dirección', rooms:'Salas', service:'Servicio', info:'Información e historia', openInfo:'Abrir información', closeInfo:'Cerrar información', imagePending:'Fotografía en preparación' },
    fr:  { official:'Site officiel', address:'Adresse', rooms:'Salles', service:'Service', info:'Informations et histoire', openInfo:'Ouvrir les informations', closeInfo:'Fermer les informations', imagePending:'Photographie à venir' },
    ar:  { official:'الموقع الرسمي', address:'العنوان', rooms:'قاعات العرض', service:'الخدمة', info:'معلومات وتاريخ', openInfo:'فتح المعلومات', closeInfo:'إغلاق المعلومات', imagePending:'الصورة قيد الإعداد' },
    ru:  { official:'Официальный сайт', address:'Адрес', rooms:'Залы', service:'Сервис', info:'Информация и история', openInfo:'Открыть информацию', closeInfo:'Закрыть информацию', imagePending:'Фотография готовится' },
    zh:  { official:'官方网站', address:'地址', rooms:'影厅', service:'交通服务', info:'信息与历史', openInfo:'打开信息', closeInfo:'关闭信息', imagePending:'照片准备中' },
    lij: { official:'Sito uffiçiâ', address:'Indirisso', rooms:'Sæe', service:'Serviçio', info:'Informaçioin e stöia', openInfo:'Arvi e informaçioin', closeInfo:'Særa e informaçioin', imagePending:'Föto in preparaçion' }
  };

  var INFO_PENDING = {
    it:'Descrizione in preparazione.',
    en:'Description coming soon.',
    es:'Descripción en preparación.',
    fr:'Description à venir.',
    ar:'الوصف قيد الإعداد.',
    ru:'Описание готовится.',
    zh:'说明正在准备中。',
    lij:'Descriçion in preparaçion.'
  };

  var HERITAGE_LINK = {
    it:'Sito / informazioni', en:'Website / information', es:'Sitio / informaci\u00f3n',
    fr:'Site / informations', ar:'\u0627\u0644\u0645\u0648\u0642\u0639 / \u0645\u0639\u0644\u0648\u0645\u0627\u062a', ru:'\u0421\u0430\u0439\u0442 / \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f',
    zh:'\u7f51\u7ad9 / \u4fe1\u606f', lij:'Sito / informa\u00e7ioin'
  };

  var TRANSPORT_IMAGES = {
    bus: {
      'piazza caricamento':'trasporti/immagini/Bus/bus - piazza caricamento.jpeg',
      'piazza della vittoria':'trasporti/immagini/Bus/bus - piazza della vittoria.jpg',
      'piazza verdi':'trasporti/immagini/Bus/bus - piazza verdi.jpg',
      'via degola':'trasporti/immagini/Bus/bus - via degola.jpeg',
      'via fanti d italia':"trasporti/immagini/Bus/bus - via fanti d'italia.jpg"
    },
    train: {
      'acquasanta':'trasporti/immagini/Treni/treni - acquasanta.jpg',
      'bolzaneto':'trasporti/immagini/Treni/treni - bolzaneto.jpg',
      'borzoli':'trasporti/immagini/Treni/treni - borzoli.jpg',
      'brignole':'trasporti/immagini/Treni/treni - brignole.jpg',
      'cornigliano':'trasporti/immagini/Treni/treni - cornigliano.jpg',
      'costa di sestri':'trasporti/immagini/Treni/treni - costa di sestri.jpeg',
      'granara':'trasporti/immagini/Treni/treni - granara.jpg',
      'nervi':'trasporti/immagini/Treni/treni - nervi.jpg',
      'pegli':'trasporti/immagini/Treni/treni - pegli.jpg',
      'pontedecimo':'trasporti/immagini/Treni/treni - pontedecimo.jpg',
      'principe':'trasporti/immagini/Treni/treni - principe.jpg',
      'pra':'trasporti/immagini/Treni/treni - prà.jpg',
      'quarto':'trasporti/immagini/Treni/treni - quarto.jpg',
      'quinto':'trasporti/immagini/Treni/treni - quinto.jpg',
      'rivarolo':'trasporti/immagini/Treni/treni - rivarolo.jpg',
      'sampierdarena':'trasporti/immagini/Treni/treni - sampierdarena.jpg',
      'san biagio':'trasporti/immagini/Treni/treni - san biagio.jpg',
      'sestri ponente':'trasporti/immagini/Treni/treni - sestri ponente.jpg',
      'sturla':'trasporti/immagini/Treni/treni - sturla.jpg',
      'vesima':'trasporti/immagini/Treni/treni - vesima.jpg',
      'via di francia':'trasporti/immagini/Treni/treni - via di francia.jpeg',
      'voltri':'trasporti/immagini/Treni/treni - voltri.jpg'
    },
    metro: {
      'brignole':'trasporti/immagini/Metro/metro - brignole.jpeg',
      'brin':'trasporti/immagini/Metro/metro - brin.jpg',
      'darsena':'trasporti/immagini/Metro/metro - darsena.jpeg',
      'de ferrari':'trasporti/immagini/Metro/metro - de ferrari.jpeg',
      'dinegro':'trasporti/immagini/Metro/metro - dinegro.jpg',
      'principe':'trasporti/immagini/Metro/metro - principe.jpeg',
      'san giorgio':'trasporti/immagini/Metro/metro - san giorgio.jpg',
      'sarzano':'trasporti/immagini/Metro/metro - sarzano.jpeg'
    },
    sea: {
      'battelli golfo paradiso':'trasporti/immagini/Navi/navi - battelli.jpeg',
      'battelli portofino e golfo paradiso':'trasporti/immagini/Navi/navi - battelli.jpeg',
      'navebus':'trasporti/immagini/Navi/navi - navebus.jpeg',
      'terminal crociere':'trasporti/immagini/Navi/navi - terminal crociere.jpg',
      'terminal traghetti':'trasporti/immagini/Navi/navi - terminal traghetti.jpg'
    },
    airport: {
      'aeroporto cristoforo colombo':'trasporti/immagini/Aereo/aereo - areoporto.jpg'
    },
    funi: {
      'ascensore d albertis montegalletto bassa':"trasporti/immagini/Cremagliere/ascensore d'albertis montegalletto bassa.jpg",
      'ascensore d albertis montegalletto alta':"trasporti/immagini/Cremagliere/ascensore d'albertis montegalletto alta.jpg",
      'ascensore castelletto ponente':'trasporti/immagini/Cremagliere/ascensore castelletto ponente.jpg',
      'ascensore castelletto levante alta':'trasporti/immagini/Cremagliere/ascensore castelletto levante alta.jpg',
      'ascensore castelletto levante bassa':'trasporti/immagini/Cremagliere/ascensore castelletto levante bassa.jpeg',
      'ascensore magenta crocco':'trasporti/immagini/Cremagliere/ascensore magenta crocco.jpg',
      'ascensore piazza manin via contardo':'trasporti/immagini/Cremagliere/ascensore piazza manin.jpeg',
      'ascensore ponte monumentale':'trasporti/immagini/Cremagliere/ascensore monumentale.jpg',
      'ascensore via mura degli angeli':'trasporti/immagini/Cremagliere/ascensore mura degli angeli.webp',
      'ascensore via montello':'trasporti/immagini/Cremagliere/ascensore montello.jpg',
      'ascensore villa scassi':'trasporti/immagini/Cremagliere/ascensore villa scassi.jpg',
      'ascensore via bari':'trasporti/immagini/Cremagliere/ascensore via bari.jpg',
      'ascensore inclinato di quezzi':'trasporti/immagini/Cremagliere/ascensore quezzi.jpg',
      'funicolare sant anna alta':"trasporti/immagini/Cremagliere/funicolare sant'anna alta.jpg",
      'funicolare sant anna bassa':"trasporti/immagini/Cremagliere/funicolare sant'anna bassa.jpg",
      'cremagliera principe granarolo principe':'trasporti/immagini/Cremagliere/cremagliera principe.jpg',
      'cremagliera principe granarolo centurione':'trasporti/immagini/Cremagliere/cremagliera centurione.jpg',
      'cremagliera principe granarolo bari':'trasporti/immagini/Cremagliere/cremagliera bari.jpeg',
      'cremagliera principe granarolo cambiaso':'trasporti/immagini/Cremagliere/cremagliera cambiaso.jpg',
      'cremagliera principe granarolo salita granarolo':'trasporti/immagini/Cremagliere/cremagliera salita granarolo.jpeg',
      'cremagliera principe granarolo chiassaiuola':'trasporti/immagini/Cremagliere/cremagliera chiassaiuola.jpg',
      'cremagliera principe granarolo granarolo':'trasporti/immagini/Cremagliere/cremagliera granarolo.jpeg',
      'funicolare zecca righi zecca':'trasporti/immagini/Cremagliere/funicolare zecca.jpg',
      'funicolare zecca righi carbonara':'trasporti/immagini/Cremagliere/funicolare carbonara.jpg',
      'funicolare zecca righi san nicola':'trasporti/immagini/Cremagliere/funicolare san nicola.jpg',
      'funicolare zecca righi madonnetta':'trasporti/immagini/Cremagliere/funicolare madonnetta.jpg',
      'funicolare zecca righi preve':'trasporti/immagini/Cremagliere/funicolare preve.jpg',
      'funicolare zecca righi san simone':'trasporti/immagini/Cremagliere/funicolare san simone.webp',
      'funicolare zecca righi righi':'trasporti/immagini/Cremagliere/funicolare righi.jpg'
    }
  };

  var TYPES = {
    bus: {
      iconClass:'bus-ico', color:'#14b8a6', mark:'BUS',
      label:{it:'Fermata autobus',en:'Bus stop',es:'Parada de autobús',fr:'Arrêt de bus',ar:'محطة حافلات',ru:'Автобусная остановка',zh:'公交车站',lij:'Fermâ do bus'},
      service:{it:'Rete urbana AMT',en:'AMT urban network',es:'Red urbana AMT',fr:'Réseau urbain AMT',ar:'شبكة AMT الحضرية',ru:'Городская сеть AMT',zh:'AMT 城市公交网络',lij:'Ræ urbana AMT'},
      website:'https://www.amt.genova.it/'
    },
    train: {
      iconClass:'train-ico', color:'#f59e0b', mark:'FS',
      label:{it:'Stazione ferroviaria',en:'Railway station',es:'Estación ferroviaria',fr:'Gare ferroviaire',ar:'محطة قطار',ru:'Железнодорожная станция',zh:'火车站',lij:'Stasciòn do treno'},
      service:{it:'Servizio ferroviario',en:'Rail service',es:'Servicio ferroviario',fr:'Service ferroviaire',ar:'خدمة السكك الحديدية',ru:'Железнодорожное сообщение',zh:'铁路服务',lij:'Serviçio ferroviäio'},
      website:'https://www.trenitalia.com/'
    },
    metro: {
      iconClass:'metro-ico', color:'#ef4444', mark:'M',
      label:{it:'Stazione metropolitana',en:'Metro station',es:'Estación de metro',fr:'Station de métro',ar:'محطة مترو',ru:'Станция метро',zh:'地铁站',lij:'Stasciòn da metrò'},
      service:{it:'Metropolitana di Genova',en:'Genoa Metro',es:'Metro de Génova',fr:'Métro de Gênes',ar:'مترو جنوة',ru:'Метро Генуи',zh:'热那亚地铁',lij:'Metrò de Zêna'},
      website:'https://www.amt.genova.it/amt/trasporto-multimodale/metropolitana/'
    },
    funi: {
      iconClass:'funi-ico', color:'#b67a69', mark:'↗',
      label:{it:'Funicolare / ascensore',en:'Funicular / elevator',es:'Funicular / ascensor',fr:'Funiculaire / ascenseur',ar:'قطار جبلي / مصعد',ru:'Фуникулёр / лифт',zh:'缆车 / 电梯',lij:'Funicolâ / ascensô'},
      service:{it:'Impianti speciali AMT',en:'AMT special transport',es:'Transportes especiales AMT',fr:'Transports spéciaux AMT',ar:'وسائل النقل الخاصة AMT',ru:'Специальный транспорт AMT',zh:'AMT 特殊交通设施',lij:'Impianti speçiâ AMT'},
      website:'https://www.amt.genova.it/amt/trasporto-multimodale/ascensori/'
    },
    fort: {
      kind:'heritage', iconClass:'forti-marker', color:'#8f4038', mark:'F',
      label:{it:'Forte',en:'Fort',es:'Fuerte',fr:'Fort',ar:'\u062d\u0635\u0646',ru:'\u0424\u043e\u0440\u0442',zh:'\u8981\u585e',lij:'Forte'}
    },
    museum: {
      kind:'heritage', iconClass:'museum-ico', color:'#a65b43', mark:'M',
      label:{it:'Museo',en:'Museum',es:'Museo',fr:'Mus\u00e9e',ar:'\u0645\u062a\u062d\u0641',ru:'\u041c\u0443\u0437\u0435\u0439',zh:'\u535a\u7269\u9986',lij:'Muxeo'}
    },
    church: {
      kind:'heritage', iconClass:'chiese-marker', color:'#7d5263', mark:'+',
      label:{it:'Chiesa',en:'Church',es:'Iglesia',fr:'\u00c9glise',ar:'\u0643\u0646\u064a\u0633\u0629',ru:'\u0426\u0435\u0440\u043a\u043e\u0432\u044c',zh:'\u6559\u5802',lij:'Gexa'}
    },
    palace: {
      kind:'heritage', iconClass:'palazzi-marker', color:'#b57945', mark:'P',
      label:{it:'Palazzo',en:'Palace',es:'Palacio',fr:'Palais',ar:'\u0642\u0635\u0631',ru:'\u0414\u0432\u043e\u0440\u0435\u0446',zh:'\u5bab\u6bbf',lij:'Palasso'}
    },
    park: {
      kind:'entertainment', iconClass:'parks-ico', color:'#22c55e', mark:'P',
      label:{it:'Parchi e piazze',en:'Parks & squares',es:'Parques y plazas',fr:'Parcs et places',ar:'\u0627\u0644\u062d\u062f\u0627\u0626\u0642 \u0648\u0627\u0644\u0633\u0627\u062d\u0627\u062a',ru:'\u041f\u0430\u0440\u043a\u0438 \u0438 \u043f\u043b\u043e\u0449\u0430\u0434\u0438',zh:'\u516c\u56ed\u4e0e\u5e7f\u573a',lij:'Parchi e ciass\u00e6'}
    },
    venue: {
      kind:'entertainment', iconClass:'locali-marker', color:'#db2777', mark:'L',
      label:{it:'Locale',en:'Venue',es:'Local',fr:'\u00c9tablissement',ar:'\u0645\u0643\u0627\u0646 \u062a\u0631\u0641\u064a\u0647\u064a',ru:'\u0417\u0430\u0432\u0435\u0434\u0435\u043d\u0438\u0435',zh:'\u5a31\u4e50\u573a\u6240',lij:'Locale'}
    },
    exhibition: {
      kind:'entertainment', iconClass:'mostre-marker', color:'#06b6d4', mark:'EX',
      label:{it:'Mostra',en:'Exhibition',es:'Exposici\u00f3n',fr:'Exposition',ar:'\u0645\u0639\u0631\u0636',ru:'\u0412\u044b\u0441\u0442\u0430\u0432\u043a\u0430',zh:'\u5c55\u89c8',lij:'Mostra'}
    },
    cinema: {
      kind:'entertainment', iconClass:'cinema-marker', color:'#a855f7', mark:'C',
      label:{it:'Cinema',en:'Cinema',es:'Cine',fr:'Cin\u00e9ma',ar:'\u0633\u064a\u0646\u0645\u0627',ru:'\u041a\u0438\u043d\u043e\u0442\u0435\u0430\u0442\u0440',zh:'\u7535\u5f71\u9662',lij:'Cin\u00eama'}
    },
    theater: {
      kind:'entertainment', iconClass:'teatri-marker', color:'#b91c1c', mark:'T',
      label:{it:'Teatro',en:'Theatre',es:'Teatro',fr:'Th\u00e9\u00e2tre',ar:'\u0645\u0633\u0631\u062d',ru:'\u0422\u0435\u0430\u0442\u0440',zh:'\u5267\u9662',lij:'Teatro'}
    },
    sport: {
      kind:'entertainment', iconClass:'sport-marker', color:'#808000', mark:'SP',
      label:{it:'Luogo sportivo',en:'Sports venue',es:'Centro deportivo',fr:'Site sportif',ar:'\u0645\u0646\u0634\u0623\u0629 \u0631\u064a\u0627\u0636\u064a\u0629',ru:'\u0421\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u044b\u0439 \u043e\u0431\u044a\u0435\u043a\u0442',zh:'\u4f53\u80b2\u573a\u6240',lij:'Posto sportivo'}
    },
    sea: {
      iconClass:'mare-marker', color:'#0ea5e9', mark:'≈',
      label:{it:'Trasporto marittimo',en:'Sea transport',es:'Transporte marítimo',fr:'Transport maritime',ar:'النقل البحري',ru:'Морской транспорт',zh:'海上交通',lij:'Trasporto pe mâ'},
      service:{it:'Traghetti, navi e battelli',en:'Ferries, ships and boats',es:'Ferris, barcos y embarcaciones',fr:'Ferries, navires et bateaux',ar:'عبّارات وسفن وقوارب',ru:'Паромы, суда и катера',zh:'渡轮、邮轮和游船',lij:'Traghetti, nave e batèi'}
    },
    airport: {
      iconClass:'aereo-marker', color:'#2563eb', mark:'✈',
      label:{it:'Aeroporto',en:'Airport',es:'Aeropuerto',fr:'Aéroport',ar:'مطار',ru:'Аэропорт',zh:'机场',lij:'Aeroporto'},
      service:{it:'Collegamenti aerei',en:'Air connections',es:'Conexiones aéreas',fr:'Liaisons aériennes',ar:'رحلات جوية',ru:'Авиасообщение',zh:'航空连接',lij:'Collegamenti pe ægo'},
      website:'https://www.airport.genova.it/'
    }
  };

  var RESTAURANT_LABEL = {
    it:'Ristorante', en:'Restaurant', es:'Restaurante', fr:'Restaurant',
    ar:'مطعم', ru:'Ресторан', zh:'餐厅', lij:'Ristorante'
  };
  var TAKE_AWAY_LABEL = {
    it:'Take-away', en:'Takeaway', es:'Comida para llevar', fr:'À emporter',
    ar:'طعام للسفر', ru:'Еда навынос', zh:'外卖', lij:'Take-away'
  };
  var ACCOMMODATION_LABEL = {
    it:'Albergo e B&B', en:'Hotel & B&B', es:'Hotel y B&B', fr:'Hôtel et B&B',
    ar:'فندق ومبيت وإفطار', ru:'Отель и B&B', zh:'酒店与民宿', lij:'Albergo e B&B'
  };

  function currentLang(){
    var raw = 'it';
    try{
      raw = document.documentElement.getAttribute('lang') || localStorage.getItem('lang') || 'it';
    }catch(_){}
    raw = String(raw || 'it').toLowerCase();
    if(raw.indexOf('lij') === 0) return 'lij';
    for(var i=0;i<LANGS.length;i++){
      if(raw.indexOf(LANGS[i]) === 0) return LANGS[i];
    }
    return 'it';
  }

  function pick(value, lang){
    if(value == null) return '';
    if(typeof value === 'string') return value;
    if(typeof value === 'object') return value[lang] || value.it || value.en || '';
    return String(value);
  }

  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function cleanText(value){
    return String(value || '').replace(/\s+/g,' ').trim();
  }

  function normalized(value){
    return cleanText(value).toLowerCase();
  }

  function imageKey(value){
    var key = normalized(value);
    try{ key = key.normalize('NFD').replace(/[\u0300-\u036f]/g,''); }catch(_){}
    return key.replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  }

  function defaultImage(type, name){
    var images = TRANSPORT_IMAGES[type] || {};
    var wanted = imageKey(name);
    if(images[wanted]) return images[wanted];
    var keys = Object.keys(images);
    for(var i=0;i<keys.length;i++){
      if(wanted.indexOf(keys[i]) !== -1 || keys[i].indexOf(wanted) !== -1){
        return images[keys[i]];
      }
    }
    return '';
  }

  function iconClass(source){
    try{
      return String(source.options.icon.options.className || '');
    }catch(_){ return ''; }
  }

  function typeFor(source){
    var cls = iconClass(source);
    var keys = Object.keys(TYPES);
    for(var i=0;i<keys.length;i++){
      if(cls.indexOf(TYPES[keys[i]].iconClass) !== -1) return keys[i];
    }
    return '';
  }

  function legacySnapshot(popup){
    var root = document.createElement('div');
    var content = '';
    try{ content = popup.getContent ? popup.getContent() : ''; }catch(_){}
    if(content && content.nodeType){ root.appendChild(content.cloneNode(true)); }
    else root.innerHTML = String(content || '');

    var titleEl = root.querySelector('.mh-popup-title, [data-popup-title], h3');
    var descEl = root.querySelector('.mh-popup-desc');
    var addrEl = root.querySelector('.mh-popup-addr');
    if(!addrEl){
      var strong = root.querySelector('strong');
      if(strong && strong.parentElement) addrEl = strong.parentElement;
    }
    var linkEl = root.querySelector('a[href]');
    var imageEl = root.querySelector('img[src]');
    return {
      raw: cleanText(root.textContent),
      title: cleanText(titleEl && titleEl.textContent),
      description: cleanText(descEl && descEl.textContent),
      address: cleanText(addrEl && addrEl.textContent),
      website: linkEl ? String(linkEl.getAttribute('href') || '') : '',
      image: imageEl ? String(imageEl.getAttribute('src') || '') : ''
    };
  }

  function sourceName(source, snapshot){
    var data = source && (source._mhData || source._genovaParkData || source._genovaLocaliData);
    var name = data && pick(data.name || data.title, currentLang());
    if(!name && source) name = source._stationName || source._metroName || source._busName || source._funiName;
    if(!name && source && source.options) name = source.options.title;
    if(!name && snapshot) name = snapshot.description || snapshot.title || snapshot.raw;
    name = cleanText(name);
    return name.replace(/\bAereoporto\b/gi, 'Aeroporto');
  }

  function arrayFor(type){
    if(type === 'bus') return window.BUS_STATIONS || [];
    if(type === 'train') return window.TRAIN_STATIONS || [];
    if(type === 'metro') return window.METRO_STATIONS || [];
    if(type === 'funi') return window.FUNI_POINTS || [];
    if(type === 'fort') return window.FORTI_DATA || [];
    if(type === 'museum') return window.MUSEI_DATA || [];
    if(type === 'church') return window.CHIESE_POINTS || [];
    if(type === 'palace') return window.PALAZZI_POINTS || [];
    if(type === 'park') return window.PARKS_POINTS || [];
    if(type === 'venue') return window.LOCALI_POINTS || window.LOCALI || [];
    if(type === 'exhibition') return window.MOSTRE_POINTS || [];
    if(type === 'cinema') return window.CINEMA_POINTS || [];
    if(type === 'theater') return window.TEATRI_POINTS || [];
    if(type === 'sport') return window.SPORT_POINTS || [];
    return [];
  }

  function closestData(type, source, name){
    if(source && source._mhData) return source._mhData;
    if(source && source._genovaParkData) return source._genovaParkData;
    if(source && source._genovaLocaliData) return source._genovaLocaliData;
    var points = arrayFor(type);
    var wanted = normalized(name);
    var byName = null;
    for(var i=0;i<points.length;i++){
      if(normalized(pick(points[i].name || points[i].title, currentLang())) === wanted){ byName = points[i]; break; }
    }
    if(byName) return byName;
    var ll = source && source.getLatLng ? source.getLatLng() : null;
    if(!ll) return {};
    var best = null, bestScore = Infinity;
    for(var j=0;j<points.length;j++){
      var dy = Number(points[j].lat) - Number(ll.lat);
      var dx = Number(points[j].lng) - Number(ll.lng);
      var score = dy*dy + dx*dx;
      if(score < bestScore){ bestScore = score; best = points[j]; }
    }
    return bestScore < 0.000001 ? best : {};
  }

  function stripAddressLabel(text, lang){
    var labels = LANGS.map(function(code){ return TEXT[code].address; });
    var result = cleanText(text);
    for(var i=0;i<labels.length;i++){
      var prefix = labels[i] + ':';
      if(result.toLowerCase().indexOf(prefix.toLowerCase()) === 0){
        result = cleanText(result.slice(prefix.length));
        break;
      }
    }
    return result;
  }

  function detailsOverride(type, name){
    var all = window.TRANSPORT_PLACE_DETAILS || {};
    var direct = all[type + '|' + name] || all[type + '|' + normalized(name)];
    if(direct) return direct;

    // Alcuni punti usano un nome abbreviato nel marker e uno più completo
    // nell'elenco (es. "Via Degola" / "Via Degola, Sampierdarena").
    var prefix = type + '|';
    var wanted = imageKey(name);
    var keys = Object.keys(all);
    for(var i=0;i<keys.length;i++){
      if(keys[i].indexOf(prefix) !== 0) continue;
      var candidate = imageKey(keys[i].slice(prefix.length));
      if(candidate === wanted || candidate.indexOf(wanted) !== -1 || wanted.indexOf(candidate) !== -1){
        return all[keys[i]];
      }
    }
    return {};
  }

  function entertainmentOverride(type, name){
    var all = type === 'cinema' ? (window.CINEMA_PLACE_DETAILS || {})
      : type === 'theater' ? (window.THEATER_PLACE_DETAILS || {})
      : type === 'park' ? (window.PARK_PLACE_DETAILS || {})
      : {};
    if(all[name]) return all[name];
    var wanted = normalized(name);
    var keys = Object.keys(all);
    for(var i=0;i<keys.length;i++){
      if(normalized(keys[i]) === wanted) return all[keys[i]];
    }
    return {};
  }

  function modelFor(type, source, snapshot){
    var lang = currentLang();
    var cfg = TYPES[type];
    var previous = source && source._gmPlaceModel && source._gmPlaceModel.lang === lang
      ? source._gmPlaceModel : null;
    var name = sourceName(source, snapshot);
    var point = closestData(type, source, name);
    if(point && (point.name || point.title)) name = pick(point.name || point.title, lang).replace(/\bAereoporto\b/gi, 'Aeroporto');
    if(cfg.kind === 'heritage' || cfg.kind === 'entertainment'){
      var entertainmentExtra = cfg.kind === 'entertainment' ? entertainmentOverride(type, name) : {};
      var venueKind = type === 'venue' ? String(point.kind || 'locale').toLowerCase() : '';
      var venueColor = venueKind === 'ristorante' ? '#247766'
        : venueKind === 'take-away' ? '#b45f32'
        : venueKind === 'alloggio' ? '#315f7d' : cfg.color;
      var venueMark = venueKind === 'ristorante' ? 'R'
        : venueKind === 'take-away' ? 'T'
        : venueKind === 'alloggio' ? 'H' : cfg.mark;
      var venueLabel = venueKind === 'ristorante' ? RESTAURANT_LABEL
        : venueKind === 'take-away' ? TAKE_AWAY_LABEL
        : venueKind === 'alloggio' ? ACCOMMODATION_LABEL : cfg.label;
      var pointDescription = entertainmentExtra.description || point.desc || point.descr || point.description || '';
      var simpleDescription = '';
      if(pointDescription && typeof pointDescription === 'object'){
        simpleDescription = pick(pointDescription, lang);
      }else{
        // I Musei usano popup speciali che forniscono la traduzione corrente
        // anche quando il dato di base contiene soltanto l'italiano.
        simpleDescription = snapshot.description || pick(pointDescription, lang);
      }
      return {
        type:type,
        kind:cfg.kind,
        color:venueColor,
        mark:venueMark,
        category:pick(venueLabel, lang),
        name:name,
        image:pick(point.img || point.image || point.photo, lang) || snapshot.image || '',
        summary:simpleDescription,
        rooms:pick(entertainmentExtra.rooms || point.rooms, lang),
        address:stripAddressLabel(pick(point.addr || point.address, lang) || snapshot.address || '', lang),
        website:pick(point.site || point.url, lang) || snapshot.website || '',
        lang:lang,
        dir:lang === 'ar' ? 'rtl' : 'ltr'
      };
    }
    var extra = detailsOverride(type, name);
    var description = pick(extra.summary || point.summary || point.practical, lang);
    var history = pick(extra.history || point.history, lang);
    var legacyDescription = snapshot.description;

    // Nei vecchi popup di bus/metro/treno/funi la "descrizione" è solo il nome.
    if(!history && legacyDescription && normalized(legacyDescription) !== normalized(name)){
      history = legacyDescription;
    }
    if(!history && previous) history = previous.history || '';

    var address = pick(extra.address || point.addr || point.address, lang) || snapshot.address || (previous && previous.address) || '';
    var website = pick(extra.website || point.site || point.url, lang) || snapshot.website || (previous && previous.website) || cfg.website || '';
    var image = pick(extra.image || point.image || point.img || point.photo, lang)
      || defaultImage(type, name)
      || (previous && previous.image)
      || '';
    var service = pick(extra.service || point.service, lang) || pick(cfg.service, lang);

    return {
      type:type,
      color:cfg.color,
      mark:cfg.mark,
      category:pick(cfg.label, lang),
      name:name,
      image:image,
      summary:description,
      history:history,
      address:stripAddressLabel(address, lang),
      website:website,
      service:service,
      lang:lang,
      dir:lang === 'ar' ? 'rtl' : 'ltr'
    };
  }

  function render(model){
    var tx = TEXT[model.lang] || TEXT.it;
    var infoId = 'gm-place-info-' + Math.random().toString(36).slice(2,10);
    var imageHtml = model.image
      ? '<img src="'+esc(model.image)+'" alt="'+esc(model.name)+'" loading="lazy" decoding="async">'
      : '<div class="gm-place-media-fallback" aria-hidden="true">'
          + '<span class="gm-place-media-symbol">'+esc(model.mark)+'</span>'
          + '<span class="gm-place-media-note">'+esc(tx.imagePending)+'</span>'
        + '</div>';
    var summaryHtml = model.summary ? '<p class="gm-place-summary">'+esc(model.summary)+'</p>' : '';
    var serviceHtml = model.service
      ? '<div class="gm-place-meta-row"><dt class="gm-place-meta-label">'+esc(tx.service)+'</dt><dd class="gm-place-meta-value">'+esc(model.service)+'</dd></div>' : '';
    var addressHtml = model.address
      ? '<div class="gm-place-meta-row"><dt class="gm-place-meta-label">'+esc(tx.address)+'</dt><dd class="gm-place-meta-value">'+esc(model.address)+'</dd></div>' : '';
    var websiteHtml = model.website
      ? '<div class="gm-place-actions"><a class="gm-place-link" href="'+esc(model.website)+'" target="_blank" rel="noopener noreferrer">'+esc(tx.official)+'</a></div>' : '';
    var infoText = model.history || INFO_PENDING[model.lang] || INFO_PENDING.it;
    var infoPanel = '<section class="gm-place-info-panel" id="'+infoId+'" hidden>'
          + '<h4 class="gm-place-info-title">'+esc(tx.info)+'</h4>'
          + '<p class="gm-place-info-text">'+esc(infoText)+'</p>'
        + '</section>';
    var infoButton = '<button class="gm-place-info-btn" type="button" aria-expanded="false" aria-controls="'+infoId+'" aria-label="'+esc(tx.openInfo)+'" title="'+esc(tx.openInfo)+'" data-open-label="'+esc(tx.openInfo)+'" data-close-label="'+esc(tx.closeInfo)+'">i</button>';

    return '<article class="gm-place-popup gm-place-popup--transport gm-place-popup--'+esc(model.type)+'" dir="'+model.dir+'" style="--gm-place-color:'+esc(model.color)+'">'
      + '<header class="gm-place-header">'
        + '<span class="gm-place-category"><span class="gm-place-category-mark" aria-hidden="true">'+esc(model.mark)+'</span>'+esc(model.category)+'</span>'
        + '<h3 class="gm-place-title mh-popup-title" data-popup-title>'+esc(model.name)+'</h3>'
      + '</header>'
      + '<div class="gm-place-media">'+imageHtml+'</div>'
      + '<div class="gm-place-body">'+summaryHtml+'<dl class="gm-place-meta">'+serviceHtml+addressHtml+'</dl>'+websiteHtml+'</div>'
      + infoPanel
      + '<footer class="gm-place-footer">'+infoButton+'</footer>'
      + '</article>';
  }

  function renderHeritage(model){
    var tx = TEXT[model.lang] || TEXT.it;
    var imageHtml = model.image
      ? '<img src="'+esc(model.image)+'" alt="'+esc(model.name)+'" loading="lazy" decoding="async">'
      : '<div class="gm-place-media-fallback" aria-hidden="true">'
          + '<span class="gm-place-media-symbol">'+esc(model.mark)+'</span>'
          + '<span class="gm-place-media-note">'+esc(tx.imagePending)+'</span>'
        + '</div>';
    var descriptionHtml = model.summary
      ? '<p class="gm-place-summary gm-place-description">'+esc(model.summary)+'</p>' : '';
    var roomsRow = model.rooms
      ? '<div class="gm-place-meta-row"><dt class="gm-place-meta-label">'+esc(tx.rooms || TEXT.it.rooms)+'</dt><dd class="gm-place-meta-value">'+esc(model.rooms)+'</dd></div>' : '';
    var addressRow = model.address
      ? '<div class="gm-place-meta-row"><dt class="gm-place-meta-label">'+esc(tx.address)+'</dt><dd class="gm-place-meta-value">'+esc(model.address)+'</dd></div>' : '';
    var metaHtml = roomsRow || addressRow ? '<dl class="gm-place-meta">'+roomsRow+addressRow+'</dl>' : '';
    var websiteHtml = model.website
      ? '<div class="gm-place-actions"><a class="gm-place-link" href="'+esc(model.website)+'" target="_blank" rel="noopener noreferrer">'+esc(HERITAGE_LINK[model.lang] || HERITAGE_LINK.it)+'</a></div>' : '';

    return '<article class="gm-place-popup gm-place-popup--heritage gm-place-popup--'+esc(model.type)+'" dir="'+model.dir+'" style="--gm-place-color:'+esc(model.color)+'">'
      + '<header class="gm-place-header">'
        + '<span class="gm-place-category"><span class="gm-place-category-mark" aria-hidden="true">'+esc(model.mark)+'</span>'+esc(model.category)+'</span>'
        + '<h3 class="gm-place-title mh-popup-title" data-popup-title>'+esc(model.name)+'</h3>'
      + '</header>'
      + '<div class="gm-place-media">'+imageHtml+'</div>'
      + '<div class="gm-place-body">'+descriptionHtml+metaHtml+websiteHtml+'</div>'
      + '<footer class="gm-place-footer gm-place-footer--heritage" aria-hidden="true"></footer>'
      + '</article>';
  }

  function renderEntertainment(model){
    var tx = TEXT[model.lang] || TEXT.it;
    var imageHtml = model.image
      ? '<img src="'+esc(model.image)+'" alt="'+esc(model.name)+'" loading="lazy" decoding="async">'
      : '<div class="gm-place-media-fallback" aria-hidden="true">'
          + '<span class="gm-place-media-symbol">'+esc(model.mark)+'</span>'
          + '<span class="gm-place-media-note">'+esc(tx.imagePending)+'</span>'
        + '</div>';
    var descriptionHtml = model.summary
      ? '<p class="gm-place-summary gm-place-description">'+esc(model.summary)+'</p>' : '';
    var roomsRow = model.rooms
      ? '<div class="gm-place-meta-row"><dt class="gm-place-meta-label">'+esc(tx.rooms || TEXT.it.rooms)+'</dt><dd class="gm-place-meta-value">'+esc(model.rooms)+'</dd></div>' : '';
    var addressRow = model.address
      ? '<div class="gm-place-meta-row"><dt class="gm-place-meta-label">'+esc(tx.address)+'</dt><dd class="gm-place-meta-value">'+esc(model.address)+'</dd></div>' : '';
    var metaHtml = roomsRow || addressRow ? '<dl class="gm-place-meta">'+roomsRow+addressRow+'</dl>' : '';
    var websiteHtml = model.website
      ? '<div class="gm-place-actions"><a class="gm-place-link" href="'+esc(model.website)+'" target="_blank" rel="noopener noreferrer">'+esc(HERITAGE_LINK[model.lang] || HERITAGE_LINK.it)+'</a></div>' : '';

    return '<article class="gm-place-popup gm-place-popup--entertainment gm-place-popup--'+esc(model.type)+'" dir="'+model.dir+'" style="--gm-place-color:'+esc(model.color)+'">'
      + '<header class="gm-place-header">'
        + '<span class="gm-place-category"><span class="gm-place-category-mark" aria-hidden="true">'+esc(model.mark)+'</span>'+esc(model.category)+'</span>'
        + '<h3 class="gm-place-title mh-popup-title" data-popup-title>'+esc(model.name)+'</h3>'
      + '</header>'
      + '<div class="gm-place-media">'+imageHtml+'</div>'
      + '<div class="gm-place-body">'+descriptionHtml+metaHtml+websiteHtml+'</div>'
      + '<footer class="gm-place-footer gm-place-footer--entertainment" aria-hidden="true"></footer>'
      + '</article>';
  }

  function markPopup(popup){
    window.setTimeout(function(){
      var el = popup && (popup.getElement ? popup.getElement() : popup._container);
      if(el){
        el.classList.add('gm-place-popup-wrap');
        try{ if(popup.update) popup.update(); }catch(_){}
      }
    },0);
  }

  function visibleRect(selector){
    var element = document.querySelector(selector);
    if(!element) return null;
    var style = window.getComputedStyle ? window.getComputedStyle(element) : null;
    if(style && (style.display === 'none' || style.visibility === 'hidden')) return null;
    var rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 ? rect : null;
  }

  function safePopupArea(mapRef, popupRect){
    var container = mapRef && mapRef.getContainer ? mapRef.getContainer() : document.getElementById('map');
    if(!container) return null;
    var mapRect = container.getBoundingClientRect();
    var compact = window.innerWidth <= 600;
    var edge = compact ? 18 : 26;
    var safe = {
      left: mapRect.left + edge,
      top: mapRect.top + edge,
      right: mapRect.right - edge,
      bottom: mapRect.bottom - edge
    };

    // Toolbar e sponsor occupano realmente la parte alta della mappa.
    var header = visibleRect('#app > header');
    var sponsor = visibleRect('#sponsor-strip');
    if(header) safe.top = Math.max(safe.top, header.bottom + (compact ? 10 : 14));
    if(sponsor) safe.top = Math.max(safe.top, sponsor.bottom + (compact ? 12 : 16));

    // La barra inferiore deve restare completamente separata dal popup.
    var bottomBar = visibleRect('#bottom-bar');
    if(bottomBar) safe.bottom = Math.min(safe.bottom, bottomBar.top - (compact ? 12 : 16));

    // Riserva lateralmente lo spazio dei filtri e dei controlli solo quando
    // si trovano alla stessa altezza del popup.
    var rightPanels = [visibleRect('#quick-toggles'), visibleRect('#ui-map-controls')];
    for(var i=0;i<rightPanels.length;i++){
      var panel = rightPanels[i];
      if(!panel || !popupRect) continue;
      var sameBand = popupRect.bottom > panel.top - 12 && popupRect.top < panel.bottom + 12;
      if(sameBand && panel.left > mapRect.left + mapRect.width / 2){
        var proposedRight = panel.left - (compact ? 10 : 14);
        // Su telefoni stretti il popup puo essere piu largo dello spazio tra
        // bordo sinistro e comandi laterali. In quel caso conserviamo i margini
        // della finestra: restringere ulteriormente l'area farebbe oscillare
        // l'auto-pan e lascerebbe il popup parzialmente fuori schermo.
        if(proposedRight - safe.left >= popupRect.width){
          safe.right = Math.min(safe.right, proposedRight);
        }
      }
    }

    // Evita una zona sicura impossibile negli schermi estremamente piccoli.
    if(safe.right - safe.left < 210){
      safe.left = mapRect.left + 12;
      safe.right = mapRect.right - 12;
    }
    if(safe.bottom - safe.top < 210){
      safe.top = mapRect.top + 12;
      safe.bottom = mapRect.bottom - 12;
    }
    return safe;
  }

  function panPopupIntoSafeArea(popup, animate){
    if(!popup) return;
    var mapRef = (popup._source && popup._source._map) || popup._map || window.map || window.__map || window.MAP;
    var popupElement = popup.getElement ? popup.getElement() : popup._container;
    if(!mapRef || !popupElement || typeof mapRef.panBy !== 'function') return;

    var rect = popupElement.getBoundingClientRect();
    var safe = safePopupArea(mapRef, rect);
    if(!safe) return;

    // L'area scorrevole non deve mai essere più alta dello spazio realmente
    // libero tra sponsor e comandi inferiori.
    var content = popupElement.querySelector('.gm-place-popup');
    if(content){
      var availableHeight = Math.max(220, Math.floor(safe.bottom - safe.top - 18));
      content.style.maxHeight = Math.min(510, availableHeight) + 'px';
      rect = popupElement.getBoundingClientRect();
      safe = safePopupArea(mapRef, rect) || safe;
    }

    var dx = 0, dy = 0;
    if(rect.left < safe.left) dx = rect.left - safe.left;
    else if(rect.right > safe.right) dx = rect.right - safe.right;
    if(rect.top < safe.top) dy = rect.top - safe.top;
    else if(rect.bottom > safe.bottom) dy = rect.bottom - safe.bottom;

    if(Math.abs(dx) < 2 && Math.abs(dy) < 2) return;
    var reduced = false;
    try{ reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(_){}
    try{ if(typeof mapRef.stop === 'function') mapRef.stop(); }catch(_){}
    if(animate === false && mapRef.getCenter && mapRef.getZoom && mapRef.project && mapRef.unproject && mapRef.setView){
      var zoom = mapRef.getZoom();
      var centerPoint = mapRef.project(mapRef.getCenter(), zoom);
      centerPoint.x += Math.round(dx);
      centerPoint.y += Math.round(dy);
      mapRef.setView(mapRef.unproject(centerPoint, zoom), zoom, {animate:false});
      return;
    }
    mapRef.panBy([Math.round(dx), Math.round(dy)], {
      animate: animate !== false && !reduced,
      duration: .24,
      easeLinearity: .35
    });
  }

  function scheduleSafePan(popup, animate){
    if(!popup) return;
    if(popup.__gmSafePanTimer) window.clearTimeout(popup.__gmSafePanTimer);
    if(popup.__gmSafePanSettleTimer) window.clearTimeout(popup.__gmSafePanSettleTimer);
    function run(forceInstant){
      var mapRef = (popup._source && popup._source._map) || popup._map || window.map || window.__map || window.MAP;
      var current = mapRef && mapRef._popup ? mapRef._popup : popup;
      if(current && (current.getElement ? current.getElement() : current._container)){
        panPopupIntoSafeArea(current, forceInstant ? false : animate);
      }
    }
    // Leaflet esegue prima il proprio auto-pan. Il secondo controllo assorbe
    // anche dispositivi/browser in cui quell'animazione termina più tardi.
    popup.__gmSafePanTimer = window.setTimeout(function(){
      popup.__gmSafePanTimer = 0;
      run(false);
    },320);
    popup.__gmSafePanSettleTimer = window.setTimeout(function(){
      popup.__gmSafePanSettleTimer = 0;
      run(true);
    },760);
  }

  function scrollPopupForInfo(popup, panel, open){
    var popupElement = popup && (popup.getElement ? popup.getElement() : popup._container);
    var content = popupElement && popupElement.querySelector('.gm-place-popup');
    if(!content) return;
    var reduced = false;
    try{ reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(_){}
    var top = 0;
    if(open){
      // Scorre soltanto quanto serve per mostrare per intero la descrizione.
      top = Math.max(0, panel.offsetTop + panel.offsetHeight - content.clientHeight + 12);
      top = Math.min(top, Math.max(0, content.scrollHeight - content.clientHeight));
    }
    try{
      content.scrollTo({top:top, behavior:reduced ? 'auto' : 'smooth'});
    }catch(_){ content.scrollTop = top; }
  }

  function toggleInfo(button, event, popup){
    if(event){
      event.preventDefault();
      event.stopPropagation();
    }
    var id = button.getAttribute('aria-controls');
    var popupContent = button.closest ? button.closest('.gm-place-popup') : null;
    var panel = popupContent && popupContent.querySelector
      ? popupContent.querySelector('.gm-place-info-panel')
      : (id ? document.getElementById(id) : null);
    if(!panel) return;
    var open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
    var label = button.getAttribute(open ? 'data-close-label' : 'data-open-label') || '';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    window.requestAnimationFrame(function(){
      scrollPopupForInfo(popup, panel, open);
      scheduleSafePan(popup, true);
    });
  }

  function wireInfoButton(popup){
    function bind(){
      var popupElement = popup && (popup.getElement ? popup.getElement() : popup._container);
      var button = popupElement && popupElement.querySelector('.gm-place-info-btn');
      if(!button || button.__gmInfoBound) return;
      button.__gmInfoBound = true;
      button.addEventListener('click', function(event){
        if(Date.now() - (button.__gmInfoHandledAt || 0) < 500) return;
        toggleInfo(button, event, popup);
      });
    }
    window.setTimeout(bind,0);
    window.setTimeout(bind,60);
    window.setTimeout(bind,220);
  }

  function wireMediaSafePan(popup){
    window.setTimeout(function(){
      var popupElement = popup && (popup.getElement ? popup.getElement() : popup._container);
      var image = popupElement && popupElement.querySelector('.gm-place-media img');
      if(!image || image.__gmSafePanBound) return;
      image.__gmSafePanBound = true;
      function settle(){
        window.setTimeout(function(){ panPopupIntoSafeArea(popup, false); },80);
      }
      if(image.complete) settle();
      else image.addEventListener('load', settle, {once:true});
    },0);
  }

  function decoratePopup(popup, preserveMapPosition){
    if(!popup) return false;
    var shouldAdjustMap = preserveMapPosition !== true;
    var source = popup._source;
    var type = typeFor(source);
    if(!type) return false;
    var snapshot = legacySnapshot(popup);
    var model = modelFor(type, source, snapshot);
    if(!model.name) return false;
    source._gmPlaceType = type;
    source._gmPlaceModel = model;
    if(popup.options){
      var mapRef = source._map || popup._map || window.map || window.__map || window.MAP;
      var mapElement = mapRef && mapRef.getContainer ? mapRef.getContainer() : document.getElementById('map');
      var mapRect = mapElement && mapElement.getBoundingClientRect();
      var headerRect = visibleRect('#app > header');
      var sponsorRect = visibleRect('#sponsor-strip');
      var bottomRect = visibleRect('#bottom-bar');
      var quickRect = visibleRect('#quick-toggles');
      var compact = window.innerWidth <= 600;
      var edge = compact ? 18 : 26;
      var topPad = edge;
      var rightPad = edge;
      var bottomPad = edge;
      if(mapRect){
        if(headerRect) topPad = Math.max(topPad, headerRect.bottom - mapRect.top + 10);
        if(sponsorRect) topPad = Math.max(topPad, sponsorRect.bottom - mapRect.top + 14);
        if(bottomRect) bottomPad = Math.max(bottomPad, mapRect.bottom - bottomRect.top + 14);
        if(quickRect) rightPad = Math.max(rightPad, mapRect.right - quickRect.left + 12);
      }
      popup.options.autoPan = shouldAdjustMap;
      if(window.L && typeof window.L.point === 'function'){
        popup.options.autoPanPaddingTopLeft = window.L.point(edge, topPad);
        popup.options.autoPanPaddingBottomRight = window.L.point(rightPad, bottomPad);
      }
      popup.options.maxWidth = 370;
      popup.options.minWidth = 250;
    }
    popup.setContent(model.kind === 'heritage' ? renderHeritage(model) : (model.kind === 'entertainment' ? renderEntertainment(model) : render(model)));
    try{ if(popup.update) popup.update(); }catch(_){}
    if(shouldAdjustMap){
      window.setTimeout(function(){
        if(popup.options) popup.options.autoPan = false;
      },520);
    }
    markPopup(popup);
    wireInfoButton(popup);
    if(shouldAdjustMap){
      wireMediaSafePan(popup);
      scheduleSafePan(popup, true);
    }
    window.setTimeout(function(){
      var popupElement = popup && (popup.getElement ? popup.getElement() : popup._container);
      var content = popupElement && popupElement.querySelector('.gm-place-popup');
      if(content) content.scrollTop = 0;
      try{ if(popup.update) popup.update(); }catch(_){}
    },540);
    return true;
  }

  function activePopup(){
    try{ return window.map && map._popup; }catch(_){ return null; }
  }

  function refreshActive(){
    var popup = activePopup();
    if(!popup || !popup._source || !popup._source._gmPlaceType) return;
    // Il cambio lingua deve aggiornare soltanto i contenuti: la posizione
    // geografica scelta dall'utente non deve essere modificata.
    var mapRef = popup._map || popup._source._map || window.map || window.__map || window.MAP;
    if(!popup.__gmLanguageMapSnapshot && mapRef && typeof mapRef.getCenter === 'function'){
      var currentCenter = mapRef.getCenter();
      popup.__gmLanguageMapSnapshot = {
        center: currentCenter && {lat:currentCenter.lat, lng:currentCenter.lng},
        zoom: typeof mapRef.getZoom === 'function' ? mapRef.getZoom() : null
      };
    }
    if(popup.__gmLanguageSnapshotTimer) window.clearTimeout(popup.__gmLanguageSnapshotTimer);
    if(popup.__gmSafePanTimer) window.clearTimeout(popup.__gmSafePanTimer);
    if(popup.__gmSafePanSettleTimer) window.clearTimeout(popup.__gmSafePanSettleTimer);
    popup.__gmSafePanTimer = 0;
    popup.__gmSafePanSettleTimer = 0;
    decoratePopup(popup, true);
    try{ if(popup.update) popup.update(); }catch(_){}
    function restoreMapPosition(){
      var snapshot = popup.__gmLanguageMapSnapshot;
      if(!snapshot || activePopup() !== popup || !mapRef || typeof mapRef.setView !== 'function') return;
      try{ mapRef.setView(snapshot.center, snapshot.zoom, {animate:false}); }catch(_){}
    }
    restoreMapPosition();
    window.setTimeout(restoreMapPosition,0);
    window.setTimeout(restoreMapPosition,80);
    popup.__gmLanguageSnapshotTimer = window.setTimeout(function(){
      popup.__gmLanguageMapSnapshot = null;
      popup.__gmLanguageSnapshotTimer = 0;
    },240);
  }

  function bindMap(){
    var mapRef = window.map || window.__map || window.MAP;
    if(!mapRef || typeof mapRef.on !== 'function') return false;
    if(mapRef.__gmPlacePopupBound) return true;
    mapRef.__gmPlacePopupBound = true;
    mapRef.on('popupopen', function(event){
      var popup = event && event.popup;
      if(!popup) return;
      // Il secondo passaggio assorbe gli aggiornamenti sincroni dei vecchi popup.
      decoratePopup(popup);
      window.setTimeout(function(){
        if(activePopup() === popup) decoratePopup(popup);
      },0);
    });
    return true;
  }

  window.addEventListener('click', function(event){
    var button = event.target && event.target.closest ? event.target.closest('.gm-place-info-btn') : null;
    if(!button) return;
    button.__gmInfoHandledAt = Date.now();
    event.stopImmediatePropagation();
    toggleInfo(button, event, activePopup());
  }, true);

  document.addEventListener('app:set-lang', function(){ window.setTimeout(refreshActive,0); });
  try{
    new MutationObserver(function(){ window.setTimeout(refreshActive,0); })
      .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }catch(_){}

  window.GenovaPlacePopup = {
    render:render,
    renderHeritage:renderHeritage,
    renderEntertainment:renderEntertainment,
    decorate:decoratePopup,
    refresh:refreshActive,
    currentLang:currentLang,
    types:TYPES
  };

  var tries = 0;
  var timer = window.setInterval(function(){
    if(bindMap() || ++tries > 100) window.clearInterval(timer);
  },100);
})();
