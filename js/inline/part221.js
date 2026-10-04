(function(){
  const list = window.GM_SPONSORS || [];
  const track = document.getElementById('sponsor-track');
  if(!track || list.length === 0) return;

  const TEXT = {
    it:{ title:'Spazio Sponsor disponibile', body:'Vuoi promuovere la tua attività, struttura, evento o servizio su Genova mApp? Contattaci per informazioni e disponibilità.', contact:'Contattaci', close:'Chiudi', slot:'Spazio Sponsor' },
    en:{ title:'Sponsor space available', body:'Would you like to promote your business, venue, event or service on Genova mApp? Contact us for information and availability.', contact:'Contact us', close:'Close', slot:'Sponsor space' },
    es:{ title:'Espacio de patrocinio disponible', body:'¿Quieres promocionar tu actividad, establecimiento, evento o servicio en Genova mApp? Contáctanos para recibir información y consultar disponibilidad.', contact:'Contáctanos', close:'Cerrar', slot:'Espacio Sponsor' },
    fr:{ title:'Espace sponsor disponible', body:'Vous souhaitez promouvoir votre activité, établissement, événement ou service sur Genova mApp ? Contactez-nous pour obtenir des informations et connaître les disponibilités.', contact:'Nous contacter', close:'Fermer', slot:'Espace Sponsor' },
    ar:{ title:'مساحة إعلانية متاحة', body:'هل ترغب في الترويج لنشاطك أو منشأتك أو فعاليتك أو خدمتك على Genova mApp؟ تواصل معنا للحصول على المعلومات ومعرفة التوفر.', contact:'اتصل بنا', close:'إغلاق', slot:'مساحة راعٍ' },
    ru:{ title:'Свободное место для спонсора', body:'Хотите продвигать свою компанию, площадку, мероприятие или услугу в Genova mApp? Свяжитесь с нами, чтобы узнать условия и доступность.', contact:'Связаться с нами', close:'Закрыть', slot:'Место спонсора' },
    zh:{ title:'赞助位可预订', body:'想在 Genova mApp 上推广您的商家、场所、活动或服务吗？请联系我们了解详情及可用位置。', contact:'联系我们', close:'关闭', slot:'赞助位' },
    lij:{ title:'Spaçio Sponsor disponibile', body:'Ti veu promove a teu ativitæ, struttura, evento ò serviçio in sce Genova mApp? Contattine pe aveiga informaçioin e disponibilitæ.', contact:'Contattine', close:'Særa', slot:'Spaçio Sponsor' }
  };

  function lang(){
    var raw = 'it';
    try{ raw = (document.documentElement.getAttribute('lang') || localStorage.getItem('lang') || 'it').toLowerCase(); }catch(_){}
    if(raw.indexOf('lij') === 0) return 'lij';
    if(raw.indexOf('en') === 0) return 'en';
    if(raw.indexOf('es') === 0) return 'es';
    if(raw.indexOf('fr') === 0) return 'fr';
    if(raw.indexOf('ar') === 0) return 'ar';
    if(raw.indexOf('ru') === 0) return 'ru';
    if(raw.indexOf('zh') === 0 || raw.indexOf('cn') === 0) return 'zh';
    return 'it';
  }

  function dict(){ return TEXT[lang()] || TEXT.it; }

  var modal = null;
  var lastFocus = null;

  function ensureModal(){
    if(modal) return modal;
    var overlay = document.createElement('div');
    overlay.id = 'sponsor-slot-overlay';
    overlay.className = 'sponsor-slot-hidden';
    overlay.setAttribute('aria-hidden','true');

    var panel = document.createElement('section');
    panel.id = 'sponsor-slot-panel';
    panel.className = 'sponsor-slot-hidden';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','true');
    panel.setAttribute('aria-labelledby','sponsor-slot-title');
    panel.innerHTML =
      '<button type="button" class="sponsor-slot-close" aria-label="Chiudi">×</button>' +
      '<div class="sponsor-slot-icon" aria-hidden="true">★</div>' +
      '<h3 id="sponsor-slot-title"></h3>' +
      '<p class="sponsor-slot-category"></p>' +
      '<p class="sponsor-slot-body"></p>' +
      '<button type="button" class="sponsor-slot-contact"></button>';

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    function close(){
      overlay.classList.add('sponsor-slot-hidden');
      panel.classList.add('sponsor-slot-hidden');
      overlay.setAttribute('aria-hidden','true');
      if(lastFocus && typeof lastFocus.focus === 'function'){
        try{ lastFocus.focus(); }catch(_){}
      }
      lastFocus = null;
    }

    function openContact(){
      close();
      try{
        var reason = document.querySelector('#contact-form input[name="reason"][value="add_event_place_sponsor"]');
        if(reason){
          reason.checked = true;
          reason.dispatchEvent(new Event('change', {bubbles:true}));
        }
      }catch(_){}
      setTimeout(function(){
        var row = document.querySelector('#settings-dropdown .settings-row[data-action="contact"]');
        if(row){ row.click(); return; }
        try{
          var ev = (typeof CustomEvent === 'function') ? new CustomEvent('settings:contact') : null;
          if(ev) document.dispatchEvent(ev);
        }catch(_){}
      }, 0);
    }

    overlay.addEventListener('click', close);
    panel.querySelector('.sponsor-slot-close').addEventListener('click', close);
    panel.querySelector('.sponsor-slot-contact').addEventListener('click', openContact);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && !panel.classList.contains('sponsor-slot-hidden')) close();
    });

    modal = { overlay:overlay, panel:panel, close:close };
    return modal;
  }

  function openSlot(s, source){
    var m = ensureModal();
    var d = dict();
    lastFocus = source || null;
    m.panel.querySelector('#sponsor-slot-title').textContent = d.title;
    m.panel.querySelector('.sponsor-slot-category').textContent = s.category || '';
    m.panel.querySelector('.sponsor-slot-body').textContent = d.body;
    m.panel.querySelector('.sponsor-slot-contact').textContent = d.contact;
    var closeBtn = m.panel.querySelector('.sponsor-slot-close');
    closeBtn.setAttribute('aria-label', d.close);
    closeBtn.setAttribute('title', d.close);
    m.panel.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
    m.overlay.classList.remove('sponsor-slot-hidden');
    m.panel.classList.remove('sponsor-slot-hidden');
    m.overlay.setAttribute('aria-hidden','false');
    try{ m.panel.querySelector('.sponsor-slot-contact').focus(); }catch(_){}
  }

  function makeItem(s){
    var isSlot = !!(s && (s.available || s.type === 'slot' || !s.url));
    var el = document.createElement(isSlot ? 'button' : 'a');
    el.className = 'sp' + (isSlot ? ' sp-available' : '');

    if(isSlot){
      el.type = 'button';
      el.setAttribute('aria-haspopup','dialog');
      el.title = (dict().slot + (s.category ? ' · ' + s.category : ''));
      el.addEventListener('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        openSlot(s, el);
      });
    }else{
      el.href = s.url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      el.title = s.name || '';
    }

    if(s.bg) el.style.background = s.bg;
    if(s.fg) el.style.color = s.fg;

    var ico = document.createElement('span');
    ico.className = 'ico';
    ico.textContent = s.ico || '★';
    el.appendChild(ico);

    var label = isSlot ? (dict().slot + (s.category ? ' · ' + s.category : '')) : (s.name || '');
    el.appendChild(document.createTextNode(' ' + label));
    return el;
  }

  function appendSequence(){
    list.forEach(function(s){
      track.appendChild(makeItem(s));
      var sep = document.createElement('span');
      sep.className = 'sep';
      sep.textContent = ' | ';
      track.appendChild(sep);
    });
  }

  appendSequence();
  appendSequence();
})();
