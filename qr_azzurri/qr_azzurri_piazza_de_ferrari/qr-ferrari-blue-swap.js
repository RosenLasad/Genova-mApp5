(function () {
  window.__FERRARI_DATA = {
    parent: { id: "piazza_de_ferrari", label: "Piazza de Ferrari", lat: 44.407406861533175, lng: 8.93377961521803 },
    children: [
      {
        id: "piazza_matteotti",
        label: "Piazza Matteotti",
        lat: 44.40697661301905,
        lng: 8.932735558901697,
        descr: "Piazza Matteotti si chiamava prima Piazza Umberto I, e ancora prima Piazza Nuova.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_piazza_matteotti/piazza_matteotti_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_piazza_matteotti/piazza_matteotti_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_piazza_matteotti/piazza_matteotti_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_piazza_matteotti/piazza_matteotti_ieri_3.mp4"
          ],
          sfx: []
        }
      },
      {
        id: "teatro_carlo_felice",
        label: "Teatro Carlo Felice",
        lat: 44.40788038005325,
        lng: 8.933937994594435,
        descr: "Teatro Carlo Felice",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_teatro_carlo_felice/teatro_carlo_felice_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_teatro_carlo_felice/teatro_carlo_felice_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_teatro_carlo_felice/teatro_carlo_felice_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_teatro_carlo_felice/teatro_carlo_felice_ieri_3.mp4"
          ],
          sfx: [
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_teatro_carlo_felice/teatro_carlo_felice_sfx_1.mp4"
          ]
        }
      },
      {
        id: "palazzo_della_regione",
        label: "Palazzo della Regione",
        lat: 44.407104258788635,
        lng: 8.934398277618188,
        descr: "Il Palazzo della Regione nasce come Palazzo della NGI nel 1924..",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_palazzo_della_regione/scorci_azzurri_piazza_de_ferrari_palazzo_della_regione_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_palazzo_della_regione/scorci_azzurri_piazza_de_ferrari_palazzo_della_regione_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_palazzo_della_regione/scorci_azzurri_piazza_de_ferrari_palazzo_della_regione_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_piazza_de_ferrari/qr_azzurri_piazza_de_ferrari_palazzo_della_regione/scorci_azzurri_piazza_de_ferrari_palazzo_della_regione_ieri_3.mp4"
          ],
          sfx: []
        }
      }
    ]
  };

  function ensureFerrariStyles() {
    if (document.getElementById("qr-ferrari-styles")) return;
    var s = document.createElement("style");
    s.id = "qr-ferrari-styles";
    s.textContent =
      ".qr-ferrari-blue .tri{width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:14px solid #1e3a8a;filter:drop-shadow(0 0 1px rgba(0,0,0,0.45));}" +
      ".qr-ferrari-azzurro .tri{width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-top:16px solid #38bdf8;filter:drop-shadow(0 0 1px rgba(0,0,0,0.45));}";
    document.head.appendChild(s);
  }

  function ensurePanelFn() {
    if (window.__qrOpenChildPanel) return;
    window.__qrOpenChildPanel = function (title, descr, media) {
      try { document.getElementById("panel").classList.add("open"); } catch (e) {}
      var panel = document.getElementById("panel");
      if (panel) {
        var header = panel.querySelector("header");
        if (!header) { header = document.createElement("header"); panel.insertBefore(header, panel.firstChild); }
        var h2 = header.querySelector("h2");
        if (!h2) { h2 = document.createElement("h2"); header.appendChild(h2); }
        h2.textContent = title || "";
      }
      var descEl = document.getElementById("place-desc");
      if (descEl) descEl.textContent = descr || "";

      var imgToday = document.getElementById("media-today");
      var imgPast = document.getElementById("media-past");
      var vidToday = document.getElementById("media-video-today");
      var vidPast = document.getElementById("media-video");
      var btnToday = document.getElementById("btn-today");
      var btnPast = document.getElementById("btn-past");
      var prev = document.getElementById("prev");
      var next = document.getElementById("next");
      var counter = document.getElementById("counter");

      function hideAll() {
        if (imgToday) imgToday.style.display = "none";
        if (imgPast) imgPast.style.display = "none";
        if (vidToday) { vidToday.pause && vidToday.pause(); vidToday.style.display = "none"; }
        if (vidPast) { vidPast.pause && vidPast.pause(); vidPast.style.display = "none"; }
      }
      function setButtons(isToday) {
        if (btnToday) btnToday.classList.toggle("active", !!isToday);
        if (btnPast) btnPast.classList.toggle("active", !isToday);
      }
      function setCounter(i, n) { if (counter) counter.textContent = i + "/" + n; }

      media = media || { oggi: null, ieri: [] };
      var idx = 0;
      var list = Array.isArray(media.ieri) ? media.ieri : (media.ieri ? [media.ieri] : []);

      function showToday() {
        hideAll();
        if (vidToday) {
          vidToday.src = media.oggi || "";
          vidToday.style.display = media.oggi ? "block" : "none";
          try { vidToday.load(); } catch (e) {}
        }
        setButtons(true);
        setCounter(1, 1);
      }

      function showPast(i) {
        hideAll();
        idx = Math.max(0, Math.min((list.length || 1) - 1, (i || 0)));
        var src = list[idx] || "";
        if (vidPast) {
          vidPast.src = src;
          vidPast.style.display = src ? "block" : "none";
          try { vidPast.load(); } catch (e) {}
        }
        setButtons(false);
        setCounter(idx + 1, Math.max(1, list.length || 1));
      }

      if (btnToday) btnToday.onclick = function () { showToday(); };
      if (btnPast) btnPast.onclick = function () { showPast(0); };
      if (prev) prev.onclick = function () { if (list.length) showPast(idx - 1); };
      if (next) next.onclick = function () { if (list.length) showPast(idx + 1); };

      if (media.oggi) showToday(); else showPast(0);
    };
  }


  (function publishFerrariSource(){
    try{
      var data = window.__FERRARI_DATA || {};
      if (!data.parent || !data.children) return;
      if (window.__qrAddSource) {
        window.__qrAddSource(data.parent, data.children);
      } else {
        window.__QR_SOURCES = window.__QR_SOURCES || [];
        var exists = window.__QR_SOURCES.some(function(s){ return s && s.parent && s.parent.id === data.parent.id; });
        if(!exists) window.__QR_SOURCES.push({ parent: data.parent, children: data.children });
      }
    }catch(_){ }
    try{ window.__qrBuildAll && window.__qrBuildAll(); }catch(_){ }
  })();

  whenMapReady(function () {
    ensureFerrariStyles();
    ensurePanelFn();

    var data = window.__FERRARI_DATA || {};
    var parent = data.parent || {};
    var kids = data.children || [];

    if (!map.getPane("pane-ferrari-blue")) {
      map.createPane("pane-ferrari-blue");
      map.getPane("pane-ferrari-blue").style.zIndex = 712;
    }
    if (!map.getPane("pane-ferrari-azzurri")) {
      map.createPane("pane-ferrari-azzurri");
      map.getPane("pane-ferrari-azzurri").style.zIndex = 713;
    }

    // Fallback: se blueIcon non esiste, lo creiamo.
    var blueIconLocal = window.blueIcon;
    if (!blueIconLocal) {
      blueIconLocal = L.divIcon({
        className: "qr-blue-parent",
        iconSize: [16, 14],
        iconAnchor: [8, 14],
        html: '<div class="qr-triangle"></div>'
      });
      window.blueIcon = blueIconLocal;
    }

    var blue = L.marker([parent.lat, parent.lng], {
      pane: "pane-ferrari-blue",
      icon: blueIconLocal,
      title: parent.label
    });

    try { blue.off("click"); } catch (e) {}
    blue.bindTooltip(parent.label || "Piazza de Ferrari", { permanent: false, direction: "right", offset: [8, 0], className: "qr-tooltip" });

    var azzIcon = L.icon({ iconUrl: "qr_azzurri/marker-azzurro-qr-notch-24.svg", iconSize: [24, 26], iconAnchor: [12, 26], className: "qr-azzurro-icon" });

    var group = L.layerGroup();
    kids.forEach(function (c) {
      if (Math.abs((c.lat || 0) - (parent.lat || 0)) < 1e-7 && Math.abs((c.lng || 0) - (parent.lng || 0)) < 1e-7) {
        var offs = [[0, 0.00035], [0.0003, 0], [-0.00028, -0.00022], [0.00022, -0.00025]];
        var i = (kids.indexOf(c) >= 0 ? kids.indexOf(c) : 0);
        c = Object.assign({}, c, { lat: c.lat + offs[i % offs.length][0], lng: c.lng + offs[i % offs.length][1] });
      }

      var m = L.marker([c.lat, c.lng], { pane: "pane-ferrari-azzurri", icon: azzIcon, title: c.label });
      m.bindTooltip(c.label, { permanent: false, direction: "right", offset: [8, 0], className: "qr-tooltip" });
      m.on("click", function () { window.__qrOpenChildPanel && window.__qrOpenChildPanel(c.label, c.descr, c.media); });
      group.addLayer(m);
    });

    var chk = document.getElementById("chk-qr-piazza-de-ferrari");

    function showBlue() { try { group.removeFrom(map); } catch (e) {} try { blue.addTo(map); } catch (e) {} }
    function showKids() { try { blue.removeFrom(map); } catch (e) {} try { group.addTo(map); } catch (e) {} }
    function hideAll()  { try { blue.removeFrom(map); } catch (e) {} try { group.removeFrom(map); } catch (e) {} }

    function update() {
      var on = !!(chk && chk.checked);
      if (!on) { hideAll(); return; }
      showKids();
    }

    if (chk && !chk.__wiredFerrariSwap) {
      chk.addEventListener("change", update);
      chk.__wiredFerrariSwap = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
