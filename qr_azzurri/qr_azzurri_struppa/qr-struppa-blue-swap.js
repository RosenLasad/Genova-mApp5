(function () {
  var data = {
    parent: {
      id: "struppa",
      label: "Struppa",
      lat: 44.44972770335052,
      lng: 9.017623068910106
    },
    children: [
{
  id: "struppa_via_nazionale",
  label: "Via Nazionale",
  lat: 44.44972770335052,
  lng: 9.017623068910106,
  descr: "Via Nazionale era uno degli assi principali della media Val Bisagno e attraversava il territorio dell’allora comune autonomo di Struppa. Tra fine Ottocento e inizio Novecento collegava borghi e campagne lungo la valle, prima che la progressiva urbanizzazione trasformasse profondamente il paesaggio rurale circostante.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_struppa/via_nazionale_struppa_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_struppa/via_nazionale_struppa_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-struppa");
    if (!chk) return;

    if (!map.getPane("pane-struppa-blue")) {
      map.createPane("pane-struppa-blue");
      map.getPane("pane-struppa-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-struppa-azzurri")) {
      map.createPane("pane-struppa-azzurri");
      map.getPane("pane-struppa-azzurri").style.zIndex = 651;
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
      pane: "pane-struppa-blue",
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
          "Zooma per vedere i punti di Struppa.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-struppa-azzurri",
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

    if (!chk.__wiredSwap_struppa) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_struppa = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
