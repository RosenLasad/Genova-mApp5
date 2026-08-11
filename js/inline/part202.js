
(function(){
  // Make "Mostra tutto" in the new Storia menu control all child checkmarks for Mura/Acquedotti/Documentari
  function bindSectionAll(section){
    var all = document.getElementById('storia-' + section + '-all');
    var host = document.getElementById('storia-' + section + '-items');
    if(!all || !host) return;

    function items(){
      return Array.from(host.querySelectorAll('label .st-label')).map(function(span){
        var lab = span.closest('label'); if(!lab) return null;
        var cb = lab.querySelector('input[type="checkbox"]'); return cb || null;
      }).filter(Boolean);
    }

    function updateAll(){
      var cs = items();
      var total = cs.length;
      var on = cs.filter(function(c){ return !!c.checked; }).length;
      all.indeterminate = (on > 0 && on < total);
      all.checked = (total > 0 && on === total);
    }

    all.addEventListener('change', function(){
      var cs = items();
      var want = !!all.checked;
      cs.forEach(function(c){
        if(!!c.checked !== want){ c.click(); }  // click to respect each row's binding to legacy checkbox
      });
      updateAll();
    });

    // keep "Mostra tutto" in sync when individual items change
    var cs0 = items();
    cs0.forEach(function(c){ c.addEventListener('change', updateAll); });
    updateAll();

    // If future items are added dynamically, observe and rebind
    try{
      new MutationObserver(function(){
        var cs = items();
        cs.forEach(function(c){ c.removeEventListener('change', updateAll); c.addEventListener('change', updateAll); });
        updateAll();
      }).observe(host, {childList:true, subtree:true});
    }catch(_){}
  }

  function bootAll(){
    ['mura','acquedotti','doc'].forEach(bindSectionAll);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootAll);
  else bootAll();
})();
