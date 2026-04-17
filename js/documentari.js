// Extracted from inline.js documentari-related parts
// Generated for Genova mApp manual extraction workflow.

/* ===== part053.js ===== */
// --- PATCH: Aggiungi sezione "Documentari" in Storia + toggle specchio con Legenda ---
(function(){
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  function makeSection(title){
    var sec = document.createElement('div'); sec.className = 'acc-section'; sec.setAttribute('aria-expanded','false');
    var head = document.createElement('div'); head.className = 'acc-head'; head.setAttribute('role','button'); head.tabIndex = 0;
    var t = document.createElement('div'); t.className = 'acc-title'; t.textContent = title;
    var right = document.createElement('div'); right.style.display='flex'; right.style.alignItems='center'; right.style.gap='.4rem';
    var chev = document.createElementNS('http://www.w3.org/2000/svg','svg'); chev.setAttribute('viewBox','0 0 24 24'); chev.setAttribute('width','14'); chev.setAttribute('height','14'); chev.classList.add('acc-chevron');
    var p = document.createElementNS('http://www.w3.org/2000/svg','path'); p.setAttribute('d','M8 5l8 7-8 7'); p.setAttribute('fill','none'); p.setAttribute('stroke','currentColor'); p.setAttribute('stroke-width','2'); p.setAttribute('stroke-linecap','round'); p.setAttribute('stroke-linejoin','round');
    chev.appendChild(p);
    right.appendChild(chev);
    head.appendChild(t); head.appendChild(right);
    var body = document.createElement('div'); body.className = 'acc-body';
    sec.appendChild(head); sec.appendChild(body);
    function toggle(){ var open = sec.getAttribute('aria-expanded')==='true'; sec.setAttribute('aria-expanded', String(!open)); }
    head.addEventListener('click', toggle);
    head.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); }});
    return {sec, body};
  }
  function getOrangeState(){
    try { return localStorage.getItem('legend_orange') !== '0'; } catch(e){ return true; }
  }
  function setOrangeState(v){
    try { localStorage.setItem('legend_orange', v ? '1' : '0'); }catch(e){}
    var c = document.getElementById('chk-doc'); if(c) c.checked = !!v;
  }
  ready(function(){
    var menu = document.getElementById('opere-menu'); if(!menu) return;
    var wrap = menu.querySelector('.opere-accordion');
    // Se l'accordion non esiste ancora, abort (verrÃ  creato dal patch principale)
    if(!wrap){ return; }

    // Crea la sezione "Documentari"
    var dSec = makeSection('Documentari');
    // Corpo: un'unica riga con checkbox "Documentari"
    var label = document.createElement('label');
    label.style.display = 'flex'; label.style.alignItems='center'; label.style.gap='.5rem'; label.style.fontSize='.85rem'; label.style.margin='.25rem 0';
    var input = document.createElement('input'); input.type='checkbox'; input.id='chk-doc';
    var chip = document.createElement('span'); chip.className='chip';
    var dot = document.createElement('span'); dot.className='dot orange';
    var txt = document.createTextNode('Documentari');
    chip.appendChild(dot); chip.appendChild(txt);
    label.appendChild(input); label.appendChild(chip);
    dSec.body.appendChild(label);

    // Inserisci la sezione alla fine dell'accordion
    wrap.appendChild(dSec.sec);

    // Click sulla testata: oltre ad aprire/chiudere, toggla anche il checkbox
    var head = dSec.sec.querySelector('.acc-head');
    if(head){
      head.addEventListener('click', function(ev){
        // Evita doppio toggle quando si clicca proprio sul checkbox
        if (ev.target && (ev.target.tagName === 'INPUT' || ev.target.closest('label'))) return;
        chkDoc.checked = !chkDoc.checked;
        apply();
      });
    }

    // Sincronizzazione con la Legenda (specchio)
    var chkLegend = document.getElementById('chk-orange');
    var chkDoc = input;
    function mirror(src, dst){
      if(!dst) return;
      if(dst.checked !== src.checked){ dst.checked = src.checked; }
    }
    function apply(){
      // Aggiorna stato unico e applica visibilitÃ 
      setOrangeState(chkDoc.checked);
      if(typeof applyLegendVisibility === 'function'){ try{ applyLegendVisibility(); }catch(_){ } }
      else {
        // Fallback: applica direttamente la visibilitÃ  al layer arancione
        try{
          if (typeof map !== 'undefined' && typeof groupOrange !== 'undefined' && groupOrange){
            if (chkDoc.checked && !map.hasLayer(groupOrange)) map.addLayer(groupOrange);
            if (!chkDoc.checked && map.hasLayer(groupOrange)) map.removeLayer(groupOrange);
          }
        }catch(e){}
      }
    }
    // Stato iniziale
    var want = getOrangeState();
    if(chkLegend) chkLegend.checked = want;
    chkDoc.checked = want;
    // Listener bidirezionali
    if(chkLegend){
      chkLegend.addEventListener('change', function(){ mirror(chkLegend, chkDoc); apply(); });
    }
    chkDoc.addEventListener('change', function(){ mirror(chkDoc, chkLegend); apply(); });
  });
})();

/* ===== part054.js ===== */
// --- PATCH: Nuovi "puntini Doc" caricati da /punti_doc/*.txt e collegati a Storia > Documentari ---
(function(){
  var DOCS = [];
  var docsById = {};
  var markersDocById = {};
  var groupDoc = null;

  var DEFAULT_FILES = [
    'punti_doc/punti_doc_piazza_de_ferrari.txt',
    'punti_doc/punti_doc_san_teodoro.txt',
    'punti_doc/punti_doc_seno_di_giano.txt',
    'punti_doc/punti_doc_viaxxsettembre.txt'
  ];

  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }

  function getYoutubeId(url){
    try{
      if(!url) return null;
      var u = new URL(url, location.href);
      if(u.hostname.includes('youtu.be')) return u.pathname.replace('/','').trim();
      if(u.hostname.includes('youtube.com')){
        var v = u.searchParams.get('v'); if(v) return v;
        var path = u.pathname.split('/'); var idx = path.indexOf('embed'); if(idx>=0 && path[idx+1]) return path[idx+1];
      }
      return null;
    }catch(e){ return null; }
  }

function getDocYoutubeMap(doc){
  // 1) prioritÃ : mappa esterna per id
  try{
    var map = window.DOC_VIDEO_I18N || null;
    if(map && doc && doc.id && map[doc.id] && typeof map[doc.id] === 'object') return map[doc.id];
  }catch(_){}

  // 2) fallback: se un giorno metti direttamente doc.youtube come oggetto
  if(doc && doc.youtube && typeof doc.youtube === 'object') return doc.youtube;

  return null;
}

function pickDocYoutubeUrl(doc){
  // Se câÃ¨ una mappa per lingua, scegli in base a:
  // - preferenza salvata per quel doc (se lâutente clicca una lingua)
  // - lingua corrente dellâapp
  // - fallback it/en/qualunque cosa
  var m = getDocYoutubeMap(doc);
  if(m){
    var pref = '';
    try{ pref = localStorage.getItem('doc_lang_' + (doc.id||'')) || ''; }catch(_){}
    var lang = (pref || currentLangDoc() || 'it').toLowerCase();

    return m[lang] || m.it || m.en || (function(){
      for(var k in m){ if(m[k]) return m[k]; }
      return '';
    })();
  }

  // altrimenti usa il valore âclassicoâ
  return (doc && doc.youtube) ? doc.youtube : '';
}


function currentLangDoc(){
  var raw = (
    document.documentElement.getAttribute('lang') ||
    (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) ||
    'it'
  );
  return (raw || 'it').toLowerCase().split('-')[0];
}

function pickTextDoc(v){
  if(!v) return '';
  if(typeof v === 'string') return v;
  var lang = currentLangDoc();
  return v[lang] || v.it || v.en || '';
}

function getDocDesc(doc){
  try{
    if(!doc) return '';

    // 1) se un giorno metti "desc" direttamente nel .txt del doc (stringa o oggetto i18n)
    var direct = doc.desc || doc.description || null;
    var out = pickTextDoc(direct);
    if(out) return out;

    // 2) altrimenti usa la mappa esterna per id
    var map = window.DOC_DESC_I18N || null;
    if(map && doc.id && map[doc.id]){
      out = pickTextDoc(map[doc.id]);
      if(out) return out;
    }

    // 3) fallback (quello che hai adesso)
    out = pickTextDoc(doc.info);
    if(out) return out;
    if(typeof doc.info === 'string') return doc.info;
  }catch(_){}
  return '';
}

var DOC_FLAG = {
  it:'ð®ð¹', en:'ð¬ð§', es:'ðªð¸', fr:'ð«ð·', ar:'ð¸ð¦', ru:'ð·ðº', zh:'ð¨ð³', lij:'ð´'
};



  function makePopupHTML(doc){
var ytUrl = pickDocYoutubeUrl(doc);
var vid   = getYoutubeId(ytUrl);
  var title = pickTextDoc(doc.name) || doc.id || 'Documentario';
  var info  = pickTextDoc(doc.info) || '';
  var desc = getDocDesc(doc);


  var h  = '<div class="doc-card" data-id="' + escapeAttr(doc.id||'') + '">';
      h +=   '<div class="doc-card__head">';
      h +=     '<div class="doc-card__title">' + escapeHtml(title) + '</div>';
      h +=     '<span class="doc-card__badge">Premium</span>';
      h +=   '</div>';

var ymap = getDocYoutubeMap(doc);
if(ymap){
  h += '<div class="doc-lang" aria-label="Lingua video">';
  Object.keys(ymap).forEach(function(code){
    var url = ymap[code];
    var id  = getYoutubeId(url);
    if(!id) return;
    var label = (DOC_FLAG[code] || String(code||'').toUpperCase());
h += '<button type="button" class="doc-lang-btn" data-lang="' + escapeAttr(code) +
     '" data-ytid="' + escapeAttr(id) + '" title="' + escapeAttr(code.toUpperCase()) + '">' +
     escapeHtml(label) + '</button>';
  });
  h += '</div>';
}


        if(vid){
          h +=     '<button type="button" class="doc-thumb" data-ytid="' + vid + '" aria-label="Riproduci video">';
          var thumb = doc.thumbnail || ('https://img.youtube.com/vi/' + vid + '/hqdefault.jpg');
          h +=       '<img alt="Anteprima video" src="' + escapeAttr(thumb) + '">';
          h +=     '</button>';
        }
        h +=   '</div>';
        h +=   '<div class="doc-card__desc">' + escapeHtml(desc) + '</div>';
        h +=   '<div class="doc-card__foot"><button type="button" class="doc-btn doc-close">Chiudi</button></div>';
        h += '</div>';
    return h;
  }
  function escapeHtml(s){ return String(s||'').replace(/[&<>]/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]); }); }
  function escapeAttr(s){ return String(s||'').replace(/"/g, '&quot;'); }

  function getOrangeState(){
    try { return localStorage.getItem('legend_orange') !== '0'; } catch(e){ return true; }
  }
  function setOrangeState(v){
    try { localStorage.setItem('legend_orange', v ? '1' : '0'); }catch(e){}
    var c1 = document.getElementById('chk-orange'); if(c1) c1.checked = !!v;
    var c2 = document.getElementById('chk-doc'); if(c2) c2.checked = !!v;
  }
  function ensureGroupDoc(){
    if(!groupDoc && window.L){
      try{ groupDoc = L.layerGroup(); }catch(e){ groupDoc = null; }
    }
    return groupDoc;
  }
  function syncGroupDocToMaster(){
    var want = getOrangeState();
    var g = ensureGroupDoc(); if(!g || !window.map) return;
    var has = map.hasLayer(g);
    if(want && !has) map.addLayer(g);
    if(!want && has) map.removeLayer(g);
  }
  function clearOldOrange(){
    try{
      if(window.groupOrange){
        if(groupOrange.getLayers){ groupOrange.clearLayers(); }
        if(window.map && map.hasLayer(groupOrange)) map.removeLayer(groupOrange);
      }
    }catch(_){}
  }

  function loadManifest(){ 
    // optional manifest to list files dynamically
    return fetch('punti_doc/manifest.json', {cache:'no-store'}).then(function(r){
      if(!r.ok) throw new Error('no manifest');
      return r.json();
    }).catch(function(){ return DEFAULT_FILES; });
  }
  function fetchDocFile(url){
    return fetch(url, {cache:'no-store'}).then(function(r){
      if(!r.ok) throw new Error('not ok');
      return r.text();
    }).then(function(txt){
      var s = txt.trim();
      if(!s.startsWith('{')) s = '{' + s + '}';
      // remove trailing commas before closing }
      s = s.replace(/,\s*}/g, '}');
      return JSON.parse(s);
    }).then(function(obj){
      obj._src = url;
      return obj;
    }).catch(function(e){
      console.warn('Errore parse doc', url, e);
      return null;
    });
  }




  function buildMarkers(){
    var g = ensureGroupDoc(); if(!g) return;
    function mountInlinePlayer(container, vid){
      try{
        if(!vid) return;
        var media = container.querySelector('.doc-card__media'); if(!media) return;
        // Avoid double mount
        if(media.querySelector('.doc-yt-embed')) return;
        var iframe = document.createElement('iframe');
        iframe.className = 'doc-yt-embed';
        iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen','');
        iframe.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
        var isSub = !!(window.isSubscribed);
        var url = 'https://www.youtube-nocookie.com/embed/' + vid + '?autoplay=1&playsinline=1&rel=0&modestbranding=1';
        if(!isSub){ url += '&end=10'; }
        iframe.src = url;
        var trigger = media.querySelector('.doc-thumb');
        if(trigger){ trigger.replaceWith(iframe); } else { media.appendChild(iframe); }
        // Soft paywall message for non-subscribed
        if(!isSub){
          setTimeout(function(){
            try{
              // If still not subscribed and iframe exists, show paywall
              if(!window.isSubscribed && media.querySelector('.doc-yt-embed')){
                var pw = document.createElement('div'); pw.className = 'doc-paywall';
                var msg = document.createElement('div'); msg.className = 'doc-pay-msg';
                msg.textContent = 'Anteprima 10s. Abbonati per vedere tutto.';
                var btn = document.createElement('button'); btn.className='doc-btn'; btn.textContent='Abbonati';
                btn.addEventListener('click', function(){ try{ document.getElementById('btn-subscribe').click(); }catch(_){ alert('Apri abbonamento dalla barra.'); } });
                pw.appendChild(msg); pw.appendChild(btn);
                media.parentNode.insertBefore(pw, media.nextSibling);
              }
            }catch(_){}
          }, 11000);
        }
      }catch(_){}
    }
    function destroyInlinePlayer(container){
      try{
        var media = container.querySelector('.doc-card__media');
        if(!media) return;
        var iframe = media.querySelector('.doc-yt-embed');
        if(iframe){ iframe.src=''; iframe.remove(); }
        var pw = container.querySelector('.doc-paywall'); if(pw) pw.remove();
      }catch(_){}
    }
    DOCS.forEach(function(d){
      if(!d || !d.id || !Array.isArray(d.coords)) return;
      if(markersDocById[d.id]) return;
      try{
        var m = L.marker(d.coords, { icon: docIcon() });
        var html = makePopupHTML(d);
        m.bindPopup(html, { maxWidth: 360, className: 'doc-pop' });
        m.on('popupopen', function(ev){
          try{
            ev.popup.setContent(makePopupHTML(d));
            var el = ev.popup.getElement(); if(!el) return;
            var trigger = el.querySelector('.doc-thumb');
if(trigger){
  trigger.addEventListener('click', function(e){
    e.preventDefault(); e.stopPropagation();
    var vid = trigger.getAttribute('data-ytid')||'';
    mountInlinePlayer(el, vid);
  }, {once:true});
}

// â BOTTONI LINGUA: sempre, fuori dall'else
var langBtns = el.querySelectorAll('.doc-lang-btn');
if(langBtns && langBtns.length){
  langBtns.forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      var vid  = btn.getAttribute('data-ytid') || '';
      var lang = btn.getAttribute('data-lang') || '';
      try{ localStorage.setItem('doc_lang_' + (d.id||''), lang); }catch(_){}
      try{ destroyInlinePlayer(el); }catch(_){}
      mountInlinePlayer(el, vid);
    });
  });
}

// â mount immediato SOLO se NON c'Ã¨ la thumb
if(!trigger){
  var vidHolder = el.querySelector('[data-ytid]');
  if(vidHolder){
    mountInlinePlayer(el, vidHolder.getAttribute('data-ytid'));
  }
}

            var btnClose = el.querySelector('.doc-close');
            if(btnClose){ btnClose.addEventListener('click', function(){ try{ ev.popup._close(); }catch(_){ try{ map.closePopup(ev.popup); }catch(__){} } }); }
          }catch(_){}
        });

// Aggiorna il popup dei Documentari al cambio lingua (senza doverlo chiudere/riaprire)
function refreshDocPopup(){
  try{
    if(!(m.isPopupOpen && m.isPopupOpen())) return;

    // rigenera HTML nella lingua corrente
    m.setPopupContent(makePopupHTML(d));

    // dopo il rerender, ri-aggancia i listener interni (thumb + close)
    var pop = (m.getPopup && m.getPopup()) || null;
    var el  = (pop && pop.getElement && pop.getElement()) || null;
    if(!el) return;

    var trigger = el.querySelector('.doc-thumb');
    if(trigger){
      trigger.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        var vid = trigger.getAttribute('data-ytid') || '';
        mountInlinePlayer(el, vid);
      }, { once:true });
    }

var langBtns = el.querySelectorAll('.doc-lang-btn');
if(langBtns && langBtns.length){
  langBtns.forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      var vid = btn.getAttribute('data-ytid') || '';
      var lang = btn.getAttribute('data-lang') || '';
      try{ localStorage.setItem('doc_lang_' + (d.id||''), lang); }catch(_){}
      try{ destroyInlinePlayer(el); }catch(_){}
      mountInlinePlayer(el, vid);
    });
  });
}


    var btnClose = el.querySelector('.doc-close');
    if(btnClose){
      btnClose.addEventListener('click', function(){
        try{ pop && pop._close && pop._close(); }
        catch(_){ try{ map && map.closePopup && map.closePopup(pop); }catch(__){} }
      });
    }
  }catch(_){}
}

try{
  document.addEventListener('app:set-lang', refreshDocPopup);
}catch(_){}


        m.on('popupclose', function(ev){ try{ var el = ev.popup && ev.popup.getElement ? ev.popup.getElement() : null; if(el) destroyInlinePlayer(el); }catch(_){ } });
        m.on('click', function(){
          setOrangeState(true);
          syncGroupDocToMaster();
          try{ m.openPopup(); }catch(_){}
          try{ map.setView(m.getLatLng(), Math.max(16, map.getZoom?map.getZoom():16), {animate:true}); }catch(_){}
          try{ history.replaceState(null, '', '?doc=' + encodeURIComponent(d.id)); }catch(_){}
        });
        markersDocById[d.id] = m;
        if(groupDoc) groupDoc.addLayer(m);
      }catch(_){}
    });
  }

  function getSectionByTitle(title){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for(var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(t && t.textContent.trim().toLowerCase() === title.toLowerCase()) return secs[i];
    }
    return null;
  }

  function getItemState(id){
    try{ var v = localStorage.getItem('doc_item_'+id); return v!== '0'; }catch(e){ return true; }
  }
  function setItemState(id, on){
    try{ localStorage.setItem('doc_item_'+id, on ? '1' : '0'); }catch(e){}
  }

  function applyItemVisibility(){
    var masterOn = getOrangeState();
    Object.keys(markersDocById).forEach(function(id){
      var marker = markersDocById[id];
      var on = masterOn && getItemState(id);
      if(groupDoc){
        if(on){ if(!groupDoc.hasLayer(marker)) groupDoc.addLayer(marker); }
        else { if(groupDoc.hasLayer(marker)) groupDoc.removeLayer(marker); }
      }
    });
  }

  function buildList(){
    var sec = getSectionByTitle('Documentari'); if(!sec) return;
    sec.setAttribute('aria-expanded','true'); // apri per feedback
    var body = sec.querySelector('.acc-body'); if(!body) return;
    var list = body.querySelector('.doc-list');
    if(!list){ list = document.createElement('div'); list.className='doc-list'; body.appendChild(list); } else { list.innerHTML=''; }
    // badge conteggio
    try{
      var head = sec.querySelector('.acc-head');
      var right = head ? head.lastElementChild : null;
      var badge = right ? right.querySelector('.acc-badge') : null;
      if(!badge && right){
        badge = document.createElement('span'); badge.className='acc-badge'; right.insertBefore(badge, right.firstChild);
      }
      if(badge) badge.textContent = String(DOCS.length||'');
    }catch(_){}
    // vuoto? mostra messaggio
    if(!DOCS.length){ var msg=document.createElement('div'); msg.style.fontSize='.8rem'; msg.style.opacity='.8'; msg.textContent='Nessun documentario trovato'; list.appendChild(msg); return; }
    // righe
    
    // Mostra tutti (master per i singoli Doc)
    var rowAll = document.createElement('label');
    rowAll.style.display='flex'; rowAll.style.alignItems='center'; rowAll.style.gap='.5rem'; rowAll.style.fontSize='.85rem'; rowAll.style.margin='.1rem 0 .25rem';
    var chkAll = document.createElement('input'); chkAll.type='checkbox'; chkAll.id='chk-doc-all';
    function updateAllState(){
      var inputs = list.querySelectorAll('input.doc-item');
      var total = inputs.length, selected = 0;
      inputs.forEach(function(i){ if(i.checked) selected++; });
      chkAll.checked = (total>0 && selected===total);
      chkAll.indeterminate = (selected>0 && selected<total);
    }

    var chipAll = document.createElement('span'); chipAll.className='chip'; chipAll.textContent='Mostra tutti';
    rowAll.appendChild(chkAll); rowAll.appendChild(chipAll);
    list.appendChild(rowAll);
    function getAllOn(){
      return DOCS.every(function(d){ return getItemState(d.id||''); });
    }
    function setAll(on){
      DOCS.forEach(function(d){
        setItemState(d.id||'', on);
        var cb = list.querySelector('input.doc-item[data-id="' + (d.id||'') + '"]');
        if(cb){ cb.checked = !!on; cb.dispatchEvent(new Event('change', {bubbles:false})); }
      });
    }
    chkAll.checked = getAllOn();
    chkAll.addEventListener('change', function(){
      chkAll.indeterminate = false;

      if(chkAll.checked && !getOrangeState()){ setOrangeState(true); syncGroupDocToMaster(); }
      setAll(chkAll.checked);
      applyItemVisibility();
    });
DOCS.forEach(function(d){
      var row = document.createElement('label'); row.className='doc-row';
      var cb = document.createElement('input'); cb.type='checkbox'; cb.className='doc-item'; cb.setAttribute('data-id', d.id||'');
      cb.checked = getItemState(d.id||'');
      var chip = document.createElement('span'); chip.className='chip';
      var dot = document.createElement('span'); dot.className='dot orange';
      var name = document.createElement('span'); name.className='name'; name.textContent = d.name||d.id||'â';
      chip.appendChild(dot); chip.appendChild(name);
      row.appendChild(cb); row.appendChild(chip);
      // checkbox toggling
      cb.addEventListener('change', function(e){
        setItemState(d.id||'', cb.checked);
        if(cb.checked && !getOrangeState()){ setOrangeState(true); }
        syncGroupDocToMaster();
        applyItemVisibility();
        updateAllState();
      });
      // click sul nome: apri popup e centra
      name.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        setItemState(d.id||'', true);
        cb.checked = true;
        setOrangeState(true);
        syncGroupDocToMaster();
        applyItemVisibility();
        if(chkAll && chkAll.checked !== getAllOn()){ chkAll.checked = getAllOn(); }
        var m = markersDocById[d.id];
        if(m){
          try{ m.openPopup(); }catch(_){}
          try{ map.setView(m.getLatLng(), Math.max(16, map.getZoom?map.getZoom():16), {animate:true}); }catch(_){}
          try{ history.replaceState(null, '', '?doc=' + encodeURIComponent(d.id)); }catch(_){}
        }
      });
      list.appendChild(row);
    });
  }

  function hookLegend(){
    // Se esiste applyLegendVisibility, estendi per gestire anche groupDoc
    if(typeof window.applyLegendVisibility === 'function'){
      var orig = window.applyLegendVisibility;
      window.applyLegendVisibility = function(){
        try{ orig.apply(this, arguments); }catch(_){}
        try{ syncGroupDocToMaster(); applyItemVisibility(); }catch(_){}
      };
    }
    // E comunque aggiungi listener ai due checkbox master
    ['chk-orange','chk-doc'].forEach(function(id){
      var el = document.getElementById(id);
      if(el){ el.addEventListener('change', function(){ syncGroupDocToMaster(); applyItemVisibility(); }); }
    });
  }

  function openFromDeepLink(){
    try{
      var u = new URL(location.href);
      var id = u.searchParams.get('doc'); if(!id) return;
      setItemState(id, true); setOrangeState(true);
      syncGroupDocToMaster();
      applyItemVisibility();
      var m = markersDocById[id];
      if(m){
        try{ m.openPopup(); }catch(_){}
        try{ map.setView(m.getLatLng(), Math.max(16, map.getZoom?map.getZoom():16), {animate:true}); }catch(_){}
      }
    }catch(_){}
  }

  function init(){
    // Carica i file (manifest opzionale)
    loadManifest().then(function(files){
      // Normalizza: se il manifest Ã¨ {files:[...]}
      if(files && files.files) files = files.files;
      if(!Array.isArray(files) || !files.length) files = DEFAULT_FILES.slice();
      return Promise.all(files.map(fetchDocFile));
    }).then(function(arr){
      DOCS = arr.filter(Boolean);
      // Fallback se non carica nulla (es. test locale con file://)
      if(!DOCS.length) { try { DOCS = [
{"id": "piazza-de-ferrari", "name": "Piazza de Ferrari", "coords": [44.40712720909712, 8.933972142472864], "youtube": "https://youtu.be/nANDItOIOlc", "info": "Mini documentario su Piazza de Ferrari e la sua storia.", "thumbnail": null}, 
{"id": "san-teodoro", "name": "San Teodoro", "coords": [44.41412203482928, 8.914105475915406], "youtube": "https://youtu.be/32TzhHyY5Qk", "info": "Mini documentario su San Teodoro.", "thumbnail": null},
{"id": "viaxxsettembre", "name": "Via XX settembre", "coords": [44.405826120223495, 8.939989775240152], "youtube": "https://youtu.be/Fdfh4CsqiDw", "info": "Mini documentario su Via XX settembre.", "thumbnail": null},
{"id": "seno-di-giano", "name": "Seno di Giano", "coords": [44.40336915941983, 8.932371887002882], "youtube": "https://youtu.be/5mKCW0Mf5YA", "info": "Mini documentario sul Seno di Giano.", "thumbnail": null}
]; } catch(_ ) {} }
      // Se abbiamo almeno un Doc, ora possiamo rimuovere i vecchi arancioni
      if(DOCS.length) try{ if(window.groupOrange){ if(groupOrange.getLayers) groupOrange.clearLayers(); if(window.map && map.hasLayer(groupOrange)) map.removeLayer(groupOrange); } }catch(_ ){}
      // build markers & list
      ensureGroupDoc();
      buildMarkers();
      buildList();
      // Sync visibilitÃ  layer e items allo stato master + preferenze
      syncGroupDocToMaster();
      applyItemVisibility();
      // Hook legend for future changes
      hookLegend();
      // Deep link
      openFromDeepLink();
    }).catch(function(e){
      console.warn('DOCS init error', e);
    });
  }

  ready(init);
})();

  // Delegated click: ensure inline player mounts even if popupopen listener misses
  document.addEventListener('click', function(ev){
    try{
      var el = ev.target && ev.target.closest ? ev.target.closest('.doc-thumb') : null;
      if(!el) return;
      ev.preventDefault(); ev.stopPropagation();
      var container = el.closest('.doc-popup') || document.querySelector('.leaflet-popup-content');
      var vid = el.getAttribute('data-ytid') || '';
      // mountInlinePlayer is defined inside buildMarkers closure; if not available here, reconstruct minimal mount
      try{
        if(typeof el._mounted === 'boolean' && el._mounted) return;
      }catch(_){}
      // Try to find a sibling .doc-yt-embed to avoid duplicates
      if(container && container.querySelector && !container.querySelector('.doc-yt-embed')){
        var iframe = document.createElement('iframe');
        iframe.className = 'doc-yt-embed';
        iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen','');
        if(vid) (function(){
      var base = 'https://www.youtube-nocookie.com/embed/' + vid + '?';
      var params = 'autoplay=1&playsinline=1&rel=0&modestbranding=1';
      if(params.indexOf('playsinline=1')===-1) params += (params ? '&' : '') + 'playsinline=1';
      if(params.indexOf('rel=0')===-1) params += '&rel=0';
      if(params.indexOf('modestbranding=1')===-1) params += '&modestbranding=1';
      if(!window.isSubscribed){
        if(params.indexOf('end=')===-1) params += '&end=10';
        params = params.replace(/(?:^|&)autoplay=1/,''); 
        if(params.indexOf('controls=0')===-1) params += '&controls=0';
      } else {
        params = params.replace(/(?:^|&)end=\d+/,''); 
        params = params.replace(/(?:^|&)controls=0/,''); 
      }
      if(params.indexOf('enablejsapi=1')===-1) params += '&enablejsapi=1';
      iframe.src = base + params;
      return iframe.src;
    })();
        try{ el.replaceWith(iframe); }catch(_){ el.parentNode && el.parentNode.replaceChild(iframe, el); }
      }
    }catch(_){}
  }, true);

/* ===== part055.js ===== */
// --- CLEANUP: rimuovi la riga 'Documentari' spuntabile (chk-doc) lasciando solo le voci e 'Mostra tutti' ---
(function(){
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  ready(function(){
    var chk = document.getElementById('chk-doc');
    if(chk){
      var label = chk.closest('label') || chk.parentElement;
      if(label && label.parentElement){
        label.parentElement.removeChild(label);
      }
    }
  });
})();

/* ===== part056.js ===== */
// --- CLEANUP: rimuovi il titolo duplicato dentro i corpi delle sezioni (sopra "Mostra tutti") ---
(function(){
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  function clean(){
    try{
      var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
      secs.forEach(function(sec){
        var headTitle = sec.querySelector('.acc-title');
        var body = sec.querySelector('.acc-body');
        if(!headTitle || !body) return;
        var t = (headTitle.textContent||'').trim().toLowerCase();
        // esamina i primi figli del body (quelli tipicamente usati come intestazione doppia)
        var firsts = Array.prototype.slice.call(body.children, 0, 3);
        firsts.forEach(function(node){
          if(!node) return;
          var text = (node.textContent||'').trim().toLowerCase();
          var isDuplicate =
              (text === t) ||
              (text === t + ':') ||
              (text.startsWith(t + '\n')) ||
              // vecchie intestazioni inline con font-weight alto
              ((node.tagName === 'DIV' || node.tagName === 'SPAN' || node.tagName === 'LABEL') &&
               text.indexOf(t) === 0 &&
               (node.getAttribute('style')||'').toLowerCase().indexOf('font-weight') !== -1);
          if(isDuplicate){
            try{ node.remove(); }catch(_){}
          }
        });
      });
    }catch(_){}
  }
  ready(function(){
    // dopo che l'accordion e le liste sono state costruite
    setTimeout(clean, 0);
    setTimeout(clean, 200);
  });
})();

/* ===== part058.js ===== */
// --- PATCH 2025-09-16: Documentari chiuso + voci non selezionate di default ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getSectionByTitle(title){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for(var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(t && t.textContent && t.textContent.trim().toLowerCase() === String(title||'').toLowerCase()) return secs[i];
    }
    return null;
  }
  function triggerChange(el){
    try{ el.dispatchEvent(new Event('change', { bubbles:true })); }
    catch(e){
      try{ var evt=document.createEvent('HTMLEvents'); evt.initEvent('change', true, false); el.dispatchEvent(evt); }catch(_){}
    }
  }
  function applyDefaults(){
    // 1) chiudi la sezione "Documentari"
    var sec = getSectionByTitle('Documentari');
    if(sec){ sec.setAttribute('aria-expanded','false'); }
    // 2) deseleziona "Mostra tutti"
    var chkAll = document.getElementById('chk-doc-all');
    if(chkAll){ if(chkAll.checked){ chkAll.checked = false; triggerChange(chkAll); } }
    // 3) deseleziona le singole voci e salva preferenza
    var list = (sec && sec.querySelector('.doc-list')) || document.querySelector('#opere-menu .doc-list');
    var inputs = list ? list.querySelectorAll('input.doc-item') : document.querySelectorAll('#opere-menu input.doc-item');
    inputs.forEach(function(cb){
      if(cb.checked){ cb.checked = false; triggerChange(cb); }
      var id = cb.getAttribute('data-id') || cb.value || cb.name || '';
      if(id){
        try{ localStorage.setItem('doc_item_' + id, '0'); }catch(_){}
      }
    });
    // 4) sincronizza visibilitÃ  layer
    try{ if(typeof syncGroupDocToMaster === 'function') syncGroupDocToMaster(); }catch(_){}
    try{ if(typeof applyItemVisibility === 'function') applyItemVisibility(); }catch(_){}
  }
  function waitAndApply(maxTries){
    var tries = 0;
    (function tick(){
      // Esegui quando la lista Ã¨ pronta (chk-doc-all o almeno una voce)
      if (document.getElementById('chk-doc-all') || document.querySelector('#opere-menu .doc-list input.doc-item')){
        applyDefaults();
        return;
      }
      tries++;
      if(tries < maxTries){ setTimeout(tick, 250); }
    })();
  }
  ready(function(){ waitAndApply(60); }); // ~15s finestra massima
})();

/* ===== part059.js ===== */
// --- PATCH 2025-09-16: Rimuovi il numero accanto a "Documentari" ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getDocTitleEl(){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for(var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(!t) continue;
      var txt = t.textContent ? t.textContent.trim().toLowerCase() : '';
      // Match "Documentari" even if followed by a number, e.g., "Documentari (2)"
      if (txt.startsWith('documentari')) return t;
    }
    // Fallback: any element with [data-section="documentari"] or a nav item
    return document.querySelector('[data-section="documentari"], .nav-item.documentari, .acc-title.documentari');
  }
  function stripCounterInNode(node){
    if(node && node.nodeType === Node.TEXT_NODE){
      // remove trailing " (number)" with optional spaces
      var cleaned = node.textContent.replace(/\s*\(\s*\d+\s*\)\s*$/, '');
      if(cleaned !== node.textContent){ node.textContent = cleaned; }
    }
  }
  function hideBadgesWithin(el){
    if(!el) return;
    var badgers = el.querySelectorAll('.count, .badge, .pill, .counter, .number, [data-count], [aria-label*="conteggio"], [aria-label*="count"]');
    badgers.forEach(function(b){ b.style.display = 'none'; });
  }
  function applyOnce(){
    var title = getDocTitleEl();
    if(!title) return false;
    // clean text nodes like "Documentari (2)"
    Array.prototype.forEach.call(title.childNodes, stripCounterInNode);
    // Also clean the full textContent if number is appended directly
    if (title.childNodes.length === 0){
      title.textContent = String(title.textContent||'').replace(/\s*\(\s*\d+\s*\)\s*$/, '');
    }
    hideBadgesWithin(title);
    return true;
  }
  function observeForChanges(title){
    if(!title || !window.MutationObserver) return;
    var mo = new MutationObserver(function(muts){
      // Re-apply after any DOM change
      applyOnce();
    });
    mo.observe(title, { childList: true, subtree: true, characterData: true });
  }
  function waitAndApply(maxTries){
    var tries = 0;
    (function tick(){
      if (applyOnce()){
        observeForChanges(getDocTitleEl());
        return;
      }
      tries++;
      if(tries < maxTries){ setTimeout(tick, 200); }
    })();
  }
  ready(function(){ waitAndApply(60); });
})();

/* ===== part060.js ===== */
// --- PATCH 2025-09-16b: Nascondi il badge contatore nella testata "Documentari" ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getDocSection(){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for (var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(t && t.textContent && t.textContent.trim().toLowerCase().startsWith('documentari')) return secs[i];
    }
    return null;
  }
  function killBadge(sec){
    if(!sec) return false;
    var head = sec.querySelector('.acc-head');
    if(!head) return false;
    var right = head.lastElementChild;
    if(!right) return false;
    var badge = right.querySelector('.acc-badge');
    if(badge){
      badge.textContent = ''; // clear content to avoid screen readers reading numbers
      badge.style.display = 'none'; // hide visually
      // As an extra safeguard, remove it from layout flow:
      badge.remove();
      return true;
    }
    return false;
  }
  function enforce(){
    var sec = getDocSection();
    if(!sec) return false;
    // Try to hide/remove immediately
    killBadge(sec);
    // Observe the head so when other code re-adds badge, we remove it again
    if (window.MutationObserver){
      var head = sec.querySelector('.acc-head');
      if(head){
        var mo = new MutationObserver(function(){
          // whenever head subtree changes, remove any badge again
          while (killBadge(sec)) { /* keep removing until none */ }
        });
        mo.observe(head, { childList: true, subtree: true });
      }
    }
    return true;
  }
  function wait(maxTries){
    var tries = 0;
    (function tick(){
      if (enforce()) return;
      tries++;
      if(tries < maxTries) setTimeout(tick, 200);
    })();
  }
  ready(function(){ wait(60); });
})();

/* ===== part106.js ===== */
/* PATCH: MiniDoc = comportati come "Documentari" nella toolbar Storia (solo toggle elenco) */
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else cb(); }

  function clickToolbarStoria(){
    try{
      var el = document.getElementById('btn-opere')
            || document.getElementById('btn-storia')
            || document.querySelector('[data-action="storia"], .toolbar [title="Storia"], .toolbar button[aria-label="Storia"]');
      if(el && typeof el.click==='function') el.click();
    }catch(_){}
  }

  function findDocToggle(){
    // Cerca l'intestazione/click target della sezione "Documentari"
    // Possibili strutture: .opere-accordion .acc-section (con .acc-head/.acc-title), oppure un elemento marcato ad hoc
    var secList = document.querySelectorAll('#opere-menu .opere-accordion .acc-section, #opere-menu .acc-section');
    for(var i=0;i<secList.length;i++){
      var sec = secList[i];
      var titleEl = sec.querySelector('.acc-title');
      if(titleEl && titleEl.textContent.trim().toLowerCase() === 'documentari'){
        // target preferibile: la testa/capo se presente
        return sec.querySelector('.acc-head') || titleEl;
      }
    }
    // fallback: eventuale marcatore esplicito
    return document.querySelector('#opere-menu [data-role="doc-toggle"]') || document.getElementById('opere-doc-toggle');
  }

  function ensureDocToggle(then){
    var tries = 0;
    (function tick(){
      var t = findDocToggle();
      if(t){ then(t); return; }
      if(++tries < 60) setTimeout(tick, 100);
    })();
  }

  function openStoriaAndToggleDocs(){
    clickToolbarStoria();
    // Dopo l'apertura della nuvola, attendi che il toggle Documentari sia in DOM e cliccalo
    ensureDocToggle(function(tgl){
      // Clic "umano": delega alla logica esistente per aprire/chiudere l'elenco
      if(typeof tgl.click === 'function') tgl.click();
    });
  }

  ready(function(){
    document.addEventListener('click', function(e){
      var t = e.target;
      var btn = t && (t.id === 'st-minidoc' ? t : (t.closest && t.closest('#st-minidoc')));
      if(!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      openStoriaDocAllOnly();
    }, true);
  });
})();

/* ===== part123.js ===== */
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else cb(); }

  function clickToolbarStoria(){
    try{
      var el = document.getElementById('btn-opere')
            || document.getElementById('btn-storia')
            || document.querySelector('[data-action="storia"], .toolbar [title="Storia"], .toolbar button[aria-label="Storia"]');
      if(el && typeof el.click==='function') el.click();
    }catch(_){}
  }

  function findDocToggle(){
    // Prefer the accordion section titled "Documentari"
    var secList = document.querySelectorAll('#opere-menu .opere-accordion .acc-section, #opere-menu .acc-section');
    for(var i=0;i<secList.length;i++){
      var sec = secList[i];
      var titleEl = sec.querySelector('.acc-title');
      if(titleEl && titleEl.textContent.trim().toLowerCase() === 'documentari'){
        return sec.querySelector('.acc-head') || titleEl;
      }
    }
    // Fallback explicit hook
    return document.querySelector('#opere-menu [data-role="doc-toggle"]') || document.getElementById('opere-doc-toggle');
  }

  function ensureDocToggle(then){
    var tries = 0;
    (function tick(){
      var t = findDocToggle();
      if(t){ then(t); return; }
      if(++tries < 80) setTimeout(tick, 100);
    })();
  }

  function findDocAll(){ return document.querySelector('#storia-doc-all'); }

  function ensureDocAll(then){
    var tries = 0;
    (function tick(){
      var el = findDocAll();
      if(el){ then(el); return; }
      if(++tries < 80) setTimeout(tick, 120);
    })();
  }

  // New: open Storia, toggle Documentari list, then toggle "Mostra tutti"
  function openStoriaToggleDocsAndAll(){
    clickToolbarStoria();
    ensureDocToggle(function(tgl){
      if(typeof tgl.click === 'function') tgl.click();   // open/close Documentari
      // Wait for the doc-all checkbox to be in DOM, then toggle it (click â toggles on/off)
      ensureDocAll(function(chk){
        if(typeof chk.click === 'function') chk.click();
      });
    });
  }

  // Expose for other patches if needed
  window.openStoriaToggleDocsAndAll = openStoriaToggleDocsAndAll;
})();

/* ===== part124.js ===== */
(function(){
  // Trova la checkbox "Mostra tutti i documentari"
  function ensureStoriaDocAll(cb){
    var tries = 0;
    (function tick(){
      var el = document.getElementById('storia-doc-all');
      if(el){ cb(el); return; }
      if(++tries < 80) setTimeout(tick, 120);
    })();
  }

  // Toggle logico: on/off di "Mostra tutti i documentari"
  function toggleDocAll(btn){
    ensureStoriaDocAll(function(chk){
      chk.checked = !chk.checked;

      // scatter di eventi "change" compatibile con i browser un po' ottusi
      try{
        var ev = new Event('change', {bubbles:true, cancelable:true});
        chk.dispatchEvent(ev);
      }catch(_){
        try{
          var ev2 = document.createEvent('Event');
          ev2.initEvent('change', true, true);
          chk.dispatchEvent(ev2);
        }catch(__){}
      }

      btn.setAttribute('aria-pressed', chk.checked ? 'true' : 'false');
    });
  }

  // Crea il bottone in "Passato"
  function makeButton(){
    var panel = document.querySelector('#qt-cat-passato .qt-cat-items');
    if(!panel) return false;

    // evita doppioni se ricarichi il codice
    if(panel.querySelector('.qt-doc-all')) return true;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qt-btn qt-doc-all';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('title', 'Documentari');
    btn.setAttribute('aria-label', 'Documentari');

    // icona: schermo + triangolino "play"
    btn.innerHTML =
      '<span class="qt-icon">'+
      '  <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" '+
      '       fill="none" stroke="currentColor" stroke-width="2" '+
      '       stroke-linecap="round" stroke-linejoin="round">'+
      '    <rect x="3" y="4" width="18" height="14" rx="2" ry="2"></rect>'+
      '    <polygon points="10,9 15,12 10,15"></polygon>'+
      '  </svg>'+
      '</span>'+
      '<span class="sr-only">Mostra tutti i documentari</span>';

    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      toggleDocAll(btn);
    });

    // lo aggiungiamo in coda agli altri toggle di "Passato"
    panel.appendChild(btn);
    return true;
  }

  // Aspetta che DOM + quick-toggles siano pronti
  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if (makeButton()) {
      clearInterval(iv);
    } else if (++tries >= max) {
      clearInterval(iv);
    }
  }, 150);
})();

/* ===== part125.js ===== */
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else cb(); }
  function clickToolbarStoria(){
    try{
      var el = document.getElementById('btn-opere')
            || document.getElementById('btn-storia')
            || document.querySelector('[data-action="storia"], .toolbar [title="Storia"], .toolbar button[aria-label="Storia"]');
      if(el && typeof el.click==='function') el.click();
    }catch(_){}
  }
  function findDocAll(){ return document.querySelector('#storia-doc-all'); }
  function ensureDocAll(then){
    var tries = 0;
    (function tick(){
      var el = findDocAll();
      if(el){ then(el); return; }
      if(++tries < 80) setTimeout(tick, 100);
    })();
  }
  // New: only toggle the "Mostra tutti" checkbox, do not expand the list
  function openStoriaDocAllOnly(){
    ensureDocAll(function(chk){
      chk.checked = !chk.checked;
      try{ chk.dispatchEvent(new Event('change', {bubbles:true})); }catch(_){ var ev=document.createEvent('Event'); ev.initEvent('change', true, true); chk.dispatchEvent(ev); }
    });
  }
  window.openStoriaDocAllOnly = openStoriaDocAllOnly;
})();

/* ===== part199.js ===== */
(function(){
  function ensureDocContainer(){
    var panel = document.getElementById('storia-doc-panel') || document.querySelector('#storia-menu [data-sec="doc"] .st-panel');
    if(!panel) return null;
    var host = document.getElementById('storia-doc-items');
    if(!host){
      host = document.createElement('div');
      host.id = 'storia-doc-items';
      panel.appendChild(host);
    }
    return host;
  }
  function norm(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim(); }
  function findLegacyCheckboxByDocName(name){
  var bodies = document.querySelectorAll('.acc-section .acc-title, .acc-section .acc-head');
  var sec = null;
  for(var i=0;i<bodies.length;i++){
    var t = bodies[i].textContent || '';
    if(norm(t).indexOf(norm('Documentari')) >= 0){
      sec = bodies[i].closest('.acc-section');
      break;
    }
  }

  // Cerchiamo SOLO dentro la sezione "Documentari"
  var container = sec ? sec.querySelector('.acc-body') : null;
  if(!container) return null;

  var rows = container.querySelectorAll('.doc-row, .doc-list .row, .doc-list label, .doc-list div');
  var wanted = norm(name);
  for(var j=0;j<rows.length;j++){
    var R = rows[j];
    var txt = norm(R.textContent||'');
    if(txt.indexOf(wanted) >= 0){
      var cb = R.querySelector('input[type="checkbox"]');
      if(cb) return cb;
    }
  }

  // Niente fallback globale: meglio non trovare nulla
  // che agganciarsi a un QR sbagliato
  return null;
}

  function addRow(host, rowId, displayText, legacyName){
    if(document.getElementById(rowId)) return false;
    var legacy = findLegacyCheckboxByDocName(legacyName);
    if(!legacy) return false;

    var row = document.createElement('label');
    row.className = 'st-row';
    var cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = rowId;
    var span = document.createElement('span'); span.className = 'st-label'; span.textContent = displayText;
    row.appendChild(cb); row.appendChild(span);
    host.appendChild(row);

    function sync(){ try{ cb.indeterminate=false; cb.checked=!!legacy.checked; }catch(_){ } }
    function apply(state){
      try{
        if(legacy.tagName==='INPUT' && legacy.type==='checkbox'){
          if(!!legacy.checked !== !!state){ legacy.click(); }
        } else { if(state){ legacy.click(); } else { legacy.click(); } }
      }catch(_){}
    }
    cb.addEventListener('change', function(){ apply(cb.checked); });
    try{ legacy.addEventListener('change', sync); }catch(_){}
    sync();
    return true;
  }

  function boot(){
    var host = ensureDocContainer(); if(!host) return false;
    var ok1 = addRow(host, 'storia-doc-piazza', 'Piazza de Ferrari', 'Piazza de Ferrari');
    var ok2 = addRow(host, 'storia-doc-san-teodoro', 'San Teodoro', 'San Teodoro');
    var ok3 = addRow(host, 'storia-doc-viaxx', 'Via XX Settembre', 'Via XX Settembre');
    var ok4 = addRow(host, 'storia-doc-seno-di-giano', 'Seno di Giano', 'Seno di Giano');    
return ok1 || ok2;
  }

  function waitAndRun(maxTries){
    var tries = 0, h = setInterval(function(){
      tries++;
      var hasList = document.querySelector('.doc-list');
      var hasNames = !!findLegacyCheckboxByDocName('Piazza de Ferrari') || !!findLegacyCheckboxByDocName('San Teodoro');
      if((hasList || hasNames) && boot()){ clearInterval(h); }
      else if(tries >= maxTries){ clearInterval(h); }
    }, 150);
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', function(){ waitAndRun(70); }); }
  else { waitAndRun(70); }
})();

(function(){
  function clonePercorsiIntoStoria(){
    var src = document.getElementById('routes-menu');
    var dst = document.getElementById('storia-percorsi-items');
    if (!src || !dst || dst.dataset.cloned === '1') return;

            src.querySelectorAll('.doc-row[data-route-id]').forEach(function(row){
      var rid    = row.getAttribute('data-route-id');
      var srcLab = row.querySelector('.label');
      if (!rid || !srcLab) return;

      // Creiamo una riga âStoriaâ vera, con il puntino
      var line = document.createElement('label');
      line.className = 'st-row doc-row';
      line.setAttribute('data-route-id', rid);

      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'route-chk';

      var span = document.createElement('span');
      span.className = 'st-label label';
      span.textContent = srcLab.textContent;

      // Colore: leggiamo quello del percorso dalla mappa __ROUTE_DATA
      var color = '';
      if (window.__ROUTE_DATA && window.__ROUTE_DATA[rid] && window.__ROUTE_DATA[rid].color){
        color = window.__ROUTE_DATA[rid].color;
      }
      if (color){
        line.style.setProperty('--c', color);
      }

      line.appendChild(cb);
      line.appendChild(span);
      dst.appendChild(line);
    });



    dst.dataset.cloned = '1';
  }

  // dopo ensureMenu() / wireOpenClose(), quando il menu Storia esiste
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', clonePercorsiIntoStoria, {once:true});
  } else {
    clonePercorsiIntoStoria();
  }
})();

/* ===== part207.js ===== */
(function(){
  // Colore unico per i Documentari (MiniDoc)
  var DOC_COLOR = '#ff4f00';

  function applyDocColor(rowCbId){
    var cb = document.getElementById(rowCbId);
    if(!cb) return;
    var row = cb.closest('label'); if(!row) return;
    row.style.setProperty('--c', DOC_COLOR);
  }

  function applyDocColors(){
    // IDs dei due documentari nel nuovo menu
    applyDocColor('storia-doc-piazza');      // Piazza de Ferrari
    applyDocColor('storia-doc-san-teodoro'); // San Teodoro
    applyDocColor('storia-doc-viaxx');
applyDocColor('storia-doc-seno-di-giano');
  }

  function boot(){
    applyDocColors();
    // Se il pannello Documentari cambia dinamicamente, riapplica
    try{
      var host = document.getElementById('storia-doc-items');
      if(host){
        new MutationObserver(function(){ applyDocColors(); })
          .observe(host, {childList:true, subtree:true});
      }
    }catch(_){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

/* ===== part223.js ===== */
// --- CLEANUP: rimuovi la riga 'Documentari' spuntabile (chk-doc) lasciando solo le voci e 'Mostra tutti' ---
(function(){
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  ready(function(){
    var chk = document.getElementById('chk-doc');
    if(chk){
      var label = chk.closest('label') || chk.parentElement;
      if(label && label.parentElement){
        label.parentElement.removeChild(label);
      }
    }
  });
})();

/* ===== part227.js ===== */
// --- PATCH 2025-09-16: Documentari chiuso + voci non selezionate di default ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getSectionByTitle(title){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for(var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(t && t.textContent && t.textContent.trim().toLowerCase() === String(title||'').toLowerCase()) return secs[i];
    }
    return null;
  }
  function triggerChange(el){
    try{ el.dispatchEvent(new Event('change', { bubbles:true })); }
    catch(e){
      try{ var evt=document.createEvent('HTMLEvents'); evt.initEvent('change', true, false); el.dispatchEvent(evt); }catch(_){}
    }
  }
  function applyDefaults(){
    // 1) chiudi la sezione "Documentari"
    var sec = getSectionByTitle('Documentari');
    if(sec){ sec.setAttribute('aria-expanded','false'); }
    // 2) deseleziona "Mostra tutti"
    var chkAll = document.getElementById('chk-doc-all');
    if(chkAll){ if(chkAll.checked){ chkAll.checked = false; triggerChange(chkAll); } }
    // 3) deseleziona le singole voci e salva preferenza
    var list = (sec && sec.querySelector('.doc-list')) || document.querySelector('#opere-menu .doc-list');
    var inputs = list ? list.querySelectorAll('input.doc-item') : document.querySelectorAll('#opere-menu input.doc-item');
    inputs.forEach(function(cb){
      if(cb.checked){ cb.checked = false; triggerChange(cb); }
      var id = cb.getAttribute('data-id') || cb.value || cb.name || '';
      if(id){
        try{ localStorage.setItem('doc_item_' + id, '0'); }catch(_){}
      }
    });
    // 4) sincronizza visibilitÃ  layer
    try{ if(typeof syncGroupDocToMaster === 'function') syncGroupDocToMaster(); }catch(_){}
    try{ if(typeof applyItemVisibility === 'function') applyItemVisibility(); }catch(_){}
  }
  function waitAndApply(maxTries){
    var tries = 0;
    (function tick(){
      // Esegui quando la lista Ã¨ pronta (chk-doc-all o almeno una voce)
      if (document.getElementById('chk-doc-all') || document.querySelector('#opere-menu .doc-list input.doc-item')){
        applyDefaults();
        return;
      }
      tries++;
      if(tries < maxTries){ setTimeout(tick, 250); }
    })();
  }
  ready(function(){ waitAndApply(60); }); // ~15s finestra massima
})();

/* ===== part228.js ===== */
// --- PATCH 2025-09-16: Rimuovi il numero accanto a "Documentari" ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getDocTitleEl(){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for(var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(!t) continue;
      var txt = t.textContent ? t.textContent.trim().toLowerCase() : '';
      // Match "Documentari" even if followed by a number, e.g., "Documentari (2)"
      if (txt.startsWith('documentari')) return t;
    }
    // Fallback: any element with [data-section="documentari"] or a nav item
    return document.querySelector('[data-section="documentari"], .nav-item.documentari, .acc-title.documentari');
  }
  function stripCounterInNode(node){
    if(node && node.nodeType === Node.TEXT_NODE){
      // remove trailing " (number)" with optional spaces
      var cleaned = node.textContent.replace(/\s*\(\s*\d+\s*\)\s*$/, '');
      if(cleaned !== node.textContent){ node.textContent = cleaned; }
    }
  }
  function hideBadgesWithin(el){
    if(!el) return;
    var badgers = el.querySelectorAll('.count, .badge, .pill, .counter, .number, [data-count], [aria-label*="conteggio"], [aria-label*="count"]');
    badgers.forEach(function(b){ b.style.display = 'none'; });
  }
  function applyOnce(){
    var title = getDocTitleEl();
    if(!title) return false;
    // clean text nodes like "Documentari (2)"
    Array.prototype.forEach.call(title.childNodes, stripCounterInNode);
    // Also clean the full textContent if number is appended directly
    if (title.childNodes.length === 0){
      title.textContent = String(title.textContent||'').replace(/\s*\(\s*\d+\s*\)\s*$/, '');
    }
    hideBadgesWithin(title);
    return true;
  }
  function observeForChanges(title){
    if(!title || !window.MutationObserver) return;
    var mo = new MutationObserver(function(muts){
      // Re-apply after any DOM change
      applyOnce();
    });
    mo.observe(title, { childList: true, subtree: true, characterData: true });
  }
  function waitAndApply(maxTries){
    var tries = 0;
    (function tick(){
      if (applyOnce()){
        observeForChanges(getDocTitleEl());
        return;
      }
      tries++;
      if(tries < maxTries){ setTimeout(tick, 200); }
    })();
  }
  ready(function(){ waitAndApply(60); });
})();

/* ===== part229.js ===== */
// --- PATCH 2025-09-16b: Nascondi il badge contatore nella testata "Documentari" ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getDocSection(){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for (var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(t && t.textContent && t.textContent.trim().toLowerCase().startsWith('documentari')) return secs[i];
    }
    return null;
  }
  function killBadge(sec){
    if(!sec) return false;
    var head = sec.querySelector('.acc-head');
    if(!head) return false;
    var right = head.lastElementChild;
    if(!right) return false;
    var badge = right.querySelector('.acc-badge');
    if(badge){
      badge.textContent = ''; // clear content to avoid screen readers reading numbers
      badge.style.display = 'none'; // hide visually
      // As an extra safeguard, remove it from layout flow:
      badge.remove();
      return true;
    }
    return false;
  }
  function enforce(){
    var sec = getDocSection();
    if(!sec) return false;
    // Try to hide/remove immediately
    killBadge(sec);
    // Observe the head so when other code re-adds badge, we remove it again
    if (window.MutationObserver){
      var head = sec.querySelector('.acc-head');
      if(head){
        var mo = new MutationObserver(function(){
          // whenever head subtree changes, remove any badge again
          while (killBadge(sec)) { /* keep removing until none */ }
        });
        mo.observe(head, { childList: true, subtree: true });
      }
    }
    return true;
  }
  function wait(maxTries){
    var tries = 0;
    (function tick(){
      if (enforce()) return;
      tries++;
      if(tries < maxTries) setTimeout(tick, 200);
    })();
  }
  ready(function(){ wait(60); });
})();

/* ===== part232.js ===== */
// --- PATCH 2025-09-16: Documentari chiuso + voci non selezionate di default ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getSectionByTitle(title){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for(var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(t && t.textContent && t.textContent.trim().toLowerCase() === String(title||'').toLowerCase()) return secs[i];
    }
    return null;
  }
  function triggerChange(el){
    try{ el.dispatchEvent(new Event('change', { bubbles:true })); }
    catch(e){
      try{ var evt=document.createEvent('HTMLEvents'); evt.initEvent('change', true, false); el.dispatchEvent(evt); }catch(_){}
    }
  }
  function applyDefaults(){
    // 1) chiudi la sezione "Documentari"
    var sec = getSectionByTitle('Documentari');
    if(sec){ sec.setAttribute('aria-expanded','false'); }
    // 2) deseleziona "Mostra tutti"
    var chkAll = document.getElementById('chk-doc-all');
    if(chkAll){ if(chkAll.checked){ chkAll.checked = false; triggerChange(chkAll); } }
    // 3) deseleziona le singole voci e salva preferenza
    var list = (sec && sec.querySelector('.doc-list')) || document.querySelector('#opere-menu .doc-list');
    var inputs = list ? list.querySelectorAll('input.doc-item') : document.querySelectorAll('#opere-menu input.doc-item');
    inputs.forEach(function(cb){
      if(cb.checked){ cb.checked = false; triggerChange(cb); }
      var id = cb.getAttribute('data-id') || cb.value || cb.name || '';
      if(id){
        try{ localStorage.setItem('doc_item_' + id, '0'); }catch(_){}
      }
    });
    // 4) sincronizza visibilitÃ  layer
    try{ if(typeof syncGroupDocToMaster === 'function') syncGroupDocToMaster(); }catch(_){}
    try{ if(typeof applyItemVisibility === 'function') applyItemVisibility(); }catch(_){}
  }
  function waitAndApply(maxTries){
    var tries = 0;
    (function tick(){
      // Esegui quando la lista Ã¨ pronta (chk-doc-all o almeno una voce)
      if (document.getElementById('chk-doc-all') || document.querySelector('#opere-menu .doc-list input.doc-item')){
        applyDefaults();
        return;
      }
      tries++;
      if(tries < maxTries){ setTimeout(tick, 250); }
    })();
  }
  ready(function(){ waitAndApply(60); }); // ~15s finestra massima
})();

/* ===== part233.js ===== */
// --- PATCH 2025-09-16: Rimuovi il numero accanto a "Documentari" ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getDocTitleEl(){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for(var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(!t) continue;
      var txt = t.textContent ? t.textContent.trim().toLowerCase() : '';
      // Match "Documentari" even if followed by a number, e.g., "Documentari (2)"
      if (txt.startsWith('documentari')) return t;
    }
    // Fallback: any element with [data-section="documentari"] or a nav item
    return document.querySelector('[data-section="documentari"], .nav-item.documentari, .acc-title.documentari');
  }
  function stripCounterInNode(node){
    if(node && node.nodeType === Node.TEXT_NODE){
      // remove trailing " (number)" with optional spaces
      var cleaned = node.textContent.replace(/\s*\(\s*\d+\s*\)\s*$/, '');
      if(cleaned !== node.textContent){ node.textContent = cleaned; }
    }
  }
  function hideBadgesWithin(el){
    if(!el) return;
    var badgers = el.querySelectorAll('.count, .badge, .pill, .counter, .number, [data-count], [aria-label*="conteggio"], [aria-label*="count"]');
    badgers.forEach(function(b){ b.style.display = 'none'; });
  }
  function applyOnce(){
    var title = getDocTitleEl();
    if(!title) return false;
    // clean text nodes like "Documentari (2)"
    Array.prototype.forEach.call(title.childNodes, stripCounterInNode);
    // Also clean the full textContent if number is appended directly
    if (title.childNodes.length === 0){
      title.textContent = String(title.textContent||'').replace(/\s*\(\s*\d+\s*\)\s*$/, '');
    }
    hideBadgesWithin(title);
    return true;
  }
  function observeForChanges(title){
    if(!title || !window.MutationObserver) return;
    var mo = new MutationObserver(function(muts){
      // Re-apply after any DOM change
      applyOnce();
    });
    mo.observe(title, { childList: true, subtree: true, characterData: true });
  }
  function waitAndApply(maxTries){
    var tries = 0;
    (function tick(){
      if (applyOnce()){
        observeForChanges(getDocTitleEl());
        return;
      }
      tries++;
      if(tries < maxTries){ setTimeout(tick, 200); }
    })();
  }
  ready(function(){ waitAndApply(60); });
})();

/* ===== part234.js ===== */
// --- PATCH 2025-09-16b: Nascondi il badge contatore nella testata "Documentari" ---
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  function getDocSection(){
    var secs = document.querySelectorAll('#opere-menu .opere-accordion .acc-section');
    for (var i=0;i<secs.length;i++){
      var t = secs[i].querySelector('.acc-title');
      if(t && t.textContent && t.textContent.trim().toLowerCase().startsWith('documentari')) return secs[i];
    }
    return null;
  }
  function killBadge(sec){
    if(!sec) return false;
    var head = sec.querySelector('.acc-head');
    if(!head) return false;
    var right = head.lastElementChild;
    if(!right) return false;
    var badge = right.querySelector('.acc-badge');
    if(badge){
      badge.textContent = ''; // clear content to avoid screen readers reading numbers
      badge.style.display = 'none'; // hide visually
      // As an extra safeguard, remove it from layout flow:
      badge.remove();
      return true;
    }
    return false;
  }
  function enforce(){
    var sec = getDocSection();
    if(!sec) return false;
    // Try to hide/remove immediately
    killBadge(sec);
    // Observe the head so when other code re-adds badge, we remove it again
    if (window.MutationObserver){
      var head = sec.querySelector('.acc-head');
      if(head){
        var mo = new MutationObserver(function(){
          // whenever head subtree changes, remove any badge again
          while (killBadge(sec)) { /* keep removing until none */ }
        });
        mo.observe(head, { childList: true, subtree: true });
      }
    }
    return true;
  }
  function wait(maxTries){
    var tries = 0;
    (function tick(){
      if (enforce()) return;
      tries++;
      if(tries < maxTries) setTimeout(tick, 200);
    })();
  }
  ready(function(){ wait(60); });
})();

