(function(){
  var data = {
    parent: {
      id: "circonvallazione_a_mare",
      label: "Circonvallazione a mare",
      lat: 44.39899662364175,
      lng: 8.935237540307359
    },
    children: [
      {
        id: "batteria_cava",
        label: "Batteria Cava",
        lat: 44.399370333685546,
        lng: 8.933693779993408,
        descr: "Prima dell’apertura della Circonvallazione a mare, questo tratto delle mura di Carignano ospitava la batteria militare della Cava. La nuova strada costiera, realizzata alla fine dell’Ottocento, trasformò profondamente il versante; nei primi anni del Novecento anche Villa Mylius assunse il caratteristico assetto panoramico affacciato sul porto.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_a_mare_batteria_cava_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_a_mare_batteria_cava_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_a_mare_batteria_cava_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_a_mare_batteria_cava_ieri_3.mp4"
          ]
        }
      },

{"id": "circo_su_porto", "label": "Circonvallazione su porto", "lat": 44.39855638531238, "lng": 8.935169157080345, "descr": "La Circonvallazione a mare fu aperta nell’ultimo decennio dell’Ottocento attraverso grandi riempimenti lungo le scogliere che lambivano le mura cittadine. La nuova arteria creò un collegamento costiero sotto Carignano e modificò radicalmente il rapporto tra la città, le antiche fortificazioni e il porto.", "media": {"oggi": "qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_su_porto_oggi.mp4", "ieri": ["qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_su_porto_ieri_1.mp4"]}},

{"id": "circo_villa", "label": "Circonvallazione sotto villa Mylius", "lat": 44.40064071956476, "lng": 8.932509521345523, "descr": "Villa Mylius, poi Villa Figari, sorgeva in posizione scenografica sopra la scogliera, con giardini digradanti verso il mare. La costruzione della Circonvallazione a mare alla fine dell’Ottocento inserì una nuova arteria tra la villa e la costa, modificando profondamente il paesaggio originario.", "media": {"oggi": "qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_sotto_villa_oggi.mp4", "ieri": ["qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_sotto_villa_ieri_1.mp4", "qr_azzurri/qr_azzurri_circonvallazione_a_mare/qr_azzurri_circonvallazione_sotto_villa_ieri_2.mp4"]}},


      {
        id: "discesa_ruffini",
        label: "Discesa via Ruffini",
        lat: 44.39842680714706,
        lng: 8.935940957919595,
        descr: "Via Jacopo Ruffini scende dal quartiere di Carignano verso corso Aurelio Saffi, lungo il tratto orientale della Circonvallazione a mare. L’apertura della nuova strada costiera, ottenuta con riempimenti lungo le scogliere, trasformò questo versante e rafforzò il collegamento tra Carignano e il litorale.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_circonvallazione_a_mare/ruffini_saffi_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_circonvallazione_a_mare/ruffini_saffi_ieri_1.mp4"
          ]
        }
      }
    ]
  };

  // Anti-doppione: se questo sorgente è già stato aggiunto, esci.
  var key = "__qr_src_added__" + (data.parent && data.parent.id ? data.parent.id : "circonvallazione_a_mare");
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
      if(publish() || (++tries > 60)){   // 60*100ms = 6s, più tollerante
        clearInterval(t);
        build();
      }
    }, 100);
  }else{
    build();
  }
})();
