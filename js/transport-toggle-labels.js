(function(){
  'use strict';
  var TEXT = {
    it:{main:'Come muoversi',bus:'Autobus',train:'Treni',metro:'Metropolitana',funi:'Impianti verticali',sea:'Navi e battelli',air:'Aereo'},
    en:{main:'Getting around',bus:'Buses',train:'Trains',metro:'Metro',funi:'Funiculars and lifts',sea:'Boats and ferries',air:'Air travel'},
    es:{main:'Cómo moverse',bus:'Autobuses',train:'Trenes',metro:'Metro',funi:'Funiculares y ascensores',sea:'Barcos y ferris',air:'Avión'},
    fr:{main:'Se déplacer',bus:'Bus',train:'Trains',metro:'Métro',funi:'Funiculaires et ascenseurs',sea:'Bateaux et ferries',air:'Avion'},
    ar:{main:'التنقل',bus:'الحافلات',train:'القطارات',metro:'المترو',funi:'القطارات الجبلية والمصاعد',sea:'السفن والقوارب',air:'الطيران'},
    ru:{main:'Как передвигаться',bus:'Автобусы',train:'Поезда',metro:'Метро',funi:'Фуникулёры и лифты',sea:'Суда и катера',air:'Авиация'},
    zh:{main:'城市交通',bus:'公交车',train:'火车',metro:'地铁',funi:'缆车与电梯',sea:'船舶与渡轮',air:'航空'},
    lij:{main:'Comme mesciase',bus:'Bus',train:'Treni',metro:'Metrò',funi:'Funicolâ e ascensôi',sea:'Nave e batèi',air:'Aereo'}
  };
  var SELECTORS = {bus:'.qt-bus',train:'.qt-train',metro:'.qt-metro',funi:'.qt-funi',sea:'.qt-mare',air:'.qt-aereo'};
  function language(){
    var raw='';
    try{ raw=localStorage.getItem('lang')||document.documentElement.lang||'it'; }catch(_){ raw=document.documentElement.lang||'it'; }
    raw=String(raw).toLowerCase();
    if(raw.indexOf('lij')===0) return 'lij';
    if(raw.indexOf('zh')===0||raw.indexOf('cn')===0) return 'zh';
    raw=raw.split('-')[0];
    return TEXT[raw]?raw:'it';
  }
  function apply(){
    var labels=TEXT[language()]||TEXT.it;
    var main=document.getElementById('qt-cat-trasporti-btn');
    if(main){
      main.setAttribute('aria-label',labels.main); main.setAttribute('title',labels.main);
      var hidden=main.querySelector('.sr-only'); if(hidden) hidden.textContent=labels.main;
    }
    Object.keys(SELECTORS).forEach(function(key){
      var button=document.querySelector('#qt-cat-trasporti '+SELECTORS[key]);
      if(!button) return;
      button.setAttribute('aria-label',labels[key]); button.setAttribute('title',labels[key]);
      var text=button.querySelector('.qt-transport-label'); if(text) text.textContent=labels[key];
    });
    var panel=document.getElementById('qt-cat-trasporti'); if(panel) panel.setAttribute('aria-label',labels.main);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply); else apply();
  document.addEventListener('app:set-lang',apply);
  window.addEventListener('i18n:changed',apply);
})();
