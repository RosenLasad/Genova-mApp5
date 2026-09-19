(function(){
  var data = {
    parent: { id:"molo", label:"Molo", lat:44.406960335393258, lng:8.926195855862169 },
    children: [
      {
        "id":"cavour","label":"Piazza Cavour","lat":44.40643883494313,"lng":8.927690363115637,"descr": "Piazza Cavour segna uno degli accessi allo storico quartiere del Molo. Prima della costruzione della Sopraelevata, realizzata tra il 1962 e il 1965, lo spazio aveva un rapporto più diretto con il fronte portuale; la nuova infrastruttura modificò profondamente l’aspetto e la percezione di questa parte della città.",
        "media":{
          "oggi":"qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_cavour/qr_azzurri_molo_cavour_oggi.mp4",
          "ieri":["qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_cavour/qr_azzurri_molo_cavour_ieri_1.mp4"]
        }
      },
      {
        "id":"sottoripa","label":"Sottoripa","lat":44.41005467562237,"lng":8.929140336931178,"descr": "I portici medievali di Sottoripa si svilupparono lungo l’antico fronte portuale e ospitarono per secoli botteghe, magazzini e attività legate al commercio. Ancora oggi costituiscono uno degli ambienti più caratteristici del centro storico, conservando lo stretto legame tra la città e la sua tradizione mercantile.",
        "media":{
          "oggi":"qr_azzurri/qr_azzurri_molo/qr_azzurri_sottoripa/qr_azzurri_sottoripa_oggi.mp4",
          "ieri":["qr_azzurri/qr_azzurri_molo/qr_azzurri_sottoripa/qr_azzurri_sottoripa_ieri_1.mp4"]
        }
      },
      {
        "id":"cavour_sopra","label":"Pz. Cavour dalla Sopraelevata","lat":44.406235364481404,"lng":8.927517858776639,"descr": "Dalla Sopraelevata si osserva Piazza Cavour e l’ingresso al Molo da una prospettiva nata con la grande infrastruttura viaria degli anni Sessanta. Il viadotto, sospeso sopra il fronte portuale, introdusse un nuovo livello di attraversamento della città e trasformò radicalmente questo tratto del centro.",
        "media":{
          "oggi":"qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_sopraelevata/qr_azzurri_molo_sopra_oggi.mp4",
          "ieri":["qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_sopraelevata/qr_azzurri_molo_sopraelevata_ieri_1.mp4"]
        }
      },
      {
        "id":"san_marco","label":"San Marco al Molo","lat":44.407861182464906,"lng":8.925929425416395,"descr": "La chiesa di San Marco al Molo fu fondata nel 1173 e costruita sui primi ampliamenti artificiali del molo. In origine si affacciava direttamente sulla banchina del porto; l’espansione delle aree portuali e urbane l’ha progressivamente inglobata nel fitto tessuto edilizio circostante.",
        "media":{
          "oggi":"qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_san_marco/qr_azzurri_molo_san_marco_oggi.mp4",
          "ieri":["qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_san_marco/qr_azzurri_molo_san_marco_ieri_1.mp4"]
        }
      },
      {
        "id":"siberia","label":"Porta Siberia","lat":44.408279620719604,"lng":8.923917198032887,"descr": "La Porta del Molo, conosciuta come Porta Siberia, fu progettata da Galeazzo Alessi nel Cinquecento e completata nel 1553. Inserita nelle mura portuali, univa funzioni difensive e di accesso alla città, controllando uno dei principali passaggi tra il porto e lo storico quartiere del Molo.",
        "media":{
          "oggi":"qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_siberia/qr_azzurri_molo_siberia_oggi.mp4",
          "ieri":[
            "qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_siberia/qr_azzurri_molo_siberia_ieri_1.mp4",
            "qr_azzurri/qr_azzurri_molo/qr_azzurri_molo_siberia/qr_azzurri_molo_siberia_ieri_2.mp4"
          ]
        }
      }
    ]
  };

  try{ window.__qrAddSource && window.__qrAddSource(data.parent, data.children); }catch(_){}

  whenMapReady(function(){
    var parent = data.parent, kids = data.children || [];
    var chk = document.getElementById('chk-qr-molo');
    if(!chk) return;

    if(!map.getPane('pane-molo-blue')){ map.createPane('pane-molo-blue'); map.getPane('pane-molo-blue').style.zIndex = 650; }
    if(!map.getPane('pane-molo-azzurri')){ map.createPane('pane-molo-azzurri'); map.getPane('pane-molo-azzurri').style.zIndex = 651; }

    var azzIcon  = L.icon({ iconUrl:'qr_azzurri/marker-azzurro-qr-notch-24.svg', iconSize:[24,26], iconAnchor:[12,26], className:'qr-azzurro-icon' });

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

    var blue = L.marker([parent.lat, parent.lng], { pane:'pane-molo-blue', icon: blueIconLocal, title: parent.label });

    try{ blue.off('click'); }catch(e){}
    blue.bindTooltip(parent.label || 'Molo', {permanent:false, direction:'right', offset:[8,0], className:'qr-tooltip'});
    blue.on('click', function(){ window.__qrOpenChildPanel && window.__qrOpenChildPanel(parent.label, "Zooma per vedere i punti del Molo.", {oggi:null, ieri:[]}); });

    var group = L.layerGroup();

    kids.forEach(function(c, idx){
      if (Math.abs((c.lat||0) - (parent.lat||0)) < 1e-7 && Math.abs((c.lng||0) - (parent.lng||0)) < 1e-7) {
        var offs = [[0,0.00035],[0.0003,0],[-0.00028,-0.00022],[0.00022,-0.00025]];
        var d = offs[idx%offs.length];
        c = Object.assign({}, c, { lat: c.lat + d[0], lng: c.lng + d[1] });
      }
      var m = L.marker([c.lat, c.lng], { pane:'pane-molo-azzurri', icon: azzIcon, title:c.label });
      m.bindTooltip(c.label || '', {permanent:false, direction:'right', offset:[8,0], className:'qr-tooltip'});
      m.on('click', function(){ window.__qrOpenChildPanel && window.__qrOpenChildPanel(c.label, c.descr || '', c.media || {oggi:null, ieri:[]}); });
      group.addLayer(m);
    });

    function showKids(){ try{ blue.removeFrom(map); }catch(e){} try{ group.addTo(map); }catch(e){} }
    function hideAll(){ try{ blue.removeFrom(map); }catch(e){} try{ group.removeFrom(map); }catch(e){} }

    function update(){
      var on = !!(chk && chk.checked);
      if(!on) { hideAll(); return; }
      showKids();
    }

    if(chk && !chk.__wiredMoloSwap){ chk.addEventListener('change', update); chk.__wiredMoloSwap = true; }
    map.on('zoomend', update);
    update();
  });
})();
