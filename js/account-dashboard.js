/* Genova mApp - pannello "Il mio account": stato, limiti, sincronizzazione e cancellazione. */
(function(){
  'use strict';
  if(window.__GENOVA_ACCOUNT_DASHBOARD__)return;
  window.__GENOVA_ACCOUNT_DASHBOARD__=true;

  var QUOTA_ENDPOINT='/.netlify/functions/events-search';
  var quotaRequest=0;

  var TEXT={
    it:{free:'Account gratuito',premium:'Premium',events:'Ricerche Eventi',favorites:'Preferiti',routes:'Percorsi personali',sync:'Sincronizzazione',today:'oggi',unlimited:'Illimitati',loading:'Aggiornamento…',unavailable:'Non disponibile',upgrade:'Passa a Premium',manage:'Gestisci abbonamento',deleteAccount:'Elimina account',deleteTitle:'Eliminare definitivamente il tuo account?',deleteText:'L’operazione è definitiva: verranno eliminati l’account Genova mApp e i dati sincronizzati, compresi Preferiti, Percorsi, Note e stato dei punti QR. Se hai un abbonamento Stripe attivo, verrà annullato per evitare rinnovi futuri.',deletePremium:'L’accesso Premium termina con l’eliminazione dell’account.',deleteConfirm:'Elimina definitivamente',deleteCancel:'Annulla',deleting:'Eliminazione dell’account…',deleteError:'Non è stato possibile eliminare l’account. Riprova tra poco.',deleteOffline:'Per eliminare l’account è necessaria una connessione Internet.',deleted:'Account eliminato. Chiusura della sessione…'},
    en:{free:'Free account',premium:'Premium',events:'Event searches',favorites:'Favourites',routes:'Personal Routes',sync:'Sync',today:'today',unlimited:'Unlimited',loading:'Updating…',unavailable:'Unavailable',upgrade:'Upgrade to Premium',manage:'Manage subscription',deleteAccount:'Delete account',deleteTitle:'Permanently delete your account?',deleteText:'This action is permanent: your Genova mApp account and synced data will be deleted, including Favourites, Routes, Notes and QR point visited status. If you have an active Stripe subscription, it will be cancelled to prevent future renewals.',deletePremium:'Premium access ends when the account is deleted.',deleteConfirm:'Delete permanently',deleteCancel:'Cancel',deleting:'Deleting account…',deleteError:'The account could not be deleted. Please try again shortly.',deleteOffline:'An Internet connection is required to delete your account.',deleted:'Account deleted. Signing out…'},
    es:{free:'Cuenta gratuita',premium:'Premium',events:'Búsquedas de Eventos',favorites:'Favoritos',routes:'Rutas personales',sync:'Sincronización',today:'hoy',unlimited:'Ilimitados',loading:'Actualizando…',unavailable:'No disponible',upgrade:'Pasar a Premium',manage:'Gestionar suscripción',deleteAccount:'Eliminar cuenta',deleteTitle:'¿Eliminar definitivamente tu cuenta?',deleteText:'La operación es definitiva: se eliminarán tu cuenta Genova mApp y los datos sincronizados, incluidos Favoritos, Rutas, Notas y el estado de los puntos QR. Si tienes una suscripción Stripe activa, se cancelará para evitar futuras renovaciones.',deletePremium:'El acceso Premium termina al eliminar la cuenta.',deleteConfirm:'Eliminar definitivamente',deleteCancel:'Cancelar',deleting:'Eliminando cuenta…',deleteError:'No se pudo eliminar la cuenta. Inténtalo de nuevo en breve.',deleteOffline:'Se necesita conexión a Internet para eliminar la cuenta.',deleted:'Cuenta eliminada. Cerrando sesión…'},
    fr:{free:'Compte gratuit',premium:'Premium',events:'Recherches Événements',favorites:'Favoris',routes:'Parcours personnels',sync:'Synchronisation',today:'aujourd’hui',unlimited:'Illimités',loading:'Mise à jour…',unavailable:'Indisponible',upgrade:'Passer à Premium',manage:'Gérer l’abonnement',deleteAccount:'Supprimer le compte',deleteTitle:'Supprimer définitivement votre compte ?',deleteText:'Cette opération est définitive : votre compte Genova mApp et les données synchronisées seront supprimés, notamment les Favoris, Parcours, Notes et l’état des points QR. Si vous avez un abonnement Stripe actif, il sera annulé afin d’éviter tout renouvellement futur.',deletePremium:'L’accès Premium prend fin lors de la suppression du compte.',deleteConfirm:'Supprimer définitivement',deleteCancel:'Annuler',deleting:'Suppression du compte…',deleteError:'Impossible de supprimer le compte. Réessayez dans quelques instants.',deleteOffline:'Une connexion Internet est nécessaire pour supprimer le compte.',deleted:'Compte supprimé. Déconnexion…'},
    ar:{free:'حساب مجاني',premium:'Premium',events:'عمليات بحث الفعاليات',favorites:'المفضلة',routes:'المسارات الشخصية',sync:'المزامنة',today:'اليوم',unlimited:'غير محدودة',loading:'جارٍ التحديث…',unavailable:'غير متاح',upgrade:'الانتقال إلى Premium',manage:'إدارة الاشتراك',deleteAccount:'حذف الحساب',deleteTitle:'حذف حسابك نهائياً؟',deleteText:'هذه العملية نهائية: سيتم حذف حساب Genova mApp والبيانات المتزامنة، بما في ذلك المفضلة والمسارات والملاحظات وحالة نقاط QR. إذا كان لديك اشتراك Stripe نشط فسيتم إلغاؤه لمنع أي تجديدات مستقبلية.',deletePremium:'ينتهي الوصول إلى Premium عند حذف الحساب.',deleteConfirm:'حذف نهائياً',deleteCancel:'إلغاء',deleting:'جارٍ حذف الحساب…',deleteError:'تعذر حذف الحساب. حاول مرة أخرى بعد قليل.',deleteOffline:'يلزم الاتصال بالإنترنت لحذف الحساب.',deleted:'تم حذف الحساب. جارٍ تسجيل الخروج…'},
    ru:{free:'Бесплатный аккаунт',premium:'Premium',events:'Поиски событий',favorites:'Избранное',routes:'Личные маршруты',sync:'Синхронизация',today:'сегодня',unlimited:'Без ограничений',loading:'Обновление…',unavailable:'Недоступно',upgrade:'Перейти на Premium',manage:'Управлять подпиской',deleteAccount:'Удалить аккаунт',deleteTitle:'Удалить аккаунт без возможности восстановления?',deleteText:'Это действие необратимо: аккаунт Genova mApp и синхронизированные данные будут удалены, включая Избранное, Маршруты, Заметки и состояние QR-точек. Активная подписка Stripe будет отменена, чтобы исключить будущие продления.',deletePremium:'Доступ Premium прекращается при удалении аккаунта.',deleteConfirm:'Удалить навсегда',deleteCancel:'Отмена',deleting:'Удаление аккаунта…',deleteError:'Не удалось удалить аккаунт. Повторите попытку позже.',deleteOffline:'Для удаления аккаунта требуется подключение к Интернету.',deleted:'Аккаунт удалён. Выполняется выход…'},
    zh:{free:'免费账户',premium:'Premium',events:'活动搜索',favorites:'收藏',routes:'个人路线',sync:'同步',today:'今天',unlimited:'不限量',loading:'正在更新…',unavailable:'不可用',upgrade:'升级到 Premium',manage:'管理订阅',deleteAccount:'删除账户',deleteTitle:'永久删除你的账户？',deleteText:'此操作不可撤销：你的 Genova mApp 账户及同步数据将被删除，包括收藏、路线、笔记和 QR 点访问状态。如有有效的 Stripe 订阅，也会被取消以避免今后续费。',deletePremium:'删除账户后 Premium 访问权限将终止。',deleteConfirm:'永久删除',deleteCancel:'取消',deleting:'正在删除账户…',deleteError:'无法删除账户，请稍后重试。',deleteOffline:'删除账户需要互联网连接。',deleted:'账户已删除，正在退出登录…'},
    lij:{free:'Account gratis',premium:'Premium',events:'Riçerche Eventi',favorites:'Preferii',routes:'Percorsi personâ',sync:'Sincronizaçion',today:'ancheu',unlimited:'Sensa limite',loading:'Agiorno…',unavailable:'No disponibile',upgrade:'Passa a Premium',manage:'Gestisci abonamento',deleteAccount:'Scancella account',deleteTitle:'Scancellâ definitivamente o teu account?',deleteText:'L’operaçion a l’é definitiva: saian scancelæ l’account Genova mApp e i dæti sincronizzæ, compresi Preferii, Percorsi, Nòtte e o stato di ponti QR. Se ti gh’æ un abonamento Stripe ativo, o saiâ anulou pe evitâ renovamenti futui.',deletePremium:'L’accesso Premium o finisce co-a scancelaçion de l’account.',deleteConfirm:'Scancella definitivamente',deleteCancel:'Anulla',deleting:'Scancello l’account…',deleteError:'No semmo riescîi a scancellâ l’account. Preuva torna tra un pö.',deleteOffline:'Pe scancellâ l’account serve a conescion a Internet.',deleted:'Account scancelou. Sciòrto da-a session…'}
  };

  function lang(){
    var value='it';try{value=localStorage.getItem('lang')||document.documentElement.lang||'it';}catch(_e){}
    value=String(value||'it').toLowerCase().split(/[-_]/)[0];return TEXT[value]?value:'it';
  }
  function t(){return TEXT[lang()]||TEXT.it;}
  function accountState(){try{return window.GenovaAccount&&window.GenovaAccount.getState?window.GenovaAccount.getState():null;}catch(_e){return null;}}
  function user(){try{return window.GenovaAuth&&window.GenovaAuth.getUser?window.GenovaAuth.getUser():null;}catch(_e){return null;}}
  function tier(){var st=accountState();return st&&st.active?'premium':(user()?'free':'guest');}
  function entitlements(){try{return window.GenovaEntitlements?window.GenovaEntitlements.get():null;}catch(_e){return null;}}

  function jsonCount(key,kind){
    try{
      var value=JSON.parse(localStorage.getItem(key)||(kind==='array'?'[]':'{}'));
      return kind==='array'?(Array.isArray(value)?value.length:0):(value&&typeof value==='object'?Object.keys(value).length:0);
    }catch(_e){return 0;}
  }

  function ensure(){
    var profile=document.getElementById('auth-account-profile');
    if(!profile)return null;
    var root=document.getElementById('auth-account-dashboard');
    if(root)return root;

    root=document.createElement('div');
    root.id='auth-account-dashboard';
    root.className='auth-account-dashboard';
    root.innerHTML='<div class="auth-dashboard-grid">'+
      '<div class="auth-dashboard-card"><span class="auth-dashboard-label" data-label="events"></span><strong id="auth-metric-events">—</strong><small id="auth-metric-events-note"></small></div>'+
      '<div class="auth-dashboard-card"><span class="auth-dashboard-label" data-label="favorites"></span><strong id="auth-metric-favorites">—</strong><small id="auth-metric-favorites-note"></small></div>'+
      '<div class="auth-dashboard-card"><span class="auth-dashboard-label" data-label="routes"></span><strong id="auth-metric-routes">—</strong><small id="auth-metric-routes-note"></small></div>'+
      '<div class="auth-dashboard-card auth-dashboard-sync-card"><span class="auth-dashboard-label" data-label="sync"></span><div id="auth-account-sync-slot"></div></div>'+
    '</div>'+
    '<button class="auth-dashboard-subscription" id="auth-account-subscription-action" type="button"></button>';
    profile.appendChild(root);

    var existingSync=document.getElementById('auth-sync-panel');
    var syncSlot=document.getElementById('auth-account-sync-slot');
    if(existingSync&&syncSlot)syncSlot.appendChild(existingSync);

    var actions=document.querySelector('#auth-account-modal .auth-account-actions');
    if(actions&&!document.getElementById('auth-account-danger')){
      var danger=document.createElement('div');
      danger.id='auth-account-danger';
      danger.className='auth-account-danger';
      danger.innerHTML='<button id="auth-account-delete" type="button"></button>'+
        '<div class="auth-delete-confirm" id="auth-delete-confirm" hidden>'+
          '<strong id="auth-delete-title"></strong><p id="auth-delete-text"></p><p class="auth-delete-premium" id="auth-delete-premium"></p>'+
          '<div class="auth-delete-actions"><button id="auth-delete-cancel" type="button"></button><button id="auth-delete-confirm-button" type="button"></button></div>'+
          '<p id="auth-delete-status" class="auth-delete-status" aria-live="polite"></p>'+
        '</div>';
      actions.insertAdjacentElement('afterend',danger);
      bindActions();
    }
    return root;
  }

  function bindActions(){
    var sub=document.getElementById('auth-account-subscription-action');
    if(sub&&!sub.__bound){sub.__bound=true;sub.addEventListener('click',function(){
      var close=document.querySelector('#auth-account-modal .auth-account-close');if(close)close.click();
      window.setTimeout(function(){if(window.GenovaSubscription&&typeof window.GenovaSubscription.open==='function')window.GenovaSubscription.open();},60);
    });}
    var del=document.getElementById('auth-account-delete');
    if(del&&!del.__bound){del.__bound=true;del.addEventListener('click',function(){setDeleteOpen(true);});}
    var cancel=document.getElementById('auth-delete-cancel');
    if(cancel&&!cancel.__bound){cancel.__bound=true;cancel.addEventListener('click',function(){setDeleteOpen(false);});}
    var confirm=document.getElementById('auth-delete-confirm-button');
    if(confirm&&!confirm.__bound){confirm.__bound=true;confirm.addEventListener('click',deleteAccount);}
  }

  function setDeleteOpen(open){
    var panel=document.getElementById('auth-delete-confirm');if(!panel)return;
    panel.hidden=!open;
    var status=document.getElementById('auth-delete-status');if(status)status.textContent='';
    if(open)window.setTimeout(function(){var cancel=document.getElementById('auth-delete-cancel');if(cancel)cancel.focus();},0);
  }

  function formatMetric(count,limit,copy){
    if(limit===null)return{main:String(count),note:copy.unlimited};
    return{main:String(count)+' / '+String(limit),note:''};
  }

  function renderLocalMetrics(){
    var copy=t();var st=accountState();var code=tier();var ent=entitlements()||{};
    var status=document.querySelector('#auth-account-profile .auth-account-status');
    if(status){status.textContent=code==='premium'?copy.premium:copy.free;status.classList.toggle('is-premium',code==='premium');}
    document.querySelectorAll('.auth-dashboard-label').forEach(function(label){var key=label.getAttribute('data-label');if(copy[key])label.textContent=copy[key];});

    var fav=formatMetric(jsonCount('genova_favstars_v1','object'),code==='premium'?null:Number(ent.favoritePoints||10),copy);
    var routes=formatMetric(jsonCount('genova_taccuino_routes_v1','array'),code==='premium'?null:Number(ent.customRoutes||1),copy);
    var favMain=document.getElementById('auth-metric-favorites'),favNote=document.getElementById('auth-metric-favorites-note');
    var routeMain=document.getElementById('auth-metric-routes'),routeNote=document.getElementById('auth-metric-routes-note');
    if(favMain)favMain.textContent=fav.main;if(favNote)favNote.textContent=fav.note;
    if(routeMain)routeMain.textContent=routes.main;if(routeNote)routeNote.textContent=routes.note;

    var sub=document.getElementById('auth-account-subscription-action');
    if(sub){sub.textContent=code==='premium'?copy.manage:copy.upgrade;sub.classList.toggle('is-premium',code==='premium');}
    var del=document.getElementById('auth-account-delete');if(del)del.textContent=copy.deleteAccount;
    var title=document.getElementById('auth-delete-title');if(title)title.textContent=copy.deleteTitle;
    var text=document.getElementById('auth-delete-text');if(text)text.textContent=copy.deleteText;
    var premium=document.getElementById('auth-delete-premium');if(premium){premium.textContent=copy.deletePremium;premium.hidden=code!=='premium';}
    var cancel=document.getElementById('auth-delete-cancel');if(cancel)cancel.textContent=copy.deleteCancel;
    var confirm=document.getElementById('auth-delete-confirm-button');if(confirm)confirm.textContent=copy.deleteConfirm;

    var sync=document.getElementById('auth-sync-panel'),slot=document.getElementById('auth-account-sync-slot');if(sync&&slot&&sync.parentNode!==slot)slot.appendChild(sync);
    if(st&&st.status==='offline'&&!navigator.onLine){/* Il pannello sync mostra gia lo stato corretto. */}
  }

  async function refreshQuota(){
    var currentUser=user();if(!currentUser)return;
    var requestId=++quotaRequest;var copy=t();var ent=entitlements()||{};var limit=Number(ent.eventSearchesPer24h||5);
    var main=document.getElementById('auth-metric-events');var note=document.getElementById('auth-metric-events-note');
    if(main)main.textContent='— / '+limit;if(note)note.textContent=copy.loading;
    if(!navigator.onLine){if(note)note.textContent=copy.unavailable;return;}
    try{
      var token=await window.GenovaAuth.token();
      var response=await fetch(QUOTA_ENDPOINT,{method:'GET',headers:{authorization:'Bearer '+token,'cache-control':'no-store'}});
      var result=await response.json().catch(function(){return{};});
      if(requestId!==quotaRequest)return;
      if(!response.ok||!result.quota)throw new Error(result.error||'quota_unavailable');
      var quota=result.quota;var qLimit=Number(quota.limit)||limit;var used=Number(quota.used)||0;
      if(main)main.textContent=used+' / '+qLimit;
      if(note)note.textContent=copy.today;
    }catch(_e){if(requestId!==quotaRequest)return;if(note)note.textContent=copy.unavailable;}
  }

  function refresh(){
    var root=ensure();if(!root)return;
    var currentUser=user();root.hidden=!currentUser;
    var danger=document.getElementById('auth-account-danger');if(danger)danger.hidden=!currentUser;
    if(!currentUser)return;
    renderLocalMetrics();
    refreshQuota();
  }

  async function deleteAccount(){
    var copy=t();var status=document.getElementById('auth-delete-status');var confirm=document.getElementById('auth-delete-confirm-button');var cancel=document.getElementById('auth-delete-cancel');
    if(!navigator.onLine){if(status)status.textContent=copy.deleteOffline;return;}
    if(confirm)confirm.disabled=true;if(cancel)cancel.disabled=true;if(status)status.textContent=copy.deleting;
    try{
      if(!window.GenovaAccount||typeof window.GenovaAccount.deleteAccount!=='function')throw new Error('delete_unavailable');
      await window.GenovaAccount.deleteAccount();
      if(status)status.textContent=copy.deleted;
      try{if(window.GenovaAuth&&typeof window.GenovaAuth.logout==='function')await window.GenovaAuth.logout();}catch(_e){}
      window.setTimeout(function(){window.location.reload();},450);
    }catch(_e){
      if(status)status.textContent=copy.deleteError;
      if(confirm)confirm.disabled=false;if(cancel)cancel.disabled=false;
    }
  }

  function boot(){
    if(!ensure()){window.setTimeout(boot,120);return;}
    refresh();
    var toolbar=document.getElementById('auth-login-button');if(toolbar)toolbar.addEventListener('click',function(){window.setTimeout(refresh,0);});
    document.addEventListener('genova:auth-changed',function(){window.setTimeout(refresh,0);});
    document.addEventListener('genova:subscription-changed',function(){window.setTimeout(refresh,0);});
    document.addEventListener('genova:sync-status',function(){window.setTimeout(renderLocalMetrics,0);});
    document.addEventListener('genova:data-synced',function(){window.setTimeout(refresh,0);});
    document.addEventListener('app:set-lang',function(){window.setTimeout(refresh,0);});
    window.addEventListener('online',refreshQuota);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
