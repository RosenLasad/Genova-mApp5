
(function(){
  function lang(){ try{return (localStorage.getItem('lang')||document.documentElement.lang||'it').toLowerCase()}catch(_){return 'it'} }
  var PH={it:"Cerca…",en:"Search…",es:"Buscar…",fr:"Rechercher…",ar:"بحث…",ru:"Поиск…",zh:"搜索…",lij:"Çerca…"};
  function norm(s){
    s=(s||"").toString().toLowerCase();
    try{s=s.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}catch(_){}
    return s;
  }

  var wrap,input,dd,clearBtn,active=-1,shown=[];
  function gatherQR(){
    var out=[], srcs=window.__QR_SOURCES||[];
    for(var i=0;i<srcs.length;i++){
      var p=srcs[i]||{}, pid=p.id||"", pl=p.label||pid, ch=p.children||[];
      for(var j=0;j<ch.length;j++){
        var c=ch[j]||{}, cid=c.id||"", id=pid+"/"+cid;
        var lat=parseFloat(c.lat), lng=parseFloat(c.lng);
        if(!isFinite(lat)||!isFinite(lng)) continue;
        out.push({k:"qr",cat:"QR",id:id,title:(c.label||cid),sub:("QR · "+pl),lat:lat,lng:lng,descr:c.descr||"",media:c.media||[]});
      }
    }
    return out;
  }

  function gatherFav(){
    // mappa UL -> label categoria
    var mapList = {
      "fav-list-forti": "Forte",
      "fav-list-musei": "Museo",
      "fav-list-bus": "Autobus",
      "fav-list-train": "Stazione",
      "fav-list-metro": "Metro",
      "fav-list-funi": "Impianto",
      "fav-list-parchi-piazze": "__PP__",
      "fav-list-locali": "Locale",
      "fav-list-mare": "Mare",
      "fav-list-aereo": "Aeroporto",
      "fav-list-chiese": "Chiesa",
      "fav-list-palazzi": "Palazzo",
      "fav-list-sport": "Sport",
      "fav-list-cinema": "Cinema",
      "fav-list-teatri": "Teatro",
      "fav-list-mostre": "Mostra"
    };

    var out = [];
    Object.keys(mapList).forEach(function(listId){
      var ul = document.getElementById(listId);
      if(!ul) return;

      Array.from(ul.querySelectorAll(".fav-item")).forEach(function(li){
        var nameEl = li.querySelector(".fav-name") || li;
        var title = (nameEl.textContent || "").trim();
        if(!title) return;

        var label = mapList[listId];
        if(label === "__PP__"){
          label = (li.getAttribute("data-src") === "piazza") ? "Piazza" : "Parco";
        }

        // IMPORTANTISSIMO: teniamo un riferimento all’elemento cliccabile
        out.push({
          k: "fav",
          cat: label,
          title: title,
          sub: "Vai, vedi, fai · " + label,
          el: nameEl
        });
      });
    });

    return out;
  }

  function gatherAll(){
    // QR + Vai/vedi/fai
    return gatherQR().concat(gatherFav());
  }


  function closeDD(){ dd.hidden=true; dd.innerHTML=""; active=-1; shown=[]; }
  function setActive(i){
    active=i;
    var btns=dd.querySelectorAll(".tb-search-item");
    for(var k=0;k<btns.length;k++) btns[k].classList.toggle("active", k===i);
  }

    function openItem(it){
    if(it && it.k === "fav"){
      try{ it.el && it.el.click(); }catch(_){}
      return;
    }

    // (QR) resto identico a prima
    try{ window.__ensureQrOn && window.__ensureQrOn(); }catch(_){}
    try{
      var m=window.map||window.__map;
      if(m && m.setView){
        var z = (m.getZoom?m.getZoom():16);
        m.setView([it.lat,it.lng], Math.max(z,17), {animate:true});
      }
    }catch(_){}
    try{ window.__qrOpenChildPanel && window.__qrOpenChildPanel(it.title, it.descr, it.media, it.id); }catch(_){}
    try{ location.hash="qr="+encodeURIComponent(it.id); }catch(_){}
  }


  function render(q){
    q=norm(q);
    if(!q){ closeDD(); return; }

var all = gatherAll();
    var res=[];
    for(var i=0;i<all.length;i++){
      var it=all[i];
      if(norm(it.title).indexOf(q)!==-1 || norm(it.sub).indexOf(q)!==-1) res.push(it);
      if(res.length>=8) break;
    }
    if(!res.length){ closeDD(); return; }

    var html="";
    for(var j=0;j<res.length;j++){
      var r=res[j];
      html+='<button type="button" class="tb-search-item" data-i="'+j+'" data-cat="'+escapeHtml(r.cat||"")+'">'
    +  '<span class="tb-search-title">'+escapeHtml(r.title)+'</span>'
    +  '<span class="tb-search-sub">'+escapeHtml(r.sub)+'</span>'
    +'</button>';

    }
    dd.innerHTML=html;
    dd.hidden=false;
    shown=res;
    setActive(-1);
  }

  function escapeHtml(s){
    return (s||"").toString().replace(/[&<>"']/g,function(ch){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);
    });
  }

  function onInput(){
    var v=input.value||"";
    wrap.classList.toggle("hasText", !!v.trim());
    render(v.trim());
  }

  function onKey(e){
    if(dd.hidden) return;
    var max=shown.length-1;
    if(e.key==="ArrowDown"){ e.preventDefault(); setActive(Math.min(max, active+1)); }
    else if(e.key==="ArrowUp"){ e.preventDefault(); setActive(Math.max(0, active-1)); }
    else if(e.key==="Enter"){
      if(active>=0 && shown[active]){ e.preventDefault(); openItem(shown[active]); closeDD(); input.blur(); }
    }else if(e.key==="Escape"){ closeDD(); input.blur(); }
  }

  function init(){
    wrap=document.getElementById("tb-search");
    input=document.getElementById("tb-search-input");
    dd=document.getElementById("tb-search-dd");
    clearBtn=document.getElementById("tb-search-clear");
    if(!wrap||!input||!dd||!clearBtn) return;

    input.addEventListener("input", onInput);
    input.addEventListener("keydown", onKey);

applyTbPlaceholder();

// quando cambi lingua senza refresh
window.addEventListener('i18n:changed', applyTbPlaceholder);

// opzionale: se in qualche punto usi anche eventi custom tipo app:set-lang
document.addEventListener('app:set-lang', applyTbPlaceholder);


    dd.addEventListener("click", function(e){
      var b=e.target.closest("button.tb-search-item");
      if(!b) return;
      var i=parseInt(b.getAttribute("data-i"),10);
      if(isFinite(i) && shown[i]){ openItem(shown[i]); closeDD(); input.blur(); }
    });

    clearBtn.addEventListener("click", function(){
      input.value=""; wrap.classList.remove("hasText"); closeDD(); input.focus();
    });

    document.addEventListener("click", function(e){
      if(!wrap.contains(e.target)) closeDD();
    }, true);
  }

function applyTbPlaceholder(){
  try{
    if (typeof window.t === 'function') {
      var ph = window.t('tb.search');
      if (ph && ph !== 'tb.search') {
        input.placeholder = ph;
        input.setAttribute('aria-label', ph);
        return;
      }
    }
    input.placeholder = (PH[lang()] || PH.it);
    input.setAttribute('aria-label', input.placeholder);
  } catch(_e){}
}


  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
