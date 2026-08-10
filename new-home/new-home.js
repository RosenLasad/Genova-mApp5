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
        {title:'Forti', note:'Fortificazioni e sistemi difensivi', listId:'fav-list-forti', grouped:true},
        {title:'Musei', note:'Arte, storia, scienza e collezioni', listId:'fav-list-musei', grouped:true},
        {title:'Chiese', note:'Edifici religiosi e opere d’arte', listId:'fav-list-chiese', grouped:true},
        {title:'Palazzi', note:'Dimore storiche e Palazzi dei Rolli', listId:'fav-list-palazzi', grouped:true}
      ]
    },
    {
      key:'entertainment', theme:'fun', title:'Intrattenimento',
      description:'Cultura, spettacolo, verde e attività per vivere la città nel tempo libero.',
      categories:[
        {title:'Mostre', note:'Esposizioni e spazi culturali', listId:'fav-list-mostre', grouped:true},
        {title:'Teatri', note:'Teatri storici e contemporanei', listId:'fav-list-teatri', grouped:true},
        {title:'Cinema', note:'Sale cinematografiche della città', listId:'fav-list-cinema', grouped:true},
        {title:'Parchi e piazze', note:'Aree verdi e luoghi d’incontro', listId:'fav-list-parchi-piazze', grouped:true},
        {title:'Sport', note:'Impianti e attività sportive', listId:'fav-list-sport', grouped:true}
      ]
    },
    {
      key:'transport', theme:'move', title:'Come muoversi',
      description:'Trasporti pubblici e collegamenti per spostarsi a Genova e sul territorio.',
      categories:[
        {title:'Bus', note:'Fermate e rete urbana AMT', listId:'fav-list-bus'},
        {title:'Metropolitana', note:'Stazioni della metropolitana', listId:'fav-list-metro'},
        {title:'Treni', note:'Stazioni ferroviarie', listId:'fav-list-train'},
        {title:'Funicolari e ascensori', note:'Impianti verticali e cremagliere', listId:'fav-list-funi'},
        {title:'Navi e battelli', note:'Navebus e collegamenti marittimi', listId:'fav-list-mare'},
        {title:'Aereo', note:'Aeroporto e collegamenti', listId:'fav-list-aereo'}
      ]
    },
    {
      key:'routes', theme:'routes', wide:true, title:'Mura, acquedotti e percorsi',
      description:'Tracciati storici e itinerari consigliati per esplorare Genova passo dopo passo.',
      categories:[
        {title:'Mura storiche', note:'Le cinte murarie attraverso i secoli'},
        {title:'Acquedotti', note:'Acquedotto romano e acquedotto storico'},
        {title:'Percorsi consigliati', note:'Itinerari tematici nella città'}
      ]
    },
    {
      key:'food', theme:'food', title:'Mangiare e dormire',
      description:'Locali, ristoranti, take-away e strutture per il soggiorno.',
      categories:[
        {title:'Locali', note:'Bar, pub e luoghi di ritrovo', listId:'fav-list-locali'},
        {title:'Ristoranti', note:'Cucina genovese e altre proposte'},
        {title:'Take-away', note:'Soluzioni rapide e da asporto'},
        {title:'Alberghi e B&B', note:'Dove dormire a Genova'}
      ]
    },
    {
      key:'media', theme:'media', title:'Multimedia',
      description:'Punti QR, documentari, audioguide e contenuti video dedicati alla città.',
      categories:[
        {title:'Punti QR', note:'Guarda com’erano i luoghi di Genova', type:'qr'},
        {title:'MiniDoc', note:'Brevi documentari dedicati a quartieri e luoghi', type:'minidoc'},
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

  function escapeHtml(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
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
    backButton.addEventListener('click', goBack);
    overlay.addEventListener('click', function(event){ if(event.target === overlay) close(); });
  }

  function renderHome(){
    currentView = 'home';
    currentSection = null;
    title.textContent = 'Benvenuto';
    eyebrow.textContent = 'Genova mApp';
    backButton.hidden = true;
    var cards = SECTIONS.map(function(section){
      return ''+
        '<article class="gm-new-home-card'+(section.wide?' is-wide':'')+'" data-theme="'+section.theme+'">'+
        '  <span class="gm-new-home-icon">'+icon(section.theme)+'</span>'+
        '  <h3>'+escapeHtml(section.title)+'</h3>'+
        '  <p>'+escapeHtml(section.description)+'</p>'+
        '  <button type="button" class="gm-new-home-discover" data-section="'+section.key+'">Scopri</button>'+
        '</article>';
    }).join('');
    scroll.innerHTML = ''+
      '<div class="gm-new-home-intro">'+
      '  <h3>Che cosa vuoi scoprire?</h3>'+
      '  <p>Scegli un argomento e lasciati guidare tra luoghi, storie, servizi e contenuti.</p>'+
      '</div>'+
      '<div class="gm-new-home-grid">'+cards+'</div>';
    scroll.querySelectorAll('[data-section]').forEach(function(button){
      button.addEventListener('click', function(){
        var section = SECTIONS.find(function(item){ return item.key === button.getAttribute('data-section'); });
        if(section) renderSection(section);
      });
    });
    scroll.scrollTop = 0;
  }

  function renderSection(section){
    currentView = 'section';
    currentSection = section;
    title.textContent = section.title;
    eyebrow.textContent = 'Esplora';
    backButton.hidden = false;
    var categories = section.categories.map(function(category, index){
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
      button.addEventListener('click', function(){
        var category = section.categories[Number(button.getAttribute('data-category'))];
        if(category) openCategory(section, category);
      });
    });
    scroll.scrollTop = 0;
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

  function openCategory(section, category){
    if(category.action){ runExistingAction(category.action); return; }
    if(category.type === 'qr'){ renderQrCategory(section, category); return; }
    currentView = 'category';
    currentSection = section;
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
    if((currentView === 'category' || currentView === 'qr-category') && currentSection){ renderSection(currentSection); }
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

  function open(){
    closeSettings();
    updatePosition();
    renderHome();
    overlay.hidden = false;
    document.documentElement.classList.add('gm-new-home-open');
    setTimeout(function(){ try{ closeButton.focus(); }catch(_){} }, 0);
  }

  function close(){
    overlay.hidden = true;
    document.documentElement.classList.remove('gm-new-home-open');
    var opener = document.getElementById('welcome-open-btn');
    if(opener) setTimeout(function(){ try{ opener.focus(); }catch(_){} }, 0);
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
      if(currentView !== 'home') goBack();
      else close();
    }, true);
    window.addEventListener('resize', updatePosition, {passive:true});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();

  window.gmOpenNewHome = open;
  window.gmCloseNewHome = close;
})();
