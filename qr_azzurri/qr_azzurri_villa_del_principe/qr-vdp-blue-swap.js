(function () {
  // FIX 1: parent.lng (mancava la chiave)
  window.__VDP_DATA = {
    parent: {
      id: "villa_del_principe",
      label: "Villa del Principe",
      lat: 44.41612047846311,
      lng: 8.919390925348477
    },
    children: [
      {
        id: "il_dinegro",
        label: "Il Dinegro",
        lat: 44.416205018347235,
        lng: 8.91864978808025,
        descr: "Il fiume Dinegro scorreva accanto alla Villa del Principe.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_villa_del_principe/qr_azzurri_villa_del_principe_il_dinegro/qrcode-villadoria2-oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_villa_del_principe/qr_azzurri_villa_del_principe_il_dinegro/qrcode-villadoria2-ieri1.mp4"]
        }
      },
      {
        id: "villa_del_principe_doria",
        label: "Villa del Principe Doria",
        lat: 44.41602047846311,
        lng: 8.919390925348477,
        descr: "La villa del Principe Andrea Doria.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_villa_del_principe/qr_azzurri_villa_del_principe_villa_del_principe/qrcode-villadoria1-oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_villa_del_principe/qr_azzurri_villa_del_principe_villa_del_principe/qrcode-villadoria1-ieri1.mp4",
            "qr_azzurri/qr_azzurri_villa_del_principe/qr_azzurri_villa_del_principe_villa_del_principe/qrcode-villadoria1-ieri2.mp4",
"qr_azzurri/qr_azzurri_villa_del_principe/qr_azzurri_villa_del_principe_villa_del_principe/qrcode-villadoria1-ieri3.mp4",
"qr_azzurri/qr_azzurri_villa_del_principe/qr_azzurri_villa_del_principe_villa_del_principe/qrcode-villadoria1-ieri4.mp4"
          ]
        }
      }
    ]
  };

  function publishGlobal(){
    try{
      if (window.__qrAddSource) { window.__qrAddSource(window.__VDP_DATA.parent, window.__VDP_DATA.children); return true; }
      window.__QR_SOURCES = window.__QR_SOURCES || [];
      window.__QR_SOURCES.push({parent: window.__VDP_DATA.parent, children: window.__VDP_DATA.children});
      return true;
    }catch(e){ return false; }
  }

  if(!publishGlobal()){
    var __vdpTries = 0;
    var __vdpTimer = setInterval(function(){
      if(publishGlobal() || (++__vdpTries > 30)){
        clearInterval(__vdpTimer);
        try{ window.__qrBuildAll && window.__qrBuildAll(); }catch(_){}
      }
    }, 120);
  }else{
    try{ window.__qrBuildAll && window.__qrBuildAll(); }catch(_){}
  }


  // Usa whenMapReady globale se esiste, altrimenti fallback (come nel tuo script).
  var whenMapReadyLocal =
    (typeof window !== "undefined" && window.whenMapReady) ||
    function (fn) {
      if (typeof window !== "undefined" && window.map && map.addLayer) { fn(); return; }
      window.addEventListener("load", function () { if (window.map) fn(); });
    };

  function ensureStyles() {
    if (document.getElementById("qr-vdp-styles")) return;
    var s = document.createElement("style");
    s.id = "qr-vdp-styles";
    s.textContent =
      ".qr-vdp-blue .tri{width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:14px solid #1e3a8a;filter:drop-shadow(0 0 1px rgba(0,0,0,0.45));}" +
      ".qr-vdp-azzurro .tri{width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-top:16px solid #38bdf8;filter:drop-shadow(0 0 1px rgba(0,0,0,0.45));}";
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

  whenMapReadyLocal(function () {
    ensureStyles();
    ensurePanelFn();

    var data = window.__VDP_DATA || {};
    var parent = data.parent || {};
    var kids = data.children || [];

    if (!map.getPane("pane-vdp-blue-swap")) {
      map.createPane("pane-vdp-blue-swap");
      map.getPane("pane-vdp-blue-swap").style.zIndex = 710;
    }
    if (!map.getPane("pane-vdp-azzurri-swap")) {
      map.createPane("pane-vdp-azzurri-swap");
      map.getPane("pane-vdp-azzurri-swap").style.zIndex = 711;
    }

    var blueIconLocal = L.divIcon({
      className: "qr-blue-parent",
      iconSize: [16, 14],
      iconAnchor: [8, 14],
      html: '<div class="qr-triangle"></div>'
    });

    // FIX 2: il marker blue deve esistere.
    var blue = L.marker([parent.lat, parent.lng], {
      pane: "pane-vdp-blue-swap",
      icon: blueIconLocal,
      title: parent.label
    });

    try { blue.off("click"); } catch (e) {}
    if (blue.bindTooltip) {
      blue.bindTooltip(parent.label || "Villa del Principe", { permanent: false, direction: "right", offset: [8, 0], className: "qr-tooltip" });
    }
    blue.on("click", function () {
      window.__qrOpenChildPanel && window.__qrOpenChildPanel(parent.label || "Villa del Principe", "Zooma per vedere i punti.", { oggi: null, ieri: [] });
    });

    var azzIcon = L.icon({
      iconUrl: "qr_azzurri/marker-azzurro-qr-notch-24.svg",
      iconSize: [24, 26],
      iconAnchor: [12, 26],
      className: "qr-azzurro-icon"
    });

    var group = L.layerGroup();
    kids.forEach(function (c, idx) {
      var lat = c.lat, lng = c.lng;

      if (Math.abs((lat || 0) - (parent.lat || 0)) < 1e-7 && Math.abs((lng || 0) - (parent.lng || 0)) < 1e-7) {
        var offs = [[0, 0.00035], [0.0003, 0], [-0.00028, -0.00022], [0.00022, -0.00025]];
        var d = offs[idx % offs.length];
        lat += d[0]; lng += d[1];
      }

      var m = L.marker([lat, lng], { pane: "pane-vdp-azzurri-swap", icon: azzIcon, title: c.label });
      if (m.bindTooltip) m.bindTooltip(c.label || "", { permanent: false, direction: "right", offset: [8, 0], className: "qr-tooltip" });
      m.on("click", function () { window.__qrOpenChildPanel && window.__qrOpenChildPanel(c.label, c.descr, c.media); });
      group.addLayer(m);
    });

    var chk = document.getElementById("chk-qr-villa-del-principe");

    function showBlue() { try { group.removeFrom(map); } catch (e) {} try { blue.addTo(map); } catch (e) {} }
    function showKids() { try { blue.removeFrom(map); } catch (e) {} try { group.addTo(map); } catch (e) {} }
    function hideAll()  { try { blue.removeFrom(map); } catch (e) {} try { group.removeFrom(map); } catch (e) {} }

    function update() {
      var checked = !!(chk && chk.checked);
      if (!checked) { hideAll(); return; }
      showKids();
    }

    if (chk && !chk.__wiredBlueSwap) {
      chk.addEventListener("change", update);
      chk.__wiredBlueSwap = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
