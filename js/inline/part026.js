
(function(){
  function qs(sel,root){return (root||document).querySelector(sel);}
  var chip = document.querySelector('#legend .chip:nth-of-type(1)'); // safer selection: first chip is Scorci in this menu
  // Better: find chip containing 'Scorci'
  chip = (function(){
    var c = null;
    document.querySelectorAll('#legend .chip').forEach(function(x){
      if(/Scorci/.test(x.textContent||'')) c = x;
    });
    return c;
  })();
  var sub = document.getElementById('legend-blue-sublist');
  if(chip && sub){
    function toggle(e){
      try{ e && e.stopPropagation(); }catch(_){}
      var open = sub.style.display !== 'none';
      sub.style.display = open ? 'none' : 'block';
      var caret = chip.querySelector('.caret');
      if(caret) caret.textContent = open ? '▸' : '▾';
    }
    chip.addEventListener('click', toggle);
  }
})();
