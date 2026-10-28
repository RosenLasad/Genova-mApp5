
// === Percorsi: traduzioni dinamiche (categorie, voci, "Mostra tutti") ===
(function setupRoutesI18n(){
  const CAT_KEYS = {
    "Centro Storico": ["bubble.percorsi.btn.centro","bubble.percorsi.btn.centroStorico","bubble.percorsi.btn.centro-storico"],
    "Dentro le Mura Nuove": ["bubble.percorsi.btn.dentro","bubble.percorsi.btn.dentroMura","bubble.percorsi.btn.dentro-le-mura"],
    "Fuori le Mura": ["bubble.percorsi.btn.fuori","bubble.percorsi.btn.fuoriMura","bubble.percorsi.btn.fuori-le-mura"]
  };
  const SHOW_ALL = {
    it:"Mostra tutti", en:"Show all", fr:"Tout afficher", es:"Mostrar todos",
    ar:"عرض الكل", ru:"Показать все", zh:"显示全部", lij:"Fâ védde tùtti"
  };
  const ROUTE_LABELS = {
    it: {
      "cs-giornata-marinaio":"Giornata del marinaio",
      "cs-strada-doge":"Strada del Doge",
      "dm-strada-cavaliere":"Strada del Cavaliere",
      "dm-strada-balilla":"Strada del Balilla",
      "fm-percorso-poeti":"Percorso dei Poeti",
      "fm-strada-borghese":"Strada Borghese"
    },
    en: {
      "cs-giornata-marinaio":"Sailor’s Day",
      "cs-strada-doge":"Doge’s Way",
      "dm-strada-cavaliere":"Knight’s Road",
      "dm-strada-balilla":"Balilla Road",
      "fm-percorso-poeti":"Poets’ Path",
      "fm-strada-borghese":"Borghese Road"
    },
    fr: {
      "cs-giornata-marinaio":"Journée du marin",
      "cs-strada-doge":"Route du Doge",
      "dm-strada-cavaliere":"Route du Chevalier",
      "dm-strada-balilla":"Route du Balilla",
      "fm-percorso-poeti":"Sentier des Poètes",
      "fm-strada-borghese":"Route Borghese"
    },
    es: {
      "cs-giornata-marinaio":"Día del marinero",
      "cs-strada-doge":"Ruta del Dux (Doge)",
      "dm-strada-cavaliere":"Camino del Caballero",
      "dm-strada-balilla":"Camino del Balilla",
      "fm-percorso-poeti":"Ruta de los Poetas",
      "fm-strada-borghese":"Camino Borghese"
    },
    ar: {
      "cs-giornata-marinaio":"يوم البحّار",
      "cs-strada-doge":"طريق الدوجي",
      "dm-strada-cavaliere":"طريق الفارس",
      "dm-strada-balilla":"طريق باليلّا",
      "fm-percorso-poeti":"مسار الشعراء",
      "fm-strada-borghese":"طريق بورغيزي"
    },
    ru: {
      "cs-giornata-marinaio":"День моряка",
      "cs-strada-doge":"Дорога Дожа",
      "dm-strada-cavaliere":"Дорога Рыцаря",
      "dm-strada-balilla":"Дорога Балиллы",
      "fm-percorso-poeti":"Тропа поэтов",
      "fm-strada-borghese":"Дорога Боргезе"
    },
    zh: {
      "cs-giornata-marinaio":"海员日",
      "cs-strada-doge":"总督之路",
      "dm-strada-cavaliere":"骑士之路",
      "dm-strada-balilla":"巴利拉之路",
      "fm-percorso-poети":"诗人之路",
      "fm-strada-borghese":"博尔盖塞之路"
    },
    lij: {
      "cs-giornata-marinaio":"Giornâ do Marinæ",
      "cs-strada-doge":"Stradda do Duxe",
      "dm-strada-cavaliere":"Stradda do Cavalé",
      "dm-strada-balilla":"Stradda do Balilla",
      "fm-percorso-poeti":"Percòrso di Poêti",
      "fm-strada-borghese":"Stradda Borgéize"
    }
  };
  // Fix a small typo for zh key
  if(ROUTE_LABELS.zh["fm-percorso-poети"]){ ROUTE_LABELS.zh["fm-percorso-poeti"]=ROUTE_LABELS.zh["fm-percorso-poети"]; delete ROUTE_LABELS.zh["fm-percorso-poети"]; }

  function currentLang(){
    const l = (document.documentElement.getAttribute('lang') || 'it').toLowerCase();
    // normalize variants like 'pt-BR' -> 'pt'
    return l.split('-')[0];
  }

  function textFromBubble(keys){
    // Try i18n function first
    try{
      if(window.i18n && typeof window.i18n.t === 'function'){
        for(const k of keys){
          const v = window.i18n.t(k);
          if(v && typeof v === 'string') return v;
        }
      }
    }catch(_){}
    // Try DOM: look for elements with matching data-i18n
    for(const k of keys){
      const el = document.querySelector('[data-i18n="'+k+'"]');
      if(el && el.textContent.trim()) return el.textContent.trim();
      // aria-label variant
      const ar = document.querySelector('[data-i18n-aria-label="'+k+'"]');
      if(ar && ar.getAttribute('aria-label')) return ar.getAttribute('aria-label').trim();
      // title variant
      const tt = document.querySelector('[data-i18n-attr="title"][data-i18n-aria-label="'+k+'"]');
      if(tt && tt.getAttribute('title')) return tt.getAttribute('title').trim();
    }
    return null;
  }

  function translateCategories(){
  var wrap = document.getElementById('routes-menu');
  if(!wrap) return;

  Array.prototype.forEach.call(wrap.querySelectorAll('.acc-section'), function(sec){
    var catIt = sec.getAttribute('data-cat');
    if(!catIt) return;

    var keys = CAT_KEYS[catIt];
    var label = keys ? textFromBubble(keys) : null;
      // fallback: dictionary via ROUTE_LABELS (use cat mapping)
      if(!label){
        const lang = currentLang();
        const catMap = {
          it: {"Centro Storico":"Centro Storico","Dentro le Mura Nuove":"Dentro le Mura Nuove","Fuori le Mura":"Fuori le Mura"},
          en: {"Centro Storico":"Historic Center","Dentro le Mura Nuove":"Inside the New Walls","Fuori le Mura":"Outside the Walls"},
          fr: {"Centro Storico":"Centre historique","Dentro le Mura Nuove":"À l’intérieur des Murailles nouvelles","Fuori le Mura":"Hors les murs"},
          es: {"Centro Storico":"Centro histórico","Dentro le Mura Nuove":"Dentro de las Murallas Nuevas","Fuori le Mura":"Fuera de las murallas"},
          ar: {"Centro Storico":"المركز التاريخي","Dentro le Mura Nuove":"داخل الأسوار الجديدة","Fuori le Mura":"خارج الأسوار"},
          ru: {"Centro Storico":"Исторический центр","Dentro le Mura Nuove":"Внутри Новых стен","Fuori le Mura":"За пределами стен"},
          zh: {"Centro Storico":"历史中心","Dentro le Mura Nuove":"新城墙内","Fuori le Mura":"城墙外"},
          lij: {"Centro Storico":"Centro Stòrico","Dentro le Mura Nuove":"Dénto e Mûre Nêuve","Fuori le Mura":"Fœua de e Mûre"}
        }[lang] || {};
        label = catMap[catIt] || catIt;
      }
      const chip = sec.querySelector('.acc-title .chip');
      if(chip) chip.textContent = label;
    });
  }

  // removed translateShowAll (no master rows)

  function translateRoutes(){
  var lang = currentLang();

  var rows = document.querySelectorAll('#routes-menu .doc-row[data-route-id]');
  Array.prototype.forEach.call(rows, function(row){
    var rid = row.getAttribute('data-route-id');
    var txt = null;

    // 1) Try to read from a source element outside the menu with same data-route-id
    var src = document.querySelector('[data-route-id="' + rid + '"]:not(#routes-menu [data-route-id])');
    if (src){
      // prefer aria-label or title if present, else use textContent
      txt = (src.getAttribute && (src.getAttribute('aria-label') || src.getAttribute('title'))) || src.textContent;
      if (txt) txt = ('' + txt).trim();
    }

    // 2) Fallback to our dict
    if (!txt && ROUTE_LABELS[lang] && ROUTE_LABELS[lang][rid]) txt = ROUTE_LABELS[lang][rid];

    // 3) Fallback to Italian dict
    if (!txt && ROUTE_LABELS.it && ROUTE_LABELS.it[rid]) txt = ROUTE_LABELS.it[rid];

    // 4) Last resort: humanize id
    if (!txt){
      txt = rid
        .replace(/^[a-z]{2}-/,'')
        .replace(/-/g,' ')
        .replace(/\b\w/g, function(c){ return c.toUpperCase(); });
    }

    var labelSpan = row.querySelector('.label') || row.querySelector('span:not(.chip)');
    if (labelSpan) labelSpan.textContent = txt;
  });
}


  function updateRoutesMenuLabels(){
    translateCategories(); translateRoutes();
  }

  // Run on open
  const btn = document.getElementById('routes-btn');
  if(btn){
    btn.addEventListener('click', function(){
      // slight delay to ensure menu is in DOM/open
      setTimeout(updateRoutesMenuLabels, 0);
    });
  }
  // Run on language changes (observe <html lang>)
  const htmlEl = document.documentElement;
  try{
    const mo = new MutationObserver(function(muts){
      for(const m of muts){
        if(m.type==='attributes' && m.attributeName==='lang'){
          updateRoutesMenuLabels();
          break;
        }
      }
    });
    mo.observe(htmlEl, {attributes:true, attributeFilter:['lang']});
  }catch(_){}

  // Expose for manual refresh if needed
  window.updateRoutesMenuLabels = updateRoutesMenuLabels;
})();

;

// Keep routes menu open across language changes if it was open
(function persistOpenOnLang(){
  var menu = document.getElementById('routes-menu');
  if(!menu) return;
  var wasOpen = false;
  var htmlEl = document.documentElement;
  try{
    var mo2 = new MutationObserver(function(muts){
      for(const m of muts){
        if(m.type==='attributes' && m.attributeName==='lang'){
          // If menu was visible, keep it visible
          if(menu.style.display==='block'){
            // Reapply open after label update
            setTimeout(function(){ menu.style.display='block'; }, 0);
          }
          break;
        }
      }
    });
    mo2.observe(htmlEl, {attributes:true, attributeFilter:['lang']});
  }catch(_){}
})();

;

// Delegated: click on row/label toggles its checkbox (except when clicking directly on input/a/button)
(function ensureRouteRowClickToggleDelegated(){
  var menu = document.getElementById('routes-menu');
  if(!menu) return;
  menu.addEventListener('click', function(e){
    var row = e.target.closest('.doc-row[data-route-id]');
    if(!row || !menu.contains(row)) return;
    if(e.target.closest('input, a, button')) return;
    var chk = row.querySelector('input.route-chk');
    if(!chk) return;
    e.preventDefault();
    chk.checked = !chk.checked;
    chk.dispatchEvent(new Event('change', {bubbles:false}));
  });
})();

;

// === Percorsi: i18n per categorie e percorsi (senza 'Mostra tutti') ===
(function setupRoutesI18nMinimal(){
  if (window.__routesI18nReady) return; // avoid double init
  window.__routesI18nReady = true;

  // Fallback dizionari (usati solo se non troviamo le etichette nella bubble/icone Percorsi)
  const CAT_MAP = {
    it: {"Centro Storico":"Centro Storico","Dentro le Mura Nuove":"Dentro le Mura Nuove","Fuori le Mura":"Fuori le Mura"},
    en: {"Centro Storico":"Historic Center","Dentro le Mura Nuove":"Inside the New Walls","Fuori le Mura":"Outside the Walls"},
    fr: {"Centro Storico":"Centre historique","Dentro le Mura Nuove":"À l’intérieur des Murailles nouvelles","Fuori le Mura":"Hors les murs"},
    es: {"Centro Storico":"Centro histórico","Dentro le Mura Nuove":"Dentro de las Murallas Nuevas","Fuori le Mura":"Fuera de las murallas"},
    ar: {"Centro Storico":"المركز التاريخي","Dentro le Mura Nuove":"داخل الأسوار الجديدة","Fuori le Mura":"خارج الأسوار"},
    ru: {"Centro Storico":"Исторический центр","Dentro le Mura Nuove":"Внутри Новых стен","Fuori le Mura":"За пределами стен"},
    zh: {"Centro Storico":"历史中心","Dentro le Mura Nuove":"新城墙内","Fuori le Mura":"城墙外"},
    lij: {"Centro Storico":"Centro Stòrico","Dentro le Mura Nuove":"Dénto e Mûre Nêuve","Fuori le Mura":"Fœua de e Mûre"}
  };

  const ROUTE_FALLBACK = {
    it: {
      "cs-giornata-marinaio":"Giornata del marinaio",
      "cs-strada-doge":"Strada del Doge",
      "dm-strada-cavaliere":"Strada del Cavaliere",
      "dm-strada-balilla":"Strada del Balilla",
      "fm-percorso-poeti":"Percorso dei Poeti",
      "fm-strada-borghese":"Strada Borghese"
    },
    en: {
      "cs-giornata-marinaio":"Sailor’s Day",
      "cs-strada-doge":"Doge’s Way",
      "dm-strada-cavaliere":"Knight’s Road",
      "dm-strada-balilla":"Balilla Road",
      "fm-percorso-poeti":"Poets’ Path",
      "fm-strada-borghese":"Borghese Road"
    },
    fr: {
      "cs-giornata-marinaio":"Journée du marin",
      "cs-strada-doge":"Route du Doge",
      "dm-strada-cavaliere":"Route du Chevalier",
      "dm-strada-balilla":"Route du Balilla",
      "fm-percorso-poeti":"Sentier des Poètes",
      "fm-strada-borghese":"Route Borghese"
    },
    es: {
      "cs-giornata-marinaio":"Día del marinero",
      "cs-strada-doge":"Ruta del Dux (Doge)",
      "dm-strada-cavaliere":"Camino del Caballero",
      "dm-strada-balilla":"Camino del Balilla",
      "fm-percorso-poeti":"Ruta de los Poetas",
      "fm-strada-borghese":"Camino Borghese"
    },
    ar: {
      "cs-giornata-marinaio":"يوم البحّار",
      "cs-strada-doge":"طريق الدوجي",
      "dm-strada-cavaliere":"طريق الفارس",
      "dm-strada-balilla":"طريق باليلّا",
      "fm-percorso-poeti":"مسار الشعراء",
      "fm-strada-borghese":"طريق بورغيزي"
    },
    ru: {
      "cs-giornata-marinaio":"День моряка",
      "cs-strada-doge":"Дорога Дожа",
      "dm-strada-cavaliere":"Дорога Рыцаря",
      "dm-strada-balilla":"Дорога Балиллы",
      "fm-percorso-poeti":"Тропа поэтов",
      "fm-strada-borghese":"Дорога Боргезе"
    },
    zh: {
      "cs-giornata-marinaio":"海员日",
      "cs-strada-doge":"总督之路",
      "dm-strada-cavaliere":"骑士之路",
      "dm-strada-balilla":"巴利拉之路",
      "fm-percorso-poeti":"诗人之路",
      "fm-strada-borghese":"博尔盖塞之路"
    },
    lij: {
      "cs-giornata-marinaio":"Giornâ do Marinæ",
      "cs-strada-doge":"Stradda do Duxe",
      "dm-strada-cavaliere":"Stradda do Cavalé",
      "dm-strada-balilla":"Stradda do Balilla",
      "fm-percorso-poeti":"Percòrso di Poêti",
      "fm-strada-borghese":"Stradda Borgéize"
    }
  };

  function currentLang(){
    const l = (document.documentElement.getAttribute('lang') || 'it').toLowerCase();
    return l.split('-')[0];
  }

  function getTextFromSource(selectorList){
    // Trova la prima sorgente valida tra una lista di selettori
    for (const sel of selectorList){
      const el = document.querySelector(sel);
      if(el){
        const t = (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || '').trim();
        if(t) return t;
      }
    }
    return null;
  }

  function translateCategories(){
  var lang = currentLang();
  var menu = document.getElementById('routes-menu');
  if(!menu) return;

  var sections = menu.querySelectorAll('.acc-section');
  Array.prototype.forEach.call(sections, function(sec){
    var itKey = sec.getAttribute('data-cat'); // 'Centro Storico', etc.
    var label = null;

    // Prova a leggere da una possibile sorgente esterna (bubble/icone percorsi) con data-cat uguale
    label = getTextFromSource([
      '[data-cat="' + itKey + '"]:not(#routes-menu [data-cat])',
      '.percorsi [data-cat="' + itKey + '"]',
      '.toolbar [data-cat="' + itKey + '"]'
    ]);

    // Fallback
    if(!label){
      label = (CAT_MAP[lang] && CAT_MAP[lang][itKey]) || itKey;
    }

    var chip = sec.querySelector('.acc-title .chip');
    if(chip) chip.textContent = label;
  });
}

function translateRoutes(){
  var lang = currentLang();
  var menu = document.getElementById('routes-menu');
  if(!menu) return;

  var rows = menu.querySelectorAll('.doc-row[data-route-id]');
  Array.prototype.forEach.call(rows, function(row){
    var rid = row.getAttribute('data-route-id');

    // 1) Sorgente: pulsanti/icone percorsi esterni al menu con stesso data-route-id
    var txt = getTextFromSource([
      '[data-route-id="' + rid + '"]:not(#routes-menu [data-route-id])'
    ]);

    // 2) Fallback dizionario
    if(!txt){
      txt = (ROUTE_FALLBACK[lang] && ROUTE_FALLBACK[lang][rid]) ||
            (ROUTE_FALLBACK.it && ROUTE_FALLBACK.it[rid]) ||
            rid;
    }

    var labelSpan = row.querySelector('.label') || row.querySelector('span:not(.chip)');
    if(labelSpan) labelSpan.textContent = txt;
  });
}


  function updateRoutesMenuLabels(){
    translateCategories();
    translateRoutes();
  }
  window.updateRoutesMenuLabels = updateRoutesMenuLabels;

  // Aggiorna quando apro il menu Percorsi
  const btn = document.getElementById('routes-btn');
  if(btn){
    btn.addEventListener('click', function(){
      setTimeout(updateRoutesMenuLabels, 0);
    });
  }

  // Aggiorna al cambio lingua (mutazione di <html lang>)
  try{
    const mo = new MutationObserver(function(muts){
      for(const m of muts){
        if(m.type==='attributes' && m.attributeName==='lang'){
          updateRoutesMenuLabels();
          break;
        }
      }
    });
    mo.observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  }catch(_){}

  // Prima inizializzazione nel caso il menu sia già aperto
  setTimeout(updateRoutesMenuLabels, 0);
})();

;

// === Percorsi: Master 'Mostra tutti' (batch, robusto) ===
(function installRoutesMasterHandlers(){
  var menu = document.getElementById('routes-menu');
  if(!menu) return;

  // Flag batch
  window.__routesBatch = false;

  // Click sulla riga: toggla il master (escludendo input/link/bottoni)
  menu.addEventListener('click', function(e){
    var row = e.target.closest('#routes-menu .doc-row[data-action="show-all"]');
    if(!row) return;
    if(e.target.closest('input, a, button')) return;
    var master = row.querySelector('input.route-master-chk');
    if(!master) return;
    e.preventDefault();
    master.checked = !master.checked;
    master.dispatchEvent(new Event('change', {bubbles:false}));
  });

  // Cambio master -> batch toggle di tutti i figli
  document.addEventListener('change', async function(e){
    var master = e.target.matches && e.target.matches('#routes-menu input.route-master-chk') ? e.target : null;
    if(!master) return;
    var sec = master.closest('.acc-section');
    if(!sec) return;
    var items = Array.from(sec.querySelectorAll('.doc-row[data-route-id] input.route-chk'));
    var target = master.checked;
    window.__routesBatch = true;
    try{
      for (const chk of items){
        if (chk.checked !== target){
          chk.checked = target;
          chk.dispatchEvent(new Event('change', {bubbles:false}));
        }
      }
    } finally {
      window.__routesBatch = false;
      // Sync finale
      master.indeterminate = false;
      master.checked = target;
      if (target && typeof fitRoutesBounds === 'function') if(!window.__routesBatch) fitRoutesBounds();
    }
  }, true);

  // Cambio item -> sync del master (se non in batch)
document.addEventListener('change', function(e){
  var item = (e.target && e.target.matches && e.target.matches('#routes-menu .doc-row[data-route-id] input.route-chk'))
    ? e.target
    : null;
  if(!item) return;
  if(window.__routesBatch) return;

  var sec = item.closest ? item.closest('.acc-section') : null;
  if(!sec) return;

  var master = sec.querySelector('input.route-master-chk');
  if(!master) return;

  var checks = Array.prototype.slice.call(
    sec.querySelectorAll('.doc-row[data-route-id] input.route-chk')
  );

  var allOn = checks.every(function(c){ return c.checked; });
  var someOn = checks.some(function(c){ return c.checked; });

  master.checked = allOn;
  master.indeterminate = !allOn && someOn;
}, true);
})();


;

(function routesI18nMasters(){
  var SHOW_ALL = { it:"Mostra tutti", en:"Show all", fr:"Tout afficher", es:"Mostrar todos", ar:"عرض الكل", ru:"Показать все", zh:"显示全部", lij:"Fâ védde tùtti" };
  function currentLang(){
    var l=(document.documentElement.getAttribute('lang')||'it').toLowerCase();
    return l.split('-')[0];
  }
  function translateMasters(){
    var lang = currentLang();
    var txt = SHOW_ALL[lang] || SHOW_ALL.it;
    document.querySelectorAll('#routes-menu .doc-row[data-action="show-all"] .chip').forEach(function(el){ el.textContent = txt; });
  }
  // Hook into existing updater if present
  var prev = window.updateRoutesMenuLabels;
  window.updateRoutesMenuLabels = function(){
    if(prev) prev();
    translateMasters();
  };
  // Initial
  setTimeout(translateMasters, 0);
  // Keep open on lang change already handled; we only need to translate
  try{
    var mo = new MutationObserver(function(muts){
      for(var i=0;i<muts.length;i++){
        var m=muts[i];
        if(m.type==='attributes' && m.attributeName==='lang'){ translateMasters(); break; }
      }
    });
    mo.observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  }catch(_){}
})();

;

// === Percorsi consigliati: persistenza dei tracciati attivi ===
(function(){
  'use strict';

  var STORAGE_KEY = 'genova_routes_selected_v1';
  var restoring = false;

  function routeIdForCheckbox(checkbox){
    if(!checkbox) return '';
    var row = checkbox.closest('.doc-row[data-route-id]');
    return row ? String(row.getAttribute('data-route-id') || '') : '';
  }

  function loadSelected(){
    var selected = {};
    try{
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if(Array.isArray(parsed)){
        parsed.forEach(function(id){ if(id) selected[String(id)] = true; });
      }else if(parsed && typeof parsed === 'object'){
        Object.keys(parsed).forEach(function(id){
          if(parsed[id]) selected[String(id)] = true;
        });
      }
    }catch(_e){}
    return selected;
  }

  function saveSelected(){
    var selected = {};
    document.querySelectorAll('#routes-menu .doc-row[data-route-id] input.route-chk').forEach(function(checkbox){
      var routeId = routeIdForCheckbox(checkbox);
      if(routeId && checkbox.checked) selected[routeId] = true;
    });
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(selected)); }catch(_e){}
    return selected;
  }

  function applySavedToMenu(){
    var hasSavedState = false;
    try{ hasSavedState = localStorage.getItem(STORAGE_KEY) !== null; }catch(_e){}
    if(!hasSavedState) return false;

    var selected = loadSelected();
    var boxes = document.querySelectorAll('#routes-menu .doc-row[data-route-id] input.route-chk');
    if(!boxes.length) return false;

    restoring = true;
    boxes.forEach(function(checkbox){
      var routeId = routeIdForCheckbox(checkbox);
      var shouldBeChecked = !!selected[routeId];
      if(checkbox.checked !== shouldBeChecked){
        checkbox.checked = shouldBeChecked;
        checkbox.dispatchEvent(new Event('change', { bubbles:true }));
      }else if(shouldBeChecked){
        // La checkbox puo essere gia stata ripristinata prima che Leaflet fosse
        // pronto. In tal caso ridisegna comunque il percorso: addRoute e'
        // idempotente e non crea duplicati se il tracciato esiste gia.
        try{
          if(window.__routesFallback && typeof window.__routesFallback.addRoute === 'function'){
            window.__routesFallback.addRoute(routeId);
          }
        }catch(_e){}
      }
    });
    restoring = false;
    return true;
  }

  window.routesSelectionStore = {
    key: STORAGE_KEY,
    loadSelected: loadSelected,
    saveSelected: saveSelected,
    applySavedToMenu: applySavedToMenu
  };

  // Memorizza ogni attivazione/disattivazione proveniente dal menu principale,
  // dalla New Home o dal menu laterale Percorsi.
  document.addEventListener('change', function(event){
    if(restoring || !event.target || !event.target.matches) return;
    if(!event.target.matches('#routes-menu input.route-chk')) return;
    window.setTimeout(saveSelected, 0);
  }, true);

  // I dati e i controlli dei percorsi sono caricati poco prima di questo blocco;
  // i tentativi successivi coprono anche avvii piu lenti su dispositivi mobili.
  var attempts = 0;
  (function restoreWhenReady(){
    attempts += 1;
    var boxesReady = document.querySelector('#routes-menu .doc-row[data-route-id] input.route-chk');
    var dataReady = window.__ROUTE_DATA && Object.keys(window.__ROUTE_DATA).length;
    var mapReady = window.map && window.L && window.map._loaded;
    var routesReady = window.__routesFallback && typeof window.__routesFallback.addRoute === 'function';
    if(boxesReady && dataReady && mapReady && routesReady){
      applySavedToMenu();
      return;
    }
    if(attempts < 100) window.setTimeout(restoreWhenReady, 100);
  })();
})();

