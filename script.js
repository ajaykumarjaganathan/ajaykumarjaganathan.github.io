// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Cursor
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .project-card, .whatido-card, .featured-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.background = 'transparent';
    cursor.style.border = '1px solid var(--accent)';
    trail.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--accent)';
    cursor.style.border = 'none';
    trail.style.opacity = '0.4';
  });
});

// Typewriter
const roles = ['AI & ML Engineer', 'Full Stack Developer', 'IoT & Robotics Builder', 'Data Science Student', 'Problem Solver'];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const word = roles[ri];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 80);
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 40);
  }
}
setTimeout(typeLoop, 1000);

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

// Nav active on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const scrollObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => scrollObs.observe(s));

// Smooth scroll nav
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Project filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
    });
  });
});

// Skill bar animation
const bars = document.querySelectorAll('.bar-fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.animationPlayState = 'running'; barObs.unobserve(e.target); } });
}, { threshold: 0.1 });
bars.forEach(b => { b.style.animationPlayState = 'paused'; barObs.observe(b); });

// Header scroll bg
window.addEventListener('scroll', () => {
  document.getElementById('header').style.background = window.scrollY > 50
    ? 'rgba(7, 11, 15, 0.97)' : 'rgba(7, 11, 15, 0.85)';
});
