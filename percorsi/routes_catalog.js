// percorsi/routes_catalog.js
(function(){
  // Catalogo percorsi (menu Percorsi)
  var catalog = {
  "Centro Storico": [
    {
      id: "cs-giornata-marinaio",
      name: "Giornata del marinaio",
      color: "#1414b8",
      data: null,
      related: {
        // Musei / luoghi musealizzati
        musei: [
          "casa-di-colombo"
        ],
        // Palazzi storici connessi al tema marittimo/economico
        palazzi: [
          "palazzo-san-giorgio",
          "palazzo-borsa"
        ],
        // Chiese nell’area del percorso
        chiese: [
          "san-agostino",
          "san-passione",
          "santa-maria-di-castello",
          "san-cosimo",
          "san-torpete",
          "san-giorgio",
          "san-marco"
        ],
        // QR “tematici”
        qr: [
          "molo",
          "seno-di-giano"
        ],
        // Nodi / storie delle mura che vuoi agganciare al percorso
        mura: [
          "storia-mura-pre-romane",
          "storia-mura-carolinge",
          "Mura del Barbarossa"
        ],
        // Documentari collegati al percorso
        documentari: [
          "storia-doc-seno-di-giano"
        ],
        // Al momento non hai forti, parchi, acquedotti specifici su questo itinerario
        forti: [],
        parchi_piazze: [],
        acquedotti: []
      }
    },
    {
      id: "cs-strada-doge",
      name: "Strada del Doge",
      color: "#1c39bb",
      data: null,
      related: {
        musei:        [],
        palazzi:      [],
        chiese:       [],
        qr:           [],
        mura:         [],
        documentari:  [],
        forti:        [],
        parchi_piazze:[],
        acquedotti:   []
      }
    }
  ],

  "Dentro le Mura Nuove": [
    {
      id: "dm-strada-cavaliere",
      name: "Strada del Cavaliere",
      color: "#ff0043",
      data: null,
      related: {
        musei:        [],
        palazzi:      [],
        chiese:       [],
        qr:           [],
        mura:         [],
        documentari:  [],
        forti:        [],
        parchi_piazze:[],
        acquedotti:   []
      }
    },
    {
      id: "dm-strada-balilla",
      name: "Strada del Balilla",
      color: "#ff0500",
      data: null,
      related: {
        musei:        [],
        palazzi:      [],
        chiese:       [],
        qr:           [],
        mura:         [],
        documentari:  [],
        forti:        [],
        parchi_piazze:[],
        acquedotti:   []
      }
    }
  ],

  "Fuori le Mura": [
    {
      id: "fm-percorso-poeti",
      name: "Percorso dei Poeti",
      color: "#177245",
      data: null,
      related: {
        musei:        [],
        palazzi:      [],
        chiese:       [],
        qr:           [],
        mura:         [],
        documentari:  [],
        forti:        [],
        parchi_piazze:[],
        acquedotti:   []
      }
    },
    {
      id: "fm-strada-borghese",
      name: "Strada Borghese",
      color: "#20603d",
      data: null,
      related: {
        musei:        [],
        palazzi:      [],
        chiese:       [],
        qr:           [],
        mura:         [],
        documentari:  [],
        forti:        [],
        parchi_piazze:[],
        acquedotti:   []
      }
    }
  ]
};


  // Esponi come globale "gentile"
  window.PERCORSI = catalog;

  // Registro layer attivi (se non già definito altrove)
  window.routeLayersById = window.routeLayersById || {};

  // Helper per trovare un percorso per ID (se ti serve ancora)
  window.getRouteById = function(rid){
    for (var cat in catalog){
      if (!Object.prototype.hasOwnProperty.call(catalog, cat)) continue;
      var arr = catalog[cat] || [];
      for (var i = 0; i < arr.length; i++){
        if (arr[i].id === rid){
          return { cat: cat, route: arr[i] };
        }
      }
    }
    return null;
  };

  // Helper per leggere il nome mostrato nel menu Percorsi
  window.getRouteDisplayName = function(routeId){
    var labelEl = document.querySelector(
      '.doc-row[data-route-id="' + routeId + '"] .label'
    );
    if (!labelEl) return "Percorso";
    return labelEl.textContent.trim();
  };
})();
