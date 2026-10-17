/* Genova mApp - anteprime espandibili dei testi nei popup Leaflet. */
(function(){
  'use strict';
  var selector = '.gm-place-description, .gm-wall-popup-description, .mh-popup-desc';
  var queued = false;
  var titles = {
    it:['Leggi tutta la descrizione','Riduci la descrizione'],
    en:['Read full description','Show less'],
    fr:['Lire la description complète','Réduire la description'],
    es:['Leer descripción completa','Mostrar menos'],
    ru:['Читать описание полностью','Свернуть описание'],
    zh:['展开完整介绍','收起介绍'],
    ar:['اقرأ الوصف الكامل','إظهار أقل'],
    lij:['Lezzi tutta a descriçion','Fanni vedde meno']
  };
  function lang(){
    var s='it';try{s=localStorage.getItem('lang')||document.documentElement.lang||'it';}catch(e){}
    return titles[s] ? s : (titles[s.split('-')[0]] ? s.split('-')[0] : 'it');
  }
  function updatePopup(root){
    try{
      var map=window.map||window.MAP||window.leafletMap;
      if(map&&map._popup&&typeof map._popup.update==='function'&&map._popup.getElement&&map._popup.getElement()&&map._popup.getElement().contains(root))map._popup.update();
    }catch(e){}
  }
  function setup(node){
    if(!node||!node.isConnected||node.closest('.gm-desc-preview')||!node.closest('.leaflet-popup')||!node.textContent||!node.textContent.trim())return;
    var wrap=document.createElement('div');
    wrap.className='gm-desc-preview';
    var direction=node.closest('[dir]');
    if(direction)wrap.dir=direction.getAttribute('dir');
    node.parentNode.insertBefore(wrap,node);
    wrap.appendChild(node);
    node.classList.add('gm-desc-text');
    var b=document.createElement('button');
    b.type='button';b.className='gm-desc-toggle';b.textContent='⌄';
    wrap.appendChild(b);
    var expanded=false;
    var hasOverflow=false;
    function measure(){
      if(!wrap.isConnected)return;
      /* Misura il contenuto SENZA clamp, ma non cambia lo stato espanso. */
      wrap.classList.remove('is-collapsed','is-expanded');
      node.style.removeProperty('max-height');
      node.style.removeProperty('overflow');
      var cs=getComputedStyle(node);
      var height=parseFloat(cs.lineHeight);
      if(!(height>0))height=parseFloat(cs.fontSize)*1.5;
      wrap.style.setProperty('--gm-desc-line-height',height+'px');
      hasOverflow=node.getBoundingClientRect().height>height*5+2;
      if(!hasOverflow)expanded=false;
      render();
    }
    function render(){
      if(!wrap.isConnected)return;
      wrap.classList.toggle('has-overflow',hasOverflow);
      wrap.classList.toggle('is-collapsed',hasOverflow&&!expanded);
      wrap.classList.toggle('is-expanded',hasOverflow&&expanded);
      b.hidden=!hasOverflow;
      b.textContent=expanded?'⌃':'⌄';
      b.setAttribute('aria-expanded',String(hasOverflow&&expanded));
      var t=titles[lang()]||titles.it;
      b.setAttribute('aria-label',t[expanded?1:0]);
      b.title=t[expanded?1:0];
    }
    b.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      if(!hasOverflow)return;
      expanded=!expanded;
      render();
      updatePopup(wrap);
    });
    wrap._gmRefresh=measure;
    measure();
  }
  function scan(){
    queued=false;
    document.querySelectorAll('.leaflet-popup '+selector).forEach(setup);
  }
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(scan);}
  var observer=new MutationObserver(function(mutations){
    for(var i=0;i<mutations.length;i++){
      var m=mutations[i];if(m.type!=='childList'||!m.addedNodes.length)continue;
      for(var j=0;j<m.addedNodes.length;j++){
        var e=m.addedNodes[j];
        if(e.nodeType!==1)continue;
        if(e.matches&&(e.matches('.leaflet-popup')||e.matches(selector)||e.querySelector('.leaflet-popup,'+selector))){schedule();return;}
      }
    }
  });
  function start(){observer.observe(document.body,{subtree:true,childList:true});schedule();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
  else start();
  window.addEventListener('resize',function(){
    document.querySelectorAll('.gm-desc-preview').forEach(function(el){if(el._gmRefresh)el._gmRefresh();});
  },{passive:true});
  document.addEventListener('app:set-lang',schedule);
})();
