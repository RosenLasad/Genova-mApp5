(function () {
  var data = {
    parent: {
      id: "pontedecimo",
      label: "Pontedecimo",
      lat: 44.49935137639013,
      lng: 8.90333191077162
    },
    children: [
{
  id: "pontedecimo_piazza_pontedecimo",
  label: "Piazza Pontedecimo",
  lat: 44.49935137639013,
  lng: 8.90333191077162,
  descr: "Piazza Pontedecimo, un tempo piazza Regina Margherita e conosciuta popolarmente come “ciassa di Pein”, divenne nell’Ottocento il cuore commerciale e sociale del borgo. L’apertura della strada dei Giovi ne rafforzò il ruolo di crocevia, poi consolidato dall’arrivo dei tram all’inizio del Novecento.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_pontedecimo/piazza_pontedecimo_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_pontedecimo/piazza_pontedecimo_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-pontedecimo");
    if (!chk) return;

    if (!map.getPane("pane-pontedecimo-blue")) {
      map.createPane("pane-pontedecimo-blue");
      map.getPane("pane-pontedecimo-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-pontedecimo-azzurri")) {
      map.createPane("pane-pontedecimo-azzurri");
      map.getPane("pane-pontedecimo-azzurri").style.zIndex = 651;
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
      pane: "pane-pontedecimo-blue",
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
          "Zooma per vedere i punti di Pontedecimo.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-pontedecimo-azzurri",
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

    function showBlue() { try { group.removeFrom(map); } catch (e) {} try { blue.addTo(map); } catch (e) {} }
    function showKids() { try { blue.removeFrom(map); } catch (e) {} try { group.addTo(map); } catch (e) {} }
    function hideAll()  { try { blue.removeFrom(map); } catch (e) {} try { group.removeFrom(map); } catch (e) {} }

    function update() {
      var on = !!(chk && chk.checked);
      if (!on) { hideAll(); return; }
      showKids();
    }

    if (!chk.__wiredSwap_pontedecimo) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_pontedecimo = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
