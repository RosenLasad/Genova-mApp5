(function () {
  var data = {
    parent: {
      id: "albaro",
      label: "Albaro",
      lat: 44.396872546642825,
      lng: 8.957625717844621
    },
    children: [
      {
        id: "corso_italia_spiaggia",
        label: "Spiaggia sotto San Pietro",
        lat: 44.395052162601296,
        lng: 8.948688216522477,
        descr: "Spiaggia sotto San Pietro.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_albaro/qr_albaro_corso_italia_spiaggia/sanpietro_spiaggia_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_albaro/qr_albaro_corso_italia_spiaggia/sanpietro_spiaggia_ieri_1.mp4",                 
                 "qr_azzurri/qr_azzurri_albaro/qr_albaro_corso_italia_spiaggia/sanpietro_spiaggia_ieri_2.mp4"]
        }
      },
      {
        id: "francesco_albaro",
        label: "Chiesa di S.Francesco",
        lat: 44.398612575306295,
        lng: 8.960511991368334,
        descr: "Chiesa di S.Francesco di Albaro.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_albaro/qr_albaro_francesco/albaro_francesco_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_albaro/qr_albaro_francesco/albaro_francesco_ieri_1.mp4"]
        }
      },
      {
        id: "albaro_vagno",
        label: "Corso Italia a Punta Vagno",
        lat: 44.3927644794598,
        lng: 8.951550117601824,
        descr: "Corso Italia a Punta Vagno.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_albaro/qr_albaro_vagno/qr_albaro_sangiuliano/corsoitalia_vagno_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_albaro/qr_albaro_vagno/qr_albaro_sangiuliano/corsoitalia_vagno_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_albaro/qr_albaro_vagno/qr_albaro_sangiuliano/corsoitalia_vagno_ieri_2.mp4"
          ]
        }
      },
      {
        id: "italia_sangiuliano",
        label: "San Giuliano da Corso Italia",
        lat: 44.39226976157794,
        lng: 8.959731132398751,
        descr: "San Giuliano da Corso Italia.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_albaro/italia_sangiuliano_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_albaro/italia_sangiuliano_ieri_1.mp4"]
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
    var chk = document.getElementById("chk-qr-albaro");
    if (!chk) return;

    if (!map.getPane("pane-albaro-blue")) {
      map.createPane("pane-albaro-blue");
      map.getPane("pane-albaro-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-albaro-azzurri")) {
      map.createPane("pane-albaro-azzurri");
      map.getPane("pane-albaro-azzurri").style.zIndex = 651;
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
      pane: "pane-albaro-blue",
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

    // Nota: testo lasciato identico al tuo (anche se dice "Caricamento").
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
        pane: "pane-albaro-azzurri",
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

    if (!chk.__wiredSwap_albaro) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_albaro = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
