(function () {
  var data = {
    parent: {
      id: "bolzaneto",
      label: "Bolzaneto",
      lat: 44.45894425055687,
      lng: 8.901376512240002
    },
    children: [
{
  id: "bolzaneto_piazza_umberto_i",
  label: "Piazza Umberto I",
  lat: 44.45894425055687,
  lng: 8.901376512240002,
  descr: "La piazza fungeva da stazionamento per le carrozze e i primi mezzi di trasporto pubblico da e verso il centro di Genova. Nei pressi, le caratteristiche osterie locali vedevano conducenti e bigliettai fermi per brevi pause prima delle partenze.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_bolzaneto/piazza_umberto_bolzaneto_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_bolzaneto/piazza_umberto_bolzaneto_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-bolzaneto");
    if (!chk) return;

    if (!map.getPane("pane-bolzaneto-blue")) {
      map.createPane("pane-bolzaneto-blue");
      map.getPane("pane-bolzaneto-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-bolzaneto-azzurri")) {
      map.createPane("pane-bolzaneto-azzurri");
      map.getPane("pane-bolzaneto-azzurri").style.zIndex = 651;
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
      pane: "pane-bolzaneto-blue",
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
          "Zooma per vedere i punti di Bolzaneto.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-bolzaneto-azzurri",
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

    if (!chk.__wiredSwap_bolzaneto) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_bolzaneto = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
