/* Sincronizzazione account Genova mApp: Taccuino, Preferiti e preferenze mappa. */
(function(){
  'use strict';
  if(window.__GENOVA_ACCOUNT_SYNC__)return;
  window.__GENOVA_ACCOUNT_SYNC__=true;

  var ENDPOINT='/.netlify/functions/user-data';
  var BOUND_KEY='genova_sync_account_v1';
  var DIRTY_KEY='genova_sync_dirty_v1';
  var SUB_CACHE_KEY='genova_subscription_cache_v1';
  var FIXED_KEYS=[
    'genova_favstars_v1','genova_taccuino_routes_v1','genova_taccuino_draft_v1',
    'genova_taccuino_notes_v1','genova_taccuino_last_note_v1',
    'genova_taccuino_favorites_sort_v1','walls_visible','acq_visibility',
    'legend_blue','legend_orange'
  ];
  var state={user:null,record:null,busy:false,status:'idle',lastHash:'',saveTimer:null,pullTimer:null};

  var TEXT={
    it:{idle:'Dati dell’account pronti',syncing:'Sincronizzazione…',saved:'Dati sincronizzati',offline:'Offline: dati conservati sul dispositivo',error:'Sincronizzazione non disponibile',button:'Sincronizza ora'},
    en:{idle:'Account data ready',syncing:'Syncing…',saved:'Data synced',offline:'Offline: data kept on this device',error:'Sync unavailable',button:'Sync now'},
    es:{idle:'Datos de la cuenta preparados',syncing:'Sincronizando…',saved:'Datos sincronizados',offline:'Sin conexión: datos guardados en el dispositivo',error:'Sincronización no disponible',button:'Sincronizar ahora'},
    fr:{idle:'Données du compte prêtes',syncing:'Synchronisation…',saved:'Données synchronisées',offline:'Hors ligne : données conservées sur l’appareil',error:'Synchronisation indisponible',button:'Synchroniser'},
    ar:{idle:'بيانات الحساب جاهزة',syncing:'جارٍ المزامنة…',saved:'تمت مزامنة البيانات',offline:'دون اتصال: البيانات محفوظة على الجهاز',error:'المزامنة غير متاحة',button:'مزامنة الآن'},
    ru:{idle:'Данные аккаунта готовы',syncing:'Синхронизация…',saved:'Данные синхронизированы',offline:'Офлайн: данные сохранены на устройстве',error:'Синхронизация недоступна',button:'Синхронизировать'},
    zh:{idle:'账户数据已就绪',syncing:'正在同步…',saved:'数据已同步',offline:'离线：数据保存在此设备上',error:'同步不可用',button:'立即同步'},
    lij:{idle:'Dæti de l’account pronti',syncing:'Sincronizaçion…',saved:'Dæti sincronizæ',offline:'Feua linia: dæti sarvæ in sciô dispositivo',error:'Sincronizaçion no disponibile',button:'Sincronizza òua'}
  };

  function lang(){try{return String(localStorage.getItem('lang')||document.documentElement.lang||'it').toLowerCase().split(/[-_]/)[0];}catch(_e){return'it';}}
  function text(){return TEXT[lang()]||TEXT.it;}
  function tracked(key){return FIXED_KEYS.indexOf(key)!==-1||/^doc_(?:item|lang)_/.test(key);}
  function allTrackedKeys(){var out=FIXED_KEYS.slice();try{for(var i=0;i<localStorage.length;i++){var key=localStorage.key(i);if(key&&tracked(key)&&out.indexOf(key)===-1)out.push(key);}}catch(_e){}return out;}
  function snapshot(){var values={};allTrackedKeys().forEach(function(key){try{var value=localStorage.getItem(key);if(value!==null)values[key]=value;}catch(_e){}});return{version:1,updatedAt:Number(localStorage.getItem(DIRTY_KEY))||Date.now(),values:values};}
  function hash(data){try{return JSON.stringify((data&&data.values)||{});}catch(_e){return'';}}
  function meaningful(data){
    var v=(data&&data.values)||{};
    try{if(Object.keys(JSON.parse(v.genova_favstars_v1||'{}')).length)return true;}catch(_e){}
    var listKeys=['genova_taccuino_routes_v1','genova_taccuino_notes_v1'];
    for(var i=0;i<listKeys.length;i++)try{if(JSON.parse(v[listKeys[i]]||'[]').length)return true;}catch(_e){}
    return false;
  }
  function mergeJSONObjects(a,b){try{return JSON.stringify(Object.assign({},JSON.parse(a||'{}'),JSON.parse(b||'{}')));}catch(_e){return b||a;}}
  function mergeLists(a,b){
    var one=[],two=[];try{one=JSON.parse(a||'[]');}catch(_e){}try{two=JSON.parse(b||'[]');}catch(_e){}
    if(!Array.isArray(one))one=[];if(!Array.isArray(two))two=[];
    var byId={};one.concat(two).forEach(function(item,index){if(!item||typeof item!=='object')return;var id=String(item.id||'item_'+index);var old=byId[id];if(!old||Number(item.updatedAt||item.createdAt||0)>=Number(old.updatedAt||old.createdAt||0))byId[id]=item;});
    return JSON.stringify(Object.keys(byId).map(function(id){return byId[id];}));
  }
  function mergeSnapshots(local,remote){
    var newer=Number(local.updatedAt)>=Number(remote.updatedAt)?local:remote;
    var values=Object.assign({},remote.values||{},local.values||{});
    values.genova_favstars_v1=mergeJSONObjects(remote.values&&remote.values.genova_favstars_v1,local.values&&local.values.genova_favstars_v1);
    values.genova_taccuino_routes_v1=mergeLists(remote.values&&remote.values.genova_taccuino_routes_v1,local.values&&local.values.genova_taccuino_routes_v1);
    values.genova_taccuino_notes_v1=mergeLists(remote.values&&remote.values.genova_taccuino_notes_v1,local.values&&local.values.genova_taccuino_notes_v1);
    return{version:1,updatedAt:Number(newer.updatedAt)||Date.now(),values:values};
  }
  function applySnapshot(data){
    if(!data||!data.values)return false;
    var before=hash(snapshot());
    allTrackedKeys().forEach(function(key){try{if(!Object.prototype.hasOwnProperty.call(data.values,key))localStorage.removeItem(key);}catch(_e){}});
    Object.keys(data.values).forEach(function(key){if(tracked(key))try{localStorage.setItem(key,String(data.values[key]));}catch(_e){}});
    state.lastHash=hash(snapshot());
    document.dispatchEvent(new CustomEvent('genova:data-synced',{detail:{values:data.values}}));
    return before!==state.lastHash;
  }
  function reloadOnce(data){
    var marker='genova_sync_reload_'+simpleHash(hash(data));
    try{if(sessionStorage.getItem(marker))return;sessionStorage.setItem(marker,'1');}catch(_e){return;}
    window.setTimeout(function(){window.location.reload();},180);
  }
  function simpleHash(value){var h=0;for(var i=0;i<value.length;i++)h=((h<<5)-h+value.charCodeAt(i))|0;return String(h);}

  async function token(){if(!window.GenovaAuth)return null;try{return await window.GenovaAuth.token();}catch(_e){return null;}}
  async function api(method,body){
    var jwt=await token();if(!jwt)throw new Error('not_authenticated');
    var response=await fetch(ENDPOINT,{method:method,headers:{authorization:'Bearer '+jwt,'content-type':'application/json','cache-control':'no-store'},body:body?JSON.stringify(body):undefined});
    var result={};try{result=await response.json();}catch(_e){}
    if(!response.ok)throw new Error(result.error||('http_'+response.status));
    return result;
  }
  function setStatus(value){state.status=value;renderSyncPanel();document.dispatchEvent(new CustomEvent('genova:sync-status',{detail:{status:value}}));}
  function syncPanel(){
    var profile=document.getElementById('auth-account-profile');if(!profile)return null;
    var panel=document.getElementById('auth-sync-panel');
    if(!panel){panel=document.createElement('div');panel.id='auth-sync-panel';panel.className='auth-sync-panel';panel.innerHTML='<span id="auth-sync-status" aria-live="polite"></span><button id="auth-sync-now" type="button"></button>';profile.appendChild(panel);panel.querySelector('button').addEventListener('click',function(){loadAccount(true);});}
    return panel;
  }
  function renderSyncPanel(){var panel=syncPanel();if(!panel)return;var t=text();var label=t[state.status]||t.idle;panel.querySelector('span').textContent=label;panel.querySelector('button').textContent=t.button;panel.querySelector('button').disabled=state.busy||!navigator.onLine;}

  function cacheSubscription(subscription){
    var sub=subscription||{status:'inactive',simulated:true,checkedAt:Date.now()};
    try{localStorage.setItem(SUB_CACHE_KEY,JSON.stringify(sub));}catch(_e){}
    var active=sub.status==='active'&&Date.now()-Number(sub.checkedAt||0)<=24*60*60*1000;
    try{localStorage.setItem('genovaqr_sub',active?'1':'0');}catch(_e){}
    window.isSubscribed=active;
    document.dispatchEvent(new CustomEvent('genova:subscription-changed',{detail:{subscription:sub,active:active}}));
  }
  function cachedSubscription(){try{return JSON.parse(localStorage.getItem(SUB_CACHE_KEY)||'null');}catch(_e){return null;}}

  async function saveData(data){
    if(!state.user||state.busy||!navigator.onLine)return;
    state.busy=true;setStatus('syncing');
    try{
      var result=await api('POST',{action:'saveData',data:data||snapshot()});
      state.record=result.record||state.record;state.lastHash=hash((state.record&&state.record.data)||snapshot());
      localStorage.setItem(DIRTY_KEY,'0');setStatus('saved');
      if(state.record&&state.record.subscription)cacheSubscription(state.record.subscription);
    }catch(_e){setStatus(navigator.onLine?'error':'offline');}
    finally{state.busy=false;renderSyncPanel();}
  }

  async function loadAccount(manual){
    if(!state.user||state.busy)return;
    if(!navigator.onLine){setStatus('offline');cacheSubscription(cachedSubscription());return;}
    state.busy=true;setStatus('syncing');
    try{
      var result=await api('GET');var record=result.record||null;var local=snapshot();var remote=record&&record.data;
      var bound='';try{bound=localStorage.getItem(BOUND_KEY)||'';}catch(_e){}
      var dirty=Number(localStorage.getItem(DIRTY_KEY)||0)>0;var chosen=local;var mustSave=false;
      if(!remote){
        if(bound&&bound!==state.user.id){chosen={version:1,updatedAt:Date.now(),values:{}};applySnapshot(chosen);}
        mustSave=true;
      }else if(bound&&bound!==state.user.id){
        chosen=remote;if(applySnapshot(chosen))reloadOnce(chosen);
      }else if(!bound&&meaningful(local)&&meaningful(remote)){
        chosen=mergeSnapshots(local,remote);if(applySnapshot(chosen))reloadOnce(chosen);mustSave=hash(chosen)!==hash(remote);
      }else if(!bound&&meaningful(local)){
        chosen=local;mustSave=true;
      }else if(dirty){
        chosen=Number(remote.updatedAt||0)>Number(local.updatedAt||0)?mergeSnapshots(local,remote):local;
        if(chosen!==local&&applySnapshot(chosen))reloadOnce(chosen);mustSave=hash(chosen)!==hash(remote);
      }else{
        chosen=remote;if(applySnapshot(chosen))reloadOnce(chosen);
      }
      localStorage.setItem(BOUND_KEY,state.user.id);state.record=record;state.lastHash=hash(chosen);localStorage.setItem(DIRTY_KEY,'0');
      if(record&&record.subscription)cacheSubscription(record.subscription);else cacheSubscription(null);
      setStatus('saved');
      state.busy=false;renderSyncPanel();
      if(mustSave)await saveData(chosen);
    }catch(_e){state.busy=false;setStatus(navigator.onLine?'error':'offline');cacheSubscription(cachedSubscription());renderSyncPanel();}
  }

  async function subscriptionAction(action,plan){
    if(!state.user)throw new Error('not_authenticated');
    if(!navigator.onLine)throw new Error('offline');
    var result=await api('POST',{action:action,plan:plan});state.record=result.record||state.record;
    cacheSubscription(state.record&&state.record.subscription);return state.record.subscription;
  }
  function setUser(user){
    var changed=(!state.user&&user)||(state.user&&(!user||state.user.id!==user.id));state.user=user||null;
    if(!state.user){setStatus('idle');cacheSubscription(null);return;}
    if(changed)loadAccount(false);
  }
  function watchLocal(){
    var nowHash=hash(snapshot());
    if(!state.lastHash){state.lastHash=nowHash;return;}
    if(nowHash===state.lastHash)return;
    state.lastHash=nowHash;try{localStorage.setItem(DIRTY_KEY,String(Date.now()));}catch(_e){}
    if(state.user&&navigator.onLine){clearTimeout(state.saveTimer);state.saveTimer=setTimeout(function(){saveData(snapshot());},1400);}
  }
  function boot(){
    state.lastHash=hash(snapshot());renderSyncPanel();cacheSubscription(cachedSubscription());
    document.addEventListener('genova:auth-changed',function(event){setUser(event.detail&&event.detail.user);});
    document.addEventListener('app:set-lang',renderSyncPanel);
    window.addEventListener('online',function(){if(state.user)loadAccount(false);});
    window.addEventListener('offline',function(){setStatus('offline');cacheSubscription(cachedSubscription());});
    setInterval(watchLocal,1800);
    state.pullTimer=setInterval(function(){if(state.user&&navigator.onLine&&!Number(localStorage.getItem(DIRTY_KEY)||0))loadAccount(false);},60000);
    var tries=0;(function waitAuth(){if(window.GenovaAuth){setUser(window.GenovaAuth.getUser());return;}if(++tries<50)setTimeout(waitAuth,120);})();
  }

  window.GenovaAccount={
    getState:function(){return{user:state.user,record:state.record,subscription:(state.record&&state.record.subscription)||cachedSubscription(),active:!!window.isSubscribed,status:state.status};},
    syncNow:function(){return loadAccount(true);},
    activateSubscription:function(plan){return subscriptionAction('activateSubscription',plan==='yearly'?'yearly':'monthly');},
    cancelSubscription:function(){return subscriptionAction('cancelSubscription');}
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
