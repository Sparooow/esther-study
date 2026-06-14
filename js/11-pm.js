// ═══════════════════════════════════════════════════════════════════
// Exam 2 — Process Management (PM) module. mcq + numeric, own progress.
// ═══════════════════════════════════════════════════════════════════
const PM_AC = '#0d9488'; // teal accent
let PM_UNITS = []; // populated by injection
let pmCorrectSet = new Set(JSON.parse(localStorage.getItem('esther_pm_correct')||'[]'));
const pmMcqSel = {};
function savePmProgress(){ try{ localStorage.setItem('esther_pm_correct', JSON.stringify([...pmCorrectSet])); }catch(e){} if(typeof schedulePush==='function') schedulePush(); }

function pmLabels(){
 if(lang==='fr') return {theory:'Théorie',exLabel:'Exercice',check:'Vérifier',show:'Voir la solution',reset:'Réinitialiser',choose:'Choisis une réponse !',correct:'✓ Correct !',wrong:'✗ Pas tout à fait — revois la solution.',score:' exercices corrects',pts:'pts',intro:'Matière Process Management — théorie + exercices, organisée comme à l\'examen.'};
 if(lang==='en') return {theory:'Theory',exLabel:'Exercise',check:'Check',show:'Show solution',reset:'Reset',choose:'Choose an answer!',correct:'✓ Correct!',wrong:'✗ Not quite — see the solution.',score:' exercises correct',pts:'pts',intro:'Process Management — theory + exercises, organised like the exam.'};
 return {theory:'Theorie',exLabel:'Oefening',check:'Controleer',show:'Toon oplossing',reset:'Reset',choose:'Kies een antwoord!',correct:'✓ Correct!',wrong:'✗ Niet helemaal — bekijk de oplossing.',score:' oefeningen correct',pts:'ptn',intro:'Process Management — theorie + oefeningen, zoals op het examen.'};
}
function pmL(u, field){ const k=field+'_'+lang; return u[k]!==undefined?u[k]:(u[field+'_nl']!==undefined?u[field+'_nl']:(u[field]&&u[field][lang])||(u[field]&&u[field].nl)||''); }
function pmExL(ex, field){ const k=field+'_'+lang; return ex[k]!==undefined?ex[k]:(ex[field+'_nl']||''); }

let pmBuilt = false;
function buildPmUI(){
 const lbl = pmLabels();
 const tabsC = document.getElementById('pmTabsContainer');
 const area = document.getElementById('exam2Area');
 if(!PM_UNITS.length){ tabsC.style.display='none'; buildExam2(); return; }
 tabsC.style.display='';
 const tabsRow = document.getElementById('pmTabsRow');
 tabsRow.innerHTML=''; area.innerHTML=''; // always fresh (handles language rebuild)
 pmBuilt = true;
 PM_UNITS.forEach((u,i)=>{
 const tab=document.createElement('div');
 tab.className='tab'+(i===0?' active':'');
 tab.textContent=pmL(u,'title');
 tab.onclick=()=>switchPmTab(i);
 tabsRow.appendChild(tab);
 const panel=document.createElement('div');
 panel.className='workshop-panel'+(i===0?' active':'');
 panel.id='pmPanel_'+i;
 panel.innerHTML=`
<h2 class="section-title" style="color:${PM_AC}">${pmL(u,'title')}</h2>
<p class="section-sub">${u.pts?('±'+u.pts+' '+lbl.pts+' · '):''}${u.exercises.length} ${lbl.exLabel.toLowerCase()}s</p>
<div class="score-badge">
 <span class="score-num" style="color:${PM_AC}" id="pmScoreNum_${i}">0</span>
 <div><div style="font-weight:600;margin-bottom:2px">${pmL(u,'title')}</div>
 <div class="score-text" id="pmScoreTxt_${i}">0/${u.exercises.length}${lbl.score}</div></div></div>
<div class="theory-toggle" style="border-color:${PM_AC}55">
 <div class="theory-toggle-header" style="color:${PM_AC}" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.arr').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">
 <span>📚 ${lbl.theory} — ${pmL(u,'title')}</span><span class="arr">▼</span></div>
 <div class="theory-body">${injectDiagrams(pmL(u,'theory'))}</div></div>
${u.exercises.map((ex,ei)=>renderPmExCard(ex,ei,lbl)).join('')}`;
 area.appendChild(panel);
 });
 updatePmProgress();
}

function renderPmExCard(ex, ei, lbl){
 if(ex.type==='open'){
   return `<div class="exercise-card" id="pmCard_${ex.id}">
 <div class="ex-header"><span class="ex-title">${lbl.exLabel} ${ei+1}</span><span class="badge badge-open">${lang==='fr'?'Ouverte':'Open'}</span></div>
 <div class="ex-text">${pmExL(ex,'text')}</div>${openBodyHtml('pm', ex, PM_AC)}</div>`;
 }
 const h1=pmExL(ex,'hint1'), h2=pmExL(ex,'hint2');
 let body;
 if(ex.type==='numeric' && ex.inputs && ex.inputs.length){
 body=`<div class="inputs-row">${ex.inputs.map((inp,ii)=>`<div class="input-group"><label class="input-label">${(inp['label_'+lang]||inp.label_nl||'')}</label><input class="input-field" id="pm_${ex.id}_${ii}" type="number" step="any" placeholder="?" oninput="savePmInput('${ex.id}',${ii},this.value)"></div>`).join('')}</div>`;
 } else {
 const opts=pmExL(ex,'options')||ex.options_nl||[];
 body=`<div class="mcq-options" id="pmMcq_${ex.id}">${opts.map((o,oi)=>`<div class="mcq-option" onclick="selectPmMcq('${ex.id}',${oi})">${o}</div>`).join('')}</div>`;
 }
 const diffBadge = ex.diff==='easy'?'badge-easy':ex.diff==='hard'?'badge-hard':'badge-medium';
 return `
<div class="exercise-card" id="pmCard_${ex.id}">
 <div class="ex-header"><span class="ex-title">${lbl.exLabel} ${ei+1}</span><span class="badge ${diffBadge}">${ex.diff||'medium'}</span></div>
 <div class="ex-text">${pmExL(ex,'text')}</div>
 ${h1?`<div class="hint-area" style="margin:8px 0">
 <button class="btn" style="background:${PM_AC}1f;color:${PM_AC};border:1px solid ${PM_AC}55;font-size:0.8rem;padding:4px 12px" onclick="revealPmHint('${ex.id}',1)">💡 Hint 1</button>
 <button class="btn" style="background:${PM_AC}1f;color:${PM_AC};border:1px solid ${PM_AC}55;font-size:0.8rem;padding:4px 12px;margin-left:6px" onclick="revealPmHint('${ex.id}',2)">💡 Hint 2</button>
 <div id="pmHint1_${ex.id}" style="display:none;margin-top:8px;padding:10px;background:${PM_AC}14;border-left:3px solid ${PM_AC};border-radius:4px;font-size:0.88rem">${h1}</div>
 <div id="pmHint2_${ex.id}" style="display:none;margin-top:6px;padding:10px;background:${PM_AC}14;border-left:3px solid ${PM_AC};border-radius:4px;font-size:0.88rem">${h2}</div></div>`:''}
 ${body}
 <div class="btn-row">
 <button class="btn btn-check" style="background:${PM_AC}" onclick="checkPmEx('${ex.id}')">${lbl.check}</button>
 <button class="btn btn-show" onclick="togglePmSol('${ex.id}')">${lbl.show}</button>
 <button class="btn btn-reset" onclick="resetPmEx('${ex.id}')">${lbl.reset}</button></div>
 <div class="feedback" id="pmFb_${ex.id}"></div>
 <div class="solution-box" id="pmSol_${ex.id}">${pmExL(ex,'sol')}</div></div>`;
}

function pmFindEx(exId){ const base=exId.replace(/^lvl_/,''); for(const u of PM_UNITS){ const e=u.exercises.find(x=>x.id===base); if(e) return e; } return null; }
function revealPmHint(exId,n){ const el=document.getElementById('pmHint'+n+'_'+exId); if(el) el.style.display=el.style.display==='none'?'block':'none'; }
function togglePmSol(exId){ const s=document.getElementById('pmSol_'+exId); if(s) s.classList.toggle('show'); }
function selectPmMcq(exId, idx){ pmMcqSel[exId]=idx; const c=document.getElementById('pmMcq_'+exId); if(c) c.querySelectorAll('.mcq-option').forEach((el,i)=>{el.classList.remove('selected','correct','wrong'); if(i===idx) el.classList.add('selected');}); }
function savePmInput(exId, idx, val){ window['pmInput_'+exId+'_'+idx]=val; }

function checkPmEx(exId){
 const ex=pmFindEx(exId); if(!ex) return;
 const lbl=pmLabels(); const fb=document.getElementById('pmFb_'+exId); const card=document.getElementById('pmCard_'+exId);
 let ok;
 if(ex.type==='numeric' && ex.inputs && ex.inputs.length){
 ok=ex.inputs.every((inp,ii)=>{ const raw=window['pmInput_'+exId+'_'+ii]; const v=parseFloat((raw==null?'':raw).toString().replace(',','.')); if(isNaN(v)) return false; const tol=Number.isInteger(inp.answer)?Math.max(0.01,Math.abs(inp.answer)*0.002):0.15; return Math.abs(v-inp.answer)<=Math.max(tol,Math.abs(inp.answer)*0.01); });
 } else {
 const sel=pmMcqSel[exId];
 if(sel===undefined){ if(fb){fb.textContent=lbl.choose;fb.className='feedback show bad';} return; }
 ok=sel===ex.correct;
 const c=document.getElementById('pmMcq_'+exId);
 if(c) c.querySelectorAll('.mcq-option').forEach((el,i)=>{ el.classList.remove('selected','correct','wrong'); if(i===sel) el.classList.add(ok?'correct':'wrong'); if(!ok && i===ex.correct) el.classList.add('correct'); });
 }
 if(fb){ fb.textContent=ok?lbl.correct:lbl.wrong; fb.className='feedback show '+(ok?'ok':'bad'); }
 if(card){ card.classList.toggle('correct',ok); card.classList.toggle('wrong',!ok); }
 if(!ok){ const s=document.getElementById('pmSol_'+exId); if(s) s.classList.add('show'); }
 if(ok) pmCorrectSet.add(exId); else pmCorrectSet.delete(exId);
 recordAttempt(exId, ok);
 savePmProgress();
 updatePmProgress();
}

function resetPmEx(exId){
 pmCorrectSet.delete(exId); savePmProgress(); delete pmMcqSel[exId];
 const ex=pmFindEx(exId); if(ex&&ex.inputs) ex.inputs.forEach((_,ii)=>{ window['pmInput_'+exId+'_'+ii]=''; const el=document.getElementById('pm_'+exId+'_'+ii); if(el) el.value=''; });
 const c=document.getElementById('pmMcq_'+exId); if(c) c.querySelectorAll('.mcq-option').forEach(el=>el.classList.remove('selected','correct','wrong'));
 const fb=document.getElementById('pmFb_'+exId); if(fb){fb.textContent='';fb.className='feedback';}
 const s=document.getElementById('pmSol_'+exId); if(s) s.classList.remove('show');
 const card=document.getElementById('pmCard_'+exId); if(card) card.classList.remove('correct','wrong');
 updatePmProgress();
}

function switchPmTab(idx){
 document.querySelectorAll('#pmTabsRow.tab').forEach((t,i)=>t.classList.toggle('active',i===idx));
 document.querySelectorAll('#exam2Area.workshop-panel').forEach((p,i)=>p.classList.toggle('active',i===idx));
}

function updatePmProgress(){
 PM_UNITS.forEach((u,i)=>{
 const ok=u.exercises.filter(e=>pmCorrectSet.has(e.id)).length;
 const n=document.getElementById('pmScoreNum_'+i), t=document.getElementById('pmScoreTxt_'+i);
 if(n) n.textContent=ok; if(t) t.textContent=ok+'/'+u.exercises.length+pmLabels().score;
 const card=document.getElementById('pmCard_'); // noop
 });
 // restore correct cards
 pmCorrectSet.forEach(id=>{ const card=document.getElementById('pmCard_'+id); if(card&&!card.classList.contains('correct')) card.classList.add('correct'); });
 // global bar (exam 2)
 if(currentExam===2){
 const total=PM_UNITS.reduce((s,u)=>s+u.exercises.length,0);
 const done=PM_UNITS.reduce((s,u)=>s+u.exercises.filter(e=>pmCorrectSet.has(e.id)).length,0);
 const gp=document.getElementById('globalProgress'); if(gp) gp.style.display='';
 const lblc=document.getElementById('gpCount'), fill=document.getElementById('globalFill'), lbl=document.getElementById('gpLabel');
 if(lblc) lblc.textContent=done+'/'+total; if(fill) fill.style.width=(total?done/total*100:0)+'%';
 if(lbl) lbl.textContent=lang==='fr'?'Process Management':lang==='en'?'Process Management':'Process Management';
 }
}

