
(function () {
  try {
    var stored = localStorage.getItem('lang');
    var lang = stored || 'it';

    // aggiorno l'HTML
    document.documentElement.setAttribute('lang', lang);

    // se non c'era niente, salvo 'it' una volta sola
    if (!stored) {
      localStorage.setItem('lang', lang);
    }
  } catch (e) {
    document.documentElement.setAttribute('lang', 'it');
  }
})();
