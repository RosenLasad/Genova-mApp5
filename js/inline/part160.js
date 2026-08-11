
(function(){
  var HELP_I18N = window.HELP_I18N || {};

  function getLang(){
    return localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it';
  }

  function renderHelp(lang){
    try{
      var el = document.getElementById('help-legend');
      if(!el) return;
      var t = HELP_I18N[lang] || HELP_I18N.it;
      var bullets = [t.b1,t.b2,t.b3,t.b4,t.b5,t.b6]
        .map(function(s){ return '<div>• '+s+'</div>'; }).join('');
      var ctaLine = '<div>• <button id="help-sub-link" class="help-linklike">'+t.cta+'</button> '+t.after+'</div>';
      var titleEl = document.getElementById('help-title') || el.querySelector('h3');
      var titleHtml = titleEl ? titleEl.outerHTML : '<h3 id="help-title">'+t.title+'</h3>';
      el.innerHTML = titleHtml + bullets + ctaLine;
      el.querySelector('h3').textContent = t.title;
      el.setAttribute('dir', (lang==='ar' ? 'rtl' : 'ltr'));

      // bind click to open subscription flow (reuse the coin button trigger)
      var cta = document.getElementById('help-sub-link');
      if(cta){
        cta.addEventListener('click', function(e){
          e.preventDefault();
          var subBtn = document.getElementById('btn-sub');
          if(subBtn && typeof subBtn.click === 'function'){ subBtn.click(); }
        }, {once:false});
      }
    }catch(_){}
  }

  function update(){ renderHelp(getLang()); }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', update, {once:true});
  }else{
    update();
  }
  document.addEventListener('app:set-lang', update);
})();
