/* ==========================================================================
   logo-easter-egg.js — Logo « Hanine »
   - Mobile/tap : active la viz d'une lettre pendant 2 s
   - Easter egg : survoler/taper les 6 lettres en moins de 5 s → confetti
   --------------------------------------------------------------------------
   Pour DÉSACTIVER l'easter egg : passe ENABLE_EGG à false.
   ========================================================================== */

(() => {
  'use strict';

  const ENABLE_EGG = true;          // ← false pour désactiver le confetti
  const WINDOW_MS  = 5000;          // fenêtre pour activer les 6 lettres
  const TAP_MS     = 2000;          // durée d'affichage de la viz au tap

  const letters = Array.from(document.querySelectorAll('.logo-letter'));
  if (!letters.length) return;

  /* --- Mobile : tap → viz visible 2 s --- */
  letters.forEach((el) => {
    el.addEventListener('touchstart', () => {
      el.classList.add('is-active');
      clearTimeout(el._tapT);
      el._tapT = setTimeout(() => el.classList.remove('is-active'), TAP_MS);
    }, { passive: true });
  });

  /* --- Easter egg : 6 lettres « visitées » en < 5 s --- */
  if (!ENABLE_EGG) return;

  const visited = new Map();        // index lettre -> timestamp
  let fired = false;

  function visit(idx) {
    const now = Date.now();
    visited.set(idx, now);
    // purge des visites trop anciennes
    for (const [k, t] of visited) {
      if (now - t > WINDOW_MS) visited.delete(k);
    }
    if (visited.size >= letters.length && !fired) {
      fired = true;
      celebrate();
      setTimeout(() => { fired = false; visited.clear(); }, 6000); // cooldown
    }
  }

  letters.forEach((el, i) => {
    el.addEventListener('mouseenter', () => visit(i));
    el.addEventListener('touchstart', () => visit(i), { passive: true });
    el.addEventListener('focus', () => visit(i));
  });

  /* --- Confetti + message --- */
  function celebrate() {
    const logo = document.querySelector('.logo');
    const r = logo ? logo.getBoundingClientRect() : { left: innerWidth / 2, top: 120, width: 0, height: 0 };
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const colors = ['#4285f4', '#ea4335', '#fbbc04', '#34a853'];

    for (let i = 0; i < 28; i++) {
      const p = document.createElement('span');
      p.className = 'confetti-piece';
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.background = colors[i % colors.length];
      const ang = Math.random() * Math.PI * 2;
      const dist = 70 + Math.random() * 110;
      p.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }

    const msg = document.createElement('div');
    msg.className = 'logo-egg-msg';
    msg.textContent = '🎯 Tu as découvert ma stack data complète !';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2800);
  }
})();
