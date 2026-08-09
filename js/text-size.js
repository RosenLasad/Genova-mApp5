/* Genova mApp: regolazione accessibile dei testi nei pannelli e nei popup. */
(function(){
  'use strict';
  if(window.__GENOVA_TEXT_SIZE__) return;
  window.__GENOVA_TEXT_SIZE__ = true;

  var STORAGE_KEY = 'genova_text_size_v1';
  var SCALES = { small:0.9, medium:1, large:1.15 };
  var currentSize = readSize();
  var managed = [];
  var baselines = new WeakMap();
  var scheduled = false;

  var TEXTS = {
    it:{label:'Dimensione testo',small:'Piccolo',medium:'Medio',large:'Grande'},
    en:{label:'Text size',small:'Small',medium:'Medium',large:'Large'},
    es:{label:'Tamaño del texto',small:'Pequeño',medium:'Mediano',large:'Grande'},
    fr:{label:'Taille du texte',small:'Petit',medium:'Moyen',large:'Grand'},
    ar:{label:'حجم النص',small:'صغير',medium:'متوسط',large:'كبير'},
    ru:{label:'Размер текста',small:'Мелкий',medium:'Средний',large:'Крупный'},
    zh:{label:'文字大小',small:'小',medium:'中',large:'大'},
    lij:{label:'Dimenscion do testo',small:'Piccin',medium:'Mêzo',large:'Grande'}
  };

  var SCOPE_SELECTOR = [
    '.leaflet-popup', '#menu-home', '#mh-bubble', '.dropdown-menu',
    '#help-legend', '#info-legend', '#fav-notes-panel', '#panel',
    '#qr-child-panel', '#qr-parent-panel', '#qr-scan', '#contactPanel', '#auth-account-modal',
    '#pwa-install-modal', '#subscription-modal', '#sub-v2-modal',
    '.auth-modal', '.sub-modal', '.settings-dropdown', '#tb-search'
  ].join(',');

  var EXCLUDE_SELECTOR = [
    '#flag-menu', '.leaflet-control', '.leaflet-marker-icon', '.leaflet-marker-shadow',
    '.gm-place-media', '.gm-place-category-mark', '[data-ui-icon]',
    '.taccuino-brand-mark', '.taccuino-row-arrow'
  ].join(',');

  function readSize(){
    try{
      var value = localStorage.getItem(STORAGE_KEY);
      return SCALES[value] ? value : 'medium';
    }catch(_e){ return 'medium'; }
  }

  function lang(){
    try{
      return String(localStorage.getItem('lang') || document.documentElement.lang || 'it')
        .toLowerCase().split(/[-_]/)[0];
    }catch(_e){ return 'it'; }
  }

  function hasOwnText(element){
    if(!element || element.nodeType !== 1) return false;
    if(/^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName)) return true;
    for(var i=0;i<element.childNodes.length;i++){
      var node = element.childNodes[i];
      if(node.nodeType === 3 && node.nodeValue && node.nodeValue.trim()) return true;
    }
    return false;
  }

  function shouldManage(element){
    if(!hasOwnText(element)) return false;
    if(element.closest(EXCLUDE_SELECTOR)) return false;
    return !!element.closest(SCOPE_SELECTOR);
  }

  function remember(element){
    if(baselines.has(element)) return;
    var value = parseFloat(window.getComputedStyle(element).fontSize);
    if(!isFinite(value) || value <= 0) return;
    baselines.set(element, {
      computed:value,
      inlineValue:element.style.getPropertyValue('font-size'),
      inlinePriority:element.style.getPropertyPriority('font-size')
    });
    managed.push(element);
  }

  function collect(root){
    if(!root || root.nodeType !== 1) return;
    if(shouldManage(root)) remember(root);
    var nodes = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for(var i=0;i<nodes.length;i++){
      if(shouldManage(nodes[i])) remember(nodes[i]);
    }
  }

  function applyManaged(){
    var scale = SCALES[currentSize] || 1;
    managed = managed.filter(function(element){
      if(!element || !element.isConnected) return false;
      var base = baselines.get(element);
      if(base){
        element.style.setProperty(
          'font-size',
          Math.round(base.computed * scale * 100) / 100 + 'px',
          'important'
        );
      }
      return true;
    });
    document.documentElement.setAttribute('data-text-size', currentSize);
  }

  function updateControls(){
    var dict = TEXTS[lang()] || TEXTS.it;
    var label = document.getElementById('settings-text-size-label');
    if(label) label.textContent = dict.label;
    var group = document.querySelector('.settings-text-size');
    if(group) group.setAttribute('aria-label', dict.label);
    document.querySelectorAll('.settings-text-size-options button[data-text-size]').forEach(function(button){
      var size = button.getAttribute('data-text-size');
      button.textContent = dict[size] || size;
      button.setAttribute('aria-pressed', size === currentSize ? 'true' : 'false');
      button.setAttribute('aria-label', dict.label + ': ' + (dict[size] || size));
    });
  }

  function setSize(size, save){
    if(!SCALES[size]) size = 'medium';
    currentSize = size;
    if(save !== false){
      try{ localStorage.setItem(STORAGE_KEY, size); }catch(_e){}
    }
    collect(document.body);
    applyManaged();
    updateControls();
    try{
      document.dispatchEvent(new CustomEvent('genova:text-size-changed', {detail:{size:size,scale:SCALES[size]}}));
    }catch(_e){}
  }

  function scheduleCollect(root){
    if(root && root.nodeType === 1) collect(root);
    if(scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function(){
      scheduled = false;
      applyManaged();
    });
  }

  function rebaseline(){
    managed.forEach(function(element){
      if(!element || !element.isConnected) return;
      var base = baselines.get(element);
      if(!base) return;
      if(base.inlineValue){
        element.style.setProperty('font-size', base.inlineValue, base.inlinePriority || '');
      }else{
        element.style.removeProperty('font-size');
      }
    });
    baselines = new WeakMap();
    managed = [];
    window.requestAnimationFrame(function(){ collect(document.body); applyManaged(); });
  }

  function boot(){
    collect(document.body);
    setSize(currentSize, false);

    document.addEventListener('click', function(event){
      var button = event.target.closest && event.target.closest('.settings-text-size-options button[data-text-size]');
      if(!button) return;
      event.preventDefault();
      setSize(button.getAttribute('data-text-size'), true);
    }, true);

    document.addEventListener('app:set-lang', updateControls);
    window.addEventListener('i18n:changed', updateControls);
    window.addEventListener('resize', function(){
      window.clearTimeout(rebaseline._timer);
      rebaseline._timer = window.setTimeout(rebaseline, 160);
    }, {passive:true});

    new MutationObserver(function(records){
      records.forEach(function(record){
        for(var i=0;i<record.addedNodes.length;i++) scheduleCollect(record.addedNodes[i]);
      });
    }).observe(document.body, {childList:true,subtree:true});
  }

  window.__setGenovaTextSize = function(size){ setSize(size, true); };
  window.__getGenovaTextSize = function(){ return currentSize; };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
