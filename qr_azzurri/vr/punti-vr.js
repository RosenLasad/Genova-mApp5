/*
 * Genova mApp - Registro centralizzato dei contenuti VR dei Punti QR.
 *
 * Chiave: "ID_GRUPPO/ID_PUNTO"
 * I valori possono essere ricavati e provati prima in Genova mApp 360 Lab.
 *
 * IMPORTANTE:
 * - il video VR e il video "Ieri" sono indipendenti;
 * - il file VR puo' trovarsi in qualunque cartella dell'app;
 * - il bottone VR compare nel popup solo quando qui esiste una voce valida
 *   con un percorso src non vuoto e il file e' raggiungibile;
 * - angle e verticalAngle descrivono l'ampiezza virtuale del contenuto;
 * - il pannello TEST del Lab non viene caricato in Genova mApp.
 */
window.__QR_VR_POINTS = window.__QR_VR_POINTS || {

  // Piazza Acquaverde / Stazione Principe
  "piazza_principe/acquaverde": {
    src: "qr_azzurri/qr_azzurri_piazza_principe/vr/acquaverde_vr.mp4",
    type: "video",
    projection: "flatvr",
    angle: 180,
    verticalAngle: 60,
    fov: 80,
    yaw: 0,
    pitch: 0,
    minYaw: -90,
    maxYaw: 90,
    minPitch: -40,
    maxPitch: 40,
    loop: true,
    audio: true
  },

  // Portici in piazza di Caricamento
  "pcaricamento/pz_caricamento": {
    src: "qr_azzurri/qr_azzurri_caricamento/vr/caricamento_vr.mp4",
    type: "video",
    projection: "flatvr",
    angle: 180,
    verticalAngle: 120,
    fov: 80,
    yaw: 0,
    pitch: 0,
    minYaw: -90,
    maxYaw: 90,
    minPitch: -40,
    maxPitch: 40,
    loop: true,
    audio: true
  },

  // Piazza Raibetta
  "pcaricamento/piazza_raibetta": {
    src: "qr_azzurri/qr_azzurri_caricamento/vr/raibetta_vr.mp4",
    type: "video",
    projection: "flatvr",
    angle: 180,
    verticalAngle: 120,
    fov: 80,
    yaw: 0,
    pitch: 0,
    minYaw: -90,
    maxYaw: 90,
    minPitch: -40,
    maxPitch: 40,
    loop: true,
    audio: true
  }

};
