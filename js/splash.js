/* ==========================================================================
   splash.js — Logique du splash screen
   Portfolio Hanine
   ========================================================================== */

(() => {
  'use strict';

  // Accès sécurisé à sessionStorage (peut être bloqué en navigation privée stricte)
  const safeGet = (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const safeSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} };

  // Si le splash a déjà été vu dans la session -> on file direct à l'accueil
  if (safeGet('splashSeen')) {
    window.location.replace('index.html');
    return;
  }

  const segColors = ['#4285f4', '#ea4335', '#fbbc04', '#34a853'];
  const cdColors  = ['#4285f4', '#ea4335', '#fbbc04', '#34a853'];
  const cdBg      = ['#e8f0fe', '#fce8e6', '#fef7e0', '#e6f4ea'];
  let step = 0, done = false;

  /* État muet — commun à tous les sons */
  let muted = false;

  /* ========================================================================
     SONS SYNTHÉTIQUES (Web Audio API) — frappe clavier, bips, whoosh
     Un seul AudioContext partagé (évite la limite de contextes concurrents).
     Tous les sons respectent l'état `muted` (même bouton que la voix).
     ======================================================================== */
  let audioCtx = null;
  function getCtx() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
      return audioCtx;
    } catch (e) { return null; }   // Web Audio non supporté
  }

  /* Politique « autoplay » : le Web Audio reste bloqué tant qu'il n'y a pas
     eu d'interaction. On (re)débloque le contexte à la 1ère interaction. */
  function unlockAudio() { getCtx(); }
  ['pointerdown', 'keydown', 'touchstart', 'click', 'mousemove'].forEach((ev) =>
    document.addEventListener(ev, unlockAudio, { passive: true }));

  /* Bip du compte à rebours (hauteur décroissante : 4 aigu → 1 grave) */
  function playCountdownBeep(stepIndex) {
    if (muted) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freqs = [800, 650, 500, 380];
      osc.frequency.value = freqs[stepIndex];
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }

  /* Active l'étape i (segment + cercle décroissant + libellé) */
  function activateStep(i) {
    playCountdownBeep(i);   // bip synchronisé avec le chiffre

    // Allume le segment i+1
    document.getElementById('seg' + (i + 1)).style.background = segColors[i];

    // Active le cercle (4-i) = ordre décroissant (4, 3, 2, 1)
    const cd = document.getElementById('cd' + (4 - i));
    cd.style.borderColor = cdColors[i];
    cd.style.color       = cdColors[i];
    cd.style.background  = cdBg[i];
    cd.style.transform   = 'scale(1.15)';

    // Texte sous les chiffres
    const labels = ['On y va...', 'Plus que 3...', 'Plus que 2...', "C'est parti !"];
    document.getElementById('cdtxt').textContent = labels[i];

    // Désactive le cercle après 600 ms
    setTimeout(() => {
      cd.style.borderColor = '#e8eaed';
      cd.style.color       = '#e8eaed';
      cd.style.background  = 'transparent';
      cd.style.transform   = 'scale(1)';
      cd.style.opacity     = '0.35';
    }, 600);
  }

  function nextStep() {
    if (step >= 4 || done) return;
    activateStep(step);
    step++;
    if (step < 4) setTimeout(nextStep, 1200);
    else setTimeout(triggerTransition, 1500);
  }

  function triggerTransition() {
    if (done) return;
    done = true;
    safeSet('splashSeen', 'true');
    // Fondu blanc puis redirection
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.replace('index.html');
    }, 800);
  }

  // Bouton « Passer → »
  const skip = document.getElementById('skip-btn');
  if (skip) skip.addEventListener('click', triggerTransition);

  // Bouton muet (haut-droite) — coupe tous les sons
  const muteBtn = document.getElementById('mute-btn');
  if (muteBtn) {
    var SPK = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/></svg>';
    var MUT = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/></svg>';
    muteBtn.addEventListener('click', function () {
      muted = !muted;
      muteBtn.innerHTML = muted ? MUT : SPK;
      muteBtn.classList.toggle('sound-icon--muted', muted);
      muteBtn.setAttribute('aria-label', muted ? 'Activer le son' : 'Couper le son');
    });
  }

  // Lancement du compte à rebours (après l'apparition de la phrase)
  setTimeout(nextStep, 2500);
})();
