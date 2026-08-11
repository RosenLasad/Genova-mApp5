
(function(){
  function refreshFlags(){
    try{
      var cur = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
      document.querySelectorAll('#mh-flags .flag, #flag-ribbon .flag').forEach(function(btn){
        var on = btn.getAttribute('data-lang') === cur;
        btn.classList.toggle('selected', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }catch(_){}
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', refreshFlags, {once:true});
  }else{
    refreshFlags();
  }
  document.addEventListener('app:set-lang', refreshFlags);
})();
