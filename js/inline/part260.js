
(function(){
  function $(sel, root){ return (root || document).querySelector(sel); }

  var panel   = document.getElementById('contactPanel');
  var overlay = document.getElementById('contact-overlay');
  var closeBtn = document.getElementById('contactPanelClose');
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contactSuccess');

  if(!panel || !overlay) return;

  function currentLangSafe(){
    try{
      if(typeof currentLang === 'function') return currentLang();
      return (document.documentElement.getAttribute('lang') || (localStorage && localStorage.getItem('lang')) || 'it');
    }catch(_){
      return 'it';
    }
  }

  function normalizeLangSafe(lang){
    if(typeof normalizeLang === 'function') return normalizeLang(lang);
    lang = String(lang || 'it').toLowerCase();
    if(lang.indexOf('lij') === 0) return 'lij';
    if(lang.indexOf('it')  === 0) return 'it';
    if(lang.indexOf('en')  === 0) return 'en';
    if(lang.indexOf('es')  === 0) return 'es';
    if(lang.indexOf('fr')  === 0) return 'fr';
    if(lang.indexOf('ar')  === 0) return 'ar';
    if(lang.indexOf('ru')  === 0) return 'ru';
    if(lang.indexOf('zh')  === 0 || lang.indexOf('cn') === 0) return 'zh';
    return 'it';
  }

  var T = {
    it:{ title:'Contattaci', name_label:'Nome (opzionale)', email_label:'Email (opzionale)', msg_label:'Messaggio', send:'Invia', success:'Messaggio inviato. Grazie!', note:'Se non rispondiamo entro 48h, puoi scrivere direttamente a info@sdac.it.' },
    en:{ title:'Contact us', name_label:'Name (optional)', email_label:'Email (optional)', msg_label:'Message', send:'Send', success:'Message sent. Thanks!', note:'If we don’t reply within 48 hours, you can email us directly at info@sdac.it.' },
    es:{ title:'Contáctanos', name_label:'Nombre (opcional)', email_label:'Email (opcional)', msg_label:'Mensaje', send:'Enviar', success:'Mensaje enviado. ¡Gracias!', note:'Si no respondemos en 48 horas, puedes escribirnos directamente a info@sdac.it.' },
    fr:{ title:'Nous contacter', name_label:'Nom (optionnel)', email_label:'Email (optionnel)', msg_label:'Message', send:'Envoyer', success:'Message envoyé. Merci !', note:'Si nous ne répondons pas sous 48 h, vous pouvez nous écrire directement à info@sdac.it.' },
    ar:{ title:'اتصل بنا', name_label:'الاسم (اختياري)', email_label:'البريد الإلكتروني (اختياري)', msg_label:'الرسالة', send:'إرسال', success:'تم الإرسال. شكرًا لك!', note:'إذا لم نرد خلال 48 ساعة، يمكنك مراسلتنا مباشرة على info@sdac.it.' },
    ru:{ title:'Связаться с нами', name_label:'Имя (необязательно)', email_label:'Email (необязательно)', msg_label:'Сообщение', send:'Отправить', success:'Сообщение отправлено. Спасибо!', note:'Если мы не ответим в течение 48 часов, вы можете написать нам напрямую на info@sdac.it.' },
    zh:{ title:'联系我们', name_label:'姓名（可选）', email_label:'邮箱（可选）', msg_label:'留言', send:'发送', success:'已发送。谢谢！', note:'如果我们在 48 小时内没有回复，你可以直接发邮件到 info@sdac.it。' },
    lij:{ title:'Scrivine', name_label:'Nomme (facoltativo)', email_label:'Email (facoltativa)', msg_label:'Messaggio', send:'Manda', success:'Messaggio mandou. Grassie!', note:'Se no rispondemmo intro 48 oe, ti peu scrive direttamente a info@sdac.it.' }
  };

  
  function applySettingsDropdownLabel(dict){
    try{
      var row = document.querySelector('#settings-dropdown .settings-row[data-action="contact"]');
      if(row && dict && dict.title) row.textContent = dict.title;
    }catch(_){}
  }

function applyText(){
    var lang = normalizeLangSafe(currentLangSafe());
    var dict = T[lang] || T.it;
    
    applySettingsDropdownLabel(dict);
try{
      var nodes = panel.querySelectorAll('[data-contact-i18n]');
      for(var i=0;i<nodes.length;i++){
        var k = nodes[i].getAttribute('data-contact-i18n');
        if(dict[k]) nodes[i].textContent = dict[k];
      }
      // RTL hint for Arabic
      if(lang === 'ar'){
        panel.setAttribute('dir','rtl');
      }else{
        panel.setAttribute('dir','ltr');
      }
    }catch(_){}
  }

  
  // Keep Settings dropdown label translated even before opening the panel
  try{
    applySettingsDropdownLabel(T[normalizeLangSafe(currentLangSafe())] || T.it);
  }catch(_){}
  document.addEventListener('app:set-lang', function(){
    try{
      applySettingsDropdownLabel(T[normalizeLangSafe(currentLangSafe())] || T.it);
    }catch(_){}
  });


  // Fallback: if the app updates <html lang="..."> without firing app:set-lang
  try{
    if(typeof MutationObserver !== 'undefined' && document.documentElement){
      var _obs = new MutationObserver(function(){
        try{
          applySettingsDropdownLabel(T[normalizeLangSafe(currentLangSafe())] || T.it);
        }catch(_){}
      });
      _obs.observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
    }
  }catch(_){}

function openPanel(){
    applyText();
    panel.classList.remove('contact-hidden');
    overlay.classList.remove('contact-hidden');
    overlay.setAttribute('aria-hidden','false');
    // close settings dropdown if open
    try{
      var wrap = document.querySelector('.settings-wrapper');
      if(wrap) wrap.classList.remove('open');
      var btn = document.getElementById('btn-settings');
      if(btn) btn.setAttribute('aria-expanded','false');
    }catch(_){}
    // reset success state
    panel.classList.remove('show-success');
    if(success) success.style.display = '';
  }

  function closePanel(){
    panel.classList.add('contact-hidden');
    overlay.classList.add('contact-hidden');
    overlay.setAttribute('aria-hidden','true');
  }

  // Open via dropdown row
  function attachOpen(){
    var row = document.querySelector('#settings-dropdown .settings-row[data-action="contact"]');
    if(!row) return false;
    row.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      openPanel();
    });
    return true;
  }

  if(closeBtn) closeBtn.addEventListener('click', function(){ closePanel(); });
  overlay.addEventListener('click', function(){ closePanel(); });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !panel.classList.contains('contact-hidden')) closePanel();
  });

  // Try a few times until dropdown exists (safe with your delayed-inits)
  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(attachOpen()) { clearInterval(iv); }
    else if(++tries >= max) clearInterval(iv);
  }, 150);

  // Ajax submit (no page reload). If fetch fails, fallback to normal submit.
  if(form){
    form.addEventListener('submit', function(ev){
      try{
        ev.preventDefault();
        var fd = new FormData(form);
        var body = new URLSearchParams(fd).toString();

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type':'application/x-www-form-urlencoded' },
          body: body
        }).then(function(){
          form.reset();
          panel.classList.add('show-success');
        }).catch(function(){
          // fallback
          form.submit();
        });
      }catch(_){
        // fallback
      }
    });
  }
})();
