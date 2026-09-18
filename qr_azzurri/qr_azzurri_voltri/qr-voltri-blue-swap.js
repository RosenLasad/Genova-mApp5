(function () {
  var data = {
    parent: {
      id: "voltri",
      label: "Voltri",
      lat: 44.42955678333109,
      lng: 8.759302978754299
    },
    children: [
      {
        id: "voltri_aurelia",
        label: "Via Aurelia",
        lat: 44.42845109774109,
        lng: 8.753739998223962,
        descr: "Via Aurelia (OGGI), prima si chiamava Corso Garibaldi (IERI).",
        media: {
          oggi: "qr_azzurri/qr_azzurri_voltri/voltri_aurelia_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_voltri/voltri_aurelia_ieri_1.mp4"]
        }
      },
      {
        id: "voltri_panorama",
        label: "Veduta panoramica di Voltri",
        lat: 44.43124355932475,
        lng: 8.744441120796079,
        descr: "A fine Ottocento, Voltri era un florido comune autonomo dell'estremo ponente ligure, celebre come dinamico polo industriale e manifatturiero basato sulle storiche cartiere e sui cantieri navali.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_voltri/panoramica_voltri_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_voltri/panoramica_voltri_ieri.mp4"]
        }
      },
      {
        id: "voltri_municipio",
        label: "Municipio",
        lat: 44.428322247873034,
        lng: 8.751501857440704,
        descr: "A fine Ottocento e nei primi del Novecento, il Municipio di Voltri era la sede amministrativa di un comune autonomo in forte espansione industriale. L'edificio e l'area municipale riflettevano l'identità di un borgo operaio e mercantile.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_voltri/municipio_voltri_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_voltri/municipio_voltri_ieri.mp4"]
        }
      },
      {
        id: "voltri_san_giuliano",
        label: "Via San Giuliano",
        lat: 44.428452117841196,
        lng: 8.757755183211586,
        descr: "La ferrovia raggiunse Voltri nel 1856 e passava accanto a Via San Giuliano, seguendo il litorale.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_voltri/via_san_giuliano_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_voltri/via_san_giuliano_ieri.mp4"]
        }
      },
      {
        id: "voltri_stazione",
        label: "Stazione ferroviaria",
        lat: 44.42845994898313,
        lng: 8.756971593783922,
        descr: "La ferrovia raggiunse Voltri nel 1856, creando uno dei primi collegamenti ferroviari moderni tra il ponente e Genova. La stazione di Voltri si affacciava sulla strada, dove in seguito passarono anche i binari tranviari, ed era frequentata da viaggiatori, carrozze e mezzi trainati da cavalli.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_voltri/stazione_voltri_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_voltri/stazione_voltri_ieri.mp4"]
        }
      },
      {
        id: "voltri_nicolo_erasmo",
        label: "Chiesa dei Santi Nicolò ed Erasmo",
        lat: 44.428030604627864,
        lng: 8.74923155898577,
        descr: "La Chiesa dei Santi Nicolò ed Erasmo è un grande edificio barocco del XVII secolo a Voltri (Genova), nato sul sito di un'antica cappella dei marinai. Conserva tre navate, ricchi marmi policromi e tele di pregiati artisti genovesi come Domenico Piola e Giovanni Ansaldo.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_voltri/chiesa_nicolo_erasmo_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_voltri/chiesa_nicolo_erasmo_ieri.mp4"]
        }
      },
      {
        id: "voltri_piazza_lerda",
        label: "Piazza Lerda",
        lat: 44.428425427529845,
        lng: 8.754407843378614,
        descr: "A fine Ottocento, la futura Piazza Giovanni Lerda a Voltri era nota come la piazza dello scalo (ciassa do sca'), un vivace snodo commerciale e di passaggio affacciato verso la costa e legato alle attività marinare e di trasporto del borgo.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_voltri/piazza_lerda_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_voltri/piazza_lerda_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-voltri");
    if (!chk) return;

    if (!map.getPane("pane-voltri-blue")) {
      map.createPane("pane-voltri-blue");
      map.getPane("pane-voltri-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-voltri-azzurri")) {
      map.createPane("pane-voltri-azzurri");
      map.getPane("pane-voltri-azzurri").style.zIndex = 651;
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
      pane: "pane-voltri-blue",
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
          "Zooma per vedere i punti di Voltri.",
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
        pane: "pane-voltri-azzurri",
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

    if (!chk.__wiredSwap_voltri) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_voltri = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
