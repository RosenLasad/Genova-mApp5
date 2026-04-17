window.museumSpecialPopups = function(p, m){

    // Nuvola multilingua per "Villa Giannettino Luxoro" (stile Forti)
    try{
      var _nVL = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nVL && (_nVL.indexOf("villa giannettino luxoro") !== -1 
                   || _nVL.indexOf("museo luxoro") !== -1
                   || _nVL.indexOf("villa luxoro") !== -1)){
        p.addr = p.addr || p.address || "Viale Mafalda di Savoia, 3, 16167 Genova GE";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/villa-giannettino-Luxoro";
        p.desc = {"it": "La villa venne edificata nel 1903 su progetto dell'ingegnere Pietro Luxoro, che s'ispirò alle architetture delle ville e palazzi nobiliari genovesi del XVII-XVIII secolo. Affacciata a picco sul mare, espone varie raccolte artistiche acquisite a partire dalla seconda metà dell'Ottocento.", "en": "The villa was built in 1903 to a design by engineer Pietro Luxoro, inspired by the architecture of 17th–18th‑century Genoese villas and palazzi. Perched above the sea, it displays various art collections acquired since the second half of the 19th century.", "fr": "La villa fut édifiée en 1903 sur un projet de l’ingénieur Pietro Luxoro, s’inspirant des architectures des villas et palais génois des XVIIe–XVIIIe siècles. Juchée au‑dessus de la mer, elle expose diverses collections d’art acquises à partir de la seconde moitié du XIXe siècle.", "es": "La villa fue edificada en 1903 según el proyecto del ingeniero Pietro Luxoro, inspirado en las arquitecturas de las villas y palacios genoveses de los siglos XVII–XVIII. Asomada al mar, expone varias colecciones artísticas adquiridas desde la segunda mitad del siglo XIX.", "ar": "شُيِّدت الفيلا عام 1903 بتصميم للمهندس بيترو لوكسورو، مستوحى من عمارة فيلات وقصور جنوة في القرنين السابع عشر والثامن عشر. تُطلّ على البحر وتعرض مجموعات فنية متنوّعة اقتُنيت منذ النصف الثاني من القرن التاسع عشر.", "ru": "Вилла была построена в 1903 году по проекту инженера Пьетро Луксоро, вдохновлённому архитектурой генуэзских вилл и палаццо XVII–XVIII веков. Расположенная над морем, она представляет различные художественные коллекции, приобретённые начиная со второй половины XIX века.", "zh": "这座别墅建于 1903 年，由工程师彼得罗·卢索罗（Pietro Luxoro）设计，灵感源自 17—18 世纪热那亚的别墅与宫殿建筑。别墅临海而建，陈列自 19 世纪下半叶起陆续征集的多类艺术藏品。", "lij": "A villa a l’é stæta edificâ into 1903 in sciô prögetto de l’ingegnæ Pietro Luxoro, inspiròu a-e architettûe de ville e palassi zeneixi do XVII–XVIII secolo. Affaçâ a pìcco in sciâ mæ, a espòn divèrse raccolte artìstiche acqïsæ da a seconda metæ do Ottocento."};

        var _h0vl = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Villa Giannettino Luxoro</span></div>");
        m.bindPopup(_h0vl, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0vl);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0vl);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo della carta di Mele" (stile Forti)
    try{
      var _nCM = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nCM && (_nCM.indexOf("museo della carta di mele") !== -1 
                   || _nCM.indexOf("carta di mele") !== -1
                   || _nCM.indexOf("museo della carta") !== -1)){
        p.addr = p.addr || p.address || "Via Acquasanta, 251, 16010 Acquasanta GE";
        p.site = p.site || p.url || "http://www.museocartamele.it/";
        p.desc = {"it": "Il Museo della Carta di Mele è situato all’interno di un opificio da carta del ’700. Celebra e tramanda l’antichissima arte cartaria genovese e ripropone questa tradizione attraverso la ripresa di un mestiere oggi quasi scomparso: la fabbricazione di prodotti in carta fatta a mano.", "en": "The Paper Museum of Mele is housed inside an eighteenth‑century paper mill. It celebrates and passes on Genoa’s age‑old papermaking art and revives this tradition through the practice of a craft now almost vanished: the making of handmade paper products.", "fr": "Le Musée du papier de Mele est installé à l’intérieur d’une papeterie du XVIIIe siècle. Il célèbre et transmet l’antiqissime art papetier génois et fait revivre cette tradition en reprenant un métier aujourd’hui presque disparu : la fabrication de produits en papier fait main.", "es": "El Museo del Papel de Mele se encuentra dentro de una fábrica de papel del siglo XVIII. Celebra y transmite el antiquísimo arte papelero genovés y revive esta tradición mediante la práctica de un oficio hoy casi desaparecido: la fabricación de productos de papel hecho a mano.", "ar": "يقع متحف ورق ميليه داخل مصنع ورق يعود إلى القرن الثامن عشر. يحتفي بفن صناعة الورق الجنوي العريق وينقل تراثه عبر إحياء حرفة باتت شبه منقرضة اليوم: صناعة منتجات من الورق المصنوع يدويًا.", "ru": "Музей бумаги в Меле расположен в бумажной мануфактуре XVIII века. Он прославляет и передаёт древнейшее генуэзское бумажное ремесло, возрождая эту традицию через практику почти исчезнувшего сегодня занятия — изготовление изделий из ручной бумаги.", "zh": "梅莱造纸博物馆坐落于一座 18 世纪的造纸作坊内。它致敬并传承热那亚古老的造纸艺术，并通过重现一种几近消失的技艺——手工纸制品的制作——来延续这一传统。", "lij": "O Museo da cärta de Mele o l’é situòu inte un opifìçio da cärta do Settesento. O celebra e o tramanda l’antichìssima arte cartaria zeneize e a repòrta avanti sta tradiçion co-a pràtica d’in mestiê oghi quasi sparîo: a fabricaçion de prodûtti in cärta fæta a man."};

        var _h0cm = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo della carta di Mele</span></div>");
        m.bindPopup(_h0cm, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0cm);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0cm);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo speleologico del Monte Gazzo" (stile Forti)
    try{
      var _nMG = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nMG && (_nMG.indexOf("museo speleologico del monte gazzo") !== -1 
                   || _nMG.indexOf("monte gazzo") !== -1)){
        p.addr = p.addr || p.address || "Piazza Nostra Signora del Gazzo, 2, 16154 Genova GE";
        p.site = p.site || p.url || "https://it.wikipedia.org/wiki/Museo_speleologico_del_Monte_Gazzo";
        p.desc = {"it": "È un museo di speleologia che ospita ricostruzioni dei fenomeni carsici del monte corredati da reperti, fotografie e pannelli esplicativi. A questi si aggiungono reperti fossili del quaternario fra cui quelli di un orso delle caverne e di una tigre dai denti a sciabola.", "en": "A speleological museum featuring reconstructions of the mountain’s karst phenomena, complemented by finds, photographs and explanatory panels. It also includes Quaternary fossils, among them remains of a cave bear and a saber‑toothed cat.", "fr": "Un musée de spéléologie présentant des reconstitutions des phénomènes karstiques de la montagne, accompagnées de pièces, photographies et panneaux explicatifs. S’y ajoutent des fossiles du Quaternaire, dont des restes d’un ours des cavernes et d’un tigre à dents de sabre.", "es": "Un museo de espeleología con reconstrucciones de los fenómenos kársticos de la montaña, acompañado de hallazgos, fotografías y paneles explicativos. Se suman fósiles del Cuaternario, entre ellos restos de un oso de las cavernas y de un tigre de dientes de sable.", "ar": "متحف لعلم الكهوف يضم إعادة تمثيل لظواهر الكارست في الجبل، مرفقةً بلقى وصور ولوحات تفسيرية. كما يشمل حفريات من العصر الرباعي، منها بقايا دب الكهوف ونمر ذي أسنان سيفية.", "ru": "Спелеологический музей с реконструкциями карстовых явлений на горе, дополненными находками, фотографиями и пояснительными панно. Экспозицию дополняют ископаемые четвертичного периода, в том числе останки пещерного медведя и саблезубого кота.", "zh": "这是一座洞穴学博物馆，展示蒙特·加佐山喀斯特现象的复原，并配有实物、照片与说明面板；同时收藏有第四纪化石，其中包括洞熊与“剑齿猫”的遗骸。", "lij": "O l’é ‘n museo de speleologìa con reconstrûçioin di fenomeni càrstici do mònte, accompagnæ da reperti, fo-to e pannelli esplicatî. Ghin son ascì fossî do Quaternârio, tra cui quei d’in êu d’æ in e d’una tigre co-i denti a sciàbola."};

        var _h0mg = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo speleologico del Monte Gazzo</span></div>");
        m.bindPopup(_h0mg, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0mg);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0mg);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo della Storia del Genoa" (stile Forti)
    try{
      var _nGE = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nGE && (_nGE.indexOf("museo della storia del genoa") !== -1 
                   || _nGE.indexOf("museo del genoa") !== -1
                   || _nGE.indexOf("storia del genoa") !== -1)){
        p.addr = p.addr || p.address || "Via al Porto Antico, 4, 16128 Genova GE";
        p.site = p.site || p.url || "https://www.fondazionegenoa.com/museo-genoa/";
        p.desc = {"it": "Il Museo della storia del Genoa è un museo multimediale dedicato alla storia del Genoa Cricket and Football Club.", "en": "The Genoa History Museum is a multimedia museum dedicated to the history of Genoa Cricket and Football Club.", "fr": "Le Musée de l’histoire du Genoa est un musée multimédia consacré à l’histoire du Genoa Cricket and Football Club.", "es": "El Museo de la Historia del Genoa es un museo multimedia dedicado a la historia del Genoa Cricket and Football Club.", "ar": "متحف تاريخ نادي جنوة هو متحف متعدد الوسائط مكرّس لتاريخ نادي جنوة للكريكيت وكرة القدم.", "ru": "Музей истории «Дженоа» — мультимедийный музей, посвящённый истории клуба Genoa Cricket and Football Club.", "zh": "热那亚俱乐部历史博物馆是一座多媒体博物馆，致力于展示热那亚板球与足球俱乐部（Genoa CFC）的历史。", "lij": "O Museo da stöia do Genoa o l’é ‘n museo multimediale dedicòu a-a stöia do Genoa Cricket and Football Club."};

        var _h0ge = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo della Storia del Genoa</span></div>");
        m.bindPopup(_h0ge, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0ge);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0ge);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo d'Arte Contemporanea di Villa Croce" (stile Forti)
    try{
      var _nVC = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nVC && (_nVC.indexOf("museo d'arte contemporanea di villa croce") !== -1 
                   || _nVC.indexOf("museo d'arte contemporanea villa croce") !== -1
                   || _nVC.indexOf("villa croce") !== -1)){
        p.addr = p.addr || p.address || "Via Jacopo Ruffini 3, 16128 Genova";
        p.site = p.site || p.url || "https://villacroce.org/";
        p.desc = {"it": "Il Museo d'arte contemporanea Villa Croce è una delle strutture del polo museale di Genova. È situato all'interno della Villa Croce, un edificio settecentesco in stile neoclassico.", "en": "The Villa Croce Museum of Contemporary Art is one of the institutions in Genoa’s museum hub. It is housed inside Villa Croce, an eighteenth-century neoclassical building.", "fr": "Le Musée d’art contemporain Villa Croce fait partie du pôle muséal de Gênes. Il est installé à la Villa Croce, un édifice néoclassique du XVIIIe siècle.", "es": "El Museo de Arte Contemporáneo Villa Croce forma parte del polo museístico de Génova. Está ubicado en la Villa Croce, un edificio neoclásico del siglo XVIII.", "ar": "يُعدّ متحف فيلا كروتشي للفن المعاصر إحدى مؤسسات القطب المتحفي في جنوة. يقع داخل فيلا كروتشي، وهو مبنى على الطراز الكلاسيكي الحديث يعود إلى القرن الثامن عشر.", "ru": "Музей современного искусства Вилла Кроче входит в музейный комплекс Генуи. Он расположен в Вилле Кроче — неоклассическом здании XVIII века.", "zh": "维拉·克罗切当代艺术博物馆是热那亚博物馆群的一部分，坐落于 18 世纪的新古典主义建筑——维拉·克罗切（Villa Croce）之内。", "lij": "U Museo d’arte contemporànea de Villa Croce o fa parte do polo museâle de Zêna. O se trêuva inte a Villa Croce, 'n edifìçio do Setteçento in stîle neoclàssico."};

        var _h0vc = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo d'Arte Contemporanea di Villa Croce</span></div>");
        m.bindPopup(_h0vc, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0vc);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0vc);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo d'Arte Orientale E. Chiossone" (stile Forti)
    try{
      var _nCHIO = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nCHIO && (_nCHIO.indexOf("museo d'arte orientale e. chiossone") !== -1 
                      || _nCHIO.indexOf("museo d'arte orientale edoardo chiossone") !== -1
                      || _nCHIO.indexOf("museo d'arte orientale") !== -1
                      || _nCHIO.indexOf("chiossone") !== -1)){
        p.addr = p.addr || p.address || "Piazzale Giuseppe Mazzini 4, 16122 Genova";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/museo-darte-orientale-e-chiossone";
        p.desc = {"it": "Il Museo d'arte orientale Edoardo Chiossone di Genova, situato all'interno di Villetta Di Negro, è una delle più importanti collezioni di arte orientale in Europa e la più importante in Italia.", "en": "The Edoardo Chiossone Museum of Oriental Art in Genoa, located within Villetta Di Negro, is one of the most important collections of Oriental art in Europe and the foremost in Italy.", "fr": "Le Musée d’art oriental Edoardo Chiossone de Gênes, situé au sein de la Villetta Di Negro, abrite l’une des plus importantes collections d’art oriental en Europe, la plus importante en Italie.", "es": "El Museo de Arte Oriental Edoardo Chiossone de Génova, situado dentro de la Villetta Di Negro, alberga una de las colecciones de arte oriental más importantes de Europa y la más importante en Italia.", "ar": "يقع متحف إدواردو كيُوسّوني للفنون الشرقية في جنوة داخل متنزه «فيليتّا دي نيغرو»، ويضم إحدى أهم مجموعات الفن الشرقي في أوروبا، وهو الأهم في إيطاليا.", "ru": "Музей восточного искусства Эдоардо Кьоссоне в Генуе, расположенный в парке Виллетта ди Негро, хранит одну из важнейших коллекций восточного искусства в Европе и крупнейшую в Италии.", "zh": "热那亚爱多阿多·基奥索内东方艺术博物馆位于维莱塔·迪内格罗公园（Villetta Di Negro）内，是欧洲最重要的东方艺术收藏之一，也是意大利最重要的此类收藏。", "lij": "O Museo d’arte orientâ Edoardo Chiossone de Zêna, situòu inte a Villetta Di Negro, o gh’à unna de e ciù inportanti coleçioin de arte orientâ in Europa e a ciù inportante in Itália."};

        var _h0chio = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo d'Arte Orientale E. Chiossone</span></div>");
        m.bindPopup(_h0chio, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0chio);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0chio);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo di Archeologia Ligure" (stile Forti)
    try{
      var _nAL = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nAL && (_nAL.indexOf("museo di archeologia ligure") !== -1 
                   || _nAL.indexOf("archeologia ligure") !== -1)){
        p.addr = p.addr || p.address || "Via Ignazio Pallavicini 13, 16155 Genova";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/museo-di-archeologia-ligure-0";
        p.desc = {"it": "Con più di 50.000 reperti archeologici provenienti da tutta la Liguria, il museo racconta le vicende, i cambiamenti climatici, ambientali, economici e tecnologici di più di centomila anni, dalla preistoria fino all’età antica.", "en": "With over 50,000 archaeological finds from across Liguria, the museum traces stories and climate, environmental, economic and technological changes spanning more than one hundred thousand years, from prehistory to antiquity.", "fr": "Avec plus de 50 000 découvertes archéologiques provenant de toute la Ligurie, le musée retrace les histoires ainsi que les changements climatiques, environnementaux, économiques et technologiques sur plus de cent mille ans, de la préhistoire à l’Antiquité.", "es": "Con más de 50 000 hallazgos arqueológicos de toda Liguria, el museo recorre las historias y los cambios climáticos, ambientales, económicos y tecnológicos a lo largo de más de cien mil años, desde la prehistoria hasta la Antigüedad.", "ar": "يضم المتحف أكثر من 50,000 لُقية أثرية من أنحاء ليغوريا، ويروي مسيرة التاريخ والتحولات المناخية والبيئية والاقتصادية والتكنولوجية على مدى يزيد عن مئة ألف عام، من عصور ما قبل التاريخ حتى العصور القديمة.", "ru": "С более чем 50 000 археологических находок со всей Лигурии музей рассказывает о событиях и климатических, природных, экономических и технологических изменениях за более чем сто тысяч лет — от доисторических эпох до античности.", "zh": "博物馆汇集来自整个利古里亚地区的五万余件考古藏品，讲述自史前至古代、跨越十余万年的历史与气候、环境、经济与技术变迁。", "lij": "Con ciù de 50.000 reperti archeològici da tutta a Liguria, o museo o conta e vixende e i cangiamenti climàtici, ambientâ, econòmici e tecnologìci de ciù de centomìa anni, da-a preistöia fin‑a l’etæ antìga."};

        var _h0al = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo di Archeologia Ligure</span></div>");
        m.bindPopup(_h0al, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0al);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0al);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Palazzo Reale di Genova" (stile Forti)
    try{
      var _nPRG = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nPRG && (_nPRG.indexOf("palazzo reale di genova") !== -1 
                     || _nPRG.indexOf("palazzo reale") !== -1
                     || _nPRG.indexOf("palazzo stefano balbi") !== -1)){
        p.addr = p.addr || p.address || "Via Balbi 10, 16126 Genova";
        p.site = p.site || p.url || "https://palazzorealegenova.cultura.gov.it/";
        p.desc = {"it": "Il Palazzo Reale, o palazzo Stefano Balbi, è uno dei maggiori edifici storici di Genova, inserito fra i 42 Palazzi dei Rolli.", "en": "The Royal Palace (Palazzo Reale), also known as Palazzo Stefano Balbi, is one of Genoa’s major historic buildings and is among the 42 Palazzi dei Rolli.", "fr": "Le Palais Royal (Palazzo Reale), également appelé palais Stefano Balbi, est l’un des principaux édifices historiques de Gênes, inscrit parmi les 42 Palazzi dei Rolli.", "es": "El Palacio Real (Palazzo Reale), también conocido como palacio Stefano Balbi, es uno de los principales edificios históricos de Génova y forma parte de los 42 Palazzi dei Rolli.", "ar": "القصر الملكي (بالاتسو ريالي)، المعروف أيضًا بقصر ستيفانو بالبي، هو أحد أبرز المباني التاريخية في جنوة، وهو ضمن 42 قصرًا من «بالاتسي دي رولي».", "ru": "Королевский дворец (Палаццо Реале), также известный как дворец Стефано Балби, — одно из крупнейших исторических зданий Генуи и входит в число 42 дворцов «Палацци дей Ролли».", "zh": "热那亚王宫（Palazzo Reale），亦称斯特法诺·巴尔比宫，是热那亚最重要的历史建筑之一，列入 42 座“罗利宫殿”之列。", "lij": "O Palazzo Reale, dîto anche Palazzo Stefano Balbi, o l’é unna di-e prinçipâli cä stòriche de Zêna ed o l’é inserîo tra i 42 Palazzi dei Rolli."};

        var _h0prg = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Palazzo Reale di Genova</span></div>");
        m.bindPopup(_h0prg, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0prg);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0prg);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Raccolte Frugone" (stile Forti)
    try{
      var _nRF = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nRF && (_nRF.indexOf("raccolte frugone") !== -1)){
        p.addr = p.addr || p.address || "Via Capolungo, 9, 16167 Genova";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/musei-di-nervi";
        p.desc = {"it": "Le importanti collezioni di arte otto-novecentesca dei fratelli Frugone comprendono dipinti, sculture e disegni di artisti italiani e stranieri attivi nel periodo della Belle Epoque,  tra la seconda metà dell’Ottocento e il primo Novecento.", "en": "The significant late-19th- and early-20th-century collections of the Frugone brothers include paintings, sculptures and drawings by Italian and foreign artists active during the Belle Époque, between the second half of the 19th century and the early 20th century.", "fr": "Les importantes collections d’art des XIXe–XXe siècles des frères Frugone comprennent des peintures, des sculptures et des dessins d’artistes italiens et étrangers actifs durant la Belle Époque, entre la seconde moitié du XIXe siècle et le début du XXe siècle.", "es": "Las importantes colecciones de arte de finales del siglo XIX y comienzos del XX de los hermanos Frugone incluyen pinturas, esculturas y dibujos de artistas italianos y extranjeros activos durante la Belle Époque, entre la segunda mitad del siglo XIX y los inicios del XX.", "ar": "تشمل المجموعات المهمة لفن أواخر القرن التاسع عشر وبدايات القرن العشرين للأخوين فروغوني لوحات ومنحوتات ورسومات لفنانين إيطاليين وأجانب نشطوا في حقبة «البيِل إبوك»، بين النصف الثاني من القرن التاسع عشر وبدايات القرن العشرين.", "ru": "Значительные коллекции искусства конца XIX — начала XX века братьев Фругоне включают картины, скульптуры и рисунки итальянских и зарубежных художников эпохи бельэпок — от второй половины XIX века до начала XX века.", "zh": "弗鲁戈内兄弟收藏的重要十九世纪下半叶至二十世纪初艺术作品，包括意大利及国外艺术家的绘画、雕塑与素描，集中呈现“美好年代”时期。", "lij": "E inportanti coleçioin d’arte de fin‑Ottocento e prinçipio Novecento di-i fræti Frugone inçòrpan pittûe, scoltûe e dësgni de artisti italiani e foresti ativae inta Belle Époque, tra a seconda metæ de l’Ottocento e o prinçìpio do Novecento."};

        var _h0rf = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Raccolte Frugone</span></div>");
        m.bindPopup(_h0rf, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0rf);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0rf);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo del Risorgimento" (stile Forti)
    try{
      var _nR = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nR && (_nR.indexOf("museo del risorgimento") !== -1 
                  || _nR.indexOf("risorgimento") !== -1)){
        p.addr = p.addr || p.address || "Via Lomellini 11, 16124 Genova";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/museo-del-risorgimento";
        p.desc = {"it": "Conserva ed espone un ricco patrimonio storico e artistico attraverso il quale rivivono le figure simbolo del Risorgimento: Giuseppe Mazzini e il movimento repubblicano e democratico; Giuseppe Garibaldi e le Camicie Rosse; Goffredo Mameli e l’Inno d’Italia.", "en": "It preserves and displays a rich historical and artistic heritage through which the emblematic figures of the Risorgimento come to life: Giuseppe Mazzini and the republican and democratic movement; Giuseppe Garibaldi and the Redshirts; Goffredo Mameli and the Italian national anthem.", "fr": "Il conserve et expose un riche patrimoine historique et artistique grâce auquel reprennent vie les figures emblématiques du Risorgimento : Giuseppe Mazzini et le mouvement républicain et démocratique ; Giuseppe Garibaldi et les Chemises rouges ; Goffredo Mameli et l’hymne d’Italie.", "es": "Conserva y expone un rico patrimonio histórico y artístico a través del cual cobran vida las figuras emblemáticas del Risorgimento: Giuseppe Mazzini y el movimiento republicano y democrático; Giuseppe Garibaldi y las Camisas Rojas; Goffredo Mameli y el himno de Italia.", "ar": "يحفظ ويعرض تراثًا تاريخيًا وفنيًا ثريًا تُستعاد من خلاله شخصيات رمزية من «الريزورجيمنتو»: جوزيبي ماتزيني والحركة الجمهورية والديمقراطية؛ جوزيبي غاريبالدي و«القمصان الحمر»؛ غوفريدو مامِلي ونشيد إيطاليا.", "ru": "Сохраняет и представляет богатое историческое и художественное наследие, через которое оживают знаковые фигуры Рисорджименто: Джузеппе Мадзини и республиканско‑демократическое движение; Джузеппе Гарибальди и «краснорубашечники»; Гоффредо Мамели и гимн Италии.", "zh": "馆藏并展示丰富的历史与艺术遗产，使复兴运动的标志性人物重现：朱塞佩·马志尼与共和民主运动、朱塞佩·加里波第与“红衫军”、戈弗雷多·马梅利与《意大利国歌》。", "lij": "O conserva e o espòn un patrimònio stòrico e artìstico ricchìsimo, traverso o quæle revîven e figure-sìmboło do Risorgimento: Giuseppe Mazzini e-o movimento repùbrican e democràtico; Giuseppe Garibaldi e e Camìxe Rosse; Goffredo Mameli e l’Inno d’Italia."};

        var _h0r = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo del Risorgimento</span></div>");
        m.bindPopup(_h0r, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0r);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0r);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo del Tesoro di San Lorenzo" (stile Forti)
    try{
      var _nTSL = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nTSL && (_nTSL.indexOf("museo del tesoro di san lorenzo") !== -1 
                     || _nTSL.indexOf("museo del tesoro") !== -1
                     || _nTSL.indexOf("tesoro di san lorenzo") !== -1)){
        p.addr = p.addr || p.address || "Piazza San Lorenzo (Cattedrale), 16123 Genova";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/museo-del-tesoro";
        p.desc = {"it": "Il Museo del tesoro della cattedrale di San Lorenzo è il museo situato negli ambienti sotterranei della cattedrale di San Lorenzo, nel centro storico di Genova. Custodisce il Sacro Catino (Santo Graal): un piatto di calcedonio, che la tradizione vuole coincida con il piatto usato da Cristo durante l'Ultima Cena.", "en": "The Treasury Museum of the Cathedral of San Lorenzo is located in the underground areas of the cathedral, in Genoa’s historic center. It houses the Sacro Catino (the Holy Grail): a chalcedony dish that tradition identifies with the plate used by Christ at the Last Supper.", "fr": "Le Musée du Trésor de la cathédrale San Lorenzo se trouve dans les espaces souterrains de la cathédrale, au cœur historique de Gênes. Il conserve le Sacro Catino (Saint Graal) : un plat en calcédoine que la tradition identifie comme l’assiette utilisée par le Christ lors de la Cène.", "es": "El Museo del Tesoro de la catedral de San Lorenzo se sitúa en los espacios subterráneos de la catedral, en el centro histórico de Génova. Custodia el Sacro Catino (Santo Grial): un plato de calcedonia que la tradición identifica con el utilizado por Cristo en la Última Cena.", "ar": "يقع متحف كنوز كاتدرائية سان لورينزو في المساحات تحت الأرض الخاصة بالكاتدرائية، في المركز التاريخي لجنوة. يضم «الساكرو كاتينو» (الكأس المقدسة): طبقًا من العقيق الأبيض، تُعرِّفه التقاليد بأنه الطبق الذي استُخدم من قِبل المسيح في العشاء الأخير.", "ru": "Музей сокровищ кафедрального собора Сан‑Лоренцо находится в подземных помещениях собора, в историческом центре Генуи. Здесь хранится «Сакро Катино» (Святой Грааль) — блюдо из халцедона, которое по преданию тождественно тарели, использованной Христом на Тайной вечере.", "zh": "圣劳伦佐主教座堂宝藏博物馆位于教堂的地下区域，坐落于热那亚历史中心。馆藏“圣碗”（Sacro Catino／圣杯）：一只玉髓盘，传统上被认为是耶稣在最后的晚餐中所用的器皿。", "lij": "O Museo do Tæxò do Dûo de San Lorenzo o se trêuva inti localî sotterrànei do dêu, into centro stòrico de Zêna. O conserva o Sacro Catìn (Santo Graal): ‘n piatto de calcedonio che a tradiçion a identifica co-o piatto uzòu da Cristo durante l’Ùrtima Çena."};

        var _h0tsl = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo del Tesoro di San Lorenzo</span></div>");
        m.bindPopup(_h0tsl, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0tsl);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0tsl);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Villa del Principe" (stile Forti)
    try{
      var _nVP = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nVP && (_nVP.indexOf("villa del principe") !== -1 
                   || _nVP.indexOf("palazzo del principe") !== -1
                   || _nVP.indexOf("palazzo di andrea doria") !== -1)){
        p.addr = p.addr || p.address || "Piazza del Principe 4, 16124 Genova";
        p.site = p.site || p.url || "https://www.villadelprincipe.it/";
        p.desc = {"it": "La Villa del Principe, Palazzo del Principe, o ancora Palazzo di Andrea Doria a Fassolo è una delle principali ville storiche di Genova, edificata nel Cinquecento in una zona che, al tempo della sua costruzione, si trovava fuori delle mura della città.", "en": "Villa del Principe—also known as Palazzo del Principe or the Palace of Andrea Doria at Fassolo—is one of Genoa’s foremost historic villas, built in the 16th century in an area that, at the time, lay outside the city walls.", "fr": "La Villa del Principe — également appelée Palazzo del Principe ou palais d’Andrea Doria à Fassolo — est l’une des principales villas historiques de Gênes, édifiée au XVIe siècle dans une zone qui, à l’époque, se trouvait hors des murailles de la ville.", "es": "La Villa del Principe —también conocida como Palazzo del Principe o Palacio de Andrea Doria en Fassolo— es una de las principales villas históricas de Génova, construida en el siglo XVI en una zona que entonces se hallaba fuera de las murallas de la ciudad.", "ar": "فيلا ديل برينتشيبي — المعروفة أيضًا بقصر الأمير أو قصر أندريا دوريا في فاسسولو — هي من أهم الفيلات التاريخية في جنوة، شُيّدت في القرن السادس عشر في منطقة كانت حينذاك خارج أسوار المدينة.", "ru": "Вилла дель Принчипе — также известная как Палаццо дель Принчипе или дворец Андреа Дориа в Фассоло — одна из главных исторических вилл Генуи, построенная в XVI веке в районе, который тогда находился за городскими стенами.", "zh": "王子别墅（Villa del Principe），亦称王宫（Palazzo del Principe）或法索洛的安德烈亚·多利亚宫，是热那亚最重要的历史别墅之一，建于16世纪。当时其所在区域位于城墙之外。", "lij": "A Villa do Prinçipe — dîta anche Palazzo do Prinçipe o Palazzo de Andrea Doria a Fassölo — a l’é unna de e prinçipâli ville stòriche de Zêna, edificâ inti XVI secolo inti lóghi ch’a‑ea, a-o tempo da costruçion, fêua de-e mûre de-a çittæ."};

        var _h0vp = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Villa del Principe</span></div>");
        m.bindPopup(_h0vp, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0vp);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0vp);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo di Chimica" (stile Forti)
    try{
      var _nCH = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nCH && (_nCH.indexOf("museo di chimica") !== -1)){
        p.addr = p.addr || p.address || "Viale Benedetto XV 3, 16132 Genova";
        p.site = p.site || p.url || "https://museodichimica.unige.it/";
        p.desc = {"it": "È un museo unico in Italia per quantità e qualità di reperti ma soprattutto perché lo spazio espositivo è rappresentato da un laboratorio didattico di chimica all'avanguardia.", "en": "A one‑of‑a‑kind museum in Italy for the quantity and quality of its exhibits, and above all because the display space is an advanced teaching chemistry laboratory.", "fr": "Un musée unique en Italie par la quantité et la qualité de ses pièces, et surtout parce que son espace d’exposition est un laboratoire d’enseignement de chimie de pointe.", "es": "Un museo único en Italia por la cantidad y calidad de sus piezas, y sobre todo porque el espacio expositivo es un laboratorio didáctico de química de vanguardia.", "ar": "متحف فريد من نوعه في إيطاليا من حيث كمية وجودة مقتنياته، وقبل كل شيء لأن فضاء العرض هو مختبر تعليمي متقدم للكيمياء.", "ru": "Уникальный для Италии музей по количеству и качеству экспонатов и, прежде всего, потому что его экспозиционное пространство — это современная учебная лаборатория по химии.", "zh": "在意大利独一无二：不仅藏品数量与质量出众，更重要的是其展陈空间本身就是一间先进的化学教学实验室。", "lij": "Un museo ünico in Itália pe quantitæ e qualitæ di reperti, e soprattutto perché o spàçio espositivo o l’é ‘n laboratoriu didàttico de chimica de avanguàrdia."};

        var _h0ch = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo di Chimica</span></div>");
        m.bindPopup(_h0ch, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0ch);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0ch);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Palazzo Spinola" (stile Forti)
    try{
      var _nPS = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nPS && (_nPS.indexOf("palazzo spinola") !== -1 
                   || _nPS.indexOf("spinola di pellicceria") !== -1
                   || _nPS.indexOf("galleria nazionale di palazzo spinola") !== -1)){
        p.addr = p.addr || p.address || "Piazza Pellicceria 1, 16123 Genova";
        p.site = p.site || p.url || "https://palazzospinola.cultura.gov.it/";
        p.desc = {"it": "La Galleria Nazionale di Palazzo Spinola è un museo statale collocato all'interno di palazzo Spinola di Pellicceria, un edificio nobiliare cinquecentesco.", "en": "The National Gallery of Palazzo Spinola is a state museum housed inside Palazzo Spinola di Pellicceria, a 16th‑century noble residence.", "fr": "La Galerie nationale du Palazzo Spinola est un musée d’État situé à l’intérieur du palais Spinola di Pellicceria, une demeure aristocratique du XVIe siècle.", "es": "La Galería Nacional de Palazzo Spinola es un museo estatal ubicado dentro del palacio Spinola di Pellicceria, una residencia noble del siglo XVI.", "ar": "تُعد «غاليريا ناتسيونالي دي بالاتسو سبينولا» متحفًا حكوميًا يقع داخل قصر سبينولا دي بيلّيتشّيريا، وهو مبنى نبيل من القرن السادس عشر.", "ru": "Национальная галерея палаццо Спинола — государственный музей, расположенный в палаццо Спинола ди Пелличчерия, дворце XVI века.", "zh": "斯皮诺拉宫国家美术馆是一座国家博物馆，位于皮利切里亚的斯皮诺拉宫内，这是一座 16 世纪的贵族宅邸。", "lij": "A Galleria Nazionale de Palazzo Spinola a l’é ‘n museo statâle into Palazzo Spinola de Pellicceria, ‘na cä nobile do XVI secolo."};

        var _h0ps = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Palazzo Spinola</span></div>");
        m.bindPopup(_h0ps, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0ps);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0ps);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Palazzo Tursi" (stile Forti)
    try{
      var _nPT = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nPT && (_nPT.indexOf("palazzo tursi") !== -1 
                   || _nPT.indexOf("palazzo doria-tursi") !== -1
                   || _nPT.indexOf("palazzo niccolò grimaldi") !== -1
                   || _nPT.indexOf("palazzo niccolo grimaldi") !== -1)){
        p.addr = p.addr || p.address || "Via Garibaldi, 9, 16124 Genova";
        p.site = p.site || p.url || "http://www.museidigenova.it/it/content/palazzo-tursi";
        p.desc = {"it": "Il palazzo Doria-Tursi, o palazzo Niccolò Grimaldi, è sede del Comune di Genova e fa parte del polo museale dei Musei di Strada Nuova.", "en": "The Doria–Tursi Palace, also known as Palazzo Niccolò Grimaldi, houses Genoa’s City Hall and is part of the Musei di Strada Nuova museum hub.", "fr": "Le palais Doria‑Tursi, également appelé palais Niccolò Grimaldi, abrite l’Hôtel de Ville de Gênes et fait partie du pôle muséal des Musei di Strada Nuova.", "es": "El palacio Doria‑Tursi, también conocido como palacio Niccolò Grimaldi, es la sede del Ayuntamiento de Génova y forma parte del complejo museístico Musei di Strada Nuova.", "ar": "قصر دوريا‑تورسي، المعروف أيضًا بقصر نيكولو غريمالدي، هو مقر بلدية جنوة وهو جزء من قطب «متاحف سترادا نوفا».", "ru": "Дворец Дория‑Турси, также известный как палаццо Никколо Гримальди, является резиденцией мэрии Генуи и входит в музейный комплекс Musei di Strada Nuova.", "zh": "多里亚‑图尔西宫（亦称尼科洛·格里马尔迪宫）是热那亚市政厅所在地，也是“新街博物馆群”（Musei di Strada Nuova）的一部分。", "lij": "O Palazzo Doria‑Tursi, dîto anche Palazzo Niccolò Grimaldi, o l’é a seu do Comune de Zêna e o fa parte do polo museâle di Musei de Strâda Nêuva."};

        var _h0pt = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Palazzo Tursi</span></div>");
        m.bindPopup(_h0pt, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0pt);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0pt);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Palazzo Rosso" (stile Forti)
    try{
      var _nPR = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nPR && (_nPR.indexOf("palazzo rosso") !== -1 
                   || _nPR.indexOf("palazzo francesco ridolfo brignole sale") !== -1)){
        p.addr = p.addr || p.address || "Via Garibaldi, 18, 16124 Genova";
        p.site = p.site || p.url || "http://www.museidigenova.it/it/museo/palazzo-rosso";
        p.desc = {"it": "Il Palazzo Rosso, o palazzo Francesco Ridolfo Brignole Sale, è situato nel centro storico di Genova. Era uno dei Palazzi dei Rolli designati a ospitare gli ospiti di alto rango per conto del governo, durante le visite di stato.", "en": "Palazzo Rosso, also known as Palazzo Francesco Ridolfo Brignole Sale, is located in Genoa’s historic center. It was one of the Palazzi dei Rolli designated to host high‑ranking guests on behalf of the government during state visits.", "fr": "Le Palazzo Rosso, également appelé palais Francesco Ridolfo Brignole Sale, est situé dans le centre historique de Gênes. Il faisait partie des Palazzi dei Rolli, désignés pour accueillir, au nom du gouvernement, des hôtes de haut rang lors des visites d’État.", "es": "El Palazzo Rosso, también conocido como palacio Francesco Ridolfo Brignole Sale, está situado en el centro histórico de Génova. Fue uno de los Palazzi dei Rolli designados para alojar, en nombre del gobierno, a huéspedes de alto rango durante las visitas de Estado.", "ar": "يقع «بالاتزو روسو»، المعروف أيضًا بقصر فرانشيسكو ريدولفو برينيوليه ساله، في المركز التاريخي لجنوة. وكان أحد «بالاتسي دي رولي» المخصّصة لاستضافة الضيوف رفيعي المستوى نيابةً عن الحكومة أثناء الزيارات الرسمية.", "ru": "Палаццо Россо, также известный как дворец Франческо Ридольфо Бриньоле Сале, расположен в историческом центре Генуи. Он входил в число «Палацци дей Ролли», предназначенных для размещения высокопоставленных гостей от имени правительства во время государственных визитов.", "zh": "红宫（Palazzo Rosso），亦称弗朗切斯科·里多尔福·布里尼奥莱·萨莱宫，位于热那亚历史中心。它曾是“罗利宫殿”（Palazzi dei Rolli）之一，用于在国事访问期间代表政府接待高阶宾客。", "lij": "O Palazzo Rosso, dîto anche Palazzo Francesco Ridolfo Brignole Sale, o se trêuva into centro stòrico de Zêna. O l’ea un di Palazzi dei Rolli destinæ a ospitâ, pe conto do governo, òspiti de erto rango durante e visitte de Stæto."};

        var _h0pr = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Palazzo Rosso</span></div>");
        m.bindPopup(_h0pr, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0pr);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0pr);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Palazzo Bianco" (stile Forti)
    try{
      var _nPB = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_nPB && (_nPB.indexOf("palazzo bianco") !== -1 
                   || _nPB.indexOf("palazzo luca grimaldi") !== -1
                   || _nPB.indexOf("palazzo brignole sale") !== -1)){
        p.addr = p.addr || p.address || "Via Garibaldi, 18, 16124 Genova";
        p.site = p.site || p.url || "http://www.museidigenova.it/it/museo/palazzo-rosso";
        p.desc = {"it": "Palazzo Bianco, detto anche palazzo Luca Grimaldi, o palazzo Brignole Sale, si può considerare il più antico e, al contempo, il più recente tra i fastosi edifici che prospettano su via Garibaldi (\"Strada Nuova\").", "en": "Palazzo Bianco, also known as Palazzo Luca Grimaldi or Palazzo Brignole Sale, can be considered both the oldest and, at the same time, the most recent among the splendid buildings facing Via Garibaldi (“Strada Nuova”).", "fr": "Le Palazzo Bianco, également appelé palais Luca Grimaldi ou palais Brignole Sale, peut être considéré comme à la fois le plus ancien et, en même temps, le plus récent des somptueux édifices donnant sur la Via Garibaldi (« Strada Nuova »).", "es": "El Palazzo Bianco, también conocido como palacio Luca Grimaldi o palacio Brignole Sale, puede considerarse al mismo tiempo el más antiguo y el más reciente entre los suntuosos edificios que dan a la Via Garibaldi (“Strada Nuova”).", "ar": "يُعرف «بالاتزو بيانكو» أيضًا باسم قصر لوكا غريمالدي أو قصر بريغنوله ساله، ويمكن اعتباره الأقدم وفي الوقت نفسه الأحدث بين المباني الفخمة المطلة على فيا غاريبالدي («سترادا نوفا»).", "ru": "Дворец Бьянко, также известный как палаццо Лука Гримальди или палаццо Бриньоле Сале, считается одновременно самым старым и самым «новым» среди роскошных зданий на улице Гарибальди («Страда Нуова»).", "zh": "白宫（Palazzo Bianco），亦称卢卡·格里马尔迪宫或布里尼奥莱·萨莱宫，被认为是加里波第大街（“新街”）上一众华丽建筑中既最古老又最“新”的一座。", "lij": "Palazzo Bianco, dîto anche Palazzo Luca Grimaldi o Palazzo Brignole Sale, o se peu considerâ o ciù antîgo e, inte o mæximo, o ciù recénte tra i fastösi edifìçci che prospéttan in sciâ Via Garibaldi (“Strâda Nêuva”)."};

        var _h0pb = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Palazzo Bianco</span></div>");
        m.bindPopup(_h0pb, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0pb);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0pb);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo di Storia Naturale Giacomo Doria" (stile Forti)
    try{
      var _n14 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n14 && (_n14.indexOf("museo di storia naturale giacomo doria") !== -1 
                    || _n14.indexOf("storia naturale giacomo doria") !== -1
                    || _n14.indexOf("museo di storia naturale") !== -1)){
        p.addr = p.addr || p.address || "Via Brigata Liguria 9, 16121 Genova";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/museo-di-storia-naturale-giacomo-doria-0";
        p.desc = {"it": "Nato nel 1867, quello di Storia Naturale è il più antico museo della città e possiede ricchissime collezioni scientifiche formate da 4 milioni e mezzo di reperti ed esemplari provenienti da ogni parte del mondo: animali, fossili, piante e minerali.", "en": "Founded in 1867, the Natural History Museum is the city’s oldest museum and holds very rich scientific collections comprising four and a half million specimens and items from all over the world: animals, fossils, plants, and minerals.", "fr": "Fondé en 1867, le Musée d’Histoire naturelle est le plus ancien de la ville et conserve de très riches collections scientifiques, fortes de quatre millions et demi de spécimens et pièces provenant du monde entier : animaux, fossiles, plantes et minéraux.", "es": "Fundado en 1867, el Museo de Historia Natural es el museo más antiguo de la ciudad y posee riquísimas colecciones científicas formadas por cuatro millones y medio de ejemplares y piezas de todo el mundo: animales, fósiles, plantas y minerales.", "ar": "تأسّس عام 1867، ويُعدّ متحف التاريخ الطبيعي أقدم متاحف المدينة، ويضم مجموعات علمية ثرية تضم أربعة ملايين ونصف المليون من العينات والقطع من أنحاء العالم: حيوانات، أحافير، نباتات ومعادن.", "ru": "Основанный в 1867 году, Музей естественной истории — самый старый музей города. Он хранит богатейшие научные коллекции — четыре с половиной миллиона образцов и экспонатов со всего мира: животных, ископаемых, растений и минералов.", "zh": "成立于 1867 年的自然历史博物馆是本市最古老的博物馆，馆藏极为丰富，拥有约四百五十万件来自世界各地的标本与藏品：动物、化石、植物和矿物。", "lij": "L’è nassûo inte o 1867, o Museo de Stöia Naturâ “Giacomo Doria” o l’é o ciù antîgo de Zêna e o gh’à colleçioin scientifiche ricchìssime: quætro milioni e mêzo de reperti e esenpi da tutto o mondo — animâ, fössei, piante e minerâ."};

        var _h0n = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo di Storia Naturale Giacomo Doria</span></div>");
        m.bindPopup(_h0n, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0n);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0n);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo di Sant'Agostino" (stile Forti)
    try{
      var _n13 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n13 && (_n13.indexOf("museo di sant'agostino") !== -1 
                    || _n13.indexOf("sant'agostino") !== -1)){
        p.addr = p.addr || p.address || "Piazza di Sarzano, 35/R, 16128 Genova";
        p.site = p.site || p.url || "http://www.museidigenova.it/it/content/museo-di-santagostino";
        p.desc = {"it": "È il museo più importante della scultura in Liguria. Un viaggio nella scultura genovese da quella più antica e tardo medievale sino ai periodi più recenti con reperti dal X al XVIII secolo.", "en": "It is Liguria’s foremost sculpture museum. A journey through Genoese sculpture from the earliest and late‑medieval works to more recent periods, with artifacts dating from the 10th to the 18th century.", "fr": "C’est le plus important musée de sculpture en Ligurie. Un voyage dans la sculpture génoise, des œuvres les plus anciennes et tardo‑médiévales jusqu’aux périodes plus récentes, avec des pièces du Xe au XVIIIe siècle.", "es": "Es el museo de escultura más importante de Liguria. Un recorrido por la escultura genovesa, desde las obras más antiguas y tardo‑medievales hasta las épocas más recientes, con piezas del siglo X al XVIII.", "ar": "إنه أهم متحف للنحت في ليغوريا. رحلة عبر النحت الجنوي من الأعمال الأقدم والمتأخرة في العصور الوسطى وصولًا إلى الفترات الأحدث، مع معروضات تعود من القرن العاشر إلى القرن الثامن عشر.", "ru": "Это важнейший музей скульптуры в Лигурии. Путешествие по генуэзской скульптуре — от самых ранних и позднесредневековых произведений до более поздних периодов, с экспонатами X–XVIII веков.", "zh": "这是利古里亚最重要的雕塑博物馆。带你领略热那亚雕塑，从最早与中世纪晚期的作品到较近时期，馆藏年代跨越10至18世纪。", "lij": "O l’é o museo ciù inportante da scoltüa in Liguria. Un viäggio inta scoltüa zeneize, da e òpre ciù antighe e tardo‑medioevale fin‑ai périodi ciù recénti, con reperti dal X ao XVIII secolo."};

        var _h0s = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo di Sant'Agostino</span></div>");
        m.bindPopup(_h0s, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0s);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0s);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Via del Campo 29/rosso" (stile Forti)
    try{
      var _n12 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n12 && (_n12.indexOf("via del campo 29/rosso") !== -1 
                    || _n12.indexOf("via del campo 29rosso") !== -1
                    || _n12.indexOf("via del campo 29") !== -1)){
        p.addr = p.addr || p.address || "Via del Campo 29r, 16124 Genova";
        p.site = p.site || p.url || "https://www.viadelcampo29rosso.com/";
        p.desc = {"it": "La casa dei cantautori nel centro storico di Genova in via del Campo, un museo dedicato ai grandi cantautori genovesi.", "en": "The home of singer‑songwriters in Genoa’s historic center on Via del Campo, a museum dedicated to the great Genoese cantautori.", "fr": "La maison des auteurs‑compositeurs au cœur historique de Gênes, Via del Campo : un musée consacré aux grands cantautori génois.", "es": "La casa de los cantautores en el centro histórico de Génova, en Via del Campo: un museo dedicado a los grandes cantautori genoveses.", "ar": "بيت الكانتاتوري في المركز التاريخي لجنوة في فيا ديل كامبو؛ متحف مُكرَّس لكبار مؤلفي ومغني جنوة.", "ru": "Дом авторов‑исполнителей в историческом центре Генуи на улице Via del Campo — музей, посвящённый великим генуэзским кантаторе.", "zh": "位于热那亚历史中心的“歌手词作者之家”（Via del Campo 29/rosso），是一座致敬热那亚伟大创作歌手的博物馆。", "lij": "A cä di cantautô inte o centro stòrico de Zêna in Via do Campo: ‘n museo dedicòu ai grandi cantautô zeneixi."};

        var _h0v = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Via del Campo 29/rosso</span></div>");
        m.bindPopup(_h0v, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0v);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0v);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo dell'Accademia Ligustica di Belle Arti" (stile Forti)
    try{
      var _n11 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n11 && (_n11.indexOf("museo dell'accademia ligustica di belle arti") !== -1 
                    || _n11.indexOf("accademia ligustica") !== -1)){
        p.addr = p.addr || p.address || "Largo Alessandro Pertini, 4, 16123 Genova GE";
        p.site = p.site || p.url || "https://museo.accademialigustica.it/";
        p.desc = {"it": "Nel cuore di Genova, affacciato su Piazza de Ferrari, il Palazzo dell'Accademia dal 1831 accoglie la scuola e le sue ricchissime collezioni d'arte.", "en": "In the heart of Genoa, overlooking Piazza De Ferrari, the Academy’s Palazzo has housed the school and its rich art collections since 1831.", "fr": "Au cœur de Gênes, face à la Piazza De Ferrari, le Palais de l’Académie abrite depuis 1831 l’école et ses riches collections d’art.", "es": "En el corazón de Génova, frente a Piazza De Ferrari, el Palacio de la Academia acoge desde 1831 la escuela y sus riquísimas colecciones de arte.", "ar": "في قلب جنوة والمطّل على ساحة دي فيراري، يستضيف قصر الأكاديمية منذ عام 1831 المدرسة ومجموعاتها الفنية الغنية.", "ru": "В самом центре Генуи, с видом на площадь Де Феррари, дворец Академии с 1831 года является домом для школы и её богатейших художественных коллекций.", "zh": "坐落在热那亚市中心、面向德费拉里广场的学院宫，自 1831 年以来一直承载着学院及其极为丰富的艺术藏品。", "lij": "Inte o cö de Zêna, affaçæ in sciâ Piazza de Ferrari, o Palazzo de l’Accademia dâ o 1831 o acöggie a scöla e e so ricchìssime coleçioin d’arte."};

        var _h0acc = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo dell'Accademia Ligustica di Belle Arti</span></div>");
        m.bindPopup(_h0acc, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0acc);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0acc);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo dei Beni Culturali Cappuccini" (stile Forti)
    try{
      var _n10 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n10 && (_n10.indexOf("museo dei beni culturali cappuccini") !== -1 
                   || _n10.indexOf("museo cappuccini") !== -1 
                   || _n10.indexOf("beni culturali cappuccini") !== -1)){
        p.addr = p.addr || p.address || "Viale IV Novembre 5 (ingresso da Via Bartolomeo Bosco), 16121 Genova";
        p.site = p.site || p.url || "https://www.bccgenova.it/";
        p.desc = {"it": "Il Museo dei Beni Culturali Cappuccini di Genova è allestito all'ultimo piano del convento dei frati Cappuccini di Santa Caterina di Genova ed è accessibile attraverso uno scalone monumentale settecentesco.", "en": "Genoa’s Capuchin Cultural Heritage Museum is set on the top floor of the Capuchin Friars’ convent of Santa Caterina and is accessed via a monumental 18th‑century staircase.", "fr": "Le Musée des Biens Culturels des Capucins de Gênes est installé au dernier étage du couvent des frères capucins de Santa Caterina et se rejoint par un monumental escalier du XVIIIe siècle.", "es": "El Museo de Bienes Culturales Capuchinos de Génova se ubica en la última planta del convento de los frailes capuchinos de Santa Caterina y se accede por una monumental escalinata del siglo XVIII.", "ar": "يقع متحف التراث الثقافي للآباء الكبوشيين في جنوة في الطابق العلوي من دير رهبان الكبوشيين في سانتا كاترينا، ويُوصل إليه عبر درج أثري ضخم من القرن الثامن عشر.", "ru": "Музей культурного наследия капуцинов в Генуе расположен на верхнем этаже монастыря капуцинов Святой Катерины; вход к нему ведёт по монументальной лестнице XVIII века.", "zh": "热那亚嘉布遣修士文化遗产博物馆位于圣卡特琳娜嘉布遣修道院的顶层，需经18世纪的纪念性楼梯到达。", "lij": "O Museo di Beni Culturâli Cappuccini de Zêna o l’é allestîo a l’ùrtimo pîan do convento di fræti Cappuccini de Santa Caterina de Zêna e se rîva attraversu ‘n scâon monumentâle do Settesento."};

        var _h0b = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo dei Beni Culturali Cappuccini</span></div>");
        m.bindPopup(_h0b, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0b);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0b);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo Diocesano" (stile Forti)
    try{
      var _n9 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n9 && (_n9.indexOf("museo diocesano") !== -1)){
        p.addr = p.addr || p.address || "Via Tommaso Reggio 20r, 16123 Genova";
        p.site = p.site || p.url || "https://www.museodiocesanogenova.it";
        p.desc = {"it": "Il Museo diocesano di Genova è allestito all'interno del chiostro di San Lorenzo, antica residenza dei Canonici della Cattedrale omonima.", "en": "Genoa’s Diocesan Museum is housed within the cloister of San Lorenzo, once the residence of the canons of the Cathedral of San Lorenzo.", "fr": "Le Musée diocésain de Gênes est aménagé à l’intérieur du cloître de San Lorenzo, ancienne résidence des chanoines de la cathédrale San Lorenzo.", "es": "El Museo Diocesano de Génova se ubica en el claustro de San Lorenzo, antigua residencia de los canónigos de la Catedral de San Lorenzo.", "ar": "يقع متحف أبرشية جنوة داخل رواق دير سان لورينزو، وكان سابقًا مقرّ كانونيّي كاتدرائية سان لورينزو.", "ru": "Епархиальный музей Генуи расположен в клуатре Сан-Лоренцо — бывшей резиденции каноников одноимённого собора.", "zh": "热那亚教区博物馆位于圣劳伦佐（San Lorenzo）回廊内，曾是同名主教座堂的教士住所。", "lij": "O Museo Diocesàn de Zêna o l’é allestîo into chiostro de San Lorenzo, antìga residença di-i canonici de a Cattedrale de San Lorenzo."};

        var _h0d = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo Diocesano</span></div>");
        m.bindPopup(_h0d, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0d);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0d);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Museo Biblioteca dell'Attore" (stile Forti)
    try{
      var _n8 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n8 && (_n8.indexOf("museo biblioteca dell'attore") !== -1 || _n8.indexOf("museo dell'attore") !== -1)){
        p.addr = p.addr || p.address || "Via del Seminario 10, 16121 Genova";
        p.site = p.site || p.url || "https://www.museoattore.it/";
        p.desc = {"it": "Il Civico museo biblioteca dell'attore è un museo dello spettacolo italiano con sede a Genova.", "en": "The Civic Museum and Library of the Actor is an Italian performing arts museum based in Genoa.", "fr": "Le Musée-Bibliothèque civique de l’Acteur est un musée des arts du spectacle italien basé à Gênes.", "es": "El Museo-Biblioteca Cívico del Actor es un museo de las artes escénicas italianas con sede en Génova.", "ar": "المتحف والمكتبة المدنية للممثل هو متحف للفنون الأدائية الإيطالية مقره في جنوة.", "ru": "Городской Музей‑библиотека Актёра — это музей итальянского театра и исполнительских искусств в Генуе.", "zh": "市立演员博物馆与图书馆是位于热那亚的意大利表演艺术博物馆。", "lij": "O Museu‑Biblioteca do Attô a l’é ‘n museo do spettacolo italiani con a seu sedia a Zêna."};

        var _h0a = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Museo Biblioteca dell'Attore</span></div>");
        m.bindPopup(_h0a, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0a);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0a);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "MUCE - Museo Certosa di Genova" (stile Forti)
    try{
      var _n7 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n7 && (_n7.indexOf("muce - museo certosa di genova") !== -1 || _n7.indexOf("museo certosa di genova") !== -1 || _n7.indexOf("muce") === 0)){
        p.addr = p.addr || p.address || "Oasi del Chiostro, 16159 Genova GE";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/muce-museo-certosa-di-genova";
        p.desc = {"it": "Il Museo Certosa di Genova sta nascendo nello straordinario complesso monumentale creato dall'ordine Certosino in Val Polcevera nel 1297.", "en": "The Certosa Museum of Genoa is taking shape within the extraordinary monastic complex founded by the Carthusian order in Val Polcevera in 1297.", "fr": "Le Musée de la Chartreuse de Gênes prend forme au sein de l’extraordinaire complexe monastique créé par l’ordre chartreux en Val Polcevera en 1297.", "es": "El Museo Certosa de Génova está naciendo dentro del extraordinario complejo monumental creado por la orden cartuja en Val Polcevera en 1297.", "ar": "يتشكّل متحف تشرتوزا في جنوة داخل المجمع الرهباني الاستثنائي الذي أسسته الرهبنة الكارتوزية في وادي بولتشيفيرا عام 1297.", "ru": "Музей Чертоса в Генуе формируется в пределах выдающегося монастырского комплекса, созданного картезианским орденом в Вал Полчевера в 1297 году.", "zh": "热那亚修道院博物馆（MUCE）正诞生于波切维拉河谷卡尔特修会于1297年创建的非凡修道院建筑群之中。", "lij": "O MUCE – Museo Çertösa de Zêna o sta nasce into straordinârio complesso monasticco creato da l’òrdine Çertosin in Val Polcevera in sciô 1297."};

        var _h0u = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>MUCE - Museo Certosa di Genova</span></div>");
        m.bindPopup(_h0u, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0u);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0u);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "MEI Museo Nazionale dell'Emigrazione Italiana" (stile Forti)
    try{
      var _n6 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n6 && (_n6.indexOf("mei museo nazionale dell'emigrazione italiana") !== -1 
                   || _n6.indexOf("museo nazionale dell'emigrazione italiana") !== -1 
                   || _n6.indexOf("mei") === 0)){
        p.addr = p.addr || p.address || "Piazza della Commenda, 16126 Genova";
        p.site = p.site || p.url || "https://www.museomei.it/";
        p.desc = {"it": "Ospitato all'interno della medioevale Commenda di San Giovanni di Prè, il MEI si sviluppa su 3 piani divisi in 16 aree dove si può possono ripercorrere le molteplici storie delle migrazioni italiane, dall’Unità d’Italia (e ancora prima) alla contemporaneità.", "en": "Housed inside the medieval Commenda di San Giovanni di Prè, the MEI spans 3 floors divided into 16 areas where visitors can retrace the many stories of Italian migrations, from the Unification of Italy (and even earlier) to the present day.", "fr": "Installé dans la médiévale Commenda di San Giovanni di Prè, le MEI s’étend sur 3 étages répartis en 16 espaces où l’on peut retracer les multiples histoires des migrations italiennes, depuis l’Unification de l’Italie (et même avant) jusqu’à l’époque contemporaine.", "es": "Ubicado dentro de la medieval Commenda di San Giovanni di Prè, el MEI se desarrolla en 3 plantas divididas en 16 áreas donde se pueden recorrer las múltiples historias de las migraciones italianas, desde la Unificación de Italia (y aun antes) hasta la contemporaneidad.", "ar": "يقع MEI داخل مبنى \"كوميندا دي سان جوفاني دي برى\" ذي الطابع العائد للعصور الوسطى، ويمتد على 3 طوابق مقسّمة إلى 16 منطقة تتيح للزائر تتبّع قصص الهجرات الإيطالية المتعددة، من توحيد إيطاليا (وحتى قبل ذلك) وصولًا إلى الحاضر.", "ru": "Музей MEI расположен в средневековой Комменде Сан-Джованни ди Пре и занимает 3 этажа, разделённые на 16 зон, где можно проследить многогранные истории итальянских миграций — от объединения Италии (и даже ранее) до наших дней.", "zh": "MEI 位于中世纪的普雷圣若望救济院（Commenda di San Giovanni di Prè）内，共 3 层、16 个主题区域，带领参观者回溯意大利移民的多重历史，从意大利统一（甚至更早）直至当代。", "lij": "O MEI o l’é inta medievale Commenda de San Zuan de Prè: se sviluppa in tre piani divîzi in 16 aree, ‘ndó se peu ripercorre e tante stöie de l’emigraçion italiana, da l’Unitae d’Italia (e ancón primma) fin a-i nostri giorni."};

        var _h0m = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>MEI Museo Nazionale dell'Emigrazione Italiana</span></div>");
        m.bindPopup(_h0m, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0m);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0m);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "GAM Galleria d'Arte Moderna" (stile Forti)
    try{
      var _n5 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n5 && (_n5.indexOf("gam galleria d'arte moderna") !== -1 || _n5.indexOf("galleria d'arte moderna") !== -1)){
        p.addr = p.addr || p.address || "Via Capolungo, 3, 16167 Genova GE";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/gam-galleria-darte-moderna";
        p.desc = {"it": "La Galleria d'arte moderna - GAM è uno dei musei che fanno parte del polo museale di Nervi, quartiere del comune di Genova.", "en": "The Galleria d’Arte Moderna (GAM) is one of the museums that form the Nervi museum hub in the municipality of Genoa.", "fr": "La Galleria d’Arte Moderna (GAM) est l’un des musées qui composent le pôle muséal de Nervi, dans la commune de Gênes.", "es": "La Galleria d’Arte Moderna (GAM) es uno de los museos que forman parte del polo museístico de Nervi, en el municipio de Génova.", "ar": "غاليريا د'Arte Moderna (GAM) هي أحد المتاحف التي تشكّل قطب نيرفي المتحفي في بلدية جنوة.", "ru": "Галерея современного искусства (GAM) — один из музеев музейного кластера Нерви в муниципалитете Генуи.", "zh": "现代美术馆（GAM）是热那亚内尔维博物馆群的一部分。", "lij": "A Galleria d’Arte Moderna (GAM) a l’é un di musei che fan parte do polo museâle de Nervi, comune de Zêna."};

        var _h0g = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>GAM Galleria d'Arte Moderna</span></div>");
        m.bindPopup(_h0g, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0g);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0g);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Complesso Monumentale della Lanterna" (stile Forti)
    try{
      var _n4 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n4 && (_n4.indexOf("complesso monumentale della lanterna") !== -1 || _n4.indexOf("lanterna") !== -1)){
        p.addr = p.addr || p.address || "Rampa della Lanterna, 16149 Genova";
        p.site = p.site || p.url || "https://www.lanternadigenova.com/";
        p.desc = {"it": "La Lanterna di Genova non è solo un faro, ma anche un museo: al suo interno troverete oggetti d’epoca destinati al funzionamento dei segnali marittimi di navigazione.", "en": "Genoa’s Lanterna is not just a lighthouse but also a museum: inside you’ll find historical instruments used to operate maritime navigation signals.", "fr": "La Lanterna de Gênes n’est pas seulement un phare, c’est aussi un musée : vous y trouverez des objets d’époque liés au fonctionnement des signaux maritimes de navigation.", "es": "La Lanterna de Génova no es solo un faro, sino también un museo: en su interior encontrarás objetos de época utilizados para el funcionamiento de las señales marítimas de navegación.", "ar": "ليست لانترنا جنوة مجرّد منارة، بل هي أيضًا متحف: ستجدون في داخلها أدوات تاريخية كانت تُستخدم لتشغيل إشارات الملاحة البحرية.", "ru": "Лантерна в Генуе — это не только маяк, но и музей: внутри представлены исторические приборы, использовавшиеся для работы морских навигационных сигналов.", "zh": "热那亚的灯塔（Lanterna）不仅是一座灯塔，还是一座博物馆：馆内展出用于海上航行信号运作的历史器具。", "lij": "A Lanterna de Zêna a no l’é solo ‘n faro, ma anche ‘n museo: drénto gh’é oggetti d’epoca pe-o funçionamento di segnaî marìtimi de navigaçion."};

        var _h0l = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Complesso Monumentale della Lanterna</span></div>");
        m.bindPopup(_h0l, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0l);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0l);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Castello D'Albertis Museo delle Culture del Mondo" (stile Forti)
    try{
      var _n3 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n3 && _n3.indexOf("castello d'albertis museo delle culture del mondo") !== -1){
        p.addr = p.addr || p.address || "Corso Dogali 18, 16136 Genova";
        p.site = p.site || p.url || "https://www.museidigenova.it/it/castello-dalbertis-museo-delle-culture-del-mondo";
        p.desc = {"it": "Inaugurato in occasione di Genova capitale europea della cultura 2004, il Museo è all'interno del castello D'Albertis (antica dimora del capitano Enrico Alberto d'Albertis). Gli ambienti sono arredati \"in stile\" e caratterizzati dal gusto del \"revival\", ed espongono il materiale etnografico e archeologico raccolto in cinque continenti dal Capitano.", "en": "Opened for Genoa’s year as European Capital of Culture in 2004, the Museum is housed inside D’Albertis Castle (the former residence of Captain Enrico Alberto d’Albertis). Its rooms are furnished “in style” with a revival taste and display ethnographic and archaeological collections gathered by the Captain across five continents.", "fr": "Inauguré à l’occasion de Gênes Capitale européenne de la culture 2004, le musée se trouve à l’intérieur du château D’Albertis (ancienne demeure du capitaine Enrico Alberto d’Albertis). Les salles, meublées « dans le style » et marquées par un goût du « revival », exposent des collections ethnographiques et archéologiques recueillies sur cinq continents par le Capitaine.", "es": "Inaugurado con motivo de Génova Capital Europea de la Cultura 2004, el museo se encuentra dentro del Castillo D’Albertis (antigua residencia del capitán Enrico Alberto d’Albertis). Sus salas, amuebladas “de época” y con gusto por el “revival”, exhiben materiales etnográficos y arqueológicos recogidos por el Capitán en cinco continentes.", "ar": "افتُتح المتحف بمناسبة اختيار جنوة عاصمةً أوروبية للثقافة عام 2004، ويقع داخل قلعة دالبرْتيس (المقر السابق للقائد إنريكو ألبيرتو دالبرْتيس). غرفه مؤثثة «على الطراز» وبروح «إحيائية»، وتعرض موادَّ إثنوغرافية وأثرية جمعها القائد من خمسة قارات.", "ru": "Открытый к программе «Генуя — Европейская столица культуры 2004», музей расположен в замке Д’Альбертис (бывшей резиденции капитана Энрико Альберто д’Альбертиса). Залы, оформленные «в стиле» и в духе «ревайвла», представляют этнографические и археологические материалы, собранные Капитаном на пяти континентах.", "zh": "作为热那亚 2004 年“欧洲文化之都”活动的一部分开幕，博物馆坐落于达尔贝蒂斯城堡（船长恩里科·阿尔贝托·达尔贝蒂斯的旧居）内。馆内各厅以“仿古风格”布置，带有“复兴主义”趣味，展出这位船长在五大洲搜集的民族志与考古藏品。", "lij": "Inauguròu pe Zêna Capitale Europea da Cultura 2004, o Museo o se trêuva into Castello D’Albertis (antìga cä de-o capitàn Enrico Alberto d’Albertis). I ambei son ammœblæ “in stîle” co-in gôsto do “revival” e mostran materiâle etnografico e archeologico recojûo in çinque continenti dal Capitàn."};

        var _h0c = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Castello D'Albertis Museo delle Culture del Mondo</span></div>");
        m.bindPopup(_h0c, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0c);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0c);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Wolfsoniana" (stile Forti)
    try{
      var _n2 = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n2 && _n2.indexOf("wolfsoniana") !== -1){
        p.addr = p.addr || p.address || "Via Serra Gropallo 4, 16167 Genova";
        p.site = p.site || p.url || "https://www.wolfsoniana.it/";
        p.desc = {"it": "La Wolfsoniana è una galleria d'arte moderna facente parte del polo museale del levante genovese, nel quartiere di Nervi. Custodisce centinaia di opere d'arte nella sua mostra permanente, e accoglie ogni anno numerose mostre temporanee.", "en": "The Wolfsoniana is a modern art gallery that forms part of the eastern Genoa museum hub, in the Nervi district. It houses hundreds of works in its permanent collection and hosts numerous temporary exhibitions each year.", "fr": "La Wolfsoniana est une galerie d’art moderne faisant partie du pôle muséal du Levant génois, dans le quartier de Nervi. Elle conserve des centaines d’œuvres dans sa collection permanente et accueille chaque année de nombreuses expositions temporaires.", "es": "La Wolfsoniana es una galería de arte moderno que forma parte del polo museístico del oriente de Génova, en el barrio de Nervi. Alberga cientos de obras en su exposición permanente y cada año acoge numerosas muestras temporales.", "ar": "وُلفسونيانا هي صالة للفن الحديث تُعد جزءًا من القطب المتحفي في شرق جنوة، بحي نيرفي. تحتفظ بمئات الأعمال الفنية في مجموعتها الدائمة، وتستضيف كل عام العديد من المعارض المؤقتة.", "ru": "Вольфсониана — галерея современного искусства, входящая в музейный кластер восточной Генуи, в районе Нерви. Здесь хранится сотни произведений в постоянной экспозиции, а также ежегодно проходит множество временных выставок.", "zh": "Wolfsoniana 是一座现代艺术画廊，隶属于热那亚东部（内尔维区）的博物馆群。馆藏常设展陈列数百件艺术作品，并且每年举办多场临时展览。", "lij": "A Wolfsoniana a l’é ‘na galleria d’arte moderna ch’a fa parte do polo museâle do levante de Zêna, into quartei de Nervi. A gh’à centinaie d’opere inte a mostra permanente e, ogni anno, a acœgge tante mostre temporanee."};

        var _h0w = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Wolfsoniana</span></div>");
        m.bindPopup(_h0w, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0w);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0w);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua per "Galata Museo del Mare" (stile Forti)
    try{
      var _n = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
      if (_n && _n.indexOf("galata museo del mare") !== -1){
        p.addr = p.addr || p.address || "Calata Ansaldo De Mari, 1, 16126 Genova";
        p.site = p.site || p.url || "https://www.galatamuseodelmare.it/";
        p.desc = {"it": "Il più grande museo marittimo del Mediterraneo: 6 piani di esposizione, 1 sottomarino e 5 ricostruzioni a grandezza naturale.", "en": "The largest maritime museum in the Mediterranean: 6 exhibition floors, 1 submarine, and 5 full-scale reconstructions.", "fr": "Le plus grand musée maritime de la Méditerranée : 6 étages d’exposition, 1 sous-marin et 5 reconstitutions grandeur nature.", "es": "El mayor museo marítimo del Mediterráneo: 6 plantas de exposición, 1 submarino y 5 reconstrucciones a tamaño real.", "ar": "أكبر متحف بحري في البحر الأبيض المتوسط: 6 طوابق للمعارض، وغواصة واحدة، و5 إعادة إنشاء بالحجم الكامل.", "ru": "Крупнейший морской музей в Средиземноморье: 6 этажей экспозиций, 1 подводная лодка и 5 полноразмерных реконструкций.", "zh": "地中海最大的海事博物馆：6层展区、1艘潜艇，以及5个等比例复原场景。", "lij": "O ciù gwo mensoê marìtimo do Mediterraneo: 6 piani de esposiçion, 1 sottomarìn e 5 reconstrûçioin a grandeçça naturale."};

        var _h0 = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Galata Museo del Mare</span></div>");
        m.bindPopup(_h0, { className: 'mh-popup' });
        m.on('popupopen', function(ev){
          try{
            var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0);
            ev.popup.setContent(_h);
          }catch(_){}
        });
        // Aggiornamento live su cambio lingua
        try{
          document.addEventListener('app:set-lang', function(){
            try{
              if (m && m.isPopupOpen && m.isPopupOpen()){
                var _h = (window.museumPopupHTML ? window.museumPopupHTML(p) : _h0);
                m.setPopupContent(_h);
              }
            }catch(_){}
          });
        }catch(_){}
      }
    }catch(e){}    
// Nuvola multilingua SOLO per "Casa di Colombo" (stile Forti)
try{
  var _name = (p && p.name ? p.name.toString().trim().toLowerCase() : "");
  if (_name && _name.indexOf("casa di colombo") !== -1){
    p.addr = p.addr || p.address || "Vico Dritto di Ponticello, 37, 16121 Genova";
    p.site = p.site || p.url || "https://www.museidigenova.it/it/casa_di_colombo";
    p.desc = (window.MUSEO_COLOMBO && window.MUSEO_COLOMBO.desc) ? window.MUSEO_COLOMBO.desc : p.desc;

    var _html0 = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Casa di Colombo</span></div>");
    m.bindPopup(_html0, { className: "mh-popup" });
    m.on('popupopen', function(ev){
      try{
        var _html = (window.museumPopupHTML ? window.museumPopupHTML(p) : _html0);
        ev.popup.setContent(_html);
      }catch(_){}
    });
  
    // Aggiorna contenuto se cambia lingua mentre il popup è aperto
    try{
      document.addEventListener('app:set-lang', function(){
        try{
          if (m && m.isPopupOpen && m.isPopupOpen()){
            var _html = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Casa di Colombo</span></div>");
            m.setPopupContent(_html);
          }
        }catch(_){}
      });
    }catch(_){}
}
}catch(e){}
    // Nuvola multilingua SOLO per "Casa di Colombo" (stile Forti)
    try{
      if (p && p.name && p.name && p.name.toLowerCase().indexOf("casa di colombo") !== -1){
        var _lang = (localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it').slice(0,2).toLowerCase();
        var _html = (window.museumColomboPopupHTML ? window.museumColomboPopupHTML(_lang) : "<div>Casa di Colombo</div>");
        var _html0 = (window.museumPopupHTML ? window.museumPopupHTML(p) : "<div class='mh-popup'><span class='mh-popup-title'>Casa di Colombo</span></div>");
m.bindPopup(_html0, { className: 'mh-popup' });
m.on('popupopen', function(ev){ try{ var _h=(window.museumPopupHTML?window.museumPopupHTML(p):_html0); ev.popup.setContent(_h);}catch(_){}});
      try{ setTimeout(function(){ if(window.renderQrList) window.renderQrList('#qr-shortcuts-panel'); }, 120); }catch(_){}
      try{ setTimeout(function(){ if(window.renderQrList) window.renderQrList('#qr-shortcuts-panel'); }, 120); }catch(_){}

}
    }catch(e){}

  };