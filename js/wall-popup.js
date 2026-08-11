(function(){
  'use strict';
  if(window.__GM_WALL_POPUP__) return;
  window.__GM_WALL_POPUP__ = true;

  function popupElement(popup){
    return popup && (popup.getElement ? popup.getElement() : popup._container);
  }

  function isWallPopup(popup){
    var className = popup && popup.options && popup.options.className;
    var element = popupElement(popup);
    return String(className || '').indexOf('mura-popup') !== -1 || !!(element && element.classList.contains('mura-popup'));
  }

  function accentFor(popup){
    var source = popup && popup._source;
    return (source && (source.__popupColor || (source.options && source.options.color))) || '#64748b';
  }

  function inkFor(hex){
    var raw = String(hex || '').replace('#','');
    if(raw.length === 3) raw = raw.split('').map(function(ch){ return ch+ch; }).join('');
    if(!/^[0-9a-f]{6}$/i.test(raw)) return '#fff';
    var r = parseInt(raw.slice(0,2),16), g = parseInt(raw.slice(2,4),16), b = parseInt(raw.slice(4,6),16);
    return ((r*299 + g*587 + b*114) / 1000) > 168 ? '#102437' : '#fff';
  }

  function currentDirection(){
    return String(document.documentElement.getAttribute('lang') || 'it').toLowerCase().indexOf('ar') === 0 ? 'rtl' : 'ltr';
  }

  var WALL_KEYS_BY_COLOR = {
    '#db2777':'mura-romane',
    '#0d9488':'mura-carolinge',
    '#76b6ff':'mura-barbarossa',
    '#1e40af':'mura-porto',
    '#f95800':'mura-repubblica',
    '#6b21a8':'mura-rinascimento',
    '#dc2626':'mura-nuove'
  };

  function wallNodeFor(popup){
    var source = popup && popup._source;
    if(!source || typeof source.getLatLng !== 'function') return null;
    var coords = source.getLatLng();
    var color = String(accentFor(popup) || '').toLowerCase();
    var preferredKey = WALL_KEYS_BY_COLOR[color];
    var data = null;
    try{ if(typeof WALL_NODES !== 'undefined') data = WALL_NODES; }catch(_){}
    if(!data) return null;
    var keys = preferredKey ? [preferredKey] : Object.keys(data);
    for(var k=0;k<keys.length;k++){
      var nodes = data[keys[k]] || [];
      for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        if(!node || !Array.isArray(node.coords)) continue;
        if(Math.abs(coords.lat-node.coords[0]) < 0.0000002 && Math.abs(coords.lng-node.coords[1]) < 0.0000002){
          return {key:keys[k], node:node};
        }
      }
    }
    return null;
  }

  function escapeHtml(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g,function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function currentLang(){
    var value = document.documentElement.getAttribute('lang') || 'it';
    try{ value = localStorage.getItem('lang') || value; }catch(_){}
    value = String(value).toLowerCase();
    if(value.indexOf('lij') === 0) return 'lij';
    return value.split('-')[0];
  }

  var TYPE_LABELS = {
    porta:{it:'Porta',en:'Gate',es:'Puerta',fr:'Porte',ar:'بوابة',ru:'Ворота',zh:'城门',lij:'Pòrta'},
    portello:{it:'Portello',en:'Wicket',es:'Portillo',fr:'Poterne',ar:'بوّابة صغيرة',ru:'Калитка',zh:'便门',lij:'Portéllo'},
    torre:{it:'Torre',en:'Tower',es:'Torre',fr:'Tour',ar:'برج',ru:'Башня',zh:'塔',lij:'Torre'},
    forte:{it:'Forte',en:'Fort',es:'Fuerte',fr:'Fort',ar:'حصن',ru:'Форт',zh:'堡垒',lij:'Fòrte'},
    altro:{it:'Elemento storico',en:'Historic feature',es:'Elemento histórico',fr:'Élément historique',ar:'عنصر تاريخي',ru:'Исторический объект',zh:'历史遗迹',lij:'Eleménto stòrico'}
  };

  var IMAGE_LABELS = {
    it:{open:'Visualizza la fotografia completa',close:'Chiudi la fotografia'},
    en:{open:'View the full photo',close:'Close photo'},
    es:{open:'Ver la fotografía completa',close:'Cerrar fotografía'},
    fr:{open:'Afficher la photographie complète',close:'Fermer la photographie'},
    ar:{open:'عرض الصورة كاملة',close:'إغلاق الصورة'},
    ru:{open:'Открыть фотографию полностью',close:'Закрыть фотографию'},
    zh:{open:'查看完整照片',close:'关闭照片'},
    lij:{open:'Fanni vedde a föto intrega',close:'Særa a föto'}
  };

  function imageLabels(){
    return IMAGE_LABELS[currentLang()] || IMAGE_LABELS.it;
  }

  function lightboxElement(){
    var lightbox = document.getElementById('gm-wall-lightbox');
    if(lightbox) return lightbox;
    lightbox = document.createElement('div');
    lightbox.id = 'gm-wall-lightbox';
    lightbox.className = 'gm-wall-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role','dialog');
    lightbox.setAttribute('aria-modal','true');
    lightbox.innerHTML = '<button type="button" class="gm-wall-lightbox-close"><span aria-hidden="true">×</span></button>'+ 
      '<figure class="gm-wall-lightbox-figure">'+
        '<img class="gm-wall-lightbox-image" alt="">'+
        '<figcaption class="gm-wall-lightbox-caption"></figcaption>'+
      '</figure>';
    document.body.appendChild(lightbox);
    lightbox.querySelector('.gm-wall-lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(event){
      if(event.target === lightbox || (event.target.classList && event.target.classList.contains('gm-wall-lightbox-figure'))) closeLightbox();
    });
    return lightbox;
  }

  function openLightbox(source, alt, trigger){
    var lightbox = lightboxElement();
    var labels = imageLabels();
    var image = lightbox.querySelector('.gm-wall-lightbox-image');
    var caption = lightbox.querySelector('.gm-wall-lightbox-caption');
    var close = lightbox.querySelector('.gm-wall-lightbox-close');
    window.clearTimeout(lightbox.__hideTimer);
    lightbox.__returnFocus = trigger || null;
    lightbox.setAttribute('aria-label', alt || labels.open);
    close.setAttribute('aria-label', labels.close);
    image.src = source;
    image.alt = alt || '';
    caption.textContent = alt || '';
    lightbox.hidden = false;
    requestAnimationFrame(function(){
      lightbox.classList.add('is-open');
      try{ close.focus({preventScroll:true}); }catch(_){ close.focus(); }
    });
  }

  function closeLightbox(){
    var lightbox = document.getElementById('gm-wall-lightbox');
    if(!lightbox || lightbox.hidden) return;
    var returnFocus = lightbox.__returnFocus;
    lightbox.classList.remove('is-open');
    window.clearTimeout(lightbox.__hideTimer);
    lightbox.__hideTimer = window.setTimeout(function(){
      lightbox.hidden = true;
      var image = lightbox.querySelector('.gm-wall-lightbox-image');
      if(image) image.removeAttribute('src');
      if(returnFocus && document.documentElement.contains(returnFocus)){
        try{ returnFocus.focus({preventScroll:true}); }catch(_){ returnFocus.focus(); }
      }
    },180);
  }

  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape') closeLightbox();
  });

  function preparePlaceImages(root){
    var scope = root && root.querySelectorAll ? root : document;
    var images = [];
    if(scope.matches && scope.matches('.gm-place-media img')) images.push(scope);
    Array.prototype.push.apply(images, scope.querySelectorAll('.gm-place-media img'));
    images.forEach(function(image){
      var trigger = image.closest('.gm-place-media');
      if(!trigger) return;
      var labels = imageLabels();
      trigger.setAttribute('aria-label', labels.open+': '+(image.alt || ''));
      if(trigger.classList.contains('gm-photo-trigger')) return;
      trigger.classList.add('gm-photo-trigger');
      trigger.setAttribute('role','button');
      trigger.setAttribute('tabindex','0');
      if(!trigger.querySelector('.gm-photo-zoom-icon')){
        var icon = document.createElement('span');
        icon.className = 'gm-photo-zoom-icon';
        icon.setAttribute('aria-hidden','true');
        trigger.appendChild(icon);
      }
    });
  }

  document.addEventListener('click', function(event){
    var origin = event.target;
    var trigger = origin && origin.closest ? origin.closest('.gm-wall-popup-media, .gm-place-media.gm-photo-trigger') : null;
    if(!trigger) return;
    var image = trigger.querySelector('img');
    if(!image || !image.src) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openLightbox(image.currentSrc || image.src, image.alt || '', trigger);
  }, true);

  document.addEventListener('keydown', function(event){
    if(event.key !== 'Enter' && event.key !== ' ') return;
    var trigger = event.target && event.target.closest ? event.target.closest('.gm-place-media.gm-photo-trigger') : null;
    if(!trigger) return;
    var image = trigger.querySelector('img');
    if(!image || !image.src) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openLightbox(image.currentSrc || image.src, image.alt || '', trigger);
  }, true);

  function observePlaceImages(){
    preparePlaceImages(document);
    if(!window.MutationObserver || !document.body) return;
    var observer = new MutationObserver(function(records){
      records.forEach(function(record){
        Array.prototype.forEach.call(record.addedNodes || [], function(node){
          if(node && node.nodeType === 1) preparePlaceImages(node);
        });
      });
    });
    observer.observe(document.body, {childList:true, subtree:true});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observePlaceImages, {once:true});
  else observePlaceImages();

  function translatedNode(match){
    var lang = currentLang();
    var node = match.node;
    var external = null;
    try{ external = window.__TEXTS && window.__TEXTS[match.key] && window.__TEXTS[match.key][node.id]; }catch(_){}
    var source = external || node.i18n || {};
    return source[lang] || source.it || source.en || {};
  }

  function imagePath(match){
    var source = match.node.media && match.node.media[0];
    if(!source) return '';
    if(source.indexOf('/') === -1 && match.key === 'mura-romane') return 'mura_data/media/mura-romane/'+source;
    return source;
  }

  function renderPopup(popup){
    if(!isWallPopup(popup)) return false;
    var match = wallNodeFor(popup);
    if(!match) return false;
    var lang = currentLang();
    var text = translatedNode(match);
    var typeKey = String(match.node.type || 'altro').toLowerCase();
    var labels = TYPE_LABELS[typeKey] || TYPE_LABELS.altro;
    var category = labels[lang] || labels.it;
    var photoLabels = imageLabels();
    var image = imagePath(match);
    var color = accentFor(popup);
    var html = '<article class="gm-wall-popup" dir="'+currentDirection()+'">'+
      '<div class="gm-wall-popup-header">'+
        '<span class="gm-wall-popup-category">'+escapeHtml(category)+'</span>'+ 
        '<h3 class="gm-wall-popup-title">'+escapeHtml(match.node.name)+'</h3>'+ 
        (text.year ? '<span class="gm-wall-popup-year">'+escapeHtml(text.year)+'</span>' : '')+
      '</div>'+ 
      (image ? '<button type="button" class="gm-wall-popup-media" aria-label="'+escapeHtml(photoLabels.open+': '+match.node.name)+'"><img src="'+escapeHtml(image)+'" alt="'+escapeHtml(match.node.name)+'" loading="lazy" decoding="async"><span class="gm-wall-popup-zoom-icon" aria-hidden="true"></span></button>' : '')+
      '<div class="gm-wall-popup-body">'+
        '<p class="gm-wall-popup-description">'+escapeHtml(text.descr || '')+'</p>'+ 
      '</div>'+ 
    '</article>';

    popup.setContent(html);
    if(popup.options){ popup.options.maxWidth = 350; popup.options.minWidth = 250; }
    var container = popupElement(popup);
    if(!container) return false;
    container.classList.add('gm-wall-popup-wrap');
    container.style.setProperty('--gm-wall-color', color);
    container.style.setProperty('--gm-wall-accent-ink', inkFor(color));
    var closeButton = container.querySelector('.leaflet-popup-close-button');
    if(closeButton) closeButton.setAttribute('aria-label', 'Chiudi');
    var imageElement = container.querySelector('.gm-wall-popup-media img');
    if(imageElement){
      imageElement.addEventListener('load', function(){
        try{ if(popup.update) popup.update(); }catch(_){}
        schedulePan(popup, false);
      }, {once:true});
      imageElement.addEventListener('error', function(){
        var host = imageElement.parentNode;
        if(host){
          host.disabled = true;
          host.innerHTML = '<div class="gm-wall-popup-media-error">Immagine non disponibile</div>';
        }
        try{ if(popup.update) popup.update(); }catch(_){}
      }, {once:true});
    }
    try{ if(popup.update) popup.update(); }catch(_){}
    return true;
  }

  function visibleRect(selector){
    var element = document.querySelector(selector);
    if(!element) return null;
    var style = window.getComputedStyle ? window.getComputedStyle(element) : null;
    if(style && (style.display === 'none' || style.visibility === 'hidden')) return null;
    var rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 ? rect : null;
  }

  function panIntoView(popup, animate){
    var mapRef = (popup._source && popup._source._map) || popup._map || window.map || window.__map;
    var element = popupElement(popup);
    var mapElement = mapRef && mapRef.getContainer ? mapRef.getContainer() : document.getElementById('map');
    if(!mapRef || !element || !mapElement || typeof mapRef.panBy !== 'function') return;
    var mapRect = mapElement.getBoundingClientRect();
    var compact = window.innerWidth <= 600;
    var edge = compact ? 16 : 24;
    var safe = {left:mapRect.left+edge, top:mapRect.top+edge, right:mapRect.right-edge, bottom:mapRect.bottom-edge};
    var toolbar = visibleRect('#app > header');
    var sponsor = visibleRect('#sponsor-strip');
    var bottom = visibleRect('#bottom-bar');
    if(toolbar) safe.top = Math.max(safe.top, toolbar.bottom + (compact ? 9 : 13));
    if(sponsor) safe.top = Math.max(safe.top, sponsor.bottom + (compact ? 10 : 14));
    if(bottom) safe.bottom = Math.min(safe.bottom, bottom.top - (compact ? 10 : 14));

    var article = element.querySelector('.gm-wall-popup');
    if(article){
      article.style.maxHeight = Math.max(220, Math.min(520, Math.floor(safe.bottom-safe.top-16)))+'px';
      try{ if(popup.update) popup.update(); }catch(_){}
    }
    var rect = element.getBoundingClientRect();
    var dx = 0, dy = 0;
    if(rect.left < safe.left) dx = rect.left-safe.left;
    else if(rect.right > safe.right) dx = rect.right-safe.right;
    if(rect.top < safe.top) dy = rect.top-safe.top;
    else if(rect.bottom > safe.bottom) dy = rect.bottom-safe.bottom;
    if(Math.abs(dx) < 2 && Math.abs(dy) < 2) return;
    try{ mapRef.panBy([Math.round(dx),Math.round(dy)], {animate:animate !== false, duration:.22, easeLinearity:.35}); }catch(_){}
  }

  function schedulePan(popup, animate){
    window.clearTimeout(popup.__gmWallPan1);
    window.clearTimeout(popup.__gmWallPan2);
    popup.__gmWallPan1 = window.setTimeout(function(){ panIntoView(popup, animate); },90);
    popup.__gmWallPan2 = window.setTimeout(function(){ panIntoView(popup, false); },380);
  }

  function bindMap(){
    var mapRef = window.map || window.__map || window.MAP;
    if(!mapRef || typeof mapRef.on !== 'function') return false;
    if(mapRef.__gmWallPopupBound) return true;
    mapRef.__gmWallPopupBound = true;
    mapRef.on('popupopen', function(event){
      var popup = event && event.popup;
      if(!isWallPopup(popup)) return;
      window.setTimeout(function(){
        if(renderPopup(popup)) schedulePan(popup, true);
      },0);
    });
    return true;
  }

  document.addEventListener('app:set-lang', function(){
    window.setTimeout(function(){
      var mapRef = window.map || window.__map || window.MAP;
      var popup = mapRef && mapRef._popup;
      if(popup && isWallPopup(popup)) renderPopup(popup);
      preparePlaceImages(document);
    },30);
  });

  var tries = 0;
  var timer = window.setInterval(function(){
    if(bindMap() || ++tries > 120) window.clearInterval(timer);
  },100);
})();
