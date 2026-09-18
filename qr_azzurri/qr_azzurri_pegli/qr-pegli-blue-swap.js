(function () {
  var data = {
    parent: {
      id: "pegli",
      label: "Pegli",
      lat: 44.424,
      lng: 8.81
    },
    children: [
{
  id: "pegli_via_mazzini",
  label: "Via Mazzini",
  lat: 44.42347114580973,
  lng: 8.808972421397113,
  descr: "A fine Ottocento e nei primi del Novecento, l'attuale via Pegli (allora nota come via Mazzini) era l'asse viario storico e il cuore pulsante del Comune di Pegli, prima del suo accorpamento nella Grande Genova. La strada si presentava come un vivace borgo marinaro e una rinomata stazione climatica affacciata sul mare.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_pegli/via_mazzini_pegli_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_pegli/via_mazzini_pegli_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-pegli");
    if (!chk) return;

    if (!map.getPane("pane-pegli-blue")) {
      map.createPane("pane-pegli-blue");
      map.getPane("pane-pegli-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-pegli-azzurri")) {
      map.createPane("pane-pegli-azzurri");
      map.getPane("pane-pegli-azzurri").style.zIndex = 651;
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
      pane: "pane-pegli-blue",
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
          "Zooma per vedere i punti di Pegli.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-pegli-azzurri",
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

    if (!chk.__wiredSwap_pegli) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_pegli = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
