/* Genova mApp: disposizione funzionale dell'interfaccia v2. */
(function(){
  'use strict';
  if(window.__GENOVA_UI_LAYOUT_V2__) return;
  window.__GENOVA_UI_LAYOUT_V2__ = true;

  var arranging = false;
  var scheduled = false;

  function currentLang(){
    try{
      return String(localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it')
        .toLowerCase().split(/[-_]/)[0];
    }catch(_e){ return 'it'; }
  }

  function move(node, parent){
    if(node && parent && node.parentNode !== parent) parent.appendChild(node);
  }

  function arrangeHeader(){
    var header = document.querySelector('#app > header');
    if(!header) return;
    var left = header.querySelector('.toolbar-left');
    var center = header.querySelector('.toolbar-center');
    var right = header.querySelector('.toolbar-right');
    if(!left || !center || !right) return;

    var heading = header.querySelector('h1');
    var flagButton = document.getElementById('flag-switcher');
    var authButton = document.getElementById('auth-login-button');
    var subscription = document.querySelector('.sub-wrapper');
    var searchButton = document.getElementById('tb-search-btn');
    var settings = document.querySelector('.settings-wrapper');
    var installButton = document.getElementById('pwa-install-button');
    var search = document.getElementById('tb-search');

    /* Il selettore Lingue resta indipendente, nell'angolo inferiore sinistro. */
    if(flagButton) move(flagButton, document.body);

    var leftOrdered = [authButton, subscription].filter(Boolean);
    var leftCurrent = Array.prototype.filter.call(left.children, function(child){
      return leftOrdered.indexOf(child) !== -1;
    });
    var leftOrderIsCorrect = leftCurrent.length === leftOrdered.length && leftOrdered.every(function(node,index){
      return leftCurrent[index] === node;
    });
    if(!leftOrderIsCorrect) leftOrdered.forEach(function(node){ left.appendChild(node); });
    move(heading, center);
    /* Comandi generali dell'app: Installa, Impostazioni, Cerca.
       Il pulsante Installa puo essere assente/nascosto dopo l'installazione;
       Impostazioni e Cerca mantengono comunque la stessa posizione reciproca.
       Nota: move() non riordina nodi gia presenti nello stesso contenitore,
       quindi controlliamo esplicitamente l'ordine e lo correggiamo solo se serve. */
    var rightOrdered = [installButton, settings, searchButton].filter(Boolean);
    var rightCurrent = Array.prototype.filter.call(right.children, function(child){
      return rightOrdered.indexOf(child) !== -1;
    });
    var rightOrderIsCorrect = rightCurrent.length === rightOrdered.length && rightOrdered.every(function(node,index){
      return rightCurrent[index] === node;
    });
    if(!rightOrderIsCorrect){
      rightOrdered.forEach(function(node){ right.appendChild(node); });
    }

    if(flagButton){
      flagButton.setAttribute('aria-label', 'Lingue');
      flagButton.setAttribute('title', 'Lingue');
    }
  }

  function syncTaccuinoEdgeState(button){
    if(!button) return;
    var panel = document.getElementById('fav-notes-panel');
    var open = !!(panel && panel.classList.contains('open'));
    button.classList.toggle('is-active', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function ensureTaccuinoToolbar(){
    var original = document.getElementById('fav-notes-btn');
    var mapRoot = document.getElementById('map');
    if(!original || !mapRoot) return;

    var button = document.getElementById('ui-taccuino-button');
    if(!button){
      button = document.createElement('button');
      button.id = 'ui-taccuino-button';
      button.type = 'button';
      button.addEventListener('click', function(event){
        try{ event.preventDefault(); event.stopPropagation(); }catch(_e){}
        var source = document.getElementById('fav-notes-btn');
        if(source && typeof source.click === 'function') source.click();
        window.setTimeout(function(){ syncTaccuinoEdgeState(button); }, 0);
      });
      ['pointerdown','mousedown','touchstart','dblclick'].forEach(function(type){
        button.addEventListener(type, function(event){
          try{ event.stopPropagation(); }catch(_e){}
        }, type === 'touchstart' ? {passive:true} : false);
      });
    }

    button.className = 'ui-taccuino-edge';
    if(button.parentNode !== mapRoot) mapRoot.appendChild(button);

    var icon = button.querySelector('img.taccuino-toolbar-icon');
    if(!icon){
      button.innerHTML = '<img alt="" class="taccuino-toolbar-icon" src="toolbar/taccuino/taccuino-04-moderno.png">';
    }else if(icon.getAttribute('src') !== 'toolbar/taccuino/taccuino-04-moderno.png'){
      icon.setAttribute('src', 'toolbar/taccuino/taccuino-04-moderno.png');
    }

    var label = original.getAttribute('aria-label') || original.getAttribute('title') || 'Taccuino';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', original.getAttribute('title') || label);
    button.setAttribute('aria-controls', 'fav-notes-panel');
    button.setAttribute('aria-haspopup', 'dialog');
    syncTaccuinoEdgeState(button);

    var panel = document.getElementById('fav-notes-panel');
    if(panel && !panel.__uiTaccuinoEdgeObserved && window.MutationObserver){
      panel.__uiTaccuinoEdgeObserved = true;
      new MutationObserver(function(){
        syncTaccuinoEdgeState(document.getElementById('ui-taccuino-button'));
      }).observe(panel, {attributes:true, attributeFilter:['class','aria-hidden']});
    }
  }

  function homeIconSvg(){
    return '<svg data-ui-icon="home" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>';
  }

  function rotateIconSvg(){
    return '<svg data-ui-icon="rotate" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7a8 8 0 0 0-13.8-2L4 7"/><path d="M4 3v4h4"/><path d="M4 17a8 8 0 0 0 13.8 2L20 17"/><path d="M20 21v-4h-4"/></svg>';
  }

  function mapControlLabels(){
    var labels = {
      it:{home:'Vista iniziale',homeAria:'Ripristina la vista iniziale della mappa',rotate:'Rotazione',rotateOff:'Rotazione: usa il joystick per ruotare e inclinare la vista',rotateOn:'Rotazione attiva: premi per tornare allo spostamento'},
      en:{home:'Initial view',homeAria:'Restore the initial map view',rotate:'Rotation',rotateOff:'Rotation: use the joystick to rotate and tilt the view',rotateOn:'Rotation active: press to return to map movement'},
      es:{home:'Vista inicial',homeAria:'Restaurar la vista inicial del mapa',rotate:'Rotacion',rotateOff:'Rotacion: usa el joystick para girar e inclinar la vista',rotateOn:'Rotacion activa: pulsa para volver al desplazamiento'},
      fr:{home:'Vue initiale',homeAria:'Restaurer la vue initiale de la carte',rotate:'Rotation',rotateOff:'Rotation : utilisez le joystick pour tourner et incliner la vue',rotateOn:'Rotation active : appuyez pour revenir au deplacement'},
      ar:{home:'العرض الاولي',homeAria:'استعادة العرض الاولي للخريطة',rotate:'دوران',rotateOff:'الدوران: استخدم عصا التحكم لتدوير العرض وامالته',rotateOn:'الدوران مفعل: اضغط للعودة الى تحريك الخريطة'},
      ru:{home:'Начальный вид',homeAria:'Восстановить начальный вид карты',rotate:'Вращение',rotateOff:'Вращение: используйте джойстик для поворота и наклона вида',rotateOn:'Вращение включено: нажмите, чтобы вернуться к перемещению карты'},
      zh:{home:'初始视图',homeAria:'恢复地图初始视图',rotate:'旋转',rotateOff:'旋转：使用摇杆旋转和倾斜视角',rotateOn:'旋转已启用：按下可恢复地图平移'},
      lij:{home:'Vista iniçiale',homeAria:'Repiggia a vista iniçiale da mappa',rotate:'Rotaçion',rotateOff:'Rotaçion: deuvi o joystick pe giâ e inclinâ a vista',rotateOn:'Rotaçion ativa: sciacca pe tornâ a spostâ a mappa'}
    };
    return labels[currentLang()] || labels.it;
  }

  function syncHomeButton3DState(){
    var home = document.getElementById('btn-home');
    if(!home) return;
    var api = window.__gmMap3D;
    var active3D = !!(api && api.isActive && api.isActive());
    var text = mapControlLabels();
    if(active3D){
      var lookMode = !!(api.isJoystickLookMode && api.isJoystickLookMode());
      home.dataset.uiMapMode = 'rotate';
      home.setAttribute('aria-pressed', lookMode ? 'true' : 'false');
      home.setAttribute('title', lookMode ? text.rotateOn : text.rotateOff);
      home.setAttribute('aria-label', lookMode ? text.rotateOn : text.rotateOff);
      if(!home.querySelector('[data-ui-icon="rotate"]')) home.innerHTML = rotateIconSvg();
    }else{
      home.dataset.uiMapMode = 'home';
      home.removeAttribute('aria-pressed');
      home.setAttribute('title', text.home);
      home.setAttribute('aria-label', text.homeAria);
      if(!home.querySelector('[data-ui-icon="home"]')) home.innerHTML = homeIconSvg();
    }
  }

  function wire3DHomeButton(){
    var home = document.getElementById('btn-home');
    if(!home) return;
    if(!home.__ui3DRotationBound){
      home.__ui3DRotationBound = true;
      /* In 3D intercetta il vecchio click "Vista iniziale" prima del listener
         Leaflet e lo trasforma nel selettore Spostamento / Rotazione. */
      home.addEventListener('click', function(event){
        var api = window.__gmMap3D;
        if(!(api && api.isActive && api.isActive())) return;
        event.preventDefault();
        event.stopPropagation();
        if(event.stopImmediatePropagation) event.stopImmediatePropagation();
        if(api.toggleJoystickLookMode) api.toggleJoystickLookMode();
        syncHomeButton3DState();
      }, true);
    }
    syncHomeButton3DState();
  }

  function ensureMapControls(){
    var joystick = document.querySelector('.joystick');
    var zoom = document.querySelector('.leaflet-control-zoom');
    if(!joystick && !zoom) return;

    var controls = document.getElementById('ui-map-controls');
    if(!controls){
      controls = document.createElement('div');
      controls.id = 'ui-map-controls';
      controls.setAttribute('aria-label', 'Controlli della mappa');
      document.body.appendChild(controls);
    }

    move(joystick, controls);
    move(document.getElementById('btn-home'), controls);

    if(zoom){
      var zoomAnchor = document.getElementById('ui-zoom-anchor');
      if(!zoomAnchor){
        zoomAnchor = document.createElement('div');
        zoomAnchor.id = 'ui-zoom-anchor';
        controls.appendChild(zoomAnchor);
      }
      move(zoom, zoomAnchor);
      zoom.style.setProperty('position', 'static', 'important');
      zoom.style.setProperty('margin', '0', 'important');
      zoom.style.setProperty('transform', 'none', 'important');
      zoom.style.setProperty('transform-origin', 'center', 'important');
    }

  }

  function arrangeBottomBar(){
    var bar = document.getElementById('bottom-bar');
    if(!bar) return;

    var help = document.getElementById('help-fab');
    var settings = document.querySelector('.settings-wrapper');
    var showQr = document.getElementById('btn-qr-removed');
    var gps = document.getElementById('btn-gps');
    var scanQr = document.getElementById('map-qr-fab');
    var home = document.getElementById('btn-home');
    /* Gruppo coerente in basso: Mostra QR, GPS, Scan QR. */
    var order = [showQr, gps, scanQr].filter(Boolean);

    order.forEach(function(node){ move(node, bar); });
    if(help) move(help, document.body);
    var helpAction = document.getElementById('settings-help-action');
    var helpPanel = document.getElementById('help-legend');
    var settingsAnchor = document.getElementById('btn-settings');
    if(helpPanel && settingsAnchor){
      var anchorRect = settingsAnchor.getBoundingClientRect();
      var panelWidth = Math.min(window.innerWidth * .92, 360);
      var center = Math.max(panelWidth / 2 + 8, Math.min(window.innerWidth - panelWidth / 2 - 8, anchorRect.left + anchorRect.width / 2));
      var header = document.querySelector('#app > header');
      var headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      var panelTop = Math.max(headerBottom + 8, anchorRect.bottom + 8);
      helpPanel.style.setProperty('--help-anchor-left', center + 'px');
      helpPanel.style.setProperty('--help-anchor-top', panelTop + 'px');
      helpPanel.style.setProperty('--help-available-height', Math.max(90, window.innerHeight - panelTop - 12) + 'px');
    }
    if(helpAction){
      var lang = (document.documentElement.lang || 'it').split('-')[0];
      var labels = {it:'Guida e istruzioni',en:'Guide and instructions',es:'Guía e instrucciones',fr:'Guide et instructions',ar:'الدليل والتعليمات',ru:'Руководство и инструкции',zh:'指南与说明',lij:'Guida e istruçioin'};
      var text = labels[lang] || labels.it;
      if(helpAction.textContent !== text) helpAction.textContent = text;
      helpAction.setAttribute('aria-controls', 'gm-new-home');
      if(!helpAction.__helpBound){
        helpAction.__helpBound = true;
        helpAction.addEventListener('click', function(event){
          event.preventDefault(); event.stopPropagation();
          if(settings) settings.classList.remove('open');
          var settingsButton = document.getElementById('btn-settings');
          if(settingsButton) settingsButton.setAttribute('aria-expanded','false');
          if(typeof window.gmOpenNewHomeGuide === 'function'){
            window.gmOpenNewHomeGuide(helpAction);
          }else if(typeof window.gmOpenNewHome === 'function'){
            // Fallback prudenziale: apre almeno la New Home se la funzione diretta non è disponibile.
            window.gmOpenNewHome(helpAction);
          }
        });
      }
    }

    if(home){
      wire3DHomeButton();
      syncHomeButton3DState();
    }

    var info = document.getElementById('btn-info');
    if(info){
      info.setAttribute('tabindex', '-1');
      info.setAttribute('aria-hidden', 'true');
    }
  }

  function positionFlagMenu(){
    var button = document.getElementById('flag-switcher');
    var menu = document.getElementById('flag-menu');
    if(!button || !menu) return;
    var rect = button.getBoundingClientRect();
    var width = menu.offsetWidth || 42;
    var left = Math.max(6, Math.min(window.innerWidth - width - 6, rect.left + (rect.width - width) / 2));
    menu.style.setProperty('left', Math.round(left) + 'px', 'important');
    var gap = 8;
    menu.style.setProperty('top', 'auto', 'important');
    menu.style.setProperty('bottom', Math.round(window.innerHeight - rect.top + gap) + 'px', 'important');
  }

  function wireFlagMenu(){
    var button = document.getElementById('flag-switcher');
    var menu = document.getElementById('flag-menu');
    if(button && !button.__uiLayoutV2Positioned){
      button.__uiLayoutV2Positioned = true;
      button.addEventListener('click', function(){ setTimeout(positionFlagMenu, 0); });
    }
    if(menu && !menu.__uiLayoutV2Close){
      menu.__uiLayoutV2Close = true;
      menu.addEventListener('click', function(event){
        var flag = event.target.closest && event.target.closest('.flag[data-lang]');
        if(!flag) return;
        menu.classList.remove('open');
        if(button) button.setAttribute('aria-expanded', 'false');
      });
    }
    positionFlagMenu();
  }

  function wireSearch(){
    var button = document.getElementById('tb-search-btn');
    var field = document.getElementById('tb-search');
    var header = document.querySelector('#app > header');
    if(!button || !field || !header || button.__uiLayoutV2Search) return;
    button.__uiLayoutV2Search = true;
    button.addEventListener('click', function(event){
      event.preventDefault();
      event.stopImmediatePropagation();
      var willOpen = !header.classList.contains('tb-search-open');
      header.classList.toggle('tb-search-open', willOpen);
      var input = document.getElementById('tb-search-input');
      if(input){
        if(willOpen) input.focus();
        else input.blur();
      }
    }, true);
  }

  function sizeHomeMenu(){
    var home = document.getElementById('menu-home');
    var body = home && home.querySelector('.mh-body');
    if(!home || !body) return;

    var top = home.getBoundingClientRect().top;
    if(!isFinite(top) || top < 1){
      var title = document.getElementById('title-btn');
      var titleRect = title && title.getBoundingClientRect();
      top = titleRect ? titleRect.bottom + 8 : 60;
    }

    var bottomBar = document.getElementById('bottom-bar');
    var barRect = bottomBar && bottomBar.getBoundingClientRect();
    var lowerLimit = barRect && barRect.top > top
      ? barRect.top - 12
      : window.innerHeight - 12;
    var available = Math.max(150, Math.floor(lowerLimit - top));
    var value = available + 'px';

    if(home.style.getPropertyValue('--ui-home-max-height') !== value){
      home.style.setProperty('--ui-home-max-height', value);
    }
  }

  function wireHomeMenuSizing(){
    var title = document.getElementById('title-btn');
    var home = document.getElementById('menu-home');
    if(title && !title.__uiLayoutV2HomeSize){
      title.__uiLayoutV2HomeSize = true;
      title.addEventListener('click', function(){
        window.setTimeout(sizeHomeMenu, 0);
        window.setTimeout(sizeHomeMenu, 180);
      });
    }
    if(home && !home.__uiLayoutV2HomeSize){
      home.__uiLayoutV2HomeSize = true;
      home.addEventListener('click', function(event){
        if(event.target.closest && event.target.closest('.gm-row')){
          window.setTimeout(sizeHomeMenu, 0);
          window.setTimeout(sizeHomeMenu, 240);
        }
      });
    }
    sizeHomeMenu();
  }

  function ensureVisualIcons(){
    var icons = {
      'help-fab':
        '<svg data-ui-icon="help" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 0 1 4.6 1c0 1.8-2.4 2.1-2.4 3.8"/><path d="M12 17h.01"/></svg>',
      'btn-settings':
        '<svg data-ui-icon="settings" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1V21H9.6v-.09A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4H3V9.6h.09A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1V3h4v.09A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.14.38.35.72.6 1 .28.29.64.43 1 .4h.09v4H21c-.4-.03-.76.11-1 .4-.25.28-.46.62-.6 1Z"/></svg>',
      'btn-gps':
        '<svg data-ui-icon="gps" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
      'map-qr-fab':
        '<svg data-ui-icon="qr" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/><rect x="8" y="8" width="3" height="3" rx=".4" fill="currentColor" stroke="none"/><rect x="13" y="8" width="3" height="3" rx=".4" fill="currentColor" stroke="none"/><rect x="8" y="13" width="3" height="3" rx=".4" fill="currentColor" stroke="none"/><path d="M14 14h2v2h-2z" fill="currentColor" stroke="none"/></svg>',
      'btn-home': homeIconSvg()
    };
    Object.keys(icons).forEach(function(id){
      var button = document.getElementById(id);
      if(!button || button.querySelector('[data-ui-icon]')) return;
      button.innerHTML = icons[id];
    });
    syncHomeButton3DState();
  }

  function infoLabel(){
    var labels = {
      it:'Info e contatti', en:'Information and contacts', es:'Información y contactos',
      fr:'Informations et contacts', ar:'المعلومات والاتصال', ru:'Информация и контакты',
      zh:'信息与联系方式', lij:'Informaçioin e contatti'
    };
    return labels[currentLang()] || labels.it;
  }

  function augmentHelpPanel(){
    var panel = document.getElementById('help-legend');
    if(!panel) return;
    var action = document.getElementById('ui-help-info-action');
    if(!action || !panel.contains(action)){
      action = document.createElement('button');
      action.id = 'ui-help-info-action';
      action.type = 'button';
      panel.appendChild(action);
      action.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        panel.classList.remove('open');
        var info = document.getElementById('btn-info');
        if(info && typeof info.click === 'function') info.click();
      });
    }
    action.textContent = infoLabel();
    action.setAttribute('aria-label', infoLabel());
  }

  function observeHelpPanel(){
    var panel = document.getElementById('help-legend');
    if(!panel || panel.__uiLayoutV2Observed) return;
    panel.__uiLayoutV2Observed = true;
    new MutationObserver(function(){ schedule(); }).observe(panel, {childList:true});
  }


  /* Impostazioni: pannello centrale, indipendente dalla posizione del bottone. */
  function settingsModalText(){
    var labels = {
      it:{title:'Impostazioni', close:'Chiudi Impostazioni'},
      en:{title:'Settings', close:'Close Settings'},
      es:{title:'Ajustes', close:'Cerrar Ajustes'},
      fr:{title:'Parametres', close:'Fermer les parametres'},
      ar:{title:'الإعدادات', close:'إغلاق الإعدادات'},
      ru:{title:'Настройки', close:'Закрыть настройки'},
      zh:{title:'设置', close:'关闭设置'},
      lij:{title:'Impostaçioin', close:'Særa e impostaçioin'}
    };
    return labels[currentLang()] || labels.it;
  }

  function closeSettingsModal(){
    var wrap = document.querySelector('.settings-wrapper');
    var button = document.getElementById('btn-settings');
    if(wrap) wrap.classList.remove('open');
    if(button) button.setAttribute('aria-expanded','false');
  }

  function syncSettingsModalState(){
    var wrap = document.querySelector('.settings-wrapper');
    var overlay = document.getElementById('settings-modal-overlay');
    if(!wrap || !overlay) return;
    var open = wrap.classList.contains('open');
    overlay.classList.toggle('is-open', open);
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function ensureSettingsModal(){
    var wrap = document.querySelector('.settings-wrapper');
    var panel = document.getElementById('settings-dropdown');
    if(!wrap || !panel) return;

    var overlay = document.getElementById('settings-modal-overlay');
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'settings-modal-overlay';
      overlay.setAttribute('aria-hidden','true');
      document.body.appendChild(overlay);
      overlay.addEventListener('click', function(event){
        /* Chiude solo cliccando sullo sfondo, non sul pannello. */
        if(event.target !== overlay) return;
        event.preventDefault();
        closeSettingsModal();
      });
    }

    /*
       Il pannello viene portato a livello di <body>, dentro l'overlay.
       Prima restava nella toolbar/header: l'overlay viveva in uno stacking
       context superiore e finiva quindi sopra al pannello, sfocandolo e
       intercettando i click. I listener gia' collegati al pannello restano
       validi anche dopo il reparenting del nodo.
    */
    if(panel.parentNode !== overlay) overlay.appendChild(panel);

    var head = panel.querySelector('.settings-modal-head');
    if(!head){
      head = document.createElement('div');
      head.className = 'settings-modal-head';

      var title = document.createElement('div');
      title.className = 'settings-modal-title';
      title.id = 'settings-modal-title';
      head.appendChild(title);

      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'settings-modal-close';
      close.innerHTML = '<span aria-hidden="true">&times;</span>';
      close.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        closeSettingsModal();
      });
      head.appendChild(close);
      panel.insertBefore(head, panel.firstChild);
    }

    var text = settingsModalText();
    var titleEl = panel.querySelector('.settings-modal-title');
    var closeEl = panel.querySelector('.settings-modal-close');
    if(titleEl) titleEl.textContent = text.title;
    if(closeEl){
      closeEl.setAttribute('aria-label', text.close);
      closeEl.setAttribute('title', text.close);
    }

    panel.setAttribute('aria-labelledby','settings-modal-title');

    if(!wrap.__settingsModalObserved){
      wrap.__settingsModalObserved = true;
      new MutationObserver(syncSettingsModalState).observe(wrap, {attributes:true, attributeFilter:['class']});
    }
    syncSettingsModalState();
  }

  function arrange(){
    if(arranging) return;
    arranging = true;
    try{
      arrangeHeader();
      ensureSettingsModal();
      ensureTaccuinoToolbar();
      arrangeBottomBar();
      ensureMapControls();
      wireFlagMenu();
      wireSearch();
      wireHomeMenuSizing();
      ensureVisualIcons();
      wire3DHomeButton();
      augmentHelpPanel();
      observeHelpPanel();
    }finally{
      arranging = false;
    }
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function(){
      scheduled = false;
      arrange();
    });
  }

  function boot(){
    /* Compatibilità con il vecchio gestore del selettore lingue. */
    window.repositionMenuUp = positionFlagMenu;
    arrange();
    [80, 250, 600, 1100, 1800].forEach(function(delay){ window.setTimeout(arrange, delay); });
    new MutationObserver(schedule).observe(document.body, {childList:true, subtree:true});
    window.addEventListener('resize', function(){ arrange(); positionFlagMenu(); sizeHomeMenu(); }, {passive:true});
    window.addEventListener('orientationchange', function(){ window.setTimeout(arrange, 80); });
    document.addEventListener('app:set-lang', function(){ window.setTimeout(arrange, 0); });
    document.addEventListener('app:map-3d-change', function(){ window.setTimeout(syncHomeButton3DState, 0); });
    document.addEventListener('app:map-3d-joystick-mode', function(){ window.setTimeout(syncHomeButton3DState, 0); });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
