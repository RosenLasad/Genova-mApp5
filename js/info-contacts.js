(function(){
  if(window.__info_btn_ready__) return;
  window.__info_btn_ready__ = true;

  function ensureInfoLegend(){
    var box = document.getElementById('info-legend');
    if(box) return box;

    box = document.createElement('div');
    box.id = 'info-legend';
    box.className = 'legend';
    box.setAttribute('role','region');
    box.setAttribute('aria-labelledby','info-title');

    box.innerHTML = ''
      + '<h3 id="info-title">Informazioni e contatti</h3>'
      + '<div id="info-body"></div>'
      + '<button type="button" class="help-close" aria-label="Chiudi info">Chiudi</button>';

    document.body.appendChild(box);
    return box;
  }

  function applyInfoTexts(box){
    var all = (window.__TEXTS && window.__TEXTS['info']) || null;

    var lang = 'it';
    try{
      var flagEl = (document.querySelector && document.querySelector('.flag.selected'))
        ? document.querySelector('.flag.selected')
        : null;

      var rawFlag = flagEl ? (flagEl.getAttribute('data-lang') || '') : '';

      var langRaw = (typeof currentLang === 'function'
              ? currentLang()
              : ((typeof localStorage!=='undefined' && localStorage.getItem('lang'))
                 || document.documentElement.getAttribute('lang')
                 || rawFlag
                 || 'it'));

      if(!langRaw) langRaw = rawFlag || 'it';

      lang = (typeof normalizeLang === 'function'
                ? normalizeLang(langRaw)
                : (langRaw || 'it')).toLowerCase();
    }catch(_){
      lang = 'it';
    }

    var entry = all && (all[lang] || all['it'] || all['en']) || null;

    var titleEl = box.querySelector('#info-title');
    var bodyEl  = box.querySelector('#info-body');
    if(!bodyEl) return;

    if(!entry){
      if(titleEl) titleEl.textContent = 'Informazioni e contatti';
      bodyEl.innerHTML = '<p>Dati informativi non disponibili.</p>';
      return;
    }

    if(titleEl){
      titleEl.textContent = entry.title || 'Informazioni e contatti';
    }

    bodyEl.innerHTML = '';
    if(Array.isArray(entry.paragraphs)){
      entry.paragraphs.forEach(function(txt){
        if(!txt) return;
        var p = document.createElement('p');
        p.textContent = txt;
        bodyEl.appendChild(p);
      });
    } else if(entry.body){
      var p = document.createElement('p');
      p.textContent = entry.body;
      bodyEl.appendChild(p);
    }
  }

  function wire(){
    var bar  = document.getElementById('bottom-bar');
    var help = document.getElementById('help-fab');
    if(!bar || !help){
      setTimeout(wire, 150);
      return;
    }

    var btn = document.getElementById('btn-info');
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'btn-info';
      btn.className = 'fab-btn';
      btn.title = 'Info e contatti';
      btn.setAttribute('aria-label','Info e contatti');

      btn.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
      + '  <circle cx="12" cy="12" r="9"></circle>'
      + '  <line x1="12" y1="11" x2="12" y2="16"></line>'
      + '  <circle class="info-dot" cx="12" cy="8" r="1.2"></circle>'
      + '</svg>';

      bar.insertBefore(btn, help);
    }

    var box      = ensureInfoLegend();
    var closeBtn = box.querySelector('.help-close');

    function isOpen(){
      return box.classList.contains('open');
    }

    function openBox(){
      box.classList.add('open');
      box.style.visibility = 'hidden';
      box.style.pointerEvents = 'none';

      var btnRect = btn.getBoundingClientRect();
      var boxRect = box.getBoundingClientRect();
      var center  = btnRect.left + (btnRect.width / 2);
      var left    = center - (boxRect.width / 2);

      var margin  = 8;
      var maxLeft = window.innerWidth - boxRect.width - margin;

      if(left < margin) left = margin;
      if(left > maxLeft) left = maxLeft;

      box.style.left = left + 'px';

      box.style.visibility = '';
      box.style.pointerEvents = '';

      btn.setAttribute('aria-expanded','true');

      if(typeof __loadTexts === 'function' && window.__INFO_TEXTS_URL){
        __loadTexts('info', window.__INFO_TEXTS_URL)
          .then(function(){ applyInfoTexts(box); })
          .catch(function(){ applyInfoTexts(box); });
      } else {
        applyInfoTexts(box);
      }
    }

    function closeBox(){
      box.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }

    function toggleBox(){
      if(isOpen()) closeBox(); else openBox();
    }

    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      toggleBox();
    }, true);

    if(closeBtn){
      closeBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        closeBox();
      }, true);
    }

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeBox();
    });

    document.addEventListener('click', function(e){
      if(!isOpen()) return;
      var inside = box.contains(e.target) || btn.contains(e.target);
      if(!inside) closeBox();
    });

    document.addEventListener('app:set-lang', function(){
      if(!isOpen()) return;
      if(typeof __loadTexts === 'function' && window.__INFO_TEXTS_URL){
        __loadTexts('info', window.__INFO_TEXTS_URL)
          .then(function(){ applyInfoTexts(box); })
          .catch(function(){ applyInfoTexts(box); });
      } else {
        applyInfoTexts(box);
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', wire);
  }else{
    wire();
  }
})();
