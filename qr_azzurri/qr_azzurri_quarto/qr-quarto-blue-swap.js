(function () {
  var data = {
    parent: {
      id: "quarto",
      label: "Quarto",
      lat: 44.393883971743364,
      lng: 8.992318940190513
    },
    children: [
      {
        id: "ponte_v_maggio",
        label: "Via V maggio dal ponte",
        lat: 44.39277527167073,
        lng: 8.984352492387421,
        descr: "Via V maggio dal ponte.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_quarto/ponte_v_maggio_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_quarto/ponte_v_maggio_ieri_1.mp4"]
        }
      },
{
        id: "v_maggio_villa",
        label: "Villa De Ferrari",
        lat: 44.39101191542048,
        lng: 8.990558606210234,
        descr: "Via V maggio su Villa De Ferrari.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_quarto/quarto_villa_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_quarto/quarto_villa_ieri_1.mp4"]
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
    var chk = document.getElementById("chk-qr-quarto");
    if (!chk) return;

    if (!map.getPane("pane-quarto-blue")) {
      map.createPane("pane-quarto-blue");
      map.getPane("pane-quarto-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-quarto-azzurri")) {
      map.createPane("pane-quarto-azzurri");
      map.getPane("pane-quarto-azzurri").style.zIndex = 651;
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
      pane: "pane-quarto-blue",
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
          "Zooma per vedere i punti di Quarto.",
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
        pane: "pane-quarto-azzurri",
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

    if (!chk.__wiredSwap_quarto) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_quarto = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
