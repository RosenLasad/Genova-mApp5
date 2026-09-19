(function () {
  var data = {
    parent: {
      id: "borzoli",
      label: "Borzoli",
      lat: 44.4334,
      lng: 8.8687
    },
    children: [
{
  id: "borzoli_panorama",
  label: "Panorama di Borzoli",
  lat: 44.432771659252346,
  lng: 8.867849192167212,
  descr: "A cavallo tra la fine dell'Ottocento e i primi del Novecento, Borzoli era un comune autonomo (lo rimase fino al 1926, quando fu integrato nella \"Grande Genova\"). In questo preciso periodo storico, il territorio visse una profonda transizione, presentandosi come una realtà ibrida tra un borgo agricolo collinare e un centro di prima industrializzazione",
  media: {
    oggi: "qr_azzurri/qr_azzurri_borzoli/panorama_borzoli_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_borzoli/panorama_borzoli_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-borzoli");
    if (!chk) return;

    if (!map.getPane("pane-borzoli-blue")) {
      map.createPane("pane-borzoli-blue");
      map.getPane("pane-borzoli-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-borzoli-azzurri")) {
      map.createPane("pane-borzoli-azzurri");
      map.getPane("pane-borzoli-azzurri").style.zIndex = 651;
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
      pane: "pane-borzoli-blue",
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
          "Zooma per vedere i punti di Borzoli.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-borzoli-azzurri",
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

    function showKids() { try { blue.removeFrom(map); } catch (e) {} try { group.addTo(map); } catch (e) {} }
    function hideAll()  { try { blue.removeFrom(map); } catch (e) {} try { group.removeFrom(map); } catch (e) {} }

    function update() {
      var on = !!(chk && chk.checked);
      if (!on) { hideAll(); return; }
      showKids();
    }

    if (!chk.__wiredSwap_borzoli) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_borzoli = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
