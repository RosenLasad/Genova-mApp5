(function () {
  var data = {
    parent: {
      id: "santilario",
      label: "Sant'Ilario",
      lat: 44.384934643998264,
      lng: 9.054518663776634
    },
    children: [
{
  id: "santilario_chiesa_santilario",
  label: "Chiesa di Sant'Ilario",
  lat: 44.384934643998264,
  lng: 9.054518663776634,
  descr: "La chiesa di Sant’Ilario, documentata almeno dal 1198, domina il borgo collinare sopra Nervi. Tra Ottocento e Novecento rimase il centro religioso e comunitario dell’allora comune autonomo; nel 1911 la sua antica facciata fu ricostruita nelle forme neoclassiche visibili ancora oggi.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_santilario/chiesa_santilario_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_santilario/chiesa_santilario_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-santilario");
    if (!chk) return;

    if (!map.getPane("pane-santilario-blue")) {
      map.createPane("pane-santilario-blue");
      map.getPane("pane-santilario-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-santilario-azzurri")) {
      map.createPane("pane-santilario-azzurri");
      map.getPane("pane-santilario-azzurri").style.zIndex = 651;
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
      pane: "pane-santilario-blue",
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
          "Zooma per vedere i punti di Sant'Ilario.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-santilario-azzurri",
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

    if (!chk.__wiredSwap_santilario) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_santilario = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
