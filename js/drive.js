/* ==========================================================================
   drive.js — Interactions « Mes documents » (style Google Drive)
   Portfolio Hanine
   --------------------------------------------------------------------------
   - bascule vue liste / grille
   - menus « 3 points » (Télécharger / Partager / Voir le détail)
   - modale d'ouverture des dossiers
   - sidebar mobile (hamburger)
   ========================================================================== */

(() => {
  'use strict';

  /* Langue courante (fr par défaut) */
  const LANG = () => (typeof window.getLang === 'function' ? window.getLang() : 'fr');

  /* ========================================================================
     1. BASCULE VUE LISTE / GRILLE
     ======================================================================== */
  const recent   = document.querySelector('.recent');
  const btnList   = document.getElementById('view-list');
  const btnGrid   = document.getElementById('view-grid');

  function setView(mode) {
    if (!recent) return;
    recent.classList.toggle('is-grid', mode === 'grid');
    if (btnList) btnList.classList.toggle('is-active', mode === 'list');
    if (btnGrid) btnGrid.classList.toggle('is-active', mode === 'grid');
    try { localStorage.setItem('drive-view', mode); } catch (e) {}
  }
  if (btnList) btnList.addEventListener('click', () => setView('list'));
  if (btnGrid) btnGrid.addEventListener('click', () => setView('grid'));
  // Restaure la préférence
  try { setView(localStorage.getItem('drive-view') || 'list'); } catch (e) { setView('list'); }

  /* ========================================================================
     2. MENUS « 3 POINTS »
     ======================================================================== */
  const menuButtons = Array.from(document.querySelectorAll('.doc-actions__btn'));

  function closeAllMenus() {
    document.querySelectorAll('.doc-menu').forEach((m) => (m.hidden = true));
  }
  menuButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = btn.nextElementSibling;
      const isOpen = menu && !menu.hidden;
      closeAllMenus();
      if (menu && !isOpen) menu.hidden = false;
    });
  });
  document.addEventListener('click', closeAllMenus);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllMenus(); });

  // Actions des menus (Télécharger déclenche le lien parent ; le reste est décoratif)
  document.querySelectorAll('.doc-menu button').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = b.dataset.action;
      const row = b.closest('.doc-row');
      const link = row && row.querySelector('.doc-name');
      if (action === 'download' && link) link.click();
      if (action === 'share' && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      closeAllMenus();
    });
  });

  /* ========================================================================
     3. MODALE DOSSIER
     ======================================================================== */
  const FOLDERS = {
    'data-ia': {
      title: 'Projets data & IA', title_en: 'Data & AI projects',
      files: [
        { name: 'Mirakl Talent Intelligence - Pitch.pptx', size: '8,4 Mo', size_en: '8.4 MB' },
        { name: 'Compétition PayFit - Deck.pdf', name_en: 'PayFit Competition - Deck.pdf', size: '3,1 Mo', size_en: '3.1 MB' },
        { name: 'Audit SEO Eugenia - Synthèse.pdf', name_en: 'Eugenia SEO Audit - Summary.pdf', size: '3,2 Mo', size_en: '3.2 MB' }
      ]
    },
    'admin': {
      title: 'Documents administratifs', title_en: 'Administrative documents',
      files: [
        { name: 'CV - Hanine Bendiab.pdf', size: '1,2 Mo', size_en: '1.2 MB' },
        { name: 'Lettre de motivation.pdf', name_en: 'Cover letter.pdf', size: '0,8 Mo', size_en: '0.8 MB' },
        { name: "Pièce d'identité.pdf", name_en: 'ID document.pdf', size: '0,5 Mo', size_en: '0.5 MB' }
      ]
    },
    'certif': {
      title: 'Certifications', title_en: 'Certifications',
      files: [
        { name: 'TOEIC - Score C1.pdf', size: '0,3 Mo', size_en: '0.3 MB' },
        { name: 'Attestation Master MSc AI.pdf', name_en: 'MSc AI Master certificate.pdf', size: '0,4 Mo', size_en: '0.4 MB' },
        { name: 'Attestation Bachelor Communication.pdf', name_en: 'Communication Bachelor certificate.pdf', size: '0,4 Mo', size_en: '0.4 MB' }
      ]
    },
    'presentations': {
      title: 'Présentations & pitches', title_en: 'Presentations & pitches',
      files: [
        { name: 'Mirakl - Pitch final.pptx', name_en: 'Mirakl - Final pitch.pptx', size: '8,4 Mo', size_en: '8.4 MB' },
        { name: 'PayFit - Présentation.pptx', name_en: 'PayFit - Presentation.pptx', size: '2,6 Mo', size_en: '2.6 MB' }
      ]
    },
    'visuels': {
      title: 'Photos campagnes & événements', title_en: 'Campaign & event photos',
      files: [
        { name: 'JEP 2025 - Campagne SNCF.jpg', name_en: 'EHD 2025 - SNCF campaign.jpg', size: '6,2 Mo', size_en: '6.2 MB' },
        { name: 'Hackathon Mirakl - Équipe.jpg', name_en: 'Mirakl Hackathon - Team.jpg', size: '5,8 Mo', size_en: '5.8 MB' },
        { name: 'Remise des prix.jpg', name_en: 'Award ceremony.jpg', size: '4,1 Mo', size_en: '4.1 MB' }
      ]
    }
  };

  const modal      = document.getElementById('drive-modal');
  const modalTitle = document.getElementById('drive-modal-title');
  const modalList  = document.getElementById('drive-modal-list');
  const modalClose = document.getElementById('drive-modal-close');
  const modalOverlay = modal ? modal.querySelector('.drive-modal__overlay') : null;

  let currentFolder = null;

  function openFolder(id) {
    const folder = FOLDERS[id];
    if (!folder || !modal) return;
    currentFolder = id;
    const en = LANG() === 'en';
    modalTitle.textContent = (en && folder.title_en) ? folder.title_en : folder.title;
    modalList.innerHTML = folder.files.map((f) => {
      const name = en && f.name_en ? f.name_en : f.name;
      const size = en && f.size_en ? f.size_en : f.size;
      return '<a class="drive-modal__item" href="#">' +
        '<span class="material-symbols-outlined">draft</span>' +
        '<span>' + name + '</span>' +
        '<span class="size">' + size + '</span></a>';
    }).join('');
    modal.classList.add('is-open');
  }
  function closeModal() { if (modal) modal.classList.remove('is-open'); }

  document.querySelectorAll('.folder-card').forEach((card) => {
    card.addEventListener('click', () => openFolder(card.dataset.folder));
  });

  // Si un dossier est ouvert au changement de langue, on le re-remplit
  document.addEventListener('langchange', () => {
    if (currentFolder && modal && modal.classList.contains('is-open')) openFolder(currentFolder);
  });
  if (modalClose)   modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });

  /* ========================================================================
     4. SIDEBAR MOBILE (hamburger)
     ======================================================================== */
  const hamburger = document.getElementById('drive-hamburger');
  const nav = document.querySelector('.drive-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('is-open');
    });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && e.target !== hamburger) {
        nav.classList.remove('is-open');
      }
    });
  }
})();
