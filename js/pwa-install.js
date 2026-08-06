/* Genova mApp: installazione PWA con interfaccia tradotta. */
(function(){
  'use strict';
  if(window.__GENOVA_PWA_INSTALL__) return;
  window.__GENOVA_PWA_INSTALL__ = true;

  var deferredPrompt = null;
  var lastFocused = null;
  var currentMode = 'ready';

  var STRINGS = {
    it:{
      label:'Installa Genova mApp', title:'Installa Genova mApp',
      body:'Puoi installare Genova mApp su questo dispositivo e aprirla rapidamente come una normale applicazione. Preferiti, percorsi e appunti salvati resteranno disponibili su questo dispositivo.',
      account:'Quando sarà disponibile l’accesso con account, potrai recuperare anche i dati associati al tuo utente registrato.',
      cancel:'Annulla', install:'Installa app', done:'Ho capito',
      iosTitle:'Installa su iPhone o iPad',
      iosSafari:'In Safari, tocca Condividi, scegli “Aggiungi alla schermata Home”, attiva “Apri come app web” e conferma con “Aggiungi”.',
      iosOther:'Apri genovamapp.com in Safari. Poi tocca Condividi, scegli “Aggiungi alla schermata Home” e conferma con “Aggiungi”.',
      manual:'Il browser non consente di avviare automaticamente l’installazione. Apri il menu del browser e scegli “Installa app” oppure “Aggiungi alla schermata Home”.'
    },
    en:{
      label:'Install Genova mApp', title:'Install Genova mApp',
      body:'You can install Genova mApp on this device and open it quickly like a regular app. Saved favourites, routes and notes will remain available on this device.',
      account:'When account access becomes available, you will also be able to retrieve the data linked to your registered user.',
      cancel:'Cancel', install:'Install app', done:'Got it',
      iosTitle:'Install on iPhone or iPad',
      iosSafari:'In Safari, tap Share, choose “Add to Home Screen”, enable “Open as Web App”, then confirm with “Add”.',
      iosOther:'Open genovamapp.com in Safari. Then tap Share, choose “Add to Home Screen”, and confirm with “Add”.',
      manual:'This browser cannot start installation automatically. Open the browser menu and choose “Install app” or “Add to Home Screen”.'
    },
    es:{
      label:'Instalar Genova mApp', title:'Instala Genova mApp',
      body:'Puedes instalar Genova mApp en este dispositivo y abrirla rápidamente como una aplicación normal. Los favoritos, recorridos y apuntes guardados seguirán disponibles en este dispositivo.',
      account:'Cuando esté disponible el acceso con cuenta, también podrás recuperar los datos asociados a tu usuario registrado.',
      cancel:'Cancelar', install:'Instalar app', done:'Entendido',
      iosTitle:'Instalar en iPhone o iPad',
      iosSafari:'En Safari, toca Compartir, elige “Añadir a pantalla de inicio”, activa “Abrir como app web” y confirma con “Añadir”.',
      iosOther:'Abre genovamapp.com en Safari. Después toca Compartir, elige “Añadir a pantalla de inicio” y confirma con “Añadir”.',
      manual:'El navegador no permite iniciar automáticamente la instalación. Abre su menú y elige “Instalar aplicación” o “Añadir a pantalla de inicio”.'
    },
    fr:{
      label:'Installer Genova mApp', title:'Installer Genova mApp',
      body:'Vous pouvez installer Genova mApp sur cet appareil et l’ouvrir rapidement comme une application normale. Les favoris, parcours et notes enregistrés resteront disponibles sur cet appareil.',
      account:'Lorsque l’accès par compte sera disponible, vous pourrez également récupérer les données associées à votre profil enregistré.',
      cancel:'Annuler', install:'Installer l’app', done:'J’ai compris',
      iosTitle:'Installer sur iPhone ou iPad',
      iosSafari:'Dans Safari, touchez Partager, choisissez « Sur l’écran d’accueil », activez « Ouvrir comme app web », puis confirmez avec « Ajouter ».',
      iosOther:'Ouvrez genovamapp.com dans Safari. Touchez ensuite Partager, choisissez « Sur l’écran d’accueil » et confirmez avec « Ajouter ».',
      manual:'Ce navigateur ne permet pas de lancer automatiquement l’installation. Ouvrez son menu et choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ». '
    },
    ar:{
      label:'تثبيت Genova mApp', title:'تثبيت Genova mApp',
      body:'يمكنك تثبيت Genova mApp على هذا الجهاز وفتحها بسرعة كتطبيق عادي. ستبقى الأماكن المفضلة والمسارات والملاحظات المحفوظة متاحة على هذا الجهاز.',
      account:'عندما تتوفر إمكانية الدخول بالحساب، ستتمكن أيضًا من استعادة البيانات المرتبطة بالمستخدم المسجل.',
      cancel:'إلغاء', install:'تثبيت التطبيق', done:'فهمت',
      iosTitle:'التثبيت على iPhone أو iPad',
      iosSafari:'في Safari، اضغط على مشاركة، ثم اختر «إضافة إلى الشاشة الرئيسية»، وفعّل «فتح كتطبيق ويب»، ثم أكد بالضغط على «إضافة».',
      iosOther:'افتح genovamapp.com في Safari، ثم اضغط على مشاركة واختر «إضافة إلى الشاشة الرئيسية» وأكد بالضغط على «إضافة».',
      manual:'لا يسمح هذا المتصفح ببدء التثبيت تلقائيًا. افتح قائمة المتصفح واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».'
    },
    ru:{
      label:'Установить Genova mApp', title:'Установить Genova mApp',
      body:'Вы можете установить Genova mApp на это устройство и быстро открывать её как обычное приложение. Сохранённые избранные места, маршруты и заметки останутся доступны на этом устройстве.',
      account:'Когда станет доступен вход в аккаунт, вы также сможете восстановить данные, связанные с зарегистрированным пользователем.',
      cancel:'Отмена', install:'Установить', done:'Понятно',
      iosTitle:'Установка на iPhone или iPad',
      iosSafari:'В Safari нажмите «Поделиться», выберите «На экран Домой», включите «Открыть как веб-приложение» и подтвердите кнопкой «Добавить».',
      iosOther:'Откройте genovamapp.com в Safari. Затем нажмите «Поделиться», выберите «На экран Домой» и подтвердите кнопкой «Добавить».',
      manual:'Этот браузер не может запустить установку автоматически. Откройте меню браузера и выберите «Установить приложение» или «Добавить на главный экран».'
    },
    zh:{
      label:'安装 Genova mApp', title:'安装 Genova mApp',
      body:'你可以在此设备上安装 Genova mApp，并像普通应用一样快速打开。已保存的收藏地点、路线和笔记将继续保存在此设备上。',
      account:'账户登录功能推出后，你还可以恢复与注册用户关联的数据。',
      cancel:'取消', install:'安装应用', done:'知道了',
      iosTitle:'在 iPhone 或 iPad 上安装',
      iosSafari:'在 Safari 中点按“共享”，选择“添加到主屏幕”，启用“作为网页 App 打开”，然后点按“添加”。',
      iosOther:'请在 Safari 中打开 genovamapp.com，然后点按“共享”，选择“添加到主屏幕”并确认“添加”。',
      manual:'此浏览器无法自动启动安装。请打开浏览器菜单，选择“安装应用”或“添加到主屏幕”。'
    },
    lij:{
      label:'Installa Genova mApp', title:'Installa Genova mApp',
      body:'Ti peu installâ Genova mApp in sciô dispositivo e arvîla comme ’na app normale. Preferîi, percorsi e appunti sarvæ restan disponibili in sciô dispositivo.',
      account:'Quande o login o saià disponibbile, ti poiæ recuperâ ascì i dæti ligæ a-o teu utente registrou.',
      cancel:'Anulla', install:'Installa app', done:'Ò capîo',
      iosTitle:'Installa in sce iPhone ò iPad',
      iosSafari:'In Safari, tocca Condividdi, çerni “Azonzi a-a schermâ prinçipâ”, attiva “Arvi comme app web” e conferma con “Azonzi”.',
      iosOther:'Arvi genovamapp.com in Safari. Dòppo tocca Condividdi, çerni “Azonzi a-a schermâ prinçipâ” e conferma con “Azonzi”.',
      manual:'O browser o no peu avviâ l’installaçion in automatico. Arvi o menu do browser e çerni “Installa app” ò “Azonzi a-a schermâ prinçipâ”.'
    }
  };

  function lang(){
    try{
      return String(localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it')
        .toLowerCase().split(/[-_]/)[0];
    }catch(_e){ return 'it'; }
  }

  function copy(){ return STRINGS[lang()] || STRINGS.it; }
  function isIos(){
    return /iphone|ipad|ipod/i.test(navigator.userAgent || '') ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  function isIosSafari(){ return isIos() && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(navigator.userAgent || ''); }
  function isStandalone(){
    return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  }

  function createButton(){
    var existing = document.getElementById('pwa-install-button');
    if(existing) return existing;
    var button = document.createElement('button');
    button.id = 'pwa-install-button';
    button.type = 'button';
    button.className = 'btn pwa-install-button';
    button.setAttribute('aria-haspopup','dialog');
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M12 6v9"/><path d="m8.5 11.5 3.5 3.5 3.5-3.5"/><path d="M9 18h6"/></svg>';
    var right = document.querySelector('#app > header .toolbar-right');
    if(right) right.appendChild(button);
    return button;
  }

  function createModal(){
    var existing = document.getElementById('pwa-install-modal');
    if(existing) return existing;
    var modal = document.createElement('div');
    modal.id = 'pwa-install-modal';
    modal.hidden = true;
    modal.innerHTML = '<section class="pwa-install-dialog" role="dialog" aria-modal="true" aria-labelledby="pwa-install-title" aria-describedby="pwa-install-description">' +
      '<div class="pwa-install-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M12 6v9"/><path d="m8.5 11.5 3.5 3.5 3.5-3.5"/><path d="M9 18h6"/></svg></div>' +
      '<h2 id="pwa-install-title"></h2>' +
      '<p id="pwa-install-description"></p>' +
      '<p class="pwa-install-account" id="pwa-install-account"></p>' +
      '<div class="pwa-install-actions"><button id="pwa-install-cancel" type="button"></button><button id="pwa-install-confirm" type="button"></button></div>' +
      '</section>';
    document.body.appendChild(modal);
    return modal;
  }

  function updateButton(){
    var button = document.getElementById('pwa-install-button');
    if(!button) return;
    var text = copy().label;
    button.setAttribute('aria-label', text);
    button.setAttribute('title', text);
    button.hidden = isStandalone();
  }

  function renderModal(mode){
    currentMode = mode;
    var text = copy();
    var dialog = document.querySelector('#pwa-install-modal .pwa-install-dialog');
    var title = document.getElementById('pwa-install-title');
    var description = document.getElementById('pwa-install-description');
    var account = document.getElementById('pwa-install-account');
    var cancel = document.getElementById('pwa-install-cancel');
    var confirm = document.getElementById('pwa-install-confirm');
    if(!dialog || !title || !description || !account || !cancel || !confirm) return;
    dialog.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
    account.textContent = text.account;
    cancel.textContent = text.cancel;
    if(mode === 'ios'){
      title.textContent = text.iosTitle;
      description.textContent = isIosSafari() ? text.iosSafari : text.iosOther;
      confirm.textContent = text.done;
    }else if(mode === 'manual'){
      title.textContent = text.title;
      description.textContent = text.manual;
      confirm.textContent = text.done;
    }else{
      title.textContent = text.title;
      description.textContent = text.body;
      confirm.textContent = text.install;
    }
  }

  function openModal(){
    if(isStandalone()) return;
    var modal = document.getElementById('pwa-install-modal');
    if(!modal) return;
    lastFocused = document.activeElement;
    renderModal(isIos() ? 'ios' : (deferredPrompt ? 'ready' : 'manual'));
    modal.hidden = false;
    document.documentElement.classList.add('pwa-install-open');
    window.setTimeout(function(){
      var confirm = document.getElementById('pwa-install-confirm');
      if(confirm) confirm.focus();
    },0);
  }

  function closeModal(){
    var modal = document.getElementById('pwa-install-modal');
    if(!modal || modal.hidden) return;
    modal.hidden = true;
    document.documentElement.classList.remove('pwa-install-open');
    if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  async function confirmInstall(){
    if(currentMode !== 'ready' || !deferredPrompt){ closeModal(); return; }
    var promptEvent = deferredPrompt;
    deferredPrompt = null;
    try{
      await promptEvent.prompt();
      if(promptEvent.userChoice) await promptEvent.userChoice;
    }catch(_e){}
    closeModal();
    updateButton();
  }

  function boot(){
    var button = createButton();
    var modal = createModal();
    updateButton();
    button.addEventListener('click', openModal);
    document.getElementById('pwa-install-cancel').addEventListener('click', closeModal);
    document.getElementById('pwa-install-confirm').addEventListener('click', confirmInstall);
    modal.addEventListener('click', function(event){ if(event.target === modal) closeModal(); });
    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape' && !modal.hidden) closeModal();
    });
    document.addEventListener('app:set-lang', function(){
      updateButton();
      if(!modal.hidden) renderModal(currentMode);
    });
    var displayMode = window.matchMedia('(display-mode: standalone)');
    if(displayMode && typeof displayMode.addEventListener === 'function') displayMode.addEventListener('change', updateButton);
  }

  window.addEventListener('beforeinstallprompt', function(event){
    event.preventDefault();
    deferredPrompt = event;
    updateButton();
  });

  window.addEventListener('appinstalled', function(){
    deferredPrompt = null;
    closeModal();
    updateButton();
  });

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();

