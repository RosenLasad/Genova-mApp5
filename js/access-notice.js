/* Genova mApp - messaggi coerenti per funzioni riservate ad Account/Premium. */
(function(){
  'use strict';
  if(window.GenovaAccessNotice)return;

  var TEXT={
    it:{close:'Chiudi',signup:'Crea account gratuito',login:'Ho già un account',premium:'Scopri Premium',ok:'Chiudi'},
    en:{close:'Close',signup:'Create free account',login:'I already have an account',premium:'Discover Premium',ok:'Close'},
    es:{close:'Cerrar',signup:'Crear cuenta gratuita',login:'Ya tengo una cuenta',premium:'Descubrir Premium',ok:'Cerrar'},
    fr:{close:'Fermer',signup:'Créer un compte gratuit',login:'J’ai déjà un compte',premium:'Découvrir Premium',ok:'Fermer'},
    ar:{close:'إغلاق',signup:'إنشاء حساب مجاني',login:'لدي حساب بالفعل',premium:'اكتشف Premium',ok:'إغلاق'},
    ru:{close:'Закрыть',signup:'Создать бесплатный аккаунт',login:'У меня уже есть аккаунт',premium:'Узнать о Premium',ok:'Закрыть'},
    zh:{close:'关闭',signup:'创建免费账户',login:'我已有账户',premium:'了解 Premium',ok:'关闭'},
    lij:{close:'Særa',signup:'Crea account gratis',login:'Gh’ò za un account',premium:'Descovri Premium',ok:'Særa'}
  };

  var lastFocused=null;

  function lang(){
    var value='it';
    try{value=localStorage.getItem('lang')||document.documentElement.lang||'it';}catch(_e){}
    value=String(value||'it').toLowerCase().split(/[-_]/)[0];
    return TEXT[value]?value:'it';
  }
  function t(){return TEXT[lang()]||TEXT.it;}

  function ensure(){
    var modal=document.getElementById('genova-access-notice');
    if(modal)return modal;
    modal=document.createElement('div');
    modal.id='genova-access-notice';
    modal.hidden=true;
    modal.innerHTML='<section class="access-notice-dialog" role="dialog" aria-modal="true" aria-labelledby="access-notice-title" aria-describedby="access-notice-message">'+
      '<button class="access-notice-close" type="button"><span aria-hidden="true">×</span></button>'+
      '<div class="access-notice-icon" aria-hidden="true">★</div>'+
      '<h2 id="access-notice-title"></h2>'+
      '<p id="access-notice-message"></p>'+
      '<div class="access-notice-progress" id="access-notice-progress" hidden><span></span><strong></strong></div>'+
      '<div class="access-notice-actions" id="access-notice-actions"></div>'+
      '</section>';
    document.body.appendChild(modal);
    modal.querySelector('.access-notice-close').addEventListener('click',close);
    modal.addEventListener('click',function(event){if(event.target===modal)close();});
    return modal;
  }

  function button(label,kind,handler){
    var el=document.createElement('button');
    el.type='button';
    el.className='access-notice-button '+(kind||'');
    el.textContent=label;
    el.addEventListener('click',handler);
    return el;
  }

  function close(){
    var modal=document.getElementById('genova-access-notice');
    if(!modal||modal.hidden)return;
    modal.hidden=true;
    document.documentElement.classList.remove('access-notice-open');
    if(lastFocused&&typeof lastFocused.focus==='function')lastFocused.focus();
  }

  function show(options){
    options=options||{};
    var modal=ensure();
    var copy=t();
    var dialog=modal.querySelector('.access-notice-dialog');
    var title=document.getElementById('access-notice-title');
    var message=document.getElementById('access-notice-message');
    var actions=document.getElementById('access-notice-actions');
    var progress=document.getElementById('access-notice-progress');
    var closeButton=modal.querySelector('.access-notice-close');
    var mode=options.mode==='limit'?'limit':'login';

    dialog.setAttribute('dir',lang()==='ar'?'rtl':'ltr');
    dialog.classList.toggle('is-limit',mode==='limit');
    title.textContent=String(options.title||'');
    message.textContent=String(options.message||'');
    closeButton.setAttribute('aria-label',copy.close);
    actions.innerHTML='';

    var current=Number(options.current);
    var limit=Number(options.limit);
    if(mode==='limit'&&Number.isFinite(current)&&Number.isFinite(limit)&&limit>0){
      progress.hidden=false;
      var pct=Math.max(0,Math.min(100,(current/limit)*100));
      progress.querySelector('span').style.setProperty('--access-progress',pct+'%');
      progress.querySelector('strong').textContent=current+' / '+limit;
    }else{
      progress.hidden=true;
      progress.querySelector('strong').textContent='';
    }

    if(mode==='login'){
      actions.appendChild(button(copy.signup,'is-primary',function(){close();if(window.GenovaAuth&&typeof window.GenovaAuth.open==='function')window.GenovaAuth.open('signup');}));
      actions.appendChild(button(copy.login,'is-secondary',function(){close();if(window.GenovaAuth&&typeof window.GenovaAuth.open==='function')window.GenovaAuth.open('login');}));
    }else{
      actions.appendChild(button(copy.premium,'is-premium',function(){close();if(window.GenovaSubscription&&typeof window.GenovaSubscription.open==='function')window.GenovaSubscription.open();}));
      actions.appendChild(button(copy.ok,'is-secondary',close));
    }

    lastFocused=document.activeElement;
    modal.hidden=false;
    document.documentElement.classList.add('access-notice-open');
    window.setTimeout(function(){var first=actions.querySelector('button');if(first)first.focus();},0);
    return false;
  }

  document.addEventListener('keydown',function(event){
    var modal=document.getElementById('genova-access-notice');
    if(event.key==='Escape'&&modal&&!modal.hidden)close();
  });

  window.GenovaAccessNotice={show:show,close:close};
})();
