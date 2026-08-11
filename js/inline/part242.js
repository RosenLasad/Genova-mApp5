
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
