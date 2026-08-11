
window.__TEXTS = window.__TEXTS || {};
window.__MURA_BARBAROSSA_TEXTS_URL = window.__MURA_BARBAROSSA_TEXTS_URL || "mura_data/mura_barbarossa_texts.json";

/* NUOVO: JSON per il popup "Info e contatti" */
window.__INFO_TEXTS_URL = window.__INFO_TEXTS_URL || "info/info_popup_texts.json";

async function __loadTexts(layerKey, url){
  if(window.__TEXTS[layerKey]) return window.__TEXTS[layerKey];
  try {
    const res = await fetch(url);
    if(res.ok){
      window.__TEXTS[layerKey] = await res.json();
      return window.__TEXTS[layerKey];
    }
  } catch(e){ /* silent */ }
  window.__TEXTS[layerKey] = {};
  return window.__TEXTS[layerKey];
}

