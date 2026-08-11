
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
