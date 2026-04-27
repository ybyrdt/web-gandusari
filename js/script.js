// ── PAGE LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 600);
});

// ── SCROLL UP BUTTON ──
window.addEventListener('scroll', () => {
  document.getElementById('scrollUp').classList.toggle('visible', window.scrollY > 400);
});

// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.background =
    window.scrollY > 60 ? 'rgba(10,10,10,0.99)' : 'rgba(20,20,20,0.97)';
});

// ── PARALLAX HERO BG ──
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero) hero.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
});

// ── FLOATING PARTICLES ──
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${8 + Math.random() * 14}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${0.2 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
})();

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // also animate section heading divider
      const heading = entry.target.closest('.section-heading') || entry.target.querySelector('.section-heading');
      if (heading) heading.classList.add('animate-in');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animate all section headings
const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      const divider = entry.target.querySelector('.divider');
      if (divider) divider.style.transform = 'scaleX(1)';
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.section-heading').forEach(el => headingObserver.observe(el));

// ── COUNTER ANIMATION ──
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const rawText = el.dataset.raw || el.textContent;
    el.dataset.raw = rawText;
    const match = rawText.match(/(\d+)/);
    if (!match) return;
    const target = parseInt(match[1]);
    const suffix = el.querySelector('sup') ? `<sup>${el.querySelector('sup').textContent}</sup>` : '';
    const prefix = rawText.split(match[1])[0];
    let current = 0;
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      current = Math.round(ease * target);
      el.innerHTML = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else {
        el.innerHTML = prefix + target + suffix;
        el.closest('.stat-item')?.classList.add('counted');
      }
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ── HERO TYPEWRITER CURSOR REMOVE after delay ──
setTimeout(() => {
  const title = document.querySelector('.hero-title');
  if (title) title.classList.add('typed');
}, 3200);

// ── SMOOTH SECTION HEADING DIVIDER (CSS driven, just trigger) ──
document.querySelectorAll('.divider').forEach(d => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) d.style.transform = 'scaleX(1)';
  }, { threshold: 0.5 }).observe(d);
});

// ── NAVBAR ACTIVE SECTION HIGHLIGHT ──
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.closest('.nav-item')?.classList.toggle(
          'active', href && href.includes(id) && id.length > 2
        );
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// READ MORE BUTTON
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.news-card');
    card.classList.toggle('open');

    btn.textContent = card.classList.contains('open')
      ? 'Tutup'
      : 'Baca Selengkapnya';
  });
});