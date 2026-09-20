(function(){
  'use strict';
  if(window.__GM_NEW_HOME__) return;
  window.__GM_NEW_HOME__ = true;

  var ICONS = {
    heritage:'<path d="M4 20h16M6 17h12M7 17V9m3 8V9m4 8V9m3 8V9M5 7l7-4 7 4H5Z"/>',
    fun:'<path d="M4 19c3-5 5-8 8-8s5 3 8 8M7 8h.01M12 6h.01M17 8h.01M5 21h14"/>',
    move:'<path d="M5 17h14M7 17l-2 4m12-4 2 4M6 13h12l-1-7H7l-1 7Zm2-3h.01M16 10h.01"/>',
    routes:'<path d="M5 20V7m0 0 5-3 4 3 5-3v13l-5 3-4-3-5 3V7Zm5-3V4m4 16V7"/>',
    food:'<path d="M7 3v7m-2-7v4a2 2 0 0 0 4 0V3M7 10v11m8-18v18m0-18c3 2 4 5 4 8h-4"/>',
    media:'<path d="M4 5h16v14H4V5Zm5 4 6 3-6 3V9Z"/>',
    community:'<path d="M4 5h16v11H8l-4 4V5Zm4 4h8m-8 3h5"/>',
    extra:'<path d="M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L12 3Z"/>',
    guide:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm3 0v13a3 3 0 0 0-3-3m6-6h5m-5 4h5"/>'
  };

  function icon(name){
    return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[name]||ICONS.guide)+'</svg>';
  }

  var GAMES = [
    {
      key:'a-zena',
      title:'A Zena – Quante ne sai?',
      note:'Metti alla prova quanto conosci Genova',
      icon:'giochi/images/game-trivial.svg',
      href:'giochi/a-zena/index.html'
    }
  ];

  var EVENT_TAGS = [
    {key:'museums', label:'Musei e mostre', note:'Musei, mostre ed esposizioni', lists:['fav-list-musei','fav-list-mostre']},
    {key:'palaces', label:'Palazzi e ville', note:'Eventi in dimore e spazi storici', lists:['fav-list-palazzi']},
    {key:'heritage', label:'Patrimonio storico', note:'Chiese, forti e luoghi storici', lists:['fav-list-chiese','fav-list-forti','fav-list-palazzi']},
    {key:'festivals', label:'Festival', note:'Feste e manifestazioni', lists:['fav-list-parchi-piazze']},
    {key:'markets', label:'Mercati e fiere', note:'Mercati, fiere ed eventi diffusi', lists:['fav-list-parchi-piazze']},
    {key:'music', label:'Musica', note:'Concerti e appuntamenti musicali', lists:['fav-list-teatri','fav-list-palazzi','fav-list-locali','fav-list-parchi-piazze']},
    {key:'theatre', label:'Teatro', note:'Spettacoli e appuntamenti teatrali', lists:['fav-list-teatri']},
    {key:'cinema', label:'Cinema', note:'Proiezioni, rassegne e incontri', lists:['fav-list-cinema']},
    {key:'sport', label:'Sport', note:'Gare, incontri e attività sportive', lists:['fav-list-sport']}
  ];

  var EVENT_TAG_ICONS = {
    museums:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16M6 17h12M7 17V9m3 8V9m4 8V9m3 8V9M5 7l7-4 7 4H5Z"/></svg>',
    palaces:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16M6 20V8l6-4 6 4v12M9 11h.01M15 11h.01M9 15h.01M15 15h.01M11 20v-3h2v3"/></svg>',
    heritage:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20V8h14v12M8 8V5h8v3M9 20v-6a3 3 0 0 1 6 0v6M4 20h16"/></svg>',
    festivals:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 3.2L17 7.7l-3.5 1.5L12 12.5l-1.5-3.3L7 7.7l3.5-1.5L12 3ZM18.5 13l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7ZM5.5 13l1 2.1 2.1 1-2.1 1-1 2.1-1-2.1-2.1-1 2.1-1 1-2.1Z"/></svg>',
    markets:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16l-1-4H5L4 9Zm1 0v10h14V9M8 19v-5h4v5M4 9c0 1.5 1 2.5 2.5 2.5S9 10.5 9 9c0 1.5 1 2.5 3 2.5s3-1 3-2.5c0 1.5 1 2.5 2.5 2.5S20 10.5 20 9"/></svg>',
    music:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l10-2v12M9 9l10-2M6.5 20c1.4 0 2.5-.9 2.5-2s-1.1-2-2.5-2S4 16.9 4 18s1.1 2 2.5 2Zm10 0c1.4 0 2.5-.9 2.5-2s-1.1-2-2.5-2-2.5.9-2.5 2 1.1 2 2.5 2Z"/></svg>',
    theatre:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14v5c0 5-2.5 9-7 11-4.5-2-7-6-7-11V4Zm3 5h.01M16 9h.01M9 14c1 .8 2 1.2 3 1.2s2-.4 3-1.2"/></svg>',
    cinema:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16v11H4V8Zm0 0 2-4h4L8 8m4 0 2-4h4l-2 4M4 12h16"/></svg>',
    sport:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v4c0 3-1.5 5-4 6-2.5-1-4-3-4-6V4Zm0 2H5v2c0 2 1.2 3.5 3.5 4M16 6h3v2c0 2-1.2 3.5-3.5 4M12 14v4M8 20h8M10 18h4"/></svg>',
    propose:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M12 13v4M10 15h4"/></svg>'
  };

  function eventTagIcon(key){
    return EVENT_TAG_ICONS[key] || EVENT_TAG_ICONS.festivals;
  }

  var EVENT_PERIODS = [
    {key:'today', label:'Oggi'},
    {key:'weekend', label:'Questo weekend'},
    {key:'7days', label:'Prossimi 7 giorni'},
    {key:'30days', label:'Prossimi 30 giorni'}
  ];

  var EVENT_FAVORITES_STORAGE_KEY = 'gm_event_favorites_v1';
  var EVENT_FAVORITES_LIMIT = 100;

  var eventSearchState = {
    tags:[],
    period:'7days',
    area:'genova',
    results:[],
    searched:false,
    loading:false,
    language:'',
    checkedAt:'',
    quota:null
  };

  var SECTIONS = [
    {
      key:'guide', theme:'guide', wide:true, title:'Guida e istruzioni',
      description:'Scopri come usare Genova mApp e tutte le sue funzioni.',
      categories:[]
    },
    {
      key:'heritage', theme:'heritage', wide:true, title:'Patrimonio storico',
      sideButton:'#qt-cat-passato-btn', sideLabel:'Apri Passato sulla mappa',
      description:'Forti, musei, chiese e palazzi raccontano la storia e l’identità di Genova.',
      categories:[
        {title:'Forti', note:'Fortificazioni e sistemi difensivi', listId:'fav-list-forti', grouped:true, mapIcon:'icons/passato/forti.svg', mapToggle:'.qt-forti'},
        {title:'Musei', note:'Arte, storia, scienza e collezioni', listId:'fav-list-musei', grouped:true, mapIcon:'icons/passato/musei.svg', mapToggle:'.qt-museum'},
        {title:'Chiese', note:'Edifici religiosi e opere d’arte', listId:'fav-list-chiese', grouped:true, mapIcon:'icons/passato/chiese.svg', mapToggle:'.qt-chiese'},
        {title:'Palazzi', note:'Dimore storiche e Palazzi dei Rolli', listId:'fav-list-palazzi', grouped:true, mapIcon:'icons/passato/palazzi.svg', mapToggle:'.qt-palazzi'}
      ]
    },
    {
      key:'entertainment', theme:'fun', title:'Intrattenimento',
      sideButton:'#qt-cat-luoghi-btn', sideLabel:'Apri Intrattenimento sulla mappa',
      description:'Cultura, spettacolo, verde e attività per vivere la città nel tempo libero.',
      categories:[
        {title:'Mostre', note:'Esposizioni e spazi culturali', listId:'fav-list-mostre', grouped:true, mapIcon:'icons/intrattenimento/mostre.svg', mapToggle:'.qt-mostre'},
        {title:'Teatri', note:'Teatri storici e contemporanei', listId:'fav-list-teatri', grouped:true, mapIcon:'icons/intrattenimento/teatri.svg', mapToggle:'.qt-teatri'},
        {title:'Cinema', note:'Sale cinematografiche della città', listId:'fav-list-cinema', grouped:true, mapIcon:'icons/intrattenimento/cinema.svg', mapToggle:'.qt-cinema'},
        {title:'Parchi e piazze', note:'Aree verdi e luoghi d’incontro', listId:'fav-list-parchi-piazze', grouped:true, mapIcon:'icons/intrattenimento/parchi-piazze.svg', mapToggle:'.qt-parchi'},
        {title:'Sport', note:'Impianti e attività sportive', listId:'fav-list-sport', grouped:true, mapIcon:'icons/intrattenimento/sport.svg', mapToggle:'.qt-sport'}
      ]
    },
    {
      key:'transport', theme:'move', title:'Come muoversi',
      sideButton:'#qt-cat-trasporti-btn', sideLabel:'Apri Trasporti sulla mappa',
      description:'Trasporti pubblici e collegamenti per spostarsi a Genova e sul territorio.',
      categories:[
        {title:'Bus', note:'Fermate e rete urbana AMT', listId:'fav-list-bus', searchPlaceholder:'Cerca una linea, una fermata o una destinazione', mapIcon:'icons/come-muoversi/autobus.svg', mapToggle:'.qt-bus'},
        {title:'Metropolitana', note:'Stazioni della metropolitana', listId:'fav-list-metro', searchPlaceholder:'Cerca una stazione o una fermata', mapIcon:'icons/come-muoversi/metropolitana.svg', mapToggle:'.qt-metro'},
        {title:'Treni', note:'Stazioni ferroviarie', listId:'fav-list-train', searchPlaceholder:'Cerca una stazione', mapIcon:'icons/come-muoversi/treni.svg', mapToggle:'.qt-train'},
        {title:'Funicolari e ascensori', note:'Impianti verticali e cremagliere', listId:'fav-list-funi', searchPlaceholder:'Cerca un impianto o una fermata', mapIcon:'icons/come-muoversi/impianti-verticali.svg', mapToggle:'.qt-funi'},
        {title:'Navi e battelli', note:'Navebus e collegamenti marittimi', listId:'fav-list-mare', searchPlaceholder:'Cerca una linea, un approdo o una destinazione', mapIcon:'icons/come-muoversi/navi-battelli.svg', mapToggle:'.qt-mare'},
        {title:'Aereo', note:'Aeroporto e collegamenti', listId:'fav-list-aereo', searchPlaceholder:'Cerca un collegamento o una destinazione', mapIcon:'icons/come-muoversi/aereo.svg', mapToggle:'.qt-aereo'}
      ]
    },
    {
      key:'routes', theme:'routes', wide:true, title:'Mura, acquedotti e percorsi',
      sideButton:'#qt-cat-passato-btn', sideLabel:'Apri Passato sulla mappa',
      description:'Tracciati storici e itinerari consigliati per esplorare Genova passo dopo passo.',
      categories:[
        {title:'Mura storiche', note:'Le cinte murarie attraverso i secoli', type:'history-walls', mapIcon:'icons/passato/mura.svg', mapToggle:'.qt-mura-all'},
        {title:'Acquedotti', note:'Acquedotto romano e acquedotto storico', type:'history-aqueducts', mapIcon:'icons/passato/acquedotti.svg', mapToggle:'.qt-acq-all'},
        {title:'Percorsi consigliati', note:'Itinerari tematici nella città', type:'recommended-routes', mapIcon:'icons/passato/percorsi.svg', mapToggle:'.qt-percorsi-all'}
      ]
    },
    {
      key:'food', theme:'food', title:'Mangiare e dormire',
      sideButton:'#qt-cat-food-btn', sideLabel:'Apri Mangiare e dormire sulla mappa',
      description:'Locali, ristoranti, take-away e strutture per il soggiorno.',
      categories:[
        {title:'Locali', note:'Bar, pub e luoghi di ritrovo', listId:'fav-list-locali', grouped:true, mapIcon:'icons/mangiare-dormire/01-locali.svg', mapToggle:'.qt-locali'},
        {title:'Ristoranti', note:'Cucina genovese e altre proposte', listId:'fav-list-ristoranti', grouped:true, mapIcon:'icons/mangiare-dormire/02-ristoranti.svg', mapToggle:'.qt-ristoranti'},
        {title:'Take-away', note:'Soluzioni rapide e da asporto', listId:'fav-list-take-away', grouped:true, mapIcon:'icons/mangiare-dormire/03-take-away.svg', mapToggle:'.qt-take-away'},
        {title:'Alberghi e B&B', note:'Dove dormire a Genova', listId:'fav-list-alloggi', grouped:true, mapIcon:'icons/mangiare-dormire/04-alloggi.svg', mapToggle:'.qt-alloggi'}
      ]
    },
    {
      key:'media', theme:'media', title:'Multimedia',
      description:'Punti QR, documentari, audioguide e contenuti video dedicati alla città.',
      categories:[
        {title:'Punti QR', note:'Guarda com’erano i luoghi di Genova', type:'qr', mapIcon:'toolbar/qr.svg', mapToggle:'#btn-qr-removed'},
        {title:'MiniDoc', note:'Brevi documentari dedicati a quartieri e luoghi', type:'minidoc', mapIcon:'icons/passato/minidoc.svg', mapToggle:'.qt-doc-all'},
        {title:'Audioguide', note:'Ascolta storie e approfondimenti'},
        {title:'Videoguide', note:'Percorsi raccontati attraverso le immagini'}
      ]
    },
    {
      key:'community', theme:'community', title:'Eventi, blog e contatti',
      description:'Novità, appuntamenti e strumenti per partecipare e contattare Genova mApp.',
      categories:[
        {title:'Eventi', note:'Appuntamenti del giorno e della settimana', type:'events'},
        {title:'Blog', note:'Commenti e conversazioni della comunità'},
        {title:'Contatti', note:'Scrivi agli amministratori dell’app', action:'contact'}
      ]
    },
    {
      key:'extra', theme:'extra', title:'Extra',
      description:'Giochi, premi e prodotti legati a Genova mApp.',
      categories:[
        {title:'Giochi', note:'Piccole esperienze interattive', type:'games'},
        {title:'Premi', note:'Iniziative e vantaggi per gli utenti'},
        {title:'Shop', note:'Gadget e prodotti dedicati a Genova'}
      ]
    }
  ];

  var GUIDE_CHAPTERS = [
  {
    "title": "1. Per iniziare con Genova mApp",
    "intro": [
      "Genova mApp è una mappa interattiva dedicata alla scoperta di Genova. Attraverso la mappa puoi esplorare luoghi storici, musei, chiese, palazzi, fortificazioni, parchi, cinema, teatri, locali, trasporti, percorsi, contenuti multimediali e molte altre informazioni sulla città."
    ],
    "sections": [
      {
        "title": "La mappa",
        "p": [
          "La mappa è il cuore di Genova mApp.",
          "Puoi spostarla trascinandola con il dito o con il mouse e puoi ingrandire o ridurre la visualizzazione per esplorare le diverse zone della città.",
          "Sulla mappa vengono mostrati punti, percorsi e altri elementi corrispondenti ai contenuti attivati."
        ]
      },
      {
        "title": "Aprire la New Home",
        "p": [
          "Premendo il logo Genova mApp nella barra superiore puoi aprire la New Home, la schermata principale dalla quale accedere alle diverse aree dell’app.",
          "Qui i contenuti sono organizzati per argomento, in modo da aiutarti a trovare rapidamente ciò che stai cercando."
        ]
      },
      {
        "title": "Aprire un luogo",
        "p": [
          "Quando sulla mappa è visibile un punto di interesse, toccalo o cliccaci sopra per visualizzarne le informazioni.",
          "A seconda del contenuto potrai trovare descrizioni, immagini, posizione, collegamenti, contenuti multimediali o altre funzioni disponibili."
        ]
      },
      {
        "title": "Come orientarsi nell’interfaccia",
        "p": [
          "Gli strumenti principali di Genova mApp sono distribuiti in diverse aree dello schermo:"
        ],
        "bullets": [
          "nella parte superiore trovi i comandi generali dell’app;",
          "sul bordo destro trovi i pulsanti per visualizzare categorie e contenuti sulla mappa;",
          "nella parte inferiore trovi alcuni strumenti della mappa;",
          "in basso a sinistra trovi il comando per cambiare lingua;",
          "il Taccuino permette di gestire preferiti, percorsi e note."
        ],
        "after": [
          "Nei capitoli successivi trovi una spiegazione dettagliata di ogni area."
        ]
      }
    ]
  },
  {
    "title": "2. New Home – Scopri Genova",
    "intro": [
      "La New Home raccoglie le principali sezioni di Genova mApp.",
      "Puoi aprirla in qualsiasi momento premendo il logo Genova mApp nella barra superiore. Seleziona una categoria per visualizzare le relative funzioni e sottocategorie."
    ],
    "sections": [
      {
        "title": "Guida e istruzioni",
        "p": [
          "Da questa sezione puoi consultare la guida completa dell’app e scoprire il funzionamento dei principali strumenti di Genova mApp."
        ]
      },
      {
        "title": "Patrimonio storico",
        "linkKey": "heritage",
        "p": [
          "Raccoglie alcune delle principali categorie dedicate alla storia e al patrimonio della città."
        ],
        "bullets": [
          "Forti — fortificazioni e sistemi difensivi.",
          "Musei — musei e strutture culturali presenti in città.",
          "Chiese — chiese, basiliche, santuari e altri edifici religiosi.",
          "Palazzi — palazzi storici, ville e altri edifici di particolare interesse storico e architettonico."
        ]
      },
      {
        "title": "Intrattenimento",
        "linkKey": "entertainment",
        "p": [
          "Raccoglie luoghi e attività dedicati al tempo libero e alla cultura."
        ],
        "bullets": [
          "Mostre — spazi espositivi, mostre e strutture dedicate alle esposizioni.",
          "Teatri — i principali teatri della città.",
          "Cinema — le sale cinematografiche presenti a Genova.",
          "Parchi e piazze — parchi, giardini, aree verdi e altri spazi pubblici.",
          "Sport — impianti, strutture e luoghi dedicati alle attività sportive."
        ]
      },
      {
        "title": "Come muoversi",
        "linkKey": "transport",
        "p": [
          "Raccoglie le principali informazioni e i servizi relativi ai trasporti. Puoi consultare le diverse modalità di spostamento e visualizzare sulla mappa le informazioni disponibili."
        ],
        "bullets": [
          "Autobus.",
          "Metropolitana.",
          "Treni.",
          "Funicolari, ascensori e cremagliere.",
          "Navi e battelli.",
          "Aereo."
        ]
      },
      {
        "title": "Mura, acquedotti e percorsi",
        "linkKey": "routes",
        "p": [
          "Permette di esplorare elementi che si sviluppano attraverso diverse zone della città."
        ],
        "bullets": [
          "Mura storiche — le diverse cinte murarie che hanno caratterizzato la storia di Genova.",
          "Acquedotti — percorsi e punti dedicati agli acquedotti storici della città.",
          "Percorsi consigliati — itinerari attraverso luoghi, quartieri o temi specifici, visualizzabili direttamente sulla mappa."
        ]
      },
      {
        "title": "Mangiare e dormire",
        "linkKey": "food",
        "p": [
          "Raccoglie attività e strutture utili durante la visita della città, visualizzabili direttamente sulla mappa."
        ],
        "bullets": [
          "Locali.",
          "Ristoranti.",
          "Take-away.",
          "Alberghi e B&B."
        ]
      },
      {
        "title": "Multimedia",
        "linkKey": "media",
        "p": [
          "Qui trovi contenuti che permettono di scoprire Genova attraverso immagini, video e audio."
        ],
        "bullets": [
          "Punti QR — contenuti collegati a luoghi e aree della città.",
          "MiniDoc — brevi documentari dedicati alla storia, ai luoghi e alle trasformazioni di Genova.",
          "Audioguide — contenuti audio dedicati alla scoperta della città.",
          "Videoguide — contenuti video dedicati a luoghi, percorsi e argomenti specifici."
        ]
      },
      {
        "title": "Eventi, blog e contatti",
        "linkKey": "community",
        "p": [],
        "bullets": [
          "Eventi — appuntamenti, manifestazioni e iniziative presenti in città.",
          "Blog — spazio dedicato a contenuti, approfondimenti e conversazioni legate a Genova e alla sua comunità.",
          "Contatti — informazioni per comunicare con Genova mApp."
        ]
      },
      {
        "title": "Extra",
        "linkKey": "extra",
        "p": [],
        "bullets": [
          "Giochi — giochi dedicati a Genova, come A Zena – Trivial, e altre esperienze interattive.",
          "Premi — iniziative, obiettivi e vantaggi disponibili per gli utenti.",
          "Shop — prodotti e contenuti legati a Genova e a Genova mApp."
        ]
      }
    ]
  },
  {
    "title": "3. I comandi in alto",
    "intro": [
      "Nella parte superiore dello schermo trovi i principali comandi generali di Genova mApp. Alcuni elementi possono adattarsi o cambiare posizione in base alle dimensioni dello schermo."
    ],
    "sections": [
      {
        "title": "Genova mApp / Home",
        "p": [
          "Premendo il logo Genova mApp puoi aprire la New Home. Puoi utilizzarlo in qualsiasi momento per tornare rapidamente all’elenco principale delle sezioni dell’app."
        ]
      },
      {
        "title": "Cerca",
        "p": [
          "La funzione Cerca permette di trovare rapidamente luoghi e contenuti presenti in Genova mApp senza doverli individuare manualmente sulla mappa.",
          "Inserisci il nome o una parola relativa a ciò che stai cercando e seleziona uno dei risultati disponibili."
        ]
      },
      {
        "title": "Profilo e accesso",
        "p": [
          "Quando disponibili, le funzioni relative al profilo permettono di accedere al proprio account e ai servizi personali collegati a Genova mApp. Alcune funzioni possono richiedere l’accesso con il proprio account."
        ]
      },
      {
        "title": "Abbonamento",
        "p": [
          "La sezione Abbonamento è dedicata alla gestione dei servizi e dei vantaggi disponibili per gli utenti abbonati.",
          "Alcune funzioni relative all’abbonamento sono ancora in fase di completamento e saranno rese disponibili progressivamente."
        ],
        "comingSoon": true
      },
      {
        "title": "Impostazioni",
        "p": [
          "Le Impostazioni permettono di personalizzare alcuni aspetti dell’app e di accedere a funzioni di servizio."
        ],
        "bullets": [
          "Benvenuto.",
          "Guida e istruzioni.",
          "Contatti.",
          "Dimensione del testo.",
          "Altre preferenze dell’app, quando disponibili."
        ]
      },
      {
        "title": "Installa Genova mApp",
        "p": [
          "Quando questa funzione è disponibile sul dispositivo utilizzato, puoi installare Genova mApp per accedervi più facilmente, in modo simile a una normale applicazione.",
          "La disponibilità e la modalità di installazione possono dipendere dal dispositivo e dal browser utilizzato."
        ]
      }
    ]
  },
  {
    "title": "4. Pulsanti bordo destro",
    "intro": [
      "Sul bordo destro della mappa trovi un gruppo di pulsanti dedicati alla visualizzazione dei diversi tipi di contenuti. Questi pulsanti permettono di scegliere rapidamente ciò che vuoi vedere sulla mappa.",
      "Selezionando una categoria puoi accedere alle relative sottocategorie oppure attivare e disattivare i contenuti disponibili."
    ],
    "sections": [
      {
        "title": "Preferiti",
        "p": [
          "Permette di visualizzare sulla mappa i luoghi che hai precedentemente salvato tra i tuoi Preferiti. È utile per ritrovare rapidamente i punti che ti interessano senza doverli cercare nuovamente."
        ]
      },
      {
        "title": "Trasporti",
        "p": [
          "Raccoglie i principali sistemi di trasporto disponibili a Genova. Puoi attivare soltanto ciò che ti interessa per mantenere la mappa più semplice e leggibile."
        ],
        "bullets": [
          "Autobus.",
          "Treni.",
          "Metropolitana.",
          "Funicolari, ascensori e cremagliere.",
          "Navi e battelli.",
          "Aereo."
        ]
      },
      {
        "title": "Passato",
        "p": [
          "La sezione dedicata al passato raccoglie numerosi contenuti storici di Genova. Utilizzando le sottocategorie puoi decidere quali elementi mostrare sulla mappa."
        ],
        "bullets": [
          "Forti.",
          "Musei.",
          "Chiese.",
          "Palazzi e ville.",
          "Mura storiche.",
          "Acquedotti.",
          "Contenuti storici e multimediali."
        ]
      },
      {
        "title": "Luoghi e intrattenimento",
        "p": [
          "Permette di visualizzare luoghi dedicati alla cultura, al tempo libero e alle attività in città."
        ],
        "bullets": [
          "Mostre.",
          "Teatri.",
          "Cinema.",
          "Parchi e piazze.",
          "Sport."
        ]
      },
      {
        "title": "Mangiare e dormire",
        "p": [
          "Permette di mostrare sulla mappa attività e strutture dedicate alla ristorazione e al soggiorno."
        ],
        "bullets": [
          "Locali.",
          "Ristoranti.",
          "Take-away.",
          "Alberghi e B&B."
        ]
      },
      {
        "title": "Percorsi",
        "p": [
          "Permette di accedere ai percorsi disponibili e di visualizzarli sulla mappa.",
          "Un percorso può essere composto da diversi punti e da un itinerario che li collega. Puoi utilizzare i percorsi proposti da Genova mApp oppure, attraverso il Taccuino, creare e organizzare i tuoi itinerari personali."
        ]
      }
    ]
  },
  {
    "title": "5. Gli strumenti della mappa",
    "intro": [
      "Nella parte inferiore dello schermo trovi diversi strumenti utili durante l’esplorazione della mappa."
    ],
    "sections": [
      {
        "title": "Strumenti in basso al centro",
        "p": []
      },
      {
        "title": "Punti QR",
        "p": [
          "Il comando dedicato ai Punti QR permette di mostrare o nascondere sulla mappa i punti collegati ai contenuti QR di Genova mApp. Toccando un punto puoi accedere ai relativi contenuti."
        ]
      },
      {
        "title": "Sono qui / GPS",
        "p": [
          "Questo comando utilizza, quando autorizzato, la posizione fornita dal dispositivo per mostrarti dove ti trovi sulla mappa.",
          "Può essere utile mentre visiti la città per confrontare la tua posizione con i luoghi e i percorsi presenti in Genova mApp. La precisione dipende dal dispositivo, dal segnale disponibile e dalle autorizzazioni concesse."
        ]
      },
      {
        "title": "Scanner QR",
        "p": [
          "Lo Scanner QR permette di leggere i QR Code compatibili utilizzando la fotocamera del dispositivo. Quando richiesto, sarà necessario autorizzare l’accesso alla fotocamera.",
          "Dopo la scansione, Genova mApp può aprire direttamente il contenuto associato al QR Code."
        ]
      },
      {
        "title": "Strumenti in basso a destra",
        "p": []
      },
      {
        "title": "Zoom + e −",
        "p": [
          "I pulsanti di zoom permettono di ingrandire o ridurre rapidamente la visualizzazione della mappa. Puoi ottenere lo stesso risultato anche utilizzando i normali gesti dello schermo o i controlli del mouse, quando disponibili."
        ]
      },
      {
        "title": "Vista iniziale",
        "p": [
          "Questo comando riporta rapidamente la mappa alla visualizzazione iniziale prevista da Genova mApp. È utile quando ti sei spostato molto sulla mappa e vuoi tornare alla vista generale della città."
        ]
      },
      {
        "title": "Vista e rotazione 3D",
        "p": [
          "Quando la visualizzazione utilizzata lo consente, Genova mApp permette di modificare l’inclinazione e l’orientamento della mappa. La vista tridimensionale può aiutare a comprendere meglio il territorio, le alture e la disposizione urbana di Genova."
        ]
      },
      {
        "title": "Joystick",
        "p": [
          "Quando disponibile, il joystick permette di controllare in maniera più immediata alcuni movimenti e orientamenti della visualizzazione della mappa. Le funzioni disponibili possono variare in base alla modalità di visualizzazione utilizzata."
        ]
      }
    ]
  },
  {
    "title": "6. Taccuino",
    "intro": [
      "Il Taccuino è lo spazio personale di Genova mApp. Puoi utilizzarlo per conservare i luoghi che ti interessano, organizzare percorsi e creare note.",
      "In questo modo Genova mApp può diventare non soltanto uno strumento per esplorare la città, ma anche un supporto per organizzare la tua visita."
    ],
    "sections": [
      {
        "title": "Preferiti",
        "p": [
          "Quando trovi un luogo che ti interessa puoi salvarlo tra i Preferiti. I luoghi salvati possono essere consultati successivamente dal Taccuino e mostrati nuovamente sulla mappa.",
          "Puoi utilizzare i Preferiti, per esempio, per preparare in anticipo un elenco di luoghi che desideri visitare."
        ]
      },
      {
        "title": "Percorsi",
        "p": [
          "La sezione Percorsi permette di organizzare diversi luoghi all’interno di un itinerario personale. Puoi creare un nuovo percorso, assegnargli un nome e aggiungere i punti che desideri visitare."
        ],
        "bullets": [
          "Aprire un percorso.",
          "Visualizzarlo sulla mappa.",
          "Modificarne i contenuti.",
          "Duplicarlo.",
          "Eliminarlo quando non serve più."
        ],
        "after": [
          "Questa funzione è particolarmente utile per preparare itinerari personalizzati attraverso Genova. Puoi, per esempio, creare un percorso dedicato ai palazzi storici, ai musei, ai forti oppure semplicemente ai luoghi che vuoi visitare durante una giornata."
        ]
      },
      {
        "title": "Note",
        "p": [
          "La sezione Note permette di conservare annotazioni personali. Puoi utilizzarla per ricordare informazioni, idee, luoghi da visitare o qualsiasi altro appunto utile durante l’utilizzo di Genova mApp."
        ]
      },
      {
        "title": "Preferiti, percorsi e mappa",
        "p": [
          "Taccuino e mappa lavorano insieme. Quando richiesto puoi visualizzare sulla mappa i contenuti che hai salvato, ritrovando più facilmente luoghi e percorsi personali.",
          "Il Taccuino rimane quindi il punto di riferimento per organizzare ciò che hai scoperto attraverso Genova mApp."
        ]
      }
    ]
  },
  {
    "title": "7. Lingue e accessibilità",
    "intro": [
      "Genova mApp è progettata per essere utilizzata in più lingue e comprende alcune funzioni che permettono di adattare la lettura dei contenuti alle proprie esigenze."
    ],
    "sections": [
      {
        "title": "Cambiare lingua",
        "p": [
          "Il pulsante Lingue, situato nella parte inferiore sinistra dell’interfaccia, permette di scegliere la lingua dell’app."
        ],
        "bullets": [
          "Italiano.",
          "English.",
          "Español.",
          "Français.",
          "العربية.",
          "Русский.",
          "中文.",
          "Ligure."
        ],
        "after": [
          "Seleziona la lingua desiderata per modificare i contenuti disponibili."
        ]
      },
      {
        "title": "Traduzione dei contenuti",
        "p": [
          "Il cambio della lingua viene applicato ai menu, ai comandi e ai contenuti per i quali è disponibile una traduzione.",
          "Alcuni contenuti particolari o provenienti da fonti esterne potrebbero non essere disponibili immediatamente in tutte le lingue."
        ]
      },
      {
        "title": "Dimensione del testo",
        "p": [
          "Attraverso le Impostazioni puoi modificare la dimensione del testo scegliendo la soluzione più comoda per la lettura.",
          "Quando disponibili, puoi utilizzare le diverse dimensioni previste dall’app, per esempio Piccolo, Medio e Grande. La modifica permette di rendere più leggibili testi, descrizioni e altri elementi dell’interfaccia."
        ]
      }
    ]
  },
  {
    "title": "8. QR, multimedia ed eventi",
    "intro": [
      "Genova mApp contiene diversi strumenti per scoprire la città anche attraverso fotografie, video, audio e contenuti interattivi."
    ],
    "sections": [
      {
        "title": "Punti QR",
        "p": [
          "I Punti QR collegano determinati luoghi della città a contenuti dedicati. Puoi visualizzarli sulla mappa e aprire il punto che ti interessa per accedere alle informazioni e ai contenuti disponibili.",
          "Alcuni QR Code possono essere presenti anche fisicamente sul territorio o all’interno di materiali collegati a Genova mApp."
        ]
      },
      {
        "title": "Genova ieri e oggi / Confronta",
        "p": [
          "Alcuni contenuti permettono di confrontare Genova nel passato con la città di oggi. Attraverso fotografie storiche, immagini contemporanee e altri materiali puoi osservare come strade, piazze, edifici, quartieri e paesaggi siano cambiati nel tempo.",
          "Questa funzione permette di utilizzare la mappa anche come strumento per leggere l’evoluzione storica della città."
        ]
      },
      {
        "title": "MiniDoc",
        "p": [
          "I MiniDoc sono brevi contenuti video dedicati a luoghi, avvenimenti, personaggi e trasformazioni della storia di Genova. Quando un MiniDoc è disponibile puoi aprirlo dalla relativa sezione o dal punto associato."
        ]
      },
      {
        "title": "Audioguide",
        "p": [
          "Le Audioguide permettono di ascoltare contenuti dedicati ai luoghi e agli argomenti presenti nell’app. Sono pensate per accompagnare l’esplorazione della città anche mentre ci si trova sul posto."
        ]
      },
      {
        "title": "Videoguide",
        "p": [
          "Le Videoguide utilizzano immagini e video per raccontare luoghi, percorsi e argomenti legati a Genova. Quando disponibili possono essere aperte direttamente dai relativi contenuti dell’app."
        ]
      },
      {
        "title": "Eventi",
        "p": [
          "La sezione Eventi permette di scoprire appuntamenti, spettacoli, manifestazioni, incontri e altre iniziative presenti a Genova.",
          "Puoi consultare gli eventi disponibili e aprire quelli che ti interessano per visualizzarne le informazioni. Quando previsto, gli eventi possono essere organizzati o filtrati per data, periodo o categoria.",
          "Puoi inoltre salvare tra i Preferiti gli eventi che vuoi ricordare o consultare nuovamente."
        ]
      }
    ]
  },
  {
    "title": "9. Community, servizi ed Extra",
    "intro": [
      "Genova mApp comprende anche funzioni pensate per ampliare l’esperienza oltre la semplice consultazione della mappa.",
      "Alcune di queste sezioni sono ancora in fase di sviluppo e verranno completate progressivamente."
    ],
    "sections": [
      {
        "title": "Blog",
        "p": [
          "Il Blog sarà uno spazio dedicato a Genova, alle sue storie, ai luoghi, agli eventi e agli argomenti collegati alla città. Potrà ospitare approfondimenti, contenuti e altre forme di partecipazione della comunità."
        ],
        "comingSoon": true
      },
      {
        "title": "Contatti",
        "p": [
          "La sezione Contatti permette di trovare i riferimenti disponibili per comunicare con Genova mApp. Puoi utilizzarla per richieste, informazioni, segnalazioni o altre comunicazioni relative al progetto."
        ]
      },
      {
        "title": "Giochi",
        "p": [
          "La sezione Giochi raccoglie esperienze interattive dedicate a Genova. Tra i giochi disponibili puoi trovare A Zena – Trivial, insieme agli altri giochi che verranno aggiunti nel tempo.",
          "I giochi rappresentano un modo diverso per conoscere Genova, mettendo alla prova le proprie conoscenze e scoprendo nuove curiosità."
        ]
      },
      {
        "title": "Premi",
        "p": [
          "La sezione Premi sarà dedicata alle iniziative e ai vantaggi collegati alle attività svolte attraverso Genova mApp. Le modalità di funzionamento e i premi disponibili verranno indicati direttamente nell’app quando il servizio sarà attivo."
        ],
        "comingSoon": true
      },
      {
        "title": "Shop",
        "p": [
          "Lo Shop sarà uno spazio dedicato a prodotti, pubblicazioni e altri contenuti collegati a Genova e a Genova mApp. I prodotti disponibili e le relative modalità di acquisto saranno indicati nella sezione dedicata."
        ],
        "comingSoon": true
      },
      {
        "title": "Abbonamento e vantaggi",
        "p": [
          "Genova mApp prevede una sezione dedicata all’Abbonamento, attraverso la quale sarà possibile accedere ai servizi e ai vantaggi previsti per gli utenti abbonati.",
          "Le informazioni relative ai diversi piani, alla durata e alle funzioni comprese saranno mostrate direttamente all’interno dell’app. Alcune parti del sistema di abbonamento sono ancora in fase di completamento e saranno rese disponibili progressivamente.",
          "Genova mApp continuerà inoltre a crescere nel tempo con nuovi luoghi, percorsi, contenuti e strumenti."
        ]
      }
    ]
  }
];

  var overlay, scroll, title, eyebrow, backButton, closeButton;
  var lastOpener = null;
  var currentView = 'home';
  var currentSection = null;
  var currentCategory = null;
  var guideExpanded = [];
  var guideScrollTop = 0;
  var guideReturnActive = false;
  var currentAqueduct = null;
  var currentRoute = null;
  var historyDepth = 0;
  var closingHistoryNavigation = false;
  var eventSearchRequestId = 0;
  var eventQuotaRequestId = 0;
  var eventLanguageResetTimer = 0;

  function escapeHtml(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function currentLanguage(){
    var value = 'it';
    try{ value = localStorage.getItem('lang') || document.documentElement.lang || 'it'; }
    catch(_){ value = document.documentElement.lang || 'it'; }
    value = String(value).toLowerCase().split('-')[0];
    return ['it','en','es','fr','ar','ru','zh','lij'].indexOf(value) >= 0 ? value : 'it';
  }

  function translated(value, language){
    return value && typeof value === 'object' ? (value[language] || value.it || value.en || '') : (value || '');
  }

  function createShell(){
    overlay = document.createElement('div');
    overlay.id = 'gm-new-home';
    overlay.className = 'gm-new-home-overlay';
    overlay.hidden = true;
    overlay.innerHTML = ''+
      '<section class="gm-new-home-shell" role="dialog" aria-modal="true" aria-labelledby="gm-new-home-title">'+
      '  <header class="gm-new-home-topbar">'+
      '    <button type="button" class="gm-new-home-navbtn" id="gm-new-home-back" aria-label="Indietro" hidden><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button>'+
      '    <div class="gm-new-home-heading"><span class="gm-new-home-eyebrow"></span><h2 class="gm-new-home-title" id="gm-new-home-title">Benvenuto</h2></div>'+
      '    <button type="button" class="gm-new-home-navbtn" id="gm-new-home-close" aria-label="Vai alla mappa">'+
      icon('routes')+'<span>MAPPA</span>'+
      '    </button>'+
      '  </header>'+
      '  <main class="gm-new-home-scroll" id="gm-new-home-content"></main>'+
      '</section>';
    document.body.appendChild(overlay);
    scroll = overlay.querySelector('#gm-new-home-content');
    title = overlay.querySelector('#gm-new-home-title');
    eyebrow = overlay.querySelector('.gm-new-home-eyebrow');
    backButton = overlay.querySelector('#gm-new-home-back');
    closeButton = overlay.querySelector('#gm-new-home-close');

    closeButton.addEventListener('click', close);
    backButton.addEventListener('click', requestNewHomeBack);
    overlay.addEventListener('click', function(event){ if(event.target === overlay) close(); });
  }

  function applyTheme(section){
    if(!overlay) return;
    overlay.setAttribute('data-theme', section && section.theme ? section.theme : 'home');
  }

  function applyView(view){
    if(overlay) overlay.setAttribute('data-view', view || 'home');
  }

  function renderHome(){
    currentView = 'home';
    guideReturnActive = false;
    currentSection = null;
    currentAqueduct = null;
    currentRoute = null;
    overlay.setAttribute('dir', 'ltr');
    applyTheme(null);
    applyView(currentView);
    title.textContent = 'Benvenuto';
    eyebrow.textContent = '';
    backButton.hidden = true;
    var cards = SECTIONS.map(function(section){
      var shortcut = section.sideButton
        ? '<button type="button" class="gm-new-home-icon gm-new-home-side-shortcut" data-side-section="'+section.key+'" aria-label="'+escapeHtml(section.sideLabel || section.title)+'" title="'+escapeHtml(section.sideLabel || section.title)+'"></button>'
        : '<span class="gm-new-home-icon">'+icon(section.theme)+'</span>';
      return ''+
        '<article class="gm-new-home-card'+(section.wide?' is-wide':'')+'" data-theme="'+section.theme+'" data-section="'+section.key+'" role="button" tabindex="0" aria-label="'+escapeHtml(section.title)+'">'+
        shortcut+
        '  <div class="gm-new-home-card-copy"><h3>'+escapeHtml(section.title)+'</h3>'+
        '  <p>'+escapeHtml(section.description)+'</p></div>'+
        '</article>';
    }).join('');
    scroll.innerHTML = ''+
      '<div class="gm-new-home-intro">'+
      '  <h3>Che cosa vuoi scoprire?</h3>'+
      '</div>'+
      '<div class="gm-new-home-grid">'+cards+'</div>';
    scroll.querySelectorAll('[data-section]').forEach(function(button){
      function activate(){
        var section = SECTIONS.find(function(item){ return item.key === button.getAttribute('data-section'); });
        if(section){
          renderSection(section);
          pushNewHomeLevel();
        }
      }
      button.addEventListener('click', function(event){
        if(event.target.closest('.gm-new-home-side-shortcut')) return;
        activate();
      });
      button.addEventListener('keydown', function(event){
        if(event.target.closest('.gm-new-home-side-shortcut')) return;
        if(event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        activate();
      });
    });
    scroll.querySelectorAll('[data-side-section]').forEach(function(shortcut){
      var section = SECTIONS.find(function(item){ return item.key === shortcut.getAttribute('data-side-section'); });
      var sourceButton = section && section.sideButton ? document.querySelector(section.sideButton) : null;
      var sourceIcon = sourceButton && sourceButton.querySelector('.qt-icon');
      shortcut.innerHTML = sourceIcon ? sourceIcon.innerHTML : icon(section ? section.theme : 'guide');
      shortcut.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        if(!sourceButton) return;
        close();
        setTimeout(function(){ sourceButton.click(); }, 60);
      });
    });
    scroll.scrollTop = 0;
  }

  function captureGuideState(){
    if(!scroll || currentView !== 'guide') return;
    guideExpanded = Array.prototype.slice.call(scroll.querySelectorAll('.gm-new-home-guide-chapter')).map(function(chapter){
      return !!chapter.open;
    });
    guideScrollTop = scroll.scrollTop || 0;
  }

  function guideTextBlocks(values, className){
    return (values || []).map(function(value){
      return '<p'+(className ? ' class="'+className+'"' : '')+'>'+escapeHtml(value)+'</p>';
    }).join('');
  }

  function guideSectionHtml(item){
    var heading;
    if(item.linkKey){
      heading = '<button type="button" class="gm-new-home-guide-section-link" data-guide-section="'+escapeHtml(item.linkKey)+'">'+
        '<span>'+escapeHtml(item.title)+'</span><span class="gm-new-home-guide-link-arrow" aria-hidden="true">›</span>'+
      '</button>';
    }else{
      heading = '<h5>'+escapeHtml(item.title)+'</h5>';
    }
    var badge = item.comingSoon ? '<span class="gm-new-home-guide-badge">In arrivo</span>' : '';
    var bullets = item.bullets && item.bullets.length
      ? '<ul>'+item.bullets.map(function(value){ return '<li>'+escapeHtml(value)+'</li>'; }).join('')+'</ul>'
      : '';
    return ''+
      '<section class="gm-new-home-guide-section'+(item.linkKey?' has-link':'')+'">'+
      '  <div class="gm-new-home-guide-section-title">'+heading+badge+'</div>'+
      guideTextBlocks(item.p)+
      bullets+
      guideTextBlocks(item.after)+
      '</section>';
  }

  function renderGuide(section, options){
    options = options || {};
    if(!options.preserve){
      guideExpanded = [];
      guideScrollTop = 0;
    }
    currentView = 'guide';
    currentSection = section;
    currentCategory = null;
    currentAqueduct = null;
    currentRoute = null;
    overlay.setAttribute('dir', 'ltr');
    applyTheme(section);
    applyView(currentView);
    title.textContent = section.title;
    eyebrow.textContent = 'Esplora';
    backButton.hidden = false;

    var chapters = GUIDE_CHAPTERS.map(function(chapter, index){
      var open = !!guideExpanded[index];
      return ''+
        '<details class="gm-new-home-guide-chapter" data-guide-chapter="'+index+'"'+(open?' open':'')+'>'+
        '  <summary>'+
        '    <span>'+escapeHtml(chapter.title)+'</span>'+
        '    <span class="gm-new-home-guide-chevron" aria-hidden="true">⌄</span>'+
        '  </summary>'+
        '  <div class="gm-new-home-guide-chapter-body">'+
             guideTextBlocks(chapter.intro, 'gm-new-home-guide-chapter-intro')+
             (chapter.sections || []).map(guideSectionHtml).join('')+
        '  </div>'+
        '</details>';
    }).join('');

    scroll.innerHTML = ''+
      '<div class="gm-new-home-detail gm-new-home-guide-detail">'+
        detailHeadHtml(section, null)+
      '  <div class="gm-new-home-guide">'+
      '    <div class="gm-new-home-guide-intro">'+
      '      <p>Qui trovi tutto ciò che serve per utilizzare Genova mApp: dalla mappa alle categorie, dal Taccuino ai contenuti multimediali.</p>'+
      '      <p>Apri il capitolo che ti interessa oppure utilizza il comando qui sotto per visualizzare l’intera guida.</p>'+
      '      <button type="button" class="gm-new-home-guide-expand" data-guide-expand-all aria-pressed="false">Espandi tutti</button>'+
      '    </div>'+
      '    <div class="gm-new-home-guide-chapters">'+chapters+'</div>'+
      '  </div>'+
      '</div>';

    var chapterNodes = Array.prototype.slice.call(scroll.querySelectorAll('.gm-new-home-guide-chapter'));
    var expandButton = scroll.querySelector('[data-guide-expand-all]');

    function updateExpandButton(){
      var allOpen = chapterNodes.length > 0 && chapterNodes.every(function(chapter){ return chapter.open; });
      if(expandButton){
        expandButton.setAttribute('aria-pressed', allOpen ? 'true' : 'false');
        expandButton.textContent = allOpen ? 'Chiudi tutti' : 'Espandi tutti';
      }
      guideExpanded = chapterNodes.map(function(chapter){ return !!chapter.open; });
    }

    chapterNodes.forEach(function(chapter){
      chapter.addEventListener('toggle', updateExpandButton);
    });

    if(expandButton){
      expandButton.addEventListener('click', function(){
        var shouldOpen = !chapterNodes.length || !chapterNodes.every(function(chapter){ return chapter.open; });
        chapterNodes.forEach(function(chapter){ chapter.open = shouldOpen; });
        updateExpandButton();
      });
    }

    scroll.querySelectorAll('[data-guide-section]').forEach(function(button){
      button.addEventListener('click', function(){
        var target = SECTIONS.find(function(item){ return item.key === button.getAttribute('data-guide-section'); });
        if(!target) return;
        captureGuideState();
        guideReturnActive = true;
        renderSection(target);
        pushNewHomeLevel();
      });
    });

    updateExpandButton();
    scroll.scrollTop = options.preserve ? guideScrollTop : 0;
  }

  function renderSection(section){
    if(section && section.key === 'guide'){
      renderGuide(section, {preserve:false});
      return;
    }
    currentView = 'section';
    currentSection = section;
    currentAqueduct = null;
    overlay.setAttribute('dir', 'ltr');
    applyTheme(section);
    applyView(currentView);
    title.textContent = section.title;
    eyebrow.textContent = 'Esplora';
    backButton.hidden = false;
    var categories = section.categories.map(function(category, index){
      if(category.mapIcon && category.mapToggle){
        var sourceToggle = findMapToggle(category);
        var active = isMapToggleActive(sourceToggle);
        var mapActionLabel = (active ? 'Nascondi ' : 'Mostra ')+category.title.toLowerCase()+' sulla mappa';
        return ''+
          '<div class="gm-new-home-category has-map-icon'+(active?' is-map-active':'')+'">'+
          '  <button type="button" class="gm-new-home-category-map" data-map-category="'+index+'" aria-pressed="'+(active?'true':'false')+'" title="'+escapeHtml(mapActionLabel)+'" aria-label="'+escapeHtml(mapActionLabel)+'">'+
          '    <img src="'+escapeHtml(category.mapIcon)+'" alt="" aria-hidden="true">'+
          '  </button>'+
          '  <button type="button" class="gm-new-home-category-open" data-category="'+index+'">'+
          '    <span><strong>'+escapeHtml(category.title)+'</strong><small>'+escapeHtml(category.note)+'</small></span>'+
          '    <span class="gm-new-home-category-arrow" aria-hidden="true">›</span>'+
          '  </button>'+
          '</div>';
      }
      return ''+
        '<button type="button" class="gm-new-home-category" data-category="'+index+'">'+
        '  <span><strong>'+escapeHtml(category.title)+'</strong><small>'+escapeHtml(category.note)+'</small></span>'+
        '  <span class="gm-new-home-category-arrow" aria-hidden="true">›</span>'+
        '</button>';
    }).join('');
    scroll.innerHTML = ''+
      '<div class="gm-new-home-detail">'+
      detailHeadHtml(section, null)+
      '  <div class="gm-new-home-category-grid">'+categories+'</div>'+
      '</div>';
    bindDetailMapShortcut(section, null);
    scroll.querySelectorAll('[data-category]').forEach(function(button){
      var categoryIndex = Number(button.getAttribute('data-category'));
      button.addEventListener('click', function(){
        var category = section.categories[categoryIndex];
        if(category){
          var previousView = currentView;
          openCategory(section, category);
          if(!overlay.hidden && currentView !== previousView) pushNewHomeLevel();
        }
      });
    });
    scroll.querySelectorAll('[data-map-category]').forEach(function(button){
      button.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        var category = section.categories[Number(button.getAttribute('data-map-category'))];
        if(!category || !category.mapToggle) return;
        var sourceToggle = findMapToggle(category);
        if(!sourceToggle) return;
        sourceToggle.click();
        setTimeout(function(){ syncMapCategoryButton(button, category); }, 80);
        setTimeout(function(){ syncMapCategoryButton(button, category); }, 260);
      });
    });
    scroll.scrollTop = 0;
  }

  function isMapToggleActive(sourceToggle){
    if(!sourceToggle) return false;
    return sourceToggle.getAttribute('aria-pressed') === 'true' ||
      sourceToggle.classList.contains('is-active') ||
      sourceToggle.classList.contains('active');
  }

  function syncMapCategoryButton(button, category){
    if(!button || !category || !category.mapToggle) return;
    var sourceToggle = findMapToggle(category);
    var active = isMapToggleActive(sourceToggle);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    var mapActionLabel = (active ? 'Nascondi ' : 'Mostra ')+category.title.toLowerCase()+' sulla mappa';
    button.setAttribute('title', mapActionLabel);
    button.setAttribute('aria-label', mapActionLabel);
    var card = button.closest('.gm-new-home-category');
    if(card) card.classList.toggle('is-map-active', active);
  }

  function findMapToggle(category){
    if(!category || !category.mapToggle) return null;
    return document.querySelector('#quick-toggles '+category.mapToggle) || document.querySelector(category.mapToggle);
  }

  function detailHeadHtml(section, category, heading, note){
    var shortcut = '';
    var headingText = heading == null ? (category ? category.title : section.title) : heading;
    var noteText = note == null ? (category ? category.note : section.description) : note;

    if(category && category.mapToggle){
      var sourceToggle = findMapToggle(category);
      if(sourceToggle){
        var active = isMapToggleActive(sourceToggle);
        var label = (active ? 'Nascondi ' : 'Mostra ')+category.title+' sulla mappa';
        var visual = category.mapIcon
          ? '<img src="'+escapeHtml(category.mapIcon)+'" alt="" aria-hidden="true">'
          : icon(section ? section.theme : 'guide');
        shortcut = '<button type="button" class="gm-new-home-detail-map-shortcut gm-new-home-detail-category-shortcut'+(active?' is-map-active':'')+'" data-detail-map-category="1" aria-pressed="'+(active?'true':'false')+'" title="'+escapeHtml(label)+'" aria-label="'+escapeHtml(label)+'">'+visual+'</button>';
      }
    }else if(section && section.sideButton){
      var sourceButton = document.querySelector(section.sideButton);
      if(sourceButton){
        var sourceIcon = sourceButton.querySelector('.qt-icon');
        var visual = sourceIcon ? sourceIcon.innerHTML : icon(section.theme || 'guide');
        var label = 'Apri '+section.title+' sulla mappa';
        shortcut = '<button type="button" class="gm-new-home-detail-map-shortcut gm-new-home-detail-section-shortcut" data-detail-side-section="'+escapeHtml(section.key)+'" title="'+escapeHtml(label)+'" aria-label="'+escapeHtml(label)+'">'+visual+'</button>';
      }
    }

    return '<div class="gm-new-home-detail-head'+(shortcut?' has-map-shortcut':'')+'">'+
      '<div class="gm-new-home-detail-head-copy"><h3>'+escapeHtml(headingText)+'</h3><p>'+escapeHtml(noteText)+'</p></div>'+shortcut+'</div>';
  }

  function bindDetailMapShortcut(section, category){
    var sectionShortcut = scroll.querySelector('[data-detail-side-section]');
    if(sectionShortcut && section && section.sideButton){
      var sourceButton = document.querySelector(section.sideButton);
      sectionShortcut.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        if(!sourceButton) return;
        close(false);
        setTimeout(function(){
          if(sourceButton.getAttribute('aria-expanded') !== 'true') sourceButton.click();
        }, 60);
      });
    }

    var categoryShortcut = scroll.querySelector('[data-detail-map-category]');
    if(categoryShortcut && category && category.mapToggle){
      var sourceToggle = findMapToggle(category);
      categoryShortcut.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        if(!sourceToggle) return;
        close(false);
        setTimeout(function(){
          if(!isMapToggleActive(sourceToggle)) sourceToggle.click();
        }, 60);
      });
    }
  }

  function getExistingPlaces(listId){
    if(!listId) return [];
    var list = document.getElementById(listId);
    if(!list) return [];
    return Array.prototype.map.call(list.querySelectorAll('.fav-item'), function(item){
      var target = item.querySelector('.fav-name') || item;
      return {name:(target.textContent || '').trim(), target:target};
    }).filter(function(item){ return !!item.name; });
  }

  function getMiniDocs(){
    var seen = Object.create(null);
    return Array.prototype.map.call(document.querySelectorAll('.doc-list .doc-row'), function(row){
      var target = row.querySelector('.name');
      var name = target ? (target.textContent || '').trim() : '';
      if(!name || seen[name]) return null;
      seen[name] = true;
      return {name:name, target:target};
    }).filter(Boolean).sort(function(a,b){
      return a.name.localeCompare(b.name, 'it', {sensitivity:'base'});
    });
  }

  function normalizeText(value){
    var text = String(value == null ? '' : value).toLocaleLowerCase('it');
    try{ text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }catch(_){}
    return text;
  }

  function buildAreaGroups(listId, places){
    var configured = window.GM_PLACE_AREAS && window.GM_PLACE_AREAS[listId] || [];
    var placesByName = Object.create(null);
    var assigned = Object.create(null);

    places.forEach(function(place){
      placesByName[normalizeText(place.name)] = place;
    });

    var groups = configured.map(function(area){
      var areaPlaces = (area.places || []).map(function(placeName){
        var key = normalizeText(placeName);
        var place = placesByName[key];
        if(place) assigned[key] = true;
        return place || null;
      }).filter(Boolean).sort(function(a,b){
        return a.name.localeCompare(b.name, 'it', {sensitivity:'base'});
      });
      return {name:area.name, places:areaPlaces};
    }).filter(function(area){ return area.places.length; });

    var unassigned = places.filter(function(place){
      return !assigned[normalizeText(place.name)];
    }).sort(function(a,b){
      return a.name.localeCompare(b.name, 'it', {sensitivity:'base'});
    });
    if(unassigned.length) groups.push({name:'Da classificare', places:unassigned, fallback:true});
    return groups;
  }

  function renderAreaCategory(section, category, places){
    var groups = buildAreaGroups(category.listId, places);
    var total = groups.reduce(function(sum, group){ return sum + group.places.length; }, 0);
    var groupMarkup = groups.map(function(group, groupIndex){
      var items = group.places.map(function(place, placeIndex){
        return '<li><button type="button" class="gm-new-home-qr-point gm-new-home-area-place" data-area-group="'+groupIndex+'" data-area-place="'+placeIndex+'">'+
          '<span>'+escapeHtml(place.name)+'</span><span aria-hidden="true">›</span></button></li>';
      }).join('');
      return '<section class="gm-new-home-qr-group gm-new-home-area-group'+(group.fallback?' is-fallback':'')+'" data-area-group-panel="'+groupIndex+'">'+
        '<button type="button" class="gm-new-home-qr-group-toggle gm-new-home-area-toggle" aria-expanded="true">'+
          '<span class="gm-new-home-area-name"><strong>'+escapeHtml(group.name)+'</strong></span>'+ 
          '<span class="gm-new-home-qr-chevron" aria-hidden="true">⌄</span>'+ 
        '</button>'+ 
        '<ul class="gm-new-home-qr-points gm-new-home-area-places">'+items+'</ul>'+ 
      '</section>';
    }).join('');

    scroll.innerHTML = '<div class="gm-new-home-detail gm-new-home-area-detail">'+
      detailHeadHtml(section, category)+
      '<div class="gm-new-home-qr-tools gm-new-home-area-tools">'+
        '<label class="gm-new-home-qr-search"><span class="sr-only">Cerca un luogo</span><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg><input type="search" class="gm-new-home-area-filter" placeholder="Cerca un luogo o un quartiere"></label>'+ 
        '<button type="button" class="gm-new-home-qr-expand gm-new-home-area-expand" aria-pressed="true">Chiudi tutti</button>'+ 
      '</div>'+ 
      '<p class="gm-new-home-qr-summary gm-new-home-area-summary" aria-live="polite">'+groups.length+' aree · '+total+' luoghi</p>'+ 
      '<div class="gm-new-home-qr-groups gm-new-home-area-groups">'+groupMarkup+'</div>'+ 
      '<div class="gm-new-home-empty gm-new-home-area-no-results" hidden>Nessun luogo o quartiere corrisponde alla ricerca.</div>'+ 
    '</div>';

    bindDetailMapShortcut(section, category);

    var groupPanels = Array.prototype.slice.call(scroll.querySelectorAll('.gm-new-home-area-group'));
    var expandButton = scroll.querySelector('.gm-new-home-area-expand');
    var filter = scroll.querySelector('.gm-new-home-area-filter');
    var summary = scroll.querySelector('.gm-new-home-area-summary');
    var noResults = scroll.querySelector('.gm-new-home-area-no-results');

    function setGroupOpen(panel, open){
      var toggle = panel.querySelector('.gm-new-home-area-toggle');
      var list = panel.querySelector('.gm-new-home-area-places');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      list.hidden = !open;
    }

    groupPanels.forEach(function(panel){
      panel.querySelector('.gm-new-home-area-toggle').addEventListener('click', function(){
        var willOpen = this.getAttribute('aria-expanded') !== 'true';
        if(willOpen && !(filter.value || '').trim()){
          groupPanels.forEach(function(other){ if(other !== panel) setGroupOpen(other, false); });
        }
        setGroupOpen(panel, willOpen);
        expandButton.setAttribute('aria-pressed', 'false');
        expandButton.textContent = 'Espandi tutti';
      });
    });

    expandButton.addEventListener('click', function(){
      var expand = this.getAttribute('aria-pressed') !== 'true';
      groupPanels.filter(function(panel){ return !panel.hidden; }).forEach(function(panel){ setGroupOpen(panel, expand); });
      this.setAttribute('aria-pressed', expand ? 'true' : 'false');
      this.textContent = expand ? 'Chiudi tutti' : 'Espandi tutti';
    });

    filter.addEventListener('input', function(){
      var query = normalizeText(this.value.trim());
      var visibleGroups = 0;
      var visiblePlaces = 0;
      groupPanels.forEach(function(panel, groupIndex){
        var group = groups[groupIndex];
        var groupMatches = !query || normalizeText(group.name).indexOf(query) !== -1;
        var placeButtons = Array.prototype.slice.call(panel.querySelectorAll('.gm-new-home-area-place'));
        var matchedHere = 0;
        placeButtons.forEach(function(button, placeIndex){
          var matches = groupMatches || normalizeText(group.places[placeIndex].name).indexOf(query) !== -1;
          button.parentElement.hidden = !matches;
          if(matches) matchedHere++;
        });
        panel.hidden = matchedHere === 0;
        if(matchedHere){
          visibleGroups++;
          visiblePlaces += matchedHere;
          if(query) setGroupOpen(panel, true);
        }
        if(!query) setGroupOpen(panel, true);
      });
      noResults.hidden = visiblePlaces !== 0;
      summary.textContent = visibleGroups+' '+(visibleGroups === 1 ? 'area' : 'aree')+' · '+visiblePlaces+' '+(visiblePlaces === 1 ? 'luogo' : 'luoghi');
      expandButton.setAttribute('aria-pressed', visiblePlaces ? 'true' : 'false');
      expandButton.textContent = visiblePlaces ? 'Chiudi tutti' : 'Espandi tutti';
    });

    scroll.querySelectorAll('.gm-new-home-area-place').forEach(function(button){
      button.addEventListener('click', function(){
        var group = groups[Number(button.getAttribute('data-area-group'))];
        var place = group && group.places[Number(button.getAttribute('data-area-place'))];
        if(place && place.target && place.target.click){ close(); setTimeout(function(){ place.target.click(); }, 40); }
      });
    });
    scroll.scrollTop = 0;
  }

  function getQrGroups(){
    var sources = window.__QR_SOURCES || [];
    var groupsById = Object.create(null);

    sources.forEach(function(source, sourceIndex){
      var parent = source && source.parent ? source.parent : {};
      var parentId = String(parent.id || ('qr-group-'+sourceIndex));
      var group = groupsById[parentId];
      if(!group){
        group = groupsById[parentId] = {
          id:parentId,
          name:String(parent.label || parent.id || 'Altri punti QR'),
          points:[],
          pointIds:Object.create(null)
        };
      }
      (source && source.children || []).forEach(function(child, childIndex){
        if(!child) return;
        var childId = String(child.id || ('item-'+childIndex));
        if(group.pointIds[childId]) return;
        group.pointIds[childId] = true;
        group.points.push({
          id:childId,
          qrid:parentId+'/'+childId,
          name:String(child.label || child.id || 'Punto QR'),
          lat:Number(child.lat),
          lng:Number(child.lng),
          descr:child.descr || '',
          media:child.media || {}
        });
      });
    });

    return Object.keys(groupsById).map(function(key){
      var group = groupsById[key];
      group.points.sort(function(a,b){ return a.name.localeCompare(b.name, 'it', {sensitivity:'base'}); });
      return group;
    }).filter(function(group){ return group.points.length; })
      .sort(function(a,b){ return a.name.localeCompare(b.name, 'it', {sensitivity:'base'}); });
  }

  function openQrPoint(point){
    close();
    setTimeout(function(){
      try{
        if(typeof window.__ensureQrOn === 'function') window.__ensureQrOn();
        else if(typeof window.__qrToggleAll === 'function') window.__qrToggleAll(true);
        else{
          var qrButton = document.getElementById('btn-qr-removed');
          var qrCheckbox = document.getElementById('chk-qr-all');
          if(qrButton && !qrButton.classList.contains('is-active')) qrButton.click();
          else if(qrCheckbox && !qrCheckbox.checked){
            qrCheckbox.checked = true;
            qrCheckbox.dispatchEvent(new Event('change', {bubbles:true}));
          }
        }
      }catch(_){}
      // Il focus 50/70 e l'animazione unica sono gestiti da qr-panel-layout.js.
      try{
        if(typeof window.__qrOpenChildPanel === 'function'){
          window.__qrOpenChildPanel(point.name, point.descr, point.media, point.qrid);
        }
      }catch(_){}
      try{
        if(typeof window.__qrSetUrl === 'function'){
          window.__qrSetUrl(point.qrid, {replace:true});
        }else{
          var url = new URL(window.location.href);
          url.searchParams.set('qr', point.qrid);
          if(/^#qr=/.test(url.hash || '')) url.hash = '';
          if(window.history && window.history.replaceState){
            window.history.replaceState(null, '', url.pathname + url.search + url.hash);
          }
        }
      }catch(_){}
    }, 60);
  }

  function renderQrCategory(section, category){
    currentView = 'qr-category';
    currentSection = section;
    applyTheme(section);
    applyView(currentView);
    title.textContent = category.title;
    eyebrow.textContent = section.title;
    backButton.hidden = false;

    var groups = getQrGroups();
    var total = groups.reduce(function(sum, group){ return sum + group.points.length; }, 0);
    if(!groups.length){
      scroll.innerHTML = '<div class="gm-new-home-detail">'+
        detailHeadHtml(section, category, 'Punti QR', 'I punti QR sono in caricamento. Riapri questa sezione tra qualche istante.')+
        '</div>';
      bindDetailMapShortcut(section, category);
      scroll.scrollTop = 0;
      return;
    }

    var groupMarkup = groups.map(function(group, groupIndex){
      var points = group.points.map(function(point, pointIndex){
        return '<li><button type="button" class="gm-new-home-qr-point" data-qr-group="'+groupIndex+'" data-qr-point="'+pointIndex+'">'+
          '<span>'+escapeHtml(point.name)+'</span><span aria-hidden="true">›</span></button></li>';
      }).join('');
      return '<section class="gm-new-home-qr-group" data-qr-group-panel="'+groupIndex+'">'+
        '<div class="gm-new-home-qr-group-head">'+
          '<button type="button" class="gm-new-home-qr-group-toggle" aria-expanded="true">'+
            '<strong>'+escapeHtml(group.name)+'</strong>'+
          '</button>'+ 
          '<button type="button" class="gm-new-home-qr-map-button qr-group-map-btn" data-qr-group-map="'+escapeHtml(group.id)+'" data-qr-group-index="'+groupIndex+'" aria-pressed="false" title="Mostra sulla mappa" aria-label="Mostra sulla mappa">'+
            '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5 5.5l5-2 7 2.5 5-2v14.5l-5 2-7-2.5-5 2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path><path d="M8.5 3.5v14.5M15.5 6v14.5" fill="none" stroke="currentColor" stroke-width="1.35" opacity=".75"></path><circle cx="12" cy="11" r="2.2" fill="currentColor"></circle></svg>'+
          '</button>'+ 
          '<span class="gm-new-home-qr-chevron" aria-hidden="true">⌄</span>'+ 
        '</div>'+ 
        '<ul class="gm-new-home-qr-points">'+points+'</ul>'+ 
      '</section>';
    }).join('');

    scroll.innerHTML = '<div class="gm-new-home-detail gm-new-home-qr-detail">'+
      detailHeadHtml(section, category, 'Punti QR', 'Esplora '+total+' punti organizzati in '+groups.length+' zone e quartieri di Genova.')+
      '<div class="gm-new-home-qr-tools">'+
        '<label class="gm-new-home-qr-search"><span class="sr-only">Cerca un punto QR</span><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg><input type="search" id="gm-new-home-qr-filter" placeholder="Cerca un punto QR o un quartiere"></label>'+ 
        '<button type="button" class="gm-new-home-qr-expand" id="gm-new-home-qr-expand" aria-pressed="true">Chiudi tutti</button>'+ 
      '</div>'+ 
      '<p class="gm-new-home-qr-summary" aria-live="polite">'+groups.length+' zone · '+total+' punti QR</p>'+ 
      '<div class="gm-new-home-qr-groups">'+groupMarkup+'</div>'+ 
      '<div class="gm-new-home-empty gm-new-home-qr-no-results" hidden>Nessun punto QR corrisponde alla ricerca.</div>'+ 
    '</div>';

    bindDetailMapShortcut(section, category);

    var groupPanels = Array.prototype.slice.call(scroll.querySelectorAll('.gm-new-home-qr-group'));
    var expandButton = scroll.querySelector('#gm-new-home-qr-expand');
    var filter = scroll.querySelector('#gm-new-home-qr-filter');
    var summary = scroll.querySelector('.gm-new-home-qr-summary');
    var noResults = scroll.querySelector('.gm-new-home-qr-no-results');

    function setGroupOpen(panel, open){
      var toggle = panel.querySelector('.gm-new-home-qr-group-toggle');
      var list = panel.querySelector('.gm-new-home-qr-points');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      list.hidden = !open;
    }

    try{
      if(typeof window.__qrSyncGroupMapButtons === 'function') window.__qrSyncGroupMapButtons();
    }catch(_){}

    groupPanels.forEach(function(panel){
      panel.querySelector('.gm-new-home-qr-group-toggle').addEventListener('click', function(){
        var willOpen = this.getAttribute('aria-expanded') !== 'true';
        if(willOpen && !(filter.value || '').trim()){
          groupPanels.forEach(function(other){ if(other !== panel) setGroupOpen(other, false); });
        }
        setGroupOpen(panel, willOpen);
        expandButton.setAttribute('aria-pressed', 'false');
        expandButton.textContent = 'Espandi tutti';
      });
    });

    expandButton.addEventListener('click', function(){
      var expand = this.getAttribute('aria-pressed') !== 'true';
      groupPanels.filter(function(panel){ return !panel.hidden; }).forEach(function(panel){ setGroupOpen(panel, expand); });
      this.setAttribute('aria-pressed', expand ? 'true' : 'false');
      this.textContent = expand ? 'Chiudi tutti' : 'Espandi tutti';
    });

    filter.addEventListener('input', function(){
      var query = normalizeText(this.value.trim());
      var visibleGroups = 0;
      var visiblePoints = 0;
      groupPanels.forEach(function(panel, groupIndex){
        var group = groups[groupIndex];
        var groupMatches = !query || normalizeText(group.name).indexOf(query) !== -1;
        var pointButtons = Array.prototype.slice.call(panel.querySelectorAll('.gm-new-home-qr-point'));
        var matchedHere = 0;
        pointButtons.forEach(function(button, pointIndex){
          var matches = groupMatches || normalizeText(group.points[pointIndex].name).indexOf(query) !== -1;
          button.parentElement.hidden = !matches;
          if(matches) matchedHere++;
        });
        panel.hidden = matchedHere === 0;
        if(matchedHere){
          visibleGroups++;
          visiblePoints += matchedHere;
          if(query) setGroupOpen(panel, true);
        }
        if(!query) setGroupOpen(panel, true);
      });
      noResults.hidden = visiblePoints !== 0;
      summary.textContent = visibleGroups+' '+(visibleGroups === 1 ? 'zona' : 'zone')+' · '+visiblePoints+' punti QR';
      expandButton.setAttribute('aria-pressed', visiblePoints ? 'true' : 'false');
      expandButton.textContent = visiblePoints ? 'Chiudi tutti' : 'Espandi tutti';
    });

    scroll.querySelectorAll('.gm-new-home-qr-map-button[data-qr-group-map]').forEach(function(button){
      button.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        var groupId = button.getAttribute('data-qr-group-map') || '';
        try{
          if(typeof window.__qrToggleGroupOnly === 'function') window.__qrToggleGroupOnly(groupId);
        }catch(_){}
        try{
          if(typeof window.__qrSyncGroupMapButtons === 'function') window.__qrSyncGroupMapButtons();
        }catch(_){}
        // L'azione serve a mostrare il quartiere sulla mappa: chiudiamo la New Home
        // dopo aver attivato e centrato il relativo gruppo.
        try{ setTimeout(function(){ close(); }, 40); }catch(_){}
      });
    });

    scroll.querySelectorAll('.gm-new-home-qr-point').forEach(function(button){
      button.addEventListener('click', function(){
        var group = groups[Number(button.getAttribute('data-qr-group'))];
        var point = group && group.points[Number(button.getAttribute('data-qr-point'))];
        if(point) openQrPoint(point);
      });
    });
    scroll.scrollTop = 0;
  }

  function runExistingAction(action){
    close();
    setTimeout(function(){
      if(action === 'guide'){
        var guide = document.getElementById('help-fab') || document.querySelector('[aria-label="Apri guida"]');
        if(guide && guide.click) guide.click();
      }
      if(action === 'contact'){
        var contact = document.querySelector('#settings-dropdown .settings-row[data-action="contact"]');
        if(contact && contact.click) contact.click();
      }
    }, 40);
  }

  var HISTORY_LAYERS = {
    'history-walls': [
      {
        control:'chk-wall-romane', wallKey:'mura-romane', name:'Mura Pre-Romane', note:'544–458 a.C.', color:'#db2777',
        description:'Le mura preromane di Genova proteggevano il primo nucleo fortificato sorto sulla collina di Castello, dominante l’antico approdo del Mandraccio. L’oppidum occupava pochi ettari ed era abitato dai Liguri Genuates, in contatto commerciale con Etruschi, Greci e Fenici. Le difese sfruttavano le ripide scarpate naturali ed erano integrate da muri a secco, terrapieni e palizzate lignee. All’interno si trovavano abitazioni, magazzini e spazi legati agli scambi marittimi, fondamentali per lo sviluppo economico del sito. Oggi la cinta non è visibile in superficie: i resti archeologici sono sepolti sotto le successive stratificazioni urbane, ma la morfologia della collina conserva ancora il carattere dell’antica acropoli.'
      },
      {
        control:'chk-wall-carolinge', wallKey:'mura-carolinge', name:'Mura Carolinge', note:'848–889 d.C.', color:'#0d9488',
        description:'Le mura carolingie rappresentano la prima vera cinta difensiva medievale di Genova, costruita tra l’848 e l’889 per proteggere la città dalle incursioni saracene e piratesche. Il perimetro, lungo circa un chilometro e mezzo, racchiudeva una superficie di appena venti-ventidue ettari, comprendendo Castello, Sarzano, San Lorenzo e il fronte costiero, ma escludendo zone come Sant’Andrea e San Siro. La cinta era controllata da quattro porte principali e da torri poste nei punti più vulnerabili. Oggi gran parte delle strutture è scomparsa o inglobata negli edifici successivi, ma alcuni resti sono ancora riconoscibili in via Tommaso Reggio e nel complesso di Santa Maria di Castello.'
      },
      {
        control:'chk-wall-barbarossa', wallKey:'mura-barbarossa', name:'Mura del Barbarossa', note:'1155–1159', color:'#76B6FF',
        description:'L’evoluzione monumentale inizia tra il 1155 e il 1159 con l’edificazione delle Mura del Barbarossa, erette per contrastare le mire espansionistiche dell’imperatore Federico I di Svevia. Questa opera, finanziata e realizzata in tempi record dall’intera cittadinanza, estese il perimetro urbano da 22 a 55 ettari per uno sviluppo di 2,4 chilometri. Il tracciato tagliava l’attuale Piazza De Ferrari e l’Acquasola fino a Castelletto. Di questa fase restano come testimonianze verticali le due imponenti porte gemelle, a est Porta Soprana e a ovest Porta dei Vacca, oltre ai tratti superstiti in Passo delle Murette e a ridosso di Campopisano. Nel Settecento le torri di Porta Soprana vennero riconvertite in carceri e dotate di ghigliottina.'
      },
      {
        control:'chk-wall-porto', wallKey:'mura-porto', name:'Mura del Molo', note:'1276–1287', color:'#1e40af',
        description:'Le Mura del Molo furono realizzate tra il 1276 e il 1287 per proteggere il porto, ormai centro vitale della potenza commerciale genovese. La nuova fortificazione unì il promontorio del Molo a una piccola isola rocciosa, creando una barriera contro le mareggiate e gli attacchi navali. Il sistema comprendeva la Torre dei Greci, le Mura della Malapaga e diversi accessi controllati, tra cui la primitiva Porta del Molo. L’area racchiudeva magazzini, botteghe e attività legate alla navigazione e alla cantieristica. Oggi il tracciato è ancora leggibile nel Porto Antico, soprattutto lungo via del Molo, dove strutture medievali sono state inglobate nelle fortificazioni successive.'
      },
      {
        control:'chk-wall-repubblica', wallKey:'mura-repubblica', name:'Mura della Repubblica', note:'1346–1358', color:'#f95800',
        description:'Le Mura della Repubblica furono costruite tra il 1346 e il 1358 per adeguare le difese alla forte crescita economica, commerciale e demografica di Genova. La nuova cinta ampliò notevolmente la città protetta, inglobando nuovi borghi, aree agricole e punti strategici tra Carignano, Acquasola, Castelletto, Fassolo e San Tommaso, fino al fronte portuale. Il sistema comprendeva porte monumentali, tra cui Porta degli Archi e Porta di San Tommaso, oltre ad accessi marittimi già esistenti. Oggi la cinta è conservata solo in parte: alcuni tratti sopravvivono sulle alture, mentre Porta degli Archi fu smontata e ricostruita nel 1896 per consentire l’apertura di via XX Settembre.'
      },
      {
        control:'chk-wall-rinascimento', wallKey:'mura-rinascimento', name:'Mura del Rinascimento', note:'1536–1553', color:'#6b21a8',
        description:'Le Mura del Cinquecento nacquero per adattare Genova alla nuova guerra d’artiglieria, che aveva reso vulnerabili le precedenti fortificazioni medievali. Tra il 1536 e il 1553 le difese furono trasformate con cortine più basse e spesse, bastioni angolati e strutture capaci di resistere ai colpi di cannone. Il sistema interessò Carignano, Castelletto, San Benigno e soprattutto il fronte portuale, protetto da una nuova cinta continua. Tra gli accessi più importanti figuravano Porta della Lanterna, Porta degli Archi e Porta del Molo. Oggi restano tratti significativi, come le Mura di Santa Chiara e la Porta del Molo, mentre il forte Castelletto fu progressivamente demolito nei secoli successivi.'
      },
      {
        control:'chk-wall-nuove', wallKey:'mura-nuove', name:'Mura Nuove', note:'1626–1639', color:'#dc2626',
        description:'Le Mura Nuove furono costruite tra il 1626 e il 1639 dopo l’attacco sabaudo del 1625, con l’obiettivo di proteggere non solo la città ma l’intero anfiteatro collinare alle sue spalle. La nuova cinta raggiungeva quasi venti chilometri di sviluppo e correva lungo i crinali tra Val Polcevera e Val Bisagno, passando per San Benigno, Granarolo, Begato, Monte Peralto, San Bernardino e Zerbino. Il sistema comprendeva porte fortificate, bastioni e opere che avrebbero poi dato origine ai grandi forti collinari. Oggi lunghi tratti delle Mura Nuove sono ancora ben conservati e percorribili nel Parco Urbano delle Mura, costituendo uno dei più importanti patrimoni storici e paesaggistici di Genova.'
      }
    ],
    'history-aqueducts': [
      {
        control:'chk-acq-romano', aqueductKey:'romano', name:'Acquedotto Romano', note:'III secolo a.C.', color:'#8b5cf6',
        names:{it:'Acquedotto Romano',en:'Roman Aqueduct',es:'Acueducto Romano',fr:'Aqueduc romain',ar:'القناة الرومانية',ru:'Римский акведук',zh:'罗马输水渠',lij:'Acquedotto Roman'},
        notes:{it:'III secolo a.C.',en:'3rd century BC',es:'siglo III a. C.',fr:'IIIe siècle av. J.-C.',ar:'القرن الثالث قبل الميلاد',ru:'III век до н. э.',zh:'公元前3世纪',lij:'III secolo a.C.'},
        description:{
          it:'L’Acquedotto Romano rappresenta la più antica infrastruttura idrica conosciuta di Genova. Il sistema captava le acque del Bisagno e le conduceva verso la città sfruttando una pendenza costante e opere in muratura. I resti meglio documentati risalgono al I secolo d.C. e comprendono tratti di canale e piccoli ponti-canale, come quelli conservati a Staglieno, via delle Ginestre e via Menini. Gran parte del percorso originario è oggi scomparsa o inglobata nell’espansione urbana, ma i frammenti superstiti costituiscono una rara testimonianza dell’ingegneria idraulica romana e delle origini dell’approvvigionamento idrico genovese.',
          en:'The Roman Aqueduct represents the oldest known water-supply infrastructure in Genoa. The system collected water from the Bisagno and carried it towards the city by maintaining a constant gradient and using masonry structures. The best documented remains date back to the 1st century AD and include sections of channel and small channel bridges, such as those preserved at Staglieno, Via delle Ginestre and Via Menini. Much of the original route has now disappeared or been incorporated into later urban development, but the surviving fragments remain a rare testimony to Roman hydraulic engineering and to the origins of Genoa’s water-supply system.',
          es:'El Acueducto Romano representa la infraestructura hidráulica más antigua conocida de Génova. El sistema captaba las aguas del Bisagno y las conducía hacia la ciudad aprovechando una pendiente constante y mediante estructuras de mampostería. Los restos mejor documentados se remontan al siglo I d.C. e incluyen tramos de canal y pequeños puentes-canal, como los conservados en Staglieno, Via delle Ginestre y Via Menini. Gran parte del trazado original ha desaparecido o ha quedado integrada en el posterior desarrollo urbano, pero los fragmentos supervivientes constituyen un raro testimonio de la ingeniería hidráulica romana y de los orígenes del abastecimiento de agua de Génova.',
          fr:'L’Aqueduc romain constitue la plus ancienne infrastructure hydraulique connue de Gênes. Le système captait les eaux du Bisagno et les acheminait vers la ville en maintenant une pente constante grâce à des ouvrages en maçonnerie. Les vestiges les mieux documentés remontent au Ier siècle apr. J.-C. et comprennent des portions de canal ainsi que de petits ponts-canaux, comme ceux conservés à Staglieno, Via delle Ginestre et Via Menini. Une grande partie du tracé d’origine a aujourd’hui disparu ou a été intégrée au développement urbain, mais les fragments subsistants constituent un rare témoignage de l’ingénierie hydraulique romaine et des origines de l’approvisionnement en eau de Gênes.',
          ar:'تمثل القناة الرومانية أقدم بنية تحتية معروفة لإمداد جنوة بالمياه. كان النظام يجمع مياه نهر Bisagno وينقلها نحو المدينة مستفيداً من انحدار ثابت ومن منشآت مبنية بالحجارة. وتعود أفضل البقايا الموثقة إلى القرن الأول الميلادي، وتشمل أجزاء من القناة وجسوراً صغيرة حاملة للمياه، مثل تلك المحفوظة في Staglieno وVia delle Ginestre وVia Menini. وقد اختفى اليوم جزء كبير من المسار الأصلي أو اندمج في التوسع العمراني اللاحق، إلا أن الأجزاء الباقية تمثل شاهداً نادراً على الهندسة المائية الرومانية وعلى بدايات نظام إمداد جنوة بالمياه.',
          ru:'Римский акведук является древнейшей известной системой водоснабжения Генуи. Он забирал воду из Бизаньо и направлял её к городу, используя постоянный уклон и каменные гидротехнические сооружения. Наиболее хорошо документированные остатки относятся к I веку н. э. и включают участки канала и небольшие мосты-водоводы, сохранившиеся в Стальено, на Via delle Ginestre и Via Menini. Значительная часть первоначального маршрута сегодня исчезла или была поглощена последующей городской застройкой, однако сохранившиеся фрагменты представляют собой редкое свидетельство римской гидротехники и ранней истории водоснабжения Генуи.',
          zh:'罗马输水渠是目前已知热那亚最古老的供水基础设施。它从Bisagno河取水，利用持续而缓慢的坡度以及石砌工程，将水输送到城市。现有文献记录最完整的遗迹可追溯至公元1世纪，包括部分输水渠道和小型水渠桥，例如Staglieno、Via delle Ginestre和Via Menini保存的遗迹。如今，原有路线的大部分已经消失，或被后来的城市建设所覆盖和吸收，但幸存的建筑片段仍是罗马水利工程以及热那亚早期城市供水历史的珍贵见证。',
          lij:'L’Acquedotto Roman o rappresenta a ciù antiga infrastruttua idrica conosciûa de Zena. O sistema o piggiava l’ægua do Bisagno e o-a portava verso a çittæ sfruttando unna pendenza costante e euvie de muratua. I resti megio documentæ remontan a-o primmo secolo d.C. e comprendan tratti de canâ e piccoli ponti-canâ, comme quelli conservæ a Stagén, in Via delle Ginestre e Via Menini. Gran parte do percorso originâ ancheu a l’é sparîa ò inglobâ inte successive trasformaçioin urbane, ma i frammenti sopravvisciui son unna rara testimoniança de l’ingegneria idraulica romana e de l’origine de l’approvvigionamento d’ægua de Zena.'
        }
      },
      {
        control:'chk-acq-storico', aqueductKey:'storico', name:'Acquedotto Storico', note:'XVII secolo', color:'#16a34a',
        names:{it:'Acquedotto Storico',en:'Historic Aqueduct',es:'Acueducto Histórico',fr:'Aqueduc historique',ar:'القناة التاريخية',ru:'Исторический акведук',zh:'历史输水渠',lij:'Acquedotto Storico'},
        notes:{it:'XVII secolo',en:'17th century',es:'siglo XVII',fr:'XVIIe siècle',ar:'القرن السابع عشر',ru:'XVII век',zh:'17世纪',lij:'XVII secolo'},
        description:{
          it:'L’Acquedotto Storico di Genova è il risultato di secoli di ampliamenti e trasformazioni del sistema idrico proveniente dalla Val Bisagno. Sviluppato soprattutto tra Medioevo e Seicento, raggiunse complessivamente circa 40 chilometri, alternando canali a cielo aperto, ponti-canale, arcate, gallerie, prese e opere sotterranee. Nei secoli successivi venne aggiornato con straordinarie opere ingegneristiche, come il ponte-sifone del Geirato del 1777, lungo oltre 600 metri e sostenuto da 22 arcate, e quello del Veilino, avviato nel 1837 su progetto di Carlo Barabino, lungo circa 450 metri. Dopo aver rifornito per secoli città e porto, oggi l’acquedotto conserva un eccezionale valore storico, architettonico e paesaggistico: circa 28 chilometri di percorso pedonale sono stati restaurati e riaperti nel 2026.',
          en:'Genoa’s Historic Aqueduct is the result of centuries of expansions and transformations of the water-supply system originating in the Val Bisagno. Developed mainly between the Middle Ages and the seventeenth century, it eventually reached a total length of about 40 kilometres, combining open channels, channel bridges, arches, tunnels, water intakes and underground structures. In later centuries it was modernised with remarkable engineering works, including the Geirato siphon bridge of 1777, more than 600 metres long and supported by 22 arches, and the Veilino siphon bridge, begun in 1837 to a design by Carlo Barabino and approximately 450 metres long. After supplying the city and harbour for centuries, the aqueduct today has exceptional historical, architectural and landscape value: about 28 kilometres of pedestrian route were restored and reopened in 2026.',
          es:'El Acueducto Histórico de Génova es el resultado de siglos de ampliaciones y transformaciones del sistema hidráulico procedente de la Val Bisagno. Desarrollado principalmente entre la Edad Media y el siglo XVII, llegó a alcanzar una longitud total de unos 40 kilómetros, combinando canales a cielo abierto, puentes-canal, arcos, túneles, tomas de agua y estructuras subterráneas. En los siglos posteriores fue modernizado mediante extraordinarias obras de ingeniería, como el puente-sifón del Geirato de 1777, de más de 600 metros de longitud y sostenido por 22 arcos, y el del Veilino, iniciado en 1837 según un proyecto de Carlo Barabino y de unos 450 metros de longitud. Tras abastecer durante siglos a la ciudad y al puerto, hoy el acueducto posee un excepcional valor histórico, arquitectónico y paisajístico: aproximadamente 28 kilómetros de recorrido peatonal fueron restaurados y reabiertos en 2026.',
          fr:'L’Aqueduc historique de Gênes est le résultat de plusieurs siècles d’agrandissements et de transformations du système hydraulique provenant de la Val Bisagno. Développé principalement entre le Moyen Âge et le XVIIe siècle, il atteignit une longueur totale d’environ 40 kilomètres, alternant canaux à ciel ouvert, ponts-canaux, arches, galeries, prises d’eau et ouvrages souterrains. Au cours des siècles suivants, il fut modernisé grâce à d’extraordinaires réalisations d’ingénierie, comme le pont-siphon du Geirato de 1777, long de plus de 600 mètres et soutenu par 22 arches, et celui du Veilino, commencé en 1837 selon un projet de Carlo Barabino et long d’environ 450 mètres. Après avoir alimenté pendant des siècles la ville et le port, l’aqueduc possède aujourd’hui une valeur historique, architecturale et paysagère exceptionnelle : environ 28 kilomètres de parcours piétonnier ont été restaurés et rouverts en 2026.',
          ar:'تمثل القناة التاريخية في جنوة نتيجة قرون من التوسعات والتحولات التي شهدها نظام المياه القادم من Val Bisagno. وقد تطورت بصورة خاصة بين العصور الوسطى والقرن السابع عشر، حتى بلغ طولها الإجمالي نحو 40 كيلومتراً، وتنوعت منشآتها بين القنوات المفتوحة والجسور الحاملة للمياه والأقواس والأنفاق ومآخذ المياه والمنشآت تحت الأرض. وفي القرون اللاحقة جرى تحديثها من خلال أعمال هندسية استثنائية، من بينها جسر السيفون فوق Geirato الذي يعود إلى 1777، ويزيد طوله على 600 متر وتحمله 22 قنطرة، وجسر Veilino الذي بدأ بناؤه سنة 1837 وفق تصميم Carlo Barabino ويبلغ طوله نحو 450 متراً. وبعد أن زودت المدينة والميناء بالمياه لقرون، تتمتع القناة اليوم بقيمة تاريخية ومعمارية ومنظرية استثنائية، وقد جرى ترميم وإعادة فتح نحو 28 كيلومتراً من المسارات المخصصة للمشاة في عام 2026.',
          ru:'Исторический акведук Генуи является результатом многовековых расширений и преобразований системы водоснабжения, берущей начало в Валь-Бизаньо. Особенно активно он развивался в Средние века и в XVII столетии, достигнув общей протяжённости около 40 километров. Система включала открытые каналы, мосты-водоводы, аркады, тоннели, водозаборы и подземные сооружения. В последующие века акведук модернизировали с помощью выдающихся инженерных сооружений, среди которых мост-сифон Джейрато 1777 года, длиной более 600 метров и с 22 арками, а также мост-сифон Вейлино, строительство которого началось в 1837 году по проекту Карло Барабино; его длина составляет около 450 метров. После многовекового снабжения города и порта водой акведук сегодня представляет исключительную историческую, архитектурную и ландшафтную ценность: около 28 километров пешеходного маршрута были восстановлены и вновь открыты в 2026 году.',
          zh:'热那亚历史输水渠是Val Bisagno供水系统经过数百年扩建和改造形成的结果。它主要在中世纪至17世纪期间不断发展，最终总长度达到约40公里，包括露天渠道、水渠桥、拱券、隧道、取水设施和地下工程。在之后几个世纪中，系统又通过多项杰出的工程技术得到升级，其中包括建于1777年的Geirato虹吸桥，长度超过600米，由22座拱券支撑；以及1837年开始按照Carlo Barabino设计建造的Veilino虹吸桥，长度约450米。在数百年间为城市和港口供水之后，如今这套输水系统具有极高的历史、建筑和景观价值。2026年，约28公里的步行路线经过修复后重新开放。',
          lij:'L’Acquedotto Storico de Zena o l’é o risultato de secoli d’ampliamenti e trasformaçioin do sistema idrico che o vegniva da-a Val Bisagno. Sviluppou sorviatutto tra o Medioevo e o Seiçento, o l’é arrivou complessivamente a çirca 40 chilometri, alternando canæ a çê averto, ponti-canâ, arcæ, gallerie, preize d’ægua e euvie sotterranee. Inti secoli successivi o l’é stæto modernizou con grande euvie d’ingegneria, comme o ponte-sifon do Geirato do 1777, longo ciù de 600 metri e sostenûo da 22 arcæ, e quello do Veilino, comensou into 1837 in sciô progetto de Carlo Barabino e longo çirca 450 metri. Dòppo aveî portou l’ægua pe secoli a-a çittæ e a-o porto, ancheu l’acquedotto o conserva un ecceçionale valô storico, architettonico e paesaggistico: çirca 28 chilometri de percorso pedonale son stæti restauræ e riaverti into 2026.'
        }
      }
    ]
  };

  var AQUEDUCT_DETAIL_UI = {
    eyebrow:{it:'Acquedotti',en:'Aqueducts',es:'Acueductos',fr:'Aqueducs',ar:'القنوات المائية',ru:'Акведуки',zh:'输水渠',lij:'Acquedotti'},
    show:{it:'Mostra l’acquedotto sulla mappa',en:'Show the aqueduct on the map',es:'Mostrar el acueducto en el mapa',fr:'Afficher l’aqueduc sur la carte',ar:'عرض القناة على الخريطة',ru:'Показать акведук на карте',zh:'在地图上显示输水渠',lij:'Fanni vedde l’acquedotto in sciâ mappa'},
    points:{it:'Punti d’interesse',en:'Points of interest',es:'Puntos de interés',fr:'Points d’intérêt',ar:'نقاط الاهتمام',ru:'Достопримечательности',zh:'兴趣点',lij:'Ponti d’interesse'},
    point:{it:'punto',en:'point',es:'punto',fr:'point',ar:'نقطة',ru:'точка',zh:'个点',lij:'ponto'},
    pointsCount:{it:'punti',en:'points',es:'puntos',fr:'points',ar:'نقاط',ru:'точек',zh:'个点',lij:'ponti'},
    pointType:{it:'Punto dell’acquedotto',en:'Aqueduct point',es:'Punto del acueducto',fr:'Point de l’aqueduc',ar:'نقطة من القناة',ru:'Точка акведука',zh:'输水渠点位',lij:'Ponto de l’acquedotto'},
    empty:{it:'Non sono ancora presenti punti d’interesse per questo acquedotto.',en:'No points of interest are currently available for this aqueduct.',es:'Todavía no hay puntos de interés para este acueducto.',fr:'Aucun point d’intérêt n’est encore disponible pour cet aqueduc.',ar:'لا توجد بعد نقاط اهتمام لهذه القناة.',ru:'Для этого акведука пока нет достопримечательностей.',zh:'该输水渠目前还没有兴趣点。',lij:'No gh’é ancon ponti d’interesse pe sto acquedotto.'}
  };

  function getRouteGroups(){
    var catalog = window.PERCORSI || {};
    return Object.keys(catalog).map(function(groupName){
      return {
        name:groupName,
        items:(catalog[groupName] || []).map(function(route){
          var points = window.ROUTE_FAVS && Array.isArray(window.ROUTE_FAVS[route.id]) ? window.ROUTE_FAVS[route.id] : [];
          return {
            control:'route:'+route.id,
            routeKey:route.id,
            groupName:groupName,
            name:route.name || route.id,
            note:points.length ? points.length+' '+(points.length === 1 ? 'punto' : 'punti') : 'Nessun punto collegato',
            color:route.color || '#566b54'
          };
        })
      };
    }).filter(function(group){ return group.items.length; });
  }

  function findLayerControl(key){
    if(key.indexOf('route:') === 0){
      var routeId = key.slice(6);
      var row = document.querySelector('#routes-menu .doc-row[data-route-id="'+routeId+'"]');
      return row ? row.querySelector('input.route-chk') : null;
    }
    return document.getElementById(key);
  }

  function syncHistoryToggles(){
    if(!scroll) return;
    var toggles = Array.prototype.slice.call(scroll.querySelectorAll('.gm-new-home-layer-toggle[data-control]'));
    toggles.forEach(function(toggle){
      var original = findLayerControl(toggle.getAttribute('data-control'));
      toggle.checked = !!(original && original.checked);
    });
    var master = scroll.querySelector('.gm-new-home-layer-master');
    if(master && toggles.length){
      var active = toggles.filter(function(toggle){ return toggle.checked; }).length;
      master.checked = active === toggles.length;
      master.indeterminate = active > 0 && active < toggles.length;
      var status = scroll.querySelector('.gm-new-home-layer-status');
      if(status) status.textContent = active+' '+(active === 1 ? 'tracciato attivo' : 'tracciati attivi');
    }
  }

  function toggleOriginalControl(key, enabled){
    var original = findLayerControl(key);
    if(!original || original.checked === enabled) return;
    original.click();
  }

  function layerRow(item, index){
    var toggleId = 'gm-new-home-layer-'+String(index).replace(/[^a-z0-9_-]/gi, '-');
    var copy = item.wallKey
      ? '<button type="button" class="gm-new-home-layer-copy gm-new-home-wall-open" data-wall="'+escapeHtml(item.wallKey)+'"><strong>'+escapeHtml(item.name)+'</strong><small>'+escapeHtml(item.note || '')+'</small><span class="gm-new-home-wall-arrow" aria-hidden="true">›</span></button>'
      : item.aqueductKey
      ? '<button type="button" class="gm-new-home-layer-copy gm-new-home-aqueduct-open" data-aqueduct="'+escapeHtml(item.aqueductKey)+'"><strong>'+escapeHtml(item.name)+'</strong><small>'+escapeHtml(item.note || '')+'</small><span class="gm-new-home-wall-arrow" aria-hidden="true">›</span></button>'
      : item.routeKey
      ? '<button type="button" class="gm-new-home-layer-copy gm-new-home-route-open" data-route="'+escapeHtml(item.routeKey)+'"><strong>'+escapeHtml(item.name)+'</strong><small>'+escapeHtml(item.note || '')+'</small><span class="gm-new-home-wall-arrow" aria-hidden="true">›</span></button>'
      : '<label class="gm-new-home-layer-copy" for="'+toggleId+'"><strong>'+escapeHtml(item.name)+'</strong><small>'+escapeHtml(item.note || '')+'</small></label>';
    return '<div class="gm-new-home-layer-row">'+
      '<span class="gm-new-home-layer-dot" style="--layer-color:'+escapeHtml(item.color)+'" aria-hidden="true"></span>'+
      copy+
      '<input id="'+toggleId+'" class="gm-new-home-layer-toggle" type="checkbox" role="switch" data-control="'+escapeHtml(item.control)+'" aria-label="Mostra '+escapeHtml(item.name)+'">'+
      '<label class="gm-new-home-switch" for="'+toggleId+'" aria-hidden="true"></label>'+
    '</div>';
  }

  function getWallNodes(wallKey){
    try{
      if(typeof WALL_NODES !== 'undefined' && WALL_NODES && Array.isArray(WALL_NODES[wallKey])) return WALL_NODES[wallKey];
    }catch(_){}
    return [];
  }

  function openWallPoint(wall, node){
    toggleOriginalControl(wall.control, true);
    close();
    setTimeout(function(){
      var appMap = window.map || window.__map;
      if(!appMap || !node || !Array.isArray(node.coords)) return;
      try{ appMap.setView(node.coords, Math.max(Number(appMap.getZoom && appMap.getZoom()) || 15, 17), {animate:true}); }catch(_){}
      setTimeout(function(){
        try{
          var found = null;
          if(typeof appMap.eachLayer === 'function'){
            appMap.eachLayer(function(layer){
              if(found || !layer || typeof layer.getLatLng !== 'function') return;
              var ll = layer.getLatLng();
              var samePoint = Math.abs(ll.lat-node.coords[0]) < 0.0000002 && Math.abs(ll.lng-node.coords[1]) < 0.0000002;
              var hasPopup = typeof layer.getPopup === 'function' && !!layer.getPopup();
              if(samePoint && hasPopup) found = layer;
            });
          }
          if(found && typeof found.openPopup === 'function'){
            found.openPopup();
            if(typeof found.bringToFront === 'function') found.bringToFront();
          }
        }catch(_){}
      }, 420);
    }, 80);
  }

  function renderWallDetail(section, category, wall){
    currentView = 'wall-detail';
    currentSection = section;
    currentCategory = category;
    applyTheme(section);
    applyView(currentView);
    title.textContent = wall.name;
    eyebrow.textContent = 'Mura storiche';
    backButton.hidden = false;
    var nodes = getWallNodes(wall.wallKey);
    var points = nodes.map(function(node, index){
      return '<li><button type="button" class="gm-new-home-wall-point" data-wall-point="'+index+'">'+
        '<span><strong>'+escapeHtml(node.name)+'</strong><small>'+escapeHtml(node.type || 'Punto d’interesse')+'</small></span><span aria-hidden="true">›</span>'+
      '</button></li>';
    }).join('');
    scroll.innerHTML = '<article class="gm-new-home-wall-detail" style="--wall-color:'+escapeHtml(wall.color)+'">'+
      '<header class="gm-new-home-wall-hero"><span class="gm-new-home-wall-period">'+escapeHtml(wall.note)+'</span><h3>'+escapeHtml(wall.name)+'</h3><p>'+escapeHtml(wall.description)+'</p></header>'+ 
      '<div class="gm-new-home-wall-actions"><button type="button" class="gm-new-home-wall-show">Mostra la cinta sulla mappa</button></div>'+ 
      '<section class="gm-new-home-wall-points"><div class="gm-new-home-wall-points-head"><h4>Punti d’interesse</h4><span>'+nodes.length+' '+(nodes.length === 1 ? 'punto' : 'punti')+'</span></div>'+ 
        (nodes.length ? '<ul>'+points+'</ul>' : '<div class="gm-new-home-empty">Non sono ancora presenti punti d’interesse per questa cinta.</div>')+
      '</section></article>';
    scroll.querySelector('.gm-new-home-wall-show').addEventListener('click', function(){
      toggleOriginalControl(wall.control, true);
      close();
    });
    scroll.querySelectorAll('[data-wall-point]').forEach(function(button){
      button.addEventListener('click', function(){
        var node = nodes[Number(button.getAttribute('data-wall-point'))];
        if(node) openWallPoint(wall, node);
      });
    });
    scroll.scrollTop = 0;
  }

  function getAqueductPoints(aqueduct){
    var points = aqueduct.aqueductKey === 'storico'
      ? window.ACQUEDOTTO_STORICO_POIS
      : window.ACQUEDOTTO_ROMANO_POIS;
    return Array.isArray(points) ? points : [];
  }

  function openAqueductPoint(aqueduct, point){
    toggleOriginalControl(aqueduct.control, true);
    close();
    setTimeout(function(){
      var api = aqueduct.aqueductKey === 'storico'
        ? window.GenovaHistoricAqueductPOI
        : window.GenovaAqueductPOI;
      if(api && typeof api.open === 'function' && api.open(point.id, {zoom:17})) return;
      var appMap = window.map || window.__map;
      if(!appMap || !Array.isArray(point.coords)) return;
      try{ appMap.setView(point.coords, 17, {animate:true}); }catch(_){}
    }, 80);
  }

  function renderAqueductDetail(section, category, aqueduct){
    currentView = 'aqueduct-detail';
    currentSection = section;
    currentCategory = category;
    currentAqueduct = aqueduct;
    applyTheme(section);
    applyView(currentView);
    // Il traduttore conserva la sorgente italiana e aggiorna i nodi senza ricreare la vista.
    var language = 'it';
    var ui = function(key){ return translated(AQUEDUCT_DETAIL_UI[key], language); };
    var displayName = translated(aqueduct.names, language);
    title.textContent = displayName;
    eyebrow.textContent = ui('eyebrow');
    backButton.hidden = false;
    overlay.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    var points = getAqueductPoints(aqueduct);
    var pointRows = points.map(function(point, index){
      return '<li><button type="button" class="gm-new-home-wall-point" data-aqueduct-point="'+index+'">'+
        '<span><strong>'+escapeHtml(point.name)+'</strong><small>'+escapeHtml(translated(point.subtitle, language) || ui('pointType'))+'</small></span><span aria-hidden="true">›</span>'+
      '</button></li>';
    }).join('');
    var countLabel = points.length === 1 ? ui('point') : ui('pointsCount');
    scroll.innerHTML = '<article class="gm-new-home-wall-detail gm-new-home-aqueduct-detail" style="--wall-color:'+escapeHtml(aqueduct.color)+'">'+
      '<header class="gm-new-home-wall-hero"><span class="gm-new-home-wall-period">'+escapeHtml(translated(aqueduct.notes, language) || aqueduct.note)+'</span><h3>'+escapeHtml(displayName)+'</h3><p>'+escapeHtml(translated(aqueduct.description, language))+'</p></header>'+ 
      '<div class="gm-new-home-wall-actions"><button type="button" class="gm-new-home-wall-show">'+escapeHtml(ui('show'))+'</button></div>'+ 
      '<section class="gm-new-home-wall-points"><div class="gm-new-home-wall-points-head"><h4>'+escapeHtml(ui('points'))+'</h4><span>'+points.length+' '+escapeHtml(countLabel)+'</span></div>'+ 
        (points.length ? '<ul>'+pointRows+'</ul>' : '<div class="gm-new-home-empty">'+escapeHtml(ui('empty'))+'</div>')+
      '</section></article>';
    scroll.querySelector('.gm-new-home-wall-show').addEventListener('click', function(){
      toggleOriginalControl(aqueduct.control, true);
      close();
    });
    scroll.querySelectorAll('[data-aqueduct-point]').forEach(function(button){
      button.addEventListener('click', function(){
        var point = points[Number(button.getAttribute('data-aqueduct-point'))];
        if(point) openAqueductPoint(aqueduct, point);
      });
    });
    scroll.scrollTop = 0;
  }

  var ROUTE_DETAIL_UI = {
    eyebrow:{it:'Percorsi consigliati',en:'Recommended routes',es:'Rutas recomendadas',fr:'Parcours conseillés',ar:'المسارات المقترحة',ru:'Рекомендуемые маршруты',zh:'推荐路线',lij:'Percorsi consegiæ'},
    show:{it:'Mostra il percorso sulla mappa',en:'Show the route on the map',es:'Mostrar la ruta en el mapa',fr:'Afficher le parcours sur la carte',ar:'عرض المسار على الخريطة',ru:'Показать маршрут на карте',zh:'在地图上显示路线',lij:'Fanni vedde o percorso in sciâ mappa'},
    points:{it:'Punti del percorso',en:'Route points',es:'Puntos de la ruta',fr:'Points du parcours',ar:'نقاط المسار',ru:'Точки маршрута',zh:'路线点位',lij:'Ponti do percorso'},
    point:{it:'punto',en:'point',es:'punto',fr:'point',ar:'نقطة',ru:'точка',zh:'个点',lij:'ponto'},
    pointsCount:{it:'punti',en:'points',es:'puntos',fr:'points',ar:'نقاط',ru:'точек',zh:'个点',lij:'ponti'},
    empty:{it:'Non sono ancora presenti punti collegati a questo percorso.',en:'No points are currently linked to this route.',es:'Todavía no hay puntos vinculados a esta ruta.',fr:'Aucun point n’est encore associé à ce parcours.',ar:'لا توجد بعد نقاط مرتبطة بهذا المسار.',ru:'К этому маршруту пока не привязаны точки.',zh:'该路线目前还没有关联点位。',lij:'No gh’é ancon ponti colegæ a sto percorso.'}
  };

  function routeDisplayName(route, language){
    var names = window.I18N_ROUTES && window.I18N_ROUTES[route.routeKey];
    return translated(names, language) || route.name || route.routeKey;
  }

  function routePopupInfo(route, language){
    var root = window.I18N_POPUP && window.I18N_POPUP[route.routeKey];
    var start = root && root.start;
    return translated(start, language) || {};
  }

  function getRoutePoints(route){
    var points = window.ROUTE_FAVS && window.ROUTE_FAVS[route.routeKey];
    return Array.isArray(points) ? points : [];
  }

  function normalizeRoutePointText(value){
    var text = String(value == null ? '' : value).toLocaleLowerCase('it').trim();
    try{ text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }catch(_){}
    return text.replace(/[’‘`]/g, "'").replace(/\s+/g, ' ');
  }

  function routePointLists(label){
    var preferred = {
      'Forte':'fav-list-forti', 'Museo':'fav-list-musei', 'Stazione':'fav-list-train',
      'Metro':'fav-list-metro', 'Impianto':'fav-list-funi', 'Chiesa':'fav-list-chiese',
      'Palazzo':'fav-list-palazzi', 'Parco':'fav-list-parchi-piazze', 'Piazza':'fav-list-parchi-piazze'
    }[label];
    var all = ['fav-list-forti','fav-list-musei','fav-list-train','fav-list-metro','fav-list-funi','fav-list-chiese','fav-list-palazzi','fav-list-parchi-piazze'];
    return preferred ? [preferred].concat(all.filter(function(id){ return id !== preferred; })) : all;
  }

  function findRoutePointTarget(point){
    var wanted = normalizeRoutePointText(point && point.name);
    if(!wanted) return null;
    var ids = routePointLists(point.label);
    for(var i=0; i<ids.length; i++){
      var list = document.getElementById(ids[i]);
      if(!list) continue;
      var items = Array.prototype.slice.call(list.querySelectorAll('.fav-item'));
      for(var j=0; j<items.length; j++){
        var target = items[j].querySelector('.fav-name') || items[j];
        if(normalizeRoutePointText(target.textContent) === wanted) return target;
      }
    }
    return null;
  }

  function openRoutePoint(route, point){
    toggleOriginalControl(route.control, true);
    var target = findRoutePointTarget(point);
    close();
    setTimeout(function(){
      if(window.__gmOpenSingleRoutePoint){
        window.__gmOpenSingleRoutePoint(point.label, point.name, route.routeKey);
      }else if(target && typeof target.click === 'function') target.click();
    }, 90);
  }

  function renderRouteDetail(section, category, route){
    currentView = 'route-detail';
    currentSection = section;
    currentCategory = category;
    currentRoute = route;
    applyTheme(section);
    applyView(currentView);
    var language = 'it';
    var ui = function(key){ return translated(ROUTE_DETAIL_UI[key], language); };
    var displayName = routeDisplayName(route, language);
    var info = routePopupInfo(route, language);
    var points = getRoutePoints(route);
    title.textContent = displayName;
    eyebrow.textContent = ui('eyebrow');
    backButton.hidden = false;
    overlay.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    var rows = points.map(function(point, index){
      return '<li><button type="button" class="gm-new-home-wall-point" data-route-point="'+index+'">'+
        '<span><strong>'+escapeHtml(point.name)+'</strong><small>'+escapeHtml(point.label || ui('point'))+'</small></span><span aria-hidden="true">›</span>'+
      '</button></li>';
    }).join('');
    var meta = [translated(window.I18N_CATS && window.I18N_CATS[route.groupName], language) || route.groupName, info.duration || ''].filter(Boolean).join(' · ');
    var countLabel = points.length === 1 ? ui('point') : ui('pointsCount');
    scroll.innerHTML = '<article class="gm-new-home-wall-detail gm-new-home-route-detail" style="--wall-color:'+escapeHtml(route.color)+'">'+
      '<header class="gm-new-home-wall-hero"><span class="gm-new-home-wall-period">'+escapeHtml(meta)+'</span><h3>'+escapeHtml(displayName)+'</h3><p>'+escapeHtml(info.desc || '')+'</p></header>'+ 
      '<div class="gm-new-home-wall-actions"><button type="button" class="gm-new-home-wall-show">'+escapeHtml(ui('show'))+'</button></div>'+ 
      '<section class="gm-new-home-wall-points"><div class="gm-new-home-wall-points-head"><h4>'+escapeHtml(ui('points'))+'</h4><span>'+points.length+' '+escapeHtml(countLabel)+'</span></div>'+ 
        (points.length ? '<ul>'+rows+'</ul>' : '<div class="gm-new-home-empty">'+escapeHtml(ui('empty'))+'</div>')+
      '</section></article>';
    scroll.querySelector('.gm-new-home-wall-show').addEventListener('click', function(){
      toggleOriginalControl(route.control, true);
      close();
    });
    scroll.querySelectorAll('[data-route-point]').forEach(function(button){
      button.addEventListener('click', function(){
        var point = points[Number(button.getAttribute('data-route-point'))];
        if(point) openRoutePoint(route, point);
      });
    });
    scroll.scrollTop = 0;
  }

  function renderHistoryCategory(section, category){
    currentView = 'category';
    currentSection = section;
    currentCategory = category;
    currentAqueduct = null;
    currentRoute = null;
    overlay.setAttribute('dir', 'ltr');
    applyTheme(section);
    applyView(currentView);
    title.textContent = category.title;
    eyebrow.textContent = section.title;
    backButton.hidden = false;

    var groups = category.type === 'recommended-routes'
      ? getRouteGroups()
      : [{name:'', items:HISTORY_LAYERS[category.type] || []}];
    var items = groups.reduce(function(all, group){ return all.concat(group.items); }, []);
    var lists = groups.map(function(group){
      return '<section class="gm-new-home-layer-group">'+
        (group.name ? '<h4>'+escapeHtml(group.name)+'</h4>' : '')+
        '<div class="gm-new-home-layer-list">'+group.items.map(function(item, index){ return layerRow(item, group.name+'-'+index+'-'+item.control); }).join('')+'</div>'+ 
      '</section>';
    }).join('');

    scroll.innerHTML = '<div class="gm-new-home-detail gm-new-home-layer-detail">'+
      detailHeadHtml(section, category)+
      '<div class="gm-new-home-layer-toolbar">'+
        '<label class="gm-new-home-layer-master-row"><span><strong>Mostra tutti</strong><small class="gm-new-home-layer-status">0 tracciati attivi</small></span><input class="gm-new-home-layer-master" type="checkbox" role="switch"><span class="gm-new-home-switch" aria-hidden="true"></span></label>'+
      '</div>'+lists+
      '<button type="button" class="gm-new-home-map-view">Chiudi e guarda la mappa</button>'+ 
    '</div>';

    bindDetailMapShortcut(section, category);

    scroll.querySelectorAll('.gm-new-home-layer-toggle').forEach(function(toggle){
      toggle.addEventListener('change', function(){
        toggleOriginalControl(toggle.getAttribute('data-control'), toggle.checked);
        setTimeout(syncHistoryToggles, 0);
      });
    });
    if(category.type === 'history-walls'){
      scroll.querySelectorAll('.gm-new-home-wall-open').forEach(function(button){
        button.addEventListener('click', function(){
          var wallKey = button.getAttribute('data-wall');
          var wall = items.find(function(item){ return item.wallKey === wallKey; });
          if(wall){ renderWallDetail(section, category, wall); pushNewHomeLevel(); }
        });
      });
    }
    if(category.type === 'history-aqueducts'){
      scroll.querySelectorAll('.gm-new-home-aqueduct-open').forEach(function(button){
        button.addEventListener('click', function(){
          var aqueductKey = button.getAttribute('data-aqueduct');
          var aqueduct = items.find(function(item){ return item.aqueductKey === aqueductKey; });
          if(aqueduct){ renderAqueductDetail(section, category, aqueduct); pushNewHomeLevel(); }
        });
      });
    }
    if(category.type === 'recommended-routes'){
      scroll.querySelectorAll('.gm-new-home-route-open').forEach(function(button){
        button.addEventListener('click', function(){
          var routeKey = button.getAttribute('data-route');
          var route = items.find(function(item){ return item.routeKey === routeKey; });
          if(route){ renderRouteDetail(section, category, route); pushNewHomeLevel(); }
        });
      });
    }
    var master = scroll.querySelector('.gm-new-home-layer-master');
    master.addEventListener('change', function(){
      var enabled = master.checked;
      items.forEach(function(item){ toggleOriginalControl(item.control, enabled); });
      setTimeout(syncHistoryToggles, 0);
    });
    scroll.querySelector('.gm-new-home-map-view').addEventListener('click', close);
    syncHistoryToggles();
    scroll.scrollTop = 0;
  }

  function eventLocalToday(){
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth()+1).padStart(2,'0');
    var day = String(now.getDate()).padStart(2,'0');
    return year+'-'+month+'-'+day;
  }

  function eventLanguageTag(){
    var lang = currentLanguage();
    var map = {it:'it-IT',en:'en-GB',es:'es-ES',fr:'fr-FR',ar:'ar',ru:'ru-RU',zh:'zh-CN',lij:'it-IT'};
    return map[lang] || 'it-IT';
  }

  function collectVenueNames(listIds){
    var seen = Object.create(null), out = [];
    (listIds || []).forEach(function(listId){
      getExistingPlaces(listId).forEach(function(place){
        var key = normalizeText(place.name);
        if(!key || seen[key]) return;
        seen[key] = true;
        out.push(place.name);
      });
    });
    return out.sort(function(a,b){ return a.localeCompare(b,'it',{sensitivity:'base'}); });
  }

  function selectedEventVenueGroups(tags){
    var groups = {};
    EVENT_TAGS.forEach(function(tag){
      if(tags.indexOf(tag.key) < 0) return;
      groups[tag.key] = collectVenueNames(tag.lists).slice(0,180);
    });
    return groups;
  }

  function allEventVenueTargets(){
    var listIds = [];
    EVENT_TAGS.forEach(function(tag){ (tag.lists || []).forEach(function(id){ if(listIds.indexOf(id)<0) listIds.push(id); }); });
    var seen = Object.create(null), targets = [];
    listIds.forEach(function(listId){
      getExistingPlaces(listId).forEach(function(place){
        var key = normalizeText(place.name);
        if(!key || seen[key]) return;
        seen[key] = true;
        targets.push({key:key,name:place.name,target:place.target});
      });
    });
    return targets;
  }

  function findEventVenueTarget(name){
    var key = normalizeText(name || '');
    if(!key) return null;
    var targets = allEventVenueTargets();
    var exact = targets.find(function(item){ return item.key === key; });
    if(exact) return exact.target;
    var partial = targets.filter(function(item){
      return item.key.length > 5 && (item.key.indexOf(key) >= 0 || key.indexOf(item.key) >= 0);
    });
    return partial.length === 1 ? partial[0].target : null;
  }

  function eventDateValue(value){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
    var bits = value.split('-').map(Number);
    return new Date(bits[0], bits[1]-1, bits[2], 12, 0, 0);
  }

  function formatEventDateRange(item){
    var start = eventDateValue(item.startDate), end = eventDateValue(item.endDate);
    if(!start) return item.dateLabel || '';
    try{
      var format = new Intl.DateTimeFormat(eventLanguageTag(), {day:'numeric',month:'short',year:'numeric'});
      var a = format.format(start);
      var b = end && item.endDate !== item.startDate ? format.format(end) : '';
      return b ? a+' – '+b : a;
    }catch(_){ return item.startDate + (end && item.endDate !== item.startDate ? ' – '+item.endDate : ''); }
  }

  function safeEventUrl(value){
    try{
      var url = new URL(String(value || ''), window.location.href);
      return /^https?:$/.test(url.protocol) ? url.href : '';
    }catch(_){ return ''; }
  }

  function resolveEventTagKey(item, fallback){
    var key = String(item && item.eventTag || fallback || '');
    if(EVENT_TAGS.some(function(tag){ return tag.key === key; })) return key;
    var text = String(item && item.category || '').toLocaleLowerCase();
    if(/muse|mostr|exhibit|expos|museum|\u043c\u0443\u0437\u0435|\u0432\u044b\u0441\u0442\u0430\u0432|\u0645\u062a\u062d\u0641|\u0645\u0639\u0631\u0636|\u535a\u7269|\u5c55\u89c8/.test(text)) return 'museums';
    if(/cinema|cine|film|screen|\u043a\u0438\u043d\u043e|\u0633\u064a\u0646\u0645\u0627|\u7535\u5f71/.test(text)) return 'cinema';
    if(/teatr|theatr|\u0442\u0435\u0430\u0442\u0440|\u0645\u0633\u0631\u062d|\u620f\u5267|\u5267\u9662/.test(text)) return 'theatre';
    if(/music|musica|concert|\u043c\u0443\u0437\u044b\u043a|\u043a\u043e\u043d\u0446\u0435\u0440\u0442|\u0645\u0648\u0633\u064a\u0642|\u062d\u0641\u0644|\u97f3\u4e50/.test(text)) return 'music';
    if(/palazz|palace|villa|palais|\u0434\u0432\u043e\u0440\u0435\u0446|\u0642\u0635\u0631|\u5bab/.test(text)) return 'palaces';
    if(/heritage|patrimon|storico|historic|chies|church|fort|\u0438\u0441\u0442\u043e\u0440|\u0446\u0435\u0440\u043a|\u0444\u043e\u0440\u0442|\u062a\u0631\u0627\u062b|\u0643\u0646\u064a\u0633|\u062d\u0635\u0646|\u5386\u53f2|\u6559\u5802|\u5821/.test(text)) return 'heritage';
    if(/festival|manifest|\u0444\u0435\u0441\u0442\u0438\u0432|\u0645\u0647\u0631\u062c\u0627\u0646|\u8282\u5e86/.test(text)) return 'festivals';
    if(/mercat|market|fair|feria|foire|\u0440\u044b\u043d\u043e\u043a|\u044f\u0440\u043c\u0430\u0440|\u0633\u0648\u0642|\u5e02\u573a|\u5c55\u4f1a/.test(text)) return 'markets';
    if(/sport|sportiv|\u0441\u043f\u043e\u0440\u0442|\u0631\u064a\u0627\u0636|\u4f53\u80b2/.test(text)) return 'sport';
    return '';
  }

  function eventFavoriteKey(item){
    item = item || {};
    var url = safeEventUrl(item.url);
    return [
      'event',
      normalizeText(item.title || ''),
      normalizeText(item.venue || ''),
      String(item.startDate || ''),
      String(item.endDate || ''),
      url ? url.toLowerCase() : ''
    ].join('|');
  }

  function loadEventFavorites(){
    try{
      var raw = localStorage.getItem(EVENT_FAVORITES_STORAGE_KEY);
      var items = raw ? JSON.parse(raw) : [];
      return Array.isArray(items) ? items.filter(function(item){ return item && typeof item === 'object' && item.title; }).slice(0,EVENT_FAVORITES_LIMIT) : [];
    }catch(_){ return []; }
  }

  function saveEventFavorites(items){
    try{ localStorage.setItem(EVENT_FAVORITES_STORAGE_KEY, JSON.stringify((items || []).slice(0,EVENT_FAVORITES_LIMIT))); }
    catch(_){ }
  }

  function isEventFavorite(item, favorites){
    var key = eventFavoriteKey(item);
    return (favorites || loadEventFavorites()).some(function(saved){ return eventFavoriteKey(saved) === key; });
  }

  function snapshotEventFavorite(item){
    item = item || {};
    return {
      title:String(item.title || ''),
      category:String(item.category || ''),
      venue:String(item.venue || ''),
      municipality:String(item.municipality || ''),
      startDate:String(item.startDate || ''),
      endDate:String(item.endDate || ''),
      time:String(item.time || ''),
      duration:String(item.duration || ''),
      description:String(item.description || ''),
      url:safeEventUrl(item.url),
      sourceName:String(item.sourceName || ''),
      mapVenue:String(item.mapVenue || ''),
      eventTag:resolveEventTagKey(item, eventSearchState.tags[0] || ''),
      savedAt:new Date().toISOString(),
      savedLanguage:currentLanguage()
    };
  }

  function toggleEventFavorite(item){
    var favorites = loadEventFavorites();
    var key = eventFavoriteKey(item);
    var index = favorites.findIndex(function(saved){ return eventFavoriteKey(saved) === key; });
    if(index >= 0){
      favorites.splice(index,1);
      saveEventFavorites(favorites);
      return false;
    }
    favorites.unshift(snapshotEventFavorite(item));
    saveEventFavorites(favorites);
    return true;
  }

  function eventCardsMarkup(items){
    var favorites = loadEventFavorites();
    return '<div class="gm-new-home-event-list">'+items.map(function(item,index){
      var url = safeEventUrl(item.url);
      var mapName = item.mapVenue || item.venue || '';
      var hasMap = !!findEventVenueTarget(mapName);
      var meta = [item.category || '', item.municipality || ''].filter(Boolean).join(' \u00b7 ');
      var date = formatEventDateRange(item);
      var timing = [item.time || '', item.duration || ''].filter(Boolean).join(' \u00b7 ');
      var favorite = isEventFavorite(item, favorites);
      var tagKey = resolveEventTagKey(item, currentView === 'events-category' ? (eventSearchState.tags[0] || '') : '');
      return ''+
        '<article class="gm-new-home-event-card" data-event-index="'+index+'"'+(tagKey ? ' data-event-tag="'+escapeHtml(tagKey)+'"' : '')+'>'+
        '  <div class="gm-new-home-event-date"><span>'+escapeHtml(date || '\u2014')+'</span>'+(favorite ? '<span class="gm-new-home-event-saved">Salvato</span>' : '')+'</div>'+
        '  <div class="gm-new-home-event-main">'+
        '    <div class="gm-new-home-event-kicker">'+escapeHtml(meta)+'</div>'+
        '    <h4>'+escapeHtml(item.title || '')+'</h4>'+
        '    <div class="gm-new-home-event-venue">'+escapeHtml(item.venue || '')+'</div>'+
        (timing ? '    <div class="gm-new-home-event-time">'+escapeHtml(timing)+'</div>' : '')+
        '    <p>'+escapeHtml(item.description || '')+'</p>'+
        '    <div class="gm-new-home-event-actions">'+
        (url ? '<a href="'+escapeHtml(url)+'" target="_blank" rel="noopener noreferrer">Sito dell\u2019evento</a>' : '')+
        (hasMap ? '<button type="button" data-event-map="'+index+'">Mostra sulla mappa</button>' : '')+
        '<button type="button" data-event-favorite="'+index+'">'+(favorite ? 'Rimuovi dai Preferiti' : 'Salva nei Preferiti')+'</button>'+
        '    </div>'+
        (item.sourceName ? '    <small class="gm-new-home-event-source">Fonte: '+escapeHtml(item.sourceName)+'</small>' : '')+
        '  </div>'+
        '</article>';
    }).join('')+'</div>';
  }

  function bindEventCardActions(root, items, onFavoriteChange){
    if(!root) return;
    root.querySelectorAll('[data-event-map]').forEach(function(button){
      button.addEventListener('click', function(){
        var item = items[Number(button.getAttribute('data-event-map'))];
        var target = item && findEventVenueTarget(item.mapVenue || item.venue || '');
        if(target && target.click){ close(); setTimeout(function(){ target.click(); }, 50); }
      });
    });
    root.querySelectorAll('[data-event-favorite]').forEach(function(button){
      button.addEventListener('click', function(){
        var item = items[Number(button.getAttribute('data-event-favorite'))];
        if(!item) return;
        toggleEventFavorite(item);
        if(typeof onFavoriteChange === 'function') onFavoriteChange();
      });
    });
  }

  function eventCurrentUser(){
    try{
      return window.GenovaAuth && typeof window.GenovaAuth.getUser === 'function' ? window.GenovaAuth.getUser() : null;
    }catch(_){ return null; }
  }

  async function eventAuthToken(){
    if(!window.GenovaAuth || typeof window.GenovaAuth.token !== 'function') return null;
    if(!eventCurrentUser()) return null;
    try{ return await window.GenovaAuth.token(); }
    catch(_){ return null; }
  }

  function eventQuotaText(quota){
    if(!quota || !(Number(quota.limit) > 0) || quota.remaining == null) return '';
    return 'Ricerche disponibili: '+Math.max(0,Number(quota.remaining)||0)+' su '+Math.max(0,Number(quota.limit)||0)+' nelle ultime 24 ore.';
  }

  function eventQuotaResetText(quota){
    if(!quota || !quota.resetAt) return '';
    try{
      var date = new Date(quota.resetAt);
      if(Number.isNaN(date.getTime())) return '';
      return 'Nuova ricerca disponibile: '+new Intl.DateTimeFormat(eventLanguageTag(),{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(date)+'.';
    }catch(_){ return ''; }
  }

  function eventAuthRequiredMessage(){
    return 'Accedi o registrati a Genova mApp per utilizzare Cerca eventi. Ogni account può effettuare fino a 5 ricerche nelle ultime 24 ore.';
  }

  function openEventLogin(){
    try{
      if(window.GenovaAuth && typeof window.GenovaAuth.open === 'function') window.GenovaAuth.open('login');
    }catch(_){ }
  }

  async function refreshEventQuota(){
    var requestId = ++eventQuotaRequestId;
    if(!eventCurrentUser()){
      eventSearchState.quota = null;
      if(currentView === 'events-category') renderEventResults();
      return;
    }
    var jwt = await eventAuthToken();
    if(requestId !== eventQuotaRequestId) return;
    if(!jwt){
      eventSearchState.quota = null;
      if(currentView === 'events-category') renderEventResults();
      return;
    }
    try{
      var response = await fetch('/.netlify/functions/events-search', {
        method:'GET',
        headers:{'accept':'application/json','authorization':'Bearer '+jwt,'cache-control':'no-store'}
      });
      var data = await response.json().catch(function(){ return {}; });
      if(requestId !== eventQuotaRequestId) return;
      if(response.ok && data && data.quota) eventSearchState.quota = data.quota;
      else if(response.status === 401) eventSearchState.quota = null;
      if(currentView === 'events-category') renderEventResults();
    }catch(_){ }
  }

  function renderEventResults(){
    var resultsRoot = scroll && scroll.querySelector('.gm-new-home-events-results');
    var status = scroll && scroll.querySelector('.gm-new-home-events-status');
    var searchButton = scroll && scroll.querySelector('.gm-new-home-event-search');
    if(!resultsRoot || !status) return;
    if(searchButton) searchButton.disabled = eventSearchState.loading || navigator.onLine === false;
    if(eventSearchState.loading){
      status.className = 'gm-new-home-events-status is-loading';
      status.textContent = 'Ricerca degli eventi in corso…';
      resultsRoot.innerHTML = '<div class="gm-new-home-events-loading"><span aria-hidden="true"></span><strong>Sto cercando gli appuntamenti più aggiornati.</strong><small>La ricerca utilizza fonti online e può richiedere qualche secondo.</small></div>';
      return;
    }
    if(!eventSearchState.searched){
      status.className = 'gm-new-home-events-status';
      if(navigator.onLine === false) status.textContent = 'Ricerca eventi non disponibile offline.';
      else if(!eventCurrentUser()) status.textContent = eventAuthRequiredMessage();
      else status.textContent = eventQuotaText(eventSearchState.quota);
      resultsRoot.innerHTML = '';
      return;
    }
    var items = Array.isArray(eventSearchState.results) ? eventSearchState.results : [];
    status.className = 'gm-new-home-events-status';
    status.textContent = items.length ? 'Risultati: '+items.length : 'Nessun evento trovato con i filtri selezionati.';
    if(eventSearchState.checkedAt && items.length){
      try{
        var checked = new Date(eventSearchState.checkedAt);
        status.textContent += ' · Aggiornato '+new Intl.DateTimeFormat(eventLanguageTag(),{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(checked);
      }catch(_){ }
    }
    var quotaText = eventQuotaText(eventSearchState.quota);
    if(quotaText) status.textContent += (status.textContent ? ' · ' : '')+quotaText;
    if(!items.length){
      resultsRoot.innerHTML = '<div class="gm-new-home-empty">Prova ad ampliare il periodo o a selezionare altre categorie.</div>';
      return;
    }
    resultsRoot.innerHTML = eventCardsMarkup(items);
    bindEventCardActions(resultsRoot, items, function(){
      renderEventResults();
      var favoritesButton = scroll && scroll.querySelector('[data-event-favorites]');
      if(favoritesButton) favoritesButton.textContent = 'Preferiti ('+loadEventFavorites().length+')';
    });
  }

  function scrollToEventResults(){
    var status = scroll && scroll.querySelector('.gm-new-home-events-status');
    if(!scroll || !status) return;
    setTimeout(function(){
      if(currentView !== 'events-category' || eventSearchState.loading || !eventSearchState.searched) return;
      var scrollRect = scroll.getBoundingClientRect();
      var statusRect = status.getBoundingClientRect();
      var top = Math.max(0, scroll.scrollTop + statusRect.top - scrollRect.top - 10);
      if(typeof scroll.scrollTo === 'function'){
        try{ scroll.scrollTo({top:top, behavior:'smooth'}); return; }catch(_){ }
      }
      scroll.scrollTop = top;
    }, 60);
  }

  function setEventSearchError(message){
    eventSearchState.loading = false;
    eventSearchState.searched = true;
    eventSearchState.results = [];
    var status = scroll && scroll.querySelector('.gm-new-home-events-status');
    var resultsRoot = scroll && scroll.querySelector('.gm-new-home-events-results');
    var searchButton = scroll && scroll.querySelector('.gm-new-home-event-search');
    if(status){ status.className='gm-new-home-events-status is-error'; status.textContent=message; }
    if(resultsRoot) resultsRoot.innerHTML = '<div class="gm-new-home-events-error">'+escapeHtml(message)+'</div>';
    // La ricerca precedente aveva disabilitato il pulsante durante il caricamento.
    // In caso di errore va riabilitato subito, senza costringere l'utente a uscire
    // e rientrare nella pagina Eventi. Resta disabilitato soltanto se offline.
    if(searchButton) searchButton.disabled = navigator.onLine === false;
  }

  async function searchEventsOnline(){
    if(eventSearchState.loading) return;
    if(navigator.onLine === false){ setEventSearchError('Ricerca eventi non disponibile offline. Connettiti a Internet e riprova.'); return; }
    if(!eventSearchState.tags.length){ setEventSearchError('Seleziona almeno una categoria di eventi.'); return; }
    if(!eventCurrentUser()){
      setEventSearchError(eventAuthRequiredMessage());
      setTimeout(openEventLogin,80);
      return;
    }
    var jwt = await eventAuthToken();
    if(!jwt){
      setEventSearchError(eventAuthRequiredMessage());
      setTimeout(openEventLogin,80);
      return;
    }
    eventSearchState.loading = true;
    eventSearchState.searched = false;
    eventSearchState.results = [];
    eventSearchState.language = currentLanguage();
    renderEventResults();
    var requestId = ++eventSearchRequestId;
    var payload = {
      language:eventSearchState.language,
      today:eventLocalToday(),
      tags:eventSearchState.tags.slice(),
      period:eventSearchState.period,
      area:eventSearchState.area,
      venues:selectedEventVenueGroups(eventSearchState.tags)
    };
    try{
      var response = await fetch('/.netlify/functions/events-search', {
        method:'POST',
        headers:{'content-type':'application/json','accept':'application/json','authorization':'Bearer '+jwt,'cache-control':'no-store'},
        body:JSON.stringify(payload)
      });
      var data = await response.json().catch(function(){ return {}; });
      if(requestId !== eventSearchRequestId) return;
      if(!response.ok){
        if(data && data.quota) eventSearchState.quota = data.quota;
        var errorMessage;
        if(data && data.error === 'authentication_required'){
          errorMessage = eventAuthRequiredMessage();
          setTimeout(openEventLogin,80);
        }else if(data && data.error === 'event_search_limit_reached'){
          errorMessage = 'Hai raggiunto il limite di 5 ricerche nelle ultime 24 ore.';
          var resetText = eventQuotaResetText(data.quota);
          if(resetText) errorMessage += ' '+resetText;
        }else if(data && data.error === 'event_search_global_limit_reached'){
          errorMessage = 'Il servizio Eventi ha raggiunto temporaneamente il limite generale di ricerche. Riprova più tardi.';
        }else if(data && data.error === 'search_not_configured'){
          errorMessage = 'La ricerca online degli eventi è pronta nell’app, ma deve ancora essere collegata al servizio di ricerca sul server.';
        }else{
          errorMessage = data && data.message ? data.message : 'Non è stato possibile completare la ricerca degli eventi.';
        }
        setEventSearchError(errorMessage);
        return;
      }
      eventSearchState.loading = false;
      eventSearchState.searched = true;
      if(data && data.quota) eventSearchState.quota = data.quota;
      var resultTag = eventSearchState.tags[0] || '';
      eventSearchState.results = (Array.isArray(data.events) ? data.events : []).map(function(item){
        if(item && typeof item === 'object') item.eventTag = resultTag;
        return item;
      });
      eventSearchState.checkedAt = data.checkedAt || new Date().toISOString();
      renderEventResults();
      if(eventSearchState.results.length) scrollToEventResults();
    }catch(_){
      if(requestId !== eventSearchRequestId) return;
      setEventSearchError('Non è stato possibile raggiungere il servizio eventi. Controlla la connessione e riprova.');
    }
  }

  function renderEventFavorites(section, category){
    currentView = 'events-favorites';
    currentSection = section;
    currentCategory = category;
    currentAqueduct = null;
    currentRoute = null;
    applyTheme(section);
    applyView(currentView);
    title.textContent = 'Preferiti';
    eyebrow.textContent = 'Eventi';
    backButton.hidden = false;

    var items = loadEventFavorites();
    scroll.innerHTML = ''+
      '<div class="gm-new-home-detail gm-new-home-events">'+
      '  <div class="gm-new-home-detail-head"><h3>Preferiti</h3><p>Gli eventi salvati restano disponibili su questo dispositivo finché non li rimuovi.</p></div>'+
      '  <section class="gm-new-home-events-panel">'+
      '    <div class="gm-new-home-events-status" role="status" aria-live="polite">'+(items.length ? 'Eventi salvati: '+items.length : 'Non hai ancora salvato eventi nei Preferiti.')+'</div>'+
      '    <div class="gm-new-home-events-results">'+(items.length ? eventCardsMarkup(items) : '<div class="gm-new-home-empty">Quando trovi un evento interessante, usa “Salva nei Preferiti”.</div>')+'</div>'+
      '  </section>'+
      '</div>';

    var resultsRoot = scroll.querySelector('.gm-new-home-events-results');
    bindEventCardActions(resultsRoot, items, function(){ renderEventFavorites(section, category); });
    scroll.scrollTop = 0;
  }

  function renderEventsCategory(section, category){
    currentView = 'events-category';
    currentSection = section;
    currentCategory = category;
    currentAqueduct = null;
    currentRoute = null;
    applyTheme(section);
    applyView(currentView);
    title.textContent = category.title;
    eyebrow.textContent = section.title;
    backButton.hidden = false;

    if(eventSearchState.tags.length > 1) eventSearchState.tags = eventSearchState.tags.slice(0,1);

    var tags = EVENT_TAGS.map(function(tag){
      var active = eventSearchState.tags.indexOf(tag.key) >= 0;
      return '<button type="button" class="gm-new-home-event-tag gm-new-home-event-tag--'+tag.key+(active?' is-active':'')+'" data-event-tag="'+tag.key+'" aria-pressed="'+(active?'true':'false')+'"><span class="gm-new-home-event-tag-copy"><strong>'+escapeHtml(tag.label)+'</strong><small>'+escapeHtml(tag.note)+'</small></span><span class="gm-new-home-event-tag-icon">'+eventTagIcon(tag.key)+'</span></button>';
    }).join('')+
      '<button type="button" class="gm-new-home-event-tag gm-new-home-event-propose" data-event-propose aria-label="Proponi il tuo evento"><span class="gm-new-home-event-tag-copy"><strong>Proponi il tuo evento</strong><small>Contattaci</small></span><span class="gm-new-home-event-tag-icon">'+eventTagIcon('propose')+'</span></button>';
    var periods = EVENT_PERIODS.map(function(period){
      var active = eventSearchState.period === period.key;
      return '<button type="button" class="gm-new-home-event-period'+(active?' is-active':'')+'" data-event-period="'+period.key+'" aria-pressed="'+(active?'true':'false')+'">'+escapeHtml(period.label)+'</button>';
    }).join('');

    scroll.innerHTML = ''+
      '<div class="gm-new-home-detail gm-new-home-events">'+
      '  <div class="gm-new-home-detail-head"><h3>'+escapeHtml(category.title)+'</h3><p>Trova eventi previsti o in corso a Genova utilizzando fonti online aggiornate.</p></div>'+
      '  <section class="gm-new-home-events-panel">'+
      '    <div class="gm-new-home-events-intro"><strong>Che cosa ti interessa?</strong><p>Seleziona una categoria e avvia la ricerca.</p></div>'+
      '    <div class="gm-new-home-event-tags" role="group" aria-label="Tipi di evento">'+tags+'</div>'+
      '    <div class="gm-new-home-event-controls">'+
      '      <fieldset><legend>Periodo</legend><div class="gm-new-home-event-periods">'+periods+'</div></fieldset>'+
      '      <label class="gm-new-home-event-area"><span>Zona</span><select data-event-area><option value="genova">Genova città</option><option value="metro">Città Metropolitana di Genova</option></select></label>'+
      '    </div>'+
      '    <div class="gm-new-home-event-search-row"><button type="button" class="gm-new-home-event-search">Cerca eventi</button><button type="button" class="gm-new-home-event-period" data-event-favorites>Preferiti ('+loadEventFavorites().length+')</button><span class="gm-new-home-event-online" aria-live="polite"></span></div>'+
      '    <div class="gm-new-home-events-status" role="status" aria-live="polite"></div>'+
      '    <div class="gm-new-home-events-results"></div>'+
      '  </section>'+
      '</div>';

    var areaSelect = scroll.querySelector('[data-event-area]');
    areaSelect.value = eventSearchState.area;
    scroll.querySelectorAll('[data-event-tag]').forEach(function(button){
      button.addEventListener('click', function(){
        var key = button.getAttribute('data-event-tag');
        if(eventSearchState.loading) return;
        var changed = eventSearchState.tags[0] !== key;
        eventSearchState.tags = [key];
        scroll.querySelectorAll('[data-event-tag]').forEach(function(other){
          var active = other.getAttribute('data-event-tag') === key;
          other.classList.toggle('is-active',active);
          other.setAttribute('aria-pressed',active?'true':'false');
        });
        if(changed && eventSearchState.searched){
          eventSearchState.results = [];
          eventSearchState.searched = false;
          eventSearchState.checkedAt = '';
          renderEventResults();
        }
      });
    });
    scroll.querySelectorAll('[data-event-period]').forEach(function(button){
      button.addEventListener('click', function(){
        eventSearchState.period = button.getAttribute('data-event-period') || '7days';
        scroll.querySelectorAll('[data-event-period]').forEach(function(other){
          var active = other === button;
          other.classList.toggle('is-active',active);
          other.setAttribute('aria-pressed',active?'true':'false');
        });
      });
    });
    areaSelect.addEventListener('change', function(){ eventSearchState.area = areaSelect.value || 'genova'; });
    scroll.querySelector('.gm-new-home-event-search').addEventListener('click', searchEventsOnline);
    var proposeButton = scroll.querySelector('[data-event-propose]');
    if(proposeButton){
      proposeButton.addEventListener('click', function(){ runExistingAction('contact'); });
    }
    var favoritesButton = scroll.querySelector('[data-event-favorites]');
    if(favoritesButton){
      favoritesButton.addEventListener('click', function(){
        renderEventFavorites(section, category);
        pushNewHomeLevel();
      });
    }

    function syncOnlineState(){
      var label = scroll && scroll.querySelector('.gm-new-home-event-online');
      var searchButton = scroll && scroll.querySelector('.gm-new-home-event-search');
      if(!label || !searchButton || currentView !== 'events-category') return;
      var online = navigator.onLine !== false;
      label.textContent = online ? 'Online' : 'Offline';
      label.classList.toggle('is-offline',!online);
      searchButton.disabled = !online || eventSearchState.loading;
      if(!online && !eventSearchState.searched) renderEventResults();
    }
    window.addEventListener('online',syncOnlineState,{once:true});
    window.addEventListener('offline',syncOnlineState,{once:true});
    syncOnlineState();
    renderEventResults();
    refreshEventQuota();
    scroll.scrollTop = 0;
  }

  function handleEventAuthChange(){
    eventQuotaRequestId++;
    eventSearchState.quota = null;
    if(currentView === 'events-category'){
      renderEventResults();
      refreshEventQuota();
    }
  }

  function resetEventsAfterLanguageChange(){
    clearTimeout(eventLanguageResetTimer);
    var nextLanguage = currentLanguage();
    // Il cambio lingua dell'app puo emettere sia app:set-lang sia i18n:changed.
    // Se il secondo evento riguarda gia la stessa lingua, non deve annullare una
    // nuova ricerca che l'utente potrebbe aver appena avviato.
    if(eventSearchState.language === nextLanguage) return;
    eventSearchRequestId++;
    eventSearchState.results = [];
    eventSearchState.searched = false;
    eventSearchState.loading = false;
    eventSearchState.checkedAt = '';
    eventSearchState.language = nextLanguage;
    eventLanguageResetTimer = setTimeout(function(){
      if(currentView === 'events-category' && currentSection && currentCategory){
        renderEventsCategory(currentSection,currentCategory);
      }else if(currentView === 'events-favorites' && currentSection && currentCategory){
        renderEventFavorites(currentSection,currentCategory);
      }
    },20);
  }

  function renderGamesCategory(section, category){
    currentView = 'games-category';
    currentSection = section;
    currentCategory = category;
    currentAqueduct = null;
    currentRoute = null;
    applyTheme(section);
    applyView(currentView);
    title.textContent = category.title;
    eyebrow.textContent = section.title;
    backButton.hidden = false;

    var games = GAMES.slice();
    var content = games.length
      ? '<div class="gm-new-home-game-grid">'+games.map(function(game){
          return ''+
            '<a class="gm-new-home-game-card" href="'+escapeHtml(game.href)+'" aria-label="'+escapeHtml(game.title)+'">'+
            '  <span class="gm-new-home-game-icon"><img src="'+escapeHtml(game.icon)+'" alt="" aria-hidden="true"></span>'+
            '  <span class="gm-new-home-game-copy"><strong>'+escapeHtml(game.title)+'</strong><small>'+escapeHtml(game.note)+'</small></span>'+
            '  <span class="gm-new-home-game-arrow" aria-hidden="true">›</span>'+
            '</a>';
        }).join('')+'</div>'
      : '<div class="gm-new-home-empty">La sezione è predisposta. Contenuti e collegamenti saranno completati nella prossima fase.</div>';

    scroll.innerHTML = ''+
      '<div class="gm-new-home-detail">'+
      '  <div class="gm-new-home-detail-head"><h3>'+escapeHtml(category.title)+'</h3><p>'+escapeHtml(category.note)+'</p></div>'+
      content+
      '</div>';
    scroll.scrollTop = 0;
  }

  function openCategory(section, category){
    applyTheme(section);
    if(category.action){ runExistingAction(category.action); return; }
    if(category.type === 'qr'){ renderQrCategory(section, category); return; }
    if(category.type === 'games'){ renderGamesCategory(section, category); return; }
    if(category.type === 'events'){ renderEventsCategory(section, category); return; }
    if(category.type === 'history-walls' || category.type === 'history-aqueducts' || category.type === 'recommended-routes'){
      renderHistoryCategory(section, category);
      return;
    }
    currentView = 'category';
    currentSection = section;
    applyView(currentView);
    title.textContent = category.title;
    eyebrow.textContent = section.title;
    backButton.hidden = false;
    var places = category.type === 'minidoc' ? getMiniDocs() : getExistingPlaces(category.listId);
    if(category.grouped && places.length){
      renderAreaCategory(section, category, places);
      return;
    }
    var content;
    var isTransportList = section && section.key === 'transport' && places.length;
    if(places.length){
      content = '<ul class="gm-new-home-place-list">'+places.map(function(place,index){
        return '<li><button type="button" class="gm-new-home-place" data-place="'+index+'">'+escapeHtml(place.name)+'</button></li>';
      }).join('')+'</ul>';
      if(isTransportList){
        content = ''+
          '<div class="gm-new-home-qr-tools gm-new-home-transport-tools">'+
          '  <label class="gm-new-home-qr-search gm-new-home-transport-search"><span class="sr-only">Cerca nell\'elenco</span><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg><input type="search" class="gm-new-home-transport-filter" placeholder="'+escapeHtml(category.searchPlaceholder || 'Cerca nell\'elenco')+'"></label>'+ 
          '</div>'+content+
          '<div class="gm-new-home-empty gm-new-home-transport-no-results" hidden>Nessun risultato trovato.</div>';
      }
    }else{
      content = '<div class="gm-new-home-empty">La sezione è predisposta. Contenuti e collegamenti saranno completati nella prossima fase.</div>';
    }
    scroll.innerHTML = ''+
      '<div class="gm-new-home-detail">'+
      detailHeadHtml(section, category)+
      content+
      '</div>';
    bindDetailMapShortcut(section, category);
    scroll.querySelectorAll('[data-place]').forEach(function(button){
      button.addEventListener('click', function(){
        var place = places[Number(button.getAttribute('data-place'))];
        if(place && place.target && place.target.click){ close(); setTimeout(function(){ place.target.click(); }, 40); }
      });
    });
    if(isTransportList){
      var transportFilter = scroll.querySelector('.gm-new-home-transport-filter');
      var transportList = scroll.querySelector('.gm-new-home-place-list');
      var transportNoResults = scroll.querySelector('.gm-new-home-transport-no-results');
      var transportRows = transportList ? Array.prototype.slice.call(transportList.querySelectorAll('li')) : [];
      function filterTransportPlaces(){
        var query = normalizeText(transportFilter ? transportFilter.value : '').trim();
        var visible = 0;
        transportRows.forEach(function(row){
          var button = row.querySelector('.gm-new-home-place');
          var haystack = normalizeText(button ? button.textContent : row.textContent);
          var match = !query || haystack.indexOf(query) >= 0;
          row.hidden = !match;
          if(match) visible += 1;
        });
        if(transportNoResults) transportNoResults.hidden = visible !== 0;
      }
      if(transportFilter){
        transportFilter.addEventListener('input', filterTransportPlaces);
        transportFilter.addEventListener('search', filterTransportPlaces);
      }
    }
    scroll.scrollTop = 0;
  }

  function goBack(){
    if(currentView === 'wall-detail' && currentSection && currentCategory){ renderHistoryCategory(currentSection, currentCategory); }
    else if(currentView === 'aqueduct-detail' && currentSection && currentCategory){ renderHistoryCategory(currentSection, currentCategory); }
    else if(currentView === 'route-detail' && currentSection && currentCategory){ renderHistoryCategory(currentSection, currentCategory); }
    else if(currentView === 'events-favorites' && currentSection && currentCategory){ renderEventsCategory(currentSection, currentCategory); }
    else if((currentView === 'category' || currentView === 'qr-category' || currentView === 'games-category' || currentView === 'events-category') && currentSection){ renderSection(currentSection); }
    else if(currentView === 'section' && guideReturnActive){
      var guideSection = SECTIONS.find(function(item){ return item.key === 'guide'; });
      guideReturnActive = false;
      if(guideSection) renderGuide(guideSection, {preserve:true});
      else renderHome();
    }
    else if(currentView === 'guide'){ renderHome(); }
    else renderHome();
  }

  function updatePosition(){
    if(!overlay) return;
    var map = document.getElementById('map');
    var top = 0;
    if(map){
      var rect = map.getBoundingClientRect();
      if(isFinite(rect.top)) top = Math.max(0, Math.round(rect.top));
    }
    overlay.style.setProperty('--gm-nh-top', top+'px');
  }

  function closeSettings(){
    var wrap = document.querySelector('.settings-wrapper');
    var button = document.getElementById('btn-settings');
    if(wrap) wrap.classList.remove('open');
    if(button) button.setAttribute('aria-expanded','false');
  }

  function pushNewHomeLevel(){
    if(!window.history || typeof window.history.pushState !== 'function') return false;
    try{
      historyDepth += 1;
      window.history.pushState({gmNewHome:true, depth:historyDepth}, '');
      return true;
    }catch(_){
      historyDepth = Math.max(0, historyDepth - 1);
      return false;
    }
  }

  function hideNewHome(restoreFocus){
    overlay.hidden = true;
    document.documentElement.classList.remove('gm-new-home-open');
    var titleOpener = document.getElementById('title-btn');
    if(titleOpener) titleOpener.setAttribute('aria-expanded', 'false');
    var opener = lastOpener && document.documentElement.contains(lastOpener)
      ? lastOpener
      : document.getElementById('welcome-open-btn');
    lastOpener = null;
    if(restoreFocus !== false && opener) setTimeout(function(){ try{ opener.focus(); }catch(_){} }, 0);
  }

  function requestNewHomeBack(){
    if(historyDepth > 1 && window.history && typeof window.history.back === 'function'){
      window.history.back();
      return;
    }
    if(currentView !== 'home') goBack();
    else close();
  }

  function handleHistoryBack(){
    if(closingHistoryNavigation){
      closingHistoryNavigation = false;
      historyDepth = 0;
      return;
    }
    if(!overlay || overlay.hidden || historyDepth <= 0) return;
    if(historyDepth > 1){
      historyDepth -= 1;
      goBack();
      return;
    }
    historyDepth = 0;
    hideNewHome();
  }

  function open(opener){
    if(opener && opener.nodeType === 1) lastOpener = opener;
    else if(document.activeElement && document.activeElement.nodeType === 1) lastOpener = document.activeElement;
    closeSettings();
    try{
      if(window.__gmHomePanel && typeof window.__gmHomePanel.close === 'function') window.__gmHomePanel.close();
    }catch(_){}
    updatePosition();
    renderHome();
    overlay.hidden = false;
    document.documentElement.classList.add('gm-new-home-open');
    var titleOpener = document.getElementById('title-btn');
    if(titleOpener) titleOpener.setAttribute('aria-expanded', 'true');
    historyDepth = 0;
    pushNewHomeLevel();
    setTimeout(function(){ try{ closeButton.focus(); }catch(_){} }, 0);
  }

  function openGuide(opener){
    var guideSection = SECTIONS.find(function(item){ return item.key === 'guide'; });
    if(!guideSection) return false;
    if(opener && opener.nodeType === 1) lastOpener = opener;
    else if(document.activeElement && document.activeElement.nodeType === 1) lastOpener = document.activeElement;
    closeSettings();
    try{
      if(window.__gmHomePanel && typeof window.__gmHomePanel.close === 'function') window.__gmHomePanel.close();
    }catch(_){}
    updatePosition();
    renderGuide(guideSection, {preserve:false});
    overlay.hidden = false;
    document.documentElement.classList.add('gm-new-home-open');
    var titleOpener = document.getElementById('title-btn');
    if(titleOpener) titleOpener.setAttribute('aria-expanded', 'true');
    historyDepth = 0;
    // Mantiene la New Home come livello precedente: Indietro dalla guida torna alla Home.
    pushNewHomeLevel();
    pushNewHomeLevel();
    setTimeout(function(){ try{ closeButton.focus(); }catch(_){} }, 0);
    return true;
  }

  function close(restoreFocus){
    hideNewHome(restoreFocus);
    if(historyDepth > 0 && window.history && typeof window.history.go === 'function'){
      var levelsToRemove = historyDepth;
      historyDepth = 0;
      closingHistoryNavigation = true;
      window.history.go(-levelsToRemove);
      setTimeout(function(){ closingHistoryNavigation = false; }, 700);
    }
  }

  function openRouteDetails(routeId){
    var section = SECTIONS.find(function(item){ return item.key === 'routes'; });
    var category = section.categories.find(function(item){ return item.type === 'recommended-routes'; });
    var route = null;
    getRouteGroups().some(function(group){
      route = group.items.find(function(item){ return item.routeKey === routeId; });
      return !!route;
    });
    if(!route || !overlay) return false;
    // Usa la stessa pagina e lo stesso livello di cronologia dell'apertura dal menu.
    if(overlay.hidden) open(document.getElementById('title-btn'));
    renderSection(section); pushNewHomeLevel();
    renderHistoryCategory(section, category); pushNewHomeLevel();
    renderRouteDetail(section, category, route); pushNewHomeLevel();
    var map = window.map || window.__LEAFLET_MAP__;
    if(map && map.closePopup) map.closePopup();
    return true;
  }

  function boot(){
    createShell();
    // In cattura: funziona anche nei popup Leaflet ospitati nella mappa 3D.
    document.addEventListener('click', function(event){
      var button = event.target.closest && event.target.closest('button[data-home-route]');
      if(!button) return;
      event.preventDefault(); event.stopPropagation();
      openRouteDetails(button.getAttribute('data-home-route'));
    }, true);
    renderHome();
    var openers = [
      document.getElementById('title-btn'),
      document.getElementById('welcome-open-btn')
    ];
    openers.forEach(function(opener){
      if(!opener) return;
      opener.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        if(!overlay.hidden) close();
        else open(opener);
      });
    });
    var toolbar = document.querySelector('#app > header');
    if(toolbar){
      toolbar.addEventListener('click', function(event){
        if(overlay.hidden) return;
        if(event.target && event.target.closest && event.target.closest('#title-btn')) return;
        close(false);
      }, true);
    }
    document.addEventListener('keydown', function(event){
      if(event.key !== 'Escape' || overlay.hidden) return;
      requestNewHomeBack();
    }, true);
    if(window.GMNewHomeI18n) window.GMNewHomeI18n.attach(overlay, [HISTORY_LAYERS, AQUEDUCT_DETAIL_UI, ROUTE_DETAIL_UI]);
    document.addEventListener('app:set-lang', resetEventsAfterLanguageChange);
    window.addEventListener('i18n:changed', resetEventsAfterLanguageChange);
    document.addEventListener('genova:auth-changed', handleEventAuthChange);
    window.addEventListener('resize', updatePosition, {passive:true});
    window.addEventListener('popstate', handleHistoryBack);

    // Apertura iniziale della New Home: se l'app nasce da un deep link QR,
    // lasciamo subito libera la mappa per mostrare il relativo pannello Oggi/Ieri.
    // I vecchi link #qr=... restano coperti per compatibilita.
    var hasQrDeepLink = false;
    try{
      var startupUrl = new URL(window.location.href);
      hasQrDeepLink = !!String(startupUrl.searchParams.get('qr') || '').trim();
      if(!hasQrDeepLink){
        hasQrDeepLink = /^#qr=/.test(String(startupUrl.hash || ''));
      }
    }catch(_){}

    if(!hasQrDeepLink) open(document.getElementById('title-btn'));
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();

  window.gmOpenNewHome = open;
  window.gmOpenNewHomeGuide = openGuide;
  window.gmCloseNewHome = close;
  window.gmOpenNewHomeRoute = openRouteDetails;
})();
