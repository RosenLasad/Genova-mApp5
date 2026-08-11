
(function(){
  function ensureRoutesInHeader(){
    var routes = document.getElementById('routes');
    var header = document.querySelector('header') || document.getElementById('app') || document.body;
    var bar = document.getElementById('bottom-bar');
    if(!routes) return;
    if(bar && bar.contains(routes)){
      // Move routes back to header, at the beginning
      if(header.firstChild) header.insertBefore(routes, header.firstChild);
      else header.appendChild(routes);
    }
  }
  function init(){
    ensureRoutesInHeader();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  // Also re-check after other scripts run
  setTimeout(init, 200);
  setTimeout(init, 800);
  setTimeout(init, 1600);
})();
