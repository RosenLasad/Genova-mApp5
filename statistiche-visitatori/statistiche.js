(function(){
'use strict';
if(window.GMStatisticheVisitatori)return;
var overlay=null, currentPeriod='month', currentPage=1, requestNo=0, timer=null;
var cache=null, subscribers=null, device=null, showExcluded=false, tab='browsers', mutating=false, opener=null, loading=0;
function el(s){return overlay&&overlay.querySelector(s);}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function fmt(n){return (Number(n)||0).toLocaleString('it-IT');}
function date(n){return n?new Date(n).toLocaleString('it-IT',{timeZone:'Europe/Rome',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}):'—';}
function isAdmin(){return window.GenovaVisitorsAdmin&&window.GenovaVisitorsAdmin.isAdmin();}
function localId(){try{return window.GenovaVisitorBrowser?window.GenovaVisitorBrowser.getId():(localStorage.getItem('gm_visitor_id_v1')||'');}catch(_e){return '';}}
function notice(message){if(el('#gmvs-notice'))el('#gmvs-notice').textContent=message||'';}
function close(){
  if(!overlay)return;
  requestNo++;loading=0;clearInterval(timer);timer=null;overlay.remove();overlay=null;
  document.removeEventListener('keydown',onKey);document.removeEventListener('visibilitychange',onVisible);document.removeEventListener('genova:auth-changed',onAuth);
  cache=null;subscribers=null;device=null;mutating=false;
  if(opener&&opener.isConnected)opener.focus();
}
function onAuth(){if(overlay)close();}
function onVisible(){if(!document.hidden&&!mutating&&!loading)fetchData(true);}
function onKey(ev){
  if(ev.key==='Escape'){ev.preventDefault();ev.stopPropagation();close();return;}
  if(ev.key!=='Tab'||!overlay)return;
  var items=Array.from(overlay.querySelectorAll('button:not(:disabled),input,select,[tabindex="0"]')).filter(x=>x.getClientRects().length);
  if(!items.length)return;
  if(ev.shiftKey&&(document.activeElement===items[0]||document.activeElement===el('#gmvs-panel'))){ev.preventDefault();items[items.length-1].focus();}
  else if(!ev.shiftKey&&document.activeElement===items[items.length-1]){ev.preventDefault();items[0].focus();}
}
async function api(path,body){
  var token=await window.GenovaAuth.token();
  var response=await fetch('/.netlify/functions/'+path,{method:body?'POST':'GET',headers:Object.assign({authorization:'Bearer '+token},body?{'content-type':'application/json'}:{}),body:body?JSON.stringify(body):undefined,cache:'no-store'});
  var data=await response.json();
  if(!response.ok)throw new Error(data.error||'Errore di caricamento');
  return data;
}
function messageFor(error){
  var messages={analytics_limit_reached:'Lo storico supera il limite di lettura del pannello.',subscribers_limit_reached:'L’elenco supera il limite di lettura del pannello.',unauthorized:'Sessione scaduta. Accedi nuovamente.',forbidden:'Accesso riservato all’amministratore.'};
  return messages[error.message]||'Collegamento non riuscito. Riprova con Aggiorna.';
}
async function fetchData(silent,onlyVisitors){
  if(!isAdmin()){close();return;}
  if(!overlay||mutating)return;
  onlyVisitors=onlyVisitors&&subscribers!==null;
  var id=++requestNo, browserId=localId();loading=id;
  var path='visitors-admin?period='+encodeURIComponent(currentPeriod)+'&page='+currentPage+'&showExcluded='+(showExcluded?'1':'0');
  if(!silent)notice('Aggiornamento in corso…');
  var jobs=[api(path)];
  if(!onlyVisitors){
    jobs.push(api('subscribers-admin'));
    jobs.push(browserId?api('visitor-device',{action:'inspect',visitorId:browserId}):Promise.resolve(null));
  }
  var results=await Promise.allSettled(jobs);
  if(id!==requestNo||!overlay)return;
  loading=0;
  if(!isAdmin()){close();return;}
  var errors=[];
  if(!onlyVisitors){
    if(results[1].status==='fulfilled'){subscribers=results[1].value;renderSubscribers();}
    else{errors.push('Iscritti: '+messageFor(results[1].reason));if(!subscribers)el('#gmvs-subs-list').textContent='Elenco non disponibile.';}
    if(results[2].status==='fulfilled')device=results[2].value;
    else errors.push('Riconoscimento browser: '+messageFor(results[2].reason));
  }
  renderDevice();
  if(results[0].status==='fulfilled'){
    cache=results[0].value;currentPage=cache.page;renderStats();renderBrowsers();
    if(window.GenovaVisitorsAdmin&&window.GenovaVisitorsAdmin.acceptStats)window.GenovaVisitorsAdmin.acceptStats(cache);
  }else{
    errors.push('Visite: '+messageFor(results[0].reason));
    if(!cache)el('#gmvs-browser-list').textContent='Statistiche non disponibili.';
  }
  notice(errors.length?errors.join(' ')+' I dati eventualmente già visibili restano quelli dell’ultimo aggiornamento riuscito.':'');
}
function chartLabel(label){
  var parts=label.split('-');
  if(parts.length===3)return parts[2]+'/'+parts[1];
  var months=['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'];
  return (months[Number(parts[1])-1]||parts[1])+' '+parts[0];
}
function keepScroll(node,html){var top=node.scrollTop,left=node.scrollLeft;node.innerHTML=html;node.scrollTop=top;node.scrollLeft=left;}
function renderStats(){
  var data=cache;
  el('#gmvs-cards').innerHTML=[['Unici nel periodo',data.periodUnique],['Nuovi',data.newCount],['Già presenti',data.returningCount],['Totali storici',data.total]].map(x=>'<div><small>'+x[0]+'</small><strong>'+fmt(x[1])+'</strong></div>').join('');
  el('#gmvs-stats-note').textContent='Conteggi di browser, non di persone. Nuovi: prima rilevazione nel periodo. Già presenti: prima rilevazione precedente. Oggi: '+fmt(data.todayCount)+'. Browser esclusi: '+fmt(data.excludedCount)+'.';
  var max=Math.max(1,...data.chart.map(x=>x.count));
  keepScroll(el('#gmvs-chart'),data.chart.length?data.chart.map(x=>'<div class="gmvs-bar-item" aria-label="'+esc(x.label)+': '+fmt(x.count)+' browser" title="'+esc(x.label)+': '+fmt(x.count)+' browser"><strong class="gmvs-bar-value">'+fmt(x.count)+'</strong><span class="gmvs-bar'+(x.count?'':' is-zero')+'" style="height:'+(x.count?Math.max(4,Math.round(x.count/max*96)):0)+'px"></span><span class="gmvs-bar-label">'+esc(chartLabel(x.label))+'</span></div>').join(''):'<p class="gmvs-help">Nessun accesso rilevato.</p>');
  el('#gmvs-updated').textContent='Visite aggiornate: '+date(data.generatedAt)+' · Europe/Rome';
}
function renderDevice(){
  var node=el('#gmvs-device');
  if(!node)return;
  if(!device){node.innerHTML='<div><strong>Riconosci questo browser</strong><p class="gmvs-help">Confronta il codice di questo browser con l’elenco. Ripeti l’operazione su ogni dispositivo o browser che usi.</p></div><button type="button" data-gmvs-recognize>Riconosci</button>';return;}
  node.innerHTML='<div><strong>Questo browser · <code>'+esc(device.id)+'</code></strong><p class="gmvs-help">'+(device.excluded?'Escluso dai conteggi anche senza login.':device.found?'Rilevato nello storico; evidenziato nell’elenco quando presente nel periodo.':'Nessuna presenza nello storico per questo codice.')+' Gli accessi riconosciuti come admin sono sempre esclusi.</p></div><button type="button" data-gmvs-device-action="'+(device.excluded?'include':'exclude')+'">'+(device.excluded?'Riammetti questo browser':'Escludi questo browser')+'</button>';
}
function renderBrowsers(){
  if(!cache)return;
  var data=cache;
  keepScroll(el('#gmvs-browser-list'),data.visitors.length?data.visitors.map(v=>{
    var own=device&&device.hash===v.hash;
    return '<article class="gmvs-person'+(own?' is-own':'')+(v.excluded?' is-excluded':'')+'"><div class="gmvs-person-head"><code>'+esc(v.id)+'</code><div class="gmvs-badges">'+(own?'<span class="gmvs-badge is-own">Questo browser</span>':'')+(v.excluded?'<span class="gmvs-badge is-excluded">Escluso</span>':'')+'<span class="gmvs-badge">'+(v.newInPeriod?'Nuovo nel periodo':'Già presente')+'</span>'+(v.totalDays>1?'<span class="gmvs-badge">Rilevato in più giorni</span>':'')+'</div></div><div class="gmvs-person-body"><div>Prima rilevazione: '+date(v.firstSeenAt)+'<br>Ultima rilevazione: '+date(v.lastSeenAt)+'</div><div><strong>'+fmt(v.periodDays)+'</strong> giorni nel periodo · <strong>'+fmt(v.totalDays)+'</strong> totali</div><button type="button" data-gmvs-row-action="'+(v.excluded?'include':'exclude')+'" data-gmvs-hash="'+esc(v.hash)+'" aria-label="'+(v.excluded?'Riammetti':'Escludi')+' browser '+esc(v.id)+'">'+(v.excluded?'Riammetti':'Escludi')+'</button></div></article>';
  }).join(''):'<p class="gmvs-empty">Nessun browser nel periodo'+(showExcluded?'':' tra quelli inclusi nei conteggi')+'.</p>');
  el('#gmvs-browser-count').textContent=fmt(data.listTotal)+' browser nell’elenco';
  var pages=Math.max(1,Math.ceil(data.listTotal/data.pageSize));
  el('#gmvs-pages').innerHTML='<button type="button" data-gmvs-page="-1" '+(data.page<=1?'disabled':'')+'>Precedenti</button><span>Pagina '+data.page+' di '+pages+'</span><button type="button" data-gmvs-page="1" '+(data.page>=pages?'disabled':'')+'>Successivi</button>';
}
function statusLabel(user){return {free:'Gratuito',premium:'Premium',expired:'Premium scaduto',admin:'Admin'}[user.status]||'Gratuito';}
function renderSubscribers(){
  if(!subscribers)return;
  var q=el('#gmvs-search').value.trim().toLowerCase(),filter=el('#gmvs-sub-filter').value;
  var users=subscribers.users.filter(u=>(filter==='all'||u.status===filter)&&(!q||String(u.email).toLowerCase().includes(q)));
  var stats=subscribers.stats;
  el('#gmvs-subs-summary').textContent=fmt(stats.total)+' profili · '+fmt(stats.free)+' gratuiti · '+fmt(stats.premium)+' Premium · '+fmt(stats.expired)+' scaduti · '+fmt(stats.admin)+' admin';
  el('#gmvs-subs-count').textContent=fmt(users.length)+' risultati';
  keepScroll(el('#gmvs-subs-list'),users.length?users.map(u=>'<article class="gmvs-person"><div class="gmvs-person-head"><strong class="gmvs-email">'+esc(u.email)+'</strong><span class="gmvs-badge '+(u.status==='premium'?'is-premium':'')+'">'+statusLabel(u)+'</span></div><div class="gmvs-person-body"><span>Profilo creato: '+date(u.createdAt)+'</span>'+(u.status==='premium'||u.status==='expired'?'<span>'+esc(u.source==='coupon'?'Coupon':u.source==='stripe'?'Stripe':'Abbonamento')+(u.currentPeriodEnd?' · Scadenza: '+date(u.currentPeriodEnd):'')+'</span>':'')+'</div></article>').join(''):'<p class="gmvs-empty">Nessun profilo corrispondente.</p>');
  el('#gmvs-subs-updated').textContent='Iscritti aggiornati: '+date(subscribers.generatedAt);
}
async function mutate(action,hash){
  if(mutating||!overlay)return;
  if(!isAdmin()){close();return;}
  mutating=true;requestNo++;loading=0;notice('Salvataggio in corso…');
  var session=overlay;
  overlay.querySelectorAll('[data-gmvs-row-action],[data-gmvs-device-action]').forEach(b=>b.disabled=true);
  try{
    var result=await api('visitor-device',hash?{action:action,hash:hash}:{action:action,visitorId:localId()});
    if(overlay!==session)return;
    if(device&&device.hash===result.hash)device=result;
    if(window.GenovaVisitorBrowser&&device&&device.hash===result.hash)window.GenovaVisitorBrowser.refresh();
    mutating=false;
    await fetchData(true);
  }catch(err){if(overlay===session)notice('Modifica non riuscita. '+messageFor(err));}
  finally{if(overlay===session){mutating=false;overlay.querySelectorAll('[data-gmvs-row-action],[data-gmvs-device-action]').forEach(b=>b.disabled=false);}}
}
async function recognize(){
  var session=overlay,id=localId();
  if(!id){notice('Il browser non rende disponibile il codice locale. Verifica che il salvataggio dei dati del sito sia consentito.');return;}
  try{var result=await api('visitor-device',{action:'inspect',visitorId:id});if(overlay!==session)return;device=result;renderDevice();renderBrowsers();notice('');}
  catch(err){if(overlay===session)notice(messageFor(err));}
}
function selectPeriod(){overlay.querySelectorAll('[data-gmvs-period]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gmvsPeriod===currentPeriod)));}
function selectTab(){
  overlay.querySelectorAll('[data-gmvs-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gmvsTab===tab)));
  el('#gmvs-browsers').hidden=tab!=='browsers';el('#gmvs-subs').hidden=tab!=='subscribers';
}
function open(){
  if(!isAdmin()||overlay)return;
  opener=document.activeElement;currentPage=1;cache=null;subscribers=null;device=null;
  overlay=document.createElement('div');overlay.id='gmvs-overlay';
  overlay.innerHTML='<section id="gmvs-panel" role="dialog" aria-modal="true" aria-labelledby="gmvs-title" tabindex="-1"><header><div><h2 id="gmvs-title">Statistiche Visitatori</h2><p class="gmvs-help">Aggiornamento automatico ogni minuto mentre il pannello è visibile.</p></div><button type="button" data-gmvs-close aria-label="Chiudi">×</button></header><nav aria-label="Periodo delle visite"><button type="button" data-gmvs-period="week">7 giorni</button><button type="button" data-gmvs-period="month">Mese</button><button type="button" data-gmvs-period="year">Anno</button><button type="button" data-gmvs-period="all">Dall’inizio</button></nav><div id="gmvs-cards" class="gmvs-cards"></div><p id="gmvs-stats-note" class="gmvs-help"></p><h3>Andamento delle visite</h3><p class="gmvs-help">Browser distinti per giorno; per mese scegliendo Anno o Dall’inizio. La somma delle colonne può superare gli unici del periodo. I browser esclusi non sono conteggiati.</p><div id="gmvs-chart" class="gmvs-chart" role="group" aria-label="Browser distinti per giorno o mese"></div><div id="gmvs-device" class="gmvs-device"></div><nav class="gmvs-tabs" aria-label="Elenchi"><button type="button" data-gmvs-tab="browsers" aria-controls="gmvs-browsers">Browser visitatori</button><button type="button" data-gmvs-tab="subscribers" aria-controls="gmvs-subs">Iscritti e abbonati</button></nav><section id="gmvs-browsers"><div class="gmvs-list-tools"><strong id="gmvs-browser-count">Caricamento…</strong><label><input id="gmvs-show-excluded" type="checkbox"> Mostra anche gli esclusi</label></div><p class="gmvs-help">Comprende browser anonimi e usati con un account. Una sola presenza al giorno: non è il numero di aperture e l’ultima rilevazione non indica necessariamente l’ultima visita. Le esclusioni ricalcolano anche lo storico, senza cancellarlo; puoi riammettere ogni browser.</p><div id="gmvs-browser-list" class="gmvs-list"></div><div id="gmvs-pages" class="gmvs-pages"></div></section><section id="gmvs-subs" hidden><p id="gmvs-subs-summary" class="gmvs-help"></p><p class="gmvs-help">Profili salvati dall’app, indipendenti dal periodo delle visite. La data è la creazione del profilo nell’app, non necessariamente quella di registrazione dell’account. I totali dei profili e dei browser non coincidono.</p><div class="gmvs-filters"><input id="gmvs-search" type="search" placeholder="Cerca email" aria-label="Cerca iscritti per email"><select id="gmvs-sub-filter" aria-label="Filtra iscritti per stato"><option value="all">Tutti</option><option value="free">Gratuiti</option><option value="premium">Premium</option><option value="expired">Premium scaduti</option><option value="admin">Admin</option></select><span id="gmvs-subs-count"></span></div><div id="gmvs-subs-list" class="gmvs-list">Caricamento…</div><p id="gmvs-subs-updated" class="gmvs-help"></p></section><p id="gmvs-notice" class="gmvs-notice" role="status" aria-live="polite"></p><footer><span id="gmvs-updated" class="gmvs-help"></span><button type="button" data-gmvs-reload>Aggiorna</button></footer></section>';
  document.body.appendChild(overlay);
  el('#gmvs-show-excluded').checked=showExcluded;
  overlay.addEventListener('click',function(ev){
    if(ev.target===overlay||ev.target.closest('[data-gmvs-close]')){close();return;}
    if(mutating)return;
    var period=ev.target.closest('[data-gmvs-period]');
    if(period){currentPeriod=period.dataset.gmvsPeriod;currentPage=1;selectPeriod();fetchData(false,true);return;}
    var t=ev.target.closest('[data-gmvs-tab]');if(t){tab=t.dataset.gmvsTab;selectTab();return;}
    var pg=ev.target.closest('[data-gmvs-page]');if(pg){currentPage=Math.max(1,currentPage+Number(pg.dataset.gmvsPage));fetchData(false,true);return;}
    var row=ev.target.closest('[data-gmvs-row-action]');if(row){mutate(row.dataset.gmvsRowAction,row.dataset.gmvsHash);return;}
    var own=ev.target.closest('[data-gmvs-device-action]');if(own){mutate(own.dataset.gmvsDeviceAction);return;}
    if(ev.target.closest('[data-gmvs-recognize]'))recognize();
    if(ev.target.closest('[data-gmvs-reload]'))fetchData(false);
  });
  el('#gmvs-show-excluded').addEventListener('change',function(){showExcluded=this.checked;currentPage=1;fetchData(false,true);});
  el('#gmvs-search').addEventListener('input',renderSubscribers);
  el('#gmvs-sub-filter').addEventListener('change',renderSubscribers);
  document.addEventListener('keydown',onKey);document.addEventListener('visibilitychange',onVisible);
  document.addEventListener('genova:auth-changed',onAuth);
  selectPeriod();selectTab();el('#gmvs-panel').focus();fetchData(false);
  timer=setInterval(function(){if(overlay&&!document.hidden&&!mutating&&!loading)fetchData(true);},60000);
}
window.GMStatisticheVisitatori={open:open,close:close};
})();
