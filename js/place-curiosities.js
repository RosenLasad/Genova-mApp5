/* Genova mApp - pannello Curiosita Premium per luoghi storici. */
(function(){
  'use strict';
  if(window.GenovaPlaceCuriosities) return;

  var LANGS=['it','en','es','fr','ar','ru','zh','lij'];
  var UI={
    it:{button:'Curiosità',title:'Curiosità',close:'Chiudi',prev:'Pagina precedente',next:'Pagina successiva',premiumTitle:'Curiosità Premium',premiumMessage:'Le Curiosità sono disponibili con Genova mApp Premium. Passa a Premium per scoprire storie, dettagli e approfondimenti su questo luogo.'},
    en:{button:'Curiosities',title:'Curiosities',close:'Close',prev:'Previous page',next:'Next page',premiumTitle:'Premium Curiosities',premiumMessage:'Curiosities are available with Genova mApp Premium. Upgrade to Premium to discover stories, details and extra insights about this place.'},
    es:{button:'Curiosidades',title:'Curiosidades',close:'Cerrar',prev:'Página anterior',next:'Página siguiente',premiumTitle:'Curiosidades Premium',premiumMessage:'Las Curiosidades están disponibles con Genova mApp Premium. Pásate a Premium para descubrir historias, detalles y contenidos extra sobre este lugar.'},
    fr:{button:'Curiosités',title:'Curiosités',close:'Fermer',prev:'Page précédente',next:'Page suivante',premiumTitle:'Curiosités Premium',premiumMessage:'Les Curiosités sont disponibles avec Genova mApp Premium. Passez à Premium pour découvrir des histoires, des détails et des contenus supplémentaires sur ce lieu.'},
    ar:{button:'معلومات طريفة',title:'معلومات طريفة',close:'إغلاق',prev:'الصفحة السابقة',next:'الصفحة التالية',premiumTitle:'معلومات Premium',premiumMessage:'تتوفر المعلومات والقصص الإضافية مع Genova mApp Premium. اشترك في Premium لاكتشاف تفاصيل وحكايات إضافية عن هذا المكان.'},
    ru:{button:'Интересные факты',title:'Интересные факты',close:'Закрыть',prev:'Предыдущая страница',next:'Следующая страница',premiumTitle:'Факты Premium',premiumMessage:'Интересные факты доступны в Genova mApp Premium. Перейдите на Premium, чтобы открыть истории, детали и дополнительные материалы об этом месте.'},
    zh:{button:'趣闻',title:'趣闻',close:'关闭',prev:'上一页',next:'下一页',premiumTitle:'Premium 趣闻',premiumMessage:'“趣闻”内容仅向 Genova mApp Premium 用户开放。升级到 Premium，即可查看这个地点的故事、细节和更多深度内容。'},
    lij:{button:'Curioxitæ',title:'Curioxitæ',close:'Særa',prev:'Pagina precedente',next:'Pagina seguente',premiumTitle:'Curioxitæ Premium',premiumMessage:'E Curioxitæ en disponibili con Genova mApp Premium. Passa a Premium pe descrovî stöie, detaggi e approfondimenti in sce sto pòsto.'}
  };
  var PAGE_SIZE=5;
  var active={type:null,name:null,page:0};

  function lang(){
    var raw='it';
    try{raw=localStorage.getItem('lang')||document.documentElement.lang||'it';}catch(_e){}
    raw=String(raw||'it').toLowerCase();
    if(raw.indexOf('lij')===0)return'lij';
    if(raw.indexOf('zh')===0)return'zh';
    raw=raw.split(/[-_]/)[0];
    return LANGS.indexOf(raw)>=0?raw:'it';
  }
  function tx(){return UI[lang()]||UI.it;}
  function normalized(value){return String(value||'').trim().toLowerCase().replace(/\s+/g,' ');}
  function dataFor(type,name){
    var group=window.GENOVA_PLACE_CURIOSITIES&&window.GENOVA_PLACE_CURIOSITIES[type];
    if(!group)return null;
    if(group[name])return group[name];
    var wanted=normalized(name),keys=Object.keys(group);
    for(var i=0;i<keys.length;i++)if(normalized(keys[i])===wanted)return group[keys[i]];
    return null;
  }
  function has(type,name){return !!dataFor(type,name);}
  function isPremium(){
    try{if(window.GenovaEntitlements&&typeof window.GenovaEntitlements.allows==='function')return window.GenovaEntitlements.allows('curiosities');if(window.GenovaEntitlements&&window.GenovaEntitlements.currentTier)return window.GenovaEntitlements.currentTier()==='premium';}catch(_e){}
    try{var s=window.GenovaAccount&&window.GenovaAccount.getState();if(s&&s.active)return true;}catch(_e2){}
    return window.isSubscribed===true;
  }
  function splitItem(value){
    value=String(value||'');
    var at=value.indexOf(':');
    if(at<0)return{title:'',text:value};
    return{title:value.slice(0,at).trim(),text:value.slice(at+1).trim()};
  }
  function ensureModal(){
    var modal=document.getElementById('gm-curiosities-modal');
    if(modal)return modal;
    modal=document.createElement('div');
    modal.id='gm-curiosities-modal';
    modal.hidden=true;
    modal.innerHTML='<section class="gm-curiosities-dialog" role="dialog" aria-modal="true" aria-labelledby="gm-curiosities-heading">'+
      '<header class="gm-curiosities-head"><div><span class="gm-curiosities-kicker"></span><h2 id="gm-curiosities-heading"></h2></div><button type="button" class="gm-curiosities-close" aria-label="">×</button></header>'+
      '<div class="gm-curiosities-list"></div>'+
      '<nav class="gm-curiosities-pagination" aria-label=""><button type="button" class="gm-curiosities-page-btn gm-curiosities-prev" aria-label="">‹</button><span class="gm-curiosities-page-indicator" aria-live="polite"></span><button type="button" class="gm-curiosities-page-btn gm-curiosities-next" aria-label="">›</button></nav>'+
      '</section>';
    document.body.appendChild(modal);
    modal.querySelector('.gm-curiosities-close').addEventListener('click',close);
    modal.querySelector('.gm-curiosities-prev').addEventListener('click',function(){if(active.page>0){active.page--;renderOpen();}});
    modal.querySelector('.gm-curiosities-next').addEventListener('click',function(){active.page++;renderOpen();});
    modal.addEventListener('click',function(e){if(e.target===modal)close();});
    return modal;
  }
  function close(){
    var modal=document.getElementById('gm-curiosities-modal');
    if(modal)modal.hidden=true;
    document.documentElement.classList.remove('gm-curiosities-open');
  }
  function renderOpen(){
    if(!active.type||!active.name)return;
    var d=dataFor(active.type,active.name);if(!d)return;
    var code=lang(),items=d[code]||d.it||[];
    var modal=ensureModal(),copy=tx();
    modal.setAttribute('dir',code==='ar'?'rtl':'ltr');
    modal.querySelector('.gm-curiosities-kicker').textContent=copy.title;
    modal.querySelector('#gm-curiosities-heading').textContent=active.name;
    var closeBtn=modal.querySelector('.gm-curiosities-close');closeBtn.setAttribute('aria-label',copy.close);closeBtn.title=copy.close;
    var pageCount=Math.max(1,Math.ceil(items.length/PAGE_SIZE));
    active.page=Math.max(0,Math.min(active.page,pageCount-1));
    var start=active.page*PAGE_SIZE,end=Math.min(start+PAGE_SIZE,items.length);
    var list=modal.querySelector('.gm-curiosities-list');list.innerHTML='';
    items.slice(start,end).forEach(function(raw,index){
      var item=splitItem(raw),article=document.createElement('article');article.className='gm-curiosity-card';
      var num=document.createElement('span');num.className='gm-curiosity-number';num.textContent=String(start+index+1);article.appendChild(num);
      var body=document.createElement('div');body.className='gm-curiosity-copy';
      if(item.title){var h=document.createElement('h3');h.textContent=item.title;body.appendChild(h);}
      var p=document.createElement('p');p.textContent=item.text;body.appendChild(p);article.appendChild(body);list.appendChild(article);
    });
    var pager=modal.querySelector('.gm-curiosities-pagination');
    var prev=modal.querySelector('.gm-curiosities-prev'),next=modal.querySelector('.gm-curiosities-next');
    var indicator=modal.querySelector('.gm-curiosities-page-indicator');
    pager.hidden=pageCount<=1;
    pager.setAttribute('aria-label',copy.title);
    prev.disabled=active.page<=0;next.disabled=active.page>=pageCount-1;
    prev.setAttribute('aria-label',copy.prev);prev.title=copy.prev;
    next.setAttribute('aria-label',copy.next);next.title=copy.next;
    indicator.textContent=String(active.page+1)+' / '+String(pageCount);
  }
  function open(type,name){
    var d=dataFor(type,name);if(!d)return false;
    if(!isPremium()){
      var copy=tx();
      if(window.GenovaAccessNotice&&window.GenovaAccessNotice.show){
        window.GenovaAccessNotice.show({mode:'limit',title:copy.premiumTitle,message:copy.premiumMessage});
      }else{window.alert(copy.premiumMessage);}
      return false;
    }
    active={type:type,name:name,page:0};
    var modal=ensureModal();renderOpen();modal.hidden=false;document.documentElement.classList.add('gm-curiosities-open');
    window.setTimeout(function(){var b=modal.querySelector('.gm-curiosities-close');if(b)b.focus();},0);
    return true;
  }
  function buttonLabel(){return tx().button;}

  window.addEventListener('click',function(event){
    var b=event.target&&event.target.closest?event.target.closest('.gm-place-curiosities-btn'):null;
    if(!b)return;
    event.preventDefault();event.stopPropagation();
    open(b.getAttribute('data-place-type')||'',b.getAttribute('data-place-name')||'');
  },true);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){var m=document.getElementById('gm-curiosities-modal');if(m&&!m.hidden)close();}});
  document.addEventListener('app:set-lang',function(){var m=document.getElementById('gm-curiosities-modal');if(m&&!m.hidden)window.setTimeout(renderOpen,0);});
  try{new MutationObserver(function(){var m=document.getElementById('gm-curiosities-modal');if(m&&!m.hidden)window.setTimeout(renderOpen,0);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(_e3){}

  window.GenovaPlaceCuriosities={has:has,open:open,close:close,buttonLabel:buttonLabel,isPremium:isPremium,dataFor:dataFor};
})();
