
(function(){
  try{
    var allowedSel = '#flag-ribbon, #mh-flags, #flag-menu, #mh-flags-rail, #mh-flags-dropdown';
    Array.from(document.querySelectorAll('.fr-flag')).forEach(function(node){
      if(!node.closest(allowedSel)){ node.remove(); }
    });
    Array.from(document.querySelectorAll('body > svg')).forEach(function(svg){ svg.remove(); });
  }catch(e){}
})();
