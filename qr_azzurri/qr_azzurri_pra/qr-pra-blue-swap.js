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
        descr: "Tra Ottocento e Novecento il litorale di Prà, ampio e sabbioso, divenne una frequentata località balneare. Accanto ai tradizionali cantieri navali sorsero stabilimenti attrezzati per il bagno e il soggiorno, dando al borgo una doppia identità marinara e turistica.",
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
        descr: "Alla fine dell’Ottocento Prà era ancora un comune autonomo, disteso tra il mare e le colline. Il paesaggio univa spiagge, attività marinare, cantieri navali, orti e ville, prima delle grandi trasformazioni industriali e portuali che nel Novecento modificarono profondamente il litorale.",
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
        descr: "La stazione di Prà entrò in funzione nell’Ottocento lungo la ferrovia costiera del Ponente. Il piccolo impianto serviva viaggiatori e merci ed era inserito tra il borgo e il mare, in un paesaggio poi profondamente trasformato dall’ampliamento della linea ferroviaria e del porto.",
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
        descr: "Il Castelluccio di Prà sorgeva su uno sperone roccioso a picco sul mare, in posizione dominante sul litorale. L’antico fortilizio fu modificato nell’Ottocento dal passaggio della ferrovia, che ne alterò la struttura e il rapporto originario con la costa.",
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
        descr: "Torre Cambiaso domina le alture tra Prà e Pegli, immersa in un grande parco panoramico. Nata da un’antica struttura difensiva, nel corso dell’Ottocento fu trasformata in una scenografica residenza signorile dall’aspetto neogotico, conservando elementi che ricordano la sua origine fortificata.",
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
        descr: "Palmaro possedeva un ampio litorale di sabbia e ciottoli, animato da pescatori, barche e piccoli cantieri navali. Per generazioni la spiaggia fu parte integrante della vita del borgo, prima che le trasformazioni portuali del Novecento modificassero radicalmente la linea di costa.",
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
        descr: "Palmaro era uno dei nuclei storici del territorio di Prà, caratterizzato da una forte relazione tra mare e campagna. Case, attività marinare, cantieri e fasce coltivate componevano un paesaggio costiero molto diverso da quello creato dalle successive trasformazioni urbane e portuali.",
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
