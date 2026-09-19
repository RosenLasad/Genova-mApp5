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
        descr: "La Via Aurelia attraversa Voltri lungo la storica direttrice costiera del Ponente genovese. Nel centro del borgo il percorso assume i nomi di via Camozzini e via Ventimiglia; per secoli ha collegato abitazioni, attività commerciali e il fronte marittimo, accompagnando la crescita del paese.",
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
        descr: "Alla fine dell’Ottocento Voltri era ancora un comune autonomo e uno dei centri più attivi del Ponente. Il paesaggio univa il borgo costiero, le colline e una forte presenza manifatturiera, alimentata soprattutto dalle storiche cartiere dell’entroterra e dalle attività cantieristiche e marinare.",
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
        descr: "Tra Ottocento e primo Novecento il Municipio di Voltri era il centro amministrativo di un comune autonomo in forte crescita. Attorno all’edificio si concentravano servizi, commerci e vita pubblica, in un borgo caratterizzato da una vivace economia industriale, artigianale, marittima e mercantile.",
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
        descr: "La ferrovia raggiunse Voltri nel 1856 e correva lungo il litorale, passando accanto a Via San Giuliano. L’arrivo dei binari modificò il rapporto tra il borgo e il mare e rese Voltri uno dei primi centri del Ponente collegati direttamente a Genova per ferrovia.",
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
        descr: "La stazione ferroviaria di Voltri entrò in funzione nel 1856 con l’apertura della linea proveniente da Sampierdarena. Affacciata sulla viabilità del borgo, divenne rapidamente un punto di scambio per viaggiatori e merci; in seguito, nelle strade vicine comparvero anche i binari delle linee tranviarie.",
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
        descr: "La chiesa dei Santi Nicolò ed Erasmo, legata alla tradizione marinara di Voltri, assunse l’attuale aspetto barocco nel Seicento sul luogo di un edificio religioso più antico. L’interno conserva tre navate, ricchi marmi policromi e importanti opere di artisti della scuola genovese.",
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
        descr: "Alla fine dell’Ottocento l’attuale Piazza Giovanni Lerda era conosciuta come “ciassa do sca’”, la piazza dello scalo. La vicinanza alla ferrovia e al litorale ne faceva un vivace punto di passaggio, incontro e commercio, strettamente legato ai trasporti e alle attività marinare di Voltri.",
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

    function showKids() { try { blue.removeFrom(map); } catch (e) {} try { group.addTo(map); } catch (e) {} }
    function hideAll()  { try { blue.removeFrom(map); } catch (e) {} try { group.removeFrom(map); } catch (e) {} }

    function update() {
      var on = !!(chk && chk.checked);
      if (!on) { hideAll(); return; }
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
