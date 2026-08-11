
(function routesI18nMasters(){
  var SHOW_ALL = { it:"Mostra tutti", en:"Show all", fr:"Tout afficher", es:"Mostrar todos", ar:"عرض الكل", ru:"Показать все", zh:"显示全部", lij:"Fâ védde tùtti" };
  function currentLang(){
    var l=(document.documentElement.getAttribute('lang')||'it').toLowerCase();
    return l.split('-')[0];
  }
  function translateMasters(){
    var lang = currentLang();
    var txt = SHOW_ALL[lang] || SHOW_ALL.it;
    document.querySelectorAll('#routes-menu .doc-row[data-action="show-all"] .chip').forEach(function(el){ el.textContent = txt; });
  }
  // Hook into existing updater if present
  var prev = window.updateRoutesMenuLabels;
  window.updateRoutesMenuLabels = function(){
    if(prev) prev();
    translateMasters();
  };
  // Initial
  setTimeout(translateMasters, 0);
  // Keep open on lang change already handled; we only need to translate
  try{
    var mo = new MutationObserver(function(muts){
      for(var i=0;i<muts.length;i++){
        var m=muts[i];
        if(m.type==='attributes' && m.attributeName==='lang'){ translateMasters(); break; }
      }
    });
    mo.observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  }catch(_){}
})();
