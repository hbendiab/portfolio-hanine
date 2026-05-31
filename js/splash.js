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

  /* ========================================================================
     SYNTHÈSE VOCALE — lecture de la phrase (Web Speech Synthesis, natif)
     ======================================================================== */
  const synth = window.speechSynthesis;
  const supportsSpeech = typeof synth !== 'undefined';
  let muted = false;
  let utterance = null;

  const PHRASE = "Selon une étude, la durée d'attention de l'humain moyen est de 8 secondes. Il me reste alors 4 secondes pour retenir votre attention.";

  /* Choisit automatiquement la meilleure voix française */
  function getBestFrenchVoice() {
    if (!supportsSpeech) return null;
    const voices = synth.getVoices();
    // 1) voix française locale (pas de réseau)
    const localFR = voices.find((v) => v.lang.startsWith('fr') && v.localService === true);
    if (localFR) return localFR;
    // 2) n'importe quelle voix française
    const anyFR = voices.find((v) => v.lang.startsWith('fr'));
    if (anyFR) return anyFR;
    // 3) voix par défaut
    return null;
  }

  function buildUtterance() {
    const u = new SpeechSynthesisUtterance();
    u.text   = PHRASE;
    u.lang   = 'fr-FR';
    u.rate   = 0.9;   // légèrement plus lent
    u.pitch  = 1.0;   // ton neutre
    u.volume = 1.0;   // volume max
    const v = getBestFrenchVoice();
    if (v) u.voice = v;
    return u;
  }

  function speakPhrase() {
    if (!supportsSpeech || muted || done) return;
    try {
      synth.cancel();
      utterance = buildUtterance();
      synth.speak(utterance);
    } catch (e) { /* ignore */ }
  }

  // Les voix se chargent parfois de façon asynchrone (Chrome / Edge)
  if (supportsSpeech) {
    synth.onvoiceschanged = () => {
      if (utterance) {
        const v = getBestFrenchVoice();
        if (v) utterance.voice = v;
      }
    };
  }

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

  /* Frappe clavier : bruit blanc bref filtré (passe-haut) */
  function playKeyClick() {
    if (muted) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const bufferSize = Math.floor(ctx.sampleRate * 0.04); // 40 ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 8);
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 800 + Math.random() * 400;
      const gain = ctx.createGain();
      gain.gain.value = 0.08 + Math.random() * 0.04; // discret
      source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      source.start();
      source.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  /* Séquence de frappe synchronisée avec la phrase (~95 caractères) */
  function startTypingSound(duration) {
    const charCount = 95;
    const interval = duration / charCount;
    let count = 0;
    (function scheduleClick() {
      if (count >= charCount || muted || done) return;
      const jitter = interval * 0.3 * (Math.random() - 0.5); // variation humaine
      const delay = Math.max(20, interval + jitter);
      setTimeout(() => { playKeyClick(); count++; scheduleClick(); }, delay);
    })();
  }

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

  /* Whoosh doux pour la transition vers l'accueil */
  function playWhoosh() {
    if (muted) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const bufferSize = Math.floor(ctx.sampleRate * 0.5);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2) * 0.15;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.5);
      source.connect(filter); filter.connect(ctx.destination);
      source.start();
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
    if (step < 4) setTimeout(nextStep, 850);
    else setTimeout(triggerTransition, 1000);
  }

  function triggerTransition() {
    if (done) return;
    done = true;
    playWhoosh();                                                 // son de transition
    if (supportsSpeech) { try { synth.cancel(); } catch (e) {} } // coupe la voix
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

  // Bouton muet (haut-droite)
  const muteBtn = document.getElementById('mute-btn');
  if (muteBtn) {
    if (!supportsSpeech) { muteBtn.textContent = '🔇'; muteBtn.disabled = true; }
    muteBtn.addEventListener('click', () => {
      muted = !muted;
      if (muted) {
        if (supportsSpeech) { try { synth.cancel(); } catch (e) {} }
        muteBtn.textContent = '🔇';
        muteBtn.setAttribute('aria-label', 'Activer le son');
      } else {
        muteBtn.textContent = '🔊';
        muteBtn.setAttribute('aria-label', 'Couper le son');
        speakPhrase();   // relit la phrase si on réactive le son
      }
    });
  }

  // La voix + le son de frappe démarrent quand la phrase apparaît (après 0.4s)
  setTimeout(speakPhrase, 400);
  setTimeout(() => startTypingSound(2500), 400);   // 2.5 s de frappe clavier

  // Lancement du compte à rebours (après l'apparition de la phrase)
  setTimeout(nextStep, 1800);
})();
