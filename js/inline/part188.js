
(function(){
  function curLang(){
    try{ return (localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it').toLowerCase(); }
    catch(_){ return (document.documentElement.getAttribute('lang') || 'it').toLowerCase(); }
  }
  var LBL = {
    it: ['Mostra QR','Nascondi QR'],
    en: ['Show QR','Hide QR'],
    es: ['Mostrar QR','Ocultar QR'],
    fr: ['Afficher QR','Masquer QR'],
    ar: ['إظهار QR','إخفاء QR'],
    ru: ['Показать QR','Скрыть QR'],
    zh: ['显示 QR','隐藏 QR'],
    lij:['Mostra i QR','Ascondi i QR']
  };
  function apply(){
    var master = document.getElementById('chk-qr-all');
    if(!master) return;
    var row = master.closest('.doc-row') || master.closest('label') || master.parentElement;
    if(!row) return;
    var lab = row.querySelector('.label');
    if(!lab) return;
    var lang = curLang();
    var pair = LBL[lang] || LBL.it;
    lab.textContent = master.checked ? pair[1] : pair[0];
  }
  // Initial
  document.addEventListener('DOMContentLoaded', apply);
  // On change
  document.addEventListener('change', function(e){
    if(e.target && e.target.id === 'chk-qr-all') apply();
  }, true);
  // On lang changes
  try{
    var mo = new MutationObserver(function(muts){
      for(const m of muts){
        if(m.type==='attributes' && m.attributeName==='lang'){ apply(); }
      }
    });
    mo.observe(document.documentElement, {attributes:true});
  }catch(_){}
  // Fallback polling in case the node is injected late
  var tries = 0;
  (function loop(){
    tries++;
    apply();
    if(tries < 40 && !document.getElementById('chk-qr-all')){
      setTimeout(loop, 150);
    }
  })();
})();
