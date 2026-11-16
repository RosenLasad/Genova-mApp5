/* Ritorno alla sala dopo conferma email/OAuth aperti sulla Home. Non tratta token. */
(function(){
  'use strict';
  // Capture callback presence before the existing Identity widget consumes its hash.
  var callback = /(?:^#|&)(?:confirmation_token|recovery_token|invite_token|email_change_token|access_token)=/.test(location.hash);
  if (!callback || !/^\/(?:index\.html)?$/.test(location.pathname)) return;
  var pending = null;
  try { pending = JSON.parse(sessionStorage.getItem('gm-storie-auth-return') || localStorage.getItem('gm-storie-auth-return') || 'null'); } catch (_) {}
  if (!pending || !Number.isFinite(pending.at) || pending.at > Date.now() || Date.now() - pending.at > 20 * 60 * 1000) return;
  if (typeof pending.path !== 'string' || !/^\/storiedigenova\?(?:tv=[A-F0-9]{10}|guarda=1)$/.test(pending.path)) return;
  var done = false;
  function resume(){
    if(done || !window.GenovaAuth || !window.GenovaAuth.getUser()) return;
    done = true;
    try { sessionStorage.removeItem('gm-storie-auth-return'); localStorage.removeItem('gm-storie-auth-return'); } catch (_) {}
    location.replace(pending.path);
  }
  document.addEventListener('genova:auth-changed', resume);
  document.addEventListener('DOMContentLoaded',function(){
    if(window.GenovaAuth && window.GenovaAuth.whenReady) window.GenovaAuth.whenReady().then(resume);
    resume();
  },{once:true});
})();
