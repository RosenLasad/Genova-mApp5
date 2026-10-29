/* Giornata del marinaio: tappe selezionate e raccordi indicativi P/F/S.
   Le linee sono collegamenti grafici, NON indicazioni pedonali. */
(function(){
 'use strict';
 var routeDefinitions=window.GMRoutePoints||{};
 function setup(ID,definition){
 var points=definition&&Array.isArray(definition.points)?definition.points:[];
 if(!points.length)return;
 function normalizeHex(hex){
  var raw=String(hex||'').trim();
  if(!raw) return '#1414b8';
  if(raw[0]!=='#') raw='#'+raw;
  if(/^#[0-9a-fA-F]{3}$/.test(raw)) raw='#'+raw[1]+raw[1]+raw[2]+raw[2]+raw[3]+raw[3];
  return /^#[0-9a-fA-F]{6}$/.test(raw)?raw:'#1414b8';
 }
 function hexToRgb(hex){
  var n=parseInt(normalizeHex(hex).slice(1),16);
  return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};
 }
 function rgbToHex(r,g,b){
  return '#'+[r,g,b].map(function(v){
   var x=Math.max(0,Math.min(255,Math.round(v))).toString(16);
   return x.length===1?'0'+x:x;
  }).join('');
 }
 function mixHex(a,b,t){
  var ca=hexToRgb(a),cb=hexToRgb(b);
  return rgbToHex(ca.r+(cb.r-ca.r)*t,ca.g+(cb.g-ca.g)*t,ca.b+(cb.b-ca.b)*t);
 }
 function deriveStyles(){
  var route=window.__ROUTE_DATA&&window.__ROUTE_DATA[ID];
  var base=normalizeHex(route&&route.color||'#1414b8');
  return {
   P:{color:base,weight:3.8,dashArray:null},
   F:{color:mixHex(base,'#8a63f6',0.55),weight:3.0,dashArray:'10 7'},
   S:{color:mixHex(base,'#58d0ff',0.72),weight:3.0,dashArray:'2 8'}
  };
 }
 var styles=deriveStyles();

 function closest(coords,pt){
  var ref=Math.cos(pt.lat*Math.PI/180), k=111320;
  var x=pt.lng*k*ref,y=pt.lat*k,best=null,min=Infinity;
  for(var i=1;i<coords.length;i++){
   var a=coords[i-1],b=coords[i];
   var ax=a[1]*k*ref,ay=a[0]*k,bx=b[1]*k*ref,by=b[0]*k;
   var dx=bx-ax,dy=by-ay,len=dx*dx+dy*dy;
   var t=len?Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/len)):0;
   var cx=ax+t*dx,cy=ay+t*dy,d=(x-cx)*(x-cx)+(y-cy)*(y-cy);
   if(d<min){min=d;best=[cy/k,cx/k/ref];}
  }
  return best;
 }
 // Shared route overlay. Each itinerary gets its own data file and group.
 // Add a new route by registering its points in GMRoutePoints and reusing this renderer.

 var overlay=null;
 function active(){
  var row=document.querySelector('.doc-row[data-route-id="'+ID+'"] input.route-chk');
  return !!(row&&row.checked);
 }
 function draw(){
  if(overlay){try{overlay.remove();}catch(_){} overlay=null;}
  if(!active()||!window.L||!window.map) return;
  var route=window.__ROUTE_DATA&&window.__ROUTE_DATA[ID];
  if(!route||!Array.isArray(route.polyline)||route.polyline.length<2) return;
  overlay=L.layerGroup().addTo(window.map);
  points.forEach(function(pt){
   var join=closest(route.polyline,pt),style=styles[pt.level];
   if(!join||!style)return;
   // QR markers are associated media, not walking detours.
   // A per-point flag may override the default for any category.
   var hasBranch=(typeof pt.branch==='boolean')?pt.branch:(pt.category!=='QR');
   if(hasBranch && pt.distance>12){
    L.polyline([join,[pt.lat,pt.lng]],{
     color:style.color,weight:style.weight,opacity:0.86,dashArray:style.dashArray,
     interactive:false,className:'gm-route-branch gm-route-'+pt.level.toLowerCase()
    }).addTo(overlay);
   }
   // Small itinerary marker linked to the original point, not a new information popup.
   var isQR=pt.category==='QR';
   var icon=L.divIcon({
    className:'gm-route-stage',
    html:'<span class="gm-route-tag gm-route-tag-'+pt.level.toLowerCase()+(isQR?' gm-route-qr':'')+'" style="--gm-route-color:'+style.color+'">'+(isQR?'<img src="qr_azzurri/marker-azzurro-qr-notch-24.svg" alt="" draggable="false">':'')+'</span>',
    iconSize:[isQR?27:22,isQR?27:22],iconAnchor:[isQR?13.5:11,isQR?13.5:11]
   });
   var marker=L.marker([pt.lat,pt.lng],{icon:icon,zIndexOffset:1800,keyboard:true,title:pt.name});
   marker.on('click',function(){openPoint(pt);});
   marker.addTo(overlay);
  });
 }
 function syncSoon(){setTimeout(draw,0);}
 document.addEventListener('change',function(e){
  if(e.target&&e.target.matches('input.route-chk')&&e.target.closest('.doc-row[data-route-id="'+ID+'"]'))syncSoon();
 },false);
 window.addEventListener('load',syncSoon);
 document.addEventListener('DOMContentLoaded',syncSoon);
 // Route can also be toggled through a programmatic command.
 var syncTimer=setInterval(function(){
  var has=!!overlay,should=active();
  if(has!==should)draw();
 },600);
 // Open the ORIGINAL information popup, never create a duplicate popup on the P/F/S label.
 var activeOpenRequest=0;
 var CATEGORY_CONTROLS={
  'Musei':'.qt-museum','Parchi/Piazze':'.qt-parchi','Chiese':'.qt-chiese',
  'Locali':'.qt-locali','Trasporti':'.qt-metro','Palazzi':'.qt-palazzi'
 };
 var FAVORITE_LABELS={
  'Musei':'Museo','Parchi/Piazze':'Parco','Chiese':'Chiesa',
  'Locali':'Locale','Trasporti':'Metro','Palazzi':'Palazzo'
 };
 function nearlySame(a,b){return Math.abs(a-b)<0.000025;}
 function findOriginalMarker(map,pt){
  var found=null,best=Infinity,visited=[];
  function scan(layer){
   if(!layer||visited.indexOf(layer)>=0)return;
   visited.push(layer);
   if(layer.getLatLng&&layer.getPopup&&layer.getPopup()){
    var ll=layer.getLatLng();
    var d=Math.hypot((ll.lat-pt.lat)*111320,(ll.lng-pt.lng)*79400);
    if(d<best&&d<12){found=layer;best=d;}
   }
   if(layer.eachLayer)layer.eachLayer(scan);
  }
  map.eachLayer(scan);
  return found;
 }
 function revealOriginal(map,pt,token,remaining){
  if(token!==activeOpenRequest)return;
  var marker=findOriginalMarker(map,pt);
  if(marker){
   try{map.setView([pt.lat,pt.lng],Math.max(17,map.getZoom()),{animate:false});}catch(_){}
   try{marker.openPopup();}catch(_){}
  }else if(remaining>0){setTimeout(function(){revealOriginal(map,pt,token,remaining-1);},160);}
 }
 function turnOnCategory(selector){
  var btn=document.querySelector('#quick-toggles '+selector);
  if(btn&&btn.getAttribute('aria-pressed')!=='true'){
   try{btn.click();}catch(_){}
  }
 }
 function openQrPoint(pt,map){
  var sources=window.__QR_SOURCES||[];
  var src=null;
  for(var i=0;i<sources.length;i++){
   if(sources[i]&&sources[i].parent&&String(sources[i].parent.id)===String(pt.qrGroup)){
    src=sources[i];break;
   }
  }
  if(!src||typeof window.__qrOpenChildPanel!=='function')return false;
  try{map.setView([pt.lat,pt.lng],Math.max(17,map.getZoom()),{animate:true});}catch(_){}
  var kids=src.children||[];
  var child=null;
  for(var k=0;k<kids.length;k++){
   if(String(kids[k].id)===String(pt.qrPoint)){child=kids[k];break;}
  }
  // A QR group itself has a group popup; independent secondary QR points
  // keep their own media and description.
  if(pt.qrType==='parent'&&!child){
   window.__qrOpenChildPanel(src.parent.label,'Zooma per vedere i punti di '+src.parent.label+'.',{oggi:null,ieri:[]});
   return true;
  }
  if(!child)return false;
  window.__qrOpenChildPanel(child.label,child.descr||'',child.media||{oggi:null,ieri:[]},String(pt.qrGroup)+'/'+String(child.id));
  return true;
 }
 function openPoint(pt){
  var map=window.map||window.__map||window.__LEAFLET_MAP__;
  if(!map||!pt)return false;
  var token=++activeOpenRequest;
  if(pt.category==='QR')return openQrPoint(pt,map);
  // Mura: the existing search adapter activates the correct historical layer
  // and opens the marker's original popup. Match primarily by its coordinates.
  if(pt.category.indexOf('Mura')===0&&window.GMWallSearch){
   var subtype=pt.category.toLowerCase().replace('mura (','').replace(')','');
   var candidates=window.GMWallSearch.entries().filter(function(x){
    return x.wallKey==='mura-'+subtype && nearlySame(x.lat,pt.lat)&&nearlySame(x.lng,pt.lng);
   });
   var wall=candidates.find(function(x){return x.title===pt.name;})||candidates[0];
   if(wall)return window.GMWallSearch.open(wall);
  }
  try{map.setView([pt.lat,pt.lng],Math.max(map.getZoom(),17),{animate:false});}catch(_){}
  // An already-visible original marker is the simplest and safest case.
  var existing=findOriginalMarker(map,pt);
  if(existing){try{existing.openPopup();return true;}catch(_){}}
  // For normal categories re-use the existing route single-point opener.
  // It can build the hidden category, isolate the real marker and open its popup.
  var label=FAVORITE_LABELS[pt.category];
  if(label&&typeof window.__gmOpenSingleRoutePoint==='function'){
   var accepted=false;
   try{accepted=window.__gmOpenSingleRoutePoint(label,pt.name,ID)===true;}catch(_){}
   if(accepted)return true;
  }
  // If the original point cannot be resolved by name (or is an aqueduct),
  // activate its actual category and retry by coordinates once its data load.
  if(pt.category==='Acquedotti'){
   var chk=document.getElementById('chk-acq-romano');
   if(chk&&!chk.checked){chk.checked=true;chk.dispatchEvent(new Event('change',{bubbles:true}));}
   var acq=document.querySelector('#quick-toggles .qt-acq-all');
   if(acq&&acq.getAttribute('aria-pressed')!=='true'&&(!chk||!chk.checked))try{acq.click();}catch(_){}
  }else if(CATEGORY_CONTROLS[pt.category]){
   turnOnCategory(CATEGORY_CONTROLS[pt.category]);
  }
  revealOriginal(map,pt,token,25);
  return true;
 }
 window.GMRouteById[ID]={points:points,styles:styles,openPoint:openPoint};
 if(ID==='cs-giornata-marinaio')window.GMMarinaio=window.GMRouteById[ID];

 }
 window.GMRouteById=window.GMRouteById||{};
 Object.keys(routeDefinitions).forEach(function(routeId){ setup(routeId,routeDefinitions[routeId]); });
})();
