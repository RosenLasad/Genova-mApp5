
/* Clear-all for marker buttons: turns OFF any active quick toggle */
(function(){
  function attachClear(){
    var btn = document.querySelector('#quick-toggles .qt-clear');
    if (!btn) return false;
    btn.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      // Collect active marker buttons (exclude the clear itself)
      var actives = Array.prototype.slice.call(
        document.querySelectorAll('#quick-toggles .qt-btn[aria-pressed="true"]:not(.qt-clear)')
      );
      // Click each to toggle OFF (use a snapshot to avoid live list issues)
      actives.forEach(function(b){ b.click(); });
    });
    return true;
  }
  var tries=0, max=60;
  var iv = setInterval(function(){
    if (attachClear()) { clearInterval(iv); }
    if (++tries >= max) clearInterval(iv);
  }, 150);
})();
