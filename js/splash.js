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

  /* Active l'étape i (segment + cercle décroissant + libellé) */
  function activateStep(i) {
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
    if (step < 4) setTimeout(nextStep, 850);
    else setTimeout(triggerTransition, 1000);
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

  // Lancement du compte à rebours (après l'apparition de la phrase)
  setTimeout(nextStep, 1800);
})();
