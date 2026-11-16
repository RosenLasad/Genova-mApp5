/* Sala Storie di Genova: account esistente, accesso diretto o autorizzazione TV. */
(function(){
  'use strict';
  var ENDPOINT = '/.netlify/functions/storie-genova';
  var BASE = '/storiedigenova';
  var SESSION_KEY = 'gm-storie-tv-v2';
  var ids = ['home','direct-login','pair','authorize','ready','watch'];
  var session = null, viewing = 'direct', view = 'home', checked = '', approved = false;
  var pollTimer = null, clockTimer = null, generation = 0, creating = false, initialized = false;
  var storage = window.sessionStorage;
  function el(id){ return document.getElementById(id); }
  function user(){ return window.GenovaAuth ? window.GenovaAuth.getUser() : null; }
  function show(id){
    view = id;
    ids.forEach(function(x){ el(x).hidden = x !== id; });
    el('error').hidden = true;
    var first = el(id).querySelector('button:not([hidden]),input');
    if(first && first.getClientRects().length) first.focus();
  }
  function fail(error){ el('error').textContent = error.message || 'Si è verificato un errore. Riprova.'; el('error').hidden = false; }
  function stop(){ generation++; clearTimeout(pollTimer); clearInterval(clockTimer); }
  function format(code){ return code.slice(0,5) + ' ' + code.slice(5); }
  function save(){ try { if(session) storage.setItem(SESSION_KEY, JSON.stringify(session)); else storage.removeItem(SESSION_KEY); } catch(_){} }
  function clearReturn(){ try { storage.removeItem('gm-storie-auth-return'); localStorage.removeItem('gm-storie-auth-return'); } catch(_){} }
  function hidePlayer(){ el('player-wrap').replaceChildren(); }
  function setRoute(query){ history.replaceState(null,'',BASE + (query ? '?' + query : '')); }
  async function api(action, data, authenticated){
    var headers = {'Content-Type':'application/json'};
    if(authenticated){
      try { headers.authorization = 'Bearer ' + await window.GenovaAuth.token(); }
      catch(_) { throw Object.assign(new Error('Accedi al tuo account Genova mApp per continuare.'),{status:401}); }
    }
    var controller = new AbortController();
    var timeout = setTimeout(function(){controller.abort();},20000);
    try {
      var response = await fetch(ENDPOINT,{method:'POST',headers:headers,cache:'no-store',signal:controller.signal,body:JSON.stringify(Object.assign({action:action},data || {}))});
      var result;
      try { result = await response.json(); } catch(_) { throw new Error('Servizio documentario non disponibile. Verifica che il deploy includa la funzione storie-genova.'); }
      if(!response.ok) throw Object.assign(new Error(result.error || 'Servizio temporaneamente non disponibile.'),{status:response.status});
      return result;
    } catch(error){
      if(error.name === 'AbortError') throw new Error('La connessione sta impiegando troppo tempo. Riprova.');
      throw error;
    } finally { clearTimeout(timeout); }
  }
  function openLogin(mode){
    var query = view === 'authorize' && checked ? 'tv=' + checked : 'guarda=1';
    var pending = JSON.stringify({path:BASE + '?' + query,at:Date.now()});
    try { storage.setItem('gm-storie-auth-return',pending); localStorage.setItem('gm-storie-auth-return',pending); } catch(_){}
    setRoute(query);
    if(!window.GenovaAuth || !window.netlifyIdentity){ fail(new Error('Il servizio account non è disponibile. Controlla la connessione e ricarica la pagina.')); return; }
    window.GenovaAuth.open(mode);
  }
  function updateAuth(){
    var account = user();
    el('account-label').textContent = account ? 'Il mio account' : 'Accedi / Registrati';
    el('home-auth').textContent = account ? 'Il tuo account è collegato. Puoi guardare il documentario su questo dispositivo.' : '';
    el('authorize-login').hidden = !!account;
    el('authorize-logged').hidden = !account;
    el('authorize-account').textContent = account ? 'Account Genova mApp collegato. Nessun pagamento richiesto per questa prova.' : '';
    if(!initialized) return;
    if(view === 'direct-login' && account){ ready('direct'); clearReturn(); }
    if((view === 'watch' || view === 'ready') && viewing === 'direct' && !account){ hidePlayer(); show('direct-login'); }
  }
  function ready(mode){
    viewing = mode;
    el('ready-description').textContent = mode === 'tv' ? 'La TV è autorizzata. Puoi lasciare libero il telefono.' : 'Il tuo account Genova mApp ti dà accesso alla prova gratuita su questo dispositivo.';
    el('disconnect').hidden = mode !== 'tv';
    show('ready');
  }
  function direct(){
    stop(); hidePlayer(); setRoute('guarda=1');
    if(user()) ready('direct'); else show('direct-login');
  }
  function home(){
    stop(); hidePlayer(); clearReturn(); setRoute(''); show('home');
  }
  function renderPair(){
    show('pair');
    el('tv-code').textContent = format(session.code);
    el('manual-url').textContent = location.origin + BASE;
    el('waiting').textContent = 'In attesa dell’autorizzazione…';
    var link = location.origin + BASE + '?tv=' + session.code;
    if(window.QRCode){
      QRCode.toCanvas(el('qr'),link,{width:300,margin:4,errorCorrectionLevel:'M',color:{dark:'#102a30',light:'#ffffff'}}).catch(function(){fail(new Error('QR non disponibile: usa l’indirizzo e il codice indicati.'));});
    } else fail(new Error('QR non disponibile: usa l’indirizzo e il codice indicati.'));
    var captured = session;
    function clock(){
      var n = Math.max(0,Math.ceil((captured.expires-Date.now())/1000));
      el('countdown').textContent = 'Il codice scade tra ' + Math.floor(n/60) + ':' + String(n%60).padStart(2,'0');
      if(!n){clearInterval(clockTimer);el('waiting').textContent = 'Il codice sta scadendo. Se non hai autorizzato la TV, genera un nuovo QR.';}
    }
    clock(); clockTimer = setInterval(clock,1000);
  }
  async function poll(ticket, version){
    if(version !== generation || session !== ticket) return;
    try {
      var result = await api('status',{code:ticket.code,secret:ticket.secret});
      if(version !== generation || session !== ticket) return;
      if(result.approved){ stop(); ticket.until = result.until; save(); ready('tv'); return; }
      el('waiting').textContent = 'In attesa dell’autorizzazione…';
    } catch(error){
      if(version !== generation || session !== ticket) return;
      if([401,403,404,410].indexOf(error.status) >= 0){
        stop(); session = null; save();
        show('pair');el('waiting').textContent = 'Collega nuovamente la TV con un nuovo QR.';fail(error);return;
      }
      el('waiting').textContent = 'Connessione interrotta. Nuovo tentativo tra pochi secondi…';
    }
    if(version === generation) pollTimer = setTimeout(function(){poll(ticket,version);},4000);
  }
  async function start(){
    if(creating) return;
    creating = true;stop();var version = generation;
    el('start').disabled = true;el('regenerate').disabled = true;
    try {
      if(session){ var old=session;session=null;save();await api('revoke',{code:old.code,secret:old.secret}).catch(function(){}); }
      var created = await api('create');
      if(version !== generation) return;
      session = created; save();setRoute('');renderPair();poll(session,version);
    } catch(error){ if(version === generation) fail(error); }
    finally {creating=false;el('start').disabled=false;el('regenerate').disabled=false;}
  }
  async function inspect(code){
    approved=false;checked='';el('approve').disabled=false;el('confirmation').hidden=true;el('phone-status').textContent='Verifica del codice…';el('error').hidden=true;
    try {
      var result=await api('inspect',{code:code});
      checked=result.code;setRoute('tv='+checked);el('confirm-code').textContent=format(checked);el('code-form').hidden=true;el('confirmation').hidden=false;el('change-code').hidden=false;
      el('phone-status').textContent='Prova gratuita: nessun acquisto richiesto.';updateAuth();
      var target=user()?el('approve'):el('authorize-login').querySelector('button');if(target)target.focus();
    } catch(error){el('code-form').hidden=false;el('phone-status').textContent='';fail(error);}
  }
  el('start').onclick=start;el('regenerate').onclick=start;el('watch-here').onclick=direct;
  el('phone').onclick=function(){stop();show('authorize');el('code-form').hidden=false;el('confirmation').hidden=true;setRoute('telefono=1');el('code-input').focus();};
  el('code-form').onsubmit=function(event){event.preventDefault();inspect(el('code-input').value);};
  el('change-code').onclick=function(){checked='';approved=false;el('confirmation').hidden=true;el('code-form').hidden=false;el('phone-status').textContent='';this.hidden=true;el('code-input').focus();setRoute('telefono=1');};
  el('approve').onclick=async function(){
    if(approved || !checked) return;
    this.disabled=true;el('error').hidden=true;
    try {
      await api('approve',{code:checked},true);
      approved=true;clearReturn();el('confirmation').hidden=true;el('phone-status').textContent='TV autorizzata! Torna al televisore e scegli «Riproduci il documentario». Puoi chiudere questa pagina.';
    } catch(error){if(error.status===401) openLogin('login');fail(error);this.disabled=false;}
  };
  el('play').onclick=async function(){
    this.disabled=true;el('error').hidden=true;
    try {
      var result=viewing==='tv' && session ? await api('status',{code:session.code,secret:session.secret}) : await api('playback',{},true);
      if(viewing==='tv' && !result.approved) throw new Error('Autorizza prima questa TV con il telefono.');
      if(result.provider!=='youtube' || !/^[a-zA-Z0-9_-]{11}$/.test(result.videoId)) throw new Error('Sorgente video non disponibile.');
      show('watch');hidePlayer();var frame=document.createElement('iframe');frame.title='Storie di Genova — documentario';
      frame.src='https://www.youtube-nocookie.com/embed/'+result.videoId+'?autoplay=1&playsinline=1&rel=0';
      frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';el('player-wrap').appendChild(frame);frame.focus();
    } catch(error){
      if(error.status===401 && viewing==='direct'){show('direct-login');openLogin('login');}
      fail(error);
    } finally {this.disabled=false;}
  };
  el('close-player').onclick=function(){hidePlayer();ready(viewing);};
  el('disconnect').onclick=async function(){
    this.disabled=true;
    try{if(session) await api('revoke',{code:session.code,secret:session.secret});session=null;save();home();}
    catch(error){fail(error);}finally{this.disabled=false;}
  };
  document.querySelectorAll('[data-home]').forEach(function(button){button.onclick=home;});
  document.querySelectorAll('[data-login]').forEach(function(button){button.onclick=function(){openLogin(button.getAttribute('data-login'));};});
  el('privacy').onclick=function(){el('info').showModal();};el('close-info').onclick=function(){el('info').close();};
  document.addEventListener('genova:auth-changed',updateAuth);
  document.addEventListener('keydown',function(event){
    if(el('info').open || document.getElementById('gcl-overlay') || !document.getElementById('auth-account-modal')?.hidden) return;
    if(['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].indexOf(event.key)<0 || ['INPUT','IFRAME'].indexOf(document.activeElement.tagName)>=0) return;
    var items=Array.from(document.querySelectorAll('header button,header a,main button,main input,footer button,footer a')).filter(function(node){return node.getClientRects().length && !node.disabled;});
    var index=items.indexOf(document.activeElement),step=event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1;
    if(index>=0){event.preventDefault();items[(index+step+items.length)%items.length].focus();}
  });
  window.addEventListener('pagehide',stop);
  window.addEventListener('pageshow',function(event){if(event.persisted){updateAuth();if(view==='pair'&&session){stop();renderPair();poll(session,generation);}}});
  async function boot(){
    if(window.GenovaAuth) await window.GenovaAuth.whenReady();
    initialized=true;updateAuth();
    var params=new URLSearchParams(location.search),code=params.get('tv');
    if(code){show('authorize');el('code-input').value=code;inspect(code);return;}
    if(params.has('telefono')){show('authorize');return;}
    if(params.has('guarda')){direct();return;}
    try{session=JSON.parse(storage.getItem(SESSION_KEY)||'null');}catch(_){}
    if(session && /^[A-F0-9]{10}$/.test(session.code) && /^[a-f0-9]{64}$/.test(session.secret) && (session.until>Date.now() || session.expires>Date.now())){
      renderPair();poll(session,generation);
    }else{session=null;save();show('home');}
  }
  boot().catch(fail);
})();
