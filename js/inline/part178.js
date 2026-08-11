
(function(){
  window.renderQrList = function(containerSel){
    var host = document.querySelector(containerSel);
    if(!host) return;

    var wrap = document.createElement('div');
    wrap.className = 'qr-shortcuts';

    // ensure host allows child to scroll
    try{ host.style.display='flex'; host.style.flexDirection='column'; host.style.gap='.25rem'; host.style.minHeight='0'; }catch(_){}

    wrap.style.display='flex';
    wrap.style.flexDirection='column';
    wrap.style.gap='.25rem';
    wrap.style.minHeight='0';

    // Build UI (filter + master toggle + scrollable groups with arrows)
    wrap.innerHTML = [
      '<div style="display:flex;gap:.5rem;align-items:center;margin:.25rem 0 .5rem 0">',
        '<input id="qr-filter" type="search" placeholder="Filtra punti QR" ',
        ' style="flex:1; padding:.35rem .5rem; border:1px solid rgba(0,0,0,0.12); border-radius:8px" />',
        '<button id="qr-master-toggle" type="button" style="white-space:nowrap; padding:.35rem .6rem; border:1px solid rgba(0,0,0,0.12); border-radius:8px; background:#fff">Mostra QR</button>',
      '</div>',
      '<div id="qr-groups-wrap" style="position:relative;flex:1 1 auto;min-height:0">',
        '<button id="qr-arrow-up" type="button" aria-label="Su">▲</button>',
        '<div id="qr-groups" style="display:grid; gap:.35rem; overflow-y:auto; -webkit-overflow-scrolling:touch; flex:1 1 auto; min-height:0; max-height: min(56vh, 460px); padding-right:.25rem"></div>',
        '<button id="qr-arrow-down" type="button" aria-label="Giù">▼</button>',
      '</div>'
    ].join('');

    host.innerHTML = '';
    host.appendChild(wrap);

    var filterInput = wrap.querySelector('#qr-filter');
    var groupsWrap  = wrap.querySelector('#qr-groups-wrap');
    var groupsEl    = wrap.querySelector('#qr-groups');
    var arrowUp     = wrap.querySelector('#qr-arrow-up');
    var arrowDown   = wrap.querySelector('#qr-arrow-down');
    var masterBtn   = wrap.querySelector('#qr-master-toggle');

    // --- Localize placeholder (keep your multi-lang setup intact) ---
    function __applyQrPlaceholderLocalization(){
      try{
        var PH = {
          it: 'Filtra i punti QR',
          en: 'Filter QR points',
          es: 'Filtrar puntos QR',
          fr: 'Filtrer les points QR',
          ar: 'تصفية نقاط QR',
          ru: 'Фильтр точек QR',
          zh: '筛选 QR 点位',
          lij:'Filtra i punti QR'
        };
        var lang = (function(){
          try { return (localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0]; }
          catch(_) { return (document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0]; }
        })();
        if (filterInput){
          filterInput.placeholder = PH[lang] || PH.it;
          if (lang === 'ar') {
            filterInput.style.direction = 'rtl';
            filterInput.style.textAlign = 'right';
          } else {
            filterInput.style.direction = 'ltr';
            filterInput.style.textAlign = 'left';
          }
        }
      }catch(_){}
    }
    try { window.__qrRefreshPlaceholder = __applyQrPlaceholderLocalization; } catch(_) {}
    __applyQrPlaceholderLocalization();

    // --- Master "Mostra QR" toggle (same behavior as before) ---
    (function(){
      if(!masterBtn) return;

      function lang(){
        try { return (localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0]; }
        catch(_){ return (document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0]; }
      }

      var LBL = {
        it: ['Mostra QR','Nascondi QR'],
        en: ['Show QR','Hide QR'],
        es: ['Mostrar QR','Ocultar QR'],
        fr: ['Afficher QR','Masquer QR'],
        ar: ['إظهار QR','إخفاء QR'],
        ru: ['Показать QR','Скрыть QR'],
        zh: ['显示 QR','隐藏 QR'],
        lij:['Mostra i QR','Ascondi i QR']
      };

      function isOn(){
        try{ return (typeof map!=='undefined' && window.QR_ALL && map.hasLayer(window.QR_ALL)); }
        catch(_){ return false; }
      }

      function setLabel(){
        var ln = lang();
        var on = isOn();
        var pair = LBL[ln] || LBL.it;
        masterBtn.textContent = on ? pair[1] : pair[0];
        if(ln==='ar'){ masterBtn.style.direction='rtl'; } else { masterBtn.style.direction='ltr'; }
      }

function ensureQrOn(){
  try{
    if (isOn()) return;
    if (window.__qrToggleAll) window.__qrToggleAll(true);

    // sync label + (se esiste) checkbox master
    setTimeout(function(){
      try{ setLabel(); }catch(_){}
      try{
        var chk = document.getElementById('chk-qr-all');
        if(chk) chk.checked = true;
      }catch(_){}
    }, 60);
  }catch(_){}
}

try{ window.__ensureQrOn = ensureQrOn; }catch(_){}


      masterBtn.addEventListener('click', function(){
  try{
    var on = isOn();
    if(window.__qrToggleAll){ window.__qrToggleAll(!on); }

    // dopo toggle: aggiorna label e sincronizza checkbox master (se esiste)
    setTimeout(function(){
      var nowOn = isOn();
      setLabel();
      try{
        var chk = document.getElementById('chk-qr-all');
        if(chk) chk.checked = nowOn;
      }catch(_){}
    }, 50);
  }catch(_){}
});


      // keep label synced on open + language change
      setLabel();
      try{
        var mo = new MutationObserver(function(muts){
          for(var i=0;i<muts.length;i++){
            if(muts[i].type==='attributes' && muts[i].attributeName==='lang'){ setLabel(); __applyQrPlaceholderLocalization(); break; }
          }
        });
        mo.observe(document.documentElement, {attributes:true});
      }catch(_){}
    })();

    // --- Data helpers ---
    function groupByParent(items){
      var g = {};
      (items||[]).forEach(function(s){
        var pid = (s.parent && s.parent.id) || '';
        var plb = (s.parent && s.parent.label) || 'Senza nome';
        if(!g[pid]) g[pid] = { label: plb, items: [] };
        (s.children||[]).forEach(function(c){
          if(c && typeof c.lat==='number' && typeof c.lng==='number'){
            g[pid].items.push(c);
          }
        });
      });
      return g;
    }

    // Persist manual open/close across re-render
    var openState = {};

    function _norm(s){
      return (s||'').toString().toLowerCase();
    }

    function render(filter){
      var all = (window.__QR_SOURCES||[]);
      var grouped = groupByParent(all);

      var f = (filter || '').trim();
      var autoOpen = f.length > 0;

      // Sort groups by label (language-aware)
      var __qrLang = (function(){
        try { return (localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0]; }
        catch(_){ return (document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0]; }
      })();

      var keys = Object.keys(grouped).sort(function(a,b){
        var la = (grouped[a].label || a);
        var lb = (grouped[b].label || b);
        try { return la.localeCompare(lb, __qrLang || 'it', {sensitivity:'base'}); }
        catch(_) { return la.localeCompare(lb); }
      });

      var html = '';

      keys.forEach(function(pid){
        var G = grouped[pid];
        var items = (G && G.items) ? G.items : [];
        var list = items.filter(function(c){
          if(!f) return true;
          return _norm(c.label).includes(_norm(f));
        });

        // If filtering, hide groups with no matches
        if(!list.length) return;

        var open = autoOpen ? true : !!openState[pid];

        html += '<div class="qr-group" data-group-id="'+pid+'"'
          + ' style="border:1px solid rgba(0,0,0,0.1);border-radius:10px;'
          + 'padding:.3rem .4rem;background:#fff">';

        html += '<button type="button" data-qr-acc="head" data-group-id="'+pid+'" data-open="'+(open?'1':'0')+'"'
          + ' style="width:100%;display:flex;justify-content:space-between;'
          + 'align-items:center;padding:.15rem .2rem;margin:0;border:none;'
          + 'background:transparent;color:var(--fg,#111);cursor:pointer;">';

        html += '<strong style="font-size:.9rem">'+ (G.label||pid) +'</strong>';
        html += '<span class="qr-group-chevron" aria-hidden="true"'
          + ' style="font-size:.8rem;opacity:.75;margin-left:.35rem">'
          + (open ? '▾' : '▸') + '</span>';
        html += '</button>';

        html += '<ul data-qr-acc="body" data-open="'+(open?'1':'0')+'"'
          + ' style="list-style:none;margin:.15rem 0 0 0;padding:0;'
          + 'display:'+(open?'grid':'none')+';gap:.2rem">';

        list.forEach(function(c){
          html += '<li><button type="button" data-lat="'+c.lat+'" data-lng="'+c.lng+'"'
               +  ' style="width:100%;text-align:left;display:flex;align-items:center;'
               +  'gap:.35rem;padding:.28rem .45rem;border:1px solid rgba(0,0,0,0.12);'
               +  'border-radius:8px;background:#fff;cursor:pointer">'
               +    '<span style="width:8px;height:8px;border-radius:9999px;'
               +           'background:#38bdf8;display:inline-block"></span>'
               +    '<span>'+ (c.label||'') +'</span>'
               +  '</button></li>';
        });

        html += '</ul></div>';
      });

      groupsEl.innerHTML = html || '<div style="opacity:.7">Nessun punto trovato.</div>';
    }

    // Debounced filter
    var tid = 0;
    if(filterInput){
      filterInput.addEventListener('input', function(){
        clearTimeout(tid);
        tid = setTimeout(function(){ render(filterInput.value.trim()); }, 120);
      });
    }

    // Clicks: toggle groups OR pan map
    if(groupsEl){
      groupsEl.addEventListener('click', function(e){
        // 1) Toggle group
        var head = e.target.closest('[data-qr-acc="head"]');
        if(head){
          var gid = head.getAttribute('data-group-id') || '';
          var group = head.closest('.qr-group');
          if(group){
            var body = group.querySelector('[data-qr-acc="body"]');
            if(body){
              var isOpen = body.getAttribute('data-open') === '1';
              var nextOpen = !isOpen;
              openState[gid] = nextOpen;

              body.style.display = nextOpen ? 'grid' : 'none';
              body.setAttribute('data-open', nextOpen ? '1':'0');
              head.setAttribute('data-open', nextOpen ? '1':'0');

              var ch = head.querySelector('.qr-group-chevron');
              if(ch) ch.textContent = nextOpen ? '▾' : '▸';
            }
          }
          return;
        }

        // 2) Click on item
        var btn = e.target.closest('button[data-lat][data-lng]');
        if(!btn) return;
        var lat = parseFloat(btn.getAttribute('data-lat'));
        var lng = parseFloat(btn.getAttribute('data-lng'));
        if(isFinite(lat) && isFinite(lng)){
try{ window.__ensureQrOn && window.__ensureQrOn(); }catch(_){}
  try{
    map.setView([lat,lng], Math.max((map.getZoom()||16), 17), {animate:true});
  }catch(_){}
}

      }, true);
    }

    // Scroll helpers
    try{
      if(groupsWrap && groupsEl){
        groupsWrap.addEventListener('wheel', function(e){
          groupsEl.scrollTop += e.deltaY;
          e.preventDefault();
        }, {passive:false});
      }
    }catch(_){}

    try{
      if(arrowUp) arrowUp.onclick = function(){ groupsEl && groupsEl.scrollBy({top:-140, behavior:'smooth'}); };
      if(arrowDown) arrowDown.onclick = function(){ groupsEl && groupsEl.scrollBy({top:140, behavior:'smooth'}); };
    }catch(_){}

    // Initial render
    render('');
  };
})();
