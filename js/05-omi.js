// ═══════════════════════════════════════════════════════════════════
// OmI — Ondernemen met Informatie (H1-H6)
// ═══════════════════════════════════════════════════════════════════
let currentSubject = 'mac';
let omiBuilt = false;
const omiCorrectSet = new Set(JSON.parse(localStorage.getItem('esther_omi_correct')||'[]'));
const omiMcqSel = {};


// OmI chapters — loaded from data/omi.json at init (see 00-data-loader.js).
const OMI_CHAPTERS = [];




function switchSubject(s){
 currentSubject = s;
 const e1 = currentExam===1;
 document.getElementById('homeWrap').style.display = s==='home' ? '': 'none';
 document.getElementById('macWrap').style.display = (e1 && s==='mac') ? '': 'none';
 document.getElementById('omiWrap').style.display = (e1 && s==='omi') ? '': 'none';
 document.getElementById('exam2Wrap').style.display = (!e1 && s==='pm') ? '': 'none';
 document.getElementById('pmTabsContainer').style.display = (!e1 && s==='pm' && PM_UNITS.length) ? '': 'none';
 document.getElementById('testWrap').style.display = s==='test' ? '': 'none';
 document.getElementById('lvlWrap').style.display = s==='lvl' ? '': 'none';
 document.getElementById('theoryWrap').style.display = s==='theory' ? '': 'none';
 document.getElementById('langSwitcher').style.display = '';
 document.getElementById('btnCS').style.display = (e1 && s==='mac') ? '': 'none';
 document.querySelectorAll('.subj-btn').forEach(b => b.classList.toggle('active', b.dataset.subj===s));
 if(s==='home'){ buildHome(); }
 else if(s==='pm'){ buildPmUI(); updatePmProgress(); }
 else if(s==='theory'){ buildTheoryUI(); }
 else if(s==='omi'){ buildOmiUI(); updateOmiProgress(); }
 else if(s==='test'){ buildTestUI(); updateTestProgress(); }
 else if(s==='lvl'){ buildLvlUI(); updateLvlProgress(); }
 else { updateProgress(); }
}

