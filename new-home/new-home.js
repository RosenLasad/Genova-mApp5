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

  var SECTIONS = [
    {
      key:'heritage', theme:'heritage', wide:true, title:'Patrimonio storico',
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
      description:'Trasporti pubblici e collegamenti per spostarsi a Genova e sul territorio.',
      categories:[
        {title:'Bus', note:'Fermate e rete urbana AMT', listId:'fav-list-bus', mapIcon:'icons/come-muoversi/autobus.svg', mapToggle:'.qt-bus'},
        {title:'Metropolitana', note:'Stazioni della metropolitana', listId:'fav-list-metro', mapIcon:'icons/come-muoversi/metropolitana.svg', mapToggle:'.qt-metro'},
        {title:'Treni', note:'Stazioni ferroviarie', listId:'fav-list-train', mapIcon:'icons/come-muoversi/treni.svg', mapToggle:'.qt-train'},
        {title:'Funicolari e ascensori', note:'Impianti verticali e cremagliere', listId:'fav-list-funi', mapIcon:'icons/come-muoversi/impianti-verticali.svg', mapToggle:'.qt-funi'},
        {title:'Navi e battelli', note:'Navebus e collegamenti marittimi', listId:'fav-list-mare', mapIcon:'icons/come-muoversi/navi-battelli.svg', mapToggle:'.qt-mare'},
        {title:'Aereo', note:'Aeroporto e collegamenti', listId:'fav-list-aereo', mapIcon:'icons/come-muoversi/aereo.svg', mapToggle:'.qt-aereo'}
      ]
    },
    {
      key:'routes', theme:'routes', wide:true, title:'Mura, acquedotti e percorsi',
      description:'Tracciati storici e itinerari consigliati per esplorare Genova passo dopo passo.',
      categories:[
        {title:'Mura storiche', note:'Le cinte murarie attraverso i secoli', type:'history-walls', mapIcon:'icons/passato/mura.svg', mapToggle:'.qt-mura-all'},
        {title:'Acquedotti', note:'Acquedotto romano e acquedotto storico', type:'history-aqueducts', mapIcon:'icons/passato/acquedotti.svg', mapToggle:'.qt-acq-all'},
        {title:'Percorsi consigliati', note:'Itinerari tematici nella città', type:'recommended-routes', mapIcon:'icons/passato/percorsi.svg', mapToggle:'.qt-percorsi-all'}
      ]
    },
    {
      key:'food', theme:'food', title:'Mangiare e dormire',
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
        {title:'Eventi', note:'Appuntamenti del giorno e della settimana'},
        {title:'Blog', note:'Commenti e conversazioni della comunità'},
        {title:'Contatti', note:'Scrivi agli amministratori dell’app', action:'contact'}
      ]
    },
    {
      key:'extra', theme:'extra', title:'Extra',
      description:'Giochi, premi e prodotti legati a Genova mApp.',
      categories:[
        {title:'Giochi', note:'Piccole esperienze interattive'},
        {title:'Premi', note:'Iniziative e vantaggi per gli utenti'},
        {title:'Shop', note:'Gadget e prodotti dedicati a Genova'}
      ]
    },
    {
      key:'guide', theme:'guide', wide:true, title:'Guida e istruzioni',
      description:'Scopri come utilizzare la mappa, i filtri, il Taccuino e tutti gli strumenti dell’app.',
      categories:[{title:'Apri la guida', note:'Istruzioni complete di Genova mApp', action:'guide'}]
    }
  ];

  var overlay, scroll, title, eyebrow, backButton, closeButton;
  var currentView = 'home';
  var currentSection = null;
  var currentCategory = null;
  var currentAqueduct = null;
  var historyDepth = 0;
  var closingHistoryNavigation = false;

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
      '    <div class="gm-new-home-heading"><span class="gm-new-home-eyebrow">Genova mApp</span><h2 class="gm-new-home-title" id="gm-new-home-title">Benvenuto</h2></div>'+
      '    <button type="button" class="gm-new-home-navbtn" id="gm-new-home-close" aria-label="Chiudi">'+
      '      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'+
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
    currentSection = null;
    currentAqueduct = null;
    overlay.setAttribute('dir', 'ltr');
    applyTheme(null);
    applyView(currentView);
    title.textContent = 'Benvenuto';
    eyebrow.textContent = 'Genova mApp';
    backButton.hidden = true;
    var cards = SECTIONS.map(function(section){
      return ''+
        '<article class="gm-new-home-card'+(section.wide?' is-wide':'')+'" data-theme="'+section.theme+'" data-section="'+section.key+'" role="button" tabindex="0" aria-label="'+escapeHtml(section.title)+': Scopri">'+
        '  <span class="gm-new-home-icon">'+icon(section.theme)+'</span>'+
        '  <h3>'+escapeHtml(section.title)+'</h3>'+
        '  <p>'+escapeHtml(section.description)+'</p>'+
        '  <span class="gm-new-home-discover" aria-hidden="true">Scopri</span>'+
        '</article>';
    }).join('');
    scroll.innerHTML = ''+
      '<div class="gm-new-home-intro">'+
      '  <h3>Che cosa vuoi scoprire?</h3>'+
      '  <p>Scegli un argomento e lasciati guidare tra luoghi, storie, servizi e contenuti.</p>'+
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
      button.addEventListener('click', activate);
      button.addEventListener('keydown', function(event){
        if(event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        activate();
      });
    });
    scroll.scrollTop = 0;
  }

  function renderSection(section){
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
        var sourceToggle = document.querySelector('#quick-toggles '+category.mapToggle);
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
      '  <div class="gm-new-home-detail-head"><h3>'+escapeHtml(section.title)+'</h3><p>'+escapeHtml(section.description)+'</p></div>'+
      '  <div class="gm-new-home-category-grid">'+categories+'</div>'+
      '</div>';
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
        var sourceToggle = document.querySelector('#quick-toggles '+category.mapToggle);
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
    var sourceToggle = document.querySelector('#quick-toggles '+category.mapToggle);
    var active = isMapToggleActive(sourceToggle);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    var mapActionLabel = (active ? 'Nascondi ' : 'Mostra ')+category.title.toLowerCase()+' sulla mappa';
    button.setAttribute('title', mapActionLabel);
    button.setAttribute('aria-label', mapActionLabel);
    var card = button.closest('.gm-new-home-category');
    if(card) card.classList.toggle('is-map-active', active);
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
          '<span><strong>'+escapeHtml(group.name)+'</strong><small>'+group.places.length+' '+(group.places.length === 1 ? 'luogo' : 'luoghi')+'</small></span>'+ 
          '<span class="gm-new-home-qr-chevron" aria-hidden="true">⌄</span>'+ 
        '</button>'+ 
        '<ul class="gm-new-home-qr-points gm-new-home-area-places">'+items+'</ul>'+ 
      '</section>';
    }).join('');

    scroll.innerHTML = '<div class="gm-new-home-detail gm-new-home-area-detail">'+
      '<div class="gm-new-home-detail-head"><h3>'+escapeHtml(category.title)+'</h3><p>'+escapeHtml(category.note)+'</p></div>'+ 
      '<div class="gm-new-home-qr-tools gm-new-home-area-tools">'+
        '<label class="gm-new-home-qr-search"><span class="sr-only">Cerca un luogo</span><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg><input type="search" class="gm-new-home-area-filter" placeholder="Cerca un luogo o un quartiere"></label>'+ 
        '<button type="button" class="gm-new-home-qr-expand gm-new-home-area-expand" aria-pressed="true">Chiudi tutti</button>'+ 
      '</div>'+ 
      '<p class="gm-new-home-qr-summary gm-new-home-area-summary" aria-live="polite">'+groups.length+' aree · '+total+' luoghi</p>'+ 
      '<div class="gm-new-home-qr-groups gm-new-home-area-groups">'+groupMarkup+'</div>'+ 
      '<div class="gm-new-home-empty gm-new-home-area-no-results" hidden>Nessun luogo o quartiere corrisponde alla ricerca.</div>'+ 
    '</div>';

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
      try{
        var appMap = null;
        if(typeof map !== 'undefined' && map && typeof map.setView === 'function') appMap = map;
        else if(window.map && typeof window.map.setView === 'function') appMap = window.map;
        else if(window.__map && typeof window.__map.setView === 'function') appMap = window.__map;
        if(appMap && isFinite(point.lat) && isFinite(point.lng)){
          var zoom = appMap.getZoom ? appMap.getZoom() : 16;
          appMap.setView([point.lat, point.lng], Math.max(Number(zoom) || 16, 17), {animate:true});
        }
      }catch(_){}
      try{
        if(typeof window.__qrOpenChildPanel === 'function'){
          window.__qrOpenChildPanel(point.name, point.descr, point.media, point.qrid);
        }
      }catch(_){}
      try{
        var hash = '#qr='+encodeURIComponent(point.qrid);
        if(window.history && window.history.replaceState) window.history.replaceState(null, '', hash);
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
        '<div class="gm-new-home-detail-head"><h3>Punti QR</h3><p>I punti QR sono in caricamento. Riapri questa sezione tra qualche istante.</p></div>'+ 
        '</div>';
      scroll.scrollTop = 0;
      return;
    }

    var groupMarkup = groups.map(function(group, groupIndex){
      var points = group.points.map(function(point, pointIndex){
        return '<li><button type="button" class="gm-new-home-qr-point" data-qr-group="'+groupIndex+'" data-qr-point="'+pointIndex+'">'+
          '<span>'+escapeHtml(point.name)+'</span><span aria-hidden="true">›</span></button></li>';
      }).join('');
      return '<section class="gm-new-home-qr-group" data-qr-group-panel="'+groupIndex+'">'+
        '<button type="button" class="gm-new-home-qr-group-toggle" aria-expanded="true">'+
          '<span><strong>'+escapeHtml(group.name)+'</strong><small>'+group.points.length+' '+(group.points.length === 1 ? 'punto' : 'punti')+'</small></span>'+ 
          '<span class="gm-new-home-qr-chevron" aria-hidden="true">⌄</span>'+ 
        '</button>'+ 
        '<ul class="gm-new-home-qr-points">'+points+'</ul>'+ 
      '</section>';
    }).join('');

    scroll.innerHTML = '<div class="gm-new-home-detail gm-new-home-qr-detail">'+
      '<div class="gm-new-home-detail-head"><h3>Punti QR</h3><p>Esplora '+total+' punti organizzati in '+groups.length+' zone e quartieri di Genova.</p></div>'+ 
      '<div class="gm-new-home-qr-tools">'+
        '<label class="gm-new-home-qr-search"><span class="sr-only">Cerca un punto QR</span><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg><input type="search" id="gm-new-home-qr-filter" placeholder="Cerca un punto QR o un quartiere"></label>'+ 
        '<button type="button" class="gm-new-home-qr-expand" id="gm-new-home-qr-expand" aria-pressed="true">Chiudi tutti</button>'+ 
      '</div>'+ 
      '<p class="gm-new-home-qr-summary" aria-live="polite">'+groups.length+' zone · '+total+' punti QR</p>'+ 
      '<div class="gm-new-home-qr-groups">'+groupMarkup+'</div>'+ 
      '<div class="gm-new-home-empty gm-new-home-qr-no-results" hidden>Nessun punto QR corrisponde alla ricerca.</div>'+ 
    '</div>';

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
          return {
            control:'route:'+route.id,
            name:route.name || route.id,
            note:'Percorso sulla mappa',
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
    var language = currentLanguage();
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

  function renderHistoryCategory(section, category){
    currentView = 'category';
    currentSection = section;
    currentCategory = category;
    currentAqueduct = null;
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
      '<div class="gm-new-home-detail-head"><h3>'+escapeHtml(category.title)+'</h3><p>'+escapeHtml(category.note)+'</p></div>'+ 
      '<div class="gm-new-home-layer-toolbar">'+
        '<label class="gm-new-home-layer-master-row"><span><strong>Mostra tutti</strong><small class="gm-new-home-layer-status">0 tracciati attivi</small></span><input class="gm-new-home-layer-master" type="checkbox" role="switch"><span class="gm-new-home-switch" aria-hidden="true"></span></label>'+
      '</div>'+lists+
      '<button type="button" class="gm-new-home-map-view">Chiudi e guarda la mappa</button>'+ 
    '</div>';

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

  function openCategory(section, category){
    applyTheme(section);
    if(category.action){ runExistingAction(category.action); return; }
    if(category.type === 'qr'){ renderQrCategory(section, category); return; }
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
    if(places.length){
      content = '<ul class="gm-new-home-place-list">'+places.map(function(place,index){
        return '<li><button type="button" class="gm-new-home-place" data-place="'+index+'">'+escapeHtml(place.name)+'</button></li>';
      }).join('')+'</ul>';
    }else{
      content = '<div class="gm-new-home-empty">La sezione è predisposta. Contenuti e collegamenti saranno completati nella prossima fase.</div>';
    }
    scroll.innerHTML = ''+
      '<div class="gm-new-home-detail">'+
      '  <div class="gm-new-home-detail-head"><h3>'+escapeHtml(category.title)+'</h3><p>'+escapeHtml(category.note)+'</p></div>'+
      content+
      '</div>';
    scroll.querySelectorAll('[data-place]').forEach(function(button){
      button.addEventListener('click', function(){
        var place = places[Number(button.getAttribute('data-place'))];
        if(place && place.target && place.target.click){ close(); setTimeout(function(){ place.target.click(); }, 40); }
      });
    });
    scroll.scrollTop = 0;
  }

  function goBack(){
    if(currentView === 'wall-detail' && currentSection && currentCategory){ renderHistoryCategory(currentSection, currentCategory); }
    else if(currentView === 'aqueduct-detail' && currentSection && currentCategory){ renderHistoryCategory(currentSection, currentCategory); }
    else if((currentView === 'category' || currentView === 'qr-category') && currentSection){ renderSection(currentSection); }
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

  function hideNewHome(){
    overlay.hidden = true;
    document.documentElement.classList.remove('gm-new-home-open');
    var opener = document.getElementById('welcome-open-btn');
    if(opener) setTimeout(function(){ try{ opener.focus(); }catch(_){} }, 0);
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

  function open(){
    closeSettings();
    updatePosition();
    renderHome();
    overlay.hidden = false;
    document.documentElement.classList.add('gm-new-home-open');
    historyDepth = 0;
    pushNewHomeLevel();
    setTimeout(function(){ try{ closeButton.focus(); }catch(_){} }, 0);
  }

  function close(){
    hideNewHome();
    if(historyDepth > 0 && window.history && typeof window.history.go === 'function'){
      var levelsToRemove = historyDepth;
      historyDepth = 0;
      closingHistoryNavigation = true;
      window.history.go(-levelsToRemove);
      setTimeout(function(){ closingHistoryNavigation = false; }, 700);
    }
  }

  function boot(){
    createShell();
    renderHome();
    var opener = document.getElementById('welcome-open-btn');
    if(opener){
      opener.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        open();
      });
    }
    document.addEventListener('keydown', function(event){
      if(event.key !== 'Escape' || overlay.hidden) return;
      requestNewHomeBack();
    }, true);
    document.addEventListener('app:set-lang', function(){
      if(currentView === 'aqueduct-detail' && currentSection && currentCategory && currentAqueduct){
        setTimeout(function(){ renderAqueductDetail(currentSection, currentCategory, currentAqueduct); }, 0);
      }
    });
    window.addEventListener('resize', updatePosition, {passive:true});
    window.addEventListener('popstate', handleHistoryBack);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();

  window.gmOpenNewHome = open;
  window.gmCloseNewHome = close;
})();
