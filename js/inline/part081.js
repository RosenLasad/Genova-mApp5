
(function(){
  var titleBtn = document.getElementById('title-btn');
  var home = document.getElementById('menu-home');
  var mapEl = document.getElementById('map');
  var bubble = document.getElementById('mh-bubble');
  var inner = bubble ? bubble.querySelector('.mh-bubble-inner') : null;
  var closeX = document.getElementById('mh-close');

  if(!titleBtn || !home || !mapEl || !bubble || !inner) return;

  // Helpers to transform bubble into an accordion below the clicked icon
  function placeBubbleUnder(btn){ try{ btn && btn.insertAdjacentElement && btn.insertAdjacentElement("afterend", bubble); }catch(_e){} }
  function openBubbleAfter(btn){ placeBubbleUnder(btn); bubble.classList.remove("hidden"); requestAnimationFrame(function(){ try{ bubble.style.maxHeight = bubble.scrollHeight + "px"; }catch(_e){} }); }

  function positionHomeUnderTitle(){
    try{
      var r = titleBtn.getBoundingClientRect();
      var margin = 8;
      // limite e ancoraggio basati sul rettangolo della mappa (non sul bottone titolo)
var mr = mapEl.getBoundingClientRect();

var maxW = Math.min(420, mr.width - 16);
if(maxW < 240) maxW = Math.min(420, window.innerWidth - 16); // safety se viewport strano

var left = mr.left;                 // <-- qui: filo bordo sinistro mappa
var rightLimit = mr.right - 8;      // evita che esca a destra dalla mappa

if(left + maxW > rightLimit) left = rightLimit - maxW;
if(left < mr.left) left = mr.left;

home.style.left = left + "px";
home.style.top  = (r.bottom + margin) + "px";


    }catch(_e){}
  }

function openHome(){
    positionHomeUnderTitle();
    home.classList.remove('hidden');
    titleBtn.classList.add('active');
    titleBtn.setAttribute('aria-expanded','true');
  }
  function closeHome(){
    home.classList.add('hidden');
    titleBtn.classList.remove('active');
    titleBtn.setAttribute('aria-expanded','false');
    closeBubble();
  }
  function isHomeOpen(){ return !home.classList.contains('hidden'); }

  titleBtn.addEventListener('click', function(e){ e.preventDefault(); isHomeOpen() ? closeHome() : openHome(); });
  mapEl.addEventListener('click', function(){ if(isHomeOpen()) closeHome(); });
  window.addEventListener('resize', function(){ if(isHomeOpen()) positionHomeUnderTitle(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && isHomeOpen()) closeHome(); });
  document.addEventListener('click', function(e){
    if(!isHomeOpen()) return;
    if(home.contains(e.target) || titleBtn.contains(e.target)) return;
    closeHome();
  });
  if(closeX){ closeX.addEventListener('click', function(e){ e.preventDefault(); closeHome(); }); }

  // menu starts OPEN (dropdown under the title)
closeHome();              // reset pulito (chiude anche eventuale bubble)


      // ---- Buttons ----
var sqorciBtn         = home.querySelector('.mh-item.gm-row[data-key="sqorci"]');
  var infoBtn           = home.querySelector('.mh-item.gm-row[data-key="info"]');
  var storiaBtn         = home.querySelector('.mh-item.gm-row[data-key="storia"]');
  var preferitiBtn      = home.querySelector('.mh-item.gm-row[data-key="preferiti"]');
  // Toolbar sync only for Storia and sQoRci (QR)
  function clickToolbarFor(key){
    try{
      var el = null;
      if(key==='storia'){
        el = document.getElementById('btn-opere')
          || document.getElementById('btn-storia')
          || document.querySelector('[data-action=\"storia\"], .toolbar [title=\"Storia\"], .toolbar button[aria-label=\"Storia\"]');
      }
      if(key==='sqorci'){
        el = null /* btn-qr removed */
          || document.querySelector('[data-action=\"qr\"], .toolbar [title=\"QR\"], .toolbar button[aria-label=\"QR\"], #btn-QR, #btn_QR');
      }
      if(el && typeof el.click === 'function'){ el.click(); }
    }catch(_){}
  }

  function clearActiveIcons(){
    try{
      home.querySelectorAll('.mh-item.active').forEach(function(x){
        x.classList.remove('active');
        try{ x.setAttribute('aria-expanded','false'); }catch(_){}
      });
    }catch(_){}
  }
  function setActiveIcon(btn){
    clearActiveIcons();
    if(btn){
      btn.classList.add('active');
      try{ btn.setAttribute('aria-expanded','true'); }catch(_){}
    }
  }
  function isBubbleOpen(){ return !bubble.classList.contains('hidden'); }
  function setTheme(key){
  bubble.classList.remove('theme-red','theme-green','theme-yellow','theme-azure','theme-orange','theme-blue','theme-gray');
  if(key==='storia')          bubble.classList.add('theme-red');
  if(key==='sqorci')          bubble.classList.add('theme-azure');
  if(key==='giochi')          bubble.classList.add('theme-orange');
  if(key==='info')            bubble.classList.add('theme-gray');
  if(key==='muoversi')        bubble.classList.add('theme-blue');
  if(key==='intrattenimento') bubble.classList.add('theme-yellow');   // nuovo
  if(key==='preferiti')      bubble.classList.add('theme-yellow');
}


function undockStoriaIfNeeded(){
  try{
    var m = document.getElementById('storia-menu');
    if(!m) return;
    // If the Storia menu is currently docked inside the Home bubble, move it back to <body>
    if(m.classList && m.classList.contains('docked')){
      try{
        if(window.__gmStoria && typeof window.__gmStoria.undock === 'function'){
          window.__gmStoria.undock();
          // Make sure it doesn't remain visible as a floating menu.
          try{ m.classList.remove('open'); }catch(__){}
          try{ var b=document.getElementById('btn-storia'); if(b) b.setAttribute('aria-expanded','false'); }catch(__){}
        }else{
          document.body.appendChild(m);
          m.classList.remove('docked');
          m.classList.remove('open');
          m.style.display = 'none';
          m.style.left = ''; m.style.top = '';
        }
      }catch(_e){
        try{ document.body.appendChild(m); }catch(__){}
        try{ m.classList.remove('docked'); m.classList.remove('open'); m.style.display='none'; }catch(__){}
      }
    }
  }catch(_){}
}


function undockFavIfNeeded(){
  try{
    var m = document.getElementById('fav-menu');
    if(!m) return;
    if(m.classList && m.classList.contains('docked-home')){
      try{ document.body.appendChild(m); }catch(__){}
      try{ m.classList.remove('docked-home'); }catch(__){}
      // reset floating state
      try{ m.classList.remove('open'); }catch(__){}
      try{ m.style.left=''; m.style.top=''; m.style.bottom=''; m.style.transform=''; }catch(__){}
      try{ m.setAttribute('aria-hidden','true'); }catch(__){}
    }
  }catch(_){}
}


// ---- Content builders ----
function openSqorci(){
  // language
  var lang = (function(){
    try{
      return localStorage.getItem('lang') ||
             document.documentElement.getAttribute('lang') ||
             'it';
    }catch(_){
      return document.documentElement.getAttribute('lang') || 'it';
    }
  })();

  // RTL se arabo
  try{
    if(lang === 'ar'){
      document.documentElement.setAttribute('dir','rtl');
    } else {
      document.documentElement.removeAttribute('dir');
    }
  }catch(_){}

  // Titolo "Punti QR" per lingue
  var TITLE2 = {
    it:  'Punti QR',
    en:  'QR Points',
    es:  'Puntos QR',
    fr:  'Points QR',
    ar:  'نقاط QR',
    ru:  'Точки QR',
    zh:  'QR 點位',
    lij: 'Punti QR'
  };

  if(!inner){
    var el = bubble && bubble.querySelector('.mh-bubble-inner');
    if(!el) return;
    inner = el;
  }

  // niente titolo, andiamo diretti alla lista
undockStoriaIfNeeded();
inner.innerHTML =
  '<div id="qr-shortcuts-panel" style="margin-top:.25rem"></div>';


  // monta subito il pannello con la lista dei punti QR
  try{
    if(window.renderQrList){
      window.renderQrList('#qr-shortcuts-panel');
      // doppio render di sicurezza, come faceva già il codice originale
      try{
        setTimeout(function(){
          if(window.renderQrList) window.renderQrList('#qr-shortcuts-panel');
        }, 120);
      }catch(_){}
    }
  }catch(_){}

  bubble.dataset.key = 'sqorci';
  setTheme('sqorci');
  setActiveIcon(sqorciBtn);
  openBubbleAfter(sqorciBtn);
}


  
  
function openInfo(){
  // detect language
  var lang = (function(){
    try{ return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it'; }
    catch(_){ return document.documentElement.getAttribute('lang') || 'it'; }
  })();

  // localized intro paragraph
  var BODY = {
    it: "Esplora Genova: storia, turismo e tempo libero. Apri Home, scegli e tocca i punti sulla mappa. Apri la GUIDA per tutte le funzioni.",
    lij: "Esplora Zêna: stòria, turiçmo e tenpo lìbbro. Àrvi Home, çerni e tòcca i ponti in sce a mappa. Àrvi a GUIDA pe tùtte e fonçioìn.",
    en: "Explore Genoa: history, tourism, and free time. Open Home, choose, and tap points on the map. Open the GUIDE for all features.",
    es: "Explora Génova: historia, turismo y tiempo libre. Abre Home, elige y toca los puntos en el mapa. Abre la GUÍA para ver todas las funciones.",
    fr: "Explorez Gênes : histoire, tourisme et temps libre. Ouvrez Home, choisissez et touchez les points sur la carte. Ouvrez le GUIDE pour toutes les fonctions.",
    ar: "استكشف جنوة: التاريخ والسياحة ووقت الفراغ. افتح Home، اختر واضغط على النقاط على الخريطة. افتح الدليل لمعرفة جميع الميزات.",
      ru: "Исследуйте Геную: история, туризм и досуг. Откройте Home, выберите и нажмите на точки на карте. Откройте РУКОВОДСТВО, чтобы увидеть все функции.",
    zh: "探索热那亚：历史、旅游与休闲。打开 Home，选择并点击地图上的点位。打开指南查看所有功能。"
  };

  // label for the guide button
  var GUIDE = {
    it: "Guida",
    lij:"Guida",
    en: "Guide",
    es: "Guía",
    fr: "Guide",
    ar: "الدليل",
    ru: "Руководство",
    zh: "指南"
  };

  // handle RTL
  try{ if(lang==='ar'){ document.documentElement.setAttribute('dir','rtl'); } else { document.documentElement.removeAttribute('dir'); } }catch(_){}

  var body = BODY[lang] || BODY.it;
  var gl = GUIDE[lang] || GUIDE.it;

  // If Storia menu is currently docked in the shared bubble, move it back before we swap content
  undockStoriaIfNeeded();

  // Compact content: paragraph + Guide button (opens the guide modal via the existing event)
  inner.innerHTML = ''
    + '<div class="gm-info-body">'
    + '  <p style="margin:.15rem 0 .65rem; opacity:.95;">'+ body +'</p>'
    + '  <button type="button" class="btn mh-btn gm-guide-open" aria-label="'+ gl +'" title="'+ gl +'">'
    + '    '+ gl
    + '  </button>'
    + '</div>';

  // bind guide click (dispatches the same event used by the original Info bubble)
  try{
    var b = inner.querySelector('.gm-guide-open');
    if(b){
      b.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        try{ document.dispatchEvent(new CustomEvent('app:open-guide', { detail:{ lang: lang } })); }catch(_){}
      }, {once:true});
    }
  }catch(_){}

  bubble.dataset.key = 'info';
  setTheme('info'); setActiveIcon(infoBtn); openBubbleAfter(infoBtn);
}


function openPreferiti(){
  if(!inner){
    var el = bubble && bubble.querySelector('.mh-bubble-inner');
    if(!el) return;
    inner = el;
  }

  // Non mischiamo menu dockati nello stesso bubble
  try{ undockStoriaIfNeeded(); }catch(_e){}
  try{ undockFavIfNeeded(); }catch(_e){}
  try{ undockFavIfNeeded(); }catch(_e){}

  var menu = document.getElementById('fav-menu');
  if(!menu){
    try{ inner.innerHTML = '<p>Menu Preferiti non disponibile.</p>'; }catch(_){}
    bubble.dataset.key = 'preferiti';
    setTheme('preferiti'); setActiveIcon(preferitiBtn); openBubbleAfter(preferitiBtn);
    return;
  }

  try{
    // prepara modalità "embedded"
    menu.classList.remove('open'); // lo gestiamo noi
    menu.classList.add('docked-home');
    menu.style.left = ''; menu.style.top = ''; menu.style.bottom = ''; menu.style.transform = '';

    inner.innerHTML = '';
    inner.appendChild(menu);

    // rinfresca traduzioni (serve anche per la label in Home)
    try{ if(window.i18nFavoritesApply) window.i18nFavoritesApply(); }catch(_){}
  }catch(_e){
    try{ inner.innerHTML = '<p>Menu Preferiti non disponibile.</p>'; }catch(_){}
  }

  bubble.dataset.key = 'preferiti';
  setTheme('preferiti'); setActiveIcon(preferitiBtn); openBubbleAfter(preferitiBtn);
}


function openStoria(){
  if(!inner){
    var el = bubble && bubble.querySelector('.mh-bubble-inner');
    if(!el) return;
    inner = el;
  }

  // Safety: if Storia was previously open and then closed, it may still be docked here.
  try{ undockStoriaIfNeeded(); }catch(_e){}
  try{ undockFavIfNeeded(); }catch(_e){}

  // Always make sure we don't accidentally "lose" the Storia menu when switching sections
  // (the Home panel reuses the same bubble container).
  function ensureMenuThen(cb){
    var m = document.getElementById('storia-menu');
    if(m){ cb(m); return; }

    // Nudge any lazy init by clicking the toolbar button once (if present).
    try{
      var btn = document.getElementById('btn-storia');
      if(btn && typeof btn.click === 'function') btn.click();
    }catch(_){}

    var tries = 0;
    (function tick(){
      var mm = document.getElementById('storia-menu');
      if(mm){ cb(mm); return; }
      if(++tries >= 30){ cb(null); return; }
      setTimeout(tick, 80);
    })();
  }

  // Show a quick loading placeholder while we ensure the menu exists.
  try{ inner.innerHTML = '<p style="opacity:.85">…</p>'; }catch(_){}

  ensureMenuThen(function(menu){
    if(menu){
      try{
        // If it was previously docked and then moved away, undock first so we get a clean state
        if(window.__gmStoria && typeof window.__gmStoria.undock === 'function'){
          try{ window.__gmStoria.undock(); }catch(_){}
        }else if(menu.classList && menu.classList.contains('docked')){
          try{ document.body.appendChild(menu); }catch(_){}
          try{ menu.classList.remove('docked'); }catch(_){}
        }

        if(window.__gmStoria && typeof window.__gmStoria.dock === 'function'){
          window.__gmStoria.dock(inner);
        }else{
          inner.innerHTML = '';
          inner.appendChild(menu);
          menu.classList.add('docked','open');
          menu.style.left = '';
          menu.style.top  = '';
        }
      }catch(_e){
        try{ inner.innerHTML = '<p>Menu Storia non disponibile.</p>'; }catch(_){}
      }
    }else{
      try{ inner.innerHTML = '<p>Menu Storia non disponibile.</p>'; }catch(_){}
    }

    bubble.dataset.key = 'storia';
    setTheme('storia'); setActiveIcon(storiaBtn); openBubbleAfter(storiaBtn);
  });
}

  function closeBubble(){
  // If Storia is currently docked inside the bubble, undock it first so we don't lose the menu
  // when other sections rewrite .mh-bubble-inner.
  try{ undockStoriaIfNeeded(); }catch(_e){}
  try{ undockFavIfNeeded(); }catch(_e){}
  try{ bubble.style.maxHeight = "0px"; }catch(_e){}
  try{ bubble.classList.add("hidden"); }catch(_e){}
  try{ bubble.dataset.key = ""; }catch(_e){}
  clearActiveIcons();
}

  // ---- Handlers ----
function onPercorsiClick(e){
  e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  var open = isBubbleOpen(), current = bubble.dataset.key || '';
  if(open && current==='percorsi'){ closeBubble(); }
  else {
    if(open){
      if(current==='sqorci'){ closeBubble(); }
      else { closeBubble(); }
    }
    openPercorsi();
  }
}
  function onSqorciClick(e){
  e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  var open = isBubbleOpen(), current = bubble.dataset.key || '';
  if(open && current==='sqorci'){ 
    closeBubble(); 
  } else {
    if(open && current==='storia'){ closeBubble(); }
    else if(open && current!=='sqorci'){ closeBubble(); }
    openSqorci();
  }
}
  
  function onInfoClick(e){
  e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  var open = isBubbleOpen(), current = bubble.dataset.key || '';
  if(open && current==='info'){ closeBubble(); }
  else {
    if(open){
      if(current==='sqorci'){ closeBubble(); }
      else { closeBubble(); }
    }
    openInfo();
  }
}


function onStoriaClick(e){
  e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  var open = isBubbleOpen(), current = bubble.dataset.key || '';
  if(open && current==='storia'){ closeBubble(); }
  else {
    if(open){ closeBubble(); }
    openStoria();
  }
}

function onPreferitiClick(e){
  e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  var open = isBubbleOpen(), current = bubble.dataset.key || '';
  if(open && current==='preferiti'){ closeBubble(); }
  else {
    if(open){ closeBubble(); }
    openPreferiti();
  }
}

// ---- Rebind buttons to avoid duplicate listeners ----
  function rebind(btn, handler){
    if(!btn) return null;
    var clone = btn.cloneNode(true);
    btn.parentNode.replaceChild(clone, btn);
    clone.addEventListener('click', handler, true);
    return clone;
  }
sqorciBtn          = rebind(sqorciBtn, onSqorciClick);
  infoBtn            = rebind(infoBtn, onInfoClick);
  storiaBtn          = rebind(storiaBtn, onStoriaClick);
  preferitiBtn       = rebind(preferitiBtn, onPreferitiClick);

  // Espone un helper per aprire sezioni del pannello Home (utile per i bottoni della toolbar)
  try{
    window.__gmHomePanel = window.__gmHomePanel || {};
    window.__gmHomePanel.open = openHome;
    window.__gmHomePanel.close = closeHome;
    window.__gmHomePanel.openSection = function(key){
      try{ openHome(); }catch(_){}
      try{
        if(key==='sqorci') return openSqorci();
        if(key==='info') return openInfo();
        if(key==='storia') return openStoria();
        if(key==='preferiti') return openPreferiti();
      }catch(_){}
    };
  }catch(_){}

})();

  /* ---- Position flag ribbon under toolbar title ---- */
  (function(){
    var ribbon = document.getElementById('flag-ribbon');
    var titleBtn = document.getElementById('title-btn');
    if(!ribbon || !titleBtn) return;
    function positionRibbon(){
      try{
        var r = titleBtn.getBoundingClientRect();
        var gap = 21; // vertical gap below toolbar title
        ribbon.style.left = (r.left) + 'px';
        ribbon.style.top  = (r.bottom + gap) + 'px';
      }catch(_){}
    }
    positionRibbon();
    window.addEventListener('resize', positionRibbon);
    window.addEventListener('scroll', positionRibbon, { passive: true });
  })();
