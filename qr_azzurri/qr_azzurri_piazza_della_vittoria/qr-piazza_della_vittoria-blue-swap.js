(function () {
  var data = {
    parent: {
      id: "piazza_della_vittoria",
      label: "Piazza della Vittoria",
      lat: 44.40314174847413,
      lng: 8.944927399062294
    },
    children: [
      {
        id: "arco",
        label: "Arco della Vittoria",
        lat: 44.40276956624745,
        lng: 8.944792358145323,
        descr: "Arco della Vittoria.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_della_vittoria/qr_azzurri_piazza_della_vittoria_arco/qr_azzurri_piazza_della_vittoria_arco_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_piazza_della_vittoria/qr_azzurri_piazza_della_vittoria_arco/qr_azzurri_piazza_della_vittoria_arco_ieri_1.mp4"
          ]
        }
      },
      {
        id: "sulbisagno",
        label: "Ponte Pila sul Bisagno",
        lat: 44.40386193752678,
        lng: 8.947389752937294,
        descr: "Ponte Pila sul Bisagno.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_pila_1_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_pila_1_ieri_1.mp4"]
        }
      },
      {
        id: "pilasud",
        label: "Ponte Pila verso sud",
        lat: 44.404361898463705,
        lng: 8.946814062423213,
        descr: "Ponte Pila verso sud.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_pila_3_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_pila_3_ieri_1.mp4"]
        }
      },
      {
        id: "pilaest",
        label: "Ponte Pila verso est",
        lat: 44.404252279356456,
        lng: 8.946609080646999,
        descr: "Ponte Pila verso est.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_pila_2_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_pila_2_ieri_1.mp4"]
        }
      },
      {
        id: "statua",
        label: "Statua del marinaio",
        lat: 44.39606632733933,
        lng: 8.94347614228691,
        descr: "Statua del marinaio.",
        media: { "oggi": "qr_azzurri/qr_azzurri_piazza_della_vittoria/qr_azzurri_foce_statua_oggi.mp4",
                   "ieri": ["qr_azzurri/qr_azzurri_piazza_della_vittoria/qr_azzurri_foce_statua_ieri_1.mp4"]
       }
      },
      {
        id: "pontebezzecca",
        label: "Ponte Bezzecca sul Bisagno",
        lat: 44.40093911519035,
        lng: 8.945811780151582,
        descr: "Ponte Bezzecca sul Bisagno.",
        media: { "oggi": "qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_bezzecca_oggi.mp4",
                   "ieri": ["qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_bezzecca_ieri_1.mp4",
                            "qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_bezzecca_ieri_2.mp4",
                            "qr_azzurri/qr_azzurri_piazza_della_vittoria/ponte_bezzecca_ieri_3.mp4"]
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
    var chk = document.getElementById("chk-qr-piazza-della-vittoria");
    if (!chk) return;

    if (!map.getPane("pane-piazza_della_vittoria-blue")) {
      map.createPane("pane-piazza_della_vittoria-blue");
      map.getPane("pane-piazza_della_vittoria-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-piazza_della_vittoria-azzurri")) {
      map.createPane("pane-piazza_della_vittoria-azzurri");
      map.getPane("pane-piazza_della_vittoria-azzurri").style.zIndex = 651;
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
      pane: "pane-piazza_della_vittoria-blue",
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
          "Zooma per vedere i punti di Piazza della Vittoria.",
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
        pane: "pane-piazza_della_vittoria-azzurri",
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

    if (!chk.__wiredSwap_piazza_della_vittoria) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_piazza_della_vittoria = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
