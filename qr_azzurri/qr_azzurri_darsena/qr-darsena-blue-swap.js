(function () {
  var data = {
    parent: {
      id: "darsena",
      label: "Darsena",
      lat: 44.41400617881691,
      lng: 8.925181377996745
    },
    children: [
      {
        id: "ponte_reale",
        label: "Ponte Reale",
        lat: 44.41335584241666,
        lng: 8.924099275633305,
        descr: "Ponte Reale.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_darsena/qr_azzurri_darsena_ponte_reale/qr_azzurri_darsena_ponte_reale_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_darsena/qr_azzurri_darsena_ponte_reale/qr_azzurri_darsena_ponte_reale_ieri_1.mp4"
          ]
        }
      },
      {
        id: "via_gramsci",
        label: "Via Gramsci",
        lat: 44.4132968500203,
        lng: 8.926367986872602,
        descr: "Via Gramsci.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_darsena/qr_azzurri__darsena_via_gramsci/qr_azzurri__darsena_via_gramsci_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_darsena/qr_azzurri__darsena_via_gramsci/qr_azzurri__darsena_via_gramsci_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_darsena/qr_azzurri__darsena_via_gramsci/qr_azzurri__darsena_via_gramsci_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_darsena/qr_azzurri__darsena_via_gramsci/qr_azzurri__darsena_via_gramsci_ieri_3.mp4"
          ],
          sfx: [
            "qr_azzurri/qr_azzurri_darsena/qr_azzurri__darsena_via_gramsci/qr_azzurri__darsena_via_gramsci_sfx_1.mp4"
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
  try { window.__qrBuildAll && window.__qrBuildAll(); } catch (_) {}

  whenMapReady(function () {
    var parent = data.parent, kids = data.children || [];
    var chk = document.getElementById("chk-qr-darsena");
    if (!chk) return;

    if (!map.getPane("pane-darsena-blue")) {
      map.createPane("pane-darsena-blue");
      map.getPane("pane-darsena-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-darsena-azzurri")) {
      map.createPane("pane-darsena-azzurri");
      map.getPane("pane-darsena-azzurri").style.zIndex = 651;
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
      pane: "pane-darsena-blue",
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
          "Zooma per vedere i punti di Darsena.",
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
        pane: "pane-darsena-azzurri",
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

    if (!chk.__wiredSwap_darsena) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_darsena = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
