/* Genova mApp: interfaccia Account basata su Netlify Identity + avatar profilo. */
(function(){
  'use strict';
  if(window.__GENOVA_AUTH_UI__) return;
  window.__GENOVA_AUTH_UI__ = true;

  var identity = null;
  var currentUser = null;
  var lastFocused = null;
  var AVATAR_KEY = 'genova_account_avatar_v1';
  var BOUND_KEY = 'genova_sync_account_v1';
  var AVATAR_BASE = 'icons/account-avatars/';

  var AVATARS = [
    {id:'default',file:'default.svg'},
    {id:'doge',file:'doge.svg'},
    {id:'lanterna',file:'lanterna.svg'},
    {id:'grifone',file:'grifone.svg'},
    {id:'san-giorgio',file:'san-giorgio.svg'},
    {id:'galea',file:'galea.svg'},
    {id:'camallo',file:'camallo.svg'},
    {id:'colombo',file:'colombo.svg'},
    {id:'doria',file:'doria.svg'},
    {id:'rolli',file:'rolli.svg'},
    {id:'focaccia',file:'focaccia.svg'},
    {id:'basilico',file:'basilico.svg'}
  ];

  var STRINGS = {
    it:{labelLogin:'Accedi o registrati',labelProfile:'Apri il profilo di {name}',title:'Account Genova mApp',guest:'Accedi per collegare Genova mApp al tuo account. Puoi anche creare gratuitamente un nuovo profilo.',login:'Accedi',signup:'Registrati',close:'Chiudi',profileTitle:'Il tuo account',active:'Account verificato',logout:'Esci dall’account',unavailable:'Il servizio Login richiede una connessione Internet.',name:'Nome utente',avatarChange:'Cambia immagine profilo',avatarTitle:'Scegli il tuo avatar',avatarHelp:'Scegli un’immagine per personalizzare il tuo account. Verrà mostrata anche nel bottone Account.',avatarClose:'Chiudi scelta avatar',avatarSelected:'Avatar selezionato: {avatar}',avatars:{default:'Avatar standard',doge:'Doge',lanterna:'Lanterna',grifone:'Grifone','san-giorgio':'Croce di San Giorgio',galea:'Galea genovese',camallo:'Camallo',colombo:'Cristoforo Colombo',doria:'Andrea Doria',rolli:'Palazzo dei Rolli',focaccia:'Focaccia',basilico:'Basilico'}},
    en:{labelLogin:'Log in or sign up',labelProfile:'Open {name} profile',title:'Genova mApp account',guest:'Log in to connect Genova mApp to your account. You can also create a new profile for free.',login:'Log in',signup:'Sign up',close:'Close',profileTitle:'Your account',active:'Verified account',logout:'Log out',unavailable:'The Login service requires an Internet connection.',name:'Username',avatarChange:'Change profile image',avatarTitle:'Choose your avatar',avatarHelp:'Choose an image to personalize your account. It will also appear in the Account button.',avatarClose:'Close avatar picker',avatarSelected:'Selected avatar: {avatar}',avatars:{default:'Default avatar',doge:'Doge',lanterna:'Lighthouse',grifone:'Griffin','san-giorgio':"St George's Cross",galea:'Genoese galley',camallo:'Dockworker',colombo:'Christopher Columbus',doria:'Andrea Doria',rolli:'Rolli palace',focaccia:'Focaccia',basilico:'Basil'}},
    es:{labelLogin:'Acceder o registrarse',labelProfile:'Abrir el perfil de {name}',title:'Cuenta Genova mApp',guest:'Accede para conectar Genova mApp con tu cuenta. También puedes crear gratuitamente un nuevo perfil.',login:'Acceder',signup:'Registrarse',close:'Cerrar',profileTitle:'Tu cuenta',active:'Cuenta verificada',logout:'Cerrar sesión',unavailable:'El servicio de acceso necesita conexión a Internet.',name:'Nombre de usuario',avatarChange:'Cambiar imagen de perfil',avatarTitle:'Elige tu avatar',avatarHelp:'Elige una imagen para personalizar tu cuenta. También aparecerá en el botón Cuenta.',avatarClose:'Cerrar selector de avatar',avatarSelected:'Avatar seleccionado: {avatar}',avatars:{default:'Avatar estándar',doge:'Dux genovés',lanterna:'Linterna',grifone:'Grifo','san-giorgio':'Cruz de San Jorge',galea:'Galera genovesa',camallo:'Camallo',colombo:'Cristóbal Colón',doria:'Andrea Doria',rolli:'Palacio de los Rolli',focaccia:'Focaccia',basilico:'Albahaca'}},
    fr:{labelLogin:'Se connecter ou s’inscrire',labelProfile:'Ouvrir le profil de {name}',title:'Compte Genova mApp',guest:'Connectez-vous pour associer Genova mApp à votre compte. Vous pouvez aussi créer gratuitement un nouveau profil.',login:'Se connecter',signup:'S’inscrire',close:'Fermer',profileTitle:'Votre compte',active:'Compte vérifié',logout:'Se déconnecter',unavailable:'Le service de connexion nécessite Internet.',name:'Nom d’utilisateur',avatarChange:'Changer l’image du profil',avatarTitle:'Choisissez votre avatar',avatarHelp:'Choisissez une image pour personnaliser votre compte. Elle apparaîtra aussi dans le bouton Compte.',avatarClose:'Fermer le sélecteur d’avatar',avatarSelected:'Avatar sélectionné : {avatar}',avatars:{default:'Avatar par défaut',doge:'Doge',lanterna:'Lanterne',grifone:'Griffon','san-giorgio':'Croix de Saint-Georges',galea:'Galère génoise',camallo:'Camallo',colombo:'Christophe Colomb',doria:'Andrea Doria',rolli:'Palais des Rolli',focaccia:'Focaccia',basilico:'Basilic'}},
    ar:{labelLogin:'تسجيل الدخول أو إنشاء حساب',labelProfile:'فتح ملف {name}',title:'حساب Genova mApp',guest:'سجّل الدخول لربط Genova mApp بحسابك، أو أنشئ ملفًا جديدًا مجانًا.',login:'تسجيل الدخول',signup:'إنشاء حساب',close:'إغلاق',profileTitle:'حسابك',active:'حساب موثّق',logout:'تسجيل الخروج',unavailable:'تتطلب خدمة تسجيل الدخول اتصالًا بالإنترنت.',name:'اسم المستخدم',avatarChange:'تغيير صورة الملف الشخصي',avatarTitle:'اختر صورتك الرمزية',avatarHelp:'اختر صورة لتخصيص حسابك. ستظهر أيضًا على زر الحساب.',avatarClose:'إغلاق اختيار الصورة الرمزية',avatarSelected:'الصورة الرمزية المختارة: {avatar}',avatars:{default:'الصورة الافتراضية',doge:'دوج جنوة',lanterna:'منارة جنوة',grifone:'الغريفين','san-giorgio':'صليب القديس جورج',galea:'سفينة جنوية',camallo:'عامل الميناء',colombo:'كريستوفر كولومبوس',doria:'أندريا دوريا',rolli:'قصر الرولي',focaccia:'فوكاتشا',basilico:'ريحان'}},
    ru:{labelLogin:'Войти или зарегистрироваться',labelProfile:'Открыть профиль {name}',title:'Аккаунт Genova mApp',guest:'Войдите, чтобы связать Genova mApp со своим аккаунтом, или бесплатно создайте новый профиль.',login:'Войти',signup:'Регистрация',close:'Закрыть',profileTitle:'Ваш аккаунт',active:'Аккаунт подтверждён',logout:'Выйти',unavailable:'Для входа требуется подключение к Интернету.',name:'Имя пользователя',avatarChange:'Изменить изображение профиля',avatarTitle:'Выберите аватар',avatarHelp:'Выберите изображение для своего аккаунта. Оно также появится на кнопке аккаунта.',avatarClose:'Закрыть выбор аватара',avatarSelected:'Выбранный аватар: {avatar}',avatars:{default:'Стандартный аватар',doge:'Дож',lanterna:'Лантерна',grifone:'Грифон','san-giorgio':'Крест Святого Георгия',galea:'Генуэзская галера',camallo:'Камалло',colombo:'Христофор Колумб',doria:'Андреа Дориа',rolli:'Дворец Ролли',focaccia:'Фокачча',basilico:'Базилик'}},
    zh:{labelLogin:'登录或注册',labelProfile:'打开 {name} 的个人资料',title:'Genova mApp 账户',guest:'登录即可将 Genova mApp 与你的账户关联，也可以免费创建新账户。',login:'登录',signup:'注册',close:'关闭',profileTitle:'你的账户',active:'账户已验证',logout:'退出登录',unavailable:'登录服务需要互联网连接。',name:'用户名',avatarChange:'更换个人头像',avatarTitle:'选择你的头像',avatarHelp:'选择一个头像来个性化你的账户。它也会显示在账户按钮上。',avatarClose:'关闭头像选择器',avatarSelected:'已选择头像：{avatar}',avatars:{default:'默认头像',doge:'热那亚总督',lanterna:'热那亚灯塔',grifone:'狮鹫','san-giorgio':'圣乔治十字',galea:'热那亚桨帆船',camallo:'港口装卸工',colombo:'哥伦布',doria:'安德烈亚·多里亚',rolli:'罗利宫殿',focaccia:'佛卡夏',basilico:'罗勒'}},
    lij:{labelLogin:'Intra ò registrite',labelProfile:'Arvi o profî de {name}',title:'Account Genova mApp',guest:'Intra pe collegâ Genova mApp a-o teu account, ò crea gratis un neuvo profî.',login:'Intra',signup:'Registrite',close:'Særa',profileTitle:'O teu account',active:'Account verificou',logout:'Sciòrti da l’account',unavailable:'O serviçio Login o domanda a conescion a Internet.',name:'Nómme utente',avatarChange:'Cangia immagine do profî',avatarTitle:'Çèrni o teu avatar',avatarHelp:'Çèrni unn’immagine pe personalizâ o teu account. A compariâ anche into boton Account.',avatarClose:'Særa a scelta avatar',avatarSelected:'Avatar çernûo: {avatar}',avatars:{default:'Avatar standard',doge:'Duxe',lanterna:'Lanterna',grifone:'Grifon','san-giorgio':'Croxe de San Zòrzo',galea:'Galea zeneize',camallo:'Camallo',colombo:'Cristoforo Colombo',doria:'Andrea Doria',rolli:'Palaçio di Rolli',focaccia:'Focaccia',basilico:'Baxaicò'}}
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
  function format(template,value){return String(template).replace('{name}',value).replace('{avatar}',value);}
  function announceAuth(){
    try{document.dispatchEvent(new CustomEvent('genova:auth-changed',{detail:{user:currentUser}}));}catch(_e){}
  }

  function avatarById(id){
    for(var i=0;i<AVATARS.length;i++) if(AVATARS[i].id===id) return AVATARS[i];
    return AVATARS[0];
  }
  function avatarLabel(id){
    var text=copy();
    return (text.avatars&&text.avatars[id]) || (STRINGS.it.avatars&&STRINGS.it.avatars[id]) || id;
  }
  function storedAvatarId(){
    if(!currentUser) return 'default';
    try{
      var bound=localStorage.getItem(BOUND_KEY)||'';
      if(bound && currentUser.id && bound!==currentUser.id) return 'default';
      return avatarById(localStorage.getItem(AVATAR_KEY)||'default').id;
    }catch(_e){return 'default';}
  }
  function avatarSrc(id){return AVATAR_BASE+avatarById(id).file;}
  function setAvatarImage(img,id,label){
    if(!img)return;
    img.src=avatarSrc(id);
    img.alt=label||'';
    img.setAttribute('data-avatar-id',id);
  }
  function updateAvatarUI(){
    var id=storedAvatarId();
    var label=avatarLabel(id);
    setAvatarImage(document.querySelector('#auth-login-button .auth-toolbar-avatar'),id,'');
    setAvatarImage(document.querySelector('#auth-avatar-trigger .auth-account-avatar-image'),id,'');
    var trigger=document.getElementById('auth-avatar-trigger');
    if(trigger){
      trigger.disabled=!currentUser;
      trigger.setAttribute('aria-label',currentUser?copy().avatarChange:'');
      trigger.setAttribute('title',currentUser?copy().avatarChange:'');
    }
    var options=document.querySelectorAll('#auth-avatar-grid .auth-avatar-option');
    for(var i=0;i<options.length;i++){
      var selected=options[i].getAttribute('data-avatar-id')===id;
      options[i].classList.toggle('is-selected',selected);
      options[i].setAttribute('aria-selected',selected?'true':'false');
    }
    var selectedText=document.getElementById('auth-avatar-selected');
    if(selectedText) selectedText.textContent=format(copy().avatarSelected,label);
  }

  function createButton(){
    var existing=document.getElementById('auth-login-button');
    if(existing) return existing;
    var button=document.createElement('button');
    button.id='auth-login-button';
    button.type='button';
    button.className='btn auth-login-button';
    button.setAttribute('aria-haspopup','dialog');
    button.innerHTML='<img class="auth-toolbar-avatar" src="'+avatarSrc('default')+'" alt="" aria-hidden="true"><span class="auth-state-dot" aria-hidden="true"></span>';
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
      '<button class="auth-account-mark" id="auth-avatar-trigger" type="button" aria-haspopup="true" aria-expanded="false" disabled><img class="auth-account-avatar-image" src="'+avatarSrc('default')+'" alt="" aria-hidden="true"><span class="auth-avatar-edit-badge" aria-hidden="true">✎</span></button>'+
      '<div class="auth-avatar-picker" id="auth-avatar-picker" hidden>'+
        '<div class="auth-avatar-picker-head"><strong id="auth-avatar-title"></strong><button id="auth-avatar-picker-close" type="button" aria-label=""><span aria-hidden="true">×</span></button></div>'+
        '<p id="auth-avatar-help"></p><div class="auth-avatar-grid" id="auth-avatar-grid" role="listbox"></div><p class="auth-avatar-selected" id="auth-avatar-selected" aria-live="polite"></p>'+
      '</div>'+
      '<h2 id="auth-account-title"></h2><p class="auth-account-description" id="auth-account-description"></p>'+
      '<div class="auth-account-profile" id="auth-account-profile" hidden><strong class="auth-account-name"></strong><span class="auth-account-email"></span><span class="auth-account-status"></span></div>'+
      '<p class="auth-account-notice" id="auth-account-notice" aria-live="polite"></p>'+
      '<div class="auth-account-actions"><button id="auth-account-login" type="button"></button><button id="auth-account-signup" type="button"></button><button id="auth-account-logout" type="button" hidden></button></div>'+
      '</section>';
    document.body.appendChild(modal);
    return modal;
  }

  function renderAvatarPicker(){
    var picker=document.getElementById('auth-avatar-picker');
    var grid=document.getElementById('auth-avatar-grid');
    var title=document.getElementById('auth-avatar-title');
    var help=document.getElementById('auth-avatar-help');
    var close=document.getElementById('auth-avatar-picker-close');
    if(!picker||!grid||!title||!help||!close)return;
    var text=copy();
    title.textContent=text.avatarTitle;
    help.textContent=text.avatarHelp;
    close.setAttribute('aria-label',text.avatarClose);
    grid.innerHTML='';
    AVATARS.forEach(function(avatar){
      var option=document.createElement('button');
      var label=avatarLabel(avatar.id);
      option.type='button';
      option.className='auth-avatar-option';
      option.setAttribute('role','option');
      option.setAttribute('data-avatar-id',avatar.id);
      option.setAttribute('aria-label',label);
      option.setAttribute('title',label);
      option.innerHTML='<img src="'+avatarSrc(avatar.id)+'" alt="" aria-hidden="true"><span>'+label+'</span>';
      option.addEventListener('click',function(){selectAvatar(avatar.id);});
      grid.appendChild(option);
    });
    updateAvatarUI();
  }

  function setAvatarPickerOpen(open){
    var picker=document.getElementById('auth-avatar-picker');
    var trigger=document.getElementById('auth-avatar-trigger');
    if(!picker||!trigger)return;
    open=!!open && !!currentUser;
    picker.hidden=!open;
    trigger.setAttribute('aria-expanded',open?'true':'false');
    if(open){renderAvatarPicker();window.setTimeout(function(){var chosen=picker.querySelector('.auth-avatar-option.is-selected')||picker.querySelector('.auth-avatar-option');if(chosen)chosen.focus();},0);}
  }

  function selectAvatar(id){
    if(!currentUser)return;
    var avatar=avatarById(id);
    try{localStorage.setItem(AVATAR_KEY,avatar.id);}catch(_e){}
    updateAvatarUI();
    try{document.dispatchEvent(new CustomEvent('genova:avatar-changed',{detail:{avatar:avatar.id,user:currentUser}}));}catch(_e){}
    window.setTimeout(function(){setAvatarPickerOpen(false);var trigger=document.getElementById('auth-avatar-trigger');if(trigger)trigger.focus();},110);
  }

  function updateButton(){
    var button=document.getElementById('auth-login-button');
    if(!button) return;
    var text=copy();
    var label=currentUser ? format(text.labelProfile,displayName(currentUser)) : text.labelLogin;
    button.classList.toggle('is-authenticated',!!currentUser);
    button.setAttribute('aria-label',label);
    button.setAttribute('title',label);
    updateAvatarUI();
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
    var trigger=document.getElementById('auth-avatar-trigger');
    if(!dialog||!title||!description||!profile||!login||!signup||!logout||!close||!trigger) return;
    dialog.setAttribute('dir',lang()==='ar'?'rtl':'ltr');
    dialog.classList.toggle('is-authenticated',!!currentUser);
    close.setAttribute('aria-label',text.close);
    trigger.disabled=!currentUser;
    trigger.setAttribute('aria-label',currentUser?text.avatarChange:'');
    trigger.setAttribute('title',currentUser?text.avatarChange:'');
    if(currentUser){
      title.textContent=text.profileTitle;
      description.textContent='';
      profile.hidden=false;
      profile.querySelector('.auth-account-name').textContent=displayName(currentUser);
      profile.querySelector('.auth-account-email').textContent=currentUser.email || '';
      profile.querySelector('.auth-account-status').textContent=text.active;
      login.hidden=true;signup.hidden=true;logout.hidden=false;logout.textContent=text.logout;
    }else{
      setAvatarPickerOpen(false);
      title.textContent=text.title;
      description.textContent=text.guest;
      profile.hidden=true;
      login.hidden=false;signup.hidden=false;logout.hidden=true;
      login.textContent=text.login;signup.textContent=text.signup;
    }
    renderAvatarPicker();
    updateAvatarUI();
  }

  function setNotice(message){var el=document.getElementById('auth-account-notice');if(el) el.textContent=message||'';}
  function openModal(){
    var modal=document.getElementById('auth-account-modal');
    if(!modal) return;
    lastFocused=document.activeElement;
    renderModal();setNotice('');modal.hidden=false;document.documentElement.classList.add('auth-account-open');
    window.setTimeout(function(){var target=currentUser?document.getElementById('auth-avatar-trigger'):document.getElementById('auth-account-login');if(target)target.focus();},0);
  }
  function closeModal(){
    var modal=document.getElementById('auth-account-modal');
    if(!modal||modal.hidden)return;
    setAvatarPickerOpen(false);
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
    document.getElementById('auth-avatar-trigger').addEventListener('click',function(){
      if(!currentUser)return;
      var picker=document.getElementById('auth-avatar-picker');
      setAvatarPickerOpen(!!(picker&&picker.hidden));
    });
    document.getElementById('auth-avatar-picker-close').addEventListener('click',function(){setAvatarPickerOpen(false);document.getElementById('auth-avatar-trigger').focus();});
    modal.addEventListener('click',function(event){
      if(event.target===modal){closeModal();return;}
      var picker=document.getElementById('auth-avatar-picker');
      var trigger=document.getElementById('auth-avatar-trigger');
      if(picker&&!picker.hidden&&!picker.contains(event.target)&&!trigger.contains(event.target))setAvatarPickerOpen(false);
    });
    document.getElementById('auth-account-login').addEventListener('click',function(){openIdentity('login');});
    document.getElementById('auth-account-signup').addEventListener('click',function(){openIdentity('signup');});
    document.getElementById('auth-account-logout').addEventListener('click',function(){
      if(identity&&typeof identity.logout==='function')identity.logout();
      else{currentUser=null;updateButton();renderModal();}
    });
    document.addEventListener('keydown',function(event){
      if(event.key!=='Escape'||modal.hidden)return;
      var picker=document.getElementById('auth-avatar-picker');
      if(picker&&!picker.hidden){setAvatarPickerOpen(false);document.getElementById('auth-avatar-trigger').focus();return;}
      closeModal();
    });
    document.addEventListener('app:set-lang',function(){syncWidgetLanguage();updateButton();if(!modal.hidden)renderModal();});
    document.addEventListener('genova:data-synced',function(){updateAvatarUI();if(!modal.hidden)renderAvatarPicker();});
    window.addEventListener('storage',function(event){if(event.key===AVATAR_KEY||event.key===BOUND_KEY)updateAvatarUI();});
    if(!bindIdentity()){
      var tries=0;
      (function retry(){if(bindIdentity())return;if(++tries<30)window.setTimeout(retry,150);})();
    }
  }

  window.GenovaAuth={
    getUser:function(){return currentUser;},
    getAvatar:function(){return storedAvatarId();},
    setAvatar:function(id){selectAvatar(id);},
    avatars:function(){return AVATARS.map(function(item){return{id:item.id,file:item.file,label:avatarLabel(item.id)};});},
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
