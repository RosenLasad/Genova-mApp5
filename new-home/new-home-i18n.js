/* Testi aggiuntivi della New Home. Ordine: it, en, es, fr, ar, ru, zh, lij. */
(function(){
  'use strict';
  var languages = ['it','en','es','fr','ar','ru','zh','lij'];
  var rows = [
    ['Benvenuto','Welcome','Bienvenido','Bienvenue','مرحباً','Добро пожаловать','欢迎','Benvegnûo'],
    ['MAPPA','MAP','MAPA','CARTE','الخريطة','КАРТА','地图','MAPPA'],
    ['Vai alla mappa','Go to the map','Ir al mapa','Voir la carte','انتقل إلى الخريطة','Перейти к карте','前往地图','Vanni a-a mappa'],
    ['Indietro','Back','Atrás','Retour','رجوع','Назад','返回','Inderê'],
    ['Scopri','Discover','Descubre','Découvrir','اكتشف','Узнать больше','探索','Descovri'],
    ['Esplora','Explore','Explora','Explorer','استكشف','Обзор','探索','Esplòra'],
    ['Che cosa vuoi scoprire?','What would you like to discover?','¿Qué quieres descubrir?','Que souhaitez-vous découvrir ?','ماذا تريد أن تكتشف؟','Что вы хотите открыть для себя?','您想探索什么？','Cöse ti veu descovrî?'],
    ['Come muoversi','Getting around','Cómo moverse','Se déplacer','التنقل','Как передвигаться','交通出行','Comme mesciâse'],
    ['Mura, acquedotti e percorsi','Walls, aqueducts and routes','Murallas, acueductos y rutas','Remparts, aqueducs et itinéraires','الأسوار والقنوات والمسارات','Стены, акведуки и маршруты','城墙、输水渠与路线','Mûage, acquedotti e percorsi'],
    ['Mangiare e dormire','Eat and stay','Comer y dormir','Manger et dormir','الطعام والإقامة','Где поесть и остановиться','餐饮与住宿','Mangiâ e dormî'],
    ['Multimedia','Multimedia','Multimedia','Multimédia','الوسائط المتعددة','Мультимедиа','多媒体','Multimedia'],
    ['Eventi, blog e contatti','Events, blog and contacts','Eventos, blog y contactos','Événements, blog et contacts','الفعاليات والمدونة والتواصل','События, блог и контакты','活动、博客与联系','Eventi, blog e contatti'],
    ['Extra','Extras','Extras','Extras','إضافات','Дополнительно','更多','Extra'],
    ['Guida e istruzioni','Guide and instructions','Guía e instrucciones','Guide et instructions','الدليل والتعليمات','Руководство и инструкции','指南与说明','Guida e istruçioin'],
    ['Forti, musei, chiese e palazzi raccontano la storia e l’identità di Genova.','Forts, museums, churches and palaces tell the story and identity of Genoa.','Fortalezas, museos, iglesias y palacios cuentan la historia y la identidad de Génova.','Forts, musées, églises et palais racontent l’histoire et l’identité de Gênes.','تروي الحصون والمتاحف والكنائس والقصور تاريخ جنوة وهويتها.','Форты, музеи, церкви и дворцы рассказывают об истории и самобытности Генуи.','堡垒、博物馆、教堂与宫殿讲述热那亚的历史和特色。','Forti, muzei, gexe e palaçi contan a stöia e l’identitæ de Zena.'],
    ['Cultura, spettacolo, verde e attività per vivere la città nel tempo libero.','Culture, shows, green spaces and activities for your free time in the city.','Cultura, espectáculos, espacios verdes y actividades para disfrutar de la ciudad.','Culture, spectacles, espaces verts et activités pour vos loisirs en ville.','ثقافة وعروض ومساحات خضراء وأنشطة للاستمتاع بالمدينة في وقت الفراغ.','Культура, представления, зелёные зоны и занятия для досуга в городе.','文化、演出、绿地与活动，让您享受城市休闲时光。','Cultua, spettacoli, verde e attivitæ pe vive a çittæ into tempo libero.'],
    ['Trasporti pubblici e collegamenti per spostarsi a Genova e sul territorio.','Public transport and connections in Genoa and the surrounding area.','Transporte público y conexiones para moverse por Génova y sus alrededores.','Transports publics et liaisons pour se déplacer à Gênes et dans ses environs.','النقل العام والروابط للتنقل في جنوة ومحيطها.','Общественный транспорт и сообщения в Генуе и окрестностях.','热那亚及周边地区的公共交通与出行连接。','Trasporti pubbrichi e collegamenti pe mesciâse a Zena e into territöio.'],
    ['Tracciati storici e itinerari consigliati per esplorare Genova passo dopo passo.','Historic paths and suggested routes to explore Genoa step by step.','Trazados históricos e itinerarios recomendados para explorar Génova paso a paso.','Tracés historiques et itinéraires conseillés pour découvrir Gênes pas à pas.','مسارات تاريخية وجولات مقترحة لاستكشاف جنوة خطوة بخطوة.','Исторические пути и рекомендуемые маршруты для знакомства с Генуей шаг за шагом.','沿历史路径与推荐路线，一步步探索热那亚。','Tracciati storichi e percorsi consigliæ pe descovrî Zena passo dòppo passo.'],
    ['Locali, ristoranti, take-away e strutture per il soggiorno.','Bars, restaurants, takeaways and accommodation.','Locales, restaurantes, comida para llevar y alojamientos.','Bars, restaurants, plats à emporter et hébergements.','مقاهٍ ومطاعم ووجبات جاهزة وأماكن إقامة.','Заведения, рестораны, еда навынос и жильё.','酒吧、餐厅、外卖与住宿。','Locæ, ristoranti, mangiâ da asporto e alloggi.'],
    ['Punti QR, documentari, audioguide e contenuti video dedicati alla città.','QR points, documentaries, audio guides and videos about the city.','Puntos QR, documentales, audioguías y vídeos dedicados a la ciudad.','Points QR, documentaires, audioguides et vidéos consacrés à la ville.','نقاط QR وأفلام وثائقية وأدلة صوتية وفيديوهات عن المدينة.','QR-точки, документальные фильмы, аудиогиды и видео о городе.','有关城市的QR点位、纪录片、语音导览与视频。','Ponti QR, documentai, audioguide e video dedicæ a-a çittæ.'],
    ['Novità, appuntamenti e strumenti per partecipare e contattare Genova mApp.','News, events and ways to participate and contact Genova mApp.','Novedades, citas y herramientas para participar y contactar con Genova mApp.','Actualités, rendez-vous et outils pour participer et contacter Genova mApp.','أخبار ومواعيد ووسائل للمشاركة والتواصل مع Genova mApp.','Новости, события и способы участия и связи с Genova mApp.','新闻、活动以及参与和联系Genova mApp的方式。','Novitæ, appontamenti e strumenti pe parteçipâ e contattâ Genova mApp.'],
    ['Giochi, premi e prodotti legati a Genova mApp.','Games, rewards and products from Genova mApp.','Juegos, premios y productos de Genova mApp.','Jeux, récompenses et produits de Genova mApp.','ألعاب وجوائز ومنتجات Genova mApp.','Игры, призы и товары Genova mApp.','Genova mApp的游戏、奖励与商品。','Zeughi, premi e prodotti de Genova mApp.'],
    ['Scopri come usare Genova mApp e tutte le sue funzioni.','Learn how to use Genova mApp and all its features.','Descubre cómo usar Genova mApp y todas sus funciones.','Découvrez comment utiliser Genova mApp et toutes ses fonctionnalités.','تعرّف على كيفية استخدام Genova mApp وجميع وظائفها.','Узнайте, как пользоваться Genova mApp и всеми её функциями.','了解如何使用 Genova mApp 及其所有功能。','Descovri comme adêuviâ Genova mApp e tutte e seu fonçioin.'],
    ['Fortificazioni e sistemi difensivi','Fortifications and defences','Fortificaciones y sistemas defensivos','Fortifications et systèmes défensifs','التحصينات والأنظمة الدفاعية','Укрепления и оборонительные системы','防御工事与体系','Fortificaçioin e sistemi difensivi'],
    ['Arte, storia, scienza e collezioni','Art, history, science and collections','Arte, historia, ciencia y colecciones','Art, histoire, sciences et collections','الفن والتاريخ والعلوم والمجموعات','Искусство, история, наука и коллекции','艺术、历史、科学与藏品','Arte, stöia, sciença e colleçioin'],
    ['Edifici religiosi e opere d’arte','Religious buildings and artworks','Edificios religiosos y obras de arte','Édifices religieux et œuvres d’art','المباني الدينية والأعمال الفنية','Религиозные здания и произведения искусства','宗教建筑与艺术品','Edifiçi religiozi e euvie d’arte'],
    ['Dimore storiche e Palazzi dei Rolli','Historic residences and Palazzi dei Rolli','Residencias históricas y Palazzi dei Rolli','Demeures historiques et Palazzi dei Rolli','المساكن التاريخية وقصور رولّي','Исторические резиденции и дворцы Ролли','历史宅邸与罗利宫殿','Dimöe storiche e Palaçi di Rolli'],
    ['Esposizioni e spazi culturali','Exhibitions and cultural spaces','Exposiciones y espacios culturales','Expositions et espaces culturels','المعارض والمساحات الثقافية','Выставки и культурные пространства','展览与文化空间','Espoziçioin e spaçi cultuæ'],
    ['Teatri storici e contemporanei','Historic and contemporary theatres','Teatros históricos y contemporáneos','Théâtres historiques et contemporains','المسارح التاريخية والمعاصرة','Исторические и современные театры','历史与当代剧院','Teatri storichi e contemporanei'],
    ['Sale cinematografiche della città','The city’s cinemas','Salas de cine de la ciudad','Salles de cinéma de la ville','دور السينما في المدينة','Кинотеатры города','城市电影院','Sale cinematografiche da çittæ'],
    ['Aree verdi e luoghi d’incontro','Green spaces and meeting places','Zonas verdes y lugares de encuentro','Espaces verts et lieux de rencontre','المساحات الخضراء وأماكن اللقاء','Зелёные зоны и места встреч','绿地与聚会场所','Spaçi verdi e leughi d’incontro'],
    ['Impianti e attività sportive','Sports facilities and activities','Instalaciones y actividades deportivas','Équipements et activités sportives','المرافق والأنشطة الرياضية','Спортивные объекты и занятия','体育设施与活动','Impianti e attivitæ sportive'],
    ['Fermate e rete urbana AMT','AMT stops and urban network','Paradas y red urbana AMT','Arrêts et réseau urbain AMT','محطات وشبكة AMT الحضرية','Остановки и городская сеть AMT','AMT站点与城市网络','Fermæ e rete urbana AMT'],
    ['Stazioni della metropolitana','Metro stations','Estaciones de metro','Stations de métro','محطات المترو','Станции метро','地铁站','Staçioin da metropolitana'],
    ['Stazioni ferroviarie','Railway stations','Estaciones de tren','Gares ferroviaires','محطات السكك الحديدية','Железнодорожные станции','火车站','Staçioin ferroviarie'],
    ['Impianti verticali e cremagliere','Lifts, funiculars and rack railways','Ascensores, funiculares y cremalleras','Ascenseurs, funiculaires et chemins de fer à crémaillère','المصاعد والقطارات المعلقة والسكك المسننة','Лифты, фуникулёры и зубчатые железные дороги','升降电梯、缆车与齿轨铁路','Ascensori, funicolari e cremagliere'],
    ['Navebus e collegamenti marittimi','Navebus and sea connections','Navebus y conexiones marítimas','Navebus et liaisons maritimes','Navebus والروابط البحرية','Navebus и морские сообщения','Navebus与海上交通','Navebus e collegamenti pe mâ'],
    ['Aeroporto e collegamenti','Airport and connections','Aeropuerto y conexiones','Aéroport et liaisons','المطار ووسائل الوصول','Аэропорт и транспортные связи','机场与接驳交通','Aeroporto e collegamenti'],
    ['Le cinte murarie attraverso i secoli','City walls through the centuries','Las murallas a través de los siglos','Les enceintes à travers les siècles','أسوار المدينة عبر القرون','Городские стены сквозь века','历代城墙','E çinte de mûage traverso i secoli'],
    ['Acquedotto romano e acquedotto storico','Roman and historic aqueducts','Acueductos romano e histórico','Aqueducs romain et historique','القناتان الرومانية والتاريخية','Римский и исторический акведуки','罗马与历史输水渠','Acquedotto roman e acquedotto storico'],
    ['Itinerari tematici nella città','Themed city routes','Rutas temáticas por la ciudad','Itinéraires thématiques en ville','مسارات موضوعية في المدينة','Тематические городские маршруты','城市主题路线','Percorsi tematichi inta çittæ'],
    ['Bar, pub e luoghi di ritrovo','Bars, pubs and meeting places','Bares, pubs y lugares de encuentro','Bars, pubs et lieux de rencontre','الحانات والمقاهي وأماكن اللقاء','Бары, пабы и места встреч','酒吧、酒馆与聚会场所','Bar, pub e leughi de ritreuvo'],
    ['Cucina genovese e altre proposte','Genoese cuisine and more','Cocina genovesa y otras propuestas','Cuisine génoise et autres saveurs','المطبخ الجنوي وخيارات أخرى','Генуэзская кухня и другие предложения','热那亚美食及更多选择','Cuxinn-a zeneize e atre propòste'],
    ['Soluzioni rapide e da asporto','Quick meals and takeaways','Comida rápida y para llevar','Repas rapides et à emporter','وجبات سريعة وللأخذ خارجاً','Быстрое питание и еда навынос','快餐与外卖','Mangiâ veloce e da asporto'],
    ['Dove dormire a Genova','Where to stay in Genoa','Dónde dormir en Génova','Où dormir à Gênes','أين تقيم في جنوة','Где остановиться в Генуе','热那亚住宿','Dove dormî a Zena'],
    ['Guarda com’erano i luoghi di Genova','See Genoa’s places as they once were','Descubre cómo eran los lugares de Génova','Découvrez les lieux de Gênes autrefois','شاهد أماكن جنوة كما كانت قديماً','Посмотрите, какими были места Генуи раньше','看看热那亚的地点昔日的模样','Amia comme ean i leughi de Zena'],
    ['Brevi documentari dedicati a quartieri e luoghi','Short documentaries about neighbourhoods and places','Documentales breves sobre barrios y lugares','Courts documentaires sur les quartiers et les lieux','أفلام وثائقية قصيرة عن الأحياء والأماكن','Короткие документальные фильмы о районах и местах','关于街区与地点的短纪录片','Documentai corti in sci quartê e i leughi'],
    ['Ascolta storie e approfondimenti','Listen to stories and insights','Escucha historias y explicaciones','Écoutez des histoires et des éclairages','استمع إلى القصص والمعلومات المفصلة','Слушайте истории и подробные рассказы','聆听故事与深入讲解','Ascolta stöie e approfondimenti'],
    ['Percorsi raccontati attraverso le immagini','Routes told through images','Rutas contadas a través de imágenes','Itinéraires racontés en images','مسارات ترويها الصور','Маршруты в изображениях','用影像讲述的路线','Percorsi contæ co-e immagini'],
    ['Appuntamenti del giorno e della settimana','Today’s and this week’s events','Citas del día y de la semana','Rendez-vous du jour et de la semaine','فعاليات اليوم والأسبوع','События дня и недели','今日与本周活动','Appontamenti do giorno e da settemann-a'],
    ['Trova eventi previsti o in corso a Genova utilizzando fonti online aggiornate.','Find upcoming or ongoing events in Genoa using up-to-date online sources.','Encuentra eventos previstos o en curso en Génova utilizando fuentes online actualizadas.','Trouvez les événements à venir ou en cours à Gênes à partir de sources en ligne actualisées.','ابحث عن الفعاليات القادمة أو الجارية في جنوة باستخدام مصادر محدثة على الإنترنت.','Найдите предстоящие и текущие события в Генуе по актуальным онлайн-источникам.','使用最新在线来源查找热那亚即将举行或正在进行的活动。','Trêuva eventi previsti ò in corso a Zena adêuviando fonti online aggiornæ.'],
    ['Che cosa ti interessa?','What are you interested in?','¿Qué te interesa?','Qu’est-ce qui vous intéresse ?','ما الذي يهمك؟','Что вас интересует?','您对什么感兴趣？','Cöse t’interessa?'],
    ['Seleziona una categoria e avvia la ricerca.','Select a category and start the search.','Selecciona una categoría e inicia la búsqueda.','Sélectionnez une catégorie et lancez la recherche.','اختر فئة وابدأ البحث.','Выберите категорию и запустите поиск.','选择一个类别并开始搜索。','Çerni unna categoria e avvia a ricerca.'],
    ['Tipi di evento','Event types','Tipos de evento','Types d’événement','أنواع الفعاليات','Типы событий','活动类型','Tipi d’evento'],
    ['Musei e mostre','Museums and exhibitions','Museos y exposiciones','Musées et expositions','المتاحف والمعارض','Музеи и выставки','博物馆与展览','Muzei e mostre'],
    ['Musei, mostre ed esposizioni','Museums, exhibitions and displays','Museos, muestras y exposiciones','Musées, expositions et présentations','متاحف ومعارض وعروض','Музеи, выставки и экспозиции','博物馆、展览与陈列','Muzei, mostre e espoziçioin'],
    ['Proiezioni, rassegne e incontri','Screenings, festivals and talks','Proyecciones, ciclos y encuentros','Projections, cycles et rencontres','عروض وبرامج ولقاءات','Показы, фестивали и встречи','放映、影展与交流活动','Proieçioin, rassegne e incontri'],
    ['Teatro','Theatre','Teatro','Théâtre','المسرح','Театр','剧院','Teatro'],
    ['Spettacoli e appuntamenti teatrali','Shows and theatre events','Espectáculos y citas teatrales','Spectacles et rendez-vous théâtraux','عروض وفعاليات مسرحية','Спектакли и театральные события','演出与戏剧活动','Spettacoli e appontamenti teatrali'],
    ['Musica','Music','Música','Musique','الموسيقى','Музыка','音乐','Muxica'],
    ['Concerti e appuntamenti musicali','Concerts and music events','Conciertos y eventos musicales','Concerts et rendez-vous musicaux','حفلات وفعاليات موسيقية','Концерты и музыкальные события','音乐会与音乐活动','Concerti e appontamenti muxicæ'],
    ['Palazzi e ville','Palaces and villas','Palacios y villas','Palais et villas','القصور والفيلات','Дворцы и виллы','宫殿与别墅','Palaçi e ville'],
    ['Eventi in dimore e spazi storici','Events in historic residences and venues','Eventos en residencias y espacios históricos','Événements dans des demeures et lieux historiques','فعاليات في المساكن والأماكن التاريخية','События в исторических резиденциях и пространствах','历史宅邸与场所中的活动','Eventi in dimöe e spaçi storichi'],
    ['Patrimonio storico','Historic heritage','Patrimonio histórico','Patrimoine historique','التراث التاريخي','Историческое наследие','历史遗产','Patrimònio storico'],
    ['Chiese, forti e luoghi storici','Churches, forts and historic places','Iglesias, fuertes y lugares históricos','Églises, forts et lieux historiques','كنائس وحصون وأماكن تاريخية','Церкви, форты и исторические места','教堂、堡垒与历史地点','Gexe, forti e leughi storichi'],
    ['Festival','Festivals','Festivales','Festivals','مهرجانات','Фестивали','节庆','Festival'],
    ['Feste e manifestazioni','Celebrations and events','Fiestas y manifestaciones','Fêtes et manifestations','احتفالات وفعاليات','Праздники и мероприятия','庆典与活动','Feste e manifestaçioin'],
    ['Mercati e fiere','Markets and fairs','Mercados y ferias','Marchés et foires','الأسواق والمعارض','Рынки и ярмарки','市场与展会','Mercati e fiere'],
    ['Mercati, fiere ed eventi diffusi','Markets, fairs and citywide events','Mercados, ferias y eventos por la ciudad','Marchés, foires et événements dans la ville','أسواق ومعارض وفعاليات منتشرة في المدينة','Рынки, ярмарки и городские события','市场、展会与城市活动','Mercati, fiere e eventi diffuzi'],
    ['Gare, incontri e attività sportive','Competitions, matches and sports activities','Competiciones, encuentros y actividades deportivas','Compétitions, rencontres et activités sportives','مسابقات ومباريات وأنشطة رياضية','Соревнования, матчи и спортивные мероприятия','比赛、赛事与体育活动','Gare, incontri e attivitæ sportive'],
    ['Periodo','Period','Periodo','Période','الفترة','Период','时间范围','Periodo'],
    ['Oggi','Today','Hoy','Aujourd’hui','اليوم','Сегодня','今天','Ancheu'],
    ['Questo weekend','This weekend','Este fin de semana','Ce week-end','نهاية هذا الأسبوع','В эти выходные','本周末','Sto fin de settemann-a'],
    ['Prossimi 7 giorni','Next 7 days','Próximos 7 días','7 prochains jours','الأيام السبعة القادمة','Ближайшие 7 дней','未来7天','Proscimi 7 giorni'],
    ['Prossimi 30 giorni','Next 30 days','Próximos 30 días','30 prochains jours','الأيام الثلاثون القادمة','Ближайшие 30 дней','未来30天','Proscimi 30 giorni'],
    ['Zona','Area','Zona','Zone','المنطقة','Район','区域','Zöna'],
    ['Genova città','Genoa city','Ciudad de Génova','Ville de Gênes','مدينة جنوة','Генуя','热那亚市','Zena çittæ'],
    ['Città Metropolitana di Genova','Metropolitan City of Genoa','Ciudad Metropolitana de Génova','Ville métropolitaine de Gênes','مدينة جنوة الحضرية','Метрополия Генуи','热那亚都会区','Çittæ Metropolitana de Zena'],
    ['Cerca eventi','Search events','Buscar eventos','Rechercher des événements','ابحث عن فعاليات','Найти события','搜索活动','Çerca eventi'],
    ['Online','Online','Online','En ligne','متصل','Онлайн','在线','Online'],
    ['Offline','Offline','Sin conexión','Hors ligne','غير متصل','Офлайн','离线','Offline'],
    ['La ricerca è disponibile solo online. Le fonti ufficiali e i siti degli organizzatori vengono privilegiati quando disponibili.','Search is available online only. Official sources and organisers’ websites are prioritised when available.','La búsqueda solo está disponible online. Se priorizan las fuentes oficiales y los sitios de los organizadores cuando están disponibles.','La recherche est disponible uniquement en ligne. Les sources officielles et les sites des organisateurs sont privilégiés lorsqu’ils sont disponibles.','البحث متاح عبر الإنترنت فقط. تُعطى الأولوية للمصادر الرسمية ومواقع المنظمين عند توفرها.','Поиск доступен только онлайн. Приоритет отдается официальным источникам и сайтам организаторов.','搜索仅在线可用。在可用时优先采用官方来源和主办方网站。','A ricerca a l’é disponibile solo online. E fonti ufficiali e i sciti di organizzatöi vegnan privilegiæ quande disponibili.'],
    ['Seleziona almeno una categoria e avvia la ricerca.','Select at least one category and start the search.','Selecciona al menos una categoría e inicia la búsqueda.','Sélectionnez au moins une catégorie et lancez la recherche.','اختر فئة واحدة على الأقل وابدأ البحث.','Выберите хотя бы одну категорию и запустите поиск.','请至少选择一个类别并开始搜索。','Çerni almeno unna categoria e avvia a ricerca.'],
    ['Accedi o registrati a Genova mApp per utilizzare Cerca eventi. Ogni account può effettuare fino a 5 ricerche nelle ultime 24 ore.','Log in or sign up for Genova mApp to use Search events. Each account can make up to 5 searches in the last 24 hours.','Inicia sesión o regístrate en Genova mApp para usar Buscar eventos. Cada cuenta puede realizar hasta 5 búsquedas en las últimas 24 horas.','Connectez-vous ou inscrivez-vous à Genova mApp pour utiliser la recherche d’événements. Chaque compte peut effectuer jusqu’à 5 recherches au cours des dernières 24 heures.','سجّل الدخول أو أنشئ حساباً في Genova mApp لاستخدام البحث عن الفعاليات. يمكن لكل حساب إجراء ما يصل إلى 5 عمليات بحث خلال آخر 24 ساعة.','Войдите или зарегистрируйтесь в Genova mApp, чтобы пользоваться поиском событий. Для каждого аккаунта доступно до 5 поисков за последние 24 часа.','登录或注册 Genova mApp 后即可使用活动搜索。每个账户在过去24小时内最多可进行5次搜索。','Intra ò registrite a Genova mApp pe adêuviâ Çerca eventi. Ògni account o peu fâ finn-a a 5 riçerche inte urtime 24 oe.'],
    ['Ricerche disponibili: {0} su {1} nelle ultime 24 ore.','Searches available: {0} of {1} in the last 24 hours.','Búsquedas disponibles: {0} de {1} en las últimas 24 horas.','Recherches disponibles : {0} sur {1} au cours des dernières 24 heures.','عمليات البحث المتاحة: {0} من {1} خلال آخر 24 ساعة.','Доступно поисков: {0} из {1} за последние 24 часа.','过去24小时内可用搜索次数：{0}/{1}。','Riçerche disponibili: {0} de {1} inte urtime 24 oe.'],
    ['Hai raggiunto il limite di 5 ricerche nelle ultime 24 ore.','You have reached the limit of 5 searches in the last 24 hours.','Has alcanzado el límite de 5 búsquedas en las últimas 24 horas.','Vous avez atteint la limite de 5 recherches au cours des dernières 24 heures.','لقد وصلت إلى حد 5 عمليات بحث خلال آخر 24 ساعة.','Вы достигли лимита в 5 поисков за последние 24 часа.','您已达到过去24小时内5次搜索的上限。','Ti t’æ raggiunto o limite de 5 riçerche inte urtime 24 oe.'],
    ['Nuova ricerca disponibile: {0}.','Next search available: {0}.','Nueva búsqueda disponible: {0}.','Nouvelle recherche disponible : {0}.','يتاح بحث جديد: {0}.','Новый поиск будет доступен: {0}.','下一次搜索可用时间：{0}。','Neuva riçerca disponibile: {0}.'],
    ['Il servizio Eventi ha raggiunto temporaneamente il limite generale di ricerche. Riprova più tardi.','The Events service has temporarily reached its overall search limit. Try again later.','El servicio de Eventos ha alcanzado temporalmente el límite general de búsquedas. Inténtalo de nuevo más tarde.','Le service Événements a temporairement atteint sa limite générale de recherches. Réessayez plus tard.','وصلت خدمة الفعاليات مؤقتاً إلى الحد العام لعمليات البحث. حاول مرة أخرى لاحقاً.','Сервис событий временно достиг общего лимита поисков. Повторите попытку позже.','活动服务暂时达到总体搜索上限，请稍后再试。','O serviçio Eventi o l’à temporaneamente raggiunto o limite generale de riçerche. Preuva torna ciù tardi.'],
    ['Ricerca eventi non disponibile offline.','Event search is unavailable offline.','La búsqueda de eventos no está disponible sin conexión.','La recherche d’événements n’est pas disponible hors ligne.','البحث عن الفعاليات غير متاح دون اتصال.','Поиск событий недоступен офлайн.','离线时无法搜索活动。','A ricerca eventi no l’é disponibile offline.'],
    ['Ricerca eventi non disponibile offline. Connettiti a Internet e riprova.','Event search is unavailable offline. Connect to the Internet and try again.','La búsqueda de eventos no está disponible sin conexión. Conéctate a Internet e inténtalo de nuevo.','La recherche d’événements n’est pas disponible hors ligne. Connectez-vous à Internet et réessayez.','البحث عن الفعاليات غير متاح دون اتصال. اتصل بالإنترنت وحاول مجدداً.','Поиск событий недоступен офлайн. Подключитесь к Интернету и повторите попытку.','离线时无法搜索活动。请连接互联网后重试。','A ricerca eventi no l’é disponibile offline. Connetite a Internet e preuva torna.'],
    ['Seleziona almeno una categoria di eventi.','Select at least one event category.','Selecciona al menos una categoría de eventos.','Sélectionnez au moins une catégorie d’événements.','اختر فئة واحدة على الأقل من الفعاليات.','Выберите хотя бы одну категорию событий.','请至少选择一个活动类别。','Çerni almeno unna categoria d’eventi.'],
    ['Ricerca degli eventi in corso…','Searching for events…','Buscando eventos…','Recherche d’événements en cours…','جارٍ البحث عن الفعاليات…','Поиск событий…','正在搜索活动…','Ricerca di eventi in corso…'],
    ['Sto cercando gli appuntamenti più aggiornati.','Looking for the most up-to-date events.','Buscando los eventos más actualizados.','Recherche des événements les plus récents.','جارٍ البحث عن أحدث الفعاليات.','Ищем самые актуальные события.','正在查找最新活动。','Sto çercando i appontamenti ciù aggiornæ.'],
    ['La ricerca utilizza fonti online e può richiedere qualche secondo.','The search uses online sources and may take a few seconds.','La búsqueda utiliza fuentes online y puede tardar unos segundos.','La recherche utilise des sources en ligne et peut prendre quelques secondes.','يستخدم البحث مصادر عبر الإنترنت وقد يستغرق بضع ثوانٍ.','Поиск использует онлайн-источники и может занять несколько секунд.','搜索使用在线来源，可能需要几秒钟。','A ricerca a l’adêuva fonti online e a peu piggiâ quarche segondo.'],
    ['Risultati: {0}','Results: {0}','Resultados: {0}','Résultats : {0}','النتائج: {0}','Результаты: {0}','结果：{0}','Risultati: {0}'],
    ['Nessun evento trovato con i filtri selezionati.','No events found with the selected filters.','No se encontraron eventos con los filtros seleccionados.','Aucun événement trouvé avec les filtres sélectionnés.','لم يتم العثور على فعاليات باستخدام عوامل التصفية المحددة.','По выбранным фильтрам событий не найдено.','未找到符合所选筛选条件的活动。','Nisciun evento trovou con i filtri çernui.'],
    ['Prova ad ampliare il periodo o a selezionare altre categorie.','Try widening the period or selecting other categories.','Prueba a ampliar el periodo o seleccionar otras categorías.','Essayez d’élargir la période ou de sélectionner d’autres catégories.','حاول توسيع الفترة أو اختيار فئات أخرى.','Попробуйте увеличить период или выбрать другие категории.','尝试扩大时间范围或选择其他类别。','Preuva a allargâ o periodo ò a çerne atre categorie.'],
    ['Aggiornato {0}','Updated {0}','Actualizado {0}','Mis à jour {0}','تم التحديث {0}','Обновлено {0}','更新于 {0}','Aggiornou {0}'],
    ['Sito dell’evento','Event website','Sitio del evento','Site de l’événement','موقع الفعالية','Сайт события','活动网站','Scito de l’evento'],
    ['Mostra sulla mappa','Show on map','Mostrar en el mapa','Afficher sur la carte','إظهار على الخريطة','Показать на карте','在地图上显示','Mostra in sciâ mappa'],
    ['Fonte: {0}','Source: {0}','Fuente: {0}','Source : {0}','المصدر: {0}','Источник: {0}','来源：{0}','Fonte: {0}'],
    ['Preferiti','Favorites','Favoritos','Favoris','المفضلة','Избранное','收藏','Preferii'],
    ['Preferiti ({0})','Favorites ({0})','Favoritos ({0})','Favoris ({0})','المفضلة ({0})','Избранное ({0})','收藏（{0}）','Preferii ({0})'],
    ['Salva nei Preferiti','Save to Favorites','Guardar en Favoritos','Ajouter aux favoris','حفظ في المفضلة','Сохранить в избранное','保存到收藏','Sarva inti Preferii'],
    ['Rimuovi dai Preferiti','Remove from Favorites','Quitar de Favoritos','Retirer des favoris','إزالة من المفضلة','Удалить из избранного','从收藏中移除','Scancella da-i Preferii'],
    ['Salvato','Saved','Guardado','Enregistré','محفوظ','Сохранено','已收藏','Sarvou'],
    ['Gli eventi salvati restano disponibili su questo dispositivo finché non li rimuovi.','Saved events remain available on this device until you remove them.','Los eventos guardados permanecen disponibles en este dispositivo hasta que los elimines.','Les événements enregistrés restent disponibles sur cet appareil jusqu’à ce que vous les supprimiez.','تبقى الفعاليات المحفوظة متاحة على هذا الجهاز حتى تقوم بإزالتها.','Сохранённые события остаются доступными на этом устройстве, пока вы их не удалите.','已保存的活动会保留在此设备上，直到您将其移除。','I eventi sarvæ restan disponibili in sto dispoxitivo finché ti no ti-i scancelli.'],
    ['Eventi salvati: {0}','Saved events: {0}','Eventos guardados: {0}','Événements enregistrés : {0}','الفعاليات المحفوظة: {0}','Сохранённые события: {0}','已保存活动：{0}','Eventi sarvæ: {0}'],
    ['Non hai ancora salvato eventi nei Preferiti.','You have not saved any favorite events yet.','Todavía no has guardado eventos en Favoritos.','Vous n’avez encore enregistré aucun événement dans vos favoris.','لم تحفظ أي فعاليات في المفضلة بعد.','Вы ещё не сохранили события в избранное.','您还没有收藏任何活动。','Ti no t’æ ancon sarvou eventi inti Preferii.'],
    ['Quando trovi un evento interessante, usa “Salva nei Preferiti”.','When you find an interesting event, use “Save to Favorites”.','Cuando encuentres un evento interesante, usa «Guardar en Favoritos».','Lorsque vous trouvez un événement intéressant, utilisez « Ajouter aux favoris ».','عندما تجد فعالية تهمك، استخدم «حفظ في المفضلة».','Когда найдёте интересное событие, нажмите «Сохранить в избранное».','找到感兴趣的活动时，请使用“保存到收藏”。','Quande ti trêuvi un evento interessante, adêuva “Sarva inti Preferii”.'],
    ['La ricerca online degli eventi è pronta nell’app, ma deve ancora essere collegata al servizio di ricerca sul server.','Online event search is ready in the app, but it still needs to be connected to the server search service.','La búsqueda online de eventos está lista en la app, pero aún debe conectarse al servicio de búsqueda del servidor.','La recherche en ligne des événements est prête dans l’application, mais elle doit encore être reliée au service de recherche du serveur.','البحث عن الفعاليات عبر الإنترنت جاهز في التطبيق، لكنه يحتاج إلى ربطه بخدمة البحث على الخادم.','Онлайн-поиск событий готов в приложении, но его ещё нужно подключить к серверной службе поиска.','在线活动搜索已在应用中就绪，但仍需连接到服务器搜索服务。','A ricerca online di eventi a l’é pronta inte l’app, ma a deve ancon esse collegâ a-o serviçio de ricerca in sciô server.'],
    ['Non è stato possibile completare la ricerca degli eventi.','The event search could not be completed.','No se pudo completar la búsqueda de eventos.','La recherche d’événements n’a pas pu être effectuée.','تعذر إكمال البحث عن الفعاليات.','Не удалось завершить поиск событий.','无法完成活动搜索。','No l’é stæto poscibile completâ a ricerca di eventi.'],
    ['Non è stato possibile raggiungere il servizio eventi. Controlla la connessione e riprova.','The event service could not be reached. Check your connection and try again.','No se pudo acceder al servicio de eventos. Comprueba la conexión e inténtalo de nuevo.','Impossible de joindre le service d’événements. Vérifiez votre connexion et réessayez.','تعذر الوصول إلى خدمة الفعاليات. تحقق من الاتصال وحاول مجدداً.','Не удалось связаться с сервисом событий. Проверьте подключение и повторите попытку.','无法连接活动服务。请检查网络连接后重试。','No s’é posciûo raggiunge o serviçio eventi. Contròlla a conescion e preuva torna.'],
    ['Commenti e conversazioni della comunità','Community comments and conversations','Comentarios y conversaciones de la comunidad','Commentaires et échanges de la communauté','تعليقات المجتمع ومحادثاته','Комментарии и беседы сообщества','社区评论与交流','Commenti e conversaçioin da comunitæ'],
    ['Scrivi agli amministratori dell’app','Write to the app administrators','Escribe a los administradores de la app','Écrivez aux administrateurs de l’application','اكتب إلى مسؤولي التطبيق','Напишите администраторам приложения','联系应用管理员','Scrivi a-i amministratoî de l’app'],
    ['Piccole esperienze interattive','Small interactive experiences','Pequeñas experiencias interactivas','Petites expériences interactives','تجارب تفاعلية صغيرة','Небольшие интерактивные развлечения','小型互动体验','Piccole esperiense interattive'],
    ['Iniziative e vantaggi per gli utenti','Initiatives and benefits for users','Iniciativas y ventajas para los usuarios','Initiatives et avantages pour les utilisateurs','مبادرات ومزايا للمستخدمين','Инициативы и преимущества для пользователей','用户活动与福利','Iniçiative e vantaggi pe i utenti'],
    ['Gadget e prodotti dedicati a Genova','Genoa souvenirs and products','Recuerdos y productos de Génova','Souvenirs et produits de Gênes','هدايا ومنتجات خاصة بجنوة','Сувениры и товары о Генуе','热那亚纪念品与商品','Gadget e prodotti dedicæ a Zena'],
    ['Istruzioni complete di Genova mApp','Full Genova mApp instructions','Instrucciones completas de Genova mApp','Instructions complètes de Genova mApp','تعليمات Genova mApp الكاملة','Полные инструкции Genova mApp','Genova mApp完整说明','Istruçioin complete de Genova mApp'],
    ['Apri la guida','Open the guide','Abrir la guía','Ouvrir le guide','افتح الدليل','Открыть руководство','打开指南','Arvi a guida'],
    ['Audioguide','Audio guides','Audioguías','Audioguides','أدلة صوتية','Аудиогиды','语音导览','Audioguide'],
    ['Videoguide','Video guides','Videoguías','Vidéoguides','أدلة فيديو','Видеогиды','视频导览','Videoguide'],
    ['Proponi il tuo evento','Submit your event','Propón tu evento','Proposez votre événement','اقترح فعاليتك','Предложить своё событие','提交您的活动','Propòni o teu evento'],
    ['Contattaci','Contact us','Contáctanos','Contactez-nous','تواصل معنا','Связаться с нами','联系我们','Contàttine'],
    ['Eventi','Events','Eventos','Événements','الفعاليات','События','活动','Eventi'],
    ['Contatti','Contact','Contacto','Contact','التواصل','Контакты','联系','Contatti'],
    ['Giochi','Games','Juegos','Jeux','ألعاب','Игры','游戏','Zeughi'],
    ['A Zena – Quante ne sai?','A Zena – How much do you know?','A Zena – ¿Cuánto sabes?','A Zena – Que savez-vous ?','A Zena – كم تعرف؟','A Zena – Много ли вы знаете?','A Zena – 你知道多少？','A Zena – Quanto ti ne sæ?'],
    ['Metti alla prova quanto conosci Genova','Test how well you know Genoa','Pon a prueba cuánto conoces Génova','Testez vos connaissances sur Gênes','اختبر مدى معرفتك بجنوة','Проверьте, насколько хорошо вы знаете Геную','测试一下您对热那亚了解多少','Metti a-a preuva quanto ti conosci Zena'],
    ['Premi','Rewards','Premios','Récompenses','جوائز','Призы','奖励','Premi'],
    ['Shop','Shop','Tienda','Boutique','المتجر','Магазин','商店','Bottega'],
    ['Blog','Blog','Blog','Blog','المدونة','Блог','博客','Blog'],
    ['MiniDoc','MiniDoc','MiniDoc','MiniDoc','MiniDoc','MiniDoc','MiniDoc','MiniDoc'],
    ['Take-away','Takeaway','Para llevar','À emporter','وجبات جاهزة','Еда навынос','外卖','Da asporto'],
    ['Alberghi e B&B','Hotels and B&Bs','Hoteles y B&B','Hôtels et B&B','فنادق ومبيت وإفطار','Отели и B&B','酒店与民宿','Alberghi e B&B'],
    ['Ristoranti','Restaurants','Restaurantes','Restaurants','مطاعم','Рестораны','餐厅','Ristoranti'],
    ['Mura storiche','Historic walls','Murallas históricas','Remparts historiques','الأسوار التاريخية','Исторические стены','历史城墙','Mûage storiche'],
    ['Percorsi consigliati','Suggested routes','Rutas recomendadas','Itinéraires conseillés','مسارات مقترحة','Рекомендуемые маршруты','推荐路线','Percorsi consigliæ'],
    ['Punti QR','QR points','Puntos QR','Points QR','نقاط QR','QR-точки','QR点位','Ponti QR'],
    ['Da classificare','Unclassified','Sin clasificar','À classer','غير مصنف','Без категории','待分类','Da classificâ'],
    ['Cerca un luogo','Search for a place','Buscar un lugar','Rechercher un lieu','ابحث عن مكان','Найти место','搜索地点','Çerca un leugo'],
    ['Cerca un luogo o un quartiere','Search for a place or neighbourhood','Buscar un lugar o barrio','Rechercher un lieu ou un quartier','ابحث عن مكان أو حي','Найти место или район','搜索地点或街区','Çerca un leugo ò un quartê'],
    ['Cerca un punto QR','Search for a QR point','Buscar un punto QR','Rechercher un point QR','ابحث عن نقطة QR','Найти QR-точку','搜索QR点位','Çerca un ponto QR'],
    ['Cerca un punto QR o un quartiere','Search for a QR point or neighbourhood','Buscar un punto QR o barrio','Rechercher un point QR ou un quartier','ابحث عن نقطة QR أو حي','Найти QR-точку или район','搜索QR点位或街区','Çerca un ponto QR ò un quartê'],
    ['Chiudi tutti','Collapse all','Contraer todo','Tout replier','طي الكل','Свернуть всё','全部收起','Serra tutti'],
    ['Espandi tutti','Expand all','Expandir todo','Tout développer','توسيع الكل','Развернуть всё','全部展开','Arvi tutti'],
    ['Mostra tutti','Show all','Mostrar todo','Tout afficher','عرض الكل','Показать всё','全部显示','Fanni vedde tutti'],
    ['Nessun luogo o quartiere corrisponde alla ricerca.','No places or neighbourhoods match your search.','Ningún lugar o barrio coincide con la búsqueda.','Aucun lieu ni quartier ne correspond à votre recherche.','لا توجد أماكن أو أحياء تطابق البحث.','Нет мест или районов, соответствующих поиску.','没有匹配的地点或街区。','Nisciun leugo ò quartê o corrisponde a-a reçerca.'],
    ['Nessun punto QR corrisponde alla ricerca.','No QR points match your search.','Ningún punto QR coincide con la búsqueda.','Aucun point QR ne correspond à votre recherche.','لا توجد نقاط QR تطابق البحث.','Нет QR-точек, соответствующих поиску.','没有匹配的QR点位。','Nisciun ponto QR o corrisponde a-a reçerca.'],
    ['I punti QR sono in caricamento. Riapri questa sezione tra qualche istante.','QR points are loading. Reopen this section in a moment.','Los puntos QR se están cargando. Vuelve a abrir esta sección en unos instantes.','Les points QR sont en cours de chargement. Rouvrez cette section dans un instant.','جارٍ تحميل نقاط QR. أعد فتح هذا القسم بعد لحظات.','QR-точки загружаются. Откройте этот раздел снова через несколько секунд.','QR点位正在加载，请稍后重新打开此部分。','I ponti QR son in caregamento. Arvi torna sta seçion tra quarche momento.'],
    ['Esplora {0} punti organizzati in {1} zone e quartieri di Genova.','Explore {0} points across {1} areas and neighbourhoods of Genoa.','Explora {0} puntos en {1} zonas y barrios de Génova.','Explorez {0} points dans {1} zones et quartiers de Gênes.','استكشف {0} نقطة موزعة على {1} منطقة وحي في جنوة.','Исследуйте {0} точек в {1} зонах и районах Генуи.','探索分布在热那亚{1}个区域和街区中的{0}个点位。','Esplòra {0} ponti in {1} zöne e quartê de Zena.'],
    ['{0} aree · {1} luoghi','{0} areas · {1} places','{0} zonas · {1} lugares','{0} zones · {1} lieux','{0} منطقة · {1} مكان','{0} зон · {1} мест','{0}个区域 · {1}个地点','{0} aree · {1} leughi'],
    ['{0} zone · {1} punti QR','{0} areas · {1} QR points','{0} zonas · {1} puntos QR','{0} zones · {1} points QR','{0} منطقة · {1} نقطة QR','{0} зон · {1} QR-точек','{0}个区域 · {1}个QR点位','{0} zöne · {1} ponti QR'],
    ['{0} luoghi','{0} places','{0} lugares','{0} lieux','{0} أماكن','{0} мест','{0}个地点','{0} leughi'],
    ['{0} luogo','{0} place','{0} lugar','{0} lieu','{0} مكان','{0} место','{0}个地点','{0} leugo'],
    ['{0} punti','{0} points','{0} puntos','{0} points','{0} نقاط','{0} точек','{0}个点','{0} ponti'],
    ['{0} punto','{0} point','{0} punto','{0} point','{0} نقطة','{0} точка','{0}个点','{0} ponto'],
    ['{0} tracciati attivi','{0} active paths','{0} trazados activos','{0} tracés actifs','{0} مسارات نشطة','{0} активных трасс','{0}条已启用路径','{0} tracciati attivi'],
    ['{0} tracciato attivo','{0} active path','{0} trazado activo','{0} tracé actif','{0} مسار نشط','{0} активная трасса','{0}条已启用路径','{0} tracciato attivo'],
    ['Nessun punto collegato','No linked points','Sin puntos vinculados','Aucun point associé','لا توجد نقاط مرتبطة','Нет связанных точек','无关联点位','Nisciun ponto collegou'],
    ['Chiudi e guarda la mappa','View the map','Ver el mapa','Voir la carte','عرض الخريطة','Посмотреть карту','查看地图','Amia a mappa'],
    ['La sezione è predisposta. Contenuti e collegamenti saranno completati nella prossima fase.','This section is being prepared. Content and links will be added in the next phase.','Esta sección está en preparación. Los contenidos y enlaces se completarán en la próxima fase.','Cette section est en préparation. Les contenus et liens seront complétés lors de la prochaine phase.','هذا القسم قيد الإعداد. ستضاف المحتويات والروابط في المرحلة المقبلة.','Раздел находится в подготовке. Материалы и ссылки будут добавлены на следующем этапе.','此部分正在准备中，内容与链接将在下一阶段补充。','A seçion a l’é in preparaçion. Contegnui e collegamenti saian completæ inta pròscima fase.'],
    ['Mostra la cinta sulla mappa','Show the walls on the map','Mostrar las murallas en el mapa','Afficher les remparts sur la carte','عرض الأسوار على الخريطة','Показать стены на карте','在地图上显示城墙','Fanni vedde e mûage in sciâ mappa'],
    ['Non sono ancora presenti punti d’interesse per questa cinta.','No points of interest are available for these walls yet.','Todavía no hay puntos de interés para estas murallas.','Aucun point d’intérêt n’est encore disponible pour ces remparts.','لا توجد بعد نقاط اهتمام لهذه الأسوار.','Для этих стен пока нет достопримечательностей.','这些城墙目前还没有兴趣点。','No gh’é ancon ponti d’interesse pe ste mûage.'],
    ['Punto d’interesse','Point of interest','Punto de interés','Point d’intérêt','نقطة اهتمام','Достопримечательность','兴趣点','Ponto d’interesse'],
    ['Mostra {0} sulla mappa','Show {0} on the map','Mostrar {0} en el mapa','Afficher {0} sur la carte','عرض {0} على الخريطة','Показать {0} на карте','在地图上显示{0}','Fanni vedde {0} in sciâ mappa'],
    ['Nascondi {0} sulla mappa','Hide {0} on the map','Ocultar {0} en el mapa','Masquer {0} sur la carte','إخفاء {0} على الخريطة','Скрыть {0} на карте','在地图上隐藏{0}','Ascondi {0} in sciâ mappa'],
    ['Apri {0} sulla mappa','Open {0} on the map','Abrir {0} en el mapa','Ouvrir {0} sur la carte','فتح {0} على الخريطة','Открыть {0} на карте','在地图上打开{0}','Arvi {0} in sciâ mappa'],
    ['Mostra {0}','Show {0}','Mostrar {0}','Afficher {0}','عرض {0}','Показать {0}','显示{0}','Fanni vedde {0}'],
    ['Passato','History','Historia','Histoire','التاريخ','История','历史','Passou'],
    ['Trasporti','Transport','Transportes','Transports','النقل','Транспорт','交通','Trasporti'],
    ['{0} area','{0} area','{0} zona','{0} zone','{0} منطقة','{0} зона','{0}个区域','{0} area'],
    ['{0} aree','{0} areas','{0} zonas','{0} zones','{0} مناطق','{0} зон','{0}个区域','{0} aree'],
    ['{0} zona','{0} area','{0} zona','{0} zone','{0} منطقة','{0} зона','{0}个区域','{0} zöna'],
    ['{0} zone','{0} areas','{0} zonas','{0} zones','{0} مناطق','{0} зон','{0}个区域','{0} zöne'],
    ['{0} punti QR','{0} QR points','{0} puntos QR','{0} points QR','{0} نقطة QR','{0} QR-точек','{0}个QR点位','{0} ponti QR'],
    ['Altri punti QR','Other QR points','Otros puntos QR','Autres points QR','نقاط QR أخرى','Другие QR-точки','其他QR点位','Atri ponti QR'],
    ['Punto QR','QR point','Punto QR','Point QR','نقطة QR','QR-точка','QR点位','Ponto QR'],
    ['544–458 a.C.','544–458 BC','544–458 a. C.','544–458 av. J.-C.','544–458 قبل الميلاد','544–458 до н. э.','公元前544至458年','544–458 a.C.'],
    ['848–889 d.C.','AD 848–889','848–889 d. C.','848–889 apr. J.-C.','848–889 ميلادي','848–889 н. э.','公元848至889年','848–889 d.C.'],
    ['porta','gate','puerta','porte','بوابة','ворота','城门','pòrta'],
    ['portello','small gate','puerta secundaria','petite porte','بوابة صغيرة','малые ворота','小城门','portello'],
    ['torre','tower','torre','tour','برج','башня','塔楼','torre'],
    ['forte','fort','fuerte','fort','حصن','форт','堡垒','forte']
  ];
  var guideRows = [
  [
    "Qui trovi tutto ciò che serve per utilizzare Genova mApp: dalla mappa alle categorie, dal Taccuino ai contenuti multimediali.",
    "Here you’ll find everything you need to use Genova mApp: from the map and categories to the Notebook and multimedia content.",
    "Aquí encontrarás todo lo necesario para utilizar Genova mApp: desde el mapa y las categorías hasta el Cuaderno y los contenidos multimedia.",
    "Vous trouverez ici tout ce qu’il faut pour utiliser Genova mApp : de la carte et des catégories au Carnet et aux contenus multimédias.",
    "ستجد هنا كل ما تحتاجه لاستخدام Genova mApp: من الخريطة والفئات إلى دفتر الملاحظات والمحتوى متعدد الوسائط.",
    "Здесь вы найдёте всё необходимое для работы с Genova mApp: от карты и категорий до Блокнота и мультимедийных материалов.",
    "这里汇集了使用 Genova mApp 所需的一切：从地图和分类，到记事本和多媒体内容。",
    "Chi ti trêuvi tutto quello che serve pe adêuviâ Genova mApp: da-a mappa a-e categorie, dò Taccuin a-i contegnui multimedia."
  ],
  [
    "Apri il capitolo che ti interessa oppure utilizza il comando qui sotto per visualizzare l’intera guida.",
    "Open the chapter you’re interested in, or use the command below to view the entire guide.",
    "Abre el capítulo que te interese o utiliza el comando de abajo para ver la guía completa.",
    "Ouvrez le chapitre qui vous intéresse ou utilisez la commande ci-dessous pour afficher l’ensemble du guide.",
    "افتح الفصل الذي يهمك أو استخدم الأمر أدناه لعرض الدليل كاملاً.",
    "Откройте нужную главу или воспользуйтесь кнопкой ниже, чтобы показать всё руководство.",
    "打开你感兴趣的章节，或使用下方按钮查看完整指南。",
    "Arvi o capitolo che t’interessa ò adêuva o comando chi sotto pe vedde tutta a guida."
  ],
  [
    "In arrivo",
    "Coming soon",
    "Próximamente",
    "Bientôt disponible",
    "قريباً",
    "Скоро",
    "即将推出",
    "In arrivo"
  ],
  [
    "1. Per iniziare con Genova mApp",
    "1. Getting started with Genova mApp",
    "1. Primeros pasos con Genova mApp",
    "1. Premiers pas avec Genova mApp",
    "1. البدء باستخدام Genova mApp",
    "1. Начало работы с Genova mApp",
    "1. 开始使用 Genova mApp",
    "1. Pe comensâ con Genova mApp"
  ],
  [
    "Genova mApp è una mappa interattiva dedicata alla scoperta di Genova. Attraverso la mappa puoi esplorare luoghi storici, musei, chiese, palazzi, fortificazioni, parchi, cinema, teatri, locali, trasporti, percorsi, contenuti multimediali e molte altre informazioni sulla città.",
    "Genova mApp is an interactive map designed to help you discover Genoa. Through the map you can explore historic places, museums, churches, palaces, fortifications, parks, cinemas, theatres, venues, transport, routes, multimedia content and much more information about the city.",
    "Genova mApp es un mapa interactivo pensado para descubrir Génova. A través del mapa puedes explorar lugares históricos, museos, iglesias, palacios, fortificaciones, parques, cines, teatros, locales, transportes, recorridos, contenidos multimedia y mucha más información sobre la ciudad.",
    "Genova mApp est une carte interactive conçue pour découvrir Gênes. Grâce à la carte, vous pouvez explorer des lieux historiques, musées, églises, palais, fortifications, parcs, cinémas, théâtres, établissements, transports, itinéraires, contenus multimédias et de nombreuses autres informations sur la ville.",
    "Genova mApp خريطة تفاعلية مخصصة لاكتشاف جنوة. من خلال الخريطة يمكنك استكشاف المواقع التاريخية والمتاحف والكنائس والقصور والتحصينات والحدائق ودور السينما والمسارح والأماكن ووسائل النقل والمسارات والمحتوى متعدد الوسائط والكثير من المعلومات الأخرى عن المدينة.",
    "Genova mApp — интерактивная карта для знакомства с Генуей. С её помощью можно исследовать исторические места, музеи, церкви, дворцы, укрепления, парки, кинотеатры, театры, заведения, транспорт, маршруты, мультимедийные материалы и многое другое о городе.",
    "Genova mApp 是一张用于探索热那亚的互动地图。通过地图，你可以发现历史地点、博物馆、教堂、宫殿、防御工事、公园、电影院、剧院、餐饮场所、交通、路线、多媒体内容以及更多城市信息。",
    "Genova mApp a l’é unna mappa interattiva fæta pe descovrî Zena. Co-a mappa ti peu esplorâ leughi storichi, muzei, gexe, palaçi, fortificaçioin, parchi, cinema, teatri, locæ, trasporti, percorsi, contegnui multimedia e tante atre informaçioin in sciâ çittæ."
  ],
  [
    "La mappa",
    "The map",
    "El mapa",
    "La carte",
    "الخريطة",
    "Карта",
    "地图",
    "A mappa"
  ],
  [
    "La mappa è il cuore di Genova mApp.",
    "The map is the heart of Genova mApp.",
    "El mapa es el corazón de Genova mApp.",
    "La carte est le cœur de Genova mApp.",
    "الخريطة هي قلب Genova mApp.",
    "Карта — центральная часть Genova mApp.",
    "地图是 Genova mApp 的核心。",
    "A mappa a l’é o cheu de Genova mApp."
  ],
  [
    "Puoi spostarla trascinandola con il dito o con il mouse e puoi ingrandire o ridurre la visualizzazione per esplorare le diverse zone della città.",
    "You can move it by dragging with your finger or mouse, and zoom in or out to explore different areas of the city.",
    "Puedes moverlo arrastrándolo con el dedo o con el ratón, y acercar o alejar la vista para explorar las distintas zonas de la ciudad.",
    "Vous pouvez la déplacer avec le doigt ou la souris et zoomer ou dézoomer pour explorer les différentes zones de la ville.",
    "يمكنك تحريكها بالسحب بإصبعك أو بالفأرة، والتكبير أو التصغير لاستكشاف مناطق المدينة المختلفة.",
    "Перемещайте её пальцем или мышью и увеличивайте или уменьшайте масштаб, чтобы исследовать разные районы города.",
    "你可以用手指或鼠标拖动地图，并放大或缩小视图，以探索城市的不同区域。",
    "Ti peu mesciâla strascinando co-o dio ò co-o mouse, e ingrandî ò diminuî a vista pe esplorâ e diverse zöne da çittæ."
  ],
  [
    "Sulla mappa vengono mostrati punti, percorsi e altri elementi corrispondenti ai contenuti attivati.",
    "The map displays points, routes and other elements corresponding to the content you have enabled.",
    "En el mapa se muestran puntos, recorridos y otros elementos correspondientes a los contenidos que hayas activado.",
    "La carte affiche des points, des itinéraires et d’autres éléments correspondant aux contenus que vous avez activés.",
    "تُعرض على الخريطة النقاط والمسارات والعناصر الأخرى المرتبطة بالمحتوى الذي قمت بتفعيله.",
    "На карте отображаются точки, маршруты и другие элементы, соответствующие включённому содержимому.",
    "地图会显示与你已启用内容相对应的点位、路线和其他元素。",
    "In sciâ mappa vegnan mostræ ponti, percorsi e atri elementi ligæ a-i contegnui attivæ."
  ],
  [
    "Aprire la New Home",
    "Opening the New Home",
    "Abrir la New Home",
    "Ouvrir la New Home",
    "فتح New Home",
    "Открытие New Home",
    "打开 New Home",
    "Arvî a New Home"
  ],
  [
    "Premendo il logo Genova mApp nella barra superiore puoi aprire la New Home, la schermata principale dalla quale accedere alle diverse aree dell’app.",
    "Press the Genova mApp logo in the top bar to open the New Home, the main screen from which you can access the different areas of the app.",
    "Pulsa el logotipo de Genova mApp en la barra superior para abrir la New Home, la pantalla principal desde la que puedes acceder a las distintas áreas de la app.",
    "Appuyez sur le logo Genova mApp dans la barre supérieure pour ouvrir la New Home, l’écran principal depuis lequel vous pouvez accéder aux différentes zones de l’application.",
    "اضغط شعار Genova mApp في الشريط العلوي لفتح New Home، وهي الشاشة الرئيسية التي تتيح الوصول إلى أقسام التطبيق المختلفة.",
    "Нажмите логотип Genova mApp в верхней панели, чтобы открыть New Home — главный экран, из которого доступны разные разделы приложения.",
    "点击顶部栏中的 Genova mApp 标志即可打开 New Home，也就是进入应用各个区域的主页面。",
    "Schiaccia o logo Genova mApp inta barra in çimma pe arvî a New Home, a schermâ prinçipâ da donde ti peu intrâ inte diverse aree de l’app."
  ],
  [
    "Qui i contenuti sono organizzati per argomento, in modo da aiutarti a trovare rapidamente ciò che stai cercando.",
    "Here, content is organised by topic to help you quickly find what you are looking for.",
    "Aquí los contenidos están organizados por temas para ayudarte a encontrar rápidamente lo que buscas.",
    "Les contenus y sont organisés par thème afin de vous aider à trouver rapidement ce que vous cherchez.",
    "هنا تُنظم المحتويات حسب الموضوع لمساعدتك على العثور بسرعة على ما تبحث عنه.",
    "Здесь материалы организованы по темам, чтобы вы могли быстрее найти нужное.",
    "这里的内容按主题分类，帮助你快速找到所需内容。",
    "Chi i contegnui son organizæ pe argomento, coscì ti peu trovâ ciù fito quello che ti çerchi."
  ],
  [
    "Aprire un luogo",
    "Opening a place",
    "Abrir un lugar",
    "Ouvrir un lieu",
    "فتح مكان",
    "Открытие места",
    "打开一个地点",
    "Arvî un leugo"
  ],
  [
    "Quando sulla mappa è visibile un punto di interesse, toccalo o cliccaci sopra per visualizzarne le informazioni.",
    "When a point of interest is visible on the map, tap or click it to view its information.",
    "Cuando haya un punto de interés visible en el mapa, tócalo o haz clic sobre él para ver su información.",
    "Lorsqu’un point d’intérêt est visible sur la carte, touchez-le ou cliquez dessus pour afficher ses informations.",
    "عندما تظهر نقطة اهتمام على الخريطة، اضغط عليها أو انقر فوقها لعرض معلوماتها.",
    "Если на карте видна точка интереса, нажмите или щёлкните по ней, чтобы открыть информацию.",
    "当地图上显示兴趣点时，轻触或点击该点即可查看相关信息。",
    "Quande in sciâ mappa gh’é un ponto d’interesse, toccalo ò cliccaghe in sce pe vedde e informaçioin."
  ],
  [
    "A seconda del contenuto potrai trovare descrizioni, immagini, posizione, collegamenti, contenuti multimediali o altre funzioni disponibili.",
    "Depending on the content, you may find descriptions, images, location, links, multimedia content or other available features.",
    "Según el contenido, podrás encontrar descripciones, imágenes, ubicación, enlaces, contenidos multimedia u otras funciones disponibles.",
    "Selon le contenu, vous pourrez trouver des descriptions, des images, la position, des liens, des contenus multimédias ou d’autres fonctions disponibles.",
    "بحسب المحتوى، قد تجد أوصافاً وصوراً وموقعاً وروابط ومحتوى متعدد الوسائط أو وظائف أخرى متاحة.",
    "В зависимости от материала вы можете увидеть описание, изображения, местоположение, ссылки, мультимедиа и другие доступные функции.",
    "根据内容不同，你可能会看到说明、图片、位置、链接、多媒体内容或其他可用功能。",
    "A seconda dò contegnuo ti peu trovâ descriçioin, imagine, posiçion, collegamenti, contegnui multimedia ò atre fonçioin disponibili."
  ],
  [
    "Come orientarsi nell’interfaccia",
    "Finding your way around the interface",
    "Orientarse por la interfaz",
    "Se repérer dans l’interface",
    "التعرّف على الواجهة",
    "Как ориентироваться в интерфейсе",
    "了解界面布局",
    "Comme orientâse inte l’interfaccia"
  ],
  [
    "Gli strumenti principali di Genova mApp sono distribuiti in diverse aree dello schermo:",
    "The main Genova mApp tools are arranged in different areas of the screen:",
    "Las principales herramientas de Genova mApp están distribuidas en distintas zonas de la pantalla:",
    "Les principaux outils de Genova mApp sont répartis dans différentes zones de l’écran :",
    "تتوزع الأدوات الرئيسية في Genova mApp على مناطق مختلفة من الشاشة:",
    "Основные инструменты Genova mApp расположены в разных областях экрана:",
    "Genova mApp 的主要工具分布在屏幕的不同区域：",
    "I strumenti prinçipæ de Genova mApp son distribuî inte diverse aree do schermo:"
  ],
  [
    "nella parte superiore trovi i comandi generali dell’app;",
    "at the top you’ll find the app’s general controls;",
    "en la parte superior encontrarás los controles generales de la app;",
    "en haut se trouvent les commandes générales de l’application ;",
    "في الجزء العلوي توجد عناصر التحكم العامة في التطبيق؛",
    "в верхней части находятся общие элементы управления приложением;",
    "顶部是应用的通用控制；",
    "inta parte in çimma gh’é i comandi generali de l’app;"
  ],
  [
    "sul bordo destro trovi i pulsanti per visualizzare categorie e contenuti sulla mappa;",
    "along the right edge you’ll find buttons for displaying categories and content on the map;",
    "en el borde derecho encontrarás los botones para mostrar categorías y contenidos en el mapa;",
    "sur le bord droit se trouvent les boutons permettant d’afficher des catégories et des contenus sur la carte ;",
    "على الحافة اليمنى توجد أزرار لإظهار الفئات والمحتوى على الخريطة؛",
    "вдоль правого края расположены кнопки для отображения категорий и содержимого на карте;",
    "右侧边缘有用于在地图上显示分类和内容的按钮；",
    "in sciô bordo drito gh’é i boton pe vedde categorie e contegnui in sciâ mappa;"
  ],
  [
    "nella parte inferiore trovi alcuni strumenti della mappa;",
    "at the bottom you’ll find some map tools;",
    "en la parte inferior encontrarás algunas herramientas del mapa;",
    "en bas se trouvent certains outils de la carte ;",
    "في الجزء السفلي توجد بعض أدوات الخريطة؛",
    "в нижней части находятся некоторые инструменты карты;",
    "底部有一些地图工具；",
    "inta parte de sotto gh’é quarche strumento da mappa;"
  ],
  [
    "in basso a sinistra trovi il comando per cambiare lingua;",
    "at the bottom left you’ll find the command for changing language;",
    "abajo a la izquierda encontrarás el control para cambiar de idioma;",
    "en bas à gauche se trouve la commande permettant de changer de langue ;",
    "في أسفل اليسار يوجد أمر تغيير اللغة؛",
    "слева внизу находится команда смены языка;",
    "左下角是切换语言的按钮；",
    "in basso a mancina gh’é o comando pe cangiâ lengua;"
  ],
  [
    "il Taccuino permette di gestire preferiti, percorsi e note.",
    "the Notebook lets you manage favourites, routes and notes.",
    "el Cuaderno permite gestionar favoritos, recorridos y notas.",
    "le Carnet permet de gérer les favoris, les itinéraires et les notes.",
    "يتيح دفتر الملاحظات إدارة المفضلة والمسارات والملاحظات.",
    "Блокнот позволяет управлять избранным, маршрутами и заметками.",
    "记事本可用于管理收藏、路线和笔记。",
    "o Taccuin o permette de gestî Preferii, percorsi e nòtte."
  ],
  [
    "Nei capitoli successivi trovi una spiegazione dettagliata di ogni area.",
    "The following chapters explain each area in detail.",
    "En los capítulos siguientes encontrarás una explicación detallada de cada zona.",
    "Les chapitres suivants expliquent chaque zone en détail.",
    "تشرح الفصول التالية كل منطقة بالتفصيل.",
    "В следующих главах каждая область описана подробнее.",
    "后续章节会详细介绍每个区域。",
    "Inti capitoli che vegnan dòppo ti trêuvi unna spiegaçion dettagliâ de ogni area."
  ],
  [
    "2. New Home – Scopri Genova",
    "2. New Home – Discover Genoa",
    "2. New Home – Descubre Génova",
    "2. New Home – Découvrir Gênes",
    "2. New Home – اكتشف جنوة",
    "2. New Home — Откройте Геную",
    "2. New Home – 探索热那亚",
    "2. New Home – Descovri Zena"
  ],
  [
    "La New Home raccoglie le principali sezioni di Genova mApp.",
    "The New Home brings together the main sections of Genova mApp.",
    "La New Home reúne las principales secciones de Genova mApp.",
    "La New Home regroupe les principales sections de Genova mApp.",
    "تجمع New Home الأقسام الرئيسية في Genova mApp.",
    "New Home объединяет основные разделы Genova mApp.",
    "New Home 汇集了 Genova mApp 的主要部分。",
    "A New Home a mette asseme e prinçipæ seçioin de Genova mApp."
  ],
  [
    "Puoi aprirla in qualsiasi momento premendo il logo Genova mApp nella barra superiore. Seleziona una categoria per visualizzare le relative funzioni e sottocategorie.",
    "You can open it at any time by pressing the Genova mApp logo in the top bar. Select a category to view its features and subcategories.",
    "Puedes abrirla en cualquier momento pulsando el logotipo de Genova mApp en la barra superior. Selecciona una categoría para ver sus funciones y subcategorías.",
    "Vous pouvez l’ouvrir à tout moment en appuyant sur le logo Genova mApp dans la barre supérieure. Sélectionnez une catégorie pour afficher ses fonctions et sous-catégories.",
    "يمكنك فتحها في أي وقت بالضغط على شعار Genova mApp في الشريط العلوي. اختر فئة لعرض وظائفها وفئاتها الفرعية.",
    "Её можно открыть в любое время, нажав логотип Genova mApp в верхней панели. Выберите категорию, чтобы увидеть её функции и подкатегории.",
    "你可以随时点击顶部栏中的 Genova mApp 标志打开它。选择一个分类即可查看相关功能和子分类。",
    "Ti peu arvîla quande ti veu schiacciando o logo Genova mApp inta barra in çimma. Çerni unna categoria pe vedde e seu fonçioin e sottocategorie."
  ],
  [
    "Da questa sezione puoi consultare la guida completa dell’app e scoprire il funzionamento dei principali strumenti di Genova mApp.",
    "From this section you can consult the complete app guide and learn how the main Genova mApp tools work.",
    "Desde esta sección puedes consultar la guía completa de la app y descubrir cómo funcionan las principales herramientas de Genova mApp.",
    "Depuis cette section, vous pouvez consulter le guide complet de l’application et découvrir le fonctionnement des principaux outils de Genova mApp.",
    "من هذا القسم يمكنك قراءة دليل التطبيق الكامل والتعرّف على كيفية عمل الأدوات الرئيسية في Genova mApp.",
    "В этом разделе можно прочитать полное руководство по приложению и узнать, как работают основные инструменты Genova mApp.",
    "在此部分中，你可以查看完整的应用指南，并了解 Genova mApp 主要工具的使用方式。",
    "Da sta seçion ti peu consultâ a guida completa de l’app e descovrî comme fonçionan i strumenti prinçipæ de Genova mApp."
  ],
  [
    "Raccoglie alcune delle principali categorie dedicate alla storia e al patrimonio della città.",
    "It brings together some of the main categories dedicated to the city’s history and heritage.",
    "Reúne algunas de las principales categorías dedicadas a la historia y al patrimonio de la ciudad.",
    "Elle regroupe certaines des principales catégories consacrées à l’histoire et au patrimoine de la ville.",
    "يجمع بعض الفئات الرئيسية المخصصة لتاريخ المدينة وتراثها.",
    "Здесь собраны основные категории, посвящённые истории и наследию города.",
    "这里汇集了与城市历史和文化遗产有关的主要分类。",
    "A mette asseme quarche categoria prinçipâ dedicâ a-a stöia e a-o patrimònio da çittæ."
  ],
  [
    "Forti — fortificazioni e sistemi difensivi.",
    "Forts — fortifications and defensive systems.",
    "Fortalezas — fortificaciones y sistemas defensivos.",
    "Forts — fortifications et systèmes défensifs.",
    "الحصون — التحصينات والأنظمة الدفاعية.",
    "Форты — укрепления и оборонительные системы.",
    "堡垒 — 防御工事和防御体系。",
    "Forti — fortificaçioin e sistemi difensivi."
  ],
  [
    "Musei — musei e strutture culturali presenti in città.",
    "Museums — museums and cultural institutions in the city.",
    "Museos — museos e instituciones culturales de la ciudad.",
    "Musées — musées et structures culturelles de la ville.",
    "المتاحف — المتاحف والمؤسسات الثقافية في المدينة.",
    "Музеи — музеи и культурные учреждения города.",
    "博物馆 — 城市中的博物馆和文化机构。",
    "Muzei — muzei e struttue culturali da çittæ."
  ],
  [
    "Chiese — chiese, basiliche, santuari e altri edifici religiosi.",
    "Churches — churches, basilicas, sanctuaries and other religious buildings.",
    "Iglesias — iglesias, basílicas, santuarios y otros edificios religiosos.",
    "Églises — églises, basiliques, sanctuaires et autres édifices religieux.",
    "الكنائس — الكنائس والبازيليكات والمزارات وغيرها من المباني الدينية.",
    "Церкви — церкви, базилики, святилища и другие религиозные здания.",
    "教堂 — 教堂、宗座圣殿、圣所及其他宗教建筑。",
    "Gexe — gexe, baxilighe, santuai e atri edifiçi religiozi."
  ],
  [
    "Palazzi — palazzi storici, ville e altri edifici di particolare interesse storico e architettonico.",
    "Palaces — historic palaces, villas and other buildings of particular historical and architectural interest.",
    "Palacios — palacios históricos, villas y otros edificios de especial interés histórico y arquitectónico.",
    "Palais — palais historiques, villas et autres bâtiments présentant un intérêt historique et architectural particulier.",
    "القصور — القصور التاريخية والفيلات وغيرها من المباني ذات الأهمية التاريخية والمعمارية.",
    "Дворцы — исторические дворцы, виллы и другие здания, представляющие особый исторический и архитектурный интерес.",
    "宫殿 — 历史宫殿、别墅及其他具有重要历史和建筑价值的建筑。",
    "Palaçi — palaçi storichi, ville e atri edifiçi de particolare interesse storico e architettonico."
  ],
  [
    "Intrattenimento",
    "Entertainment",
    "Entretenimiento",
    "Divertissement",
    "الترفيه",
    "Развлечения",
    "休闲娱乐",
    "Divertimento"
  ],
  [
    "Raccoglie luoghi e attività dedicati al tempo libero e alla cultura.",
    "It brings together places and activities dedicated to leisure and culture.",
    "Reúne lugares y actividades dedicados al ocio y la cultura.",
    "Elle regroupe des lieux et des activités consacrés aux loisirs et à la culture.",
    "يجمع أماكن وأنشطة مخصصة لوقت الفراغ والثقافة.",
    "Здесь собраны места и занятия для отдыха и культуры.",
    "这里汇集了休闲和文化相关的地点与活动。",
    "A mette asseme leughi e attivitæ dedicæ a-o tempo libero e a-a cultua."
  ],
  [
    "Mostre — spazi espositivi, mostre e strutture dedicate alle esposizioni.",
    "Exhibitions — exhibition spaces, shows and venues dedicated to exhibitions.",
    "Exposiciones — espacios expositivos, muestras y estructuras dedicadas a exposiciones.",
    "Expositions — espaces d’exposition, expositions et structures dédiées.",
    "المعارض — مساحات ومعارض ومرافق مخصصة للعرض.",
    "Выставки — выставочные пространства, экспозиции и площадки.",
    "展览 — 展览空间、展览活动及相关场所。",
    "Mostre — spaçi espozitivi, mostre e struttue dedicæ a-e espoziçioin."
  ],
  [
    "Teatri — i principali teatri della città.",
    "Theatres — the city’s main theatres.",
    "Teatros — los principales teatros de la ciudad.",
    "Théâtres — les principaux théâtres de la ville.",
    "المسارح — أهم مسارح المدينة.",
    "Театры — основные театры города.",
    "剧院 — 城市主要剧院。",
    "Teatri — i prinçipæ teatri da çittæ."
  ],
  [
    "Cinema — le sale cinematografiche presenti a Genova.",
    "Cinemas — cinemas in Genoa.",
    "Cines — las salas de cine presentes en Génova.",
    "Cinémas — les salles de cinéma présentes à Gênes.",
    "دور السينما — صالات السينما الموجودة في جنوة.",
    "Кинотеатры — кинотеатры Генуи.",
    "电影院 — 热那亚的电影院。",
    "Cinema — e sale cinematografiche de Zena."
  ],
  [
    "Parchi e piazze — parchi, giardini, aree verdi e altri spazi pubblici.",
    "Parks and squares — parks, gardens, green areas and other public spaces.",
    "Parques y plazas — parques, jardines, zonas verdes y otros espacios públicos.",
    "Parcs et places — parcs, jardins, espaces verts et autres espaces publics.",
    "الحدائق والساحات — الحدائق والمساحات الخضراء وغيرها من الأماكن العامة.",
    "Парки и площади — парки, сады, зелёные зоны и другие общественные пространства.",
    "公园和广场 — 公园、花园、绿地及其他公共空间。",
    "Parchi e ciassæ — parchi, giarddin, aree verdi e atri spaçi pubbrichi."
  ],
  [
    "Sport — impianti, strutture e luoghi dedicati alle attività sportive.",
    "Sport — facilities, venues and places dedicated to sports activities.",
    "Deporte — instalaciones, estructuras y lugares dedicados a actividades deportivas.",
    "Sport — installations, structures et lieux consacrés aux activités sportives.",
    "الرياضة — مرافق ومنشآت وأماكن مخصصة للأنشطة الرياضية.",
    "Спорт — объекты, сооружения и места для спортивных занятий.",
    "体育 — 体育设施、场馆和活动地点。",
    "Sport — impianti, struttue e leughi dedicæ a-e attivitæ sportive."
  ],
  [
    "Raccoglie le principali informazioni e i servizi relativi ai trasporti. Puoi consultare le diverse modalità di spostamento e visualizzare sulla mappa le informazioni disponibili.",
    "It brings together the main transport information and services. You can consult the different ways of getting around and display the available information on the map.",
    "Reúne la información y los servicios principales relacionados con el transporte. Puedes consultar las distintas formas de desplazarte y mostrar en el mapa la información disponible.",
    "Elle regroupe les principales informations et les services liés aux transports. Vous pouvez consulter les différents moyens de déplacement et afficher sur la carte les informations disponibles.",
    "يجمع أهم المعلومات والخدمات المتعلقة بالنقل. يمكنك الاطلاع على وسائل التنقل المختلفة وعرض المعلومات المتاحة على الخريطة.",
    "Здесь собрана основная информация и услуги, связанные с транспортом. Можно посмотреть разные способы передвижения и вывести доступные данные на карту.",
    "这里汇集了主要交通信息和服务。你可以查看不同出行方式，并在地图上显示相关信息。",
    "A mette asseme e prinçipæ informaçioin e i serviçi pe-i trasporti. Ti peu consultâ e diverse manee pe mesciâse e vedde in sciâ mappa e informaçioin disponibili."
  ],
  [
    "Autobus.",
    "Buses.",
    "Autobuses.",
    "Bus.",
    "الحافلات.",
    "Автобусы.",
    "公交车。",
    "Autobus."
  ],
  [
    "Metropolitana.",
    "Metro.",
    "Metro.",
    "Métro.",
    "المترو.",
    "Метро.",
    "地铁。",
    "Metropolitana."
  ],
  [
    "Treni.",
    "Trains.",
    "Trenes.",
    "Trains.",
    "القطارات.",
    "Поезда.",
    "火车。",
    "Tren."
  ],
  [
    "Funicolari, ascensori e cremagliere.",
    "Funiculars, lifts and rack railways.",
    "Funiculares, ascensores y ferrocarriles de cremallera.",
    "Funiculaires, ascenseurs et chemins de fer à crémaillère.",
    "القطارات المعلقة والمصاعد والسكك ذات الترس.",
    "Фуникулёры, лифты и зубчатые железные дороги.",
    "缆车、电梯和齿轨铁路。",
    "Funicolari, ascensoî e cremagliere."
  ],
  [
    "Navi e battelli.",
    "Ships and boats.",
    "Barcos y embarcaciones.",
    "Navires et bateaux.",
    "السفن والقوارب.",
    "Суда и катера.",
    "船舶和渡船。",
    "Navi e battelli."
  ],
  [
    "Aereo.",
    "Air travel.",
    "Avión.",
    "Avion.",
    "الطيران.",
    "Авиасообщение.",
    "航空。",
    "Aereo."
  ],
  [
    "Permette di esplorare elementi che si sviluppano attraverso diverse zone della città.",
    "It lets you explore features that extend across different areas of the city.",
    "Permite explorar elementos que se desarrollan por distintas zonas de la ciudad.",
    "Elle permet d’explorer des éléments qui se développent à travers différentes zones de la ville.",
    "يتيح استكشاف عناصر تمتد عبر مناطق مختلفة من المدينة.",
    "Позволяет исследовать объекты, проходящие через разные районы города.",
    "可用于探索横跨城市不同区域的内容。",
    "O permette d’esplorâ elementi che se sviluppan inte diverse zöne da çittæ."
  ],
  [
    "Mura storiche — le diverse cinte murarie che hanno caratterizzato la storia di Genova.",
    "Historic walls — the different city walls that have shaped Genoa’s history.",
    "Murallas históricas — los distintos recintos amurallados que han marcado la historia de Génova.",
    "Remparts historiques — les différentes enceintes qui ont marqué l’histoire de Gênes.",
    "الأسوار التاريخية — مختلف الأسوار التي ميّزت تاريخ جنوة.",
    "Исторические стены — различные оборонительные пояса, сыгравшие роль в истории Генуи.",
    "历史城墙 — 在热那亚历史中具有重要作用的不同城墙体系。",
    "Mûage storiche — e diverse çinte de mûage che an segnòu a stöia de Zena."
  ],
  [
    "Acquedotti — percorsi e punti dedicati agli acquedotti storici della città.",
    "Aqueducts — routes and points dedicated to the city’s historic aqueducts.",
    "Acueductos — recorridos y puntos dedicados a los acueductos históricos de la ciudad.",
    "Aqueducs — itinéraires et points consacrés aux aqueducs historiques de la ville.",
    "القنوات المائية — مسارات ونقاط مخصصة لقنوات المياه التاريخية في المدينة.",
    "Акведуки — маршруты и точки, посвящённые историческим акведукам города.",
    "输水渠 — 与城市历史输水渠相关的路线和点位。",
    "Acquedotti — percorsi e ponti dedicæ a-i acquedotti storichi da çittæ."
  ],
  [
    "Percorsi consigliati — itinerari attraverso luoghi, quartieri o temi specifici, visualizzabili direttamente sulla mappa.",
    "Suggested routes — itineraries through places, neighbourhoods or specific themes, viewable directly on the map.",
    "Recorridos recomendados — itinerarios por lugares, barrios o temas específicos, visibles directamente en el mapa.",
    "Itinéraires conseillés — parcours à travers des lieux, quartiers ou thèmes spécifiques, visibles directement sur la carte.",
    "المسارات المقترحة — جولات عبر أماكن أو أحياء أو موضوعات محددة، يمكن عرضها مباشرة على الخريطة.",
    "Рекомендуемые маршруты — прогулки по местам, районам или отдельным темам, которые можно показать прямо на карте.",
    "推荐路线 — 围绕地点、街区或特定主题设计的行程，可直接显示在地图上。",
    "Percorsi consigliæ — itinerai tra leughi, quartê ò temi speçifichi, che se peu vedde direttamente in sciâ mappa."
  ],
  [
    "Raccoglie attività e strutture utili durante la visita della città, visualizzabili direttamente sulla mappa.",
    "It brings together useful businesses and accommodation for your visit, which can be displayed directly on the map.",
    "Reúne actividades y alojamientos útiles durante la visita a la ciudad, que pueden mostrarse directamente en el mapa.",
    "Elle regroupe des établissements et des hébergements utiles pendant la visite de la ville, affichables directement sur la carte.",
    "يجمع أنشطة وأماكن إقامة مفيدة أثناء زيارة المدينة ويمكن عرضها مباشرة على الخريطة.",
    "Здесь собраны заведения и варианты проживания, полезные во время посещения города; их можно показывать прямо на карте.",
    "这里汇集了游览城市期间实用的餐饮和住宿场所，并可直接显示在地图上。",
    "A mette asseme attivitæ e struttue utili pe chi visita a çittæ, che se peu vedde direttamente in sciâ mappa."
  ],
  [
    "Locali.",
    "Venues.",
    "Locales.",
    "Établissements.",
    "أماكن ومحال.",
    "Заведения.",
    "餐饮场所。",
    "Locæ."
  ],
  [
    "Ristoranti.",
    "Restaurants.",
    "Restaurantes.",
    "Restaurants.",
    "مطاعم.",
    "Рестораны.",
    "餐厅。",
    "Ristoranti."
  ],
  [
    "Take-away.",
    "Takeaway.",
    "Para llevar.",
    "À emporter.",
    "وجبات جاهزة.",
    "Еда навынос.",
    "外卖。",
    "Da asporto."
  ],
  [
    "Alberghi e B&B.",
    "Hotels and B&Bs.",
    "Hoteles y B&B.",
    "Hôtels et B&B.",
    "فنادق ومبيت وإفطار.",
    "Отели и B&B.",
    "酒店和民宿。",
    "Alberghi e B&B."
  ],
  [
    "Qui trovi contenuti che permettono di scoprire Genova attraverso immagini, video e audio.",
    "Here you’ll find content that lets you discover Genoa through images, video and audio.",
    "Aquí encontrarás contenidos que permiten descubrir Génova a través de imágenes, vídeo y audio.",
    "Vous trouverez ici des contenus permettant de découvrir Gênes à travers des images, des vidéos et des contenus audio.",
    "ستجد هنا محتوى يتيح اكتشاف جنوة عبر الصور والفيديو والصوت.",
    "Здесь находятся материалы, позволяющие открывать Геную через изображения, видео и аудио.",
    "这里提供通过图片、视频和音频探索热那亚的内容。",
    "Chi ti trêuvi contegnui pe descovrî Zena con imagine, video e audio."
  ],
  [
    "Punti QR — contenuti collegati a luoghi e aree della città.",
    "QR Points — content linked to places and areas of the city.",
    "Puntos QR — contenidos vinculados a lugares y zonas de la ciudad.",
    "Points QR — contenus liés à des lieux et des zones de la ville.",
    "نقاط QR — محتوى مرتبط بأماكن ومناطق في المدينة.",
    "QR-точки — материалы, связанные с местами и районами города.",
    "QR 点位 — 与城市地点和区域相关的内容。",
    "Ponti QR — contegnui ligæ a leughi e zöne da çittæ."
  ],
  [
    "MiniDoc — brevi documentari dedicati alla storia, ai luoghi e alle trasformazioni di Genova.",
    "MiniDoc — short documentaries about Genoa’s history, places and transformations.",
    "MiniDoc — breves documentales dedicados a la historia, los lugares y las transformaciones de Génova.",
    "MiniDoc — courts documentaires consacrés à l’histoire, aux lieux et aux transformations de Gênes.",
    "MiniDoc — أفلام وثائقية قصيرة عن تاريخ جنوة وأماكنها وتحولاتها.",
    "MiniDoc — короткие документальные видео об истории, местах и преобразованиях Генуи.",
    "MiniDoc — 关于热那亚历史、地点和城市变化的短纪录片。",
    "MiniDoc — documentai curti dedicæ a-a stöia, a-i leughi e a-e trasformaçioin de Zena."
  ],
  [
    "Audioguide — contenuti audio dedicati alla scoperta della città.",
    "Audio guides — audio content for discovering the city.",
    "Audioguías — contenidos de audio dedicados a descubrir la ciudad.",
    "Audioguides — contenus audio consacrés à la découverte de la ville.",
    "الأدلة الصوتية — محتوى صوتي لاكتشاف المدينة.",
    "Аудиогиды — аудиоматериалы для знакомства с городом.",
    "语音导览 — 用于探索城市的音频内容。",
    "Audioguide — contegnui audio pe descovrî a çittæ."
  ],
  [
    "Videoguide — contenuti video dedicati a luoghi, percorsi e argomenti specifici.",
    "Video guides — video content dedicated to places, routes and specific topics.",
    "Videoguías — contenidos de vídeo dedicados a lugares, recorridos y temas específicos.",
    "Vidéoguides — contenus vidéo consacrés à des lieux, itinéraires et thèmes spécifiques.",
    "أدلة الفيديو — محتوى فيديو مخصص لأماكن ومسارات وموضوعات محددة.",
    "Видеогиды — видеоматериалы о местах, маршрутах и отдельных темах.",
    "视频导览 — 与地点、路线和特定主题相关的视频内容。",
    "Videoguide — contegnui video dedicæ a leughi, percorsi e argomenti speçifichi."
  ],
  [
    "Eventi — appuntamenti, manifestazioni e iniziative presenti in città.",
    "Events — appointments, events and initiatives taking place in the city.",
    "Eventos — citas, manifestaciones e iniciativas presentes en la ciudad.",
    "Événements — rendez-vous, manifestations et initiatives organisés dans la ville.",
    "الفعاليات — مواعيد ومناسبات ومبادرات تقام في المدينة.",
    "События — мероприятия, встречи и инициативы в городе.",
    "活动 — 城市中的活动、节庆和其他项目。",
    "Eventi — appontamenti, manifestaçioin e iniçiative presenti inta çittæ."
  ],
  [
    "Blog — spazio dedicato a contenuti, approfondimenti e conversazioni legate a Genova e alla sua comunità.",
    "Blog — a space for content, insights and conversations about Genoa and its community.",
    "Blog — espacio dedicado a contenidos, análisis y conversaciones relacionadas con Génova y su comunidad.",
    "Blog — espace consacré à des contenus, approfondissements et échanges liés à Gênes et à sa communauté.",
    "المدونة — مساحة للمحتوى والتعمق والنقاشات المرتبطة بجنوة ومجتمعها.",
    "Блог — пространство для материалов, подробностей и обсуждений о Генуе и её сообществе.",
    "博客 — 用于发布与热那亚及其社区相关的内容、深度文章和交流。",
    "Blog — spaçio dedicòu a contegnui, approfondimenti e conversaçioin in sce Zena e a seu comunitæ."
  ],
  [
    "Contatti — informazioni per comunicare con Genova mApp.",
    "Contact — information for getting in touch with Genova mApp.",
    "Contactos — información para comunicarte con Genova mApp.",
    "Contact — informations pour communiquer avec Genova mApp.",
    "التواصل — معلومات للاتصال بـ Genova mApp.",
    "Контакты — информация для связи с Genova mApp.",
    "联系 — 与 Genova mApp 联系所需的信息。",
    "Contatti — informaçioin pe contattâ Genova mApp."
  ],
  [
    "Giochi — giochi dedicati a Genova, come A Zena – Trivial, e altre esperienze interattive.",
    "Games — games about Genoa, such as A Zena – Trivial, and other interactive experiences.",
    "Juegos — juegos dedicados a Génova, como A Zena – Trivial, y otras experiencias interactivas.",
    "Jeux — jeux consacrés à Gênes, comme A Zena – Trivial, et autres expériences interactives.",
    "الألعاب — ألعاب عن جنوة، مثل A Zena – Trivial، وتجارب تفاعلية أخرى.",
    "Игры — игры о Генуе, например A Zena – Trivial, и другие интерактивные возможности.",
    "游戏 — 与热那亚有关的游戏，例如 A Zena – Trivial，以及其他互动体验。",
    "Zeughi — zeughi dedicæ a Zena, comme A Zena – Trivial, e atre esperiense interattive."
  ],
  [
    "Premi — iniziative, obiettivi e vantaggi disponibili per gli utenti.",
    "Rewards — initiatives, goals and benefits available to users.",
    "Premios — iniciativas, objetivos y ventajas disponibles para los usuarios.",
    "Récompenses — initiatives, objectifs et avantages disponibles pour les utilisateurs.",
    "الجوائز — مبادرات وأهداف ومزايا متاحة للمستخدمين.",
    "Призы — инициативы, цели и преимущества для пользователей.",
    "奖励 — 面向用户的活动、目标和权益。",
    "Premi — iniçiative, obiettivi e vantaggi disponibili pe-i utenti."
  ],
  [
    "Shop — prodotti e contenuti legati a Genova e a Genova mApp.",
    "Shop — products and content related to Genoa and Genova mApp.",
    "Tienda — productos y contenidos relacionados con Génova y Genova mApp.",
    "Boutique — produits et contenus liés à Gênes et à Genova mApp.",
    "المتجر — منتجات ومحتويات مرتبطة بجنوة وGenova mApp.",
    "Магазин — товары и материалы, связанные с Генуей и Genova mApp.",
    "商店 — 与热那亚和 Genova mApp 相关的产品和内容。",
    "Bottega — prodotti e contegnui ligæ a Zena e a Genova mApp."
  ],
  [
    "3. I comandi in alto",
    "3. Controls at the top",
    "3. Los controles de arriba",
    "3. Les commandes en haut",
    "3. عناصر التحكم في الأعلى",
    "3. Элементы управления вверху",
    "3. 顶部控制",
    "3. I comandi in çimma"
  ],
  [
    "Nella parte superiore dello schermo trovi i principali comandi generali di Genova mApp. Alcuni elementi possono adattarsi o cambiare posizione in base alle dimensioni dello schermo.",
    "At the top of the screen you’ll find Genova mApp’s main general controls. Some elements may adapt or change position depending on the screen size.",
    "En la parte superior de la pantalla encontrarás los principales controles generales de Genova mApp. Algunos elementos pueden adaptarse o cambiar de posición según el tamaño de la pantalla.",
    "En haut de l’écran se trouvent les principales commandes générales de Genova mApp. Certains éléments peuvent s’adapter ou changer de position selon la taille de l’écran.",
    "في أعلى الشاشة توجد عناصر التحكم العامة الرئيسية في Genova mApp. قد تتكيف بعض العناصر أو تغيّر موضعها بحسب حجم الشاشة.",
    "В верхней части экрана находятся основные общие элементы управления Genova mApp. Некоторые элементы могут менять размер или положение в зависимости от размера экрана.",
    "屏幕顶部是 Genova mApp 的主要通用控制。部分元素会根据屏幕尺寸自动调整或改变位置。",
    "Inta parte in çimma do schermo ti trêuvi i prinçipæ comandi generali de Genova mApp. Quarche elemento o peu adattâse ò cangiâ posiçion a seconda da grandezza do schermo."
  ],
  [
    "Genova mApp / Home",
    "Genova mApp / Home",
    "Genova mApp / Inicio",
    "Genova mApp / Accueil",
    "Genova mApp / الرئيسية",
    "Genova mApp / Главная",
    "Genova mApp / 首页",
    "Genova mApp / Home"
  ],
  [
    "Premendo il logo Genova mApp puoi aprire la New Home. Puoi utilizzarlo in qualsiasi momento per tornare rapidamente all’elenco principale delle sezioni dell’app.",
    "Press the Genova mApp logo to open the New Home. You can use it at any time to quickly return to the app’s main list of sections.",
    "Pulsa el logotipo de Genova mApp para abrir la New Home. Puedes utilizarlo en cualquier momento para volver rápidamente a la lista principal de secciones de la app.",
    "Appuyez sur le logo Genova mApp pour ouvrir la New Home. Vous pouvez l’utiliser à tout moment pour revenir rapidement à la liste principale des sections de l’application.",
    "اضغط شعار Genova mApp لفتح New Home. يمكنك استخدامه في أي وقت للعودة بسرعة إلى القائمة الرئيسية لأقسام التطبيق.",
    "Нажмите логотип Genova mApp, чтобы открыть New Home. Этой кнопкой можно в любое время быстро вернуться к главному списку разделов приложения.",
    "点击 Genova mApp 标志即可打开 New Home。你可以随时使用它快速返回应用主要部分列表。",
    "Schiaccia o logo Genova mApp pe arvî a New Home. Ti peu adêuviâlo quande ti veu pe tornâ fito a-a lista prinçipâ de seçioin de l’app."
  ],
  [
    "Cerca",
    "Search",
    "Buscar",
    "Rechercher",
    "بحث",
    "Поиск",
    "搜索",
    "Çerca"
  ],
  [
    "La funzione Cerca permette di trovare rapidamente luoghi e contenuti presenti in Genova mApp senza doverli individuare manualmente sulla mappa.",
    "The Search function lets you quickly find places and content in Genova mApp without having to locate them manually on the map.",
    "La función Buscar permite encontrar rápidamente lugares y contenidos de Genova mApp sin tener que localizarlos manualmente en el mapa.",
    "La fonction Rechercher permet de trouver rapidement des lieux et des contenus présents dans Genova mApp sans devoir les repérer manuellement sur la carte.",
    "تتيح وظيفة البحث العثور بسرعة على الأماكن والمحتوى الموجود في Genova mApp من دون الحاجة إلى تحديده يدوياً على الخريطة.",
    "Функция Поиск позволяет быстро находить места и материалы в Genova mApp, не разыскивая их вручную на карте.",
    "搜索功能可帮助你快速查找 Genova mApp 中的地点和内容，而无需在地图上手动寻找。",
    "A fonçion Çerca a permette de trovâ fito leughi e contegnui de Genova mApp sensa dovêli çercâ a man in sciâ mappa."
  ],
  [
    "Inserisci il nome o una parola relativa a ciò che stai cercando e seleziona uno dei risultati disponibili.",
    "Enter a name or a word related to what you’re looking for, then select one of the available results.",
    "Introduce el nombre o una palabra relacionada con lo que buscas y selecciona uno de los resultados disponibles.",
    "Saisissez un nom ou un mot lié à ce que vous recherchez, puis sélectionnez l’un des résultats disponibles.",
    "أدخل اسماً أو كلمة مرتبطة بما تبحث عنه ثم اختر إحدى النتائج المتاحة.",
    "Введите название или слово, связанное с тем, что вы ищете, затем выберите один из доступных результатов.",
    "输入名称或与目标相关的关键词，然后从可用结果中选择。",
    "Scrivi o nomme ò unna paròlla ligâ a quello che ti çerchi e çerni un di risultati disponibili."
  ],
  [
    "Profilo e accesso",
    "Profile and sign-in",
    "Perfil y acceso",
    "Profil et connexion",
    "الملف الشخصي وتسجيل الدخول",
    "Профиль и вход",
    "个人资料和登录",
    "Profilo e acesso"
  ],
  [
    "Quando disponibili, le funzioni relative al profilo permettono di accedere al proprio account e ai servizi personali collegati a Genova mApp. Alcune funzioni possono richiedere l’accesso con il proprio account.",
    "When available, profile features let you access your account and personal services linked to Genova mApp. Some features may require you to sign in.",
    "Cuando estén disponibles, las funciones del perfil permiten acceder a tu cuenta y a los servicios personales vinculados a Genova mApp. Algunas funciones pueden requerir iniciar sesión.",
    "Lorsqu’elles sont disponibles, les fonctions du profil permettent d’accéder à votre compte et aux services personnels liés à Genova mApp. Certaines fonctions peuvent nécessiter une connexion.",
    "عند توفرها، تتيح وظائف الملف الشخصي الوصول إلى حسابك والخدمات الشخصية المرتبطة بـ Genova mApp. قد تتطلب بعض الوظائف تسجيل الدخول.",
    "Когда эти функции доступны, профиль позволяет войти в учётную запись и получить доступ к персональным сервисам Genova mApp. Для некоторых функций может потребоваться вход.",
    "当相关功能可用时，你可以通过个人资料访问账号和与 Genova mApp 关联的个人服务。某些功能可能需要登录。",
    "Quande son disponibili, e fonçioin dò profilo permettan d’intrâ into teu conto e inti serviçi personæ ligæ a Genova mApp. Quarche fonçion a peu domandâ l’aceso."
  ],
  [
    "Abbonamento",
    "Subscription",
    "Suscripción",
    "Abonnement",
    "الاشتراك",
    "Подписка",
    "订阅",
    "Abbonamento"
  ],
  [
    "La sezione Abbonamento è dedicata alla gestione dei servizi e dei vantaggi disponibili per gli utenti abbonati.",
    "The Subscription section is dedicated to managing services and benefits available to subscribers.",
    "La sección Suscripción está dedicada a gestionar los servicios y ventajas disponibles para los usuarios suscritos.",
    "La section Abonnement est consacrée à la gestion des services et des avantages disponibles pour les abonnés.",
    "قسم الاشتراك مخصص لإدارة الخدمات والمزايا المتاحة للمشتركين.",
    "Раздел Подписка предназначен для управления сервисами и преимуществами, доступными подписчикам.",
    "订阅部分用于管理订阅用户可用的服务和权益。",
    "A seçion Abbonamento a l’é dedicâ a-a gestion di serviçi e di vantaggi disponibili pe-i utenti abbonæ."
  ],
  [
    "Alcune funzioni relative all’abbonamento sono ancora in fase di completamento e saranno rese disponibili progressivamente.",
    "Some subscription features are still being completed and will become available progressively.",
    "Algunas funciones de la suscripción todavía están en fase de desarrollo y estarán disponibles progresivamente.",
    "Certaines fonctions liées à l’abonnement sont encore en cours de finalisation et seront rendues disponibles progressivement.",
    "لا تزال بعض وظائف الاشتراك قيد الاستكمال وستتاح تدريجياً.",
    "Некоторые функции подписки ещё находятся в разработке и будут становиться доступными постепенно.",
    "部分订阅功能仍在完善中，将逐步开放。",
    "Quarche fonçion de l’abbonamento a l’é ancon in fase de completamento e a saiâ disponibile pöco a-a vòtta."
  ],
  [
    "Impostazioni",
    "Settings",
    "Ajustes",
    "Paramètres",
    "الإعدادات",
    "Настройки",
    "设置",
    "Impostaçioin"
  ],
  [
    "Le Impostazioni permettono di personalizzare alcuni aspetti dell’app e di accedere a funzioni di servizio.",
    "Settings let you customise some aspects of the app and access service features.",
    "Los Ajustes permiten personalizar algunos aspectos de la app y acceder a funciones de servicio.",
    "Les Paramètres permettent de personnaliser certains aspects de l’application et d’accéder à des fonctions de service.",
    "تتيح الإعدادات تخصيص بعض جوانب التطبيق والوصول إلى وظائف خدمية.",
    "Настройки позволяют персонализировать некоторые элементы приложения и открывать служебные функции.",
    "设置可用于自定义应用的部分功能，并访问服务选项。",
    "E Impostaçioin permettan de personalizâ quarche aspeto de l’app e d’intrâ inte fonçioin de serviçio."
  ],
  [
    "Benvenuto.",
    "Welcome.",
    "Bienvenido.",
    "Bienvenue.",
    "مرحباً.",
    "Добро пожаловать.",
    "欢迎。",
    "Benvegnûo."
  ],
  [
    "Guida e istruzioni.",
    "Guide and instructions.",
    "Guía e instrucciones.",
    "Guide et instructions.",
    "الدليل والتعليمات.",
    "Руководство и инструкции.",
    "指南与说明。",
    "Guida e istruçioin."
  ],
  [
    "Contatti.",
    "Contact.",
    "Contactos.",
    "Contact.",
    "التواصل.",
    "Контакты.",
    "联系。",
    "Contatti."
  ],
  [
    "Dimensione del testo.",
    "Text size.",
    "Tamaño del texto.",
    "Taille du texte.",
    "حجم النص.",
    "Размер текста.",
    "文字大小。",
    "Grandezza do testo."
  ],
  [
    "Altre preferenze dell’app, quando disponibili.",
    "Other app preferences, when available.",
    "Otras preferencias de la app, cuando estén disponibles.",
    "Autres préférences de l’application, lorsqu’elles sont disponibles.",
    "تفضيلات أخرى للتطبيق، عند توفرها.",
    "Другие настройки приложения, когда они доступны.",
    "其他应用偏好设置（如可用）。",
    "Atre preferense de l’app, quande disponibili."
  ],
  [
    "Installa Genova mApp",
    "Install Genova mApp",
    "Instalar Genova mApp",
    "Installer Genova mApp",
    "تثبيت Genova mApp",
    "Установить Genova mApp",
    "安装 Genova mApp",
    "Installa Genova mApp"
  ],
  [
    "Quando questa funzione è disponibile sul dispositivo utilizzato, puoi installare Genova mApp per accedervi più facilmente, in modo simile a una normale applicazione.",
    "When this feature is available on your device, you can install Genova mApp for easier access, much like a regular application.",
    "Cuando esta función esté disponible en el dispositivo utilizado, puedes instalar Genova mApp para acceder a ella más fácilmente, de forma similar a una aplicación normal.",
    "Lorsque cette fonction est disponible sur l’appareil utilisé, vous pouvez installer Genova mApp pour y accéder plus facilement, comme une application classique.",
    "عندما تكون هذه الوظيفة متاحة على جهازك، يمكنك تثبيت Genova mApp للوصول إليها بسهولة أكبر، بطريقة شبيهة بالتطبيق العادي.",
    "Если эта функция доступна на вашем устройстве, Genova mApp можно установить для более удобного доступа, как обычное приложение.",
    "当设备支持此功能时，你可以安装 Genova mApp，以便像普通应用一样更方便地访问。",
    "Quande sta fonçion a l’é disponibile in sciô dispoxitivo, ti peu installâ Genova mApp pe intrâghe ciù facilmente, comme unna normale app."
  ],
  [
    "La disponibilità e la modalità di installazione possono dipendere dal dispositivo e dal browser utilizzato.",
    "Availability and installation methods may depend on the device and browser you are using.",
    "La disponibilidad y el modo de instalación pueden depender del dispositivo y del navegador utilizado.",
    "La disponibilité et la méthode d’installation peuvent dépendre de l’appareil et du navigateur utilisés.",
    "قد تختلف إمكانية التثبيت وطريقته بحسب الجهاز والمتصفح المستخدم.",
    "Доступность и способ установки могут зависеть от устройства и используемого браузера.",
    "是否可安装以及安装方式可能取决于所用设备和浏览器。",
    "A disponibilitæ e a manea d’installaçion peu dipende dò dispoxitivo e dò browser adêuviòu."
  ],
  [
    "4. Pulsanti bordo destro",
    "4. Right-edge buttons",
    "4. Botones del borde derecho",
    "4. Boutons sur le bord droit",
    "4. أزرار الحافة اليمنى",
    "4. Кнопки у правого края",
    "4. 右侧边缘按钮",
    "4. Boton dò bordo drito"
  ],
  [
    "Sul bordo destro della mappa trovi un gruppo di pulsanti dedicati alla visualizzazione dei diversi tipi di contenuti. Questi pulsanti permettono di scegliere rapidamente ciò che vuoi vedere sulla mappa.",
    "Along the right edge of the map you’ll find a group of buttons for displaying different types of content. These buttons let you quickly choose what you want to see on the map.",
    "En el borde derecho del mapa encontrarás un grupo de botones dedicados a mostrar distintos tipos de contenidos. Estos botones permiten elegir rápidamente lo que quieres ver en el mapa.",
    "Sur le bord droit de la carte se trouve un groupe de boutons permettant d’afficher différents types de contenus. Ces boutons permettent de choisir rapidement ce que vous souhaitez voir sur la carte.",
    "على الحافة اليمنى من الخريطة توجد مجموعة أزرار مخصصة لعرض أنواع مختلفة من المحتوى. تتيح لك هذه الأزرار اختيار ما تريد رؤيته على الخريطة بسرعة.",
    "Вдоль правого края карты находится группа кнопок для отображения разных типов содержимого. Они позволяют быстро выбрать, что именно показывать на карте.",
    "地图右侧边缘有一组用于显示不同类型内容的按钮。通过这些按钮，你可以快速选择希望在地图上看到的内容。",
    "In sciô bordo drito da mappa gh’é un gruppo de boton pe mostrâ diversi tipi de contegnui. Sti boton permettan de çerne fito quello che ti veu vedde in sciâ mappa."
  ],
  [
    "Selezionando una categoria puoi accedere alle relative sottocategorie oppure attivare e disattivare i contenuti disponibili.",
    "Selecting a category lets you access its subcategories or enable and disable available content.",
    "Al seleccionar una categoría puedes acceder a sus subcategorías o activar y desactivar los contenidos disponibles.",
    "En sélectionnant une catégorie, vous pouvez accéder à ses sous-catégories ou activer et désactiver les contenus disponibles.",
    "عند اختيار فئة يمكنك الوصول إلى فئاتها الفرعية أو تفعيل المحتوى المتاح وإيقافه.",
    "При выборе категории можно открыть её подкатегории или включить и выключить доступное содержимое.",
    "选择一个分类后，可以进入相应子分类，或开启和关闭可用内容。",
    "Çernendo unna categoria ti peu intrâ inte seu sottocategorie ò attivâ e disattivâ i contegnui disponibili."
  ],
  [
    "Permette di visualizzare sulla mappa i luoghi che hai precedentemente salvato tra i tuoi Preferiti. È utile per ritrovare rapidamente i punti che ti interessano senza doverli cercare nuovamente.",
    "It lets you display on the map places you previously saved as Favourites. It is useful for quickly finding points you are interested in without having to search for them again.",
    "Permite mostrar en el mapa los lugares que has guardado anteriormente en Favoritos. Es útil para volver a encontrar rápidamente los puntos que te interesan sin tener que buscarlos de nuevo.",
    "Elle permet d’afficher sur la carte les lieux que vous avez précédemment enregistrés dans vos Favoris. Cela permet de retrouver rapidement les points qui vous intéressent sans devoir les rechercher à nouveau.",
    "تتيح عرض الأماكن التي حفظتها سابقاً في المفضلة على الخريطة. وهي مفيدة للعثور بسرعة على النقاط التي تهمك دون البحث عنها من جديد.",
    "Позволяет показать на карте места, ранее сохранённые в Избранном. Это удобно, чтобы быстро вернуться к интересующим точкам, не выполняя новый поиск.",
    "可在地图上显示你之前保存到收藏中的地点，方便快速找回感兴趣的点位，无需再次搜索。",
    "O permette de mostrâ in sciâ mappa i leughi che t’æ za sarvou inti Preferii. O l’é utile pe ritrovâ fito i ponti che t’interessan sensa çercâli torna."
  ],
  [
    "Raccoglie i principali sistemi di trasporto disponibili a Genova. Puoi attivare soltanto ciò che ti interessa per mantenere la mappa più semplice e leggibile.",
    "It brings together the main transport systems available in Genoa. You can enable only what interests you to keep the map simpler and easier to read.",
    "Reúne los principales sistemas de transporte disponibles en Génova. Puedes activar solo lo que te interese para mantener el mapa más sencillo y legible.",
    "Elle regroupe les principaux systèmes de transport disponibles à Gênes. Vous pouvez n’activer que ce qui vous intéresse afin de garder la carte plus simple et plus lisible.",
    "يجمع أهم أنظمة النقل المتاحة في جنوة. يمكنك تفعيل ما يهمك فقط للحفاظ على خريطة أبسط وأسهل قراءة.",
    "Здесь собраны основные виды транспорта в Генуе. Можно включить только нужное, чтобы карта оставалась простой и читаемой.",
    "这里汇集了热那亚的主要交通方式。你可以只开启感兴趣的项目，让地图保持简洁易读。",
    "A mette asseme i prinçipæ sistemi de trasporto disponibili a Zena. Ti peu attivâ solo quello che t’interessa pe tegnî a mappa ciù sempliçe e lezibile."
  ],
  [
    "La sezione dedicata al passato raccoglie numerosi contenuti storici di Genova. Utilizzando le sottocategorie puoi decidere quali elementi mostrare sulla mappa.",
    "The History section brings together a wide range of historical content about Genoa. Using the subcategories, you can choose which elements to display on the map.",
    "La sección dedicada al pasado reúne numerosos contenidos históricos de Génova. Mediante las subcategorías puedes decidir qué elementos mostrar en el mapa.",
    "La section consacrée au passé regroupe de nombreux contenus historiques sur Gênes. Grâce aux sous-catégories, vous pouvez choisir les éléments à afficher sur la carte.",
    "يجمع قسم الماضي العديد من المحتويات التاريخية عن جنوة. باستخدام الفئات الفرعية يمكنك اختيار العناصر التي تريد عرضها على الخريطة.",
    "Раздел, посвящённый прошлому, объединяет множество исторических материалов о Генуе. С помощью подкатегорий можно выбрать, что отображать на карте.",
    "“历史”部分汇集了大量热那亚历史内容。通过子分类，你可以决定在地图上显示哪些元素。",
    "A seçion dedicâ a-o passou a mette asseme tanti contegnui storichi de Zena. Co-e sottocategorie ti peu çerne quali elementi mostrâ in sciâ mappa."
  ],
  [
    "Forti.",
    "Forts.",
    "Fortalezas.",
    "Forts.",
    "الحصون.",
    "Форты.",
    "堡垒。",
    "Forti."
  ],
  [
    "Musei.",
    "Museums.",
    "Museos.",
    "Musées.",
    "المتاحف.",
    "Музеи.",
    "博物馆。",
    "Muzei."
  ],
  [
    "Chiese.",
    "Churches.",
    "Iglesias.",
    "Églises.",
    "الكنائس.",
    "Церкви.",
    "教堂。",
    "Gexe."
  ],
  [
    "Palazzi e ville.",
    "Palaces and villas.",
    "Palacios y villas.",
    "Palais et villas.",
    "القصور والفيلات.",
    "Дворцы и виллы.",
    "宫殿和别墅。",
    "Palaçi e ville."
  ],
  [
    "Mura storiche.",
    "Historic walls.",
    "Murallas históricas.",
    "Remparts historiques.",
    "الأسوار التاريخية.",
    "Исторические стены.",
    "历史城墙。",
    "Mûage storiche."
  ],
  [
    "Acquedotti.",
    "Aqueducts.",
    "Acueductos.",
    "Aqueducs.",
    "القنوات المائية.",
    "Акведуки.",
    "输水渠。",
    "Acquedotti."
  ],
  [
    "Contenuti storici e multimediali.",
    "Historical and multimedia content.",
    "Contenidos históricos y multimedia.",
    "Contenus historiques et multimédias.",
    "محتوى تاريخي ومتعدد الوسائط.",
    "Исторические и мультимедийные материалы.",
    "历史和多媒体内容。",
    "Contegnui storichi e multimedia."
  ],
  [
    "Luoghi e intrattenimento",
    "Places and entertainment",
    "Lugares y entretenimiento",
    "Lieux et divertissement",
    "الأماكن والترفيه",
    "Места и развлечения",
    "地点与娱乐",
    "Leughi e divertimento"
  ],
  [
    "Permette di visualizzare luoghi dedicati alla cultura, al tempo libero e alle attività in città.",
    "It lets you display places dedicated to culture, leisure and activities in the city.",
    "Permite mostrar lugares dedicados a la cultura, el ocio y las actividades de la ciudad.",
    "Elle permet d’afficher des lieux consacrés à la culture, aux loisirs et aux activités dans la ville.",
    "يتيح عرض أماكن مخصصة للثقافة ووقت الفراغ والأنشطة في المدينة.",
    "Позволяет отображать места, связанные с культурой, отдыхом и городскими занятиями.",
    "可用于显示与文化、休闲和城市活动有关的地点。",
    "O permette de vedde leughi dedicæ a-a cultua, a-o tempo libero e a-e attivitæ inta çittæ."
  ],
  [
    "Mostre.",
    "Exhibitions.",
    "Exposiciones.",
    "Expositions.",
    "المعارض.",
    "Выставки.",
    "展览。",
    "Mostre."
  ],
  [
    "Teatri.",
    "Theatres.",
    "Teatros.",
    "Théâtres.",
    "المسارح.",
    "Театры.",
    "剧院。",
    "Teatri."
  ],
  [
    "Cinema.",
    "Cinemas.",
    "Cines.",
    "Cinémas.",
    "دور السينما.",
    "Кинотеатры.",
    "电影院。",
    "Cinema."
  ],
  [
    "Parchi e piazze.",
    "Parks and squares.",
    "Parques y plazas.",
    "Parcs et places.",
    "الحدائق والساحات.",
    "Парки и площади.",
    "公园和广场。",
    "Parchi e ciassæ."
  ],
  [
    "Sport.",
    "Sport.",
    "Deporte.",
    "Sport.",
    "الرياضة.",
    "Спорт.",
    "体育。",
    "Sport."
  ],
  [
    "Permette di mostrare sulla mappa attività e strutture dedicate alla ristorazione e al soggiorno.",
    "It lets you display food, drink and accommodation businesses on the map.",
    "Permite mostrar en el mapa actividades y estructuras dedicadas a la restauración y al alojamiento.",
    "Elle permet d’afficher sur la carte des établissements de restauration et d’hébergement.",
    "يتيح عرض أنشطة ومرافق الطعام والإقامة على الخريطة.",
    "Позволяет отображать на карте заведения питания и места проживания.",
    "可在地图上显示餐饮和住宿相关场所。",
    "O permette de mostrâ in sciâ mappa attivitæ e struttue pe mangiâ e dormî."
  ],
  [
    "Percorsi",
    "Routes",
    "Recorridos",
    "Itinéraires",
    "المسارات",
    "Маршруты",
    "路线",
    "Percorsi"
  ],
  [
    "Permette di accedere ai percorsi disponibili e di visualizzarli sulla mappa.",
    "It lets you access available routes and display them on the map.",
    "Permite acceder a los recorridos disponibles y mostrarlos en el mapa.",
    "Elle permet d’accéder aux itinéraires disponibles et de les afficher sur la carte.",
    "يتيح الوصول إلى المسارات المتاحة وعرضها على الخريطة.",
    "Позволяет открыть доступные маршруты и показать их на карте.",
    "可进入已有路线并将其显示在地图上。",
    "O permette d’intrâ inti percorsi disponibili e de mostrâli in sciâ mappa."
  ],
  [
    "Un percorso può essere composto da diversi punti e da un itinerario che li collega. Puoi utilizzare i percorsi proposti da Genova mApp oppure, attraverso il Taccuino, creare e organizzare i tuoi itinerari personali.",
    "A route can consist of several points and an itinerary connecting them. You can use routes suggested by Genova mApp or, through the Notebook, create and organise your own itineraries.",
    "Un recorrido puede estar formado por varios puntos y por un itinerario que los conecta. Puedes utilizar los recorridos propuestos por Genova mApp o, a través del Cuaderno, crear y organizar tus propios itinerarios.",
    "Un itinéraire peut être composé de plusieurs points et d’un parcours qui les relie. Vous pouvez utiliser les itinéraires proposés par Genova mApp ou, grâce au Carnet, créer et organiser vos propres parcours.",
    "قد يتكون المسار من عدة نقاط ومن خط سير يربط بينها. يمكنك استخدام المسارات المقترحة من Genova mApp أو إنشاء مساراتك الشخصية وتنظيمها من خلال دفتر الملاحظات.",
    "Маршрут может состоять из нескольких точек и пути, который их соединяет. Можно использовать маршруты Genova mApp или создавать и организовывать собственные через Блокнот.",
    "一条路线可以由多个点位及连接它们的行程组成。你可以使用 Genova mApp 推荐的路线，也可以通过记事本创建和整理自己的路线。",
    "Un percorso o peu avei ciù ponti e un itinerario che i collega. Ti peu adêuviâ i percorsi propoști da Genova mApp ò, co-o Taccuin, creâ e organizâ i teu itinerai personæ."
  ],
  [
    "5. Gli strumenti della mappa",
    "5. Map tools",
    "5. Herramientas del mapa",
    "5. Les outils de la carte",
    "5. أدوات الخريطة",
    "5. Инструменты карты",
    "5. 地图工具",
    "5. I strumenti da mappa"
  ],
  [
    "Nella parte inferiore dello schermo trovi diversi strumenti utili durante l’esplorazione della mappa.",
    "At the bottom of the screen you’ll find several useful tools for exploring the map.",
    "En la parte inferior de la pantalla encontrarás varias herramientas útiles durante la exploración del mapa.",
    "En bas de l’écran se trouvent plusieurs outils utiles pour explorer la carte.",
    "في أسفل الشاشة توجد عدة أدوات مفيدة أثناء استكشاف الخريطة.",
    "В нижней части экрана находятся полезные инструменты для работы с картой.",
    "屏幕底部有多种用于浏览地图的实用工具。",
    "Inta parte de sotto do schermo ti trêuvi diversi strumenti utili quande ti esplori a mappa."
  ],
  [
    "Strumenti in basso al centro",
    "Tools at the bottom centre",
    "Herramientas en la parte inferior central",
    "Outils en bas au centre",
    "الأدوات في الأسفل بالوسط",
    "Инструменты внизу по центру",
    "底部中央工具",
    "Strumenti in basso a-o centro"
  ],
  [
    "Il comando dedicato ai Punti QR permette di mostrare o nascondere sulla mappa i punti collegati ai contenuti QR di Genova mApp. Toccando un punto puoi accedere ai relativi contenuti.",
    "The QR Points command lets you show or hide on the map the points linked to Genova mApp QR content. Tap a point to access its content.",
    "El control de Puntos QR permite mostrar u ocultar en el mapa los puntos vinculados a los contenidos QR de Genova mApp. Toca un punto para acceder a sus contenidos.",
    "La commande Points QR permet d’afficher ou de masquer sur la carte les points liés aux contenus QR de Genova mApp. Touchez un point pour accéder à son contenu.",
    "يتيح أمر نقاط QR إظهار أو إخفاء النقاط المرتبطة بمحتوى QR في Genova mApp على الخريطة. اضغط على نقطة للوصول إلى محتواها.",
    "Команда QR-точки позволяет показывать или скрывать на карте точки, связанные с QR-материалами Genova mApp. Нажмите на точку, чтобы открыть её содержимое.",
    "QR 点位按钮可在地图上显示或隐藏与 Genova mApp QR 内容相关的点位。轻触点位即可访问相应内容。",
    "O comando Ponti QR o permette de mostrâ ò asconde in sciâ mappa i ponti ligæ a-i contegnui QR de Genova mApp. Tocca un ponto pe intrâ inti seu contegnui."
  ],
  [
    "Sono qui / GPS",
    "I’m here / GPS",
    "Estoy aquí / GPS",
    "Je suis ici / GPS",
    "أنا هنا / GPS",
    "Я здесь / GPS",
    "我在这里 / GPS",
    "Son chi / GPS"
  ],
  [
    "Questo comando utilizza, quando autorizzato, la posizione fornita dal dispositivo per mostrarti dove ti trovi sulla mappa.",
    "When authorised, this command uses the location provided by your device to show where you are on the map.",
    "Cuando está autorizado, este control utiliza la ubicación proporcionada por el dispositivo para mostrarte dónde te encuentras en el mapa.",
    "Lorsque vous l’autorisez, cette commande utilise la position fournie par votre appareil pour vous montrer où vous vous trouvez sur la carte.",
    "عند السماح بذلك، يستخدم هذا الأمر الموقع الذي يوفره جهازك لإظهار مكانك على الخريطة.",
    "С разрешения пользователя эта команда использует местоположение, предоставленное устройством, чтобы показать ваше положение на карте.",
    "获得授权后，此功能会使用设备提供的位置，在地图上显示你当前所在位置。",
    "Quande ti dai o permesso, sto comando o adêuva a posiçion fornîa dò dispoxitivo pe fâte vedde donde ti sei in sciâ mappa."
  ],
  [
    "Può essere utile mentre visiti la città per confrontare la tua posizione con i luoghi e i percorsi presenti in Genova mApp. La precisione dipende dal dispositivo, dal segnale disponibile e dalle autorizzazioni concesse.",
    "It can be useful while visiting the city to compare your position with places and routes in Genova mApp. Accuracy depends on the device, available signal and permissions granted.",
    "Puede ser útil mientras visitas la ciudad para comparar tu posición con los lugares y recorridos de Genova mApp. La precisión depende del dispositivo, de la señal disponible y de los permisos concedidos.",
    "Elle peut être utile pendant votre visite pour comparer votre position avec les lieux et itinéraires de Genova mApp. La précision dépend de l’appareil, du signal disponible et des autorisations accordées.",
    "يمكن أن يكون مفيداً أثناء زيارة المدينة لمقارنة موقعك بالأماكن والمسارات في Genova mApp. تعتمد الدقة على الجهاز والإشارة المتاحة والأذونات الممنوحة.",
    "Это удобно во время прогулки по городу, чтобы сопоставлять своё положение с местами и маршрутами Genova mApp. Точность зависит от устройства, сигнала и предоставленных разрешений.",
    "游览城市时，可用它将自己的位置与 Genova mApp 中的地点和路线进行比较。定位精度取决于设备、可用信号以及授予的权限。",
    "O peu ese utile quande ti vixiti a çittæ pe confrontâ a teu posiçion co-i leughi e i percorsi de Genova mApp. A preçixion a dipende dò dispoxitivo, dò segnale e di permissi dæti."
  ],
  [
    "Scanner QR",
    "QR Scanner",
    "Escáner QR",
    "Scanner QR",
    "ماسح QR",
    "QR-сканер",
    "QR 扫描器",
    "Scanner QR"
  ],
  [
    "Lo Scanner QR permette di leggere i QR Code compatibili utilizzando la fotocamera del dispositivo. Quando richiesto, sarà necessario autorizzare l’accesso alla fotocamera.",
    "The QR Scanner lets you read compatible QR Codes using your device’s camera. When requested, you will need to allow camera access.",
    "El Escáner QR permite leer códigos QR compatibles utilizando la cámara del dispositivo. Cuando se solicite, será necesario autorizar el acceso a la cámara.",
    "Le Scanner QR permet de lire des QR Codes compatibles à l’aide de la caméra de l’appareil. Lorsque cela est demandé, vous devrez autoriser l’accès à la caméra.",
    "يتيح ماسح QR قراءة رموز QR المتوافقة باستخدام كاميرا الجهاز. عند الطلب، ستحتاج إلى السماح بالوصول إلى الكاميرا.",
    "QR-сканер позволяет считывать совместимые QR-коды с помощью камеры устройства. При запросе потребуется разрешить доступ к камере.",
    "QR 扫描器可使用设备摄像头读取兼容的二维码。系统要求时，需要授权访问摄像头。",
    "O Scanner QR o permette de leze i QR Code compatibili co-a camera dò dispoxitivo. Quande richiesto, ti devi autorizâ l’aceso a-a camera."
  ],
  [
    "Dopo la scansione, Genova mApp può aprire direttamente il contenuto associato al QR Code.",
    "After scanning, Genova mApp can open the content associated with the QR Code directly.",
    "Después del escaneo, Genova mApp puede abrir directamente el contenido asociado al código QR.",
    "Après la numérisation, Genova mApp peut ouvrir directement le contenu associé au QR Code.",
    "بعد المسح، يمكن لـ Genova mApp فتح المحتوى المرتبط برمز QR مباشرة.",
    "После сканирования Genova mApp может сразу открыть материал, связанный с QR-кодом.",
    "扫描后，Genova mApp 可以直接打开与二维码关联的内容。",
    "Dòppo a scanscion, Genova mApp a peu arvî direttamente o contegnuo associòu a-o QR Code."
  ],
  [
    "Strumenti in basso a destra",
    "Tools at the bottom right",
    "Herramientas en la parte inferior derecha",
    "Outils en bas à droite",
    "الأدوات في الأسفل إلى اليمين",
    "Инструменты внизу справа",
    "右下角工具",
    "Strumenti in basso a man drita"
  ],
  [
    "Zoom + e −",
    "Zoom + and −",
    "Zoom + y −",
    "Zoom + et −",
    "التكبير + و−",
    "Масштаб + и −",
    "缩放 + 和 −",
    "Zoom + e −"
  ],
  [
    "I pulsanti di zoom permettono di ingrandire o ridurre rapidamente la visualizzazione della mappa. Puoi ottenere lo stesso risultato anche utilizzando i normali gesti dello schermo o i controlli del mouse, quando disponibili.",
    "The zoom buttons let you quickly enlarge or reduce the map view. You can achieve the same result with normal screen gestures or mouse controls, when available.",
    "Los botones de zoom permiten ampliar o reducir rápidamente la vista del mapa. Puedes obtener el mismo resultado utilizando los gestos habituales de la pantalla o los controles del ratón, cuando estén disponibles.",
    "Les boutons de zoom permettent d’agrandir ou de réduire rapidement la vue de la carte. Vous pouvez obtenir le même résultat avec les gestes habituels de l’écran ou les commandes de la souris, lorsqu’elles sont disponibles.",
    "تتيح أزرار التكبير تكبير أو تصغير عرض الخريطة بسرعة. ويمكنك الحصول على النتيجة نفسها باستخدام إيماءات الشاشة المعتادة أو عناصر تحكم الفأرة عند توفرها.",
    "Кнопки масштаба позволяют быстро приблизить или отдалить карту. То же самое можно сделать обычными жестами на экране или с помощью мыши, если это доступно.",
    "缩放按钮可快速放大或缩小地图视图。如设备支持，也可以使用常规触控手势或鼠标控制获得同样效果。",
    "I boton de zoom permettan d’ingrandî ò diminuî fito a vista da mappa. Ti peu ottenni o mæximo risultato co-i gesti normali do schermo ò co-i controlli dò mouse, quande disponibili."
  ],
  [
    "Vista iniziale",
    "Initial view",
    "Vista inicial",
    "Vue initiale",
    "العرض الأولي",
    "Начальный вид",
    "初始视图",
    "Vista iniçiâ"
  ],
  [
    "Questo comando riporta rapidamente la mappa alla visualizzazione iniziale prevista da Genova mApp. È utile quando ti sei spostato molto sulla mappa e vuoi tornare alla vista generale della città.",
    "This command quickly returns the map to Genova mApp’s initial view. It is useful when you have moved far around the map and want to return to the general city view.",
    "Este control devuelve rápidamente el mapa a la vista inicial prevista por Genova mApp. Es útil cuando te has desplazado mucho por el mapa y quieres volver a la vista general de la ciudad.",
    "Cette commande ramène rapidement la carte à la vue initiale prévue par Genova mApp. Elle est utile lorsque vous vous êtes beaucoup déplacé sur la carte et souhaitez revenir à la vue générale de la ville.",
    "يعيد هذا الأمر الخريطة بسرعة إلى العرض الأولي المحدد في Genova mApp. وهو مفيد عندما تتحرك كثيراً على الخريطة وتريد العودة إلى العرض العام للمدينة.",
    "Эта команда быстро возвращает карту к начальному виду Genova mApp. Она удобна, если вы сильно переместились по карте и хотите вернуться к общему виду города.",
    "此功能会快速将地图恢复到 Genova mApp 的初始视图。当你在地图上移动较远后，希望返回城市总体视图时很有用。",
    "Sto comando o riporta fito a mappa a-a vista iniçiâ prevista da Genova mApp. O l’é utile se ti t’æ mesciòu tanto e ti veu tornâ a-a vista generâ da çittæ."
  ],
  [
    "Vista e rotazione 3D",
    "3D view and rotation",
    "Vista y rotación 3D",
    "Vue et rotation 3D",
    "العرض والدوران ثلاثي الأبعاد",
    "3D-вид и вращение",
    "3D 视图与旋转",
    "Vista e rotaçion 3D"
  ],
  [
    "Quando la visualizzazione utilizzata lo consente, Genova mApp permette di modificare l’inclinazione e l’orientamento della mappa. La vista tridimensionale può aiutare a comprendere meglio il territorio, le alture e la disposizione urbana di Genova.",
    "When the current view allows it, Genova mApp lets you change the tilt and orientation of the map. The 3D view can help you better understand Genoa’s terrain, hills and urban layout.",
    "Cuando la visualización utilizada lo permite, Genova mApp permite modificar la inclinación y la orientación del mapa. La vista tridimensional puede ayudarte a comprender mejor el territorio, las alturas y la disposición urbana de Génova.",
    "Lorsque la vue utilisée le permet, Genova mApp permet de modifier l’inclinaison et l’orientation de la carte. La vue en trois dimensions peut aider à mieux comprendre le territoire, les hauteurs et l’organisation urbaine de Gênes.",
    "عندما يسمح نوع العرض، يتيح Genova mApp تغيير ميل الخريطة واتجاهها. وقد يساعد العرض ثلاثي الأبعاد على فهم تضاريس جنوة ومرتفعاتها وتنظيمها العمراني بشكل أفضل.",
    "Если текущий режим это поддерживает, Genova mApp позволяет менять наклон и ориентацию карты. Трёхмерный вид помогает лучше понять рельеф, высоты и городскую структуру Генуи.",
    "当当前视图支持时，Genova mApp 可调整地图的倾斜角度和方向。三维视图有助于更好地理解热那亚的地形、高地和城市布局。",
    "Quande a vista o permette, Genova mApp a fa cangiâ l’inclinaçion e l’orientamento da mappa. A vista 3D a peu agiutâ a capî megio o territöio, e altue e a disposiçion urbana de Zena."
  ],
  [
    "Joystick",
    "Joystick",
    "Joystick",
    "Joystick",
    "عصا التحكم",
    "Джойстик",
    "摇杆",
    "Joystick"
  ],
  [
    "Quando disponibile, il joystick permette di controllare in maniera più immediata alcuni movimenti e orientamenti della visualizzazione della mappa. Le funzioni disponibili possono variare in base alla modalità di visualizzazione utilizzata.",
    "When available, the joystick provides more immediate control over certain movements and orientations of the map view. Available functions may vary depending on the viewing mode.",
    "Cuando está disponible, el joystick permite controlar de forma más inmediata algunos movimientos y orientaciones de la vista del mapa. Las funciones disponibles pueden variar según el modo de visualización utilizado.",
    "Lorsqu’il est disponible, le joystick permet de contrôler plus directement certains mouvements et orientations de la vue de la carte. Les fonctions disponibles peuvent varier selon le mode d’affichage utilisé.",
    "عند توفرها، تتيح عصا التحكم إدارة بعض حركات واتجاهات عرض الخريطة بشكل أكثر مباشرة. وقد تختلف الوظائف بحسب وضع العرض المستخدم.",
    "Когда он доступен, джойстик позволяет быстрее управлять некоторыми перемещениями и ориентацией карты. Набор функций может зависеть от режима отображения.",
    "当此功能可用时，摇杆可更直接地控制地图视图的部分移动和方向。可用功能会根据视图模式而有所不同。",
    "Quande disponibile, o joystick o permette de controllâ ciù fito quarche movimento e orientamento da vista da mappa. E fonçioin disponibili peuan cangiâ a seconda da modalitæ de vista."
  ],
  [
    "6. Taccuino",
    "6. Notebook",
    "6. Cuaderno",
    "6. Carnet",
    "6. دفتر الملاحظات",
    "6. Блокнот",
    "6. 记事本",
    "6. Taccuin"
  ],
  [
    "Il Taccuino è lo spazio personale di Genova mApp. Puoi utilizzarlo per conservare i luoghi che ti interessano, organizzare percorsi e creare note.",
    "The Notebook is your personal space in Genova mApp. You can use it to keep places you are interested in, organise routes and create notes.",
    "El Cuaderno es el espacio personal de Genova mApp. Puedes utilizarlo para guardar los lugares que te interesan, organizar recorridos y crear notas.",
    "Le Carnet est votre espace personnel dans Genova mApp. Vous pouvez l’utiliser pour conserver les lieux qui vous intéressent, organiser des itinéraires et créer des notes.",
    "دفتر الملاحظات هو مساحتك الشخصية في Genova mApp. يمكنك استخدامه لحفظ الأماكن التي تهمك وتنظيم المسارات وإنشاء الملاحظات.",
    "Блокнот — ваше личное пространство в Genova mApp. В нём можно сохранять интересные места, организовывать маршруты и создавать заметки.",
    "记事本是你在 Genova mApp 中的个人空间。你可以用它保存感兴趣的地点、整理路线并创建笔记。",
    "O Taccuin o l’é o spaçio personale de Genova mApp. Ti peu adêuviâlo pe sarvâ i leughi che t’interessan, organizâ percorsi e creâ nòtte."
  ],
  [
    "In questo modo Genova mApp può diventare non soltanto uno strumento per esplorare la città, ma anche un supporto per organizzare la tua visita.",
    "This way, Genova mApp can be not only a tool for exploring the city, but also a way to organise your visit.",
    "De este modo, Genova mApp puede ser no solo una herramienta para explorar la ciudad, sino también un apoyo para organizar tu visita.",
    "Genova mApp peut ainsi devenir non seulement un outil pour explorer la ville, mais aussi une aide pour organiser votre visite.",
    "وبذلك يمكن أن يكون Genova mApp أداة لاستكشاف المدينة وأيضاً وسيلة للمساعدة في تنظيم زيارتك.",
    "Так Genova mApp становится не только инструментом для знакомства с городом, но и помощником в организации поездки.",
    "这样，Genova mApp 不仅是探索城市的工具，也可以帮助你规划行程。",
    "Coscì Genova mApp a peu ese no solo un strumento pe esplorâ a çittæ, ma anche un agiutto pe organizâ a teu vixita."
  ],
  [
    "Quando trovi un luogo che ti interessa puoi salvarlo tra i Preferiti. I luoghi salvati possono essere consultati successivamente dal Taccuino e mostrati nuovamente sulla mappa.",
    "When you find a place you’re interested in, you can save it to Favourites. Saved places can later be viewed in the Notebook and displayed again on the map.",
    "Cuando encuentres un lugar que te interese, puedes guardarlo en Favoritos. Los lugares guardados pueden consultarse posteriormente desde el Cuaderno y volver a mostrarse en el mapa.",
    "Lorsque vous trouvez un lieu qui vous intéresse, vous pouvez l’enregistrer dans vos Favoris. Les lieux enregistrés peuvent ensuite être consultés dans le Carnet et affichés à nouveau sur la carte.",
    "عندما تجد مكاناً يهمك يمكنك حفظه في المفضلة. ويمكن لاحقاً عرض الأماكن المحفوظة من دفتر الملاحظات وإظهارها من جديد على الخريطة.",
    "Найдя интересное место, можно сохранить его в Избранное. Сохранённые места затем доступны в Блокноте и могут снова отображаться на карте.",
    "发现感兴趣的地点后，可以将其保存到收藏。保存的地点之后可在记事本中查看，也可以重新显示在地图上。",
    "Quande ti trêuvi un leugo che t’interessa ti peu sarvâlo inti Preferii. I leughi sarvæ se peu consultâ dòppo dò Taccuin e mostrâ torna in sciâ mappa."
  ],
  [
    "Puoi utilizzare i Preferiti, per esempio, per preparare in anticipo un elenco di luoghi che desideri visitare.",
    "You can use Favourites, for example, to prepare in advance a list of places you want to visit.",
    "Puedes utilizar Favoritos, por ejemplo, para preparar con antelación una lista de lugares que deseas visitar.",
    "Vous pouvez par exemple utiliser les Favoris pour préparer à l’avance une liste des lieux que vous souhaitez visiter.",
    "يمكنك استخدام المفضلة، مثلاً، لإعداد قائمة مسبقة بالأماكن التي ترغب في زيارتها.",
    "Например, Избранное удобно использовать для заранее подготовленного списка мест, которые вы хотите посетить.",
    "例如，你可以使用收藏功能提前准备想要参观的地点清单。",
    "Ti peu adêuviâ i Preferii, pe exempio, pe preparâ prima unna lista de leughi che ti veu vixitâ."
  ],
  [
    "La sezione Percorsi permette di organizzare diversi luoghi all’interno di un itinerario personale. Puoi creare un nuovo percorso, assegnargli un nome e aggiungere i punti che desideri visitare.",
    "The Routes section lets you organise different places into a personal itinerary. You can create a new route, give it a name and add the points you want to visit.",
    "La sección Recorridos permite organizar distintos lugares dentro de un itinerario personal. Puedes crear un nuevo recorrido, asignarle un nombre y añadir los puntos que quieras visitar.",
    "La section Itinéraires permet d’organiser plusieurs lieux dans un parcours personnel. Vous pouvez créer un nouvel itinéraire, lui donner un nom et ajouter les points que vous souhaitez visiter.",
    "يتيح قسم المسارات تنظيم عدة أماكن ضمن خط سير شخصي. يمكنك إنشاء مسار جديد وتسميته وإضافة النقاط التي تريد زيارتها.",
    "Раздел Маршруты позволяет объединять разные места в собственный маршрут. Можно создать новый маршрут, дать ему название и добавить точки, которые вы хотите посетить.",
    "路线部分可将多个地点整理成个人行程。你可以新建路线、为其命名并加入想要参观的点位。",
    "A seçion Percorsi a permette d’organizâ diversi leughi inte un itinerario personale. Ti peu creâ un neuvo percorso, daghe un nomme e azzonzeghe i ponti che ti veu vixitâ."
  ],
  [
    "Aprire un percorso.",
    "Open a route.",
    "Abrir un recorrido.",
    "Ouvrir un itinéraire.",
    "فتح مسار.",
    "Открыть маршрут.",
    "打开路线。",
    "Arvî un percorso."
  ],
  [
    "Visualizzarlo sulla mappa.",
    "Display it on the map.",
    "Mostrarlo en el mapa.",
    "L’afficher sur la carte.",
    "عرضه على الخريطة.",
    "Показать его на карте.",
    "在地图上显示。",
    "Mostrâlo in sciâ mappa."
  ],
  [
    "Modificarne i contenuti.",
    "Edit its contents.",
    "Modificar sus contenidos.",
    "Modifier son contenu.",
    "تعديل محتواه.",
    "Изменить содержимое.",
    "修改内容。",
    "Modificâ i contegnui."
  ],
  [
    "Duplicarlo.",
    "Duplicate it.",
    "Duplicarlo.",
    "Le dupliquer.",
    "إنشاء نسخة منه.",
    "Создать копию.",
    "复制路线。",
    "Duplicâlo."
  ],
  [
    "Eliminarlo quando non serve più.",
    "Delete it when you no longer need it.",
    "Eliminarlo cuando ya no lo necesites.",
    "Le supprimer lorsqu’il ne vous sert plus.",
    "حذفه عندما لا تعود بحاجة إليه.",
    "Удалить, когда он больше не нужен.",
    "不再需要时删除。",
    "Scancelâlo quande no serve ciù."
  ],
  [
    "Questa funzione è particolarmente utile per preparare itinerari personalizzati attraverso Genova. Puoi, per esempio, creare un percorso dedicato ai palazzi storici, ai musei, ai forti oppure semplicemente ai luoghi che vuoi visitare durante una giornata.",
    "This feature is especially useful for preparing personalised itineraries around Genoa. For example, you can create a route dedicated to historic palaces, museums, forts, or simply the places you want to visit during a day.",
    "Esta función es especialmente útil para preparar itinerarios personalizados por Génova. Por ejemplo, puedes crear un recorrido dedicado a palacios históricos, museos, fortalezas o simplemente a los lugares que quieres visitar durante un día.",
    "Cette fonction est particulièrement utile pour préparer des itinéraires personnalisés à travers Gênes. Vous pouvez par exemple créer un parcours consacré aux palais historiques, aux musées, aux forts ou simplement aux lieux que vous souhaitez visiter au cours d’une journée.",
    "هذه الوظيفة مفيدة خصوصاً لإعداد جولات شخصية في جنوة. يمكنك مثلاً إنشاء مسار للقصور التاريخية أو المتاحف أو الحصون أو ببساطة للأماكن التي تريد زيارتها خلال يوم.",
    "Эта функция особенно удобна для подготовки собственных маршрутов по Генуе. Например, можно создать маршрут по историческим дворцам, музеям, фортам или просто по местам, которые вы хотите посетить за день.",
    "此功能特别适合规划个性化的热那亚行程。例如，你可以创建一条历史宫殿、博物馆、堡垒主题路线，或只是加入一天中想去的地点。",
    "Sta fonçion a l’é particolarmente utile pe preparâ itinerai personalizæ pe Zena. Ti peu, pe exempio, creâ un percorso dedicòu a-i palaçi storichi, a-i muzei, a-i forti ò sempliçemente a-i leughi che ti veu vixitâ inta giornâ."
  ],
  [
    "Note",
    "Notes",
    "Notas",
    "Notes",
    "الملاحظات",
    "Заметки",
    "笔记",
    "Nòtte"
  ],
  [
    "La sezione Note permette di conservare annotazioni personali. Puoi utilizzarla per ricordare informazioni, idee, luoghi da visitare o qualsiasi altro appunto utile durante l’utilizzo di Genova mApp.",
    "The Notes section lets you keep personal annotations. You can use it to remember information, ideas, places to visit or any other useful note while using Genova mApp.",
    "La sección Notas permite guardar anotaciones personales. Puedes utilizarla para recordar información, ideas, lugares que visitar o cualquier otro apunte útil mientras utilizas Genova mApp.",
    "La section Notes permet de conserver des annotations personnelles. Vous pouvez l’utiliser pour retenir des informations, des idées, des lieux à visiter ou toute autre note utile pendant l’utilisation de Genova mApp.",
    "يتيح قسم الملاحظات حفظ ملاحظات شخصية. يمكنك استخدامه لتذكر معلومات أو أفكار أو أماكن تريد زيارتها أو أي ملاحظة مفيدة أثناء استخدام Genova mApp.",
    "Раздел Заметки позволяет сохранять личные записи. Их можно использовать для информации, идей, мест к посещению и любых других полезных заметок при работе с Genova mApp.",
    "笔记部分用于保存个人记录。你可以用它记录信息、想法、想去的地点，或使用 Genova mApp 时需要记住的任何内容。",
    "A seçion Nòtte a permette de sarvâ annotaçioin personæ. Ti peu adêuviâla pe ricordâ informaçioin, idee, leughi da vixitâ ò quarche atro apponto utile quande ti adêuvi Genova mApp."
  ],
  [
    "Preferiti, percorsi e mappa",
    "Favourites, routes and map",
    "Favoritos, recorridos y mapa",
    "Favoris, itinéraires et carte",
    "المفضلة والمسارات والخريطة",
    "Избранное, маршруты и карта",
    "收藏、路线与地图",
    "Preferii, percorsi e mappa"
  ],
  [
    "Taccuino e mappa lavorano insieme. Quando richiesto puoi visualizzare sulla mappa i contenuti che hai salvato, ritrovando più facilmente luoghi e percorsi personali.",
    "The Notebook and map work together. When needed, you can display saved content on the map, making it easier to find your personal places and routes.",
    "El Cuaderno y el mapa trabajan juntos. Cuando sea necesario puedes mostrar en el mapa los contenidos que has guardado, encontrando más fácilmente tus lugares y recorridos personales.",
    "Le Carnet et la carte fonctionnent ensemble. Lorsque vous le souhaitez, vous pouvez afficher sur la carte les contenus enregistrés afin de retrouver plus facilement vos lieux et itinéraires personnels.",
    "يعمل دفتر الملاحظات والخريطة معاً. عند الحاجة يمكنك عرض المحتوى الذي حفظته على الخريطة لتجد أماكنك ومساراتك الشخصية بسهولة أكبر.",
    "Блокнот и карта работают вместе. При необходимости сохранённые материалы можно показать на карте, чтобы легче находить свои места и маршруты.",
    "记事本和地图可以协同使用。需要时，可将保存的内容显示在地图上，从而更方便地找到个人地点和路线。",
    "O Taccuin e a mappa travagian inseme. Quande serve ti peu mostrâ in sciâ mappa i contegnui sarvæ, pe ritrovâ ciù facilmente i teu leughi e percorsi personæ."
  ],
  [
    "Il Taccuino rimane quindi il punto di riferimento per organizzare ciò che hai scoperto attraverso Genova mApp.",
    "The Notebook therefore remains the reference point for organising what you have discovered through Genova mApp.",
    "El Cuaderno sigue siendo así el punto de referencia para organizar lo que has descubierto a través de Genova mApp.",
    "Le Carnet reste ainsi le point de référence pour organiser ce que vous avez découvert grâce à Genova mApp.",
    "يبقى دفتر الملاحظات نقطة المرجع لتنظيم ما اكتشفته عبر Genova mApp.",
    "Блокнот остаётся основным местом для организации того, что вы нашли с помощью Genova mApp.",
    "因此，记事本是整理你通过 Genova mApp 发现内容的重要入口。",
    "O Taccuin o resta coscì o ponto de riferimento pe organizâ quello che t’æ descovrîo con Genova mApp."
  ],
  [
    "7. Lingue e accessibilità",
    "7. Languages and accessibility",
    "7. Idiomas y accesibilidad",
    "7. Langues et accessibilité",
    "7. اللغات وإمكانية الوصول",
    "7. Языки и доступность",
    "7. 语言与无障碍",
    "7. Lengue e acessibilitæ"
  ],
  [
    "Genova mApp è progettata per essere utilizzata in più lingue e comprende alcune funzioni che permettono di adattare la lettura dei contenuti alle proprie esigenze.",
    "Genova mApp is designed to be used in multiple languages and includes features that let you adapt content reading to your needs.",
    "Genova mApp está diseñada para utilizarse en varios idiomas e incluye algunas funciones que permiten adaptar la lectura de los contenidos a tus necesidades.",
    "Genova mApp est conçue pour être utilisée dans plusieurs langues et comprend des fonctions permettant d’adapter la lecture des contenus à vos besoins.",
    "صُمم Genova mApp للاستخدام بعدة لغات ويشمل وظائف تساعد على تكييف قراءة المحتوى مع احتياجاتك.",
    "Genova mApp рассчитана на использование на нескольких языках и включает функции, позволяющие адаптировать чтение содержимого под ваши потребности.",
    "Genova mApp 支持多种语言，并提供一些功能以便根据个人需要调整内容阅读方式。",
    "Genova mApp a l’é progettâ pe ese adêuviâ in ciù lengue e a l’à fonçioin pe adattâ a letua di contegnui a-e teu exigençe."
  ],
  [
    "Cambiare lingua",
    "Changing language",
    "Cambiar idioma",
    "Changer de langue",
    "تغيير اللغة",
    "Смена языка",
    "切换语言",
    "Cangiâ lengua"
  ],
  [
    "Il pulsante Lingue, situato nella parte inferiore sinistra dell’interfaccia, permette di scegliere la lingua dell’app.",
    "The Languages button, located at the bottom left of the interface, lets you choose the app language.",
    "El botón Idiomas, situado en la parte inferior izquierda de la interfaz, permite elegir el idioma de la app.",
    "Le bouton Langues, situé en bas à gauche de l’interface, permet de choisir la langue de l’application.",
    "يتيح زر اللغات، الموجود في أسفل يسار الواجهة، اختيار لغة التطبيق.",
    "Кнопка Языки в нижней левой части интерфейса позволяет выбрать язык приложения.",
    "界面左下角的“语言”按钮可用于选择应用语言。",
    "O boton Lengue, in basso a mancin inta interfaccia, o permette de çerne a lengua de l’app."
  ],
  [
    "Italiano.",
    "Italian.",
    "Italiano.",
    "Italien.",
    "الإيطالية.",
    "Итальянский.",
    "意大利语。",
    "Italian."
  ],
  [
    "English.",
    "English.",
    "English.",
    "English.",
    "English.",
    "English.",
    "English.",
    "English."
  ],
  [
    "Español.",
    "Spanish.",
    "Español.",
    "Español.",
    "Español.",
    "Español.",
    "Español.",
    "Español."
  ],
  [
    "Français.",
    "French.",
    "Français.",
    "Français.",
    "Français.",
    "Français.",
    "Français.",
    "Français."
  ],
  [
    "العربية.",
    "Arabic.",
    "العربية.",
    "العربية.",
    "العربية.",
    "العربية.",
    "العربية.",
    "العربية."
  ],
  [
    "Русский.",
    "Russian.",
    "Русский.",
    "Русский.",
    "Русский.",
    "Русский.",
    "Русский.",
    "Русский."
  ],
  [
    "中文.",
    "Chinese.",
    "中文.",
    "中文.",
    "中文.",
    "中文.",
    "中文。",
    "中文."
  ],
  [
    "Ligure.",
    "Ligurian.",
    "Ligure.",
    "Ligure.",
    "Ligure.",
    "Ligure.",
    "Ligure.",
    "Ligure."
  ],
  [
    "Seleziona la lingua desiderata per modificare i contenuti disponibili.",
    "Select the language you want to change the available content.",
    "Selecciona el idioma deseado para cambiar los contenidos disponibles.",
    "Sélectionnez la langue souhaitée pour modifier les contenus disponibles.",
    "اختر اللغة المطلوبة لتغيير المحتوى المتاح.",
    "Выберите нужный язык, чтобы изменить доступное содержимое.",
    "选择所需语言即可更改可用内容的显示语言。",
    "Çerni a lengua che ti veu pe cangiâ i contegnui disponibili."
  ],
  [
    "Traduzione dei contenuti",
    "Content translation",
    "Traducción de los contenidos",
    "Traduction des contenus",
    "ترجمة المحتوى",
    "Перевод содержимого",
    "内容翻译",
    "Traduçion di contegnui"
  ],
  [
    "Il cambio della lingua viene applicato ai menu, ai comandi e ai contenuti per i quali è disponibile una traduzione.",
    "Changing language is applied to menus, controls and content for which a translation is available.",
    "El cambio de idioma se aplica a los menús, los controles y los contenidos para los que haya una traducción disponible.",
    "Le changement de langue s’applique aux menus, aux commandes et aux contenus pour lesquels une traduction est disponible.",
    "يُطبق تغيير اللغة على القوائم وعناصر التحكم والمحتوى الذي تتوفر له ترجمة.",
    "Смена языка применяется к меню, элементам управления и материалам, для которых доступен перевод.",
    "语言切换会应用于已有翻译的菜单、控制和内容。",
    "O cangiamento de lengua o s’applica a-i menu, a-i comandi e a-i contegnui pe-i quæ gh’é unna traduçion."
  ],
  [
    "Alcuni contenuti particolari o provenienti da fonti esterne potrebbero non essere disponibili immediatamente in tutte le lingue.",
    "Some special content or content from external sources may not be immediately available in every language.",
    "Algunos contenidos especiales o procedentes de fuentes externas podrían no estar disponibles inmediatamente en todos los idiomas.",
    "Certains contenus particuliers ou provenant de sources externes peuvent ne pas être immédiatement disponibles dans toutes les langues.",
    "قد لا يتوفر بعض المحتوى الخاص أو القادم من مصادر خارجية فوراً بجميع اللغات.",
    "Некоторые специальные материалы или материалы из внешних источников могут быть не сразу доступны на всех языках.",
    "某些特殊内容或来自外部来源的内容可能暂时无法提供全部语言版本。",
    "Quarche contegnuo particolare ò che vegn da fonti esterne o peu no ese subito disponibile inte tutte e lengue."
  ],
  [
    "Dimensione del testo",
    "Text size",
    "Tamaño del texto",
    "Taille du texte",
    "حجم النص",
    "Размер текста",
    "文字大小",
    "Grandezza do testo"
  ],
  [
    "Attraverso le Impostazioni puoi modificare la dimensione del testo scegliendo la soluzione più comoda per la lettura.",
    "In Settings you can change the text size by choosing the option that is most comfortable to read.",
    "Desde los Ajustes puedes cambiar el tamaño del texto eligiendo la opción que te resulte más cómoda para leer.",
    "Dans les Paramètres, vous pouvez modifier la taille du texte en choisissant l’option la plus confortable pour la lecture.",
    "من خلال الإعدادات يمكنك تغيير حجم النص واختيار الخيار الأكثر راحة للقراءة.",
    "В Настройках можно изменить размер текста, выбрав наиболее удобный вариант.",
    "你可以在设置中调整文字大小，选择最舒适的阅读方式。",
    "Inte Impostaçioin ti peu cangiâ a grandezza do testo çernendo quella ciù comoda da leze."
  ],
  [
    "Quando disponibili, puoi utilizzare le diverse dimensioni previste dall’app, per esempio Piccolo, Medio e Grande. La modifica permette di rendere più leggibili testi, descrizioni e altri elementi dell’interfaccia.",
    "When available, you can use the different sizes provided by the app, for example Small, Medium and Large. This makes text, descriptions and other interface elements easier to read.",
    "Cuando estén disponibles, puedes utilizar los distintos tamaños previstos por la app, por ejemplo Pequeño, Mediano y Grande. El cambio permite hacer más legibles los textos, las descripciones y otros elementos de la interfaz.",
    "Lorsqu’elles sont disponibles, vous pouvez utiliser les différentes tailles prévues par l’application, par exemple Petite, Moyenne et Grande. Cela permet de rendre les textes, descriptions et autres éléments de l’interface plus lisibles.",
    "عند توفرها، يمكنك استخدام الأحجام المختلفة التي يوفرها التطبيق، مثل صغير ومتوسط وكبير. ويساعد ذلك على جعل النصوص والأوصاف وعناصر الواجهة الأخرى أسهل قراءة.",
    "Когда они доступны, можно выбрать предусмотренные приложением размеры, например Маленький, Средний и Большой. Это делает текст, описания и другие элементы интерфейса более читаемыми.",
    "当相关选项可用时，可以选择应用提供的不同字号，例如小、中和大，从而提高文字、说明和其他界面元素的可读性。",
    "Quande son disponibili, ti peu adêuviâ e diverse grandezze previste da l’app, pe exempio Piccolo, Medio e Grande. O cangiamento o rende ciù lezibili testi, descriçioin e atri elementi de l’interfaccia."
  ],
  [
    "8. QR, multimedia ed eventi",
    "8. QR, multimedia and events",
    "8. QR, multimedia y eventos",
    "8. QR, multimédia et événements",
    "8. QR والوسائط المتعددة والفعاليات",
    "8. QR, мультимедиа и события",
    "8. QR、多媒体与活动",
    "8. QR, multimedia ed eventi"
  ],
  [
    "Genova mApp contiene diversi strumenti per scoprire la città anche attraverso fotografie, video, audio e contenuti interattivi.",
    "Genova mApp includes several tools for discovering the city through photographs, video, audio and interactive content.",
    "Genova mApp contiene varias herramientas para descubrir la ciudad también a través de fotografías, vídeo, audio y contenidos interactivos.",
    "Genova mApp comprend plusieurs outils permettant de découvrir la ville à travers des photographies, des vidéos, de l’audio et des contenus interactifs.",
    "يضم Genova mApp عدة أدوات لاكتشاف المدينة أيضاً عبر الصور والفيديو والصوت والمحتوى التفاعلي.",
    "Genova mApp содержит несколько инструментов для знакомства с городом через фотографии, видео, аудио и интерактивные материалы.",
    "Genova mApp 提供多种工具，让你通过照片、视频、音频和互动内容探索城市。",
    "Genova mApp a l’à diversi strumenti pe descovrî a çittæ anche con fotografie, video, audio e contegnui interattivi."
  ],
  [
    "I Punti QR collegano determinati luoghi della città a contenuti dedicati. Puoi visualizzarli sulla mappa e aprire il punto che ti interessa per accedere alle informazioni e ai contenuti disponibili.",
    "QR Points connect specific places in the city to dedicated content. You can display them on the map and open the point you are interested in to access available information and content.",
    "Los Puntos QR vinculan determinados lugares de la ciudad con contenidos específicos. Puedes mostrarlos en el mapa y abrir el punto que te interese para acceder a la información y los contenidos disponibles.",
    "Les Points QR relient certains lieux de la ville à des contenus dédiés. Vous pouvez les afficher sur la carte et ouvrir le point qui vous intéresse pour accéder aux informations et contenus disponibles.",
    "تربط نقاط QR أماكن محددة في المدينة بمحتوى مخصص. يمكنك عرضها على الخريطة وفتح النقطة التي تهمك للوصول إلى المعلومات والمحتوى المتاح.",
    "QR-точки связывают определённые места города со специальными материалами. Их можно показать на карте и открыть интересующую точку, чтобы увидеть доступную информацию и содержимое.",
    "QR 点位会将城市中的特定地点与专属内容连接起来。你可以在地图上显示这些点位，并打开感兴趣的点位查看相关信息和内容。",
    "I Ponti QR collegan certi leughi da çittæ a contegnui dedicæ. Ti peu mostrâli in sciâ mappa e arvî o ponto che t’interessa pe vedde informaçioin e contegnui disponibili."
  ],
  [
    "Alcuni QR Code possono essere presenti anche fisicamente sul territorio o all’interno di materiali collegati a Genova mApp.",
    "Some QR Codes may also be physically present around the city or in materials connected to Genova mApp.",
    "Algunos códigos QR también pueden estar presentes físicamente en la ciudad o dentro de materiales vinculados a Genova mApp.",
    "Certains QR Codes peuvent également être présents physiquement dans la ville ou dans des supports liés à Genova mApp.",
    "قد توجد بعض رموز QR فعلياً في المدينة أو داخل مواد مرتبطة بـ Genova mApp.",
    "Некоторые QR-коды могут также находиться непосредственно в городе или в материалах, связанных с Genova mApp.",
    "部分二维码也可能实际出现在城市中的地点，或出现在与 Genova mApp 相关的资料中。",
    "Quarche QR Code o peu ese presente anche pe davvero in çittæ ò inte materiali ligæ a Genova mApp."
  ],
  [
    "Genova ieri e oggi / Confronta",
    "Genoa then and now / Compare",
    "Génova ayer y hoy / Comparar",
    "Gênes hier et aujourd’hui / Comparer",
    "جنوة بالأمس واليوم / مقارنة",
    "Генуя вчера и сегодня / Сравнить",
    "热那亚今昔 / 对比",
    "Zena ieri e ancheu / Confronta"
  ],
  [
    "Alcuni contenuti permettono di confrontare Genova nel passato con la città di oggi. Attraverso fotografie storiche, immagini contemporanee e altri materiali puoi osservare come strade, piazze, edifici, quartieri e paesaggi siano cambiati nel tempo.",
    "Some content lets you compare Genoa in the past with the city today. Through historic photographs, contemporary images and other material, you can see how streets, squares, buildings, neighbourhoods and landscapes have changed over time.",
    "Algunos contenidos permiten comparar la Génova del pasado con la ciudad actual. A través de fotografías históricas, imágenes contemporáneas y otros materiales puedes observar cómo han cambiado con el tiempo las calles, plazas, edificios, barrios y paisajes.",
    "Certains contenus permettent de comparer la Gênes du passé avec la ville d’aujourd’hui. À travers des photographies historiques, des images contemporaines et d’autres documents, vous pouvez observer comment les rues, places, bâtiments, quartiers et paysages ont changé au fil du temps.",
    "تتيح بعض المحتويات مقارنة جنوة في الماضي بالمدينة اليوم. ومن خلال الصور التاريخية والصور المعاصرة والمواد الأخرى يمكنك ملاحظة كيف تغيرت الشوارع والساحات والمباني والأحياء والمناظر الطبيعية مع مرور الوقت.",
    "Некоторые материалы позволяют сравнивать Геную прошлого с современным городом. По историческим фотографиям, современным изображениям и другим материалам можно увидеть, как со временем менялись улицы, площади, здания, районы и пейзажи.",
    "部分内容可将过去的热那亚与今天的城市进行对比。通过历史照片、现代图像和其他资料，你可以观察街道、广场、建筑、街区和景观随时间发生的变化。",
    "Quarche contegnuo o permette de confrontâ a Zena dò passou co-a çittæ de ancheu. Con fotografie storiche, imagine moderne e atri materiali ti peu vedde comme stradde, ciassæ, edifiçi, quartê e paesaggi son cangiæ into tempo."
  ],
  [
    "Questa funzione permette di utilizzare la mappa anche come strumento per leggere l’evoluzione storica della città.",
    "This feature also lets you use the map as a tool for understanding the city’s historical evolution.",
    "Esta función permite utilizar el mapa también como herramienta para comprender la evolución histórica de la ciudad.",
    "Cette fonction permet également d’utiliser la carte comme un outil pour comprendre l’évolution historique de la ville.",
    "تتيح هذه الوظيفة استخدام الخريطة أيضاً كأداة لفهم التطور التاريخي للمدينة.",
    "Эта функция позволяет использовать карту и как инструмент для понимания исторического развития города.",
    "此功能也让地图成为理解城市历史演变的工具。",
    "Sta fonçion a permette d’adêuviâ a mappa anche comme strumento pe capî l’evoluçion storica da çittæ."
  ],
  [
    "I MiniDoc sono brevi contenuti video dedicati a luoghi, avvenimenti, personaggi e trasformazioni della storia di Genova. Quando un MiniDoc è disponibile puoi aprirlo dalla relativa sezione o dal punto associato.",
    "MiniDocs are short videos dedicated to places, events, people and transformations in Genoa’s history. When a MiniDoc is available, you can open it from the relevant section or associated point.",
    "Los MiniDoc son breves contenidos de vídeo dedicados a lugares, acontecimientos, personajes y transformaciones de la historia de Génova. Cuando haya un MiniDoc disponible, puedes abrirlo desde la sección correspondiente o desde el punto asociado.",
    "Les MiniDoc sont de courtes vidéos consacrées à des lieux, événements, personnages et transformations de l’histoire de Gênes. Lorsqu’un MiniDoc est disponible, vous pouvez l’ouvrir depuis la section correspondante ou le point associé.",
    "MiniDoc عبارة عن مقاطع فيديو قصيرة مخصصة لأماكن وأحداث وشخصيات وتحولات في تاريخ جنوة. عندما يتوفر MiniDoc يمكنك فتحه من القسم المناسب أو من النقطة المرتبطة.",
    "MiniDoc — короткие видеоматериалы о местах, событиях, людях и преобразованиях в истории Генуи. Если MiniDoc доступен, его можно открыть из соответствующего раздела или связанной точки.",
    "MiniDoc 是关于热那亚历史中的地点、事件、人物和变化的短视频内容。当有 MiniDoc 可用时，可从相应部分或关联点位打开。",
    "I MiniDoc son video curti dedicæ a leughi, avvenimenti, personnaggi e trasformaçioin da stöia de Zena. Quande gh’é un MiniDoc disponibile ti peu arvîlo da-a seçion relativa ò dò ponto associòu."
  ],
  [
    "Le Audioguide permettono di ascoltare contenuti dedicati ai luoghi e agli argomenti presenti nell’app. Sono pensate per accompagnare l’esplorazione della città anche mentre ci si trova sul posto.",
    "Audio guides let you listen to content about places and topics in the app. They are designed to accompany your exploration of the city, including while you are on site.",
    "Las Audioguías permiten escuchar contenidos dedicados a los lugares y temas presentes en la app. Están pensadas para acompañar la exploración de la ciudad incluso mientras te encuentras en el lugar.",
    "Les Audioguides permettent d’écouter des contenus consacrés aux lieux et aux thèmes présents dans l’application. Elles sont conçues pour accompagner la découverte de la ville, y compris lorsque vous êtes sur place.",
    "تتيح الأدلة الصوتية الاستماع إلى محتوى مخصص للأماكن والموضوعات الموجودة في التطبيق. وهي مصممة لمرافقة استكشاف المدينة حتى أثناء وجودك في الموقع.",
    "Аудиогиды позволяют слушать материалы о местах и темах приложения. Они созданы для сопровождения знакомства с городом, в том числе непосредственно на месте.",
    "语音导览可播放与应用中的地点和主题相关的音频内容，适合在实际游览城市时陪伴使用。",
    "E Audioguide permettan d’ascoltâ contegnui dedicæ a-i leughi e a-i argomenti presenti inte l’app. Son fæte pe accompagnâ l’esploraçion da çittæ anche quande ti sei in sciô pòsto."
  ],
  [
    "Le Videoguide utilizzano immagini e video per raccontare luoghi, percorsi e argomenti legati a Genova. Quando disponibili possono essere aperte direttamente dai relativi contenuti dell’app.",
    "Video guides use images and video to tell the story of places, routes and topics related to Genoa. When available, they can be opened directly from the corresponding app content.",
    "Las Videoguías utilizan imágenes y vídeo para contar lugares, recorridos y temas relacionados con Génova. Cuando estén disponibles, pueden abrirse directamente desde los contenidos correspondientes de la app.",
    "Les Vidéoguides utilisent des images et des vidéos pour raconter des lieux, des itinéraires et des thèmes liés à Gênes. Lorsqu’elles sont disponibles, elles peuvent être ouvertes directement depuis les contenus correspondants de l’application.",
    "تستخدم أدلة الفيديو الصور والفيديو لسرد قصص الأماكن والمسارات والموضوعات المرتبطة بجنوة. وعند توفرها يمكن فتحها مباشرة من المحتوى المقابل في التطبيق.",
    "Видеогиды используют изображения и видео, чтобы рассказывать о местах, маршрутах и темах, связанных с Генуей. Когда они доступны, их можно открыть прямо из соответствующих материалов приложения.",
    "视频导览通过图片和视频讲述与热那亚有关的地点、路线和主题。可用时，可直接从对应的应用内容中打开。",
    "E Videoguide adêuvian imagine e video pe contâ leughi, percorsi e argomenti ligæ a Zena. Quande disponibili se peu arvî direttamente da-i contegnui relativi de l’app."
  ],
  [
    "La sezione Eventi permette di scoprire appuntamenti, spettacoli, manifestazioni, incontri e altre iniziative presenti a Genova.",
    "The Events section lets you discover appointments, shows, festivals, meetings and other initiatives taking place in Genoa.",
    "La sección Eventos permite descubrir citas, espectáculos, manifestaciones, encuentros y otras iniciativas presentes en Génova.",
    "La section Événements permet de découvrir des rendez-vous, spectacles, manifestations, rencontres et autres initiatives organisées à Gênes.",
    "يتيح قسم الفعاليات اكتشاف المواعيد والعروض والمهرجانات واللقاءات والمبادرات الأخرى المقامة في جنوة.",
    "Раздел События помогает находить мероприятия, спектакли, фестивали, встречи и другие инициативы в Генуе.",
    "活动部分可用于发现热那亚的活动、演出、节庆、聚会和其他项目。",
    "A seçion Eventi a permette de descovrî appontamenti, spettacoli, manifestaçioin, incontri e atre iniçiative a Zena."
  ],
  [
    "Puoi consultare gli eventi disponibili e aprire quelli che ti interessano per visualizzarne le informazioni. Quando previsto, gli eventi possono essere organizzati o filtrati per data, periodo o categoria.",
    "You can browse available events and open those that interest you to view their information. When provided, events can be organised or filtered by date, period or category.",
    "Puedes consultar los eventos disponibles y abrir los que te interesen para ver su información. Cuando esté previsto, los eventos pueden organizarse o filtrarse por fecha, periodo o categoría.",
    "Vous pouvez consulter les événements disponibles et ouvrir ceux qui vous intéressent pour afficher leurs informations. Lorsqu’elle est prévue, l’organisation ou le filtrage peut se faire par date, période ou catégorie.",
    "يمكنك تصفح الفعاليات المتاحة وفتح ما يهمك لعرض معلوماته. وعند توفر ذلك يمكن تنظيم الفعاليات أو تصفيتها بحسب التاريخ أو الفترة أو الفئة.",
    "Можно просматривать доступные события и открывать интересующие для получения подробной информации. Когда предусмотрено, события можно организовать или отфильтровать по дате, периоду или категории.",
    "你可以浏览已有活动并打开感兴趣的项目查看详情。如支持，可按日期、时间范围或分类整理和筛选活动。",
    "Ti peu consultâ i eventi disponibili e arvî quelli che t’interessan pe vedde e informaçioin. Quande previsto, i eventi se peu organizâ ò filtrâ pe dæta, periodo ò categoria."
  ],
  [
    "Puoi inoltre salvare tra i Preferiti gli eventi che vuoi ricordare o consultare nuovamente.",
    "You can also save events you want to remember or view again to Favourites.",
    "También puedes guardar en Favoritos los eventos que quieras recordar o consultar de nuevo.",
    "Vous pouvez également enregistrer dans vos Favoris les événements que vous souhaitez retenir ou consulter à nouveau.",
    "كما يمكنك حفظ الفعاليات التي تريد تذكرها أو الرجوع إليها في المفضلة.",
    "События, которые вы хотите запомнить или посмотреть позже, можно сохранить в Избранное.",
    "你还可以将想记住或之后再次查看的活动保存到收藏。",
    "Ti peu anche sarvâ inti Preferii i eventi che ti veu ricordâ ò consultâ torna."
  ],
  [
    "9. Community, servizi ed Extra",
    "9. Community, services and Extras",
    "9. Comunidad, servicios y Extras",
    "9. Communauté, services et Extras",
    "9. المجتمع والخدمات والإضافات",
    "9. Сообщество, сервисы и дополнительно",
    "9. 社区、服务与更多",
    "9. Comunitæ, serviçi ed Extra"
  ],
  [
    "Genova mApp comprende anche funzioni pensate per ampliare l’esperienza oltre la semplice consultazione della mappa.",
    "Genova mApp also includes features designed to extend the experience beyond simply consulting the map.",
    "Genova mApp incluye también funciones pensadas para ampliar la experiencia más allá de la simple consulta del mapa.",
    "Genova mApp comprend également des fonctions conçues pour enrichir l’expérience au-delà de la simple consultation de la carte.",
    "يضم Genova mApp أيضاً وظائف صُممت لتوسيع التجربة إلى ما هو أبعد من مجرد تصفح الخريطة.",
    "Genova mApp также включает функции, расширяющие возможности приложения за пределы обычного просмотра карты.",
    "Genova mApp 还包含一些功能，用于将体验扩展到单纯查看地图之外。",
    "Genova mApp a comprende anche fonçioin pensæ pe allargâ l’esperiença oltre a sempliçe consultaçion da mappa."
  ],
  [
    "Alcune di queste sezioni sono ancora in fase di sviluppo e verranno completate progressivamente.",
    "Some of these sections are still under development and will be completed progressively.",
    "Algunas de estas secciones todavía están en fase de desarrollo y se completarán progresivamente.",
    "Certaines de ces sections sont encore en cours de développement et seront complétées progressivement.",
    "لا تزال بعض هذه الأقسام قيد التطوير وسيتم استكمالها تدريجياً.",
    "Некоторые из этих разделов ещё разрабатываются и будут постепенно завершены.",
    "其中部分区域仍在开发中，将逐步完善。",
    "Quarche de ste seçioin a l’é ancon in sviluppo e a saiâ completâ pöco a-a vòtta."
  ],
  [
    "Il Blog sarà uno spazio dedicato a Genova, alle sue storie, ai luoghi, agli eventi e agli argomenti collegati alla città. Potrà ospitare approfondimenti, contenuti e altre forme di partecipazione della comunità.",
    "The Blog will be a space dedicated to Genoa, its stories, places, events and topics connected to the city. It may host insights, content and other forms of community participation.",
    "El Blog será un espacio dedicado a Génova, sus historias, lugares, eventos y temas relacionados con la ciudad. Podrá incluir análisis, contenidos y otras formas de participación de la comunidad.",
    "Le Blog sera un espace consacré à Gênes, à ses histoires, ses lieux, ses événements et aux thèmes liés à la ville. Il pourra accueillir des approfondissements, des contenus et d’autres formes de participation de la communauté.",
    "ستكون المدونة مساحة مخصصة لجنوة وقصصها وأماكنها وفعالياتها والموضوعات المرتبطة بالمدينة. ويمكن أن تضم مقالات معمقة ومحتويات وأشكالاً أخرى من مشاركة المجتمع.",
    "Блог станет пространством, посвящённым Генуе, её историям, местам, событиям и городским темам. Здесь смогут размещаться подробные материалы, публикации и другие формы участия сообщества.",
    "博客将成为围绕热那亚、城市故事、地点、活动和相关主题的空间，可用于发布深度内容以及其他社区参与形式。",
    "O Blog o saiâ un spaçio dedicòu a Zena, a-e seu stöie, a-i leughi, a-i eventi e a-i argomenti ligæ a-a çittæ. O poiâ ospitâ approfondimenti, contegnui e atre forme de parteçipaçion da comunitæ."
  ],
  [
    "La sezione Contatti permette di trovare i riferimenti disponibili per comunicare con Genova mApp. Puoi utilizzarla per richieste, informazioni, segnalazioni o altre comunicazioni relative al progetto.",
    "The Contact section lets you find the available details for getting in touch with Genova mApp. You can use it for requests, information, reports or other communications about the project.",
    "La sección Contactos permite encontrar los datos disponibles para comunicarte con Genova mApp. Puedes utilizarla para solicitudes, información, avisos u otras comunicaciones relacionadas con el proyecto.",
    "La section Contact permet de trouver les coordonnées disponibles pour communiquer avec Genova mApp. Vous pouvez l’utiliser pour des demandes, des informations, des signalements ou d’autres communications liées au projet.",
    "يتيح قسم التواصل العثور على بيانات الاتصال المتاحة للتواصل مع Genova mApp. يمكنك استخدامه للطلبات أو المعلومات أو البلاغات أو غيرها من المراسلات المتعلقة بالمشروع.",
    "В разделе Контакты можно найти доступные способы связи с Genova mApp. Его можно использовать для запросов, получения информации, сообщений о проблемах и других обращений по проекту.",
    "联系部分可查看与 Genova mApp 沟通所需的信息，可用于咨询、获取信息、反馈问题或其他与项目有关的联系。",
    "A seçion Contatti a permette de trovâ i riferimenti disponibili pe contattâ Genova mApp. Ti peu adêuviâla pe richieste, informaçioin, segnalaçioin ò atre comunicaçioin ligæ a-o progetto."
  ],
  [
    "La sezione Giochi raccoglie esperienze interattive dedicate a Genova. Tra i giochi disponibili puoi trovare A Zena – Trivial, insieme agli altri giochi che verranno aggiunti nel tempo.",
    "The Games section brings together interactive experiences dedicated to Genoa. Available games include A Zena – Trivial, together with other games that will be added over time.",
    "La sección Juegos reúne experiencias interactivas dedicadas a Génova. Entre los juegos disponibles puedes encontrar A Zena – Trivial, junto con otros juegos que se añadirán con el tiempo.",
    "La section Jeux regroupe des expériences interactives consacrées à Gênes. Parmi les jeux disponibles, vous trouverez A Zena – Trivial, ainsi que d’autres jeux qui seront ajoutés au fil du temps.",
    "يجمع قسم الألعاب تجارب تفاعلية مخصصة لجنوة. ومن الألعاب المتاحة A Zena – Trivial إلى جانب ألعاب أخرى ستضاف مع الوقت.",
    "Раздел Игры объединяет интерактивные возможности, посвящённые Генуе. Среди доступных игр — A Zena – Trivial, а со временем будут добавляться новые.",
    "游戏部分汇集与热那亚有关的互动体验。现有游戏包括 A Zena – Trivial，未来还会逐步加入更多游戏。",
    "A seçion Zeughi a mette asseme esperiense interattive dedicæ a Zena. Tra i zeughi disponibili ti peu trovâ A Zena – Trivial, inseme a atri zeughi che saian azzonti into tempo."
  ],
  [
    "I giochi rappresentano un modo diverso per conoscere Genova, mettendo alla prova le proprie conoscenze e scoprendo nuove curiosità.",
    "Games offer a different way to get to know Genoa, testing your knowledge and discovering new facts.",
    "Los juegos representan una forma diferente de conocer Génova, poniendo a prueba tus conocimientos y descubriendo nuevas curiosidades.",
    "Les jeux offrent une manière différente de découvrir Gênes, en testant ses connaissances et en découvrant de nouvelles curiosités.",
    "توفر الألعاب طريقة مختلفة للتعرّف على جنوة من خلال اختبار معلوماتك واكتشاف حقائق جديدة.",
    "Игры предлагают другой способ узнавать Геную: проверять свои знания и открывать новые интересные факты.",
    "游戏提供了一种不同的方式认识热那亚：测试知识并发现新的趣闻。",
    "I zeughi son unna manea diversa pe conosce Zena, mettendo a-a preuva e proprie conoscense e descovrendo neuve curiositæ."
  ],
  [
    "La sezione Premi sarà dedicata alle iniziative e ai vantaggi collegati alle attività svolte attraverso Genova mApp. Le modalità di funzionamento e i premi disponibili verranno indicati direttamente nell’app quando il servizio sarà attivo.",
    "The Rewards section will be dedicated to initiatives and benefits linked to activities carried out through Genova mApp. How it works and the available rewards will be shown directly in the app when the service is active.",
    "La sección Premios estará dedicada a iniciativas y ventajas vinculadas a las actividades realizadas a través de Genova mApp. El funcionamiento y los premios disponibles se indicarán directamente en la app cuando el servicio esté activo.",
    "La section Récompenses sera consacrée aux initiatives et aux avantages liés aux activités réalisées avec Genova mApp. Son fonctionnement et les récompenses disponibles seront indiqués directement dans l’application lorsque le service sera actif.",
    "سيُخصص قسم الجوائز للمبادرات والمزايا المرتبطة بالأنشطة المنفذة عبر Genova mApp. وسيُوضح أسلوب العمل والجوائز المتاحة مباشرة في التطبيق عند تفعيل الخدمة.",
    "Раздел Призы будет посвящён инициативам и преимуществам, связанным с действиями в Genova mApp. Правила работы и доступные призы появятся непосредственно в приложении после запуска сервиса.",
    "奖励部分将用于与 Genova mApp 活动相关的计划和权益。服务启用后，具体规则和可用奖励会直接显示在应用中。",
    "A seçion Premi a saiâ dedicâ a iniçiative e vantaggi ligæ a-e attivitæ fæte con Genova mApp. E regole e i premi disponibili saian indicæ direttamente inte l’app quande o serviçio o saiâ attivo."
  ],
  [
    "Lo Shop sarà uno spazio dedicato a prodotti, pubblicazioni e altri contenuti collegati a Genova e a Genova mApp. I prodotti disponibili e le relative modalità di acquisto saranno indicati nella sezione dedicata.",
    "The Shop will be a space dedicated to products, publications and other content related to Genoa and Genova mApp. Available products and purchasing methods will be shown in the dedicated section.",
    "La Tienda será un espacio dedicado a productos, publicaciones y otros contenidos relacionados con Génova y Genova mApp. Los productos disponibles y las modalidades de compra se indicarán en la sección correspondiente.",
    "La Boutique sera un espace consacré à des produits, publications et autres contenus liés à Gênes et à Genova mApp. Les produits disponibles et les modalités d’achat seront indiqués dans la section dédiée.",
    "سيكون المتجر مساحة مخصصة للمنتجات والمنشورات والمحتويات الأخرى المرتبطة بجنوة وGenova mApp. وستُعرض المنتجات المتاحة وطرق الشراء في القسم المخصص.",
    "Магазин станет разделом с товарами, изданиями и другими материалами, связанными с Генуей и Genova mApp. Доступные товары и способы покупки будут указаны в соответствующем разделе.",
    "商店将用于展示与热那亚和 Genova mApp 相关的商品、出版物和其他内容。可购买商品和购买方式会在相应部分显示。",
    "A Bottega a saiâ un spaçio dedicòu a prodotti, publicaçioin e atri contegnui ligæ a Zena e a Genova mApp. I prodotti disponibili e e manee d’acquisto saian indicæ inta seçion dedicâ."
  ],
  [
    "Abbonamento e vantaggi",
    "Subscription and benefits",
    "Suscripción y ventajas",
    "Abonnement et avantages",
    "الاشتراك والمزايا",
    "Подписка и преимущества",
    "订阅与权益",
    "Abbonamento e vantaggi"
  ],
  [
    "Genova mApp prevede una sezione dedicata all’Abbonamento, attraverso la quale sarà possibile accedere ai servizi e ai vantaggi previsti per gli utenti abbonati.",
    "Genova mApp includes a Subscription section through which users will be able to access services and benefits provided for subscribers.",
    "Genova mApp contará con una sección dedicada a la Suscripción, a través de la cual será posible acceder a los servicios y ventajas previstos para los usuarios suscritos.",
    "Genova mApp prévoit une section consacrée à l’Abonnement, qui permettra d’accéder aux services et avantages destinés aux utilisateurs abonnés.",
    "يتضمن Genova mApp قسماً مخصصاً للاشتراك، يمكن من خلاله الوصول إلى الخدمات والمزايا المخصصة للمشتركين.",
    "В Genova mApp предусмотрен раздел Подписка, через который можно будет получать доступ к сервисам и преимуществам для подписчиков.",
    "Genova mApp 设有订阅部分，用户将可通过这里访问面向订阅用户的服务和权益。",
    "Genova mApp a prevede unna seçion dedicâ a l’Abbonamento, da donde se poiâ intrâ inti serviçi e inti vantaggi previsti pe-i utenti abbonæ."
  ],
  [
    "Le informazioni relative ai diversi piani, alla durata e alle funzioni comprese saranno mostrate direttamente all’interno dell’app. Alcune parti del sistema di abbonamento sono ancora in fase di completamento e saranno rese disponibili progressivamente.",
    "Information about the different plans, duration and included features will be shown directly in the app. Some parts of the subscription system are still being completed and will become available progressively.",
    "La información sobre los distintos planes, la duración y las funciones incluidas se mostrará directamente en la app. Algunas partes del sistema de suscripción todavía están en fase de desarrollo y estarán disponibles progresivamente.",
    "Les informations sur les différentes formules, leur durée et les fonctions incluses seront affichées directement dans l’application. Certaines parties du système d’abonnement sont encore en cours de finalisation et seront rendues disponibles progressivement.",
    "ستُعرض المعلومات المتعلقة بالخطط المختلفة ومدتها والوظائف المشمولة مباشرة داخل التطبيق. ولا تزال بعض أجزاء نظام الاشتراك قيد الاستكمال وستتاح تدريجياً.",
    "Информация о разных тарифах, сроках и включённых функциях будет показываться прямо в приложении. Некоторые части системы подписки ещё находятся в разработке и будут становиться доступными постепенно.",
    "不同方案、订阅时长和包含功能的信息会直接显示在应用中。订阅系统的部分内容仍在完善，将逐步开放。",
    "E informaçioin in sci diversi piani, a durâ e e fonçioin compreize saian mostræ direttamente inte l’app. Quarche parte dò sistema d’abbonamento a l’é ancon in fase de completamento e a saiâ disponibile pöco a-a vòtta."
  ],
  [
    "Genova mApp continuerà inoltre a crescere nel tempo con nuovi luoghi, percorsi, contenuti e strumenti.",
    "Genova mApp will also continue to grow over time with new places, routes, content and tools.",
    "Genova mApp seguirá creciendo con el tiempo con nuevos lugares, recorridos, contenidos y herramientas.",
    "Genova mApp continuera également à évoluer au fil du temps avec de nouveaux lieux, itinéraires, contenus et outils.",
    "سيواصل Genova mApp أيضاً النمو مع الوقت بإضافة أماكن ومسارات ومحتويات وأدوات جديدة.",
    "Genova mApp продолжит развиваться: со временем появятся новые места, маршруты, материалы и инструменты.",
    "Genova mApp 也会持续发展，逐步加入新的地点、路线、内容和工具。",
    "Genova mApp a continuiâ anche a cresce into tempo con neuvi leughi, percorsi, contegnui e strumenti."
  ]
];
  rows = rows.concat(guideRows);
  // Descrizioni nuove, assenti nei dizionari del vecchio menu; l'italiano resta nel catalogo.
  var walls = {
    'mura-romane':[
      'Genoa’s pre-Roman walls protected the first fortified settlement on Castello hill, overlooking the ancient Mandraccio landing place. The oppidum covered a few hectares and was inhabited by the Ligurian Genuates, who traded with Etruscans, Greeks and Phoenicians. Its defences used the steep natural slopes, supplemented by dry-stone walls, earthworks and wooden palisades. Inside were homes, warehouses and spaces associated with maritime trade, essential to the settlement’s economic development. Today the enclosure is not visible above ground: archaeological remains lie beneath later urban layers, but the shape of the hill still retains the character of the ancient acropolis.',
      'Las murallas prerromanas de Génova protegían el primer núcleo fortificado de la colina de Castello, sobre el antiguo embarcadero del Mandraccio. El oppidum ocupaba unas pocas hectáreas y estaba habitado por los ligures genuates, que comerciaban con etruscos, griegos y fenicios. Las defensas aprovechaban las pendientes naturales, reforzadas con muros de piedra seca, terraplenes y empalizadas de madera. En su interior había viviendas, almacenes y espacios relacionados con el comercio marítimo, fundamental para su desarrollo económico. Hoy el recinto no es visible en superficie: los restos arqueológicos están enterrados bajo las capas urbanas posteriores, pero la forma de la colina conserva el carácter de la antigua acrópolis.',
      'Les remparts préromains de Gênes protégeaient le premier noyau fortifié sur la colline de Castello, dominant l’ancien débarcadère du Mandraccio. L’oppidum occupait quelques hectares et abritait les Ligures Genuates, qui commerçaient avec les Étrusques, les Grecs et les Phéniciens. Les défenses utilisaient les pentes naturelles abruptes, complétées par des murs de pierre sèche, des terrassements et des palissades en bois. À l’intérieur se trouvaient des habitations, des entrepôts et des espaces liés aux échanges maritimes, essentiels au développement économique du site. Aujourd’hui, l’enceinte n’est pas visible en surface : les vestiges sont enfouis sous les couches urbaines ultérieures, mais la colline conserve le caractère de l’ancienne acropole.',
      'كانت أسوار جنوة السابقة للعصر الروماني تحمي أول نواة محصنة على تل Castello المطل على مرسى Mandraccio القديم. امتدت المستوطنة على بضعة هكتارات وسكنها الليغوريون من قبيلة Genuates، الذين تاجروا مع الإتروسكيين واليونانيين والفينيقيين. استفادت الدفاعات من المنحدرات الطبيعية الحادة، وعززتها جدران حجرية جافة وسواتر ترابية وأسوار خشبية. وضم الداخل مساكن ومستودعات ومساحات للتجارة البحرية التي كانت أساسية لتطور الموقع الاقتصادي. لا تظهر الأسوار اليوم فوق الأرض؛ فالبقايا الأثرية مدفونة تحت طبقات المدينة اللاحقة، لكن تضاريس التل ما زالت تحتفظ بطابع القلعة القديمة.',
      'Доримские стены Генуи защищали первое укреплённое поселение на холме Кастелло над древней пристанью Мандраччо. Оппидум занимал несколько гектаров; его населяли лигуры-генуаты, торговавшие с этрусками, греками и финикийцами. Оборона использовала крутые естественные склоны, дополненные сухой каменной кладкой, земляными валами и деревянными частоколами. Внутри находились жилища, склады и пространства для морской торговли, важнейшей для экономического развития поселения. Сегодня стены не видны на поверхности: археологические остатки скрыты под позднейшими городскими слоями, но очертания холма сохраняют характер древнего акрополя.',
      '热那亚的前罗马城墙保护着Castello山丘上的最早防御聚落，俯瞰古老的Mandraccio码头。聚落占地数公顷，居民为利古里亚的Genuates人，与伊特鲁里亚人、希腊人和腓尼基人进行贸易。防御体系利用天然陡坡，并辅以干砌石墙、土垒和木栅栏。城内有住宅、仓库及海上贸易场所，海上贸易对聚落的经济发展至关重要。如今地表已看不到城墙，考古遗迹埋藏在后来的城市地层之下，但山丘地形仍保留着古代卫城的特征。',
      'E mûage preromane de Zena proteggeivan o primmo nucleo fortificou in sciâ collinn-a de Castello, sorviâ l’antigo approdo do Mandraccio. L’oppidum o piggiava pöchi ettari e o l’ea abitòu da-i Liguri Genuates, in commercio con Etruschi, Greghi e Feniçi. E difeize adêuviavan e rive naturali ripide, completæ da mûi a secco, terrapieni e palissæ de legno. Dentro gh’ean case, magazzen e spaçi pe i scangi marittimi, fondamentali pe o sviluppo economico do leugo. Ancheu a çinta a no se vedde in superficie: i resti archeologichi son sotta e stratificaçioin urbane successive, ma a forma da collinn-a a conserva o carattere de l’antiga acropoli.'
    ],
    'mura-carolinge':[
      'The Carolingian walls formed Genoa’s first true medieval defensive enclosure, built between 848 and 889 to protect the city from Saracen and pirate raids. The perimeter, about one and a half kilometres long, enclosed only twenty to twenty-two hectares, including Castello, Sarzano, San Lorenzo and the waterfront, but excluding areas such as Sant’Andrea and San Siro. Four main gates and towers at the most vulnerable points guarded the enclosure. Today most of the structures have disappeared or been incorporated into later buildings, but some remains can still be recognised in Via Tommaso Reggio and the Santa Maria di Castello complex.',
      'Las murallas carolingias fueron el primer verdadero recinto defensivo medieval de Génova, construido entre 848 y 889 para protegerla de incursiones sarracenas y piratas. El perímetro, de aproximadamente un kilómetro y medio, encerraba apenas veinte a veintidós hectáreas, incluyendo Castello, Sarzano, San Lorenzo y el frente costero, pero dejando fuera Sant’Andrea y San Siro. Cuatro puertas principales y torres en los puntos más vulnerables controlaban el recinto. Hoy la mayoría de las estructuras ha desaparecido o está integrada en edificios posteriores, aunque quedan restos reconocibles en Via Tommaso Reggio y en el conjunto de Santa Maria di Castello.',
      'Les remparts carolingiens constituaient la première véritable enceinte médiévale de Gênes, construite entre 848 et 889 contre les incursions sarrasines et les pirates. Leur périmètre d’environ un kilomètre et demi entourait seulement vingt à vingt-deux hectares, comprenant Castello, Sarzano, San Lorenzo et le littoral, mais excluant Sant’Andrea et San Siro. Quatre portes principales et des tours aux points les plus vulnérables contrôlaient l’enceinte. Aujourd’hui, la plupart des structures ont disparu ou ont été intégrées à des bâtiments ultérieurs ; certains vestiges restent reconnaissables dans la Via Tommaso Reggio et le complexe de Santa Maria di Castello.',
      'مثلت الأسوار الكارولنجية أول سور دفاعي حقيقي لجنوة في العصور الوسطى، وشُيدت بين عامي 848 و889 لحماية المدينة من غارات السراسنة والقراصنة. بلغ محيطها نحو كيلومتر ونصف، وأحاطت بمساحة لا تتجاوز عشرين إلى اثنين وعشرين هكتاراً، شملت Castello وSarzano وSan Lorenzo والواجهة الساحلية، دون Sant’Andrea وSan Siro. كانت أربعة أبواب رئيسية وأبراج في أضعف المواضع تحرس السور. اختفت معظم المنشآت اليوم أو اندمجت في مبانٍ لاحقة، لكن بعض البقايا ما زالت ظاهرة في Via Tommaso Reggio ومجمع Santa Maria di Castello.',
      'Каролингские стены стали первым настоящим средневековым оборонительным поясом Генуи. Их построили в 848–889 годах для защиты от сарацинских и пиратских набегов. Периметр длиной около полутора километров охватывал всего двадцать — двадцать два гектара, включая Кастелло, Сарцано, Сан-Лоренцо и побережье, но оставляя за пределами Сант-Андреа и Сан-Сиро. Четыре главных ворот и башни в наиболее уязвимых местах охраняли стены. Сегодня большая часть сооружений исчезла или вошла в позднейшие здания, однако отдельные остатки можно различить на Виа Томмазо Реджо и в комплексе Санта-Мария-ди-Кастелло.',
      '加洛林城墙是热那亚中世纪第一道真正的防御围墙，建于848至889年，用于抵御撒拉森人和海盗的袭击。周长约一公里半，仅围合二十至二十二公顷，涵盖Castello、Sarzano、San Lorenzo及海岸地带，但不包括Sant’Andrea和San Siro。四座主要城门以及设在薄弱位置的塔楼守卫着城墙。如今大部分结构已消失或被后来的建筑吸收，但在Via Tommaso Reggio和Santa Maria di Castello建筑群中仍能辨认出一些遗迹。',
      'E mûage carolinge son stæte a primma vea çinta difensiva medievale de Zena, constrûia tra l’848 e l’889 pe protegge a çittæ da-e scorrerie saracene e di pirati. O perimetro, longo çirca un chilometro e mezo, o serrava appena vinti-vintidoî ettari, con Castello, Sarzano, San Lorenzo e a costa, ma sensa Sant’Andrea e San Siro. Quattro pòrte prinçipali e torre inti ponti ciù deboli controllavan a çinta. Ancheu tante struttue son sparîe ò inglobæ inti edifiçi successivi, ma quarche resto o se reconosce ancon in via Tommaso Reggio e into complesso de Santa Maria di Castello.'
    ],
    'mura-barbarossa':[
      'The monumental development began between 1155 and 1159 with the construction of the Barbarossa Walls, erected to counter the expansionist ambitions of Emperor Frederick I of Swabia. Funded and built in record time by the entire citizenry, they expanded the urban area from 22 to 55 hectares along a 2.4-kilometre perimeter. The route crossed today’s Piazza De Ferrari and Acquasola as far as Castelletto. The two imposing twin gates remain: Porta Soprana to the east and Porta dei Vacca to the west, alongside surviving sections in Passo delle Murette and near Campopisano. In the eighteenth century, the towers of Porta Soprana were converted into prisons and fitted with a guillotine.',
      'La evolución monumental comenzó entre 1155 y 1159 con las Murallas de Barbarroja, erigidas contra las ambiciones expansionistas del emperador Federico I de Suabia. Financiadas y construidas en tiempo récord por toda la ciudadanía, ampliaron el área urbana de 22 a 55 hectáreas, con un perímetro de 2,4 kilómetros. El trazado cruzaba la actual Piazza De Ferrari y Acquasola hasta Castelletto. De esta fase quedan las dos imponentes puertas gemelas, Porta Soprana al este y Porta dei Vacca al oeste, además de tramos en Passo delle Murette y junto a Campopisano. En el siglo XVIII, las torres de Porta Soprana fueron convertidas en cárceles y equipadas con una guillotina.',
      'L’évolution monumentale commence entre 1155 et 1159 avec les remparts de Barberousse, érigés contre les ambitions expansionnistes de l’empereur Frédéric Ier de Souabe. Financés et construits en un temps record par l’ensemble des habitants, ils agrandirent l’espace urbain de 22 à 55 hectares, sur un périmètre de 2,4 kilomètres. Le tracé traversait l’actuelle Piazza De Ferrari et l’Acquasola jusqu’à Castelletto. Subsistent les deux imposantes portes jumelles, Porta Soprana à l’est et Porta dei Vacca à l’ouest, ainsi que des sections au Passo delle Murette et près de Campopisano. Au XVIIIe siècle, les tours de Porta Soprana furent transformées en prisons et équipées d’une guillotine.',
      'بدأ التطور المعماري الضخم بين عامي 1155 و1159 ببناء أسوار بربروسا لمواجهة طموحات الإمبراطور فريدريك الأول التوسعية. موّلها سكان المدينة وشيدوها في وقت قياسي، فوسعت المساحة الحضرية من 22 إلى 55 هكتاراً ضمن محيط طوله 2.4 كيلومتر. مر المسار بساحة Piazza De Ferrari الحالية وAcquasola حتى Castelletto. بقي من هذه المرحلة البابان التوأمان الضخمان، Porta Soprana شرقاً وPorta dei Vacca غرباً، وأجزاء في Passo delle Murette وقرب Campopisano. في القرن الثامن عشر حُولت أبراج Porta Soprana إلى سجون وزُودت بمقصلة.',
      'Монументальное развитие началось в 1155–1159 годах со стен Барбароссы, возведённых против экспансионистских замыслов императора Фридриха I Швабского. Все горожане участвовали в финансировании и строительстве в рекордные сроки. Стены расширили городскую территорию с 22 до 55 гектаров при периметре 2,4 километра. Трасса пересекала нынешнюю площадь Де Феррари и Аквасолу до Кастеллетто. Сохранились двое величественных парных ворот: Порта Сопрана на востоке и Порта деи Вакка на западе, а также участки в Пассо делле Муретте и около Кампопизано. В XVIII веке башни Порта Сопрана переоборудовали в тюрьмы и оснастили гильотиной.',
      '城防的宏伟扩建始于1155至1159年修筑的巴巴罗萨城墙，用来应对施瓦本皇帝腓特烈一世的扩张野心。全体市民出资并以创纪录的速度建造，使城区从22公顷扩大至55公顷，周长达到2.4公里。路线穿过今天的Piazza De Ferrari和Acquasola，延伸至Castelletto。如今保留着两座雄伟的双塔城门：东面的Porta Soprana和西面的Porta dei Vacca，以及Passo delle Murette和Campopisano附近的城墙片段。18世纪，Porta Soprana的塔楼被改为监狱，并装有断头台。',
      'O sviluppo monumentale o comensa tra o 1155 e o 1159 co-e Mûage do Barbarossa, fæte pe contrastâ e mire de l’imperatô Federico I de Svevia. Finansiæ e constrûie in tempo record da tutta a çittadinansa, an portòu a superficie urbana da 22 a 55 ettari, con un perimetro de 2,4 chilometri. O tracciato o passava pe l’attuale Piazza De Ferrari e l’Acquasola finn-a a Castelletto. Restan e doe grande pòrte gemelle, Porta Soprana a levante e Porta dei Vacca a ponente, co-i tratti de Passo delle Murette e apreuvo a Campopisano. Into Seteçento e torre de Porta Soprana son stæte trasformæ in prexon e dotæ de ghigliottinn-a.'
    ],
    'mura-porto':[
      'The Molo Walls were built between 1276 and 1287 to protect the harbour, by then the vital centre of Genoa’s maritime power. The new fortification linked the Molo promontory to a small rocky island, creating a barrier against storms and naval attacks. The system included the Torre dei Greci, the Mura della Malapaga and several controlled entrances, including the original Porta del Molo. The enclosed area held warehouses, workshops and activities related to navigation and shipbuilding. Today the route remains legible in the Porto Antico, especially along Via del Molo, where medieval structures were incorporated into later fortifications.',
      'Las Murallas del Molo se construyeron entre 1276 y 1287 para proteger el puerto, centro vital de la potencia marítima genovesa. La nueva fortificación unió el promontorio del Molo con una pequeña isla rocosa, creando una barrera contra temporales y ataques navales. El sistema incluía la Torre dei Greci, las Mura della Malapaga y varios accesos controlados, entre ellos la primitiva Porta del Molo. El recinto albergaba almacenes, talleres y actividades de navegación y construcción naval. Hoy el trazado sigue siendo reconocible en el Porto Antico, especialmente en Via del Molo, donde las estructuras medievales se integraron en fortificaciones posteriores.',
      'Les remparts du Molo furent construits entre 1276 et 1287 pour protéger le port, devenu le centre vital de la puissance maritime génoise. La nouvelle fortification reliait le promontoire du Molo à un petit îlot rocheux, créant une barrière contre les tempêtes et les attaques navales. Le système comprenait la Torre dei Greci, les Mura della Malapaga et plusieurs accès contrôlés, dont la première Porta del Molo. L’enceinte abritait des entrepôts, des ateliers et des activités de navigation et de construction navale. Aujourd’hui, son tracé reste lisible dans le Porto Antico, surtout le long de la Via del Molo, où les structures médiévales ont été intégrées aux fortifications ultérieures.',
      'بُنيت أسوار Molo بين عامي 1276 و1287 لحماية الميناء الذي أصبح المركز الحيوي للقوة البحرية الجنوية. ربط التحصين الجديد رأس Molo بجزيرة صخرية صغيرة، ليشكل حاجزاً أمام العواصف والهجمات البحرية. شمل النظام Torre dei Greci وأسوار Malapaga ومداخل مراقبة، منها Porta del Molo الأصلية. ضمت المنطقة المحاطة مستودعات وورشاً وأنشطة مرتبطة بالملاحة وبناء السفن. لا يزال المسار واضحاً في Porto Antico، خصوصاً على امتداد Via del Molo، حيث اندمجت المنشآت الوسيطة في التحصينات اللاحقة.',
      'Стены Моло построили в 1276–1287 годах для защиты порта, ставшего жизненно важным центром морского могущества Генуи. Новое укрепление соединило мыс Моло с небольшим скалистым островом, образовав преграду против штормов и морских нападений. Система включала башню Торре деи Гречи, стены Малапаги и контролируемые входы, в том числе первоначальные ворота Порта дель Моло. Внутри располагались склады, мастерские и предприятия судоходства и судостроения. Сегодня трасса по-прежнему различима в Старом порту, особенно вдоль Виа дель Моло, где средневековые сооружения вошли в позднейшие укрепления.',
      'Molo城墙建于1276至1287年，用来保护已成为热那亚海上力量核心的港口。新防御工事将Molo岬角与一座小岩岛连接起来，形成抵御风浪和海上进攻的屏障。体系包括Torre dei Greci、Malapaga城墙及多个受控入口，其中有最初的Porta del Molo。围墙内分布着仓库、作坊及航运和造船业设施。如今在Porto Antico仍能辨认出路线，尤其沿Via del Molo，中世纪结构已被纳入后来的防御工事。',
      'E Mûage do Molo son stæte fæte tra o 1276 e o 1287 pe protegge o porto, centro vitale da potensa marittima zeneize. A fortificaçion a univa o promontöio do Molo a unn’isoletta de reuccia, creando unna barriera contra e mareggiæ e i attacchi da-o mâ. O sistema o comprendeiva a Torre dei Greci, e Mûage da Malapaga e diversi accessi controllæ, tra cui a primma Porta del Molo. Dentro gh’ean magazzen, botteghe e attivitæ de navigaçion e constrûçion navale. Ancheu o tracciato o se leze into Porto Antico, sorviatutto in via del Molo, dove e struttue medievali son stæte inglobæ inte fortificaçioin successive.'
    ],
    'mura-repubblica':[
      'The Republic Walls were built between 1346 and 1358 to adapt the defences to Genoa’s strong economic, commercial and population growth. The new enclosure greatly expanded the protected city, taking in suburbs, farmland and strategic points from Carignano, Acquasola and Castelletto to Fassolo, San Tommaso and the harbour front. It included monumental gates such as Porta degli Archi and Porta di San Tommaso, as well as existing sea entrances. Today only part of the walls survives: sections remain on the hills, while Porta degli Archi was dismantled and rebuilt in 1896 to allow Via XX Settembre to be opened.',
      'Las Murallas de la República se construyeron entre 1346 y 1358 para adaptar las defensas al gran crecimiento económico, comercial y demográfico de Génova. El nuevo recinto amplió notablemente la ciudad protegida, incorporando barrios, terrenos agrícolas y puntos estratégicos entre Carignano, Acquasola, Castelletto, Fassolo y San Tommaso, hasta el frente portuario. Incluía puertas monumentales como Porta degli Archi y Porta di San Tommaso, además de accesos marítimos existentes. Hoy solo se conserva parte de la muralla en las colinas; Porta degli Archi fue desmontada y reconstruida en 1896 para permitir la apertura de Via XX Settembre.',
      'Les remparts de la République furent construits entre 1346 et 1358 pour adapter les défenses à la forte croissance économique, commerciale et démographique de Gênes. La nouvelle enceinte agrandissait considérablement la ville protégée, englobant faubourgs, terres agricoles et points stratégiques entre Carignano, Acquasola, Castelletto, Fassolo et San Tommaso, jusqu’au front portuaire. Elle comprenait des portes monumentales, comme Porta degli Archi et Porta di San Tommaso, ainsi que des accès maritimes existants. Aujourd’hui, seuls certains tronçons subsistent sur les hauteurs ; Porta degli Archi fut démontée puis reconstruite en 1896 pour permettre l’ouverture de la Via XX Settembre.',
      'شُيدت أسوار الجمهورية بين عامي 1346 و1358 لتكييف الدفاعات مع النمو الاقتصادي والتجاري والسكاني الكبير لجنوة. وسّعت الأسوار الجديدة نطاق المدينة المحمية، وضمت أحياء وأراضي زراعية ومواقع استراتيجية بين Carignano وAcquasola وCastelletto وFassolo وSan Tommaso حتى واجهة الميناء. اشتملت على أبواب ضخمة مثل Porta degli Archi وPorta di San Tommaso، إلى جانب مداخل بحرية موجودة سابقاً. لم يبقَ اليوم سوى أجزاء على المرتفعات؛ أما Porta degli Archi ففُككت وأعيد بناؤها عام 1896 لإتاحة فتح Via XX Settembre.',
      'Стены Республики возвели в 1346–1358 годах, приспосабливая оборону к бурному экономическому, торговому и демографическому росту Генуи. Новое кольцо значительно расширило защищённую территорию, включив предместья, сельскохозяйственные земли и стратегические места между Кариньяно, Аквасолой, Кастеллетто, Фассоло и Сан-Томмазо вплоть до порта. В систему входили монументальные ворота Порта дельи Арки и Порта ди Сан-Томмазо, а также существующие морские входы. Сегодня стены сохранились лишь частично, главным образом на возвышенностях. Ворота Порта дельи Арки разобрали и восстановили в 1896 году для прокладки Виа XX Сеттембре.',
      '共和国城墙建于1346至1358年，以适应热那亚经济、贸易和人口的快速增长。新城墙大幅扩大了受保护城区，纳入Carignano、Acquasola、Castelletto、Fassolo和San Tommaso之间的街区、农田与战略位置，一直延伸至港口。体系包括Porta degli Archi和Porta di San Tommaso等宏伟城门，以及已有的海上入口。如今城墙仅部分留存，山地仍有一些片段。Porta degli Archi于1896年拆卸并重建，以便开辟Via XX Settembre。',
      'E Mûage da Repubblica son stæte constrûie tra o 1346 e o 1358 pe adattâ e difeize a-a forte crescita economica, commerciale e da populaçion de Zena. A neuva çinta a allargava tanto a çittæ protetta, con neuvi borghi, terren agricoli e ponti strategichi tra Carignano, Acquasola, Castelletto, Fassolo e San Tommaso, finn-a a-o porto. Gh’ean pòrte monumentali comme Porta degli Archi e Porta di San Tommaso, in ciù a-i accessi da-o mâ za presenti. Ancheu a çinta a resta solo in parte in sci monti; Porta degli Archi a l’é stæta desmontâ e reconstrûia into 1896 pe arvî via XX Settembre.'
    ],
    'mura-rinascimento':[
      'The sixteenth-century walls were created to adapt Genoa to artillery warfare, which had made the earlier medieval defences vulnerable. Between 1536 and 1553, the fortifications were transformed with lower, thicker curtain walls, angled bastions and structures able to withstand cannon fire. The system covered Carignano, Castelletto, San Benigno and especially the harbour front, protected by a new continuous enclosure. Important entrances included Porta della Lanterna, Porta degli Archi and Porta del Molo. Significant sections remain today, including the Mura di Santa Chiara and Porta del Molo, while the Castelletto fortress was gradually demolished in later centuries.',
      'Las murallas del siglo XVI surgieron para adaptar Génova a la guerra de artillería, que había vuelto vulnerables las defensas medievales. Entre 1536 y 1553 se transformaron con cortinas más bajas y gruesas, bastiones angulares y estructuras resistentes al fuego de cañón. El sistema abarcaba Carignano, Castelletto, San Benigno y, sobre todo, el frente portuario, protegido por un nuevo recinto continuo. Entre los accesos destacaban Porta della Lanterna, Porta degli Archi y Porta del Molo. Hoy quedan tramos importantes, como las Mura di Santa Chiara y Porta del Molo, mientras que la fortaleza de Castelletto fue demolida progresivamente en siglos posteriores.',
      'Les remparts du XVIe siècle visaient à adapter Gênes à la guerre d’artillerie, qui avait fragilisé les défenses médiévales. Entre 1536 et 1553, celles-ci furent transformées avec des courtines plus basses et épaisses, des bastions angulaires et des structures résistant aux canons. Le système couvrait Carignano, Castelletto, San Benigno et surtout le front portuaire, protégé par une nouvelle enceinte continue. Parmi les accès importants figuraient Porta della Lanterna, Porta degli Archi et Porta del Molo. Des sections notables subsistent, dont les Mura di Santa Chiara et Porta del Molo, tandis que la forteresse de Castelletto fut progressivement démolie au cours des siècles suivants.',
      'أُنشئت أسوار القرن السادس عشر لتكييف جنوة مع حرب المدفعية التي جعلت الدفاعات الوسيطة ضعيفة. بين عامي 1536 و1553 أُعيد تشكيل الدفاعات بجدران أقل ارتفاعاً وأكثر سماكة، وحصون زاوية ومنشآت تقاوم قذائف المدافع. شمل النظام Carignano وCastelletto وSan Benigno، وخصوصاً واجهة الميناء المحمية بسور جديد متصل. من أهم المداخل Porta della Lanterna وPorta degli Archi وPorta del Molo. بقيت أجزاء مهمة مثل أسوار Santa Chiara وPorta del Molo، بينما هُدمت قلعة Castelletto تدريجياً في القرون اللاحقة.',
      'Стены XVI века создавались для приспособления Генуи к артиллерийской войне, сделавшей средневековую оборону уязвимой. В 1536–1553 годах появились более низкие и толстые куртины, угловые бастионы и сооружения, выдерживавшие пушечный огонь. Система охватывала Кариньяно, Кастеллетто, Сан-Бениньо и особенно порт, защищённый новой непрерывной стеной. Среди главных входов были Порта делла Лантерна, Порта дельи Арки и Порта дель Моло. Сегодня сохранились значительные участки, включая стены Санта-Кьяра и Порта дель Моло, а крепость Кастеллетто постепенно разобрали в последующие века.',
      '16世纪城墙是为了让热那亚适应火炮战争而建，旧有中世纪防御在火炮面前已变得脆弱。1536至1553年间，城防改为更低、更厚的墙体、棱角堡垒及可抵御炮击的结构。体系覆盖Carignano、Castelletto和San Benigno，尤其是以新连续城墙保护的港口。重要入口包括Porta della Lanterna、Porta degli Archi和Porta del Molo。如今仍保留Santa Chiara城墙及Porta del Molo等重要部分，而Castelletto堡垒在后来的几个世纪中逐渐被拆除。',
      'E mûage do Çinqueçento son nasciûe pe adattâ Zena a-a neuva guæra d’artiglieria, che a rendeiva debole e difeize medievali. Tra o 1536 e o 1553 e difeize son stæte trasformæ con mûi ciù basci e spessi, bastioin angolari e struttue pe resiste a-i canoin. O sistema o toccava Carignano, Castelletto, San Benigno e sorviatutto o porto, protetto da unna neuva çinta continua. I accessi prinçipali ean Porta della Lanterna, Porta degli Archi e Porta del Molo. Ancheu restan tratti importanti comme e Mûage de Santa Chiara e Porta del Molo, mentre o forte Castelletto o l’é stæto demolio pöco a-a vòtta inti secoli dòppo.'
    ],
    'mura-nuove':[
      'The New Walls were built between 1626 and 1639 after the Savoyard attack of 1625, to protect not only the city but the whole hilly amphitheatre behind it. The new enclosure extended for almost twenty kilometres along the ridges between the Polcevera and Bisagno valleys, passing through San Benigno, Granarolo, Begato, Monte Peralto, San Bernardino and Zerbino. It included gates, bastions and works that would later give rise to the major hill forts. Today long stretches remain well preserved and accessible in the Parco Urbano delle Mura, forming one of Genoa’s most important historical and landscape assets.',
      'Las Murallas Nuevas se construyeron entre 1626 y 1639 tras el ataque saboyano de 1625, para proteger no solo la ciudad sino todo el anfiteatro de colinas situado detrás. El nuevo recinto alcanzaba casi veinte kilómetros por las crestas entre los valles de Polcevera y Bisagno, pasando por San Benigno, Granarolo, Begato, Monte Peralto, San Bernardino y Zerbino. Incluía puertas, bastiones y obras que darían origen a las grandes fortalezas de las colinas. Hoy largos tramos están bien conservados y son transitables en el Parco Urbano delle Mura, uno de los patrimonios históricos y paisajísticos más importantes de Génova.',
      'Les Nouveaux Remparts furent construits entre 1626 et 1639 après l’attaque savoyarde de 1625, pour protéger la ville et tout l’amphithéâtre de collines qui la domine. L’enceinte atteignait presque vingt kilomètres le long des crêtes entre les vallées de la Polcevera et du Bisagno, passant par San Benigno, Granarolo, Begato, Monte Peralto, San Bernardino et Zerbino. Elle comprenait des portes, des bastions et des ouvrages à l’origine des grands forts des collines. Aujourd’hui, de longs tronçons sont bien conservés et accessibles dans le Parco Urbano delle Mura, constituant l’un des principaux patrimoines historiques et paysagers de Gênes.',
      'بُنيت الأسوار الجديدة بين عامي 1626 و1639 بعد هجوم سافوي عام 1625 لحماية المدينة وكامل المدرج الجبلي خلفها. امتدت نحو عشرين كيلومتراً على القمم بين واديي Polcevera وBisagno، مروراً بـSan Benigno وGranarolo وBegato وMonte Peralto وSan Bernardino وZerbino. ضمت أبواباً محصنة وحصوناً ومنشآت تطورت لاحقاً إلى القلاع الكبيرة على التلال. ما زالت أجزاء طويلة محفوظة وقابلة للمشي في Parco Urbano delle Mura، وتشكل أحد أهم معالم جنوة التاريخية والطبيعية.',
      'Новые стены возвели в 1626–1639 годах после савойского нападения 1625 года для защиты не только города, но и всего горного амфитеатра за ним. Новое кольцо тянулось почти на двадцать километров по хребтам между долинами Польчеверы и Бизаньо через Сан-Бениньо, Гранарало, Бегато, Монте Перальто, Сан-Бернардино и Дзербино. Оно включало укреплённые ворота, бастионы и сооружения, из которых впоследствии выросли крупные холмовые форты. Сегодня длинные участки хорошо сохранились и доступны для прогулок в Парко Урбано делле Мура, составляя одно из важнейших исторических и ландшафтных достояний Генуи.',
      '新城墙建于1626至1639年，缘起于1625年的萨伏依进攻，旨在保护城市及其背后整个环形丘陵地带。新围墙长近二十公里，沿Polcevera与Bisagno两河谷之间的山脊延伸，经过San Benigno、Granarolo、Begato、Monte Peralto、San Bernardino和Zerbino。体系包括城门、堡垒及后来发展为大型山地要塞的工事。如今许多长段保存完好，可在Parco Urbano delle Mura内步行游览，是热那亚最重要的历史与景观遗产之一。',
      'E Mûage Neuve son stæte fæte tra o 1626 e o 1639 dòppo l’attacco savoiardo do 1625, pe protegge no solo a çittæ ma tutto l’anfiteatro de collinne da-a parte de derê. A neuva çinta a l’ea longa quæxi vinti chilometri in sci crinali tra Val Polcevera e Val Bisagno, passando pe San Benigno, Granarolo, Begato, Monte Peralto, San Bernardino e Zerbino. Gh’ean pòrte fortificæ, bastioin e euvie che poi an dæto origine a-i grandi forti di monti. Ancheu tanti tratti son ben conservæ e se peu camminâ into Parco Urbano delle Mura, un di patrimòni storichi e paesaggistichi ciù importanti de Zena.'
    ]
  };
  var dictionary = Object.create(null), patterns = [], roots = [];
  function add(row){ dictionary[row[0]] = row; }
  rows.forEach(add);
  // Riusa i dizionari per lingua già pubblicati dal menu Preferiti.
  function shared(){
    var all = window.I18N_DICT || {};
    function visit(it, path){
      Object.keys(it || {}).forEach(function(key){
        var value = it[key], keys = path.concat(key);
        if(typeof value === 'string'){
          if(dictionary[value]) return;
          var row = languages.map(function(lang){
            var entry = all[lang]; keys.forEach(function(k){ entry = entry && entry[k]; });
            return typeof entry === 'string' ? entry : value;
          });
          add(row);
        }else if(value && typeof value === 'object') visit(value, keys);
      });
    }
    visit(all.it, []);
    // Il vecchio menu include il periodo nel titolo delle mura: riusa solo il nome.
    var wallNames = all.it && all.it.storia && all.it.storia.mura;
    Object.keys(wallNames || {}).forEach(function(key){
      var row = languages.map(function(lang){ var names = all[lang] && all[lang].storia && all[lang].storia.mura; return ((names && names[key]) || wallNames[key]).replace(/\s*\([^)]*\)\s*$/, ''); });
      add(row);
    });
    roots.concat([window.I18N_CATS, window.I18N_ROUTES, window.I18N_UI, window.I18N_POPUP]).forEach(register);
    var aliases = {'Bus':'Autobus','Metropolitana':'Metro','Treni':'Stazioni treno','Funicolari e ascensori':'Funi / Ascensori','Navi e battelli':'Traghetti, battelli, navi','Aereo':'Aeroporti'};
    Object.keys(aliases).forEach(function(key){ if(dictionary[aliases[key]]) dictionary[key] = [key].concat(dictionary[aliases[key]].slice(1)); });
  }
  function register(value){
    if(!value || typeof value !== 'object') return;
    if(value.wallKey && walls[value.wallKey]) add([value.description].concat(walls[value.wallKey]));
    if(typeof value.it === 'string'){
      if(!dictionary[value.it]) add(languages.map(function(lang){ return value[lang] || value.it; }));
    }else if(value.it && typeof value.it === 'object'){
      Object.keys(value.it).forEach(function(key){
        var field = {}; languages.forEach(function(lang){ field[lang] = value[lang] && value[lang][key]; }); register(field);
      });
    }else Object.keys(value).forEach(function(key){ register(value[key]); });
  }
  function language(){
    var lang = document.documentElement.lang || 'it';
    try{ lang = localStorage.getItem('lang') || lang; }catch(_){}
    return languages.indexOf(lang.split('-')[0]) >= 0 ? lang.split('-')[0] : 'it';
  }
  function translate(source, lang){
    var index = languages.indexOf(lang), row = dictionary[source];
    if(index <= 0) return source;
    if(!row){ var key = Object.keys(dictionary).find(function(k){ return k.toLocaleLowerCase('it') === source.toLocaleLowerCase('it'); }); row = key && dictionary[key]; }
    if(row) return row[index];
    for(var i=0;i<patterns.length;i++){
      var match = source.match(patterns[i].regex);
      if(match) return patterns[i].row[index].replace(/\{(\d+)\}/g, function(_, n){ return translate(match[Number(n)+1], lang); });
    }
    if(source.indexOf(' · ') >= 0) return source.split(' · ').map(function(part){ return translate(part,lang); }).join(' · ');
    return source;
  }
  rows.filter(function(row){ return row[0].indexOf('{0}') >= 0; }).forEach(function(row){
    var escaped = row[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\\\{\d+\\\}/g,'(.+?)');
    patterns.push({row:row, regex:new RegExp('^'+escaped+'$')});
  });
  function attach(root, sources){
    roots = sources || []; shared();
    var saved = new WeakMap(), attributes = ['title','aria-label','placeholder','alt'];
    function update(node, key, value, lang){
      var state = saved.get(node) || {}, previous = state[key];
      var source = previous && previous.output === value ? previous.source : value;
      var output = translate(source.trim(),lang);
      output = value.match(/^\s*/)[0] + output + value.match(/\s*$/)[0];
      state[key] = {source:source,output:output}; saved.set(node,state);
      if(output !== value){ if(key === 'text') node.nodeValue = output; else node.setAttribute(key,output); }
    }
    var observer;
    function apply(){
      observer.disconnect();
      var lang = language(); root.setAttribute('dir',lang === 'ar' ? 'rtl' : 'ltr'); root.setAttribute('lang',lang);
      var walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT), node;
      while((node = walker.nextNode())) if(node.nodeValue.trim()) update(node,'text',node.nodeValue,lang);
      root.querySelectorAll('[title],[aria-label],[placeholder],[alt]').forEach(function(el){ attributes.forEach(function(attr){ if(el.hasAttribute(attr)) update(el,attr,el.getAttribute(attr),lang); }); });
      observer.observe(root,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes.concat('dir')});
    }
    observer = new MutationObserver(apply);
    function change(){ shared(); apply(); }
    document.addEventListener('app:set-lang',change);
    window.addEventListener('i18n:changed',change);
    window.addEventListener('storage',function(e){ if(e.key === 'lang') change(); });
    apply();
  }
  window.GMNewHomeI18n = {attach:attach,translate:translate,register:register,languages:languages};
})();
