// Data loader — populates the app's data structures from clean JSON in data/*.json.
// Runs before init (see 15-main.js). The renderers are unchanged: this rebuilds the
// exact legacy shapes they expect (_nl/_en/_fr fields) from the unified trilingual JSON.
// If the fetch fails (e.g. opened via file://), the app keeps the embedded data as fallback.
let __MAC_DATA = null;
function __spread(o, tri, base){ o[base+'_nl']=tri?tri.nl:''; o[base+'_en']=tri?(tri.en!==undefined?tri.en:tri.nl):''; o[base+'_fr']=tri?(tri.fr!==undefined?tri.fr:tri.nl):''; }
// unified exercise {nl,en,fr objects} -> flat _nl/_en/_fr shape the OmI/PM/exam renderers read
function __flatEx(u){
  const e={ id:u.id, type:u.type, diff:u.diff||'medium' };
  __spread(e, u.text, 'text');
  if(u.type==='open'){ __spread(e,u.model,'model'); e.points_nl=(u.points&&u.points.nl)||[]; e.points_en=(u.points&&u.points.en)||e.points_nl; e.points_fr=(u.points&&u.points.fr)||e.points_nl; return e; }
  __spread(e, u.sol, 'sol');
  if(u.hints && u.hints.length){ __spread(e,u.hints[0],'hint1'); __spread(e,u.hints[1]||u.hints[0],'hint2'); }
  if(u.type==='mcq'){ e.options_nl=u.options.map(o=>o.nl); e.options_en=u.options.map(o=>o.en); e.options_fr=u.options.map(o=>o.fr); e.correct=u.correct; }
  else if(u.type==='numeric'){ e.inputs=u.inputs.map(inp=>({ label_nl:inp.label.nl, label_en:inp.label.en, label_fr:inp.label.fr, answer:inp.answer })); }
  return e;
}
async function loadDataInto(){
  let mac,omi,pm,exams,ans;
  try{
    [mac,omi,pm,exams,ans] = await Promise.all(
      ['mac','omi','pm','exams','ans'].map(n=>fetch('data/'+n+'.json').then(r=>{ if(!r.ok) throw new Error(n); return r.json(); }))
    );
  }catch(err){ console.warn('[data-loader] JSON fetch failed, using embedded fallback:', err.message); return false; }

  // ---- OmI chapters ----
  const omiArr = omi.map(ch=>{ const c={key:ch.key}; __spread(c,ch.title,'title'); __spread(c,ch.sub,'sub'); __spread(c,ch.theory,'theory'); if(ch.understand) __spread(c,ch.understand,'understand'); c.exercises=ch.exercises.map(__flatEx); return c; });
  OMI_CHAPTERS.length=0; omiArr.forEach(x=>OMI_CHAPTERS.push(x));

  // ---- PM units ----
  const pmArr = pm.map(u=>{ const o={key:u.key,pts:u.pts}; __spread(o,u.title,'title'); __spread(o,u.theory,'theory'); o.exercises=u.exercises.map(__flatEx); return o; });
  PM_UNITS.length=0; pmArr.forEach(x=>PM_UNITS.push(x));

  // ---- Mock exams (exam1 = MAC/OmI, exam2 = Process Management) ----
  function flatExam(ex){ const o={key:ex.key,duration_min:ex.duration_min}; __spread(o,ex.title,'title'); o.questions=ex.questions.map(q=>{ const fq=__flatEx(q); fq.subject=q.subject; fq.points=q.points; return fq; }); return o; }
  EXAMS.length=0; exams.exam1.map(flatExam).forEach(x=>EXAMS.push(x));
  PM_EXAMS.length=0; exams.exam2.map(flatExam).forEach(x=>PM_EXAMS.push(x));

  // ---- MAC answers (with tolerances) ----
  Object.keys(ANS).forEach(k=>delete ANS[k]); Object.keys(ans).forEach(k=>{ ANS[k]=ans[k]; });

  // ---- MAC exercises: getExercises() localizes the unified data to the current lang ----
  __MAC_DATA = mac;
  getExercises = function(){
    const L=lang, pick=t=>t?(t[L]!==undefined?t[L]:t.nl):'';
    const out={};
    for(const wk of Object.keys(__MAC_DATA)){
      const W=__MAC_DATA[wk];
      out[wk]={ theory:W.theory, exercises: W.exercises.map(u=>{
        const e={ id:u.id, diff:u.diff, type:u.type, title:pick(u.title), text:pick(u.text) };
        if(u.type==='open'){ __spread(e,u.model,'model'); e.points_nl=(u.points&&u.points.nl)||[]; e.points_en=(u.points&&u.points.en)||e.points_nl; e.points_fr=(u.points&&u.points.fr)||e.points_nl; return e; }
        e.sol=pick(u.sol);
        if(u.hints) e.hints=u.hints.map(pick);
        if(u.type==='mcq'){ e.mcq=u.options.map(pick); }
        else if(u.type==='numeric'){ e.inputs=u.inputs.map((inp,i)=>({ label:pick(inp.label), id:u.id+'_'+i })); }
        return e;
      })};
    }
    return out;
  };
  console.log('[data-loader] loaded: OmI',OMI_CHAPTERS.length,'PM',PM_UNITS.length,'exams',EXAMS.length+'+'+PM_EXAMS.length,'ANS',Object.keys(ANS).length);
  return true;
}
