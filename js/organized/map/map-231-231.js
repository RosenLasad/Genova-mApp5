(function(){
  'use strict';

  var KEY_PREFIX = 'genova_map_view_v1:';
  var DEFAULT_VIEW = {lat:44.40838225709695, lng:8.924881305964991, zoom:15};

  function accountKey(){
    var auth = window.GenovaAuth;
    var user = auth && auth.getUser();
    return user && user.id ? KEY_PREFIX + user.id : null;
  }

  function validView(view){
    return view && Number.isFinite(view.lat) && Math.abs(view.lat) <= 90 &&
      Number.isFinite(view.lng) && Math.abs(view.lng) <= 180 &&
      Number.isFinite(view.zoom);
  }

  function readView(){
    var key = accountKey();
    if(!key) return null;
    try{
      var view = JSON.parse(localStorage.getItem(key));
      return validView(view) ? view : null;
    }catch(_){ return null; }
  }

  function saveView(view){
    var key = accountKey();
    if(!key || !validView(view)) return;
    try{ localStorage.setItem(key, JSON.stringify(view)); }catch(_){}
  }

  function linkedDestination(url){
    var params = url.searchParams;
    return !!url.hash || params.get('vicinoame') === '1' ||
      ['doc','id','qr','evento'].some(function(key){ return !!params.get(key); });
  }

  function coordinatesFromUrl(params){
    var lat = params.get('lat'), lng = params.get('lng'), zoom = params.get('z');
    if(!lat || !lng || !zoom) return null;
    var view = {lat:Number(lat), lng:Number(lng), zoom:Number(zoom)};
    return validView(view) ? view : null;
  }

  function start(){
    var map = window.map;
    if(!map || typeof map.setView !== 'function') return;
    var url = new URL(window.location.href);
    var direct = linkedDestination(url);
    var explicitView = direct ? null : coordinatesFromUrl(url.searchParams);
    var auth = window.GenovaAuth;
    var waitingForAuth = auth && !auth.isReady();
    var restoring = !direct && !explicitView;
    var moved = false;
    var pendingView = null;
    var saving = true;

    function apply(view){
      map.setView([view.lat,view.lng], view.zoom, {animate:false});
    }
    function rememberMove(){
      if(restoring) moved = true;
    }
    function recordView(view){
      if(!saving) return;
      if(waitingForAuth) pendingView = view;
      else saveView(view);
    }

    if(explicitView) apply(explicitView);
    map.on('movestart', rememberMove);
    map.on('moveend', function(){
      if((restoring && !moved) || document.documentElement.classList.contains('gm-map-3d-active')) return;
      var center = map.getCenter();
      recordView({lat:center.lat, lng:center.lng, zoom:map.getZoom()});
    });
    document.addEventListener('app:map-3d-view', function(event){
      rememberMove();
      recordView(event.detail);
    });
    window.addEventListener('genova:preferences-reset', function(){
      saving = false;
      var key = accountKey();
      if(key) try{ localStorage.removeItem(key); }catch(_){}
    });

    function finishStartup(){
      waitingForAuth = false;
      if(!saving) return;
      if(pendingView) saveView(pendingView);
      if(!restoring || moved){ restoring = false; return; }
      // Il movimento d'inizializzazione non sostituisce la vista salvata.
      saving = false;
      restoring = false;
      try{ apply(readView() || DEFAULT_VIEW); }
      finally{ saving = true; }
    }
    if(waitingForAuth) auth.whenReady().then(finishStartup);
    else finishStartup();
  }

  if(document.readyState === 'complete') start();
  else window.addEventListener('load', start, {once:true});
})();
