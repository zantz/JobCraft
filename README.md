# 🎯 JobCraft – PWA de recherche d'emploi augmentée par l'IA

Application PWA (Progressive Web App) installable sur desktop et mobile.
Fonctionnalités : analyse d'offres, adaptation de CV, génération de lettres de motivation, suivi des candidatures.

---

## 📁 Structure des fichiers

```
jobcraft/
├── index.html          ← Application principale
├── manifest.json       ← Manifeste PWA
├── sw.js               ← Service Worker (cache & offline)
├── icons/
│   ├── icon-192.png    ← Icône PWA
│   └── icon-512.png    ← Icône PWA grande
└── README.md
```

---

## 🔑 Configuration de la clé API

Avant de déployer, ouvrez `index.html` et remplacez à la ligne ~220 :

```javascript
const API_KEY = "VOTRE_CLE_API_ANTHROPIC";
```

Obtenez votre clé sur : https://console.anthropic.com

⚠️ **Important** : Pour une utilisation personnelle uniquement. Ne partagez jamais votre clé API publiquement.

---

## 🚀 Options de déploiement

### Option 1 — Netlify (recommandé, gratuit)

1. Créez un compte sur https://netlify.com
2. Glissez-déposez le dossier `jobcraft/` dans l'interface Netlify
3. Votre app est en ligne en 30 secondes sur une URL `https://xxx.netlify.app`
4. Ouvrez l'URL dans Chrome/Edge → cliquez sur l'icône d'installation dans la barre d'adresse

### Option 2 — GitHub Pages (gratuit)

1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans Settings → Pages → Branch: main
4. Accédez à `https://votrenom.github.io/jobcraft/`

### Option 3 — Serveur local (pour tester)

Avec Python (inclus sur macOS/Linux) :
```bash
cd jobcraft
python3 -m http.server 8080
```
Puis ouvrez : http://localhost:8080

Avec Node.js :
```bash
npx serve .
```

---

## 📲 Installation sur desktop

### Chrome / Edge (Windows, macOS, Linux)
1. Ouvrez l'application dans le navigateur
2. Cliquez sur l'icône ⊕ ou 💻 dans la barre d'adresse
3. Cliquez sur "Installer"
4. L'application apparaît comme une app native avec son icône

### Safari (macOS / iOS)
1. Ouvrez dans Safari
2. Cliquez sur Partager → "Sur l'écran d'accueil"

---

## 💾 Données & vie privée

- Toutes les données (CV, candidatures) sont stockées **localement** dans votre navigateur (localStorage)
- Aucune donnée n'est envoyée ailleurs que l'API Anthropic pour les requêtes IA
- Les données persistent entre les sessions même après fermeture du navigateur
- Pour exporter vos candidatures : ouvrez la console (F12) et tapez :
  ```javascript
  copy(localStorage.getItem("jobcraft_candidatures"))
  ```

---

## 🔧 Personnalisation

### Changer le modèle IA
Dans `index.html`, modifiez :
```javascript
const MODEL = "claude-sonnet-4-20250514";
// Options : claude-opus-4-20250514 (plus puissant), claude-haiku-4-5-20251001 (plus rapide)
```

### Ajouter des statuts de candidature
Dans `index.html`, modifiez le tableau `STATUS_OPTIONS`.

---

## 📌 Utilisation

1. **Onglet "Mon CV"** → Saisissez votre CV complet (format Markdown)
2. **Onglet "Analyser une offre"** → Collez une offre → Analysez → Adaptez CV + Lettre
3. **Sauvegardez** la candidature
4. **Onglet "Candidatures"** → Suivez l'avancement, changez les statuts, ajoutez des notes
