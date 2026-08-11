
(function(){
  var L = {
  it:  { card: "Percorsi storici" },
  lij: { card: "Percórsi in ta stöia" },
  en:  { card: "Historic routes" },
  es:  { card: "Rutas históricas" },
  fr:  { card: "Parcours historiques" },
  ar:  { card: "مسارات تاريخية" },
  ru:  { card: "Исторические маршруты" },
  zh:  { card: "历史路线" }
};

  function curLang(){
    try{ return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it'; }
    catch(_){ return document.documentElement.getAttribute('lang') || 'it'; }
  }
  function apply(){
    var lang = curLang();
    var t = L[lang] || L.it;
    var btn = document.querySelector('.mh-item[data-key="storia"]');
    if(!btn) return;
    var lab = btn.querySelector('.mh-label, .mh-label-text') || btn;
    if(lab && t.card){
      lab.textContent = t.card;
      btn.setAttribute('title', t.card);
      btn.setAttribute('aria-label', t.card);
    }
  }
  function init(){
    apply();
    document.addEventListener('app:set-lang', apply);
    try{
      new MutationObserver(apply).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
    }catch(_){}
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init, { once:true }); }
  else { init(); }
})();
