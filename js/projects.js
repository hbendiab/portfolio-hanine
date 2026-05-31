/* ==========================================================================
   projects.js — Grille de projets : filtres + modale détail
   Bilingue FR / EN (champs *_en lus selon window.getLang)
   Portfolio Hanine
   ========================================================================== */

(() => {
  'use strict';

  /* Langue courante (fr par défaut) */
  const LANG = () => (typeof window.getLang === 'function' ? window.getLang() : 'fr');
  /* Renvoie la variante EN d'un champ si dispo et si on est en anglais */
  const pick = (p, key) => (LANG() === 'en' && p[key + '_en'] != null) ? p[key + '_en'] : p[key];

  /* ========================================================================
     DONNÉES DES PROJETS (ordre = data-index des cards dans le HTML)
     ======================================================================== */
  const PROJECTS = [
    {
      hero: 'Mirakl',
      heroImg: '../assets/images/Mirakl_IMG_1163.JPG',
      gradient: 'linear-gradient(135deg, #1a73e8, #34a853)',
      date: '2026',
      category: 'Data & IA',
      category_en: 'Data & AI',
      title: 'Hackathon Mirakl — Talent Intelligence System',
      title_en: 'Mirakl Hackathon — Talent Intelligence System',
      desc: [
        'Projet réalisé dans le cadre du Hackathon Mirakl 2026 (note A, 85%). Conception et développement d\'un système complet de talent intelligence pour Mirakl.',
        'Scraping multi-sources (LinkedIn, GitHub), enrichissement automatique via API, scoring automatisé avec recalibration IA basée sur les feedbacks des recruteurs, et briefings stratégiques générés chaque vendredi par agents IA.'
      ],
      desc_en: [
        'Project built for the Mirakl 2026 Hackathon (grade A, 85%). Design and development of a complete talent intelligence system for Mirakl.',
        'Multi-source scraping (LinkedIn, GitHub), automatic API enrichment, automated scoring with AI recalibration based on recruiter feedback, and strategic briefings generated every Friday by AI agents.'
      ],
      stack: ['Python (pandas, requests)', 'OpenAI API (GPT-4o-mini)', 'Proxycurl + RapidAPI', 'Phantombuster', 'n8n', 'Google Sheets', 'Slack', 'Dust'],
      role: 'Conception du pipeline data, intégration des APIs IA, développement des workflows n8n, génération automatique de briefings stratégiques.',
      role_en: 'Data pipeline design, AI API integration, n8n workflow development, automatic generation of strategic briefings.',
      results: [
        '1236 profils analysés en pipeline',
        '3 rôles tech ciblés (Agent Builder, AI Engineer, Data Scientist)',
        'Système de scoring v1 → v2 auto-recalibré après 5 feedbacks',
        'Briefing stratégique automatique chaque vendredi 17h'
      ],
      results_en: [
        '1,236 profiles analysed in the pipeline',
        '3 targeted tech roles (Agent Builder, AI Engineer, Data Scientist)',
        'Scoring system v1 → v2 auto-recalibrated after 5 feedbacks',
        'Automatic strategic briefing every Friday at 5pm'
      ],
      links: [
        { label: 'Voir sur GitHub', label_en: 'View on GitHub', href: '#', icon: 'code' },
        { label: 'Voir la démo', label_en: 'View the demo', href: '#', icon: 'play_circle' },
        { label: 'Lire l\'étude de cas', label_en: 'Read the case study', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: [
        '../assets/images/Mirakl_IMG_3355.jpeg',
        '../assets/images/Mirakl_IMG_7519.JPG',
        '../assets/images/Mirakl_IMG_9207.JPG',
        '../assets/images/Mirakl_IMG_9240.JPG'
      ],
      photos: [
        { img: '../assets/images/Mirakl_IMG_3355.jpeg' },
        { img: '../assets/images/Mirakl_IMG_7519.JPG' },
        { img: '../assets/images/Mirakl_IMG_9207.JPG' },
        { img: '../assets/images/Mirakl_IMG_9240.JPG' },
        { img: '../assets/images/Mirakl_IMG_9555.JPG' },
        { img: '../assets/images/Mirakl_IMG_9570.JPG' },
        { img: '../assets/images/Mirakl_IMG_9578.JPG' },
        { img: '../assets/images/Mirakl_IMG_9583.JPG' },
        { img: '../assets/images/Mirakl_IMG_9593.JPG' }
      ]
    },
    {
      hero: 'PayFit',
      heroImg: '../assets/images/Payfit_IMG_7852.JPG',
      gradient: 'linear-gradient(135deg, #1a73e8, #4285f4)',
      date: '2026',
      category: 'Data & IA',
      category_en: 'Data & AI',
      title: 'Compétition PayFit — Cas entreprise',
      title_en: 'PayFit Competition — Business case',
      desc: [
        'Cas entreprise réalisé en compétition pour PayFit : résolution d\'une problématique métier réelle à l\'aide d\'outils no-code et d\'IA.',
        'Construction d\'un prototype fonctionnel en quelques jours, de la collecte de besoin à la démonstration finale.'
      ],
      desc_en: [
        'Business case run as a competition for PayFit: solving a real business problem using no-code and AI tools.',
        'Building a working prototype in a few days, from needs gathering to the final demo.'
      ],
      stack: ['Lovable', 'Dust', 'n8n', 'No-code', 'Automatisation'],
      role: 'Cadrage du besoin, prototypage no-code, automatisation des flux et présentation du cas.',
      role_en: 'Needs scoping, no-code prototyping, flow automation and case presentation.',
      results: [
        'Prototype no-code fonctionnel livré dans les délais',
        'Workflow d\'automatisation de bout en bout',
        'Présentation devant un jury entreprise'
      ],
      results_en: [
        'Working no-code prototype delivered on time',
        'End-to-end automation workflow',
        'Presentation to a company jury'
      ],
      links: [
        { label: 'Voir la démo', label_en: 'View the demo', href: '#', icon: 'play_circle' },
        { label: 'Lire l\'étude de cas', label_en: 'Read the case study', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['../assets/images/Payfit_IMG_7852.JPG', '../assets/images/Payfit_IMG_7883.JPG'],
      photos: [
        { img: '../assets/images/Payfit_IMG_7852.JPG' },
        { img: '../assets/images/Payfit_IMG_7883.JPG' }
      ]
    },
    {
      hero: 'SEO',
      gradient: 'linear-gradient(135deg, #34a853, #0a8043)',
      date: '2026',
      category: 'Web & SEO',
      category_en: 'Web & SEO',
      title: 'Audit SEO — Eugenia School',
      title_en: 'SEO Audit — Eugenia School',
      desc: [
        'Audit SEO complet pour Eugenia School : recommandations techniques et éditoriales pour améliorer le positionnement organique.',
        'Travail sur la structure du site, les données structurées et la stratégie de contenu.'
      ],
      desc_en: [
        'Full SEO audit for Eugenia School: technical and editorial recommendations to improve organic ranking.',
        'Work on site structure, structured data and content strategy.'
      ],
      stack: ['SEO', 'Schema markup', 'Content', 'Audit technique'],
      role: 'Audit technique, analyse de contenu et plan d\'action SEO.',
      role_en: 'Technical audit, content analysis and SEO action plan.',
      results: [
        'Recommandations techniques priorisées',
        'Plan de contenu aligné sur la recherche',
        'Optimisation des données structurées (Schema)'
      ],
      results_en: [
        'Prioritised technical recommendations',
        'Content plan aligned with search',
        'Structured-data optimisation (Schema)'
      ],
      links: [
        { label: 'Lire l\'étude de cas', label_en: 'Read the case study', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['#34a853', '#0a8043', '#1a73e8']
    },
    {
      hero: 'JEP 2025',
      gradient: 'linear-gradient(135deg, #fbbc04, #f9a825)',
      date: '2025',
      category: 'Marketing & Com',
      category_en: 'Marketing & Comms',
      title: 'Campagne JEP 2025 — SNCF',
      title_en: 'EHD 2025 Campaign — SNCF',
      desc: [
        'Pilotage de la publicité digitale pour les Journées Européennes du Patrimoine 2025 au sein du Groupe SNCF.',
        'Définition des audiences, gestion des campagnes et suivi des performances média.'
      ],
      desc_en: [
        'Management of digital advertising for the 2025 European Heritage Days within Groupe SNCF.',
        'Audience definition, campaign management and media performance tracking.'
      ],
      stack: ['Publicité', 'Stratégie média', 'Audiences', 'Reporting'],
      role: 'Pilotage des campagnes digitales, ciblage des audiences et suivi de la performance.',
      role_en: 'Digital campaign management, audience targeting and performance tracking.',
      results: [
        'Campagne digitale déployée pour l\'événement',
        'Audiences ciblées et optimisées',
        'Suivi des indicateurs de performance'
      ],
      results_en: [
        'Digital campaign rolled out for the event',
        'Targeted and optimised audiences',
        'Performance-indicator tracking'
      ],
      links: [
        { label: 'Lire l\'étude de cas', label_en: 'Read the case study', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['#fbbc04', '#f9a825', '#ff8a50']
    },
    {
      hero: 'Michi',
      heroImg: '../assets/images/michi.png',
      heroColor: '#2C2C2C',
      gradient: 'linear-gradient(135deg, #F9F5EB, #E8DCC8)',
      date: '2025',
      category: 'Hackathon · 1er Prix 🏆',
      category_en: 'Hackathon · 1st Prize 🏆',
      title: 'Michi — Plateforme de matching santé mentale',
      title_en: 'Michi — Mental-health matching platform',
      desc: [
        'Michi est une startup de matching santé mentale née lors d\'un hackathon d\'une semaine. Le concept : ne pas être un simple annuaire de praticiens, mais un véritable agent de connexion expert qui analyse la personnalité et les besoins uniques de chaque patient pour trouver le bon praticien.',
        'L\'équipe de 6 personnes a livré en une semaine une landing page complète sur Framer et une application web de matching sur Lovable. Le projet a remporté le 1er prix du hackathon.'
      ],
      desc_en: [
        'Michi is a mental-health matching startup born during a one-week hackathon. The concept: not a simple directory of practitioners, but a true expert connection agent that analyses each patient\'s personality and unique needs to find the right practitioner.',
        'The team of 6 delivered, in one week, a complete landing page on Framer and a matching web app on Lovable. The project won 1st prize at the hackathon.'
      ],
      contributions: [
        { icon: '🧠', bg: '#e8f0fe', title: 'Agents IA', title_en: 'AI Agents', desc: 'Conception et optimisation des prompts des agents IA responsables du matching patient-praticien.', desc_en: 'Designing and optimising the prompts of the AI agents responsible for patient-practitioner matching.' },
        { icon: '🎨', bg: '#fef7e0', title: 'Direction Artistique', title_en: 'Art Direction', desc: 'Identité visuelle de Michi, design de la landing page Framer, charte graphique et univers de marque.', desc_en: 'Michi\'s visual identity, Framer landing-page design, brand guidelines and brand world.' },
        { icon: '📣', bg: '#e6f4ea', title: 'Positionnement', title_en: 'Positioning', desc: 'Définition du positionnement stratégique : « pas un annuaire, un agent de connexion expert ».', desc_en: 'Defining the strategic positioning: "not a directory, an expert connection agent".' }
      ],
      stack: ['Framer', 'Lovable', 'Prompt Engineering', 'IA générative', 'Figma', 'Stratégie de marque'],
      role: 'Prompt engineering des agents de matching, direction artistique et stratégie de positionnement.',
      role_en: 'Prompt engineering of the matching agents, art direction and positioning strategy.',
      results: [
        '🏆 1er prix du hackathon',
        '✅ Site live accessible',
        '✅ App de matching fonctionnelle',
        '✅ Équipe de 6 personnes coordonnée en 1 semaine'
      ],
      results_en: [
        '🏆 1st prize at the hackathon',
        '✅ Live site accessible',
        '✅ Working matching app',
        '✅ Team of 6 coordinated in 1 week'
      ],
      links: [
        { label: 'Voir le site Michi', label_en: 'Visit the Michi site', href: 'https://michimichi.framer.website', icon: 'open_in_new' },
        { label: 'Voir le code GitHub', label_en: 'View the GitHub code', href: 'https://github.com/Phouangvictor/Michi.git', icon: 'code', ghost: true }
      ],
      thumbs: ['../assets/images/michi.png', '#E8DCC8', '#d8c4a0']
    }
  ];

  /* ========================================================================
     SÉLECTEURS
     ======================================================================== */
  const cards    = Array.from(document.querySelectorAll('.project-card'));
  const chips    = Array.from(document.querySelectorAll('.filter-chip'));
  const modal    = document.getElementById('pmodal');
  if (!modal) return;

  const overlay  = modal.querySelector('.pmodal__overlay');
  const closeBtn = document.getElementById('pmodal-close');
  const prevBtn  = document.getElementById('pmodal-prev');
  const nextBtn  = document.getElementById('pmodal-next');

  const el = {
    hero:    document.getElementById('pmodal-hero'),
    thumbs:  document.getElementById('pmodal-thumbs'),
    photosW: document.getElementById('pmodal-photos-wrap'),
    photos:  document.getElementById('pmodal-photos'),
    meta:    document.getElementById('pmodal-meta'),
    title:   document.getElementById('pmodal-title'),
    desc:    document.getElementById('pmodal-desc'),
    stack:   document.getElementById('pmodal-stack'),
    role:    document.getElementById('pmodal-role'),
    results: document.getElementById('pmodal-results'),
    links:   document.getElementById('pmodal-links'),
    contributions: document.getElementById('pmodal-contributions')
  };

  let current = 0;

  /* ========================================================================
     REMPLISSAGE DE LA MODALE
     ======================================================================== */
  function escape(str) {
    return String(str).replace(/[&<>"]/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  function fillModal(index) {
    const p = PROJECTS[index];
    if (!p) return;
    current = index;
    const en = LANG() === 'en';

    // Visuel principal : image si dispo (gradient en fallback), sinon lettre
    el.hero.style.background = p.gradient;
    el.hero.style.color = p.heroColor || '#fff';   // texte foncé sur gradient clair (Michi)
    if (p.heroImg) {
      el.hero.innerHTML = '<img src="' + p.heroImg + '" alt="" onerror="this.remove()">';
    } else {
      el.hero.textContent = p.hero;
    }

    // Miniatures : image (chemin) ou couleur
    el.thumbs.innerHTML = (p.thumbs || []).map((t) =>
      t.indexOf('/') !== -1
        ? '<div class="pmodal__thumb" style="background-image:url(' + t + ')"></div>'
        : '<div class="pmodal__thumb" style="background:' + t + '"></div>'
    ).join('');

    // Photos : image ou gradient + libellé
    if (p.photos && p.photos.length) {
      el.photosW.style.display = '';
      el.photos.innerHTML = p.photos.map((ph) =>
        ph.img
          ? '<div class="pmodal__photo"><img src="' + ph.img + '" alt="" onerror="this.remove()"></div>'
          : '<div class="pmodal__photo" style="background:' + ph.bg + '">' + escape(ph.label || '') + '</div>'
      ).join('');
    } else {
      el.photosW.style.display = 'none';
    }

    el.meta.textContent  = `${p.date} · ${pick(p, 'category')}`;
    el.title.textContent = pick(p, 'title');
    el.desc.innerHTML    = pick(p, 'desc').map((t) => `<p>${escape(t)}</p>`).join('');

    // Section « Mes contributions » (seulement si le projet en a)
    if (el.contributions) {
      el.contributions.innerHTML = (p.contributions && p.contributions.length)
        ? `<p class="pmodal__section-title">${en ? 'My contributions' : 'Mes contributions'}</p><div class="pmodal__contrib-grid">` +
          p.contributions.map((c) => {
            const ct = en && c.title_en ? c.title_en : c.title;
            const cd = en && c.desc_en ? c.desc_en : c.desc;
            return `<div class="pmodal__contrib" style="background:${c.bg}">` +
              `<span class="pmodal__contrib-ico">${c.icon}</span>` +
              `<span class="pmodal__contrib-title">${escape(ct)}</span>` +
              `<span class="pmodal__contrib-desc">${escape(cd)}</span></div>`;
          }).join('') +
          '</div>'
        : '';
    }

    el.stack.innerHTML   = p.stack.map((t) => `<span class="tag-tech">${escape(t)}</span>`).join('');
    el.role.textContent  = pick(p, 'role');
    el.results.innerHTML = pick(p, 'results').map((r) => `<li>${escape(r)}</li>`).join('');
    el.links.innerHTML   = p.links.map((l) => {
      const ext = /^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : '';
      const label = en && l.label_en ? l.label_en : l.label;
      return `<a class="pmodal__link ${l.ghost ? 'pmodal__link--ghost' : ''}" href="${l.href}"${ext}>` +
        `<span class="material-symbols-outlined">${l.icon}</span>${escape(label)}</a>`;
    }).join('');

    // Remonte le scroll des colonnes
    modal.querySelectorAll('.pmodal__left, .pmodal__right').forEach((c) => (c.scrollTop = 0));
  }

  /* ========================================================================
     OUVERTURE / FERMETURE
     ======================================================================== */
  function openModal(index) {
    fillModal(index);
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // bloque le scroll de fond
  }
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  const nextProject = () => fillModal((current + 1) % PROJECTS.length);
  const prevProject = () => fillModal((current - 1 + PROJECTS.length) % PROJECTS.length);

  /* ========================================================================
     ÉVÉNEMENTS
     ======================================================================== */
  cards.forEach((card) => {
    card.addEventListener('click', () => openModal(Number(card.dataset.index)));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay)  overlay.addEventListener('click', closeModal);
  if (nextBtn)  nextBtn.addEventListener('click', nextProject);
  if (prevBtn)  prevBtn.addEventListener('click', prevProject);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowRight') nextProject();
    if (e.key === 'ArrowLeft')  prevProject();
  });

  // Si la modale est ouverte au changement de langue, on la re-remplit
  document.addEventListener('langchange', () => {
    if (modal.classList.contains('is-open')) fillModal(current);
  });

  /* ========================================================================
     FILTRES PAR CHIPS
     ======================================================================== */
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        const cats = (card.dataset.cats || '').split(' ');
        const year = card.dataset.year;
        const show = filter === 'all' || cats.includes(filter) || year === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
