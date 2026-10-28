
(function(){
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
          + '<circle cx="12" cy="12" r="6"/>'  /* ring */
          + '<circle cx="12" cy="12" r="2" fill="white" stroke="white"/>' /* center dot */
          + '<line x1="12" y1="3" x2="12" y2="6"/>'  /* N tick */
          + '<line x1="12" y1="18" x2="12" y2="21"/>' /* S tick */
          + '<line x1="3" y1="12" x2="6" y2="12"/>'  /* W tick */
          + '<line x1="18" y1="12" x2="21" y2="12"/>' /* E tick */
          + '</svg>';
  function apply(){
    var btn = document.getElementById('btn-gps');
    if(!btn){ requestAnimationFrame(apply); return; }
    // If button contains an SVG child, replace it; else append our SVG
    try{
      btn.innerHTML = svg;
    }catch(_){}
  }
  // try soon and also later in case other scripts move/recreate it
  setTimeout(apply, 0);
  setTimeout(apply, 300);
  setTimeout(apply, 1200);
})();

;

(function(){
  function merge(dst, src){ for(var k in src){ if(Object.prototype.hasOwnProperty.call(src,k)){ if(src[k] && typeof src[k]==='object'){ dst[k]=dst[k]||{}; merge(dst[k],src[k]); } else { dst[k]=src[k]; } } } }
  if(typeof window.t !== 'function'){
    window.t = function(key){
      try{
        var lang = (document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0];
        var dict = (window.I18N_DICT && window.I18N_DICT[lang]) || (window.I18N_DICT && window.I18N_DICT.it) || {};
        return key.split('.').reduce(function(o,k){ return (o && o[k] != null) ? o[k] : null; }, dict) || '';
      }catch(_){ return ''; }
    };
  }
  window.I18N_DICT = window.I18N_DICT || {};

  var D = {
    it:{storia:{acq:{
      romano:"Acquedotto Romano (III sec. a.C.)",
      storico:"Acquedotto Storico (XVII sec.)"
    }}},
    en:{storia:{acq:{
      romano:"Roman Aqueduct (3rd century BCE)",
      storico:"Historic Aqueduct (17th century CE)"
    }}},
    es:{storia:{acq:{
      romano:"Acueducto romano (siglo III a. C.)",
      storico:"Acueducto histórico (siglo XVII)"
    }}},
    fr:{storia:{acq:{
      romano:"Aqueduc romain (IIIe s. av. J.-C.)",
      storico:"Aqueduc historique (XVIIe s. apr. J.-C.)"
    }}},
    ar:{storia:{acq:{
      romano:"القناة الرومانية (القرن الثالث قبل الميلاد)",
      storico:"القناة التاريخية (القرن السابع عشر الميلادي)"
    }}},
    ru:{storia:{acq:{
      romano:"Римский акведук (III век до н. э.)",
      storico:"Исторический акведук (XVII век н. э.)"
    }}},
    zh:{storia:{acq:{
      romano:"罗马引水道（公元前3世纪）",
      storico:"历史引水道（公元17世纪）"
    }}},
    lij:{storia:{acq:{
      romano:"Aqüedotto Romano (III secolo a.C.)",
      storico:"Aqüedotto Stòrico (XVII secolo)"
    }}}
  };
  for(var lg in D){ window.I18N_DICT[lg]=window.I18N_DICT[lg]||{}; merge(window.I18N_DICT[lg], D[lg]); }

  function updateAcq(){
    [['storia-acq-romano','storia.acq.romano'], ['storia-acq-storico','storia.acq.storico']].forEach(function(p){
      var cb = document.getElementById(p[0]); if(!cb) return;
      var span = cb.closest('label') && cb.closest('label').querySelector('.st-label'); if(!span) return;
      span.setAttribute('data-i18n', p[1]);
      var txt = (typeof t==='function') ? t(p[1]) : '';
      if(txt){ span.textContent = txt; }
    });
  }
  function boot(){
    updateAcq();
    document.addEventListener('app:set-lang', updateAcq);
    try{ new MutationObserver(updateAcq).observe(document.documentElement, {attributes:true, attributeFilter:['lang']}); }catch(_){}
  }
  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
})();

