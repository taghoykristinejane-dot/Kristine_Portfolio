// Enhanced script.js for Kristine Jane Taghoy

document.addEventListener('DOMContentLoaded', () => {
  /* Accent Toggle */
const accentToggle = document.getElementById('accent-toggle');
const body = document.body;

const accents = ["accent-blue", "accent-green", "accent-purple"];
let savedAccent = localStorage.getItem("accent") || "accent-orange";

/* Apply saved accent on load */
accents.forEach(a => body.classList.remove(a));
if (savedAccent !== "accent-orange") {
  body.classList.add(savedAccent);
}

/* Rotate colors on click */
if (accentToggle) {
  accentToggle.addEventListener("click", () => {
    let currentIndex = accents.indexOf(savedAccent);
    let nextIndex = (currentIndex + 1) % accents.length;
    savedAccent = accents[nextIndex];

    /* Reset and apply */
    accents.forEach(a => body.classList.remove(a));
    body.classList.add(savedAccent);

    localStorage.setItem("accent", savedAccent);
  });
}


  /* AOS Animation */
  if (window.AOS) AOS.init({ duration: 900, once: true, easing: 'ease-out' });

  /* Footer Year */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Mobile Navigation */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      navToggle.setAttribute(
        'aria-expanded',
        navMenu.classList.contains('show')
      );
    });

    navMenu.querySelectorAll('a.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Active Navigation on Scroll — FINAL FIX */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let scrollPos = window.scrollY + 150; // offset for sticky navbar

  sections.forEach(section => {
    const id = section.getAttribute("id");
    const top = section.offsetTop - 200; // adjust entry point
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);


  /* Theme Toggle */
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  const applyTheme = theme => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      root.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  };

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  /* Smooth fade-in on load */
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity .6s ease';
    document.body.style.opacity = 1;
  }, 100);

});

const typingElement = document.querySelector(".typing");

const words = [
  "Frontend Developer",
  "UI/UX Designer",
  "IS Student"
];

let wordIndex = 0;
let charIndex = 0;
let typing = true;

function typeEffect() {
  let currentWord = words[wordIndex];

  if (typing) {
    typingElement.textContent = currentWord.slice(0, charIndex++);
    if (charIndex > currentWord.length) {
      typing = false;
      setTimeout(typeEffect, 1100);
      return;
    }
  } else {
    typingElement.textContent = currentWord.slice(0, charIndex--);
    if (charIndex === 0) {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, typing ? 120 : 80);
}

typeEffect();

// Reveal cards on scroll
const cards = document.querySelectorAll('.project-card');

const revealOnScroll = () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
      card.classList.add("reveal");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Sticky nav shadow effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".sticky-nav");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
