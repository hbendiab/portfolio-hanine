/* ==========================================================================
   navigation.js — Navigation et menu applications
   Portfolio Hanine
   --------------------------------------------------------------------------
   Gère l'ouverture / fermeture du panneau « Vos favoris » (grille 9 points)
   présent dans la top bar.
   - clic sur le bouton  -> ouvre / ferme le panneau
   - clic en dehors      -> ferme le panneau
   - touche Échap        -> ferme le panneau
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('apps-toggle');
  const panel  = document.getElementById('apps-panel');

  // Si le menu n'existe pas sur cette page, on ne fait rien.
  if (!toggle || !panel) return;

  /** Le panneau est-il ouvert ? */
  const isOpen = () => !panel.hidden;

  /** Ouvre le panneau */
  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }

  /** Ferme le panneau */
  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  /* --- Clic sur le bouton grille : bascule l'état --- */
  toggle.addEventListener('click', (event) => {
    event.stopPropagation(); // évite que le clic « extérieur » ne referme aussitôt
    isOpen() ? closePanel() : openPanel();
  });

  /* --- Clic en dehors du panneau : on ferme --- */
  document.addEventListener('click', (event) => {
    if (isOpen() && !panel.contains(event.target) && !toggle.contains(event.target)) {
      closePanel();
    }
  });

  /* --- Touche Échap : on ferme --- */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      closePanel();
      toggle.focus(); // on rend le focus au bouton pour l'accessibilité
    }
  });
});
