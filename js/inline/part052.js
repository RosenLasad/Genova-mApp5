
// --- PATCH v2: Storia accordion (Mura / Acquedotti chiusi, stile compatto) ---
(function(){
  function ready(cb){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', cb, {once:true}); else cb(); }
  function makeSection(title, count){
    var sec = document.createElement('div'); sec.className = 'acc-section'; sec.setAttribute('aria-expanded','false');
    var head = document.createElement('div'); head.className = 'acc-head'; head.setAttribute('role','button'); head.tabIndex = 0;
    var t = document.createElement('div'); t.className = 'acc-title'; t.textContent = title;
    var badge = document.createElement('span'); badge.className = 'acc-badge'; if(count!=null) badge.textContent = String(count);
    var chev = document.createElementNS('http://www.w3.org/2000/svg','svg'); chev.setAttribute('viewBox','0 0 24 24'); chev.setAttribute('width','14'); chev.setAttribute('height','14'); chev.classList.add('acc-chevron');
    var p = document.createElementNS('http://www.w3.org/2000/svg','path'); p.setAttribute('d','M8 5l8 7-8 7'); p.setAttribute('fill','none'); p.setAttribute('stroke','currentColor'); p.setAttribute('stroke-width','2'); p.setAttribute('stroke-linecap','round'); p.setAttribute('stroke-linejoin','round');
    chev.appendChild(p);
    var right = document.createElement('div'); right.style.display='flex'; right.style.alignItems='center'; right.style.gap='.4rem';
    if(badge.textContent) right.appendChild(badge);
    right.appendChild(chev);
    head.appendChild(t); head.appendChild(right);
    var body = document.createElement('div'); body.className = 'acc-body';
    sec.appendChild(head); sec.appendChild(body);
    function toggle(){ var open = sec.getAttribute('aria-expanded')==='true'; sec.setAttribute('aria-expanded', String(!open)); }
    head.addEventListener('click', toggle);
    head.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); }});
    return {sec, body, badge};
  }
  ready(function(){
    var menu = document.getElementById('opere-menu'); if(!menu) return;
    var walls = document.getElementById('opere-walls');
    var acq = document.getElementById('opere-acq');
    if(!walls || !acq) return;

    var wrap = document.createElement('div'); wrap.className = 'opere-accordion';
    // Build sections using current content
    var wSec = makeSection('Mura');
    var aSec = makeSection('Acquedotti');

    // Move existing children into the bodies
    while(walls.firstChild){ wSec.body.appendChild(walls.firstChild); }
    while(acq.firstChild){ aSec.body.appendChild(acq.firstChild); }

    // Replace placeholders with sections
    walls.replaceWith(wSec.sec);
    acq.replaceWith(aSec.sec);

    // Insert wrapper right after the title "Storia"
    var title = menu.firstElementChild; // the "Storia" title div
    if(title && title.nextSibling){
      menu.insertBefore(wrap, title.nextSibling);
    }else{
      menu.insertBefore(wrap, menu.firstChild);
    }
    wrap.appendChild(wSec.sec);
    wrap.appendChild(aSec.sec);

    // Count items in each (checkboxes)
    try{
      var wCount = wSec.body.querySelectorAll('input[type="checkbox"]').length;
      var aCount = aSec.body.querySelectorAll('input[type="checkbox"]').length;
      if(wCount) wSec.badge.textContent = wCount;
      if(aCount) aSec.badge.textContent = aCount;
    }catch(_){}

    // Start closed
    wSec.sec.setAttribute('aria-expanded','false');
    aSec.sec.setAttribute('aria-expanded','false');
  });
})();
