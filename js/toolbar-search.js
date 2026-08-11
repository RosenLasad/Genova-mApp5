(function(){
  'use strict';
  if(window.__GM_TOOLBAR_SEARCH__) return;
  window.__GM_TOOLBAR_SEARCH__ = true;

  var PLACE_LISTS = {
    'fav-list-forti':'Forte',
    'fav-list-musei':'Museo',
    'fav-list-bus':'Autobus',
    'fav-list-train':'Stazione',
    'fav-list-metro':'Metro',
    'fav-list-funi':'Impianto',
    'fav-list-parchi-piazze':'__PP__',
    'fav-list-locali':'Locale',
    'fav-list-ristoranti':'Ristorante',
    'fav-list-take-away':'Take-away',
    'fav-list-alloggi':'Albergo e B&B',
    'fav-list-mare':'Mare',
    'fav-list-aereo':'Aeroporto',
    'fav-list-chiese':'Chiesa',
    'fav-list-palazzi':'Palazzo',
    'fav-list-sport':'Sport',
    'fav-list-cinema':'Cinema',
    'fav-list-teatri':'Teatro',
    'fav-list-mostre':'Mostra'
  };
  var PLACEHOLDERS = {
    it:'Cerca…', en:'Search…', es:'Buscar…', fr:'Rechercher…',
    ar:'بحث…', ru:'Поиск…', zh:'搜索…', lij:'Çerca…'
  };
  var wrap, input, dropdown, clearButton, active = -1, shown = [];

  function language(){
    try{ return String(localStorage.getItem('lang') || document.documentElement.lang || 'it').toLowerCase().split(/[-_]/)[0]; }
    catch(_){ return 'it'; }
  }
  function normalize(value){
    var text = String(value || '').toLowerCase();
    try{ text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }catch(_){}
    return text;
  }
  function escapeHtml(value){
    return String(value || '').replace(/[&<>"']/g, function(char){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char];
    });
  }
  function gatherQr(){
    var result = [];
    (window.__QR_SOURCES || []).forEach(function(source){
      var parentId = source.id || source.parent && source.parent.id || '';
      var parentLabel = source.label || source.parent && source.parent.label || parentId;
      (source.children || []).forEach(function(point){
        var lat = Number(point.lat), lng = Number(point.lng);
        if(!isFinite(lat) || !isFinite(lng)) return;
        result.push({
          kind:'qr', category:'QR', id:parentId+'/'+(point.id || ''),
          title:point.label || point.id || 'Punto QR', subtitle:'QR · '+parentLabel,
          lat:lat, lng:lng, description:point.descr || '', media:point.media || []
        });
      });
    });
    return result;
  }
  function gatherPlaces(){
    var result = [];
    Object.keys(PLACE_LISTS).forEach(function(listId){
      var list = document.getElementById(listId);
      if(!list) return;
      list.querySelectorAll('.fav-item').forEach(function(item){
        var target = item.querySelector('.fav-name') || item;
        var title = String(target.textContent || '').trim();
        if(!title) return;
        var category = PLACE_LISTS[listId];
        if(category === '__PP__') category = item.getAttribute('data-src') === 'piazza' ? 'Piazza' : 'Parco';
        result.push({kind:'place', category:category, title:title, subtitle:'Vai, vedi, fai · '+category, target:target});
      });
    });
    return result;
  }
  function closeResults(){
    dropdown.hidden = true;
    dropdown.innerHTML = '';
    active = -1;
    shown = [];
  }
  function setActive(index){
    active = index;
    dropdown.querySelectorAll('.tb-search-item').forEach(function(button, buttonIndex){
      button.classList.toggle('active', buttonIndex === index);
    });
  }
  function openResult(item){
    if(item.kind === 'place'){
      try{ item.target.click(); }catch(_){}
      return;
    }
    try{ if(window.__ensureQrOn) window.__ensureQrOn(); }catch(_){}
    try{
      var appMap = window.map || window.__map;
      if(appMap && appMap.setView){
        var zoom = appMap.getZoom ? appMap.getZoom() : 16;
        appMap.setView([item.lat, item.lng], Math.max(zoom, 17), {animate:true});
      }
    }catch(_){}
    try{ if(window.__qrOpenChildPanel) window.__qrOpenChildPanel(item.title, item.description, item.media, item.id); }catch(_){}
    try{ location.hash = 'qr='+encodeURIComponent(item.id); }catch(_){}
  }
  function render(value){
    var query = normalize(value);
    if(!query){ closeResults(); return; }
    shown = gatherQr().concat(gatherPlaces()).filter(function(item){
      return normalize(item.title).indexOf(query) !== -1 || normalize(item.subtitle).indexOf(query) !== -1;
    }).slice(0, 8);
    if(!shown.length){ closeResults(); return; }
    dropdown.innerHTML = shown.map(function(item, index){
      return '<button type="button" class="tb-search-item" data-i="'+index+'" data-cat="'+escapeHtml(item.category)+'">'
        +'<span class="tb-search-title">'+escapeHtml(item.title)+'</span>'
        +'<span class="tb-search-sub">'+escapeHtml(item.subtitle)+'</span></button>';
    }).join('');
    dropdown.hidden = false;
    setActive(-1);
  }
  function applyPlaceholder(){
    if(!input) return;
    var placeholder = PLACEHOLDERS[language()] || PLACEHOLDERS.it;
    try{
      if(typeof window.t === 'function'){
        var translated = window.t('tb.search');
        if(translated && translated !== 'tb.search') placeholder = translated;
      }
    }catch(_){}
    input.placeholder = placeholder;
    input.setAttribute('aria-label', placeholder);
  }
  function init(){
    wrap = document.getElementById('tb-search');
    input = document.getElementById('tb-search-input');
    dropdown = document.getElementById('tb-search-dd');
    clearButton = document.getElementById('tb-search-clear');
    if(!wrap || !input || !dropdown || !clearButton) return;
    applyPlaceholder();
    input.addEventListener('input', function(){
      wrap.classList.toggle('hasText', !!input.value.trim());
      render(input.value.trim());
    });
    input.addEventListener('keydown', function(event){
      if(dropdown.hidden) return;
      if(event.key === 'ArrowDown'){ event.preventDefault(); setActive(Math.min(shown.length-1, active+1)); }
      else if(event.key === 'ArrowUp'){ event.preventDefault(); setActive(Math.max(0, active-1)); }
      else if(event.key === 'Enter' && active >= 0 && shown[active]){
        event.preventDefault(); openResult(shown[active]); closeResults(); input.blur();
      }else if(event.key === 'Escape'){ closeResults(); input.blur(); }
    });
    dropdown.addEventListener('click', function(event){
      var button = event.target.closest('.tb-search-item');
      if(!button) return;
      var index = Number(button.getAttribute('data-i'));
      if(shown[index]){ openResult(shown[index]); closeResults(); input.blur(); }
    });
    clearButton.addEventListener('click', function(){
      input.value = '';
      wrap.classList.remove('hasText');
      closeResults();
      input.focus();
    });
    document.addEventListener('click', function(event){ if(!wrap.contains(event.target)) closeResults(); }, true);
    window.addEventListener('i18n:changed', applyPlaceholder);
    document.addEventListener('app:set-lang', applyPlaceholder);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
