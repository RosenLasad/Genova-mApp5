/* Genova mApp - Grifoncino: azioni v0.2 */
(function(){
  'use strict';
  function click(sel){var el=document.querySelector(sel);if(!el)return false;el.click();return true;}
  function closeNewHome(){try{if(typeof window.gmCloseNewHome==='function')window.gmCloseNewHome(false);}catch(_e){} }
  function openNewHome(){try{if(typeof window.gmOpenNewHome==='function')window.gmOpenNewHome(document.getElementById('title-btn'));else document.getElementById('title-btn')?.click();return true;}catch(_e){return false;}}
  function openQuickCategory(buttonId,childSelector){closeNewHome();var b=document.getElementById(buttonId);if(!b)return false;if(b.getAttribute('aria-expanded')!=='true')b.click();if(childSelector){setTimeout(function(){var c=document.querySelector(childSelector);if(c)c.click();},90);}return true;}
  function openEvents(){openNewHome();setTimeout(function(){var buttons=[].slice.call(document.querySelectorAll('#gm-new-home button,#gm-new-home [role="button"]'));var target=buttons.find(function(b){return /eventi/i.test((b.textContent||'').trim());});if(target)target.click();},120);return true;}
  function surprise(){closeNewHome();try{if(typeof window.__favEnhanceLists==='function')window.__favEnhanceLists();}catch(_e){}var names=[].slice.call(document.querySelectorAll('.fav-item .fav-name')).filter(function(el){return (el.textContent||'').trim();});if(!names.length)return false;names[Math.floor(Math.random()*names.length)].click();return true;}
  function routes(){closeNewHome();var b=document.getElementById('qt-cat-routes-btn');if(b){b.click();return true;}return click('#routes-btn');}
  function nearMe(){closeNewHome();var candidates=[].slice.call(document.querySelectorAll('button,[role="button"]'));var b=candidates.find(function(el){return /vicino a me|raggio/i.test((el.textContent||'')+' '+(el.getAttribute('title')||'')+' '+(el.getAttribute('aria-label')||''));});if(b){b.click();return true;}return false;}
  window.GMGriffoncinoActions={
    surprise:surprise,events:openEvents,openMap:function(){closeNewHome();return true;},openHome:openNewHome,routes:routes,nearMe:nearMe,
    showForti:function(){return openQuickCategory('qt-cat-passato-btn','#qt-cat-passato .qt-forti');},
    showMuseums:function(){return openQuickCategory('qt-cat-passato-btn','#qt-cat-passato .qt-museum');},
    showChurches:function(){return openQuickCategory('qt-cat-passato-btn','#qt-cat-passato .qt-chiese');},
    showPalaces:function(){return openQuickCategory('qt-cat-passato-btn','#qt-cat-passato .qt-palazzi');},
    showParks:function(){return openQuickCategory('qt-cat-luoghi-btn','#qt-cat-luoghi .qt-parchi');},
    showTheatres:function(){return openQuickCategory('qt-cat-luoghi-btn','#qt-cat-luoghi .qt-teatri');},
    showCinema:function(){return openQuickCategory('qt-cat-luoghi-btn','#qt-cat-luoghi .qt-cinema');},
    showExhibitions:function(){return openQuickCategory('qt-cat-luoghi-btn','#qt-cat-luoghi .qt-mostre');},
    showFoodLocali:function(){return openQuickCategory('qt-cat-food-btn','#qt-cat-food .qt-locali');},
    showFoodRestaurants:function(){return openQuickCategory('qt-cat-food-btn','#qt-cat-food .qt-ristoranti');},
    showFoodTakeaway:function(){return openQuickCategory('qt-cat-food-btn','#qt-cat-food .qt-takeaway');},
    showFoodHotels:function(){return openQuickCategory('qt-cat-food-btn','#qt-cat-food .qt-alloggi');},
    showBus:function(){return openQuickCategory('qt-cat-trasporti-btn','#qt-cat-trasporti .qt-bus');},
    showTrains:function(){return openQuickCategory('qt-cat-trasporti-btn','#qt-cat-trasporti .qt-train');},
    showMetro:function(){return openQuickCategory('qt-cat-trasporti-btn','#qt-cat-trasporti .qt-metro');},
    showVertical:function(){return openQuickCategory('qt-cat-trasporti-btn','#qt-cat-trasporti .qt-funi');},
    showSea:function(){return openQuickCategory('qt-cat-trasporti-btn','#qt-cat-trasporti .qt-mare');},
    showAirport:function(){return openQuickCategory('qt-cat-trasporti-btn','#qt-cat-trasporti .qt-aereo');}
  };
})();
