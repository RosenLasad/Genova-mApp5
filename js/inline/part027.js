
// Keep Scorci/blue markers OFF by default (no UI). Leave Documentari intact.
try{
  localStorage.setItem('legend_blue','0');
  var cb = document.getElementById('chk-blue-hidden');
  if(cb) cb.checked = false;
}catch(e){}
