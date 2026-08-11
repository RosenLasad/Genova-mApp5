
(function(){
  function areAnyRoutesActive(){
    return !!document.querySelector('#routes-menu input.route-chk:checked');
  }

  function setAllRoutes(on){
    var rows = document.querySelectorAll('#routes-menu .doc-row[data-route-id]');
    rows.forEach(function(row){
      var chk = row.querySelector('input.route-chk');
      if(!chk) return;
      if(chk.checked === on) return;
      chk.checked = on;
      chk.dispatchEvent(new Event('change', {bubbles:false}));
    });
  }

  function setup(){
    var all = document.getElementById('storia-percorsi-all');
    if (!all) return false;

    function sync(){
      all.indeterminate = false;
      all.checked = areAnyRoutesActive();
    }

    all.addEventListener('change', function(e){
      e.stopPropagation();
      setAllRoutes(!!all.checked);
      setTimeout(sync, 0);
    });

    document.addEventListener('change', function(e){
      if (!e.target.matches('#routes-menu input.route-chk')) return;
      sync();
    });

    sync();
    return true;
  }

  function ready(cb){
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', cb, { once:true });
    } else {
      cb();
    }
  }

  ready(function(){
    var tries = 0, max = 60;
    (function tick(){
      if (setup()) return;
      if (++tries >= max) return;
      setTimeout(tick, 150);
    })();
  });
})();
