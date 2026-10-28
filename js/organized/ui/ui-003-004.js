
  (function(){
    window.MUSEO_COLOMBO = {
      name: "Casa di Colombo",
      address: "Vico Dritto di Ponticello, 37, 16121 Genova",
      site: "https://www.museidigenova.it/it/casa_di_colombo",
      desc: {"it": "La casa di Cristoforo Colombo a Genova è la ricostruzione dell'edificio nel quale visse in gioventù Cristoforo Colombo. Oggi è adibita a polo museale storico del Comune.", "en": "Genoa’s House of Christopher Columbus is a reconstruction of the building where Christopher Columbus lived in his youth. Today it serves as the municipality’s historical museum site.", "fr": "La maison de Christophe Colomb à Gênes est la reconstruction du bâtiment où il vécut dans sa jeunesse. Elle est aujourd’hui aménagée en pôle muséal historique de la municipalité.", "es": "La casa de Cristóbal Colón en Génova es la reconstrucción del edificio en el que vivió en su juventud. Hoy funciona como polo museístico histórico del municipio.", "ar": "منزل كريستوفر كولومبوس في جنوة هو إعادة بناء للمبنى الذي عاش فيه كريستوفر كولومبوس في شبابه. ويُستخدم اليوم كمركز متحفي تاريخي تابع للبلدية.", "ru": "Дом Христофора Колумба в Генуе — это реконструкция здания, в котором Колумб жил в юности. Сегодня здесь находится исторический музейный центр города.", "zh": "热那亚的克里斯托弗·哥伦布故居是对他青年时期居住建筑的重建。如今这里作为市政府的历史博物馆中心对外开放。", "lij": "A Cà de Cristoffo Colombo a Zêna a l’é ‘na reconstrûçion de l’edifìçio ‘ndó o l’é stæto quand’o l’ea zóvene. Oggi a serve comme polo museâle stòrico do Comune."}
    };
    window.museumColomboPopupHTML = function(){
      try{
        // Usa direttamente il builder identico ai Forti
        var p = { 
          name: MUSEO_COLOMBO.name, 
          address: MUSEO_COLOMBO.address, 
          addr: MUSEO_COLOMBO.address,
          site: MUSEO_COLOMBO.site, 
          url: MUSEO_COLOMBO.site, 
          desc: MUSEO_COLOMBO.desc 
        };
        if (window.museumPopupHTML) return window.museumPopupHTML(p);
      }catch(_){}
      return '<div class="mh-popup"><span class="mh-popup-title">Casa di Colombo</span></div>';
    };
  })();

;

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


