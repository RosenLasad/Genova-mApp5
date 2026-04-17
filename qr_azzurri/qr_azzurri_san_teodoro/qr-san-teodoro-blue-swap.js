(function(){
  var data = {
    parent: {
      id: "san_teodoro",
      label: "San Teodoro",
      lat: 44.41327678348855,
      lng: 8.912803551283531
    },
    children: [
      {
        id: "chiesa_san_teodoro",
        label: "Chiesa di San Teodoro",
        lat: 44.41411680135029,
        lng: 8.912787024088976,
        media: {
          oggi: "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_chiesa_san_teodoro/qr_azzurri_san_teodoro_chiesa_san_teodoro_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_chiesa_san_teodoro/qr_azzurri_san_teodoro_chiesa_san_teodoro_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_chiesa_san_teodoro/qr_azzurri_san_teodoro_chiesa_san_teodoro_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_chiesa_san_teodoro/qr_azzurri_san_teodoro_chiesa_san_teodoro_ieri_3.mp4"
          ]
        }
      },
      {
        id: "nuova_san_teodoro",
        label: "Nuova San Teodoro",
        lat: 44.41376302867822,
        lng: 8.911975948643079,
        media: {
          oggi: "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_nuova_san_teodoro/qrcode-santeodoro3-oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_nuova_san_teodoro/qrcode-santeodoro3-ieri_1.mp4",
            "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_nuova_san_teodoro/qrcode-santeodoro3-ieri_2.mp4"
          ]
        }
      },
      {
        id: "via_buozzi",
        label: "Via Buozzi",
        lat: 44.415425038651,
        lng: 8.915736603612464,
        media: {
          oggi: "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_via_buozzi/qrcode-santeodoro1-oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_via_buozzi/qrcode-santeodoro1-ieri_1.mp4",
            "qr_azzurri/qr_azzurri_san_teodoro/qr_azzurri_san_teodoro_via_buozzi/qrcode-santeodoro1-ieri_2.mp4"
          ]
        }
      }
    ]
  };

  // Anti-doppione: se incluso due volte, non raddoppia la source
  var key = "__qr_src_added__" + (data.parent && data.parent.id ? data.parent.id : "san_teodoro");
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
      if (publish() || (++tries > 60)) { // fino a 6s, così non ti frega il timing
        clearInterval(t);
        build();
      }
    }, 100);
  } else {
    build();
  }
})();
