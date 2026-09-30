
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
