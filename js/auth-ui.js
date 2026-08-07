/* Genova mApp: interfaccia Account basata su Netlify Identity. */
(function(){
  'use strict';
  if(window.__GENOVA_AUTH_UI__) return;
  window.__GENOVA_AUTH_UI__ = true;

  var identity = null;
  var currentUser = null;
  var lastFocused = null;

  var STRINGS = {
    it:{labelLogin:'Accedi o registrati',labelProfile:'Apri il profilo di {name}',title:'Account Genova mApp',guest:'Accedi per collegare Genova mApp al tuo account. Puoi anche creare gratuitamente un nuovo profilo.',login:'Accedi',signup:'Registrati',close:'Chiudi',profileTitle:'Il tuo account',active:'Account verificato',logout:'Esci dall’account',unavailable:'Il servizio Login richiede una connessione Internet.',name:'Nome utente'},
    en:{labelLogin:'Log in or sign up',labelProfile:'Open {name} profile',title:'Genova mApp account',guest:'Log in to connect Genova mApp to your account. You can also create a new profile for free.',login:'Log in',signup:'Sign up',close:'Close',profileTitle:'Your account',active:'Verified account',logout:'Log out',unavailable:'The Login service requires an Internet connection.',name:'Username'},
    es:{labelLogin:'Acceder o registrarse',labelProfile:'Abrir el perfil de {name}',title:'Cuenta Genova mApp',guest:'Accede para conectar Genova mApp con tu cuenta. También puedes crear gratuitamente un nuevo perfil.',login:'Acceder',signup:'Registrarse',close:'Cerrar',profileTitle:'Tu cuenta',active:'Cuenta verificada',logout:'Cerrar sesión',unavailable:'El servicio de acceso necesita conexión a Internet.',name:'Nombre de usuario'},
    fr:{labelLogin:'Se connecter ou s’inscrire',labelProfile:'Ouvrir le profil de {name}',title:'Compte Genova mApp',guest:'Connectez-vous pour associer Genova mApp à votre compte. Vous pouvez aussi créer gratuitement un nouveau profil.',login:'Se connecter',signup:'S’inscrire',close:'Fermer',profileTitle:'Votre compte',active:'Compte vérifié',logout:'Se déconnecter',unavailable:'Le service de connexion nécessite Internet.',name:'Nom d’utilisateur'},
    ar:{labelLogin:'تسجيل الدخول أو إنشاء حساب',labelProfile:'فتح ملف {name}',title:'حساب Genova mApp',guest:'سجّل الدخول لربط Genova mApp بحسابك، أو أنشئ ملفًا جديدًا مجانًا.',login:'تسجيل الدخول',signup:'إنشاء حساب',close:'إغلاق',profileTitle:'حسابك',active:'حساب موثّق',logout:'تسجيل الخروج',unavailable:'تتطلب خدمة تسجيل الدخول اتصالًا بالإنترنت.',name:'اسم المستخدم'},
    ru:{labelLogin:'Войти или зарегистрироваться',labelProfile:'Открыть профиль {name}',title:'Аккаунт Genova mApp',guest:'Войдите, чтобы связать Genova mApp со своим аккаунтом, или бесплатно создайте новый профиль.',login:'Войти',signup:'Регистрация',close:'Закрыть',profileTitle:'Ваш аккаунт',active:'Аккаунт подтверждён',logout:'Выйти',unavailable:'Для входа требуется подключение к Интернету.',name:'Имя пользователя'},
    zh:{labelLogin:'登录或注册',labelProfile:'打开 {name} 的个人资料',title:'Genova mApp 账户',guest:'登录即可将 Genova mApp 与你的账户关联，也可以免费创建新账户。',login:'登录',signup:'注册',close:'关闭',profileTitle:'你的账户',active:'账户已验证',logout:'退出登录',unavailable:'登录服务需要互联网连接。',name:'用户名'},
    lij:{labelLogin:'Intra ò registrite',labelProfile:'Arvi o profî de {name}',title:'Account Genova mApp',guest:'Intra pe collegâ Genova mApp a-o teu account, ò crea gratis un neuvo profî.',login:'Intra',signup:'Registrite',close:'Særa',profileTitle:'O teu account',active:'Account verificou',logout:'Sciòrti da l’account',unavailable:'O serviçio Login o domanda a conescion a Internet.',name:'Nómme utente'}
  };

  var WIDGET_LOCALES = {it:'it',en:'en',es:'es',fr:'fr',ar:'ar',ru:'ru',zh:'zhCN',lij:'it'};

  function lang(){
    try{return String(localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it').toLowerCase().split(/[-_]/)[0];}
    catch(_e){return 'it';}
  }
  function copy(){return STRINGS[lang()] || STRINGS.it;}
  function displayName(user){
    if(!user) return '';
    var metadata = user.user_metadata || {};
    return String(metadata.full_name || metadata.name || (user.email || '').split('@')[0] || copy().name);
  }
  function format(template,value){return String(template).replace('{name}',value);}
  function announceAuth(){
    try{document.dispatchEvent(new CustomEvent('genova:auth-changed',{detail:{user:currentUser}}));}catch(_e){}
  }

  function createButton(){
    var existing=document.getElementById('auth-login-button');
    if(existing) return existing;
    var button=document.createElement('button');
    button.id='auth-login-button';
    button.type='button';
    button.className='btn auth-login-button';
    button.setAttribute('aria-haspopup','dialog');
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg><span class="auth-state-dot" aria-hidden="true"></span>';
    var left=document.querySelector('#app > header .toolbar-left');
    if(left) left.appendChild(button);
    return button;
  }

  function createModal(){
    var existing=document.getElementById('auth-account-modal');
    if(existing) return existing;
    var modal=document.createElement('div');
    modal.id='auth-account-modal';
    modal.hidden=true;
    modal.innerHTML='<section class="auth-account-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-account-title" aria-describedby="auth-account-description">'+
      '<button class="auth-account-close" type="button" aria-label=""><span aria-hidden="true">×</span></button>'+
      '<div class="auth-account-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg></div>'+
      '<h2 id="auth-account-title"></h2><p class="auth-account-description" id="auth-account-description"></p>'+
      '<div class="auth-account-profile" id="auth-account-profile" hidden><strong class="auth-account-name"></strong><span class="auth-account-email"></span><span class="auth-account-status"></span></div>'+
      '<p class="auth-account-notice" id="auth-account-notice" aria-live="polite"></p>'+
      '<div class="auth-account-actions"><button id="auth-account-login" type="button"></button><button id="auth-account-signup" type="button"></button><button id="auth-account-logout" type="button" hidden></button></div>'+
      '</section>';
    document.body.appendChild(modal);
    return modal;
  }

  function updateButton(){
    var button=document.getElementById('auth-login-button');
    if(!button) return;
    var text=copy();
    var label=currentUser ? format(text.labelProfile,displayName(currentUser)) : text.labelLogin;
    button.classList.toggle('is-authenticated',!!currentUser);
    button.setAttribute('aria-label',label);
    button.setAttribute('title',label);
  }

  function renderModal(){
    var text=copy();
    var dialog=document.querySelector('#auth-account-modal .auth-account-dialog');
    var title=document.getElementById('auth-account-title');
    var description=document.getElementById('auth-account-description');
    var profile=document.getElementById('auth-account-profile');
    var login=document.getElementById('auth-account-login');
    var signup=document.getElementById('auth-account-signup');
    var logout=document.getElementById('auth-account-logout');
    var close=document.querySelector('#auth-account-modal .auth-account-close');
    if(!dialog||!title||!description||!profile||!login||!signup||!logout||!close) return;
    dialog.setAttribute('dir',lang()==='ar'?'rtl':'ltr');
    dialog.classList.toggle('is-authenticated',!!currentUser);
    close.setAttribute('aria-label',text.close);
    if(currentUser){
      title.textContent=text.profileTitle;
      description.textContent='';
      profile.hidden=false;
      profile.querySelector('.auth-account-name').textContent=displayName(currentUser);
      profile.querySelector('.auth-account-email').textContent=currentUser.email || '';
      profile.querySelector('.auth-account-status').textContent=text.active;
      login.hidden=true;signup.hidden=true;logout.hidden=false;logout.textContent=text.logout;
    }else{
      title.textContent=text.title;
      description.textContent=text.guest;
      profile.hidden=true;
      login.hidden=false;signup.hidden=false;logout.hidden=true;
      login.textContent=text.login;signup.textContent=text.signup;
    }
  }

  function setNotice(message){var el=document.getElementById('auth-account-notice');if(el) el.textContent=message||'';}
  function openModal(){
    var modal=document.getElementById('auth-account-modal');
    if(!modal) return;
    lastFocused=document.activeElement;
    renderModal();setNotice('');modal.hidden=false;document.documentElement.classList.add('auth-account-open');
    window.setTimeout(function(){var target=currentUser?document.getElementById('auth-account-logout'):document.getElementById('auth-account-login');if(target)target.focus();},0);
  }
  function closeModal(){
    var modal=document.getElementById('auth-account-modal');
    if(!modal||modal.hidden)return;
    modal.hidden=true;document.documentElement.classList.remove('auth-account-open');
    if(lastFocused&&typeof lastFocused.focus==='function')lastFocused.focus();
  }

  function syncWidgetLanguage(){
    if(!identity||typeof identity.setLocale!=='function')return;
    try{identity.setLocale(WIDGET_LOCALES[lang()]||'it');}catch(_e){}
  }
  function patchNamePlaceholder(){
    window.setTimeout(function(){
      var input=document.querySelector('.netlify-identity-widget input[name="full_name"]');
      if(input)input.setAttribute('placeholder',copy().name);
    },30);
  }
  function openIdentity(mode){
    if(!identity||typeof identity.open!=='function'){
      setNotice(copy().unavailable);return;
    }
    if(!navigator.onLine){setNotice(copy().unavailable);return;}
    syncWidgetLanguage();closeModal();
    try{identity.open(mode);patchNamePlaceholder();}catch(_e){openModal();setNotice(copy().unavailable);}
  }

  function bindIdentity(){
    identity=window.netlifyIdentity||null;
    if(!identity)return false;
    identity.on('init',function(user){currentUser=user||null;updateButton();renderModal();announceAuth();});
    identity.on('login',function(user){currentUser=user||null;updateButton();renderModal();announceAuth();try{identity.close();}catch(_e){}});
    identity.on('logout',function(){currentUser=null;updateButton();renderModal();announceAuth();});
    identity.on('error',function(){if(!document.getElementById('auth-account-modal').hidden)setNotice(copy().unavailable);});
    identity.on('open',patchNamePlaceholder);
    /* Il widget CDN può essersi già inizializzato: in ogni caso recupera
       subito l'eventuale sessione esistente senza dipendere dall'evento init. */
    /* Lo script CDN inizializza automaticamente il widget. Una seconda init
       creerebbe due iframe sovrapposti e, su alcuni browser, uno resterebbe
       dietro alla mappa. Qui aggiorniamo soltanto la lingua. */
    syncWidgetLanguage();
    try{currentUser=typeof identity.currentUser==='function'?identity.currentUser():null;}catch(_e){currentUser=null;}
    updateButton();renderModal();
    announceAuth();
    return true;
  }

  function boot(){
    var button=createButton();
    var modal=createModal();
    updateButton();renderModal();
    button.addEventListener('click',openModal);
    modal.querySelector('.auth-account-close').addEventListener('click',closeModal);
    modal.addEventListener('click',function(event){if(event.target===modal)closeModal();});
    document.getElementById('auth-account-login').addEventListener('click',function(){openIdentity('login');});
    document.getElementById('auth-account-signup').addEventListener('click',function(){openIdentity('signup');});
    document.getElementById('auth-account-logout').addEventListener('click',function(){
      if(identity&&typeof identity.logout==='function')identity.logout();
      else{currentUser=null;updateButton();renderModal();}
    });
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&!modal.hidden)closeModal();});
    document.addEventListener('app:set-lang',function(){syncWidgetLanguage();updateButton();if(!modal.hidden)renderModal();});
    if(!bindIdentity()){
      var tries=0;
      (function retry(){if(bindIdentity())return;if(++tries<30)window.setTimeout(retry,150);})();
    }
  }

  window.GenovaAuth={
    getUser:function(){return currentUser;},
    open:function(mode){openIdentity(mode||'login');},
    logout:function(){return identity&&typeof identity.logout==='function'?identity.logout():Promise.resolve();},
    token:function(){
      if(!currentUser||typeof currentUser.jwt!=='function')return Promise.reject(new Error('not_authenticated'));
      return currentUser.jwt();
    }
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
