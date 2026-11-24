/* Dimensione dei soli comandi mappa: preferenza locale, reversibile e indipendente dai testi. */
(function(){
  'use strict';
  if(window.GenovaMapControlsSize)return;
  var KEY='genova_map_controls_size_v1',SCALES={current:1,compact:.88,'very-compact':.76};
  var current=read(),queued=false,booted=false,saved=new Map(),observer=null;
  var COPY={
    it:['Dimensione comandi della mappa','Grande','Normale','Piccola'],
    en:['Map control size','Large','Normal','Small'],
    es:['Tamaño de los controles del mapa','Grande','Normal','Pequeña'],
    fr:['Taille des commandes de la carte','Grande','Normale','Petite'],
    ar:['حجم أزرار الخريطة','كبير','عادي','صغير'],
    ru:['Размер кнопок карты','Большой','Обычный','Маленький'],
    zh:['地图控件大小','大','标准','小'],
    lij:['Dimenscion di comandi da mappa','Grande','Normale','Piccin']
  };
  function read(){try{var x=localStorage.getItem(KEY);return Object.prototype.hasOwnProperty.call(SCALES,x)?x:'compact';}catch(_e){return 'compact';}}
  function lang(){var x=document.documentElement.lang||'it';try{x=localStorage.getItem('lang')||x;}catch(_e){}return String(x).toLowerCase().split(/[-_]/)[0];}
  function render(){
    var text=COPY[lang()]||COPY.it;
    var label=document.getElementById('settings-map-controls-label');
    if(label)label.textContent=text[0];
    document.querySelectorAll('[data-map-control-size]').forEach(function(button){
      var size=button.getAttribute('data-map-control-size');
      button.textContent=text[['current','compact','very-compact'].indexOf(size)+1];
      button.setAttribute('aria-pressed',String(size===current));
      button.setAttribute('aria-label',text[0]+': '+button.textContent);
    });
  }
  function style(node,prop,value){
    if(!node)return;
    var map=saved.get(node);if(!map){map={};saved.set(node,map);}
    if(!Object.prototype.hasOwnProperty.call(map,prop))map[prop]={value:node.style.getPropertyValue(prop),priority:node.style.getPropertyPriority(prop)};
    if(node.style.getPropertyValue(prop)!==value||node.style.getPropertyPriority(prop)!=='important')node.style.setProperty(prop,value,'important');
  }
  function restore(){
    saved.forEach(function(props,node){Object.keys(props).forEach(function(key){var before=props[key];if(before.value)node.style.setProperty(key,before.value,before.priority);else node.style.removeProperty(key);});});
    saved.clear();var rail=document.getElementById('quick-toggles');if(rail)rail.classList.remove('gm-control-rail-scroll');
  }
  function visible(node){if(!node||node.hidden||!node.getClientRects().length)return false;var cs=getComputedStyle(node);return cs.display!=='none'&&cs.visibility!=='hidden';}
  function viewport(){var v=window.visualViewport;return {left:v?v.offsetLeft:0,top:v?v.offsetTop:0,width:v?v.width:window.innerWidth,height:v?v.height:window.innerHeight};}
  function fitRail(v,mapTop){
    var rail=document.getElementById('quick-toggles');if(!rail)return;
    var edge=v.top+v.height-8;
    ['ui-zoom-anchor','gm-3d-toggle','ui-map-controls'].forEach(function(id){var el=document.getElementById(id);if(visible(el))edge=Math.min(edge,el.getBoundingClientRect().top-8);});
    var minimum=mapTop+7,room=Math.max(32,edge-minimum);
    // Centre the whole column in the visible map, then avoid the bottom controls.
    var total=rail.scrollHeight||rail.getBoundingClientRect().height;
    var desired=mapTop+(v.top+v.height-mapTop-total)/2;
    var top=Math.max(minimum,Math.min(desired,edge-total));
    var available=Math.max(32,edge-top);
    style(rail,'--gm-rail-top',Math.round(top)+'px');style(rail,'--gm-rail-room',Math.floor(available)+'px');
    var scroll=total>available+1;
    if(rail.classList.contains('gm-control-rail-scroll')!==scroll)rail.classList.toggle('gm-control-rail-scroll',scroll);
  }
  function mapTopFor(v){
    var map=document.getElementById('map'),header=document.querySelector('#app > header');
    var top=Math.max(v.top+6,map?map.getBoundingClientRect().top:v.top,header?header.getBoundingClientRect().bottom:v.top);
    return Math.ceil(Math.min(top,v.top+Math.max(6,v.height-80)));
  }
  function fitPanel(panel,anchor,v,mapTop){
    if(!panel||!visible(panel))return;
    var rail=document.getElementById('quick-toggles');
    if(!anchor&&!rail)return;
    var r=(anchor||rail).getBoundingClientRect();
    var leftEdge=v.left+6,rightEdge=Math.max(leftEdge+32,r.left-7);
    var width=Math.max(32,Math.min(rightEdge-leftEdge,v.width-12));
    var bottom=v.top+v.height-8;
    // Keep the top beside its button. On low screens reserve a usable scrollable area.
    var minimumHeight=Math.min(140,Math.max(32,bottom-mapTop));
    var top=Math.ceil(Math.max(mapTop,Math.min(r.top,bottom-minimumHeight)));
    var maxHeight=Math.max(32,Math.floor(bottom-top));
    // Explicit inline geometry also wins over category-specific legacy CSS.
    style(panel,'position','fixed');style(panel,'transform','none');
    style(panel,'top','var(--gm-flyout-top,0px)');style(panel,'left','var(--gm-flyout-left,0px)');
    style(panel,'right','auto');style(panel,'bottom','auto');
    style(panel,'--gm-flyout-room',Math.floor(width)+'px');
    style(panel,'--gm-flyout-height',maxHeight+'px');
    // Measure the real origin: transformed/scrolling ancestors may contain fixed elements.
    // Dedicated variables cannot be overwritten by the old dock-relative offsets.
    style(panel,'--gm-flyout-left','0px');style(panel,'--gm-flyout-top','0px');
    var origin=panel.getBoundingClientRect();
    var left=Math.max(leftEdge,Math.min(rightEdge-origin.width,v.left+v.width-origin.width-6));
    style(panel,'--gm-flyout-left',(left-origin.left)+'px');
    style(panel,'--gm-flyout-top',(top-origin.top)+'px');
  }
  function positionPanel(panel,anchor){
    if(!booted||!panel)return;
    var v=viewport(),top=mapTopFor(v);
    if(current!=='current')fitRail(v,top);
    fitPanel(panel,anchor,v,top);
  }
  function fitQrMenu(v,mapTop){
    var panel=document.getElementById('qr-menu');if(!visible(panel))return;
    var width=Math.min(v.width-12,Math.max(160,280*SCALES[current]));
    style(panel,'--gm-qr-menu-width',Math.floor(width)+'px');style(panel,'--gm-qr-menu-height',Math.floor(Math.max(60,v.top+v.height-mapTop-10))+'px');
    // Keep native anchoring when it fits; only clamp overflow, leaving contents untouched.
    var r=panel.getBoundingClientRect();
    if(r.left<v.left+6||r.right>v.left+v.width-6){style(panel,'position','fixed');style(panel,'left',Math.round(Math.max(v.left+6,Math.min(r.left,v.left+v.width-r.width-6)))+'px');style(panel,'right','auto');style(panel,'transform','none');}
    if(r.top<mapTop||r.bottom>v.top+v.height-6){style(panel,'position','fixed');style(panel,'top',Math.round(Math.max(mapTop,Math.min(r.top,v.top+v.height-r.height-6)))+'px');style(panel,'bottom','auto');style(panel,'transform','none');}
  }
  function fit(){
    queued=false;
    var v=viewport(),mapTop=mapTopFor(v);
    if(current!=='current')fitRail(v,mapTop);
    var rail=document.getElementById('quick-toggles');
    if(rail)rail.querySelectorAll('.qt-cat-panel').forEach(function(panel){
      var anchor=rail.querySelector('[aria-controls="'+panel.id+'"]')||document.getElementById(panel.id+'-btn');
      fitPanel(panel,anchor,v,mapTop);
    });
    if(current!=='current')fitQrMenu(v,mapTop);
    if(window.repositionMenuUp)window.repositionMenuUp();
    saved.forEach(function(_props,node){if(!node.isConnected)saved.delete(node);});
  }
  function schedule(){if(!booted||queued)return;queued=true;window.requestAnimationFrame(fit);}
  function setSize(size,save){
    if(!Object.prototype.hasOwnProperty.call(SCALES,size))size='compact';
    restore();current=size;document.documentElement.setAttribute('data-map-controls-size',size);
    if(save!==false)try{localStorage.setItem(KEY,size);}catch(_e){}
    render();
    if(booted){
      // Reuse the existing geometry update paths; never change map zoom or map contents.
      document.dispatchEvent(new CustomEvent('genova:map-controls-size-changed',{detail:{size:size,scale:SCALES[size]}}));
      window.dispatchEvent(new Event('resize'));schedule();
    }
  }
  function boot(){
    booted=true;render();
    document.addEventListener('click',function(event){
      var button=event.target.closest&&event.target.closest('[data-map-control-size]');
      if(button){event.preventDefault();setSize(button.getAttribute('data-map-control-size'),true);}
      else schedule();
    },true);
    document.addEventListener('app:set-lang',render);window.addEventListener('i18n:changed',render);
    document.addEventListener('genova:text-size-changed',schedule);
    window.addEventListener('resize',schedule,{passive:true});
    window.addEventListener('orientationchange',schedule,{passive:true});
    document.addEventListener('scroll',function(e){if(e.target&&e.target.closest&&e.target.closest('#quick-toggles'))schedule();},true);
    window.addEventListener('genova:preferences-reset',function(){setSize('compact',false);});
    window.addEventListener('storage',function(e){if(e.key===KEY||e.key===null)setSize(read(),false);});
    if(window.visualViewport){window.visualViewport.addEventListener('resize',schedule);window.visualViewport.addEventListener('scroll',schedule);}
    observer=new MutationObserver(function(records){
      if(records.some(function(r){return r.type==='childList'||(r.target&&r.target.closest&&r.target.closest('#quick-toggles,#qr-menu,#flag-menu'));}))schedule();
    });
    observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','class']});
    setSize(current,false);
  }
  document.documentElement.setAttribute('data-map-controls-size',current);
  document.documentElement.setAttribute('data-map-flyouts','anchored');
  window.GenovaMapControlsSize={positionPanel:positionPanel,get:function(){return current;},set:function(size){setSize(size,true);}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
