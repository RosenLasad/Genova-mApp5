/* Genova mApp - Impostazioni v2: sezioni, ripristino, versione e informazioni. */
(function(){
  'use strict';
  if(window.__GENOVA_SETTINGS_V2__) return;
  window.__GENOVA_SETTINGS_V2__ = true;

  var APP_VERSION = '1.3.1';

  var I18N = {
    it:{
      sections:{help:'Aiuto',display:'Aspetto e leggibilità',data:'Dati e preferenze',info:'Informazioni'},
      welcome:'Benvenuto',guide:'Guida e istruzioni',contact:'Contattaci',reset:'Ripristina Genova mApp',about:'Informazioni su Genova mApp',version:'Versione app',installed:'Installata',web:'Versione web',
      resetTitle:'Ripristinare Genova mApp?',
      resetText:'Verranno cancellati Taccuino, Preferiti, percorsi, note, stato dei punti QR e le preferenze salvate nell’app. La dimensione del testo tornerà su Medio. Account, immagine del profilo e abbonamento non verranno modificati.',
      cancel:'Annulla',confirmReset:'Ripristina',resetting:'Ripristino…',close:'Chiudi',back:'Torna alle Impostazioni',
      aboutTitle:'Informazioni su Genova mApp',
      aboutIntro:'Genova mApp è uno strumento digitale dedicato alla scoperta di Genova, pensato per riunire in un’unica esperienza la città di oggi e la sua memoria storica.',
      aboutSections:[
        {title:'Genova mApp',paras:[
          'Attraverso la mappa è possibile esplorare luoghi, servizi, trasporti, cultura, intrattenimento, percorsi e contenuti multimediali, insieme al patrimonio storico della città: chiese, palazzi, ville, fortificazioni, mura, acquedotti e molti altri luoghi di interesse.',
          'Genova mApp utilizza inoltre strumenti interattivi e contenuti originali, come i punti QR dedicati alla città, che permettono di scoprire fotografie storiche restaurate, colorate e animate e di osservare l’evoluzione di Genova nel tempo.',
          'L’obiettivo del progetto è offrire a cittadini e visitatori uno strumento semplice per conoscere, esplorare e valorizzare Genova, unendo informazioni utili per vivere la città di oggi alla conoscenza e alla condivisione della sua storia.'
        ]},
        {title:'Il progetto',paras:[
          'Genova mApp è un progetto ideato, progettato e realizzato da Alessandro Bellagamba, regista e divulgatore storico, direttore della SDAC – Scuola d’Arte Cinematografica di Genova.',
          'Il progetto nasce dall’idea di utilizzare le tecnologie digitali non soltanto per orientarsi nella città, ma anche per raccontarla: collegando luoghi, immagini, storie, percorsi e servizi in una mappa in continua evoluzione.'
        ]},
        {title:'Privacy e dati personali',paras:[
          'Genova mApp utilizza alcuni dati necessari per offrire le funzioni personali dell’app.',
          'Quando viene utilizzato un account, possono essere associati all’utente dati relativi all’iscrizione e all’abbonamento, l’immagine del profilo, i Preferiti e i contenuti del Taccuino. Lo stato dei punti QR visitati o non visitati e alcune preferenze restano invece salvati localmente sul dispositivo.',
          'L’accesso all’account è gestito tramite Netlify, mentre i pagamenti relativi agli abbonamenti sono gestiti tramite Stripe.',
          'La posizione del dispositivo viene utilizzata solo quando l’utente attiva volontariamente una funzione che la richiede, per esempio per mostrare la propria posizione sulla mappa.',
          'Le funzioni personali sono utilizzate per permettere all’utente di ritrovare e organizzare i propri contenuti e le proprie preferenze all’interno di Genova mApp.'
        ]},
        {title:'Contenuti',paras:[
          'I testi, le elaborazioni grafiche, i contenuti multimediali e gli altri materiali originali presenti in Genova mApp fanno parte del progetto Genova mApp, salvo eventuali indicazioni differenti riportate nei singoli contenuti.'
        ]},
        {title:'Versione e aggiornamenti',version:true,paras:[
          'Genova mApp è un progetto in continua evoluzione e viene aggiornato progressivamente con nuovi luoghi, percorsi, servizi, strumenti e contenuti.'
        ]}
      ]
    },
    en:{
      sections:{help:'Help',display:'Appearance and readability',data:'Data and preferences',info:'Information'},
      welcome:'Welcome',guide:'Guide and instructions',contact:'Contact us',reset:'Reset Genova mApp',about:'About Genova mApp',version:'App version',installed:'Installed',web:'Web version',
      resetTitle:'Reset Genova mApp?',
      resetText:'The Notebook, Favourites, routes, notes, QR point status and preferences saved in the app will be deleted. Text size will return to Medium. Your account, profile image and subscription will not be changed.',
      cancel:'Cancel',confirmReset:'Reset',resetting:'Resetting…',close:'Close',back:'Back to Settings',
      aboutTitle:'About Genova mApp',
      aboutIntro:'Genova mApp is a digital tool for discovering Genoa, designed to bring together today’s city and its historical memory in a single experience.',
      aboutSections:[
        {title:'Genova mApp',paras:[
          'Through the map you can explore places, services, transport, culture, entertainment, routes and multimedia content, together with the city’s historical heritage: churches, palaces, villas, fortifications, walls, aqueducts and many other places of interest.',
          'Genova mApp also uses interactive tools and original content, such as QR points dedicated to the city, where you can discover restored, colourised and animated historical photographs and observe how Genoa has changed over time.',
          'The project aims to offer residents and visitors a simple way to discover, explore and appreciate Genoa, combining useful information for experiencing the city today with knowledge and sharing of its history.'
        ]},
        {title:'The project',paras:[
          'Genova mApp was conceived, designed and created by Alessandro Bellagamba, film director and history communicator, director of SDAC – Scuola d’Arte Cinematografica di Genova.',
          'The project grew from the idea of using digital technology not only to find your way around the city, but also to tell its story: connecting places, images, stories, routes and services in a map that continues to evolve.'
        ]},
        {title:'Privacy and personal data',paras:[
          'Genova mApp uses certain data needed to provide the app’s personal features.',
          'When an account is used, data relating to registration and subscription, the profile image, Favourites and Notebook contents may be associated with the user. The visited or not-visited status of QR points and some preferences remain stored locally on the device.',
          'Account access is managed through Netlify, while subscription payments are handled through Stripe.',
          'The device location is used only when the user voluntarily activates a feature that requires it, for example to show their position on the map.',
          'Personal features are used to let users find and organise their own content and preferences within Genova mApp.'
        ]},
        {title:'Content',paras:[
          'The texts, graphic work, multimedia content and other original materials in Genova mApp are part of the Genova mApp project, unless otherwise indicated within individual content.'
        ]},
        {title:'Version and updates',version:true,paras:[
          'Genova mApp is an evolving project and is progressively updated with new places, routes, services, tools and content.'
        ]}
      ]
    },
    es:{
      sections:{help:'Ayuda',display:'Aspecto y legibilidad',data:'Datos y preferencias',info:'Información'},
      welcome:'Bienvenido',guide:'Guía e instrucciones',contact:'Contáctanos',reset:'Restablecer Genova mApp',about:'Información sobre Genova mApp',version:'Versión de la app',installed:'Instalada',web:'Versión web',
      resetTitle:'¿Restablecer Genova mApp?',
      resetText:'Se eliminarán el Cuaderno, Favoritos, rutas, notas, el estado de los puntos QR y las preferencias guardadas en la app. El tamaño del texto volverá a Mediano. La cuenta, la imagen de perfil y la suscripción no se modificarán.',
      cancel:'Cancelar',confirmReset:'Restablecer',resetting:'Restableciendo…',close:'Cerrar',back:'Volver a Ajustes',
      aboutTitle:'Información sobre Genova mApp',
      aboutIntro:'Genova mApp es una herramienta digital dedicada a descubrir Génova, pensada para reunir en una sola experiencia la ciudad actual y su memoria histórica.',
      aboutSections:[
        {title:'Genova mApp',paras:[
          'A través del mapa es posible explorar lugares, servicios, transportes, cultura, entretenimiento, recorridos y contenidos multimedia, junto con el patrimonio histórico de la ciudad: iglesias, palacios, villas, fortificaciones, murallas, acueductos y muchos otros lugares de interés.',
          'Genova mApp también utiliza herramientas interactivas y contenidos originales, como los puntos QR dedicados a la ciudad, que permiten descubrir fotografías históricas restauradas, coloreadas y animadas y observar la evolución de Génova a lo largo del tiempo.',
          'El objetivo del proyecto es ofrecer a ciudadanos y visitantes una herramienta sencilla para conocer, explorar y valorar Génova, uniendo información útil para vivir la ciudad actual con el conocimiento y la difusión de su historia.'
        ]},
        {title:'El proyecto',paras:[
          'Genova mApp es un proyecto ideado, diseñado y realizado por Alessandro Bellagamba, director de cine y divulgador histórico, director de la SDAC – Scuola d’Arte Cinematografica di Genova.',
          'El proyecto nace de la idea de utilizar las tecnologías digitales no solo para orientarse por la ciudad, sino también para contarla: conectando lugares, imágenes, historias, recorridos y servicios en un mapa en continua evolución.'
        ]},
        {title:'Privacidad y datos personales',paras:[
          'Genova mApp utiliza algunos datos necesarios para ofrecer las funciones personales de la aplicación.',
          'Cuando se utiliza una cuenta, pueden asociarse al usuario datos relativos al registro y la suscripción, la imagen de perfil, los Favoritos y los contenidos del Cuaderno. El estado de los puntos QR visitados o no visitados y algunas preferencias permanecen guardados localmente en el dispositivo.',
          'El acceso a la cuenta se gestiona mediante Netlify, mientras que los pagos de las suscripciones se gestionan mediante Stripe.',
          'La ubicación del dispositivo se utiliza solo cuando el usuario activa voluntariamente una función que la necesita, por ejemplo para mostrar su posición en el mapa.',
          'Las funciones personales permiten al usuario recuperar y organizar sus contenidos y preferencias dentro de Genova mApp.'
        ]},
        {title:'Contenidos',paras:[
          'Los textos, elaboraciones gráficas, contenidos multimedia y demás materiales originales presentes en Genova mApp forman parte del proyecto Genova mApp, salvo que se indique lo contrario en contenidos concretos.'
        ]},
        {title:'Versión y actualizaciones',version:true,paras:[
          'Genova mApp es un proyecto en continua evolución y se actualiza progresivamente con nuevos lugares, recorridos, servicios, herramientas y contenidos.'
        ]}
      ]
    },
    fr:{
      sections:{help:'Aide',display:'Apparence et lisibilité',data:'Données et préférences',info:'Informations'},
      welcome:'Bienvenue',guide:'Guide et instructions',contact:'Nous contacter',reset:'Réinitialiser Genova mApp',about:'À propos de Genova mApp',version:'Version de l’app',installed:'Installée',web:'Version web',
      resetTitle:'Réinitialiser Genova mApp ?',
      resetText:'Le Carnet, les Favoris, les parcours, les notes, l’état des points QR et les préférences enregistrées dans l’app seront supprimés. La taille du texte reviendra à Moyenne. Le compte, l’image de profil et l’abonnement ne seront pas modifiés.',
      cancel:'Annuler',confirmReset:'Réinitialiser',resetting:'Réinitialisation…',close:'Fermer',back:'Retour aux Paramètres',
      aboutTitle:'À propos de Genova mApp',
      aboutIntro:'Genova mApp est un outil numérique consacré à la découverte de Gênes, conçu pour réunir en une seule expérience la ville d’aujourd’hui et sa mémoire historique.',
      aboutSections:[
        {title:'Genova mApp',paras:[
          'Grâce à la carte, il est possible d’explorer des lieux, services, transports, activités culturelles et de loisirs, parcours et contenus multimédias, ainsi que le patrimoine historique de la ville : églises, palais, villas, fortifications, murailles, aqueducs et de nombreux autres lieux d’intérêt.',
          'Genova mApp utilise également des outils interactifs et des contenus originaux, comme les points QR consacrés à la ville, qui permettent de découvrir des photographies historiques restaurées, colorisées et animées et d’observer l’évolution de Gênes au fil du temps.',
          'Le projet vise à offrir aux habitants et aux visiteurs un outil simple pour connaître, explorer et valoriser Gênes, en réunissant des informations utiles pour vivre la ville actuelle et la connaissance et le partage de son histoire.'
        ]},
        {title:'Le projet',paras:[
          'Genova mApp est un projet imaginé, conçu et réalisé par Alessandro Bellagamba, réalisateur et vulgarisateur historique, directeur de la SDAC – Scuola d’Arte Cinematografica di Genova.',
          'Le projet est né de l’idée d’utiliser les technologies numériques non seulement pour s’orienter dans la ville, mais aussi pour la raconter : en reliant lieux, images, histoires, parcours et services au sein d’une carte en constante évolution.'
        ]},
        {title:'Confidentialité et données personnelles',paras:[
          'Genova mApp utilise certaines données nécessaires pour proposer les fonctions personnelles de l’application.',
          'Lorsqu’un compte est utilisé, des données liées à l’inscription et à l’abonnement, l’image de profil, les Favoris et le contenu du Carnet peuvent être associés à l’utilisateur. L’état visité ou non visité des points QR et certaines préférences restent enregistrés localement sur l’appareil.',
          'L’accès au compte est géré via Netlify, tandis que les paiements liés aux abonnements sont gérés via Stripe.',
          'La position de l’appareil est utilisée uniquement lorsque l’utilisateur active volontairement une fonction qui la nécessite, par exemple pour afficher sa position sur la carte.',
          'Les fonctions personnelles permettent à l’utilisateur de retrouver et d’organiser ses contenus et préférences dans Genova mApp.'
        ]},
        {title:'Contenus',paras:[
          'Les textes, créations graphiques, contenus multimédias et autres matériaux originaux présents dans Genova mApp font partie du projet Genova mApp, sauf indication différente dans un contenu particulier.'
        ]},
        {title:'Version et mises à jour',version:true,paras:[
          'Genova mApp est un projet en constante évolution et s’enrichit progressivement de nouveaux lieux, parcours, services, outils et contenus.'
        ]}
      ]
    },
    ar:{
      sections:{help:'المساعدة',display:'المظهر وسهولة القراءة',data:'البيانات والتفضيلات',info:'معلومات'},
      welcome:'مرحباً',guide:'الدليل والتعليمات',contact:'اتصل بنا',reset:'إعادة ضبط Genova mApp',about:'حول Genova mApp',version:'إصدار التطبيق',installed:'مثبّت',web:'إصدار الويب',
      resetTitle:'إعادة ضبط Genova mApp؟',
      resetText:'سيتم حذف دفتر الملاحظات والمفضلة والمسارات والملاحظات وحالة نقاط QR والتفضيلات المحفوظة في التطبيق. سيعود حجم النص إلى المتوسط. لن يتم تعديل الحساب أو صورة الملف الشخصي أو الاشتراك.',
      cancel:'إلغاء',confirmReset:'إعادة الضبط',resetting:'جارٍ إعادة الضبط…',close:'إغلاق',back:'العودة إلى الإعدادات',
      aboutTitle:'حول Genova mApp',
      aboutIntro:'Genova mApp أداة رقمية مخصصة لاكتشاف جنوة، صُممت لتجمع في تجربة واحدة المدينة المعاصرة وذاكرتها التاريخية.',
      aboutSections:[
        {title:'Genova mApp',paras:[
          'من خلال الخريطة يمكن استكشاف الأماكن والخدمات ووسائل النقل والثقافة والترفيه والمسارات والمحتوى متعدد الوسائط، إلى جانب التراث التاريخي للمدينة: الكنائس والقصور والفيلات والتحصينات والأسوار والقنوات المائية والعديد من الأماكن الأخرى المهمة.',
          'تستخدم Genova mApp أيضاً أدوات تفاعلية ومحتوى أصلياً، مثل نقاط QR المخصصة للمدينة، التي تتيح اكتشاف صور تاريخية تم ترميمها وتلوينها وتحريكها ومشاهدة تطور جنوة عبر الزمن.',
          'يهدف المشروع إلى تقديم أداة بسيطة للسكان والزوار للتعرف إلى جنوة واستكشافها وتقدير قيمتها، عبر الجمع بين المعلومات المفيدة للحياة في المدينة اليوم ومعرفة تاريخها ومشاركته.'
        ]},
        {title:'المشروع',paras:[
          'Genova mApp مشروع ابتكره وصممه ونفذه Alessandro Bellagamba، المخرج والمهتم بالتوعية التاريخية ومدير SDAC – Scuola d’Arte Cinematografica di Genova.',
          'انبثق المشروع من فكرة استخدام التقنيات الرقمية ليس فقط للتنقل داخل المدينة، بل أيضاً لرواية قصتها، من خلال ربط الأماكن والصور والقصص والمسارات والخدمات في خريطة تتطور باستمرار.'
        ]},
        {title:'الخصوصية والبيانات الشخصية',paras:[
          'تستخدم Genova mApp بعض البيانات اللازمة لتوفير الوظائف الشخصية في التطبيق.',
          'عند استخدام حساب، قد ترتبط بالمستخدم بيانات التسجيل والاشتراك وصورة الملف الشخصي والمفضلة ومحتويات دفتر الملاحظات. أما حالة نقاط QR التي تمت زيارتها أو لم تتم زيارتها وبعض التفضيلات فتبقى محفوظة محلياً على الجهاز.',
          'تتم إدارة الوصول إلى الحساب عبر Netlify، بينما تتم إدارة المدفوعات المتعلقة بالاشتراكات عبر Stripe.',
          'يتم استخدام موقع الجهاز فقط عندما يفعّل المستخدم طوعاً وظيفة تتطلبه، مثل إظهار موقعه على الخريطة.',
          'تُستخدم الوظائف الشخصية للسماح للمستخدم بالعثور على محتواه وتفضيلاته وتنظيمها داخل Genova mApp.'
        ]},
        {title:'المحتوى',paras:[
          'النصوص والأعمال الرسومية والمحتوى متعدد الوسائط والمواد الأصلية الأخرى الموجودة في Genova mApp هي جزء من مشروع Genova mApp، ما لم يُذكر خلاف ذلك في محتوى معين.'
        ]},
        {title:'الإصدار والتحديثات',version:true,paras:[
          'Genova mApp مشروع في تطور مستمر ويتم تحديثه تدريجياً بإضافة أماكن ومسارات وخدمات وأدوات ومحتويات جديدة.'
        ]}
      ]
    },
    ru:{
      sections:{help:'Помощь',display:'Внешний вид и читаемость',data:'Данные и настройки',info:'Информация'},
      welcome:'Добро пожаловать',guide:'Руководство и инструкции',contact:'Связаться с нами',reset:'Сбросить Genova mApp',about:'О Genova mApp',version:'Версия приложения',installed:'Установлена',web:'Веб-версия',
      resetTitle:'Сбросить Genova mApp?',
      resetText:'Будут удалены Блокнот, Избранное, маршруты, заметки, статус QR-точек и сохранённые настройки приложения. Размер текста вернётся к среднему. Аккаунт, изображение профиля и подписка не изменятся.',
      cancel:'Отмена',confirmReset:'Сбросить',resetting:'Сброс…',close:'Закрыть',back:'Назад к настройкам',
      aboutTitle:'О Genova mApp',
      aboutIntro:'Genova mApp — цифровой инструмент для знакомства с Генуей, созданный для объединения современной жизни города и его исторической памяти в одном опыте.',
      aboutSections:[
        {title:'Genova mApp',paras:[
          'С помощью карты можно исследовать места, услуги, транспорт, культуру, развлечения, маршруты и мультимедийные материалы, а также историческое наследие города: церкви, дворцы, виллы, укрепления, стены, акведуки и многие другие достопримечательности.',
          'Genova mApp также использует интерактивные инструменты и оригинальные материалы, например городские QR-точки, где можно увидеть восстановленные, раскрашенные и анимированные исторические фотографии и проследить, как Генуя менялась со временем.',
          'Цель проекта — предоставить жителям и гостям простой инструмент для знакомства с Генуей, её исследования и сохранения её ценности, сочетая полезную информацию о современном городе со знанием и распространением его истории.'
        ]},
        {title:'Проект',paras:[
          'Genova mApp — проект, задуманный, спроектированный и реализованный Alessandro Bellagamba, режиссёром и популяризатором истории, директором SDAC – Scuola d’Arte Cinematografica di Genova.',
          'Проект возник из идеи использовать цифровые технологии не только для навигации по городу, но и для рассказа о нём: объединяя места, изображения, истории, маршруты и сервисы на постоянно развивающейся карте.'
        ]},
        {title:'Конфиденциальность и персональные данные',paras:[
          'Genova mApp использует некоторые данные, необходимые для работы персональных функций приложения.',
          'При использовании аккаунта с пользователем могут быть связаны данные о регистрации и подписке, изображение профиля, Избранное и содержимое Блокнота. Статус посещённых или непосещённых QR-точек и некоторые настройки остаются сохранёнными локально на устройстве.',
          'Доступ к аккаунту управляется через Netlify, а платежи по подписке обрабатываются через Stripe.',
          'Местоположение устройства используется только тогда, когда пользователь сам включает функцию, которой оно необходимо, например для отображения своей позиции на карте.',
          'Персональные функции помогают пользователю находить и организовывать собственные материалы и настройки внутри Genova mApp.'
        ]},
        {title:'Материалы',paras:[
          'Тексты, графические материалы, мультимедийный контент и другие оригинальные материалы в Genova mApp являются частью проекта Genova mApp, если в конкретном материале не указано иное.'
        ]},
        {title:'Версия и обновления',version:true,paras:[
          'Genova mApp постоянно развивается и постепенно пополняется новыми местами, маршрутами, сервисами, инструментами и материалами.'
        ]}
      ]
    },
    zh:{
      sections:{help:'帮助',display:'外观与可读性',data:'数据与偏好',info:'信息'},
      welcome:'欢迎',guide:'指南与说明',contact:'联系我们',reset:'重置 Genova mApp',about:'关于 Genova mApp',version:'应用版本',installed:'已安装',web:'网页版',
      resetTitle:'要重置 Genova mApp 吗？',
      resetText:'将删除记事本、收藏、路线、笔记、QR 点访问状态以及应用中保存的偏好设置。文字大小将恢复为“中”。账号、头像和订阅不会被修改。',
      cancel:'取消',confirmReset:'重置',resetting:'正在重置…',close:'关闭',back:'返回设置',
      aboutTitle:'关于 Genova mApp',
      aboutIntro:'Genova mApp 是一款用于探索热那亚的数字工具，旨在将今天的城市生活与其历史记忆融入同一种体验。',
      aboutSections:[
        {title:'Genova mApp',paras:[
          '通过地图，你可以探索地点、服务、交通、文化、娱乐、路线和多媒体内容，同时了解城市的历史遗产：教堂、宫殿、别墅、防御工事、城墙、输水道以及许多其他值得关注的地点。',
          'Genova mApp 还采用互动工具和原创内容，例如分布在城市中的 QR 点，让用户可以查看经过修复、上色和动画处理的历史照片，并观察热那亚随时间发生的变化。',
          '该项目旨在为市民和游客提供一种简单的方式来认识、探索并珍视热那亚，把体验今日城市所需的实用信息与对城市历史的了解和分享结合起来。'
        ]},
        {title:'项目',paras:[
          'Genova mApp 由电影导演、历史传播者以及 SDAC – Scuola d’Arte Cinematografica di Genova 校长 Alessandro Bellagamba 构思、设计并制作。',
          '项目源于这样一个想法：数字技术不仅可以帮助人们在城市中导航，也可以讲述城市本身，通过一张持续发展的地图连接地点、图像、故事、路线和服务。'
        ]},
        {title:'隐私与个人数据',paras:[
          'Genova mApp 会使用提供应用个人功能所必需的部分数据。',
          '使用账号时，与注册和订阅有关的数据、头像、收藏和记事本内容可能会与用户关联。QR 点的已访问/未访问状态以及部分偏好设置仍保存在当前设备本地。',
          '账号访问由 Netlify 管理，订阅相关付款由 Stripe 处理。',
          '只有当用户主动启用需要位置的功能时，应用才会使用设备位置，例如在地图上显示用户当前位置。',
          '个人功能用于帮助用户在 Genova mApp 中查找和整理自己的内容与偏好。'
        ]},
        {title:'内容',paras:[
          'Genova mApp 中的文字、图形制作、多媒体内容以及其他原创材料均属于 Genova mApp 项目的一部分，除非个别内容另有说明。'
        ]},
        {title:'版本与更新',version:true,paras:[
          'Genova mApp 是一个持续发展的项目，并会逐步加入新的地点、路线、服务、工具和内容。'
        ]}
      ]
    },
    lij:{
      sections:{help:'Agiutto',display:'Aspetto e legibilitæ',data:'Dæti e preferense',info:'Informaçioin'},
      welcome:'Benvegnuo',guide:'Guida e istruçioin',contact:'Contattine',reset:'Repiggia Genova mApp',about:'Informaçioin in sciâ Genova mApp',version:'Verscion app',installed:'Instalâ',web:'Verscion web',
      resetTitle:'Repiggiâ Genova mApp?',
      resetText:'Saian scancelæ o Taccuin, i Preferii, i percorsi, e nòtte, o stato di ponti QR e e preferense sarvæ inte l’app. A dimenscion do testo a torna a Mêzo. Account, immagine do profilo e abonamento no vegnan modificæ.',
      cancel:'Anulla',confirmReset:'Repiggia',resetting:'Repiggio…',close:'Særa',back:'Torna a-e Impostaçioin',
      aboutTitle:'Informaçioin in sciâ Genova mApp',
      aboutIntro:'Genova mApp a l’é un strumento digitale dedicou a-a descovèrta de Zena, pensou pe mette assémme inte unna mæxima esperiénsa a çittæ de ancheu e a seu memöia stöica.',
      aboutSections:[
        {title:'Genova mApp',paras:[
          'Co-a mappa se peu esplorâ pòsti, serviççi, trasporti, coltua, divertimento, percorsi e contegnui multimedia, assémme a-o patrimònio stöico da çittæ: gêxe, palaççi, ville, fortificaçioin, miage, acquedotti e tanti atri pòsti d’interesse.',
          'Genova mApp a deuvia anche strumenti interattivi e contegnui originali, comme i ponti QR dedicæ a-a çittæ, che permettan de descovrî fotografie stöiche restauræ, coloræ e animæ e de osservâ comme Zena a l’é cangiâ into tempo.',
          'O scopo do progetto o l’é offrî a çittadin e visitatoî un strumento semplisce pe conosce, esplorâ e valorizzâ Zena, unendo informaçioin utili pe vive a çittæ de ancheu a-a conoscensa e a-a condivixon da seu stöia.'
        ]},
        {title:'O progetto',paras:[
          'Genova mApp a l’é un progetto ideou, progettou e realizou da Alessandro Bellagamba, regista e divulgatô stöico, direttô da SDAC – Scuola d’Arte Cinematografica di Genova.',
          'O progetto o nasce da l’idea de adêuviâ e tecnologie digitali no solo pe orientâse inta çittæ, ma anche pe contâla: collegando pòsti, immagine, stöie, percorsi e serviççi inte unna mappa in continua evoluçion.'
        ]},
        {title:'Privacy e dæti personali',paras:[
          'Genova mApp a deuvia quarche dæto necessario pe offrî e fonçioin personali de l’app.',
          'Quande se deuvia un account, peu ese associæ a l’utente dæti relativi a l’iscriçion e a l’abonamento, l’immagine do profilo, i Preferii e i contegnui do Taccuin. O stato di ponti QR visitæ ò no visitæ e quarche preferensa restan invece sarvæ localmente in sciô dispoxitivo.',
          'L’accesso a l’account o l’é gestio tramite Netlify, mentre i pagamenti relativi a-i abonamenti en gestii tramite Stripe.',
          'A posiçion do dispositivo a l’é adêuviâ solo quande l’utente o ativa volontariamente unna fonçion che a ne gh’à beseugno, pe exempio pe mostrâ a seu posiçion in sciâ mappa.',
          'E fonçioin personali servan pe permette a l’utente de retrovâ e organizâ i seu contegnui e e seu preferense drento Genova mApp.'
        ]},
        {title:'Contegnui',paras:[
          'I testi, e elaboraçioin grafiche, i contegnui multimedia e i atri materiâ originali presenti inte Genova mApp fan parte do progetto Genova mApp, salvo indicaçioin diferenti riportæ inti singoli contegnui.'
        ]},
        {title:'Verscion e aggiornamenti',version:true,paras:[
          'Genova mApp a l’é un progetto in continua evoluçion e a ven aggiornâ progressivamente con neuvi pòsti, percorsi, serviççi, strumenti e contegnui.'
        ]}
      ]
    }
  };

  function lang(){
    try{return String(localStorage.getItem('lang') || document.documentElement.lang || 'it').toLowerCase().split(/[-_]/)[0];}
    catch(_e){return 'it';}
  }
  function t(){return I18N[lang()] || I18N.it;}
  function el(tag, cls){var n=document.createElement(tag); if(cls)n.className=cls; return n;}
  function svgIcon(name){
    var icons={
      welcome:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12h16M12 4v16"/><circle cx="12" cy="12" r="9"/></svg>',
      guide:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></svg>',
      contact:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></svg>',
      reset:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
      info:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></svg>',
      version:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l4 4v10l-4 4H7l-4-4V7z"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>',
      coupon:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H19v4a3 3 0 0 0 0 6v4H5.5A2.5 2.5 0 0 1 3 16.5z"/><path d="M9 8v8" stroke-dasharray="2 2"/></svg>',
      users:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
    };
    return icons[name] || icons.info;
  }

  function decorateExisting(button, label, icon){
    if(!button) return;
    button.textContent='';
    var i=el('span','settings-v2-icon'); i.innerHTML=svgIcon(icon);
    var l=el('span','settings-v2-label'); l.textContent=label;
    var c=el('span','settings-v2-chevron'); c.setAttribute('aria-hidden','true'); c.textContent='›';
    button.appendChild(i);button.appendChild(l);button.appendChild(c);
    button.setAttribute('aria-label',label);
  }

  function makeSection(title){
    var section=el('section','settings-v2-section');
    var heading=el('div','settings-v2-section-title');
    var list=el('div','settings-v2-list');
    section.appendChild(heading);section.appendChild(list);
    return{section:section,heading:heading,list:list,title:title};
  }

  function isInstalled(){
    try{
      return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    }catch(_e){return false;}
  }

  var refs={};

  function buildSettings(){
    var panel=document.getElementById('settings-dropdown');
    if(!panel || panel.__settingsV2Built) return;
    panel.__settingsV2Built=true;
    panel.classList.add('settings-v2-ready');
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','true');

    refs.panel=panel;
    refs.welcome=document.getElementById('welcome-open-btn');
    refs.guide=document.getElementById('settings-help-action');
    refs.contact=panel.querySelector('.settings-row[data-action="contact"]');
    refs.textSize=panel.querySelector('.settings-text-size');
    refs.head=panel.querySelector('.settings-modal-head');

    refs.body=el('div','settings-v2-body');
    refs.help=makeSection('help');
    refs.display=makeSection('display');
    refs.data=makeSection('data');
    refs.admin=makeSection('admin');
    refs.info=makeSection('info');

    if(refs.welcome)refs.help.list.appendChild(refs.welcome);
    if(refs.guide)refs.help.list.appendChild(refs.guide);
    if(refs.contact)refs.help.list.appendChild(refs.contact);
    if(refs.textSize)refs.display.list.appendChild(refs.textSize);

    refs.reset=document.createElement('button');
    refs.reset.type='button';
    refs.reset.className='settings-v2-action settings-v2-danger';
    refs.reset.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();openReset();});
    refs.data.list.appendChild(refs.reset);

    refs.coupon=document.createElement('button');
    refs.coupon.type='button';
    refs.coupon.className='settings-v2-action';
    refs.coupon.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();closeSettings();if(window.GenovaCouponAdmin&&typeof window.GenovaCouponAdmin.open==='function')window.GenovaCouponAdmin.open();});
    refs.admin.list.appendChild(refs.coupon);

    refs.subscribers=document.createElement('button');
    refs.subscribers.type='button';
    refs.subscribers.className='settings-v2-action';
    refs.subscribers.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();closeSettings();if(window.GenovaSubscribersAdmin&&typeof window.GenovaSubscribersAdmin.open==='function')window.GenovaSubscribersAdmin.open();});
    refs.admin.list.appendChild(refs.subscribers);

    refs.about=document.createElement('button');
    refs.about.type='button';
    refs.about.className='settings-v2-action';
    refs.about.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();openAbout();});
    refs.info.list.appendChild(refs.about);

    refs.version=el('div','settings-v2-version');
    refs.versionIcon=el('span','settings-v2-icon');refs.versionIcon.innerHTML=svgIcon('version');
    refs.versionLabel=el('span','settings-v2-version-label');
    refs.versionValue=el('span','settings-v2-version-value');
    refs.versionNumber=el('span','settings-v2-version-number');
    refs.versionStatus=el('span','settings-v2-version-status');
    refs.versionValue.appendChild(refs.versionNumber);refs.versionValue.appendChild(refs.versionStatus);
    refs.version.appendChild(refs.versionIcon);refs.version.appendChild(refs.versionLabel);refs.version.appendChild(refs.versionValue);
    refs.info.list.appendChild(refs.version);

    [refs.help,refs.display,refs.data,refs.admin,refs.info].forEach(function(s){refs.body.appendChild(s.section);});
    panel.appendChild(refs.body);
    createAbout();
    createReset();
    render();
  }

  function makeActionContent(button,label,icon){
    button.textContent='';
    var i=el('span','settings-v2-icon');i.innerHTML=svgIcon(icon);
    var l=el('span','settings-v2-label');l.textContent=label;
    var c=el('span','settings-v2-chevron');c.setAttribute('aria-hidden','true');c.textContent='›';
    button.appendChild(i);button.appendChild(l);button.appendChild(c);
    button.setAttribute('aria-label',label);
  }

  function closeSettings(){
    var wrap=document.querySelector('.settings-wrapper');
    if(wrap)wrap.classList.remove('open');
    var btn=document.getElementById('btn-settings');
    if(btn)btn.setAttribute('aria-expanded','false');
  }
  function reopenSettings(){
    var wrap=document.querySelector('.settings-wrapper');
    if(wrap)wrap.classList.add('open');
    var btn=document.getElementById('btn-settings');
    if(btn)btn.setAttribute('aria-expanded','true');

    /* The settings panel is reparented inside this overlay by ui-layout-v2.js.
       Reopen it explicitly as well, so returning from the About page never
       falls back to the map while waiting for the wrapper observer. */
    var overlay=document.getElementById('settings-modal-overlay');
    if(overlay){
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden','false');
    }

    try{
      var panel=document.getElementById('settings-dropdown');
      var target=panel && (panel.querySelector('.settings-modal-close') || panel.querySelector('button'));
      if(target)target.focus();
    }catch(_e){}
  }

  function createAbout(){
    if(document.getElementById('settings-about-overlay')) return;
    var overlay=el('div','settings-page-overlay');overlay.id='settings-about-overlay';overlay.setAttribute('aria-hidden','true');
    var page=el('section','settings-page');page.setAttribute('role','dialog');page.setAttribute('aria-modal','true');page.setAttribute('aria-labelledby','settings-about-title');
    var head=el('div','settings-page-head');
    var back=el('button','settings-page-back');back.type='button';back.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
    var title=el('h2','settings-page-title');title.id='settings-about-title';
    var close=el('button','settings-page-close');close.type='button';close.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    head.appendChild(back);head.appendChild(title);head.appendChild(close);
    var content=el('div','settings-about-content');
    page.appendChild(head);page.appendChild(content);overlay.appendChild(page);document.body.appendChild(overlay);
    refs.aboutOverlay=overlay;refs.aboutTitle=title;refs.aboutBack=back;refs.aboutClose=close;refs.aboutContent=content;
    back.addEventListener('click',function(event){
      event.preventDefault();
      event.stopPropagation();
      closeAbout();
      window.setTimeout(reopenSettings,0);
    });
    close.addEventListener('click',closeAbout);
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeAbout();});
  }

  function createReset(){
    if(document.getElementById('settings-reset-overlay')) return;
    var overlay=el('div','settings-confirm-overlay');overlay.id='settings-reset-overlay';overlay.setAttribute('aria-hidden','true');
    var box=el('section','settings-confirm');box.setAttribute('role','alertdialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-labelledby','settings-reset-title');
    var body=el('div','settings-confirm-body');
    var title=el('h2','settings-confirm-title');title.id='settings-reset-title';
    var text=el('p','settings-confirm-text');
    body.appendChild(title);body.appendChild(text);
    var actions=el('div','settings-confirm-actions');
    var cancel=el('button','settings-confirm-cancel');cancel.type='button';
    var confirm=el('button','settings-confirm-reset');confirm.type='button';
    actions.appendChild(cancel);actions.appendChild(confirm);box.appendChild(body);box.appendChild(actions);overlay.appendChild(box);document.body.appendChild(overlay);
    refs.resetOverlay=overlay;refs.resetTitle=title;refs.resetText=text;refs.resetCancel=cancel;refs.resetConfirm=confirm;
    cancel.addEventListener('click',closeReset);
    confirm.addEventListener('click',performReset);
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeReset();});
  }

  function renderAbout(){
    if(!refs.aboutContent)return;
    var d=t();
    refs.aboutTitle.textContent=d.aboutTitle;
    refs.aboutBack.setAttribute('aria-label',d.back);refs.aboutBack.setAttribute('title',d.back);
    refs.aboutClose.setAttribute('aria-label',d.close);refs.aboutClose.setAttribute('title',d.close);
    refs.aboutContent.textContent='';
    var intro=el('p','settings-about-intro');intro.textContent=d.aboutIntro;refs.aboutContent.appendChild(intro);
    d.aboutSections.forEach(function(section){
      var wrap=el('section','settings-about-section');var h=el('h3');h.textContent=section.title;wrap.appendChild(h);
      if(section.version){var v=el('div','settings-about-version');v.textContent=d.version+': '+APP_VERSION;wrap.appendChild(v);}
      section.paras.forEach(function(p){var para=el('p');para.textContent=p;wrap.appendChild(para);});
      refs.aboutContent.appendChild(wrap);
    });
    refs.aboutOverlay.setAttribute('dir',lang()==='ar'?'rtl':'ltr');
  }

  function isAdmin(){
    try{var state=window.GenovaAccount&&window.GenovaAccount.getState();return !!(state&&((state.record&&state.record.isAdmin===true)||(state.subscription&&state.subscription.adminOverride===true)));}
    catch(_e){return false;}
  }

  function render(){
    if(!refs.panel)return;
    var d=t();
    refs.help.heading.textContent=d.sections.help;
    refs.display.heading.textContent=d.sections.display;
    refs.data.heading.textContent=d.sections.data;
    refs.admin.heading.textContent='Amministrazione';
    refs.admin.section.hidden=!isAdmin();
    refs.info.heading.textContent=d.sections.info;
    decorateExisting(refs.welcome,d.welcome,'welcome');
    decorateExisting(refs.guide,d.guide,'guide');
    decorateExisting(refs.contact,d.contact,'contact');
    makeActionContent(refs.reset,d.reset,'reset');
    makeActionContent(refs.coupon,'Coupon','coupon');
    makeActionContent(refs.subscribers,'Iscritti e abbonati','users');
    makeActionContent(refs.about,d.about,'info');
    refs.versionLabel.textContent=d.version;
    refs.versionNumber.textContent=APP_VERSION;
    refs.versionStatus.textContent=isInstalled()?d.installed:d.web;
    refs.resetTitle.textContent=d.resetTitle;
    refs.resetText.textContent=d.resetText;
    refs.resetCancel.textContent=d.cancel;
    refs.resetConfirm.textContent=d.confirmReset;
    refs.panel.setAttribute('dir',lang()==='ar'?'rtl':'ltr');
    renderAbout();
  }

  function openAbout(){
    closeSettings();renderAbout();
    refs.aboutOverlay.classList.add('is-open');refs.aboutOverlay.setAttribute('aria-hidden','false');
    document.body.classList.add('settings-page-open');
    try{refs.aboutBack.focus();}catch(_e){}
  }
  function closeAbout(){
    if(!refs.aboutOverlay)return;
    refs.aboutOverlay.classList.remove('is-open');refs.aboutOverlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('settings-page-open');
  }
  function openReset(){
    closeSettings();render();
    refs.resetOverlay.classList.add('is-open');refs.resetOverlay.setAttribute('aria-hidden','false');
    try{refs.resetCancel.focus();}catch(_e){}
  }
  function closeReset(){
    if(!refs.resetOverlay)return;
    refs.resetOverlay.classList.remove('is-open');refs.resetOverlay.setAttribute('aria-hidden','true');
  }

  function clearLocalPreferences(){
    var exact={
      'genova_favstars_v1':1,'genova_favstars_visible_v1':1,
      'genova_taccuino_routes_v1':1,'genova_taccuino_draft_v1':1,'genova_taccuino_notes_v1':1,'genova_taccuino_last_note_v1':1,'genova_taccuino_favorites_sort_v1':1,
      'genova_routes_selected_v1':1,'gm-qr-visited-v1':1,'gm-qr-points-visible':1,'genova_mapp_nearby_v1':1,
      'walls_visible':1,'acq_visibility':1,'legend_blue':1,'legend_orange':1,'help_seen':1,'genova_text_size_v1':1
    };
    try{
      var keys=[];for(var i=0;i<localStorage.length;i++)keys.push(localStorage.key(i));
      keys.forEach(function(key){
        if(!key)return;
        if(exact[key] || /^doc_(?:item|lang)_/.test(key))localStorage.removeItem(key);
      });
    }catch(_e){}
    try{if(typeof window.__setGenovaTextSize==='function')window.__setGenovaTextSize('medium');else localStorage.setItem('genova_text_size_v1','medium');}catch(_e){}
  }

  async function performReset(){
    var d=t();
    refs.resetConfirm.disabled=true;refs.resetCancel.disabled=true;refs.resetConfirm.textContent=d.resetting;
    try{
      if(window.GenovaAccount && typeof window.GenovaAccount.resetPreferences==='function'){
        await window.GenovaAccount.resetPreferences();
      }
      clearLocalPreferences();
      try{window.dispatchEvent(new CustomEvent('genova:preferences-reset'));}catch(_e){}
      window.setTimeout(function(){window.location.reload();},180);
    }catch(_e){
      /* Anche in assenza di rete, il ripristino locale resta valido e verra sincronizzato in seguito. */
      clearLocalPreferences();
      window.setTimeout(function(){window.location.reload();},180);
    }
  }

  function boot(){
    buildSettings();
    document.addEventListener('app:set-lang',function(){window.setTimeout(render,0);});
    window.addEventListener('i18n:changed',function(){window.setTimeout(render,0);});
    document.addEventListener('genova:subscription-changed',function(){window.setTimeout(render,0);});
    document.addEventListener('genova:auth-changed',function(){window.setTimeout(render,0);});
    document.addEventListener('genova:settings-reopen',function(){window.setTimeout(reopenSettings,0);});
    document.addEventListener('keydown',function(e){
      if(e.key!=='Escape')return;
      if(refs.resetOverlay&&refs.resetOverlay.classList.contains('is-open')){closeReset();return;}
      if(refs.aboutOverlay&&refs.aboutOverlay.classList.contains('is-open'))closeAbout();
    });
    if(window.matchMedia){try{window.matchMedia('(display-mode: standalone)').addEventListener('change',render);}catch(_e){}}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
