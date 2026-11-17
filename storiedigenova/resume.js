/* Local bookmarks only: never used as an entitlement or a playback credential. */
(function(root,factory){
 if(typeof module==='object'&&module.exports)module.exports=factory();
 else root.StorieResume=factory();
})(typeof window!=='undefined'?window:this,function(){
 'use strict';
 var PREFIX='gm-storie-progress-v1:';
 function validKey(key){return typeof key==='string'&&/^[a-f0-9]{64}$/.test(key);}
 function validRecord(value){
  return value&&value.v===1&&typeof value.position==='number'&&Number.isFinite(value.position)&&
   typeof value.duration==='number'&&Number.isFinite(value.duration)&&value.duration>0&&value.duration<=86400&&
   value.position>=0&&value.position<=value.duration&&typeof value.completed==='boolean';
 }
 function resumable(value){return validRecord(value)&&!value.completed&&value.position>=10&&value.position<value.duration-5;}
 function format(seconds){
  var n=Math.max(0,Math.floor(seconds)),h=Math.floor(n/3600),m=Math.floor(n%3600/60),s=String(n%60).padStart(2,'0');
  return h?h+':'+String(m).padStart(2,'0')+':'+s:m+':'+s;
 }
 function create(options){
  options=options||{};var storage=options.storage,now=options.now||Date.now,memory=Object.create(null),persistent=!!storage;
  function read(key){
   if(!validKey(key))return null;
   var record=memory[key];
   try{var raw=persistent&&storage&&storage.getItem(PREFIX+key);if(raw)record=JSON.parse(raw);}catch(_){persistent=false;}
   return resumable(record)?record:null;
  }
  function write(key,position,duration,ended){
   if(!validKey(key)||typeof position!=='number'||!Number.isFinite(position)||typeof duration!=='number'||!Number.isFinite(duration)||duration<=0||duration>86400)return false;
   var value={v:1,position:ended?0:Math.min(duration,Math.max(0,position)),duration:duration,completed:!!ended,updatedAt:now()};
   memory[key]=value;
   try{if(storage)storage.setItem(PREFIX+key,JSON.stringify(value));else persistent=false;}catch(_){persistent=false;}
   return true;
  }
  function attach(options){
   var player=options.player,key=options.key,start=options.startTime||0,active=true,armed=start<10,lastWrite=0;
   var listeners={};
   function persist(force,ended){
    if(!active)return;
    var position=Number(player.currentTime),duration=Number(player.duration);
    if(!Number.isFinite(position)||!Number.isFinite(duration)||duration<=0)return;
    // Stream can initially report zero while it seeks to startTime. Do not
    // overwrite the saved bookmark before that initial seek has completed.
    if(!armed){if(position<start-3)return;armed=true;}
    if(!force&&now()-lastWrite<5000){return;}
    if(write(key,position,duration,ended)){lastWrite=now();if(options.onSave)options.onSave({persistent:persistent,position:ended?0:position,ended:!!ended});}
   }
   function listen(event,fn){listeners[event]=fn;player.addEventListener(event,fn);}
   listen('timeupdate',function(){persist(false,false);});
   listen('pause',function(){persist(true,false);});
   listen('seeked',function(){persist(true,false);});
   listen('ended',function(){armed=true;persist(true,true);});
   return {
    flush:function(){persist(true,!!player.ended);},
    detach:function(){if(!active)return;persist(true,!!player.ended);active=false;Object.keys(listeners).forEach(function(event){try{player.removeEventListener(event,listeners[event]);}catch(_){}});},
   };
  }
  return{read:read,write:write,attach:attach,isPersistent:function(){return persistent;}};
 }
 return{create:create,format:format,resumable:resumable};
});
