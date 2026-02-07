const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Mobile nav toggle
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// Smooth scrolling for older browsers
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Theme toggle
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.classList.toggle('dark', savedTheme === 'dark');
} else {
  document.body.classList.toggle('dark', prefersDark.matches);
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

// Reveal on scroll
const revealItems = document.querySelectorAll(
  '.section, .project-card, .skill-card, .mini-card, .edu-card, .contact-item, .stat-card'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});
