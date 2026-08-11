(function(){
  'use strict';

  var LANGS=['it','en','es','fr','ar','ru','zh','lij'];
  var CATEGORY={
    it:'Acquedotto Storico',en:'Historic Aqueduct',es:'Acueducto histórico',fr:'Aqueduc historique',
    ar:'القناة التاريخية',ru:'Исторический акведук',zh:'历史引水道',lij:'Ægoæto Stòrico'
  };
  var UI={
    status:{it:'Stato',en:'Status',es:'Estado',fr:'État',ar:'الحالة',ru:'Состояние',zh:'状态',lij:'Stato'},
    pending:{it:'Immagine provvisoria',en:'Temporary image',es:'Imagen provisional',fr:'Image provisoire',ar:'صورة مؤقتة',ru:'Временное изображение',zh:'临时图片',lij:'Immàgine provvisöia'}
  };
  var META=[
    {id:'rio-torbido',subtitle:{it:'Il ponte del Seicento',en:'The seventeenth-century bridge',es:'El puente del siglo XVII',fr:'Le pont du XVIIe siècle',ar:'جسر القرن السابع عشر',ru:'Мост XVII века',zh:'17世纪桥梁',lij:'O ponte do Seiçento'},status:{it:'Visibile / percorribile',en:'Visible / walkable',es:'Visible / transitable',fr:'Visible / praticable',ar:'ظاهر / يمكن عبوره',ru:'Виден / доступен пешком',zh:'可见／可步行通过',lij:'Visibile / percorribile'}},
    {id:'anello-geirato',subtitle:{it:'L’anello del Seicento',en:'The seventeenth-century loop',es:'El anillo del siglo XVII',fr:'La boucle du XVIIe siècle',ar:'مسار القرن السابع عشر الدائري',ru:'Кольцевой маршрут XVII века',zh:'17世纪环线',lij:'L’anello do Seiçento'},status:{it:'Percorso storico / percorribile',en:'Historic route / walkable',es:'Ruta histórica / transitable',fr:'Parcours historique / praticable',ar:'مسار تاريخي / قابل للمشي',ru:'Исторический маршрут / доступен пешком',zh:'历史路线／可步行',lij:'Percorso stòrico / percorribile'}},
    {id:'presa-tassara',subtitle:{it:'La presa nel bosco',en:'The intake in the woods',es:'La toma en el bosque',fr:'La prise d’eau dans les bois',ar:'مأخذ المياه في الغابة',ru:'Водозабор в лесу',zh:'林中的取水口',lij:'A preiza into bosco'},status:{it:'Visibile / sul percorso',en:'Visible / on the route',es:'Visible / en la ruta',fr:'Visible / sur le parcours',ar:'ظاهر / على المسار',ru:'Виден / на маршруте',zh:'可见／位于路线沿线',lij:'Visibile / in sciô percorso'}},
    {id:'rio-gaxi',subtitle:{it:'Il ponte in rovina',en:'The ruined bridge',es:'El puente en ruinas',fr:'Le pont en ruine',ar:'الجسر المتهدم',ru:'Разрушенный мост',zh:'残破的桥梁',lij:'O ponte in roinn-a'},status:{it:'Rudere visibile',en:'Visible ruin',es:'Ruina visible',fr:'Ruine visible',ar:'أطلال ظاهرة',ru:'Видимые руины',zh:'可见遗迹',lij:'Rudere visibile'}},
    {id:'sifone-geirato',subtitle:{it:'Il grande ponte-sifone',en:'The great siphon bridge',es:'El gran puente-sifón',fr:'Le grand pont-siphon',ar:'جسر السيفون الكبير',ru:'Большой мост-сифон',zh:'大型虹吸桥',lij:'O grande ponte-sifon'},status:{it:'Visibile / accesso regolato',en:'Visible / regulated access',es:'Visible / acceso regulado',fr:'Visible / accès réglementé',ar:'ظاهر / الدخول منظم',ru:'Виден / доступ регулируется',zh:'可见／限制进入',lij:'Visibile / acesso regolou'}},
    {id:'molini-trensasco',subtitle:{it:'Il tratto ricucito',en:'The reconnected section',es:'El tramo reconectado',fr:'Le tronçon reconnecté',ar:'المقطع المعاد ربطه',ru:'Восстановленный связующий участок',zh:'重新连通的路段',lij:'O tratto reconnesso'},status:{it:'Visibile / percorribile',en:'Visible / walkable',es:'Visible / transitable',fr:'Visible / praticable',ar:'ظاهر / يمكن عبوره',ru:'Виден / доступен пешком',zh:'可见／可步行通过',lij:'Visibile / percorribile'}},
    {id:'ca-de-rissi',subtitle:{it:'La passerella contemporanea',en:'The contemporary footbridge',es:'La pasarela contemporánea',fr:'La passerelle contemporaine',ar:'ممر المشاة المعاصر',ru:'Современный пешеходный мост',zh:'现代步行桥',lij:'A passerella moderna'},status:{it:'Visibile / percorribile',en:'Visible / walkable',es:'Visible / transitable',fr:'Visible / praticable',ar:'ظاهر / يمكن عبوره',ru:'Виден / доступен пешком',zh:'可见／可步行通过',lij:'Visibile / percorribile'}},
    {id:'rio-consiglieri',subtitle:{it:'Il ponte ottocentesco',en:'The nineteenth-century bridge',es:'El puente del siglo XIX',fr:'Le pont du XIXe siècle',ar:'جسر القرن التاسع عشر',ru:'Мост XIX века',zh:'19世纪桥梁',lij:'O ponte de l’Ottoçento'},status:{it:'Visibile / percorribile',en:'Visible / walkable',es:'Visible / transitable',fr:'Visible / praticable',ar:'ظاهر / يمكن عبوره',ru:'Виден / доступен пешком',zh:'可见／可步行通过',lij:'Visibile / percorribile'}},
    {id:'galleria-rovinata',subtitle:{it:'La galleria di Barabino',en:'Barabino’s tunnel',es:'La galería de Barabino',fr:'La galerie de Barabino',ar:'نفق بارابينو',ru:'Тоннель Барабино',zh:'巴拉比诺隧道',lij:'A galleria de Barabino'},status:{it:'Visibile / accesso controllato',en:'Visible / controlled access',es:'Visible / acceso controlado',fr:'Visible / accès contrôlé',ar:'ظاهر / الدخول خاضع للرقابة',ru:'Виден / контролируемый доступ',zh:'可见／限制进入',lij:'Visibile / acesso controllou'}},
    {id:'filtri-staglieno',subtitle:{it:'La stazione dei filtri',en:'The filter station',es:'La estación de filtrado',fr:'La station de filtration',ar:'محطة الترشيح',ru:'Фильтровальная станция',zh:'过滤站',lij:'A staçion di filtri'},status:{it:'Visibile dall’esterno',en:'Visible from outside',es:'Visible desde el exterior',fr:'Visible de l’extérieur',ar:'يمكن رؤيتها من الخارج',ru:'Виден снаружи',zh:'可从外部观看',lij:'Visibile da feua'}},
    {id:'sifone-veilino',subtitle:{it:'Sopra Staglieno',en:'Above Staglieno',es:'Sobre Staglieno',fr:'Au-dessus de Staglieno',ar:'فوق ستاليينو',ru:'Над Стальено',zh:'斯塔列诺上方',lij:'In sciâ Stagén'},status:{it:'Visibile / accesso regolato',en:'Visible / regulated access',es:'Visible / acceso regulado',fr:'Visible / accès réglementé',ar:'ظاهر / الدخول منظم',ru:'Виден / доступ регулируется',zh:'可见／限制进入',lij:'Visibile / acesso regolou'}},
    {id:'ginestre-galleria',subtitle:{it:'La galleria verso città',en:'The tunnel towards the city',es:'La galería hacia la ciudad',fr:'La galerie vers la ville',ar:'النفق باتجاه المدينة',ru:'Тоннель в сторону города',zh:'通往城区的隧道',lij:'A galleria verso a çittæ'},status:{it:'Visibile / percorribile',en:'Visible / walkable',es:'Visible / transitable',fr:'Visible / praticable',ar:'ظاهر / يمكن عبوره',ru:'Виден / доступен пешком',zh:'可见／可步行通过',lij:'Visibile / percorribile'}}
  ];

  function parseSource(source){
    var chunks=String(source||'').split(/(?=Punto Acquedotto Storico \d+)/).filter(function(chunk){return /^Punto Acquedotto Storico \d+/.test(chunk);});
    return chunks.map(function(chunk,index){
      function field(pattern){var match=chunk.match(pattern);return match?match[1].trim():'';}
      var coordText=field(/Coordinate:\s*([^\r\n]+)/i).split(',');
      var descriptions={};
      var descriptionPattern=/(IT|EN|ES|FR|AR|RU|ZH|LIJ):\s*\[([\s\S]*?)\]\s*(?=(?:IT|EN|ES|FR|AR|RU|ZH|LIJ):|$)/g;
      var match;
      while((match=descriptionPattern.exec(chunk))) descriptions[match[1].toLowerCase()]=match[2].trim();
      var meta=META[index] || {id:'punto-'+(index+1),subtitle:{it:''},status:{it:''}};
      return {
        id:meta.id, name:field(/Nome ufficiale\/Titolo:\s*([^\r\n]+)/i), subtitle:meta.subtitle, status:meta.status,
        coords:[Number(coordText[0]),Number(coordText[1])], imageFuture:field(/Immagine:\s*([^\r\n]+)/i), desc:descriptions
      };
    }).filter(function(point){return point.name && isFinite(point.coords[0]) && isFinite(point.coords[1]);});
  }
  function lang(){
    var value='it';
    try{value=localStorage.getItem('lang')||document.documentElement.lang||'it';}catch(_){value=document.documentElement.lang||'it';}
    value=String(value).toLowerCase().split('-')[0];
    return LANGS.indexOf(value)>=0?value:'it';
  }
  function tx(value,lc){return value&&(value[lc]||value.it||value.en)||'';}
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  function mediaHTML(point){
    var file=String(point.imageFuture||'').trim();
    if(!file)return '<div class="gm-place-media"><div class="gm-place-media-fallback" aria-hidden="true"><span class="gm-place-media-symbol">∩∩</span></div></div>';
    var source='acquedotti/immagini/'+file;
    return '<div class="gm-place-media"><img src="'+esc(source)+'" alt="'+esc(point.name)+'" loading="lazy" decoding="async"></div>';
  }
  function popupHTML(point){
    var lc=lang(),direction=lc==='ar'?'rtl':'ltr';
    return '<article class="gm-place-popup gm-aqueduct-popup gm-aqueduct-popup--historic" data-aqueduct-historic-poi="'+esc(point.id)+'" dir="'+direction+'" style="--gm-place-color:#16a34a">'+
      '<header class="gm-place-header"><div class="gm-place-category"><span class="gm-place-category-mark" aria-hidden="true">≈</span>'+esc(tx(CATEGORY,lc))+'</div><h3 class="gm-place-title">'+esc(point.name)+'</h3><p class="gm-place-subtitle">'+esc(tx(point.subtitle,lc))+'</p></header>'+
      mediaHTML(point)+
      '<div class="gm-place-body"><div class="gm-aqueduct-status"><span class="sr-only">'+esc(tx(UI.status,lc))+': </span>'+esc(tx(point.status,lc))+'</div><p class="gm-place-description">'+esc(tx(point.desc,lc))+'</p></div></article>';
  }
  function enabled(){
    var control=document.getElementById('chk-acq-storico');
    if(control)return !!control.checked;
    try{return !!JSON.parse(localStorage.getItem('acq_visibility')||'{}')['acq-storico'];}catch(_){return false;}
  }

  var points=[],mapRef=null,layer=null,markerById={};
  function refresh(){
    if(!mapRef||!layer)return;
    if(enabled()){if(!mapRef.hasLayer(layer))layer.addTo(mapRef);}else if(mapRef.hasLayer(layer))mapRef.removeLayer(layer);
  }
  function updateOpenPopup(){
    if(!mapRef||!mapRef._popup)return;
    var marker=mapRef._popup._source,point=marker&&marker.__gmHistoricAqueductPoint;
    if(!point)return;
    mapRef._popup.setContent(popupHTML(point));
    if(mapRef._popup.update)mapRef._popup.update();
  }
  function openPoint(id,options){
    var marker=markerById[id];
    if(!marker||!mapRef)return false;
    var control=document.getElementById('chk-acq-storico');
    if(control&&!control.checked)control.click();
    refresh(); options=options||{};
    mapRef.setView(marker.getLatLng(),Math.max(mapRef.getZoom(),options.zoom||16),{animate:options.animate!==false});
    window.setTimeout(function(){marker.openPopup();},options.animate===false?0:280);
    return true;
  }
  function boot(){
    mapRef=window.map||window.__LEAFLET_MAP__||window.__map||window.MAP;
    if(!mapRef||typeof mapRef.addLayer!=='function'||!window.L||!points.length)return false;
    if(window.__gmHistoricAqueductPoiBooted)return true;
    window.__gmHistoricAqueductPoiBooted=true; layer=L.layerGroup();
    points.forEach(function(point){
      var marker=L.circleMarker(point.coords,{radius:7,weight:2,color:'#fff',fillColor:'#16a34a',fillOpacity:.96,opacity:1,className:'gm-aqueduct-marker gm-aqueduct-marker--historic',pane:'markerPane'});
      marker.__gmHistoricAqueductPoint=point;
      marker.bindTooltip(point.name,{direction:'top',offset:[0,-7]});
      marker.bindPopup(function(){return popupHTML(point);},{className:'gm-place-popup-wrap gm-aqueduct-popup-wrap gm-aqueduct-historic-popup-wrap',maxWidth:340,minWidth:260,autoPan:true,autoPanPaddingTopLeft:[42,112],autoPanPaddingBottomRight:[42,116],keepInView:true});
      marker.addTo(layer); markerById[point.id]=marker;
    });
    var control=document.getElementById('chk-acq-storico');
    if(control)control.addEventListener('change',function(){window.setTimeout(refresh,0);});
    document.addEventListener('click',function(event){if(event.target&&event.target.closest&&event.target.closest('[data-aqueduct="storico"], #chk-acq-storico'))window.setTimeout(refresh,30);},true);
    document.addEventListener('app:set-lang',function(){window.setTimeout(updateOpenPopup,20);});
    window.addEventListener('storage',function(event){if(event.key==='acq_visibility')refresh();});
    refresh();
    window.GenovaHistoricAqueductPOI={points:points,layer:layer,open:openPoint,refresh:refresh};
    return true;
  }
  function startEmbedded(data){
    points=(Array.isArray(data)?data:[]).map(function(point,index){
      var meta=META[index]||{id:'punto-'+(index+1),subtitle:{it:''},status:{it:''}};
      return {
        id:meta.id,
        name:point.name||'',
        subtitle:meta.subtitle,
        status:meta.status,
        coords:Array.isArray(point.coords)?point.coords:[],
        imageFuture:point.imageFuture||'',
        desc:point.desc||{}
      };
    }).filter(function(point){return point.name&&isFinite(point.coords[0])&&isFinite(point.coords[1]);});
    window.ACQUEDOTTO_STORICO_POIS=points;
    var attempts=0,timer=window.setInterval(function(){if(boot()||++attempts>160)window.clearInterval(timer);},100);
  }
  startEmbedded(window.ACQUEDOTTO_STORICO_POI_DATA);
})();
