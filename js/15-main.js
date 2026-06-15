// Init — load data from data/*.json first, then build the UI (falls back to embedded data if fetch fails)
(async function init(){
  await loadDataInto();
  buildUI();
  switchExam(currentExam===2 ? 2: 1); // pre-build exam chrome/data
  showLanding(); // but land on the global dashboard first
  refreshXpChip();
  if(muted){ const mb=document.getElementById('muteBtn'); if(mb) mb.textContent='🔇'; }
  updateSyncBtn();
  if(localStorage.getItem('esther_dark')==='1'){ const b=document.getElementById('darkBtn'); if(b) b.textContent='☀️'; }
  if(syncCode){ syncPull().then(()=>{ if(currentSubject==='home') buildHome(); }); if(typeof logEvent==='function') logEvent('login', {}); }
  if('serviceWorker' in navigator && location.protocol==='https:'){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }
})();
