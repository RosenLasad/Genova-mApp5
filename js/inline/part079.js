
(function(){
  function esc(s){return (s||"").replace(/[&<>"']/g, function(m){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];});}
  function normTitle(slug){
    return (slug||"").replace(/[_\-]+/g," ").replace(/\b\w/g, function(m){ return m.toUpperCase(); });
  }
  function buildHTML(cfg, slug){
    var ttl = (cfg && cfg.title) || normTitle(slug);
    var txt = (cfg && cfg.text) || "";
    var img = cfg && cfg.img;
    var imgTag = img ? '<img src="'+esc(img)+'" alt=""/>' : '';
    return '<div class="qr-parent-popup">'+imgTag+'<h4>'+esc(ttl)+'</h4><p>'+esc(txt)+'</p></div>';
  }
  function loadConfig(slug){
    var base = 'qr_azzurri/qr_azzurri_'+slug+'/parent_popup.json';
    return fetch(base, {cache:'no-cache'}).then(function(r){
      if(!r.ok) throw 0; return r.json();
    }).catch(function(){
      var txtUrl = 'qr_azzurri/qr_azzurri_'+slug+'/parent_popup.txt';
      return fetch(txtUrl, {cache:'no-cache'}).then(function(r){
        if(!r.ok) throw 0; return r.text();
      }).then(function(text){ return {title:null, text:text||"", img:null}; });
    }).catch(function(){ return {title:null, text:"", img:null}; });
  }

  function getSlugFrom(classList){
    for(var i=0;i<classList.length;i++){
      var c = classList[i];
      var m = /^qr\-([a-z0-9_\-]+)\-blue$/.exec(c);
      if(m) return m[1];
    }
    return null;
  }

  function onClick(e){
    var el = e.target;
    while(el){
      if(el.classList){
        var slug = getSlugFrom(el.classList);
        if(slug && slug !== 'via-xx-settembre'){ // safety
          try{ if(window.__qrCloseChildPanel) __qrCloseChildPanel(); }catch(_){}
          var latlng = null;
          try{
            if(window.map && map.mouseEventToLatLng) latlng = map.mouseEventToLatLng(e);
          }catch(_){}
          if(!latlng && window.map && map.getCenter) latlng = map.getCenter();
          loadConfig(slug).then(function(cfg){
            var html = buildHTML(cfg, slug);
            try{
              var p = L.popup({offset:[0,-6]}).setLatLng(latlng).setContent(html);
              p.addTo(map);
            }catch(_){}
          });
          // Prevent any default blue click handlers from running
          e.stopPropagation(); e.preventDefault();
          return;
        }
      }
      el = el.parentElement;
    }
  }

  document.addEventListener('click', onClick, true);
})();
