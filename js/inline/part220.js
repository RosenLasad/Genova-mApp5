
(function(){
  var EVENTS = (window.EVENTS || []);


  function esc(s){
    return String(s || "")
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }

  function render(){
    var body = document.getElementById("eventsPanelBody");
    if(!body) return;
    body.innerHTML = EVENTS.map(function(ev){
      return (
        '<div class="ev-card">' +
          '<div class="ev-title-row">' +
            '<div class="ev-title">' + esc(ev.title) + '</div>' +
            '<div class="ev-where"><span class="ev-label">Dove:</span> ' + esc(ev.where) + '</div>' +
          '</div>' +
          '<div class="ev-line"><span class="ev-label">Quando:</span> ' + esc(ev.when) + '</div>' +
          '<div class="ev-line">' + esc(ev.desc) + '</div>' +
          (ev.address ? '<div class="ev-line"><span class="ev-label">Indirizzo:</span> ' + esc(ev.address) + '</div>' : '') +
          (ev.linkHref ? '<div class="ev-line"><span class="ev-label">Sito:</span> <a class="ev-link" href="' + esc(ev.linkHref) + '" target="_blank" rel="noopener">' + esc(ev.linkText || ev.linkHref) + '</a></div>' : '') +
        '</div>'
      );
    }).join("");
  }

  function openPanel(){
    var p = document.getElementById("eventsPanel");
    if(p) p.classList.add("is-open");
  }
  function closePanel(){
    var p = document.getElementById("eventsPanel");
    if(p) p.classList.remove("is-open");
  }
  function togglePanel(){
    var p = document.getElementById("eventsPanel");
    if(!p) return;
    p.classList.toggle("is-open");
  }

  function init(){
    var btn = document.getElementById("eventsBtn");
    var panel = document.getElementById("eventsPanel");
    var close = document.getElementById("eventsPanelClose");
    if(!btn || !panel || !close) return;

    render();

    btn.addEventListener("click", function(e){
      e.preventDefault(); e.stopPropagation();
      togglePanel();
    });

    close.addEventListener("click", function(e){
      e.preventDefault(); e.stopPropagation();
      closePanel();
    });

    // click fuori dal pannello = chiudi
    document.addEventListener("click", function(e){
      if(!panel.classList.contains("is-open")) return;
      if(panel.contains(e.target) || btn.contains(e.target)) return;
      closePanel();
    }, true);

    // ESC = chiudi
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") closePanel();
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
