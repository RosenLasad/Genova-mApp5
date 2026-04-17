// favorites.js extracted from inline.js for Genova mApp

/* ===== original part016.js ===== */

(function(){
  function normalize(s){
    return (s || "").toString().toLowerCase();
  }

  function applyFilter(root, query){
    var q = normalize(query.trim());
    var sections = root.querySelectorAll('.fav-acc-section[data-key]');

    sections.forEach(function(sec){
      var anyMatchSection = false;
      var subtitles = sec.querySelectorAll('.fav-subtitle');

      subtitles.forEach(function(h4){
        var ul = h4.nextElementSibling;
        if(!ul || !ul.classList.contains('fav-list')) return;

        var hasMatch = false;
        var items = ul.querySelectorAll('.fav-item');

        if(q){
          // Mostra SOLO le righe che matchano (case-insensitive)
          items.forEach(function(li){
            if(li.classList.contains('fav-empty')){
              li.style.display = 'none';
              return;
            }
            var nameEl = li.querySelector('.fav-name');
            var name = nameEl ? nameEl.textContent : li.textContent;
            var match = (normalize(name).indexOf(q) !== -1);
            li.style.display = match ? '' : 'none';
            if(match) hasMatch = true;
          });

          // Se in questo sottogruppo esiste almeno un match:
          // lo apro, altrimenti lo chiudo
          h4.setAttribute('aria-expanded', hasMatch ? 'true' : 'false');
          ul.style.display = hasMatch ? 'block' : 'none';
        } else {
          // Query vuota → ripristino visibilità righe + stato base: sottogruppi chiusi
          items.forEach(function(li){ li.style.display = ''; });
          h4.setAttribute('aria-expanded', 'false');
          ul.style.display = 'none';
        }

        if(hasMatch) anyMatchSection = true;
      });

      if(q){
        // Se almeno una sottovoce nella sezione matcha, apro la categoria
        sec.setAttribute('aria-expanded', anyMatchSection ? 'true' : 'false');
      } else {
        // Query vuota → richiudo tutte le categorie
        sec.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function init(){
    var root = document.getElementById('fav-menu');
    if(!root) return;
    var input = document.getElementById('fav-search');
    if(!input) return;

    input.addEventListener('input', function(){
      applyFilter(root, input.value || "");
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===== original part017.js ===== */

(function(){
  var TXT = {
    it:  { title:"I tuoi preferiti",        empty:"Nessun preferito attivo",      clear:"Svuota preferiti" },
    en:  { title:"Your favourites",         empty:"No favourites active",         clear:"Clear favourites" },
    es:  { title:"Tus favoritos",           empty:"Ningún favorito activo",       clear:"Vaciar favoritos" },
    fr:  { title:"Vos favoris",             empty:"Aucun favori actif",           clear:"Vider les favoris" },
    ru:  { title:"Ваши избранные",          empty:"Нет активных избранных",       clear:"Очистить избранное" },
    zh:  { title:"你的收藏",                  empty:"暂无激活的收藏",                  clear:"清空收藏" },
    ar:  { title:"المفضلات الخاصة بك",       empty:"لا توجد مفضلات مفعّلة",         clear:"مسح المفضلات" },
    lij: { title:"I teu preferî",           empty:"Nisciun preferî ativo",        clear:"Scancella preferî" }
  };


  function curLang(){
    var v;
    try{ v = localStorage.getItem('lang'); }catch(_){}
    if(!v) v = document.documentElement.getAttribute('lang') || 'it';
    v = String(v || 'it').toLowerCase().split(/[-_]/)[0];
    return TXT[v] ? v : 'it';
  }

    function applyTexts(){
    var lang = curLang();
    var t = TXT[lang] || TXT.it;
    var titleEl = document.getElementById('fav-notes-title');
    var emptyEl = document.getElementById('fav-notes-empty');
    var clearBtn = document.getElementById('fav-notes-clear');
    if(titleEl) titleEl.textContent = t.title;
    if(emptyEl) emptyEl.textContent = t.empty;
    if(clearBtn && t.clear) clearBtn.textContent = t.clear;
  }


  function btn(){ return document.getElementById('fav-notes-btn'); }
  function panel(){ return document.getElementById('fav-notes-panel'); }
  function listEl(){ return document.getElementById('fav-notes-list'); }
  function emptyEl(){ return document.getElementById('fav-notes-empty'); }

    function buildList(){
    var list = listEl();
    var empty = emptyEl();
    if(!list) return;

    list.innerHTML = "";
    if(empty) empty.style.display = "block";

    var items = Array.from(document.querySelectorAll('#fav-menu .fav-item.is-selected'));
    if(!items.length){
      return;
    }
    if(empty) empty.style.display = "none";

    items.forEach(function(li){
      var nameNode = li.querySelector('.fav-name') || li;
      var section  = li.closest('.fav-acc-section');
      var labelNode = section && section.querySelector('.fav-acc-title');
      var label = labelNode ? labelNode.textContent.trim() : "";
      var name  = nameNode ? nameNode.textContent.trim() : "";

      var row = document.createElement('li');
      row.className = 'fav-notes-item';

      // blocco sinistra: etichetta + nome
      var main = document.createElement('div');
      main.className = 'fav-notes-main';

      var labelSpan = document.createElement('div');
      labelSpan.className = 'fav-notes-label';
      labelSpan.textContent = label;

      var nameSpan = document.createElement('div');
      nameSpan.className = 'fav-notes-name';
      nameSpan.textContent = name;

      main.appendChild(labelSpan);
      main.appendChild(nameSpan);
      row.appendChild(main);

      // bottone "x" a destra per togliere il preferito
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'fav-notes-remove';
      removeBtn.textContent = '×';

      removeBtn.addEventListener('click', function(ev){
        try{
          ev.preventDefault();
          ev.stopPropagation();
        }catch(_){}

        // trova la stellina del preferito originale e spegnila
var starOn = li.querySelector('.fav-star-btn.on');
if(starOn && typeof starOn.click === 'function'){
  try{ starOn.click(); }catch(_){}
} else {
  // fallback: se per qualche motivo non è stata ricostruita la stellina su mappa, rimuovi comunque il preferito salvato
  try{ window.__favForceRemove && window.__favForceRemove(label, name); }catch(_){}
  try{ li.classList.remove('is-selected'); }catch(_){}
  try{
    var b = li.querySelector('.fav-star-btn');
    if(b){ b.classList.remove('on'); b.setAttribute('aria-pressed','false'); }
  }catch(_){}
}

// ricostruisci subito la lista del taccuino
        buildList();
      });

      row.appendChild(removeBtn);

      // clic sulla parte testuale = centra sulla mappa (come prima)
      main.addEventListener('click', function(ev){
        try{
          ev.preventDefault();
          ev.stopPropagation();
        }catch(_){}
        if(nameNode && typeof nameNode.click === 'function'){
          nameNode.click();
        }
      });

      list.appendChild(row);
    });
  }


  function openPanel(){
    var b = btn(), m = panel(); if(!b || !m) return;
    buildList();
    applyTexts();

    var r = b.getBoundingClientRect();
var y = r.bottom + 8;

m.style.top = y + "px";
m.style.bottom = "auto";

/* Ancora il pannello al bordo destro della mappa/viewport */
m.style.right = "0px";   // metti "8px" se vuoi un filo di margine
m.style.left = "auto";
m.style.transform = "none";


    m.classList.add('open');
    m.setAttribute('aria-hidden','false');
  }

  function closePanel(){
    var m = panel(); if(!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden','true');
  }

  function togglePanel(ev){
    if(ev){
      try{
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
      }catch(_){}
    }
    var m = panel(); if(!m) return;
    if(m.classList.contains('open')) closePanel();
    else openPanel();
  }

  function wire(){
    var b = btn();
    var m = panel();
    if(!b || !m) return;

    if(!b._favNotesBound){
      b.addEventListener('click', togglePanel);
      b._favNotesBound = true;
    }

    var cl = document.getElementById('fav-notes-close');
    if(cl && !cl._favNotesBound){
      cl.addEventListener('click', function(ev){
        try{
          ev.preventDefault();
          ev.stopPropagation();
        }catch(_){}
        closePanel();
      });
      cl._favNotesBound = true;
    }

    var clr = document.getElementById('fav-notes-clear');
    if(clr && !clr._favNotesBound){
      clr.addEventListener('click', function(ev){
        try{
          ev.preventDefault();
          ev.stopPropagation();
        }catch(_){}

        // Spegniamo tutti i preferiti attivi cliccando le stelline "on"
        var stars = document.querySelectorAll('#fav-menu .fav-item.is-selected .fav-star-btn.on');
        stars.forEach(function(btn){
          try{
            btn.click();   // usa la logica esistente di setFav / isFav / map ecc.
          }catch(_){}
        });

        // Ricostruisci elenco nel taccuino (che diventerà vuoto)
        buildList();
        applyTexts();
      });
      clr._favNotesBound = true;
    }


    // chiudi cliccando fuori
    window.addEventListener('pointerdown', function(ev){
      var t = ev.target;
      if(t && t.closest && (t.closest('#fav-notes-panel') || t.closest('#fav-notes-btn'))) return;
      closePanel();
    }, {capture:true});

    // chiudi con ESC
    window.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closePanel();
    }, {capture:true});
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      applyTexts();
      wire();
    });
  } else {
    applyTexts();
    wire();
  }

  document.addEventListener('app:set-lang', applyTexts);
})();

/* ===== original part018.js ===== */

(function(){
  if(window.__notes_toolbar_place_20251223__) return;
  window.__notes_toolbar_place_20251223__ = true;

  function place(){
    try{
      var btn = document.getElementById('fav-notes-btn');
      var bar = document.querySelector('header .toolbar-buttons');
      if(!btn || !bar) return;

      // Make it look/behave like the other toolbar buttons
      if(btn.type !== 'button') btn.type = 'button';
      if(!btn.classList.contains('btn')) btn.classList.add('btn');

      // Move into the right toolbar group
      var qr = bar.querySelector('#btn-qr-removed, #btn-scan, #btn-qr') ||
               bar.querySelector('[aria-label*="QR" i], [title*="QR" i]');
      var subWrap = bar.querySelector('.sub-wrapper');

      if(btn.parentNode !== bar){
        if(qr) bar.insertBefore(btn, qr);
        else if(subWrap) bar.insertBefore(btn, subWrap);
        else bar.appendChild(btn);
      } else {
        // If already there, keep it before QR / Abbonamento
        if(qr && btn.nextSibling !== qr) bar.insertBefore(btn, qr);
        else if(!qr && subWrap && btn.nextSibling !== subWrap) bar.insertBefore(btn, subWrap);
      }
    }catch(_){}
  }

  function boot(){
    place();
    setTimeout(place, 200);
    setTimeout(place, 800);
    setTimeout(place, 1600);
    setTimeout(place, 3200);
    try{
      var root = document.querySelector('header') || document.body;
      new MutationObserver(function(){ place(); }).observe(root, {childList:true, subtree:true});
    }catch(_){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

/* ===== original part129.js ===== */

(function(){
var $ = function(sel, root){
  root = root || document;
  return root.querySelector(sel);
};
var $$ = function(sel, root){
  root = root || document;
  return Array.prototype.slice.call(root.querySelectorAll(sel));
};
  const menu = $('#fav-menu');
  if(!menu) return;

  // Solo logica di accordion + riempimento liste.
  // L'apertura/chiusura del menu è gestita da fav-menu-toggle-js-20251105c

// Accordion delle sezioni (Autobus / Treno / Forti / Musei, ecc.)
$$('.fav-acc-section').forEach(function(sec){
  var head = $('.fav-acc-head', sec);
  if(!head) return;

  head.addEventListener('click', function(){
    var ex = sec.getAttribute('aria-expanded') === 'true';
    sec.setAttribute('aria-expanded', ex ? 'false' : 'true');
  });

  head.addEventListener('keydown', function(ev){
    if(ev.key === 'Enter' || ev.key === ' '){
      ev.preventDefault();
      head.click();
    }
  });
});


  // Riempimento lista "Forti"
  (function fillForti(){
    const list = document.getElementById('fav-list-forti');
    if(!list) return;
    list.innerHTML = '';
    const data = Array.isArray(window.FORTI_DATA) ? window.FORTI_DATA : [];
    if(!data.length){
      list.innerHTML = '<li class="fav-empty">Nessun forte disponibile</li>';
      return;
    }
    data.forEach(function(f){
  var li = document.createElement('li');
  li.className = 'fav-item';

  var span = document.createElement('span');
  span.className = 'fav-name';
  span.textContent = (f && f.name) ? f.name : 'Senza nome';

  li.appendChild(span);
  list.appendChild(li);
});
})();


  // Riempimento lista "Musei"
  (function fillMusei(){
    const list = document.getElementById('fav-list-musei');
    if(!list) return;
    const data = Array.isArray(window.MUSEI_DATA) ? window.MUSEI_DATA
               : (Array.isArray(window.MUSEI) ? window.MUSEI : []);
    if(!data.length){ return; }
    list.innerHTML = '';
    data.forEach(function(m){
  var li = document.createElement('li');
  li.className = 'fav-item';

  var span = document.createElement('span');
  span.className = 'fav-name';
  span.textContent = (m && m.name) ? m.name : 'Senza nome';

  li.appendChild(span);
  list.appendChild(li);
});
})();


  function fillSimpleList(listId, data, emptyText, getName){
    const list = document.getElementById(listId);
    if(!list) return;

    if(!Array.isArray(data) || !data.length){
      list.innerHTML = `<li class="fav-empty">${emptyText}</li>`;
      return;
    }

    list.innerHTML = '';
data.forEach(function(item){
  var li = document.createElement('li');
  li.className = 'fav-item';

  var span = document.createElement('span');
  span.className = 'fav-name';
  span.textContent = (getName(item) || 'Senza nome');

  li.appendChild(span);
  list.appendChild(li);
});
}

(function fillBus(){
  fillSimpleList(
    'fav-list-bus',
    window.BUS_STATIONS,
    'Nessuna fermata bus disponibile',
    function(p){ return p && p.name; }
  );
})();

(function fillTrain(){
  fillSimpleList(
    'fav-list-train',
    window.TRAIN_STATIONS,
    'Nessuna stazione disponibile',
    function(p){ return p && p.name; }
  );
})();

(function fillMetro(){
  fillSimpleList(
    'fav-list-metro',
    window.METRO_STATIONS,
    'Nessuna fermata metro disponibile',
    function(p){ return p && p.name; }
  );
})();

(function fillFuni(){
  fillSimpleList(
    'fav-list-funi',
    window.FUNI_POINTS,
    'Nessun impianto disponibile',
    function(p){ return p && p.name; }
  );
})();



      // Riempimento lista "Locali"
  function fillLocali(){
    const list = document.getElementById('fav-list-locali');
    if (!list) return;

    const data = Array.isArray(window.LOCALI_POINTS)
      ? window.LOCALI_POINTS
      : [];

    if (!data.length) {
      list.innerHTML = '<li class="fav-empty">Nessun locale disponibile</li>';
      return;
    }

    list.innerHTML = '';
data.forEach(function(loc){
  var li = document.createElement('li');
  li.className = 'fav-item';

  var span = document.createElement('span');
  span.className = 'fav-name';

  // supporto nomi multilingua: usa stringa o name.it
  span.textContent =
    (typeof loc.name === 'string'
      ? loc.name
      : ((loc.name && loc.name.it) || 'Senza nome'));

  li.appendChild(span);
  list.appendChild(li);
});
}


  // Aspetta che il DOM sia pronto prima di riempire la lista Locali
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillLocali);
  } else {
    fillLocali();
  }


})();

/* ===== original part130.js ===== */

(function(){
  var root = document.getElementById('fav-menu');
  if (!root) return;

  function setupSubgroups(){
    var subtitles = root.querySelectorAll('.fav-subtitle');
    subtitles.forEach(function(h4){
      // Evita doppia inizializzazione
      if (h4.dataset.subgroupInit === '1') return;

      var ul = h4.nextElementSibling;
      if (!ul || !ul.classList.contains('fav-list')) return;

      h4.dataset.subgroupInit = '1';

      // Stato iniziale: CHIUSO
      h4.setAttribute('role', 'button');
      h4.setAttribute('tabindex', '0');
      h4.setAttribute('aria-expanded', 'false');
      ul.style.display = 'none';

      function toggle(){
        var expanded = h4.getAttribute('aria-expanded') === 'true';
        var newExpanded = !expanded;
        h4.setAttribute('aria-expanded', newExpanded ? 'true' : 'false');
        ul.style.display = newExpanded ? 'block' : 'none';
      }

      h4.addEventListener('click', toggle);
            h4.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          toggle();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSubgroups);
  } else {
    setupSubgroups();
  }

  // In caso in futuro aggiorniamo le liste via evento custom
  window.addEventListener('fav:lists-updated', setupSubgroups);
})();

/* ===== original part131.js ===== */

(function(){
  function onReady(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function norm(s){
    s = (s == null) ? '' : String(s);
    try{
      if (s.normalize) s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }catch(_e){}
    return s.toLowerCase();
  }

  function rememberDisplay(el){
    if(!el) return;
    if(el.getAttribute('data-orig-display') == null){
      var cur = (el.style && el.style.display) ? el.style.display : '';
      el.setAttribute('data-orig-display', cur);
    }
  }
  function show(el){
    if(!el) return;
    rememberDisplay(el);
    el.style.display = el.getAttribute('data-orig-display') || '';
  }
  function hide(el){
    if(!el) return;
    rememberDisplay(el);
    el.style.display = 'none';
  }

  function setSectionExpanded(sec, on){
    if(!sec) return;
    sec.setAttribute('aria-expanded', on ? 'true' : 'false');
  }
  function setSubExpanded(h4, ul, on){
    if(!h4 || !ul) return;
    h4.setAttribute('aria-expanded', on ? 'true' : 'false');
    ul.style.display = on ? 'block' : 'none';
  }

  function reset(menu){
    var secs = menu.querySelectorAll('.fav-acc-section');
    for(var i=0;i<secs.length;i++){
      var sec = secs[i];
      show(sec);
      setSectionExpanded(sec, false);

      var h4s = sec.querySelectorAll('.fav-subtitle');
      for(var j=0;j<h4s.length;j++){
        var h4 = h4s[j];
        show(h4);
        var ul = h4.nextElementSibling;
        if(ul && ul.classList && ul.classList.contains('fav-list')){
          show(ul);
          setSubExpanded(h4, ul, false);

          var lis = ul.children;
          for(var k=0;k<lis.length;k++) show(lis[k]);
        }
      }
    }
  }

  function apply(menu, q){
    var query = norm(q).replace(/^\s+|\s+$/g,'');
    if(!query){ reset(menu); return; }

    var secs = menu.querySelectorAll('.fav-acc-section');
    for(var i=0;i<secs.length;i++){
      var sec = secs[i];
      var anySec = false;
      show(sec);

      var h4s = sec.querySelectorAll('.fav-subtitle');
      for(var j=0;j<h4s.length;j++){
        var h4 = h4s[j];
        var ul = h4.nextElementSibling;
        if(!ul || !ul.classList || !ul.classList.contains('fav-list')) continue;

        var anySub = false;

        var lis = ul.children;
        for(var k=0;k<lis.length;k++){
          var li = lis[k];
          var txt = norm(li.textContent || '');
          var ok = txt.indexOf(query) !== -1;
          if(ok){ show(li); anySub = true; anySec = true; }
          else hide(li);
        }

        if(anySub){
          show(h4);
          show(ul);
          setSubExpanded(h4, ul, true);
          setSectionExpanded(sec, true);
        }else{
          hide(h4);
          hide(ul);
          setSubExpanded(h4, ul, false);
        }
      }

      if(!anySec){
        hide(sec);
        setSectionExpanded(sec, false);
      }
    }
  }

  function init(){
    var menu  = document.getElementById('fav-menu');
    var input = document.getElementById('fav-search');
    if(!menu || !input) return;

    if(input.getAttribute('data-livefilter') === '1') return;
    input.setAttribute('data-livefilter','1');

    function applyPlaceholder(){
      try{
        if(typeof window.t === 'function'){
          var ph = window.t('fav.search');
          if(ph && ph !== 'fav.search'){
            input.placeholder = ph;
            input.setAttribute('aria-label', ph);
            if(!input.getAttribute('title')) input.setAttribute('title', ph);
          }
        }
      }catch(_e){}
    }
    applyPlaceholder();
    window.addEventListener('i18n:changed', applyPlaceholder);

    input.addEventListener('input', function(){
      apply(menu, input.value || '');
    });

    input.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape'){
        input.value = '';
        apply(menu, '');
        try{ input.blur(); }catch(_e){}
      }
    });
  }

  onReady(init);
})();

/* ===== original part133.js ===== */

(function(){
  const LS_KEY = 'genova_favstars_v1';
  function norm(s){ return (s||'').toString().trim().toLowerCase(); }
  function getLatLng(obj){
    if(!obj || typeof obj !== 'object') return null;
    let lat = null, lng = null;
    if(typeof obj.lat === 'number') lat = obj.lat;
    if(typeof obj.lng === 'number') lng = obj.lng;
    if(lat == null && typeof obj.latitude === 'number') lat = obj.latitude;
    if(lng == null && typeof obj.longitude === 'number') lng = obj.longitude;
    if(lng == null && typeof obj.lon === 'number') lng = obj.lon;
    if(lat != null && lng != null) return [lat, lng];
    return null;
  }
  function whenReady(fn){
    if (typeof L!=='undefined' && typeof window.map!=='undefined' && window.map && window.map.addLayer) fn();
    else window.addEventListener('load', function(){ if(typeof L!=='undefined' && window.map) fn(); });
  }

  // localStorage helpers
  function loadFavs(){
    try{ return JSON.parse(localStorage.getItem(LS_KEY) || '{}') || {}; }catch(_){ return {}; }
  }
  function saveFavs(obj){
    try{ localStorage.setItem(LS_KEY, JSON.stringify(obj||{})); }catch(_){}
  }
  function setFav(label, name, on){
    const key = (label||'') + '|' + norm(name);
    const favs = loadFavs();
    if(on) favs[key] = true;
    else delete favs[key];
    saveFavs(favs);
  }
  function isFav(label, name){
    const favs = loadFavs();
    return !!favs[(label||'') + '|' + norm(name)];
  }
  function eachFav(callback){
    const favs = loadFavs();
    Object.keys(favs).forEach(function(k){
      const i = k.indexOf('|');
      const label = k.substring(0, i >= 0 ? i : 0);
      const nm = k.substring(i+1);
      callback(label, nm);
    });
  }
  function clearAllFavs(){
    saveFavs({});
  }

  whenReady(function(){
    try{
      if(!map.getPane('pane-fav-stars')){ map.createPane('pane-fav-stars'); map.getPane('pane-fav-stars').style.zIndex = 610; }
    }catch(_){}
    var pane = 'pane-fav-stars';
    var FAV_STARS = window.FAV_STARS || (window.FAV_STARS = L.layerGroup());
    if(!map.hasLayer(FAV_STARS)){ FAV_STARS.addTo(map); }
    var byKey = {}; // "Label|nameNorm" -> star marker

    function ensureFavCategoryOn(label){
  // mappa label -> quick toggle
  var mapSel = {
    'Forte': '.qt-forti',
    'Museo': '.qt-museum',
    'Autobus': '.qt-bus',
    'Stazione': '.qt-train',
    'Metro': '.qt-metro',
    'Impianto': '.qt-funi',
    'Parco': '.qt-parchi',
    'Piazza': '.qt-parchi',      // parchi/piazze sono nello stesso toggle
    'Locale': '.qt-locali',
    'Mare': '.qt-mare',
    'Aeroporto': '.qt-aereo',
    'Chiesa': '.qt-chiese',
    'Palazzo': '.qt-palazzi',
    'Sport': '.qt-sport',
    'Cinema': '.qt-cinema',
    'Teatro': '.qt-teatri',
    'Mostra': '.qt-mostre'
  };

  var sel = mapSel[label];
  if(!sel) return;

  var btn = document.querySelector('#quick-toggles ' + sel);
  if(!btn) return;

  // i quick toggle aggiornano aria-pressed :contentReference[oaicite:4]{index=4}
  if(btn.getAttribute('aria-pressed') === 'true') return;
  btn.click();
}

function openFromFavStar(label, nameNorm){
  var index = getIndexByLabel(label);
  if(!index) return;

  var tries = 0, maxTries = 20;

  (function tick(){
    // 1) Prova a trovare il marker “vero” già caricato (non le stelline/cerchiolini nel pane preferiti)
    var latlng = index[nameNorm] || index[norm(nameNorm)];
    if(!latlng) return;

    var target = L.latLng(latlng[0], latlng[1]);
    var found = null;

    try{
      map.eachLayer(function(layer){
        if(found) return;
        if(layer && layer.options && layer.options.pane === pane) return; // ignora pane preferiti
        if(layer && typeof layer.getLatLng === 'function'){
          var ll = layer.getLatLng();
          if(ll && ll.distanceTo && ll.distanceTo(target) < 12) found = layer;
        }
      });
    }catch(_){}

    // 2) Se il marker vero esiste: apri il SUO popup e STOP (niente più riaperture fantasma)
    if(found){
      try{
        var p = (typeof found.getPopup === 'function') ? found.getPopup() : null;
        if(p) p.options.autoPan = false;
      }catch(_){}

      try{
        if(typeof found.openPopup === 'function') found.openPopup();
        else if(typeof found.fire === 'function') found.fire('click');
      }catch(_){}
      return;
    }

    // 3) Se non esiste ancora, aspetta un attimo. Solo all’ultimo tentativo usa il fallback.
    if(++tries < maxTries){
      setTimeout(tick, 150);
    } else {
      try{ openPopupAt(index, nameNorm, label); }catch(_){}
    }
  })();
}


function makeStar(lat, lng, label, nameNorm){
  var icon = L.divIcon({
    className: 'fav-star-icon',
    html: '★',
    iconSize: [18,18],
    iconAnchor: [9,9]
  });

  var m = L.marker([lat, lng], {
    icon: icon,
    pane: pane,
    interactive: true   // <-- prima era false :contentReference[oaicite:5]{index=5}
  });

  m.on('click', function(e){
    try{
      if(e && e.originalEvent) L.DomEvent.stop(e.originalEvent);
    }catch(_){}

    ensureFavCategoryOn(label);
    openFromFavStar(label, nameNorm);
  });

  return m;
}


    // Build indices (per category)
    var indexForti   = {},
    indexMusei   = {},
    indexBus     = {},
    indexTrain   = {},
    indexMetro   = {},
    indexFuni    = {},
    indexParks   = {},
    indexPiazze  = {},
    indexLocali  = {},
    indexMare    = {},
    indexAereo   = {},
    indexChiese  = {},
    indexPalazzi = {},
    indexSport   = {},
    indexCinema  = {},
    indexTeatri  = {},
    indexMostre  = {};


    // Esponiamo questi indici per altri script (Chiese/Palazzi, Sport/Cinema/Teatri/Mostre)
window.__FAV_INDEX_CHIESE  = indexChiese;
window.__FAV_INDEX_PALAZZI = indexPalazzi;
window.__FAV_INDEX_SPORT   = indexSport;
window.__FAV_INDEX_CINEMA  = indexCinema;
window.__FAV_INDEX_TEATRI  = indexTeatri;
window.__FAV_INDEX_MOSTRE  = indexMostre;



    try{ (Array.isArray(window.FORTI_DATA) ? window.FORTI_DATA : []).forEach(function(f){ var k=norm(f&&(f.name||f.title)); var ll=getLatLng(f); if(k&&ll) indexForti[k]=ll; }); }catch(_){}
    try{ (Array.isArray(window.MUSEI_DATA)?window.MUSEI_DATA:(Array.isArray(window.MUSEI)?window.MUSEI:[])).forEach(function(m){ var k=norm(m&&(m.name||m.title)); var ll=getLatLng(m); if(k&&ll) indexMusei[k]=ll; }); }catch(_){}
    try{ (Array.isArray(window.BUS_STATIONS)?window.BUS_STATIONS:[]).forEach(function(b){ var k=norm(b&&(b.name||b.title)); var ll=getLatLng(b); if(k&&ll) indexBus[k]=ll; }); }catch(_){}
    try{ (Array.isArray(window.TRAIN_STATIONS)?window.TRAIN_STATIONS:[]).forEach(function(t){ var k=norm(t&&(t.name||t.title)); var ll=getLatLng(t); if(k&&ll) indexTrain[k]=ll; }); }catch(_){}
    try{ (Array.isArray(window.METRO_STATIONS)?window.METRO_STATIONS:[]).forEach(function(mt){ var k=norm(mt&&(mt.name||mt.title)); var ll=getLatLng(mt); if(k&&ll) indexMetro[k]=ll; }); }catch(_){}
    try{ (Array.isArray(window.FUNI_POINTS)?window.FUNI_POINTS:[]).forEach(function(fp){ var k=norm(fp&&(fp.name||fp.title)); var ll=getLatLng(fp); if(k&&ll) indexFuni[k]=ll; }); }catch(_){}
    try{ (Array.isArray(window.PARKS_POINTS)?window.PARKS_POINTS:[]).forEach(function(pp){ var k=norm(pp&&(pp.name||pp.title)); var ll=getLatLng(pp); if(k&&ll) indexParks[k]=ll; }); }catch(_){}
    try{ (Array.isArray(window.PIAZZE_POINTS)?window.PIAZZE_POINTS:[]).forEach(function(pz){ var k=norm(pz&&(pz.name||pz.title)); var ll=getLatLng(pz); if(k&&ll) indexPiazze[k]=ll; }); }catch(_){}
    try{ (Array.isArray(window.LOCALI_POINTS)?window.LOCALI_POINTS:(Array.isArray(window.LOCALI)?window.LOCALI:[])).forEach(function(lc){ var k=norm(lc&&(lc.name||lc.title)); var ll=getLatLng(lc); if(k&&ll) indexLocali[k]=ll; }); }catch(_){}

try{
  (Array.isArray(window.MARE_POINTS) ? window.MARE_POINTS : []).forEach(function(p){
    var n = (p.name || p.title || '').toString().trim();
    if(!n) return;
    var k = norm(n);
    var ll = getLatLng(p);
    if(k && ll) indexMare[k] = ll;   // [lat, lng]
  });
}catch(_){}

try{
  (Array.isArray(window.AEREO_POINTS) ? window.AEREO_POINTS : []).forEach(function(p){
    var n = (p.name || p.title || '').toString().trim();
    if(!n) return;
    var k = norm(n);
    var ll = getLatLng(p);
    if(k && ll) indexAereo[k] = ll;  // [lat, lng]
  });
}catch(_){}


    function keyFor(label, name){ return (label||'') + '|' + norm(name); }

    function ensureStarByNorm(index, nameNorm, label){
      var latlng = index[nameNorm]; if(!latlng) return false;
      var key = (label||'') + '|' + nameNorm;
      if(byKey[key]) return true;

      var m = makeStar(latlng[0], latlng[1], label, nameNorm);
      try{ m.addTo(FAV_STARS); }catch(_){}
      byKey[key] = m;
      return true;
    }

// Esporta una rimozione "forzata" (utile quando la stellina su mappa non è stata ancora ricostruita)
window.__favForceRemove = function(label, name){
  try{
    var key = keyFor(label, name);
    if(byKey[key]){
      try{ FAV_STARS.removeLayer(byKey[key]); }catch(_){}
      delete byKey[key];
    }
    setFav(label, name, false);
  }catch(_){}
};


function getRouteColor(rid){
  try{
    if (window.__ROUTE_DATA && window.__ROUTE_DATA[rid] && window.__ROUTE_DATA[rid].color){
      return window.__ROUTE_DATA[rid].color;
    }
  }catch(_){}
  return '#ef4444'; // fallback
}

function makeRouteDot(lat, lng, label, nameNorm, rid){
  var col = getRouteColor(rid);

  var icon = L.divIcon({
    className: 'route-fav-dot-icon',
    html: '<span class="route-fav-dot" style="--dot:'+col+'"></span>',
    iconSize: [16,16],
    iconAnchor: [8,8]
  });

  var m = L.marker([lat, lng], { icon: icon, pane: pane, interactive: true });

  // stesso comportamento della stella: accende categoria e apre popup punto
  m.on('click', function(e){
  try{ if(e && e.originalEvent) L.DomEvent.stop(e.originalEvent); }catch(_){}
  try{ ensureFavCategoryOn(label); }catch(_){}
  try{ openFromFavStar(label, nameNorm, L.latLng(lat, lng)); }catch(_){}
});


  return m;
}


    function getIndexByLabel(label){
  switch(label){
    case 'Forte':     return indexForti;
    case 'Museo':     return indexMusei;
    case 'Autobus':   return indexBus;
    case 'Stazione':  return indexTrain;
    case 'Metro':     return indexMetro;
    case 'Impianto':  return indexFuni;
    case 'Parco':     return indexParks;
    case 'Piazza':    return indexPiazze;
    case 'Locale':    return indexLocali;
    case 'Mare':      return indexMare;
    case 'Aeroporto': return indexAereo;
    case 'Chiesa':    return indexChiese;
    case 'Palazzo':   return indexPalazzi;
    case 'Sport':     return indexSport;
    case 'Cinema':    return indexCinema;
    case 'Teatro':    return indexTeatri;
    case 'Mostra':    return indexMostre;
    default: return null;
      }
    }



    function toggleStar(index, name, label){
      var key = keyFor(label, name);
      var nameNorm = norm(name);
      if(!index[nameNorm]) return null;
      if(byKey[key]){
        try{ FAV_STARS.removeLayer(byKey[key]); }catch(_){}
        delete byKey[key];
        setFav(label, name, false);
        return false;
      } else {
        var latlng = index[nameNorm];
        var m = makeStar(latlng[0], latlng[1], label, nameNorm);
        m.addTo(FAV_STARS);
        byKey[key] = m;
        setFav(label, name, true);
        return true;
      }
    }

    function centerOn(index, name){
      var latlng = index[norm(name)]; if(!latlng) return false;
      try{ map.setView({lat: latlng[0], lng: latlng[1]}, 17, { animate: true }); return true; }catch(e){ return false; }
    }

function escHtml(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

    function openPopupAt(index, name, fallbackLabel){
      var latlng = index[norm(name)]; if(!latlng) return false;
      var target = L.latLng(latlng[0], latlng[1]);
      var found = null;
      try{
        map.eachLayer(function(layer){
          if(found) return;
          if(layer && layer.options && layer.options.pane === pane) return; // ignora le stelle preferiti
          if(layer && typeof layer.getLatLng === 'function'){
            var ll = layer.getLatLng();
            if(ll && typeof ll.lat === 'number' && typeof ll.lng === 'number'){
              var d = ll.distanceTo ? ll.distanceTo(target) : null;
              var close = d != null ? d < 12 : (Math.abs(ll.lat-target.lat) < 1e-5 && Math.abs(ll.lng-target.lng) < 1e-5);
              if(close){ found = layer; }
            }
          }
        });
      }catch(_){}
      if(found){
        try{
          var p = (typeof found.getPopup === 'function') ? found.getPopup() : null;
          if(p){ p.options.autoPan = false; }
          if(typeof found.openPopup === 'function'){ found.openPopup(); return true; }
          if(typeof found.fire === 'function'){ found.fire('click'); return true; }
        }catch(_){}
      }
      try{ L.popup({autoPan:false}).setLatLng(target).setContent('<strong>'+escHtml(fallbackLabel)+'</strong><br>'+escHtml(name))
.openOn(map); return true; }catch(_){}
      return false;
    }

    function centerThenOpen(index, name, label){
      var didCenter = centerOn(index, name);
      if(didCenter){ var once=function(){ map.off('moveend', once); openPopupAt(index, name, label); }; map.on('moveend', once); }
      else { openPopupAt(index, name, label); }
    }

    function enhanceList(listId, index, label){
      var list = document.getElementById(listId);
      if(!list) return;
      Array.from(list.querySelectorAll('.fav-item')).forEach(function(li){
        var nameEl = li.querySelector('.fav-name') || li;
        var btn = li.querySelector('.fav-star-btn');
        if(!btn){
          btn = document.createElement('button'); btn.className='fav-star-btn'; btn.type='button'; btn.setAttribute('aria-pressed','false'); btn.title='Seleziona come preferito'; btn.textContent='★';
          if(nameEl && nameEl.parentNode) nameEl.parentNode.insertBefore(btn, nameEl); else li.insertBefore(btn, li.firstChild);
        }
        if(!btn._favBound){
          btn.addEventListener('click', function(ev){
            ev.preventDefault(); ev.stopPropagation();
            var name = (nameEl && nameEl.textContent) || '';
            var on = toggleStar(index, name, label);
            if(on === null) return;
            li.classList.toggle('is-selected', !!on);
            btn.classList.toggle('on', !!on);
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          btn._favBound = true;
        }
        if(nameEl && !nameEl._centerBound){
          nameEl.style.cursor = 'pointer';
          nameEl.addEventListener('click', function(ev){
            ev.preventDefault(); ev.stopPropagation();
            var name = (nameEl && nameEl.textContent) || '';
  try{ ensureFavCategoryOn(label); }catch(_){}
            centerThenOpen(index, name, label);
          });
          nameEl._centerBound = true;
        }
      });
      // Sync current list UI with saved favorites
      try{
        var favs = loadFavs();
        Array.from(list.querySelectorAll('.fav-item')).forEach(function(li){
          var nameEl = li.querySelector('.fav-name') || li;
          var btn = li.querySelector('.fav-star-btn');
          var k = keyFor(label, nameEl && nameEl.textContent || '');
          var on = !!favs[k];
          li.classList.toggle('is-selected', on);
          if(btn){ btn.classList.toggle('on', on); btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
        });
      }catch(_){}
    }

    function enhanceParchiPiazze(){
      var list = document.getElementById('fav-list-parchi-piazze');
      if(!list) return;
      Array.from(list.querySelectorAll('.fav-item')).forEach(function(li){
        var type = li.getAttribute('data-src') || 'parco';
        var index = (type==='parco') ? indexParks : indexPiazze;
        var label = (type==='parco') ? 'Parco' : 'Piazza';
        var nameEl = li.querySelector('.fav-name') || li;
        var btn = li.querySelector('.fav-star-btn');
        if(!btn){
          btn = document.createElement('button'); btn.className='fav-star-btn'; btn.type='button'; btn.setAttribute('aria-pressed','false'); btn.title='Seleziona come preferito'; btn.textContent='★';
          if(nameEl && nameEl.parentNode) nameEl.parentNode.insertBefore(btn, nameEl); else li.insertBefore(btn, li.firstChild);
        }
        if(!btn._favBound){
          btn.addEventListener('click', function(ev){
            ev.preventDefault(); ev.stopPropagation();
            var name = (nameEl && nameEl.textContent) || '';
            var on = toggleStar(index, name, label);
            if(on === null) return;
            li.classList.toggle('is-selected', !!on);
            btn.classList.toggle('on', !!on);
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          btn._favBound = true;
        }
        if(nameEl && !nameEl._centerBound){
          nameEl.style.cursor = 'pointer';
          nameEl.addEventListener('click', function(ev){
  ev.preventDefault(); ev.stopPropagation();
  var name = (nameEl && nameEl.textContent) || '';
  try{ ensureFavCategoryOn(label); }catch(_){}
  centerThenOpen(index, name, label);
});

          nameEl._centerBound = true;
        }
      });
      // Sync UI
      try{
        var favs = loadFavs();
        Array.from(list.querySelectorAll('.fav-item')).forEach(function(li){
          var label = (li.getAttribute('data-src') === 'piazza') ? 'Piazza' : 'Parco';
          var nameEl = li.querySelector('.fav-name') || li;
          var btn = li.querySelector('.fav-star-btn');
          var k = keyFor(label, nameEl && nameEl.textContent || '');
          var on = !!favs[k];
          li.classList.toggle('is-selected', on);
          if(btn){ btn.classList.toggle('on', on); btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
        });
      }catch(_){}
    }

    function enhanceAll(){
  enhanceList('fav-list-forti',   indexForti,   'Forte');
  enhanceList('fav-list-musei',   indexMusei,   'Museo');
  enhanceList('fav-list-bus',     indexBus,     'Autobus');
  enhanceList('fav-list-train',   indexTrain,   'Stazione');
  enhanceList('fav-list-metro',   indexMetro,   'Metro');
  enhanceList('fav-list-funi',    indexFuni,    'Impianto');
  enhanceParchiPiazze();
  enhanceList('fav-list-locali',  indexLocali,  'Locale');
  enhanceList('fav-list-mare',    indexMare,    'Mare');
  enhanceList('fav-list-aereo',   indexAereo,   'Aeroporto');
  enhanceList('fav-list-chiese',  indexChiese,  'Chiesa');
  enhanceList('fav-list-palazzi', indexPalazzi, 'Palazzo');
  enhanceList('fav-list-sport',   indexSport,   'Sport');
  enhanceList('fav-list-cinema',  indexCinema,  'Cinema');
  enhanceList('fav-list-teatri',  indexTeatri,  'Teatro');
  enhanceList('fav-list-mostre',  indexMostre,  'Mostra');
}



    // Restore stars on the map from localStorage (markers)
    function restoreStars(){
      eachFav(function(label, nameNorm){
        var idx = getIndexByLabel(label);
        if(!idx) return;
        ensureStarByNorm(idx, nameNorm, label);
      });
    }

    // Hook toolbar clear button
    try{
      var btnClear = document.getElementById('fav-clear-btn');
      if(btnClear && !btnClear._bound){
        btnClear.addEventListener('click', function(){
          clearAllFavs();
          // Clear star markers
          try{ FAV_STARS.clearLayers(); }catch(_){}
          byKey = {};
          // Reset UI
          document.querySelectorAll('#fav-menu .fav-item').forEach(function(li){
            li.classList.remove('is-selected');
            var btn = li.querySelector('.fav-star-btn');
            if(btn){ btn.classList.remove('on'); btn.setAttribute('aria-pressed','false'); }
          });
        });
        btnClear._bound = true;
      }

    }catch(_){}

    // Initial run
    restoreStars();
    // Enhance lists now and whenever menu opens; sync UI with persisted state
    enhanceAll();
    window.__favEnhanceLists = enhanceAll;
    document.addEventListener('click', function(){
      var menu = document.getElementById('fav-menu');
      if(menu && menu.classList.contains('open')) enhanceAll();
    }, true);

// =========================
// ROUTE ★ (preferiti del percorso)
// =========================
window.ROUTE_FAVS = window.ROUTE_FAVS || {};
window.__routeFavShown = window.__routeFavShown || {};

// Dati: Strada del Balilla (dal tuo txt)
window.ROUTE_FAVS['dm-strada-balilla'] = [
  {"label":"Metro","name":"Dinegro"},
  {"label":"Metro","name":"San Giorgio"},
  {"label":"Museo","name":"Via del Campo 29/rosso"},
  {"label":"Museo","name":"Museo del Risorgimento"},
  {"label":"Museo","name":"Palazzo Reale di Genova"},
  {"label":"Museo","name":"Galata Museo del Mare"},
  {"label":"Museo","name":"MEI Museo Nazionale dell'Emigrazione Italiana"},
  {"label":"Museo","name":"Villa del Principe"},
  {"label":"Chiesa","name":"San Marco al Molo"},
  {"label":"Chiesa","name":"San Pancrazio"},
  {"label":"Chiesa","name":"Basilica di San Siro"},
  {"label":"Chiesa","name":"San Marcellino"},
  {"label":"Chiesa","name":"Santa Fede"},
  {"label":"Chiesa","name":"San Filippo Neri"},
  {"label":"Chiesa","name":"Santissima Annunziata del Vastato"},
  {"label":"Chiesa","name":"Sant'Antonio a Prè"},
  {"label":"Chiesa","name":"San Sisto"},
  {"label":"Chiesa","name":"Santi Gerolamo e Francesco Saverio"},
  {"label":"Chiesa","name":"San Vittore"},
  {"label":"Chiesa","name":"San Giovanni di Prè"},
  {"label":"Chiesa","name":"San Benedetto al Porto"},
  {"label":"Chiesa","name":"San Vincenzo de' Paoli"},
  {"label":"Chiesa","name":"San Teodoro"},
  {"label":"Palazzo","name":"Palazzo San Giorgio"},
  {"label":"Palazzo","name":"Palazzo Ambrogio De Nigro"},
  {"label":"Palazzo","name":"Palazzo Andrea Pitto"},
  {"label":"Palazzo","name":"Palazzo Cipriano Pallavicini"},
  {"label":"Palazzo","name":"Palazzo Marc'Aurelio Rebuffo"},
  {"label":"Palazzo","name":"Palazzo Balbi Senarega"},
  {"label":"Palazzo","name":"Palazzo Francesco Maria Balbi Piovera"}
];

// Dati: Giornata del marinaio (dal tuo txt)
window.ROUTE_FAVS['cs-giornata-marinaio'] = [
  {"label":"Metro","name":"Sarzano/Sant'Agostino"},
  {"label":"Museo","name":"Casa di Colombo"},
  {"label":"Museo","name":"Museo di Sant'Agostino"},
  {"label":"Chiesa","name":"SS. Madre di Dio"},
  {"label":"Chiesa","name":"San Salvatore"},
  {"label":"Chiesa","name":"Sant'Agostino"},
  {"label":"Chiesa","name":"Santa Maria in Passione"},
  {"label":"Chiesa","name":"Santa Maria di Castello"},
  {"label":"Chiesa","name":"Santi Cosma e Damiano"},
  {"label":"Chiesa","name":"San Marco al Molo"}
];

// Dati: Strada Borghese (dal tuo txt)
window.ROUTE_FAVS['fm-strada-borghese'] = [
  {"label":"Metro","name":"De Ferrari"},
  {"label":"Museo","name":"Casa di Colombo"},
  {"label":"Museo","name":"Museo dei Beni Culturali Cappuccini"},
  {"label":"Museo","name":"Museo Biblioteca dell'Attore"},
  {"label":"Museo","name":"Museo di Storia Naturale Giacomo Doria"},
  {"label":"Museo","name":"Museo dell'Accademia Ligustica di Belle Arti"},
  {"label":"Chiesa","name":"Santo Stefano"},
  {"label":"Chiesa","name":"Santa Croce e San Camillo de Lellis"},
  {"label":"Chiesa","name":"Nostra Signora della Consolazione"},
  {"label":"Palazzo","name":"Palazzo della Borsa"}
];

// Dati: Strada del Doge (dal tuo txt)
window.ROUTE_FAVS['cs-strada-doge'] = [
  {"label":"Metro","name":"De Ferrari"},

  {"label":"Museo","name":"Museo Diocesano"},
  {"label":"Museo","name":"Museo d'Arte Orientale E. Chiossone"},
  {"label":"Museo","name":"Palazzo Tursi"},
  {"label":"Museo","name":"Palazzo Rosso"},
  {"label":"Museo","name":"Palazzo Bianco"},
  {"label":"Museo","name":"Palazzo Reale di Genova"},
  {"label":"Museo","name":"Castello D'Albertis Museo delle Culture del Mondo"},

  {"label":"Chiesa","name":"Chiesa del Gesù,di S.Ambrogio e S.Andrea"},
  {"label":"Chiesa","name":"San Matteo"},
  {"label":"Chiesa","name":"Santa Maria delle Vigne"},
  {"label":"Chiesa","name":"San Filippo Neri"},
  {"label":"Chiesa","name":"Santissima Annunziata del Vastato"},
  {"label":"Chiesa","name":"Santi Gerolamo e Francesco Saverio"},
  {"label":"Chiesa","name":"San Vittore"},
  {"label":"Chiesa","name":"Santa Maria Maddalena e San Girolamo Emiliani"},

  {"label":"Palazzo","name":"Palazzo Ducale"},
  {"label":"Palazzo","name":"Palazzo Nicolosio Lomellino"},
  {"label":"Palazzo","name":"Palazzo Tobia Pallavicino"},
  {"label":"Palazzo","name":"Palazzo Interiano Pallavicino"},
  {"label":"Palazzo","name":"Palazzo Agostino Ayrolo"},
  {"label":"Palazzo","name":"Palazzo Giorgio Spinola"},
  {"label":"Palazzo","name":"Palazzo Tommaso Spinola"},
  {"label":"Palazzo","name":"Palazzo Della Rovere"},
  {"label":"Palazzo","name":"Palazzo Doria Spinola"},
  {"label":"Palazzo","name":"Santa Marta"},
  {"label":"Palazzo","name":"Palazzo della Meridiana"},
  {"label":"Palazzo","name":"Palazzo Spinola"},
  {"label":"Palazzo","name":"Palazzo Balbi Senarega"},
  {"label":"Palazzo","name":"Palazzo Francesco Maria Balbi Piovera"},

  {"label":"Impianto","name":"Asc. d'Albertis - Montegalletto (bassa)"},
  {"label":"Impianto","name":"Asc. d'Albertis - Montegalletto (alta)"}
];

// Dati: Strada del Cavaliere (dal tuo txt)
window.ROUTE_FAVS['dm-strada-cavaliere'] = [
  {"label":"Metro","name":"De Ferrari"},
  {"label":"Metro","name":"Principe"},

  // nel txt c'era "Treno": nel tuo codice la label corretta è "Stazione"
  {"label":"Stazione","name":"P.Principe"},

  {"label":"Impianto","name":"Cremagliera Principe/Granarolo - Principe"},
  {"label":"Impianto","name":"Cremagliera Principe/Granarolo - Granarolo"},
  {"label":"Impianto","name":"Funicolare Zecca/Righi - Righi"},
  {"label":"Impianto","name":"Funicolare Zecca/Righi - Zecca"},

  {"label":"Forte","name":"Forte Castellaccio"},
  {"label":"Forte","name":"Forte Begato"},
  {"label":"Forte","name":"Forte Diamante"},
  {"label":"Forte","name":"Forte Puin"},
  {"label":"Forte","name":"Forte Fratello Minore"},
  {"label":"Forte","name":"Forte Fratello Maggiore"},
  {"label":"Forte","name":"Forte Sperone"},

  {"label":"Museo","name":"Palazzo Spinola"},
  {"label":"Museo","name":"MEI Museo Nazionale dell'Emigrazione Italiana"},

  {"label":"Chiesa","name":"San Matteo"},
  {"label":"Chiesa","name":"San Luca"},
  {"label":"Chiesa","name":"Basilica di San Siro"},
  {"label":"Chiesa","name":"San Nicolosio"},
  {"label":"Chiesa","name":"Santuario della Madonnetta"},
  {"label":"Chiesa","name":"San Giovanni di Prè"},

  {"label":"Palazzo","name":"Palazzo Ducale"}
];



// layer separato (così non tocchi i preferiti “veri”)
var ROUTE_STAR_LAYER = window.ROUTE_STAR_LAYER || (window.ROUTE_STAR_LAYER = L.layerGroup().addTo(map));
var __routeMarkers = {}; // rid -> [markers]

function normLabel(lbl){
  lbl = (lbl || '').trim();
  if (lbl.toLowerCase() === 'palazzi') return 'Palazzo';
  return lbl;
}

function showRouteStars(rid){
  if (__routeMarkers[rid]) return;
  var list = (window.ROUTE_FAVS && window.ROUTE_FAVS[rid]) || [];
  if (!list.length) return;

  var markers = [];
  list.forEach(function(it){
    if(!it) return;
    var label = normLabel(it.label);
    var name = (it.name || '').toString().trim();
    if(!label || !name) return;

    var idx = getIndexByLabel(label);
    if(!idx) return;

    var key = norm(name);
    var ll = idx[key];
    if(!ll || !ll.length) return;

var mk = makeRouteDot(ll[0], ll[1], label, key, rid);
    mk.addTo(ROUTE_STAR_LAYER);
    markers.push(mk);
  });

  if(markers.length){
    __routeMarkers[rid] = markers;
    window.__routeFavShown[rid] = true;
  }
}

function hideRouteStars(rid){
  var arr = __routeMarkers[rid];
  if(arr && arr.length){
    arr.forEach(function(m){ try{ ROUTE_STAR_LAYER.removeLayer(m); }catch(_){} });
  }
  delete __routeMarkers[rid];
  window.__routeFavShown[rid] = false;
}

// Click sulla ★ nel popup start/end
document.addEventListener('click', function(ev){
  var btn = ev.target && ev.target.closest && ev.target.closest('.route-fav-btn');
  if(!btn) return;

  ev.preventDefault();
  ev.stopPropagation();

  var rid = btn.getAttribute('data-route-id');
  if(!rid) return;

  if(__routeMarkers[rid]){
    hideRouteStars(rid);
    btn.classList.remove('on');
    btn.setAttribute('aria-pressed','false');
  }else{
    showRouteStars(rid);
    btn.classList.add('on');
    btn.setAttribute('aria-pressed','true');
  }
}, true);

// Se accendi/spegni un percorso, mostra/nascondi automaticamente i suoi preferiti (cerchiolini)
document.addEventListener('change', function(ev){
  if(!ev.target || !ev.target.matches || !ev.target.matches('input.route-chk')) return;
  var row = ev.target.closest('.doc-row[data-route-id]');
  if(!row) return;
  var rid = row.getAttribute('data-route-id');
  if(!rid) return;

  if(ev.target.checked){
    if(window.ROUTE_FAVS && window.ROUTE_FAVS[rid] && window.ROUTE_FAVS[rid].length){
      showRouteStars(rid);

      // aggiorna il popup start/end (così la ★ può risultare "attiva" subito)
      try{ if(typeof window.refreshRoutePopups === 'function') window.refreshRoutePopups(); }catch(_){}
    }
  } else {
    hideRouteStars(rid);
    try{ if(typeof window.refreshRoutePopups === 'function') window.refreshRoutePopups(); }catch(_){}
  }
}, true);



    // In case some datasets load a bit later, try once more shortly after
    setTimeout(function(){ restoreStars(); enhanceAll(); }, 600);
    setTimeout(function(){ restoreStars(); enhanceAll(); }, 1500);
  });
})();

/* ===== original part134.js ===== */

(function(){
  // Normalizza il nome come nella logica dei preferiti
  function normName(s){
    return (s || '').toString().trim().toLowerCase();
  }

  // Sempre [lat, lng], come tutti gli altri indici (Forti, Musei, Mare, Aereo, ecc.)
  function addToIndex(idx, name, lat, lng){
    if (!idx) return;

    var latNum = parseFloat(lat);
    var lngNum = parseFloat(lng);
    if (!isFinite(latNum) || !isFinite(lngNum)) return;

    var k = normName(name);
    if (!k) return;

    idx[k] = [latNum, lngNum];
  }

  function extractArray(json){
    if (Array.isArray(json)) return json;
    if (json && Array.isArray(json.points)) return json.points;
    return [];
  }

  // Versione locale di getTitleFromObject per titoli tipo { it: "...", en: "..." }
  function getTitleFromObject(obj){
    if (!obj || typeof obj !== 'object') return '';
    return obj.it || obj.en || obj.es || obj.fr || obj.ru || obj.ar || obj.zh || obj.lij || '';
  }

  // Estrae il nome usato nelle liste:
  // - Sport / Cinema: p.name
  // - Teatri / Mostre: title.{it,en,...}
  function extractName(p){
    if (!p) return '';

    if (p.name) return p.name;
    if (p.label) return p.label;

    if (typeof p.title === 'string') return p.title;
    if (p.title && typeof p.title === 'object') return getTitleFromObject(p.title);

    if (typeof p.titolo === 'string') return p.titolo;
    if (p.titolo && typeof p.titolo === 'object') return getTitleFromObject(p.titolo);

    return '';
  }

  function loadOne(url, propName){
    return fetch(url)
      .then(function(r){ return r.json(); })
      .then(function(json){
        var idx = window[propName];
        if (!idx || typeof idx !== 'object') return;

        var arr = extractArray(json);
        arr.forEach(function(p){
          var name = extractName(p);
          if (!name) return;
          var lat  = p.lat;
          var lng  = p.lng;
          addToIndex(idx, name, lat, lng);
        });
      })
      .catch(function(err){
        try{ console.warn('fav-index', url, err); }catch(_){}
      });
  }

  function indicesReady(){
    return !!(
      window.__FAV_INDEX_SPORT  &&
      window.__FAV_INDEX_CINEMA &&
      window.__FAV_INDEX_TEATRI &&
      window.__FAV_INDEX_MOSTRE
    );
  }

  function initOnce(){
    if (!indicesReady()) return false;

    // Sport
    loadOne('sport/sport_points.json',   '__FAV_INDEX_SPORT');
    // Cinema
    loadOne('cinema/cinema_points.json', '__FAV_INDEX_CINEMA');
    // Teatri
    loadOne('teatri/teatri_points.json', '__FAV_INDEX_TEATRI');
    // Mostre
    loadOne('mostre/mostre_points.json', '__FAV_INDEX_MOSTRE');

    return true;
  }

  function boot(){
    var tries = 0;
    var maxTries = 40; // ~10 secondi
    var iv = setInterval(function(){
      if (initOnce() || (++tries >= maxTries)){
        clearInterval(iv);
      }
    }, 250);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

/* ===== original part135.js ===== */

(function(){
  function setHeights(){
    var menu = document.getElementById('fav-menu');
    if(!menu) return;
    var header = menu.querySelector('header');
    var body = menu.querySelector('.body');
    if(!body) return;
    var vh = Math.max(320, Math.round(window.innerHeight * 0.72)); // cap lower bound
    var headH = header ? header.getBoundingClientRect().height : 48;
    body.style.maxHeight = (vh - headH) + 'px';
  }
  window.addEventListener('resize', setHeights, { passive:true });
  document.addEventListener('DOMContentLoaded', setHeights);
  // Re-apply when the menu opens (in case of dynamic fonts/zoom)
  document.addEventListener('click', function(e){
    var menu = document.getElementById('fav-menu');
    if(!menu) return;
    if(menu.classList.contains('open')) setHeights();
  }, true);
  setHeights();
})();

/* ===== original part136.js ===== */

(function(){
  function sortForti(){
    try{
      var list = document.getElementById('fav-list-forti');
      if(!list) return;
      var items = Array.from(list.querySelectorAll('.fav-item'));
      if(items.length < 2) return;
      var collator = new Intl.Collator('it', { sensitivity: 'base' });
      items.sort(function(a,b){
        var an = (a.querySelector('.fav-name')?.textContent || '').trim();
        var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
        return collator.compare(an, bn);
      });
      items.forEach(function(li){ list.appendChild(li); });
    }catch(e){ /* no-op */ }
  }
  // Try on DOM ready and window load
  document.addEventListener('DOMContentLoaded', sortForti);
  window.addEventListener('load', sortForti);
  // Also when the menu opens (to catch late fills)
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) sortForti();
  }, true);
})();

/* ===== original part137.js ===== */

(function(){
  function sortMusei(){
    try{
      var list = document.getElementById('fav-list-musei');
      if(!list) return;
      var items = Array.from(list.querySelectorAll('.fav-item'));
      if(items.length < 2) return;
      var collator = new Intl.Collator('it', { sensitivity: 'base' });
      items.sort(function(a,b){
        var an = (a.querySelector('.fav-name')?.textContent || '').trim();
        var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
        return collator.compare(an, bn);
      });
      items.forEach(function(li){ list.appendChild(li); });
    }catch(e){ /* no-op */ }
  }
  document.addEventListener('DOMContentLoaded', sortMusei);
  window.addEventListener('load', sortMusei);
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) sortMusei();
  }, true);
})();

/* ===== original part138.js ===== */

(function(){
  function extractArrayFromScripts(){
    try{
      var scripts = document.scripts || [];
      for(var i=0;i<scripts.length;i++){
        var t = scripts[i].textContent || "";
        var m = t.match(/const\s+MUSEUM_POINTS\s*=\s*(\[[\s\S]*?\]);?/);
        if(m && m[1]){
          try{
            var arr = (new Function('return ('+m[1]+');'))();
            if(Array.isArray(arr) && arr.length){ return arr; }
          }catch(e){ /* keep scanning */ }
        }
      }
    }catch(e){}
    return null;
  }
  function init(){
    if(Array.isArray(window.MUSEI_DATA) && window.MUSEI_DATA.length) return true;
    var arr = extractArrayFromScripts();
    if(arr && arr.length){ window.MUSEI_DATA = arr; return true; }
    return false;
  }
  var ok = init();
  if(!ok){
    // Retry a couple times for late-loaded scripts
    setTimeout(init, 250);
    setTimeout(init, 800);
    setTimeout(init, 1500);
  }
})();

/* ===== original part139.js ===== */

(function(){
  var collator = new Intl.Collator('it', { sensitivity: 'base' });
  function populate(){
    try{
      if(!Array.isArray(window.MUSEI_DATA) || !window.MUSEI_DATA.length) return;
      var list = document.getElementById('fav-list-musei');
      if(!list) return;
      // If list is empty or still shows placeholder, populate it
      if(!list.children.length || list.querySelector('.fav-empty')){
        list.innerHTML = '';
        window.MUSEI_DATA.forEach(function(m){
          var li = document.createElement('li'); li.className = 'fav-item';
          var span = document.createElement('span'); span.className = 'fav-name'; span.textContent = m.name || m.title || 'Senza nome';
          li.appendChild(span);
          list.appendChild(li);
        });
        // sort
        var items = Array.from(list.querySelectorAll('.fav-item'));
        items.sort(function(a,b){
          var an = (a.querySelector('.fav-name')?.textContent || '').trim();
          var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
          return collator.compare(an, bn);
        });
        items.forEach(function(li){ list.appendChild(li); });
        // re-enhance star/name behaviors if available
        if(window.__favEnhanceLists) window.__favEnhanceLists();
      }
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(populate, 0); setTimeout(populate, 300); });
  window.addEventListener('load', function(){ setTimeout(populate, 0); setTimeout(populate, 500); });
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) populate();
  }, true);
})();

/* ===== original part140.js ===== */

(function(){
  try{
    if(!Array.isArray(window.BUS_STATIONS) || !window.BUS_STATIONS.length){
      window.BUS_STATIONS = [
    { name: "Via Degola, Sampierdarena", lat: 44.41436205382364, lng: 8.883992988998594 },
    { name: "Via Fanti d'Italia",        lat: 44.41604214377862, lng: 8.919182667949006 },
    { name: "Piazza Caricamento",        lat: 44.41048608349422, lng: 8.928100848399518 },
    { name: "Piazza Verdi",              lat: 44.406027340684034, lng: 8.946650873235932 },
    { name: "Piazza della Vittoria",     lat: 44.40378426423525, lng: 8.945990144789358 }
  ];
    }
  }catch(_){
    /* no-op */
  }
})();

/* ===== original part141.js ===== */

(function(){
  var collator = new Intl.Collator('it', { sensitivity: 'base' });
  function populate(){
    try{
      if(!Array.isArray(window.BUS_STATIONS) || !window.BUS_STATIONS.length) return;
      var list = document.getElementById('fav-list-bus');
      if(!list) return;
      if(!list.children.length || list.querySelector('.fav-empty')){
        list.innerHTML = '';
        window.BUS_STATIONS.forEach(function(b){
          var li = document.createElement('li'); li.className = 'fav-item';
          var span = document.createElement('span'); span.className = 'fav-name'; span.textContent = b.name || 'Senza nome';
          li.appendChild(span);
          list.appendChild(li);
        });
        var items = Array.from(list.querySelectorAll('.fav-item'));
        items.sort(function(a,b){
          var an = (a.querySelector('.fav-name')?.textContent || '').trim();
          var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
          return collator.compare(an, bn);
        });
        items.forEach(function(li){ list.appendChild(li); });
        if(window.__favEnhanceLists) window.__favEnhanceLists(); // rebind stars/name handlers
      }
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(populate, 0); setTimeout(populate, 300); });
  window.addEventListener('load', function(){ setTimeout(populate, 0); setTimeout(populate, 500); });
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) populate();
  }, true);
})();

/* ===== original part142.js ===== */

(function(){
  var collator = new Intl.Collator('it', { sensitivity: 'base' });
  function populate(){
    try{
      if(!Array.isArray(window.TRAIN_STATIONS) || !window.TRAIN_STATIONS.length) return;
      var list = document.getElementById('fav-list-train');
      if(!list) return;
      if(!list.children.length || list.querySelector('.fav-empty')){
        list.innerHTML = '';
        window.TRAIN_STATIONS.forEach(function(t){
          var li = document.createElement('li'); li.className = 'fav-item';
          var span = document.createElement('span'); span.className = 'fav-name'; span.textContent = t.name || 'Senza nome';
          li.appendChild(span);
          list.appendChild(li);
        });
        var items = Array.from(list.querySelectorAll('.fav-item'));
        items.sort(function(a,b){
          var an = (a.querySelector('.fav-name')?.textContent || '').trim();
          var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
          return collator.compare(an, bn);
        });
        items.forEach(function(li){ list.appendChild(li); });
        if(window.__favEnhanceLists) window.__favEnhanceLists();
      }
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(populate, 0); setTimeout(populate, 300); });
  window.addEventListener('load', function(){ setTimeout(populate, 0); setTimeout(populate, 500); });
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) populate();
  }, true);
})();

/* ===== original part143.js ===== */

(function(){
  try{
    if(!Array.isArray(window.METRO_STATIONS) || !window.METRO_STATIONS.length){
      window.METRO_STATIONS = [
    { name: "Brin",                  lat: 44.42806,  lng: 8.89556 },
    { name: "Dinegro",               lat: 44.41389,  lng: 8.91194 },
    { name: "Principe",              lat: 44.41639,  lng: 8.91917 },
    { name: "Darsena",               lat: 44.41306,  lng: 8.92667 },
    { name: "San Giorgio",           lat: 44.40861,  lng: 8.92861 },
    { name: "Sarzano/Sant'Agostino", lat: 44.40417,  lng: 8.93167 },
    { name: "De Ferrari",            lat: 44.407639, lng: 8.93444 },
    { name: "Brignole",              lat: 44.40718,  lng: 8.94854 }
  ];
    }
  }catch(_){
    /* no-op */
  }
})();

/* ===== original part144.js ===== */

(function(){
  var collator = new Intl.Collator('it', { sensitivity: 'base' });
  function populate(){
    try{
      if(!Array.isArray(window.METRO_STATIONS) || !window.METRO_STATIONS.length) return;
      var list = document.getElementById('fav-list-metro');
      if(!list) return;
      if(!list.children.length || list.querySelector('.fav-empty')){
        list.innerHTML = '';
        window.METRO_STATIONS.forEach(function(m){
          var li = document.createElement('li'); li.className = 'fav-item';
          var span = document.createElement('span'); span.className = 'fav-name'; span.textContent = m.name || 'Senza nome';
          li.appendChild(span);
          list.appendChild(li);
        });
        var items = Array.from(list.querySelectorAll('.fav-item'));
        items.sort(function(a,b){
          var an = (a.querySelector('.fav-name')?.textContent || '').trim();
          var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
          return collator.compare(an, bn);
        });
        items.forEach(function(li){ list.appendChild(li); });
        if(window.__favEnhanceLists) window.__favEnhanceLists();
      }
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(populate, 0); setTimeout(populate, 300); });
  window.addEventListener('load', function(){ setTimeout(populate, 0); setTimeout(populate, 500); });
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) populate();
  }, true);
})();

/* ===== original part145.js ===== */

(function(){
  var collator = new Intl.Collator('it', { sensitivity: 'base' });
  function populate(){
    try{
      if(!Array.isArray(window.FUNI_POINTS) || !window.FUNI_POINTS.length) return;
      var list = document.getElementById('fav-list-funi');
      if(!list) return;
      if(!list.children.length || list.querySelector('.fav-empty')){
        list.innerHTML = '';
        window.FUNI_POINTS.forEach(function(p){
          var li = document.createElement('li'); li.className = 'fav-item';
          var span = document.createElement('span'); span.className = 'fav-name'; span.textContent = p.name || 'Senza nome';
          li.appendChild(span);
          list.appendChild(li);
        });
        var items = Array.from(list.querySelectorAll('.fav-item'));
        items.sort(function(a,b){
          var an = (a.querySelector('.fav-name')?.textContent || '').trim();
          var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
          return collator.compare(an, bn);
        });
        items.forEach(function(li){ list.appendChild(li); });
        if(window.__favEnhanceLists) window.__favEnhanceLists();
      }
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(populate, 0); setTimeout(populate, 300); });
  window.addEventListener('load', function(){ setTimeout(populate, 0); setTimeout(populate, 500); });
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) populate();
  }, true);
})();

/* ===== original part146.js ===== */

(function(){
  try{
    if(!Array.isArray(window.MARE_POINTS) || !window.MARE_POINTS.length){
      window.MARE_POINTS = [
        { name: "Terminal Traghetti",                         lat: 44.410861509772516, lng: 8.909000848098751 },
        { name: "Terminal Crociere",                          lat: 44.408191532088414, lng: 8.913764756230493 },
        { name: "Battelli Portofino e Golfo Paradiso",        lat: 44.407520933427096, lng: 8.933881225905076 },
        { name: "Navebus Porto Antico",                       lat: 44.406559105773676, lng: 8.931992591089779 }
      ];
    }
  }catch(_){
    /* no-op */
  }
})();

/* ===== original part147.js ===== */

(function(){
  var collator = new Intl.Collator('it', { sensitivity: 'base' });
  function populate(){
    try{
      if(!Array.isArray(window.MARE_POINTS) || !window.MARE_POINTS.length) return;
      var list = document.getElementById('fav-list-mare');
      if(!list) return;
      if(!list.children.length || list.querySelector('.fav-empty')){
        list.innerHTML = '';
        window.MARE_POINTS.forEach(function(p){
          var li = document.createElement('li'); 
          li.className = 'fav-item';
          var span = document.createElement('span'); 
          span.className = 'fav-name'; 
          span.textContent = p.name || 'Senza nome';
          li.appendChild(span);
          list.appendChild(li);
        });
        var items = Array.from(list.querySelectorAll('.fav-item'));
        items.sort(function(a,b){
          var an = (a.querySelector('.fav-name')?.textContent || '').trim();
          var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
          return collator.compare(an, bn);
        });
        items.forEach(function(li){ list.appendChild(li); });
        if(window.__favEnhanceLists) window.__favEnhanceLists();
      }
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(populate, 0); setTimeout(populate, 300); });
  window.addEventListener('load', function(){ setTimeout(populate, 0); setTimeout(populate, 500); });
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) populate();
  }, true);
})();

/* ===== original part148.js ===== */

(function(){
  try{
    if(!Array.isArray(window.AEREO_POINTS) || !window.AEREO_POINTS.length){
      window.AEREO_POINTS = [
        { name: "Aeroporto Cristoforo Colombo", lat: 44.4149038775052, lng: 8.850570043188567 }
      ];
    }
  }catch(_){
    /* no-op */
  }
})();

/* ===== original part149.js ===== */

(function(){
  var collator = new Intl.Collator('it', { sensitivity: 'base' });
  function populate(){
    try{
      if(!Array.isArray(window.AEREO_POINTS) || !window.AEREO_POINTS.length) return;
      var list = document.getElementById('fav-list-aereo');
      if(!list) return;
      if(!list.children.length || list.querySelector('.fav-empty')){
        list.innerHTML = '';
        window.AEREO_POINTS.forEach(function(p){
          var li = document.createElement('li'); 
          li.className = 'fav-item';
          var span = document.createElement('span'); 
          span.className = 'fav-name'; 
          span.textContent = p.name || 'Senza nome';
          li.appendChild(span);
          list.appendChild(li);
        });
        var items = Array.from(list.querySelectorAll('.fav-item'));
        items.sort(function(a,b){
          var an = (a.querySelector('.fav-name')?.textContent || '').trim();
          var bn = (b.querySelector('.fav-name')?.textContent || '').trim();
          return collator.compare(an, bn);
        });
        items.forEach(function(li){ list.appendChild(li); });
        if(window.__favEnhanceLists) window.__favEnhanceLists();
      }
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(populate, 0); setTimeout(populate, 300); });
  window.addEventListener('load', function(){ setTimeout(populate, 0); setTimeout(populate, 500); });
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) populate();
  }, true);
})();

/* ===== original part150.js ===== */

(function(){
  try{
    var ok = Array.isArray(window.PARKS_POINTS) && window.PARKS_POINTS.length;
    if(!ok) window.PARKS_POINTS = [];
  }catch(_){
    window.PARKS_POINTS = [];
  }
})();

/* ===== original part151.js ===== */

(function(){
  var collator = new Intl.Collator('it', { sensitivity: 'base' });
  function norm(s){ return (s||'').toString().trim(); }
  function populate(){
    try{
      var list = document.getElementById('fav-list-parchi-piazze');
      if(!list) return;
      var parks = Array.isArray(window.PARKS_POINTS) ? window.PARKS_POINTS : [];
      var piazze = Array.isArray(window.PIAZZE_POINTS) ? window.PIAZZE_POINTS : [];
      if(!parks.length && !piazze.length) return;
      if(!list.children.length || list.querySelector('.fav-empty')){
        list.innerHTML = '';
        var items = [];
        parks.forEach(function(p){ items.push({ n: norm(p.name||p.title||'Senza nome'), t:'parco'  }); });
        piazze.forEach(function(p){ items.push({ n: norm(p.name||p.title||'Senza nome'), t:'piazza' }); });
        items.sort(function(a,b){ return collator.compare(a.n, b.n); });
        items.forEach(function(it){
          var li = document.createElement('li'); li.className = 'fav-item'; li.setAttribute('data-src', it.t);
          var span = document.createElement('span'); span.className = 'fav-name'; span.textContent = it.n;
          li.appendChild(span);
          list.appendChild(li);
        });
        if(window.__favEnhanceLists) window.__favEnhanceLists();
      }
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(populate, 0); setTimeout(populate, 300); });
  window.addEventListener('load', function(){ setTimeout(populate, 0); setTimeout(populate, 500); });
  document.addEventListener('click', function(){
    var menu = document.getElementById('fav-menu');
    if(menu && menu.classList.contains('open')) populate();
  }, true);
})();

/* ===== original part152.js ===== */

(function(){
  function norm(s){
    return (s || '').toString().trim().toLowerCase();
  }

  function buildIndexFromPoints(points){
    var out = {};
    if(!Array.isArray(points)) return out;
    points.forEach(function(p){
      var name = (p && p.name) ? p.name : '';
      var key  = norm(name);
      if(!key) return;
      var lat = parseFloat(p.lat), lng = parseFloat(p.lng);
      if(!isFinite(lat) || !isFinite(lng)) return;
      out[key] = [lat, lng];
    });
    return out;
  }

  function fillListFromPoints(listId, points, labelSrc){
    var ul = document.getElementById(listId);
    if(!ul) return;
    ul.innerHTML = '';

    if(!Array.isArray(points) || !points.length){
      var liEmpty = document.createElement('li');
      liEmpty.className = 'fav-item fav-empty';
      liEmpty.textContent = (labelSrc === 'chiese')
        ? 'Nessuna chiesa disponibile.'
        : 'Nessun palazzo disponibile.';
      ul.appendChild(liEmpty);
      return;
    }

    var collator = new Intl.Collator('it', { sensitivity: 'base' });
    var sorted = points.slice().sort(function(a,b){
      var an = (a.name || '').trim();
      var bn = (b.name || '').trim();
      return collator.compare(an, bn);
    });

    sorted.forEach(function(p){
      var name = (p && p.name) ? p.name : '';
      if(!name) return;
      var li = document.createElement('li');
      li.className = 'fav-item';
      li.setAttribute('data-src', labelSrc);

      var span = document.createElement('span');
      span.className = 'fav-name';
      span.textContent = name;

      li.appendChild(span);
      ul.appendChild(li);
    });

    var idx = buildIndexFromPoints(points);
    var indexTarget = null;
    if(labelSrc === 'chiese'){
      indexTarget = window.__FAV_INDEX_CHIESE;
    } else if(labelSrc === 'palazzi'){
      indexTarget = window.__FAV_INDEX_PALAZZI;
    }

    if(indexTarget && typeof indexTarget === 'object'){
      Object.keys(idx).forEach(function(k){
        indexTarget[k] = idx[k];
      });
    }

    if(typeof window.__favEnhanceLists === 'function'){
      window.__favEnhanceLists();
    }
  }

  function loadJSON(url, cb){
    fetch(url)
      .then(function(r){ return r.json(); })
      .then(function(data){ cb(null, data); })
      .catch(function(err){ cb(err || new Error('fetch error')); });
  }

  function loadPoints(preloaded, url, cb){
    if(Array.isArray(preloaded) && preloaded.length){
      cb(null, preloaded);
      return;
    }
    loadJSON(url, cb);
  }

  var chieseLoaded = false;
  var palazziLoaded = false;

  function populateChiese(){
    if(chieseLoaded && Array.isArray(window.CHIESE_POINTS)){
      fillListFromPoints('fav-list-chiese', window.CHIESE_POINTS, 'chiese');
      return;
    }

    loadPoints(window.CHIESE_POINTS, 'chiese/chiese_points.json', function(err, data){
      chieseLoaded = true;
      if(err){
        try{ console.warn('Errore dati CHIESE', err); }catch(_){}
      }
      window.CHIESE_POINTS = Array.isArray(data) ? data : [];
      fillListFromPoints('fav-list-chiese', window.CHIESE_POINTS, 'chiese');
    });
  }

  function populatePalazzi(){
    if(palazziLoaded && Array.isArray(window.PALAZZI_POINTS)){
      fillListFromPoints('fav-list-palazzi', window.PALAZZI_POINTS, 'palazzi');
      return;
    }

    loadPoints(window.PALAZZI_POINTS, 'palazzi/palazzi_points.json', function(err, data){
      palazziLoaded = true;
      if(err){
        try{ console.warn('Errore dati PALAZZI', err); }catch(_){}
      }
      window.PALAZZI_POINTS = Array.isArray(data) ? data : [];
      fillListFromPoints('fav-list-palazzi', window.PALAZZI_POINTS, 'palazzi');
    });
  }

  function boot(){
    populateChiese();
    populatePalazzi();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  }else{
    boot();
  }

  document.addEventListener('click', function(ev){
    var menu = document.getElementById('fav-menu');
    if(!menu || !menu.classList.contains('open')) return;
    if(ev.target && ev.target.closest && ev.target.closest('.fav-star-btn')) return;

    populateChiese();
    populatePalazzi();
  }, true);
})();


/* ===== original part153.js ===== */

(function(){
  function norm(s){
    return (s || '').toString().trim().toLowerCase();
  }

  function ensureIndexRef(key){
    var prop = '__FAV_INDEX_' + key;
    var idx = window[prop];
    if(!idx || typeof idx !== 'object') return null;
    return idx;
  }

  function addToIndex(idx, name, lat, lng){
    var k = norm(name);
    if(!k) return;
    var latNum = parseFloat(lat), lngNum = parseFloat(lng);
    if(!isFinite(latNum) || !isFinite(lngNum)) return;
    idx[k] = [latNum, lngNum];
  }

  function ensureList(listId){
    var ul = document.getElementById(listId);
    if(!ul) return null;
    if(!ul._favInitialized){
      ul.innerHTML = '';
      ul._favInitialized = true;
    }
    return ul;
  }

  function addListItem(ul, name){
    var li = document.createElement('li');
    li.className = 'fav-item';
    var span = document.createElement('span');
    span.className = 'fav-name';
    span.textContent = name || 'Senza nome';
    li.appendChild(span);
    ul.appendChild(li);
  }

  function sortList(ul){
    try{
      var collator = new Intl.Collator('it', { sensitivity:'base' });
      var items = Array.from(ul.querySelectorAll('.fav-item'));
      items.sort(function(a,b){
        var anEl = a.querySelector('.fav-name');
        var bnEl = b.querySelector('.fav-name');
        var an = (anEl && anEl.textContent || '').trim();
        var bn = (bnEl && bnEl.textContent || '').trim();
        return collator.compare(an, bn);
      });
      items.forEach(function(li){ ul.appendChild(li); });
    }catch(_){}
  }

  function getLatLngDefault(p){
    var lat = p && p.lat, lng = p && p.lng;
    var latNum = parseFloat(lat), lngNum = parseFloat(lng);
    if(!isFinite(latNum) || !isFinite(lngNum)) return null;
    return [latNum, lngNum];
  }

  function getTitleFromObject(obj){
    if(!obj || typeof obj !== 'object') return '';
    return obj.it || obj.en || obj.es || obj.fr || obj.ru || obj.ar || obj.zh || obj.lij || '';
  }

  function populateCategory(cfg){
    var idx = ensureIndexRef(cfg.indexKey);
    fetch(cfg.url)
      .then(function(r){ return r.json(); })
      .then(function(data){
        if(!Array.isArray(data) || !data.length) return;
        var ul = ensureList(cfg.listId);
        if(!ul) return;

        var seen = {};
        data.forEach(function(p){
          var name = cfg.getName(p);
          if(!name) return;
          name = name.toString().trim();
          if(!name || seen[name]) return;
          var coords = cfg.getLatLng(p);
          if(!coords) return;

          seen[name] = true;
          addListItem(ul, name);
          if(idx) addToIndex(idx, name, coords[0], coords[1]);
        });

        sortList(ul);
        if(window.__favEnhanceLists) window.__favEnhanceLists();
      })
      .catch(function(err){
        try{ console.warn('Errore dati preferiti', cfg.indexKey, err); }catch(_){}
      });
  }

  function boot(){
    // Sport (sport_points.json: name, lat, lng, ecc.)
    populateCategory({
      url: 'sport/sport_points.json',
      listId: 'fav-list-sport',
      indexKey: 'SPORT',          // usa window.__FAV_INDEX_SPORT
      getName: function(p){ return (p && p.name) || ''; },
      getLatLng: getLatLngDefault
    });

    // Cinema (cinema_points.json: name, lat, lng, ecc.)
    populateCategory({
      url: 'cinema/cinema_points.json',
      listId: 'fav-list-cinema',
      indexKey: 'CINEMA',
      getName: function(p){ return (p && p.name) || ''; },
      getLatLng: getLatLngDefault
    });

    // Teatri (teatri_points.json: title.{it,en,...}, lat, lng)
    populateCategory({
      url: 'teatri/teatri_points.json',
      listId: 'fav-list-teatri',
      indexKey: 'TEATRI',
      getName: function(p){
        var t = p && p.title;
        return getTitleFromObject(t);
      },
      getLatLng: getLatLngDefault
    });

    // Mostre (mostre_points.json: title.{it,...}, lat, lng)
    populateCategory({
      url: 'mostre/mostre_points.json',
      listId: 'fav-list-mostre',
      indexKey: 'MOSTRE',
      getName: function(p){
        var t = p && p.title;
        return getTitleFromObject(t);
      },
      getLatLng: getLatLngDefault
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  }else{
    boot();
  }
})();

/* ===== original part155.js ===== */

(function(){
  // --- Helper: current language ---
  function currentLang(){
    try{
      var a = document.documentElement.getAttribute("lang");
      if(a) return a;
      var b = localStorage.getItem("lang");
      if(b) return b;
    }catch(_){}
    return "it";
  }

  // --- Ensure central dict exists ---
  window.I18N_DICT = window.I18N_DICT || {};

  // --- Merge utility (shallow) ---
  function merge(dest, src){
    for(var k in src){
      if(!Object.prototype.hasOwnProperty.call(src,k)) continue;
      var v = src[k];
      if(v && typeof v === 'object' && !Array.isArray(v)){
        dest[k] = dest[k] || {};
        for(var k2 in v){
          if(!Object.prototype.hasOwnProperty.call(v,k2)) continue;
          dest[k][k2] = v[k2];
        }
      }else{
        dest[k] = v;
      }
    }
    return dest;
  }

  // --- Our translations for Favorites ---
  var FAV_DICT = {
  it:{ fav:{
  title:"Vai, vedi, fai",
  close:"Chiudi",
  clear:"Cancella tutti i preferiti",
  search:"Cerca...",
  bus:"Autobus",
  train:"Stazioni treno",
  metro:"Metro",
  funi:"Funi / Ascensori",
  mare:"Traghetti, battelli, navi",
  aereo:"Aeroporti",
  parks:"Parchi e piazze",
  locali:"Locali",
  forti:"Forti",
  musei:"Musei",
  chiese:"Chiese",
  palazzi:"Palazzi",
  cat_transport:"Mezzi di trasporto",
  cat_past:"Patrimonio storico",
  cat_places:"Intrattenimento",
  sport:"Sport",
  cinema:"Cinema",
  teatri:"Teatri",
  mostre:"Mostre"
}},

  en:{ fav:{
  title:"Go, see, do",
  close:"Close",
  clear:"Clear favorites",
  search:"Search...",
  bus:"Buses",
  train:"Train stations",
  metro:"Metro",
  funi:"Funiculars / Lifts",
  mare:"Ferries and boats",
  aereo:"Airports",
  parks:"Parks and squares",
  locali:"Venues",
  forti:"Forts",
  musei:"Museums",
  chiese:"Churches",
  palazzi:"Palaces",
  cat_transport:"Transport",
  cat_past:"Historic heritage",
  cat_places:"Entertainment",
  sport:"Sports",
  cinema:"Cinemas",
  teatri:"Theatres",
  mostre:"Exhibitions"
}},

es:{ fav:{
  title:"Ve, mira, haz",
  close:"Cerrar",
  clear:"Borrar favoritos",
  search:"Buscar...",
  bus:"Autobuses",
  train:"Estaciones de tren",
  metro:"Metro",
  funi:"Funiculares / Ascensores",
  mare:"Ferries y barcos",
  aereo:"Aeropuertos",
  parks:"Parques y plazas",
  locali:"Locales",
  forti:"Fortalezas",
  musei:"Museos",
  chiese:"Iglesias",
  palazzi:"Palacios",
  cat_transport:"Medios de transporte",
  cat_past:"Patrimonio histórico",
  cat_places:"Entretenimiento",
  sport:"Deporte",
  cinema:"Cines",
  teatri:"Teatros",
  mostre:"Exposiciones"
}},

    fr:{ fav:{
  title:"Va, vois, fais",
  close:"Fermer",
  clear:"Effacer les favoris",
  search:"Rechercher...",
  bus:"Bus",
  train:"Gares",
  metro:"Métro",
  funi:"Funiculaires / Ascenseurs",
  mare:"Ferries et bateaux",
  aereo:"Aéroports",
  parks:"Parcs et places",
  locali:"Lieux",
  forti:"Forts",
  musei:"Musées",
  chiese:"Églises",
  palazzi:"Palais",
  cat_transport:"Moyens de transport",
  cat_past:"Patrimoine historique",
  cat_places:"Divertissement",
  sport:"Sport",
  cinema:"Cinémas",
  teatri:"Théâtres",
  mostre:"Expositions"
}},

    ar:{ fav:{
  title:"اذهب، شاهد، افعل",
  close:"إغلاق",
  clear:"حذف المفضّلة",
  search:"ابحث...",
  bus:"الحافلات",
  train:"محطات القطار",
  metro:"المترو",
  funi:"القطارات الجبلية / المصاعد",
  mare:"العبّارات والقوارب",
  aereo:"المطارات",
  parks:"الحدائق والساحات",
  locali:"الأماكن",
  forti:"الحصون",
  musei:"المتاحف",
  chiese:"الكنائس",
  palazzi:"القصور",
  cat_transport:"وسائل النقل",
  cat_past:"التراث التاريخي",
  cat_places:"الترفيه",
  sport:"رياضة",
  cinema:"سينما",
  teatri:"مسارح",
  mostre:"معارض"
}},

    ru:{ fav:{
  title:"Иди, смотри, делай",
  close:"Закрыть",
  clear:"Очистить избранное",
  search:"Поиск...",
  bus:"Автобусы",
  train:"Железнодорожные станции",
  metro:"Метро",
  funi:"Фуникулёры / лифты",
  mare:"Паромы и лодки",
  aereo:"Аэропорты",
  parks:"Парки и площади",
  locali:"Заведения",
  forti:"Крепости",
  musei:"Музеи",
  chiese:"Церкви",
  palazzi:"Дворцы",
  cat_transport:"Транспорт",
  cat_past:"Историческое наследие",
  cat_places:"Развлечения",
  sport:"Спорт",
  cinema:"Кинотеатры",
  teatri:"Театры",
  mostre:"Выставки"
}},

    zh:{ fav:{
  title:"去，看，做",
  close:"关闭",
  clear:"清空收藏",
  search:"搜索...",
  bus:"公交车",
  train:"火车站",
  metro:"地铁",
  funi:"缆车 / 电梯",
  mare:"渡轮和船只",
  aereo:"机场",
  parks:"公园和广场",
  locali:"场所",
  forti:"堡垒",
  musei:"博物馆",
  chiese:"教堂",
  palazzi:"宫殿",
  cat_transport:"交通",
  cat_past:"历史遗产",
  cat_places:"娱乐",
  sport:"体育",
  cinema:"电影院",
  teatri:"剧院",
  mostre:"展览"
}},

lij:{ fav:{
  title:"Vanni, veddi, insa",
  close:"Særa",
  clear:"Purga i preferiti",
  search:"Çerca...",
  bus:"Bus",
  train:"Staçioin do treno",
  metro:"Metropolitana",
  funi:"Ascensoî / Funicolæ",
  mare:"Tragetti, battélli, nàvi",
  aereo:"Aeroporti",
  parks:"Giardini e ciàsse",
  locali:"Locali",
  forti:"Forti",
  musei:"Musei",
  chiese:"Gése",
  palazzi:"Palassi",
  cat_transport:"Mezzi de trasporto",
  cat_past:"Patrimònio stòrico",
  cat_places:"Intrattenimento",
  sport:"Sport",
  cinema:"Cinema",
  teatri:"Teatri",
  mostre:"Mostre"
}}
};


  // --- Merge into central dict ---
  for(var lang in FAV_DICT){
    if(!Object.prototype.hasOwnProperty.call(FAV_DICT, lang)) continue;
    window.I18N_DICT[lang] = window.I18N_DICT[lang] || {};
    merge(window.I18N_DICT[lang], FAV_DICT[lang]);
  }

  // --- Provide a fallback t() if none is present ---
  if(typeof window.t !== 'function'){
    window.t = function(key){
      var lang = currentLang();
      var dict = window.I18N_DICT[lang] || window.I18N_DICT["it"] || {};
      var segs = key.split('.');
      var cur = dict;
      for(var i=0;i<segs.length;i++){
        if(cur && typeof cur === 'object' && segs[i] in cur){
          cur = cur[segs[i]];
        }else{
          cur = null; break;
        }
      }
      if(cur == null){
        // fallback to it
        if(lang !== 'it'){
          dict = window.I18N_DICT["it"] || {};
          cur = dict;
          for(var j=0;j<segs.length;j++){
            if(cur && typeof cur === 'object' && segs[j] in cur){
              cur = cur[segs[j]];
            }else{ cur = key; break; }
          }
          return cur || key;
        }
        return key;
      }
      return cur;
    };
  }

    // --- Binder: apply translations to the Favorites UI ---
  function i18nFavoritesApply(){
    var root = document.getElementById('fav-menu') || document;

    // Etichetta "Preferiti" anche dentro al pannello Home
    try{
      var hl = document.querySelector('#menu-home .mh-item.gm-row[data-key="preferiti"] .gm-row-label, #menu-home .mh-item.gm-row[data-key="preferiti"] .mh-label');
      if(hl) hl.textContent = t('fav.title');
    }catch(_e){}


    // Header
    var title = root.querySelector('header h3, .fav-title, [data-role="fav-title"]');
    var close = root.querySelector('#fav-close, .fav-close, [data-role="close-fav"]');
    var clear = root.querySelector('#fav-clear-btn, .fav-clear, [data-role="clear-fav"]');

    if(title){
      title.textContent = t('fav.title');
      title.setAttribute('aria-label', t('fav.title'));
      if(!title.getAttribute('title')) title.setAttribute('title', t('fav.title'));
    }
    if(close){
      close.textContent = t('fav.close');
      close.setAttribute('aria-label', t('fav.close'));
      close.setAttribute('title', t('fav.close'));
    }
    if(clear){
      clear.textContent = t('fav.clear');
      clear.setAttribute('aria-label', t('fav.clear'));
      clear.setAttribute('title', t('fav.clear'));
    }

// Search input
var search = root.querySelector('#fav-search');
if(search){
  search.placeholder = t('fav.search');
  search.setAttribute('aria-label', t('fav.search'));
  if(!search.getAttribute('title')) search.setAttribute('title', t('fav.search'));
}


    // Sezioni principali (3 categorie)
    var map = {
      'cat-transport':'cat_transport',
      'cat-past':'cat_past',
      'cat-places':'cat_places'
    };

    root.querySelectorAll('.fav-acc-section[data-key]').forEach(function(sec){
      var key = map[sec.getAttribute('data-key')];
      if(!key) return;
      var el = sec.querySelector('.fav-acc-title');
      if(!el) return;
      el.textContent = t('fav.'+key);
      var head = sec.querySelector('.fav-acc-head');
      if(head){
        head.setAttribute('aria-label', t('fav.'+key));
        if(!head.getAttribute('title')) head.setAttribute('title', t('fav.'+key));
      }
    });

    // Sottotitoli interni (Autobus, Treni, ecc.)
root.querySelectorAll('.fav-subtitle[data-i18n-fav]').forEach(function(el){
  var key = el.getAttribute('data-i18n-fav');
  if(!key) return;

  // Se abbiamo inserito una label interna, aggiorniamo solo quella
  var label = el.querySelector('.fav-subtitle-label');
  if(label){
    label.textContent = t('fav.'+key);
  }else{
    // fallback: vecchio comportamento
    el.textContent = t('fav.'+key);
  }
});

  }
  window.i18nFavoritesApply = i18nFavoritesApply;


  // --- Wiring: run on load and language changes ---
  function boot(){
    i18nFavoritesApply();
    // If app dispatches a central event, hook it
    window.addEventListener('i18n:changed', i18nFavoritesApply);
    // React to <html lang> changes
    var mo = new MutationObserver(i18nFavoritesApply);
    mo.observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
    // React to storage changes (other tabs)
    window.addEventListener('storage', function(e){ if(e.key==='lang') i18nFavoritesApply(); });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  }else{
    boot();
  }
})();

/* ===== original part156.js ===== */

(function(){
  // mappa tra chiavi data-layer-toggle e classi dei quick toggles
  var MAP = {
    bus:    '.qt-bus',
    train:  '.qt-train',
    metro:  '.qt-metro',
    funi:   '.qt-funi',
    mare:   '.qt-mare',
    aereo:  '.qt-aereo',
    forti:  '.qt-forti',
    musei:  '.qt-museum',
    chiese: '.qt-chiese',
    palazzi:'.qt-palazzi',
    parchi: '.qt-parchi',
    locali: '.qt-locali',
    sport:  '.qt-sport',
    cinema: '.qt-cinema',
    teatri: '.qt-teatri',
    mostre: '.qt-mostre'
  };

  function findQuickBtn(key){
    var sel = MAP[key];
    if(!sel) return null;
    // quick toggles sono dentro #quick-toggles o simile
    var root = document.getElementById('quick-toggles') || document;
    return root.querySelector(sel);
  }

  function buildStructure(){
    document.querySelectorAll('#fav-menu .fav-subtitle').forEach(function(sub){
      // evita di ricostruire se già fatto
      if(sub.querySelector('.fav-subtitle-label')) return;

      var text = (sub.textContent || '').trim();
      sub.textContent = '';

      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'fav-subtitle-chip';
      chip.setAttribute('aria-pressed','false');
      chip.setAttribute('aria-label', text || 'Toggle layer');
      chip.addEventListener('click', function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        var key = sub.getAttribute('data-layer-toggle');
        if(!key) return;
        var btn = findQuickBtn(key);
        if(!btn || chip.classList.contains('is-disabled')) return;
        btn.click(); // usiamo tutta la logica già esistente
      });

      var label = document.createElement('span');
      label.className = 'fav-subtitle-label';
      label.textContent = text;

      sub.appendChild(chip);
      sub.appendChild(label);
    });
  }

  function updateOne(sub){
    var key = sub.getAttribute('data-layer-toggle');
    if(!key) return;
    var chip = sub.querySelector('.fav-subtitle-chip');
    if(!chip) return;

    var btn = findQuickBtn(key);
    if(!btn){
      chip.classList.add('is-disabled');
      chip.setAttribute('aria-disabled','true');
      chip.classList.remove('is-on');
      return;
    }

    var isOn = btn.getAttribute('aria-pressed') === 'true';
    chip.classList.toggle('is-on', isOn);
    chip.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  }

  function syncAll(){
    document.querySelectorAll('#fav-menu .fav-subtitle[data-layer-toggle]').forEach(updateOne);
  }

  function observeQuickToggles(){
    var root = document.getElementById('quick-toggles');
    if(!root || typeof MutationObserver === 'undefined') return;

    var mo = new MutationObserver(function(muts){
      var changed = false;
      muts.forEach(function(m){
        if(m.type === 'attributes' && m.attributeName === 'aria-pressed'){
          changed = true;
        }
      });
      if(changed) syncAll();
    });

    mo.observe(root, {
      attributes:true,
      subtree:true,
      attributeFilter:['aria-pressed']
    });
  }

  function init(){
    var menu = document.getElementById('fav-menu');
    if(!menu) return;

    buildStructure();
    syncAll();
    observeQuickToggles();

    // ogni volta che riapri il menu, risincronizza
    document.addEventListener('click', function(){
      if(menu.classList && menu.classList.contains('open')){
        syncAll();
      }
    }, true);

    // integra con i18n: quando cambia lingua, la label viene aggiornata da i18nFavoritesApply
    if(window.addEventListener){
      window.addEventListener('i18n:changed', function(){ syncAll(); });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();

/* ===== original part157.js ===== */

(function(){
  var prevFavOpen = null;

  function getFavMenu(){
    return document.getElementById('fav-menu') || document.querySelector('.menu-favorites, .fav-menu, #favorites');
  }

  function isFavOpen(){
    var m = getFavMenu();
    if(!m) return false;
    var cs = window.getComputedStyle(m);
    var hasOpen = m.classList.contains('open');
    var notHiddenClass = !m.classList.contains('hidden');
    var visible = cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
    return (hasOpen || notHiddenClass) && visible;
  }

  function tryOpenFav(){
    var m = getFavMenu();
    if(!m) return;
    // Try to force visible classes
    m.classList.add('open');
    m.classList.remove('hidden');
    m.style.display = '';

    // If app uses toggle button, click it as fallback
    setTimeout(function(){
      if(!isFavOpen()){
        var btn = document.querySelector('#btn-fav, #favorites-btn, [data-role="favorites-btn"], .btn-favorites, .btn[data-role="favorites"], .toolbar .btn.star, .toolbar [data-key="favorites"]');
        if(btn) btn.click();
      }
    }, 60);
  }

  function scheduleRestore(){
    // Wait slightly for the app to process the lang switch and any UI reflows
    setTimeout(function(){
      if(prevFavOpen && !isFavOpen()){
        tryOpenFav();
      }
      prevFavOpen = null;
    }, 150);
  }

  // Capture clicks that likely change language
  document.addEventListener('click', function(e){
    var t = e.target && (e.target.closest('[data-lang]') ||
                         e.target.closest('.fr-flag, .flag, .mh-flag') ||
                         e.target.closest('[data-role="lang"], [data-toggle="lang"]'));
    if(!t) return;
    prevFavOpen = isFavOpen();
    scheduleRestore();
  }, true);

  // Also react to global language change signals
  window.addEventListener('i18n:changed', scheduleRestore);
  var mo = new MutationObserver(function(muts){
    for(var i=0;i<muts.length;i++){
      if(muts[i].attributeName === 'lang'){
        scheduleRestore(); break;
      }
    }
  });
  mo.observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });

  // Defensive: if storage 'lang' flips from another tab
  window.addEventListener('storage', function(e){
    if(e.key === 'lang') scheduleRestore();
  });
})();

