
(function(){
  function positionMenuAboveBtn(){
    var btn = document.getElementById('btn-lang');
    var rail = document.getElementById('mh-flags');
    if(!btn || !rail) return;
    
    // Get the button's position
    var rect = btn.getBoundingClientRect();
    
    // Position the menu directly above the button, with some offset
    rail.style.left = (rect.left + window.scrollX + rect.width / 2 - rail.offsetWidth / 2) + 'px';
    rail.style.bottom = (window.innerHeight - rect.top + window.scrollY + 6) + 'px'; // Small offset from the button
  }
  
  // Call on initialization and on window resize to adjust position
  window.addEventListener('resize', positionMenuAboveBtn);
  window.addEventListener('DOMContentLoaded', positionMenuAboveBtn);
  setTimeout(positionMenuAboveBtn, 300);
})();
