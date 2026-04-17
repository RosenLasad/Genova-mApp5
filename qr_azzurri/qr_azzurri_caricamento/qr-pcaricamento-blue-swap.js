(function () {
  var data = {
    parent: {
      id: "pcaricamento",
      label: "Piazza Caricamento",
      lat: 44.40978545047747,
      lng: 8.928420148794766
    },
    children: [
      {
        id: "pz_caricamento",
        label: "Portici in piazza di Caricamento",
        lat: 44.409562128125145, 
        lng: 8.929221677476946,
        descr: "Portici in piazza di Caricamento.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_caricamento/caricamento_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_caricamento/caricamento_ieri_1.mp4"]
        }
      },
      {
        id: "piazza_raibetta",
        label: "Piazza Raibetta",
        lat: 44.40856824714509,
        lng: 8.9290060963642,
        descr: "Piazza Raibetta.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_caricamento/raibetta_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_caricamento/raibetta_ieri_1.mp4",
                 "qr_azzurri/qr_azzurri_caricamento/raibetta_ieri_2.mp4"]
        }
      },

{
        id: "piazza_caricsangiorgio",
        label: "Piazza Caricamento su S.Giorgio",
        lat: 44.40981197861113,
        lng: 8.928760914112388,
        descr: "Piazza Caricamento su San Giorgio.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_caricamento/caricsangiorgio_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_caricamento/caricsangiorgio_ieri_1.mp4",
                 "qr_azzurri/qr_azzurri_caricamento/caricsangiorgio_ieri_2.mp4", "qr_azzurri/qr_azzurri_caricamento/caricsangiorgio_ieri_3.mp4"]
        }
      },
{
        id: "caric_portici",
        label: "Portici dal sottopassaggio",
        lat: 44.41120114359175,
        lng:  8.928395998250107,
        descr: "Portici dal sottopassaggio.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_caricamento/caric_portici_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_caricamento/caric_portici_ieri_1.mp4"]
        }
      },
{
        id: "carica_inpiazza",
        label: "Piazza di Caricamento",
        lat: 44.40957209444895, 
        lng:  8.928772026937516,
        descr: "Piazza di Caricamento.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_caricamento/carica_inpiazza_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_caricamento/carica_inpiazza_ieri_1.mp4", "qr_azzurri/qr_azzurri_caricamento/carica_inpiazza_ieri_2.mp4"]
        }
      },
      {
        id: "piazza_banchi",
        label: "Piazza Banchi",
        lat: 44.409341098191156,
        lng: 8.929844922249893,
        descr: "Piazza Banchi.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_caricamento/banchi_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_caricamento/banchi_ieri_1.mp4"]
        }
      }
    ]
  };

  try {
    if (window.__qrAddSource) {
      window.__qrAddSource(data.parent, data.children);
    } else {
      window.__QR_SOURCES = window.__QR_SOURCES || [];
      window.__QR_SOURCES.push({ parent: data.parent, children: data.children });
    }
  } catch (_) {}

  try {
    window.__qrBuildAll && window.__qrBuildAll();
  } catch (_) {}

  whenMapReady(function () {
    var parent = data.parent, kids = data.children || [];
    var chk = document.getElementById("chk-qr-pcaricamento");
    if (!chk) return;

    if (!map.getPane("pane-pcaricamento-blue")) {
      map.createPane("pane-pcaricamento-blue");
      map.getPane("pane-pcaricamento-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-pcaricamento-azzurri")) {
      map.createPane("pane-pcaricamento-azzurri");
      map.getPane("pane-pcaricamento-azzurri").style.zIndex = 651;
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

    var azzIcon = L.icon({
      iconUrl: "qr_azzurri/marker-azzurro-qr-notch-24.svg",
      iconSize: [24, 26],
      iconAnchor: [12, 26],
      className: "qr-azzurro-icon"
    });

    var blue = L.marker([parent.lat, parent.lng], {
      pane: "pane-pcaricamento-blue",
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
          "Zooma per vedere i punti di Caricamento.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c, idx) {
      var lat = c.lat, lng = c.lng;

      if (
        Math.abs((lat || 0) - (parent.lat || 0)) < 1e-7 &&
        Math.abs((lng || 0) - (parent.lng || 0)) < 1e-7
      ) {
        var offs = [[0, 0.00035], [0.0003, 0], [-0.00028, -0.00022], [0.00022, -0.00025]];
        var d = offs[idx % offs.length];
        lat += d[0]; lng += d[1];
      }

      var m = L.marker([lat, lng], {
        pane: "pane-pcaricamento-azzurri",
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

    var THRESH = 0;
    function update() {
      var on = !!(chk && chk.checked);
      if (!on) { hideAll(); return; }
      var z = map.getZoom ? map.getZoom() : 0;
      showKids();
    }

    if (!chk.__wiredSwap_pcaricamento) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_pcaricamento = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
