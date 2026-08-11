
(function(){
  
  var DICT = {
  "it": {
    }
};
  var lang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
  function t(k){ return (DICT[lang] && DICT[lang][k]) || k; }

  
  // Wire global setter for flags
  window.setLang = function(newLang){
  lang = newLang || 'it';
  try{ localStorage.setItem('lang', lang); }catch(_){}
  try{ document.documentElement.setAttribute('lang', lang); }catch(_){}

  try{ document.dispatchEvent(new CustomEvent('app:set-lang', {detail:{lang:lang}})); }catch(_){}
  try{ window.dispatchEvent(new Event('i18n:changed')); }catch(_){}

  try{ applyGiochiLabel(); }catch(_){}

  // Se Info è aperto, aggiorna subito (senza costringere a chiudere/riaprire)
  try{
  var _bubble = document.getElementById('mh-bubble');
  var _key = _bubble && _bubble.dataset ? _bubble.dataset.key : '';
  var _isOpen = _bubble && !_bubble.classList.contains('hidden');

  // Se una sezione Home è aperta, ricaricala nella nuova lingua
  if(_bubble && _isOpen && _key
     && window.__gmHomePanel
     && typeof window.__gmHomePanel.openSection === 'function'){
    window.__gmHomePanel.openSection(_key);
    return;
  }

  // fallback: chiudi
  if(_bubble){
    if(typeof closeBubble === 'function'){ closeBubble(); }
    else { _bubble.classList.add('hidden'); }
  }
}catch(_){}

};

})();
