/* Alexandra Kerr — homepage interactions
   One easing philosophy: smooth, confident, sub-300ms UI motion. */

/* ?static — QA/export flag: render final state with no motion (used for
   full-page screenshots and client review exports) */
const prefersReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  new URLSearchParams(location.search).has('static');

/* ---------- Image fallback: AK monogram on clay (SKL-034) ---------- */
const AK_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
       <rect width="800" height="600" fill="#CBBBA0"/>
       <rect x="330" y="230" width="140" height="140" fill="none" stroke="#4F5847" stroke-width="2"/>
       <text x="400" y="325" font-family="Georgia, 'Times New Roman', serif" font-size="72"
             fill="#4F5847" text-anchor="middle" dominant-baseline="middle">AK</text>
     </svg>`
  );

function akImgFallback(img) {
  img.onerror = null;
  img.src = AK_FALLBACK;
}
window.akImgFallback = akImgFallback;

/* ---------- Hero video: honor reduced motion / static export ---------- */
const heroVideo = document.querySelector('.hero video');
if (heroVideo && prefersReduced) {
  heroVideo.removeAttribute('autoplay');
  heroVideo.pause();
  heroVideo.load(); // show poster frame instead of motion
}

/* ---------- Nav: solid on scroll ---------- */
const nav = document.querySelector('.nav');

function syncNav() {
  nav.classList.toggle('is-solid', window.scrollY > 40);
}
window.addEventListener('scroll', syncNav, { passive: true });
syncNav();

/* ---------- Side drawer ---------- */
const burger = document.querySelector('.nav__burger');
const drawer = document.getElementById('sideMenu');
const drawerClose = drawer.querySelector('.drawer__close');
let lastFocus = null;

function openDrawer() {
  lastFocus = document.activeElement;
  drawer.hidden = false;
  drawer.offsetHeight; // reflow so the slide-in transition runs
  drawer.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  burger.setAttribute('aria-expanded', 'true');
  drawerClose.focus();
}

function closeDrawer() {
  drawer.classList.remove('is-open');
  document.body.style.overflow = '';
  burger.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => { drawer.hidden = true; }, prefersReduced ? 0 : 300);
  if (lastFocus) lastFocus.focus();
}

burger.addEventListener('click', openDrawer);

drawer.addEventListener('click', (e) => {
  if (e.target.closest('[data-drawer-close]')) { closeDrawer(); return; }
  const link = e.target.closest('a');
  if (!link) return;
  if (link.getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }
  closeDrawer();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
});

/* accordion groups (About, Home Search, Buyers, Sellers, Compass Services) */
drawer.querySelectorAll('.drawer__toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.drawer__group');
    const open = group.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
});

/* ---------- Eased stat counters (SKL-027) ---------- */
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const format = (n) => prefix + n.toLocaleString('en-US') + suffix;

  if (prefersReduced) {
    el.textContent = format(target);
    return;
  }
  const duration = 1500;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = format(Math.round(easeOutQuint(t) * target));
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- Scroll reveals + counter triggering ----------
   A plain position check (rAF-throttled) instead of a one-shot
   IntersectionObserver: large scroll jumps can skip an element past the
   viewport in a single frame, which IO never reports — leaving sections
   permanently hidden. This check also catches already-passed elements. */
let pendingReveals = [...document.querySelectorAll('.reveal')];
let pendingStats = [...document.querySelectorAll('.stat__num')];

function checkInView() {
  const limit = window.innerHeight - 60;
  pendingReveals = pendingReveals.filter((el) => {
    if (el.getBoundingClientRect().top < limit) {
      el.classList.add('is-in');
      return false;
    }
    return true;
  });
  pendingStats = pendingStats.filter((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      animateCount(el);
      return false;
    }
    return true;
  });
}

if (prefersReduced) {
  pendingReveals.forEach((el) => el.classList.add('is-in'));
  pendingStats.forEach((el) => animateCount(el));
  pendingReveals = [];
  pendingStats = [];
} else {
  let ticking = false;
  const onScroll = () => {
    if (ticking || (!pendingReveals.length && !pendingStats.length)) return;
    ticking = true;
    requestAnimationFrame(() => {
      checkInView();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  checkInView();
}

/* ---------- Testimonial carousel ---------- */
const carousel = document.querySelector('.carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.carousel__slide')];
  const dotsWrap = carousel.querySelector('.carousel__dots');
  let index = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Testimonial ${i + 1} of ${slides.length}`);
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', () => {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle('is-active', j === index));
    dots.forEach((d, j) => d.setAttribute('aria-selected', String(j === index)));
  }

  carousel.querySelectorAll('.carousel__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      goTo(index + Number(btn.dataset.dir));
      restart();
    });
  });

  function restart() {
    if (prefersReduced) return; // no auto-play under reduced motion
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 6000);
  }
  carousel.addEventListener('pointerenter', () => clearInterval(timer));
  carousel.addEventListener('pointerleave', restart);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(timer);
    else restart();
  });
  restart();
}

/* ---------- Newsletter form (frontend-only mockup) ---------- */
const form = document.querySelector('.newsletter__form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailField = form.querySelector('#nl-email');
    const fieldWrap = emailField.closest('.field');
    const error = fieldWrap.querySelector('.field__error');
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
    fieldWrap.classList.toggle('is-error', !valid);
    error.hidden = valid;
    if (!valid) {
      emailField.focus();
      return;
    }
    const btn = form.querySelector('.newsletter__submit');
    btn.textContent = 'Signed Up ✓';
    btn.disabled = true;
  });
}
