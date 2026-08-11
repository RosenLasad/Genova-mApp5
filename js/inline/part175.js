
(function(){

  
  if (typeof window.isSubscribed === 'undefined') { window.isSubscribed = false; }
// Stato fake di pagamento, salvato in localStorage

// DEMO: se non esiste ancora una scelta, parti come abbonato (gold)
try{
  if(localStorage.getItem('genovaqr_sub') == null){
    localStorage.setItem('genovaqr_sub', '1');
  }
}catch(e){}


  function isGold(){
  try { return localStorage.getItem('genovaqr_sub') === '1'; }
  catch(_) { return true; }
}

  function setGold(v){
    try {
      localStorage.setItem('genovaqr_sub', v ? '1' : '0');
    } catch(_){}
  }

  // Lingue / testi per le voci menu e per le modali
  var STRINGS = {
    silver: {
      user: {
        it:"Utente: anonimo", en:"User: guest", fr:"Utilisateur : invité",
        de:"Benutzer: Gast", es:"Usuario: invitado", pt:"Utilizador: convidado",
        ar:"مستخدم: زائر", ru:"Пользователь: ospite", zh:"訪客使用者",
        lij:"Utente: foresto"
      },
      primary:{
        it:"Iscriviti e passa a Premium",
        en:"Vànni in Premium",
        fr:"Passe en Premium",
        de:"Premium holen",
        es:"Hazte Premium",
        pt:"Torna-te Premium",
        ar:"اشترك وفعِّل Premium",
        ru:"Стать Premium",
        zh:"升級 Premium",
        lij:"Vànni in Premium"
      },
      secondary:{
        it:"Vantaggi dell’iscrizione",
        en:"Why go Premium",
        fr:"Avantages Premium",
        de:"Perché Premium",
        es:"Ventajas Premium",
        pt:"Vantagens Premium",
        ar:"ليش Premium مفيد؟",
        ru:"Зачем Premium",
        zh:"為什麼升級",
        lij:"Cöse ti ghe guadagni"
      },
      tertiary:null // non usata in silver
    },
    gold: {
      userLabel:{
        it:"Nome utente",
        en:"Username",
        fr:"Nom utente",
        de:"Benutzername",
        es:"Nombre utente",
        pt:"Nome utente",
        ar:"اسم المستخدم",
        ru:"Имя utente",
        zh:"用戶名",
        lij:"Nómme utente"
      },
      cancel:{
        it:"Annulla iscrizione",
        en:"Cancel subscription",
        fr:"Annuler l’abonnement",
        de:"Abbonamento aus",
        es:"Cancelar suscripción",
        pt:"Cancelar subscrição",
        ar:"إلغاء الاشتراك",
        ru:"Отменить подписку",
        zh:"取消訂閱",
        lij:"Leva abonamento"
      },
      info:{
        it:"Info utente",
        en:"Account info",
        fr:"Infos utente",
        de:"Dati utente",
        es:"Datos de la cuenta",
        pt:"Dados da conta",
        ar:"بيانات الحساب",
        ru:"Профиль",
        zh:"帳號資料",
        lij:"Dæti utente"
      }
    }
  };

  var MODAL_COPY = {
  subscribe:{
    title:{
      it:"Passa a Premium",
      en:"Go Premium",
      fr:"Passe en Premium",
      es:"Hazte Premium",
      ru:"Premium",
      zh:"升級 Premium",
      ar:"Premium",
      lij:"Vànni in Premium"
    },
    body:{
      it:"Abbonati per sbloccare tutti i contenuti multimediali.",
      en:"Unlock all documentary videos with Premium.",
      fr:"Débloque tout le contenu video.",
      es:"Desbloquea todos los videos completos.",
      ru:"Доступ ко всем полным video.",
      zh:"解鎖全部影片完整i.",
      ar:"كل الفيديو الكامل والمحت contenuti extra.",
      lij:"Te vedi tutti i video interi, senza tagli."
    }
  },

  perks:{
    title:{
      it:"Vantaggi dell’iscrizione",
      en:"Why go Premium",
      fr:"Avantages Premium",
      es:"Ventajas Premium",
      ru:"Perché Premium",
      zh:"為什麼 Premium",
      ar:"ليش Premium مفيد؟",
      lij:"Cöse ti ghe guadagni"
    },
    body:{
      it:"Video completi, percorsi esclusivi, materiali extra.",
      en:"Full videos, exclusive routes, extra material.",
      fr:"Vidéos complètes, parcours exclusifs, bonus.",
      es:"Vídeos completos, rutas extra, material extra.",
      ru:"Полные видео, эксклюзивные percorsi.",
      zh:"完整版影片、獨家路線、額外 contenuti.",
      ar:"فيديو كامل ومسارات خاصة ومحتوى إضافي.",
      lij:"Video lunghi, giri speciali, roba che sanno solo i genovesi."
    }
  },

  info:{
    title:{
      it:"Info utente",
      en:"Account info",
      fr:"Infos utente",
      es:"Datos account",
      ru:"Dati account",
      zh:"帳號資料",
      ar:"معلومات الحساب",
      lij:"Dæti utente"
    },
    body:{
      it:"Nickname, email e stato abbonamento.",
      en:"Nickname, email and subscription status.",
      fr:"Pseudo, email et état d’abonnement.",
      es:"Nick, correo y estado de suscripción.",
      ru:"Ник, почта, статус подписки.",
      zh:"暱稱、郵件、訂閱狀態。",
      ar:"الكنية والبريد وحالة الاشتراك.",
      lij:"Nómme, email e se t’ê gold ò silver."
    }
  },

  cancel:{
    title:{
      it:"Annulla iscrizione",
      en:"Cancel subscription",
      fr:"Annuler l’abonnement",
      es:"Cancelar suscripción",
      ru:"Отменere l’abbonamento",
      zh:"取消訂閱",
      ar:"إلغاء الاشتراك",
      lij:"Leva abonamento"
    },
    // nota: qui non mettiamo già i bottoni nel testo.
    // Li costruiamo via JS quando apriamo la modale.
    body:{
      it:"Vuoi davvero tornare utente anonimo?",
      en:"Do you really want to go back to guest?",
      fr:"Tu veux redevenir invité ?",
      es:"¿Seguro que quieres volver a invitado?",
      ru:"Точно вернуться в гостя?",
      zh:"確定要回are ospite?",
      ar:"متأكد ترجع زائر؟",
      lij:"T’ê segûo che ti veu tornâ foresto?"
    },
    confirmBtn:{
      it:"Cancella iscrizione",
      en:"Cancel subscription",
      fr:"Conferma annulla",
      es:"Cancelar",
      ru:"Conferma",
      zh:"確認取消",
      ar:"تأكيد الإلغاء",
      lij:"Leva abonamento"
    },
    exitBtn:{
      it:"Esci",
      en:"Keep Premium",
      fr:"Resta Premium",
      es:"Salir",
      ru:"Restare Premium",
      zh:"保留 Premium",
      ar:"ابق Premium",
      lij:"Resto gold"
    }
  }
};

  function curLang(){
    var l = (document.documentElement.getAttribute('lang') || 'it').toLowerCase();
    return l.split('-')[0];
  }

  // Node refs
  var btnSub      = document.getElementById('btn-sub');
  var dropdown    = document.getElementById('sub-dropdown');
  var modal       = document.getElementById('sub-modal');
  var modalTitle  = modal ? modal.querySelector('#sub-modal-title') : null;
  var modalBody   = modal ? modal.querySelector('#sub-modal-body')  : null;
  var modalClose  = modal ? modal.querySelector('.sub-modal-close') : null;

  if(!btnSub || !dropdown || !modal){
    // se mancano i nodi, chiudiamo qui
    return;
  }

  // aggiorna icona e stato bottone moneta
  function renderPayStatus(){
    var gold = isGold();
    btnSub.setAttribute('data-state', gold ? 'gold' : 'silver');
    btnSub.setAttribute('aria-expanded', 'false');

    var img = btnSub.querySelector('img');
    if (img){
      img.src = gold ? 'Abbonamento/coin-gold.svg' : 'Abbonamento/coin-silver.svg';
    }

    var sr = btnSub.querySelector('.sr-only');
    if (sr){
      if (gold){
        // TODO: qui in futuro metteremo il nickname reale
        sr.textContent = pickLang(STRINGS.gold.userLabel) + ': utente';
      } else {
        sr.textContent = pickLang(STRINGS.silver.user);
      }
    }
  }

  // helper per testo tradotto
  function pickLang(obj){
    var lang = curLang();
    return obj[lang] || obj.it || obj.en || '';
  }

  // riempi il menu a tendina in base allo stato
  function renderDropdown(){
    var gold = isGold();
    var rows = dropdown.querySelectorAll('.sub-row');
    if(!rows || rows.length < 3) return;

    if(!gold){
      // SILVER
      rows[0].textContent = pickLang(STRINGS.silver.user);
      rows[0].disabled = true;
      rows[0].setAttribute('data-popup',''); // no popup

      rows[1].textContent = pickLang(STRINGS.silver.primary);
      rows[1].disabled = false;
      rows[1].setAttribute('data-popup','subscribe');

      rows[2].textContent = pickLang(STRINGS.silver.secondary);
      rows[2].disabled = false;
      rows[2].setAttribute('data-popup','perks');
    } else {
      // GOLD
      rows[0].textContent = pickLang(STRINGS.gold.userLabel) + ': utente';
      rows[0].disabled = true;
      rows[0].setAttribute('data-popup','info'); // in futuro: "profilo"

      rows[1].textContent = pickLang(STRINGS.gold.cancel);
      rows[1].disabled = false;
      rows[1].setAttribute('data-popup','cancel');

      rows[2].textContent = pickLang(STRINGS.gold.info);
      rows[2].disabled = false;
      rows[2].setAttribute('data-popup','info');
    }
  }

  function openDropdown(){
    dropdown.classList.add('open');
    btnSub.setAttribute('aria-expanded','true');
  }
  function closeDropdown(){
    dropdown.classList.remove('open');
    btnSub.setAttribute('aria-expanded','false');
  }
  function toggleDropdown(){
    if(dropdown.classList.contains('open')) closeDropdown();
    else openDropdown();
  }

  // click fuori dal menu per chiuderlo
  document.addEventListener('click', function(e){
    if(!dropdown.classList.contains('open')) return;
    var inside = dropdown.contains(e.target) || btnSub.contains(e.target);
    if(!inside){
      closeDropdown();
    }
  }, true);

  // ESC per chiudere il menu
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && dropdown.classList.contains('open')){
      closeDropdown();
    }
  }, true);

  function openModal(kind){
  var data = MODAL_COPY[kind];
  if(!data || !modal || !modalTitle || !modalBody) return;

  // titolo
  modalTitle.textContent = pickLang(data.title);

  // corpo base
  // per "cancel" poi aggiungiamo i bottoni
  modalBody.innerHTML = "";
  var p = document.createElement('p');
  p.textContent = pickLang(data.body);
  modalBody.appendChild(p);

  if (kind === 'cancel') {
    // wrapper bottoni azione
    var actions = document.createElement('div');
    actions.style.display = "flex";
    actions.style.flexDirection = "column";
    actions.style.gap = "0.5rem";
    actions.style.marginTop = "1rem";

    // bottone conferma: diventa silver
    var btnConfirm = document.createElement('button');
    btnConfirm.style.all = "unset";
    btnConfirm.style.cursor = "pointer";
    btnConfirm.style.background = "#dc2626"; // rosso acceso
    btnConfirm.style.color = "#fff";
    btnConfirm.style.borderRadius = "8px";
    btnConfirm.style.padding = "0.6rem 0.8rem";
    btnConfirm.style.fontSize = ".9rem";
    btnConfirm.style.fontWeight = "600";
    btnConfirm.style.textAlign = "center";
    btnConfirm.textContent = pickLang(data.confirmBtn);
    btnConfirm.addEventListener('click', function(){
      window.isSubscribed = false;
if (typeof hidePaywall === 'function') { try{ hidePaywall(); }catch(e){} }
if (typeof renderMedia === 'function') { try{ renderMedia(); }catch(e){} }
// qui disiscriviamo davvero
      setGold(false);
      renderPayStatus();
      renderDropdown();
      closeModal();
    });

    // bottone exit: chiude popup senza cambiare lo stato gold
    var btnExit = document.createElement('button');
    btnExit.style.all = "unset";
    btnExit.style.cursor = "pointer";
    btnExit.style.background = "#4b5563"; // grigio
    btnExit.style.color = "#fff";
    btnExit.style.borderRadius = "8px";
    btnExit.style.padding = "0.6rem 0.8rem";
    btnExit.style.fontSize = ".9rem";
    btnExit.style.fontWeight = "500";
    btnExit.style.textAlign = "center";
    btnExit.textContent = pickLang(data.exitBtn);
    btnExit.addEventListener('click', function(){
      closeModal(); // non tocchiamo l'abbonamento
    });

    actions.appendChild(btnConfirm);
    actions.appendChild(btnExit);
    modalBody.appendChild(actions);
  }

  modal.classList.remove('hidden');
}

  function closeModal(){
    if (!modal) return;
    modal.classList.add('hidden');
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', function(e){
    var inner = modal.querySelector('.sub-modal-inner');
    if (inner && !inner.contains(e.target)) {
      closeModal();
    }
  });

  // click sulle righe del dropdown
  dropdown.addEventListener('click', function(e){
  var row = e.target.closest('.sub-row');
  if (!row) return;

  var popupKind = row.getAttribute('data-popup');

  if (!popupKind) {
    // voce solo informativa, tipo "Utente: foresto"
    closeDropdown();
    return;
  }

  if (popupKind === 'subscribe') {
    window.isSubscribed = true;
if (typeof hidePaywall === 'function') { try{ hidePaywall(); }catch(e){} }
if (typeof renderMedia === 'function') { try{ renderMedia(); }catch(e){} }
// qui l'utente passa da silver a gold
    setGold(true);
    renderPayStatus();
    renderDropdown();
    // apriamo anche la modale di benvenuto premium
    openModal('subscribe');
    closeDropdown();
    return;
  }

  if (popupKind === 'cancel') {
    // apre la modale con i bottoni Cancella iscrizione / Esci
    openModal('cancel');
    closeDropdown();
    return;
  }

  // altri casi informativi già previsti: perks, info
  openModal(popupKind);
  closeDropdown();
});

  // click sulla moneta apre/chiude menù
  btnSub.addEventListener('click', function(){
    toggleDropdown();
  });

  // re-render su cambio lingua dinamico
  var langObserver = new MutationObserver(function(mutations){
    var needRerender = false;
    mutations.forEach(function(m){
      if (m.type === 'attributes' && m.attributeName === 'lang') {
        needRerender = true;
      }
    });
    if (needRerender){
      renderPayStatus();
      renderDropdown();
    }
  });
  langObserver.observe(document.documentElement, { attributes: true });

  // primo render
  renderPayStatus();
  renderDropdown();
  closeDropdown();
  closeModal();

})();
