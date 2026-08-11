(function(){
  'use strict';

  var descriptions = {
    'Bar 2 colpi': {
      it: 'Cocktail, chupiti e divertimento nel cuore del centro storico.',
      en: 'Cocktails, shots and entertainment in the heart of Genoa\'s historic centre.',
      es: 'Cócteles, chupitos y diversión en pleno centro histórico de Génova.',
      fr: 'Cocktails, shooters et divertissement au cœur du centre historique de Gênes.',
      ar: 'كوكتيلات ومشروبات صغيرة وأجواء مرحة في قلب المركز التاريخي لجنوة.',
      ru: 'Коктейли, шоты и весёлая атмосфера в самом сердце исторического центра Генуи.',
      zh: '这里位于热那亚历史中心的核心地带，提供鸡尾酒、烈酒小杯和轻松欢乐的氛围。',
      lij: 'Cocktail, chupiti e divertimento into cheu do centro storico de Zêna.'
    },
    'Count Basie Jazz Club': {
      it: 'Ospitato nelle fondamenta dell’antico convento quattrocentesco di Santa Brigida, il Count Basie è un suggestivo jazz club e circolo culturale nel quartiere di Pré. Propone concerti, jam session e appuntamenti dedicati soprattutto al jazz e al blues, in sale in pietra caratterizzate da un’acustica particolarmente apprezzata.',
      en: 'Set within the foundations of the fifteenth-century convent of Santa Brigida, the Count Basie is an atmospheric jazz club and cultural association in the Pré district. It hosts concerts, jam sessions and events devoted mainly to jazz and blues, in stone rooms renowned for their excellent acoustics.',
      es: 'Ubicado en los cimientos del antiguo convento de Santa Brigida, del siglo XV, el Count Basie es un evocador club de jazz y círculo cultural del barrio de Pré. Organiza conciertos, jam sessions y encuentros dedicados principalmente al jazz y al blues, en salas de piedra con una acústica especialmente apreciada.',
      fr: 'Installé dans les fondations de l’ancien couvent Sainte-Brigitte du XVe siècle, le Count Basie est un club de jazz et un cercle culturel plein de charme dans le quartier de Pré. Il propose concerts, jam-sessions et rendez-vous principalement consacrés au jazz et au blues, dans des salles en pierre à l’acoustique très appréciée.',
      ar: 'يقع نادي Count Basie في أسس دير سانتا بريجيدا القديم الذي يعود إلى القرن الخامس عشر، وهو نادٍ مميز للجاز وجمعية ثقافية في حي بري. يقدم حفلات وجلسات ارتجالية وفعاليات تركز خصوصاً على موسيقى الجاز والبلوز، داخل قاعات حجرية ذات صوتيات ممتازة.',
      ru: 'Count Basie расположен в фундаментах старинного монастыря Санта-Бриджида XV века. Это атмосферный джаз-клуб и культурное объединение в районе Пре. Здесь проходят концерты, джем-сейшены и мероприятия, посвящённые прежде всего джазу и блюзу, в каменных залах с прекрасной акустикой.',
      zh: 'Count Basie 位于15世纪圣布里吉达修道院的地基之中，是普雷街区一家氛围独特的爵士乐俱乐部和文化协会。石砌厅堂的音响效果备受好评，这里举办以爵士乐和布鲁斯为主的音乐会、即兴演奏和专题活动。',
      lij: 'O Count Basie o l’è inte fondaçioin de l’antigo convento de Santa Brigida do Quattrocento, e o l’è un jazz club suggestivo e un circolo culturale into quartié de Pré. O propon concerti, jam session e appuntamenti dedicæ sorvetutto a-o jazz e a-o blues, inte sale de pria con unn’acustica ben aprexiâ.'
    },
    'Tao Disco Club': {
      it: 'Situato nel centro di Genova, a pochi passi da Piazza De Ferrari, il Tao Disco Club è un locale dedicato alla musica e alla vita notturna. La programmazione comprende serate con DJ set, musica dance ed eventi tematici, in uno spazio pensato per ballare e trascorrere la serata nel cuore della città.',
      en: 'Located in central Genoa, a short walk from Piazza De Ferrari, Tao Disco Club is a venue dedicated to music and nightlife. Its programme includes DJ sets, dance music and themed events in a space designed for dancing and enjoying an evening in the heart of the city.',
      es: 'Situado en el centro de Génova, a pocos pasos de la Piazza De Ferrari, Tao Disco Club es un local dedicado a la música y la vida nocturna. Su programación incluye sesiones de DJ, música dance y eventos temáticos en un espacio pensado para bailar y disfrutar de la noche en pleno centro.',
      fr: 'Situé dans le centre de Gênes, à quelques pas de la Piazza De Ferrari, le Tao Disco Club est un lieu consacré à la musique et à la vie nocturne. Sa programmation comprend des DJ sets, de la musique dance et des soirées thématiques, dans un espace conçu pour danser au cœur de la ville.',
      ar: 'يقع Tao Disco Club في وسط جنوة، على بعد خطوات من ساحة دي فيراري، وهو مكان مخصص للموسيقى والحياة الليلية. يشمل برنامجه حفلات DJ وموسيقى الرقص وفعاليات موضوعية في مكان مصمم للرقص وقضاء السهرة في قلب المدينة.',
      ru: 'Tao Disco Club находится в центре Генуи, в нескольких шагах от площади Де-Феррари, и посвящён музыке и ночной жизни. В программе — DJ-сеты, танцевальная музыка и тематические вечеринки в пространстве, созданном для танцев и отдыха в самом сердце города.',
      zh: 'Tao Disco Club 位于热那亚市中心，距离德·法拉利广场仅几步之遥，是一家专注于音乐和夜生活的俱乐部。这里举办 DJ 演出、舞曲之夜和各类主题活动，为人们在城市中心跳舞和度过夜晚而设。',
      lij: 'O Tao Disco Club o l’è into centro de Zêna, a pochi passi da Ciassa De Ferrari, e o l’è un locale dedicou a-a muxica e a-a vitta da neutte. O programma o comprende seræ con DJ set, muxica dance ed eventi a tema, inte un spaçio pensou pe ballâ e passâ a serâ into cheu da çitæ.'
    },
    'Music for Peace': {
      it: 'Music for Peace è un’associazione di volontariato con sede nell’area di San Benigno, impegnata nella raccolta e nella distribuzione di beni di prima necessità e in progetti umanitari. La sua sede ospita inoltre iniziative solidali, attività sociali, incontri, concerti e manifestazioni aperte alla cittadinanza.',
      en: 'Music for Peace is a volunteer association based in the San Benigno area, engaged in collecting and distributing essential goods and carrying out humanitarian projects. Its headquarters also hosts charitable initiatives, social activities, meetings, concerts and events open to the public.',
      es: 'Music for Peace es una asociación de voluntariado con sede en la zona de San Benigno, dedicada a recoger y distribuir bienes de primera necesidad y a desarrollar proyectos humanitarios. Su sede también acoge iniciativas solidarias, actividades sociales, encuentros, conciertos y eventos abiertos a la ciudadanía.',
      fr: 'Music for Peace est une association de bénévolat installée dans le quartier de San Benigno, engagée dans la collecte et la distribution de biens de première nécessité ainsi que dans des projets humanitaires. Son siège accueille également des initiatives solidaires, des activités sociales, des rencontres, des concerts et des manifestations ouvertes au public.',
      ar: 'Music for Peace جمعية تطوعية مقرها في منطقة سان بنينيو، وتعمل على جمع المواد الأساسية وتوزيعها وتنفيذ مشاريع إنسانية. كما يستضيف مقرها مبادرات تضامنية وأنشطة اجتماعية ولقاءات وحفلات وفعاليات مفتوحة للجمهور.',
      ru: 'Music for Peace — волонтёрская ассоциация в районе Сан-Бениньо, которая собирает и распределяет товары первой необходимости и реализует гуманитарные проекты. В её штаб-квартире также проходят благотворительные и общественные мероприя, встречи, концерты и открытые для горожан события.',
      zh: 'Music for Peace 是一家位于圣贝尼尼奥地区的志愿者协会，致力于收集和分发生活必需品，并开展人道主义项目。其总部还举办公益行动、社会活动、会议、音乐会以及向市民开放的各类活动。',
      lij: 'Music for Peace a l’è unn’assoçiaçion de volontariato con sede inte l’area de San Benigno, impegnâ inta raccolta e inta distribuçion de ben de primma necessitæ e inte progetti umanitäi. A sede a ospita anche iniçiative solidali, attivitæ soçiali, incontri, concerti e manifestaçioin averte a-a çitadinança.'
    },
    'Trattoria delle Grazie': {
      it: 'Situata nel caratteristico quartiere del Molo, la Trattoria delle Grazie propone piatti della cucina tradizionale genovese e ligure in un ambiente semplice e informale. È un luogo adatto per scoprire ricette locali e sapori della tradizione tra i vicoli del centro storico.',
      en: 'Located in the picturesque Molo district, Trattoria delle Grazie serves traditional Genoese and Ligurian dishes in a simple, informal setting. It is an inviting place to discover local recipes and traditional flavours among the narrow streets of the historic centre.',
      es: 'Situada en el característico barrio del Molo, la Trattoria delle Grazie ofrece platos de la cocina tradicional genovesa y ligur en un ambiente sencillo e informal. Es un lugar ideal para descubrir recetas locales y sabores tradicionales entre las callejuelas del centro histórico.',
      fr: 'Située dans le quartier pittoresque du Molo, la Trattoria delle Grazie propose des plats de la cuisine traditionnelle génoise et ligure dans un cadre simple et informel. C’est une adresse agréable pour découvrir les recettes locales et les saveurs de la tradition au cœur des ruelles du centre historique.',
      ar: 'تقع Trattoria delle Grazie في حي مولو المميز، وتقدم أطباقاً من المطبخ الجنوي والليغوري التقليدي في أجواء بسيطة وغير رسمية. وهي مكان مناسب لاكتشاف الوصفات المحلية ونكهات التقاليد بين أزقة المركز التاريخي.',
      ru: 'Trattoria delle Grazie находится в колоритном районе Моло и предлагает блюда традиционной генуэзской и лигурийской кухни в простой и неформальной обстановке. Это подходящее место, чтобы познакомиться с местными рецептами и традиционными вкусами среди узких улиц исторического центра.',
      zh: 'Trattoria delle Grazie 位于风景独特的莫洛街区，在朴素轻松的环境中提供传统的热那亚和利古里亚菜肴。这里是在历史中心的小巷间品尝当地食谱和传统风味的好去处。',
      lij: 'A Trattoria delle Grazie a l’è into caratteristico quartié do Molo e a propon piatti da cuxinn-a tradiçionâ zeneize e ligure inte un ambiente semplice e informale. A l’è un bon posto pe descrovî ricette locali e savoi da tradiçion tra i caruggi do centro storico.'
    },
    'Ristorante Trattoria da Maria': {
      it: 'La Trattoria da Maria è un locale tradizionale situato nel centro di Genova, nei pressi di Via Garibaldi e Piazza Fontane Marose. In un ambiente semplice e accogliente propone piatti della cucina casalinga genovese e italiana, offrendo un’esperienza legata all’atmosfera delle trattorie cittadine.',
      en: 'Trattoria da Maria is a traditional restaurant in central Genoa, near Via Garibaldi and Piazza Fontane Marose. In a simple and welcoming setting, it serves home-style Genoese and Italian dishes, offering an experience rooted in the atmosphere of the city\'s traditional trattorias.',
      es: 'La Trattoria da Maria es un restaurante tradicional situado en el centro de Génova, cerca de Via Garibaldi y Piazza Fontane Marose. En un ambiente sencillo y acogedor ofrece platos caseros de la cocina genovesa e italiana, conservando la atmósfera propia de las trattorias de la ciudad.',
      fr: 'La Trattoria da Maria est un restaurant traditionnel situé dans le centre de Gênes, près de la Via Garibaldi et de la Piazza Fontane Marose. Dans un cadre simple et accueillant, elle propose une cuisine familiale génoise et italienne, fidèle à l’atmosphère des trattorias de la ville.',
      ar: 'تراتوريا دا ماريا مطعم تقليدي يقع في وسط جنوة، بالقرب من فيا غاريبالدي وساحة فونتاني ماروزي. يقدم في أجواء بسيطة ومرحبة أطباقاً منزلية من المطبخ الجنوي والإيطالي، في تجربة تعكس أجواء التراتوريا التقليدية في المدينة.',
      ru: 'Trattoria da Maria — традиционное заведение в центре Генуи, недалеко от улицы Гарибальди и площади Фонтане-Марозе. В простой и уютной обстановке здесь подают домашние блюда генуэзской и итальянской кухни, сохраняя атмосферу городских тратторий.',
      zh: 'Trattoria da Maria 是一家位于热那亚市中心的传统餐馆，靠近加里波第大街和喷泉广场。这里环境朴素而亲切，提供家常风味的热那亚和意大利菜肴，保留了城市传统小餐馆的氛围。',
      lij: 'A Trattoria da Maria a l’è un locale tradiçionâ into centro de Zêna, vixin a Via Garibaldi e a Ciassa Fontane Marose. Inte un ambiente semplice e accogliente a propon piatti da cuxinn-a de casa zeneize e italian-a, con l’atmosfera de trattorie da çitæ.'
    },
    'Together Bar': {
      it: 'Cocktail, birra e compagnia nel quartiere del Carmine.',
      en: 'Cocktails, beer and good company in the Carmine district.',
      es: 'Cócteles, cerveza y buena compañía en el barrio del Carmine.',
      fr: 'Cocktails, bière et bonne compagnie dans le quartier du Carmine.',
      ar: 'كوكتيلات وبيرة ورفقة طيبة في حي كارميني.',
      ru: 'Коктейли, пиво и приятная компания в районе Кармине.',
      zh: '在卡尔米内街区享受鸡尾酒、啤酒和愉快的相聚时光。',
      lij: 'Cocktail, bira e compagnia into quartié do Carmine.'
    },
    'Trattoria da Mario': {
      it: 'Immersa nei vicoli del centro storico di Genova, la Trattoria Da Mario vi aspetta per farvi gustare ottimi piatti della tipica cucina genovese e ligure. Le sue specialità comprendono piatti di pesce, come spaghetti allo scoglio e risotto alla pescatora, fritture miste di pesce fresco e un ampio assortimento di proposte a base di carne.',
      en: 'Nestled among the narrow streets of Genoa\'s historic centre, Trattoria Da Mario serves dishes inspired by traditional Genoese and Ligurian cuisine. Its specialities include seafood dishes such as spaghetti allo scoglio and fisherman-style risotto, mixed fried fresh fish and a wide selection of meat dishes.',
      es: 'Enclavada entre las callejuelas del centro histórico de Génova, la Trattoria Da Mario ofrece platos inspirados en la cocina típica genovesa y ligur. Entre sus especialidades destacan los platos de pescado, como los espaguetis allo scoglio y el risotto a la pescatora, las frituras mixtas de pescado fresco y una amplia selección de carnes.',
      fr: 'Nichée dans les ruelles du centre historique de Gênes, la Trattoria Da Mario propose des plats inspirés de la cuisine génoise et ligure traditionnelle. Ses spécialités comprennent des plats de poisson, comme les spaghetti allo scoglio et le risotto à la pêcheur, des fritures de poisson frais et un large choix de viandes.',
      ar: 'تقع Trattoria Da Mario بين أزقة المركز التاريخي لجنوة، وتقدم أطباقاً مستوحاة من المطبخ الجنوي والليغوري التقليدي. وتشمل تخصصاتها أطباق الأسماك، مثل سباغيتي ثمار البحر وريزوتو الصياد، وتشكيلة مقلية من السمك الطازج، إلى جانب مجموعة واسعة من أطباق اللحوم.',
      ru: 'Trattoria Da Mario, расположенная среди узких улиц исторического центра Генуи, предлагает блюда традиционной генуэзской и лигурийской кухни. Среди фирменных блюд — рыба и морепродукты, включая спагетти алло скольо и ризотто по-рыбацки, ассорти из свежей жареной рыбы и широкий выбор мясных блюд.',
      zh: 'Trattoria Da Mario 藏身于热那亚历史中心的小巷之中，提供具有传统热那亚和利古里亚风味的菜肴。特色菜包括海鲜意面、渔夫烩饭等鱼类菜肴、新鲜炸鱼拼盘，以及多种肉类菜品。',
      lij: 'Imersa inti caruggi do centro storico de Zêna, a Trattoria Da Mario a propon piatti da tipica cuxinn-a zeneize e ligure. E seu speçialitæ comprendan piatti de pesce, comme spaghetti a-o scoglio e risotto a-a pescatora, fritûe miste de pesce fresco e un vasto assortimento de piatti de carne.'
    },
    'Tasche Piene': {
      it: 'Un incrocio perfetto tra street food e gastronomia ligure di quartiere. Serve piatti caldi tradizionali o in formato “tasca”, un pane farcito croccante fuori e morbido dentro, a pochi passi dalla Cattedrale.',
      en: 'A perfect meeting point between street food and neighbourhood Ligurian gastronomy. A short walk from the Cathedral, it serves traditional hot dishes or its signature “pockets”: filled bread that is crisp outside and soft inside.',
      es: 'Una combinación perfecta de comida callejera y gastronomía ligur de barrio. A pocos pasos de la Catedral sirve platos calientes tradicionales o sus características “tascas”: panes rellenos, crujientes por fuera y tiernos por dentro.',
      fr: 'Un parfait croisement entre street food et gastronomie ligure de quartier. À quelques pas de la cathédrale, l’établissement sert des plats chauds traditionnels ou ses « poches » : un pain farci, croustillant à l’extérieur et moelleux à l’intérieur.',
      ar: 'مزيج مثالي بين طعام الشارع ومطبخ ليغوريا المحلي. على بعد خطوات من الكاتدرائية، يقدم أطباقاً ساخنة تقليدية أو “جيوباً” من الخبز المحشو، مقرمشاً من الخارج وطرياً من الداخل.',
      ru: 'Здесь уличная еда соединяется с лигурийской гастрономией. В нескольких шагах от собора подают традиционные горячие блюда или фирменные «кармашки» — хлеб с начинкой, хрустящий снаружи и мягкий внутри.',
      zh: '这里将街头小吃与社区式利古里亚美食完美结合。餐厅距离大教堂仅几步之遥，提供传统热菜和特色“口袋”面包：外皮酥脆，内里柔软并夹有馅料。',
      lij: 'Un incrocio perfetto tra street food e gastronomia ligure de quartié. A pochi passi da-a Cattedrale o serve piatti caodi tradiçionæ o in formato “tasca”: pan pinn-o, croccante de feua e mòggio drento.'
    },
    'Tapullo Street Genova': {
      it: 'Un piccolo angolo che propone “cibo che parla dialetto” ligure. Offre street food ispirato alla cucina tradizionale della regione e preparato con materie prime del territorio.',
      en: 'A small spot serving “food that speaks the Ligurian dialect”. It offers street food inspired by the region\'s traditional cuisine and prepared with local ingredients.',
      es: 'Un pequeño rincón que propone “comida que habla dialecto” ligur. Ofrece comida callejera inspirada en la cocina tradicional de la región y preparada con productos locales.',
      fr: 'Une petite adresse qui propose une « cuisine parlant le dialecte » ligure. Elle offre une street food inspirée de la cuisine traditionnelle de la région et préparée avec des produits locaux.',
      ar: 'زاوية صغيرة تقدم “طعاماً يتحدث بلهجة ليغوريا”. وهي تقدم طعام شوارع مستوحى من المطبخ التقليدي للمنطقة ومعداً بمكونات محلية.',
      ru: 'Небольшое заведение, где подают «еду, говорящую на лигурийском диалекте». Местный стрит-фуд вдохновлён традиционной кухней региона и готовится из местных продуктов.',
      zh: '这是一家小巧的店铺，提供“会说利古里亚方言的美食”。街头小吃源自当地传统菜肴，并选用本地食材制作。',
      lij: 'Un piccolo canto che o propon “mangiâ che o parla in dialetto” ligure. O l’offre street food ispirou a-a cuxinn-a tradiçionâ da region e preparou con materie primme do territorio.'
    },
    "Roast 'n Roll": {
      it: 'Molto conosciuto tra i vicoli dagli amanti della carne, prepara gustosi panini farciti espressi, tra cui spicca quello al roast beef accompagnato da salse artigianali.',
      en: 'Well known among meat lovers in the narrow streets of Genoa, it prepares tasty filled sandwiches to order. Its highlights include the roast beef sandwich served with house-made sauces.',
      es: 'Muy conocido entre los amantes de la carne en las callejuelas genovesas, prepara sabrosos bocadillos rellenos al momento. Destaca especialmente el bocadillo de roast beef acompañado de salsas artesanales.',
      fr: 'Très apprécié des amateurs de viande dans les ruelles génoises, l’établissement prépare à la demande de savoureux sandwichs garnis. Le sandwich au roast-beef accompagné de sauces artisanales compte parmi ses spécialités.',
      ar: 'مشهور بين أزقة جنوة لدى محبي اللحوم، ويحضر شطائر محشوة لذيذة عند الطلب. ومن أبرز خياراته شطيرة الروست بيف المقدمة مع صلصات مصنوعة يدوياً.',
      ru: 'Это заведение хорошо известно среди любителей мяса в генуэзских переулках и готовит аппетитные сэндвичи под заказ. Особенно популярен сэндвич с ростбифом и домашними соусами.',
      zh: '这家店在热那亚小巷的肉食爱好者中很有名，现点现做各种美味夹馅三明治。其中尤以搭配手工酱汁的烤牛肉三明治最具特色。',
      lij: 'Ben conosciuo tra i caruggi da chi o l’ama a carne, o prepara bon panin pinn-i fatti a-o momento. Tra i ciù aprexiæ gh’è quello co-o roast beef e salse artixanali.'
    },
    'B&B La Piazzetta Rooms': {
      it: 'Struttura di lusso ospitata in un affascinante edificio del XVI secolo nel centro storico di Genova, con camere ampie ed eleganti.',
      en: 'An elegant accommodation housed in a charming sixteenth-century building in Genoa\'s historic centre, offering spacious and refined rooms.',
      es: 'Un alojamiento elegante situado en un encantador edificio del siglo XVI del centro histórico de Génova, con habitaciones amplias y refinadas.',
      fr: 'Un hébergement élégant installé dans un charmant bâtiment du XVIe siècle au cœur du centre historique de Gênes, avec des chambres spacieuses et raffinées.',
      ar: 'مكان إقامة أنيق يقع في مبنى ساحر يعود إلى القرن السادس عشر في المركز التاريخي لجنوة، ويوفر غرفاً واسعة وراقية.',
      ru: 'Элегантное место размещения в очаровательном здании XVI века в историческом центре Генуи, с просторными и изысканными номерами.',
      zh: '这家精致的住宿位于热那亚历史中心一栋迷人的16世纪建筑内，提供宽敞而优雅的客房。',
      lij: 'Struttura elegante inte un affascinante edifiçio do Cinquecento into centro storico de Zêna, con camare ampie e raffinæ.'
    },
    "B&B Dell'Acquario": {
      it: 'Situato in posizione strategica vicino al Porto Antico e all’Acquario, offre sistemazioni familiari essenziali dotate di un comodo angolo cottura autogestito.',
      en: 'Conveniently located near the Porto Antico and the Aquarium, it offers practical family accommodation equipped with a useful self-catering kitchenette.',
      es: 'Situado en una posición estratégica cerca del Porto Antico y del Acuario, ofrece alojamientos familiares funcionales equipados con una práctica cocina americana.',
      fr: 'Idéalement situé près du Porto Antico et de l’Aquarium, l’établissement propose des hébergements familiaux fonctionnels dotés d’une kitchenette pratique pour cuisiner en autonomie.',
      ar: 'يتميز بموقع ملائم بالقرب من الميناء القديم وحوض الأسماك، ويوفر مكان إقامة عملياً للعائلات مزوداً بمطبخ صغير مناسب للطهي الذاتي.',
      ru: 'Благодаря удобному расположению рядом с Порто-Антико и Аквариумом здесь предлагают практичные семейные апартаменты с удобной мини-кухней для самостоятельного приготовления еды.',
      zh: '这里位置便利，靠近旧港和水族馆，提供简洁实用的家庭住宿，并配有便于自行烹饪的小厨房。',
      lij: 'In unna posiçion comoda vixin a-o Porto Antigo e a l’Acquario, o l’offre sistemmaçioin famigliæ essenziali con un pratico canto cottua pe cuxinâ in autonomia.'
    },
    'Hotel Continental': {
      it: 'Hotel raffinato a quattro stelle ospitato in un edificio in stile Liberty del XIX secolo, situato proprio di fronte alla stazione ferroviaria di Piazza Principe.',
      en: 'A refined four-star hotel housed in a nineteenth-century Art Nouveau building, located directly opposite Piazza Principe railway station.',
      es: 'Un refinado hotel de cuatro estrellas ubicado en un edificio modernista del siglo XIX, justo enfrente de la estación ferroviaria de Piazza Principe.',
      fr: 'Un élégant hôtel quatre étoiles installé dans un bâtiment Art nouveau du XIXe siècle, juste en face de la gare de Piazza Principe.',
      ar: 'فندق راقٍ من فئة أربع نجوم، يقع في مبنى من القرن التاسع عشر على طراز الآر نوفو، مقابل محطة قطار بياتسا برينتشيبي مباشرة.',
      ru: 'Изысканный четырёхзвёздочный отель в здании XIX века в стиле модерн, расположенном прямо напротив железнодорожного вокзала Пьяцца-Принчипе.',
      zh: '这是一家精致的四星级酒店，坐落在一栋19世纪新艺术风格建筑内，正对普林西佩广场火车站。',
      lij: 'Hotel raffinou de quattro stelle inte un edifiçio do XIX secolo in stile Liberty, proprio de fronte a-a staçion ferroviäia de Ciassa Prinçipe.'
    }
  };

  var points = Array.isArray(window.LOCALI_POINTS) ? window.LOCALI_POINTS : [];
  points.forEach(function(point){
    if(point && descriptions[point.name]) point.desc = descriptions[point.name];
  });
  window.LOCALI_DESCRIPTIONS_I18N = descriptions;
})();
