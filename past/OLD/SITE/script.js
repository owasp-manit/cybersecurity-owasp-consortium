/* ============================================================
   OWASP MANIT — Overhauled script.js
   ============================================================ */

"use strict";

// ── HEADER SCROLL STATE ─────────────────────────────────────
const header = document.querySelector(".header");
if (header) {
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ── MOBILE MENU ─────────────────────────────────────────────
const burger = document.querySelector(".header__burger");
const nav    = document.querySelector(".header__nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("nav--open", !isOpen);
    nav.style.cssText = !isOpen
      ? "display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;padding:1rem 1.5rem 1.5rem;background:rgba(5,10,16,0.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);gap:1.25rem;"
      : "";
  });

  // Close on nav link click
  nav.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      nav.style.cssText = "";
    });
  });
}

// ── TYPING ANIMATION ────────────────────────────────────────
const typeEl = document.querySelector(".t-type");
if (typeEl) {
  const text  = typeEl.dataset.text || "";
  let   index = 0;

  const tick = () => {
    typeEl.textContent = text.slice(0, index);
    if (index <= text.length) {
      index++;
      setTimeout(tick, 55);
    }
  };

  // Small delay so it starts after page load
  setTimeout(tick, 600);
}

// ── ROTATING LOG LINES ───────────────────────────────────────
const rotatingLog = document.querySelector("#rotating-log");
const logMessages = [
  "learning networking basics",
  "solving web vuln challenge",
  "setting up practice lab",
  "debugging a CTF payload",
  "reviewing secure code patterns",
  "hosting beginner CTF round",
];

if (rotatingLog) {
  let idx = 0;
  setInterval(() => {
    rotatingLog.style.opacity = "0";
    rotatingLog.style.transform = "translateY(-6px)";
    rotatingLog.style.transition = "opacity 0.3s, transform 0.3s";

    setTimeout(() => {
      idx = (idx + 1) % logMessages.length;
      rotatingLog.textContent = logMessages[idx];
      rotatingLog.style.opacity  = "1";
      rotatingLog.style.transform = "translateY(0)";
    }, 320);
  }, 2400);
}

// ── INTERSECTION OBSERVER UTILITY ───────────────────────────
const createObserver = (callback, options = {}) =>
  new IntersectionObserver(callback, { threshold: 0.2, ...options });

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
const revealObs = createObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      target.classList.add("in-view");
      revealObs.unobserve(target);
    }
  });
});
revealEls.forEach(el => revealObs.observe(el));

// Apply reveal class to section elements automatically
const autoReveal = () => {
  const selectors = [
    ".section__header",
    ".cap-card",
    ".metric-card",
    ".prog-card",
    ".contact-card",
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${i * 0.08}s`;
      revealObs.observe(el);
    });
  });
};
autoReveal();

// ── COUNTER ANIMATION ────────────────────────────────────────
const counters = document.querySelectorAll(".counter");

const animateCounter = (el) => {
  const target   = Number(el.dataset.target || 0);
  const prefix   = el.dataset.prefix || "";
  const suffix   = el.dataset.suffix || "";
  const duration = 1600;
  const start    = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 4);
    el.textContent = `${prefix}${Math.floor(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = `${prefix}${target}${suffix}`;
  };

  requestAnimationFrame(step);
};

const counterObs = createObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    animateCounter(target);
    counterObs.unobserve(target);
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObs.observe(el));

// ── METRIC BAR ANIMATION ────────────────────────────────────
const metricCards = document.querySelectorAll(".metric-card");

const metricObs = createObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      target.classList.add("animated");
      metricObs.unobserve(target);
    }
  });
}, { threshold: 0.3 });

metricCards.forEach(el => metricObs.observe(el));

// ── MOUSE-FOLLOW GLOW ON CARDS ───────────────────────────────
document.querySelectorAll(".cap-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
});

// ── CONTACT FORM ─────────────────────────────────────────────
const form       = document.getElementById("cipher-form");
const formStatus = document.getElementById("form-status");

if (form && formStatus) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn          = form.querySelector("button[type='submit']");
    const btnSpan      = btn.querySelector("span");
    const originalText = btnSpan.textContent;

    btn.disabled         = true;
    btnSpan.textContent  = "Sending...";
    formStatus.textContent = "Connecting to community...";
    formStatus.style.color = "var(--text-muted)";

    setTimeout(() => {
      formStatus.textContent = "✓ Welcome aboard! Message sent.";
      formStatus.style.color = "var(--green)";
      btnSpan.textContent    = "Message Sent ✓";
      form.reset();

      setTimeout(() => {
        btn.disabled         = false;
        btnSpan.textContent  = originalText;
        formStatus.textContent = "Ready to connect...";
        formStatus.style.color = "";
      }, 4500);
    }, 1600);
  });
}

// ── NODE CANVAS ──────────────────────────────────────────────
(function initNodeCanvas() {
  const canvas = document.getElementById("node-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H, particles = [];

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildParticles();
  };

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.r  = Math.random() * 2.5 + 2.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgb(255, 0, 68)";
      ctx.fill();
    }
  }

  const buildParticles = () => {
    const count = Math.floor((W * H) / 4000);
    particles = Array.from({ length: count }, () => new Particle());
  };

  const drawEdges = () => {
    const maxDist = 180;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          const alpha = (1 - d / maxDist) * 0.8;
          ctx.beginPath();
          ctx.strokeStyle = `rgb(255, 0, 168,${alpha})`;
          ctx.lineWidth   = 1.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawEdges();
    requestAnimationFrame(loop);
  };

  window.addEventListener("resize", resize, { passive: true });
  resize();
  loop();
})();
