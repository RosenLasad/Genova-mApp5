(function () {
  var data = {
    parent: {
      id: "pcorvetto",
      label: "Piazza Corvetto",
      lat: 44.410143552768105,
      lng: 8.93823682686794
    },
    children: [
      {
        id: "corvetto_ottobre",
        label: "Piazza Corvetto da Via XII ottobre",
        lat: 44.40942825849114, 
        lng: 8.938753373722692,
        descr: "Piazza Corvetto è uno dei nodi viari e urbanistici più eleganti di Genova, situato a ridosso del centro ottocentesco. Arrivando da Via XII Ottobre, la piazza si apre come un ampio e maestoso snodo circolare, arricchito da aiuole curate e dominato al centro dal grande monumento equestre dedicato a Vittorio Emanuele II.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_corvetto/corvetto_ottobre_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_corvetto/corvetto_ottobre_ieri_1.mp4", "qr_azzurri/qr_azzurri_corvetto/corvetto_ottobre_ieri_2.mp4", "qr_azzurri/qr_azzurri_corvetto/corvetto_ottobre_ieri_3.mp4"]
        }
      },
{
        id: "corvetto_piaggio",
        label: "Piazza Corvetto da Via Piaggio",
        lat: 44.41052707395092,  
        lng: 8.937909962344625,
        descr: "Piazza Corvetto vista da Via Piaggio, scendendo dalla circonvallazione a monte, offre un suggestivo affaccio dall’alto prima di immettersi nel centro cittadino. La prospettiva mette in risalto il dislivello di Genova e l’integrazione tra aree verdi e viabilità ottocentesca.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_corvetto/corvetto_piaggio_oggi.mp4",
          ieri: ["qr_azzurri/qr_azzurri_corvetto/corvetto_piaggio_ieri_1.mp4", "qr_azzurri/qr_azzurri_corvetto/corvetto_piaggio_ieri_2.mp4"]
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
  }catch(_){ }

  try{
    window.__qrBuildAll && window.__qrBuildAll();
  }catch(_){ }


  whenMapReady(function () {
    var parent = data.parent, kids = data.children || [];
    var chk = document.getElementById("chk-qr-pcorvetto");
    if (!chk) return;

    if (!map.getPane("pane-pcorvetto-blue")) {
      map.createPane("pane-pcorvetto-blue");
      map.getPane("pane-pcorvetto-blue").style.zIndex = 650;
    }
    if (!map.getPane("pane-pcorvetto-azzurri")) {
      map.createPane("pane-pcorvetto-azzurri");
      map.getPane("pane-pcorvetto-azzurri").style.zIndex = 651;
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
      pane: "pane-pcorvetto-blue",
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

    // Nota: testo lasciato identico al tuo (anche se dice "Caricamento").
    blue.on("click", function () {
      if (window.__qrOpenChildPanel) {
        window.__qrOpenChildPanel(
          parent.label || "",
          "Zooma per vedere i punti di Piazza Corvetto.",
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
        pane: "pane-pcorvetto-azzurri",
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

    if (!chk.__wiredSwap_pcorvetto) {
      chk.addEventListener("change", update);
      chk.__wiredSwap_pcorvetto = true;
    }
    map.on("zoomend", update);
    update();
  });
})();
