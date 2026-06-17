// ─────────────────────────────────────────────────────────────────────────
// Activity tracking → feeds the admin dashboard (admin.html).
// Logs answers/exams/logins AND live location (screen + chapter + scroll) so the
// admin can see exactly where the user is in real time — even while reading theory.
// Fire-and-forget; only when a sync code is set. Uses SB_URL / sbHeaders from 10.
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
    _post('events', row);
    touchPresence();
  }catch(e){}
}
function _post(table, row){
  fetch(SB_URL + '/rest/v1/' + table, {
    method:'POST',
    headers: Object.assign(sbHeaders(), { 'Prefer':'return=minimal' }),
    body: JSON.stringify(row)
  }).catch(()=>{});
}

// ── live location (derived from the app's own state/DOM) ──
function _activeTab(rowId){ try{ const t=document.querySelector('#'+rowId+' .tab.active'); return t?t.textContent.trim().replace(/\s+/g,' '):''; }catch(e){ return ''; } }
function currentLocation(){
  try{
    const fl=document.getElementById('flashOverlay');
    if(fl && getComputedStyle(fl).display!=='none') return { view:'Flashcards', detail:'' };
    const cs=document.getElementById('csOverlay');
    const csOpen = cs && (cs.classList.contains('open') || getComputedStyle(cs).display!=='none' && getComputedStyle(cs).opacity!=='0');
    const ex = (typeof currentExam!=='undefined' ? 'Exam '+currentExam+' · ' : '');
    const cv = (typeof currentView!=='undefined' ? currentView : '');
    const sub = (typeof currentSubject!=='undefined' ? currentSubject : '');
    let view='', detail='';
    if(cv==='landing'){ view='Accueil (tableau de bord)'; }
    else switch(sub){
      case 'home':   view='Accueil'; break;
      case 'mac':    view=ex+'MAC';            detail=_activeTab('tabsRow'); break;
      case 'omi':    view=ex+'OmI';            detail=_activeTab('omiTabsRow'); break;
      case 'test':   view=ex+'Examens blancs'; detail=_activeTab('testTabsRow'); break;
      case 'pm':     view=ex+'Process Mgmt';   detail=_activeTab('pmTabsRow'); break;
      case 'theory': view=ex+'Théorie';        detail=_activeTab('theoryTabsRow'); break;
      case 'lvl':    view=ex+'Niveaus';        detail=_activeTab('lvlTabsRow'); break;
      default:       view=ex+(sub||'?');
    }
    if(csOpen) detail = (detail?detail+' · ':'')+'📋 formulekaart';
    return { view: view, detail: detail };
  }catch(e){ return { view:'', detail:'' }; }
}
function _scrollPct(){ try{ const h=document.documentElement.scrollHeight-window.innerHeight; return h>4 ? Math.round(Math.min(1,Math.max(0,window.scrollY/h))*100) : 0; }catch(e){ return 0; } }

// ── real-interaction tracking: distinguishes "actively studying" from "tab open but idle" ──
let _lastActive = Date.now();
function _markActive(){ _lastActive = Date.now(); }
(function(){
  let mt=0;
  // mousemove is throttled (≤ every 2s) so it stays cheap
  window.addEventListener('mousemove', function(){ const n=Date.now(); if(n-mt>2000){ mt=n; _markActive(); } }, { passive:true });
  ['keydown','mousedown','click','wheel','scroll','touchstart','touchmove'].forEach(function(ev){
    window.addEventListener(ev, _markActive, { passive:true });
  });
})();

let _lastNav='';
function touchPresence(){
  try{
    if(typeof syncCode==='undefined' || !syncCode) return;
    const loc = currentLocation();
    _post('presence', { code: syncCode, last_seen: new Date().toISOString(), last_active: new Date(_lastActive).toISOString(), view: loc.view, detail: loc.detail, scroll: _scrollPct() });
    // record a nav event whenever the screen/chapter changes (timeline history)
    const label = loc.view + (loc.detail ? ' · '+loc.detail : '');
    if(label && label.indexOf('Accueil')!==0 && label !== _lastNav){ _lastNav = label; _post('events', { code: syncCode, type:'nav', ref: label }); }
  }catch(e){}
}

// ── heartbeat (every 5s visible) + scroll → near-live location ──
(function(){
  let started=false, scrollTimer=null;
  function start(){ if(started) return; started=true; touchPresence(); setInterval(function(){ if(document.visibilityState==='visible') touchPresence(); }, 5000); }
  document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible') touchPresence(); });
  window.addEventListener('scroll', function(){ if(scrollTimer) return; scrollTimer=setTimeout(function(){ scrollTimer=null; touchPresence(); }, 1200); }, { passive:true });
  if(document.readyState!=='loading') start(); else document.addEventListener('DOMContentLoaded', start);
})();
