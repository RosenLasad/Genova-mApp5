
(function(){
  const list = window.GM_SPONSORS || [];
  const track = document.getElementById("sponsor-track");
  if(!track || list.length === 0) return;

  function makeItem(s){
    const a = document.createElement("a");
    a.className = "sp";
    a.href = s.url || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.title = s.name || "";

    if (s.bg) a.style.background = s.bg;
    if (s.fg) a.style.color = s.fg;

    const ico = document.createElement("span");
    ico.className = "ico";
    ico.textContent = s.ico || "★";

    a.appendChild(ico);
    a.appendChild(document.createTextNode(" " + (s.name || "")));
    return a;
  }

  function appendSequence(){
    list.forEach(function(s){
      track.appendChild(makeItem(s));

      const sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = " | ";
      track.appendChild(sep);
    });
  }

  appendSequence();
  appendSequence();
})();
