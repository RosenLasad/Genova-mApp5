
(function(){
  if(window.__qr_open && window.__qr_close) return; // don't duplicate

  let stream = null;
  const state = { opening:false };

  async function getPreferredStream(){
    const constraints = [
      { video: { facingMode: { ideal: "environment" } }, audio:false },
      { video: true, audio:false }
    ];
    for(const c of constraints){
      try{
        const s = await navigator.mediaDevices.getUserMedia(c);
        return s;
      }catch(e){ /* try next */ }
    }
    throw new Error("Impossibile accedere alla webcam");
  }

  async function startVideo(){
    const video = document.getElementById('qr-video');
    const fallback = document.getElementById('qr-fallback');
    if(!video) return;

    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      if(fallback){ fallback.style.display='block'; }
      return;
    }
    try{
      stream = await getPreferredStream();
      video.srcObject = stream;
      await video.play();
      if(fallback){ fallback.style.display='none'; }
    }catch(err){
      console.error(err);
      if(fallback){
        fallback.textContent = "Permesso fotocamera negato o non disponibile.";
        fallback.style.display='block';
      }
    }
  }

  function stopVideo(){
  var video = document.getElementById('qr-video');
  if (video && video.srcObject){
    try{
      video.pause();
    }catch(_){}
  }
  if (stream){
    try{
      stream.getTracks().forEach(function(t){ t.stop(); });
    }catch(_){}
  }
  stream = null;
}


  // Expose global open/close
  window.__qr_open = async function(){
    if(state.opening) return;
    state.opening = true;
    try{
      const card = document.getElementById('qr-scan');
      if(card) card.classList.add('open');
      await startVideo();
    } finally {
      state.opening = false;
    }
  };
  window.__qr_close = function(){
    const card = document.getElementById('qr-scan');
    if(card) card.classList.remove('open');
    stopVideo();
  };

  // Wire any close buttons inside the qr card (if present)
  document.addEventListener('click', function(e){
    const t = e.target;
    if(!t) return;
    // Buttons that close the modal could have data-role="close-qr" or [aria-label*="Chiudi"]
    if(t.matches('[data-role="close-qr"], [aria-label*="Chiudi"], .qr-close')){
      e.preventDefault();
      window.__qr_close();
    }
  }, true);

})();
