// ============================================================
// PORTFOLIO JAVASCRIPT
// Typing animation | Scroll effects | Nav | Form | Skills
// ============================================================

// ── TYPING ANIMATION ──────────────────────────────────────────
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Full Stack Developer',
  'UI/UX Enthusiast',
  'React Developer',
  'Problem Solver',
  'Open Source Lover'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex--);
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex > current.length) {
    delay = 1800; isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    delay = 300;
  }
  setTimeout(type, delay);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 400));

// ── NAVBAR SCROLL BEHAVIOUR ──────────────────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  backToTop.classList.toggle('visible', y > 400);
  updateActiveLink();
  animateSkillBars();
});

// ── MOBILE NAVIGATION ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── ACTIVE NAV LINK ───────────────────────────────────────────
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.closest('.skills-grid, .projects-grid') ? 
        Array.from(el.parentElement.children).indexOf(el) * 100 : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── SKILL BARS ────────────────────────────────────────────────
let skillsAnimated = false;
function animateSkillBars() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const w = bar.dataset.width;
      setTimeout(() => { bar.style.width = w + '%'; }, 200);
    });
  }
}

// ── CONTACT FORM ──────────────────────────────────────────────
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      shakeForm(); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      shakeForm(); return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      successMsg.classList.add('show');
      form.reset();
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        successMsg.classList.remove('show');
      }, 4000);
    }, 1500);
  });
}

function shakeForm() {
  const wrap = document.querySelector('.contact-form-wrap');
  wrap.style.animation = 'shake 0.4s ease';
  setTimeout(() => { wrap.style.animation = ''; }, 400);
}

// Add shake keyframes dynamically
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-8px)}
  40%{transform:translateX(8px)}
  60%{transform:translateX(-5px)}
  80%{transform:translateX(5px)}
}`;
document.head.appendChild(style);

// ── BACK TO TOP ───────────────────────────────────────────────
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── SMOOTH ANCHOR SCROLL ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── CURSOR TRAIL EFFECT (subtle) ──────────────────────────────
document.addEventListener('mousemove', e => {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed;left:${e.clientX}px;top:${e.clientY}px;
    width:4px;height:4px;border-radius:50%;
    background:rgba(57,255,20,0.5);pointer-events:none;
    transform:translate(-50%,-50%);z-index:9999;
    animation:dotFade .6s forwards;
  `;
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 600);
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `@keyframes dotFade{to{opacity:0;transform:translate(-50%,-50%) scale(0)}}`;
document.head.appendChild(trailStyle);

// Initial call
updateActiveLink();
animateSkillBars();
