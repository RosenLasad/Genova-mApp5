
(function(){
  // Merge helper
  function merge(dst, src){ for(var k in src){ if(Object.prototype.hasOwnProperty.call(src,k)){ if(src[k] && typeof src[k]==='object'){ dst[k]=dst[k]||{}; merge(dst[k],src[k]); } else { dst[k]=src[k]; } } } }
  // t() polyfill if missing
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

  // Add translations for the 7 mura
  var D = {
    it:{storia:{mura:{
      pre_romane:"Mura Pre-Romane (544 – 458 a.C.)",
      carolinge:"Mura Carolinge (848 – 889 d.C.)",
      barbarossa:"Mura del Barbarossa (1155 – 1159)",
      molo:"Mura del Molo (1269)",
      repubblica:"Mura della Repubblica (1346 – 1358)",
      rinascimento:"Mura del Rinascimento (1536 – 1553)",
      nuove:"Mura Nuove (1626 – 1639)"
    }}},
    en:{storia:{mura:{
      pre_romane:"Pre-Roman Walls (544–458 BCE)",
      carolinge:"Carolingian Walls (848–889 CE)",
      barbarossa:"Barbarossa Walls (1155–1159)",
      molo:"Molo Walls (1269)",
      repubblica:"Republic Walls (1346–1358)",
      rinascimento:"Renaissance Walls (1536–1553)",
      nuove:"New Walls (1626–1639)"
    }}},
    es:{storia:{mura:{
      pre_romane:"Murallas prerromanas (544–458 a. C.)",
      carolinge:"Murallas carolingias (848–889 d. C.)",
      barbarossa:"Murallas de Barbarroja (1155–1159)",
      molo:"Murallas del muelle (1269)",
      repubblica:"Murallas de la República (1346–1358)",
      rinascimento:"Murallas del Renacimiento (1536–1553)",
      nuove:"Murallas nuevas (1626–1639)"
    }}},
    fr:{storia:{mura:{
      pre_romane:"Murailles préromaines (544–458 av. J.-C.)",
      carolinge:"Murailles carolingiennes (848–889 apr. J.-C.)",
      barbarossa:"Murailles de Barberousse (1155–1159)",
      molo:"Murailles du Môle (1269)",
      repubblica:"Murailles de la République (1346–1358)",
      rinascimento:"Murailles de la Renaissance (1536–1553)",
      nuove:"Nouvelles murailles (1626–1639)"
    }}},
    ar:{storia:{mura:{
      pre_romane:"أسوار ما قبل الرومان (544–458 ق.م)",
      carolinge:"أسوار الكارولنجيين (848–889 م)",
      barbarossa:"أسوار بربروسا (1155–1159)",
      molo:"أسوار المرفأ (1269)",
      repubblica:"أسوار الجمهورية (1346–1358)",
      rinascimento:"أسوار عصر النهضة (1536–1553)",
      nuove:"الأسوار الجديدة (1626–1639)"
    }}},
    ru:{storia:{mura:{
      pre_romane:"Доримские стены (544–458 до н. э.)",
      carolinge:"Каролингские стены (848–889 гг.)",
      barbarossa:"Стены Барбароссы (1155–1159)",
      molo:"Стены Моло (1269)",
      repubblica:"Стены Республики (1346–1358)",
      rinascimento:"Стены эпохи Возрождения (1536–1553)",
      nuove:"Новые стены (1626–1639)"
    }}},
    zh:{storia:{mura:{
      pre_romane:"前罗马城墙（公元前544–458年）",
      carolinge:"加洛林城墙（公元848–889年）",
      barbarossa:"巴巴罗萨城墙（1155–1159年）",
      molo:"码头城墙（1269年）",
      repubblica:"共和国时期城墙（1346–1358年）",
      rinascimento:"文艺复兴时期城墙（1536–1553年）",
      nuove:"新城墙（1626–1639年）"
    }}},
    lij:{storia:{mura:{
      pre_romane:"Mûre pre-romane (544–458 a.C.)",
      carolinge:"Mûre carolìnge (848–889 d.C.)",
      barbarossa:"Mûre do Barbarossa (1155–1159)",
      molo:"Mûre do Mô (1269)",
      repubblica:"Mûre da Repùbrica (1346–1358)",
      rinascimento:"Mûre do Rinascimento (1536–1553)",
      nuove:"Mûre Noêve (1626–1639)"
    }}}
  };
  for(var lg in D){ window.I18N_DICT[lg]=window.I18N_DICT[lg]||{}; merge(window.I18N_DICT[lg], D[lg]); }

  // Attach data-i18n keys to our 7 spans and update text
  var map = {
    'storia-mura-pre-romane': 'storia.mura.pre_romane',
    'storia-mura-carolinge': 'storia.mura.carolinge',
    'storia-mura-barbarossa': 'storia.mura.barbarossa',
    'storia-mura-molo': 'storia.mura.molo',
    'storia-mura-repubblica': 'storia.mura.repubblica',
    'storia-mura-rinascimento': 'storia.mura.rinascimento',
    'storia-mura-nuove': 'storia.mura.nuove'
  };

  function updateLabels(){
    Object.keys(map).forEach(function(cbId){
      var cb = document.getElementById(cbId);
      if(!cb) return;
      var label = cb.closest('label');
      if(!label) return;
      var span = label.querySelector('.st-label');
      if(!span) return;
      var key = map[cbId];
      span.setAttribute('data-i18n', key);
      var txt = (typeof t==='function') ? t(key) : '';
      if(txt){ span.textContent = txt; }
    });
  }

  function bootI18n(){
    updateLabels();
    // update on app:set-lang
    document.addEventListener('app:set-lang', updateLabels);
    // update when <html lang="…"> changes
    try{
      new MutationObserver(updateLabels).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
    }catch(_){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bootI18n);
  } else { bootI18n(); }
})();
