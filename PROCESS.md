# Process — Ajouter du contenu au site d'étude d'Esther

## Vue d'ensemble

Le site est un fichier HTML unique (`index.html`) avec théorie + exercices interactifs en NL/EN/FR.  
Ce document décrit comment transformer n'importe quelle ressource (PPT, livre, photos) en contenu intégré.

---

## Étape 0 — Préparer les ressources

### Formats acceptés
| Format | Comment le fournir |
|--------|-------------------|
| PowerPoint `.pptx` | Partager le fichier directement |
| PDF | Partager le fichier directement |
| Photos de livre | Envoyer les images dans le chat |
| Notes texte | Coller directement dans le chat |

### Ce qu'il faut préciser
- **Matière** : MAC ou OmI (ou nouvelle matière ?)
- **Unité** : Quel workshop (W1–W6) ou chapitre (H1–H6) ?
- **Priorité** : Notions principales vs secondaires ?
- **Langue source** : NL ? FR ? Les deux ?

---

## Étape 1 — Extraction du contenu

### Pour les PowerPoints
```
→ Extraction automatique via python-pptx
→ Texte brut sauvegardé dans /tmp/ppt_[nom].txt
→ Lecture slide par slide
```

### Pour les livres/photos
```
→ Lecture directe des images dans le chat
→ Transcription manuelle des schémas importants
→ Les tableaux et formules sont identifiés et notés
```

### Ce qu'on extrait
- Toutes les définitions et concepts clés
- Toutes les formules (avec variables expliquées)
- Les schémas et tableaux importants
- Les exemples du cours
- Les exercices existants (s'il y en a)

---

## Étape 2 — Génération du contenu (workflow multi-agents)

Un workflow est lancé avec les agents suivants en parallèle :

### Agent Théorie
Génère pour chaque unité :
- Explication du **pourquoi** (pas juste les formules)
- **Légende des variables** (A = prix d'achat, R = valeur résiduelle, etc.)
- Formules encadrées avec explication étape par étape
- Exemple concret fil rouge (même entreprise fictive tout au long)
- Boîtes `tip-box`, `note-box`, `example-box`, `formula`
- **Trilingue** : NL / EN / FR

### Agent Exercices
Génère pour chaque unité **8–10 exercices** :
- Mix **techniques** (lettres et formules pures) + **ludiques** (cas concrets, entreprises)
- **3 niveaux** : easy / medium / hard
- **2 types** : MCQ (choix multiples) + numériques (calcul)
- **2 indices** :
  - Indice 1 = raisonnement conceptuel (pas de formule)
  - Indice 2 = formule avec valeurs substituées
- **Solution détaillée** :
  - Méthode/concept expliqué + pourquoi ici
  - Variables nommées en contexte
  - Chaque calcul justifié avant le résultat
  - Interprétation finale du résultat
- **Trilingue** : NL / EN / FR

### Agent Audit (passe de vérification)
Vérifie adversarialement :
- Toutes les notions du cours sont couvertes ?
- Les formules correspondent exactement au PPT/livre ?
- Rien d'important n'est manqué ?
- Génère des exercices supplémentaires pour les gaps identifiés

---

## Étape 3 — Vérification des réponses

**Avant d'injecter**, vérifier manuellement les réponses numériques critiques :
```
Exemple d'erreur passée :
- ex1_2 : agent donnait p = 33,3% → correct = 47,7% (formule racine cubique)
- ex2_5 : BedR = 3900 → correct = 3300 (erreur de calcul agent)
```

Checklist :
- [ ] Recalculer à la main les 2–3 exercices les plus complexes
- [ ] Vérifier les unités (€, %, années)
- [ ] Vérifier les arrondis (tolérance ±0.1 pour les décimales)

---

## Étape 4 — Injection dans le site

### Structure du fichier HTML
```
index.html
├── const ANS = {...}          → réponses correctes (inputs numériques + MCQ)
├── function getExercises()    → W1–W6 : exercices + théorie
├── const OMI_CHAPTERS = [...]  → H1–H6 : exercices + théorie OmI
├── EXAMS.push(...)            → examens blancs
└── // Init buildUI()          → point d'injection des blocs supplémentaires
```

### Script d'injection (`/tmp/inject_[nom].js`)
```javascript
// Pattern standard :
const html = fs.readFileSync('index.html', 'utf8');

// 1. Remplacer/étendre getExercises() pour MAC
// 2. Étendre OMI_CHAPTERS pour OmI  
// 3. Ajouter les entrées ANS
// 4. Ajouter les examens dans EXAMS

fs.writeFileSync('index.html', html);
```

### Règles importantes
- Les IDs d'inputs doivent toujours être `${ex.id}_${i}` (jamais des lettres comme "d", "p")
- Les HTML dans les strings doivent être nettoyés des `<![CDATA[...]]>`
- Le wrapper `MAC_EXTRA` est idempotent (guard `__merged`)

---

## Étape 5 — Test local

```bash
# Ouvrir le preview (déjà lancé sur port 3456)
# Vérifier dans la console browser :
# - Pas d'erreurs JS
# - Les exercices s'affichent
# - Les réponses correctes sont acceptées
# - La progression est sauvegardée en localStorage
```

---

## Étape 6 — Push GitHub → déploiement automatique

```bash
git add index.html
git commit -m "add [W7 / H7 / nouveau sujet] — théorie + exercices"
git push
# → Netlify redéploie en ~30 secondes
```

---

## Checklist complète

```
[ ] Ressources reçues et format identifié
[ ] Extraction du contenu (PPT/PDF/photos)
[ ] Workflow lancé (théorie + exercices + audit)
[ ] Réponses numériques vérifiées manuellement
[ ] Script d'injection écrit et exécuté
[ ] Preview vérifié (pas d'erreurs JS, exercices fonctionnels)
[ ] git push → site en ligne
```

---

## Erreurs fréquentes à éviter

| Erreur | Cause | Fix |
|--------|-------|-----|
| Input null (`getElementById` retourne null) | ID d'input = lettre ("d", "p") | Toujours utiliser `${ex.id}_${i}` |
| Réponse numérique refusée | Arrondi différent | Ajuster la tolérance dans ANS (`[val, 0.1]`) |
| CDATA dans le HTML | Agent wrappé le HTML | Fonction `deepClean()` dans le script d'injection |
| Progression OmI écrasée par MAC | `updateProgress()` sans garde | `if(currentSubject!=='mac') return;` |
| Site OmI affiché par défaut | Ordre d'init | `switchSubject('mac')` en dernier dans l'init |

---

## Structure des IDs

```
MAC exercises  : ex{workshop}_{num}     → ex1_1, ex2_3, ex6_5
OmI exercises  : h{chapter}_{num}       → h1_1, h3_4
Niveaux (clone): lvl_{id}               → lvl_ex1_1, lvl_h2_3
Examens        : exam{n}_q{m}           → exam1_q1, exam2_q5
```

---

## Commandes utiles

```bash
# Extraire un PPT
python3 -c "
import pptx, sys
p = pptx.Presentation(sys.argv[1])
for i,s in enumerate(p.slides):
    print(f'--- Slide {i+1} ---')
    for sh in s.shapes:
        if sh.has_text_frame:
            print(sh.text_frame.text)
" fichier.pptx > /tmp/ppt_nom.txt

# Vérifier la taille du fichier
wc -c index.html

# Backup avant injection
cp index.html /tmp/index_backup_$(date +%Y%m%d).html

# Compter les exercices
grep -c 'sol:d(' index.html
```
