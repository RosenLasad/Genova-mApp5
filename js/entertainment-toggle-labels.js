(function(){
  'use strict';
  var TEXT = {
    it:{events:'Eventi',main:'Intrattenimento',parks:'Parchi e piazze',sport:'Sport',cinema:'Cinema',theater:'Teatri',exhibitions:'Mostre'},
    en:{events:'Events',main:'Entertainment',parks:'Parks and squares',sport:'Sports',cinema:'Cinema',theater:'Theatres',exhibitions:'Exhibitions'},
    es:{events:'Eventos',main:'Entretenimiento',parks:'Parques y plazas',sport:'Deporte',cinema:'Cine',theater:'Teatros',exhibitions:'Exposiciones'},
    fr:{events:'Événements',main:'Divertissement',parks:'Parcs et places',sport:'Sport',cinema:'Cinéma',theater:'Théâtres',exhibitions:'Expositions'},
    ar:{events:'فعاليات',main:'الترفيه',parks:'الحدائق والساحات',sport:'الرياضة',cinema:'السينما',theater:'المسارح',exhibitions:'المعارض'},
    ru:{events:'События',main:'Развлечения',parks:'Парки и площади',sport:'Спорт',cinema:'Кинотеатры',theater:'Театры',exhibitions:'Выставки'},
    zh:{events:'活动',main:'娱乐',parks:'公园与广场',sport:'体育',cinema:'电影院',theater:'剧院',exhibitions:'展览'},
    lij:{events:'Eventi',main:'Divertimento',parks:'Parchi e ciàsse',sport:'Sport',cinema:'Çinemma',theater:'Teatri',exhibitions:'Mostre'}
  };
  var SELECTORS = {events:'.qt-eventi',parks:'.qt-parchi',sport:'.qt-sport',cinema:'.qt-cinema',theater:'.qt-teatri',exhibitions:'.qt-mostre'};
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
    var main=document.getElementById('qt-cat-luoghi-btn');
    if(main){
      main.setAttribute('aria-label',labels.main); main.setAttribute('title',labels.main);
      var hidden=main.querySelector('.sr-only'); if(hidden) hidden.textContent=labels.main;
    }
    Object.keys(SELECTORS).forEach(function(key){
      var button=document.querySelector('#qt-cat-luoghi '+SELECTORS[key]);
      if(!button) return;
      button.setAttribute('aria-label',labels[key]); button.setAttribute('title',labels[key]);
      var text=button.querySelector('.qt-entertainment-label'); if(text) text.textContent=labels[key];
    });
    var panel=document.getElementById('qt-cat-luoghi'); if(panel) panel.setAttribute('aria-label',labels.main);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply); else apply();
  document.addEventListener('app:set-lang',apply);
  window.addEventListener('i18n:changed',apply);
})();
