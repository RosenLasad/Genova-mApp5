(function () {
  var data = {
    parent: { id: "piazza_dante", label: "Piazza Dante", lat: 44.405401869668395, lng: 8.935780907388263 },
    children: [
      {
        id: "galleria",
        label: "Galleria di Piazza Dante",
        lat: 44.40530925255768,
        lng: 8.935857429434225,
        descr: "Galleria di Piazza Dante.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_dante/qr_azzurri_piazza_dante_galleria/qr_azzurri_piazza_dante_galleria_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_piazza_dante/qr_azzurri_piazza_dante_galleria/qr_azzurri_piazza_dante_galleria_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_piazza_dante/qr_azzurri_piazza_dante_galleria/qr_azzurri_piazza_dante_galleria_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_piazza_dante/qr_azzurri_piazza_dante_galleria/qr_azzurri_piazza_dante_galleria_ieri_3.mp4"
          ]
        }
      },
      {
        id: "ponticello",
        label: "Piazza Ponticello",
        lat: 44.40514306896972,
        lng: 8.936474916463442,
        descr: "Piazza Ponticello con la fontana",
        media: {
          oggi: "qr_azzurri/qr_azzurri_piazza_dante/qr_azzurri_piazza_dante_ponticello/qr_azzurri_piazza_dante_ponticello_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_piazza_dante/qr_azzurri_piazza_dante_ponticello/qr_azzurri_piazza_dante_ponticello_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_piazza_dante/qr_azzurri_piazza_dante_ponticello/qr_azzurri_piazza_dante_ponticello_ieri_2.mp4"
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
