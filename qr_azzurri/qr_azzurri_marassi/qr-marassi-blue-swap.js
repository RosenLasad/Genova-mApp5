(function () {
  var data = {
    parent: {
      id: "marassi",
      label: "Marassi",
      lat: 44.41596300984767,
      lng: 8.951607998652662
    },
    children: [
      {
        id: "viaarchimede",
        label: "Via Archimede",
        lat: 44.40659188019401,
        lng: 8.951612114544316,
        descr: "Via Archimede verso Piazza Giusti. ",
        media: {
          oggi: "qr_azzurri/qr_azzurri_marassi/via_archimede_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_marassi/via_archimede_ieri_1.mp4"]
        }
      },
      {
        id: "ferroviarchimede",
        label: "Tunnel di Via Archimede",
        lat: 44.40630163505363,
        lng: 8.951165101297539,
        descr: "Tunnel di Via Archimede. ",
        media: {
          oggi: "qr_azzurri/qr_azzurri_marassi/tunnel_archimede_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_marassi/tunnel_archimede_ieri_1.mp4"]
        }
      },
      {
        id: "coso_galilei",
        label: "Corso Galilei",
        lat: 44.40707387113022,
        lng: 8.95066283538313,
        descr: "Corso Galilei.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_marassi/corso_galilei_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_marassi/corso_galilei_ieri_1.mp4"]
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
    var chk = document.getElementById("chk-qr-marassi");
    if (!chk) return;

    if (!map.getPane("pane-marassi-blue")) {
      map.createPane("pane-marassi-blue");
      map.getPane("pane-marassi-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-marassi-azzurri")) {
      map.createPane("pane-marassi-azzurri");
      map.getPane("pane-marassi-azzurri").style.zIndex = 651;
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
      pane: "pane-marassi-blue",
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
          "Zooma per vedere i punti di Marassi.",
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
        pane: "pane-marassi-azzurri",
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

    if (!chk.__wiredSwap_marassi) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_marassi = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
