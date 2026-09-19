(function () {
  var data = {
    parent: {
      id: "cornigliano",
      label: "Cornigliano",
      lat: 44.416,
      lng: 8.8682
    },
    children: [
{
  id: "cornigliano_via_provinciale",
  label: "Via Provinciale",
  lat: 44.41546474937802,
  lng: 8.867488407771537,
  descr: "Via Provinciale, aperta al traffico nel 1842 e oggi via Cornigliano, divenne l’asse principale dell’abitato. Tra Ottocento e primo Novecento attraversava un centro ancora caratterizzato da ville, giardini e dalla vicinanza del mare, prima delle profonde trasformazioni industriali del Novecento.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_cornigliano/via_provinciale_cornigliano_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_cornigliano/via_provinciale_cornigliano_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-cornigliano");
    if (!chk) return;

    if (!map.getPane("pane-cornigliano-blue")) {
      map.createPane("pane-cornigliano-blue");
      map.getPane("pane-cornigliano-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-cornigliano-azzurri")) {
      map.createPane("pane-cornigliano-azzurri");
      map.getPane("pane-cornigliano-azzurri").style.zIndex = 651;
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
      pane: "pane-cornigliano-blue",
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
          "Zooma per vedere i punti di Cornigliano.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-cornigliano-azzurri",
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

    if (!chk.__wiredSwap_cornigliano) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_cornigliano = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
