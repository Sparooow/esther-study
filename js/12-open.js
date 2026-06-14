// ═══════════════════════════════════════════════════════════════════
// Open-ended questions — type 'open': free-text answer + model answer +
// key-points checklist + self-grading (feeds progress / XP / SRS)
// ═══════════════════════════════════════════════════════════════════
function openLabels(){
  if(lang==='fr') return {ph:'Écris ta réponse ici…',reveal:'Voir la correction',reset:'Effacer',model:'✍️ Réponse modèle',points:'✅ Points clés à mentionner',self:'Évalue ta réponse :',knew:'Je savais',partly:'En partie',no:'Pas su',fbOk:'✓ Bien ! Compté comme maîtrisé.',fbPartly:'🟡 À revoir — on le ressortira en révision.',fbNo:'❌ Pas grave — il reviendra en révision.'};
  if(lang==='en') return {ph:'Write your answer here…',reveal:'Show the correction',reset:'Clear',model:'✍️ Model answer',points:'✅ Key points to mention',self:'Grade your answer:',knew:'I knew it',partly:'Partly',no:'Didn\'t know',fbOk:'✓ Nice! Counted as mastered.',fbPartly:'🟡 Review it — it\'ll come back.',fbNo:'❌ No worries — it\'ll come back in review.'};
  return {ph:'Schrijf hier je antwoord…',reveal:'Toon de correctie',reset:'Wissen',model:'✍️ Modelantwoord',points:'✅ Kernpunten om te vermelden',self:'Beoordeel je antwoord:',knew:'Ik wist het',partly:'Deels',no:'Niet gekend',fbOk:'✓ Goed! Telt als beheerst.',fbPartly:'🟡 Nog herhalen — komt terug.',fbNo:'❌ Geen zorgen — komt terug in herhaling.'};
}
function openL(ex,f){ const k=f+'_'+lang; return ex[k]!==undefined?ex[k]:(ex[f+'_nl']||(ex[f]&&ex[f][lang])||ex[f]||''); }
function saveOpenAns(id,val){ window['openAns_'+id]=val; }
function openBodyHtml(subject, ex, accent){
  const L=openLabels(); const id=ex.id;
  const model=openL(ex,'model'); const pts=openL(ex,'points')||[];
  return `
  <textarea class="open-input" id="open_${subject}_${id}" rows="4" placeholder="${L.ph}" oninput="saveOpenAns('${id}',this.value)">${(window['openAns_'+id]||'').replace(/</g,'&lt;')}</textarea>
  <div class="btn-row">
    <button class="btn" style="background:${accent}" onclick="revealOpen('${subject}','${id}')">${L.reveal}</button>
    <button class="btn btn-reset" onclick="resetOpen('${subject}','${id}')">${L.reset}</button>
  </div>
  <div class="open-correction" id="opencorr_${subject}_${id}" style="display:none">
    <div class="open-model"><strong>${L.model}</strong><br>${model}</div>
    <div class="open-points"><strong>${L.points}</strong><ul>${(Array.isArray(pts)?pts:[]).map(p=>`<li>${p}</li>`).join('')}</ul></div>
    <div class="open-grade"><span>${L.self}</span>
      <button class="og og-ok" onclick="gradeOpen('${subject}','${id}',2)">✅ ${L.knew}</button>
      <button class="og og-mid" onclick="gradeOpen('${subject}','${id}',1)">🟡 ${L.partly}</button>
      <button class="og og-no" onclick="gradeOpen('${subject}','${id}',0)">❌ ${L.no}</button>
    </div>
  </div>
  <div class="feedback" id="openfb_${subject}_${id}"></div>`;
}
const OPEN_SETS={ mac:()=>correctSet, omi:()=>omiCorrectSet, pm:()=>pmCorrectSet };
const OPEN_CARDPFX={ mac:'card_', omi:'omiCard_', pm:'pmCard_' };
function revealOpen(subject,id){ const c=document.getElementById('opencorr_'+subject+'_'+id); if(c) c.style.display=''; }
function resetOpen(subject,id){
  window['openAns_'+id]=''; const ta=document.getElementById('open_'+subject+'_'+id); if(ta) ta.value='';
  const c=document.getElementById('opencorr_'+subject+'_'+id); if(c) c.style.display='none';
  const fb=document.getElementById('openfb_'+subject+'_'+id); if(fb){fb.textContent='';fb.className='feedback';}
  OPEN_SETS[subject]().delete(id);
  const card=document.getElementById(OPEN_CARDPFX[subject]+id); if(card) card.classList.remove('correct','wrong');
  ({mac:saveMacProgress,omi:saveOmiProgress,pm:savePmProgress})[subject]();
  ({mac:updateProgress,omi:updateOmiProgress,pm:updatePmProgress})[subject]();
}
function gradeOpen(subject,id,level){
  const ok=level===2; const set=OPEN_SETS[subject]();
  if(ok) set.add(id); else set.delete(id);
  recordAttempt(id, ok);
  ({mac:saveMacProgress,omi:saveOmiProgress,pm:savePmProgress})[subject]();
  const card=document.getElementById(OPEN_CARDPFX[subject]+id);
  if(card){ card.classList.toggle('correct',ok); card.classList.toggle('wrong',level===0); }
  const L=openLabels(); const fb=document.getElementById('openfb_'+subject+'_'+id);
  if(fb){ fb.textContent= ok?L.fbOk:level===1?L.fbPartly:L.fbNo; fb.className='feedback show '+(ok?'ok':'bad'); }
  ({mac:updateProgress,omi:updateOmiProgress,pm:updatePmProgress})[subject]();
}

