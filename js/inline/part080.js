
(function(){
  function _ieriScore(s){
    if(!s) return 1e9;
    // Match più robusto: _ieri_1.mp4, _ieri1.mp4, ieri_1.mp4, ieri1.mp4, _1.mp4 (fallback)
    var m = /(?:_ieri[_-]?|ieri[_-]?|_)?(\d+)\.mp4(?:\?|$)/i.exec(s);
    if(m) return parseInt(m[1], 10);
    // Se c'è un file generico "_ieri.mp4" senza numero, tienilo come primo
    if(/_ieri\.mp4$/i.test(s)) return 1;
    return 1e8;
  }
  function sortIeri(list){
    if(!list) return list;
    var arr = Array.isArray(list) ? list.slice() : [list];
    arr.sort(function(a,b){ return _ieriScore(a) - _ieriScore(b); });
    return arr;
  }
  function normalizePlace(p){
    try{
      if(p && p.media && p.media.ieri){
        p.media.ieri = sortIeri(p.media.ieri);
      }
    }catch(e){ /* no-op */ }
  }
  function normalizeAll(){
    try{
      if(Array.isArray(window.PLACES) && window.PLACES.length){
        window.PLACES.forEach(normalizePlace);
        return true;
      }
    }catch(e){}
    return false;
  }

  // 1) Prova a normalizzare tutti i PLACES non appena sono disponibili
  document.addEventListener('DOMContentLoaded', function(){
    var tries = 0;
    (function tick(){
      if(normalizeAll()) return;
      if(++tries < 100) setTimeout(tick, 100);
    })();
  });

  // 2) Se esiste setPlace, avvolgilo per garantire l'ordinamento anche su singolo place
  var _setPlace = window.setPlace;
  if(typeof _setPlace === 'function'){
    window.setPlace = function(p){
      normalizePlace(p);
      return _setPlace.call(this, p);
    };
  } else {
    // Se setPlace non esiste ancora, riprova tra un attimo
    setTimeout(function(){
      var sp = window.setPlace;
      if(typeof sp === 'function'){
        var __sp = sp;
        window.setPlace = function(p){
          normalizePlace(p);
          return __sp.call(this, p);
        };
      }
    }, 500);
  }
})();
