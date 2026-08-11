
(function(){
  var L = {
    it: { card:"Guida e istruzioni", title:"Guida e istruzioni", guideBtn:"Guida", body: "Esplora Genova: storia, turismo e tempo libero. Apri Home, scegli e tocca i punti sulla mappa. Apri la GUIDA per tutte le funzioni." },
    lij:{ card:"Guida e instruçioìn", title:"Guida e instruçioìn", guideBtn:"Guida", body: "Esplora Zêna: stòria, turiçmo e tenpo lìbbro. Àrvi Home, çerni e tòcca i ponti in sce a mappa. Àrvi a GUIDA pe tùtte e fonçioìn." },
    en: { card:"Guide and instructions.", title:"Guide and instructions.", guideBtn:"Guide", body: "Explore Genoa: history, tourism, and free time. Open Home, choose, and tap points on the map. Open the GUIDE for all features." },
    es: { card:"Guía e instrucciones.", title:"Guía e instrucciones.", guideBtn:"Guía", body: "Explora Génova: historia, turismo y tiempo libre. Abre Home, elige y toca los puntos en el mapa. Abre la GUÍA para ver todas las funciones." },
    fr: { card:"Guide et instructions.", title:"Guide et instructions.", guideBtn:"Guide", body: "Explorez Gênes : histoire, tourisme et temps libre. Ouvrez Home, choisissez et touchez les points sur la carte. Ouvrez le GUIDE pour toutes les fonctions." },
    ar: { card:"دليل وتعليمات.", title:"دليل وتعليمات.", guideBtn:"الدليل", body: "استكشف جنوة: التاريخ والسياحة ووقت الفراغ. افتح Home، اختر واضغط على النقاط على الخريطة. افتح الدليل لمعرفة جميع الميزات." },
    ru: { card:"Руководство и инструкции.", title:"Руководство и инструкции.", guideBtn:"Руководство", body: "Исследуйте Геную: история, туризм и досуг. Откройте Home, выберите и нажмите на точки на карте. Откройте РУКОВОДСТВО, чтобы увидеть все функции." },
    zh: { card:"指南與說明。", title:"指南與說明。", guideBtn:"指南",  body: "探索热那亚：历史、旅游与休闲。打开 Home，选择并点击地图上的点位。打开指南查看所有功能。" }
  };

  var intervalId = null;

  function curLang(){
    var v;
    try{ v = localStorage.getItem('lang'); }catch(_){}
    if(!v) v = document.documentElement.getAttribute('lang') || 'it';
    return L[v] ? v : 'it';
  }

  function ensureNodes(){
    var grid = document.querySelector('.menu-home .mh-grid');
    var body = document.querySelector('.menu-home .mh-body');
    if(!grid || !body) return null;

    var btn = grid.querySelector('.mh-item[data-key="info"]');
    if(!btn){
      btn = document.createElement('button');
      btn.className = 'mh-item mh-gray';
      btn.type = 'button';
      btn.setAttribute('data-key','info');
      btn.innerHTML = '<span class="mh-ico" aria-hidden="true">'
        + '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        + '<circle cx="12" cy="12" r="10"></circle>'
        + '<line x1="12" y1="16" x2="12" y2="12"></line>'
        + '<line x1="12" y1="8" x2="12" y2="8"></line>'
        + '</svg></span>'
        + '<span class="mh-label" id="info-card-label">Guida e istruzioni</span>';
      grid.appendChild(btn);
    } else {
      // ensure label id
      var lab = btn.querySelector('.mh-label');
      if(lab && !lab.id) lab.id = 'info-card-label';
    }

    var bub = body.querySelector('.mh-bubble[data-bubble="info"]');
    if(!bub){
      bub = document.createElement('div');
      bub.className = 'mh-bubble hidden';
      bub.setAttribute('data-bubble','info');
      bub.setAttribute('role','region');
      bub.setAttribute('aria-live','polite');
      bub.innerHTML = ''
  + '<div class="mh-bubble-inner">'

  + '  <div class="mh-actions" style="margin-top:0;margin-bottom:.5rem">'
  + '    <button type="button" class="btn mh-btn" id="mh-guide-open">'
  + '      <span class="mh-ico-btn" aria-hidden="true">'
  + '        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
  + '          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>'
  + '          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>'
  + '        </svg>'
  + '      </span>'
  + '      <span class="mh-guide-label">Guida</span>'
  + '    </button>'
  + '  </div>'

  + '  <p id="info-bubble-body" data-info-body="1">Genova mApp è una mappa interattiva con accesso gratuito alla maggior parte dei contenuti.</p>'
  + '  <ul>'
  + '    <li><strong>Email</strong>: <span>info@sdac.it</span></li>'
  + '    <li><strong>Tel.</strong>: <span>3382897866</span></li>'
  + '    <li><strong>Indirizzo</strong>: <span>Genova</span></li>'
  + '  </ul>'
  + '</div>';


      body.appendChild(bub);
    } else {
      // ensure ids
      var h3 = bub.querySelector('h3'); if(h3 && !h3.id) h3.id = 'info-bubble-title';
      var p1 = bub.querySelector('[data-info-body="1"]') || bub.querySelector('p');
      if(p1 && !p1.id) p1.id = 'info-bubble-body';
    }

    return { btn, bub };
  }

  function apply(){
  var lang = curLang();
  var t = L[lang];
  if(lang === 'ar'){ document.documentElement.setAttribute('dir','rtl'); }
  else { document.documentElement.removeAttribute('dir'); }

  var nodes = ensureNodes();
  if(!nodes) return;
  var btn = nodes.btn, bub = nodes.bub;

  // Card
  var lab = document.getElementById('info-card-label');
  if(btn){
    btn.setAttribute('title', t.card);
    btn.setAttribute('aria-label', t.card);
  }
  if(lab) lab.textContent = t.card;

  // Bubble
  var body = document.getElementById('info-bubble-body');
  if(body && body.textContent !== t.body) body.textContent = t.body;

  // Bottone "Guida"
  if(bub){
    var gbtn = bub.querySelector('#mh-guide-open');
    if(gbtn){
      var gl = (t && (t.guideBtn || t.card)) || 'Guida';
      gbtn.setAttribute('title', gl);
      gbtn.setAttribute('aria-label', gl);
      var glab = gbtn.querySelector('.mh-guide-label');
      if(glab) glab.textContent = gl;
    }
  }
}




  function startGuard(){
    // while bubble visible, re-apply text every 300ms for 2 seconds to outlast any late re-render
    stopGuard();
    var elapsed = 0;
    intervalId = setInterval(function(){
      var bub = document.querySelector('.menu-home .mh-bubble[data-bubble="info"]');
      if(!bub || bub.classList.contains('hidden')){ stopGuard(); return; }
      apply();
      elapsed += 300;
      if(elapsed >= 2000) stopGuard();
    }, 300);
  }
  function stopGuard(){
    if(intervalId){ clearInterval(intervalId); intervalId = null; }
  }

  function init(){
    var nodes = ensureNodes();
    if(!nodes){
      var mo = new MutationObserver(function(){
        if(ensureNodes()){ apply(); mo.disconnect(); }
      });
      mo.observe(document.body, { childList:true, subtree:true });
    } else {
      apply();
    }

    // Click sul bottone "Guida" nel bubble info
    document.addEventListener('click', function(e){
      var g = e.target.closest && e.target.closest('#mh-guide-open');
      if(!g) return;
      if(!g.closest('.menu-home .mh-bubble[data-bubble="info"]')) return;

      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();

      // evento per step 2 (apertura popup vero)
      try{
        document.dispatchEvent(new CustomEvent('app:open-guide', { detail:{ lang: curLang() } }));
      }catch(_){}

    }, true);


    // Toggle & enforce at open
    document.addEventListener('click', function(e){
      var btn = e.target.closest && e.target.closest('.menu-home .mh-grid .mh-item[data-key="info"]');
      if(!btn) return;
      var bub = document.querySelector('.menu-home .mh-bubble[data-bubble="info"]');
      if(!bub) return;
      document.querySelectorAll('.menu-home .mh-bubble').forEach(function(x){ if(x !== bub) x.classList.add('hidden'); });
      bub.classList.toggle('hidden');
      apply();
      if(!bub.classList.contains('hidden')) startGuard();
      else stopGuard();
    });

    // Re-translate on explicit lang switchers
    document.addEventListener('click', function(e){
      var el = e.target.closest && e.target.closest('[data-lang]');
      if(!el) return;
      var v = el.getAttribute('data-lang');
      try{ localStorage.setItem('lang', v); }catch(_){}
      document.documentElement.setAttribute('lang', v);
      apply();
      startGuard();
    }, true);

    // React to <html lang> mutations
    try{
      new MutationObserver(function(){
        apply();
        startGuard();
      }).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
    }catch(_){}

    // If bubble text is altered by other scripts, force back to translation
    var bub = document.querySelector('.menu-home .mh-bubble[data-bubble="info"]');
    if(bub){
      try{
        new MutationObserver(function(){
          var ttl = document.getElementById('info-bubble-title');
          var body = document.getElementById('info-bubble-body');
          if(ttl && body){
            var lang = curLang(), t = L[lang];
            if(ttl.textContent !== t.title || body.textContent !== t.body) apply();
          }
        }).observe(bub, { childList:true, characterData:true, subtree:true });
      }catch(_){}
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();
