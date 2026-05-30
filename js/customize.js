/* ==========================================================================
   customize.js — Personnalisation du portfolio
   Portfolio Hanine
   --------------------------------------------------------------------------
   - Ouverture / fermeture de la modale
   - Changement de thème (clair / sombre / système)
   - Choix de la couleur d'accent (palettes + couleur custom)
   - Persistance via localStorage
   ========================================================================== */

(() => {
  'use strict';

  /* --- Clés de stockage --- */
  const STORAGE_THEME  = 'portfolio-theme';   // "light" | "dark" | "system"
  const STORAGE_ACCENT = 'portfolio-accent';  // code hex de la couleur

  /* --- Palettes de couleurs (4 nuances par palette, du clair au foncé) ---
     L'accent appliqué est la nuance la plus soutenue (la 4e). */
  const PALETTES = [
    { name: 'Bleu Google',     shades: ['#d2e3fc', '#8ab4f8', '#4285f4', '#1a73e8'] },
    { name: 'Bleu marine',     shades: ['#c5cae9', '#7986cb', '#3949ab', '#1a237e'] },
    { name: 'Bleu acier',      shades: ['#cfd8dc', '#90a4ae', '#607d8b', '#37474f'] },
    { name: 'Bleu poudre',     shades: ['#e3f2fd', '#90caf9', '#42a5f5', '#1976d2'] },
    { name: 'Vert menthe',     shades: ['#d3f9e8', '#8ce0b8', '#4caf85', '#2e7d5b'] },
    { name: 'Vert turquoise',  shades: ['#cff2f2', '#80deea', '#26c6da', '#00838f'] },
    { name: 'Vert forêt',      shades: ['#c8e6c9', '#81c784', '#43a047', '#1b5e20'] },
    { name: 'Vert sauge',      shades: ['#dde5d5', '#b2c2a3', '#8aa177', '#5f7050'] },
    { name: 'Jaune moutarde',  shades: ['#fff3c4', '#ffe082', '#fbc02d', '#f9a825'] },
    { name: 'Orange pêche',    shades: ['#ffe0cc', '#ffb38a', '#ff8a50', '#f4631e'] },
    { name: 'Brun sable',      shades: ['#e8d6b8', '#cbab7e', '#a9824f', '#7d5b33'] },
    { name: 'Rose pâle',       shades: ['#fde0e7', '#f8a5c2', '#f06292', '#e91e63'] },
    { name: 'Rose poudré',     shades: ['#f6dcd6', '#e8b4a8', '#d68a78', '#b56a55'] },
    { name: 'Violet lavande',  shades: ['#e1d5f7', '#b39ddb', '#9575cd', '#673ab7'] },
    { name: 'Mauve',           shades: ['#ead5e6', '#c79bc0', '#a16a98', '#7b4b73'] },
  ];

  /* --- Sélecteurs du DOM --- */
  const root          = document.documentElement;
  const fab           = document.getElementById('customize-fab');
  const modal         = document.getElementById('customize-modal');
  const overlay       = document.getElementById('customize-overlay');
  const closeBtn      = document.getElementById('customize-close');
  const themeButtons  = document.querySelectorAll('.theme-toggle__btn');
  const paletteGrid   = document.getElementById('palette-grid');
  const colorInput    = document.getElementById('custom-color-input');

  /* ========================================================================
     THÈME (clair / sombre / système)
     ======================================================================== */

  /** Détermine si le système est en mode sombre */
  const systemPrefersDark = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  /**
   * Applique le thème EFFECTIF (light/dark) sur <html>.
   * @param {string} theme - "light" | "dark" | "system"
   */
  function applyTheme(theme) {
    const effective = theme === 'system'
      ? (systemPrefersDark() ? 'dark' : 'light')
      : theme;
    root.setAttribute('data-theme', effective);

    // Met à jour le bouton actif dans la modale
    themeButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.themeValue === theme);
    });
  }

  /** Change et sauvegarde le thème */
  function setTheme(theme) {
    localStorage.setItem(STORAGE_THEME, theme);
    applyTheme(theme);
  }

  /* ========================================================================
     COULEUR D'ACCENT
     ======================================================================== */

  /**
   * Applique une couleur d'accent partout (via la variable CSS --accent).
   * @param {string} hex - couleur principale
   */
  function applyAccent(hex) {
    root.style.setProperty('--accent', hex);
    root.style.setProperty('--accent-strong', hex);
    // Marque visuellement la palette sélectionnée
    document.querySelectorAll('.palette').forEach((p) => {
      p.classList.toggle('is-selected', p.dataset.accent === hex);
    });
  }

  /** Change et sauvegarde la couleur d'accent */
  function setAccent(hex) {
    localStorage.setItem(STORAGE_ACCENT, hex);
    applyAccent(hex);
  }

  /* ========================================================================
     CONSTRUCTION DES PALETTES
     ======================================================================== */
  function buildPalettes() {
    if (!paletteGrid) return;

    PALETTES.forEach((palette) => {
      const accent = palette.shades[3]; // nuance la plus soutenue
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette';
      btn.dataset.accent = accent;
      btn.setAttribute('aria-label', palette.name);
      btn.title = palette.name;
      // 4 quadrants colorés via conic-gradient
      btn.style.background =
        `conic-gradient(${palette.shades[0]} 0 25%, ${palette.shades[1]} 0 50%, ` +
        `${palette.shades[2]} 0 75%, ${palette.shades[3]} 0 100%)`;

      btn.addEventListener('click', () => setAccent(accent));
      paletteGrid.appendChild(btn);
    });

    /* --- Palette « Custom » (pipette) en dernier --- */
    const customBtn = document.createElement('button');
    customBtn.type = 'button';
    customBtn.className = 'palette palette--custom';
    customBtn.setAttribute('aria-label', 'Couleur personnalisée');
    customBtn.title = 'Couleur personnalisée';
    customBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12a1 1 0 0 0 .01-1.4zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z"/>' +
      '</svg>';
    // Ouvre le sélecteur de couleur natif
    customBtn.addEventListener('click', () => colorInput && colorInput.click());
    paletteGrid.appendChild(customBtn);

    if (colorInput) {
      colorInput.addEventListener('input', (e) => setAccent(e.target.value));
    }
  }

  /* ========================================================================
     OUVERTURE / FERMETURE DE LA MODALE
     ======================================================================== */
  const openModal  = () => modal && modal.classList.add('is-open');
  const closeModal = () => modal && modal.classList.remove('is-open');

  /* ========================================================================
     INITIALISATION
     ======================================================================== */
  function init() {
    buildPalettes();

    // Restaure les préférences sauvegardées
    const savedTheme  = localStorage.getItem(STORAGE_THEME)  || 'system';
    const savedAccent = localStorage.getItem(STORAGE_ACCENT) || '#1a73e8';
    applyTheme(savedTheme);
    applyAccent(savedAccent);

    // Si le thème est « système », on réagit au changement de l'OS
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if ((localStorage.getItem(STORAGE_THEME) || 'system') === 'system') {
          applyTheme('system');
        }
      });
    }

    /* --- Écouteurs d'événements --- */
    if (fab)      fab.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay)  overlay.addEventListener('click', closeModal);

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Boutons de thème
    themeButtons.forEach((btn) => {
      btn.addEventListener('click', () => setTheme(btn.dataset.themeValue));
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
