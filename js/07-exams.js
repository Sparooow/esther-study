// ═══════════════════════════════════════════════════════════════════
// Test/Examens blancs — MAC × OmI
// ═══════════════════════════════════════════════════════════════════
let testBuilt = false;
const testAnswers = {}; // qId -> {mcq:idx} or {inputs:[...]}
const EXAMS = []; // exam 1 (MAC/OmI) mock exams
let PM_EXAMS = []; // exam 2 (Process Management) mock exams
function curExams(){ return currentExam===2 ? PM_EXAMS: EXAMS; }

function tL(o, field){
 const k = field + '_' + lang;
 return o[k] !== undefined ? o[k]: (o[field+'_nl'] !== undefined ? o[field+'_nl']: o[field] || '');
}

function testLabels(){
 if(lang==='fr') return {exLabel:'Question',check:'Vérifier',show:'Voir la solution',reset:'Réinitialiser',submit:'Corriger tout l\'examen',duration:'min',points:'pts',result:(s,t)=>`Score: ${s}/${t} points`,grade:g=>g>=0.85?'Excellent ! 🌟':g>=0.7?'Très bien ! 💪':g>=0.5?'Réussi — continue à t\'entraîner':'Pas encore — refais les exercices des chapitres concernés',correct:'✓ Correct !',wrong:'✗ Pas correct.',chooseAnswer:'Choisissez une réponse !',resetExam:'Recommencer cet examen'};
 if(lang==='en') return {exLabel:'Question',check:'Check',show:'Show solution',reset:'Reset',submit:'Grade entire exam',duration:'min',points:'pts',result:(s,t)=>`Score: ${s}/${t} points`,grade:g=>g>=0.85?'Excellent! 🌟':g>=0.7?'Very good! 💪':g>=0.5?'Passed — keep practising':'Not yet — review the relevant chapters',correct:'✓ Correct!',wrong:'✗ Not correct.',chooseAnswer:'Choose an answer!',resetExam:'Restart this exam'};
 return {exLabel:'Vraag',check:'Controleer',show:'Toon oplossing',reset:'Reset',submit:'Volledige test verbeteren',duration:'min',points:'ptn',result:(s,t)=>`Score: ${s}/${t} punten`,grade:g=>g>=0.85?'Uitstekend! 🌟':g>=0.7?'Zeer goed! 💪':g>=0.5?'Geslaagd — blijf oefenen':'Nog niet — herbekijk de hoofdstukken',correct:'✓ Correct!',wrong:'✗ Niet correct.',chooseAnswer:'Kies een antwoord!',resetExam:'Test opnieuw beginnen'};
}

function buildTestUI(){
 if(testBuilt) return;
 testBuilt = true;
 const lbl = testLabels();
 const tabsRow = document.getElementById('testTabsRow');
 const area = document.getElementById('testArea');
 curExams().forEach((exam,i)=>{
 const tab = document.createElement('div');
 tab.className = 'tab' + (i===0?' active':'');
 tab.textContent = tL(exam,'title');
 tab.onclick = () => switchTestTab(i);
 tabsRow.appendChild(tab);
 const totalPts = exam.questions.reduce((s,q)=>s+(q.points||1),0);
 const panel = document.createElement('div');
 panel.className = 'workshop-panel' + (i===0?' active':'');
 panel.id = 'testPanel_'+i;
 panel.innerHTML = `
<h2 class="section-title" style="color:#10b981">${tL(exam,'title')}</h2>
<div class="exam-meta">⏱ ${exam.duration_min} ${lbl.duration} · ${exam.questions.length} ${lbl.exLabel.toLowerCase()}s · ${totalPts} ${lbl.points}
 <button class="lang-btn" id="examTimerBtn_${exam.key}" onclick="startExamTimer('${exam.key}')" style="background:var(--success-bg);color:var(--success);border-color:transparent">▶ ${lang==='fr'?'Lancer le chrono':lang==='en'?'Start timer':'Start timer'}</button>
 <span class="exam-timer" id="examTimer_${exam.key}" style="display:none"></span></div>
<div id="examResult_${exam.key}"></div>
${exam.questions.map((q,qi)=>renderTestQ(exam,q,qi,lbl)).join('')}
<div class="btn-row" style="margin-top:28px">
 <button class="btn btn-check" style="background:#10b981;font-size:1rem;padding:12px 28px" onclick="gradeExam('${exam.key}')">🎓 ${lbl.submit}</button>
 <button class="btn btn-reset" onclick="resetExam('${exam.key}')">${lbl.resetExam}</button></div>`;
 area.appendChild(panel);
 });
}

function renderTestQ(exam,q,qi,lbl){
 const subjBadge = `<span class="exam-subj-badge ${q.subject}">${q.subject==='mac'?'MAC':'OmI'}</span>`;
 let body = '';
 if(q.type==='mcq'){
 const opts = tL(q,'options') || [];
 body = `<div class="mcq-options" id="testMcq_${q.id}">
 ${opts.map((opt,oi)=>`<div class="mcq-option" onclick="selectTestMcq('${q.id}',${oi})">${opt}</div>`).join('')}</div>`;
 } else {
 body = `<div class="inputs-row">
 ${(q.inputs||[]).map((inp,ii)=>`<div class="input-group">
 <label class="input-label">${tL(inp,'label')}</label>
 <input class="input-field" id="test_${q.id}_${ii}" type="number" step="any" placeholder="?" oninput="saveTestInput('${q.id}',${ii},this.value)"></div>`).join('')}</div>`;
 }
 return `
<div class="exercise-card" id="testCard_${q.id}">
 <div class="ex-header">
 <span class="ex-title">${lbl.exLabel} ${qi+1}</span>
 ${subjBadge}
 <span class="exam-q-pts">${q.points||1} ${lbl.points}</span></div>
 <div class="ex-text">${tL(q,'text')}</div>
 ${body}
 <div class="feedback" id="testFb_${q.id}"></div>
 <div class="solution-box" id="testSol_${q.id}">${tL(q,'sol')}</div></div>`;
}

function selectTestMcq(qId, idx){
 testAnswers[qId] = {mcq:idx};
 const c = document.getElementById('testMcq_'+qId);
 if(c) c.querySelectorAll('.mcq-option').forEach((el,i)=>{
 el.classList.remove('selected','correct','wrong');
 if(i===idx) el.classList.add('selected');
 });
}

function saveTestInput(qId, idx, val){
 if(!testAnswers[qId] || !testAnswers[qId].inputs) testAnswers[qId] = {inputs:[]};
 testAnswers[qId].inputs[idx] = val;
}

function gradeExam(key){
 stopExamTimer(key);
 const exam = curExams().find(e=>e.key===key);
 if(!exam) return;
 const lbl = testLabels();
 let score = 0, total = 0;
 exam.questions.forEach(q=>{
 const pts = q.points||1;
 total += pts;
 const ans = testAnswers[q.id];
 let ok = false;
 if(q.type==='mcq'){
 ok = ans && ans.mcq === q.correct;
 const c = document.getElementById('testMcq_'+q.id);
 if(c) c.querySelectorAll('.mcq-option').forEach((el,i)=>{
 el.classList.remove('selected','correct','wrong');
 if(ans && i===ans.mcq) el.classList.add(ok?'correct':'wrong');
 if(!ok && i===q.correct) el.classList.add('correct');
 });
 } else {
 ok = (q.inputs||[]).every((inp,ii)=>{
 const v = parseFloat((ans && ans.inputs && ans.inputs[ii] || '').toString().replace(',','.'));
 if(isNaN(v)) return false;
 const tol = Number.isInteger(inp.answer) ? 0.01: 0.15;
 return Math.abs(v - inp.answer) <= Math.max(tol, Math.abs(inp.answer)*0.002);
 });
 }
 if(ok) score += pts;
 const fb = document.getElementById('testFb_'+q.id);
 if(fb){fb.textContent = ok?lbl.correct:lbl.wrong;fb.className='feedback show '+(ok?'ok':'bad');}
 const sol = document.getElementById('testSol_'+q.id);
 if(sol && !ok) sol.classList.add('show');
 const card = document.getElementById('testCard_'+q.id);
 if(card){card.classList.toggle('correct',ok);card.classList.toggle('wrong',!ok);}
 });
 const ratio = score/total;
 const resEl = document.getElementById('examResult_'+key);
 if(resEl) resEl.innerHTML = `<div class="exam-result"><div class="big-score">${score}/${total}</div><div>${lbl.grade(ratio)}</div></div>`;
 resEl.scrollIntoView({behavior:'smooth'});
 setExamBest(ratio);
 if(typeof logEvent==='function') logEvent('exam', { ref: key, subject: 'exam', meta: { score: score, total: total, pct: Math.round(ratio*100) } });
 if(ratio>=0.5){ confetti(ratio>=0.85?180:110); chime('win'); }
}

function resetExam(key){
 const exam = curExams().find(e=>e.key===key);
 if(!exam) return;
 exam.questions.forEach(q=>{
 delete testAnswers[q.id];
 const c = document.getElementById('testMcq_'+q.id);
 if(c) c.querySelectorAll('.mcq-option').forEach(el=>el.classList.remove('selected','correct','wrong'));
 (q.inputs||[]).forEach((_,ii)=>{const el=document.getElementById('test_'+q.id+'_'+ii); if(el) el.value='';});
 const fb = document.getElementById('testFb_'+q.id); if(fb) fb.className='feedback';
 const sol = document.getElementById('testSol_'+q.id); if(sol) sol.classList.remove('show');
 const card = document.getElementById('testCard_'+q.id); if(card) card.classList.remove('correct','wrong');
 });
 const resEl = document.getElementById('examResult_'+key);
 if(resEl) resEl.innerHTML = '';
}

function switchTestTab(idx){
 document.querySelectorAll('#testTabsRow .tab').forEach((t,i)=>t.classList.toggle('active',i===idx));
 document.querySelectorAll('#testArea .workshop-panel').forEach((p,i)=>p.classList.toggle('active',i===idx));
}

function updateTestProgress(){
 const gpLbl = document.getElementById('gpLabel');
 if(gpLbl) gpLbl.textContent = lang==='fr'?'mode examen':lang==='en'?'exam mode':'testmodus';
 document.getElementById('gpCount').textContent = '🎓';
 document.getElementById('globalFill').style.width = '0%';
}

function omiL(ch, field){
 // Returns the localized version of a chapter field (theory, understand, sub, title, etc.)
 const key = field + '_' + lang;
 return ch[key] !== undefined ? ch[key]: (ch[field + '_nl'] !== undefined ? ch[field + '_nl']: ch[field] || '');
}

function omiEx(ex, field){
 const key = field + '_' + lang;
 return ex[key] !== undefined ? ex[key]: (ex[field + '_nl'] !== undefined ? ex[field + '_nl']: ex[field] || '');
}

function randEncouragement(){
 const enc = T[lang].encouragements;
 return enc[Math.floor(Math.random()*enc.length)];
}
function omiLabels(){
 if(lang==='fr') return {theory:'Théorie',understand:'Compréhension & Intuition — Exemples concrets',exLabel:'Exercice',check:'Vérifier',show:'Voir la solution',reset:'Réinitialiser',chooseAnswer:'Choisissez une réponse !',correct:randEncouragement(),wrong:'✗ Pas correct — la bonne réponse est indiquée en vert.',score:' exercices corrects'};
 if(lang==='en') return {theory:'Theory',understand:'Understanding & Intuition — Concrete Examples',exLabel:'Exercise',check:'Check',show:'Show solution',reset:'Reset',chooseAnswer:'Choose an answer!',correct:randEncouragement(),wrong:'✗ Not correct — the correct answer is shown in green.',score:' exercises correct'};
 return {theory:'Theorie',understand:'Begrip & Intuïtie — Concrete Voorbeelden',exLabel:'Oefening',check:'Controleer',show:'Toon oplossing',reset:'Reset',chooseAnswer:'Kies een antwoord!',correct:randEncouragement(),wrong:'✗ Niet correct — het juiste antwoord is groen aangeduid.',score:' oefeningen correct'};
}

function buildOmiUI(){
 if(omiBuilt) return;
 omiBuilt = true;
 const lbl = omiLabels();
 const tabsRow = document.getElementById('omiTabsRow');
 const area = document.getElementById('omiArea');
 OMI_CHAPTERS.forEach((ch,i) => {
 const tab = document.createElement('div');
 tab.className = 'tab' + (i===0?' active':'');
 tab.textContent = omiL(ch,'title');
 tab.onclick = () => switchOmiTab(i);
 tabsRow.appendChild(tab);
 const panel = document.createElement('div');
 panel.className = 'workshop-panel' + (i===0?' active':'');
 panel.id = 'omiPanel_'+i;
 const exCount = ch.exercises.length;
 const scoreTxt = `0/${exCount}${lbl.score}`;
 panel.innerHTML = `
<h2 class="section-title" style="color:#f97316">${omiL(ch,'title')}</h2>
<p class="section-sub">${omiL(ch,'sub')}</p>
<div class="score-badge">
 <span class="score-num" style="color:#f97316" id="omiScoreNum_${i}">0</span>
 <div><div style="font-weight:600;margin-bottom:2px">${omiL(ch,'title')}</div>
 <div class="score-text" id="omiScoreTxt_${i}">${scoreTxt}</div></div></div>
<div class="theory-toggle" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.04)">
 <div class="theory-toggle-header" style="color:#f97316" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.arr').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">
 <span>📚 ${lbl.theory} — ${omiL(ch,'title')}</span><span class="arr">▼</span></div>
 <div class="theory-body">${injectDiagrams(omiL(ch,'theory'))}</div></div>
<div class="understand-toggle">
 <div class="understand-header" onclick="const b=this.nextElementSibling;b.classList.toggle('open');this.querySelector('.arr').textContent=b.classList.contains('open')?'▲':'▼'">
 <span>💡 ${lbl.understand}</span><span class="arr">▼</span></div>
 <div class="understand-body">${omiL(ch,'understand')}</div></div>
${ch.exercises.map((ex,ei)=>{
 const exText = omiEx(ex,'text');
 if(ex.type==='open'){
   return `<div class="exercise-card" id="omiCard_${ex.id}">
 <div class="ex-header"><span class="ex-title">${lbl.exLabel} ${ei+1}</span><span class="badge badge-open">${lang==='fr'?'Ouverte':'Open'}</span></div>
 <div class="ex-text">${exText}</div>${openBodyHtml('omi', ex, '#f97316')}</div>`;
 }
 const exOptions = omiEx(ex,'options') || ex.options || ex.options_nl || [];
 const exSol = omiEx(ex,'sol');
 const exHint1 = omiEx(ex,'hint1');
 const exHint2 = omiEx(ex,'hint2');
 return `
<div class="exercise-card" id="omiCard_${ex.id}">
 <div class="ex-header">
 <span class="ex-title">${lbl.exLabel} ${ei+1}</span>
 <span class="badge badge-medium">Concepten</span></div>
 <div class="ex-text">${exText}</div>
 ${exHint1 ? `<div class="hint-area" id="omiHintArea_${ex.id}" style="margin:8px 0">
 <button class="btn" style="background:rgba(249,115,22,0.12);color:#f97316;border:1px solid rgba(249,115,22,0.3);font-size:0.8rem;padding:4px 12px" onclick="revealOmiHint('${ex.id}',1)">💡 Hint 1</button>
 <button class="btn" style="background:rgba(249,115,22,0.12);color:#f97316;border:1px solid rgba(249,115,22,0.3);font-size:0.8rem;padding:4px 12px;margin-left:6px" onclick="revealOmiHint('${ex.id}',2)">💡 Hint 2</button>
 <div class="hint-box" id="omiHint1_${ex.id}" style="display:none;margin-top:8px;padding:10px;background:rgba(249,115,22,0.08);border-left:3px solid #f97316;border-radius:4px;font-size:0.88rem">${exHint1}</div>
 <div class="hint-box" id="omiHint2_${ex.id}" style="display:none;margin-top:6px;padding:10px;background:rgba(249,115,22,0.08);border-left:3px solid #f97316;border-radius:4px;font-size:0.88rem">${exHint2}</div></div>`: ''}
 <div class="mcq-options" id="omiMcq_${ex.id}">
 ${exOptions.map((opt,oi)=>`<div class="mcq-option" onclick="selectOmiMcq('${ex.id}',${oi},${ex.correct})">${opt}</div>`).join('')}</div>
 <div class="btn-row">
 <button class="btn btn-check" onclick="checkOmiEx('${ex.id}',${ex.correct})">${lbl.check}</button>
 <button class="btn btn-show" onclick="toggleOmiSol('${ex.id}')">${lbl.show}</button>
 <button class="btn btn-reset" onclick="resetOmiEx('${ex.id}')">${lbl.reset}</button></div>
 <div class="feedback" id="omiFb_${ex.id}"></div>
 <div class="solution-box" id="omiSol_${ex.id}">${exSol}</div></div>`;}).join('')}`;
 area.appendChild(panel);
 });
}

function revealOmiHint(exId, n){
 const el = document.getElementById('omiHint'+n+'_'+exId);
 if(el) el.style.display = el.style.display==='none' ? 'block': 'none';
}

function switchOmiTab(idx){
 document.querySelectorAll('#omiTabsRow .tab').forEach((t,i)=>t.classList.toggle('active',i===idx));
 document.querySelectorAll('#omiArea .workshop-panel').forEach((p,i)=>p.classList.toggle('active',i===idx));
}

function selectOmiMcq(exId, idx){
 omiMcqSel[exId] = idx;
 const c = document.getElementById('omiMcq_'+exId);
 if(c) c.querySelectorAll('.mcq-option').forEach((el,i)=>{
 el.classList.remove('selected','correct','wrong');
 if(i===idx) el.classList.add('selected');
 });
}

function checkOmiEx(exId, correct){
 const sel = omiMcqSel[exId];
 const c = document.getElementById('omiMcq_'+exId);
 const fb = document.getElementById('omiFb_'+exId);
 const card = document.getElementById('omiCard_'+exId);
 const lbl = omiLabels();
 if(sel===undefined){if(fb){fb.textContent=lbl.chooseAnswer;fb.className='feedback show bad';}return;}
 const ok = sel===correct;
 if(c) c.querySelectorAll('.mcq-option').forEach((el,i)=>{
 el.classList.remove('selected','correct','wrong');
 if(i===sel) el.classList.add(ok?'correct':'wrong');
 if(!ok && i===correct) el.classList.add('correct');
 });
 if(fb){fb.textContent=ok?lbl.correct:lbl.wrong;fb.className='feedback show '+(ok?'ok':'bad');}
 if(card){card.classList.toggle('correct',ok);card.classList.toggle('wrong',!ok);}
 if(ok) omiCorrectSet.add(exId); else omiCorrectSet.delete(exId);
 recordAttempt(exId, ok);
 saveOmiProgress();
 updateOmiProgress();
}

function toggleOmiSol(exId){
 const sol = document.getElementById('omiSol_'+exId);
 if(sol) sol.classList.toggle('show');
}

function resetOmiEx(exId){
 omiCorrectSet.delete(exId);
 saveOmiProgress();
 delete omiMcqSel[exId];
 const c = document.getElementById('omiMcq_'+exId);
 if(c) c.querySelectorAll('.mcq-option').forEach(el=>el.classList.remove('selected','correct','wrong'));
 const fb = document.getElementById('omiFb_'+exId);
 if(fb){fb.textContent='';fb.className='feedback';}
 const sol = document.getElementById('omiSol_'+exId);
 if(sol) sol.classList.remove('show');
 const card = document.getElementById('omiCard_'+exId);
 if(card) card.classList.remove('correct','wrong');
 updateOmiProgress();
}

function updateOmiProgress(){
 const lbl = omiLabels();
 const total = OMI_CHAPTERS.reduce((s,ch)=>s+ch.exercises.length,0);
 const correct = [...omiCorrectSet].filter(id=>!id.startsWith('lvl_')).length;
 document.getElementById('gpCount').textContent = correct+'/'+total;
 document.getElementById('globalFill').style.width=(correct/total*100)+'%';
 const gpLbl = document.getElementById('gpLabel');
 if(gpLbl) gpLbl.textContent = lang==='fr'?'réponses correctes':lang==='en'?'correct answers':'correct beantwoord';
 OMI_CHAPTERS.forEach((ch,i)=>{
 const n = ch.exercises.filter(ex=>omiCorrectSet.has(ex.id)).length;
 const numEl = document.getElementById('omiScoreNum_'+i);
 const txtEl = document.getElementById('omiScoreTxt_'+i);
 if(numEl) numEl.textContent = n;
 if(txtEl) txtEl.textContent = n+'/'+ch.exercises.length+lbl.score;
 });
}


