/* Genova mApp - Grifoncino: dialoghi guidati multilingua v0.3 */
(function(){
  'use strict';

  var SUPPORTED = ['it','lij','en','es','fr','ar','ru','zh'];
  function normalizeLang(lang){
    lang = String(lang || 'it').toLowerCase();
    if(lang.indexOf('lij')===0) return 'lij';
    if(lang.indexOf('en')===0) return 'en';
    if(lang.indexOf('es')===0) return 'es';
    if(lang.indexOf('fr')===0) return 'fr';
    if(lang.indexOf('ar')===0) return 'ar';
    if(lang.indexOf('ru')===0) return 'ru';
    if(lang.indexOf('zh')===0 || lang.indexOf('cn')===0) return 'zh';
    return 'it';
  }
  function currentLang(){
    var raw = 'it';
    try{ raw = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it'; }
    catch(_e){ raw = document.documentElement.getAttribute('lang') || 'it'; }
    return normalizeLang(raw);
  }

  var T = {
    it:{
      welcome_text:'Benvenuto su Genova mApp! Cosa ti andrebbe di fare oggi?', discover:'Scoprire qualcosa', find:'Trovare qualcosa', plan:'Organizzare una visita', surprise:'Sorprendimi',
      discover_text:'Che cosa ti incuriosisce di più?', history:'Storia', places:'Luoghi', curiosities:'Curiosità', culture:'Cultura e tradizioni',
      history_text:'Da dove vuoi cominciare con la storia di Genova?', forts:'Forti', museums:'Musei', churches:'Chiese', palaces:'Palazzi',
      places_text:'Che tipo di posto vorresti esplorare?', parks:'Parchi e piazze', theatres:'Teatri', cinema:'Cinema', exhibitions:'Mostre',
      curiosities_text:'Ti va una scoperta casuale? Posso pescare un luogo dalla mappa.', yes_surprise:'Sì, sorprendimi', prefer_choose:'Preferisco scegliere',
      culture_text:'Per cultura e tradizioni partirei da musei, chiese, palazzi o da una sorpresa.',
      find_text:'Cosa stai cercando?', events:'Eventi', food_sleep:'Mangiare e dormire', transport:'Come muoversi', map_place:'Un luogo sulla mappa',
      food_text:'Che cosa ti serve?', venues:'Locali', restaurants:'Ristoranti', takeaway:'Take-away', hotels:'Alberghi e B&B',
      transport_text:'Come vuoi muoverti?', bus:'Autobus', trains:'Treni', metro:'Metro', other_transport:'Altri trasporti',
      transport_more_text:'Posso mostrarti anche questi collegamenti.', vertical:'Impianti verticali', sea:'Navi e battelli', plane:'Aereo',
      plan_text:'Come vuoi organizzare la visita?', route:'Un percorso', nearby:'Vicino a me', theme:'Un tema', explore_map:'Esplora la mappa',
      after_text:'Eccoci! Vuoi che ti aiuti ancora?', yes_continue:'Sì, continua', discover_more:'Fammi scoprire altro', organize_visit:'Organizza una visita',
      unavailable_text:'Questa scorciatoia non è disponibile qui, ma posso guidarti in un altro modo.', back_choices:'Torna alle scelte',
      back:'Indietro', home:'Inizio', minimize_q:'Metti a icona il Grifoncino?', yes:'Sì', no:'No', assistant_label:'Assistente Grifoncino', message_label:'Messaggio del Grifoncino', options_label:'Opzioni Grifoncino', open_label:'Apri il Grifoncino'
    },
    lij:{
      welcome_text:'Benvegnûo in Genova mApp! Cöse ti veu fâ ancheu?', discover:'Scrovî quarcösa', find:'Trovâ quarcösa', plan:'Organizzâ unna vixita', surprise:'Sorprendime',
      discover_text:'Cöse te incurioxiscian de ciù?', history:'Stöia', places:'Leughi', curiosities:'Curioscitæ', culture:'Cultura e tradiçioin',
      history_text:'Da dondë ti veu comensâ co-a stöia de Zena?', forts:'Forti', museums:'Musei', churches:'Gêxe', palaces:'Palazzi',
      places_text:'Che tipo de leugo ti veu esplorâ?', parks:'Parchi e ciassæ', theatres:'Teatri', cinema:'Cinema', exhibitions:'Mostre',
      curiosities_text:'Ti va unna scovèrta a caxo? Posso çernî un leugo da-a mappa.', yes_surprise:'Scì, sorprendime', prefer_choose:'Preferiscio çerne',
      culture_text:'Pe cultura e tradiçioin porriæmo partî da musei, gêxe, palazzi ò da unna sorpresa.',
      find_text:'Cöse ti çerchi?', events:'Eventi', food_sleep:'Mangia e dormî', transport:'Comme anâ in gio', map_place:'Un leugo in sciâ mappa',
      food_text:'Cöse ti serve?', venues:'Locali', restaurants:'Ristoranti', takeaway:'Mangia da portâ via', hotels:'Hotel e B&B',
      transport_text:'Comme ti veu spostâte?', bus:'Autobus', trains:'Trenin', metro:'Metro', other_transport:'Atri trasporti',
      transport_more_text:'Posso mostrâte anche sti collegamenti.', vertical:'Impianti verticali', sea:'Navi e battelli', plane:'Aereo',
      plan_text:'Comme ti veu organizzâ a vixita?', route:'Un percorso', nearby:'Vixin a mi', theme:'Un tema', explore_map:'Esplora a mappa',
      after_text:'Eccoci! Ti veu che te agiutte ancón?', yes_continue:'Scì, continoa', discover_more:'Famme scrovî atro', organize_visit:'Organizza unna vixita',
      unavailable_text:'Sta scorciatoia a no l’é disponibbile chi, ma posso guidâte in un atro mòddo.', back_choices:'Torna ae çernie',
      back:'Indrê', home:'Iniçio', minimize_q:'Metto a icona o Grifoncino?', yes:'Scì', no:'No', assistant_label:'Assistente Grifoncino', message_label:'Messaggio do Grifoncino', options_label:'Opçioin Grifoncino', open_label:'Arvi o Grifoncino'
    },
    en:{
      welcome_text:'Welcome to Genova mApp! What would you like to do today?', discover:'Discover something', find:'Find something', plan:'Plan a visit', surprise:'Surprise me',
      discover_text:'What are you most curious about?', history:'History', places:'Places', curiosities:'Curiosities', culture:'Culture and traditions',
      history_text:'Where would you like to start with Genoa’s history?', forts:'Forts', museums:'Museums', churches:'Churches', palaces:'Palaces',
      places_text:'What kind of place would you like to explore?', parks:'Parks and squares', theatres:'Theatres', cinema:'Cinema', exhibitions:'Exhibitions',
      curiosities_text:'Would you like a random discovery? I can pick a place from the map.', yes_surprise:'Yes, surprise me', prefer_choose:'I’d rather choose',
      culture_text:'For culture and traditions, we can start with museums, churches, palaces or a surprise.',
      find_text:'What are you looking for?', events:'Events', food_sleep:'Food and accommodation', transport:'Getting around', map_place:'A place on the map',
      food_text:'What do you need?', venues:'Venues', restaurants:'Restaurants', takeaway:'Take-away', hotels:'Hotels and B&Bs',
      transport_text:'How would you like to get around?', bus:'Bus', trains:'Trains', metro:'Metro', other_transport:'Other transport',
      transport_more_text:'I can also show you these connections.', vertical:'Vertical transport', sea:'Boats and ferries', plane:'Airport',
      plan_text:'How would you like to plan your visit?', route:'A route', nearby:'Near me', theme:'A theme', explore_map:'Explore the map',
      after_text:'Here we are! Would you like more help?', yes_continue:'Yes, continue', discover_more:'Show me something else', organize_visit:'Plan a visit',
      unavailable_text:'This shortcut is not available here, but I can guide you another way.', back_choices:'Back to choices',
      back:'Back', home:'Home', minimize_q:'Minimize the Griffin?', yes:'Yes', no:'No', assistant_label:'Griffin Assistant', message_label:'Message from the Griffin', options_label:'Griffin options', open_label:'Open the Griffin'
    },
    es:{
      welcome_text:'¡Bienvenido a Genova mApp! ¿Qué te apetece hacer hoy?', discover:'Descubrir algo', find:'Encontrar algo', plan:'Organizar una visita', surprise:'Sorpréndeme',
      discover_text:'¿Qué te da más curiosidad?', history:'Historia', places:'Lugares', curiosities:'Curiosidades', culture:'Cultura y tradiciones',
      history_text:'¿Por dónde quieres empezar con la historia de Génova?', forts:'Fuertes', museums:'Museos', churches:'Iglesias', palaces:'Palacios',
      places_text:'¿Qué tipo de lugar te gustaría explorar?', parks:'Parques y plazas', theatres:'Teatros', cinema:'Cine', exhibitions:'Exposiciones',
      curiosities_text:'¿Te apetece un descubrimiento al azar? Puedo elegir un lugar del mapa.', yes_surprise:'Sí, sorpréndeme', prefer_choose:'Prefiero elegir',
      culture_text:'Para cultura y tradiciones podemos empezar por museos, iglesias, palacios o una sorpresa.',
      find_text:'¿Qué estás buscando?', events:'Eventos', food_sleep:'Comer y dormir', transport:'Cómo moverse', map_place:'Un lugar en el mapa',
      food_text:'¿Qué necesitas?', venues:'Locales', restaurants:'Restaurantes', takeaway:'Comida para llevar', hotels:'Hoteles y B&B',
      transport_text:'¿Cómo quieres moverte?', bus:'Autobús', trains:'Trenes', metro:'Metro', other_transport:'Otros transportes',
      transport_more_text:'También puedo mostrarte estas conexiones.', vertical:'Transportes verticales', sea:'Barcos y ferris', plane:'Avión',
      plan_text:'¿Cómo quieres organizar la visita?', route:'Un recorrido', nearby:'Cerca de mí', theme:'Un tema', explore_map:'Explorar el mapa',
      after_text:'¡Aquí estamos! ¿Quieres que siga ayudándote?', yes_continue:'Sí, continúa', discover_more:'Enséñame algo más', organize_visit:'Organizar una visita',
      unavailable_text:'Este acceso directo no está disponible aquí, pero puedo guiarte de otra manera.', back_choices:'Volver a las opciones',
      back:'Atrás', home:'Inicio', minimize_q:'¿Minimizar el Grifoncino?', yes:'Sí', no:'No', assistant_label:'Asistente Grifoncino', message_label:'Mensaje del Grifoncino', options_label:'Opciones del Grifoncino', open_label:'Abrir el Grifoncino'
    },
    fr:{
      welcome_text:'Bienvenue sur Genova mApp ! Qu’aimerais-tu faire aujourd’hui ?', discover:'Découvrir quelque chose', find:'Trouver quelque chose', plan:'Organiser une visite', surprise:'Surprends-moi',
      discover_text:'Qu’est-ce qui t’intrigue le plus ?', history:'Histoire', places:'Lieux', curiosities:'Curiosités', culture:'Culture et traditions',
      history_text:'Par où veux-tu commencer pour découvrir l’histoire de Gênes ?', forts:'Forts', museums:'Musées', churches:'Églises', palaces:'Palais',
      places_text:'Quel type de lieu aimerais-tu explorer ?', parks:'Parcs et places', theatres:'Théâtres', cinema:'Cinéma', exhibitions:'Expositions',
      curiosities_text:'Envie d’une découverte au hasard ? Je peux choisir un lieu sur la carte.', yes_surprise:'Oui, surprends-moi', prefer_choose:'Je préfère choisir',
      culture_text:'Pour la culture et les traditions, on peut commencer par les musées, les églises, les palais ou une surprise.',
      find_text:'Que cherches-tu ?', events:'Événements', food_sleep:'Manger et dormir', transport:'Se déplacer', map_place:'Un lieu sur la carte',
      food_text:'De quoi as-tu besoin ?', venues:'Établissements', restaurants:'Restaurants', takeaway:'À emporter', hotels:'Hôtels et chambres d’hôtes',
      transport_text:'Comment veux-tu te déplacer ?', bus:'Bus', trains:'Trains', metro:'Métro', other_transport:'Autres transports',
      transport_more_text:'Je peux aussi te montrer ces liaisons.', vertical:'Transports verticaux', sea:'Bateaux et ferries', plane:'Avion',
      plan_text:'Comment veux-tu organiser ta visite ?', route:'Un parcours', nearby:'Près de moi', theme:'Un thème', explore_map:'Explorer la carte',
      after_text:'Nous y voilà ! Veux-tu encore un peu d’aide ?', yes_continue:'Oui, continue', discover_more:'Fais-moi découvrir autre chose', organize_visit:'Organiser une visite',
      unavailable_text:'Ce raccourci n’est pas disponible ici, mais je peux te guider autrement.', back_choices:'Retour aux choix',
      back:'Retour', home:'Accueil', minimize_q:'Réduire le Grifoncino en icône ?', yes:'Oui', no:'Non', assistant_label:'Assistant Grifoncino', message_label:'Message du Grifoncino', options_label:'Options du Grifoncino', open_label:'Ouvrir le Grifoncino'
    },
    ar:{
      welcome_text:'مرحبًا بك في Genova mApp! ماذا تود أن تفعل اليوم؟', discover:'اكتشف شيئًا', find:'ابحث عن شيء', plan:'خطط لزيارة', surprise:'فاجئني',
      discover_text:'ما الذي يثير فضولك أكثر؟', history:'التاريخ', places:'أماكن', curiosities:'طرائف ومعلومات', culture:'الثقافة والتقاليد',
      history_text:'من أين تود أن تبدأ في تاريخ جنوة؟', forts:'الحصون', museums:'المتاحف', churches:'الكنائس', palaces:'القصور',
      places_text:'ما نوع المكان الذي تود استكشافه؟', parks:'الحدائق والساحات', theatres:'المسارح', cinema:'السينما', exhibitions:'المعارض',
      curiosities_text:'هل تريد اكتشافًا عشوائيًا؟ يمكنني اختيار مكان من الخريطة.', yes_surprise:'نعم، فاجئني', prefer_choose:'أفضل أن أختار',
      culture_text:'للثقافة والتقاليد، يمكننا البدء بالمتاحف أو الكنائس أو القصور أو مفاجأة.',
      find_text:'ما الذي تبحث عنه؟', events:'الفعاليات', food_sleep:'الطعام والإقامة', transport:'التنقل', map_place:'مكان على الخريطة',
      food_text:'ماذا تحتاج؟', venues:'أماكن السهر', restaurants:'مطاعم', takeaway:'طعام سفري', hotels:'فنادق وبيوت ضيافة',
      transport_text:'كيف تريد التنقل؟', bus:'الحافلات', trains:'القطارات', metro:'المترو', other_transport:'وسائل نقل أخرى',
      transport_more_text:'يمكنني أيضًا أن أعرض لك هذه الروابط.', vertical:'وسائل النقل العمودية', sea:'السفن والعبّارات', plane:'الطائرة',
      plan_text:'كيف تريد تنظيم زيارتك؟', route:'مسار', nearby:'بالقرب مني', theme:'موضوع', explore_map:'استكشف الخريطة',
      after_text:'ها نحن هنا! هل تريد المزيد من المساعدة؟', yes_continue:'نعم، تابع', discover_more:'أرني شيئًا آخر', organize_visit:'خطط لزيارة',
      unavailable_text:'هذا الاختصار غير متاح هنا، لكن يمكنني إرشادك بطريقة أخرى.', back_choices:'العودة إلى الخيارات',
      back:'رجوع', home:'البداية', minimize_q:'هل تريد تصغير Grifoncino إلى أيقونة؟', yes:'نعم', no:'لا', assistant_label:'مساعد Grifoncino', message_label:'رسالة من Grifoncino', options_label:'خيارات Grifoncino', open_label:'فتح Grifoncino'
    },
    ru:{
      welcome_text:'Добро пожаловать в Genova mApp! Чем бы вы хотели заняться сегодня?', discover:'Узнать что-нибудь', find:'Найти что-нибудь', plan:'Спланировать посещение', surprise:'Удиви меня',
      discover_text:'Что вам интереснее всего?', history:'История', places:'Места', curiosities:'Интересные факты', culture:'Культура и традиции',
      history_text:'С чего вы хотите начать знакомство с историей Генуи?', forts:'Форты', museums:'Музеи', churches:'Церкви', palaces:'Дворцы',
      places_text:'Какое место вы хотели бы исследовать?', parks:'Парки и площади', theatres:'Театры', cinema:'Кино', exhibitions:'Выставки',
      curiosities_text:'Хотите случайное открытие? Я могу выбрать место на карте.', yes_surprise:'Да, удиви меня', prefer_choose:'Я лучше выберу',
      culture_text:'Для знакомства с культурой и традициями можно начать с музеев, церквей, дворцов или сюрприза.',
      find_text:'Что вы ищете?', events:'События', food_sleep:'Еда и проживание', transport:'Транспорт', map_place:'Место на карте',
      food_text:'Что вам нужно?', venues:'Заведения', restaurants:'Рестораны', takeaway:'Еда навынос', hotels:'Отели и B&B',
      transport_text:'Как вы хотите передвигаться?', bus:'Автобус', trains:'Поезда', metro:'Метро', other_transport:'Другой транспорт',
      transport_more_text:'Я могу показать и эти варианты.', vertical:'Вертикальный транспорт', sea:'Корабли и паромы', plane:'Самолёт',
      plan_text:'Как вы хотите организовать посещение?', route:'Маршрут', nearby:'Рядом со мной', theme:'Тема', explore_map:'Открыть карту',
      after_text:'Готово! Нужна ещё помощь?', yes_continue:'Да, продолжай', discover_more:'Покажи что-нибудь ещё', organize_visit:'Спланировать посещение',
      unavailable_text:'Этот ярлык здесь недоступен, но я могу помочь другим способом.', back_choices:'Вернуться к выбору',
      back:'Назад', home:'Начало', minimize_q:'Свернуть Grifoncino в значок?', yes:'Да', no:'Нет', assistant_label:'Помощник Grifoncino', message_label:'Сообщение от Grifoncino', options_label:'Параметры Grifoncino', open_label:'Открыть Grifoncino'
    },
    zh:{
      welcome_text:'欢迎使用 Genova mApp！今天你想做什么？', discover:'发现新内容', find:'查找内容', plan:'规划游览', surprise:'给我惊喜',
      discover_text:'你最想了解什么？', history:'历史', places:'地点', curiosities:'趣闻', culture:'文化与传统',
      history_text:'你想从哪里开始了解热那亚的历史？', forts:'要塞', museums:'博物馆', churches:'教堂', palaces:'宫殿',
      places_text:'你想探索哪类地点？', parks:'公园与广场', theatres:'剧院', cinema:'电影院', exhibitions:'展览',
      curiosities_text:'想来一次随机发现吗？我可以从地图中挑一个地点。', yes_surprise:'好，给我惊喜', prefer_choose:'我想自己选',
      culture_text:'想了解文化与传统，可以从博物馆、教堂、宫殿或随机推荐开始。',
      find_text:'你在找什么？', events:'活动', food_sleep:'餐饮与住宿', transport:'交通出行', map_place:'地图上的地点',
      food_text:'你需要什么？', venues:'休闲场所', restaurants:'餐厅', takeaway:'外带餐饮', hotels:'酒店与民宿',
      transport_text:'你想怎样出行？', bus:'公交车', trains:'火车', metro:'地铁', other_transport:'其他交通',
      transport_more_text:'我还可以显示这些交通方式。', vertical:'垂直交通', sea:'船只与渡轮', plane:'飞机',
      plan_text:'你想怎样规划游览？', route:'一条路线', nearby:'我附近', theme:'一个主题', explore_map:'探索地图',
      after_text:'到了！还需要我继续帮你吗？', yes_continue:'好，继续', discover_more:'再推荐一些', organize_visit:'规划游览',
      unavailable_text:'这个快捷方式在这里不可用，不过我可以换一种方式帮助你。', back_choices:'返回选项',
      back:'返回', home:'首页', minimize_q:'将 Grifoncino 缩小为图标吗？', yes:'是', no:'否', assistant_label:'Grifoncino 助手', message_label:'Grifoncino 的消息', options_label:'Grifoncino 选项', open_label:'打开 Grifoncino'
    }
  };

  var NODES = {
    welcome:{textKey:'welcome_text',tone:'friendly',options:[{labelKey:'discover',next:'discover'},{labelKey:'find',next:'find'},{labelKey:'plan',next:'plan'},{labelKey:'surprise',action:'surprise'}]},
    discover:{textKey:'discover_text',tone:'curious',options:[{labelKey:'history',next:'history'},{labelKey:'places',next:'places'},{labelKey:'curiosities',next:'curiosities'},{labelKey:'culture',next:'culture'}]},
    history:{textKey:'history_text',tone:'curious',options:[{labelKey:'forts',action:'showForti'},{labelKey:'museums',action:'showMuseums'},{labelKey:'churches',action:'showChurches'},{labelKey:'palaces',action:'showPalaces'}]},
    places:{textKey:'places_text',tone:'friendly',options:[{labelKey:'parks',action:'showParks'},{labelKey:'theatres',action:'showTheatres'},{labelKey:'cinema',action:'showCinema'},{labelKey:'exhibitions',action:'showExhibitions'}]},
    curiosities:{textKey:'curiosities_text',tone:'curious',options:[{labelKey:'yes_surprise',action:'surprise'},{labelKey:'prefer_choose',next:'discover'}]},
    culture:{textKey:'culture_text',tone:'friendly',options:[{labelKey:'museums',action:'showMuseums'},{labelKey:'churches',action:'showChurches'},{labelKey:'palaces',action:'showPalaces'},{labelKey:'surprise',action:'surprise'}]},
    find:{textKey:'find_text',tone:'friendly',options:[{labelKey:'events',action:'events'},{labelKey:'food_sleep',next:'food'},{labelKey:'transport',next:'transport'},{labelKey:'map_place',action:'openMap'}]},
    food:{textKey:'food_text',tone:'friendly',options:[{labelKey:'venues',action:'showFoodLocali'},{labelKey:'restaurants',action:'showFoodRestaurants'},{labelKey:'takeaway',action:'showFoodTakeaway'},{labelKey:'hotels',action:'showFoodHotels'}]},
    transport:{textKey:'transport_text',tone:'curious',options:[{labelKey:'bus',action:'showBus'},{labelKey:'trains',action:'showTrains'},{labelKey:'metro',action:'showMetro'},{labelKey:'other_transport',next:'transportMore'}]},
    transportMore:{textKey:'transport_more_text',tone:'friendly',options:[{labelKey:'vertical',action:'showVertical'},{labelKey:'sea',action:'showSea'},{labelKey:'plane',action:'showAirport'}]},
    plan:{textKey:'plan_text',tone:'curious',options:[{labelKey:'route',action:'routes'},{labelKey:'nearby',action:'nearMe'},{labelKey:'theme',next:'discover'},{labelKey:'explore_map',action:'openMap'}]},
    afterAction:{textKey:'after_text',tone:'friendly',options:[{labelKey:'yes_continue',next:'welcome'},{labelKey:'discover_more',next:'discover'},{labelKey:'organize_visit',next:'plan'}]},
    actionUnavailable:{textKey:'unavailable_text',tone:'curious',options:[{labelKey:'back_choices',next:'welcome'},{labelKey:'explore_map',action:'openMap'}]}
  };

  function t(key, lang){
    lang = normalizeLang(lang || currentLang());
    var dict = T[lang] || T.it;
    return dict[key] || T.it[key] || key;
  }
  function localizedNodes(lang){
    lang = normalizeLang(lang || currentLang());
    var out = {};
    Object.keys(NODES).forEach(function(id){
      var n = NODES[id];
      out[id] = {text:t(n.textKey,lang),tone:n.tone,options:(n.options||[]).map(function(o){
        return {label:t(o.labelKey,lang),next:o.next||'',action:o.action||''};
      })};
    });
    return out;
  }
  function apply(lang){
    window.GMGriffoncinoDialogues = localizedNodes(lang);
    window.GMGriffoncinoCurrentLang = normalizeLang(lang || currentLang());
    return window.GMGriffoncinoDialogues;
  }

  window.GMGriffoncinoI18N = {supported:SUPPORTED, normalize:normalizeLang, current:currentLang, t:t, apply:apply, dictionaries:T};
  apply(currentLang());
})();
