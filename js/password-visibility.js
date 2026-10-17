/* Genova mApp - mostra/nascondi password nel widget Netlify Identity.
   Interviene solo su campi accessibili nel DOM: non legge, salva o invia password. */
(function () {
  'use strict';
  if (window.__GM_PASSWORD_VISIBILITY__) return;
  window.__GM_PASSWORD_VISIBILITY__ = true;
  var labels = {
    it:['Mostra password','Nascondi password'], en:['Show password','Hide password'],
    es:['Mostrar contraseña','Ocultar contraseña'], fr:['Afficher le mot de passe','Masquer le mot de passe'],
    ar:['إظهار كلمة المرور','إخفاء كلمة المرور'], ru:['Показать пароль','Скрыть пароль'],
    zh:['显示密码','隐藏密码'], lij:['Fanni vedde a password','Ascòndi a password']
  };
  function label(shown) {
    var language='it';
    try { language=(localStorage.getItem('lang')||document.documentElement.lang||'it').toLowerCase().split('-')[0]; } catch (_) {}
    return (labels[language]||labels.it)[shown?1:0];
  }
  function add(input) {
    if(input.dataset.gmPasswordToggle==='1' || input.closest('[data-gm-password-wrap]')) return;
    if(input.type!=='password' || input.disabled || input.hidden) return;
    // The only supported fields belong to Netlify's own authentication dialog.
    if(!input.closest('.netlify-identity-widget')) return;
    var parent=input.parentElement;
    if(!parent) return;
    var wrap=document.createElement('span');wrap.className='gm-password-wrap';wrap.dataset.gmPasswordWrap='1';
    parent.insertBefore(wrap,input);wrap.appendChild(input);
    input.dataset.gmPasswordToggle='1';
    var button=document.createElement('button');button.type='button';button.className='gm-password-eye';
    button.setAttribute('aria-pressed','false');
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.7-6.5 10-6.5S22 12 22 12s-3.7 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
    function update(){var shown=input.type==='text';button.setAttribute('aria-label',label(shown));button.setAttribute('title',label(shown));button.setAttribute('aria-pressed',String(shown));}
    button.addEventListener('click',function(){var start=input.selectionStart,end=input.selectionEnd;input.type=input.type==='password'?'text':'password';update();input.focus({preventScroll:true});try{input.setSelectionRange(start,end);}catch(_){}});
    wrap.appendChild(button);update();
  }
  function scan(){document.querySelectorAll('.netlify-identity-widget input[type="password"]').forEach(add);}
  var scheduled=false;
  function queue(){if(scheduled)return;scheduled=true;requestAnimationFrame(function(){scheduled=false;scan();});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){scan();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});});
  else {scan();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});}
  document.addEventListener('app:set-lang',function(){document.querySelectorAll('.gm-password-wrap').forEach(function(w){var input=w.querySelector('input'),button=w.querySelector('.gm-password-eye');if(input&&button){var shown=input.type==='text';button.title=label(shown);button.setAttribute('aria-label',label(shown));}});});
})();
