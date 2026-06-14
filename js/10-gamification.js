// ═══════════════════════════════════════════════════════════════════
// Cloud sync (Supabase) — code-based, no real account needed
// ═══════════════════════════════════════════════════════════════════
const SB_URL = 'https://jmnbxhoghhqjyenxoejg.supabase.co';
const SB_KEY = 'sb_publishable_K4AlQKDAZ7Ul7TpUeNqFlg_07SnJKxS';
let syncCode = localStorage.getItem('esther_sync_code') || '';
let syncPushTimer = null;

function sbHeaders(){
 return { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY, 'Content-Type': 'application/json' };
}

function updateSyncBtn(ok){
 const btn = document.getElementById('syncBtn');
 if(!btn) return;
 if(syncCode){ btn.textContent = ok===false ? '☁️⚠️': '☁️✓'; btn.title = 'Sync actif: ' + syncCode; }
 else { btn.textContent = '☁️'; btn.title = 'Synchroniser entre appareils'; }
}

async function syncPull(){
 if(!syncCode) return;
 try{
 const res = await fetch(SB_URL + '/rest/v1/progress?code=eq.' + encodeURIComponent(syncCode) + '&select=data', { headers: sbHeaders() });
 if(!res.ok) throw new Error('pull failed');
 const rows = await res.json();
 if(rows.length){
 const data = rows[0].data || {};
 (data.mac||[]).forEach(id => correctSet.add(id));
 (data.omi||[]).forEach(id => omiCorrectSet.add(id));
 if(data.pm && typeof pmCorrectSet!=='undefined'){ data.pm.forEach(id=>pmCorrectSet.add(id)); localStorage.setItem('esther_pm_correct', JSON.stringify([...pmCorrectSet])); if(currentExam===2 && typeof updatePmProgress==='function') updatePmProgress(); }
 if(data.examdates){ localStorage.setItem('esther_examdates', JSON.stringify(data.examdates)); if(currentView==='landing' && typeof buildLanding==='function') buildLanding(); }
 if(data.game && typeof XP!=='undefined'){ const g=data.game;
 XP=Math.max(XP, g.xp||0);
 (g.xpIds||[]).forEach(id=>xpIds.add(id));
 (g.badges||[]).forEach(b=>badges.add(b));
 if(g.srs){ for(const k in g.srs){ if(!srs[k]||g.srs[k].last>srs[k].last) srs[k]=g.srs[k]; } }
 if(g.exambest && g.exambest>_examBestPct){ _examBestPct=g.exambest; localStorage.setItem('esther_exambest',String(_examBestPct)); }
 saveGame(); refreshXpChip();
 }
 if(data.attempts){
 const seen = new Set(attempts.map(a=>a.id+'_'+a.ts));
 data.attempts.forEach(a=>{ if(!seen.has(a.id+'_'+a.ts)) attempts.push(a); });
 attempts.sort((x,y)=>x.ts-y.ts);
 if(attempts.length>3000) attempts = attempts.slice(-3000);
 localStorage.setItem('esther_attempts', JSON.stringify(attempts));
 }
 localStorage.setItem('esther_mac_correct', JSON.stringify([...correctSet]));
 localStorage.setItem('esther_omi_correct', JSON.stringify([...omiCorrectSet]));
 if(typeof restoreStates === 'function') restoreStates();
 if(typeof updateProgress === 'function') updateProgress();
 if(typeof updateOmiProgress === 'function' && currentSubject === 'omi') updateOmiProgress();
 }
 updateSyncBtn(true);
 }catch(e){ updateSyncBtn(false); }
}

async function syncPush(){
 if(!syncCode) return;
 try{
 const body = JSON.stringify([{
 code: syncCode,
 data: { mac: [...correctSet], omi: [...omiCorrectSet], pm: (typeof pmCorrectSet!=='undefined'?[...pmCorrectSet]:[]), attempts: attempts.slice(-2000),
 game: (typeof XP!=='undefined'?{ xp:XP, xpIds:[...xpIds], badges:[...badges], srs:srs, exambest:_examBestPct }:undefined),
 examdates: (typeof examDates==='function'?examDates():undefined) },
 updated_at: new Date().toISOString()
 }]);
 const res = await fetch(SB_URL + '/rest/v1/progress', {
 method: 'POST',
 headers: {...sbHeaders(), 'Prefer': 'resolution=merge-duplicates' },
 body
 });
 updateSyncBtn(res.ok);
 }catch(e){ updateSyncBtn(false); }
}

function schedulePush(){
 if(!syncCode) return;
 clearTimeout(syncPushTimer);
 syncPushTimer = setTimeout(syncPush, 1500);
}

function syncLogin(){
 const msg = lang==='fr' ? 'Choisis ton code de synchronisation (ex: iloveesther).\nUtilise le même code sur ton PC et ton téléphone pour partager ta progression.'
: lang==='en' ? 'Choose your sync code (e.g. iloveesther).\nUse the same code on your PC and phone to share your progress.'
: 'Kies je synchronisatiecode (bv. iloveesther).\nGebruik dezelfde code op je pc en telefoon om je voortgang te delen.';
 const code = prompt(msg, syncCode);
 if(code === null) return;
 syncCode = code.trim();
 if(syncCode){
 localStorage.setItem('esther_sync_code', syncCode);
 syncPull().then(() => syncPush());
 } else {
 localStorage.removeItem('esther_sync_code');
 }
 updateSyncBtn();
}

// hook into existing save functions
const __saveMac = saveMacProgress;
saveMacProgress = function(){ __saveMac(); schedulePush(); };
const __saveOmi = saveOmiProgress;
saveOmiProgress = function(){ __saveOmi(); schedulePush(); };


// ── Audit gap-fill: 4-method comparison (W1), C/N vs V/W (W2+W3), KPM (W4)
const MAC_GAPS = {"w1":{"nl":"<h3>De 4 methoden naast elkaar — zelfde machine, ander ritme</h3>\n<p>Alle vier de methoden schrijven uiteindelijk <strong>hetzelfde totaal</strong> af (A − R = €52.500), maar het <em>ritme</em> verschilt. Vergelijk voor één machine (A = €60.000, R = €7.500, n = 4) de afschrijving in jaar 1 en jaar 4:</p>\n<div class=\"formula\">p = 1 − (R/A)^(1/n) = 1 − (7.500/60.000)^(1/4) ≈ 40,5%</div>\n<table style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:0.9rem\">\n<tr style=\"border-bottom:2px solid var(--border-light);text-align:left\"><th style=\"padding:6px\">Methode</th><th style=\"padding:6px\">Jaar 1</th><th style=\"padding:6px\">Jaar 4</th><th style=\"padding:6px\">Patroon</th></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Lineair</td><td style=\"padding:6px\">€13.125</td><td style=\"padding:6px\">€13.125</td><td style=\"padding:6px\">vlak</td></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Vast % boekwaarde (40,5%)</td><td style=\"padding:6px\">€24.324</td><td style=\"padding:6px\">±€5.113</td><td style=\"padding:6px\">sterk dalend (%)</td></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Cijfersom (S = 10)</td><td style=\"padding:6px\">€21.000</td><td style=\"padding:6px\">€5.250</td><td style=\"padding:6px\">dalend (gewichten 4-3-2-1)</td></tr>\n<tr><td style=\"padding:6px\">Dalend vast bedrag (Δ = €3.000)</td><td style=\"padding:6px\">€17.625</td><td style=\"padding:6px\">€8.625</td><td style=\"padding:6px\">dalend (vaste stap)</td></tr>\n</table>\n<div class=\"example-box\"><div class=\"ex-title\">🔍 Controle — dalend vast bedrag</div>4 × d₁ − 3.000 × 4(4−1)/2 = 52.500 → 4d₁ = 70.500 → d₁ = €17.625. Reeks: 17.625 + 14.625 + 11.625 + 8.625 = €52.500 ✓</div>\n<div class=\"tip-box\"><strong>Examencontrole:</strong> tel bij élke methode alle jaarafschrijvingen op — de som moet exact A − R zijn. Vast % boekwaarde daalt het snelst, lineair helemaal niet; cijfersom en dalend vast bedrag zitten ertussen.</div>","en":"<h3>The 4 methods side by side — same machine, different rhythm</h3>\n<p>All four methods depreciate the <strong>same total</strong> in the end (A − R = €52,500), but the <em>rhythm</em> differs. Compare, for one machine (A = €60,000, R = €7,500, n = 4), the depreciation in year 1 and year 4:</p>\n<div class=\"formula\">p = 1 − (R/A)^(1/n) = 1 − (7,500/60,000)^(1/4) ≈ 40.5%</div>\n<table style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:0.9rem\">\n<tr style=\"border-bottom:2px solid var(--border-light);text-align:left\"><th style=\"padding:6px\">Method</th><th style=\"padding:6px\">Year 1</th><th style=\"padding:6px\">Year 4</th><th style=\"padding:6px\">Pattern</th></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Straight-line</td><td style=\"padding:6px\">€13,125</td><td style=\"padding:6px\">€13,125</td><td style=\"padding:6px\">flat</td></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Declining balance (40.5%)</td><td style=\"padding:6px\">€24,324</td><td style=\"padding:6px\">±€5,113</td><td style=\"padding:6px\">steeply declining (%)</td></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Sum-of-years digits (S = 10)</td><td style=\"padding:6px\">€21,000</td><td style=\"padding:6px\">€5,250</td><td style=\"padding:6px\">declining (weights 4-3-2-1)</td></tr>\n<tr><td style=\"padding:6px\">Decreasing fixed amount (Δ = €3,000)</td><td style=\"padding:6px\">€17,625</td><td style=\"padding:6px\">€8,625</td><td style=\"padding:6px\">declining (fixed step)</td></tr>\n</table>\n<div class=\"example-box\"><div class=\"ex-title\">🔍 Check — decreasing fixed amount</div>4 × d₁ − 3,000 × 4(4−1)/2 = 52,500 → 4d₁ = 70,500 → d₁ = €17,625. Series: 17,625 + 14,625 + 11,625 + 8,625 = €52,500 ✓</div>\n<div class=\"tip-box\"><strong>Exam check:</strong> for every method, add up all annual charges — the total must be exactly A − R. Declining balance drops fastest, straight-line not at all; sum-of-years and decreasing fixed amount sit in between.</div>","fr":"<h3>Les 4 méthodes côte à côte — même machine, rythme différent</h3>\n<p>Les quatre méthodes amortissent au final le <strong>même total</strong> (A − R = €52.500), mais le <em>rythme</em> diffère. Comparez, pour une même machine (A = €60.000, R = €7.500, n = 4), la dotation de l'année 1 et de l'année 4:</p>\n<div class=\"formula\">p = 1 − (R/A)^(1/n) = 1 − (7.500/60.000)^(1/4) ≈ 40,5%</div>\n<table style=\"width:100%;border-collapse:collapse;margin:12px 0;font-size:0.9rem\">\n<tr style=\"border-bottom:2px solid var(--border-light);text-align:left\"><th style=\"padding:6px\">Méthode</th><th style=\"padding:6px\">Année 1</th><th style=\"padding:6px\">Année 4</th><th style=\"padding:6px\">Profil</th></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Linéaire</td><td style=\"padding:6px\">€13.125</td><td style=\"padding:6px\">€13.125</td><td style=\"padding:6px\">constant</td></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Dégressif à taux fixe (40,5%)</td><td style=\"padding:6px\">€24.324</td><td style=\"padding:6px\">±€5.113</td><td style=\"padding:6px\">fortement décroissant (%)</td></tr>\n<tr style=\"border-bottom:1px solid var(--border-light)\"><td style=\"padding:6px\">Somme des chiffres (S = 10)</td><td style=\"padding:6px\">€21.000</td><td style=\"padding:6px\">€5.250</td><td style=\"padding:6px\">décroissant (poids 4-3-2-1)</td></tr>\n<tr><td style=\"padding:6px\">Montant dégressif fixe (Δ = €3.000)</td><td style=\"padding:6px\">€17.625</td><td style=\"padding:6px\">€8.625</td><td style=\"padding:6px\">décroissant (pas fixe)</td></tr>\n</table>\n<div class=\"example-box\"><div class=\"ex-title\">🔍 Vérification — montant dégressif fixe</div>4 × d₁ − 3.000 × 4(4−1)/2 = 52.500 → 4d₁ = 70.500 → d₁ = €17.625. Série: 17.625 + 14.625 + 11.625 + 8.625 = €52.500 ✓</div>\n<div class=\"tip-box\"><strong>Contrôle d'examen:</strong> pour chaque méthode, additionnez toutes les dotations annuelles — le total doit être exactement A − R. Le dégressif à taux fixe chute le plus vite, le linéaire pas du tout; la somme des chiffres et le montant dégressif fixe se situent entre les deux.</div>"},"w2":{"nl":"<h3>Waarom k = C/N + V/W? Twee verschillende delers, met een reden</h3>\n<p>Kijk goed naar de noemers: vaste kosten C deel je door de <strong>normale</strong> bezetting N, maar variabele kosten V deel je door de <strong>werkelijke</strong> productie W. Dat is geen toeval.</p>\n<div class=\"formula\">k = C/N + V/W</div>\n<p><strong>Waarom C/N?</strong> Vaste kosten staan los van de productie. Zou je C/W gebruiken, dan zou de kostprijs élke maand veranderen: in een rustige maand wordt elk product plots 'duurder', terwijl het product zelf niet veranderd is. Door N te gebruiken blijft de kostprijs <em>stabiel</em> — en het verschil tussen plan en werkelijkheid vang je apart op in het bezettingsresultaat.</p>\n<p><strong>Waarom V/W?</strong> Variabele kosten groeien evenredig mee met de productie: V = v × W. Dus V/W = v is per definitie constant per stuk — delen door W is hier veilig én correct.</p>\n<div class=\"example-box\"><div class=\"ex-title\">🧮 Cijfervoorbeeld — v constant, C/W niet</div>C = €10.000, N = 1.000 stuks, v = €2.<br><strong>W = 1.000:</strong> V = €2.000 → V/W = €2; C/W = €10.<br><strong>W = 800:</strong> V = €1.600 → V/W = <strong>nog steeds €2</strong>; maar C/W = 10.000/800 = <strong>€12,50</strong>.<br>V/W beweegt niet mee, C/W wél — daarom verankeren we de vaste kosten op N: C/N = €10, altijd.</div>\n<div class=\"tip-box\"><strong>Onthoud:</strong> N is de stabiele 'verdeelsleutel' voor vaste kosten; W mag alleen in de noemer staan bij kosten die zelf met W meebewegen.</div>","en":"<h3>Why k = C/N + V/W? Two different denominators, for a reason</h3>\n<p>Look closely at the denominators: fixed costs C are divided by <strong>normal</strong> capacity N, but variable costs V by <strong>actual</strong> production W. That is not an accident.</p>\n<div class=\"formula\">k = C/N + V/W</div>\n<p><strong>Why C/N?</strong> Fixed costs do not depend on output. If you used C/W, the cost price would change every month: in a quiet month each product suddenly becomes 'more expensive', even though the product itself hasn't changed. Using N keeps the cost price <em>stable</em> — and the gap between plan and reality is captured separately in the capacity result.</p>\n<p><strong>Why V/W?</strong> Variable costs grow proportionally with production: V = v × W. So V/W = v is by definition constant per unit — dividing by W is both safe and correct here.</p>\n<div class=\"example-box\"><div class=\"ex-title\">🧮 Numeric example — v constant, C/W not</div>C = €10,000, N = 1,000 units, v = €2.<br><strong>W = 1,000:</strong> V = €2,000 → V/W = €2; C/W = €10.<br><strong>W = 800:</strong> V = €1,600 → V/W = <strong>still €2</strong>; but C/W = 10,000/800 = <strong>€12.50</strong>.<br>V/W stays put, C/W does not — which is why we anchor fixed costs to N: C/N = €10, always.</div>\n<div class=\"tip-box\"><strong>Remember:</strong> N is the stable 'allocation base' for fixed costs; W may only appear in the denominator for costs that themselves move with W.</div>","fr":"<h3>Pourquoi k = C/N + V/W ? Deux dénominateurs différents, pour une raison</h3>\n<p>Regardez bien les dénominateurs: les coûts fixes C sont divisés par la capacité <strong>normale</strong> N, mais les coûts variables V par la production <strong>réelle</strong> W. Ce n'est pas un hasard.</p>\n<div class=\"formula\">k = C/N + V/W</div>\n<p><strong>Pourquoi C/N ?</strong> Les coûts fixes ne dépendent pas de la production. Avec C/W, le coût de revient changerait chaque mois: dans un mois creux, chaque produit deviendrait soudain 'plus cher', alors que le produit lui-même n'a pas changé. En utilisant N, le coût de revient reste <em>stable</em> — et l'écart entre plan et réalité est isolé séparément dans le résultat d'utilisation.</p>\n<p><strong>Pourquoi V/W ?</strong> Les coûts variables évoluent proportionnellement à la production: V = v × W. Donc V/W = v est par définition constant par unité — diviser par W est ici à la fois sûr et correct.</p>\n<div class=\"example-box\"><div class=\"ex-title\">🧮 Exemple chiffré — v constant, C/W non</div>C = €10.000, N = 1.000 unités, v = €2.<br><strong>W = 1.000:</strong> V = €2.000 → V/W = €2; C/W = €10.<br><strong>W = 800:</strong> V = €1.600 → V/W = <strong>toujours €2</strong>; mais C/W = 10.000/800 = <strong>€12,50</strong>.<br>V/W ne bouge pas, C/W si — c'est pourquoi on ancre les coûts fixes sur N: C/N = €10, toujours.</div>\n<div class=\"tip-box\"><strong>À retenir:</strong> N est la 'clé de répartition' stable des coûts fixes; W ne peut figurer au dénominateur que pour des coûts qui évoluent eux-mêmes avec W.</div>"},"w4":{"nl":"<h3>De kostenplaatsenmethode (KPM) — de tussenstap die ontbreekt</h3>\n<p>Bij de <strong>kostenplaatsenmethode</strong> gaan indirecte kosten niet rechtstreeks naar de producten. Ze worden eerst toegerekend aan <strong>kostenplaatsen</strong> (afdelingen): eerst aan <em>hulpkostenplaatsen</em> (bv. onderhoud, magazijn), die hun kosten vervolgens doorbelasten aan de <em>hoofdkostenplaatsen</em> (bv. bewerking, montage). Pas daarna gaan de kosten naar de producten, via een <strong>tarief per kostenplaats</strong> (bv. € per machine-uur).</p>\n<div class=\"formula\">tarief kostenplaats = totale kosten kostenplaats / verdeelsleutel (bv. machine-uren)</div>\n<p>Vergelijk: de <strong>opslagmethode</strong> gooit alle indirecte kosten op één hoop met één grof percentage — snel maar onnauwkeurig. <strong>ABC</strong> gaat nog fijner dan KPM: het verdeelt per activiteit en cost driver in plaats van per afdeling. KPM zit er dus precies tussenin.</p>\n<div class=\"example-box\"><div class=\"ex-title\">🔧 Voorbeeld — Onderhoud doorbelasten</div>Hulpkostenplaats Onderhoud: €20.000, verdeeld 60/40 over twee hoofdkostenplaatsen.<br><strong>Bewerking:</strong> eigen €40.000 + €12.000 = €52.000 / 4.000 machine-uren = <strong>€13/uur</strong>.<br><strong>Montage:</strong> eigen €28.000 + €8.000 = €36.000 / 3.000 arbeidsuren = <strong>€12/uur</strong>.<br>Een product met 2 machine-uren en 1 arbeidsuur krijgt 2×13 + 1×12 = <strong>€38</strong> indirecte kosten.</div>\n<div class=\"tip-box\"><strong>Volgorde KPM:</strong> 1. Indirecte kosten naar kostenplaatsen → 2. Hulp- naar hoofdkostenplaatsen → 3. Tarief per hoofdkostenplaats → 4. Doorbelasten aan producten.</div>","en":"<h3>The cost centre method (KPM) — the missing middle step</h3>\n<p>Under the <strong>cost centre method</strong>, indirect costs do not go straight to products. They are first assigned to <strong>cost centres</strong> (departments): first to <em>support cost centres</em> (e.g. maintenance, warehouse), which then pass their costs on to the <em>main cost centres</em> (e.g. machining, assembly). Only then are costs charged to products, via a <strong>rate per cost centre</strong> (e.g. € per machine-hour).</p>\n<div class=\"formula\">cost centre rate = total cost centre costs / allocation base (e.g. machine-hours)</div>\n<p>Compare: the <strong>blanket overhead rate method</strong> lumps all indirect costs together with one crude percentage — fast but imprecise. <strong>ABC</strong> is even finer than KPM: it allocates per activity and cost driver instead of per department. KPM sits exactly in between.</p>\n<div class=\"example-box\"><div class=\"ex-title\">🔧 Example — Allocating Maintenance</div>Support centre Maintenance: €20,000, split 60/40 over two main centres.<br><strong>Machining:</strong> own €40,000 + €12,000 = €52,000 / 4,000 machine-hours = <strong>€13/hour</strong>.<br><strong>Assembly:</strong> own €28,000 + €8,000 = €36,000 / 3,000 labour-hours = <strong>€12/hour</strong>.<br>A product using 2 machine-hours and 1 labour-hour receives 2×13 + 1×12 = <strong>€38</strong> of indirect costs.</div>\n<div class=\"tip-box\"><strong>KPM sequence:</strong> 1. Indirect costs to cost centres → 2. Support to main centres → 3. Rate per main centre → 4. Charge to products.</div>","fr":"<h3>La méthode des centres de coûts (KPM) — l'étape intermédiaire manquante</h3>\n<p>Avec la <strong>méthode des centres de coûts</strong>, les coûts indirects ne vont pas directement aux produits. Ils sont d'abord affectés à des <strong>centres de coûts</strong> (départements): d'abord aux <em>centres auxiliaires</em> (p.ex. entretien, magasin), qui répercutent ensuite leurs coûts sur les <em>centres principaux</em> (p.ex. usinage, montage). Ce n'est qu'ensuite que les coûts sont imputés aux produits, via un <strong>taux par centre de coûts</strong> (p.ex. € par heure-machine).</p>\n<div class=\"formula\">taux du centre = coûts totaux du centre / clé de répartition (p.ex. heures-machine)</div>\n<p>Comparez: la <strong>méthode du coefficient d'imputation</strong> regroupe tous les coûts indirects avec un seul pourcentage grossier — rapide mais imprécis. L'<strong>ABC</strong> va encore plus finement que la KPM: elle répartit par activité et inducteur de coût plutôt que par département. La KPM se situe exactement entre les deux.</p>\n<div class=\"example-box\"><div class=\"ex-title\">🔧 Exemple — Répercuter l'Entretien</div>Centre auxiliaire Entretien: €20.000, réparti 60/40 sur deux centres principaux.<br><strong>Usinage:</strong> propres €40.000 + €12.000 = €52.000 / 4.000 heures-machine = <strong>€13/heure</strong>.<br><strong>Montage:</strong> propres €28.000 + €8.000 = €36.000 / 3.000 heures de main-d'œuvre = <strong>€12/heure</strong>.<br>Un produit consommant 2 heures-machine et 1 heure de main-d'œuvre reçoit 2×13 + 1×12 = <strong>€38</strong> de coûts indirects.</div>\n<div class=\"tip-box\"><strong>Séquence KPM:</strong> 1. Coûts indirects vers les centres → 2. Centres auxiliaires vers centres principaux → 3. Taux par centre principal → 4. Imputation aux produits.</div>"}};
const __gapGet = getExercises;
getExercises = function(){
 const d = __gapGet(); // fresh object on every call, so appending is safe
 d.w1.theory.nl += MAC_GAPS.w1.nl; d.w1.theory.en += MAC_GAPS.w1.en; d.w1.theory.fr += MAC_GAPS.w1.fr;
 d.w2.theory.nl += MAC_GAPS.w2.nl; d.w2.theory.en += MAC_GAPS.w2.en; d.w2.theory.fr += MAC_GAPS.w2.fr;
 d.w3.theory.nl += MAC_GAPS.w2.nl; d.w3.theory.en += MAC_GAPS.w2.en; d.w3.theory.fr += MAC_GAPS.w2.fr;
 d.w4.theory.nl += MAC_GAPS.w4.nl; d.w4.theory.en += MAC_GAPS.w4.en; d.w4.theory.fr += MAC_GAPS.w4.fr;
 // diagram placeholders (rendered per-language by injectDiagrams)
 const dg={w1:'depr_curves',w2:'cost_behavior',w3:'ac_vs_dc',w4:'cost_alloc',w5:'breakeven'};
 for(const wk in dg){ if(d[wk]&&d[wk].theory){ const tok='[[DIAG:'+dg[wk]+']]'; ['nl','en','fr'].forEach(l=>{ if((d[wk].theory[l]||'').indexOf(tok)<0) d[wk].theory[l]=(d[wk].theory[l]||'')+tok; }); } }
 return d;
};

