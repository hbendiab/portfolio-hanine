/* ==========================================================================
   projects.js — Grille de projets : filtres + modale détail
   Portfolio Hanine
   ========================================================================== */

(() => {
  'use strict';

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
      title: 'Hackathon Mirakl — Talent Intelligence System',
      desc: [
        'Projet réalisé dans le cadre du Hackathon Mirakl 2026 (note A, 85%). Conception et développement d\'un système complet de talent intelligence pour Mirakl.',
        'Scraping multi-sources (LinkedIn, GitHub), enrichissement automatique via API, scoring automatisé avec recalibration IA basée sur les feedbacks des recruteurs, et briefings stratégiques générés chaque vendredi par agents IA.'
      ],
      stack: ['Python (pandas, requests)', 'OpenAI API (GPT-4o-mini)', 'Proxycurl + RapidAPI', 'Phantombuster', 'n8n', 'Google Sheets', 'Slack', 'Dust'],
      role: 'Conception du pipeline data, intégration des APIs IA, développement des workflows n8n, génération automatique de briefings stratégiques.',
      results: [
        '1236 profils analysés en pipeline',
        '3 rôles tech ciblés (Agent Builder, AI Engineer, Data Scientist)',
        'Système de scoring v1 → v2 auto-recalibré après 5 feedbacks',
        'Briefing stratégique automatique chaque vendredi 17h'
      ],
      links: [
        { label: 'Voir sur GitHub', href: '#', icon: 'code' },
        { label: 'Voir la démo', href: '#', icon: 'play_circle' },
        { label: 'Lire l\'étude de cas', href: '#', icon: 'description', ghost: true }
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
      title: 'Compétition PayFit — Cas entreprise',
      desc: [
        'Cas entreprise réalisé en compétition pour PayFit : résolution d\'une problématique métier réelle à l\'aide d\'outils no-code et d\'IA.',
        'Construction d\'un prototype fonctionnel en quelques jours, de la collecte de besoin à la démonstration finale.'
      ],
      stack: ['Lovable', 'Dust', 'n8n', 'No-code', 'Automatisation'],
      role: 'Cadrage du besoin, prototypage no-code, automatisation des flux et présentation du cas.',
      results: [
        'Prototype no-code fonctionnel livré dans les délais',
        'Workflow d\'automatisation de bout en bout',
        'Présentation devant un jury entreprise'
      ],
      links: [
        { label: 'Voir la démo', href: '#', icon: 'play_circle' },
        { label: 'Lire l\'étude de cas', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['../assets/images/Payfit_IMG_7852.JPG', '../assets/images/Payfit_IMG_7883.JPG'],
      photos: [
        { img: '../assets/images/Payfit_IMG_7852.JPG' },
        { img: '../assets/images/Payfit_IMG_7883.JPG' }
      ]
    },
    {
      hero: 'SEO / GEO',
      gradient: 'linear-gradient(135deg, #ff8a50, #fbbc04)',
      date: '2026',
      category: 'Web & SEO',
      title: 'Audit SEO/GEO — Albert School',
      desc: [
        'Audit de référencement classique (SEO) et de référencement génératif (GEO) pour Albert School : comment l\'établissement apparaît dans Google et dans les moteurs IA.',
        'Analyse de la visibilité sur ChatGPT et Perplexity, puis recommandations concrètes d\'optimisation.'
      ],
      stack: ['SEO', 'GEO', 'ChatGPT', 'Perplexity', 'Analyse SERP'],
      role: 'Réalisation de l\'audit, benchmark concurrentiel, rédaction des recommandations SEO et GEO.',
      results: [
        'Cartographie de la visibilité SEO et IA',
        'Liste priorisée de recommandations',
        'Pistes d\'optimisation pour les moteurs génératifs'
      ],
      links: [
        { label: 'Lire l\'étude de cas', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['#ff8a50', '#fbbc04', '#f9a825']
    },
    {
      hero: 'SEO',
      gradient: 'linear-gradient(135deg, #34a853, #0a8043)',
      date: '2026',
      category: 'Web & SEO',
      title: 'Audit SEO — Eugenia School',
      desc: [
        'Audit SEO complet pour Eugenia School : recommandations techniques et éditoriales pour améliorer le positionnement organique.',
        'Travail sur la structure du site, les données structurées et la stratégie de contenu.'
      ],
      stack: ['SEO', 'Schema markup', 'Content', 'Audit technique'],
      role: 'Audit technique, analyse de contenu et plan d\'action SEO.',
      results: [
        'Recommandations techniques priorisées',
        'Plan de contenu aligné sur la recherche',
        'Optimisation des données structurées (Schema)'
      ],
      links: [
        { label: 'Lire l\'étude de cas', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['#34a853', '#0a8043', '#1a73e8']
    },
    {
      hero: 'WhatsApp',
      gradient: 'linear-gradient(135deg, #673ab7, #4285f4)',
      date: '2026',
      category: 'Data & IA · Personnel',
      title: 'Analyse WhatsApp — Python',
      desc: [
        'Analyse exploratoire d\'une conversation WhatsApp en Python : statistiques, analyse de sentiment et « vibes » de la discussion.',
        'Projet personnel pour pratiquer la data science et la visualisation sur des données réelles.'
      ],
      stack: ['Python', 'Pandas', 'NLP', 'Data viz', 'Matplotlib'],
      role: 'Nettoyage des données, analyse statistique, sentiment analysis et data visualisation.',
      results: [
        'Statistiques détaillées de la conversation',
        'Analyse de sentiment dans le temps',
        'Visualisations claires des tendances'
      ],
      links: [
        { label: 'Voir sur GitHub', href: '#', icon: 'code' }
      ],
      thumbs: ['#673ab7', '#4285f4', '#9575cd']
    },
    {
      hero: 'Airbnb',
      gradient: 'linear-gradient(135deg, #ff8a50, #ea4335)',
      date: '2024',
      category: 'Marketing & Com · Personnel',
      title: 'Projet Airbnb Lyon',
      desc: [
        'Projet entrepreneurial primé (Top 3 d\'un concours) : conception d\'un business plan et d\'une identité de marque pour un concept de location à Lyon.',
        'Étude de marché, positionnement et stratégie de communication.'
      ],
      stack: ['Business plan', 'Branding', 'Étude marché', 'Stratégie'],
      role: 'Étude de marché, construction du business plan et direction du branding.',
      results: [
        'Classement Top 3 du concours',
        'Business plan complet',
        'Identité de marque et supports de communication'
      ],
      links: [
        { label: 'Lire l\'étude de cas', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['#ff8a50', '#ea4335', '#fbbc04']
    },
    {
      hero: 'JEP 2025',
      gradient: 'linear-gradient(135deg, #fbbc04, #f9a825)',
      date: '2025',
      category: 'Marketing & Com',
      title: 'Campagne JEP 2025 — SNCF',
      desc: [
        'Pilotage de la publicité digitale pour les Journées Européennes du Patrimoine 2025 au sein du Groupe SNCF.',
        'Définition des audiences, gestion des campagnes et suivi des performances média.'
      ],
      stack: ['Publicité', 'Stratégie média', 'Audiences', 'Reporting'],
      role: 'Pilotage des campagnes digitales, ciblage des audiences et suivi de la performance.',
      results: [
        'Campagne digitale déployée pour l\'événement',
        'Audiences ciblées et optimisées',
        'Suivi des indicateurs de performance'
      ],
      links: [
        { label: 'Lire l\'étude de cas', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['#fbbc04', '#f9a825', '#ff8a50']
    },
    {
      hero: 'Blog',
      gradient: 'linear-gradient(135deg, #5f6368, #9aa0a6)',
      date: '2024',
      category: 'Web & SEO · Personnel',
      title: 'Blog journalistique',
      desc: [
        'Création et gestion d\'un blog journalistique sous WordPress : rédaction d\'articles, optimisation SEO et structuration du contenu.',
        'Projet personnel mêlant écriture, référencement et gestion de site.'
      ],
      stack: ['WordPress', 'SEO', 'Rédaction', 'Content'],
      role: 'Rédaction des articles, paramétrage WordPress et optimisation SEO.',
      results: [
        'Blog en ligne alimenté régulièrement',
        'Articles optimisés pour le référencement',
        'Structure de contenu pensée pour le SEO'
      ],
      links: [
        { label: 'Lire l\'étude de cas', href: '#', icon: 'description', ghost: true }
      ],
      thumbs: ['#5f6368', '#9aa0a6', '#3c4043']
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
    links:   document.getElementById('pmodal-links')
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

    // Visuel principal : image si dispo (gradient en fallback), sinon lettre
    el.hero.style.background = p.gradient;
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

    el.meta.textContent  = `${p.date} · ${p.category}`;
    el.title.textContent = p.title;
    el.desc.innerHTML    = p.desc.map((t) => `<p>${escape(t)}</p>`).join('');
    el.stack.innerHTML   = p.stack.map((t) => `<span class="tag-tech">${escape(t)}</span>`).join('');
    el.role.textContent  = p.role;
    el.results.innerHTML = p.results.map((r) => `<li>${escape(r)}</li>`).join('');
    el.links.innerHTML   = p.links.map((l) =>
      `<a class="pmodal__link ${l.ghost ? 'pmodal__link--ghost' : ''}" href="${l.href}">` +
      `<span class="material-symbols-outlined">${l.icon}</span>${escape(l.label)}</a>`).join('');

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
