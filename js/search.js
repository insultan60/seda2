/* Alexandra Kerr — Home Search
   Real Leaflet map with price pins + filter dropdowns + list sync.
   Listing data is sample content pending live MLS/IDX integration. */

(() => {
  /* ---------- Sample listing data (real past/current AK properties) ---------- */
  const PROPS = [
    { id: 'p1',  lat: 34.0372, lng: -118.4934, tag: '$2.60M', price: '$2,595,000', addr: '612 Lincoln Blvd, Unit 3',        city: 'Santa Monica, CA 90402',  meta: '3 bd · 3 ba · 1,920 sf', img: 'assets/listings/c1-lincoln.jpg' },
    { id: 'p2',  lat: 34.1110, lng: -118.2790, tag: '$1.40M', price: '$1,395,000', addr: '3256 Colony Cir',                  city: 'Los Angeles, CA 90027',   meta: '3 bd · 4 ba · 1,688 sf', img: 'assets/listings/c2-colony.jpg' },
    { id: 'p3',  lat: 34.0554, lng: -118.4300, tag: '$1.23M', price: '$1,225,000', addr: '1520 S Beverly Glen Blvd, #507',   city: 'Los Angeles, CA 90024',   meta: '2 bd · 2 ba · 1,867 sf', img: 'assets/listings/c3-beverlyglen.jpg' },
    { id: 'p4',  lat: 34.0672, lng: -118.3266, tag: '$6.30M', price: '$6,300,000', addr: '356 S Rossmore Ave',               city: 'Los Angeles, CA 90020',   meta: '8 bd · 6 ba · 5,878 sf', img: 'assets/listings/s2-rossmore.jpg' },
    { id: 'p5',  lat: 34.0838, lng: -118.3369, tag: '$3.75M', price: '$3,750,000', addr: '621 N McCadden Pl',                city: 'Los Angeles, CA 90004',   meta: '4 bd · 3 ba · 2,678 sf', img: 'assets/listings/s4-mccadden621.jpg' },
    { id: 'p6',  lat: 34.0808, lng: -118.3370, tag: '$3.65M', price: '$3,650,000', addr: '514 N McCadden Pl',                city: 'Los Angeles, CA 90004',   meta: '3 bd · 3 ba · 2,483 sf', img: 'assets/listings/s5-mccadden514.jpg' },
    { id: 'p7',  lat: 34.0745, lng: -118.3208, tag: '$3.60M', price: '$3,595,000', addr: '206 N Windsor Blvd',               city: 'Los Angeles, CA 90004',   meta: '3 bd · 3 ba · 2,813 sf', img: 'assets/listings/s6-windsor206.jpg' },
    { id: 'p8',  lat: 34.0648, lng: -118.3200, tag: '$7.78M', price: '$7,775,000', addr: '414 S Windsor Blvd',               city: 'Los Angeles, CA 90020',   meta: '4 bd · 4 ba · 4,235 sf', img: 'assets/listings/s1-windsor414.jpg' },
    { id: 'p9',  lat: 33.9890, lng: -118.4660, tag: '$4.28M', price: '$4,275,000', addr: '11845 Pacific Ave',                city: 'Los Angeles, CA 90066',   meta: '5 bd · 6 ba · 4,648 sf', img: 'assets/listings/s3-pacific.jpg' },
    { id: 'p10', lat: 34.1046, lng: -118.3357, tag: '$1.70M', price: '$1,695,000', addr: '2050 N Las Palmas Ave',            city: 'Los Angeles, CA 90068',   meta: '3 bd · 4 ba · 1,830 sf', img: 'assets/listings/photo-pending.svg' },
    { id: 'p11', lat: 34.0954, lng: -118.3766, tag: '$28K',   price: '$28,000',    addr: '1352 Miller Dr',                   city: 'Los Angeles, CA 90069',   meta: '4 bd · 5 ba · 5,187 sf', img: 'assets/listings/photo-pending.svg' },
    { id: 'p12', lat: 34.0879, lng: -118.3406, tag: '$2.30M', price: '$2,295,000', addr: '910 N Sycamore Ave',               city: 'Los Angeles, CA 90038',   meta: '4 bd · 3 ba · 2,340 sf', img: 'assets/listings/photo-pending.svg' },
  ];

  /* ---------- Leaflet map ---------- */
  const mapEl = document.getElementById('map');
  const markers = {};
  if (mapEl && window.L) {
    const map = L.map('map', { zoomControl: true, scrollWheelZoom: true })
      .setView([34.055, -118.36], 12);
    map.zoomControl.setPosition('topleft');

    const layers = {
      street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; OpenStreetMap contributors',
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19, attribution: 'Imagery &copy; Esri',
      }),
      hybridBase: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19, attribution: 'Imagery &copy; Esri',
      }),
      hybridLabels: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
      }),
      terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17, attribution: 'Map data &copy; OpenStreetMap, SRTM · style &copy; OpenTopoMap',
      }),
    };
    let activeLayers = [layers.street];
    layers.street.addTo(map);

    function setLayer(name) {
      activeLayers.forEach((l) => map.removeLayer(l));
      if (name === 'satellite') activeLayers = [layers.satellite];
      else if (name === 'hybrid') activeLayers = [layers.hybridBase, layers.hybridLabels];
      else if (name === 'terrain') activeLayers = [layers.terrain];
      else activeLayers = [layers.street];
      activeLayers.forEach((l) => l.addTo(map));
    }

    /* Layers control (Street / Satellite / Hybrid / Terrain) */
    const layersToggle = document.getElementById('layersToggle');
    const layersPanel = document.getElementById('layersPanel');
    if (layersToggle && layersPanel) {
      layersToggle.addEventListener('click', () => {
        const open = layersToggle.getAttribute('aria-expanded') === 'true';
        layersToggle.setAttribute('aria-expanded', String(!open));
        layersPanel.hidden = open;
      });
      layersPanel.querySelectorAll('.map__layer').forEach((btn) => {
        btn.addEventListener('click', () => {
          layersPanel.querySelectorAll('.map__layer').forEach((b) => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          setLayer(btn.dataset.layer);
          layersToggle.setAttribute('aria-expanded', 'false');
          layersPanel.hidden = true;
        });
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.map__layers')) {
          layersToggle.setAttribute('aria-expanded', 'false');
          layersPanel.hidden = true;
        }
      });
    }

    /* Price pins + popup cards */
    PROPS.forEach((p) => {
      const icon = L.divIcon({
        className: '',
        html: `<span class="price-pin" data-pin="${p.id}">${p.tag}</span>`,
        iconSize: null,
        iconAnchor: [30, 13],
      });
      const m = L.marker([p.lat, p.lng], { icon, title: `${p.addr} — ${p.price}` }).addTo(map);
      m.bindPopup(
        `<div class="map-pop">
           <img src="${p.img}" alt="${p.addr}" onerror="akImgFallback(this)">
           <div class="map-pop__body">
             <p class="map-pop__price">${p.price}</p>
             <p class="map-pop__addr">${p.addr}</p>
             <p class="map-pop__meta">${p.city} · ${p.meta}</p>
           </div>
         </div>`,
        { offset: [0, -8], closeButton: false }
      );
      m.on('mouseover', () => { m.openPopup(); cardFor(p.id)?.classList.add('is-hot'); });
      m.on('mouseout', () => { cardFor(p.id)?.classList.remove('is-hot'); });
      m.on('click', () => {
        const card = cardFor(p.id);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('is-hot');
          setTimeout(() => card.classList.remove('is-hot'), 2000);
        }
      });
      markers[p.id] = m;
    });
  }

  /* ---------- Card ↔ pin sync ---------- */
  const cards = [...document.querySelectorAll('.listing[data-prop]')];
  const cardFor = (id) => cards.find((c) => c.dataset.prop === id);

  cards.forEach((card) => {
    card.addEventListener('pointerenter', () => {
      document.querySelector(`.price-pin[data-pin="${card.dataset.prop}"]`)?.classList.add('is-active');
    });
    card.addEventListener('pointerleave', () => {
      document.querySelector(`.price-pin[data-pin="${card.dataset.prop}"]`)?.classList.remove('is-active');
    });
  });

  /* ---------- Filter dropdowns ---------- */
  const filterBtns = document.querySelectorAll('.sbar__btn[data-filter]');
  function closeDropdowns(except) {
    filterBtns.forEach((btn) => {
      if (btn === except) return;
      btn.setAttribute('aria-expanded', 'false');
      const panel = document.querySelector(`[data-panel="${btn.dataset.filter}"]`);
      if (panel) panel.hidden = true;
    });
  }
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = document.querySelector(`[data-panel="${btn.dataset.filter}"]`);
      const open = btn.getAttribute('aria-expanded') === 'true';
      closeDropdowns(btn);
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.hidden = open;
    });
  });
  document.querySelectorAll('.sbar__apply').forEach((b) => {
    b.addEventListener('click', () => closeDropdowns());
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sbar__filter')) closeDropdowns();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDropdowns(); });

  /* Segmented beds/baths */
  document.querySelectorAll('.sbar__segments').forEach((group) => {
    const btns = [...group.querySelectorAll('button')];
    btns.forEach((btn) => btn.addEventListener('click', () => {
      btns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    }));
  });

  /* Save search */
  const save = document.getElementById('saveSearch');
  if (save) {
    save.addEventListener('click', () => {
      save.textContent = 'Saved ✓';
      save.classList.add('is-saved');
      setTimeout(() => { save.textContent = 'Save Search'; save.classList.remove('is-saved'); }, 2400);
    });
  }

  /* View toggle (visual mockup) */
  document.querySelectorAll('.rbar__view').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rbar__view').forEach((b) => {
        b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active'); btn.setAttribute('aria-pressed', 'true');
    });
  });

  /* Location search (mockup) */
  const form = document.getElementById('searchFilters');
  if (form) form.addEventListener('submit', (e) => e.preventDefault());
})();
