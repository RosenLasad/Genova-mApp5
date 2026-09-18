(function () {
  var data = {
    parent: {
      id: "rivarolo",
      label: "Rivarolo",
      lat: 44.4333,
      lng: 8.893
    },
    children: [
{
  id: "rivarolo_via_jori",
  label: "Via Jori",
  lat: 44.432694301933196,
  lng: 8.89213781481779,
  descr: "Tra fine Ottocento e inizio Novecento, via Giovan Battista Jori e la zona della Certosa nel comune di Rivarolo vivevano una fase di forte transizione da area rurale e di svago a sobborgo operaio e residenziale. Nei primi del Novecento iniziarono a essere tracciate e sistemate le vie d'accesso per collegare i fondovalle ai nuovi insediamenti residenziali che salivano verso le colline",
  media: {
    oggi: "qr_azzurri/qr_azzurri_rivarolo/via_jori_rivarolo_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_rivarolo/via_jori_rivarolo_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-rivarolo");
    if (!chk) return;

    if (!map.getPane("pane-rivarolo-blue")) {
      map.createPane("pane-rivarolo-blue");
      map.getPane("pane-rivarolo-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-rivarolo-azzurri")) {
      map.createPane("pane-rivarolo-azzurri");
      map.getPane("pane-rivarolo-azzurri").style.zIndex = 651;
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
      pane: "pane-rivarolo-blue",
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
          "Zooma per vedere i punti di Rivarolo.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-rivarolo-azzurri",
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

    if (!chk.__wiredSwap_rivarolo) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_rivarolo = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
