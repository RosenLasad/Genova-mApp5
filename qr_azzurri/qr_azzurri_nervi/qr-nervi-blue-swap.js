(function () {
  var data = {
    parent: {
      id: "nervi",
      label: "Nervi",
      lat: 44.381576305898534,
      lng: 9.039965691324698
    },
    children: [
{
  id: "nervi_viale_delle_palme",
  label: "Viale delle Palme",
  lat: 44.381576305898534,
  lng: 9.039965691324698,
  descr: "Viale delle Palme a Nervi era un rettilineo alberato di circa 300 metri. Collegava la stazione ferroviaria alla zona centrale e al mare, rappresentando il biglietto da visita della celebre stazione climatica invernale amata dall'aristocrazia europea durante la Belle Époque.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_nervi/via_delle_palme_nervi_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_nervi/via_delle_palme_nervi_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-nervi");
    if (!chk) return;

    if (!map.getPane("pane-nervi-blue")) {
      map.createPane("pane-nervi-blue");
      map.getPane("pane-nervi-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-nervi-azzurri")) {
      map.createPane("pane-nervi-azzurri");
      map.getPane("pane-nervi-azzurri").style.zIndex = 651;
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
      pane: "pane-nervi-blue",
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
          "Zooma per vedere i punti di Nervi.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-nervi-azzurri",
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

    if (!chk.__wiredSwap_nervi) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_nervi = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
