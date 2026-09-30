
(function(){
  var b = document.getElementById('btn-opere');
  if(b){
    b.setAttribute('aria-hidden','true');
    b.setAttribute('tabindex','-1');
    b.style.display='none';
    b.style.pointerEvents='none';
    b.addEventListener('click', function(e){ e.stopImmediatePropagation(); }, true);
    b.addEventListener('pointerdown', function(e){ e.stopImmediatePropagation(); }, true);
  }
})();
