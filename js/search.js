/* ==========================================================================
   search.js — Logique de la barre de recherche
   Portfolio Hanine
   --------------------------------------------------------------------------
   Version de base (Étape 1). La recherche intelligente (mots-clés ->
   redirection vers la bonne page) sera enrichie à l'Étape 2.
   Pour l'instant :
   - le formulaire redirige vers la page profil avec le terme recherché
   - le bouton « J'ai de la chance » mène directement au profil
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const lucky = document.getElementById('lucky-btn');

  /* --- Préfixe de chemin selon l'emplacement de la page courante ---
     Depuis l'accueil (racine) : on cible « pages/... »
     Depuis une page de /pages/ : les autres pages sont des voisines. */
  const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';

  /* --- Table de correspondance simple : mot-clé -> fichier --- */
  /* Permet une mini « recherche intelligente » dès maintenant. */
  const routes = [
    { keywords: ['projet', 'projects', 'réalisation'],       page: 'projects.html'    },
    { keywords: ['expérience', 'experience', 'stage'],        page: 'experiences.html' },
    { keywords: ['stack', 'compétence', 'tech', 'outil'],     page: 'stack.html'       },
    { keywords: ['formation', 'école', 'master', 'diplôme'],  page: 'formation.html'   },
    { keywords: ['carte', 'maps', 'parcours', 'lieu'],        page: 'maps.html'        },
    { keywords: ['drive', 'cv', 'document'],                  page: 'drive.html'       },
    { keywords: ['assistant', 'chatbot', 'ia', 'bot'],        page: 'assistant.html'   },
  ];

  /**
   * Cherche la page la plus pertinente selon le texte saisi.
   * @param {string} query - le texte tapé par l'utilisateur
   * @returns {string} le chemin de la page cible (profil par défaut)
   */
  function resolvePage(query) {
    const q = query.toLowerCase().trim();
    for (const route of routes) {
      if (route.keywords.some((kw) => q.includes(kw))) {
        return base + route.page;
      }
    }
    // Par défaut : page profil (SERP)
    return base + 'profile.html';
  }

  /* --- Soumission du formulaire de recherche --- */
  if (form && input) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = resolvePage(input.value);
      window.location.href = target;
    });
  }

  /* --- Bouton « J'ai de la chance » : va directement au profil --- */
  if (lucky) {
    lucky.addEventListener('click', () => {
      window.location.href = base + 'profile.html';
    });
  }
});
