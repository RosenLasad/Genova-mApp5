
(function(){
  window.normalizeLang = function(lang){
    try{
      var s = (lang||'').toString().trim();
      if(!s) return 'it';
      s = s.replace('_','-').toLowerCase();
      // common aliases -> base
      var map = {
        'en-us':'en','en-gb':'en','en-au':'en','en-ca':'en',
        'es-es':'es','es-mx':'es','es-ar':'es','es-cl':'es',
        'fr-fr':'fr','fr-ca':'fr',
        'pt-br':'pt','pt-pt':'pt',
        'zh-cn':'zh','zh-tw':'zh','zh-hans':'zh','zh-hant':'zh'
      };
      if(map[s]) return map[s];
      // take primary subtag as base
      s = s.split('-')[0];
      return s || 'it';
    }catch(e){ return 'it'; }
  };
})();
