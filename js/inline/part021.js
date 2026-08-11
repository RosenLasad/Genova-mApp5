
(function(){
  // Etichette per i bottoni del pannello QR
  var LABELS = {
    it: {
      today:      'Oggi',
      past:       'Ieri',
      sfx:        'SFX',
      titleToday: 'Mostra oggi',
      titlePast:  'Mostra ieri',
      titleSfx:   'Effetti / Simulazioni'
    },
    en: {
      today:      'Today',
      past:       'Yesterday',
      sfx:        'SFX',
      titleToday: 'Show today',
      titlePast:  'Show yesterday',
      titleSfx:   'Effects / Simulations'
    },
    es: {
      today:      'Hoy',
      past:       'Ayer',
      sfx:        'SFX',
      titleToday: 'Mostrar hoy',
      titlePast:  'Mostrar ayer',
      titleSfx:   'Efectos / Simulaciones'
    },
    fr: {
      today:      'Aujourd’hui',
      past:       'Hier',
      sfx:        'SFX',
      titleToday: 'Afficher aujourd’hui',
      titlePast:  'Afficher hier',
      titleSfx:   'Effets / Simulations'
    },
    ar: {
      today:      'اليوم',
      past:       'أمس',
      sfx:        'SFX',
      titleToday: 'عرض اليوم',
      titlePast:  'عرض أمس',
      titleSfx:   'المؤثرات / المحاكاة'
    },
    ru: {
      today:      'Сегодня',
      past:       'Вчера',
      sfx:        'SFX',
      titleToday: 'Показать сегодня',
      titlePast:  'Показать вчера',
      titleSfx:   'Эффекты / симуляции'
    },
    zh: {
      today:      '今天',
      past:       '昨天',
      sfx:        'SFX',
      titleToday: '顯示今天',
      titlePast:  '顯示昨天',
      titleSfx:   '特效 / 模擬'
    },
    lij: {
      today:      'Ancöe',
      past:       'Véi',
      sfx:        'SFX',
      titleToday: 'Mostra ancöe',
      titlePast:  'Mostra Véi',
      titleSfx:   'Effetti / Simulaçioìn'
    }
  };

  function curLang(){
    var raw;
    try{
      raw = localStorage.getItem('lang')
         || document.documentElement.getAttribute('lang')
         || 'it';
    }catch(_){
      raw = document.documentElement.getAttribute('lang') || 'it';
    }
    raw = (raw || 'it').toLowerCase();
    if(raw.indexOf('lij')===0) return 'lij';
    if(raw.indexOf('zh') ===0) return 'zh';
    if(raw.indexOf('en') ===0) return 'en';
    if(raw.indexOf('es') ===0) return 'es';
    if(raw.indexOf('fr') ===0) return 'fr';
    if(raw.indexOf('ar') ===0) return 'ar';
    if(raw.indexOf('ru') ===0) return 'ru';
    return 'it';
  }

  function apply(lang){
    var code = lang || curLang();
    var L = LABELS[code] || LABELS.it;

    var btnToday = document.getElementById('btn-today');
    var btnPast  = document.getElementById('btn-past');
    var btnSfx   = document.getElementById('btn-sfx');

    if(btnToday){
      btnToday.textContent = L.today;
      btnToday.setAttribute('title', L.titleToday);
      btnToday.setAttribute('aria-label', L.titleToday);
    }

    if(btnPast){
      // Se il JS dei premium l’ha rinominato in "MiniDoc", non lo tocchiamo
      var txt = (btnPast.textContent || '').trim();
      var isMiniDoc = /minidoc/i.test(txt);
      if(!isMiniDoc){
        btnPast.textContent = L.past;
      }
      var title = isMiniDoc ? txt : L.titlePast;
      btnPast.setAttribute('title', title);
      btnPast.setAttribute('aria-label', title);
    }

    if(btnSfx){
      btnSfx.textContent = L.sfx;
      btnSfx.setAttribute('title', L.titleSfx);
      btnSfx.setAttribute('aria-label', L.titleSfx);
    }
  }

  // Prima applicazione
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ apply(); });
  } else {
    apply();
  }

  // Ogni volta che cambi bandiera / lingua
  document.addEventListener('app:set-lang', function(ev){
    var d = ev && ev.detail;
    apply(d && d.lang);
  });
})();
