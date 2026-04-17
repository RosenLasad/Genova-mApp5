(function(){
  var modal = document.getElementById('guide-modal');
  var inner = modal ? modal.querySelector('.sub-modal-inner') : null;
  var title = document.getElementById('guide-modal-title');
  var closeBtn = document.getElementById('guide-modal-close');
  var frame = document.getElementById('guide-frame');

  if(!modal || !inner || !title || !closeBtn || !frame) return;

  // Per ora: solo IT esiste (evitiamo 404). Poi aggiungerai gli altri file.
  var GUIDE_FILES = {
    it: 'guida/it.html',
    en:  'guida/en.html',
    es: 'guida/es.html',
    fr: 'guida/fr.html',
    ar:'guida/ar.html',
    ru:'guida/ru.html',
    zh:'guida/zh.html',
    lij:'guida/lij.html'
  };

  var GUIDE_TITLES = {
    it:'Guida', lij:'Guida', en:'Guide', es:'Guía', fr:'Guide', ar:'الدليل', ru:'Руководство', zh:'指南'
  };

  function normLang(l){
    l = (l || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it').toLowerCase();
    return l.split('-')[0];
  }

  function openGuide(lang){
    lang = normLang(lang);

    // titolo
    title.textContent = GUIDE_TITLES[lang] || GUIDE_TITLES.it;

    // src (fallback a it se non hai ancora creato i file)
    var src = GUIDE_FILES[lang] || GUIDE_FILES.it;
    frame.setAttribute('src', src);

    modal.classList.remove('hidden');
  }

  function closeGuide(){
    modal.classList.add('hidden');
    // opzionale: svuota src per “fermarsi” quando chiudi
    // frame.setAttribute('src', 'about:blank');
  }

  // evento dal bottone nel bubble
  document.addEventListener('app:open-guide', function(e){
    openGuide(e && e.detail ? e.detail.lang : null);
  });

  // chiusura
  closeBtn.addEventListener('click', closeGuide);

  // click fuori dalla finestra
  modal.addEventListener('click', function(e){
    if(inner && !inner.contains(e.target)) closeGuide();
  });

  // ESC
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !modal.classList.contains('hidden')) closeGuide();
  }, true);
})();
