/* Genova mApp - riepilogo Visitatori per l'amministratore. Testi volutamente solo in italiano. */
(function(){
  'use strict';
  if(window.__GENOVA_VISITORS_ADMIN__)return;
  window.__GENOVA_VISITORS_ADMIN__=true;

  var CACHE_KEY='gm_admin_visitors_cache_v1';
  var TTL=60*60*1000;
  var row=null,busy=false;

  function isAdmin(){try{var s=window.GenovaAccount&&window.GenovaAccount.getState();return !!(s&&((s.record&&s.record.isAdmin===true)||(s.subscription&&s.subscription.adminOverride===true)));}catch(_e){return false;}}
  async function token(){if(!window.GenovaAuth||typeof window.GenovaAuth.token!=='function')throw new Error('not_authenticated');return window.GenovaAuth.token();}
  function number(value){try{return new Intl.NumberFormat('it-IT').format(Number(value)||0);}catch(_e){return String(Number(value)||0);}}
  function dateTime(value){try{var d=new Date(value);var time=d.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});var date=d.toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit',year:'numeric'});return time+' del '+date;}catch(_e){return '—';}}
  function romeDay(){try{var parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());var out={};parts.forEach(function(part){if(part.type!=='literal')out[part.type]=part.value;});return out.year+'-'+out.month+'-'+out.day;}catch(_e){return new Date().toISOString().slice(0,10);}}

  function readCache(){
    try{
      var value=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');
      if(!value||!Number.isFinite(Number(value.fetchedAt)))return null;
      return value;
    }catch(_e){return null;}
  }
  function writeCache(value){try{localStorage.setItem(CACHE_KEY,JSON.stringify(value));}catch(_e){}}

  function ensureRow(){
    if(!row)return;
    if(row.__visitorsBuilt)return;
    row.__visitorsBuilt=true;
    row.textContent='';
    var icon=document.createElement('span');icon.className='settings-v2-icon';icon.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
    var copy=document.createElement('span');copy.className='visitors-admin-copy';
    var label=document.createElement('span');label.className='visitors-admin-label';label.textContent='Visitatori';
    var stats=document.createElement('span');stats.className='visitors-admin-stats';stats.textContent='Caricamento…';
    var updated=document.createElement('span');updated.className='visitors-admin-updated';updated.textContent='';
    copy.appendChild(label);copy.appendChild(stats);copy.appendChild(updated);row.appendChild(icon);row.appendChild(copy);
    row.__visitorStats=stats;row.__visitorUpdated=updated;
    row.setAttribute('aria-label','Visitatori. Tocca per aggiornare i dati.');
  }

  function showData(value){
    ensureRow();if(!row)return;
    row.__visitorStats.textContent=number(value.total)+' totali · '+number(value.today)+' oggi';
    row.__visitorUpdated.textContent='Aggiornato alle '+dateTime(value.generatedAt||value.fetchedAt);
    row.classList.remove('is-loading','is-error');
  }
  function showLoading(){ensureRow();if(!row)return;row.__visitorStats.textContent='Aggiornamento…';row.__visitorUpdated.textContent='';row.classList.add('is-loading');row.classList.remove('is-error');}
  function showError(){ensureRow();if(!row)return;row.__visitorStats.textContent='Dati non disponibili';row.__visitorUpdated.textContent='Tocca per riprovare';row.classList.remove('is-loading');row.classList.add('is-error');}

  async function api(){
    var jwt=await token();
    var response=await fetch('/.netlify/functions/visitors-admin',{method:'GET',headers:{authorization:'Bearer '+jwt,'cache-control':'no-store'},cache:'no-store'});
    var result={};try{result=await response.json();}catch(_e){}
    if(!response.ok)throw new Error(result.error||('http_'+response.status));
    return result;
  }

  async function refresh(force){
    if(!row||!isAdmin()||busy)return;
    var cached=readCache();
    if(cached)showData(cached);
    if(!force&&cached&&cached.day===romeDay()&&(Date.now()-Number(cached.fetchedAt)<TTL))return;
    if(!cached)showLoading();
    busy=true;
    try{
      var result=await api();
      var value={total:Number(result.total)||0,today:Number(result.today)||0,day:String(result.day||''),generatedAt:Number(result.generatedAt)||Date.now(),fetchedAt:Date.now()};
      writeCache(value);showData(value);
    }catch(_e){if(!cached)showError();}
    finally{busy=false;}
  }

  function attach(element){row=element||row;ensureRow();var cached=readCache();if(cached)showData(cached);}

  window.GenovaVisitorsAdmin={attach:attach,refresh:refresh,isAdmin:isAdmin};
})();
