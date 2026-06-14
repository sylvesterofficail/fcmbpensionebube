 /* =============================================
   NAVIGATION SCROLL EFFECT
   ============================================= */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* =============================================
   HAMBURGER MENU
   ============================================= */
const hamburger = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileNavClose');

hamburger.addEventListener('click', () => {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileClose.addEventListener('click', closeMobileNav);
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

function closeMobileNav() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .fade-in').forEach(el => revealObserver.observe(el));

/* =============================================
   ANIMATED COUNTERS
   ============================================= */
function animateCounter(el, target, suffix, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    const display = target > 999 ? Math.floor(start).toLocaleString() : Math.floor(start);
    el.innerHTML = display + '<span class="stat-suffix">' + suffix + '</span>';
    if (start >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

/* =============================================
   FAQ ACCORDION
   ============================================= */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* =============================================
   COOKIE BANNER
   ============================================= */
const cookieBanner = document.getElementById('cookieBanner');

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

if (!getCookie('cookieConsent')) {
  setTimeout(() => cookieBanner.classList.add('show'), 1500);
}

function acceptCookies() {
  setCookie('cookieConsent', 'accepted', 365);
  cookieBanner.classList.remove('show');
}
function rejectCookies() {
  setCookie('cookieConsent', 'rejected', 365);
  cookieBanner.classList.remove('show');
}

/* =============================================
   CAVEAT MODAL
   ============================================= */
const modal = document.getElementById('caveatModal');

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// Show modal once per session
if (!sessionStorage.getItem('caveatShown')) {
  setTimeout(() => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('caveatShown', '1');
  }, 3000);
}

/* =============================================
   NEWSLETTER (stub)
   ============================================= */
function handleNewsletterSubmit(btn) {
  btn.textContent = '✓ Subscribed!';
  btn.disabled = true;
  btn.style.background = '#16A34A';
}

/* =============================================
   SECTION NEWSLETTER FORM
   ============================================= */
function handleSectionNewsletter(btn) {
  const email     = document.getElementById('nl_email').value.trim();
  const firstName = document.getElementById('nl_firstname').value.trim();
  const lastName  = document.getElementById('nl_lastname').value.trim();

  // Basic validation
  if (!firstName) { highlightField('nl_firstname'); return; }
  if (!lastName)  { highlightField('nl_lastname');  return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    highlightField('nl_email'); return;
  }

  // Loading state
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 0.8s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Subscribing…';
  btn.disabled = true;

  // Simulate async — swap to success state
  setTimeout(() => {
    document.getElementById('newsletterFormWrap').style.display = 'none';
    const success = document.getElementById('newsletterSuccess');
    success.style.display = 'flex';
  }, 1200);
}

function highlightField(id) {
  const el = document.getElementById(id);
  el.style.borderColor = '#f87171';
  el.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.18)';
  el.focus();
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 2200);
}

/* Spin keyframe for loading icon */
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);

/* =============================================
   SMOOTH PARALLAX (subtle)
   ============================================= */
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight && hero) {
    hero.querySelector('.hero-bg-pattern').style.transform = `translateY(${scrolled * 0.15}px)`;
  }
}, { passive: true });