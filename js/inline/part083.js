
(function(){
  var scanBtn = document.getElementById('btn-scan');
  var scanModal = document.getElementById('qr-scan');
  var videoEl = document.getElementById('qr-video');
  var canvasEl = document.getElementById('qr-canvas');
  var closeBtn = document.getElementById('qr-close');
  var cancelBtn = document.getElementById('qr-cancel');
  var fallbackMsg = document.getElementById('qr-fallback');
  var stream = null, stopLoop = false, detector = null, ctx = null;
  var frameEl = null;
  function ensureQrFrame(){
    if(frameEl && frameEl.parentNode) return frameEl;
    frameEl = document.createElement('div'); frameEl.id = 'qr-frame';
    frameEl.innerHTML = '<span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>';
    // append to modal so we can position via modal rect
    (scanModal || document.body).appendChild(frameEl);
    return frameEl;
  }
  function positionQrFrame(){
    try{
      var f = ensureQrFrame();
      var vr = videoEl.getBoundingClientRect();
      var mr = scanModal.getBoundingClientRect();
      var left = vr.left - mr.left;
      var top  = vr.top  - mr.top;
      f.style.left = left + 'px';
      f.style.top  = top  + 'px';
      f.style.width  = vr.width  + 'px';
      f.style.height = vr.height + 'px';
      f.style.display = 'block';
    }catch(_){ if(frameEl) frameEl.style.display='none'; }
  }

  var currentFacing = 'environment';
  var currentDeviceId = null;
  function buildConstraints(){
    var base = { width:{ideal:1280}, height:{ideal:720} };
    var video = currentDeviceId ? { deviceId: { exact: currentDeviceId }, ...base }
                                : { facingMode: { ideal: currentFacing }, ...base };
    return { video: video, audio: false };
  }
  async function restartStream(){
    try{ if(stream){ stream.getTracks().forEach(function(t){ t.stop(); });
 } }catch(_){}
    stream = null; videoEl.srcObject = null;
    // (re)start using current preference
    await startStream();
  }

  function hasBarcodeDetector(){ return 'BarcodeDetector' in window; }
  function hasJsQR(){ return typeof window.jsQR === 'function'; }

  async function startStream(){
    stream = await navigator.mediaDevices.getUserMedia(buildConstraints());
    videoEl.srcObject = stream;
    await videoEl.play();
      setTimeout(positionQrFrame, 100);
  }

  async function makeDetector(){
    try{
      if (!hasBarcodeDetector()) return null;
      if (window.BarcodeDetector && BarcodeDetector.getSupportedFormats){
        var avail = await BarcodeDetector.getSupportedFormats();
        if (!avail.includes('qr_code')) return null;
      }
      return new BarcodeDetector({ formats:['qr_code'] });
    }catch(e){ return null; }
  }

  function parseAndOpen(payload){
    try{
      var url = new URL(payload, window.location.origin);
      var id = url.searchParams.get('id');
      if (id && typeof window.openPlace === 'function'){
        closeScanner();
        setTimeout(function(){ window.openPlace(id); }, 50);
        return;
      }
      if (/^https?:\/\//i.test(payload)){
        closeScanner();
        window.location.href = payload;
        return;
      }
    }catch(e){
      if (typeof window.openPlace === 'function' && payload){
        closeScanner();
        setTimeout(function(){ window.openPlace(payload); }, 50);
        return;
      }
    }
    alert('QR letto, ma non riconosciuto come link valido: ' + payload);
  }

  async function openScanner(){
    scanModal.classList.add('open');
    stopLoop = false;
    detector = await makeDetector(); // may be null
    fallbackMsg.style.display = 'none';
    videoEl.style.display = 'block';

    try{
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width:{ideal:1280}, height:{ideal:720} },
        audio: false
      });
      videoEl.srcObject = stream;
      await videoEl.play();
      if (detector){
        requestAnimationFrame(scanLoopDetector);
      }else if (hasJsQR()){
        canvasEl.width = videoEl.videoWidth || 640;
        canvasEl.height = videoEl.videoHeight || 480;
        ctx = canvasEl.getContext('2d', { willReadFrequently:true });
        requestAnimationFrame(scanLoopJsQR);
      }else{
        fallbackMsg.style.display = 'block';
        videoEl.style.display = 'none';
      }
    }catch(e){
      fallbackMsg.style.display = 'block';
      videoEl.style.display = 'none';
    }
  }

  async function scanLoopDetector(){
    if (stopLoop || !detector || videoEl.readyState < 2){ if(!stopLoop) requestAnimationFrame(scanLoopDetector); return; }
    try{
      var codes = await detector.detect(videoEl);
      if (codes && codes.length){
        var payload = codes[0].rawValue || codes[0].rawValue;
        if (payload){ parseAndOpen(payload); return; }
      }
    }catch(e){ /* ignore */ }
    if (!stopLoop) requestAnimationFrame(scanLoopDetector);
  }

  function scanLoopJsQR(){
    if (stopLoop || !ctx || videoEl.readyState < 2){ if(!stopLoop) requestAnimationFrame(scanLoopJsQR); return; }
    try{
      var vw = videoEl.videoWidth, vh = videoEl.videoHeight;
      if (vw && vh){
        if (canvasEl.width !== vw) canvasEl.width = vw;
        if (canvasEl.height !== vh) canvasEl.height = vh;
        ctx.drawImage(videoEl, 0, 0, vw, vh);
        var imgData = ctx.getImageData(0, 0, vw, vh);
        var code = window.jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: "attemptBoth" });
        if (code && code.data){ parseAndOpen(code.data); return; }
      }
    }catch(e){ /* ignore */ }
    if (!stopLoop) requestAnimationFrame(scanLoopJsQR);
  }

  function closeScanner(){
    stopLoop = true;
    scanModal.classList.remove('open');
    try{ videoEl.pause(); }catch(_){}
    if (videoEl) videoEl.srcObject = null;
    if (stream){ try{ stream.getTracks().forEach(function(t){ t.stop(); });
 }catch(_){ } stream = null; }
  }

  async function switchCamera(){
    try{
      // Ensure permission to list devices
      try{ await navigator.mediaDevices.getUserMedia({video:true}); }catch(_){}
      var list = await navigator.mediaDevices.enumerateDevices();
      var cams = list.filter(function(d){ return d.kind==='videoinput'; });
      if(cams.length <= 1){
        currentDeviceId = null;
        currentFacing = (currentFacing==='environment' ? 'user' : 'environment');
        await restartStream();
        return;
      }
      var curTrack = stream && stream.getVideoTracks && stream.getVideoTracks()[0];
      var curId = curTrack && curTrack.getSettings && curTrack.getSettings().deviceId;
      var idx = cams.findIndex(function(c){ return c.deviceId===curId; });
      var next = cams[(idx>=0 ? idx+1 : 1) % cams.length];
      currentDeviceId = next.deviceId; currentFacing = 'user';
      await restartStream();
    }catch(e){ console.error(e); }
  }
  var switchBtn = document.getElementById('qr-switch');
  if(switchBtn) switchBtn.addEventListener('click', function(e){ e.preventDefault(); switchCamera(); });

  if (scanBtn) scanBtn.addEventListener('click', function(){
      currentDeviceId = null; currentFacing = 'environment';
    if (scanModal.classList.contains('open')) closeScanner();
    else openScanner();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeScanner);
  if (cancelBtn) cancelBtn.addEventListener('click', closeScanner);
  scanModal && scanModal.addEventListener('click', function(e){ if (e.target === scanModal) closeScanner(); });
  window.addEventListener('resize', positionQrFrame);
  if (scanModal) scanModal.addEventListener('transitionend', positionQrFrame);
  document.addEventListener('keydown', function(e){ if(e.key==='+'||e.key==='-') setTimeout(positionQrFrame, 50); });
})();
