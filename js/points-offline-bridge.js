(function(){
  if (!window.fetch) return;

  var originalFetch = window.fetch.bind(window);

  function normalizeUrl(input){
    var url = '';
    if (typeof input === 'string') url = input;
    else if (input && typeof input.url === 'string') url = input.url;
    url = (url || '').split('?')[0];
    return url.replace(/^\.\//, '');
  }

  function jsonResponse(data){
    return Promise.resolve(
      new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );
  }

  window.fetch = function(input, init){
    var url = normalizeUrl(input);

    if (url === 'chiese/chiese_points.json' && Array.isArray(window.CHIESE_POINTS)) {
      return jsonResponse(window.CHIESE_POINTS);
    }

    if (url === 'palazzi/palazzi_points.json' && Array.isArray(window.PALAZZI_POINTS)) {
      return jsonResponse(window.PALAZZI_POINTS);
    }

    if (url === 'sport/sport_points.json' && Array.isArray(window.SPORT_POINTS)) {
      return jsonResponse(window.SPORT_POINTS);
    }

    if (url === 'cinema/cinema_points.json' && Array.isArray(window.CINEMA_POINTS)) {
      return jsonResponse(window.CINEMA_POINTS);
    }

    if (url === 'teatri/teatri_points.json' && Array.isArray(window.TEATRI_POINTS)) {
      return jsonResponse(window.TEATRI_POINTS);
    }

    if (url === 'mostre/mostre_points.json' && Array.isArray(window.MOSTRE_POINTS)) {
      return jsonResponse(window.MOSTRE_POINTS);
    }

    return originalFetch(input, init);
  };
})();