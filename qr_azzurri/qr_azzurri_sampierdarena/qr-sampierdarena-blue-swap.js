(function () {
  var data = {
    parent: { id:"sampierdarena", label:"Sampierdarena", lat: 44.410678537797466, lng: 8.890876829274582 },
    children: [
      {
        id: "sampi-colombo",
        label: "Via Colombo",
        lat: 44.4102889952129,
        lng: 8.8885158848832,
        descr: "Via Colombo.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_sampierdarena/viacolombo_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_sampierdarena/viacolombo_ieri_1.mp4"]
        }
      },
      {
        id: "sampi-canepa",
        label: "Spiaggia",
        lat: 44.40869782905921,
        lng: 8.892927141863167,
        descr: "Spiaggia a Sampierdarena.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_sampierdarena/canepa_spiaggia_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_sampierdarena/canepa_spiaggia_ieri_1.mp4", "qr_azzurri/qr_azzurri_sampierdarena/canepa_spiaggia_ieri_2.mp4"]
        }
      },
      {
        id: "sampi-spiaggia",
        label: "Foto di gruppo al mare",
        lat: 44.40679125866593,
        lng: 8.897371418248346,
        descr: "Foto di gruppo al mare.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_sampierdarena/sampi-spiaggia_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_sampierdarena/sampi-spiaggia_ieri_1.mp4"]
        }
      },
      {
        id: "sampi-municipio",
        label: "Municipio di Sampierdarena",
        lat: 44.41016432157373,
        lng: 8.88923273392057,
        descr: "Municipio di Sampierdarena.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_sampierdarena/sampi-municipio_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_sampierdarena/sampi-municipio_ieri_1.mp4"]
        }
      },
      {
        id: "sampi-masnata",
        label: "Piazza Masnata",
        lat: 44.41818795151047,
        lng: 8.886263066534422,
        descr: "Piazza Masnata.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_sampierdarena/sampi-masnata_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_sampierdarena/sampi-masnata_ieri_1.mp4"]
        }
      },
      {
        id: "sampi-veneto",
        label: "Piazza Vittorio Veneto",
        lat: 44.41161445025252,
        lng: 8.888822522274651,
        descr: "Piazza Vittorio Veneto.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_sampierdarena/sampi-veneto_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_sampierdarena/sampi-veneto_ieri_1.mp4"]
        }
      },
      {
        id: "sampi-pietrochiesa",
        label: "Via Pietro Chiesa",
        lat: 44.40858185156502,
        lng: 8.895625331137941,
        descr: "Via Pietro Chiesa.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_sampierdarena/sampi-pietrochiesa_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_sampierdarena/sampi-pietrochiesa_ieri_1.mp4"]
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
    var chk = document.getElementById("chk-qr-sampierdarena");
    if (!chk) return;

    if (!map.getPane("pane-sampierdarena-blue")) {
      map.createPane("pane-sampierdarena-blue");
      map.getPane("pane-sampierdarena-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-sampierdarena-azzurri")) {
      map.createPane("pane-sampierdarena-azzurri");
      map.getPane("pane-sampierdarena-azzurri").style.zIndex = 651;
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
      pane: "pane-sampierdarena-blue",
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
          "Zooma per vedere i punti di Sampierdarena.",
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
        pane: "pane-sampierdarena-azzurri",
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

    if (!chk.__wiredSwap_sampierdarena) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_sampierdarena = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
