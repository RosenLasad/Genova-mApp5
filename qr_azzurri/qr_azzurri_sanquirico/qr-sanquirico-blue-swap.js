(function () {
  var data = {
    parent: {
      id: "sanquirico",
      label: "San Quirico",
      lat: 44.47556035745746,
      lng: 8.90005758046
    },
    children: [
{
  id: "sanquirico_via_san_quirico",
  label: "Via San Quirico",
  lat: 44.47556035745746,
  lng: 8.90005758046,
  descr: "Tra fine Ottocento e inizio Novecento, via San Quirico attraversava il cuore dell’omonimo comune autonomo della Val Polcevera. Il borgo conservava ancora un carattere rurale, con case, orti e ville distribuiti lungo la strada principale, prima dell’annessione alla Grande Genova nel 1926.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_sanquirico/via_san_quirico_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_sanquirico/via_san_quirico_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-sanquirico");
    if (!chk) return;

    if (!map.getPane("pane-sanquirico-blue")) {
      map.createPane("pane-sanquirico-blue");
      map.getPane("pane-sanquirico-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-sanquirico-azzurri")) {
      map.createPane("pane-sanquirico-azzurri");
      map.getPane("pane-sanquirico-azzurri").style.zIndex = 651;
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
      pane: "pane-sanquirico-blue",
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
          "Zooma per vedere i punti di San Quirico.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-sanquirico-azzurri",
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

    if (!chk.__wiredSwap_sanquirico) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_sanquirico = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
