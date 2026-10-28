
(function(){
  function merge(dst, src){ for(var k in src){ if(Object.prototype.hasOwnProperty.call(src,k)){ if(src[k] && typeof src[k]==='object'){ dst[k]=dst[k]||{}; merge(dst[k],src[k]); } else { dst[k]=src[k]; } } } }
  window.I18N_DICT = window.I18N_DICT || {};
  if(typeof window.t !== 'function'){
    window.t = function(key){
      try{
        var lang = (document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0];
        var dict = (window.I18N_DICT && window.I18N_DICT[lang]) || (window.I18N_DICT && window.I18N_DICT.it) || {};
        return key.split('.').reduce(function(o,k){ return (o && o[k] != null) ? o[k] : null; }, dict) || '';
      }catch(_){ return ''; }
    };
  }

  var D = {
  it:{ toolbar:{ storia:{ label:"Storia",  menu:{
    mura:"Mura",
    acquedotti:"Acquedotti",
    doc:"Documentari",
    percorsi:"Percorsi",
    show_all:"Mostra tutto"
  } } } },

  en:{ toolbar:{ storia:{ label:"History", menu:{
    mura:"Walls",
    acquedotti:"Aqueducts",
    doc:"Documentaries",
    percorsi:"Routes",
    show_all:"Show all"
  } } } },

  es:{ toolbar:{ storia:{ label:"Historia",menu:{
    mura:"Murallas",
    acquedotti:"Acueductos",
    doc:"Documentales",
    percorsi:"Recorridos",
    show_all:"Mostrar todo"
  } } } },

  fr:{ toolbar:{ storia:{ label:"Histoire",menu:{
    mura:"Murailles",
    acquedotti:"Aqueducs",
    doc:"Documentaires",
    percorsi:"Parcours",
    show_all:"Tout afficher"
  } } } },

  ar:{ toolbar:{ storia:{ label:"تاريخ",    menu:{
    mura:"أسوار",
    acquedotti:"قنوات",
    doc:"أفلام وثائقية",
    percorsi:"المسارات",
    show_all:"عرض الكل"
  } } } },

  ru:{ toolbar:{ storia:{ label:"История",  menu:{
    mura:"Стены",
    acquedotti:"Акведуки",
    doc:"Документальные",
    percorsi:"Маршруты",
    show_all:"Показать всё"
  } } } },

  zh:{ toolbar:{ storia:{ label:"历史",      menu:{
    mura:"城墙",
    acquedotti:"渡槽",
    doc:"纪录片",
    percorsi:"路线",
    show_all:"全部显示"
  } } } },

  lij:{toolbar:{ storia:{ label:"Stöia",    menu:{
    mura:"Miâge",
    acquedotti:"Aqüeduti",
    doc:"Documentâi",
    percorsi:"Caminate",
    show_all:"Fanni vedde tutto"
  } } } }
};

  for(var lg in D){ window.I18N_DICT[lg]=window.I18N_DICT[lg]||{}; merge(window.I18N_DICT[lg], D[lg]); }

  function ensureButton(){
    if(document.getElementById('btn-storia')) return true;
    var legend = document.getElementById('legend') || document.querySelector('.toolbar');
    if(!legend) return false;
    var btn = document.createElement('button');
    btn.id = 'btn-storia';
    btn.type = 'button';
    btn.setAttribute('aria-haspopup','true');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('title', t('toolbar.storia.label') || 'Storia');
    btn.setAttribute('aria-label', t('toolbar.storia.label') || 'Storia');
    btn.innerHTML = '<img src="toolbar/storia.svg" class="toolbar-icon" alt="" aria-hidden="true">';
    var ref = document.getElementById('btn-gps') || document.querySelector('.toolbar #btn-gps, .toolbar .btn[data-role="gps"]');
    if(ref && ref.parentNode){ ref.after(btn); } else { legend.appendChild(btn); }
    return true;
  }

  function ensureMenu(){
    if(document.getElementById('storia-menu')) return true;
    var m = document.createElement('div');
    m.id = 'storia-menu';
    m.setAttribute('role','menu');
    m.innerHTML = [
      '<div class="st-section" data-sec="mura">',
        '<div class="st-header" role="button" tabindex="0" aria-expanded="false" aria-controls="storia-mura-panel">',
          '<div class="st-title"><span data-i18n="toolbar.storia.menu.mura">Mura</span></div>',
          '<svg class="st-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5l8 7-8 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        '</div>',
        '<div class="st-panel" id="storia-mura-panel">',
          '<label class="st-row">',
            '<input type="checkbox" id="storia-mura-all" />',
            '<span class="st-label" data-i18n="toolbar.storia.menu.show_all">Mostra tutto</span>',
          '</label>',
          '<div class="st-items" id="storia-mura-items"></div>',
        '</div>',
      '</div>',
      '<div class="st-section" data-sec="acquedotti">',
        '<div class="st-header" role="button" tabindex="0" aria-expanded="false" aria-controls="storia-acquedotti-panel">',
          '<div class="st-title"><span data-i18n="toolbar.storia.menu.acquedotti">Acquedotti</span></div>',
          '<svg class="st-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5l8 7-8 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        '</div>',
        '<div class="st-panel" id="storia-acquedotti-panel">',
          '<label class="st-row">',
            '<input type="checkbox" id="storia-acquedotti-all" />',
            '<span class="st-label" data-i18n="toolbar.storia.menu.show_all">Mostra tutto</span>',
          '</label>',
          '<div class="st-items" id="storia-acquedotti-items"></div>',
        '</div>',
      '</div>',
      '<div class="st-section" data-sec="doc">',
        '<div class="st-header" role="button" tabindex="0" aria-expanded="false" aria-controls="storia-doc-panel">',
          '<div class="st-title"><span data-i18n="toolbar.storia.menu.doc">Documentari</span></div>',
          '<svg class="st-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5l8 7-8 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        '</div>',
        '<div class="st-panel" id="storia-doc-panel">',
          '<label class="st-row">',
            '<input type="checkbox" id="storia-doc-all" />',
            '<span class="st-label" data-i18n="toolbar.storia.menu.show_all">Mostra tutto</span>',
          '</label>',
          '<div class="st-items" id="storia-doc-items"></div>',
        '</div>',
      '</div>',
       '<div class="st-section" data-sec="percorsi">',
        '<div class="st-header" role="button" tabindex="0" aria-expanded="false" aria-controls="storia-percorsi-panel">',
          '<div class="st-title"><span data-i18n="toolbar.storia.menu.percorsi">Percorsi</span></div>',
          '<svg class="st-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5l8 7-8 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        '</div>',
        '<div class="st-panel" id="storia-percorsi-panel">',
  '<label class="st-row">',
    '<input type="checkbox" id="storia-percorsi-all" />',
    '<span class="st-label" data-i18n="toolbar.storia.menu.show_all">Mostra tutto</span>',
  '</label>',
  '<div class="st-items" id="storia-percorsi-items"></div>',
'</div>',
'</div>'


    ].join('');
    document.body.appendChild(m);
    return true;
  }

  // ---- Dock/Undock helpers so the same Storia menu can live either as a floating menu (toolbar)
  // or as embedded content inside the Home panel accordion.
  function dockMenuInto(target){
    try{
      var menu = document.getElementById('storia-menu');
      if(!menu || !target) return false;
      // Clear target and move menu inside
      target.innerHTML = '';
      target.appendChild(menu);
      menu.classList.add('docked','open');
      menu.style.left = '';
      menu.style.top  = '';
      return true;
    }catch(_e){ return false; }
  }
  function undockMenuToBody(){
    try{
      var menu = document.getElementById('storia-menu');
      if(!menu) return false;
      if(menu.classList.contains('docked')){
        document.body.appendChild(menu);
        menu.classList.remove('docked');
      }
      // leave .open to be controlled by toolbar open/close
      menu.style.left = '';
      menu.style.top  = '';
      return true;
    }catch(_e){ return false; }
  }

  // expose to other modules (Home panel logic)
  window.__gmStoria = window.__gmStoria || {};
  window.__gmStoria.dock = dockMenuInto;
  window.__gmStoria.undock = undockMenuToBody;


  function wireOpenClose(){
    var btn = document.getElementById('btn-storia');
    var menu = document.getElementById('storia-menu');
    if(!btn || !menu) return;

    function placeMenu(){
      var r = btn.getBoundingClientRect();
      var wantUp = (window.innerHeight - r.bottom) < (menu.offsetHeight || 220);
      var top = wantUp ? (window.scrollY + r.top - (menu.offsetHeight || 220) - 8)
                       : (window.scrollY + r.bottom + 8);
      var left = window.scrollX + r.right - (menu.offsetWidth || 240);
      menu.style.left = left + 'px';
      menu.style.top  = top + 'px';
    }
    function open(){ if(window.__gmStoria && window.__gmStoria.undock) window.__gmStoria.undock(); placeMenu(); menu.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    function close(){ menu.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    function isOpen(){ return menu.classList.contains('open'); }
    function toggle(){ if(isOpen()) close(); else open(); }

    // Toggle on pointerdown (capture) so it wins over global listeners
    btn.addEventListener('pointerdown', function(e){ e.stopPropagation(); e.preventDefault(); toggle(); }, true);
    // Swallow click to avoid double toggle
    btn.addEventListener('click', function(e){ e.stopPropagation(); e.preventDefault(); });

    function outside(e){
      if(menu.contains(e.target) || btn.contains(e.target)) return;
      close();
    }
    document.addEventListener('pointerdown', outside, false);
    document.addEventListener('click', outside, false);
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });

    window.addEventListener('resize', function(){ if(isOpen()) placeMenu(); });
    window.addEventListener('scroll', function(){ if(isOpen()) placeMenu(); }, { passive:true });
  }

  function bindSectionDisclosure(){
    document.querySelectorAll('#storia-menu .st-section').forEach(function(sec){
      var header = sec.querySelector('.st-header');
      if(!header) return;
      function toggle(open){
        var isOpen = sec.classList.contains('open');
        if(open == null) open = !isOpen;
        sec.classList.toggle('open', open);
        header.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      header.addEventListener('click', function(e){ e.stopPropagation(); toggle(); });
      header.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); }
      });
    });
  }

  function applyI18n(){
    try{
      var nodes = document.querySelectorAll('#btn-storia, #storia-menu [data-i18n]');
      nodes.forEach(function(n){
        var key = n.id === 'btn-storia' ? 'toolbar.storia.label' : n.getAttribute('data-i18n');
        var txt = (typeof t === 'function') ? (t(key) || '') : (n.textContent || '');
        if(n.id === 'btn-storia'){ n.setAttribute('title', txt || 'Storia'); n.setAttribute('aria-label', txt || 'Storia'); }
        else { if(txt) n.textContent = txt; }
      });
    }catch(_){}
  }

  function bindShowAllPreMove(){
    var map = {
      'storia-mura-all':'st-mura',
      'storia-acquedotti-all':'st-acquedotti',
      'storia-doc-all':'st-minidoc'
    };
    Object.keys(map).forEach(function(allId){
      var all = document.getElementById(allId);
      var master = document.getElementById(map[allId]);
      if(!all || !master) return;

      all.addEventListener('change', function(){
        if(master.tagName === 'INPUT' && master.type === 'checkbox'){
          if(!!master.checked !== !!all.checked){ master.click(); }
        } else { master.click(); }
      });

      var sync = function(){
        if(master.tagName === 'INPUT' && master.type === 'checkbox'){
          all.indeterminate = false;
          all.checked = !!master.checked;
        }
      };
      try{ sync(); }catch(_){}
      try{ master.addEventListener('change', sync); }catch(_){}
    });
  }

  function boot(){
    if(!ensureButton()) return;
    if(!ensureMenu()) return;
    bindSectionDisclosure();
    wireOpenClose();
    bindShowAllPreMove();
    applyI18n();
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', boot); }
  else { boot(); }

  document.addEventListener('app:set-lang', applyI18n);
  try{ new MutationObserver(applyI18n).observe(document.documentElement, {attributes:true, attributeFilter:['lang']}); }catch(_){}
})();

;

(function(){
  function ensureMuraItemsContainer(){
    var panel = document.getElementById('storia-mura-panel') || document.querySelector('#storia-menu [data-sec="mura"] .st-panel');
    if(!panel) return null;
    var host = document.getElementById('storia-mura-items');
    if(!host){
      host = document.createElement('div');
      host.id = 'storia-mura-items';
      panel.appendChild(host);
    }
    return host;
  }
  function norm(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim(); }
  function findOriginalCheckbox(){
    var byId = document.querySelector('#chk-wall-romane');
    if(byId) return byId;
    var wanted = norm('Mura Romane');
    var labels = document.querySelectorAll('label');
    for(var i=0;i<labels.length;i++){
      var L = labels[i];
      var txt = norm(L.textContent);
      if(txt.indexOf(wanted) >= 0){
        var cb = L.querySelector('input[type="checkbox"]');
        if(cb) return cb;
      }
    }
    return null;
  }
  function addRow(host, original){
    var row = document.createElement('label');
    row.className = 'st-row';
    var cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = 'storia-mura-pre-romane';
    var span = document.createElement('span'); span.className = 'st-label'; span.textContent = 'Mura Pre-Romane (544 - 458 a.C.)';
    row.appendChild(cb); row.appendChild(span);
    host.appendChild(row);

    function syncFromOriginal(){
      try{
        var on = !!original.checked;
        cb.indeterminate = false;
        cb.checked = on;
      }catch(_){}
    }
    function applyToOriginal(state){
      try{
        if(original.tagName === 'INPUT' && original.type === 'checkbox'){
          if(!!original.checked !== !!state){ original.click(); }
        } else {
          if(state){ original.click(); } else { original.click(); }
        }
      }catch(_){}
    }

    cb.addEventListener('change', function(){ applyToOriginal(cb.checked); });
    try{ original.addEventListener('change', syncFromOriginal); }catch(_){}
    syncFromOriginal();
  }

  function bootOnce(){
    var host = ensureMuraItemsContainer();
    if(!host) return false;
    var orig = findOriginalCheckbox();
    if(!orig) return false;
    if(document.getElementById('storia-mura-pre-romane')) return true;
    addRow(host, orig);
    return true;
  }

  function waitAndRun(maxTries){
    var tries = 0, h = setInterval(function(){
      tries++;
      if(bootOnce()){ clearInterval(h); }
      else if(tries >= maxTries){ clearInterval(h); }
    }, 150);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ waitAndRun(50); });
  } else {
    waitAndRun(50);
  }
})();

;

(function(){
  // Mantieni APERTO il menu quando si clicca dentro il pannello Mura/Acquedotti/Doc
  function keepStoriaMenuOpen(){
    var menu = document.getElementById('storia-menu');
    if(!menu) return;
    ['pointerdown','mousedown','click'].forEach(function(ev){
      menu.addEventListener(ev, function(e){
        // Se il click è dentro il menu (voci, pannelli, righe), non farlo “uscire”
        if (e.target.closest('.st-panel') || e.target.closest('.st-items') || e.target.closest('.st-row')) {
          e.stopPropagation();
        }
      }, true); // fase capture: prima degli handler globali
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', keepStoriaMenuOpen);
  } else {
    keepStoriaMenuOpen();
  }
})();

;

(function(){
  function ensureMuraItemsContainer(){
    var panel = document.getElementById('storia-mura-panel') || document.querySelector('#storia-menu [data-sec="mura"] .st-panel');
    if(!panel) return null;
    var host = document.getElementById('storia-mura-items');
    if(!host){
      host = document.createElement('div');
      host.id = 'storia-mura-items';
      panel.appendChild(host);
    }
    return host;
  }
  function addRowBinding(host, rowId, labelText, legacySelector, legacyLabelFallback){
    if(document.getElementById(rowId)) return; // avoid duplicates
    var legacy = document.querySelector(legacySelector);
    if(!legacy && legacyLabelFallback){
      // fallback by matching label text
      var wanted = legacyLabelFallback.toLowerCase();
      var labels = document.querySelectorAll('label');
      for(var i=0;i<labels.length;i++){
        var L = labels[i];
        var txt = (L.textContent||'').toLowerCase();
        if(txt.indexOf(wanted) >= 0){
          var cb = L.querySelector('input[type="checkbox"]');
          if(cb){ legacy = cb; break; }
        }
      }
    }
    if(!legacy) return; // if still not found, skip silently

    var row = document.createElement('label');
    row.className = 'st-row';
    var cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = rowId;
    var span = document.createElement('span'); span.className = 'st-label'; span.textContent = labelText;
    row.appendChild(cb); row.appendChild(span);
    host.appendChild(row);

    function syncFromLegacy(){
      try{
        cb.indeterminate = false;
        cb.checked = !!legacy.checked;
      }catch(_){}
    }
    function applyToLegacy(state){
      try{
        if(legacy.tagName === 'INPUT' && legacy.type === 'checkbox'){
          if(!!legacy.checked !== !!state){ legacy.click(); }
        } else {
          if(state){ legacy.click(); } else { legacy.click(); }
        }
      }catch(_){}
    }
    cb.addEventListener('change', function(){ applyToLegacy(cb.checked); });
    try{ legacy.addEventListener('change', syncFromLegacy); }catch(_){}
    syncFromLegacy();
  }

  function bootOnce(){
    var host = ensureMuraItemsContainer();
    if(!host) return false;
    // Insert the 6 remaining items
    addRowBinding(host, 'storia-mura-carolinge',    'Mura Carolinge (848 - 889 d.C.)',      '#chk-wall-carolinge',    'Mura Carolinge');
    addRowBinding(host, 'storia-mura-barbarossa',   'Mura del Barbarossa (1155 - 1159)',    '#chk-wall-barbarossa',   'Mura del Barbarossa');
    addRowBinding(host, 'storia-mura-molo',         'Mura del Molo (1269)',                 '#chk-wall-porto',        'Mura del Molo');
    addRowBinding(host, 'storia-mura-repubblica',   'Mura della Repubblica (1346 – 1358)',  '#chk-wall-repubblica',   'Mura della Repubblica');
    addRowBinding(host, 'storia-mura-rinascimento', 'Mura del Rinascimento (1536 – 1553)',  '#chk-wall-rinascimento', 'Mura del Rinascimento');
    addRowBinding(host, 'storia-mura-nuove',        'Mura Nuove (1626 – 1639)',             '#chk-wall-nuove',        'Mura Nuove');
    return true;
  }

  function waitAndRun(maxTries){
    var tries = 0, h = setInterval(function(){
      tries++;
      if(bootOnce()){ clearInterval(h); }
      else if(tries >= maxTries){ clearInterval(h); }
    }, 150);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ waitAndRun(50); });
  } else {
    waitAndRun(50);
  }
})();

;

(function(){
  // Merge helper
  function merge(dst, src){ for(var k in src){ if(Object.prototype.hasOwnProperty.call(src,k)){ if(src[k] && typeof src[k]==='object'){ dst[k]=dst[k]||{}; merge(dst[k],src[k]); } else { dst[k]=src[k]; } } } }
  // t() polyfill if missing
  if(typeof window.t !== 'function'){
    window.t = function(key){
      try{
        var lang = (document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0];
        var dict = (window.I18N_DICT && window.I18N_DICT[lang]) || (window.I18N_DICT && window.I18N_DICT.it) || {};
        return key.split('.').reduce(function(o,k){ return (o && o[k] != null) ? o[k] : null; }, dict) || '';
      }catch(_){ return ''; }
    };
  }
  window.I18N_DICT = window.I18N_DICT || {};

  // Add translations for the 7 mura
  var D = {
    it:{storia:{mura:{
      pre_romane:"Mura Pre-Romane (544 – 458 a.C.)",
      carolinge:"Mura Carolinge (848 – 889 d.C.)",
      barbarossa:"Mura del Barbarossa (1155 – 1159)",
      molo:"Mura del Molo (1269)",
      repubblica:"Mura della Repubblica (1346 – 1358)",
      rinascimento:"Mura del Rinascimento (1536 – 1553)",
      nuove:"Mura Nuove (1626 – 1639)"
    }}},
    en:{storia:{mura:{
      pre_romane:"Pre-Roman Walls (544–458 BCE)",
      carolinge:"Carolingian Walls (848–889 CE)",
      barbarossa:"Barbarossa Walls (1155–1159)",
      molo:"Molo Walls (1269)",
      repubblica:"Republic Walls (1346–1358)",
      rinascimento:"Renaissance Walls (1536–1553)",
      nuove:"New Walls (1626–1639)"
    }}},
    es:{storia:{mura:{
      pre_romane:"Murallas prerromanas (544–458 a. C.)",
      carolinge:"Murallas carolingias (848–889 d. C.)",
      barbarossa:"Murallas de Barbarroja (1155–1159)",
      molo:"Murallas del muelle (1269)",
      repubblica:"Murallas de la República (1346–1358)",
      rinascimento:"Murallas del Renacimiento (1536–1553)",
      nuove:"Murallas nuevas (1626–1639)"
    }}},
    fr:{storia:{mura:{
      pre_romane:"Murailles préromaines (544–458 av. J.-C.)",
      carolinge:"Murailles carolingiennes (848–889 apr. J.-C.)",
      barbarossa:"Murailles de Barberousse (1155–1159)",
      molo:"Murailles du Môle (1269)",
      repubblica:"Murailles de la République (1346–1358)",
      rinascimento:"Murailles de la Renaissance (1536–1553)",
      nuove:"Nouvelles murailles (1626–1639)"
    }}},
    ar:{storia:{mura:{
      pre_romane:"أسوار ما قبل الرومان (544–458 ق.م)",
      carolinge:"أسوار الكارولنجيين (848–889 م)",
      barbarossa:"أسوار بربروسا (1155–1159)",
      molo:"أسوار المرفأ (1269)",
      repubblica:"أسوار الجمهورية (1346–1358)",
      rinascimento:"أسوار عصر النهضة (1536–1553)",
      nuove:"الأسوار الجديدة (1626–1639)"
    }}},
    ru:{storia:{mura:{
      pre_romane:"Доримские стены (544–458 до н. э.)",
      carolinge:"Каролингские стены (848–889 гг.)",
      barbarossa:"Стены Барбароссы (1155–1159)",
      molo:"Стены Моло (1269)",
      repubblica:"Стены Республики (1346–1358)",
      rinascimento:"Стены эпохи Возрождения (1536–1553)",
      nuove:"Новые стены (1626–1639)"
    }}},
    zh:{storia:{mura:{
      pre_romane:"前罗马城墙（公元前544–458年）",
      carolinge:"加洛林城墙（公元848–889年）",
      barbarossa:"巴巴罗萨城墙（1155–1159年）",
      molo:"码头城墙（1269年）",
      repubblica:"共和国时期城墙（1346–1358年）",
      rinascimento:"文艺复兴时期城墙（1536–1553年）",
      nuove:"新城墙（1626–1639年）"
    }}},
    lij:{storia:{mura:{
      pre_romane:"Mûre pre-romane (544–458 a.C.)",
      carolinge:"Mûre carolìnge (848–889 d.C.)",
      barbarossa:"Mûre do Barbarossa (1155–1159)",
      molo:"Mûre do Mô (1269)",
      repubblica:"Mûre da Repùbrica (1346–1358)",
      rinascimento:"Mûre do Rinascimento (1536–1553)",
      nuove:"Mûre Noêve (1626–1639)"
    }}}
  };
  for(var lg in D){ window.I18N_DICT[lg]=window.I18N_DICT[lg]||{}; merge(window.I18N_DICT[lg], D[lg]); }

  // Attach data-i18n keys to our 7 spans and update text
  var map = {
    'storia-mura-pre-romane': 'storia.mura.pre_romane',
    'storia-mura-carolinge': 'storia.mura.carolinge',
    'storia-mura-barbarossa': 'storia.mura.barbarossa',
    'storia-mura-molo': 'storia.mura.molo',
    'storia-mura-repubblica': 'storia.mura.repubblica',
    'storia-mura-rinascimento': 'storia.mura.rinascimento',
    'storia-mura-nuove': 'storia.mura.nuove'
  };

  function updateLabels(){
    Object.keys(map).forEach(function(cbId){
      var cb = document.getElementById(cbId);
      if(!cb) return;
      var label = cb.closest('label');
      if(!label) return;
      var span = label.querySelector('.st-label');
      if(!span) return;
      var key = map[cbId];
      span.setAttribute('data-i18n', key);
      var txt = (typeof t==='function') ? t(key) : '';
      if(txt){ span.textContent = txt; }
    });
  }

  function bootI18n(){
    updateLabels();
    // update on app:set-lang
    document.addEventListener('app:set-lang', updateLabels);
    // update when <html lang="…"> changes
    try{
      new MutationObserver(updateLabels).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
    }catch(_){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bootI18n);
  } else { bootI18n(); }
})();

;

(function(){
  function ensureAcqContainer(){
    var panel = document.getElementById('storia-acquedotti-panel') || document.querySelector('#storia-menu [data-sec="acquedotti"] .st-panel');
    if(!panel) return null;
    var host = document.getElementById('storia-acquedotti-items');
    if(!host){
      host = document.createElement('div');
      host.id = 'storia-acquedotti-items';
      panel.appendChild(host);
    }
    return host;
  }
  function norm(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim(); }
  function findLegacy(selector, labelFallback){
    var el = document.querySelector(selector);
    if(el) return el;
    if(labelFallback){
      var wanted = norm(labelFallback);
      var labels = document.querySelectorAll('label');
      for(var i=0;i<labels.length;i++){
        var L = labels[i];
        var txt = norm(L.textContent);
        if(txt.indexOf(wanted) >= 0){
          var cb = L.querySelector('input[type="checkbox"]');
          if(cb) return cb;
        }
      }
    }
    return null;
  }
  function addRow(host, rowId, i18nKey, fallbackText, legacySelector, legacyLabelFallback){
    if(document.getElementById(rowId)) return;
    var legacy = findLegacy(legacySelector, legacyLabelFallback);
    if(!legacy) return;

    var row = document.createElement('label');
    row.className = 'st-row';
    var cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = rowId;
    var span = document.createElement('span'); span.className = 'st-label'; span.setAttribute('data-i18n', i18nKey); span.textContent = fallbackText;
    row.appendChild(cb); row.appendChild(span);
    host.appendChild(row);

    function sync(){ try{ cb.indeterminate = false; cb.checked = !!legacy.checked; }catch(_){} }
    function apply(state){
      try{
        if(legacy.tagName === 'INPUT' && legacy.type === 'checkbox'){
          if(!!legacy.checked !== !!state){ legacy.click(); }
        } else { if(state){ legacy.click(); } else { legacy.click(); } }
      }catch(_){}
    }
    cb.addEventListener('change', function(){ apply(cb.checked); });
    try{ legacy.addEventListener('change', sync); }catch(_){}
    sync();
  }

  function boot(){
    var host = ensureAcqContainer();
    if(!host) return false;
    addRow(host, 'storia-acq-romano',  'storia.acq.romano',  'Acquedotto Romano (III sec. a.C.)',   '#chk-acq-romano',  'Acquedotto Romano');
    addRow(host, 'storia-acq-storico', 'storia.acq.storico', 'Acquedotto Storico (XVII sec.)',       '#chk-acq-storico', 'Acquedotto Storico');
    return true;
  }

  function waitAndRun(maxTries){
    var tries = 0, h = setInterval(function(){
      tries++;
      if(boot()){ clearInterval(h); }
      else if(tries >= maxTries){ clearInterval(h); }
    }, 150);
  }
  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', function(){ waitAndRun(50); }); }
  else { waitAndRun(50); }
})();

