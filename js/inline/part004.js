
(function(){
  if(!window.museumPopupHTML){
    window.museumPopupHTML = function(p){
      try{
        var lc   = (document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0];
        var base = (localStorage.getItem('lang') || lc).toLowerCase().split('-')[0];
        var candidates = [base, lc, 'it', 'en', 'fr', 'es', 'ru', 'ar', 'zh', 'lij'];

        var esc  = (typeof window.esc === 'function' ? window.esc : function(s){return String(s||'');});
        var dir  = (typeof getDir === 'function' ? getDir(base||lc) : ((base||lc)==='ar' ? 'rtl':'ltr'));

        var ADDR_LABEL = { 
          it:"Indirizzo",
          en:"Address",
          fr:"Adresse",
          es:"Dirección",
          ar:"العنوان",
          ru:"Адрес",
          zh:"地址",
          lij:"Indirìsso"
        };
        var addrLabel = (ADDR_LABEL[base] || ADDR_LABEL[lc] || ADDR_LABEL.it) + ": ";

        // NUOVO: testo tradotto per il link
        var LINK_LABEL = {
          it:  "Link al sito ufficiale",
          en:  "Official website",
          fr:  "Site officiel",
          es:  "Sitio oficial",
          ar:  "الموقع الرسمي",
          ru:  "Официальный сайт",
          zh:  "官方网站",
          lij: "Sito uffiçiâ"
        };
        var linkText = LINK_LABEL[base] || LINK_LABEL[lc] || LINK_LABEL.it;

        var name = p.name || p.title || 'Museo';
        var addr = p.addr || p.address || '';
        var site = p.site || p.url || '';
        var desc = '';
        var img  = p.img || '';

        if(p.desc && typeof p.desc === 'object'){
          for (var i=0; i<candidates.length; i++){
            var key = candidates[i];
            if (p.desc[key]){ desc = p.desc[key]; break; }
          }
          if (!desc) desc = p.desc.it || p.desc.en || '';
        }else{
          desc = p.desc || p.description || '';
        }

        return (
          '<div class="mh-popup" dir="'+dir+'">'
          + '<span class="mh-popup-title">' + esc(name) + '</span>'
          + (img ? (
      '<div class="mh-popup-img">'
      + '<img src="'+esc(img)+'" alt="'+esc(name)+'" '
      + 'style="display:block;max-width:100%;height:auto;'
      + 'margin:6px 0 4px;border-radius:6px;" />'
      + '</div>'
    ) : '')
          + (desc ? '<p class="mh-popup-desc">' + esc(desc) + '</p>' : '')
          + (addr ? '<div class="mh-popup-addr"><strong>' + esc(addrLabel) + '</strong>' + esc(addr) + '</div>' : '')
          + (site ? '<div class="mh-popup-link"><a href="'+esc(site)+'" target="_blank" rel="noopener">' + esc(linkText) + '</a></div>' : '')
          + '</div>'
        );
      }catch(_e){
        return '<div class="mh-popup"><span class="mh-popup-title">'+ (p.name||'Museo') +'</span></div>';
      }
    };
  }
})();

