
// Keep routes menu open across language changes if it was open
(function persistOpenOnLang(){
  var menu = document.getElementById('routes-menu');
  if(!menu) return;
  var wasOpen = false;
  var htmlEl = document.documentElement;
  try{
    var mo2 = new MutationObserver(function(muts){
      for(const m of muts){
        if(m.type==='attributes' && m.attributeName==='lang'){
          // If menu was visible, keep it visible
          if(menu.style.display==='block'){
            // Reapply open after label update
            setTimeout(function(){ menu.style.display='block'; }, 0);
          }
          break;
        }
      }
    });
    mo2.observe(htmlEl, {attributes:true, attributeFilter:['lang']});
  }catch(_){}
})();
