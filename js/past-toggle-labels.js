(function(){
  'use strict';
  var TEXT = {
    it:{main:'Passato',forts:'Forti',museums:'Musei',churches:'Chiese',palaces:'Palazzi',walls:'Mura',aqueducts:'Acquedotti',routes:'Percorsi',minidoc:'MiniDoc'},
    en:{main:'Past',forts:'Forts',museums:'Museums',churches:'Churches',palaces:'Palaces',walls:'Walls',aqueducts:'Aqueducts',routes:'Routes',minidoc:'MiniDoc'},
    es:{main:'Pasado',forts:'Fuertes',museums:'Museos',churches:'Iglesias',palaces:'Palacios',walls:'Murallas',aqueducts:'Acueductos',routes:'Rutas',minidoc:'MiniDoc'},
    fr:{main:'Passé',forts:'Forts',museums:'Musées',churches:'Églises',palaces:'Palais',walls:'Murailles',aqueducts:'Aqueducs',routes:'Parcours',minidoc:'MiniDoc'},
    ar:{main:'الماضي',forts:'الحصون',museums:'المتاحف',churches:'الكنائس',palaces:'القصور',walls:'الأسوار',aqueducts:'القنوات المائية',routes:'المسارات',minidoc:'أفلام قصيرة'},
    ru:{main:'Прошлое',forts:'Форты',museums:'Музеи',churches:'Церкви',palaces:'Дворцы',walls:'Стены',aqueducts:'Акведуки',routes:'Маршруты',minidoc:'Короткие фильмы'},
    zh:{main:'历史',forts:'堡垒',museums:'博物馆',churches:'教堂',palaces:'宫殿',walls:'城墙',aqueducts:'渡槽',routes:'历史路线',minidoc:'短片'},
    lij:{main:'Stöia',forts:'Forti',museums:'Muxei',churches:'Gexe',palaces:'Palassi',walls:'Mûre',aqueducts:'Aqüeduti',routes:'Percorsi',minidoc:'MiniDoc'}
  };
  var SELECTORS = {forts:'.qt-forti',museums:'.qt-museum',churches:'.qt-chiese',palaces:'.qt-palazzi',aqueducts:'.qt-acq-all',routes:'.qt-percorsi-all',walls:'.qt-mura-all',minidoc:'.qt-doc-all'};
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
    var main=document.getElementById('qt-cat-passato-btn');
    if(main){
      main.setAttribute('aria-label',labels.main); main.setAttribute('title',labels.main);
      var hidden=main.querySelector('.sr-only'); if(hidden && hidden.textContent!==labels.main) hidden.textContent=labels.main;
    }
    Object.keys(SELECTORS).forEach(function(key){
      var button=document.querySelector('#qt-cat-passato '+SELECTORS[key]);
      if(!button) return;
      button.setAttribute('aria-label',labels[key]); button.setAttribute('title',labels[key]);
      var text=button.querySelector('.qt-past-label'); if(text && text.textContent!==labels[key]) text.textContent=labels[key];
      var sr=button.querySelector('.sr-only'); if(sr && !text && sr.textContent!==labels[key]) sr.textContent=labels[key];
    });
    var panel=document.getElementById('qt-cat-passato'); if(panel) panel.setAttribute('aria-label',labels.main);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply); else apply();
  document.addEventListener('app:set-lang',apply);
  window.addEventListener('i18n:changed',apply);
  try{ new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true}); }catch(_){}
})();
