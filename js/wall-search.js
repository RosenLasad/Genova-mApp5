/* Genova mApp: adapter ricerca punti delle Mura. Non modifica Historic. */
(function(){
 'use strict';
 if(window.GMWallSearch) return;
 var LABELS = {'mura-romane':'Mura Pre-Romane','mura-carolinge':'Mura Carolinge','mura-barbarossa':'Mura del Barbarossa','mura-porto':'Mura del Molo','mura-repubblica':'Mura della Repubblica','mura-rinascimento':'Mura del Rinascimento','mura-nuove':'Mura Nuove'};
 function data(){try{return typeof WALL_NODES !== 'undefined' ? WALL_NODES : window.WALL_NODES || {}; }catch(_){return window.WALL_NODES || {};}}
 function entries(){
  var nodes=data(), result=[];
  Object.keys(LABELS).forEach(function(key){
   (nodes[key]||[]).forEach(function(n){
    var xy=n.coords||[], lat=Number(xy[0]), lng=Number(xy[1]);
    if(!Number.isFinite(lat)||!Number.isFinite(lng)) return;
    result.push({kind:'wall-node',id:key+'/'+(n.id||n.name||result.length),wallKey:key,category:'Mura',title:String(n.name||n.id||'Punto delle Mura'),subtitle:LABELS[key],lat:lat,lng:lng,type:n.type||'',node:n});
   });
  });
  return result;
 }
 function matchingMarker(map,item){
  var best=null, distance=Infinity;
  if(!map||!map.eachLayer) return null;
  map.eachLayer(function(layer){
   if(!layer || !layer.eachLayer) return;
   layer.eachLayer(function(marker){
    if(!marker || !marker.getLatLng || !marker.getPopup || !marker.getPopup()) return;
    var pos=marker.getLatLng(), d=Math.abs(pos.lat-item.lat)+Math.abs(pos.lng-item.lng);
    if(d < 0.000001 && d < distance){best=marker;distance=d;}
   });
  });
  return best;
 }
 function open(item){
  if(!item||!item.wallKey) return false;
  var chk=document.getElementById('chk-wall-'+item.wallKey.replace(/^mura-/,''));
  if(chk && !chk.checked){
   chk.checked=true;
   chk.dispatchEvent(new Event('change',{bubbles:true}));
  }
  // Historic ricrea i marker quando cambia la visibilita: cercarli DOPO il cambio.
  var map=window.map||window.__map||window.__LEAFLET_MAP__;
  if(!map) return false;
  try{map.setView([item.lat,item.lng],Math.max(map.getZoom(),17),{animate:false});}catch(_){}
  var attempts=0;
  function reveal(){
   var marker=matchingMarker(map,item);
   if(marker){
    try{if(marker.openPopup) marker.openPopup();else if(marker.fire) marker.fire('click');}catch(_){}
   } else if(++attempts < 12){ setTimeout(reveal,120); }
  }
  setTimeout(reveal,80);
  return true;
 }
 window.GMWallSearch={entries:entries,open:open,labels:LABELS};
})();
