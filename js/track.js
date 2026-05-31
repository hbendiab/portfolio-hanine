/* ==========================================================================
   track.js — Notification e-mail à chaque visite
   --------------------------------------------------------------------------
   Le site étant statique (GitHub Pages), il ne peut pas envoyer d'e-mail
   lui-même. On « ping » un petit Google Apps Script (déployé en Web App)
   qui, lui, envoie le mail. On utilise une image-pixel pour éviter les
   soucis CORS avec Apps Script.

   👉 ÉTAPE À FAIRE : colle l'URL de ton Web App Apps Script ci-dessous,
      à la place de PASTE_YOUR_WEBAPP_URL_HERE.
   ========================================================================== */

(function () {
  'use strict';

  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbyI_bsp4FGEZLK7hy1NsclOD6LQoVVDB_oeOdjMrXBHWYFL1D__tjDNMsK2lxb0dsJO/exec';

  // Tant que l'URL n'est pas configurée, on ne fait rien.
  if (!ENDPOINT || ENDPOINT.indexOf('PASTE_YOUR') === 0) return;

  try {
    var params = new URLSearchParams({
      page: location.pathname,
      ref:  document.referrer || '(direct)',
      lang: navigator.language || '',
      tz:   (Intl.DateTimeFormat().resolvedOptions().timeZone) || ''
    });
    // Requête GET via une image = pas de blocage CORS, déclenche doGet()
    new Image().src = ENDPOINT + (ENDPOINT.indexOf('?') === -1 ? '?' : '&') + params.toString();
  } catch (e) { /* silencieux : ne jamais casser la page pour un tracker */ }
})();
