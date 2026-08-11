
(function(){
  window.__qrOpenChildPanel = function(title, descr, media, qrid){

    try{ document.getElementById('panel').classList.add('open'); }catch(e){}
    var panel = document.getElementById('panel');
    if(panel){
      var header = panel.querySelector('header'); if(!header){ header = document.createElement('header'); panel.insertBefore(header, panel.firstChild); }
      var h2 = header.querySelector('h2'); if(!h2){ h2 = document.createElement('h2'); header.appendChild(h2); }
      h2.textContent = title || '';
    }
    var descEl = document.getElementById('place-desc'); if(descEl) descEl.textContent = descr || '';

    var imgToday = document.getElementById('media-today');
    var imgPast  = document.getElementById('media-past');
    var vidToday = document.getElementById('media-video-today');
    var vidPast  = document.getElementById('media-video');
    var btnToday = document.getElementById('btn-today');
    var btnPast  = document.getElementById('btn-past');
    var btnSfx   = document.getElementById('btn-sfx');
// Stato condivisibile (id punto + tab + indice)
var SHARE = (window.__QR_SHARE_STATE = window.__QR_SHARE_STATE || { id:'', mode:'today', idx:0 });

// Se qrid manca (aperture "vecchie"), prova a ricostruirlo cercando nei sorgenti QR
function guessQrId(){
  try{
    var today = (media && media.oggi) ? String(media.oggi) : '';
    var t = String(title || '').trim();
    var srcs = window.__QR_SOURCES || [];

    for(var s=0; s<srcs.length; s++){
      var p = srcs[s] && srcs[s].parent;
      var kids = (srcs[s] && srcs[s].children) ? srcs[s].children : [];
      if(!p || !p.id) continue;

      for(var c=0; c<kids.length; c++){
        var k = kids[c] || {};
        // match forte: path del video "oggi"
        if(today && k.media && k.media.oggi && String(k.media.oggi) === today){
          return String(p.id) + '/' + String(k.id || 'item');
        }
      }
    }

    // match debole: label (solo se non troviamo nulla con media.oggi)
    if(t){
      for(var s2=0; s2<srcs.length; s2++){
        var p2 = srcs[s2] && srcs[s2].parent;
        var kids2 = (srcs[s2] && srcs[s2].children) ? srcs[s2].children : [];
        if(!p2 || !p2.id) continue;

        for(var c2=0; c2<kids2.length; c2++){
          var k2 = kids2[c2] || {};
          if(String(k2.label || '').trim() === t){
            return String(p2.id) + '/' + String(k2.id || 'item');
          }
        }
      }
    }
  }catch(_){}
  return '';
}

if(!qrid) qrid = guessQrId();

SHARE.id = qrid || SHARE.id || '';
SHARE.mode = 'today';
SHARE.idx = 0;


// Bottone Condividi (creato una volta sola)
var shareBtn = document.getElementById('btn-share-qr');
if(!shareBtn && btnToday && btnToday.parentNode){
  shareBtn = document.createElement('button');
  shareBtn.id = 'btn-share-qr';
  shareBtn.type = 'button';
  shareBtn.className = 'btn btn-share-qr';
  shareBtn.title = 'Condividi questo punto';
  shareBtn.setAttribute('aria-label','Condividi questo punto');
  shareBtn.innerHTML = '<svg class="qr-share-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 7.91a3 3 0 1 0-3-3c0 .24.04.47.09.7L8.04 9.72A2.99 2.99 0 0 0 6 8.91a3 3 0 1 0 0 6c.96 0 1.82-.45 2.37-1.15l6.98 4.07c-.05.21-.08.43-.08.65a3 3 0 1 0 3-3z"/></svg>';
  btnToday.parentNode.appendChild(shareBtn);
}

function buildShareUrl(){
  var base = location.origin + location.pathname;
  var id = encodeURIComponent(SHARE.id || '');
  var m  = encodeURIComponent(SHARE.mode || 'today');
  var i  = String((SHARE.idx || 0) | 0);
  return base + '#qr=' + id + '&m=' + m + '&i=' + i;
}

function copyToClipboard(txt){
  if(navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(txt);
  }
  // fallback “anni 90”: textarea
  return new Promise(function(res){
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.setAttribute('readonly','');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try{ document.execCommand('copy'); }catch(_){}
    document.body.removeChild(ta);
    res();
  });
}

if(shareBtn){
  shareBtn.onclick = function(){
    var url = buildShareUrl();
    if(!SHARE.id){
      alert('Impossibile condividere: ID QR mancante.');
      return;
    }
    if(navigator.share){
      navigator.share({ title: 'Genova mApp', text: 'Guarda questo punto', url: url }).catch(function(){});
    }else{
      copyToClipboard(url).then(function(){
        alert('Link copiato negli appunti ✅');
      });
    }
  };
}

    if (!btnSfx && btnPast && btnPast.parentNode){
      btnSfx = document.createElement('span');
      btnSfx.id = 'btn-sfx';
      btnSfx.textContent = 'sfx';
      btnSfx.style.marginLeft = '8px';
      btnSfx.style.fontSize = '12px';
      btnSfx.style.padding = '2px 6px';
      btnSfx.style.borderRadius = '10px';
      btnSfx.style.border = '1px solid rgba(0,0,0,0.2)';
      btnSfx.style.userSelect = 'none';
      btnSfx.style.cursor = 'pointer';
      btnSfx.style.opacity = '0.85';
      btnPast.parentNode.insertBefore(btnSfx, btnPast.nextSibling);
    }

    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var counter = document.getElementById('counter');

    function hideAll(){
      if(imgToday) imgToday.style.display='none';
      if(imgPast)  imgPast.style.display='none';
      if(vidToday){ vidToday.pause && vidToday.pause(); vidToday.style.display='none'; }
      if(vidPast) { vidPast.pause && vidPast.pause();  vidPast.style.display='none';  }
    }
    function setButtons(active){
      if(btnToday) btnToday.classList.toggle('active', active==='today');
      if(btnPast)  btnPast .classList.toggle('active', active==='past');
      if(btnSfx)   btnSfx  .classList.toggle('active', active==='sfx');
    }
    function setCounter(i,n){
      if (!counter) return;
      if (!n || n <= 1){ counter.style.display = 'none'; counter.textContent = ''; }
      else { counter.style.display = ''; counter.textContent = i + '/' + n; }
    }

    var listPast = (media && Array.isArray(media.ieri)) ? media.ieri : (media && media.ieri ? [media.ieri] : []);
    var listSfx  = (media && Array.isArray(media.sfx))  ? media.sfx  : (media && media.sfx  ? [media.sfx]  : []);
    var hasSfx = listSfx.length > 0;
    if(btnSfx){ btnSfx.style.display = hasSfx ? 'inline-block' : 'none'; }

    var mode = 'today';
    var idxPast = 0, idxSfx = 0;

    function showToday(){
      mode = 'today';
try{ SHARE.mode='today'; SHARE.idx=0; }catch(_){}
      hideAll();
      if(vidToday){
        vidToday.src = (media && media.oggi) || '';
        vidToday.style.display = (media && media.oggi) ? 'block' : 'none';
        try{ vidToday.load(); }catch(e){}
      }
      setButtons('today'); setCounter(1, (media && media.oggi) ? 1 : 0);
    }
    function showPast(i){
      mode = 'past';
try{ SHARE.mode='past'; SHARE.idx=idxPast; }catch(_){}
      hideAll();
      idxPast = Math.max(0, Math.min((listPast.length||1)-1, (i||0)));
      var src = listPast[idxPast] || '';
      if(vidPast){
        vidPast.src = src;
        vidPast.style.display = src ? 'block' : 'none';
        try{ vidPast.load(); }catch(e){}
      }
      setButtons('past'); setCounter(idxPast+1, listPast.length||0);
    }
    function showSfx(i){
      if(!hasSfx) return;
      mode = 'sfx';
try{ SHARE.mode='sfx'; SHARE.idx=idxSfx; }catch(_){}
      hideAll();
      idxSfx = Math.max(0, Math.min((listSfx.length||1)-1, (i||0)));
      var src = listSfx[idxSfx] || '';
      if(vidPast){
        vidPast.src = src;
        vidPast.style.display = src ? 'block' : 'none';
        try{ vidPast.load(); }catch(e){}
      }
      setButtons('sfx'); setCounter(idxSfx+1, listSfx.length||0);
    }

    if(btnToday) btnToday.onclick = function(){ showToday(); };
    if(btnPast)  btnPast .onclick = function(){ showPast(0); };
    if(btnSfx)   btnSfx  .onclick = function(){ showSfx(0); };

    if(prev) prev.onclick = function(){
      if(mode==='past' && listPast.length) showPast(idxPast-1);
      else if(mode==='sfx' && listSfx.length) showSfx(idxSfx-1);
    };
    if(next) next.onclick = function(){
      if(mode==='past' && listPast.length) showPast(idxPast+1);
      else if(mode==='sfx' && listSfx.length) showSfx(idxSfx+1);
    };

    if(media && media.oggi) showToday();
    else if(listPast.length) showPast(0);
    else if(hasSfx) showSfx(0);
  };
})();
