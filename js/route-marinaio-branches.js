/* Giornata del marinaio: tappe selezionate e raccordi indicativi P/F/S.
   Le linee sono collegamenti grafici, NON indicazioni pedonali. */
(function(){
 'use strict';
 var ID='cs-giornata-marinaio';
 var points=[{"name":"Casa di Colombo","level":"F","category":"Musei","lat":44.405546310448685,"lng":8.935051386743934,"distance":36,"progress":0},{"name":"Porta Soprana","level":"P","category":"Mura (barbarossa)","lat":44.405544671546004,"lng":8.93456399360579,"distance":3,"progress":6},{"name":"Giardini Baltimora","level":"P","category":"Parchi/Piazze","lat":44.40384738359577,"lng":8.934371365786234,"distance":133,"progress":118},{"name":"Sant'Agostino","level":"F","category":"Chiese","lat":44.404782515199315,"lng":8.931928255372414,"distance":56,"progress":241},{"name":"Museo di Sant'Agostino","level":"P","category":"Musei","lat":44.40445007718676,"lng":8.93200021513432,"distance":22,"progress":254},{"name":"Torre di Sarzano","level":"P","category":"Mura (barbarossa)","lat":44.40368980736345,"lng":8.932818255208634,"distance":37,"progress":303},{"name":"SS. Madre di Dio","level":"P","category":"Chiese","lat":44.403170791628014,"lng":8.932761834548469,"distance":87,"progress":303},{"name":"Basilica di Santa Maria Assunta","level":"F","category":"Chiese","lat":44.402089811688356,"lng":8.934811694258869,"distance":275,"progress":303},{"name":"Portello di Sarzano","level":"P","category":"Mura (barbarossa)","lat":44.40395055601178,"lng":8.93185850154224,"distance":0,"progress":363},{"name":"Sarzano/Sant'Agostino","level":"P","category":"Trasporti","lat":44.40417,"lng":8.93167,"distance":23,"progress":371},{"name":"Porta al Castrum","level":"P","category":"Mura (romane)","lat":44.40407814,"lng":8.93053293,"distance":23,"progress":499},{"name":"Rocca di Sarzano - Castello","level":"P","category":"Mura (barbarossa)","lat":44.40422716213137,"lng":8.930863684152776,"distance":28,"progress":499},{"name":"Porta del Castrum","level":"P","category":"Mura (carolinge)","lat":44.40415263668324,"lng":8.930322729452136,"distance":29,"progress":570},{"name":"San Donato","level":"F","category":"Chiese","lat":44.40576838841076,"lng":8.931474725040777,"distance":147,"progress":847},{"name":"Santa Maria in Passione","level":"P","category":"Chiese","lat":44.40526350011784,"lng":8.929903474104535,"distance":10,"progress":854},{"name":"Porta del Ferro","level":"F","category":"Mura (romane)","lat":44.4061439066575,"lng":8.931597018032045,"distance":175,"progress":864},{"name":"Santa Maria di Castello","level":"P","category":"Chiese","lat":44.40564363061682,"lng":8.92910520013833,"distance":22,"progress":921},{"name":"Santi Cosma e Damiano","level":"P","category":"Chiese","lat":44.40656932748366,"lng":8.928704285130175,"distance":5,"progress":1047},{"name":"Trattoria delle Grazie","level":"S","category":"Locali","lat":44.40666653397306,"lng":8.928458760031193,"distance":14,"progress":1079},{"name":"San Torpete","level":"F","category":"Chiese","lat":44.40716312249104,"lng":8.928968973426853,"distance":8,"progress":1133},{"name":"San Giorgio","level":"P","category":"Chiese","lat":44.40722420511697,"lng":8.929143936201479,"distance":13,"progress":1149},{"name":"Porta di San Pietro","level":"F","category":"Mura (carolinge)","lat":44.40870802388585,"lng":8.930046141864452,"distance":178,"progress":1149},{"name":"San Pietro in Banchi","level":"F","category":"Chiese","lat":44.40896052911481,"lng":8.929869194364812,"distance":198,"progress":1180},{"name":"San Giorgio","level":"S","category":"Trasporti","lat":44.40861,"lng":8.92861,"distance":127,"progress":1195},{"name":"Palazzo San Giorgio","level":"F","category":"Palazzi","lat":44.409098611143605,"lng":8.928831489647433,"distance":183,"progress":1195},{"name":"San Marco al Molo","level":"P","category":"Chiese","lat":44.407254175103326,"lng":8.92644779560332,"distance":13,"progress":1421},{"name":"Porta San Marco","level":"P","category":"Mura (porto)","lat":44.40758286782437,"lng":8.926245915414432,"distance":0,"progress":1459},{"name":"Mandraccio","level":"P","category":"Acquedotti","lat":44.409356,"lng":8.92743,"distance":217,"progress":1465},{"name":"Porta Siberia","level":"P","category":"Mura (rinascimento)","lat":44.40799579836992,"lng":8.925017026473009,"distance":0,"progress":1603},{"name":"Torre dei Greci","level":"P","category":"Mura (porto)","lat":44.408085409752616,"lng":8.924392109439044,"distance":24,"progress":1674}];
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
 // I vecchi punti "preferiti del percorso" vengono disattivati per questo itinerario:
 // la visualizzazione ufficiale è affidata alle nuove icone/ramificazioni P-F-S.
 try{ window.ROUTE_FAVS = window.ROUTE_FAVS || {}; window.ROUTE_FAVS[ID] = []; }catch(_){}
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
 // Dedicated route overlay: independent of the two existing route renderers.
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
   if(pt.distance>12){
    L.polyline([join,[pt.lat,pt.lng]],{
     color:style.color,weight:style.weight,opacity:0.86,dashArray:style.dashArray,
     interactive:false,className:'gm-marinaio-branch gm-marinaio-'+pt.level.toLowerCase()
    }).addTo(overlay);
   }
   // Small itinerary marker linked to the original point, not a new information popup.
   var icon=L.divIcon({
    className:'gm-marinaio-stage',
    html:'<span class="gm-marinaio-tag gm-marinaio-tag-'+pt.level.toLowerCase()+'" style="--gm-marinaio-color:'+style.color+'"></span>',
    iconSize:[22,22],iconAnchor:[11,11]
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
 function openPoint(pt){
  var map=window.map||window.__map||window.__LEAFLET_MAP__;
  if(!map||!pt)return false;
  var token=++activeOpenRequest;
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
 window.GMMarinaio={points:points,styles:styles,openPoint:openPoint};

})();
