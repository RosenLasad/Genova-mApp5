
(function(){
  // Normalizza codice lingua (es. 'it-IT' -> 'it')
  function normalizeLangTag(tag){
    if(!tag) return 'it';
    var t = tag.toLowerCase().trim();
    var primary = t.split('-')[0];
    if(/^[a-z]{2,3}$/.test(primary)) return primary;
    return primary.slice(0,2);
  }

  // Stato lingua corrente per i Percorsi
  window.CURRENT_LANG = normalizeLangTag(
    (localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'it')
  );

  
  // Aggiorna testo categorie e nomi percorsi nel menu Percorsi
  function refreshMenuLabels(){
    // categorie
    document.querySelectorAll('[data-i18n-cat]').forEach(function(el){
      var key = el.getAttribute('data-i18n-cat');
      if (window.I18N_CATS[key] && window.I18N_CATS[key][window.CURRENT_LANG]) {
        el.textContent = window.I18N_CATS[key][window.CURRENT_LANG];
      }
    });

    // percorsi
    document.querySelectorAll('[data-i18n-route]').forEach(function(el){
      var rid = el.getAttribute('data-i18n-route');
      if (window.I18N_ROUTES[rid] && window.I18N_ROUTES[rid][window.CURRENT_LANG]) {
        el.textContent = window.I18N_ROUTES[rid][window.CURRENT_LANG];
      }
    });
  }
  window.refreshMenuLabels = refreshMenuLabels;

  // Sovrascrivi getRouteDisplayName per usare le traduzioni
  window.getRouteDisplayName = function(routeId){
    if (window.I18N_ROUTES &&
        window.I18N_ROUTES[routeId] &&
        window.I18N_ROUTES[routeId][window.CURRENT_LANG]) {
      return window.I18N_ROUTES[routeId][window.CURRENT_LANG];
    }
    var labelEl = document.querySelector('.doc-row[data-route-id="'+routeId+'"] .label');
    if(!labelEl) return "Percorso";
    return labelEl.textContent.trim();
  };

  // Costruisce HTML popup (Inizio/Fine) con testo localizzato
  // routeColor serve per colorare la striscia in alto
  window.buildPopupHTML = function(routeId, mode /* 'start'|'end' */, routeColor){
    var routeName = window.getRouteDisplayName(routeId);

    var dataForMode = window.I18N_POPUP[routeId]
      && window.I18N_POPUP[routeId][mode]
      && window.I18N_POPUP[routeId][mode][window.CURRENT_LANG];

    var sectionLabel = dataForMode ? dataForMode.section
                      : (mode === 'start' ? "Inizio percorso" : "Fine percorso");

    var durationText = dataForMode ? dataForMode.duration
                      : "Durata: --";

    var descText     = dataForMode ? dataForMode.desc
                      : "(descrizione mancante)";

    var barColor = routeColor || "#e53935";
    var hasFavs = window.ROUTE_FAVS && window.ROUTE_FAVS[routeId] && window.ROUTE_FAVS[routeId].length;
    var isOn = window.__routeFavShown && window.__routeFavShown[routeId];
    var favBtn = hasFavs
      ? `<button class="route-fav-btn ${isOn ? 'on' : ''}" data-route-id="${routeId}" aria-pressed="${isOn ? 'true' : 'false'}" title="Preferiti del percorso">★</button>`
      : '';

    return `
      <div class="route-popup-wrapper">
        <div class="route-popup-colorbar" style="background:${barColor}"></div>
        <div class="route-popup">
<div class="route-title">
  <span>${routeName}</span>
  ${favBtn}
</div>
          <div class="route-section-label">${sectionLabel}</div>
          <div class="route-duration">${durationText}</div>
          <div class="route-desc">${descText}</div>
        </div>
      </div>
    `;
  };

  // Sovrascrivi drawRouteFeature per usare popup e tooltip multilingua + stile grafico definitivo
  window.drawRouteFeature = function(routeData, colorOverride){
    if(!window.L) return [];
    var rl = (typeof ensureRouteLayer === 'function') ? ensureRouteLayer() : null;
    if(!rl) return [];
    var color = colorOverride || routeData.color || "#e53935";

    var poly = L.polyline(routeData.polyline, {
      color: color,
      weight: 4,
      opacity: 0.9
    }).addTo(rl);

    // tooltip localizzati
    var startTooltipTxt = (window.I18N_UI.startTooltip[window.CURRENT_LANG] || "Inizio");
    var endTooltipTxt   = (window.I18N_UI.endTooltip[window.CURRENT_LANG]   || "Fine");

    // marker inizio
    var startMarker = L.circleMarker(
      [routeData.start.lat, routeData.start.lng],
      {
        radius:6,
        weight:2,
        color:color,
        fillColor:"#fff",
        fillOpacity:1
      }
    )
    .bindTooltip(startTooltipTxt, {direction:"top"})
    .bindPopup(window.buildPopupHTML(routeData.id,"start", color), {maxWidth:260, className:"route-pop"})
    .addTo(rl);

    // marker fine
    var endMarker = L.circleMarker(
      [routeData.end.lat, routeData.end.lng],
      {
        radius:6,
        weight:2,
        color:color,
        fillColor:"#fff",
        fillOpacity:1
      }
    )
    .bindTooltip(endTooltipTxt, {direction:"top"})
    .bindPopup(window.buildPopupHTML(routeData.id,"end", color), {maxWidth:260, className:"route-pop"})
    .addTo(rl);

    return [ poly, startMarker, endMarker ];
  };

  // Applica attributi data-i18n-* al menu Percorsi in base all'HTML esistente
  (function initRouteMenuI18N(){
    var menu = document.getElementById('routes-menu');
    if(!menu) return;
    // categorie
    menu.querySelectorAll('.acc-section').forEach(function(sec){
      var cat = sec.getAttribute('data-cat');
      var chip = sec.querySelector('.acc-title .chip');
      if(chip && cat){
        chip.setAttribute('data-i18n-cat', cat);
      }
    });
    // singoli percorsi
    menu.querySelectorAll('.doc-row').forEach(function(row){
      var rid = row.getAttribute('data-route-id');
      var labelEl = row.querySelector('.label');
      if(labelEl && rid){
        labelEl.setAttribute('data-i18n-route', rid);
      }
    });
  })();

  // Primo refresh traduzioni all'avvio
  refreshMenuLabels();

  // Aggiorna lingua, popup e tooltip quando cambia la lingua globale
  document.addEventListener('app:set-lang', function(ev){
    try{
      var lang = (ev && ev.detail && ev.detail.lang) ||
                 document.documentElement.getAttribute('lang') || 'it';
      window.CURRENT_LANG = normalizeLangTag(lang);

      // 1. Aggiorna le label nel menu percorsi
      refreshMenuLabels();

      // 2. Aggiorna popup e tooltip dei percorsi già attivi
      Object.keys(window.routeLayersById || {}).forEach(function(routeId){
        var layers = window.routeLayersById[routeId];
        if(!layers) return;
        var startMarker = layers[1];
        var endMarker   = layers[2];

        // colore dal marker di start (fallback rosso standard)
        var c = (startMarker && startMarker.options && startMarker.options.color) ?
                startMarker.options.color : "#e53935";

        // popup refresh
        if(startMarker && startMarker.setPopupContent){
          startMarker.setPopupContent(window.buildPopupHTML(routeId,"start", c));
        }
        if(endMarker && endMarker.setPopupContent){
          endMarker.setPopupContent(window.buildPopupHTML(routeId,"end", c));
        }

        // tooltip refresh
        var startTooltipTxt = (window.I18N_UI.startTooltip[window.CURRENT_LANG] || "Inizio");
        var endTooltipTxt   = (window.I18N_UI.endTooltip[window.CURRENT_LANG]   || "Fine");

        if(startMarker && startMarker.unbindTooltip && startMarker.bindTooltip){
          startMarker.unbindTooltip();
          startMarker.bindTooltip(startTooltipTxt, {direction:"top"});
        }
        if(endMarker && endMarker.unbindTooltip && endMarker.bindTooltip){
          endMarker.unbindTooltip();
          endMarker.bindTooltip(endTooltipTxt, {direction:"top"});
        }
      });
    }catch(e){ /* no-op */ }
  });

})();
