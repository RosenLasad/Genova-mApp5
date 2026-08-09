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
    move(searchButton, right);

    if(flagButton){
      flagButton.setAttribute('aria-label', 'Lingue');
      flagButton.setAttribute('title', 'Lingue');
    }
  }

  function ensureTaccuinoToolbar(){
    var original = document.getElementById('fav-notes-btn');
    if(!original) return;
    var right = document.querySelector('#app > header .toolbar-right');
    if(!right) return;
    var button = document.getElementById('ui-taccuino-button');
    if(!button){
      button = document.createElement('button');
      button.id = 'ui-taccuino-button';
      button.type = 'button';
      button.className = 'btn';
      button.addEventListener('click', function(){
        var source = document.getElementById('fav-notes-btn');
        if(source && typeof source.click === 'function') source.click();
      });
    }
    var icon = button.querySelector('img.taccuino-toolbar-icon');
    if(!icon){
      button.innerHTML = '<img alt="" class="toolbar-icon taccuino-toolbar-icon" src="toolbar/taccuino/taccuino-04-moderno.png">';
    }else if(icon.getAttribute('src') !== 'toolbar/taccuino/taccuino-04-moderno.png'){
      icon.setAttribute('src', 'toolbar/taccuino/taccuino-04-moderno.png');
    }
    var searchButton = document.getElementById('tb-search-btn');
    var installButton = document.getElementById('pwa-install-button');
    var search = document.getElementById('tb-search');
    var ordered = [searchButton, button, installButton, search].filter(Boolean);
    var current = Array.prototype.filter.call(right.children, function(child){
      return ordered.indexOf(child) !== -1;
    });
    var orderIsCorrect = current.length === ordered.length && ordered.every(function(node, index){
      return current[index] === node;
    });
    if(!orderIsCorrect) ordered.forEach(function(node){ right.appendChild(node); });
    var label = original.getAttribute('aria-label') || original.getAttribute('title') || 'Taccuino';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', original.getAttribute('title') || label);
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
    var gps = document.getElementById('btn-gps');
    var qr = document.getElementById('map-qr-fab');
    var home = document.getElementById('btn-home');
    var order = [help, settings, gps, qr, home].filter(Boolean);

    order.forEach(function(node){ move(node, bar); });

    if(home){
      home.setAttribute('title', 'Vista iniziale');
      home.setAttribute('aria-label', 'Ripristina la vista iniziale della mappa');
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
      'btn-home':
        '<svg data-ui-icon="home" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>'
    };
    Object.keys(icons).forEach(function(id){
      var button = document.getElementById(id);
      if(!button || button.querySelector('[data-ui-icon]')) return;
      button.innerHTML = icons[id];
    });
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

  function arrange(){
    if(arranging) return;
    arranging = true;
    try{
      arrangeHeader();
      ensureTaccuinoToolbar();
      arrangeBottomBar();
      ensureMapControls();
      wireFlagMenu();
      wireSearch();
      wireHomeMenuSizing();
      ensureVisualIcons();
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
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
