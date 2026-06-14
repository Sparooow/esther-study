// ═══════════════════════════════════════════════════════════════════
// Exam switcher — Exam 1 (MAC+OmI) and Exam 2 (Process Management),
// each a fully self-contained world (home, subject, test, theory, niveaus)
// ═══════════════════════════════════════════════════════════════════
let currentExam = parseInt(localStorage.getItem('esther_exam')||'1',10);

function renderCategoryBar(n){
 const bar = document.getElementById('subjSwitcher');
 const cats = n===1
 ? [['home','🏠'],['mac','MAC'],['omi','📘 OmI'],['test','🎓 Test'],['theory','📖 Théorie'],['lvl','📶 Niveaus']]
: [['home','🏠'],['pm','📋 Process Mgmt'],['test','🎓 Test'],['theory','📖 Théorie'],['lvl','📶 Niveaus']];
 bar.innerHTML = cats.map(([k,lab])=>`<button class="subj-btn" data-subj="${k}" onclick="switchSubject('${k}')">${lab}</button>`).join('');
}

function switchExam(n){
 currentExam = n;
 localStorage.setItem('esther_exam', String(n));
 document.querySelectorAll('.exam-btn').forEach(b=>b.classList.toggle('active', +b.dataset.exam===n));
 renderCategoryBar(n);
 // reset subject builds that depend on exam-specific data
 theoryTab = n===1 ? 'mac': 'pm';
 lvlBuilt = false; testBuilt = false;
 document.getElementById('lvlTabsRow').innerHTML=''; document.getElementById('lvlArea').innerHTML='';
 document.getElementById('testTabsRow').innerHTML=''; document.getElementById('testArea').innerHTML='';
 switchSubject('home');
}

function buildExam2(){
 const L = lang==='fr' ? {
 t:'Examen 2', h:'Pas encore de contenu ici',
 p1:'Cet espace est prêt à accueillir les matières de ton deuxième examen.',
 p2:'Envoie tes supports et je créerai la théorie et les exercices, exactement comme pour l\'examen 1.',
 box:'📎 Ce que tu peux m\'envoyer:',
 li:['Tes PowerPoints de cours (.pptx)','Des photos de ton livre / syllabus','Des exercices ou anciens examens','Une simple description des chapitres']
 }: lang==='en' ? {
 t:'Exam 2', h:'No content here yet',
 p1:'This space is ready to host the subjects of your second exam.',
 p2:'Send your materials and I\'ll create the theory and exercises, just like for exam 1.',
 box:'📎 What you can send:',
 li:['Your course PowerPoints (.pptx)','Photos of your book / syllabus','Exercises or past exams','A simple description of the chapters']
 }: {
 t:'Examen 2', h:'Nog geen inhoud hier',
 p1:'Deze ruimte staat klaar voor de vakken van je tweede examen.',
 p2:'Stuur je materiaal en ik maak de theorie en oefeningen, net als voor examen 1.',
 box:'📎 Wat je kan sturen:',
 li:['Je cursus-PowerPoints (.pptx)','Foto\'s van je boek / syllabus','Oefeningen of oude examens','Een korte beschrijving van de hoofdstukken']
 };
 document.getElementById('exam2Area').innerHTML = `
<div class="exam2-empty">
 <div class="big">📗</div>
 <h2>${L.h}</h2>
 <p>${L.p1}</p>
 <p>${L.p2}</p>
 <div class="hintbox"><strong>${L.box}</strong><ul style="margin:10px 0 0 18px;line-height:1.9">${L.li.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`;
}

// ═══════════════════════════════════════════════════════════════════
// Theory-only revision space — all theory, no exercises
// ═══════════════════════════════════════════════════════════════════
let theoryTab = 'mac';
function theoryLabels(){
 if(lang==='fr') return {mac:'🧮 MAC', omi:'📘 OmI', intro:'Toute la théorie regroupée pour réviser — sans exercices. Clique un chapitre pour le déplier.', understand:'💡 Comprendre & intuition'};
 if(lang==='en') return {mac:'🧮 MAC', omi:'📘 OmI', intro:'All the theory in one place for revision — no exercises. Click a chapter to expand.', understand:'💡 Understanding & intuition'};
 return {mac:'🧮 MAC', omi:'📘 OmI', intro:'Alle theorie samen om te herhalen — zonder oefeningen. Klik een hoofdstuk om te openen.', understand:'💡 Begrip & intuïtie'};
}
function theoryLocal(o, base){ const k=base+'_'+lang; return o[k]!==undefined?o[k]:(o[base+'_nl']||''); }

function buildTheoryUI(){
 const L = theoryLabels();
 const tabsRow = document.getElementById('theoryTabsRow');
 const area = document.getElementById('theoryArea');
 let blocks = '';
 if(currentExam===2){
 tabsRow.innerHTML = `<div class="tab active">📋 Process Management</div>`;
 PM_UNITS.forEach((u,i)=>{
 const body = (pmL(u,'theory')||'').trim(); if(!body) return;
 blocks += theoryAccordion(pmL(u,'title'), body, PM_AC, i===0);
 });
 area.innerHTML = `<div class="section-sub" style="margin-bottom:20px">${L.intro}</div>${blocks}`;
 return;
 }
 tabsRow.innerHTML =
 `<div class="tab ${theoryTab==='mac'?'active':''}" onclick="setTheoryTab('mac')">${L.mac}</div>`+
 `<div class="tab ${theoryTab==='omi'?'active':''}" onclick="setTheoryTab('omi')">${L.omi}</div>`;
 if(theoryTab==='mac'){
 const data = getExercises();
 const titles = lang==='fr'
 ? ['W1 · Amortissements','W2 · Absorption costing','W3 · Direct costing','W4 · Répartition des coûts','W5 · Break-even & écarts','W6 · Exercices mixtes']
: lang==='en'
 ? ['W1 · Depreciation','W2 · Absorption costing','W3 · Direct costing','W4 · Cost allocation','W5 · Break-even & variances','W6 · Mixed exercises']
: ['W1 · Afschrijvingen','W2 · Absorption costing','W3 · Direct costing','W4 · Kostenverbijzondering','W5 · Break-even & verschillen','W6 · Gemengde oefeningen'];
 ['w1','w2','w3','w4','w5','w6'].forEach((wk,i)=>{
 const th = data[wk] && data[wk].theory; if(!th) return;
 const body = (th[lang]||th.nl||'').trim(); if(!body) return;
 blocks += theoryAccordion(titles[i], body, 'var(--primary)', i===0);
 });
 } else {
 OMI_CHAPTERS.forEach((ch,i)=>{
 const title = theoryLocal(ch,'title');
 let body = theoryLocal(ch,'theory');
 const und = theoryLocal(ch,'understand');
 if(und) body += `<h3 style="margin-top:18px">${L.understand}</h3>` + und;
 blocks += theoryAccordion(title, body, '#f97316', i===0);
 });
 }
 area.innerHTML = `<div class="section-sub" style="margin-bottom:20px">${L.intro}</div>${blocks}`;
}
function theoryAccordion(title, body, color, open){
 return `<div class="theory-toggle" style="border-color:${color}33">
 <div class="theory-toggle-header" style="color:${color}" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.arr').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">
 <span>${title}</span><span class="arr">${open?'▲':'▼'}</span></div>
 <div class="theory-body ${open?'open':''}">${injectDiagrams(body)}</div></div>`;
}
function setTheoryTab(t){ theoryTab=t; buildTheoryUI(); }

// ═══════════════════════════════════════════════════════════════════
// Niveaus / Niveaux — exercises grouped by difficulty
// ═══════════════════════════════════════════════════════════════════
let lvlBuilt = false;
const LVL_EX = {}; // prefixed-id -> cloned MAC exercise (with prefixed input ids)

function lvlLabels(){
 if(lang==='fr') return {easy:'Facile',medium:'Moyen',hard:'Difficile',theory:'Théorie',count:'exercices',intro:{easy:'Commence ici: les bases de chaque chapitre, une notion à la fois.',medium:'Le cœur de l\'examen: combine les notions, attention aux pièges.',hard:'Niveau examen+: exercices chaînés et cas complets. Si tu réussis ça, tu es prête !'}};
 if(lang==='en') return {easy:'Easy',medium:'Medium',hard:'Hard',theory:'Theory',count:'exercises',intro:{easy:'Start here: the basics of each chapter, one concept at a time.',medium:'The core of the exam: combine concepts, watch for traps.',hard:'Exam+ level: chained exercises and full cases. Master these and you\'re ready!'}};
 return {easy:'Makkelijk',medium:'Gemiddeld',hard:'Moeilijk',theory:'Theorie',count:'oefeningen',intro:{easy:'Begin hier: de basis van elk hoofdstuk, één begrip per keer.',medium:'De kern van het examen: combineer begrippen, let op valkuilen.',hard:'Examen+-niveau: gekoppelde oefeningen en volledige cases. Beheers je dit, dan ben je klaar!'}};
}

function omiDiffOf(id){
 const n = parseInt(id.split('_')[1],10);
 return n<=2 ? 'easy': n<=6 ? 'medium': 'hard';
}

function lvlCloneMac(ex){
 const id = 'lvl_'+ex.id;
 const clone = {...ex, id};
 if(ex.inputs) clone.inputs = ex.inputs.map((inp,i)=>({...inp, id:'lvl_'+inp.id}));
 LVL_EX[id] = clone;
 if(ANS[ex.id] && !ANS[id]) ANS[id] = ANS[ex.id];
 return clone;
}

function lvlTheoryToggle(titleHtml, bodyHtml, color){
 return `<div class="theory-toggle" style="border-color:${color}33;background:${color}0a">
 <div class="theory-toggle-header" style="color:${color}" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.arr').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">
 <span>📚 ${titleHtml}</span><span class="arr">▼</span></div>
 <div class="theory-body">${injectDiagrams(bodyHtml)}</div></div>`;
}

function lvlClonePm(ex){ return {...ex, id:'lvl_'+ex.id}; }
function buildLvlPmUI(){
 const lbl = lvlLabels();
 const tabsRow = document.getElementById('lvlTabsRow');
 const area = document.getElementById('lvlArea');
 const pmLbl = pmLabels();
 ['easy','medium','hard'].forEach((lv,i)=>{
 const tab=document.createElement('div'); tab.className='tab'+(i===0?' active':'');
 tab.textContent='📋 '+lbl[lv]; tab.onclick=()=>switchLvlTab(i); tabsRow.appendChild(tab);
 const panel=document.createElement('div'); panel.className='workshop-panel'+(i===0?' active':''); panel.id='lvlPanel_'+i;
 let html=`<h2 class="section-title" style="color:${PM_AC}">📋 Process Management — ${lbl[lv]}</h2><p class="section-sub">${lbl.intro[lv]}</p>`;
 PM_UNITS.forEach(u=>{
 const exs=u.exercises.filter(e=>(e.diff||'medium')===lv && e.type!=='open');
 if(!exs.length) return;
 html+=`<div class="lvl-group-head"><span class="src-badge" style="background:${PM_AC}26;color:${PM_AC};border-color:${PM_AC}55">PM</span>${pmL(u,'title')} <span style="color:var(--muted);font-weight:400;font-size:0.85rem">· ${exs.length} ${lbl.count}</span></div>`;
 html+=exs.map(ex=>renderPmExCard(lvlClonePm(ex),0,pmLbl)).join('');
 });
 panel.innerHTML=html; area.appendChild(panel);
 });
 updatePmProgress();
}
function buildLvlUI(){
 if(lvlBuilt) return;
 lvlBuilt = true;
 if(currentExam===2){ buildLvlPmUI(); return; }
 const lbl = lvlLabels();
 const t = T[lang];
 const tabsRow = document.getElementById('lvlTabsRow');
 const area = document.getElementById('lvlArea');
 const data = getExercises();
 const levels = ['easy','medium','hard'];
 const tabDefs = [];
 levels.forEach(lv=>tabDefs.push({subj:'mac',lv,label:'MAC — '+lbl[lv]}));
 levels.forEach(lv=>tabDefs.push({subj:'omi',lv,label:'OmI — '+lbl[lv]}));

 tabDefs.forEach((td,i)=>{
 const tab = document.createElement('div');
 tab.className = 'tab' + (i===0?' active':'');
 tab.textContent = td.label;
 tab.onclick = () => switchLvlTab(i);
 tabsRow.appendChild(tab);

 const panel = document.createElement('div');
 panel.className = 'workshop-panel' + (i===0?' active':'');
 panel.id = 'lvlPanel_'+i;
 let html = `<h2 class="section-title" style="color:#ec4899">${td.label}</h2>
<p class="section-sub">${lbl.intro[td.lv]}</p>`;

 if(td.subj==='mac'){
 ['w1','w2','w3','w4','w5','w6'].forEach((wk,wi)=>{
 const exs = data[wk].exercises.filter(e=>e.diff===td.lv && e.type!=='open');
 if(!exs.length) return;
 html += `<div class="lvl-group-head"><span class="src-badge">MAC</span>${t.tabs[wi]} <span style="color:var(--muted);font-weight:400;font-size:0.85rem">· ${exs.length} ${lbl.count}</span></div>`;
 if(data[wk].theory) html += lvlTheoryToggle(lbl.theory+' — '+t.tabs[wi], data[wk].theory[lang]||data[wk].theory.nl, '#6c63ff');
 html += `<div id="lvlMacGroup_${td.lv}_${wk}"></div>`;
 });
 } else {
 OMI_CHAPTERS.forEach(ch=>{
 const exs = ch.exercises.filter(e=>omiDiffOf(e.id)===td.lv && e.type!=='open');
 if(!exs.length) return;
 const lblO = omiLabels();
 html += `<div class="lvl-group-head"><span class="src-badge" style="background:rgba(249,115,22,0.15);color:#fb923c;border-color:rgba(249,115,22,0.3)">OmI</span>${omiL(ch,'title')} <span style="color:var(--muted);font-weight:400;font-size:0.85rem">· ${exs.length} ${lbl.count}</span></div>`;
 html += lvlTheoryToggle(lbl.theory+' — '+omiL(ch,'title'), omiL(ch,'theory'), '#f97316');
 html += exs.map(ex=>renderLvlOmiEx(ch,ex,lblO)).join('');
 });
 }
 panel.innerHTML = html;
 area.appendChild(panel);
 });

 // mount MAC cards (buildExCard returns DOM nodes)
 tabDefs.forEach((td,i)=>{
 if(td.subj!=='mac') return;
 ['w1','w2','w3','w4','w5','w6'].forEach(wk=>{
 const mount = document.getElementById(`lvlMacGroup_${td.lv}_${wk}`);
 if(!mount) return;
 data[wk].exercises.filter(e=>e.diff===td.lv && e.type!=='open').forEach(ex=>{
 mount.appendChild(buildExCard(lvlCloneMac(ex), t));
 });
 });
 });
}

function renderLvlOmiEx(ch, ex, lblO){
 const id = 'lvl_'+ex.id;
 const exText = omiEx(ex,'text');
 const exOptions = omiEx(ex,'options') || ex.options_nl || [];
 const exSol = omiEx(ex,'sol');
 const exHint1 = omiEx(ex,'hint1');
 const exHint2 = omiEx(ex,'hint2');
 return `
<div class="exercise-card" id="omiCard_${id}">
 <div class="ex-header">
 <span class="ex-title">${ex.id.toUpperCase().replace('_','.')}</span>
 <span class="badge badge-medium">Concepten</span></div>
 <div class="ex-text">${exText}</div>
 ${exHint1 ? `<div class="hint-area" style="margin:8px 0">
 <button class="btn" style="background:rgba(249,115,22,0.12);color:#f97316;border:1px solid rgba(249,115,22,0.3);font-size:0.8rem;padding:4px 12px" onclick="revealOmiHint('${id}',1)">💡 Hint 1</button>
 <button class="btn" style="background:rgba(249,115,22,0.12);color:#f97316;border:1px solid rgba(249,115,22,0.3);font-size:0.8rem;padding:4px 12px;margin-left:6px" onclick="revealOmiHint('${id}',2)">💡 Hint 2</button>
 <div class="hint-box" id="omiHint1_${id}" style="display:none;margin-top:8px;padding:10px;background:rgba(249,115,22,0.08);border-left:3px solid #f97316;border-radius:4px;font-size:0.88rem">${exHint1}</div>
 <div class="hint-box" id="omiHint2_${id}" style="display:none;margin-top:6px;padding:10px;background:rgba(249,115,22,0.08);border-left:3px solid #f97316;border-radius:4px;font-size:0.88rem">${exHint2}</div></div>`: ''}
 <div class="mcq-options" id="omiMcq_${id}">
 ${exOptions.map((opt,oi)=>`<div class="mcq-option" onclick="selectOmiMcq('${id}',${oi},${ex.correct})">${opt}</div>`).join('')}</div>
 <div class="btn-row">
 <button class="btn btn-check" onclick="checkOmiEx('${id}',${ex.correct})">${lblO.check}</button>
 <button class="btn btn-show" onclick="toggleOmiSol('${id}')">${lblO.show}</button>
 <button class="btn btn-reset" onclick="resetOmiEx('${id}')">${lblO.reset}</button></div>
 <div class="feedback" id="omiFb_${id}"></div>
 <div class="solution-box" id="omiSol_${id}">${exSol}</div></div>`;
}

function switchLvlTab(idx){
 document.querySelectorAll('#lvlTabsRow .tab').forEach((t,i)=>t.classList.toggle('active',i===idx));
 document.querySelectorAll('#lvlArea .workshop-panel').forEach((p,i)=>p.classList.toggle('active',i===idx));
}

function updateLvlProgress(){
 const gpLbl = document.getElementById('gpLabel');
 if(gpLbl) gpLbl.textContent = lang==='fr'?'entraînement par niveau':lang==='en'?'training by level':'oefenen per niveau';
 const lvlIds = Object.keys(LVL_EX);
 const done = [...correctSet].filter(id=>id.startsWith('lvl_')).length + [...omiCorrectSet].filter(id=>id.startsWith('lvl_')).length;
 document.getElementById('gpCount').textContent = '📶';
 document.getElementById('globalFill').style.width = '0%';
}

