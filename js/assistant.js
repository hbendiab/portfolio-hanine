/* ==========================================================================
   assistant.js — Chatbot « Demande à Hanine » (sans API, 100% scénarisé)
   Portfolio Hanine
   ========================================================================== */

(() => {
  'use strict';

  /* Âge calculé automatiquement (date de naissance : 20/07/1999) */
  const AGE = (typeof window.hanineAge === 'function')
    ? window.hanineAge()
    : (function () {
        const n = new Date();
        let a = n.getFullYear() - 1999;
        if (n.getMonth() < 6 || (n.getMonth() === 6 && n.getDate() < 20)) a--;
        return a;
      })();

  /* ========================================================================
     BANQUE DE QUESTIONS / RÉPONSES
     ======================================================================== */
  const responses = {
    presentation: {
      keywords: ['qui', 'présente', 'présentation', 'toi', 'es-tu', 'connaitre', 'connaître'],
      response: {
        text: "Je suis Hanine Bendiab, " + AGE + " ans, étudiante en Master MSc AI Applied to Business à Eugenia School. Actuellement en alternance chez Arval BNP Paribas comme chargée de marketing relationnel. Mon truc : la double casquette Data/IA × Marketing.",
        followup: ["Quel est ton parcours ?", "Tes projets phares ?", "Pourquoi te recruter ?"]
      }
    },
    parcours: {
      keywords: ['parcours', 'études', 'etudes', 'formation', 'cursus', 'diplôme', 'diplome', 'école', 'ecole'],
      response: {
        text: "Mon parcours est pluridisciplinaire et c'est ma force ✨\n\n• Bac L (2017) — pour la sensibilité aux mots\n• 2 ans de Droit à Lyon — pour la rigueur\n• BTS Gestion PME — pour le concret\n• Bachelor Communication des marques à Sup de Pub\n• Master AI Applied to Business à Eugenia School (en cours)\n\nDroit → Gestion → Communication → Data/IA. Chaque étape nourrit la suivante.",
        followup: ["Tes projets data/IA ?", "Tes compétences techniques ?"]
      }
    },
    projets: {
      keywords: ['projet', 'projets', 'réalisation', 'realisation', 'travaux', 'portfolio'],
      response: {
        text: "Mes 3 projets phares récents :\n\n🚀 Hackathon Mirakl Talent Intelligence (note A, 85%)\nPipeline complet de scraping + scoring IA pour le recrutement tech.\n\n📊 Audit SEO/GEO Albert School\nAudit + analyse référencement dans les IA génératives (ChatGPT, Perplexity).\n\n🤖 Compétition PayFit\nCas entreprise avec Lovable + Dust + n8n.\n\nTu peux voir tous mes projets en détail dans la section Projets du portfolio.",
        followup: ["Parle-moi du projet Mirakl", "Ta stack technique ?"]
      }
    },
    mirakl: {
      keywords: ['mirakl', 'hackathon', 'talent intelligence'],
      response: {
        text: "Le Hackathon Mirakl c'est mon projet le plus impressionnant techniquement 💪\n\nL'objectif : créer un Talent Intelligence System pour Mirakl. J'ai conçu un pipeline complet :\n• Scraping LinkedIn + GitHub via Proxycurl/Phantombuster\n• Enrichissement automatique des profils avec OpenAI\n• Scoring automatique recalibré selon les feedbacks des recruteurs\n• Briefings stratégiques générés chaque vendredi par agents IA Dust\n\nStack : Python, n8n, OpenAI API, Google Sheets, Slack, Dust.\nNote obtenue : A (85%) 🎯",
        followup: ["Tes autres projets data ?", "Ta stack technique ?"]
      }
    },
    disponibilite: {
      keywords: ['disponible', 'disponibilité', 'alternance', 'recrute', 'embauche', 'septembre', 'libre', 'stage'],
      response: {
        text: "Oui ! 🙌 Je cherche une alternance pour mon Master 2 à partir de septembre 2026.\n\n📅 Rythme : 1 semaine école / 3 semaines entreprise\n📍 Lieu : Île-de-France principalement\n💼 Domaine : data marketing, IA appliquée au business, automation, growth\n\nSi ton entreprise cherche un profil hybride Data × Marketing, on devrait se parler !",
        followup: ["Comment te contacter ?", "Pourquoi te recruter ?"]
      }
    },
    pourquoi: {
      keywords: ['pourquoi', 'recruter', 'avantage', 'force', 'qualité', 'qualite', 'différence', 'difference'],
      response: {
        text: "3 bonnes raisons de me recruter 💪\n\n1️⃣ Je parle 2 langues : tech (Python, n8n, IA) et marketing (4 ans en com). Ce mix est rare.\n\n2️⃣ J'apprends vite : passée du droit à la data en quelques années, GPA 3.49 au S1 Master, note A au Hackathon.\n\n3️⃣ Je livre concret : pas que de la théorie, j'ai déjà livré des campagnes pub SNCF, des audits SEO complets, un système Talent Intelligence.",
        followup: ["Tes soft skills ?", "Comment te contacter ?"]
      }
    },
    competences: {
      keywords: ['compétence', 'competence', 'skills', 'stack', 'technique', 'outil', 'maîtrise', 'maitrise', 'sait', 'python', 'sql'],
      response: {
        text: "Ma stack technique 🛠️\n\n📊 Data : Python (pandas, numpy), SQL, Google Sheets avancé, Tableau, PowerBI\n\n🤖 IA : OpenAI API, Claude API, Dust, ChatGPT, Midjourney\n\n⚡ Automatisation : n8n, Make, Zapier, BeautifulSoup, Playwright, scraping\n\n📣 Marketing : SEO/GEO, Brevo, WordPress, Wix, stratégie média, analyse audience\n\n🎨 Design : Figma, Suite Adobe, Canva, CapCut",
        followup: ["Tes projets utilisant ces outils ?", "Pourquoi te recruter ?"]
      }
    },
    softskills: {
      keywords: ['soft', 'personnalité', 'personnalite', 'caractère', 'caractere', 'qualité humaine', 'humain'],
      response: {
        text: "Mes 3 soft skills principales 💎\n\n🔍 Esprit d'analyse & rigueur — héritée de 2 ans de droit + précision data\n\n💡 Créativité — validée par 4 ans en communication\n\n🗣️ Vulgarisation — je sais expliquer du tech à des non-tech, c'est rare\n\nBonus : autonomie (auto-entrepreneuse depuis 2021), curiosité (parcours hyper varié).",
        followup: ["Un exemple concret ?", "Pourquoi te recruter ?"]
      }
    },
    contact: {
      keywords: ['contact', 'email', 'mail', 'joindre', 'parler', 'rencontrer', 'téléphone', 'telephone', 'linkedin'],
      response: {
        text: "Tu peux me contacter 📩\n\n📧 Email : haninebendiab@hotmail.com\n📱 Téléphone : 07 67 43 21 42\n💼 LinkedIn : linkedin.com/in/hanine-b-641494211\n\nJe réponds rapidement, surtout aux mails de recruteurs 😊",
        followup: []
      }
    },
    experience: {
      keywords: ['expérience', 'experience', 'sncf', 'arval', 'confiance', 'bnp', 'entreprise', 'travail', 'job', 'mission'],
      response: {
        text: "Mes expériences pro 💼\n\n🏦 Arval BNP Paribas (en cours, depuis septembre 2025)\nChargée de marketing relationnel · Master 1\n\n🚂 Groupe SNCF (2024-2025)\nAssistante cheffe de publicité corporate · Bachelor\nCampagne JEP 2025, stratégie RSE publicité, analyse audiences\n\n🏗️ Groupe Confiance (2022-2024)\nChargée de communication · BTS\n\n⚡ Freelance auto-entrepreneuse (depuis 2021)",
        followup: ["Tes projets phares ?", "Pourquoi te recruter ?"]
      }
    },
    meaning_of_life: {
      keywords: ['sens de la vie', 'meaning of life', '42'],
      response: {
        text: "42. Évidemment 🤓",
        followup: ["Mais sérieusement, qui es-tu ?", "Tes projets ?"]
      }
    },
    fallback: {
      response: {
        text: "Hmm, je n'ai pas une réponse précise à ça 🤔\n\nMais je peux te parler de :\n• Mon parcours et mes études\n• Mes projets data, IA, marketing\n• Mes compétences techniques\n• Ma disponibilité pour une alternance\n• Comment me contacter\n\nPour une question plus pointue, écris-moi directement : haninebendiab@hotmail.com",
        followup: ["Qui es-tu ?", "Tes projets phares ?", "Comment te contacter ?"]
      }
    }
  };

  /* --- Matching mot-clé --- */
  function findResponse(userMessage) {
    const message = userMessage.toLowerCase();
    for (const [category, data] of Object.entries(responses)) {
      if (category === 'fallback') continue;
      if (data.keywords && data.keywords.some((kw) => message.includes(kw))) {
        return data.response;
      }
    }
    return responses.fallback.response;
  }

  /* ========================================================================
     RENDU
     ======================================================================== */
  const messagesEl = document.getElementById('chat-messages');
  const formEl     = document.getElementById('chat-form');
  const inputEl    = document.getElementById('chat-input');
  if (!messagesEl || !formEl || !inputEl) return;

  const scrollBottom = () => { messagesEl.scrollTop = messagesEl.scrollHeight; };

  /* --- Bulle utilisateur --- */
  function addUser(text) {
    const row = document.createElement('div');
    row.className = 'msg msg--user';
    const bubble = document.createElement('div');
    bubble.className = 'msg__bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    scrollBottom();
  }

  /* --- Supprime les chips de suggestions encore affichés --- */
  function clearSuggestions() {
    messagesEl.querySelectorAll('.suggestions').forEach((s) => s.remove());
  }

  /* --- Affiche des chips de suggestions --- */
  function addSuggestions(list) {
    if (!list || !list.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'suggestions';
    list.forEach((q) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'suggestion';
      chip.textContent = q;
      chip.addEventListener('click', () => send(q));
      wrap.appendChild(chip);
    });
    messagesEl.appendChild(wrap);
    scrollBottom();
  }

  /* --- Indicateur « écrit... » --- */
  function showTyping() {
    const row = document.createElement('div');
    row.className = 'msg msg--bot';
    row.innerHTML =
      '<span class="msg__avatar">H</span>' +
      '<div class="typing"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(row);
    scrollBottom();
    return row;
  }

  /* --- Effet machine à écrire --- */
  function typeWriter(el, text, done) {
    let i = 0;
    const speed = 16; // ms par caractère
    const timer = setInterval(() => {
      el.textContent = text.slice(0, ++i);
      scrollBottom();
      if (i >= text.length) {
        clearInterval(timer);
        if (done) done();
      }
    }, speed);
  }

  /* --- Bulle bot (avec délai « typing » puis typewriter) --- */
  function addBot(text, followups) {
    const typing = showTyping();
    const delay = 700 + Math.min(text.length * 6, 1200); // 0,7 à ~1,9 s
    setTimeout(() => {
      typing.remove();
      const row = document.createElement('div');
      row.className = 'msg msg--bot';
      const avatar = document.createElement('span');
      avatar.className = 'msg__avatar';
      avatar.textContent = 'H';
      const bubble = document.createElement('div');
      bubble.className = 'msg__bubble';
      row.appendChild(avatar);
      row.appendChild(bubble);
      messagesEl.appendChild(row);
      typeWriter(bubble, text, () => addSuggestions(followups));
    }, delay);
  }

  /* --- Envoi d'un message --- */
  function send(text) {
    const value = (text || '').trim();
    if (!value) return;
    clearSuggestions();
    addUser(value);
    const r = findResponse(value);
    addBot(r.text, r.followup);
  }

  /* ========================================================================
     ÉVÉNEMENTS
     ======================================================================== */
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    send(inputEl.value);
    inputEl.value = '';
  });

  /* ========================================================================
     INITIALISATION (message d'accueil + chips)
     ======================================================================== */
  const WELCOME = "Salut ! 👋 Je suis l'assistant IA de Hanine. Tu peux me poser des questions sur son parcours, ses projets, sa disponibilité, ou tout ce que tu veux savoir avant de la contacter. Voici quelques questions populaires pour démarrer 👇";
  const STARTERS = [
    "Qui es-tu Hanine ?",
    "Quel est ton parcours ?",
    "Tes projets phares ?",
    "Tu cherches une alternance ?",
    "Tes compétences techniques ?",
    "Pourquoi te recruter ?",
    "Tes soft skills ?",
    "Comment te contacter ?"
  ];

  // Message d'accueil affiché immédiatement (sans typewriter)
  (function welcome() {
    const row = document.createElement('div');
    row.className = 'msg msg--bot';
    row.innerHTML = '<span class="msg__avatar">H</span><div class="msg__bubble"></div>';
    row.querySelector('.msg__bubble').textContent = WELCOME;
    messagesEl.appendChild(row);
    addSuggestions(STARTERS);
  })();
})();
