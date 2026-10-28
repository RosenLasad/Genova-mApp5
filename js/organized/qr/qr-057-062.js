
(function(){
  function ready(cb){ if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', cb, {once:true}); } else { cb(); } }
  ready(function(){
    var helpBox = document.getElementById('help-legend');
    var btn     = document.getElementById('help-fab');
    if(!helpBox || !btn) return;

    var closeBtn = helpBox.querySelector('.help-close');

    function openHelp(){ helpBox.classList.add('open'); btn.setAttribute('aria-expanded','true'); try{ localStorage.setItem('help_seen','1'); }catch(e){} }
    function closeHelp(){ helpBox.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    function toggleHelp(){ helpBox.classList.contains('open') ? closeHelp() : openHelp(); }

    // Bindings
    btn.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); toggleHelp(); }, true);
    if(closeBtn) closeBtn.addEventListener('click', function(e){ e.preventDefault(); closeHelp(); }, true);

    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeHelp(); });
    document.addEventListener('click', function(e){
      if(!helpBox.classList.contains('open')) return;
      var flagBtn = document.getElementById('flag-switcher');
      var flagMenu = document.getElementById('flag-menu');
      var inside = helpBox.contains(e.target) || btn.contains(e.target) ||
                   (flagBtn && (flagBtn===e.target || flagBtn.contains(e.target))) ||
                   (flagMenu && (flagMenu===e.target || flagMenu.contains(e.target)));
      if(!inside) closeHelp();
    });

    // Nessun auto-open
// var seen = false; try { seen = localStorage.getItem('help_seen') === '1'; } catch(e){}
// if(!seen) openHelp();

  });
})();

;

(function(){
  function q(id){ return document.getElementById(id); }
  function qs(sel, root){ return (root||document).querySelector(sel); }

  function ensureHotBtns(){
    var media = qs('#panel .media'); if(!media) return;
    if(media.querySelector('.qr-hot-left')) return;
    var left = document.createElement('button');
    left.type = 'button';
    left.className = 'qr-hot-btn qr-hot-left';
    left.setAttribute('aria-label','Clip precedente');
    left.textContent = '◀';
    var right = document.createElement('button');
    right.type = 'button';
    right.className = 'qr-hot-btn qr-hot-right';
    right.setAttribute('aria-label','Clip successiva');
    right.textContent = '▶';
    left.addEventListener('click', function(e){ e.stopPropagation(); var p=q('prev'); if(p) p.click(); });
    right.addEventListener('click', function(e){ e.stopPropagation(); var n=q('next'); if(n) n.click(); });
    media.appendChild(left);
    media.appendChild(right);
  }

  function isPastActive(){
    var btn = q('btn-past');
    return !!(btn && btn.classList && btn.classList.contains('active'));
  }
  function hasMultiple(){
    var c = q('counter'); if(!c) return false;
    var m = (c.textContent||'').match(/\d+\s*\/\s*(\d+)/);
    return !!(m && parseInt(m[1],10) > 1);
  }
  function toggleHotBtns(){
    ensureHotBtns();
    var media = qs('#panel .media'); if(!media) return;
    var left = qs('.qr-hot-left', media), right = qs('.qr-hot-right', media);
    if(!left || !right) return;
    var show = isPastActive() && hasMultiple();
    left.style.display = show ? 'flex' : 'none';
    right.style.display = show ? 'flex' : 'none';
  }

  // observer to keep in sync
  var obs;
  function start(){
    toggleHotBtns();
    ['btn-today','btn-past','btn-sfx','prev','next'].forEach(function(id){
      var el = q(id); if(el && !el.__qr_hot2){
        el.addEventListener('click', function(){ setTimeout(toggleHotBtns,0); });
        el.__qr_hot2 = true;
      }
    });
    var panel = q('panel');
    if(panel){
      if(obs) obs.disconnect();
      obs = new MutationObserver(function(){ toggleHotBtns(); });
      obs.observe(panel, {subtree:true, childList:true, characterData:true, attributes:true});
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  window.addEventListener('load', start);
})();

;

(function(){
  function boost(v){
    if(!v) return;
    try{
      v.muted = true; v.loop = true; v.setAttribute('playsinline',''); v.setAttribute('autoplay','');
      var kick = function(){ try{ var p=v.play(); if(p&&p.catch) p.catch(function(){});}catch(e){} };
      v.addEventListener('loadeddata', kick);
      v.addEventListener('canplay', kick);
      // Also kick now in case it's already ready
      kick();
    }catch(e){}
  }
  boost(document.getElementById('media-video-today'));
  boost(document.getElementById('media-video'));
  // Re-kick on button clicks that swap media
  ['btn-today','btn-past','btn-sfx','prev','next'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.addEventListener('click', function(){ setTimeout(function(){ boost(document.getElementById('media-video-today')); boost(document.getElementById('media-video')); }, 0); });
  });
})();

