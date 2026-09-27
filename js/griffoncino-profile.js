/* Genova mApp - Grifoncino: profilo di sessione e raccomandazioni v0.4 */
(function(){
  'use strict';
  var KEY='gm_griff_profile_v1';
  var DEFAULT={scores:{},recentRoutes:[],lastChoice:null};
  function cloneDefault(){return {scores:{},recentRoutes:[],lastChoice:null};}
  function load(){
    try{
      var raw=sessionStorage.getItem(KEY); if(!raw)return cloneDefault();
      var p=JSON.parse(raw)||{}; return {scores:p.scores||{},recentRoutes:Array.isArray(p.recentRoutes)?p.recentRoutes:[],lastChoice:p.lastChoice||null};
    }catch(_e){return cloneDefault();}
  }
  var state=load();
  function save(){try{sessionStorage.setItem(KEY,JSON.stringify(state));}catch(_e){}}
  function remember(data){
    if(!data)return;
    if(typeof data==='string')data={tag:data,weight:1};
    var tags=data.tags||data.tag||[]; if(!Array.isArray(tags))tags=[tags];
    var weight=Number(data.weight||1); if(!isFinite(weight))weight=1;
    tags.filter(Boolean).forEach(function(tag){tag=String(tag);state.scores[tag]=(Number(state.scores[tag])||0)+weight;});
    if(data.choice)state.lastChoice=String(data.choice);
    save();
  }
  function score(tag){return Number(state.scores[String(tag)]||0);}
  var ROUTES={
    'cs-giornata-marinaio':{tags:['sea','history','culture']},
    'cs-strada-doge':{tags:['history','palaces','city']},
    'dm-strada-cavaliere':{tags:['history','forts','city']},
    'dm-strada-balilla':{tags:['history','city','culture']},
    'fm-percorso-poeti':{tags:['literature','culture','city']},
    'fm-strada-borghese':{tags:['palaces','city','culture']}
  };
  function recommendRoute(theme){
    theme=String(theme||'auto');
    var ids=Object.keys(ROUTES);
    var available=ids.filter(function(id){return !!document.querySelector('#routes-menu .doc-row[data-route-id="'+id+'"]');});
    if(available.length)ids=available;
    var recent=state.recentRoutes||[];
    var best=null,bestScore=-1e9;
    ids.forEach(function(id,idx){
      var tags=ROUTES[id].tags||[]; var s=0;
      tags.forEach(function(tag){s+=score(tag)*2;});
      if(theme!=='auto' && tags.indexOf(theme)>=0)s+=12;
      if(theme==='history' && tags.indexOf('history')>=0)s+=10;
      if(theme==='sea' && tags.indexOf('sea')>=0)s+=10;
      if(theme==='literature' && tags.indexOf('literature')>=0)s+=10;
      if(theme==='city' && tags.indexOf('city')>=0)s+=8;
      if(recent.indexOf(id)>=0)s-=6;
      s+=(ids.length-idx)*0.01;
      if(s>bestScore){bestScore=s;best=id;}
    });
    return best||ids[0]||null;
  }
  function markRoute(id){
    if(!id)return; var arr=(state.recentRoutes||[]).filter(function(x){return x!==id;}); arr.unshift(id); state.recentRoutes=arr.slice(0,3); save();
  }
  function snapshot(){return JSON.parse(JSON.stringify(state));}
  function reset(){state=cloneDefault();save();}
  window.GMGriffoncinoProfile={remember:remember,score:score,recommendRoute:recommendRoute,markRoute:markRoute,snapshot:snapshot,reset:reset};
})();
