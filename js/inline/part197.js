
(function(){
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
          + '<circle cx="12" cy="12" r="6"/>'  /* ring */
          + '<circle cx="12" cy="12" r="2" fill="white" stroke="white"/>' /* center dot */
          + '<line x1="12" y1="3" x2="12" y2="6"/>'  /* N tick */
          + '<line x1="12" y1="18" x2="12" y2="21"/>' /* S tick */
          + '<line x1="3" y1="12" x2="6" y2="12"/>'  /* W tick */
          + '<line x1="18" y1="12" x2="21" y2="12"/>' /* E tick */
          + '</svg>';
  function apply(){
    var btn = document.getElementById('btn-gps');
    if(!btn){ requestAnimationFrame(apply); return; }
    // If button contains an SVG child, replace it; else append our SVG
    try{
      btn.innerHTML = svg;
    }catch(_){}
  }
  // try soon and also later in case other scripts move/recreate it
  setTimeout(apply, 0);
  setTimeout(apply, 300);
  setTimeout(apply, 1200);
})();
