// ============================================
//  AJAY PORTFOLIO V2 — SHARED SCRIPTS
// ============================================

// Year
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

// ---- CURSOR ----
const cur = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;
let cursorVisible = false;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  if (!cursorVisible) {
    cur.style.opacity = '1';
    curR.style.opacity = '1';
    cursorVisible = true;
  }
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
  cur.style.opacity = '0';
  curR.style.opacity = '0';
  cursorVisible = false;
});
document.addEventListener('mouseenter', () => {
  cur.style.opacity = '1';
  curR.style.opacity = '1';
  cursorVisible = true;
});

(function loop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .card, .wid-card, .hero-card, .proj-card, .ccard, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ---- REVEAL ON SCROLL ----
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target); // stop watching once visible
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ---- ACTIVE NAV LINK ----
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(l => {
  const href = l.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) {
    l.classList.add('active');
  }
});

// ---- HEADER SCROLL ----
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Background opacity on scroll
  nav.style.background = scrollY > 40
    ? 'rgba(6,10,14,0.97)'
    : 'rgba(6,10,14,0.88)';

  // Hide nav on scroll down, show on scroll up
  if (scrollY > lastScroll && scrollY > 120) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = scrollY;
}, { passive: true });

// Add transition to nav for smooth hide/show
if (nav) {
  nav.style.transition = 'background 0.3s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)';
}

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // account for fixed nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- MOBILE NAV TOGGLE ----
// Inject mobile menu button if not present
const navInner = document.querySelector('.nav-inner');
const navLinks = document.querySelector('.nav-links');

if (navInner && navLinks) {
  // Create hamburger button
  const menuBtn = document.createElement('button');
  menuBtn.className = 'mobile-menu-btn';
  menuBtn.setAttribute('aria-label', 'Toggle menu');
  menuBtn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  menuBtn.style.cssText = `
    display: none;
    flex-direction: column; gap: 5px;
    background: none; border: 1px solid rgba(0,220,255,0.15);
    border-radius: 5px; padding: 8px 10px; cursor: pointer;
  `;
  menuBtn.querySelectorAll('span').forEach(s => {
    s.style.cssText = 'display:block;width:20px;height:2px;background:var(--cyan);border-radius:2px;transition:all 0.3s ease;';
  });

  // Create mobile drawer
  const drawer = document.createElement('div');
  drawer.className = 'mobile-drawer';
  drawer.style.cssText = `
    display: none; position: fixed; top: 68px; left: 0; right: 0;
    background: rgba(6,10,14,0.97); backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(0,220,255,0.1);
    padding: 1.5rem; flex-direction: column; gap: 0.5rem;
    z-index: 199;
  `;

  // Clone nav links into drawer
  document.querySelectorAll('.nav-link').forEach(link => {
    const clone = link.cloneNode(true);
    clone.style.cssText = `
      display: block; padding: 0.75rem 1rem;
      font-family: var(--ff-mono); font-size: 0.8rem;
      color: #6e8ca8; border-radius: 5px;
      border: 1px solid transparent; transition: all 0.2s;
    `;
    clone.addEventListener('mouseenter', () => { clone.style.color = '#00dcff'; clone.style.background = 'rgba(0,220,255,0.1)'; });
    clone.addEventListener('mouseleave', () => { clone.style.color = '#6e8ca8'; clone.style.background = 'transparent'; });
    clone.addEventListener('click', () => closeMenu());
    drawer.appendChild(clone);
  });

  document.body.appendChild(drawer);
  navInner.appendChild(menuBtn);

  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    drawer.style.display = 'flex';
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }

  function closeMenu() {
    menuOpen = false;
    drawer.style.display = 'none';
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }

  menuBtn.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());

  // Show/hide hamburger based on screen size
  function checkMobile() {
    if (window.innerWidth <= 900) {
      menuBtn.style.display = 'flex';
    } else {
      menuBtn.style.display = 'none';
      closeMenu();
    }
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);
}

// ---- PAGE LOAD ANIMATION ----
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});

// ---- SKILL BAR ANIMATION (for skills.html) ----
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animate');
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.sbar-fill').forEach(b => {
  b.style.animationPlayState = 'paused';
  barObs.observe(b);
});

// ---- PROJECT FILTER (for projects.html) ----
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.proj-card').forEach(card => {
      if (f === 'all' || card.dataset.cat === f) {
        card.style.display = '';
        card.classList.remove('hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
  });
});

// ---- TILT EFFECT ON CARDS ----
document.querySelectorAll('.wid-card, .proj-card, .hero-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * 4;
    const tiltY = ((cx - x) / cx) * 4;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---------- pinned scroll-stack headline reveal ---------- */
(function(){
  const hero = document.querySelector('.stack-hero');
  const words = document.querySelectorAll('.stack-word');
  if (!hero || !words.length) return;
  function update(){
    const rect = hero.getBoundingClientRect();
    const total = hero.offsetHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / total));
    const per = 1 / (words.length + 1);
    words.forEach((w, i) => {
      const threshold = per * (i + 0.4);
      if (progress > threshold) w.classList.add('in');
      else w.classList.remove('in');
    });
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();
