
(function(){
  if (window.__muraLangHookV2) return; window.__muraLangHookV2 = true;
  function isMuraPopup(pop){
    try{
      if (!pop) return false;
      var el = pop.getElement && pop.getElement();
      var cls = (pop.options && pop.options.className) || '';
      if (cls && /mura-popup/.test(cls)) return true;
      // fallback: inspect current HTML for walls keywords (italian labels present in templates)
      var html = (typeof pop.getContent === 'function') ? pop.getContent() : '';
      return /Mura|Porta|Anno costruzione|Castrum|Barbarossa/i.test(String(html||''));
    }catch(_){}
    return false;
  }
  function refreshOpenMuraPopupsV2(){
    try{
      if (!window.map || !map._layers) return;
      for (var k in map._layers){
        var Lyr = map._layers[k];
        try{
          if (Lyr && typeof Lyr.isPopupOpen==='function' && Lyr.isPopupOpen()){
            var pop = Lyr.getPopup && Lyr.getPopup();
            if (isMuraPopup(pop)){
              // Force a close+open to trigger the existing construction logic with the new language
              try{ Lyr.closePopup(); }catch(_){}
              try{ Lyr.openPopup(); }catch(_){}
            }
          }
        }catch(_){}
      }
    }catch(_){}
  }
  document.addEventListener('app:set-lang', refreshOpenMuraPopupsV2);
})();
