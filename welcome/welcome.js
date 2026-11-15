/* Genova mApp — benvenuto Blu Porto, senza dipendenze e senza dati aggiuntivi. */
(function(){
  'use strict';
  if(window.GMWelcome)return;
  var root=null, pending=!hasDirectDestination(), dismissed=false, languagesOpen=false;
  var authSettled=false, authFallback=null, inertNodes=[], returnFocus=null;
  var LANGUAGES=[['it','Italiano'],['en','English'],['es','Español'],['fr','Français'],['ar','العربية'],['ru','Русский'],['zh','中文'],['lij','Zeneize']];
  var TEXT={
    it:{welcome:'Benvenuto in',back:'Bentornato in',subtitle:'La città ti aspetta. Da dove vuoi cominciare?',short:'Da dove vuoi cominciare?',map:'Esplora la mappa',menu:'Menu principale',login:'Accedi / Iscriviti',guide:'Guida',language:'Lingua',close:'Chiudi e vai alla mappa',unavailable:'Questa funzione non è ancora disponibile. Riprova tra un momento.',loading:'Ripristino della sessione…',choose:'Scegli la lingua',mascot:'Il Grifoncino ti dà il benvenuto'},
    en:{welcome:'Welcome to',back:'Welcome back to',subtitle:'The city awaits. Where would you like to start?',short:'Where would you like to start?',map:'Explore the map',menu:'Main menu',login:'Log in / Sign up',guide:'Guide',language:'Language',close:'Close and open the map',unavailable:'This feature is not ready yet. Please try again shortly.',loading:'Restoring your session…',choose:'Choose a language',mascot:'The little griffin welcomes you'},
    es:{welcome:'Bienvenido a',back:'Bienvenido de nuevo a',subtitle:'La ciudad te espera. ¿Por dónde quieres empezar?',short:'¿Por dónde quieres empezar?',map:'Explora el mapa',menu:'Menú principal',login:'Acceder / Registrarse',guide:'Guía',language:'Idioma',close:'Cerrar e ir al mapa',unavailable:'Esta función aún no está disponible. Inténtalo de nuevo en un momento.',loading:'Restaurando la sesión…',choose:'Elige un idioma',mascot:'El pequeño grifo te da la bienvenida'},
    fr:{welcome:'Bienvenue sur',back:'Bon retour sur',subtitle:'La ville vous attend. Par où voulez-vous commencer ?',short:'Par où voulez-vous commencer ?',map:'Explorer la carte',menu:'Menu principal',login:'Connexion / Inscription',guide:'Guide',language:'Langue',close:'Fermer et ouvrir la carte',unavailable:'Cette fonction n’est pas encore disponible. Réessayez dans un instant.',loading:'Restauration de la session…',choose:'Choisir une langue',mascot:'Le petit griffon vous souhaite la bienvenue'},
    ar:{welcome:'مرحبًا بك في',back:'مرحبًا بعودتك إلى',subtitle:'المدينة بانتظارك. من أين تريد أن تبدأ؟',short:'من أين تريد أن تبدأ؟',map:'استكشف الخريطة',menu:'القائمة الرئيسية',login:'دخول / إنشاء حساب',guide:'الدليل',language:'اللغة',close:'إغلاق وفتح الخريطة',unavailable:'هذه الميزة غير متاحة بعد. حاول مجددًا بعد قليل.',loading:'جارٍ استعادة الجلسة…',choose:'اختر اللغة',mascot:'الغريفون الصغير يرحب بك'},
    ru:{welcome:'Добро пожаловать в',back:'С возвращением в',subtitle:'Город ждёт вас. С чего хотите начать?',short:'С чего хотите начать?',map:'Открыть карту',menu:'Главное меню',login:'Вход / Регистрация',guide:'Руководство',language:'Язык',close:'Закрыть и открыть карту',unavailable:'Эта функция пока недоступна. Повторите попытку чуть позже.',loading:'Восстановление сеанса…',choose:'Выберите язык',mascot:'Маленький грифон приветствует вас'},
    zh:{welcome:'欢迎来到',back:'欢迎回到',subtitle:'城市等你探索。你想从哪里开始？',short:'你想从哪里开始？',map:'探索地图',menu:'主菜单',login:'登录 / 注册',guide:'指南',language:'语言',close:'关闭并打开地图',unavailable:'此功能尚未准备就绪，请稍后重试。',loading:'正在恢复登录状态…',choose:'选择语言',mascot:'小狮鹫欢迎你'},
    lij:{welcome:'Benvegnûo in',back:'Bentornou in',subtitle:'A çittæ a t’aspetta. Da dove ti veu comensâ?',short:'Da dove ti veu comensâ?',map:'Esplòra a mappa',menu:'Menù prinçipâ',login:'Intra / Registrite',guide:'Guida',language:'Lengua',close:'Særa e vanni a-a mappa',unavailable:'Sta fonçion a no l’é ancon pronta. Preuva torna fra un pittin.',loading:'Repiggio da session…',choose:'Çerni a lengua',mascot:'O Grifoncino o te dà o benvegnûo'}
  };
  var ICONS={
    map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',
    menu:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    login:'<circle cx="12" cy="7" r="4"/><path d="M3 22v-2a9 9 0 0 1 18 0v2H3Z"/>',
    guide:'<path d="M12 5C8 2 4 3 2 4v16c3-2 7-2 10 0 3-2 7-2 10 0V4c-3-2-7-2-10 1Zm0 0v15"/>',
    language:'<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20M4 6h16M4 18h16"/>',
    anchor:'<circle cx="12" cy="4" r="2"/><path d="M12 6v15M8 9h8M4 14v4c3 0 4 3 8 3s5-3 8-3v-4M2 16l2-2 2 2m12 0 2-2 2 2"/>',
    chevron:'<path d="m5 9 7 7 7-7"/>'
  };
  function icon(name){return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+ICONS[name]+'</svg>';}
  function hasDirectDestination(){
    try{
      var url=new URL(window.location.href);
      if(url.hash&&url.hash!=='#')return true;
      return ['qr','evento','doc','id','confirmation_token','recovery_token','invite_token'].some(function(k){return !!String(url.searchParams.get(k)||'').trim();})||url.searchParams.get('vicinoame')==='1';
    }catch(_e){return false;}
  }
  function language(){
    var lang=document.documentElement.getAttribute('lang')||'it';
    try{lang=localStorage.getItem('lang')||lang;}catch(_e){}
    lang=String(lang).toLowerCase().split(/[-_]/)[0];
    return TEXT[lang]?lang:'it';
  }
  function copy(){return TEXT[language()];}
  function user(){try{return window.GenovaAuth&&window.GenovaAuth.getUser();}catch(_e){return null;}}
  function query(selector){return root&&root.querySelector(selector);}
  function setText(selector,value){var node=query(selector);if(node)node.textContent=value;}
  function announce(message){setText('#gm-welcome-status',message||'');}
  function button(action,style){return '<button type="button" class="gm-welcome-button '+(style||'')+'" data-welcome-action="'+action+'">'+icon(action)+'<span data-welcome-copy="'+action+'"></span></button>';}
  function render(){
    if(!root)return;
    var text=copy(),lang=language();
    root.setAttribute('lang',lang);root.setAttribute('dir',lang==='ar'?'rtl':'ltr');
    setText('#gm-welcome-greeting',authSettled?(user()?text.back:text.welcome):'');
    setText('#gm-welcome-subtitle',text.subtitle);setText('#gm-welcome-short',text.short);
    root.querySelectorAll('[data-welcome-copy]').forEach(function(node){node.textContent=text[node.getAttribute('data-welcome-copy')];});
    query('.gm-welcome-close').setAttribute('aria-label',text.close);
    query('.gm-welcome-character').alt=text.mascot;
    query('[data-welcome-action="login"]').hidden=!authSettled||!!user();
    query('.gm-welcome-tools').classList.toggle('is-authenticated',authSettled&&!!user());
    var active=LANGUAGES.find(function(l){return l[0]===lang;});
    setText('#gm-welcome-language-label',text.language+' · '+active[1]);
    query('#gm-welcome-languages').setAttribute('aria-label',text.choose);
    root.querySelectorAll('[data-welcome-lang]').forEach(function(node){node.setAttribute('aria-pressed',String(node.getAttribute('data-welcome-lang')===lang));});
    announce(authSettled?'':text.loading);
  }
  function setLanguages(open){
    if(!root)return;
    languagesOpen=!!open;
    query('#gm-welcome-languages').hidden=!languagesOpen;
    query('[data-welcome-action="language"]').setAttribute('aria-expanded',String(languagesOpen));
    if(languagesOpen){
      var selected=query('[data-welcome-lang="'+language()+'"]');
      if(selected)selected.focus({preventScroll:true});
      // Keep the expanded list visible also when the viewport is short.
      query('#gm-welcome-languages').scrollIntoView({block:'nearest'});
    }
  }
  function backgroundInert(){
    Array.from(document.body.children).forEach(function(node){
      if(node===root||/^(SCRIPT|STYLE|LINK)$/.test(node.tagName))return;
      inertNodes.push({node:node,value:node.inert});node.inert=true;
    });
  }
  function close(restoreFocus){
    if(dismissed)return;
    dismissed=true;pending=false;clearTimeout(authFallback);
    if(root){root.remove();root=null;}
    inertNodes.forEach(function(entry){entry.node.inert=entry.value;});inertNodes=[];
    document.documentElement.classList.remove('gm-welcome-pending','gm-welcome-open');
    document.removeEventListener('keydown',onKey,true);
    document.removeEventListener('app:set-lang',render);
    document.removeEventListener('genova:auth-changed',onAuth);
    window.removeEventListener('i18n:changed',render);
    window.removeEventListener('popstate',onBack);
    window.removeEventListener('hashchange',onLocation);
    document.dispatchEvent(new CustomEvent('gm:welcome-closed'));
    if(restoreFocus!==false){
      var target=document.getElementById('title-btn')||returnFocus;
      if(target&&target.isConnected)target.focus({preventScroll:true});
    }
  }
  function onAuth(){authSettled=true;clearTimeout(authFallback);authFallback=null;render();}
  function onBack(){close(true);}
  function onLocation(){if(hasDirectDestination())close(false);}
  function activate(action){
    if(action==='language'){setLanguages(!languagesOpen);return;}
    if(action==='map'){close(true);return;}
    var handler=action==='menu'?window.gmOpenNewHome:action==='guide'?window.gmOpenNewHomeGuide:window.GenovaAuth&&window.GenovaAuth.open;
    if(typeof handler!=='function'){announce(copy().unavailable);return;}
    if(action==='login'&&(!authSettled||user()))return;
    var opener=document.getElementById('title-btn');
    close(false);
    if(action==='login')window.GenovaAuth.open('login');
    else handler(opener);
  }
  function onKey(event){
    if(!root)return;
    if(event.key==='Escape'){
      event.preventDefault();event.stopImmediatePropagation();
      if(languagesOpen){setLanguages(false);query('[data-welcome-action="language"]').focus();}
      else close(true);
      return;
    }
    if(languagesOpen&&(event.key==='ArrowDown'||event.key==='ArrowUp')){
      var langs=Array.from(root.querySelectorAll('[data-welcome-lang]'));
      var at=langs.indexOf(document.activeElement);
      if(at!==-1){event.preventDefault();langs[(at+(event.key==='ArrowDown'?1:langs.length-1))%langs.length].focus();return;}
    }
    if(event.key!=='Tab')return;
    var nodes=Array.from(root.querySelectorAll('button:not(:disabled)')).filter(function(node){return !node.hidden&&node.getClientRects().length;});
    if(!nodes.length)return;
    var current=nodes.indexOf(document.activeElement);
    if(event.shiftKey&&current<=0){event.preventDefault();nodes[nodes.length-1].focus();}
    else if(!event.shiftKey&&(current===-1||current===nodes.length-1)){event.preventDefault();nodes[0].focus();}
  }
  function boot(){
    if(!pending||dismissed)return;
    // A destination can also have been selected by another startup script.
    if(hasDirectDestination()){close(false);return;}
    returnFocus=document.activeElement;
    root=document.createElement('div');root.id='gm-welcome-overlay';
    root.innerHTML='<section class="gm-welcome-card" role="dialog" aria-modal="true" aria-labelledby="gm-welcome-title" aria-describedby="gm-welcome-short" tabindex="-1">'+
      '<button type="button" class="gm-welcome-close" aria-label="Chiudi e vai alla mappa">×</button>'+
      '<div class="gm-welcome-visual"><img class="gm-welcome-character" src="welcome/images/grifoncino-blu-porto.png" width="1086" height="1448" alt="" fetchpriority="high" decoding="async"></div>'+
      '<div class="gm-welcome-intro"><h2 id="gm-welcome-title"><span id="gm-welcome-greeting"></span><span class="gm-welcome-brand" dir="ltr">Genova mApp!</span></h2><div class="gm-welcome-anchor" aria-hidden="true"><span></span>'+icon('anchor')+'<span></span></div><p id="gm-welcome-subtitle"></p><p id="gm-welcome-short"></p></div>'+
      '<div class="gm-welcome-main">'+button('map','is-primary')+button('menu')+'</div>'+
      '<div class="gm-welcome-sea" aria-hidden="true"><svg viewBox="0 0 720 44" preserveAspectRatio="none"><path d="M0 33c80 15 110-34 199-13s93 21 163 1 95 6 151 7 82-24 207-2" fill="none" stroke="currentColor" stroke-width="3"/><path d="m619 42 12-8 13 1 7-12 20 2 13 9 36 3v7Z" fill="currentColor" opacity=".45"/><path d="M665 26h10l-1-17h-8Zm1-18h8V5h-8Zm3-4h2V1h-2Z" fill="currentColor"/><path d="M668 10v13m3-13v13" stroke="#c7efff" stroke-width="1"/></svg></div>'+
      '<div class="gm-welcome-tools">'+button('login')+button('guide')+'<button type="button" class="gm-welcome-button gm-welcome-language" data-welcome-action="language" aria-expanded="false" aria-controls="gm-welcome-languages">'+icon('language')+'<span id="gm-welcome-language-label"></span>'+icon('chevron')+'</button></div>'+
      '<div id="gm-welcome-languages" class="gm-welcome-languages" role="group" hidden>'+LANGUAGES.map(function(l){return '<button type="button" data-welcome-lang="'+l[0]+'" lang="'+l[0]+'" dir="'+(l[0]==='ar'?'rtl':'ltr')+'" aria-pressed="false">'+l[1]+'<span aria-hidden="true">✓</span></button>';}).join('')+'</div>'+
      '<p id="gm-welcome-status" class="gm-welcome-status" role="status" aria-live="polite"></p></section>';
    document.body.appendChild(root);backgroundInert();
    document.documentElement.classList.add('gm-welcome-open');
    root.addEventListener('click',function(event){
      var lang=event.target.closest('[data-welcome-lang]');
      if(lang){
        if(typeof window.setLang!=='function'){announce(copy().unavailable);return;}
        window.setLang(lang.getAttribute('data-welcome-lang'));render();setLanguages(false);query('[data-welcome-action="language"]').focus();return;
      }
      if(event.target.closest('.gm-welcome-close')){close(true);return;}
      var button=event.target.closest('[data-welcome-action]');
      if(button)activate(button.getAttribute('data-welcome-action'));
    });
    document.addEventListener('keydown',onKey,true);
    document.addEventListener('app:set-lang',render);
    document.addEventListener('genova:auth-changed',onAuth);
    window.addEventListener('i18n:changed',render);
    window.addEventListener('popstate',onBack);
    window.addEventListener('hashchange',onLocation);
    authSettled=!!(window.GenovaAuth&&window.GenovaAuth.isReady&&window.GenovaAuth.isReady());
    render();query('.gm-welcome-card').focus({preventScroll:true});
    if(!authSettled){
      if(window.GenovaAuth&&window.GenovaAuth.whenReady){window.GenovaAuth.whenReady().then(function(){if(root)onAuth();});}
      // The map and the rest of the panel remain usable even if Identity is unavailable.
      authFallback=setTimeout(function(){if(root)onAuth();},6000);
    }
  }
  window.GMWelcome={isBlocking:function(){return pending&&!dismissed;},close:close};
  if(pending){
    document.documentElement.classList.add('gm-welcome-pending');
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
    else boot();
  }
})();
