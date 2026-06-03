/* ==========================================================================
   assistant.js — Chatbot « Demande à Hanine » (sans API, 100% scénarisé)
   Bilingue FR / EN (piloté par js/i18n.js → window.getLang)
   Portfolio Hanine
   ========================================================================== */

(() => {
  'use strict';

  /* Langue courante (fr par défaut) */
  const LANG = () => (typeof window.getLang === 'function' ? window.getLang() : 'fr');

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
     BANQUE DE QUESTIONS / RÉPONSES (texte + relances bilingues)
     Les mots-clés couvrent le FR et l'EN pour que les chips marchent dans
     les deux langues.
     ======================================================================== */
  const responses = {
    presentation: {
      keywords: ['qui', 'présente', 'présentation', 'toi', 'es-tu', 'connaitre', 'connaître', 'who', 'introduce', 'yourself', 'about you'],
      response: {
        text: {
          fr: "Je suis Hanine Bendiab, " + AGE + " ans, étudiante en Master MSc AI Applied to Business à Eugenia School. Actuellement en alternance chez Arval BNP Paribas comme chargée de marketing relationnel. Mon truc : la double casquette Data/IA × Marketing.",
          en: "I'm Hanine Bendiab, " + AGE + ", a Master's student in MSc AI Applied to Business at Eugenia School. Currently an apprentice at Arval BNP Paribas as a relationship marketing officer. My thing: the dual Data/AI × Marketing profile."
        },
        followup: {
          fr: ["Quel est ton parcours ?", "Tes projets phares ?", "Pourquoi te recruter ?"],
          en: ["What's your background?", "Your featured projects?", "Why hire you?"]
        }
      }
    },
    parcours: {
      keywords: ['parcours', 'études', 'etudes', 'formation', 'cursus', 'diplôme', 'diplome', 'école', 'ecole', 'background', 'studies', 'education', 'degree', 'school', 'path'],
      response: {
        text: {
          fr: "Mon parcours est pluridisciplinaire et c'est ma force ✨\n\n• Bac L (2017) — pour la sensibilité aux mots\n• 2 ans de Droit à Lyon — pour la rigueur\n• BTS Gestion PME — pour le concret\n• Bachelor Communication des marques à Sup de Pub\n• Master AI Applied to Business à Eugenia School (en cours)\n\nDroit → Gestion → Communication → Data/IA. Chaque étape nourrit la suivante.",
          en: "My background is multidisciplinary and that's my strength ✨\n\n• Literary Baccalaureate (2017) — for a feel for words\n• 2 years of Law in Lyon — for rigour\n• BTS in SME Management — for the concrete side\n• Bachelor's in Brand Communication at Sup de Pub\n• Master's in AI Applied to Business at Eugenia School (ongoing)\n\nLaw → Management → Communication → Data/AI. Each step feeds the next."
        },
        followup: {
          fr: ["Tes projets data/IA ?", "Tes compétences techniques ?"],
          en: ["Your data/AI projects?", "Your technical skills?"]
        }
      }
    },
    projets: {
      keywords: ['projet', 'projets', 'réalisation', 'realisation', 'travaux', 'portfolio', 'project', 'projects', 'work'],
      response: {
        text: {
          fr: "Mes 3 projets phares récents :\n\n🚀 Hackathon Mirakl Talent Intelligence (note A, 85%)\nPipeline complet de scraping + scoring IA pour le recrutement tech.\n\n🤖 Compétition PayFit\nCas entreprise avec Lovable + Dust + n8n.\n\n📊 Audit SEO Eugenia School\nRecommandations techniques et éditoriales pour le référencement.\n\nTu peux voir tous mes projets en détail dans la section Projets du portfolio.",
          en: "My 3 recent featured projects:\n\n🚀 Mirakl Talent Intelligence Hackathon (grade A, 85%)\nA full scraping + AI scoring pipeline for tech recruiting.\n\n🤖 PayFit competition\nBusiness case with Lovable + Dust + n8n.\n\n📊 Eugenia School SEO audit\nTechnical and editorial recommendations for search ranking.\n\nYou can see all my projects in detail in the Projects section of the portfolio."
        },
        followup: {
          fr: ["Parle-moi du projet Mirakl", "Ta stack technique ?"],
          en: ["Tell me about the Mirakl project", "Your tech stack?"]
        }
      }
    },
    michi: {
      keywords: ['michi', 'matching', 'santé mentale', 'sante mentale', 'praticien', 'hackathon gagné', 'hackathon gagne', 'premier prix', '1er prix', 'mental health', 'first prize', 'won'],
      response: {
        text: {
          fr: "Michi c'est mon projet dont je suis la plus fière ! 🏆\n\nUne plateforme de matching santé mentale créée en 1 semaine lors d'un hackathon avec 5 coéquipiers.\n\nLe concept : connecter les patients avec le BON praticien via des agents IA, pas juste un annuaire.\n\nMon rôle : prompt engineering des agents de matching + direction artistique + stratégie de positionnement.\n\nRésultat : 🥇 1er prix du hackathon ! Le site est toujours live : michimichi.framer.website",
          en: "Michi is the project I'm most proud of! 🏆\n\nA mental-health matching platform built in 1 week during a hackathon with 5 teammates.\n\nThe concept: connecting patients with the RIGHT practitioner through AI agents, not just a directory.\n\nMy role: prompt engineering of the matching agents + art direction + positioning strategy.\n\nResult: 🥇 1st prize of the hackathon! The site is still live: michimichi.framer.website"
        },
        followup: {
          fr: ["Voir le site Michi", "Tes autres projets ?", "Comment tu as fait le matching IA ?"],
          en: ["See the Michi site", "Your other projects?", "How did you build the AI matching?"]
        }
      }
    },
    mirakl: {
      keywords: ['mirakl', 'hackathon', 'talent intelligence'],
      response: {
        text: {
          fr: "Le Hackathon Mirakl c'est mon projet le plus impressionnant techniquement 💪\n\nL'objectif : créer un Talent Intelligence System pour Mirakl. J'ai conçu un pipeline complet :\n• Scraping LinkedIn + GitHub via Phantombuster\n• Enrichissement automatique des profils avec OpenAI\n• Scoring automatique recalibré selon les feedbacks des recruteurs\n• Briefings stratégiques générés chaque vendredi par agents IA Dust\n\nStack : Python, n8n, OpenAI API, Google Sheets, Slack, Dust.\nNote obtenue : A (85%) 🎯",
          en: "The Mirakl Hackathon is my most technically impressive project 💪\n\nThe goal: build a Talent Intelligence System for Mirakl. I designed a full pipeline:\n• LinkedIn + GitHub scraping via Phantombuster\n• Automatic profile enrichment with OpenAI\n• Automatic scoring recalibrated from recruiter feedback\n• Strategic briefings generated every Friday by Dust AI agents\n\nStack: Python, n8n, OpenAI API, Google Sheets, Slack, Dust.\nGrade: A (85%) 🎯"
        },
        followup: {
          fr: ["Tes autres projets data ?", "Ta stack technique ?"],
          en: ["Your other data projects?", "Your tech stack?"]
        }
      }
    },
    disponibilite: {
      keywords: ['disponible', 'disponibilité', 'alternance', 'recrute', 'embauche', 'septembre', 'libre', 'stage', 'available', 'availability', 'apprenticeship', 'hire', 'september', 'internship', 'work-study'],
      response: {
        text: {
          fr: "Oui ! 🙌 Je cherche une alternance pour mon Master 2 à partir de septembre 2026.\n\n📅 Rythme : 1 jour école / 4 jours entreprise\n📍 Lieu : Île-de-France principalement\n💼 Domaine : data marketing, IA appliquée au business, automation, growth\n\nSi ton entreprise cherche un profil hybride Data × Marketing, on devrait se parler !",
          en: "Yes! 🙌 I'm looking for an apprenticeship for my Master 2 starting September 2026.\n\n📅 Rhythm: 1 day school / 4 days company\n📍 Location: mainly Île-de-France (Paris area)\n💼 Field: data marketing, AI applied to business, automation, growth\n\nIf your company is looking for a hybrid Data × Marketing profile, we should talk!"
        },
        followup: {
          fr: ["Comment te contacter ?", "Pourquoi te recruter ?"],
          en: ["How to contact you?", "Why hire you?"]
        }
      }
    },
    pourquoi: {
      keywords: ['pourquoi', 'recruter', 'avantage', 'force', 'qualité', 'qualite', 'différence', 'difference', 'why', 'recruit', 'advantage', 'strength'],
      response: {
        text: {
          fr: "3 bonnes raisons de me recruter 💪\n\n1️⃣ Je parle 2 langues : tech (Python, n8n, IA) et marketing (4 ans en com). Ce mix est rare.\n\n2️⃣ J'apprends vite : passée du droit à la data en quelques années, GPA 3.49 au S1 Master, note A au Hackathon.\n\n3️⃣ Je livre concret : pas que de la théorie, j'ai déjà livré des campagnes pub SNCF, des audits SEO complets, un système Talent Intelligence.",
          en: "3 good reasons to hire me 💪\n\n1️⃣ I speak 2 languages: tech (Python, n8n, AI) and marketing (4 years in comms). This mix is rare.\n\n2️⃣ I learn fast: went from law to data in a few years, 3.49 GPA in S1 Master's, grade A at the Hackathon.\n\n3️⃣ I deliver concretely: not just theory — I've already delivered SNCF ad campaigns, full SEO audits, a Talent Intelligence system."
        },
        followup: {
          fr: ["Tes soft skills ?", "Comment te contacter ?"],
          en: ["Your soft skills?", "How to contact you?"]
        }
      }
    },
    competences: {
      keywords: ['compétence', 'competence', 'skills', 'stack', 'technique', 'outil', 'maîtrise', 'maitrise', 'sait', 'python', 'sql', 'skill', 'technical', 'tool'],
      response: {
        text: {
          fr: "Ma stack technique 🛠️\n\n📊 Data : Python (pandas, numpy), SQL, Google Sheets avancé, Tableau, PowerBI\n\n🤖 IA : OpenAI API, Claude API, Dust, ChatGPT, Midjourney\n\n⚡ Automatisation : n8n, Make, Zapier, BeautifulSoup, Playwright, scraping\n\n📣 Marketing : SEO/GEO, Brevo, WordPress, Wix, stratégie média, analyse audience\n\n🎨 Design : Figma, Suite Adobe, Canva, CapCut",
          en: "My tech stack 🛠️\n\n📊 Data: Python (pandas, numpy), SQL, advanced Google Sheets, Tableau, PowerBI\n\n🤖 AI: OpenAI API, Claude API, Dust, ChatGPT, Midjourney\n\n⚡ Automation: n8n, Make, Zapier, BeautifulSoup, Playwright, scraping\n\n📣 Marketing: SEO/GEO, Brevo, WordPress, Wix, media strategy, audience analysis\n\n🎨 Design: Figma, Adobe Suite, Canva, CapCut"
        },
        followup: {
          fr: ["Tes projets utilisant ces outils ?", "Pourquoi te recruter ?"],
          en: ["Projects using these tools?", "Why hire you?"]
        }
      }
    },
    softskills: {
      keywords: ['soft', 'personnalité', 'personnalite', 'caractère', 'caractere', 'qualité humaine', 'humain', 'personality', 'character', 'human'],
      response: {
        text: {
          fr: "Mes 3 soft skills principales 💎\n\n🔍 Esprit d'analyse & rigueur — héritée de 2 ans de droit + précision data\n\n💡 Créativité — validée par 4 ans en communication\n\n🗣️ Vulgarisation — je sais expliquer du tech à des non-tech, c'est rare\n\nBonus : autonomie (auto-entrepreneuse depuis 2021), curiosité (parcours hyper varié).",
          en: "My 3 main soft skills 💎\n\n🔍 Analytical mind & rigour — from 2 years of law + data precision\n\n💡 Creativity — proven by 4 years in communication\n\n🗣️ Making things clear — I can explain tech to non-tech audiences, that's rare\n\nBonus: autonomy (self-employed since 2021), curiosity (a very varied background)."
        },
        followup: {
          fr: ["Un exemple concret ?", "Pourquoi te recruter ?"],
          en: ["A concrete example?", "Why hire you?"]
        }
      }
    },
    contact: {
      keywords: ['contact', 'email', 'mail', 'joindre', 'parler', 'rencontrer', 'téléphone', 'telephone', 'linkedin', 'reach', 'talk', 'meet', 'phone'],
      response: {
        text: {
          fr: "Tu peux me contacter 📩\n\n📧 Email : haninebendiab@hotmail.com\n📱 Téléphone : 07 67 43 21 42\n💼 LinkedIn : linkedin.com/in/hanine-b-641494211\n\nJe réponds rapidement, surtout aux mails de recruteurs 😊",
          en: "You can reach me 📩\n\n📧 Email: haninebendiab@hotmail.com\n📱 Phone: 07 67 43 21 42\n💼 LinkedIn: linkedin.com/in/hanine-b-641494211\n\nI reply quickly, especially to recruiter emails 😊"
        },
        followup: { fr: [], en: [] }
      }
    },
    experience: {
      keywords: ['expérience', 'experience', 'sncf', 'arval', 'confiance', 'bnp', 'entreprise', 'travail', 'job', 'mission', 'company'],
      response: {
        text: {
          fr: "Mes expériences pro 💼\n\n🏦 Arval BNP Paribas (en cours, depuis septembre 2025)\nChargée de marketing relationnel · Master 1\n\n🚂 Groupe SNCF (2024-2025)\nAssistante cheffe de publicité corporate · Bachelor\nCampagne JEP 2025, stratégie RSE publicité, analyse audiences\n\n🏗️ Groupe Confiance (2022-2024)\nAlternante technique · BTS\n\n⚡ Freelance auto-entrepreneuse (depuis 2021)",
          en: "My work experience 💼\n\n🏦 Arval BNP Paribas (ongoing, since September 2025)\nRelationship marketing officer · Master 1\n\n🚂 Groupe SNCF (2024-2025)\nCorporate advertising manager assistant · Bachelor\nEHD 2025 campaign, CSR advertising strategy, audience analysis\n\n🏗️ Groupe Confiance (2022-2024)\nTechnical apprentice · BTS\n\n⚡ Self-employed freelance (since 2021)"
        },
        followup: {
          fr: ["Tes projets phares ?", "Pourquoi te recruter ?"],
          en: ["Your featured projects?", "Why hire you?"]
        }
      }
    },
    meaning_of_life: {
      keywords: ['sens de la vie', 'meaning of life', '42'],
      response: {
        text: { fr: "42. Évidemment 🤓", en: "42. Obviously 🤓" },
        followup: {
          fr: ["Mais sérieusement, qui es-tu ?", "Tes projets ?"],
          en: ["But seriously, who are you?", "Your projects?"]
        }
      }
    },
    fallback: {
      response: {
        text: {
          fr: "Hmm, je n'ai pas une réponse précise à ça 🤔\n\nMais je peux te parler de :\n• Mon parcours et mes études\n• Mes projets data, IA, marketing\n• Mes compétences techniques\n• Ma disponibilité pour une alternance\n• Comment me contacter\n\nPour une question plus pointue, écris-moi directement : haninebendiab@hotmail.com",
          en: "Hmm, I don't have a precise answer to that 🤔\n\nBut I can tell you about:\n• My background and studies\n• My data, AI and marketing projects\n• My technical skills\n• My availability for an apprenticeship\n• How to contact me\n\nFor a more specific question, write to me directly: haninebendiab@hotmail.com"
        },
        followup: {
          fr: ["Qui es-tu ?", "Tes projets phares ?", "Comment te contacter ?"],
          en: ["Who are you?", "Your featured projects?", "How to contact you?"]
        }
      }
    }
  };

  /* --- Matching mot-clé (FR + EN) --- */
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
    const lang = LANG();
    clearSuggestions();
    addUser(value);
    const r = findResponse(value);
    addBot(r.text[lang] || r.text.fr, r.followup[lang] || r.followup.fr);
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
     INITIALISATION (message d'accueil + chips) — bilingue
     ======================================================================== */
  const WELCOME = {
    fr: "Salut ! 👋 Je suis l'assistant IA de Hanine. Tu peux me poser des questions sur son parcours, ses projets, sa disponibilité, ou tout ce que tu veux savoir avant de la contacter. Voici quelques questions populaires pour démarrer 👇",
    en: "Hi! 👋 I'm Hanine's AI assistant. You can ask me about her background, projects, availability, or anything you want to know before reaching out. Here are a few popular questions to get started 👇"
  };
  const STARTERS = {
    fr: ["Qui es-tu Hanine ?", "Quel est ton parcours ?", "Tes projets phares ?", "Tu cherches une alternance ?", "Tes compétences techniques ?", "Pourquoi te recruter ?", "Tes soft skills ?", "Comment te contacter ?"],
    en: ["Who are you, Hanine?", "What's your background?", "Your featured projects?", "Are you looking for an apprenticeship?", "Your technical skills?", "Why hire you?", "Your soft skills?", "How to contact you?"]
  };

  // Message d'accueil affiché immédiatement (sans typewriter)
  function welcome() {
    const lang = LANG();
    const row = document.createElement('div');
    row.className = 'msg msg--bot';
    row.innerHTML = '<span class="msg__avatar">H</span><div class="msg__bubble"></div>';
    row.querySelector('.msg__bubble').textContent = WELCOME[lang] || WELCOME.fr;
    messagesEl.appendChild(row);
    addSuggestions(STARTERS[lang] || STARTERS.fr);
  }
  welcome();

  // Au changement de langue : on réinitialise la conversation dans la nouvelle langue
  document.addEventListener('langchange', () => {
    messagesEl.innerHTML = '';
    welcome();
  });
})();
