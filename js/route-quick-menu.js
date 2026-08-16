(function(){
  'use strict';

  var panel = document.getElementById('qt-cat-routes');
  var content = document.getElementById('qt-routes-content');
  var mainButton = document.getElementById('qt-cat-routes-btn');
  if(!panel || !content || !mainButton) return;

  var collapsed = { recommended: false, personal: false };
  var TEXT = {
    it:{ title:'Percorsi', recommended:'Percorsi consigliati', personal:'I tuoi percorsi', empty:'Non hai ancora creato percorsi nel Taccuino.', show:'Mostra sulla mappa', hide:'Nascondi dalla mappa' },
    en:{ title:'Routes', recommended:'Recommended routes', personal:'Your routes', empty:'You have not created any routes in the Notebook yet.', show:'Show on map', hide:'Hide from map' },
    es:{ title:'Rutas', recommended:'Rutas recomendadas', personal:'Tus rutas', empty:'Todavía no has creado rutas en el Cuaderno.', show:'Mostrar en el mapa', hide:'Ocultar del mapa' },
    fr:{ title:'Parcours', recommended:'Parcours recommandés', personal:'Vos parcours', empty:'Vous n’avez pas encore créé de parcours dans le Carnet.', show:'Afficher sur la carte', hide:'Masquer de la carte' },
    ar:{ title:'المسارات', recommended:'المسارات المقترحة', personal:'مساراتك', empty:'لم تنشئ أي مسارات في الدفتر بعد.', show:'إظهار على الخريطة', hide:'إخفاء من الخريطة' },
    ru:{ title:'Маршруты', recommended:'Рекомендуемые маршруты', personal:'Ваши маршруты', empty:'Вы ещё не создали маршруты в Блокноте.', show:'Показать на карте', hide:'Скрыть с карты' },
    zh:{ title:'路线', recommended:'推荐路线', personal:'你的路线', empty:'你尚未在笔记本中创建路线。', show:'在地图上显示', hide:'从地图隐藏' },
    lij:{ title:'Percorsi', recommended:'Percorsi consegiæ', personal:'I teu percorsi', empty:'Ti no ti æ ancon creou de percorsi into Taccuin.', show:'Fanni védde in sciâ mappa', hide:'Ascondi da-a mappa' }
  };

  function language(){
    var value = 'it';
    try{ value = window.CURRENT_LANG || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it'; }catch(_e){}
    value = String(value || 'it').toLowerCase().split(/[-_]/)[0];
    return TEXT[value] ? value : 'it';
  }

  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(character){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[character];
    });
  }

  function routeMeta(id){
    var groups = window.PERCORSI || {};
    var found = null;
    Object.keys(groups).some(function(group){
      return (groups[group] || []).some(function(route){
        if(route && route.id === id){ found = route; return true; }
        return false;
      });
    });
    return found || {};
  }

  function recommendedName(id, fallback){
    var translations = window.I18N_ROUTES && window.I18N_ROUTES[id];
    if(!translations) return fallback || id;
    var lang = language();
    return translations[lang] || translations.it || fallback || id;
  }

  function recommendedRoutes(){
    return Array.prototype.map.call(document.querySelectorAll('#routes-menu .doc-row[data-route-id]'), function(row){
      var id = row.getAttribute('data-route-id') || '';
      var checkbox = row.querySelector('input.route-chk');
      var meta = routeMeta(id);
      var routeData = window.__ROUTE_DATA && window.__ROUTE_DATA[id];
      var fallbackNode = row.querySelector('[data-i18n-route],label,.doc-label,.chip');
      return {
        id:id,
        name:recommendedName(id, (meta && meta.name) || (fallbackNode && fallbackNode.textContent.trim()) || id),
        color:(routeData && routeData.color) || meta.color || '#d09646',
        active:!!(checkbox && checkbox.checked)
      };
    }).filter(function(route){ return !!route.id; });
  }

  function personalRoutes(){
    var api = window.GenovaTaccuinoRoutes;
    if(!api || typeof api.list !== 'function') return [];
    var activeId = typeof api.activeId === 'function' ? api.activeId() : null;
    return api.list().map(function(route){
      return {
        id:String(route.id || ''),
        name:String(route.name || TEXT[language()].title),
        color:String(route.color || '#247766'),
        active:String(activeId || '') === String(route.id || '')
      };
    }).filter(function(route){ return !!route.id; });
  }

  function routeRow(route, kind){
    var label = route.active ? TEXT[language()].hide : TEXT[language()].show;
    return '<div class="qt-route-row" style="--route-color:'+esc(route.color)+'">'+
      '<span class="qt-route-color" aria-hidden="true"></span>'+
      '<button type="button" class="qt-route-name" title="'+esc(route.name)+'" aria-label="'+esc(route.name)+'" data-route-kind="'+esc(kind)+'" data-route-id="'+esc(route.id)+'">'+esc(route.name)+'</button>'+
      '<button type="button" class="qt-route-switch" role="switch" aria-checked="'+(route.active ? 'true' : 'false')+'" aria-label="'+esc(label+': '+route.name)+'" title="'+esc(label)+'" data-route-kind="'+esc(kind)+'" data-route-id="'+esc(route.id)+'"></button>'+
    '</div>';
  }

  function section(id, title, rows, emptyText){
    var isCollapsed = !!collapsed[id];
    var body = rows.length ? rows.join('') : '<p class="qt-routes-empty">'+esc(emptyText)+'</p>';
    return '<section class="qt-routes-section'+(isCollapsed ? ' is-collapsed' : '')+'" data-routes-section="'+esc(id)+'">'+
      '<button type="button" class="qt-routes-section-head" aria-expanded="'+(!isCollapsed)+'" data-routes-section-toggle="'+esc(id)+'"><span>'+esc(title)+'</span><span aria-hidden="true">⌄</span></button>'+
      '<div class="qt-routes-list">'+body+'</div>'+
    '</section>';
  }

  function syncMainState(recommended, personal){
    var active = recommended.some(function(route){ return route.active; }) || personal.some(function(route){ return route.active; });
    mainButton.setAttribute('data-routes-active', active ? 'true' : 'false');
  }

  function render(){
    var lang = language();
    var text = TEXT[lang];
    var recommended = recommendedRoutes();
    var personal = personalRoutes();
    mainButton.setAttribute('aria-label', text.title);
    mainButton.setAttribute('title', text.title);
    var srOnly = mainButton.querySelector('.sr-only');
    if(srOnly) srOnly.textContent = text.title;
    panel.setAttribute('aria-label', text.title);
    content.innerHTML = section('recommended', text.recommended, recommended.map(function(route){ return routeRow(route, 'recommended'); }), '')+
      section('personal', text.personal, personal.map(function(route){ return routeRow(route, 'personal'); }), text.empty);
    syncMainState(recommended, personal);
    if(!panel.hasAttribute('hidden')) window.setTimeout(positionRoutesPanel, 0);
  }

  function positionRoutesPanel(){
    if(panel.hasAttribute('hidden')) return;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 700;
    var topLimit = 8;
    var bottomLimit = viewportHeight - 10;
    var header = document.querySelector('header');
    var bottomBar = document.getElementById('bottom-bar');
    try{
      if(header){
        var headerRect = header.getBoundingClientRect();
        if(headerRect.height && headerRect.bottom > 0) topLimit = Math.max(topLimit, headerRect.bottom + 8);
      }
      if(bottomBar){
        var bottomRect = bottomBar.getBoundingClientRect();
        if(bottomRect.height && bottomRect.top > 0 && bottomRect.top < viewportHeight){
          bottomLimit = Math.min(bottomLimit, bottomRect.top - 10);
        }
      }
    }catch(_e){}
    var available = Math.max(180, bottomLimit - topLimit);
    var maxHeight = Math.min(window.innerWidth <= 420 ? 460 : 520, available);
    var buttonRect = mainButton.getBoundingClientRect();
    var desiredTop = buttonRect.top + (buttonRect.height / 2) - (maxHeight / 2);
    desiredTop = Math.max(topLimit, Math.min(desiredTop, bottomLimit - maxHeight));
    var dock = document.getElementById('quick-toggles');
    var dockTop = dock ? dock.getBoundingClientRect().top : 0;
    panel.style.setProperty('--qt-routes-top', Math.round(desiredTop - dockTop) + 'px');
    panel.style.setProperty('--qt-routes-max-height', Math.round(maxHeight) + 'px');
  }

  function toggleRecommended(id){
    var row = document.querySelector('#routes-menu .doc-row[data-route-id="'+CSS.escape(id)+'"]');
    var checkbox = row && row.querySelector('input.route-chk');
    if(!checkbox) return;
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change', { bubbles:true }));
  }

  function togglePersonal(id){
    var api = window.GenovaTaccuinoRoutes;
    if(api && typeof api.toggle === 'function') api.toggle(id);
  }

  function openRecommendedStart(id){
    var row = Array.prototype.find.call(document.querySelectorAll('#routes-menu .doc-row[data-route-id]'), function(item){
      return item.getAttribute('data-route-id') === id;
    });
    var checkbox = row && row.querySelector('input.route-chk');
    if(checkbox && !checkbox.checked){
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles:true }));
    }
    window.setTimeout(function(){
      var api = window.__routesFallback;
      if(api && typeof api.focusStart === 'function') api.focusStart(id);
    }, 40);
  }

  function openPersonalStart(id){
    var api = window.GenovaTaccuinoRoutes;
    if(api && typeof api.focusStart === 'function') api.focusStart(id);
  }

  content.addEventListener('click', function(event){
    var sectionButton = event.target.closest('[data-routes-section-toggle]');
    if(sectionButton){
      event.preventDefault();
      event.stopPropagation();
      var sectionId = sectionButton.getAttribute('data-routes-section-toggle');
      collapsed[sectionId] = !collapsed[sectionId];
      render();
      mainButton.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
      return;
    }
    var routeName = event.target.closest('.qt-route-name[data-route-id]');
    if(routeName){
      event.preventDefault();
      event.stopPropagation();
      var routeNameId = routeName.getAttribute('data-route-id') || '';
      if(routeName.getAttribute('data-route-kind') === 'personal') openPersonalStart(routeNameId);
      else openRecommendedStart(routeNameId);
      window.setTimeout(render, 60);
      return;
    }
    var routeButton = event.target.closest('.qt-route-switch[data-route-id]');
    if(!routeButton) return;
    event.preventDefault();
    event.stopPropagation();
    var id = routeButton.getAttribute('data-route-id') || '';
    if(routeButton.getAttribute('data-route-kind') === 'personal') togglePersonal(id);
    else toggleRecommended(id);
    window.setTimeout(render, 0);
  });

  document.addEventListener('change', function(event){
    if(event.target && event.target.matches && event.target.matches('#routes-menu input.route-chk')) render();
  });
  window.addEventListener('taccuino:routes-changed', render);
  window.addEventListener('taccuino:route-map-changed', render);
  window.addEventListener('storage', function(event){ if(event.key === 'genova_taccuino_routes_v1') render(); });
  window.addEventListener('i18n:changed', render);
  document.addEventListener('app:set-lang', render);
  mainButton.addEventListener('click', function(){
    window.setTimeout(function(){ render(); positionRoutesPanel(); }, 0);
  });
  window.addEventListener('resize', positionRoutesPanel, { passive:true });
  window.addEventListener('orientationchange', function(){ window.setTimeout(positionRoutesPanel, 80); }, { passive:true });

  /* Il pannello e' sopra la mappa Leaflet: la rotellina deve scorrere il menu
     senza arrivare al gestore dello zoom della mappa. */
  function scrollRoutesWithWheel(event){
    var maxScroll = content.scrollHeight - content.clientHeight;
    if(maxScroll > 0){
      content.scrollTop += event.deltaY;
      event.preventDefault();
    }
    event.stopPropagation();
  }
  function keepScrollInsideRoutes(event){ event.stopPropagation(); }
  panel.addEventListener('wheel', scrollRoutesWithWheel, { passive:false });
  panel.addEventListener('touchmove', keepScrollInsideRoutes, { passive:true });
  try{
    if(window.L && window.L.DomEvent && typeof window.L.DomEvent.disableScrollPropagation === 'function'){
      window.L.DomEvent.disableScrollPropagation(panel);
    }
  }catch(_e){}

  render();
})();
