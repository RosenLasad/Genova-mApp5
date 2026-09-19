(function () {
  var data = {
    parent: { id:"piazza_verdi", label:"Piazza Verdi", lat:44.40594576391882, lng:8.94637487391014 },
    children: [
      { "id": "palazzo_poste2", "label": "Il palazzo delle Poste in Piazza Verdi",
        "lat": 44.40651698103183, "lng": 8.945601061122955,
        "descr": "Il palazzo delle Poste in Piazza Verdi fu costruito nei primi anni Trenta, sostituendo precedenti edifici del quartiere sorti a ridosso delle antiche mura. La nuova costruzione accompagnò la profonda trasformazione urbanistica dell’area di Brignole e della vicina spianata del Bisagno.",
        "media": {
          "oggi": "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_palazzo_poste2/qr_azzurri_piazza_verdi_palazzo_poste2_oggi.mp4",
          "ieri": [
            "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_palazzo_poste2/qr_azzurri_piazza_verdi_palazzo_poste2_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_palazzo_poste2/qr_azzurri_piazza_verdi_palazzo_poste2_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_palazzo_poste2/qr_azzurri_piazza_verdi_palazzo_poste2_ieri_3.mp4"
          ]
        }
      },

      { "id": "stazione_brignole", "label": "La nuova Stazione Brignole",
        "lat": 44.40656178307441, "lng": 8.945880164032085,
        "descr": "La nuova Stazione Brignole fu progettata nel 1902 e completata nel 1905, in occasione dell’Esposizione Internazionale. Il nuovo fabbricato sostituì il precedente scalo ottocentesco e contribuì a trasformare Piazza Verdi in uno dei principali nodi ferroviari e urbani della città.",
        "media": {
          "minidoc": "stazione-brignole",
          "oggi": "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_stazione_brignole/qr_azzurri_piazza_verdi_stazione_brignole_oggi.mp4",
          "ieri": [
            "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_stazione_brignole/qr_azzurri_piazza_verdi_stazione_brignole_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_stazione_brignole/qr_azzurri_piazza_verdi_stazione_brignole_ieri_2.mp4"
          ]
        }
      },

      { "id": "porta_pila_viaxx", "label": "Porta Pila su Via XX settembre",
        "lat": 44.40463907083693, "lng": 8.945357854090963,
        "descr": "Porta Pila segnava l’ingresso orientale della città all’estremità di quella che sarebbe diventata Via XX Settembre. Rimasta isolata dopo la demolizione delle mura, fu smontata nel 1899 e ricostruita nel 1900 sotto il colle di Montesano, vicino alla stazione Brignole.",
        "media": {
          "minidoc": "fronti-basse",
          "oggi": "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_porta_pila_viaxx/qr_azzurri_piazza_verdi_porta_pila_viaxx_oggi.mp4",
          "ieri": [
"qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_porta_pila_viaxx/qr_azzurri_piazza_verdi_porta_pila_viaxx_ieri_1.mp4",
"qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_porta_pila_viaxx/qr_azzurri_piazza_verdi_porta_pila_viaxx_ieri_2.mp4",
"qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_porta_pila_viaxx/qr_azzurri_piazza_verdi_porta_pila_viaxx_ieri_3.mp4"
          ],
"sfx": [
"qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_porta_pila_viaxx/qr_azzurri_piazza_verdi_porta_pila_viaxx_sfx.mp4"
          ]
        }
      }
    ]
  };

  function publish() {
    try {
      if (window.__qrAddSource) { window.__qrAddSource(data.parent, data.children); return true; }
      window.__QR_SOURCES = window.__QR_SOURCES || [];
      window.__QR_SOURCES.push({ parent: data.parent, children: data.children });
      return true;
    } catch (e) { return false; }
  }

  if (!publish()) {
    var tries = 0;
    var t = setInterval(function () {
      if (publish() || (++tries > 30)) {
        clearInterval(t);
        try { window.__qrBuildAll && window.__qrBuildAll(); } catch (_) {}
      }
    }, 100);
  } else {
    try { window.__qrBuildAll && window.__qrBuildAll(); } catch (_) {}
  }
})();
