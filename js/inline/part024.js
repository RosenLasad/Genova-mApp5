
(function(){
  function slugify(s){
    try{
      return s.toString().normalize('NFD')
        .replace(/[\u0300-\u036f]/g,'')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,'-')
        .replace(/(^-|-$)/g,'');
    }catch(e){ return (s||'').toString().toLowerCase().replace(/\s+/g,'-'); }
  }
  function layerSlug(layerKey){ return (layerKey||'').replace(/^mura-/, ''); }
  function mediaBase(layerKey, name){ return 'mura_media/' + layerSlug(layerKey) + '__' + slugify(name||''); }
  function imgCandidates(base){ return [base+'.webp', base+'.jpg', base+'.jpeg', base+'.png']; }
  function vidCandidates(base){ return [base+'.mp4', base+'.webm', base+'.ogg']; }
  function ensureMedia(layerKey, node, popupEl){
    
    if(!popupEl) return;
    var nid = (node.id || (node.name+'_'+(node.coords||[]).join('_'))).replace(/[^a-z0-9_\-]+/gi,'-').toLowerCase();
    var mediaBox = popupEl.querySelector('#media-'+nid);
    if(!mediaBox) return;
    if(mediaBox.getAttribute('data-loaded')==='1') return;
    mediaBox.setAttribute('data-loaded','1');

    function slugify(s){
      try{
        return s.toString().normalize('NFD')
          .replace(/[\u0300-\u036f]/g,'')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g,'-')
          .replace(/(^-|-$)/g,'');
      }catch(e){ return (s||'').toString().toLowerCase().replace(/\s+/g,'-'); }
    }
    function layerSlug(k){ return (k||'').replace(/^mura-/, ''); }
    var base = 'mura_media/' + layerSlug(layerKey) + '__' + slugify(node.name||'');

    // Image candidates (lowercase + uppercase)
    var imgs = [base+'.webp', base+'.jpg', base+'.jpeg', base+'.png',
                base+'.WEBP', base+'.JPG', base+'.JPEG', base+'.PNG'];

    var imgEl = document.createElement('img');
    imgEl.loading='lazy'; imgEl.decoding='async';
    imgEl.style.maxWidth='100%'; imgEl.style.height='auto'; imgEl.style.borderRadius='10px';
    imgEl.style.display='none';
    mediaBox.appendChild(imgEl);

    var i = 0;
    function tryNextImg(){
      if(i >= imgs.length){
        // Optional: show a tiny note if nothing found (comment out if not desired)
        var note = document.createElement('div');
        note.style.fontSize = '.85rem'; note.style.opacity = '.7';
        note.textContent = 'Immagine non trovata in '+base+'.(webp/jpg/jpeg/png)';
        mediaBox.appendChild(note);
        return;
      }
      var src = imgs[i++];
      var test = new Image();
      test.onload = function(){ imgEl.src = src; imgEl.style.display='block'; };
      test.onerror = function(){ tryNextImg(); };
      test.src = src;
    }
    tryNextImg();

  }
  window.__mura_media = { ensureMedia: ensureMedia };
})();
