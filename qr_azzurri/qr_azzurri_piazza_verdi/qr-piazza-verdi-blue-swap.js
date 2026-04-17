(function () {
  var data = {
    parent: { id:"piazza_verdi", label:"Piazza Verdi", lat:44.40594576391882, lng:8.94637487391014 },
    children: [
      { "id": "palazzo_poste2", "label": "Il palazzo delle Poste in Piazza Verdi",
        "lat": 44.40651698103183, "lng": 8.945601061122955,
        "descr": "Il palazzo delle Poste in Piazza Verdi.",
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
        "descr": "La Stazione Brignole costruita nel 1905.",
        "media": {
          "oggi": "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_stazione_brignole/qr_azzurri_piazza_verdi_stazione_brignole_oggi.mp4",
          "ieri": [
            "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_stazione_brignole/qr_azzurri_piazza_verdi_stazione_brignole_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_piazza_verdi/qr_azzurri_piazza_verdi_stazione_brignole/qr_azzurri_piazza_verdi_stazione_brignole_ieri_2.mp4"
          ]
        }
      },

      { "id": "porta_pila_viaxx", "label": "Porta Pila su Via XX settembre",
        "lat": 44.40463907083693, "lng": 8.945357854090963,
        "descr": "Porta Pila su Via XX settembre.",
        "media": {
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
