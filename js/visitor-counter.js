/* Genova mApp - conteggio anonimo dei visitatori unici. */
(function(){
  'use strict';
  if(window.__GENOVA_VISITOR_COUNTER__)return;
  window.__GENOVA_VISITOR_COUNTER__=true;

  var ID_KEY='gm_visitor_id_v1';
  var LAST_DAY_KEY='gm_visitor_last_day_v1';

  function romeDay(){
    try{
      var parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
      var out={};parts.forEach(function(part){if(part.type!=='literal')out[part.type]=part.value;});
      if(out.year&&out.month&&out.day)return out.year+'-'+out.month+'-'+out.day;
    }catch(_e){}
    return new Date().toISOString().slice(0,10);
  }

  function newId(){
    try{if(window.crypto&&typeof window.crypto.randomUUID==='function')return window.crypto.randomUUID();}catch(_e){}
    try{
      if(window.crypto&&typeof window.crypto.getRandomValues==='function'){
        var bytes=new Uint8Array(16);window.crypto.getRandomValues(bytes);
        return Array.prototype.map.call(bytes,function(value){return value.toString(16).padStart(2,'0');}).join('');
      }
    }catch(_e){}
    return '';
  }

  function visitorId(){
    try{
      var id=localStorage.getItem(ID_KEY);
      if(id)return id;
      id=newId();
      if(!id)return '';
      localStorage.setItem(ID_KEY,id);
      return localStorage.getItem(ID_KEY)||'';
    }catch(_e){return '';}
  }

  async function ping(){
    var id=visitorId();
    if(!id)return;
    var today=romeDay();
    try{if(localStorage.getItem(LAST_DAY_KEY)===today)return;}catch(_e){}
    try{
      var response=await fetch('/.netlify/functions/visitor-hit',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({visitorId:id}),
        cache:'no-store',
        keepalive:true
      });
      if(!response.ok)return;
      var result={};try{result=await response.json();}catch(_e){}
      try{localStorage.setItem(LAST_DAY_KEY,String(result.day||today));}catch(_e){}
    }catch(_e){/* Il conteggio non deve mai interferire con l'uso dell'app. */}
  }

  function boot(){window.setTimeout(ping,350);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
