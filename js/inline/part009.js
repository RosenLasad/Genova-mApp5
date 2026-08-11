
(function(){
  function run(){
    var bar = document.getElementById('bottom-bar');
    var help = document.getElementById('help-fab');
    if(!bar || !help){ setTimeout(run, 120); return; }
    if(!bar.contains(help)){
      bar.insertBefore(help, bar.firstChild); // primo a sinistra
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  setTimeout(run, 200);
  setTimeout(run, 800);
})();
