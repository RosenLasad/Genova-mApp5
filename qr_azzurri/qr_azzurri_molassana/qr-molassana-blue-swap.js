(function () {
  var data = {
    parent: {
      id: "molassana",
      label: "Molassana",
      lat: 44.456914270332796,
      lng: 8.97820150368969
    },
    children: [
{
  id: "molassana_via_geirato",
  label: "Via Geirato",
  lat: 44.456914270332796,
  lng: 8.97820150368969,
  descr: "Tra la fine dell’Ottocento e i primi decenni del Novecento, via Geirato attraversava un paesaggio ancora prevalentemente rurale, segnato da orti, campi e dal torrente omonimo. La successiva urbanizzazione di Molassana e la copertura del tratto finale del Geirato trasformarono profondamente questa zona.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_molassana/via_geirato_molassana_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_molassana/via_geirato_molassana_ieri.mp4"]
  }
}
    ]
  };

  try{
    if (window.__qrAddSource) {
      window.__qrAddSource(data.parent, data.children);
    } else {
      window.__QR_SOURCES = window.__QR_SOURCES || [];
      window.__QR_SOURCES.push({ parent: data.parent, children: data.children });
    }
  }catch(_){}

  try{
    window.__qrBuildAll && window.__qrBuildAll();
  }catch(_){}

  whenMapReady(function () {
    var parent = data.parent, kids = data.children || [];
    var chk = document.getElementById("chk-qr-molassana");
    if (!chk) return;

    if (!map.getPane("pane-molassana-blue")) {
      map.createPane("pane-molassana-blue");
      map.getPane("pane-molassana-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-molassana-azzurri")) {
      map.createPane("pane-molassana-azzurri");
      map.getPane("pane-molassana-azzurri").style.zIndex = 651;
    }

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

    var azzIcon = L.icon({
      iconUrl: "qr_azzurri/marker-azzurro-qr-notch-24.svg",
      iconSize: [24, 26],
      iconAnchor: [12, 26],
      className: "qr-azzurro-icon"
    });

    var blue = L.marker([parent.lat, parent.lng], {
      pane: "pane-molassana-blue",
      icon: blueIconLocal,
      title: parent.label
    });

    try { blue.off("click"); } catch (e) {}
    if (blue.bindTooltip) {
      blue.bindTooltip(parent.label || "", {
        permanent: false,
        direction: "right",
        offset: [8, 0],
        className: "qr-tooltip"
      });
    }
    blue.on("click", function () {
      if (window.__qrOpenChildPanel) {
        window.__qrOpenChildPanel(
          parent.label || "",
          "Zooma per vedere i punti di Molassana.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-molassana-azzurri",
        icon: azzIcon,
        title: c.label
      });

      if (m.bindTooltip) {
        m.bindTooltip(c.label || "", {
          permanent: false,
          direction: "right",
          offset: [8, 0],
          className: "qr-tooltip"
        });
      }

      m.on("click", function () {
        if (window.__qrOpenChildPanel) {
          window.__qrOpenChildPanel(
            c.label || "",
            c.descr || "",
            c.media || { oggi: null, ieri: [] }
          );
        }
      });

      group.addLayer(m);
    });

    function showKids() { try { blue.removeFrom(map); } catch (e) {} try { group.addTo(map); } catch (e) {} }
    function hideAll()  { try { blue.removeFrom(map); } catch (e) {} try { group.removeFrom(map); } catch (e) {} }

    function update() {
      var on = !!(chk && chk.checked);
      if (!on) { hideAll(); return; }
      showKids();
    }

    if (!chk.__wiredSwap_molassana) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_molassana = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
