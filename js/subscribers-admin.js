/* Genova mApp - pannello amministratore Iscritti e abbonati. Testi volutamente solo in italiano. */
(function(){
  'use strict';
  if(window.__GENOVA_SUBSCRIBERS_ADMIN__)return;
  window.__GENOVA_SUBSCRIBERS_ADMIN__=true;

  var overlay=null,body=null,notice=null,lastFocused=null,detailBox=null,detailBody=null,currentTableBody=null;
  var data={users:[],stats:{total:0,free:0,premium:0,stripe:0,coupon:0,expired:0,admin:0}};
  var busy=false;

  function el(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
  function button(cls,text){var n=el('button',cls,text);n.type='button';return n;}
  function isAdmin(){try{var s=window.GenovaAccount&&window.GenovaAccount.getState();return !!(s&&((s.record&&s.record.isAdmin===true)||(s.subscription&&s.subscription.adminOverride===true)));}catch(_e){return false;}}
  async function token(){if(!window.GenovaAuth||typeof window.GenovaAuth.token!=='function')throw new Error('not_authenticated');return window.GenovaAuth.token();}
  async function api(){var jwt=await token();var response=await fetch('/.netlify/functions/subscribers-admin',{method:'GET',headers:{authorization:'Bearer '+jwt,'cache-control':'no-store'}});var result={};try{result=await response.json();}catch(_e){}if(!response.ok)throw new Error(result.error||('http_'+response.status));return result;}
  function fmtDate(value,withTime){if(!value)return '—';try{return new Date(value).toLocaleString('it-IT',withTime?{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}:{day:'2-digit',month:'2-digit',year:'numeric'});}catch(_e){return '—';}}
  function showNotice(message,error){if(!notice)return;notice.textContent=message||'';notice.hidden=!message;notice.classList.toggle('is-error',!!error);}
  function statusLabel(user){if(user.status==='premium')return 'Premium';if(user.status==='expired')return 'Scaduto';if(user.status==='admin')return 'Admin';return 'Gratuito';}
  function sourceLabel(user){if(user.source==='stripe')return 'Stripe';if(user.source==='coupon')return 'Coupon';if(user.source==='admin')return 'Amministratore';return '—';}
  function planLabel(user){if(user.source==='coupon'||user.plan==='coupon')return 'Coupon';if(user.plan==='monthly')return 'Mensile';if(user.plan==='yearly')return 'Annuale';if(user.plan==='admin')return 'Admin';return '—';}
  function statusClass(user){return user.status==='premium'?'is-premium':(user.status==='expired'?'is-expired':(user.status==='admin'?'is-admin':'is-free'));}
  function statCard(label,value){var card=el('div','subscribers-admin-stat');card.appendChild(el('strong','',String(value||0)));card.appendChild(el('span','',label));return card;}

  function create(){
    if(overlay)return;
    overlay=el('div','settings-page-overlay subscribers-admin-overlay');overlay.id='subscribers-admin-overlay';overlay.setAttribute('aria-hidden','true');
    var page=el('section','settings-page subscribers-admin-page');page.setAttribute('role','dialog');page.setAttribute('aria-modal','true');page.setAttribute('aria-labelledby','subscribers-admin-title');
    var head=el('div','settings-page-head');var back=button('settings-page-back','');back.setAttribute('aria-label','Torna alle Impostazioni');back.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';var title=el('h2','settings-page-title','Iscritti e abbonati');title.id='subscribers-admin-title';var close=button('settings-page-close','');close.setAttribute('aria-label','Chiudi');close.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';head.appendChild(back);head.appendChild(title);head.appendChild(close);
    body=el('div','subscribers-admin-content');page.appendChild(head);page.appendChild(body);overlay.appendChild(page);document.body.appendChild(overlay);
    back.addEventListener('click',function(){closePanel();document.dispatchEvent(new CustomEvent('genova:settings-reopen'));});close.addEventListener('click',closePanel);overlay.addEventListener('click',function(event){if(event.target===overlay)closePanel();});
  }

  function addDetailRow(list,label,value,cls){var dt=el('dt','',label),dd=el('dd',cls||'',value==null||value===''?'—':String(value));list.appendChild(dt);list.appendChild(dd);}
  function clearSelectedRow(){if(!currentTableBody)return;currentTableBody.querySelectorAll('tr.is-selected').forEach(function(row){row.classList.remove('is-selected');row.setAttribute('aria-expanded','false');});}
  function closeDetail(){
    clearSelectedRow();
    if(!detailBox)return;
    detailBox.hidden=true;
    detailBox.classList.remove('is-open');
    if(detailBody)detailBody.textContent='';
  }
  function openDetail(user,row){
    if(!detailBox||!detailBody)return;
    clearSelectedRow();
    if(row){row.classList.add('is-selected');row.setAttribute('aria-expanded','true');}
    detailBody.textContent='';
    var email=el('div','subscribers-admin-detail-email',user.email||'—');detailBody.appendChild(email);
    var list=el('dl','subscribers-admin-detail-list');
    addDetailRow(list,'Stato',statusLabel(user),'subscribers-admin-detail-status '+statusClass(user));
    addDetailRow(list,'Account creato',fmtDate(user.createdAt,true));
    addDetailRow(list,'Ultimo aggiornamento',fmtDate(user.updatedAt,true));
    addDetailRow(list,'Origine Premium',sourceLabel(user));
    addDetailRow(list,'Piano',planLabel(user));
    if(user.status==='premium'||user.status==='expired')addDetailRow(list,user.cancelAtPeriodEnd?'Accesso fino al':'Scadenza / rinnovo',fmtDate(user.currentPeriodEnd,true));
    if(user.source==='stripe'){
      addDetailRow(list,'Stato Stripe',user.stripeStatus||user.subscriptionStatus||'—');
      addDetailRow(list,'Rinnovo automatico',user.cancelAtPeriodEnd?'No':'Sì');
    }
    if(user.source==='coupon'||user.plan==='coupon'){
      addDetailRow(list,'Codice coupon',user.couponCode||'—','subscribers-admin-mono');
      addDetailRow(list,'Numero coupon',user.couponNumber?'#'+user.couponNumber:'—');
      addDetailRow(list,'Partner / Campagna',user.couponLabel||'—');
      addDetailRow(list,'Attivato',fmtDate(user.premiumStartedAt,true));
      addDetailRow(list,'Durata',user.durationDays?user.durationDays+' giorni':'—');
    }
    detailBody.appendChild(list);
    detailBox.hidden=false;
    requestAnimationFrame(function(){detailBox.classList.add('is-open');try{detailBox.scrollIntoView({behavior:'smooth',block:'nearest'});}catch(_e){}});
  }

  function render(){
    if(!body)return;body.textContent='';detailBox=null;detailBody=null;currentTableBody=null;
    var intro=el('p','subscribers-admin-intro','Consulta gli account registrati a Genova mApp e distingui account gratuiti, Premium Stripe e Premium attivati tramite coupon. I dati di pagamento non vengono mostrati.');body.appendChild(intro);
    var stats=el('section','subscribers-admin-stats');stats.appendChild(statCard('Iscritti',data.stats.total));stats.appendChild(statCard('Gratuiti',data.stats.free));stats.appendChild(statCard('Premium',data.stats.premium));stats.appendChild(statCard('Stripe',data.stats.stripe));stats.appendChild(statCard('Coupon',data.stats.coupon));stats.appendChild(statCard('Scaduti',data.stats.expired));body.appendChild(stats);
    if(data.stats.admin){var adminNote=el('p','subscribers-admin-note','Account amministratore: '+data.stats.admin+'. È incluso negli iscritti totali ma non nei Premium.');body.appendChild(adminNote);}

    var card=el('section','subscribers-admin-card');
    var top=el('div','subscribers-admin-list-head');var titleWrap=el('div');titleWrap.appendChild(el('h3','','Elenco iscritti e abbonati'));titleWrap.appendChild(el('p','','Clicca su una riga per mostrare i dettagli in fondo all’elenco.'));top.appendChild(titleWrap);var refresh=button('subscribers-admin-secondary','Aggiorna elenco');refresh.addEventListener('click',function(){load(refresh);});top.appendChild(refresh);card.appendChild(top);
    var filters=el('div','subscribers-admin-filters');var search=document.createElement('input');search.type='search';search.placeholder='Cerca per email, coupon o campagna';search.setAttribute('aria-label','Cerca iscritti e abbonati');var select=document.createElement('select');[['all','Tutti'],['free','Gratuiti'],['premium','Premium'],['stripe','Stripe'],['coupon','Coupon'],['expired','Scaduti'],['admin','Admin']].forEach(function(pair){var o=document.createElement('option');o.value=pair[0];o.textContent=pair[1];select.appendChild(o);});filters.appendChild(search);filters.appendChild(select);card.appendChild(filters);
    var wrap=el('div','subscribers-admin-table-wrap');var table=el('table','subscribers-admin-table');var thead=document.createElement('thead');var hr=document.createElement('tr');['Email','Stato','Tipo','Piano','Scadenza','Iscritto'].forEach(function(label){var th=document.createElement('th');th.textContent=label;hr.appendChild(th);});thead.appendChild(hr);var tb=document.createElement('tbody');currentTableBody=tb;table.appendChild(thead);table.appendChild(tb);wrap.appendChild(table);card.appendChild(wrap);

    detailBox=el('section','subscribers-admin-inline-detail');detailBox.hidden=true;detailBox.setAttribute('aria-live','polite');
    var detailHead=el('div','subscribers-admin-inline-detail-head');detailHead.appendChild(el('h3','','Scheda utente'));var detailClose=button('subscribers-admin-inline-detail-close','Chiudi dettagli');detailClose.addEventListener('click',closeDetail);detailHead.appendChild(detailClose);detailBox.appendChild(detailHead);
    detailBody=el('div','subscribers-admin-detail-body');detailBox.appendChild(detailBody);card.appendChild(detailBox);

    body.appendChild(card);
    notice=el('p','subscribers-admin-notice');notice.hidden=true;body.appendChild(notice);

    function refreshRows(){
      closeDetail();
      var q=String(search.value||'').trim().toLowerCase(),filter=select.value||'all',shown=0;tb.textContent='';
      data.users.forEach(function(user){
        var hay=[user.email,user.couponCode,user.couponLabel,sourceLabel(user),planLabel(user),statusLabel(user)].join(' ').toLowerCase();
        var matchFilter=filter==='all'||(filter==='stripe'&&user.source==='stripe')||(filter==='coupon'&&user.source==='coupon')||user.status===filter;
        if((q&&!hay.includes(q))||!matchFilter)return;shown+=1;
        var tr=document.createElement('tr');tr.tabIndex=0;tr.setAttribute('role','button');tr.setAttribute('aria-expanded','false');tr.setAttribute('aria-label','Mostra dettagli di '+(user.email||'utente'));
        var values=[user.email||'—',statusLabel(user),sourceLabel(user),planLabel(user),user.currentPeriodEnd?fmtDate(user.currentPeriodEnd,false):'—',fmtDate(user.createdAt,false)];
        values.forEach(function(value,index){var td=document.createElement('td');td.textContent=value;if(index===0)td.className='subscribers-admin-email';if(index===1)td.className='subscribers-admin-status '+statusClass(user);tr.appendChild(td);});
        tr.addEventListener('click',function(){if(tr.classList.contains('is-selected')){closeDetail();return;}openDetail(user,tr);});tr.addEventListener('keydown',function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();if(tr.classList.contains('is-selected'))closeDetail();else openDetail(user,tr);}});tb.appendChild(tr);
      });
      if(!shown){var tr=document.createElement('tr');var td=document.createElement('td');td.colSpan=6;td.className='subscribers-admin-empty';td.textContent='Nessun utente corrispondente.';tr.appendChild(td);tb.appendChild(tr);}
    }
    search.addEventListener('input',refreshRows);select.addEventListener('change',refreshRows);refreshRows();
  }

  async function load(btn){
    if(busy)return;busy=true;if(btn)btn.disabled=true;showNotice('',false);
    try{data=await api();render();}
    catch(error){render();showNotice(error.message==='forbidden'?'Accesso riservato all’amministratore.':'Impossibile caricare l’elenco degli iscritti.',true);}
    finally{busy=false;if(btn)btn.disabled=false;}
  }
  function open(){create();if(!isAdmin())return;lastFocused=document.activeElement;overlay.classList.add('is-open');overlay.setAttribute('aria-hidden','false');document.body.classList.add('settings-page-open');load();}
  function closePanel(){if(!overlay)return;closeDetail();overlay.classList.remove('is-open');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('settings-page-open');if(lastFocused&&lastFocused.focus)try{lastFocused.focus();}catch(_e){}}

  document.addEventListener('keydown',function(event){if(event.key!=='Escape')return;if(detailBox&&!detailBox.hidden){closeDetail();return;}if(overlay&&overlay.classList.contains('is-open'))closePanel();});
  window.GenovaSubscribersAdmin={open:open,close:closePanel,isAdmin:isAdmin};
})();
