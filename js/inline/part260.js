(function(){
  function $(sel, root){ return (root || document).querySelector(sel); }

  var panel   = document.getElementById('contactPanel');
  var overlay = document.getElementById('contact-overlay');
  var closeBtn = document.getElementById('contactPanelClose');
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contactSuccess');
  var errorBox = document.getElementById('contactError');
  var submitBtn = form ? form.querySelector('.c-submit') : null;

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
    it:{ title:'Contattaci', name_label:'Nome (opzionale)', email_label:'Email (opzionale)', msg_label:'Messaggio', send:'Invia', sending:'Invio…', success:'Messaggio inviato. Grazie!', error:'Invio non riuscito. Riprova tra poco oppure scrivi direttamente a info@sdac.it.', note:'Se non rispondiamo entro 48h, puoi scrivere direttamente a info@sdac.it.' },
    en:{ title:'Contact us', name_label:'Name (optional)', email_label:'Email (optional)', msg_label:'Message', send:'Send', sending:'Sending…', success:'Message sent. Thanks!', error:'Message could not be sent. Please try again shortly or email us directly at info@sdac.it.', note:'If we don’t reply within 48 hours, you can email us directly at info@sdac.it.' },
    es:{ title:'Contáctanos', name_label:'Nombre (opcional)', email_label:'Email (opcional)', msg_label:'Mensaje', send:'Enviar', sending:'Enviando…', success:'Mensaje enviado. ¡Gracias!', error:'No se ha podido enviar el mensaje. Inténtalo de nuevo en unos instantes o escribe directamente a info@sdac.it.', note:'Si no respondemos en 48 horas, puedes escribirnos directamente a info@sdac.it.' },
    fr:{ title:'Nous contacter', name_label:'Nom (optionnel)', email_label:'Email (optionnel)', msg_label:'Message', send:'Envoyer', sending:'Envoi…', success:'Message envoyé. Merci !', error:'Le message n’a pas pu être envoyé. Réessayez dans quelques instants ou écrivez directement à info@sdac.it.', note:'Si nous ne répondons pas sous 48 h, vous pouvez nous écrire directement à info@sdac.it.' },
    ar:{ title:'اتصل بنا', name_label:'الاسم (اختياري)', email_label:'البريد الإلكتروني (اختياري)', msg_label:'الرسالة', send:'إرسال', sending:'جارٍ الإرسال…', success:'تم الإرسال. شكرًا لك!', error:'تعذّر إرسال الرسالة. حاول مرة أخرى بعد قليل أو راسلنا مباشرة على info@sdac.it.', note:'إذا لم نرد خلال 48 ساعة، يمكنك مراسلتنا مباشرة على info@sdac.it.' },
    ru:{ title:'Связаться с нами', name_label:'Имя (необязательно)', email_label:'Email (необязательно)', msg_label:'Сообщение', send:'Отправить', sending:'Отправка…', success:'Сообщение отправлено. Спасибо!', error:'Не удалось отправить сообщение. Попробуйте ещё раз немного позже или напишите напрямую на info@sdac.it.', note:'Если мы не ответим в течение 48 часов, вы можете написать нам напрямую на info@sdac.it.' },
    zh:{ title:'联系我们', name_label:'姓名（可选）', email_label:'邮箱（可选）', msg_label:'留言', send:'发送', sending:'正在发送…', success:'已发送。谢谢！', error:'消息发送失败。请稍后重试，或直接发送邮件至 info@sdac.it。', note:'如果我们在 48 小时内没有回复，你可以直接发邮件到 info@sdac.it。' },
    lij:{ title:'Scrivine', name_label:'Nomme (facoltativo)', email_label:'Email (facoltativa)', msg_label:'Messaggio', send:'Manda', sending:'Mando…', success:'Messaggio mandou. Grassie!', error:'No semmo riescîi a mandâ o messaggio. Preuva torna tra un pö o scrivine direttamente a info@sdac.it.', note:'Se no rispondemmo intro 48 oe, ti peu scrive direttamente a info@sdac.it.' }
  };

  function dictNow(){
    var lang = normalizeLangSafe(currentLangSafe());
    return T[lang] || T.it;
  }

  function applySettingsDropdownLabel(dict){
    try{
      var row = document.querySelector('#settings-dropdown .settings-row[data-action="contact"]');
      if(row && dict && dict.title) row.textContent = dict.title;
    }catch(_){}
  }

  function setSubmitState(isSending){
    if(!form) return;
    var dict = dictNow();
    form.setAttribute('aria-busy', isSending ? 'true' : 'false');
    panel.classList.toggle('is-sending', !!isSending);
    if(submitBtn){
      submitBtn.disabled = !!isSending;
      submitBtn.textContent = isSending ? dict.sending : dict.send;
    }
  }

  function clearResult(){
    panel.classList.remove('show-success');
    panel.classList.remove('show-error');
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
      if(submitBtn){
        submitBtn.textContent = panel.classList.contains('is-sending') ? dict.sending : dict.send;
      }
      if(lang === 'ar') panel.setAttribute('dir','rtl');
      else panel.setAttribute('dir','ltr');
    }catch(_){}
  }

  try{
    applySettingsDropdownLabel(dictNow());
  }catch(_){}

  document.addEventListener('app:set-lang', function(){
    try{
      applyText();
    }catch(_){}
  });

  try{
    if(typeof MutationObserver !== 'undefined' && document.documentElement){
      var _obs = new MutationObserver(function(){
        try{ applyText(); }catch(_){}
      });
      _obs.observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
    }
  }catch(_){}

  function openPanel(){
    applyText();
    panel.classList.remove('contact-hidden');
    overlay.classList.remove('contact-hidden');
    overlay.setAttribute('aria-hidden','false');
    try{
      var wrap = document.querySelector('.settings-wrapper');
      if(wrap) wrap.classList.remove('open');
      var btn = document.getElementById('btn-settings');
      if(btn) btn.setAttribute('aria-expanded','false');
    }catch(_){}
    clearResult();
    setSubmitState(false);
    if(success) success.style.display = '';
    if(errorBox) errorBox.style.display = '';
  }

  function closePanel(){
    panel.classList.add('contact-hidden');
    overlay.classList.add('contact-hidden');
    overlay.setAttribute('aria-hidden','true');
  }

  function attachOpen(){
    var row = document.querySelector('#settings-dropdown .settings-row[data-action="contact"]');
    if(!row || row.__genovaContactBound) return !!row;
    row.__genovaContactBound = true;
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

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(attachOpen()) clearInterval(iv);
    else if(++tries >= max) clearInterval(iv);
  }, 150);

  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      if(panel.classList.contains('is-sending')) return;
      if(typeof form.reportValidity === 'function' && !form.reportValidity()) return;

      clearResult();
      setSubmitState(true);

      var fd;
      var body;
      try{
        fd = new FormData(form);
        if(!fd.get('form-name')) fd.set('form-name', form.getAttribute('name') || 'contact');
        body = new URLSearchParams(fd).toString();
      }catch(err){
        console.error('Genova mApp contact form encode:', err);
        setSubmitState(false);
        panel.classList.add('show-error');
        return;
      }

      fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8' },
        credentials: 'same-origin',
        body: body
      }).then(function(response){
        if(!response.ok){
          var error = new Error('Contact form HTTP ' + response.status);
          error.status = response.status;
          throw error;
        }
        form.reset();
        panel.classList.remove('show-error');
        panel.classList.add('show-success');
      }).catch(function(err){
        console.error('Genova mApp contact form submit:', err);
        panel.classList.remove('show-success');
        panel.classList.add('show-error');
      }).then(function(){
        setSubmitState(false);
      });
    });
  }
})();
