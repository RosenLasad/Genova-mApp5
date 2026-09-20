(function(){
  // Anti-doppione: se questo script viene incluso due volte, non raddoppia i marker
  if (window.__qr_leaflet_swap__castello) return;
  window.__qr_leaflet_swap__castello = true;

  var data = {
    parent: { id:"castello", label:"Castello", lat:44.4051050868956, lng:8.93028356170811 },
    children: [
      {
        id: "via_fieschi",
        label: "Via Fieschi",
        lat: 44.40400925255768,
        lng: 8.935857429434225,
        descr: "Via Fieschi fu aperta tra il 1865 e il 1870 su un progetto ideato da Carlo Barabino decenni prima. Collegava Carignano a piazza Ponticello; negli anni Trenta del Novecento fu prolungata verso via XX Settembre, mentre le trasformazioni successive modificarono profondamente il quartiere circostante.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_via_fieschi/qr_azzurri_castello_via_fieschi_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_via_fieschi/qr_azzurri_castello_via_fieschi_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_via_fieschi/qr_azzurri_castello_via_fieschi_ieri_2.mp4",
            "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_via_fieschi/qr_azzurri_castello_via_fieschi_ieri_3.mp4"
          ]
        }
      },
      {
        id: "sarzano",
        label: "Seno di Giano",
        lat: 44.40317155823251,
        lng: 8.9306031569551,
        descr: "Fino alla fine dell’Ottocento, in questa zona le Mura delle Grazie segnavano il limite della città verso il mare, che arrivava direttamente ai loro piedi. La costruzione della Circonvallazione a mare allontanò la linea di costa, trasformando radicalmente il rapporto tra le mura, il porto e il litorale.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_seno_di_giano/qr_azzurri_castello_seno_di_giano_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_seno_di_giano/qr_azzurri_castello_seno_di_giano_ieri_1.mp4"
          ]
        }
      },

{
        id: "campana",
        label: "Scoglio Campana",
        lat: 44.40338522320385,
        lng: 8.931322940778454,
        descr: "Lo Scoglio Campana emergeva davanti alle Mura delle Grazie, in un tratto dove il mare arrivava direttamente ai piedi delle fortificazioni. Raffigurato anche in vedute ottocentesche, scomparve dal paesaggio con i riempimenti e le trasformazioni viarie che modificarono profondamente l’antica insenatura della Marina.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_scoglio_campana/qr_azzurri_castello_scoglio_campana_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_scoglio_campana/qr_azzurri_castello_scoglio_campana_ieri_1.mp4"
          ]
        }
      },
      {
        id: "mura_grazie",
        label: "Mura delle Grazie",
        lat: 44.40382060888646,
        lng: 8.930566983445246,
        descr: "Le Mura delle Grazie fanno parte della cinta fortificata cinquecentesca di Genova e segnavano qui il limite della città verso il mare. Prima dei grandi riempimenti ottocenteschi, le onde arrivavano direttamente sotto le mura; la nuova viabilità costiera allontanò progressivamente la linea di riva.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_mura_grazie/qr_azzurri_castello_mura_grazie_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_mura_grazie/qr_azzurri_castello_mura_grazie_ieri_1.mp4"
          ]
        }
      },
      {
        id: "piazzetta",
        label: "Piazzetta",
        lat: 44.40287052449395,
        lng: 8.932006353117693,
        descr: "All’estremità dell’antico quartiere della Marina, vicino a Via Madre di Dio, si apriva una piccola piazza accanto alle mura che attraversavano l’insenatura. Le trasformazioni urbanistiche e viarie del Novecento modificarono completamente questo spazio, lasciando solo alcuni elementi delle fortificazioni storiche come riferimento.",
        media: {
          oggi: "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_piazzetta/qr_azzurri_castello_piazzetta_oggi.mp4",
          ieri: [
            "qr_azzurri/qr_azzurri_castello/qr_azzurri_castello_piazzetta/qr_azzurri_castello_piazzetta_ieri_1.mp4"
          ]
        }
      }
    ]
  };

  function publishGlobal(){
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

  if(!publishGlobal()){
    var __tries = 0;
    var __t = setInterval(function(){
      if(publishGlobal() || (++__tries > 30)){
        clearInterval(__t);
        try{ window.__qrBuildAll && window.__qrBuildAll(); }catch(_){}
      }
    }, 120);
  }else{
    try{ window.__qrBuildAll && window.__qrBuildAll(); }catch(_){}
  }


  whenMapReady(function(){
    var parent = data.parent, kids = data.children || [];
    var chk = document.getElementById('chk-qr-castello');
    if(!chk) return;

    if(!map.getPane('pane-castello-blue')){
      map.createPane('pane-castello-blue');
      map.getPane('pane-castello-blue').style.zIndex = 650;
    }
    if(!map.getPane('pane-castello-azzurri')){
      map.createPane('pane-castello-azzurri');
      map.getPane('pane-castello-azzurri').style.zIndex = 651;
    }

    // Fallback: se blueIcon non esiste, lo creiamo
    var blueIconLocal = window.blueIcon;
    if(!blueIconLocal){
      blueIconLocal = L.divIcon({
        className: 'qr-blue-parent',
        iconSize: [16,14],
        iconAnchor: [8,14],
        html: '<div class="qr-triangle"></div>'
      });
      window.blueIcon = blueIconLocal;
    }

    var azzIcon = L.icon({
      iconUrl:'qr_azzurri/marker-azzurro-qr-notch-24.svg',
      iconSize:[24,26],
      iconAnchor:[12,26],
      className:'qr-azzurro-icon'
    });

    var blue = L.marker([parent.lat, parent.lng], {
      pane:'pane-castello-blue',
      icon: blueIconLocal,
      title: parent.label
    });

    try{ blue.off('click'); }catch(e){}
    if(blue.bindTooltip) blue.bindTooltip(parent.label || '', {permanent:false, direction:'right', offset:[8,0], className:'qr-tooltip'});
    blue.on('click', function(){
      if(window.__qrOpenChildPanel) window.__qrOpenChildPanel(parent.label||'', "Zooma per vedere i punti di Castello.", {oggi:null, ieri:[]});
    });

    var group = L.layerGroup();
    (kids||[]).forEach(function(c, idx){
      var lat = c.lat, lng = c.lng;

      if (Math.abs((lat||0) - (parent.lat||0)) < 1e-7 && Math.abs((lng||0) - (parent.lng||0)) < 1e-7) {
        var offs = [[0,0.00035],[0.0003,0],[-0.00028,-0.00022],[0.00022,-0.00025]];
        var d = offs[idx%offs.length];
        lat += d[0]; lng += d[1];
      }

      var m = L.marker([lat, lng], { pane:'pane-castello-azzurri', icon: azzIcon, title:c.label });
      if(m.bindTooltip) m.bindTooltip(c.label || '', {permanent:false, direction:'right', offset:[8,0], className:'qr-tooltip'});
      m.on('click', function(){
        if(window.__qrOpenChildPanel) window.__qrOpenChildPanel(c.label||'', c.descr||'', c.media||{oggi:null, ieri:[]});
      });
      group.addLayer(m);
    });

    function showKids(){ try{ blue.removeFrom(map); }catch(e){} try{ group.addTo(map); }catch(e){} }
    function hideAll(){ try{ blue.removeFrom(map); }catch(e){} try{ group.removeFrom(map); }catch(e){} }

    function update(){
      var on = !!(chk && chk.checked);
      if(!on) { hideAll(); return; }
      showKids();
    }

    if(!chk.__wiredSwap_castello){
      chk.addEventListener('change', update);
      chk.__wiredSwap_castello = true;
    }
    map.on('zoomend', update);
    update();
  });
})();
