
(function(){
  function domReady(cb){
    if(document.readyState === 'interactive' || document.readyState === 'complete'){ cb(); return; }
    document.addEventListener('DOMContentLoaded', cb, {once:true});
  }
  function txt(el){ return (el && el.textContent || '').trim().toLowerCase(); }

  domReady(function(){
    try{
      /* Documentari duplicates fixer removed */
    }catch(e){}
  });
})();
