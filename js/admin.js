// ── Esther admin dashboard ───────────────────────────────────────────────
// Reads activity from Supabase with the same public anon key as the app.
// NOTE: data is already anon-readable (the app uses the same key), so this
// password is light gatekeeping only, not real security. Change it here:
const ADMIN_PW = 'esther2026admin';

const SB_URL = 'https://jmnbxhoghhqjyenxoejg.supabase.co';
const SB_KEY = 'sb_publishable_K4AlQKDAZ7Ul7TpUeNqFlg_07SnJKxS';
const H = { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY };

let TOTALS = { mac: 124, omi: 84, pm: 142 }; // refined from data/*.json on load
let SELECTED = null;
let lastData = { presence: [], progress: [], events: [] };

// ── auth ──
function tryAuth(){
  const v = document.getElementById('pw').value;
  if(v === ADMIN_PW){ localStorage.setItem('esther_admin_ok','1'); showApp(); }
  else document.getElementById('pwErr').textContent = 'Mot de passe incorrect';
}
function logout(){ localStorage.removeItem('esther_admin_ok'); location.reload(); }
let sbClient = null;
function showApp(){
  document.getElementById('gate').style.display='none';
  document.getElementById('app').style.display='';
  loadTotals();
  tick();                                  // initial full load
  setupRealtime();                         // live updates (Supabase Realtime)
  setInterval(renderOnly, 15000);          // re-evaluate "online" aging (no fetch)
  setInterval(tick, 90000);                // safety re-sync in case the socket drops
}
function setRT(txt){ const el=document.getElementById('refreshLbl'); if(el) el.textContent=txt; }
function flashLive(){ const el=document.querySelector('header .live'); if(el){ el.style.transform='scale(1.8)'; setTimeout(()=>el.style.transform='',250); } }
function setupRealtime(){
  try{
    if(!window.supabase || !supabase.createClient){ setRT('temps réel indisponible — secours toutes les 90 s'); setInterval(tick,10000); return; }
    sbClient = supabase.createClient(SB_URL, SB_KEY);
    sbClient.channel('admin-live')
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'events' }, p=>{
        if(p.new){ lastData.events.unshift(p.new); if(lastData.events.length>4000) lastData.events.pop(); render(); flashLive(); }
      })
      .on('postgres_changes', { event:'*', schema:'public', table:'presence' }, p=>{
        const row=p.new; if(row&&row.code){ const i=lastData.presence.findIndex(x=>x.code===row.code); if(i>=0) lastData.presence[i]=row; else lastData.presence.push(row); renderOnly(); }
      })
      .subscribe(st=>{ setRT(st==='SUBSCRIBED' ? 'temps réel' : 'connexion… ('+st+')'); });
  }catch(e){ setRT('temps réel indisponible'); }
}

// ── helpers ──
const sub = (u,f) => fetch(SB_URL+'/rest/v1/'+u, {headers:H}).then(r=>r.json()).then(f).catch(()=>{});
function ago(ts){
  const s = Math.floor((Date.now() - new Date(ts).getTime())/1000);
  if(s<10) return "à l'instant"; if(s<60) return 'il y a '+s+'s'; if(s<3600) return 'il y a '+Math.floor(s/60)+' min';
  if(s<86400) return 'il y a '+Math.floor(s/3600)+' h'; return 'il y a '+Math.floor(s/86400)+' j';
}
const dayKey = ts => { const d=new Date(ts); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
const todayKey = () => dayKey(Date.now());
function esc(s){ return (s==null?'':String(s)).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

async function loadTotals(){
  try{
    const [mac,omi,pm] = await Promise.all(['mac','omi','pm'].map(n=>fetch('data/'+n+'.json').then(r=>r.json())));
    TOTALS.mac = Object.values(mac).reduce((s,w)=>s+w.exercises.length,0);
    TOTALS.omi = omi.reduce((s,c)=>s+c.exercises.length,0);
    TOTALS.pm  = pm.reduce((s,u)=>s+u.exercises.length,0);
  }catch(e){}
}

// ── data load + render ──
function renderOnly(){ render(); }   // re-render from cached data (online aging), no fetch
function tick(){
  Promise.all([
    fetch(SB_URL+'/rest/v1/presence?select=code,last_seen',{headers:H}).then(r=>r.json()).catch(()=>[]),
    fetch(SB_URL+'/rest/v1/progress?select=code,data,updated_at',{headers:H}).then(r=>r.json()).catch(()=>[]),
    fetch(SB_URL+'/rest/v1/events?select=code,ts,type,subject,ref,ok,meta&order=ts.desc&limit=3000',{headers:H}).then(r=>r.json()).catch(()=>[])
  ]).then(([presence,progress,events])=>{
    lastData = { presence:presence||[], progress:progress||[], events:events||[] };
    render();
  });
}

function lastSeenOf(code){
  const p = lastData.presence.find(x=>x.code===code);
  const pr = lastData.progress.find(x=>x.code===code);
  const ev = lastData.events.find(x=>x.code===code); // events are desc-sorted
  const ts = [p&&p.last_seen, pr&&pr.updated_at, ev&&ev.ts].filter(Boolean).map(t=>new Date(t).getTime());
  return ts.length ? Math.max(...ts) : 0;
}
const isOnline = code => Date.now() - lastSeenOf(code) < 90000;

function render(){
  // union of codes seen anywhere
  const codes = [...new Set([...lastData.progress.map(p=>p.code), ...lastData.presence.map(p=>p.code), ...lastData.events.map(e=>e.code)])];
  const today = todayKey();
  const onlineCount = codes.filter(isOnline).length;
  const actionsToday = lastData.events.filter(e=>dayKey(e.ts)===today && e.type==='answer').length;
  const totalActions = lastData.events.filter(e=>e.type==='answer').length;

  document.getElementById('overview').innerHTML = [
    card(codes.length, 'utilisateurs'),
    card('<span class="dot '+(onlineCount?'on':'off')+'"></span>'+onlineCount, 'en ligne'),
    card(actionsToday, "exercices aujourd'hui"),
    card(totalActions, 'exercices au total')
  ].join('');

  document.getElementById('usersBody').innerHTML = codes.map(code=>{
    const pr = lastData.progress.find(p=>p.code===code) || {data:{}};
    const d = pr.data||{};
    const xp = d.game ? d.game.xp : 0;
    const mast = (d.mac?d.mac.length:0)+(d.omi?d.omi.length:0)+(d.pm?d.pm.length:0);
    const tot = TOTALS.mac+TOTALS.omi+TOTALS.pm;
    const todayN = lastData.events.filter(e=>e.code===code && dayKey(e.ts)===today && e.type==='answer').length;
    const totN = lastData.events.filter(e=>e.code===code && e.type==='answer').length;
    const on = isOnline(code);
    const ls = lastSeenOf(code);
    return `<tr class="urow ${SELECTED===code?'sel':''}" onclick="selectUser('${esc(code)}')">
      <td><strong>${esc(code)}</strong></td>
      <td><span class="dot ${on?'on':'off'}"></span>${on?'en ligne':'hors ligne'}</td>
      <td class="muted">${ls?ago(ls):'—'}</td>
      <td>Niv. ${level(xp)} · ${xp} XP</td>
      <td>${mast}/${tot}</td>
      <td>${todayN}</td>
      <td>${totN}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="7" class="muted">Aucun utilisateur synchronisé pour le moment.</td></tr>';

  document.getElementById('detailWrap').innerHTML = SELECTED ? detailHtml(SELECTED) : '';
}
function card(big,lbl){ return `<div class="card"><div class="big">${big}</div><div class="lbl">${lbl}</div></div>`; }
function level(xp){ xp=xp||0; let lvl=1, need=100; while(xp>=need){ lvl++; xp-=need; need=Math.round(need*1.35); } return lvl; }

function selectUser(code){ SELECTED = (SELECTED===code?null:code); render(); }

function detailHtml(code){
  const pr = lastData.progress.find(p=>p.code===code) || {data:{}};
  const d = pr.data||{};
  const evs = lastData.events.filter(e=>e.code===code);
  // mastery bars
  const bars = [
    bar('MAC', d.mac?d.mac.length:0, TOTALS.mac, '#D4537E'),
    bar('OmI', d.omi?d.omi.length:0, TOTALS.omi, '#4f46e5'),
    bar('Process M.', d.pm?d.pm.length:0, TOTALS.pm, '#0d9488'),
  ].join('');
  const examBest = d.game && d.game.exambest ? Math.round(d.game.exambest*100)+'%' : '—';
  const badges = d.game && d.game.badges ? d.game.badges.length : 0;

  // daily activity (last 14 days) from answer events
  const days = [];
  for(let i=13;i>=0;i--){ const dt=new Date(); dt.setDate(dt.getDate()-i); days.push(dayKey(dt)); }
  const perDay = days.map(dk=>{ const e=evs.filter(x=>x.type==='answer'&&dayKey(x.ts)===dk); return {dk, total:e.length, ok:e.filter(x=>x.ok).length}; });
  const maxD = Math.max(1, ...perDay.map(x=>x.total));
  const daysHtml = perDay.map(p=>{
    const h = Math.round(p.total/maxD*72);
    const okh = p.total? Math.round(p.ok/p.total*h):0;
    const lab = p.dk.slice(8)+'/'+p.dk.slice(5,7);
    return `<div class="day" title="${p.dk}: ${p.total} exos, ${p.ok} corrects">
      <div class="col" style="height:72px"><i style="height:${h}px"></i><div class="ok" style="height:${okh}px"></div></div>
      <div class="lab">${lab}</div></div>`;
  }).join('');

  // live timeline (last 50)
  const tl = evs.slice(0,50).map(e=>{
    let ico='•', txt='';
    if(e.type==='answer'){ ico=e.ok?'✅':'❌'; txt=`${subjLabel(e.subject)} — <code>${esc(e.ref)}</code>`; }
    else if(e.type==='exam'){ ico='🎓'; txt=`Examen blanc <code>${esc(e.ref)}</code> — <strong>${e.meta&&e.meta.pct!=null?e.meta.pct+'%':''}</strong>`; }
    else if(e.type==='login'){ ico='🔑'; txt='Connexion / ouverture'; }
    else { txt=esc(e.type); }
    return `<div class="ev"><span class="t">${ago(e.ts)}</span><span class="ico">${ico}</span><span>${txt}</span></div>`;
  }).join('') || '<div class="muted" style="padding:10px">Aucune action enregistrée encore.</div>';

  return `<div class="section-title">👤 ${esc(code)} <a class="back" style="font-weight:400;font-size:.8rem" onclick="selectUser('${esc(code)}')">✕ fermer</a></div>
  <div class="detail">
    <div class="bars">${bars}
      <div class="barrow"><span>Examen blanc</span><span class="muted">meilleur score</span><span style="text-align:right"><strong>${examBest}</strong></span></div>
      <div class="barrow"><span>Badges</span><span class="muted">débloqués</span><span style="text-align:right"><strong>🏅 ${badges}</strong></span></div>
    </div>
    <div class="section-title" style="font-size:.95rem">📊 Progression cumulée <span class="muted" style="font-weight:400">(<span style="color:#9aa1ad">gris</span> = exercices faits · <span style="color:var(--ok)">vert</span> = bonnes réponses)</span></div>
    ${cumChart(evs)}
    <div class="section-title" style="font-size:.95rem">📈 Activité par jour (14 derniers jours · <span style="color:var(--ok)">vert</span> = corrects)</div>
    <div class="days">${daysHtml}</div>
    <div class="section-title" style="font-size:.95rem"><span class="live"></span>En direct — dernières actions</div>
    <div class="timeline">${tl}</div>
  </div>`;
}
function bar(name,val,tot,col){ const pct=tot?Math.round(val/tot*100):0; return `<div class="barrow"><span>${name}</span><div class="bar"><i style="width:${pct}%;background:${col}"></i></div><span style="text-align:right">${val}/${tot}</span></div>`; }
// Cumulative progression: running total of answers (grey) and correct answers (green) over time.
function cumChart(evs){
  const ans = evs.filter(e=>e.type==='answer').slice().sort((a,b)=>new Date(a.ts)-new Date(b.ts));
  if(!ans.length) return '<div class="muted" style="padding:10px 0">Pas encore de données — la courbe se remplit dès les premières réponses.</div>';
  const perDay={}; ans.forEach(e=>{ const k=dayKey(e.ts); (perDay[k]=perDay[k]||{t:0,c:0}); perDay[k].t++; if(e.ok)perDay[k].c++; });
  const days=[]; const start=new Date(dayKey(ans[0].ts)+'T00:00:00'); const end=new Date(todayKey()+'T00:00:00');
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)) days.push(dayKey(d));
  let ct=0,cc=0; const T=[],C=[];
  days.forEach(k=>{ if(perDay[k]){ ct+=perDay[k].t; cc+=perDay[k].c; } T.push(ct); C.push(cc); });
  const W=560,Hh=150,pad=26, n=days.length, maxY=Math.max(1,ct);
  const x=i=> pad + (n<=1?(W-2*pad)/2:i/(n-1)*(W-2*pad));
  const y=v=> Hh-pad - v/maxY*(Hh-2*pad);
  const line=p=>p.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)).join(' ');
  const area='M'+x(0).toFixed(1)+' '+y(0).toFixed(1)+' '+C.map((v,i)=>'L'+x(i).toFixed(1)+' '+y(v).toFixed(1)).join(' ')+' L'+x(n-1).toFixed(1)+' '+y(0).toFixed(1)+' Z';
  const gl=[0,Math.round(maxY/2),maxY].map(v=>`<line x1="${pad}" y1="${y(v)}" x2="${W-pad}" y2="${y(v)}" stroke="#eef0f4"/><text x="4" y="${(y(v)+3).toFixed(1)}" font-size="9" fill="#9aa1ad">${v}</text>`).join('');
  const dot=(p,col)=>`<circle cx="${x(n-1).toFixed(1)}" cy="${y(p[n-1]).toFixed(1)}" r="3.5" fill="${col}"/>`;
  return `<svg viewBox="0 0 ${W} ${Hh}" style="width:100%;height:auto;max-height:170px">
    ${gl}
    <path d="${area}" fill="rgba(16,185,129,.13)"/>
    <path d="${line(T)}" fill="none" stroke="#9aa1ad" stroke-width="2"/>
    <path d="${line(C)}" fill="none" stroke="#10b981" stroke-width="2.5"/>
    ${dot(T,'#9aa1ad')}${dot(C,'#10b981')}
    <text x="${pad}" y="${Hh-7}" font-size="10" fill="#6b7280">${days[0].slice(5)}</text>
    <text x="${W-pad}" y="${Hh-7}" font-size="10" fill="#6b7280" text-anchor="end">${days[n-1].slice(5)}</text>
  </svg>`;
}
function subjLabel(s){ return {mac:'<span class="pill mac">MAC</span>',omi:'<span class="pill omi">OmI</span>',pm:'<span class="pill pm">PM</span>',exam:'🎓 Exam',open:'✍️ Ouverte'}[s]||(s||''); }

// ── boot ──
if(localStorage.getItem('esther_admin_ok')==='1') showApp();
