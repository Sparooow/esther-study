// ── i18n ──────────────────────────────────────────────────────────────────
const T = {
nl:{
 hint_btn:'💭 Hint', hint_none:'Geen hints meer — bekijk de oplossing!',
 cheatsheet_btn:'📋 Formulekaart', progress_label:'correct beantwoord',
 boss:'BOSS', check:'Controleer', show_sol:'Toon oplossing', hide_sol:'Verberg oplossing',
 reset:'Reset', correct_msg:'✓ Correct!', wrong_msg:'✗ Niet correct, probeer opnieuw.',
 encouragements:['🎉 Uitstekend! Je hebt het!','💪 Perfect, zo ga je door!','⭐ Bravo! Je snapt het helemaal!','🚀 Geweldig werk!','✨ Super! Je bent op de goede weg!','🏆 Topprestatie!','🔥 Wauw, perfect!','💡 Exact goed! Je begrijpt het!'],
 theory:'📚 Theorie & Formules', close:'Sluit',
 tabs:['W1: Afschrijvingen','W2: Absorption Costing','W3: Direct Costing','W4: Kostenverbijzondering','W5: Break-even & Verschillen','W6: Gemengde oefeningen'],
 w_sub:['Waardedaling van vaste activa','Kosten per eenheid inclusief vaste kosten','Kosten per eenheid exclusief vaste kosten','Kostentoerekening aan producten','Omslagpunt en prestatieverschillen','Combineer kennis van meerdere workshops'],
 score_text:'oefeningen correct',
 easy:'Makkelijk', medium:'Gemiddeld', hard:'Moeilijk',
 logo_sub:'Oefeningen',
 understand_btn:'💡 Hoe werkt het? — Begrip & Intuïtie',
 understand:{
 w1:`<h4>Wat zijn afschrijvingen?</h4>
<p>Een machine, auto of computer slijt na verloop van tijd. Afschrijven is het verdelen van die waardedaling over de levensduur als <strong>jaarlijkse kost</strong>. Je betaalt de machine maar één keer, maar de kosten tel je elk jaar mee.</p>
<div class="example-box"><div class="ex-title">🚗 Voorbeeld — Bedrijfsauto</div>
<div class="example-row"><span class="lbl">Aanschafprijs (A)</span><span class="val">€20.000</span></div>
<div class="example-row"><span class="lbl">Restwaarde (R)</span><span class="val">€4.000 (waarde over 4 jaar)</span></div>
<div class="example-row"><span class="lbl">Levensduur (n)</span><span class="val">4 jaar</span></div>
<div class="example-row"><span class="lbl">Totaal af te schrijven</span><span class="val">€20.000 − €4.000 = €16.000</span></div></div>
<h4>De 4 methoden vergeleken</h4>
<div class="rule-grid">
<div class="rule-card"><div class="rule-head">1. Lineair</div>Elk jaar hetzelfde bedrag: €16.000 / 4 = <strong>€4.000/jaar</strong>. Simpel, stabiel.</div>
<div class="rule-card"><div class="rule-head">2. Vast % boekwaarde</div>Elk jaar een % van wat er nog over is. Meer in jaar 1, minder in jaar 4. Realistisch voor machines.</div>
<div class="rule-card"><div class="rule-head">3. Sum of years</div>Jaar 1 het meest, jaar 4 het minst. Coëfficiënten: 4-3-2-1 (som=10). Goed voor auto's die snel verouderen.</div>
<div class="rule-card"><div class="rule-head">4. Dalend vast bedrag</div>Afschrijving daalt elk jaar met hetzelfde bedrag. Los op met een vergelijking.</div></div>
<div class="tip-box"><strong>Vuistregel:</strong> Een auto verliest snel in waarde → sum of years of vast %. Een machine slijt gelijkmatig → lineair. Er staat altijd een reden bij op het examen!</div>`,

 w2:`<h4>Wat is de integrale kostprijs?</h4>
<p>Stel je hebt een taartenbakkerij. Je betaalt elke maand <strong>€2.000 huur</strong> — of je nu 1 taart bakt of 1.000. Dat zijn <strong>vaste kosten</strong>. Ingrediënten kosten <strong>€3 per taart</strong> — die variëren met de productie. De integrale kostprijs is wat elke taart je gemiddeld kost, vaste kosten inbegrepen.</p>
<div class="example-box"><div class="ex-title">🍰 Voorbeeld — Taartenbakkerij (N = 500 taarten)</div>
<div class="example-row"><span class="lbl">Vaste kosten C</span><span class="val">€2.000/maand</span></div>
<div class="example-row"><span class="lbl">Variabele kosten v</span><span class="val">€3 per taart</span></div>
<div class="example-row"><span class="lbl">Kostprijs k = C/N + v</span><span class="val hl">€2.000/500 + €3 = €7/taart</span></div>
<div class="example-row"><span class="lbl">Verkoopprijs p</span><span class="val">€10/taart</span></div></div>
<h4>Bezettingsresultaat — wat als je minder bakt dan normaal?</h4>
<p>Je bakt deze maand maar <strong>400 taarten</strong> (W) in plaats van 500 (N). De huur van €2.000 betaal je tóch. Die 100 "niet-gebakken" taarten leveren een <strong>onderbezettingsverlies</strong> op:</p>
<div class="example-box"><div class="ex-title">📉 Onderbezetting</div>
<div class="example-row"><span class="lbl">Bezettingsresultaat</span><span class="val">(W − N) × C/N = (400 − 500) × €4 = <span class="hl">−€400</span></span></div>
<div class="example-row"><span class="lbl">Verkoopresultaat</span><span class="val">(€10 − €7) × 400 = <span class="hl">+€1.200</span></span></div>
<div class="example-row"><span class="lbl">Bedrijfsresultaat</span><span class="val">€1.200 − €400 = <span class="hl">€800</span></span></div></div>
<div class="tip-box"><strong>Onthoud:</strong> Als W = N, is het bezettingsresultaat altijd €0. Als W > N → winst op bezetting. Als W < N → verlies op bezetting.</div>`,

 w3:`<h4>Wat is het verschil met Absorption Costing?</h4>
<p>Bij AC stop je de vaste kosten in de kostprijs per product. Bij DC niet — <strong>vaste kosten gaan direct naar de resultatenrekening</strong>, ongeacht hoeveel je verkoopt. DC is bedoeld voor <strong>interne beslissingen</strong> (korte termijn).</p>
<h4>De gouden regel van DC</h4>
<p>Vaste kosten betaal je <em>toch al</em>. De echte vraag bij een extra order is: <strong>verdien ik meer dan het extra kost om dit te produceren?</strong> (= variabele kosten)</p>
<div class="example-box"><div class="ex-title">🚲 Voorbeeld — Fietsenwinkel, incidentele order</div>
<div class="example-row"><span class="lbl">Integrale kostprijs k</span><span class="val">€300 (waarvan €100 vast, €200 variabel)</span></div>
<div class="example-row"><span class="lbl">Aanbod: prijs per fiets</span><span class="val">€240 voor 20 fietsen</span></div>
<div class="example-row"><span class="lbl">AC-redenering</span><span class="val">€240 &lt; €300 → weigeren ✗</span></div>
<div class="example-row"><span class="lbl">DC-redenering</span><span class="val">€240 &gt; €200 variabel → extra DB = €40/stuk ✓</span></div>
<div class="example-row"><span class="lbl">Extra winst</span><span class="val hl">20 × €40 = €800</span></div></div>
<h4>Wanneer verschilt AC-winst van DC-winst?</h4>
<div class="rule-grid">
<div class="rule-card"><div class="rule-head">Productie > Afzet (voorraad ↑)</div>AC-winst &gt; DC-winst. Bij AC worden vaste kosten opgeslagen in voorraad — pas als het product verkocht wordt, komen ze in de kosten.</div>
<div class="rule-card"><div class="rule-head">Productie &lt; Afzet (voorraad ↓)</div>AC-winst &lt; DC-winst. De voorraad daalt — opgeslagen vaste kosten uit de vorige periode komen nu vrij als extra kosten.</div></div>
<div class="tip-box"><strong>Vuistregel:</strong> Verschil = voorraadmutatie × C/N. Als productie = afzet → AC = DC, altijd.</div>`,

 w4:`<h4>Waarom moeten indirecte kosten verdeeld worden?</h4>
<p>Een bedrijf maakt zowel <strong>tafels</strong> als <strong>stoelen</strong>. De elektriciteitsrekening, huur en machine-afschrijving zijn indirecte kosten — ze zijn niet direct toe te wijzen aan één product. Als je die kosten niet eerlijk verdeelt, klopt de kostprijs niet.</p>
<div class="example-box"><div class="ex-title">🪑 Voorbeeld — Primitieve methode</div>
<div class="example-row"><span class="lbl">Totale indirecte kosten</span><span class="val">€30.000</span></div>
<div class="example-row"><span class="lbl">Totale directe kosten</span><span class="val">€150.000</span></div>
<div class="example-row"><span class="lbl">Opslagpercentage</span><span class="val hl">€30.000 / €150.000 = 20%</span></div>
<div class="example-row"><span class="lbl">Directe kosten tafel</span><span class="val">€50</span></div>
<div class="example-row"><span class="lbl">Kostprijs tafel</span><span class="val hl">€50 × 1,20 = €60</span></div></div>
<h4>ABC — Waarom is het eerlijker?</h4>
<p>Stel dat het instellen van de machine (set-up) €10.000 kost per run. Product A vereist 8 runs, product B slechts 2 runs. Met een gewone opslag zouden ze evenveel betalen — maar dat is oneerlijk. ABC <strong>koppelt de kosten aan de activiteiten die ze veroorzaken</strong>.</p>
<div class="example-box"><div class="ex-title">⚙️ ABC — Set-up kosten</div>
<div class="example-row"><span class="lbl">Set-up kosten totaal</span><span class="val">€100.000 voor 10 runs</span></div>
<div class="example-row"><span class="lbl">Tarief per run</span><span class="val hl">€100.000 / 10 = €10.000/run</span></div>
<div class="example-row"><span class="lbl">Product A (8 runs, 4.000 stuks)</span><span class="val">(€10.000 × 8) / 4.000 = €20/stuk</span></div>
<div class="example-row"><span class="lbl">Product B (2 runs, 2.000 stuks)</span><span class="val">(€10.000 × 2) / 2.000 = €10/stuk</span></div></div>
<div class="tip-box"><strong>Volgorde ABC:</strong> 1. Activiteiten identificeren → 2. Cost pools → 3. Cost drivers bepalen → 4. Kosten toerekenen.</div>`,

 w5:`<h4>Wanneer verdien je precies niks — en wanneer begin je winst te maken?</h4>
<p>Het break-even punt (BEP) is het moment waarop totale opbrengsten = totale kosten. Vóór dat punt maak je verlies, erna winst. De <strong>veiligheidsmarge</strong> zegt hoe ver je boven dat punt zit — hoe groter, hoe beter.</p>
<div class="example-box"><div class="ex-title">☕ Voorbeeld — Koffiekraam op de markt</div>
<div class="example-row"><span class="lbl">Standplaats (vast, C)</span><span class="val">€180/dag</span></div>
<div class="example-row"><span class="lbl">Kosten per kopje (variabel, v)</span><span class="val">€1</span></div>
<div class="example-row"><span class="lbl">Verkoopprijs (p)</span><span class="val">€4</span></div>
<div class="example-row"><span class="lbl">Dekkingsbijdrage per kopje</span><span class="val">€4 − €1 = €3</span></div>
<div class="example-row"><span class="lbl">Break-even afzet</span><span class="val hl">€180 / €3 = 60 kopjes</span></div>
<div class="example-row"><span class="lbl">Verwachte verkoop</span><span class="val">90 kopjes</span></div>
<div class="example-row"><span class="lbl">Veiligheidsmarge</span><span class="val hl">(90 − 60) / 90 × 100% = 33%</span></div></div>
<h4>Winst-doelstelling</h4>
<p>Wil je <strong>€90 winst</strong> per dag maken? Dan:</p>
<div class="example-box"><div class="ex-title">🎯 Doelstelling</div>
<div class="example-row"><span class="lbl">q = (C + gewenste winst) / DB</span><span class="val hl">(€180 + €90) / €3 = 90 kopjes</span></div></div>
<h4>Verschillenanalyse (ex-ante vs ex-post)</h4>
<p>Het <strong>ex-ante budget</strong> is wat je van tevoren gepland had. Het <strong>ex-post budget</strong> pas je aan op basis van de werkelijke productie — en dan vergelijk je met de werkelijke kosten. Een <em>voordelig</em> verschil betekent dat je goedkoper produceerde dan de norm.</p>
<div class="tip-box"><strong>Let op:</strong> Vergelijk het ex-post budget altijd met de werkelijke kosten — niet met het ex-ante budget. Anders vergelijk je appels met peren (verschillend productievolume).</div>`
 }
},
en:{
 hint_btn:'💭 Hint', hint_none:'No more hints — check the solution!',
 cheatsheet_btn:'📋 Cheat Sheet', progress_label:'correct answers',
 boss:'BOSS', check:'Check', show_sol:'Show solution', hide_sol:'Hide solution',
 reset:'Reset', correct_msg:'✓ Correct!', wrong_msg:'✗ Not correct, try again.',
 encouragements:['🎉 Excellent! You got it!','💪 Perfect, keep going!','⭐ Brilliant! You really understand this!','🚀 Amazing work!','✨ Super! You\'re on the right track!','🏆 Top performance!','🔥 Wow, perfect!','💡 Spot on! You\'ve got it!'],
 theory:'📚 Theory & Formulas', close:'Close',
 tabs:['W1: Depreciation','W2: Absorption Costing','W3: Direct Costing','W4: Cost Allocation','W5: Break-even & Variance','W6: Mixed exercises'],
 w_sub:['Decrease in value of fixed assets','Cost per unit including fixed costs','Cost per unit excluding fixed costs','Allocating costs to products','Break-even point and performance variances','Combine knowledge from multiple workshops'],
 score_text:'exercises correct',
 easy:'Easy', medium:'Medium', hard:'Hard',
 logo_sub:'Exercises',
 understand_btn:'💡 How does it work? — Understanding & Intuition',
 understand:{
 w1:`<h4>What is depreciation?</h4>
<p>A machine, car, or computer loses value over time. Depreciation spreads that loss in value over the asset's useful life as an <strong>annual cost</strong>. You only pay for the asset once, but you spread that cost across every year you use it.</p>
<div class="example-box"><div class="ex-title">🚗 Example — Company car</div>
<div class="example-row"><span class="lbl">Purchase price (A)</span><span class="val">€20,000</span></div>
<div class="example-row"><span class="lbl">Residual value (R)</span><span class="val">€4,000 (value after 4 years)</span></div>
<div class="example-row"><span class="lbl">Useful life (n)</span><span class="val">4 years</span></div>
<div class="example-row"><span class="lbl">Total to depreciate</span><span class="val">€20,000 − €4,000 = €16,000</span></div></div>
<h4>The 4 methods compared</h4>
<div class="rule-grid">
<div class="rule-card"><div class="rule-head">1. Straight-line</div>Same amount every year: €16,000 / 4 = <strong>€4,000/year</strong>. Simple and stable.</div>
<div class="rule-card"><div class="rule-head">2. Fixed % of book value</div>A % of the remaining book value each year. More in year 1, less in year 4. Realistic for machinery.</div>
<div class="rule-card"><div class="rule-head">3. Sum of years' digits</div>Most in year 1, least in year 4. Coefficients: 4-3-2-1 (sum=10). Good for cars that quickly lose value.</div>
<div class="rule-card"><div class="rule-head">4. Declining fixed amount</div>Depreciation drops by the same amount each year. Solve with an equation.</div></div>
<div class="tip-box"><strong>Rule of thumb:</strong> A car loses value fast → sum of years or fixed %. A machine wears evenly → straight-line. There will always be a hint in the exam!</div>`,

 w2:`<h4>What is the full cost price?</h4>
<p>Say you run a bakery. You pay <strong>€2,000 rent</strong> every month — whether you bake 1 cake or 1,000. Those are <strong>fixed costs</strong>. Ingredients cost <strong>€3 per cake</strong> — those vary with production. The full cost price (integrale kostprijs) is the average cost of each cake, including fixed costs.</p>
<div class="example-box"><div class="ex-title">🍰 Example — Bakery (N = 500 cakes)</div>
<div class="example-row"><span class="lbl">Fixed costs C</span><span class="val">€2,000/month</span></div>
<div class="example-row"><span class="lbl">Variable costs v</span><span class="val">€3 per cake</span></div>
<div class="example-row"><span class="lbl">Cost price k = C/N + v</span><span class="val hl">€2,000/500 + €3 = €7/cake</span></div>
<div class="example-row"><span class="lbl">Selling price p</span><span class="val">€10/cake</span></div></div>
<h4>Capacity variance — what if you produce less than planned?</h4>
<p>You only bake <strong>400 cakes</strong> (W) instead of 500 (N). You still pay €2,000 rent. Those 100 "unproduced" cakes generate a <strong>capacity loss</strong>:</p>
<div class="example-box"><div class="ex-title">📉 Under-capacity</div>
<div class="example-row"><span class="lbl">Capacity result</span><span class="val">(W − N) × C/N = (400 − 500) × €4 = <span class="hl">−€400</span></span></div>
<div class="example-row"><span class="lbl">Sales result</span><span class="val">(€10 − €7) × 400 = <span class="hl">+€1,200</span></span></div>
<div class="example-row"><span class="lbl">Operating result</span><span class="val">€1,200 − €400 = <span class="hl">€800</span></span></div></div>
<div class="tip-box"><strong>Remember:</strong> If W = N, the capacity result is always €0. W > N → capacity gain. W < N → capacity loss.</div>`,

 w3:`<h4>What is the difference from Absorption Costing?</h4>
<p>With AC, fixed costs are included in the product cost price. With DC — <strong>fixed costs go directly to the income statement</strong>, regardless of how much you sell. DC is designed for <strong>internal decisions</strong> (short term).</p>
<h4>The golden rule of DC</h4>
<p>You're going to pay fixed costs <em>anyway</em>. The real question for an extra order is: <strong>will I earn more than the extra cost of producing it?</strong> (= variable costs)</p>
<div class="example-box"><div class="ex-title">🚲 Example — Bike shop, one-off order</div>
<div class="example-row"><span class="lbl">Full cost price k</span><span class="val">€300 (of which €100 fixed, €200 variable)</span></div>
<div class="example-row"><span class="lbl">Offer: price per bike</span><span class="val">€240 for 20 bikes</span></div>
<div class="example-row"><span class="lbl">AC reasoning</span><span class="val">€240 &lt; €300 → reject ✗</span></div>
<div class="example-row"><span class="lbl">DC reasoning</span><span class="val">€240 &gt; €200 variable → extra CM = €40/unit ✓</span></div>
<div class="example-row"><span class="lbl">Extra profit</span><span class="val hl">20 × €40 = €800</span></div></div>
<h4>When does AC profit differ from DC profit?</h4>
<div class="rule-grid">
<div class="rule-card"><div class="rule-head">Production > Sales (stock ↑)</div>AC profit &gt; DC profit. In AC, fixed costs are stored in inventory — they only become a cost when the product is sold.</div>
<div class="rule-card"><div class="rule-head">Production &lt; Sales (stock ↓)</div>AC profit &lt; DC profit. The stock decreases — stored fixed costs from a prior period are released as extra costs now.</div></div>
<div class="tip-box"><strong>Rule of thumb:</strong> Difference = stock movement × C/N. If production = sales → AC = DC, always.</div>`,

 w4:`<h4>Why do indirect costs need to be allocated?</h4>
<p>A company makes both <strong>tables</strong> and <strong>chairs</strong>. The electricity bill, rent and machine depreciation are indirect costs — they can't be directly assigned to one product. If you don't split these costs fairly, the cost price is wrong.</p>
<div class="example-box"><div class="ex-title">🪑 Example — Simple allocation method</div>
<div class="example-row"><span class="lbl">Total indirect costs</span><span class="val">€30,000</span></div>
<div class="example-row"><span class="lbl">Total direct costs</span><span class="val">€150,000</span></div>
<div class="example-row"><span class="lbl">Overhead rate</span><span class="val hl">€30,000 / €150,000 = 20%</span></div>
<div class="example-row"><span class="lbl">Direct costs per table</span><span class="val">€50</span></div>
<div class="example-row"><span class="lbl">Cost price per table</span><span class="val hl">€50 × 1.20 = €60</span></div></div>
<h4>ABC — Why is it fairer?</h4>
<p>Suppose machine set-up costs €10,000 per run. Product A requires 8 runs, product B only 2 runs. With a simple overhead rate they'd pay the same — but that's unfair. ABC <strong>links costs to the activities that cause them</strong>.</p>
<div class="example-box"><div class="ex-title">⚙️ ABC — Set-up costs</div>
<div class="example-row"><span class="lbl">Set-up costs total</span><span class="val">€100,000 for 10 runs</span></div>
<div class="example-row"><span class="lbl">Rate per run</span><span class="val hl">€100,000 / 10 = €10,000/run</span></div>
<div class="example-row"><span class="lbl">Product A (8 runs, 4,000 units)</span><span class="val">(€10,000 × 8) / 4,000 = €20/unit</span></div>
<div class="example-row"><span class="lbl">Product B (2 runs, 2,000 units)</span><span class="val">(€10,000 × 2) / 2,000 = €10/unit</span></div></div>
<div class="tip-box"><strong>ABC steps:</strong> 1. Identify activities → 2. Cost pools → 3. Determine cost drivers → 4. Allocate costs.</div>`,

 w5:`<h4>When do you earn exactly nothing — and when do profits start?</h4>
<p>The break-even point (BEP) is where total revenue = total costs. Before that point you make a loss; after it, a profit. The <strong>safety margin</strong> tells you how far above that point you are — the bigger, the better.</p>
<div class="example-box"><div class="ex-title">☕ Example — Coffee stall at a market</div>
<div class="example-row"><span class="lbl">Pitch fee (fixed, C)</span><span class="val">€180/day</span></div>
<div class="example-row"><span class="lbl">Cost per cup (variable, v)</span><span class="val">€1</span></div>
<div class="example-row"><span class="lbl">Selling price (p)</span><span class="val">€4</span></div>
<div class="example-row"><span class="lbl">Contribution margin per cup</span><span class="val">€4 − €1 = €3</span></div>
<div class="example-row"><span class="lbl">Break-even quantity</span><span class="val hl">€180 / €3 = 60 cups</span></div>
<div class="example-row"><span class="lbl">Expected sales</span><span class="val">90 cups</span></div>
<div class="example-row"><span class="lbl">Safety margin</span><span class="val hl">(90 − 60) / 90 × 100% = 33%</span></div></div>
<h4>Profit target</h4>
<p>Want to earn <strong>€90 profit</strong> per day? Then:</p>
<div class="example-box"><div class="ex-title">🎯 Target</div>
<div class="example-row"><span class="lbl">q = (C + target profit) / CM</span><span class="val hl">(€180 + €90) / €3 = 90 cups</span></div></div>
<h4>Variance analysis (ex-ante vs ex-post)</h4>
<p>The <strong>ex-ante budget</strong> is what you planned in advance. The <strong>ex-post budget</strong> is adjusted for actual production — then compared with actual costs. A <em>favourable</em> variance means you produced more cheaply than the standard.</p>
<div class="tip-box"><strong>Watch out:</strong> Always compare the ex-post budget with actual costs — not with the ex-ante budget. Otherwise you're comparing apples and oranges (different production volumes).</div>`
 }
},
fr:{
 hint_btn:'💭 Indice', hint_none:"Plus d'indices — consultez la solution !",
 cheatsheet_btn:'📋 Aide-mémoire', progress_label:'réponses correctes',
 boss:'BOSS', check:'Vérifier', show_sol:'Voir solution', hide_sol:'Cacher solution',
 reset:'Réinitialiser', correct_msg:'✓ Correct !', wrong_msg:'✗ Incorrect, réessayez.',
 encouragements:['🎉 Excellent ! Tu as trouvé !','💪 Parfait, continue comme ça !','⭐ Bravo ! Tu comprends vraiment bien !','🚀 Super boulot !','✨ Génial ! Tu es sur la bonne voie !','🏆 Performance de champion !','🔥 Wow, impeccable !','💡 Exactement ! Tu maîtrises !'],
 theory:'📚 Théorie & Formules', close:'Fermer',
 tabs:['W1: Amortissements','W2: Coûts complets','W3: Coûts variables','W4: Affectation des coûts','W5: Seuil de rentabilité','W6: Exercices mixtes'],
 w_sub:["Dépréciation des immobilisations","Coût unitaire incluant les coûts fixes","Coût unitaire hors coûts fixes","Répartition des coûts aux produits","Seuil de rentabilité et analyse des écarts","Combinez les connaissances de plusieurs ateliers"],
 score_text:'exercices corrects',
 easy:'Facile', medium:'Moyen', hard:'Difficile',
 logo_sub:'Exercices',
 understand_btn:"💡 Comment ça marche ? — Compréhension & Intuition",
 understand:{
 w1:`<h4>Qu'est-ce que l'amortissement ?</h4>
<p>Une machine, une voiture ou un ordinateur perd de la valeur avec le temps. Amortir, c'est répartir cette dépréciation sur la durée de vie de l'actif en tant que <strong>charge annuelle</strong>. Tu paies l'actif une seule fois, mais tu en étales le coût sur chaque année d'utilisation.</p>
<div class="example-box"><div class="ex-title">🚗 Exemple — Voiture de société</div>
<div class="example-row"><span class="lbl">Prix d'achat (A)</span><span class="val">€20.000</span></div>
<div class="example-row"><span class="lbl">Valeur résiduelle (R)</span><span class="val">€4.000 (valeur après 4 ans)</span></div>
<div class="example-row"><span class="lbl">Durée de vie (n)</span><span class="val">4 ans</span></div>
<div class="example-row"><span class="lbl">Total à amortir</span><span class="val">€20.000 − €4.000 = €16.000</span></div></div>
<h4>Les 4 méthodes comparées</h4>
<div class="rule-grid">
<div class="rule-card"><div class="rule-head">1. Linéaire</div>Même montant chaque année: €16.000 / 4 = <strong>€4.000/an</strong>. Simple et stable.</div>
<div class="rule-card"><div class="rule-head">2. % fixe de la valeur comptable</div>Un % de la valeur restante chaque année. Plus élevé en an 1, plus faible en an 4. Réaliste pour les machines.</div>
<div class="rule-card"><div class="rule-head">3. Somme des chiffres</div>Maximum en an 1, minimum en an 4. Coefficients: 4-3-2-1 (somme=10). Idéal pour les voitures qui se déprécient vite.</div>
<div class="rule-card"><div class="rule-head">4. Annuité décroissante</div>L'amortissement diminue du même montant chaque année. Se résout par une équation.</div></div>
<div class="tip-box"><strong>Règle mnémotechnique:</strong> Une voiture perd vite de la valeur → somme des chiffres ou % fixe. Une machine s'use régulièrement → linéaire. L'examen donne toujours un indice !</div>`,

 w2:`<h4>Qu'est-ce que le coût de revient complet ?</h4>
<p>Imagine une boulangerie. Tu paies <strong>€2.000 de loyer</strong> chaque mois — que tu fasses 1 gâteau ou 1.000. Ce sont des <strong>coûts fixes</strong>. Les ingrédients coûtent <strong>€3 par gâteau</strong> — ces coûts varient avec la production. Le coût de revient complet est le coût moyen de chaque gâteau, coûts fixes inclus.</p>
<div class="example-box"><div class="ex-title">🍰 Exemple — Boulangerie (N = 500 gâteaux)</div>
<div class="example-row"><span class="lbl">Coûts fixes C</span><span class="val">€2.000/mois</span></div>
<div class="example-row"><span class="lbl">Coûts variables v</span><span class="val">€3 par gâteau</span></div>
<div class="example-row"><span class="lbl">Coût unitaire k = C/N + v</span><span class="val hl">€2.000/500 + €3 = €7/gâteau</span></div>
<div class="example-row"><span class="lbl">Prix de vente p</span><span class="val">€10/gâteau</span></div></div>
<h4>Résultat de sous-activité — si tu produis moins que prévu ?</h4>
<p>Tu ne fais que <strong>400 gâteaux</strong> (W) au lieu de 500 (N). Tu paies quand même €2.000 de loyer. Ces 100 gâteaux "non produits" génèrent une <strong>perte de sous-activité</strong>:</p>
<div class="example-box"><div class="ex-title">📉 Sous-activité</div>
<div class="example-row"><span class="lbl">Résultat d'occupation</span><span class="val">(W − N) × C/N = (400 − 500) × €4 = <span class="hl">−€400</span></span></div>
<div class="example-row"><span class="lbl">Résultat de vente</span><span class="val">(€10 − €7) × 400 = <span class="hl">+€1.200</span></span></div>
<div class="example-row"><span class="lbl">Résultat d'exploitation</span><span class="val">€1.200 − €400 = <span class="hl">€800</span></span></div></div>
<div class="tip-box"><strong>À retenir:</strong> Si W = N, le résultat d'occupation est toujours €0. W > N → gain d'occupation. W < N → perte d'occupation.</div>`,

 w3:`<h4>Quelle est la différence avec le Coût Complet ?</h4>
<p>Avec le coût complet, les coûts fixes sont inclus dans le coût unitaire. Avec le coût variable (Direct Costing) — <strong>les coûts fixes vont directement au compte de résultat</strong>, indépendamment des ventes. Le DC est fait pour les <strong>décisions internes</strong> (court terme).</p>
<h4>La règle d'or du DC</h4>
<p>Tu vas payer les coûts fixes <em>de toute façon</em>. La vraie question pour une commande supplémentaire est: <strong>vais-je gagner plus que ce que ça coûte à produire ?</strong> (= coûts variables)</p>
<div class="example-box"><div class="ex-title">🚲 Exemple — Vélociste, commande ponctuelle</div>
<div class="example-row"><span class="lbl">Coût de revient complet k</span><span class="val">€300 (dont €100 fixe, €200 variable)</span></div>
<div class="example-row"><span class="lbl">Offre: prix par vélo</span><span class="val">€240 pour 20 vélos</span></div>
<div class="example-row"><span class="lbl">Raisonnement CC</span><span class="val">€240 &lt; €300 → refuser ✗</span></div>
<div class="example-row"><span class="lbl">Raisonnement DC</span><span class="val">€240 &gt; €200 variable → MB extra = €40/unité ✓</span></div>
<div class="example-row"><span class="lbl">Profit supplémentaire</span><span class="val hl">20 × €40 = €800</span></div></div>
<h4>Quand le résultat CC diffère-t-il du résultat DC ?</h4>
<div class="rule-grid">
<div class="rule-card"><div class="rule-head">Production > Ventes (stock ↑)</div>Résultat CC &gt; Résultat DC. En CC, les coûts fixes sont stockés dans les stocks — ils ne deviennent une charge que lors de la vente.</div>
<div class="rule-card"><div class="rule-head">Production &lt; Ventes (stock ↓)</div>Résultat CC &lt; Résultat DC. Le stock baisse — les coûts fixes stockés de la période précédente ressortent comme charges supplémentaires.</div></div>
<div class="tip-box"><strong>Règle:</strong> Différence = variation de stock × C/N. Si production = ventes → CC = DC, toujours.</div>`,

 w4:`<h4>Pourquoi faut-il répartir les coûts indirects ?</h4>
<p>Une entreprise fabrique à la fois des <strong>tables</strong> et des <strong>chaises</strong>. La facture d'électricité, le loyer et les amortissements de machines sont des coûts indirects — on ne peut pas les attribuer directement à un seul produit. Si tu ne les répartis pas équitablement, le coût de revient est faux.</p>
<div class="example-box"><div class="ex-title">🪑 Exemple — Méthode primitive</div>
<div class="example-row"><span class="lbl">Total coûts indirects</span><span class="val">€30.000</span></div>
<div class="example-row"><span class="lbl">Total coûts directs</span><span class="val">€150.000</span></div>
<div class="example-row"><span class="lbl">Taux de frais généraux</span><span class="val hl">€30.000 / €150.000 = 20%</span></div>
<div class="example-row"><span class="lbl">Coûts directs par table</span><span class="val">€50</span></div>
<div class="example-row"><span class="lbl">Coût de revient table</span><span class="val hl">€50 × 1,20 = €60</span></div></div>
<h4>ABC — Pourquoi est-ce plus équitable ?</h4>
<p>Supposons que régler la machine (set-up) coûte €10.000 par série. Le produit A nécessite 8 séries, le produit B seulement 2. Avec un taux unique ils paieraient la même chose — ce qui est injuste. L'ABC <strong>relie les coûts aux activités qui les causent</strong>.</p>
<div class="example-box"><div class="ex-title">⚙️ ABC — Coûts de mise en route</div>
<div class="example-row"><span class="lbl">Coûts de set-up totaux</span><span class="val">€100.000 pour 10 séries</span></div>
<div class="example-row"><span class="lbl">Taux par série</span><span class="val hl">€100.000 / 10 = €10.000/série</span></div>
<div class="example-row"><span class="lbl">Produit A (8 séries, 4.000 unités)</span><span class="val">(€10.000 × 8) / 4.000 = €20/unité</span></div>
<div class="example-row"><span class="lbl">Produit B (2 séries, 2.000 unités)</span><span class="val">(€10.000 × 2) / 2.000 = €10/unité</span></div></div>
<div class="tip-box"><strong>Étapes ABC:</strong> 1. Identifier les activités → 2. Regrouper les coûts → 3. Déterminer les inducteurs → 4. Imputer les coûts.</div>`,

 w5:`<h4>Quand ne gagne-t-on exactement rien — et quand commence-t-on à faire des bénéfices ?</h4>
<p>Le seuil de rentabilité (BEP) est le point où recettes totales = coûts totaux. Avant ce point tu fais une perte; après, un bénéfice. La <strong>marge de sécurité</strong> indique à quelle distance tu es au-dessus de ce seuil — plus c'est grand, mieux c'est.</p>
<div class="example-box"><div class="ex-title">☕ Exemple — Stand de café au marché</div>
<div class="example-row"><span class="lbl">Emplacement (fixe, C)</span><span class="val">€180/jour</span></div>
<div class="example-row"><span class="lbl">Coût par tasse (variable, v)</span><span class="val">€1</span></div>
<div class="example-row"><span class="lbl">Prix de vente (p)</span><span class="val">€4</span></div>
<div class="example-row"><span class="lbl">Marge sur coût variable par tasse</span><span class="val">€4 − €1 = €3</span></div>
<div class="example-row"><span class="lbl">Seuil de rentabilité</span><span class="val hl">€180 / €3 = 60 tasses</span></div>
<div class="example-row"><span class="lbl">Ventes prévues</span><span class="val">90 tasses</span></div>
<div class="example-row"><span class="lbl">Marge de sécurité</span><span class="val hl">(90 − 60) / 90 × 100% = 33%</span></div></div>
<h4>Objectif de bénéfice</h4>
<p>Vouloir gagner <strong>€90 de bénéfice</strong> par jour ? Alors:</p>
<div class="example-box"><div class="ex-title">🎯 Objectif</div>
<div class="example-row"><span class="lbl">q = (C + bénéfice cible) / MCV</span><span class="val hl">(€180 + €90) / €3 = 90 tasses</span></div></div>
<h4>Analyse des écarts (ex-ante vs ex-post)</h4>
<p>Le <strong>budget ex-ante</strong> est ce que tu avais prévu à l'avance. Le <strong>budget ex-post</strong> est ajusté sur la production réelle — puis comparé aux coûts réels. Un écart <em>favorable</em> signifie que tu as produit moins cher que la norme.</p>
<div class="tip-box"><strong>Attention:</strong> Compare toujours le budget ex-post avec les coûts réels — pas avec le budget ex-ante. Sinon tu compares des pommes et des oranges (volumes de production différents).</div>`
 }
},
};

let lang = 'nl';
let hintState = {}; // exId -> 0,1,2
let correctSet = new Set(JSON.parse(localStorage.getItem('esther_mac_correct')||'[]'));
let workshopScores = [0,0,0,0,0,0];

function saveMacProgress(){ try{ localStorage.setItem('esther_mac_correct', JSON.stringify([...correctSet])); }catch(e){} }
function saveOmiProgress(){ try{ localStorage.setItem('esther_omi_correct', JSON.stringify([...omiCorrectSet])); }catch(e){} }

// ── answer spec ───────────────────────────────────────────────────────────
// numeric: [[val,tol],...] or mcq:{idx} or mixed:{mcq:idx, inputs:[[v,t],...]}
