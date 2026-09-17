(function(){
  function $(sel, root){ return (root || document).querySelector(sel); }

  var panel   = document.getElementById('contactPanel');
  var overlay = document.getElementById('contact-overlay');
  var closeBtn = document.getElementById('contactPanelClose');
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contactSuccess');
  var errorBox = document.getElementById('contactError');
  var submitBtn = form ? form.querySelector('.c-submit') : null;
  var reasonInputs = form ? form.querySelectorAll('input[name="reason"]') : [];

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
    it:{
      title:'Contattaci', reason_title:'Per cosa ci stai contattando?', reason_help:'Seleziona il motivo principale del messaggio.',
      reason_1:'Aggiunta evento / luogo / sponsor', reason_2:'Problemi con l’abbonamento', reason_3:'Segnalazione errore nell’app',
      reason_4:'Proposta di collaborazione', reason_5:'Segnalazione luogo / contenuto', reason_6:'Informazioni commerciali', reason_7:'Altro',
      reason_required:'Seleziona un motivo prima di inviare il messaggio.',
      name_label:'Nome (opzionale)', email_label:'Email (opzionale)', msg_label:'Messaggio', send:'Invia', sending:'Invio…',
      success:'Messaggio inviato. Grazie!', error:'Invio non riuscito. Riprova tra poco oppure scrivi direttamente a info@sdac.it.',
      note:'Se non rispondiamo entro 48h, puoi scrivere direttamente a info@sdac.it.'
    },
    en:{
      title:'Contact us', reason_title:'What are you contacting us about?', reason_help:'Select the main reason for your message.',
      reason_1:'Add an event / place / sponsor', reason_2:'Subscription issues', reason_3:'Report an app error',
      reason_4:'Collaboration proposal', reason_5:'Report a place / content', reason_6:'Business information', reason_7:'Other',
      reason_required:'Select a reason before sending your message.',
      name_label:'Name (optional)', email_label:'Email (optional)', msg_label:'Message', send:'Send', sending:'Sending…',
      success:'Message sent. Thanks!', error:'Message could not be sent. Please try again shortly or email us directly at info@sdac.it.',
      note:'If we don’t reply within 48 hours, you can email us directly at info@sdac.it.'
    },
    es:{
      title:'Contáctanos', reason_title:'¿Por qué nos contactas?', reason_help:'Selecciona el motivo principal de tu mensaje.',
      reason_1:'Añadir evento / lugar / patrocinador', reason_2:'Problemas con la suscripción', reason_3:'Informar de un error en la app',
      reason_4:'Propuesta de colaboración', reason_5:'Señalar un lugar / contenido', reason_6:'Información comercial', reason_7:'Otro',
      reason_required:'Selecciona un motivo antes de enviar el mensaje.',
      name_label:'Nombre (opcional)', email_label:'Email (opcional)', msg_label:'Mensaje', send:'Enviar', sending:'Enviando…',
      success:'Mensaje enviado. ¡Gracias!', error:'No se ha podido enviar el mensaje. Inténtalo de nuevo en unos instantes o escribe directamente a info@sdac.it.',
      note:'Si no respondemos en 48 horas, puedes escribirnos directamente a info@sdac.it.'
    },
    fr:{
      title:'Nous contacter', reason_title:'Pourquoi nous contactez-vous ?', reason_help:'Sélectionnez le motif principal de votre message.',
      reason_1:'Ajouter un événement / lieu / sponsor', reason_2:'Problèmes d’abonnement', reason_3:'Signaler une erreur dans l’application',
      reason_4:'Proposition de collaboration', reason_5:'Signaler un lieu / contenu', reason_6:'Informations commerciales', reason_7:'Autre',
      reason_required:'Sélectionnez un motif avant d’envoyer le message.',
      name_label:'Nom (optionnel)', email_label:'Email (optionnel)', msg_label:'Message', send:'Envoyer', sending:'Envoi…',
      success:'Message envoyé. Merci !', error:'Le message n’a pas pu être envoyé. Réessayez dans quelques instants ou écrivez directement à info@sdac.it.',
      note:'Si nous ne répondons pas sous 48 h, vous pouvez nous écrire directement à info@sdac.it.'
    },
    ar:{
      title:'اتصل بنا', reason_title:'ما سبب تواصلك معنا؟', reason_help:'اختر السبب الرئيسي لرسالتك.',
      reason_1:'إضافة فعالية / مكان / راعٍ', reason_2:'مشكلات الاشتراك', reason_3:'الإبلاغ عن خطأ في التطبيق',
      reason_4:'اقتراح تعاون', reason_5:'الإبلاغ عن مكان / محتوى', reason_6:'معلومات تجارية', reason_7:'أخرى',
      reason_required:'اختر سببًا قبل إرسال الرسالة.',
      name_label:'الاسم (اختياري)', email_label:'البريد الإلكتروني (اختياري)', msg_label:'الرسالة', send:'إرسال', sending:'جارٍ الإرسال…',
      success:'تم الإرسال. شكرًا لك!', error:'تعذّر إرسال الرسالة. حاول مرة أخرى بعد قليل أو راسلنا مباشرة على info@sdac.it.',
      note:'إذا لم نرد خلال 48 ساعة، يمكنك مراسلتنا مباشرة على info@sdac.it.'
    },
    ru:{
      title:'Связаться с нами', reason_title:'По какому вопросу вы обращаетесь?', reason_help:'Выберите основную причину сообщения.',
      reason_1:'Добавить событие / место / спонсора', reason_2:'Проблемы с подпиской', reason_3:'Сообщить об ошибке в приложении',
      reason_4:'Предложение о сотрудничестве', reason_5:'Сообщить о месте / контенте', reason_6:'Коммерческая информация', reason_7:'Другое',
      reason_required:'Выберите причину перед отправкой сообщения.',
      name_label:'Имя (необязательно)', email_label:'Email (необязательно)', msg_label:'Сообщение', send:'Отправить', sending:'Отправка…',
      success:'Сообщение отправлено. Спасибо!', error:'Не удалось отправить сообщение. Попробуйте ещё раз немного позже или напишите напрямую на info@sdac.it.',
      note:'Если мы не ответим в течение 48 часов, вы можете написать нам напрямую на info@sdac.it.'
    },
    zh:{
      title:'联系我们', reason_title:'你为什么联系我们？', reason_help:'请选择此消息的主要原因。',
      reason_1:'添加活动 / 地点 / 赞助商', reason_2:'订阅问题', reason_3:'报告应用错误',
      reason_4:'合作提案', reason_5:'反馈地点 / 内容', reason_6:'商务咨询', reason_7:'其他',
      reason_required:'发送消息前请选择一个原因。',
      name_label:'姓名（可选）', email_label:'邮箱（可选）', msg_label:'留言', send:'发送', sending:'正在发送…',
      success:'已发送。谢谢！', error:'消息发送失败。请稍后重试，或直接发送邮件至 info@sdac.it。',
      note:'如果我们在 48 小时内没有回复，你可以直接发邮件到 info@sdac.it。'
    },
    lij:{
      title:'Scrivine', reason_title:'Pe cöse ti ne contatti?', reason_help:'Seleçionn-a o motivo prinçipâ do messaggio.',
      reason_1:'Azonta evento / luogo / sponsor', reason_2:'Problemi co l’abbonamento', reason_3:'Segnala un erro into l’app',
      reason_4:'Proposta de collaborassion', reason_5:'Segnala un luogo / contegnuo', reason_6:'Informaçioin commerciali', reason_7:'Atro',
      reason_required:'Seleçionn-a un motivo primma de mandâ o messaggio.',
      name_label:'Nomme (facoltativo)', email_label:'Email (facoltativa)', msg_label:'Messaggio', send:'Manda', sending:'Mando…',
      success:'Messaggio mandou. Grassie!', error:'No semmo riescîi a mandâ o messaggio. Preuva torna tra un pö o scrivine direttamente a info@sdac.it.',
      note:'Se no rispondemmo intro 48 oe, ti peu scrive direttamente a info@sdac.it.'
    }
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

  function selectedReason(){
    try{
      return form ? form.querySelector('input[name="reason"]:checked') : null;
    }catch(_){
      return null;
    }
  }

  function updateReasonState(){
    try{
      var selected = selectedReason();
      panel.classList.toggle('reason-invalid', false);
      for(var i=0;i<reasonInputs.length;i++){
        var input = reasonInputs[i];
        var label = input.closest ? input.closest('.c-reason-option') : input.parentNode;
        if(label && label.classList) label.classList.toggle('is-selected', !!input.checked);
      }
      return selected;
    }catch(_){
      return null;
    }
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
    panel.classList.remove('reason-invalid');
    updateReasonState();
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

  for(var r=0;r<reasonInputs.length;r++){
    reasonInputs[r].addEventListener('change', function(){
      updateReasonState();
    });
  }

  var tries = 0, max = 80;
  var iv = setInterval(function(){
    if(attachOpen()) clearInterval(iv);
    else if(++tries >= max) clearInterval(iv);
  }, 150);

  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      if(panel.classList.contains('is-sending')) return;

      var reason = selectedReason();
      if(!reason){
        panel.classList.add('reason-invalid');
        clearResult();
        try{ if(reasonInputs.length) reasonInputs[0].focus(); }catch(_){}
        return;
      }
      panel.classList.remove('reason-invalid');

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
        updateReasonState();
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
