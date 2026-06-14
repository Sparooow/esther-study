function getCS(){
 const t=T[lang];
 return `<button class="cs-close" onclick="toggleCS()">${t.close} ✕</button>
<h2>${t.cheatsheet_btn}</h2>
<h3>${lang==='nl'?'W1: Afschrijvingen':lang==='en'?'W1: Depreciation':'W1: Amortissements'}</h3>
<div class="formula">Lineair / Linear: d = (A − R) / n</div>
<div class="formula">Vast % BW / Fixed % BV: p = 1 − (R/A)^(1/n)</div>
<div class="formula">Cijfersom / Sum-of-years: S = n(n+1)/2 &nbsp;|&nbsp; d_t = (n−t+1)/S × (A−R)</div>
<h3>${lang==='nl'?'W2: Absorption Costing':lang==='en'?'W2: Absorption Costing':'W2: Coûts complets'}</h3>
<div class="formula">k = C/N + v</div>
<div class="formula">VR = (p − k) × afzet</div>
<div class="formula">BezR = (W − N) × (C/N)</div>
<div class="formula">BedR = VR + BezR</div>
<h3>${lang==='nl'?'W3: Direct Costing':lang==='en'?'W3: Direct Costing':'W3: Coûts variables'}</h3>
<div class="formula">DB/eenheid = p − v</div>
<div class="formula">NBR = (p − v) × afzet − C</div>
<div class="formula">Verschil AC−DC = (W − afzet) × (C/N)</div>
<h3>${lang==='nl'?'W4: Kostenverbijzondering':lang==='en'?'W4: Cost Allocation':'W4: Affectation'}</h3>
<div class="formula">Opslag% = indirecte kosten / directe kosten × 100</div>
<div class="formula">ABC: tarief = kosten pool / cost driver totaal</div>
<div class="formula">Delingscalculatie: kp = totale kosten / productie</div>
<h3>${lang==='nl'?'W5: Break-even':lang==='en'?'W5: Break-even':'W5: Seuil de rentabilité'}</h3>
<div class="formula">BEP = C / (p − v)</div>
<div class="formula">BEP_omzet = BEP × p &nbsp;|&nbsp; CM% = (p−v)/p</div>
<div class="formula">VM% = (werkelijk − BEP) / werkelijk × 100</div>
<div class="formula">q_doel = (C + winst) / (p − v)</div>
<div class="formula">Ex-post = norm/eenheid × werkelijk volume</div>`;
}

// ── UI Builder ────────────────────────────────────────────────────────────
function buildUI(){
 const t = T[lang];
 document.getElementById('logoSub').textContent = t.logo_sub;
 document.getElementById('btnCS').textContent = t.cheatsheet_btn;
 document.getElementById('gpLabel').textContent = t.progress_label;
 document.querySelectorAll('.lang-btn').forEach(b=>{
 b.classList.toggle('active', b.textContent===lang.toUpperCase());
 });

 const data = getExercises();
 const wKeys = ['w1','w2','w3','w4','w5','w6'];
 const tabsRow = document.getElementById('tabsRow');
 const mainArea = document.getElementById('mainArea');

 // remember active tab
 const activeTab = tabsRow.querySelector('.tab.active');
 let activeIdx = activeTab ? parseInt(activeTab.dataset.idx): 0;

 tabsRow.innerHTML = '';
 mainArea.innerHTML = '';

 wKeys.forEach((wk,wi)=>{
 // Tab
 const tab = document.createElement('div');
 tab.className = 'tab' + (wi===activeIdx?' active':'');
 tab.dataset.idx = wi;
 tab.textContent = t.tabs[wi];
 tab.onclick = ()=>switchTab(wi);
 tabsRow.appendChild(tab);

 // Panel
 const panel = document.createElement('div');
 panel.className = 'workshop-panel' + (wi===activeIdx?' active':'');
 panel.id = 'panel_'+wi;

 // Score badge
 const sb = document.createElement('div');
 sb.className = 'score-badge';
 sb.id = 'score_'+wi;
 const wExCount = data[wk].exercises ? data[wk].exercises.length: 0;
 sb.innerHTML = `<div class="score-num" id="scoreNum_${wi}">0</div>
<div><div style="font-weight:600">${t.tabs[wi]}</div>
<div class="score-text">${t.w_sub[wi]}</div>
<div class="score-text" id="scoreTxt_${wi}">0/${wExCount} ${t.score_text}</div></div>`;
 panel.appendChild(sb);

 if(wk==='w6'){
 // Cross-reference card
 const cref = document.createElement('div');
 cref.innerHTML = buildW6CrossRef();
 panel.appendChild(cref);
 } else {
 // Theory
 const th = buildTheory(data[wk].theory, t);
 panel.appendChild(th);
 if(t.understand && t.understand[wk]){
 panel.appendChild(buildUnderstanding(wk, t));
 }
 }

 // Exercises
 if(data[wk].exercises){
 data[wk].exercises.forEach(ex=>{
 panel.appendChild(buildExCard(ex, t));
 });
 }

 mainArea.appendChild(panel);
 });

 updateProgress();
 // Restore correct states
 Object.keys(correctSet).forEach(()=>{});
 restoreStates();
}

function buildW6CrossRef(){
 const d=(nl,en,fr)=>lang==='nl'?nl:lang==='en'?en:fr;
 const items = [
 {id:'ex6_1',title:d('Oef. 1: Afschr. + AC','Ex. 1: Depreciation + AC','Ex. 1: Amort. + AC'),tags:['W1','W2']},
 {id:'ex6_2',title:d('Oef. 2: DC + BEP + Order','Ex. 2: DC + BEP + Order','Ex. 2: DC + BEP + Commande'),tags:['W3','W5']},
 {id:'ex6_3',title:d('Oef. 3: AC + DC + BEP','Ex. 3: AC + DC + BEP','Ex. 3: AC + DC + BEP'),tags:['W2','W3','W5']},
 {id:'ex6_4',title:d('Oef. 4: AC + Ex-post','Ex. 4: AC + Ex-post','Ex. 4: AC + Ex-post'),tags:['W2','W5']},
 {id:'ex6_5',title:d('Oef. 5: Alles samen (FINAL BOSS)','Ex. 5: Everything (FINAL BOSS)','Ex. 5: Tout (FINAL BOSS)'),tags:['W1','W2','W3','W5']},
 ];
 const title = d('Kruis-referentiekaart — Welke formules heb je nodig?','Cross-reference card — Which formulas do you need?','Carte de référence croisée — Quelles formules utiliser ?');
 return `<div class="theory-toggle"><div class="theory-toggle-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.arr').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">
<span>🗺️ ${title}</span><span class="arr">▼</span></div>
<div class="theory-body open">${items.map(it=>`<div class="cross-ref-card"><h3>${it.title}</h3><div class="cross-ref-tags">${it.tags.map(tg=>`<span class="cross-ref-tag">${tg}</span>`).join('')}</div></div>`).join('')}</div></div>`;
}

function buildUnderstanding(wk, t){
 const div = document.createElement('div');
 div.className='understand-toggle';
 div.innerHTML=`<div class="understand-header" onclick="const b=this.nextElementSibling;b.classList.toggle('open');this.querySelector('.arr').textContent=b.classList.contains('open')?'▲':'▼'">
<span>${t.understand_btn}</span><span class="arr">▼</span></div>
<div class="understand-body">${t.understand[wk]}</div>`;
 return div;
}

function buildTheory(thObj, t){
 const div = document.createElement('div');
 div.className='theory-toggle';
 div.innerHTML=`<div class="theory-toggle-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.arr').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">
<span>${t.theory}</span><span class="arr">▼</span></div>
<div class="theory-body">${injectDiagrams(thObj[lang]||thObj.nl)}</div>`;
 return div;
}

function buildExCard(ex, t){
 const card = document.createElement('div');
 card.className = 'exercise-card';
 card.id = 'card_'+ex.id;
 if(correctSet.has(ex.id)) card.classList.add('correct');

 const diffClass = ex.diff==='easy'?'badge-easy':ex.diff==='medium'?'badge-medium':'badge-hard';
 const diffLabel = ex.diff==='easy'?t.easy:ex.diff==='medium'?t.medium:t.hard;
 const isBoss = ex.title && (ex.title.includes('BOSS')||ex.title.includes('FINAL'));
 const bossBadge = isBoss ? `<span class="boss-badge">${t.boss}</span>`: '';

 let html = `<div class="ex-header">
<span class="ex-title">${ex.title}</span>
<span class="badge ${diffClass}">${diffLabel}</span>${ex.type==='open'?`<span class="badge badge-open">${lang==='fr'?'Ouverte':lang==='en'?'Open':'Open'}</span>`:''}${bossBadge}</div>
<div class="ex-text">${ex.text}</div>`;

 // Open-ended question
 if(ex.type==='open'){
  html += openBodyHtml('mac', ex, 'var(--primary)');
  card.innerHTML = html;
  if(correctSet.has(ex.id)) card.classList.add('correct');
  return card;
 }

 // MCQ
 if(ex.mcq){
 html += `<div class="mcq-options" id="mcq_${ex.id}">`;
 ex.mcq.forEach((opt,i)=>{
 const sel = (window['mcqSel_'+ex.id]===i);
 html += `<div class="mcq-option${sel?' selected':''}" data-idx="${i}" onclick="selectMcq('${ex.id}',${i})">${opt}</div>`;
 });
 html += `</div>`;
 }

 // Inputs
 if(ex.inputs){
 html += `<div class="inputs-row">`;
 ex.inputs.forEach((inp,i)=>{
 const val = window['inputVal_'+ex.id+'_'+i]||'';
 html += `<div class="input-group">
<label class="input-label">${inp.label}</label>
<input class="input-field" id="${inp.id}" type="number" step="any" placeholder="?" value="${val}" oninput="saveInput('${ex.id}',${i},this.value)"></div>`;
 });
 html += `</div>`;
 }

 html += `<div class="btn-row">
<button class="btn btn-check" onclick="checkEx('${ex.id}')">${t.check}</button>
<button class="btn btn-hint" onclick="showHint('${ex.id}')">${t.hint_btn}</button>
<button class="btn btn-show" onclick="toggleSol('${ex.id}')">${t.show_sol}</button>
<button class="btn btn-reset" onclick="resetEx('${ex.id}')">${t.reset}</button></div>
<div class="hint-box" id="hint_${ex.id}"></div>
<div class="feedback" id="fb_${ex.id}"></div>
<div class="solution-box" id="sol_${ex.id}">${ex.sol}</div>`;

 card.innerHTML = html;

 // Restore hint state
 const hs = hintState[ex.id]||0;
 if(hs>0){
 const hints = ex.hints||[];
 const hintEl = card.querySelector('#hint_'+ex.id);
 if(hintEl && hs<=hints.length){
 hintEl.innerHTML = hints.slice(0,hs).map((h,i)=>`<div>${i>0?'<br>':''}${i===0?'💡 ':'🔍 '}${h}</div>`).join('');
 hintEl.classList.add('show');
 }
 }

 // Restore correct feedback
 if(correctSet.has(ex.id)){
 const fb = card.querySelector('#fb_'+ex.id);
 if(fb){const enc=t.encouragements;fb.textContent=enc[Math.floor(Math.random()*enc.length)];fb.className='feedback show ok';}
 }

 return card;
}

function restoreStates(){
 // re-apply correct borders and feedback text
 correctSet.forEach(id=>{
 const card = document.getElementById('card_'+id);
 if(card){
 card.classList.add('correct');
 const fb = card.querySelector('#fb_'+id);
 if(fb){const enc=T[lang].encouragements;fb.textContent=enc[Math.floor(Math.random()*enc.length)];fb.className='feedback show ok';}
 }
 });
}

// ── Interaction ───────────────────────────────────────────────────────────
function selectMcq(exId, idx){
 window['mcqSel_'+exId] = idx;
 const container = document.getElementById('mcq_'+exId);
 if(container){
 container.querySelectorAll('.mcq-option').forEach((el,i)=>{
 el.classList.toggle('selected', i===idx);
 el.classList.remove('correct','wrong');
 });
 }
}

function saveInput(exId, idx, val){
 window['inputVal_'+exId+'_'+idx] = val;
}

function findMacEx(exId){
 if(typeof LVL_EX!=='undefined' && LVL_EX[exId]) return LVL_EX[exId];
 const data = getExercises();
 let ex = null;
 ['w1','w2','w3','w4','w5','w6'].forEach(wk=>{
 if(data[wk].exercises) data[wk].exercises.forEach(e=>{ if(e.id===exId) ex=e; });
 });
 return ex;
}

function showHint(exId){
 const ex = findMacEx(exId);
 if(!ex||!ex.hints) return;
 const cur = hintState[exId]||0;
 const hintEl = document.getElementById('hint_'+exId);
 if(!hintEl) return;
 if(cur >= ex.hints.length){
 hintEl.innerHTML = T[lang].hint_none;
 hintEl.classList.add('show');
 return;
 }
 hintState[exId] = cur+1;
 hintEl.innerHTML = ex.hints.slice(0,cur+1).map((h,i)=>`<div>${i>0?'<br>':''}${i===0?'💡 ':'🔍 '}${h}</div>`).join('');
 hintEl.classList.add('show');
}

function toggleSol(exId){
 const sol = document.getElementById('sol_'+exId);
 if(!sol) return;
 const show = sol.classList.toggle('show');
 // update button text
 const card = document.getElementById('card_'+exId);
 if(card){
 const btn = card.querySelector('.btn-show');
 if(btn) btn.textContent = show ? T[lang].hide_sol: T[lang].show_sol;
 }
}

function resetEx(exId){
 correctSet.delete(exId);
 saveMacProgress();
 hintState[exId]=0;
 window['mcqSel_'+exId]=undefined;

 const ex = findMacEx(exId);
 if(ex&&ex.inputs) ex.inputs.forEach((_,i)=>{ window['inputVal_'+exId+'_'+i]=''; });

 const card = document.getElementById('card_'+exId);
 if(card){
 card.classList.remove('correct','wrong');
 const fb=card.querySelector('#fb_'+exId);
 if(fb){fb.textContent='';fb.className='feedback';}
 const sol=card.querySelector('#sol_'+exId);
 if(sol) sol.classList.remove('show');
 const hint=card.querySelector('#hint_'+exId);
 if(hint){hint.classList.remove('show');hint.innerHTML='';}
 if(ex&&ex.inputs) ex.inputs.forEach((inp,i)=>{
 const el=document.getElementById(inp.id);
 if(el){el.value='';el.classList.remove('correct','wrong');}
 });
 if(ex&&ex.mcq){
 const mcqC=document.getElementById('mcq_'+exId);
 if(mcqC) mcqC.querySelectorAll('.mcq-option').forEach(el=>el.classList.remove('selected','correct','wrong'));
 }
 }
 updateProgress();
}

function checkEx(exId){
 const spec = ANS[exId];
 if(!spec) return;
 const t = T[lang];
 let allOk = true;
 const card = document.getElementById('card_'+exId);

 // Check MCQ
 if(spec.mcq!==undefined){
 const sel = window['mcqSel_'+exId];
 const container = document.getElementById('mcq_'+exId);
 if(sel===undefined){allOk=false;}
 else{
 const ok = sel===spec.mcq;
 if(!ok) allOk=false;
 if(container){
 container.querySelectorAll('.mcq-option').forEach((el,i)=>{
 el.classList.remove('correct','wrong','selected');
 if(i===sel) el.classList.add(ok?'correct':'wrong');
 if(!ok && i===spec.mcq) el.classList.add('correct');
 });
 }
 }
 }

 // Check inputs
 if(spec.inputs){
 const ex = findMacEx(exId);
 spec.inputs.forEach(([correct,tol],i)=>{
 if(!ex||!ex.inputs||!ex.inputs[i]) return;
 const el = document.getElementById(ex.inputs[i].id);
 if(!el) return;
 const val = parseFloat(el.value);
 const ok = !isNaN(val) && Math.abs(val-correct)<=tol;
 el.classList.toggle('correct',ok);
 el.classList.toggle('wrong',!ok||isNaN(val));
 if(!ok||isNaN(val)) allOk=false;
 });
 }

 // Feedback
 const fb = document.getElementById('fb_'+exId);
 if(fb){
 const enc = t.encouragements; fb.textContent = allOk ? enc[Math.floor(Math.random()*enc.length)]: t.wrong_msg;
 fb.className = 'feedback show ' + (allOk?'ok':'bad');
 }
 if(card){card.classList.toggle('correct',allOk);card.classList.toggle('wrong',!allOk);}

 if(allOk){
 correctSet.add(exId);
 } else {
 correctSet.delete(exId);
 }
 recordAttempt(exId, allOk);
 saveMacProgress();
 updateProgress();
}

function updateProgress(){
 if(currentSubject!=='mac') return;
 const total = Object.values(getExercises()).reduce((s,w)=>s+w.exercises.length,0);
 const correct = [...correctSet].filter(id=>!id.startsWith('lvl_')).length;
 document.getElementById('gpCount').textContent = correct+'/'+total;
 document.getElementById('globalFill').style.width = (correct/total*100)+'%';

 // Per workshop
 const wKeys=['w1','w2','w3','w4','w5','w6'];
 const data = getExercises();
 wKeys.forEach((wk,wi)=>{
 if(!data[wk].exercises) return;
 const exIds = data[wk].exercises.map(e=>e.id);
 const wCorrect = exIds.filter(id=>correctSet.has(id)).length;
 const numEl=document.getElementById('scoreNum_'+wi);
 const txtEl=document.getElementById('scoreTxt_'+wi);
 if(numEl) numEl.textContent=wCorrect;
 if(txtEl) txtEl.textContent=wCorrect+'/'+exIds.length+' '+(T[lang]||T.nl).score_text;
 });
}

function switchTab(idx){
 document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',i===idx));
 document.querySelectorAll('.workshop-panel').forEach((p,i)=>p.classList.toggle('active',i===idx));
}

function setLang(l){
 lang = l;
 document.querySelectorAll('.lang-btn').forEach(b=>{
 b.classList.toggle('active', b.textContent===l.toUpperCase());
 });
 buildUI();
 if(currentSubject==='omi'){
 omiBuilt = false;
 document.getElementById('omiTabsRow').innerHTML = '';
 document.getElementById('omiArea').innerHTML = '';
 buildOmiUI();
 updateOmiProgress();
 }
 if(currentSubject==='test'){
 testBuilt = false;
 document.getElementById('testTabsRow').innerHTML = '';
 document.getElementById('testArea').innerHTML = '';
 buildTestUI();
 updateTestProgress();
 }
 if(currentSubject==='lvl'){
 lvlBuilt = false;
 document.getElementById('lvlTabsRow').innerHTML = '';
 document.getElementById('lvlArea').innerHTML = '';
 buildLvlUI();
 updateLvlProgress();
 }
 if(currentSubject==='pm'){ buildPmUI(); updatePmProgress(); }
 if(currentSubject==='home') buildHome();
 if(currentSubject==='theory') buildTheoryUI();
}

function toggleCS(){
 const overlay = document.getElementById('csOverlay');
 const panel = document.getElementById('csPanel');
 const isShow = overlay.classList.toggle('show');
 if(isShow) panel.innerHTML = getCS();
}

document.getElementById('csOverlay').addEventListener('click',function(e){
 if(e.target===this) toggleCS();
});

