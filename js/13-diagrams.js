// ═══════════════════════════════════════════════════════════════════
// Diagrams — clean trilingual SVG, theme-aware (dark mode via CSS vars)
// Inserted into theory via [[DIAG:key]] placeholders, rendered per-language
// ═══════════════════════════════════════════════════════════════════
function dgL(nl,en,fr){ return lang==='fr'?fr:lang==='en'?en:nl; }
function dgWrap(title, svg){ return `<figure class="diagram"><figcaption>${title}</figcaption>${svg}</figure>`; }
const OMI_AC = '#f97316';

const DIAGRAMS = {
 // ── MAC ──────────────────────────────────────────────
 breakeven(){
 return dgWrap(dgL('Break-evengrafiek','Break-even chart','Graphique du seuil de rentabilité'), `
<svg viewBox="0 0 600 350" role="img">
 <polygon points="70,290 364,158 70,230" fill="var(--error)" opacity="0.13"/>
 <polygon points="364,158 560,70 560,110" fill="var(--success)" opacity="0.16"/>
 <line class="dg-axis" x1="70" y1="40" x2="70" y2="290"/>
 <line class="dg-axis" x1="70" y1="290" x2="565" y2="290"/>
 <line x1="70" y1="230" x2="560" y2="230" stroke="var(--warning)" stroke-width="2.5" stroke-dasharray="6 4"/>
 <line x1="70" y1="230" x2="560" y2="110" stroke="var(--blue-dark)" stroke-width="2.5"/>
 <line x1="70" y1="290" x2="560" y2="70" stroke="var(--primary)" stroke-width="2.5"/>
 <circle cx="364" cy="158" r="6" fill="var(--text)"/>
 <line x1="364" y1="158" x2="364" y2="290" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3"/>
 <text class="dg-t" x="368" y="150" font-size="13" font-weight="600">${dgL('Break-evenpunt','Break-even point','Seuil')}</text>
 <text class="dg-t" x="566" y="72" font-size="12" fill="var(--primary)">${dgL('Omzet','Revenue','Chiffre d\'affaires')}</text>
 <text class="dg-t" x="566" y="112" font-size="12" fill="var(--blue-dark)">${dgL('Totale kosten','Total cost','Coût total')}</text>
 <text class="dg-t" x="566" y="232" font-size="12" fill="var(--warning)">${dgL('Vaste kosten','Fixed cost','Coûts fixes')}</text>
 <text class="dg-m" x="150" y="265" font-size="12">${dgL('verlies','loss','perte')}</text>
 <text class="dg-m" x="450" y="150" font-size="12">${dgL('winst','profit','bénéfice')}</text>
 <text class="dg-m" x="300" y="315" font-size="12">${dgL('Afzet (aantal)','Sales (units)','Ventes (unités)')}</text>
 <text class="dg-m" x="20" y="60" font-size="12">€</text>
</svg>`);
 },
 depr_curves(){
 const yr=[60,185,310,435,560];
 const lin=[50,100,150,200,250], db=[50,150,205,238,250], syd=[50,120,180,225,250], dfa=[50,108,162,212,250];
 const poly=(arr,c)=>`<polyline points="${arr.map((y,i)=>yr[i]+','+y).join(' ')}" fill="none" stroke="${c}" stroke-width="2.5"/>`;
 return dgWrap(dgL('Boekwaarde per methode (A→R)','Book value per method (A→R)','Valeur comptable par méthode (A→R)'), `
<svg viewBox="0 0 600 320" role="img">
 <line class="dg-axis" x1="60" y1="30" x2="60" y2="270"/>
 <line class="dg-axis" x1="60" y1="270" x2="575" y2="270"/>
 <text class="dg-m" x="30" y="55" font-size="12">A</text>
 <text class="dg-m" x="30" y="255" font-size="12">R</text>
 ${poly(lin,'var(--primary)')}${poly(db,'var(--blue-dark)')}${poly(syd,'var(--warning)')}${poly(dfa,'var(--success)')}
 <g font-size="12">
 <rect x="400" y="40" width="14" height="3" fill="var(--primary)"/><text class="dg-t" x="420" y="46">${dgL('Lineair','Linear','Linéaire')}</text>
 <rect x="400" y="60" width="14" height="3" fill="var(--blue-dark)"/><text class="dg-t" x="420" y="66">${dgL('Vast % BW','Declining %','Dégressif %')}</text>
 <rect x="400" y="80" width="14" height="3" fill="var(--warning)"/><text class="dg-t" x="420" y="86">${dgL('Cijfersom','SYD','Somme chiffres')}</text>
 <rect x="400" y="100" width="14" height="3" fill="var(--success)"/><text class="dg-t" x="420" y="106">${dgL('Dalend vast','Decr. fixed','Dégressif fixe')}</text>
 </g>
 <text class="dg-m" x="300" y="298" font-size="12">${dgL('Jaren','Years','Années')}</text>
</svg>`);
 },
 cost_behavior(){
 return dgWrap(dgL('Kostenverloop: vast, variabel, totaal','Cost behaviour: fixed, variable, total','Comportement des coûts: fixe, variable, total'), `
<svg viewBox="0 0 600 300" role="img">
 <line class="dg-axis" x1="60" y1="30" x2="60" y2="250"/>
 <line class="dg-axis" x1="60" y1="250" x2="575" y2="250"/>
 <line x1="60" y1="200" x2="560" y2="200" stroke="var(--warning)" stroke-width="2.5"/>
 <line x1="60" y1="250" x2="560" y2="110" stroke="var(--blue-dark)" stroke-width="2.5"/>
 <line x1="60" y1="200" x2="560" y2="60" stroke="var(--primary)" stroke-width="2.5"/>
 <text class="dg-t" x="566" y="62" font-size="12" fill="var(--primary)">${dgL('Totale kosten','Total cost','Coût total')}</text>
 <text class="dg-t" x="566" y="112" font-size="12" fill="var(--blue-dark)">${dgL('Variabele kosten','Variable cost','Coûts variables')}</text>
 <text class="dg-t" x="566" y="202" font-size="12" fill="var(--warning)">${dgL('Vaste kosten','Fixed cost','Coûts fixes')}</text>
 <text class="dg-m" x="300" y="278" font-size="12">${dgL('Productie (aantal)','Output (units)','Production (unités)')}</text>
 <text class="dg-m" x="20" y="50" font-size="12">€</text>
</svg>`);
 },
 ac_vs_dc(){
 const box=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${c}" opacity="0.16" stroke="${c}" stroke-width="1.5"/>`;
 return dgWrap(dgL('Absorption vs Direct costing (W > afzet)','Absorption vs Direct costing (W > sales)','Absorption vs Direct costing (W > ventes)'), `
<svg viewBox="0 0 600 300" role="img">
 <text class="dg-t" x="150" y="24" font-size="13" font-weight="600" text-anchor="middle">Absorption (AC)</text>
 <text class="dg-t" x="450" y="24" font-size="13" font-weight="600" text-anchor="middle">Direct (DC)</text>
 ${box(60,45,180,40,'var(--warning)')}<text class="dg-t" x="150" y="70" font-size="12" text-anchor="middle">${dgL('Vaste kosten','Fixed costs','Coûts fixes')}</text>
 ${box(60,130,110,45,'var(--blue-dark)')}<text class="dg-t" x="115" y="150" font-size="11" text-anchor="middle">${dgL('Resultaten-','Income','Compte de')}</text><text class="dg-t" x="115" y="164" font-size="11" text-anchor="middle">${dgL('rekening','statement','résultat')}</text>
 ${box(185,130,95,45,'var(--success)')}<text class="dg-t" x="232" y="150" font-size="11" text-anchor="middle">${dgL('Voorraad','Inventory','Stock')}</text><text class="dg-m" x="232" y="164" font-size="10" text-anchor="middle">${dgL('(balans)','(balance)','(bilan)')}</text>
 <line x1="130" y1="85" x2="115" y2="128" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#dgar)"/>
 <line x1="180" y1="85" x2="232" y2="128" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#dgar)"/>
 ${box(360,45,180,40,'var(--warning)')}<text class="dg-t" x="450" y="70" font-size="12" text-anchor="middle">${dgL('Vaste kosten','Fixed costs','Coûts fixes')}</text>
 ${box(360,130,180,45,'var(--blue-dark)')}<text class="dg-t" x="450" y="156" font-size="12" text-anchor="middle">${dgL('Volledig → resultaat','All → income','Tout → résultat')}</text>
 <line x1="450" y1="85" x2="450" y2="128" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#dgar)"/>
 <text class="dg-m" x="300" y="215" font-size="12" text-anchor="middle">${dgL('AC schuift een deel van de vaste kosten naar de voorraad → hogere winst dan DC','AC shifts part of fixed costs into inventory → higher profit than DC','L\'AC reporte une partie des coûts fixes en stock → bénéfice plus élevé que la DC')}</text>
 <defs><marker id="dgar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--muted)"/></marker></defs>
</svg>`);
 },
 cost_alloc(){
 const b=(x,t1,t2,c)=>`<rect x="${x}" y="70" width="120" height="60" rx="10" fill="${c}" opacity="0.15" stroke="${c}" stroke-width="1.5"/><text class="dg-t" x="${x+60}" y="${t2?96:104}" font-size="12" text-anchor="middle">${t1}</text>${t2?`<text class="dg-t" x="${x+60}" y="112" font-size="12" text-anchor="middle">${t2}</text>`:''}`;
 const ar=(x)=>`<line x1="${x}" y1="100" x2="${x+30}" y2="100" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#dgar2)"/>`;
 return dgWrap(dgL('Kostenplaatsenmethode (KPM) — de stroom','Cost centre method (KPM) — the flow','Méthode des centres de coûts (KPM) — le flux'), `
<svg viewBox="0 0 600 200" role="img">
 ${b(10,dgL('Indirecte','Indirect','Indirects'),dgL('kosten','costs','coûts'),'var(--warning)')}${ar(130)}
 ${b(165,dgL('Hulpkosten-','Support','Centres'),dgL('plaatsen','centres','auxiliaires'),'var(--blue-dark)')}${ar(285)}
 ${b(320,dgL('Hoofdkosten-','Main','Centres'),dgL('plaatsen','centres','principaux'),'var(--primary)')}${ar(440)}
 ${b(470,dgL('Producten','Products','Produits'),'','var(--success)')}
 <text class="dg-m" x="300" y="165" font-size="12" text-anchor="middle">${dgL('Grover: opslagmethode · Fijner: ABC (per activiteit & cost driver)','Cruder: overhead % · Finer: ABC (per activity & cost driver)','Plus grossier: taux global · Plus fin: ABC (par activité & inducteur)')}</text>
 <defs><marker id="dgar2" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--muted)"/></marker></defs>
</svg>`);
 },
 // ── OmI ──────────────────────────────────────────────
 gigo(){
 return dgWrap(dgL('Van gegevens naar informatie (GIGO)','From data to information (GIGO)','Des données à l\'information (GIGO)'), `
<svg viewBox="0 0 600 200" role="img">
 <rect x="20" y="70" width="130" height="60" rx="10" fill="${OMI_AC}" opacity="0.13" stroke="${OMI_AC}" stroke-width="1.5"/>
 <text class="dg-t" x="85" y="96" font-size="12" text-anchor="middle">${dgL('Gegevens','Data','Données')}</text>
 <text class="dg-m" x="85" y="112" font-size="10" text-anchor="middle">${dgL('(ruwe feiten)','(raw facts)','(faits bruts)')}</text>
 <path d="M225,100 a40,40 0 1 0 0.1,0" fill="none" stroke="var(--blue-dark)" stroke-width="2.5"/>
 <path d="M265,100 l-10,-5 0,10 z" fill="var(--blue-dark)"/>
 <text class="dg-t" x="225" y="96" font-size="11" text-anchor="middle">${dgL('Verwerken','Process','Traiter')}</text>
 <text class="dg-m" x="225" y="170" font-size="11" text-anchor="middle">${dgL('+ betekenis / context','+ meaning / context','+ sens / contexte')}</text>
 <rect x="330" y="70" width="150" height="60" rx="10" fill="var(--success)" opacity="0.14" stroke="var(--success)" stroke-width="1.5"/>
 <text class="dg-t" x="405" y="96" font-size="12" text-anchor="middle">${dgL('Informatie','Information','Information')}</text>
 <text class="dg-m" x="405" y="112" font-size="10" text-anchor="middle">${dgL('(vergroot kennis)','(adds knowledge)','(accroît le savoir)')}</text>
 <line x1="150" y1="100" x2="182" y2="100" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#gar)"/>
 <line x1="268" y1="100" x2="328" y2="100" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#gar)"/>
 <text class="dg-m" x="300" y="30" font-size="12" text-anchor="middle" font-style="italic">${dgL('Garbage in → garbage out: slechte input = slechte informatie','Garbage in → garbage out: bad input = bad information','Garbage in → garbage out: mauvaise entrée = mauvaise information')}</text>
 <defs><marker id="gar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--muted)"/></marker></defs>
</svg>`);
 },
 dfd_symbols(){
 const cap=(x,y,t)=>`<text class="dg-t" x="${x}" y="${y}" font-size="12" text-anchor="middle">${t}</text>`;
 return dgWrap(dgL('GSS — de symbolen (volgens het boek)','DFD/GSS — the symbols (per the book)','GSS — les symboles (selon le livre)'), `
<svg viewBox="0 0 600 230" role="img">
 <circle cx="100" cy="57" r="28" fill="var(--primary)" opacity="0.13" stroke="var(--primary)" stroke-width="1.5"/><text class="dg-t" x="100" y="62" font-size="14" font-weight="700" text-anchor="middle">1</text>
 ${cap(100,110,dgL('Activiteit (genummerde cirkel)','Activity (numbered circle)','Activité (cercle numéroté)'))}
 <rect x="340" y="30" width="120" height="55" class="dg-box" rx="2"/>${cap(400,62,dgL('Bron / bestemming','Source / destination','Source / destination'))}
 ${cap(400,110,dgL('(rechthoek)','(rectangle)','(rectangle)'))}
 <path d="M40,195 h120 M40,160 v35 M160,160 v35" fill="none" stroke="var(--blue-dark)" stroke-width="1.5"/>${cap(100,182,dgL('Gegevensverzameling','Data collection','Collection de données'))}
 ${cap(100,213,dgL('(open rechthoek)','(open rectangle)','(rectangle ouvert)'))}
 <line x1="340" y1="180" x2="455" y2="180" stroke="var(--success)" stroke-width="2.5" marker-end="url(#dar)"/>${cap(400,205,dgL('Gegevensstroom (benoemde pijl)','Data flow (named arrow)','Flux de données (flèche nommée)'))}
 <defs><marker id="dar" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--success)"/></marker></defs>
</svg>`);
 },
 spinmodel(){
 const nodes=[dgL('Mens','People','Humain'),dgL('Hardware','Hardware','Matériel'),dgL('Software','Software','Logiciel'),dgL('Gegevens','Data','Données'),dgL('Procedures','Procedures','Procédures'),dgL('Organisatie','Organisation','Organisation')];
 const cx=300,cy=130,R=95;
 let spokes='';
 nodes.forEach((n,i)=>{ const a=(-90+i*60)*Math.PI/180; const x=cx+R*Math.cos(a), y=cy+R*Math.sin(a);
 spokes+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--border)" stroke-width="1.5"/>`+
 `<circle cx="${x}" cy="${y}" r="6" fill="${OMI_AC}"/>`+
 `<text class="dg-t" x="${x}" y="${y+(y<cy?-12:22)}" font-size="12" text-anchor="middle">${n}</text>`; });
 return dgWrap(dgL('Spinmodel — bouwstenen van een informatiesysteem','Spider model — building blocks of an information system','Modèle araignée — composantes d\'un système d\'information'), `
<svg viewBox="0 0 600 270" role="img">
 ${spokes}
 <circle cx="${cx}" cy="${cy}" r="42" fill="var(--primary)" opacity="0.15" stroke="var(--primary)" stroke-width="2"/>
 <text class="dg-t" x="${cx}" y="${cy-2}" font-size="12" text-anchor="middle" font-weight="600">${dgL('Informatie-','Information','Système d\'')}</text>
 <text class="dg-t" x="${cx}" y="${cy+13}" font-size="12" text-anchor="middle" font-weight="600">${dgL('systeem','system','information')}</text>
</svg>`);
 },
 cloud(){
 const layer=(y,name,who)=>`<rect x="120" y="${y}" width="360" height="46" rx="8" fill="${OMI_AC}" opacity="0.13" stroke="${OMI_AC}" stroke-width="1.5"/><text class="dg-t" x="140" y="${y+28}" font-size="13" font-weight="600">${name}</text><text class="dg-m" x="465" y="${y+28}" font-size="11" text-anchor="end">${who}</text>`;
 return dgWrap(dgL('Cloud: IaaS · PaaS · SaaS','Cloud: IaaS · PaaS · SaaS','Cloud: IaaS · PaaS · SaaS'), `
<svg viewBox="0 0 600 230" role="img">
 ${layer(20,'SaaS',dgL('kant-en-klaar (browser)','ready-to-use (browser)','prêt à l\'emploi'))}
 ${layer(78,'PaaS',dgL('platform om te bouwen','platform to build on','plateforme de dév.'))}
 ${layer(136,'IaaS',dgL('servers & opslag','servers & storage','serveurs & stockage'))}
 <text class="dg-m" x="300" y="205" font-size="12" text-anchor="middle">${dgL('Hoe hoger, hoe meer de provider beheert','The higher up, the more the provider manages','Plus on monte, plus le fournisseur gère')}</text>
 <line x1="60" y1="170" x2="60" y2="30" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#car)"/>
 <text class="dg-m" x="52" y="105" font-size="11" text-anchor="middle" transform="rotate(-90 52 105)">${dgL('provider beheert meer','provider manages more','le fournisseur gère plus')}</text>
 <defs><marker id="car" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--muted)"/></marker></defs>
</svg>`);
 },
 db_relations(){
 const box=(x,y,t)=>`<rect x="${x}" y="${y}" width="120" height="42" rx="8" class="dg-box"/><text class="dg-t" x="${x+60}" y="${y+26}" font-size="12" text-anchor="middle">${t}</text>`;
 return dgWrap(dgL('Relaties: 1-n en n-m','Relationships: 1-n and n-m','Relations: 1-n et n-m'), `
<svg viewBox="0 0 600 230" role="img">
 <text class="dg-t" x="150" y="22" font-size="12" font-weight="600" text-anchor="middle">1-n</text>
 ${box(30,40,dgL('Klant','Customer','Client'))}${box(220,40,dgL('Bestelling','Order','Commande'))}
 <line x1="150" y1="61" x2="220" y2="61" stroke="var(--muted)" stroke-width="1.5"/>
 <text class="dg-m" x="163" y="55" font-size="12">1</text><text class="dg-m" x="205" y="55" font-size="12">n</text>
 <text class="dg-m" x="185" y="92" font-size="11" text-anchor="middle">${dgL('sleutel klant in bestelling','customer key in order','clé client dans commande')}</text>
 <text class="dg-t" x="150" y="135" font-size="12" font-weight="600" text-anchor="middle">n-m</text>
 ${box(30,150,dgL('Student','Student','Étudiant'))}${box(420,150,dgL('Vak','Course','Cours'))}
 <rect x="225" y="150" width="120" height="42" rx="8" fill="var(--primary)" opacity="0.13" stroke="var(--primary)" stroke-width="1.5"/><text class="dg-t" x="285" y="176" font-size="11" text-anchor="middle">${dgL('Tussentabel','Junction','Table interm.')}</text>
 <line x1="150" y1="171" x2="225" y2="171" stroke="var(--muted)" stroke-width="1.5"/><line x1="345" y1="171" x2="420" y2="171" stroke="var(--muted)" stroke-width="1.5"/>
 <text class="dg-m" x="180" y="165" font-size="11">n</text><text class="dg-m" x="400" y="165" font-size="11">m</text>
</svg>`);
 },
 regelkring(){
 const box=(x,y,w,t,c)=>`<rect x="${x}" y="${y}" width="${w}" height="50" rx="10" fill="${c}" opacity="0.14" stroke="${c}" stroke-width="1.5"/><text class="dg-t" x="${x+w/2}" y="${y+30}" font-size="12.5" text-anchor="middle">${t}</text>`;
 return dgWrap(dgL('Besturingsmodel (regelkring)','Control model (control loop)','Modèle de pilotage (boucle de régulation)'), `
<svg viewBox="0 0 600 230" role="img">
 ${box(190,20,220,dgL('Besturend orgaan','Governing unit','Organe de pilotage'),'var(--primary)')}
 ${box(190,160,220,dgL('Uitvoerend orgaan / proces','Executing unit / process','Organe exécutant / processus'),'var(--blue-dark)')}
 <line x1="250" y1="70" x2="250" y2="158" stroke="var(--muted)" stroke-width="2" marker-end="url(#rar)"/>
 <line x1="350" y1="160" x2="350" y2="72" stroke="var(--muted)" stroke-width="2" marker-end="url(#rar)"/>
 <text class="dg-t" x="120" y="110" font-size="11.5" text-anchor="middle" fill="var(--primary)">${dgL('stuur-','steering','pilotage')}</text>
 <text class="dg-t" x="120" y="125" font-size="11.5" text-anchor="middle" fill="var(--primary)">${dgL('informatie ↓','info ↓','info ↓')}</text>
 <text class="dg-m" x="120" y="142" font-size="10" text-anchor="middle">${dgL('(normen/streefgetal)','(norms/target)','(normes/cible)')}</text>
 <text class="dg-t" x="480" y="110" font-size="11.5" text-anchor="middle" fill="var(--blue-dark)">${dgL('verantwoor-','account-','justifi-')}</text>
 <text class="dg-t" x="480" y="125" font-size="11.5" text-anchor="middle" fill="var(--blue-dark)">${dgL('ding ↑','ability ↑','cation ↑')}</text>
 <text class="dg-m" x="480" y="142" font-size="10" text-anchor="middle">${dgL('(kengetal/meting)','(indicator)','(indicateur)')}</text>
 <defs><marker id="rar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--muted)"/></marker></defs>
</svg>`);
 },
 bsc(){
 const q=(x,y,t,c)=>`<rect x="${x}" y="${y}" width="170" height="55" rx="10" fill="${c}" opacity="0.14" stroke="${c}" stroke-width="1.5"/><text class="dg-t" x="${x+85}" y="${y+33}" font-size="12.5" text-anchor="middle">${t}</text>`;
 return dgWrap(dgL('Balanced Scorecard — 4 perspectieven','Balanced Scorecard — 4 perspectives','Balanced Scorecard — 4 perspectives'), `
<svg viewBox="0 0 600 250" role="img">
 ${q(215,15,dgL('Financieel','Financial','Financière'),'var(--success)')}
 ${q(410,95,dgL('Klant','Customer','Client'),OMI_AC)}
 ${q(215,180,dgL('Interne processen','Internal processes','Processus internes'),'var(--blue-dark)')}
 ${q(20,95,dgL('Leren & groeien','Learning & growth','Apprentissage'),'var(--primary)')}
 <circle cx="300" cy="125" r="46" fill="var(--card)" stroke="var(--border)" stroke-width="1.5"/>
 <text class="dg-t" x="300" y="120" font-size="11.5" text-anchor="middle" font-weight="600">${dgL('Visie &','Vision &','Vision &')}</text>
 <text class="dg-t" x="300" y="135" font-size="11.5" text-anchor="middle" font-weight="600">${dgL('strategie','strategy','stratégie')}</text>
</svg>`);
 }
};

function injectDiagrams(html){ return (html||'').replace(/\[\[DIAG:(\w+)\]\]/g, (m,k)=> DIAGRAMS[k]?DIAGRAMS[k]():''); }

// ── Process Management (Exam 2) diagrams ──
Object.assign(DIAGRAMS, {
 pm_proceshierarchie(){
 const b=(x,t,c)=>`<rect x="${x}" y="60" width="150" height="50" rx="10" fill="${c}" opacity="0.14" stroke="${c}" stroke-width="1.5"/><text class="dg-t" x="${x+75}" y="90" font-size="13" text-anchor="middle">${t}</text>`;
 const ar=(x)=>`<line x1="${x}" y1="85" x2="${x+30}" y2="85" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#pmar)"/>`;
 return dgWrap(dgL('Procesniveaus','Process levels','Niveaux de processus'), `
<svg viewBox="0 0 600 150" role="img">
 ${b(15,dgL('Hoofdproces','Main process','Processus principal'),PM_AC)}${ar(165)}
 ${b(200,dgL('Werkproces','Work process','Sous-processus'),'var(--blue-dark)')}${ar(350)}
 ${b(420,dgL('Werkinstructie','Work instruction','Instruction'),'var(--warning)')}
 <text class="dg-m" x="300" y="135" font-size="12" text-anchor="middle">${dgL('Van grof naar gedetailleerd','From coarse to detailed','Du général au détaillé')}</text>
 <defs><marker id="pmar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="var(--muted)"/></marker></defs>
</svg>`);
 },
 pm_pdca(){
 const seg=[['P','Plan',PM_AC],['D','Do','var(--blue-dark)'],['C','Check','var(--warning)'],['A','Act','var(--success)']];
 let g=''; const cx=150,cy=110,r=70;
 seg.forEach((s,i)=>{ const a=(-90+i*90)*Math.PI/180; const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
 g+=`<circle cx="${x}" cy="${y}" r="26" fill="${s[2]}" opacity="0.16" stroke="${s[2]}" stroke-width="2"/><text class="dg-t" x="${x}" y="${y+5}" font-size="15" font-weight="700" text-anchor="middle" fill="${s[2]}">${s[0]}</text>`;
 });
 return dgWrap(dgL('PDCA-cyclus (Deming)','PDCA cycle (Deming)','Cycle PDCA (Deming)'), `
<svg viewBox="0 0 600 220" role="img">
 <circle cx="150" cy="110" r="70" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/>
 ${g}
 <g font-size="13"><text class="dg-t" x="300" y="70">${dgL('Plan — bedenk de verbetering','Plan — design the improvement','Plan — concevoir l\'amélioration')}</text>
 <text class="dg-t" x="300" y="100">${dgL('Do — voer kleinschalig uit','Do — try small-scale','Do — tester à petite échelle')}</text>
 <text class="dg-t" x="300" y="130">${dgL('Check — meet het resultaat','Check — measure the result','Check — mesurer le résultat')}</text>
 <text class="dg-t" x="300" y="160">${dgL('Act — borg of stuur bij','Act — standardise or adjust','Act — standardiser ou ajuster')}</text></g>
</svg>`);
 },
 pm_inkmodel(){
 const q=(x,y,t,c)=>`<rect x="${x}" y="${y}" width="150" height="40" rx="8" fill="${c}" opacity="0.13" stroke="${c}" stroke-width="1.5"/><text class="dg-t" x="${x+75}" y="${y+25}" font-size="11.5" text-anchor="middle">${t}</text>`;
 return dgWrap(dgL('INK-managementmodel','INK management model','Modèle de management INK'), `
<svg viewBox="0 0 600 230" role="img">
 <text class="dg-m" x="120" y="20" font-size="12" text-anchor="middle" font-weight="600">${dgL('Organisatie','Organisation','Organisation')}</text>
 ${q(20,35,dgL('Leiderschap','Leadership','Leadership'),PM_AC)}
 ${q(20,90,dgL('Strategie & beleid','Strategy & policy','Stratégie'),'var(--blue-dark)')}
 ${q(20,145,dgL('Management v. medewerkers','HR management','Management RH'),'var(--blue-dark)')}
 ${q(200,90,dgL('Management v. processen','Process management','Gestion processus'),'var(--primary)')}
 <text class="dg-m" x="455" y="20" font-size="12" text-anchor="middle" font-weight="600">${dgL('Resultaat','Result','Résultat')}</text>
 ${q(380,35,dgL('Medewerkers','Employees','Personnel'),'var(--success)')}
 ${q(380,90,dgL('Klanten & partners','Customers','Clients'),'var(--success)')}
 ${q(380,145,dgL('Maatschappij','Society','Société'),'var(--success)')}
 <line x1="350" y1="110" x2="378" y2="110" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#pmar)"/>
 <text class="dg-m" x="300" y="205" font-size="11.5" text-anchor="middle">${dgL('Verbeteren & vernieuwen (PDCA-feedback)','Improve & innovate (PDCA feedback)','Améliorer & innover (boucle PDCA)')}</text>
</svg>`);
 },
 pm_swimlane(){
 const lane=(y,t)=>`<line x1="150" y1="${y}" x2="575" y2="${y}" stroke="var(--border)" stroke-width="1"/><text class="dg-m" x="20" y="${y+22}" font-size="12">${t}</text>`;
 const box=(x,y,t)=>`<rect x="${x}" y="${y}" width="80" height="30" rx="6" fill="${PM_AC}" opacity="0.15" stroke="${PM_AC}" stroke-width="1.3"/><text class="dg-t" x="${x+40}" y="${y+20}" font-size="11" text-anchor="middle">${t}</text>`;
 return dgWrap(dgL('Swimlane-diagram','Swimlane diagram','Diagramme en couloirs'), `
<svg viewBox="0 0 600 200" role="img">
 <line x1="150" y1="20" x2="150" y2="180" stroke="var(--border)" stroke-width="1.5"/>
 ${lane(20,dgL('Klant','Customer','Client'))}${lane(75,dgL('Verkoop','Sales','Ventes'))}${lane(130,dgL('Magazijn','Warehouse','Entrepôt'))}
 ${box(180,30,dgL('Bestelt','Orders','Commande'))}${box(300,85,dgL('Verwerkt','Process','Traite'))}${box(440,140,dgL('Levert','Ships','Livre'))}
 <line x1="260" y1="45" x2="300" y2="90" stroke="var(--muted)" stroke-width="1.3" marker-end="url(#pmar)"/>
 <line x1="380" y1="100" x2="440" y2="145" stroke="var(--muted)" stroke-width="1.3" marker-end="url(#pmar)"/>
 <text class="dg-m" x="360" y="195" font-size="11.5" text-anchor="middle">${dgL('Elke rij = een rol/afdeling','Each row = a role/department','Chaque ligne = un rôle')}</text>
</svg>`);
 },
 pm_rasci(){
 const letters=[['R',dgL('Responsible — voert uit','Responsible — does it','Réalise')],['A',dgL('Accountable — eindverantwoordelijk','Accountable — owns result','Responsable final')],['S',dgL('Support — helpt','Support — assists','Soutient')],['C',dgL('Consulted — geraadpleegd','Consulted','Consulté')],['I',dgL('Informed — geïnformeerd','Informed','Informé')]];
 let g=''; letters.forEach((l,i)=>{ const y=30+i*32; g+=`<circle cx="40" cy="${y}" r="14" fill="${PM_AC}" opacity="0.16" stroke="${PM_AC}" stroke-width="1.5"/><text class="dg-t" x="40" y="${y+5}" font-size="13" font-weight="700" text-anchor="middle" fill="${PM_AC}">${l[0]}</text><text class="dg-t" x="65" y="${y+5}" font-size="12.5">${l[1]}</text>`; });
 return dgWrap(dgL('RASCI — wie doet wat?','RASCI — who does what?','RASCI — qui fait quoi ?'), `<svg viewBox="0 0 600 195" role="img">${g}</svg>`);
 },
 pm_sipoc(){
 const cols=[['S',dgL('Supplier','Supplier','Fournisseur')],['I',dgL('Input','Input','Entrée')],['P',dgL('Process','Process','Processus')],['O',dgL('Output','Output','Sortie')],['C',dgL('Customer','Customer','Client')]];
 let g=''; cols.forEach((c,i)=>{ const x=15+i*116; g+=`<rect x="${x}" y="40" width="105" height="70" rx="10" fill="${i===2?PM_AC:'var(--blue-dark)'}" opacity="0.14" stroke="${i===2?PM_AC:'var(--blue-dark)'}" stroke-width="1.5"/><text class="dg-t" x="${x+52}" y="68" font-size="20" font-weight="700" text-anchor="middle" fill="${i===2?PM_AC:'var(--blue-dark)'}">${c[0]}</text><text class="dg-t" x="${x+52}" y="92" font-size="11" text-anchor="middle">${c[1]}</text>`; if(i<4) g+=`<text class="dg-m" x="${x+110}" y="80" font-size="16" text-anchor="middle">→</text>`; });
 return dgWrap('SIPOC', `<svg viewBox="0 0 600 140" role="img">${g}<text class="dg-m" x="300" y="130" font-size="11.5" text-anchor="middle">${dgL('Proces van leverancier tot klant, op één rij','Process from supplier to customer in one row','Du fournisseur au client en une ligne')}</text></svg>`);
 },
 pm_servqual(){
 return dgWrap(dgL('Servqual — de kwaliteitskloof (gap)','Servqual — the quality gap','Servqual — l\'écart de qualité'), `
<svg viewBox="0 0 600 180" role="img">
 <rect x="40" y="40" width="200" height="50" rx="10" fill="var(--blue-dark)" opacity="0.14" stroke="var(--blue-dark)" stroke-width="1.5"/>
 <text class="dg-t" x="140" y="62" font-size="12" text-anchor="middle">${dgL('Verwachte kwaliteit','Expected quality','Qualité attendue')}</text>
 <text class="dg-m" x="140" y="80" font-size="10.5" text-anchor="middle">${dgL('(wat de klant verwacht)','(what customer expects)','(ce qu\'attend le client)')}</text>
 <rect x="360" y="40" width="200" height="50" rx="10" fill="${PM_AC}" opacity="0.14" stroke="${PM_AC}" stroke-width="1.5"/>
 <text class="dg-t" x="460" y="62" font-size="12" text-anchor="middle">${dgL('Ervaren kwaliteit','Perceived quality','Qualité perçue')}</text>
 <text class="dg-m" x="460" y="80" font-size="10.5" text-anchor="middle">${dgL('(wat de klant krijgt)','(what customer gets)','(ce que reçoit le client)')}</text>
 <line x1="240" y1="65" x2="358" y2="65" stroke="var(--error)" stroke-width="2.5" stroke-dasharray="6 4"/>
 <text class="dg-t" x="300" y="55" font-size="13" text-anchor="middle" fill="var(--error)" font-weight="600">GAP</text>
 <text class="dg-m" x="300" y="135" font-size="11.5" text-anchor="middle">${dgL('Kwaliteit = ervaren − verwacht. Doel: gap ≤ 0','Quality = perceived − expected. Goal: gap ≤ 0','Qualité = perçue − attendue. But: écart ≤ 0')}</text>
</svg>`);
 },
 pm_fmea(){
 return dgWrap(dgL('FMEA — risicoprioriteitsgetal (RPN)','FMEA — risk priority number (RPN)','FMEA — indice de criticité (RPN)'), `
<svg viewBox="0 0 600 150" role="img">
 <rect x="20" y="50" width="120" height="45" rx="8" fill="${PM_AC}" opacity="0.14" stroke="${PM_AC}" stroke-width="1.5"/><text class="dg-t" x="80" y="70" font-size="12" text-anchor="middle">${dgL('Kans (K)','Likelihood','Probabilité')}</text><text class="dg-m" x="80" y="86" font-size="10" text-anchor="middle">1–10</text>
 <text class="dg-m" x="150" y="78" font-size="18" text-anchor="middle">×</text>
 <rect x="170" y="50" width="120" height="45" rx="8" fill="var(--blue-dark)" opacity="0.14" stroke="var(--blue-dark)" stroke-width="1.5"/><text class="dg-t" x="230" y="70" font-size="12" text-anchor="middle">${dgL('Ernst (E)','Severity','Gravité')}</text><text class="dg-m" x="230" y="86" font-size="10" text-anchor="middle">1–10</text>
 <text class="dg-m" x="300" y="78" font-size="18" text-anchor="middle">×</text>
 <rect x="320" y="50" width="120" height="45" rx="8" fill="var(--warning)" opacity="0.14" stroke="var(--warning)" stroke-width="1.5"/><text class="dg-t" x="380" y="70" font-size="12" text-anchor="middle">${dgL('Detectie (D)','Detection','Détection')}</text><text class="dg-m" x="380" y="86" font-size="10" text-anchor="middle">1–10</text>
 <text class="dg-m" x="450" y="78" font-size="18" text-anchor="middle">=</text>
 <rect x="470" y="50" width="110" height="45" rx="8" fill="var(--error)" opacity="0.14" stroke="var(--error)" stroke-width="1.5"/><text class="dg-t" x="525" y="73" font-size="13" text-anchor="middle" font-weight="700" fill="var(--error)">RPN</text><text class="dg-m" x="525" y="88" font-size="10" text-anchor="middle">${dgL('hoogste eerst','highest first','le plus haut d\'abord')}</text>
</svg>`);
 },
 pm_ishikawa(){
 const bones=[dgL('Mens','People','Personnel'),dgL('Machine','Machine','Machine'),dgL('Methode','Method','Méthode'),dgL('Materiaal','Material','Matériel'),dgL('Meting','Measure','Mesure'),dgL('Milieu','Environment','Milieu')];
 let g=''; bones.forEach((b,i)=>{ const top=i<3; const bx=120+(i%3)*130; const by=top?40:160; const jx=bx+40; const jy=100;
 g+=`<line x1="${bx}" y1="${by}" x2="${jx}" y2="${jy}" stroke="var(--muted)" stroke-width="1.5"/><text class="dg-t" x="${bx}" y="${top?by-6:by+16}" font-size="11.5" text-anchor="middle">${b}</text>`; });
 return dgWrap(dgL('Visgraatdiagram (Ishikawa, 6 M\'s)','Fishbone diagram (Ishikawa, 6 M\'s)','Diagramme en arête de poisson (6 M)'), `
<svg viewBox="0 0 600 200" role="img">
 <line x1="40" y1="100" x2="510" y2="100" stroke="${PM_AC}" stroke-width="2.5"/>
 <polygon points="510,100 495,92 495,108" fill="${PM_AC}"/>
 <rect x="512" y="84" width="80" height="32" rx="8" fill="${PM_AC}" opacity="0.15" stroke="${PM_AC}" stroke-width="1.5"/><text class="dg-t" x="552" y="104" font-size="11" text-anchor="middle">${dgL('Probleem','Problem','Problème')}</text>
 ${g}
</svg>`);
 },
 pm_pareto(){
 const bars=[80,55,38,22,12,8]; let g=''; const bw=42, x0=60, base=210;
 bars.forEach((h,i)=>{ const x=x0+i*60; g+=`<rect x="${x}" y="${base-h*2}" width="${bw}" height="${h*2}" fill="${PM_AC}" opacity="0.7"/>`; });
 let cum=0, tot=bars.reduce((a,b)=>a+b,0), pts=[];
 bars.forEach((h,i)=>{ cum+=h; const x=x0+i*60+bw/2; const y=base-(cum/tot)*160; pts.push(x+','+y); });
 return dgWrap(dgL('Pareto-diagram (80/20)','Pareto chart (80/20)','Diagramme de Pareto (80/20)'), `
<svg viewBox="0 0 600 250" role="img">
 <line class="dg-axis" x1="50" y1="30" x2="50" y2="210"/><line class="dg-axis" x1="50" y1="210" x2="430" y2="210"/>
 ${g}
 <polyline points="${pts.join(' ')}" fill="none" stroke="var(--error)" stroke-width="2.5"/>
 ${pts.map(p=>`<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="3.5" fill="var(--error)"/>`).join('')}
 <line x1="50" y1="${210-0.8*160}" x2="430" y2="${210-0.8*160}" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3"/>
 <text class="dg-m" x="440" y="${210-0.8*160}" font-size="11">80%</text>
 <text class="dg-m" x="240" y="240" font-size="11.5" text-anchor="middle">${dgL('Weinig oorzaken → meeste problemen','Few causes → most problems','Peu de causes → la plupart des problèmes')}</text>
</svg>`);
 },
 pm_regelkring_pm(){ return DIAGRAMS.regelkring(); },
 pm_vsm(){
 const node=(x,t)=>`<rect x="${x}" y="55" width="92" height="40" rx="6" class="dg-box"/><text class="dg-t" x="${x+46}" y="79" font-size="11" text-anchor="middle">${t}</text>`;
 return dgWrap(dgL('Value Stream Map (VSM)','Value Stream Map (VSM)','Value Stream Map (VSM)'), `
<svg viewBox="0 0 600 180" role="img">
 ${node(15,dgL('Leverancier','Supplier','Fournisseur'))}${node(175,dgL('Stap 1','Step 1','Étape 1'))}${node(335,dgL('Stap 2','Step 2','Étape 2'))}${node(495,dgL('Klant','Customer','Client'))}
 ${[107,267,427].map(x=>`<line x1="${x}" y1="75" x2="${x+66}" y2="75" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#pmar)"/>`).join('')}
 <path d="M61 110 h70 v14 h70 v-14 h70 v14 h70 v-14 h70" fill="none" stroke="var(--warning)" stroke-width="1.5"/>
 <text class="dg-m" x="120" y="140" font-size="10.5">${dgL('bewerkingstijd','process time','temps de cycle')}</text>
 <text class="dg-m" x="300" y="160" font-size="11.5" text-anchor="middle">${dgL('Tijdlijn toont waarde-toevoegende vs wachttijd','Timeline shows value-add vs wait time','La timeline distingue valeur ajoutée et attente')}</text>
</svg>`);
 },
 pm_leanprinciples(){
 const steps=[dgL('1. Waarde','1. Value','1. Valeur'),dgL('2. Waardestroom','2. Value stream','2. Flux de valeur'),dgL('3. Flow','3. Flow','3. Flux'),dgL('4. Pull','4. Pull','4. Flux tiré'),dgL('5. Perfectie','5. Perfection','5. Perfection')];
 const cx=140,cy=120,r=85; let g='';
 steps.forEach((s,i)=>{ const a=(-90+i*72)*Math.PI/180; const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
 g+=`<circle cx="${x}" cy="${y}" r="7" fill="${PM_AC}"/><text class="dg-t" x="${x}" y="${y<cy?y-12:y+20}" font-size="10.5" text-anchor="middle">${s.split('.')[0]}</text>`; });
 return dgWrap(dgL('De 5 Lean-principes','The 5 Lean principles','Les 5 principes Lean'), `
<svg viewBox="0 0 600 240" role="img">
 <circle cx="140" cy="120" r="85" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/>${g}
 <text class="dg-t" x="140" y="125" font-size="12" text-anchor="middle" font-weight="600">Lean</text>
 <g font-size="12.5">${steps.map((s,i)=>`<text class="dg-t" x="290" y="${55+i*32}">${s}</text>`).join('')}</g>
</svg>`);
 },
 pm_kubler_ross(){
 const pts=[[60,70],[130,40],[210,150],[290,175],[370,140],[450,90],[530,55]];
 const labels=[dgL('Ontkenning','Denial','Déni'),dgL('Woede','Anger','Colère'),dgL('Onderhandelen','Bargaining','Marchandage'),dgL('Depressie','Depression','Dépression'),dgL('Acceptatie','Acceptance','Acceptation')];
 return dgWrap(dgL('Veranderingscurve (Kübler-Ross)','Change curve (Kübler-Ross)','Courbe du changement (Kübler-Ross)'), `
<svg viewBox="0 0 600 220" role="img">
 <line class="dg-axis" x1="45" y1="20" x2="45" y2="190"/><line class="dg-axis" x1="45" y1="190" x2="575" y2="190"/>
 <polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${PM_AC}" stroke-width="2.5"/>
 ${[1,2,3,4,5].map((p,i)=>`<text class="dg-m" x="${pts[i][0]+20}" y="${pts[i][1]-8}" font-size="10.5" text-anchor="middle">${labels[i]}</text>`).join('')}
 <text class="dg-m" x="20" y="105" font-size="11" text-anchor="middle" transform="rotate(-90 20 105)">${dgL('moraal','morale','moral')}</text>
 <text class="dg-m" x="300" y="212" font-size="11.5" text-anchor="middle">${dgL('Weerstand verloopt in fasen — begeleid elke fase','Resistance moves in phases — guide each one','La résistance passe par des phases — accompagnez-les')}</text>
</svg>`);
 },
 pm_pmi(){
 const col=(x,l,t,c)=>`<rect x="${x}" y="40" width="160" height="100" rx="12" fill="${c}" opacity="0.12" stroke="${c}" stroke-width="1.5"/><text class="dg-t" x="${x+80}" y="68" font-size="15" font-weight="700" text-anchor="middle" fill="${c}">${l}</text><text class="dg-t" x="${x+80}" y="95" font-size="11.5" text-anchor="middle">${t}</text>`;
 return dgWrap(dgL('PMI-methode (Plus / Min / Interessant)','PMI method (Plus / Minus / Interesting)','Méthode PMI (Plus / Moins / Intéressant)'), `
<svg viewBox="0 0 600 165" role="img">
 ${col(20,'P',dgL('Pluspunten','Plus points','Points positifs'),'var(--success)')}
 ${col(220,'M',dgL('Minpunten','Minus points','Points négatifs'),'var(--error)')}
 ${col(420,'I',dgL('Interessant','Interesting','Intéressant'),PM_AC)}
</svg>`);
 }
});

// Append OmI diagram placeholders to the relevant chapters (once)
(function(){
 const map={h2:['gigo'],h3:['dfd_symbols'],h4:['spinmodel','cloud'],h5:['db_relations'],h6:['regelkring','bsc']};
 OMI_CHAPTERS.forEach(ch=>{
 const keys=map[ch.key]; if(!keys) return;
 const tok=keys.map(k=>'[[DIAG:'+k+']]').join('');
 ['nl','en','fr'].forEach(l=>{ const f='theory_'+l; if(ch[f]!==undefined && ch[f].indexOf('[[DIAG:')<0) ch[f]+=tok; });
 });
})();


