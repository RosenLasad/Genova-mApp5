
(function(){
  function setHeaderH(){
    var h = document.querySelector('header');
    if(!h) return;
    document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
  }
  window.addEventListener('load', setHeaderH);
  window.addEventListener('resize', setHeaderH);
  setHeaderH();
})();
