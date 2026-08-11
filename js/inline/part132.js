
(function(){
  var qt = document.getElementById('quick-toggles');
  if (!qt) return;

  function apply(){
    qt.style.top = '50px';
    qt.style.right = '12px';
    qt.style.bottom = '';
    qt.style.transform = 'none';
    qt.style.position = 'absolute';
  }

  apply();
  var obs = new MutationObserver(apply);
  obs.observe(qt, { attributes: true, attributeFilter: ['style', 'class'] });

  window.addEventListener('resize', apply);
})();
