
(function(){
  function curLang(){
    try{ return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it'; }
    catch(_){ return document.documentElement.getAttribute('lang') || 'it'; }
  }

  // Button labels i18n (independent from DICT; we still try t(key) first if available)
  var BTN = {
    it: {
      "bubble.storia.btn.mura":"Mura",
      "bubble.storia.btn.acquedotti":"Acquedotti",
      "bubble.storia.btn.minidoc":"MiniDoc",
      "bubble.percorsi.btn.centro":"Centro Storico",
      "bubble.percorsi.btn.dentro_mn":"Dentro le Mura Nuove",
      "bubble.percorsi.btn.fuori_mn":"Fuori le Mura",
      "bubble.sqorci.btn.search":"cerca"
    },
    lij: {
      "bubble.storia.btn.mura":"Mûre",
      "bubble.storia.btn.acquedotti":"Acquedotti",
      "bubble.storia.btn.minidoc":"MiniDoc",
      "bubble.percorsi.btn.centro":"Çentro Stöico",
      "bubble.percorsi.btn.dentro_mn":"Dëntro e Mûre Nêuve",
      "bubble.percorsi.btn.fuori_mn":"Föua de Mûre",
      "bubble.sqorci.btn.search":"çerca"
         },
    en: {
      "bubble.storia.btn.mura":"Walls",
      "bubble.storia.btn.acquedotti":"Aqueducts",
      "bubble.storia.btn.minidoc":"MiniDoc",
      "bubble.percorsi.btn.centro":"Historic Center",
      "bubble.percorsi.btn.dentro_mn":"Inside the New Walls",
      "bubble.percorsi.btn.fuori_mn":"Outside the Walls",
      "bubble.sqorci.btn.search":"search"
    },
    es: {
      "bubble.storia.btn.mura":"Murallas",
      "bubble.storia.btn.acquedotti":"Acueductos",
      "bubble.storia.btn.minidoc":"MiniDoc",
      "bubble.percorsi.btn.centro":"Centro Histórico",
      "bubble.percorsi.btn.dentro_mn":"Dentro de las Murallas Nuevas",
      "bubble.percorsi.btn.fuori_mn":"Fuera de las Murallas",
      "bubble.sqorci.btn.search":"buscar"
    },
    fr: {
      "bubble.storia.btn.mura":"Murailles",
      "bubble.storia.btn.acquedotti":"Aqueducs",
      "bubble.storia.btn.minidoc":"MiniDoc",
      "bubble.percorsi.btn.centro":"Centre historique",
      "bubble.percorsi.btn.dentro_mn":"À l’intérieur des Murailles neuves",
      "bubble.percorsi.btn.fuori_mn":"Hors des Murailles",
      "bubble.sqorci.btn.search":"chercher"
    },
    ar: {
      "bubble.storia.btn.mura":"الأسوار",
      "bubble.storia.btn.acquedotti":"القنوات المائية",
      "bubble.storia.btn.minidoc":"أفلام قصيرة",
      "bubble.percorsi.btn.centro":"المركز التاريخي",
      "bubble.percorsi.btn.dentro_mn":"داخل الأسوار الجديدة",
      "bubble.percorsi.btn.fuori_mn":"خارج الأسوار",
      "bubble.sqorci.btn.search":"بحث"
    },
    ru: {
      "bubble.storia.btn.mura":"Стены",
      "bubble.storia.btn.acquedotti":"Акведуки",
      "bubble.storia.btn.minidoc":"Короткие фильмы",
      "bubble.percorsi.btn.centro":"Исторический центр",
      "bubble.percorsi.btn.dentro_mn":"Внутри Новых стен",
      "bubble.percorsi.btn.fuori_mn":"За стенами",
      "bubble.sqorci.btn.search":"поиск"
    },
    zh: {
      "bubble.storia.btn.mura":"城牆",
      "bubble.storia.btn.acquedotti":"渡槽",
      "bubble.storia.btn.minidoc":"短片",
      "bubble.percorsi.btn.centro":"歷史中心",
      "bubble.percorsi.btn.dentro_mn":"新城牆內",
      "bubble.percorsi.btn.fuori_mn":"城牆外",
      "bubble.sqorci.btn.search":"搜尋"
    }
  };

  // Map bubble keys to button IDs and i18n keys
  var MAP = {
    "storia": [
      ["st-mura", "bubble.storia.btn.mura"],
      ["st-acquedotti", "bubble.storia.btn.acquedotti"],
      ["st-minidoc", "bubble.storia.btn.minidoc"]
    ],
    "percorsi": [
      ["pe-centro", "bubble.percorsi.btn.centro"],
      ["pe-dentro-mn", "bubble.percorsi.btn.dentro_mn"],
      ["pe-fuori-mn", "bubble.percorsi.btn.fuori_mn"]
    ],
    "sqorci": [
      ["sq-cerca", "bubble.sqorci.btn.search"]
    ]
  };

  function tr(key){
    var lang = curLang();
    // Prefer DICT via t(key) if available
    try{
      if(typeof t === 'function'){
        var v = t(key);
        if(v && v !== key) return v;
      }
    }catch(_){}
    // Fallback to BTN table
    return (BTN[lang] && BTN[lang][key]) || (BTN.it && BTN.it[key]) || key;
  }

  function applyLabels(bubble){
    if(!bubble) return;
    var key = bubble.dataset.key;
    var pairs = MAP[key];
    if(!pairs) return;
    pairs.forEach(function(p){
      var id = p[0], k = p[1];
      var btn = document.getElementById(id);
      if(!btn) return;
      var spans = btn.querySelectorAll('span');
      if(!spans.length) return;
      // usually the label is the last span
      spans[spans.length - 1].textContent = tr(k);
    });
  }

  function tryApply(){
    var b = document.querySelector('.mh-bubble:not(.hidden)');
    if(!b) return;
    applyLabels(b);
  }

  // Hook after any open
  document.addEventListener('click', function(){ setTimeout(tryApply, 0); }, true);
  var mo = new MutationObserver(function(){ setTimeout(tryApply, 0); });
  mo.observe(document.documentElement, {subtree:true, attributes:true, childList:true});

  // First pass
  setTimeout(tryApply, 0);
})();
