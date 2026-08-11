
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
