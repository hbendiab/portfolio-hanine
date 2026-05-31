/* ==========================================================================
   easter-eggs.js — 6 easter eggs cachés du portfolio
   Portfolio Hanine
   --------------------------------------------------------------------------
   Pour DÉSACTIVER un easter egg : commente la ligne correspondante
   dans la fonction init() tout en bas.
   ========================================================================== */

(() => {
  'use strict';

  /* ====== Anniversaire (easter egg « recherches du jour ») ====== */
  const BIRTHDAY = { m: 3, d: 15 }; // 15 mars — à personnaliser

  const form  = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const lucky = document.getElementById('lucky-btn');

  /* ========================================================================
     OUTILS — modale générique
     ======================================================================== */
  function eggModal(dialogClass, html, onClose) {
    const root = document.createElement('div');
    root.className = 'egg-modal';
    root.innerHTML =
      '<div class="egg-modal__overlay"></div>' +
      '<div class="egg-modal__dialog ' + (dialogClass || '') + '">' +
      '<button type="button" class="egg-modal__close" aria-label="Fermer">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
      '</button>' + html + '</div>';
    document.body.appendChild(root);

    function close() {
      root.remove();
      document.removeEventListener('keydown', onKey);
      if (onClose) onClose();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    root.querySelector('.egg-modal__close').addEventListener('click', close);
    root.querySelector('.egg-modal__overlay').addEventListener('click', close);
    document.addEventListener('keydown', onKey);

    return { root, dialog: root.querySelector('.egg-modal__dialog'), close };
  }

  function toast(text, ms) {
    const el = document.createElement('div');
    el.className = 'egg-toast';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms || 3000);
  }

  const rand = (n) => Math.floor(Math.random() * n);

  /* ========================================================================
     DÉTECTION DES MOTS-CLÉS
     ======================================================================== */
  function detectKeyword(value) {
    const m = (value || '').toLowerCase().trim();
    if (!m) return null;
    if (/(do a barrel roll|barrel roll|faire un tonneau|tonneau)/.test(m)) return 'barrel';
    if (/(bug hunt|il y a un bug|debug|\bbug\b)/.test(m)) return 'bughunt';
    if (/(génère une image|genere une image|generate image|créer image ia|creer image ia|image ia)/.test(m)) return 'imggen';
    if (/(snake|serpent|\bjeu\b)/.test(m)) return 'snake';
    return null;
  }

  function runEgg(type) {
    if (type === 'barrel')  triggerBarrelRoll();
    if (type === 'bughunt') triggerBugHunt();
    if (type === 'imggen')  triggerImageGenerator();
    if (type === 'snake')   triggerSnakeGame();
  }

  /* ========================================================================
     EASTER EGG 1 — « J'ai de la chance »
     ======================================================================== */
  function initLuckyButton() {
    if (!lucky) return;
    const PAGES = [
      ['Profil', 'pages/profile.html'],
      ['Expériences', 'pages/experiences.html'],
      ['Projets', 'pages/projects.html'],
      ['Formation', 'pages/formation.html'],
      ['Stack technique', 'pages/stack.html'],
      ['Maps', 'pages/maps.html'],
      ['Drive', 'pages/drive.html'],
      ['Assistant', 'pages/assistant.html']
    ];
    lucky.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation(); // empêche la redirection de search.js
      const pick = PAGES[rand(PAGES.length)];
      const flash = document.createElement('div');
      flash.className = 'lucky-flash';
      flash.innerHTML = '<span class="lucky-spinner"></span> 🎲 La chance vous emmène vers… ' + pick[0];
      document.body.appendChild(flash);
      setTimeout(() => { window.location.href = pick[1]; }, 1100);
    });
  }

  /* ========================================================================
     EASTER EGG 2 — Barrel roll
     ======================================================================== */
  function triggerBarrelRoll() {
    const target = document.body;
    target.classList.add('barrel-roll');
    toast('🎉 Easter egg unlocked!', 3500);
    setTimeout(() => target.classList.remove('barrel-roll'), 4000);
  }

  /* ========================================================================
     EASTER EGG 3 — Recherches du jour
     ======================================================================== */
  function getDailySuggestions() {
    const d = new Date();
    const day = d.getDay(), month = d.getMonth() + 1, date = d.getDate();
    const S = {
      default:   ['qui est Hanine ?', 'ses projets data', 'son CV', 'où elle travaille', 'lui parler'],
      lundi:     ['comment commencer la semaine ?', 'café Hanine ?', 'lundi motivation'],
      vendredi:  ['weekend en vue ?', 'TGIF Hanine', 'vendredi vibes'],
      samedi:    ["c'est le weekend !", 'Hanine en mode chill'],
      dimanche:  ['dimanche cocoon', 'préparer la semaine ?'],
      birthday:  ['joyeux anniversaire Hanine 🎂', "qu'est-ce qu'elle veut comme cadeau ?"],
      noel:      ['joyeux Noël 🎄', 'cadeaux Hanine'],
      halloween: ['trick or treat 🎃', 'Hanine déguisée en quoi ?'],
      nouvelan:  ['bonne année ! 🎆', 'résolutions de Hanine']
    };
    if (month === 12 && date === 25) return S.noel;
    if (month === 10 && date === 31) return S.halloween;
    if (month === 1  && date === 1)  return S.nouvelan;
    if (month === BIRTHDAY.m && date === BIRTHDAY.d) return S.birthday;
    if (day === 1) return S.lundi;
    if (day === 5) return S.vendredi;
    if (day === 6) return S.samedi;
    if (day === 0) return S.dimanche;
    return S.default;
  }

  function initSearchOfTheDay() {
    const chips = document.querySelector('.chips');
    if (!chips || !form) return;
    const list = getDailySuggestions();
    chips.innerHTML = '<p class="chips__label">Recherches du jour :</p>';
    list.forEach((q) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = q;
      chip.addEventListener('click', () => {
        input.value = q;
        if (form.requestSubmit) form.requestSubmit();
        else form.dispatchEvent(new Event('submit', { cancelable: true }));
      });
      chips.appendChild(chip);
    });
  }

  /* ========================================================================
     EASTER EGG 4 — Bug Hunt
     ======================================================================== */
  function triggerBugHunt() {
    const html =
      '<div class="bughunt__top">' +
        '<span id="bh-timer">⏱️ 30s</span>' +
        '<span class="bughunt__title blink">🐛 BUG HUNT</span>' +
        '<span id="bh-score">Score: 0</span>' +
      '</div>' +
      '<p style="font-size:13px;margin-bottom:10px;">Aide Hanine à débugger : clique sur les 🐛 !</p>' +
      '<div class="bughunt__grid" id="bh-grid"></div>';
    let timers = [];
    const cleanup = () => timers.forEach(clearInterval);
    const modal = eggModal('egg-modal__dialog--console', html, cleanup);

    const grid    = modal.dialog.querySelector('#bh-grid');
    const scoreEl = modal.dialog.querySelector('#bh-score');
    const timerEl = modal.dialog.querySelector('#bh-timer');
    let score = 0, time = 30;

    function place(bug) {
      bug.style.left = (5 + rand(90)) + '%';
      bug.style.top  = (5 + rand(90)) + '%';
    }
    function spawn() {
      const bug = document.createElement('button');
      bug.type = 'button';
      bug.className = 'bughunt__bug';
      bug.textContent = '🐛';
      place(bug);
      bug.addEventListener('click', () => {
        score += 10;
        scoreEl.textContent = 'Score: ' + score;
        bug.remove();
        spawn();
      });
      grid.appendChild(bug);
    }
    for (let i = 0; i < 6; i++) spawn();

    timers.push(setInterval(() => {
      grid.querySelectorAll('.bughunt__bug').forEach(place);
    }, 700));
    timers.push(setInterval(() => {
      time--;
      timerEl.textContent = '⏱️ ' + time + 's';
      if (time <= 0) { cleanup(); endGame(); }
    }, 1000));

    function endGame() {
      const win = score >= 100;
      modal.dialog.innerHTML =
        '<button type="button" class="egg-modal__close" aria-label="Fermer">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>' +
        '<div class="bughunt__result">' +
          '<div class="bughunt__score-final">Score : ' + score + '</div>' +
          '<p>' + (win ? '🎯 Tu es un.e vrai.e dev !' : 'Encore quelques bugs à attraper…') + '</p>' +
          '<div class="egg-actions">' +
            '<button type="button" class="egg-btn" id="bh-replay">Rejouer</button>' +
            '<button type="button" class="egg-btn egg-btn--ghost" id="bh-close">Fermer</button>' +
          '</div>' +
        '</div>';
      modal.dialog.querySelector('.egg-modal__close').addEventListener('click', modal.close);
      modal.dialog.querySelector('#bh-close').addEventListener('click', modal.close);
      modal.dialog.querySelector('#bh-replay').addEventListener('click', () => { modal.close(); triggerBugHunt(); });
    }
  }

  /* ========================================================================
     EASTER EGG 5 — AI Image Generator
     ======================================================================== */
  function buildArt(seed) {
    const rot = seed * 37 % 360;
    return (
      '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="g' + seed + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#4285f4"/><stop offset="35%" stop-color="#ea4335"/>' +
      '<stop offset="70%" stop-color="#fbbc04"/><stop offset="100%" stop-color="#34a853"/>' +
      '</linearGradient></defs>' +
      '<rect width="200" height="200" fill="url(#g' + seed + ')"/>' +
      '<g transform="rotate(' + rot + ' 100 100)" opacity="0.85">' +
      '<circle cx="100" cy="100" r="55" fill="#ffffff" opacity="0.15"/>' +
      '<circle cx="70" cy="70" r="30" fill="#ffffff" opacity="0.18"/>' +
      '<rect x="120" y="40" width="46" height="46" rx="8" fill="#ffffff" opacity="0.16"/>' +
      '<polygon points="40,160 80,120 120,160" fill="#ffffff" opacity="0.18"/>' +
      '</g>' +
      '<circle cx="100" cy="100" r="46" fill="rgba(0,0,0,0.25)"/>' +
      '<text x="100" y="108" text-anchor="middle" font-family="Roboto,Arial" ' +
      'font-size="26" font-weight="700" fill="#fff" letter-spacing="2">HANINE</text>' +
      '</svg>'
    );
  }

  function triggerImageGenerator() {
    const PROMPT = 'Hanine Bendiab, AI marketer in Paris, professional portrait, futuristic style';
    const html =
      '<h2 class="egg-modal__title">🎨 Hanine AI Image Generator</h2>' +
      '<textarea class="imggen__prompt" id="ig-prompt">' + PROMPT + '</textarea>' +
      '<div class="egg-actions" style="justify-content:flex-start;margin-top:12px;">' +
        '<button type="button" class="egg-btn" id="ig-gen">Générer</button>' +
      '</div>' +
      '<div class="imggen__steps" id="ig-steps"></div>' +
      '<div id="ig-result"></div>';
    const modal = eggModal('', html, () => {});
    const stepsEl  = modal.dialog.querySelector('#ig-steps');
    const resultEl = modal.dialog.querySelector('#ig-result');
    const genBtn   = modal.dialog.querySelector('#ig-gen');
    let seed = 1;

    function generate() {
      genBtn.disabled = true;
      resultEl.innerHTML = '';
      const steps = ['Initialisation du modèle… ⚙️', 'Analyse du prompt… 🧠', 'Génération en cours… ✨', 'Finalisation… 🎨'];
      let i = 0;
      stepsEl.textContent = steps[0];
      const t = setInterval(() => {
        i++;
        if (i < steps.length) { stepsEl.textContent = steps[i]; return; }
        clearInterval(t);
        stepsEl.textContent = '';
        seed++;
        resultEl.innerHTML =
          '<div class="imggen__art">' + buildArt(seed) + '</div>' +
          '<p class="imggen__caption">🤖 Generated by Hanine AI v2.0 · 1024×1024 · 0.00€</p>' +
          '<div class="egg-actions">' +
            '<button type="button" class="egg-btn" id="ig-regen">Régénérer</button>' +
            '<button type="button" class="egg-btn egg-btn--ghost" id="ig-dl">Télécharger</button>' +
          '</div>' +
          '<p class="imggen__note">Note : Si seulement c\'était si facile de générer une vraie image avec Sora…</p>';
        genBtn.disabled = false;
        resultEl.querySelector('#ig-regen').addEventListener('click', generate);
        resultEl.querySelector('#ig-dl').addEventListener('click', () => {
          const blob = new Blob([buildArt(seed)], { type: 'image/svg+xml' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'hanine-ai.svg';
          a.click();
          URL.revokeObjectURL(a.href);
        });
      }, 1000);
    }
    genBtn.addEventListener('click', generate);
  }

  /* ========================================================================
     EASTER EGG 6 — Snake
     ======================================================================== */
  function triggerSnakeGame() {
    const SIZE = 300, CELL = 15, N = SIZE / CELL; // grille 20x20
    const COLORS = ['#4285f4', '#ea4335', '#fbbc04', '#34a853'];
    const FOODS = [
      { e: '☕', pts: 10, w: 50 }, { e: '📊', pts: 20, w: 30 },
      { e: '🤖', pts: 30, w: 15 }, { e: '💼', pts: 50, w: 5 }
    ];
    const html =
      '<div class="snake__top"><span>🐍 Snake Hanine</span>' +
      '<span id="sn-score">Score : 0 · Best : ' + (localStorage.getItem('hanine-snake-hs') || 0) + '</span></div>' +
      '<canvas class="snake__canvas" id="sn-canvas" width="' + SIZE + '" height="' + SIZE + '"></canvas>' +
      '<div class="snake__food-legend">☕ +10 · 📊 +20 · 🤖 +30 · 💼 +50</div>' +
      '<p class="snake__hint">Flèches ou Z Q S D pour jouer</p>';

    let loop = null;
    const cleanup = () => { if (loop) clearInterval(loop); document.removeEventListener('keydown', onKey); };
    const modal = eggModal('', html, cleanup);

    const canvas = modal.dialog.querySelector('#sn-canvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = modal.dialog.querySelector('#sn-score');

    let snake, dir, nextDir, food, score;

    function weightedFood() {
      const total = FOODS.reduce((s, f) => s + f.w, 0);
      let r = rand(total);
      for (const f of FOODS) { if (r < f.w) return f; r -= f.w; }
      return FOODS[0];
    }
    function placeFood() {
      let p;
      do { p = { x: rand(N), y: rand(N) }; } while (snake.some((s) => s.x === p.x && s.y === p.y));
      food = Object.assign(p, weightedFood());
    }
    function reset() {
      snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
      dir = { x: 1, y: 0 }; nextDir = dir; score = 0;
      placeFood();
    }
    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      // grille fine
      ctx.strokeStyle = '#eee';
      for (let i = 0; i <= N; i++) {
        ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke();
      }
      // nourriture
      ctx.font = '13px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(food.e, food.x * CELL + CELL / 2, food.y * CELL + CELL / 2);
      // serpent (cercles colorés Google)
      snake.forEach((s, i) => {
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.beginPath();
        ctx.arc(s.x * CELL + CELL / 2, s.y * CELL + CELL / 2, CELL / 2 - 1, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    function step() {
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      // collisions murs / corps
      if (head.x < 0 || head.y < 0 || head.x >= N || head.y >= N ||
          snake.some((s) => s.x === head.x && s.y === head.y)) {
        return gameOver();
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += food.pts;
        scoreEl.textContent = 'Score : ' + score + ' · Best : ' + bestScore();
        placeFood();
      } else {
        snake.pop();
      }
      draw();
    }
    function bestScore() {
      const hs = Math.max(score, parseInt(localStorage.getItem('hanine-snake-hs') || '0', 10));
      try { localStorage.setItem('hanine-snake-hs', hs); } catch (e) {}
      return hs;
    }
    function gameOver() {
      clearInterval(loop); loop = null;
      const best = bestScore();
      const over = document.createElement('div');
      over.className = 'bughunt__result';
      over.style.marginTop = '12px';
      over.innerHTML =
        '<div class="bughunt__score-final" style="color:var(--color-text)">🎮 Game Over</div>' +
        '<p>Score : ' + score + ' · Meilleur : ' + best + '</p>' +
        '<div class="egg-actions">' +
          '<button type="button" class="egg-btn" id="sn-replay">Rejouer</button>' +
          '<button type="button" class="egg-btn egg-btn--ghost" id="sn-close">Fermer</button>' +
        '</div>';
      modal.dialog.appendChild(over);
      over.querySelector('#sn-replay').addEventListener('click', () => { over.remove(); start(); });
      over.querySelector('#sn-close').addEventListener('click', modal.close);
    }
    function onKey(e) {
      const k = e.key.toLowerCase();
      if (k === 'arrowup'    || k === 'z') { if (dir.y === 0) nextDir = { x: 0, y: -1 }; }
      else if (k === 'arrowdown'  || k === 's') { if (dir.y === 0) nextDir = { x: 0, y: 1 }; }
      else if (k === 'arrowleft'  || k === 'q') { if (dir.x === 0) nextDir = { x: -1, y: 0 }; }
      else if (k === 'arrowright' || k === 'd') { if (dir.x === 0) nextDir = { x: 1, y: 0 }; }
      else return;
      e.preventDefault();
    }
    function start() {
      reset();
      scoreEl.textContent = 'Score : 0 · Best : ' + (localStorage.getItem('hanine-snake-hs') || 0);
      draw();
      if (loop) clearInterval(loop);
      loop = setInterval(step, 120);
    }
    document.addEventListener('keydown', onKey);
    start();
  }

  /* ========================================================================
     CONSOLE F12
     ======================================================================== */
  function consoleBanner() {
    console.log(
      '%c\n' +
      '  ╦ ╦┌─┐┌┐┌┬┌┐┌┌─┐  ┌─┐┬ ┬\n' +
      '  ╠═╣├─┤││││││├┤   ├─┤│ │\n' +
      '  ╩ ╩┴ ┴┘└┘┴┘└┘└─┘  ┴ ┴┴ ┴\n\n' +
      '  Tu as ouvert la console ? Tu es bien curieux 👀\n' +
      "  PS : Si tu lis ça, t'es probablement un.e dev.\n\n" +
      '  Recrute-moi : haninebendiab@hotmail.com\n\n' +
      '  🔓 Easter eggs cachés à débloquer : 6\n' +
      '  Indice : tape des mots dans la barre de recherche…\n',
      'color: #4285f4; font-family: monospace;'
    );
  }

  /* ========================================================================
     BRANCHEMENT BARRE DE RECHERCHE
     ======================================================================== */
  function initSearchKeywords() {
    if (!form || !input) return;
    // Listener enregistré AVANT celui de search.js (ordre des scripts)
    form.addEventListener('submit', (e) => {
      const egg = detectKeyword(input.value);
      if (egg) {
        e.preventDefault();
        e.stopImmediatePropagation(); // bloque la redirection de search.js
        runEgg(egg);
        input.value = '';
      }
    });
  }

  /* ========================================================================
     INIT — commente une ligne pour désactiver un easter egg
     ======================================================================== */
  function init() {
    consoleBanner();
    initSearchKeywords();    // eggs 2, 4, 5, 6 (barre de recherche)
    initLuckyButton();       // egg 1 (J'ai de la chance)
    initSearchOfTheDay();    // egg 3 (recherches du jour)
  }

  init();
})();
