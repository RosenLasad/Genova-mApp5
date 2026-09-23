/* Genova mApp - pannello amministratore Coupon. Testi volutamente solo in italiano. */
(function(){
  'use strict';
  if(window.__GENOVA_COUPON_ADMIN__)return;
  window.__GENOVA_COUPON_ADMIN__=true;

  var overlay=null,body=null,notice=null,lastFocused=null,data={coupons:[],stats:{total:0,available:0,redeemed:0,expired:0}},busy=false;

  function el(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
  function button(cls,text){var n=el('button',cls,text);n.type='button';return n;}
  function isAdmin(){try{var s=window.GenovaAccount&&window.GenovaAccount.getState();return !!(s&&((s.record&&s.record.isAdmin===true)||(s.subscription&&s.subscription.adminOverride===true)));}catch(_e){return false;}}
  async function token(){if(!window.GenovaAuth||typeof window.GenovaAuth.token!=='function')throw new Error('not_authenticated');return window.GenovaAuth.token();}
  async function api(method,payload){var jwt=await token();var options={method:method,headers:{authorization:'Bearer '+jwt,'cache-control':'no-store'}};if(payload){options.headers['content-type']='application/json';options.body=JSON.stringify(payload);}var response=await fetch('/.netlify/functions/coupon-admin',options);var result={};try{result=await response.json();}catch(_e){}if(!response.ok)throw new Error(result.error||('http_'+response.status));return result;}
  function fmtDate(value){if(!value)return '—';try{return new Date(value).toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit',year:'numeric'});}catch(_e){return '—';}}
  function fmtDateOnly(value){if(!value)return '';var parts=String(value).slice(0,10).split('-');return parts.length===3?parts[2]+'/'+parts[1]+'/'+parts[0]:String(value);}
  function statusLabel(value){return value==='available'?'Disponibile':(value==='redeemed'?'Utilizzato':'Scaduto');}
  function csvEscape(value){var text=String(value==null?'':value);return /[;"\n]/.test(text)?'"'+text.replace(/"/g,'""')+'"':text;}
  function showNotice(message,error){if(!notice)return;notice.textContent=message||'';notice.hidden=!message;notice.classList.toggle('is-error',!!error);}

  function create(){
    if(overlay)return;
    overlay=el('div','settings-page-overlay coupon-admin-overlay');overlay.id='coupon-admin-overlay';overlay.setAttribute('aria-hidden','true');
    var page=el('section','settings-page coupon-admin-page');page.setAttribute('role','dialog');page.setAttribute('aria-modal','true');page.setAttribute('aria-labelledby','coupon-admin-title');
    var head=el('div','settings-page-head');var back=button('settings-page-back','');back.setAttribute('aria-label','Torna alle Impostazioni');back.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';var title=el('h2','settings-page-title','Coupon');title.id='coupon-admin-title';var close=button('settings-page-close','');close.setAttribute('aria-label','Chiudi');close.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';head.appendChild(back);head.appendChild(title);head.appendChild(close);
    body=el('div','coupon-admin-content');page.appendChild(head);page.appendChild(body);overlay.appendChild(page);document.body.appendChild(overlay);
    back.addEventListener('click',function(){closePanel();document.dispatchEvent(new CustomEvent('genova:settings-reopen'));});close.addEventListener('click',closePanel);overlay.addEventListener('click',function(event){if(event.target===overlay)closePanel();});
  }

  function statCard(label,value){var card=el('div','coupon-admin-stat');card.appendChild(el('strong','',String(value||0)));card.appendChild(el('span','',label));return card;}

  function render(){
    if(!body)return;body.textContent='';
    var intro=el('p','coupon-admin-intro','Gestisci i codici promozionali Genova mApp. Ogni coupon può essere utilizzato una sola volta e attiva Premium per il numero di giorni indicato.');body.appendChild(intro);
    var stats=el('section','coupon-admin-stats');stats.appendChild(statCard('Totali',data.stats.total));stats.appendChild(statCard('Disponibili',data.stats.available));stats.appendChild(statCard('Utilizzati',data.stats.redeemed));stats.appendChild(statCard('Scaduti',data.stats.expired));body.appendChild(stats);

    var generator=el('section','coupon-admin-card');generator.appendChild(el('h3','','Genera nuovi coupon'));
    var form=el('div','coupon-admin-form');
    function field(labelText,input){var label=el('label','coupon-admin-field');label.appendChild(el('span','',labelText));label.appendChild(input);return label;}
    var quantity=document.createElement('input');quantity.type='number';quantity.min='1';quantity.max='500';quantity.step='1';quantity.value='25';quantity.id='coupon-admin-quantity';
    var days=document.createElement('input');days.type='number';days.min='1';days.max='365';days.step='1';days.value='30';days.id='coupon-admin-days';
    var labelInput=document.createElement('input');labelInput.type='text';labelInput.maxLength=120;labelInput.placeholder='Es. Hotel Bristol / Fiera ottobre';labelInput.id='coupon-admin-label';
    var expires=document.createElement('input');expires.type='date';expires.id='coupon-admin-expiry';
    form.appendChild(field('Quantità',quantity));form.appendChild(field('Durata Premium (giorni)',days));form.appendChild(field('Partner / campagna',labelInput));form.appendChild(field('Scadenza coupon (facoltativa)',expires));
    generator.appendChild(form);var generateRow=el('div','coupon-admin-actions');var generate=button('coupon-admin-primary','Genera coupon');generate.addEventListener('click',function(){generateCoupons(generate);});generateRow.appendChild(generate);generator.appendChild(generateRow);body.appendChild(generator);

    var tools=el('section','coupon-admin-card coupon-admin-list-card');var toolsHead=el('div','coupon-admin-list-head');var title=el('div','');title.appendChild(el('h3','','Elenco coupon'));title.appendChild(el('p','','I primi 100 vengono creati automaticamente alla prima apertura del pannello.'));toolsHead.appendChild(title);
    var exportWrap=el('div','coupon-admin-export');var exportAvailable=button('coupon-admin-secondary','Esporta disponibili CSV');exportAvailable.addEventListener('click',function(){exportCsv(false);});var exportAll=button('coupon-admin-secondary','Esporta tutti CSV');exportAll.addEventListener('click',function(){exportCsv(true);});exportWrap.appendChild(exportAvailable);exportWrap.appendChild(exportAll);toolsHead.appendChild(exportWrap);tools.appendChild(toolsHead);
    var filters=el('div','coupon-admin-filters');var search=document.createElement('input');search.type='search';search.placeholder='Cerca codice o campagna';search.id='coupon-admin-search';var select=document.createElement('select');select.id='coupon-admin-filter';[['all','Tutti'],['available','Disponibili'],['redeemed','Utilizzati'],['expired','Scaduti']].forEach(function(item){var o=document.createElement('option');o.value=item[0];o.textContent=item[1];select.appendChild(o);});filters.appendChild(search);filters.appendChild(select);tools.appendChild(filters);
    var tableWrap=el('div','coupon-admin-table-wrap');var table=document.createElement('table');table.className='coupon-admin-table';table.innerHTML='<thead><tr><th>#</th><th>Codice</th><th>Stato</th><th>Giorni</th><th>Partner / campagna</th><th>Creato</th><th>Utilizzato</th></tr></thead><tbody></tbody>';tableWrap.appendChild(table);tools.appendChild(tableWrap);body.appendChild(tools);
    notice=el('p','coupon-admin-notice','');notice.hidden=true;notice.setAttribute('role','status');body.insertBefore(notice,generator);
    function refreshRows(){var q=String(search.value||'').trim().toLowerCase(),filter=select.value,tb=table.querySelector('tbody');tb.textContent='';var shown=0;data.coupons.forEach(function(c){if(filter!=='all'&&c.status!==filter)return;var hay=(c.code+' '+(c.label||'')).toLowerCase();if(q&&!hay.includes(q))return;shown+=1;var tr=document.createElement('tr');[String(c.number),c.code,statusLabel(c.status),String(c.durationDays||30),c.label||'—',fmtDate(c.createdAt),c.redeemedAt?fmtDate(c.redeemedAt):'—'].forEach(function(value,index){var td=document.createElement('td');td.textContent=value;if(index===1)td.className='coupon-admin-code';if(index===2)td.className='coupon-admin-status is-'+c.status;tr.appendChild(td);});tb.appendChild(tr);});if(!shown){var tr=document.createElement('tr');var td=document.createElement('td');td.colSpan=7;td.className='coupon-admin-empty';td.textContent='Nessun coupon corrispondente.';tr.appendChild(td);tb.appendChild(tr);}}
    search.addEventListener('input',refreshRows);select.addEventListener('change',refreshRows);refreshRows();
  }

  async function load(){if(busy)return;busy=true;showNotice('',false);try{data=await api('GET');render();if(data.initialCreated)showNotice('Creato automaticamente il lotto iniziale di '+data.initialCreated+' coupon da 30 giorni.',false);}catch(error){render();showNotice(error.message==='forbidden'?'Accesso riservato all’amministratore.':'Impossibile caricare i coupon.',true);}finally{busy=false;}}
  async function generateCoupons(btn){if(busy)return;var quantity=Number(document.getElementById('coupon-admin-quantity').value),days=Number(document.getElementById('coupon-admin-days').value),label=document.getElementById('coupon-admin-label').value,expiresOn=document.getElementById('coupon-admin-expiry').value;if(!Number.isInteger(quantity)||quantity<1||quantity>500){showNotice('Inserisci una quantità da 1 a 500.',true);return;}if(!Number.isInteger(days)||days<1||days>365){showNotice('Inserisci una durata da 1 a 365 giorni.',true);return;}busy=true;btn.disabled=true;var original=btn.textContent;btn.textContent='Generazione…';try{data=await api('POST',{action:'generate',quantity:quantity,durationDays:days,label:label,expiresOn:expiresOn});render();showNotice('Generati '+((data.created&&data.created.length)||quantity)+' nuovi coupon.',false);}catch(error){showNotice(error.message==='invalid_expiry'?'La data di scadenza deve essere futura.':'Non è stato possibile generare i coupon.',true);}finally{busy=false;btn.disabled=false;btn.textContent=original;}}
  function exportCsv(includeAll){var rows=data.coupons.filter(function(c){return includeAll||c.status==='available';});if(!rows.length){showNotice('Non ci sono coupon da esportare.',true);return;}var lines=['Numero;Codice;Stato;Durata giorni;Partner/Campagna;Creato;Scadenza;Utilizzato'];rows.forEach(function(c){lines.push([c.number,c.code,statusLabel(c.status),c.durationDays||30,c.label||'',fmtDate(c.createdAt),c.expiresOn?fmtDateOnly(c.expiresOn):(c.expiresAt?fmtDate(c.expiresAt):''),c.redeemedAt?fmtDate(c.redeemedAt):''].map(csvEscape).join(';'));});var blob=new Blob(['\ufeff'+lines.join('\n')],{type:'text/csv;charset=utf-8'});var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=(includeAll?'genovamapp-coupon-tutti-':'genovamapp-coupon-disponibili-')+new Date().toISOString().slice(0,10)+'.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);}
  function open(){create();if(!isAdmin())return;lastFocused=document.activeElement;overlay.classList.add('is-open');overlay.setAttribute('aria-hidden','false');document.body.classList.add('settings-page-open');load();}
  function closePanel(){if(!overlay)return;overlay.classList.remove('is-open');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('settings-page-open');if(lastFocused&&lastFocused.focus)try{lastFocused.focus();}catch(_e){}}

  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&overlay&&overlay.classList.contains('is-open'))closePanel();});
  window.GenovaCouponAdmin={open:open,close:closePanel,isAdmin:isAdmin};
})();
