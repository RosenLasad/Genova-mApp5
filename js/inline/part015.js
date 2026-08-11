
(function(){
  function findHeader(){
    return document.querySelector('header') || document.getElementById('app') || document.body;
  }
  function qInHeader(sel){
    var h = findHeader();
    return h ? h.querySelector(sel) : null;
  }
  function reorder(){
    var header = findHeader();
    if(!header) return;
    var routes = document.getElementById('routes');
    if(!routes || !header.contains(routes)) return;

    // Find "Storia" and "Abbonamento" buttons in the header
    var storia = qInHeader('[title*="Storia" i], [aria-label*="Storia" i], #storia, .storia, button[data-key="storia"]');
    var abbon = qInHeader('[title*="Abbon" i], [aria-label*="Abbon" i], #abbonamento, .abbonamento, button[data-key="abbonamento"]');

    if(storia && abbon){
      // Insert routes before Abbonamento so it's between Storia and Abbonamento
      if(abbon.parentNode){
        abbon.parentNode.insertBefore(routes, abbon);
        return;
      }
    }
    if(storia && storia.parentNode){
      // Fallback: place routes right after Storia
      if(storia.nextSibling){
        storia.parentNode.insertBefore(routes, storia.nextSibling);
      }else{
        storia.parentNode.appendChild(routes);
      }
    }
  }
  function init(){
    reorder();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  // retry in case toolbar items mount late
  setTimeout(init, 200);
  setTimeout(init, 800);
  setTimeout(init, 1600);
})();
