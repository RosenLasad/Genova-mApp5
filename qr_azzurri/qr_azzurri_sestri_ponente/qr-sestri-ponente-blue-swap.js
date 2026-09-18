(function () {
  var data = {
    parent: {
      id: "sestri-ponente",
      label: "Sestri Ponente",
      lat: 44.42551643389541,
      lng: 8.849659024174414
    },
    children: [
{
  id: "sestri_ponente_piazza_baracca",
  label: "Piazza Francesco Baracca",
  lat: 44.425317844773225,
  lng: 8.8494196481615,
  descr: "Basilica di Nostra Signora Assunta a Sestri Ponente, sorta tra il 1610 e il 1620 in prossimità della allora spiaggia con l'ingresso rivolto a nord per ripararsi dalle mareggiate, si presentava a fine Ottocento come il fulcro monumentale e religioso del borgo marinaro, inserita in un contesto urbano e costiero ancora integro e non stravolto dai successivi interramenti industriali e dalla facciata rifatta nel 1928.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_sestri_ponente/piazza_baracca_sestri_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_sestri_ponente/piazza_baracca_sestri_ieri.mp4"]
  }
},
{
  id: "sestri_ponente_teatro_verdi",
  label: "Teatro Giuseppe Verdi",
  lat: 44.42571502302159,
  lng: 8.84989840018733,
  descr: "Teatro Verdi di Sestri Ponente fu costruito tra il 1898 e il 1899 su iniziativa dell'impresario Giacomo Bo e del costruttore Bartolomeo Merlo. Inaugurato nell'estate del 1899 nel comune all'epoca autonomo, assunse l'attuale intitolazione nel 1901 in omaggio a Giuseppe Verdi, configurandosi come uno dei principali punti di riferimento culturali dell'area.",
  media: {
    oggi: "qr_azzurri/qr_azzurri_sestri_ponente/teatro_verdi_oggi.mp4",
    ieri: ["qr_azzurri/qr_azzurri_sestri_ponente/teatro_verdi_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-sestri-ponente");
    if (!chk) return;

    if (!map.getPane("pane-sestri-ponente-blue")) {
      map.createPane("pane-sestri-ponente-blue");
      map.getPane("pane-sestri-ponente-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-sestri-ponente-azzurri")) {
      map.createPane("pane-sestri-ponente-azzurri");
      map.getPane("pane-sestri-ponente-azzurri").style.zIndex = 651;
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
      pane: "pane-sestri-ponente-blue",
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
          "Zooma per vedere i punti di Sestri Ponente.",
          { oggi: null, ieri: [] }
        );
      }
    });

    var group = L.layerGroup();
    (kids || []).forEach(function (c) {
      var m = L.marker([c.lat, c.lng], {
        pane: "pane-sestri-ponente-azzurri",
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

    if (!chk.__wiredSwap_sestri_ponente) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_sestri_ponente = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
