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

  /* ========================================================================
     RECHERCHE VOCALE (Web Speech API) — Chrome / navigateurs compatibles
     ======================================================================== */
  const micBtn          = document.getElementById('mic-btn');
  const voiceModal      = document.getElementById('voice-modal');
  const voiceOverlay    = document.getElementById('voice-overlay');
  const voiceClose      = document.getElementById('voice-close');
  const voiceTranscript = document.getElementById('voice-transcript');

  if (micBtn) {
    let voiceToastEl = null;
    let cancelled = false;

    /* Petit toast sous la barre */
    function hideToast() {
      if (voiceToastEl) { voiceToastEl.remove(); voiceToastEl = null; }
    }
    function showToast(msg, autoHide) {
      hideToast();
      voiceToastEl = document.createElement('div');
      voiceToastEl.className = 'voice-toast';
      voiceToastEl.textContent = msg;
      document.body.appendChild(voiceToastEl);
      if (autoHide !== false) setTimeout(hideToast, 3000);
    }
    const openModal  = () => { if (voiceModal) { voiceModal.hidden = false; if (voiceTranscript) voiceTranscript.textContent = ''; } };
    const closeModal = () => { if (voiceModal) voiceModal.hidden = true; };

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      /* Pas de support -> message doux, aucune erreur */
      micBtn.addEventListener('click', () => {
        showToast('⚠️ La recherche vocale est disponible uniquement sur Chrome');
      });
    } else {
      const recognition = new SR();
      recognition.lang = 'fr-FR';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        cancelled = false;
        micBtn.classList.add('mic-active');
        openModal();
        showToast('🎤 Je vous écoute...', false);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((r) => r[0].transcript)
          .join('');
        if (input) input.value = transcript;            // texte en temps réel dans la barre
        if (voiceTranscript) voiceTranscript.textContent = transcript;
      };

      recognition.onerror = (event) => {
        cancelled = true;
        micBtn.classList.remove('mic-active');
        closeModal();
        hideToast();
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          showToast('⚠️ Autorisez le micro dans votre navigateur');
        }
      };

      recognition.onend = () => {
        micBtn.classList.remove('mic-active');
        closeModal();
        hideToast();
        if (cancelled) return;
        /* On relance le MÊME flux que la frappe : eggs (easter-eggs.js)
           puis navigation (resolvePage). */
        const query = (input ? input.value : '').trim();
        if (query && form) {
          if (form.requestSubmit) form.requestSubmit();
          else form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      };

      /* Démarrage */
      const startVoice = () => { try { recognition.start(); } catch (e) { /* déjà actif */ } };
      micBtn.addEventListener('click', startVoice);
      micBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startVoice(); }
      });

      /* Annulation (X / overlay / Échap) — sans déclencher la navigation */
      const cancelVoice = () => {
        cancelled = true;
        recognition.stop();
        closeModal();
        hideToast();
        micBtn.classList.remove('mic-active');
      };
      if (voiceClose)   voiceClose.addEventListener('click', cancelVoice);
      if (voiceOverlay) voiceOverlay.addEventListener('click', cancelVoice);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && voiceModal && !voiceModal.hidden) cancelVoice();
      });
    }
  }
});
