# Portfolio Hanine — Écosystème Google

Portfolio personnel **Data × IA × Marketing** conçu comme une réplique de
l'écosystème Google (Search, SERP, Images, Maps, Drive, Assistant).

Projet réalisé dans le cadre du **Master Data Marketing & IA — Eugenia School**.

---

## 🎯 Objectif

Présenter mon parcours, mes projets et mes compétences à travers une
interface familière et ludique inspirée des produits Google :

- **Page d'accueil** = Google Search
- **Profil** = page de résultats (SERP) avec knowledge panel
- **Projets** = Google Images
- **Maps** = parcours géographique
- **Drive** = documents (CV, etc.)
- **Assistant** = chatbot (connecté plus tard à l'API Claude)

---

## 🛠️ Stack technique

- **HTML5** sémantique
- **CSS3** vanilla (variables CSS, Flexbox, responsive **mobile-first**)
- **JavaScript** vanilla (aucun framework)
- **Google Fonts** : Roboto & Inter
- Déploiement sur **GitHub Pages**

### Palette de couleurs Google

| Couleur | Code      |
|---------|-----------|
| Bleu    | `#4285f4` |
| Rouge   | `#ea4335` |
| Jaune   | `#fbbc04` |
| Vert    | `#34a853` |

---

## 📁 Structure du projet

```
portfolio-hanine/
├── index.html              # Page d'accueil (Google Search)
├── pages/
│   ├── profile.html        # Page SERP profil
│   ├── experiences.html    # Détail des expériences
│   ├── projects.html       # Détail des projets
│   ├── formation.html      # Détail de la formation
│   ├── stack.html          # Détail de la stack technique
│   ├── maps.html           # Style Google Maps
│   ├── drive.html          # Style Google Drive
│   └── assistant.html      # Chatbot
├── css/
│   ├── global.css          # Variables, reset, typographie
│   ├── google-ui.css       # Composants UI Google
│   └── responsive.css      # Adaptations mobile
├── js/
│   ├── search.js           # Logique de la barre de recherche
│   ├── navigation.js       # Navigation entre les pages
│   └── assistant.js        # Chatbot (API Claude à venir)
├── assets/
│   ├── images/             # Photos perso, miniatures projets
│   └── icons/              # Favicon, logos
└── README.md
```

---

## ✅ Avancement

- [x] **Étape 1** — Page d'accueil, `global.css`, `google-ui.css`, `README.md`
- [ ] Étape 2 — `responsive.css` + `search.js`
- [ ] Étape 3 — Page profil (SERP) + knowledge panel
- [ ] Étape 4 — Pages projets / expériences / formation / stack
- [ ] Étape 5 — Maps, Drive
- [ ] Étape 6 — Assistant (chatbot + API Claude)

---

## 🚀 Lancer le projet en local

Aucune installation requise. Deux options :

```bash
# Option 1 : ouvrir directement le fichier
open index.html

# Option 2 : petit serveur local (recommandé)
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

---

## 🌐 Déploiement sur GitHub Pages

1. Pousser le dossier `portfolio-hanine` sur un dépôt GitHub.
2. Aller dans **Settings → Pages**.
3. Choisir la branche `main` et le dossier racine (`/`).
4. Le site sera publié sur `https://<utilisateur>.github.io/<repo>/`.

> ℹ️ Tous les chemins sont relatifs pour rester compatibles avec GitHub Pages.

---

## 👤 Auteur

**Hanine** — Master Data Marketing & IA, Eugenia School.
