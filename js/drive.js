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
      title: 'Projets data & IA',
      files: [
        { name: 'Mirakl Talent Intelligence - Pitch.pptx', size: '8,4 Mo' },
        { name: 'Compétition PayFit - Deck.pdf', size: '3,1 Mo' },
        { name: 'Audit SEO Eugenia - Synthèse.pdf', size: '3,2 Mo' }
      ]
    },
    'admin': {
      title: 'Documents administratifs',
      files: [
        { name: 'CV - Hanine Bendiab.pdf', size: '1,2 Mo' },
        { name: 'Lettre de motivation.pdf', size: '0,8 Mo' },
        { name: "Pièce d'identité.pdf", size: '0,5 Mo' }
      ]
    },
    'certif': {
      title: 'Certifications',
      files: [
        { name: 'TOEIC - Score C1.pdf', size: '0,3 Mo' },
        { name: 'Attestation Master MSc AI.pdf', size: '0,4 Mo' },
        { name: 'Attestation Bachelor Communication.pdf', size: '0,4 Mo' }
      ]
    },
    'presentations': {
      title: 'Présentations & pitches',
      files: [
        { name: 'Mirakl - Pitch final.pptx', size: '8,4 Mo' },
        { name: 'PayFit - Présentation.pptx', size: '2,6 Mo' }
      ]
    },
    'visuels': {
      title: 'Photos campagnes & événements',
      files: [
        { name: 'JEP 2025 - Campagne SNCF.jpg', size: '6,2 Mo' },
        { name: 'Hackathon Mirakl - Équipe.jpg', size: '5,8 Mo' },
        { name: 'Remise des prix.jpg', size: '4,1 Mo' }
      ]
    }
  };

  const modal      = document.getElementById('drive-modal');
  const modalTitle = document.getElementById('drive-modal-title');
  const modalList  = document.getElementById('drive-modal-list');
  const modalClose = document.getElementById('drive-modal-close');
  const modalOverlay = modal ? modal.querySelector('.drive-modal__overlay') : null;

  function openFolder(id) {
    const folder = FOLDERS[id];
    if (!folder || !modal) return;
    modalTitle.textContent = folder.title;
    modalList.innerHTML = folder.files.map((f) =>
      '<a class="drive-modal__item" href="#">' +
      '<span class="material-symbols-outlined">draft</span>' +
      '<span>' + f.name + '</span>' +
      '<span class="size">' + f.size + '</span></a>'
    ).join('');
    modal.classList.add('is-open');
  }
  function closeModal() { if (modal) modal.classList.remove('is-open'); }

  document.querySelectorAll('.folder-card').forEach((card) => {
    card.addEventListener('click', () => openFolder(card.dataset.folder));
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
