
(function(){
  var L = {
  it:  { card: "Genova, com'era" },
  lij: { card: "Zêna, com'a l'ea" },
  en:  { card: "Genoa, as it was" },
  es:  { card: "Génova, como era" },
  fr:  { card: "Gênes, comme elle était" },
  ar:  { card: "جنوة، كما كانت" },
  ru:  { card: "Генуя, какой она была" },
  zh:  { card: "热那亚，从前的样子" }
};

  function curLang(){
    try{ return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it'; }
    catch(_){ return document.documentElement.getAttribute('lang') || 'it'; }
  }
  function findScorciButton(){
    // Try common data-keys
    var btn = document.querySelector('.mh-item[data-key="scorci"]')
           || document.querySelector('.mh-item[data-key="sqorci"]')
           || document.querySelector('.mh-item[data-key="sQoRci"]')
           || document.querySelector('.mh-item[data-key="sQorci"]');
    if(btn) return btn;
    // Fallback: search by current label text matching "sQoRci" (case-insensitive)
    var candidates = document.querySelectorAll('.mh-item .mh-label, .mh-item .mh-label-text');
    for(var i=0;i<candidates.length;i++){
      var txt = (candidates[i].textContent || '').trim();
      if(/^\s*sqorci\s*$/i.test(txt) || /^\s*sQoRci\s*$/i.test(txt)){
        return candidates[i].closest('.mh-item');
      }
    }
    return null;
  }
  function apply(){
    var lang = curLang();
    var t = L[lang] || L.it;
    var btn = findScorciButton();
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
