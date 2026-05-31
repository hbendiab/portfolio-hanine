/* ==========================================================================
   age.js — Calcule l'âge de Hanine automatiquement
   Portfolio Hanine
   --------------------------------------------------------------------------
   Date de naissance : 20/07/1999.
   Remplit le texte de tout élément portant la classe « js-age » par l'âge
   actuel (recalculé à chaque chargement). Expose aussi window.hanineAge().
   ========================================================================== */

(function () {
  'use strict';

  // Mois en base 0 → 6 = juillet
  var BIRTH = { year: 1999, month: 6, day: 20 };

  function hanineAge() {
    var now = new Date();
    var age = now.getFullYear() - BIRTH.year;
    var beforeBirthday =
      now.getMonth() < BIRTH.month ||
      (now.getMonth() === BIRTH.month && now.getDate() < BIRTH.day);
    if (beforeBirthday) age--;
    return age;
  }

  // Accessible ailleurs (ex. chatbot)
  window.hanineAge = hanineAge;

  // Injecte l'âge dans les éléments .js-age
  document.addEventListener('DOMContentLoaded', function () {
    var age = hanineAge();
    document.querySelectorAll('.js-age').forEach(function (el) {
      el.textContent = age;
    });
  });
})();
