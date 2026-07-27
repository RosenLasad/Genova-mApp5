(function () {
  var data = {
    parent: {
      id: "quinto",
      label: "Quinto",
      lat: 44.38516138891641,
      lng: 9.017836130716283
    },
    children: [
      {
        id: "quinto_via_gianelli",
        label: "Via Gianelli",
        lat: 44.384762866492395,
        lng: 9.017676660678617,
        descr: "Via Gianelli verso ponente.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_quinto/quinto_via_gianelli_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_quinto/quinto_via_gianelli_ieri_1.mp4"]
        }
      },
{
        id: "quinto_via_quinto",
        label: "Via Quinto verso levante",
        lat: 44.3852849853469,
        lng: 9.010977374478458,
        descr: "Via Quinto verso levante.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_quinto/quinto_via_quinto_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_quinto/quinto_via_quinto_ieri_1.mp4"]
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
    var chk = document.getElementById("chk-qr-quinto");
    if (!chk) return;

    if (!map.getPane("pane-quinto-blue")) {
      map.createPane("pane-quinto-blue");
      map.getPane("pane-quinto-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-quinto-azzurri")) {
      map.createPane("pane-quinto-azzurri");
      map.getPane("pane-quinto-azzurri").style.zIndex = 651;
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
      pane: "pane-quinto-blue",
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
          "Zooma per vedere i punti di Quinto.",
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
        pane: "pane-quinto-azzurri",
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

    if (!chk.__wiredSwap_quinto) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_quinto = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
