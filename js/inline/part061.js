
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
