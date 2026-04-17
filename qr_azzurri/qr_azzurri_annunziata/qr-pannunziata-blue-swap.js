(function () {
  var data = {
    parent: {
      id: "pannunziata",
      label: "Piazza dell'Annunziata",
      lat: 44.413828602199644,
      lng: 8.928356964208026
    },
    children: [
      {
        id: "pannunziata",
        label: "Piazza dell'Annunziata",
        lat: 44.41363016151568,
        lng: 8.92874557262042,
        descr: "Piazza dell'Annunziata da Largo della Zecca.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_annunziata/qr_azzurri_annunziata_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_annunziata/qr_azzurri_annunziata_ieri_1.mp4"
          ]
        }
      },
{
        id: "balbi_1",
        label: "Via Balbi su P.Principe",
        lat: 44.416262467299575, 
        lng: 8.923766672014212,
        descr: "Via Balbi su P.Principe.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_annunziata/via_balbi_1_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_annunziata/via_balbi_1_ieri_1.mp4", "qr_azzurri/qr_azzurri_annunziata/via_balbi_1_ieri_2.mp4"
          ]
        }
      },
{
        id: "balbi_2",
        label: "Via Balbi da Piazza Durazzo",
        lat: 44.415377869010264, 
        lng: 8.925446300561987,
        descr: "Via Balbi da Piazza Durazzo.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_annunziata/via_balbi_2_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_annunziata/via_balbi_2_ieri_1.mp4"
          ]
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
    var chk = document.getElementById("chk-qr-pannunziata");
    if (!chk) return;

    if (!map.getPane("pane-pannunziata-blue")) {
      map.createPane("pane-pannunziata-blue");
      map.getPane("pane-pannunziata-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-pannunziata-azzurri")) {
      map.createPane("pane-pannunziata-azzurri");
      map.getPane("pane-pannunziata-azzurri").style.zIndex = 651;
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
      pane: "pane-pannunziata-blue",
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
          "Zooma per vedere i punti di Pz.dell'Annunziata.",
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
        pane: "pane-pannunziata-azzurri",
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

    if (!chk.__wiredPannunziataSwap) {
      chk.addEventListener("change", update);
      chk.__wiredPannunziataSwap = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
