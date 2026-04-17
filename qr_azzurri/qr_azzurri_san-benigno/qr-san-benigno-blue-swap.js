(function(){
  var data = {
    parent: {
      id: "san_benigno",
      label: "San Benigno",
      lat: 44.40860591163854,
      lng: 8.9064106282727
    },
    children: [
      {
        id: "colle_sanbenigno",
        label: "Colle di San Benigno",
        lat: 44.41092421681016,
        lng: 8.907769957856738,
        descr: "Colle di San Benigno affacciato sul golfo.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_san-benigno/qr_azzurri_san_benigno_colle_sanbenigno/qr_azzurri_san_benigno_colle_sanbenigno_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_san-benigno/qr_azzurri_san_benigno_colle_sanbenigno/qr_azzurri_san_benigno_colle_sanbenigno_ieri_1.mp4"
          ]
        }
      },
{
        id: "caserma_sanbenigno",
        label: "Caserma di San Benigno",
        lat: 44.40854477692903, 
        lng: 8.908148550099648,
        descr: "Caserma di San Benigno, accanto alla Lanterna.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_san-benigno/caserma_sanbenigno_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_san-benigno/caserma_sanbenigno_ieri_1.mp4"
          ],
sfx: [
            "qr_azzurri/qr_azzurri_san-benigno/caserma_sanbenigno_sfx.mp4"
          ]
        }
      },
      {
        id: "lanterna",
        label: "La Lanterna",
        lat: 44.40548101050629,
        lng: 8.906294614297556,
        descr: "La Lanterna di Genova.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_san-benigno/qr_azzurri_san_benigno_lanterna/qr_azzurri_san_benigno_lanterna_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_san-benigno/qr_azzurri_san_benigno_lanterna/qr_azzurri_san_benigno_lanterna_ieri_1.mp4"
          ]
        }
      }
    ]
  };

  // Anti-doppione: evita di aggiungere due volte la stessa sorgente
  var key = "__qr_src_added__" + (data.parent && data.parent.id ? data.parent.id : "san_benigno");
  if (window[key]) return;
  window[key] = true;

  function publish(){
    try{
      if (window.__qrAddSource) {
        window.__qrAddSource(data.parent, data.children);
        return true;
      }
      window.__QR_SOURCES = window.__QR_SOURCES || [];
      window.__QR_SOURCES.push({ parent: data.parent, children: data.children });
      return true;
    }catch(e){
      return false;
    }
  }

  function build(){
    try { window.__qrBuildAll && window.__qrBuildAll(); } catch(_) {}
  }

  if(!publish()){
    var tries = 0;
    var t = setInterval(function(){
      if (publish() || (++tries > 60)) { // più tollerante: fino a 6s
        clearInterval(t);
        build();
      }
    }, 100);
  } else {
    build();
  }
})();
