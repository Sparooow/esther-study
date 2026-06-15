// ─────────────────────────────────────────────────────────────────────────
// Activity tracking → feeds the admin dashboard (admin.html).
// Fire-and-forget; only logs when a sync code is set. Uses the same Supabase
// anon key/headers as the cloud sync (SB_URL / sbHeaders from 10-gamification.js).
// ─────────────────────────────────────────────────────────────────────────
function _trkSubject(exId){
  if(!exId) return null;
  if(exId.indexOf('open_')===0) return 'open';
  if(/^ex/.test(exId)) return 'mac';
  if(/^h\d/.test(exId)) return 'omi';
  if(/^u\d/.test(exId)) return 'pm';
  if(/^(t\d|pe\d|exam)/.test(exId)) return 'exam';
  return null;
}
function logEvent(type, fields){
  try{
    if(typeof syncCode==='undefined' || !syncCode) return;
    const row = Object.assign({ code: syncCode, type: type }, fields||{});
    if(type==='answer' && row.ref && !row.subject) row.subject = _trkSubject(row.ref);
    fetch(SB_URL + '/rest/v1/events', {
      method:'POST',
      headers: Object.assign(sbHeaders(), { 'Prefer':'return=minimal' }),
      body: JSON.stringify(row)
    }).catch(()=>{});
    touchPresence();
  }catch(e){}
}
function touchPresence(){
  try{
    if(typeof syncCode==='undefined' || !syncCode) return;
    fetch(SB_URL + '/rest/v1/presence', {
      method:'POST',
      headers: Object.assign(sbHeaders(), { 'Prefer':'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify({ code: syncCode, last_seen: new Date().toISOString() })
    }).catch(()=>{});
  }catch(e){}
}
// Heartbeat so the dashboard can show "online" even when idle-but-open.
(function(){
  let started=false;
  function start(){ if(started) return; started=true; touchPresence(); setInterval(function(){ if(document.visibilityState==='visible') touchPresence(); }, 30000); }
  document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible') touchPresence(); });
  if(document.readyState!=='loading') start(); else document.addEventListener('DOMContentLoaded', start);
})();
