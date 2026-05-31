/* ==========================================================================
   i18n.js — Bascule de langue FR / EN
   Portfolio Hanine
   --------------------------------------------------------------------------
   Principe : le FRANÇAIS est le contenu par défaut dans le HTML.
   L'ANGLAIS est fourni via des attributs :
     - data-en       -> remplace le innerHTML de l'élément
     - data-en-ph    -> remplace le placeholder
     - data-en-aria  -> remplace l'aria-label
   Le choix est mémorisé dans localStorage ('portfolio-lang').
   Boutons de bascule : tout élément portant la classe « lang-toggle ».
   ========================================================================== */

(function () {
  'use strict';

  var KEY = 'portfolio-lang';

  function getLang() {
    try { return localStorage.getItem(KEY) || 'fr'; } catch (e) { return 'fr'; }
  }

  function apply(lang) {
    var en = (lang === 'en');

    // Texte (innerHTML)
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.getAttribute('data-fr') === null) el.setAttribute('data-fr', el.innerHTML);
      el.innerHTML = en ? el.getAttribute('data-en') : el.getAttribute('data-fr');
    });

    // Placeholders
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      if (el.getAttribute('data-fr-ph') === null) el.setAttribute('data-fr-ph', el.getAttribute('placeholder') || '');
      el.setAttribute('placeholder', en ? el.getAttribute('data-en-ph') : el.getAttribute('data-fr-ph'));
    });

    // aria-labels
    document.querySelectorAll('[data-en-aria]').forEach(function (el) {
      if (el.getAttribute('data-fr-aria') === null) el.setAttribute('data-fr-aria', el.getAttribute('aria-label') || '');
      el.setAttribute('aria-label', en ? el.getAttribute('data-en-aria') : el.getAttribute('data-fr-aria'));
    });

    document.documentElement.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}

    // Met à jour le(s) bouton(s) : on affiche la langue vers laquelle on bascule
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.textContent = en ? 'FR' : 'EN';
      b.setAttribute('aria-label', en ? 'Passer en français' : 'Switch to English');
    });

    // Notifie les scripts dynamiques (chatbot, modale projets, carte, drive…)
    // afin qu'ils re-rendent leur contenu généré en JS dans la bonne langue.
    try {
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    } catch (e) {}
  }

  // Exposé pour usage externe éventuel
  window.setLang = apply;
  window.getLang = getLang;

  function init() {
    apply(getLang());
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.addEventListener('click', function () {
        apply(getLang() === 'en' ? 'fr' : 'en');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
