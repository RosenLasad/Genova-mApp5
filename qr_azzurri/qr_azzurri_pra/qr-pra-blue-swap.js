(function () {
  var data = {
    parent: {
      id: "pra",
      label: "Prà",
      lat: 44.427971539845586,
      lng: 8.783185308652554
    },
    children: [
      {
        id: "pra_stabilimenti_balneari",
        label: "Gli stabilimenti balneari",
        lat: 44.42818232336817,
        lng: 8.764869113187887,
        descr: "A fine Ottocento il litorale di Prà univa la tradizione dei cantieri navali, specializzati anche nella costruzione di brigantini, a una crescente vocazione balneare. L'ampia spiaggia sabbiosa cominciava ad accogliere stabilimenti e strutture dedicate alla balneazione terapeutica e ricreativa.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_pra/stabilimenti_balneari_pra_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_pra/stabilimenti_balneari_pra_ieri.mp4"]
        }
      },
      {
        id: "pra_panorama",
        label: "Panorama di Prà",
        lat: 44.42656242260401,
        lng: 8.78837592651926,
        descr: "A fine Ottocento, Prà era un florido e industrioso comune autonomo, caratterizzato da un equilibrio tra mare, agricoltura e le prime attività industriali.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_pra/panorama_pra_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_pra/panorama_pra_ieri.mp4"]
        }
      },
      {
        id: "pra_stazione",
        label: "La stazione ferroviaria",
        lat: 44.427142989105654,
        lng: 8.784919288715662,
        descr: "La stazione di Prà fu inaugurata nel 1856 con l'apertura della ferrovia Sampierdarena-Voltri. A fine Ottocento si presentava come un impianto semplice, servito da treni a vapore e adeguato al traffico viaggiatori e merci dell'epoca. La linea era ancora a binario unico; oltre al binario di transito erano presenti binari di servizio per lo scalo merci e un piccolo magazzino.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_pra/stazione_pra_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_pra/stazione_pra_ieri.mp4"]
        }
      },
      {
        id: "pra_castelluccio",
        label: "Forte Castelluccio",
        lat: 44.424676426471606,
        lng: 8.800336466612672,
        descr: "Il Castelluccio di Prà era un antico fortilizio del XV secolo in posizione dominante su un roccione a picco sul mare a levante del borgo. A fine Ottocento la sua struttura quadrata originaria risultava modificata e tagliata sul lato nord per fare spazio al passaggio della linea ferroviaria Genova-Savona, assumendo una forma pentagonale e perdendo l'accesso carraio originario.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_pra/forte_castelluccio_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_pra/forte_castelluccio_ieri.mp4"]
        }
      },
      {
        id: "pra_torre_cambiaso",
        label: "Torre Cambiaso",
        lat: 44.43320302866828,
        lng: 8.800861843093932,
        descr: "A fine Ottocento, Torre Cambiaso, situata sulle alture tra Prà e Pegli, si presentava come una suggestiva residenza signorile. Trasformata da antica torre di guardia degli Spinola in un castello neogotico dall'architetto G.B. Novaro, univa elementi militari a una vivace facciata rosa e a un grande parco panoramico sul golfo.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_pra/torre_cambiaso_pra_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_pra/torre_cambiaso_pra_ieri.mp4"]
        }
      },
      {
        id: "pra_spiaggia_palmaro",
        label: "La spiaggia di Palmaro",
        lat: 44.42792609473346,
        lng: 8.769083121286867,
        descr: "Prà era un vivace litorale sabbioso e ghiaioso affacciato su un mare limpido, caratterizzato da una forte vocazione marinara e operosa, animato da cantieri navali per la costruzione di brigantini, dalle reti stese al sole dai pescatori e dalle vicine dimore storiche.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_pra/palmaro_spiaggia_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_pra/palmaro_spiaggia_ieri.mp4"]
        }
      },
      {
        id: "pra_veduta_palmaro",
        label: "Veduta di Palmaro",
        lat: 44.42810749396792,
        lng: 8.773851401151598,
        descr: "Palmaro è un antico e vivace borgo marinaro e agricolo, frazione e sestiere di Prà. Il paesaggio unisce la vita della spiaggia e dei cantieri navali alle fasce coltivate dell'entroterra.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_pra/veduta_palmaro_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_pra/veduta_palmaro_ieri.mp4"]
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
    var chk = document.getElementById("chk-qr-pra");
    if (!chk) return;

    if (!map.getPane("pane-pra-blue")) {
      map.createPane("pane-pra-blue");
      map.getPane("pane-pra-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-pra-azzurri")) {
      map.createPane("pane-pra-azzurri");
      map.getPane("pane-pra-azzurri").style.zIndex = 651;
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
      pane: "pane-pra-blue",
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
          "Zooma per vedere i punti di Prà.",
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
        pane: "pane-pra-azzurri",
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

    if (!chk.__wiredSwap_pra) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_pra = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
