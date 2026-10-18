/* Genova mApp - Colonna destra richiudibile; nessuna modifica ai filtri/marker. */
(function(){
  'use strict';
  function init(){
    var rail=document.getElementById('quick-toggles');
    var toggle=document.getElementById('gm-right-rail-toggle');
    if(!rail||!toggle)return;
    var KEY='gm-right-rail-collapsed-v1';
    var labels={
      it:['Nascondi i comandi laterali','Mostra i comandi laterali'],
      en:['Hide side controls','Show side controls'],
      fr:['Masquer les commandes latérales','Afficher les commandes latérales'],
      es:['Ocultar los controles laterales','Mostrar los controles laterales'],
      ru:['Скрыть боковые кнопки','Показать боковые кнопки'],
      zh:['隐藏侧边按钮','显示侧边按钮'],
      ar:['إخفاء الأزرار الجانبية','إظهار الأزرار الجانبية'],
      lij:['Ascundi i bottoni de lato','Mostra i bottoni de lato']
    };
    var collapsed=false;
    try {collapsed=localStorage.getItem(KEY)==='1';}catch(e){}
    var children=Array.prototype.filter.call(rail.children,function(n){return n!==toggle;});
    function closeFlyouts(){
      rail.querySelectorAll('.qt-cat-panel').forEach(function(panel){panel.setAttribute('hidden','');});
      rail.querySelectorAll('.qt-cat.qt-pill[aria-expanded]').forEach(function(btn){btn.setAttribute('aria-expanded','false');});
    }
    function language(){
      var s='it';
      try{s=localStorage.getItem('lang')||document.documentElement.lang||'it';}catch(e){s=document.documentElement.lang||'it';}
      s=String(s).toLowerCase();
      return s.indexOf('lij')===0?'lij':(labels[s.split('-')[0]]?s.split('-')[0]:'it');
    }
    function updateLabels(){
      var label=labels[language()][collapsed?1:0];
      toggle.setAttribute('aria-label',label);
      toggle.setAttribute('title',label);
    }
    function apply(){
      if(collapsed)closeFlyouts();
      rail.classList.toggle('gm-right-rail-collapsed',collapsed);
      toggle.setAttribute('aria-expanded',String(!collapsed));
      children.forEach(function(n){
        if(collapsed){n.setAttribute('inert','');n.setAttribute('aria-hidden','true');}
        else {n.removeAttribute('inert');n.removeAttribute('aria-hidden');}
      });
      updateLabels();
    }
    toggle.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      collapsed=!collapsed;
      try{localStorage.setItem(KEY,collapsed?'1':'0');}catch(e){}
      apply();
    });
    document.addEventListener('app:set-lang',updateLabels);
    window.addEventListener('i18n:changed',updateLabels);
    apply();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
