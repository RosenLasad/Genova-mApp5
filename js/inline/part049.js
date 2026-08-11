
(function(){
  function parseHash(){
    var h = (location.hash || '').replace(/^#/, '');
    if(!h || h.indexOf('qr=') === -1) return null;

    var obj = {};
    h.split('&').forEach(function(kv){
      var p = kv.split('=');
      var k = decodeURIComponent(p[0] || '');
      var v = decodeURIComponent(p.slice(1).join('=') || '');
      obj[k] = v;
    });

    if(!obj.qr) return null;
    return {
      id: obj.qr,
      mode: (obj.m === 'past' || obj.m === 'sfx') ? obj.m : 'today',
      idx: parseInt(obj.i || '0', 10) || 0
    };
  }

  function findQrById(id){
    var parts = String(id || '').split('/');
    if(parts.length < 2) return null;
    var pid = parts[0], cid = parts[1];

    var srcs = window.__QR_SOURCES || [];
    for(var s=0; s<srcs.length; s++){
      var src = srcs[s];
      var p = src && src.parent;
      if(p && String(p.id) === pid){
        var kids = src.children || [];
        for(var c=0; c<kids.length; c++){
          if(String(kids[c].id) === cid){
            return { parent: p, child: kids[c] };
          }
        }
      }
    }
    return null;
  }

  function ensureQrOn(){
    try{
      // se esiste già il tuo helper, usalo
      if(typeof window.__ensureQrOn === 'function'){ window.__ensureQrOn(); return; }
    }catch(_){}
    try{
      if(window.__qrToggleAll) window.__qrToggleAll(true);
      var chk = document.getElementById('chk-qr-all');
      if(chk) chk.checked = true;
    }catch(_){}
  }

  function openFromHash(){
    var q = parseHash();
    if(!q) return true; // niente da fare: ok comunque

    if(!window.map || !window.L || !window.__qrOpenChildPanel) return false;

    var hit = findQrById(q.id);
    if(!hit) return true; // hash presente ma punto non trovato: non blocchiamo tutto

    ensureQrOn();

    try{
      var z = (map.getZoom && map.getZoom()) ? map.getZoom() : 16;
      z = Math.max(z, 17);
      map.setView([hit.child.lat, hit.child.lng], z, { animate:true });
    }catch(_){}

    try{
      window.__qrOpenChildPanel(hit.child.label, hit.child.descr, hit.child.media, q.id);
    }catch(_){}

    // imposta tab + indice dopo che il pannello ha messo i suoi onclick
    setTimeout(function(){
      try{
        if(q.mode === 'past'){
          var b = document.getElementById('btn-past'); if(b) b.click();
        }else if(q.mode === 'sfx'){
          var s = document.getElementById('btn-sfx'); if(s) s.click();
        }
      }catch(_){}

      var n = q.idx | 0;
      if(n > 0){
        var next = document.getElementById('next');
        for(var i=0; i<n; i++){
          (function(k){
            setTimeout(function(){ try{ if(next) next.click(); }catch(_){} }, 90*(k+1));
          })(i);
        }
      }
    }, 250);

    return true;
  }

  var tries = 0;
  function tick(){
    if(openFromHash()) return;
    if(++tries < 30) setTimeout(tick, 250);
  }

  window.addEventListener('hashchange', function(){
    tries = 0;
    tick();
  });

  tick();
})();
