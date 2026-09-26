/* Genova mApp - Grifoncino: dialoghi guidati v0.2 */
(function(){
  'use strict';
  window.GMGriffoncinoDialogues = {
    welcome:{text:'Benvenuto su Genova mApp! Cosa ti andrebbe di fare oggi?',tone:'friendly',options:[
      {label:'Scoprire qualcosa',next:'discover'},
      {label:'Trovare qualcosa',next:'find'},
      {label:'Organizzare una visita',next:'plan'},
      {label:'Sorprendimi',action:'surprise'}
    ]},
    discover:{text:'Che cosa ti incuriosisce di più?',tone:'curious',options:[
      {label:'Storia',next:'history'},
      {label:'Luoghi',next:'places'},
      {label:'Curiosità',next:'curiosities'},
      {label:'Cultura e tradizioni',next:'culture'}
    ]},
    history:{text:'Da dove vuoi cominciare con la storia di Genova?',tone:'curious',options:[
      {label:'Forti',action:'showForti'},
      {label:'Musei',action:'showMuseums'},
      {label:'Chiese',action:'showChurches'},
      {label:'Palazzi',action:'showPalaces'}
    ]},
    places:{text:'Che tipo di posto vorresti esplorare?',tone:'friendly',options:[
      {label:'Parchi e piazze',action:'showParks'},
      {label:'Teatri',action:'showTheatres'},
      {label:'Cinema',action:'showCinema'},
      {label:'Mostre',action:'showExhibitions'}
    ]},
    curiosities:{text:'Ti va una scoperta casuale? Posso pescare un luogo dalla mappa.',tone:'curious',options:[
      {label:'Sì, sorprendimi',action:'surprise'},
      {label:'Preferisco scegliere',next:'discover'}
    ]},
    culture:{text:'Per cultura e tradizioni partirei da musei, chiese, palazzi o da una sorpresa.',tone:'friendly',options:[
      {label:'Musei',action:'showMuseums'},
      {label:'Chiese',action:'showChurches'},
      {label:'Palazzi',action:'showPalaces'},
      {label:'Sorprendimi',action:'surprise'}
    ]},
    find:{text:'Cosa stai cercando?',tone:'friendly',options:[
      {label:'Eventi',action:'events'},
      {label:'Mangiare e dormire',next:'food'},
      {label:'Come muoversi',next:'transport'},
      {label:'Un luogo sulla mappa',action:'openMap'}
    ]},
    food:{text:'Che cosa ti serve?',tone:'friendly',options:[
      {label:'Locali',action:'showFoodLocali'},
      {label:'Ristoranti',action:'showFoodRestaurants'},
      {label:'Take-away',action:'showFoodTakeaway'},
      {label:'Alberghi e B&B',action:'showFoodHotels'}
    ]},
    transport:{text:'Come vuoi muoverti?',tone:'curious',options:[
      {label:'Autobus',action:'showBus'},
      {label:'Treni',action:'showTrains'},
      {label:'Metro',action:'showMetro'},
      {label:'Altri trasporti',next:'transportMore'}
    ]},
    transportMore:{text:'Posso mostrarti anche questi collegamenti.',tone:'friendly',options:[
      {label:'Impianti verticali',action:'showVertical'},
      {label:'Navi e battelli',action:'showSea'},
      {label:'Aereo',action:'showAirport'}
    ]},
    plan:{text:'Come vuoi organizzare la visita?',tone:'curious',options:[
      {label:'Un percorso',action:'routes'},
      {label:'Vicino a me',action:'nearMe'},
      {label:'Un tema',next:'discover'},
      {label:'Esplora la mappa',action:'openMap'}
    ]},
    afterAction:{text:'Eccoci! Vuoi che ti aiuti ancora?',tone:'friendly',options:[
      {label:'Sì, continua',next:'welcome'},
      {label:'Fammi scoprire altro',next:'discover'},
      {label:'Organizza una visita',next:'plan'}
    ]},
    actionUnavailable:{text:'Questa scorciatoia non è disponibile qui, ma posso guidarti in un altro modo.',tone:'curious',options:[
      {label:'Torna alle scelte',next:'welcome'},
      {label:'Esplora la mappa',action:'openMap'}
    ]}
  };
})();
