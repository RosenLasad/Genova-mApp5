
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
