
(function(){
  function moveGPSIntoBar(){
    var bar = document.getElementById('bottom-bar');
    if(!bar){ requestAnimationFrame(moveGPSIntoBar); return; }

    var gps = document.getElementById('btn-gps');
    if(!gps){ setTimeout(moveGPSIntoBar, 150); return; }

    // Clean positioning inherited from toolbar
    ['position','left','right','top','bottom','transform','marginLeft','marginRight'].forEach(function(prop){
      try{ gps.style[prop] = ''; }catch(_){}
    });

    // Insert as FIRST in the bar
    if(!bar.contains(gps)){
      gps.classList.add('fab-btn');
      if(bar.firstChild) bar.insertBefore(gps, bar.firstChild);
      else bar.appendChild(gps);
    }
  }
  // Run after other UI scripts
  setTimeout(moveGPSIntoBar, 0);
  setTimeout(moveGPSIntoBar, 200);
  setTimeout(moveGPSIntoBar, 800);
})();
