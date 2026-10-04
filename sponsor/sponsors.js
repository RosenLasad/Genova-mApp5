// sponsor/sponsors.js
// Genova mApp - Sponsor e spazi disponibili.
//
// Per aggiungere un nuovo sponsor reale basta aggiungere una voce sponsor({...}).
// Per mantenere uno spazio prenotabile usa slot("Categoria", "emoji", "sfondo", "testo").
(function(){
  'use strict';

  function sponsor(data){
    data = data || {};
    return {
      type: 'sponsor',
      name: data.name || '',
      url: data.url || '',
      ico: data.ico || '★',
      bg: data.bg || '#ffffff',
      fg: data.fg || '#111827'
    };
  }

  function slot(category, ico, bg, fg){
    return {
      type: 'slot',
      available: true,
      category: category || 'Sponsor',
      name: 'Spazio Sponsor',
      url: '',
      ico: ico || '★',
      bg: bg || '#fde68a',
      fg: fg || '#111827'
    };
  }

  var SDAC = function(){
    return sponsor({
      name: "SDAC - Scuola D'Arte Cinematografica",
      url: 'https://sdac.it',
      ico: '🎬',
      bg: '#111827',
      fg: '#ffffff'
    });
  };

  var ACQUARIO = function(bg, ico){
    return sponsor({
      name: 'Acquario',
      url: 'https://www.acquariodigenova.it/',
      ico: ico || '🐠',
      bg: bg || '#93c5fd',
      fg: '#111827'
    });
  };

  window.GM_SPONSORS = [
    slot('Trattoria / Ristorante', '🍝', '#fde68a', '#111827'),
    slot('Bar / Caffetteria', '☕', '#93c5fd', '#111827'),
    slot('Discoteca / Club', '⭐', '#a7f3d0', '#111827'),
    SDAC(),
    ACQUARIO('#93c5fd', '🐠'),
    slot('Enoteca / Vini', '🍷', '#fde68a', '#111827'),
    slot('Auto usate', '🚗', '#93c5fd', '#111827'),
    SDAC(),
    slot('Eventi sportivi', '⚽', '#93c5fd', '#111827'),

    slot('Pizzeria', '🍕', '#fde68a', '#111827'),
    slot('Pub / Birreria', '🍺', '#fde68a', '#111827'),
    slot('Enoteca / Wine bar', '🍷', '#93c5fd', '#111827'),
    slot('Pasticceria / Panificio', '🥐', '#fde68a', '#111827'),
    slot('Gelateria', '🍦', '#93c5fd', '#111827'),

    slot('Discoteca / Club', '🎶', '#fde68a', '#111827'),
    slot('Teatro', '🎭', '#93c5fd', '#111827'),
    slot('Cinema', '🎬', '#fde68a', '#111827'),
    slot('Live music / Locali musicali', '🎸', '#93c5fd', '#111827'),
    slot('Sala giochi / Escape room', '🎮', '#fde68a', '#111827'),
    slot('Galleria / Arte', '🎨', '#93c5fd', '#111827'),
    ACQUARIO('#fde68a', '🐠'),
    slot('Noleggio auto', '🚗', '#93c5fd', '#111827'),
    slot('Sauna e benessere', '🧖', '#fde68a', '#111827'),
    slot('Campi da calcio', '⚽', '#93c5fd', '#111827'),
    SDAC(),

    slot('Palestra', '🏋️', '#fde68a', '#111827'),
    slot('Yoga / Pilates', '🧘', '#93c5fd', '#111827'),
    slot('Centro benessere / Spa', '💆', '#fde68a', '#111827'),
    slot('Studio medico / Poliambulatorio', '🩺', '#93c5fd', '#111827'),
    slot('Farmacia', '💊', '#fde68a', '#111827'),

    slot('Hotel / B&B', '🏨', '#93c5fd', '#111827'),
    slot('Agenzia viaggi / Tour', '🧳', '#fde68a', '#111827'),
    slot('Escursioni mare / Porto', '🛥️', '#93c5fd', '#111827'),
    slot('Trasporti / Taxi', '🚖', '#fde68a', '#111827'),
    slot('Guide turistiche', '🗺️', '#93c5fd', '#111827'),
    SDAC(),

    slot('Banca', '🏦', '#fde68a', '#111827'),
    slot('Assicurazione', '🛡️', '#93c5fd', '#111827'),
    slot('Immobiliare', '🏢', '#fde68a', '#111827'),
    slot('Università / Scuola', '🎓', '#93c5fd', '#111827'),
    slot('Fondazione / Ente culturale', '🏛️', '#fde68a', '#111827'),
    slot('Museo / Cultura', '🏛️', '#93c5fd', '#111827'),

    slot('Negozio', '🛍️', '#fde68a', '#111827'),
    slot('Servizi digitali / IT', '🧑‍💻', '#93c5fd', '#111827'),
    slot('Stampa / Grafica', '🖨️', '#fde68a', '#111827'),
    slot('Artigiani / Manutenzione', '🔧', '#93c5fd', '#111827'),
    slot('Barche e Yacht', '🛥️', '#fde68a', '#111827')
  ];
})();
