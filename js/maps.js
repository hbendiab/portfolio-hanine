/* ==========================================================================
   maps.js — Vraie carte interactive (Leaflet + OpenStreetMap)
   Portfolio Hanine
   --------------------------------------------------------------------------
   - markers colorés aux coordonnées réelles des lieux
   - clic card  <-> marker (flyTo + popup + surbrillance + pulsation)
   - hover card -> marker agrandi
   - filtres (Tous / Pro / Études / Projets)
   - contrôles personnalisés : zoom +/-, recentrage, satellite
   ========================================================================== */

(() => {
  'use strict';

  // Leaflet doit être chargé (CDN). Sécurité si le réseau échoue.
  if (typeof L === 'undefined') {
    console.warn('Leaflet non chargé : la carte ne peut pas s\'afficher.');
    return;
  }

  const cards = Array.from(document.querySelectorAll('.place-card'));
  const chips = Array.from(document.querySelectorAll('.map-chip'));

  /* --- Création de la carte --- */
  const map = L.map('map', {
    zoomControl: false,           // on utilise nos propres boutons
    scrollWheelZoom: true
  }).setView([48.86, 2.34], 10);  // centré sur Paris au départ

  /* --- Fonds de carte : plan (OSM) + satellite (Esri) --- */
  const baseOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  const baseSat = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 19, attribution: '&copy; Esri' }
  );
  let satellite = false;

  /* --- Construction des marqueurs à partir des cards --- */
  const places = {};        // id -> { marker, lat, lng, type }
  const allLatLng = [];

  cards.forEach((card) => {
    const id    = card.dataset.id;
    const lat   = parseFloat(card.dataset.lat);
    const lng   = parseFloat(card.dataset.lng);
    const color = card.dataset.color || '#1a73e8';
    const letter = card.querySelector('.place-pin').textContent.trim();
    const title  = card.querySelector('.place-card__title').textContent.trim();
    const sub    = card.querySelector('.place-card__subtitle').textContent.trim();

    // Marqueur HTML personnalisé (pastille colorée + lettre)
    const icon = L.divIcon({
      className: 'place-marker-wrap',
      html: '<span class="place-marker" style="--pc:' + color + '">' + letter + '</span>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    const marker = L.marker([lat, lng], { icon }).addTo(map);
    marker.bindPopup('<strong>' + title + '</strong><br>' + sub);
    marker.on('click', () => {
      activate(id);
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    places[id] = { marker, lat, lng, type: card.dataset.type, card };
    allLatLng.push([lat, lng]);
  });

  /* --- Cadre la carte sur l'ensemble des lieux --- */
  if (allLatLng.length) {
    map.fitBounds(allLatLng, { padding: [50, 50] });
  }
  // Recalcule la taille une fois le layout posé (évite les tuiles grises)
  setTimeout(() => map.invalidateSize(), 250);
  window.addEventListener('resize', () => map.invalidateSize());

  /* --- Met en avant un lieu (card + marker) --- */
  function clearPulse() {
    Object.values(places).forEach((o) => {
      if (o.marker._icon) o.marker._icon.classList.remove('is-pulsing');
    });
  }
  function activate(id) {
    cards.forEach((c) => c.classList.toggle('is-active', c.dataset.id === id));
    clearPulse();
    const o = places[id];
    if (!o) return;
    map.flyTo([o.lat, o.lng], 13, { duration: 0.8 });
    o.marker.openPopup();
    if (o.marker._icon) o.marker._icon.classList.add('is-pulsing');
  }

  /* --- Interactions cards --- */
  cards.forEach((card) => {
    card.addEventListener('click', () => activate(card.dataset.id));
    card.addEventListener('mouseenter', () => {
      const o = places[card.dataset.id];
      if (o && o.marker._icon) o.marker._icon.classList.add('is-hover');
    });
    card.addEventListener('mouseleave', () => {
      const o = places[card.dataset.id];
      if (o && o.marker._icon) o.marker._icon.classList.remove('is-hover');
    });
  });

  /* --- Filtres : masque cards + marqueurs --- */
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const f = chip.dataset.filter;
      cards.forEach((card) => {
        const show = f === 'all' || card.dataset.type === f;
        card.style.display = show ? '' : 'none';
        const o = places[card.dataset.id];
        if (o) {
          if (show) map.addLayer(o.marker);
          else      map.removeLayer(o.marker);
        }
      });
    });
  });

  /* --- Contrôles personnalisés --- */
  const ctrl = (id) => document.getElementById(id);
  if (ctrl('map-zoom-in'))  ctrl('map-zoom-in').addEventListener('click',  () => map.zoomIn());
  if (ctrl('map-zoom-out')) ctrl('map-zoom-out').addEventListener('click', () => map.zoomOut());
  if (ctrl('map-recenter')) ctrl('map-recenter').addEventListener('click', () => {
    if (allLatLng.length) map.fitBounds(allLatLng, { padding: [50, 50] });
  });
  if (ctrl('map-satellite')) ctrl('map-satellite').addEventListener('click', () => {
    satellite = !satellite;
    if (satellite) { map.removeLayer(baseOSM); baseSat.addTo(map); }
    else           { map.removeLayer(baseSat); baseOSM.addTo(map); }
  });

  /* --- Au changement de langue : on régénère les popups depuis le DOM
         (les titres/sous-titres ont déjà été retraduits par i18n.js) --- */
  document.addEventListener('langchange', () => {
    Object.values(places).forEach((o) => {
      if (!o.card) return;
      const title = o.card.querySelector('.place-card__title').textContent.trim();
      const sub   = o.card.querySelector('.place-card__subtitle').textContent.trim();
      o.marker.setPopupContent('<strong>' + title + '</strong><br>' + sub);
    });
  });
})();
