/* ============================================================
   OWASP MANIT — Modular Cyber Defense Consortium Logic
   ============================================================ */

"use strict";

// ── Utilities ──
const Utils = {
  createObserver: (callback, options = {}) =>
    new IntersectionObserver(callback, { threshold: 0.2, ...options }),
  clamp: (val, min, max) => Math.max(min, Math.min(max, val)),
  easeOutQuart: (x) => 1 - Math.pow(1 - x, 4)
};

// ── CONFIGURATION ──
const CONFIG = {
  particleCount: 1800,  // Target count of particles on full screen (scaled dynamically)
  maxDistance: 120,   // Maximum distance for line connections
  particleRadius: 0, // Base particle radius
  speed: 0.6,         // Speed multiplier
  lineWidth: 1.0,     // Base width of connection lines
  glow: false,         // Enable glowing particles and lines
  colors: {
    // particle: '255, 0, 68',  // Reddish-pink RGB values
    // line: '255, 0, 168',      // Reddish RGB values
    // glow: '255, 0, 120'       // Reddish glow RGB values
    particle: '0, 180, 68',  // Reddish-pink RGB values
    line: '0, 180, 168',      // Reddish RGB values
    glow: '0, 180, 120'       // Reddish glow RGB values
  }
};

// ── DOM Initialization ──
const injectStyles = () => {
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    #node-canvas {
      position: fixed !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
      z-index: 1 !important;
      opacity: 0.8 !important;
      display: block !important;
      background: transparent !important;
    }
    .ambient {
      position: fixed !important;
      inset: 0 !important;
      z-index: 2 !important;
      pointer-events: none !important;
      background: transparent !important;
    }
    body {
      position: relative !important;
      z-index: 0 !important;
    }
    section, footer, main, .container, .hero__inner, .section__header, .cap-grid, .metrics-grid, .programs-grid, .events__stack, .contact-card {
      position: relative !important;
      z-index: 10 !important;
    }
    .header {
      z-index: 100 !important;
    }
    .corner-hud, .terminal, .progress-wrap, .hud-overlay {
      z-index: 200 !important;
    }
    .scanlines, .vignette {
      z-index: 300 !important;
    }
    .rotating-log-fade {
      opacity: 0 !important;
      transform: translateY(-6px) !important;
      transition: opacity 0.3s, transform 0.3s !important;
    }
    .form-status.sending {
      color: var(--text-muted) !important;
    }
    .form-status.success {
      color: var(--green) !important;
    }
    .header__nav.nav--open {
      display: flex !important;
      flex-direction: column !important;
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      right: 0 !important;
      padding: 1rem 1.5rem 1.5rem !important;
      background: rgba(5, 10, 16, 0.95) !important;
      backdrop-filter: blur(20px) !important;
      border-bottom: 1px solid var(--border) !important;
      gap: 1.25rem !important;
    }
  `;
  document.head.appendChild(styleEl);
};

// ── Header Controller ──
const initHeaderScroll = () => {
  const header = document.querySelector(".header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
};

// ── Navigation Controller ──
const initNavigation = () => {
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("nav--open", !isOpen);
  });

  // Close on nav link click
  nav.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      nav.classList.remove("nav--open");
    });
  });
};

// ── Typing Animation ──
const initTyping = () => {
  const typeEl = document.querySelector(".t-type");
  if (!typeEl) return;
  const text = typeEl.dataset.text || "";
  let index = 0;

  const tick = () => {
    typeEl.textContent = text.slice(0, index);
    if (index <= text.length) {
      index++;
      setTimeout(tick, 55);
    }
  };

  setTimeout(tick, 600);
};

// ── Reveal Animation ──
const initRevealAnimations = () => {
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  const revealObs = Utils.createObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.classList.add("in-view");
        revealObs.unobserve(target);
      }
    });
  });

  window.revealObs = revealObs;

  revealEls.forEach(el => revealObs.observe(el));

  // Automatically apply reveal class to section elements
  const selectors = [
    ".section__header",
    ".cap-card",
    ".metric-card",
    ".prog-card",
    ".contact-card"
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${i * 0.08}s`;
      revealObs.observe(el);
    });
  });
};

// ── Counter Animation ──
const initCounters = () => {
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = Utils.easeOutQuart(progress);
      el.textContent = `${prefix}${Math.floor(target * eased)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const counterObs = Utils.createObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      animateCounter(target);
      counterObs.unobserve(target);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObs.observe(el));
};

// ── Metric Animation ──
const initMetrics = () => {
  const metricCards = document.querySelectorAll(".metric-card");
  const metricObs = Utils.createObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.classList.add("animated");
        metricObs.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  metricCards.forEach(el => metricObs.observe(el));
};

// ── Mouse Glow ──
const initMouseGlow = () => {
  document.querySelectorAll(".cap-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }, { passive: true });
  });
};

// ── Form Handler ──
const initFormHandler = () => {
  const form = document.getElementById("cipher-form");
  const formStatus = document.getElementById("form-status");

  if (!form || !formStatus) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    const btnSpan = btn.querySelector("span");
    const originalText = btnSpan.textContent;

    btn.disabled = true;
    btnSpan.textContent = "Sending...";
    formStatus.textContent = "Connecting to community...";
    formStatus.className = "form-status sending";

    setTimeout(() => {
      formStatus.textContent = "✓ Welcome aboard! Message sent.";
      formStatus.className = "form-status success";
      btnSpan.textContent = "Message Sent ✓";
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btnSpan.textContent = originalText;
        formStatus.textContent = "Ready to connect...";
        formStatus.className = "form-status";
      }, 4500);
    }, 1600);
  });
};

// ── Typing Animation & Rotating Log ──
const initRotatingLog = () => {
  const rotatingLog = document.querySelector("#rotating-log");
  const logMessages = [
    "learning networking basics",
    "solving web vuln challenge",
    "setting up practice lab",
    "debugging a CTF payload",
    "reviewing secure code patterns",
    "hosting beginner CTF round",
  ];

  if (!rotatingLog) return;
  let idx = 0;
  setInterval(() => {
    rotatingLog.classList.add("rotating-log-fade");

    setTimeout(() => {
      idx = (idx + 1) % logMessages.length;
      rotatingLog.textContent = logMessages[idx];
      rotatingLog.classList.remove("rotating-log-fade");
    }, 320);
  }, 2400);
};

// ── Node Background Engine ──
class Particle {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.vx = (Math.random() - 0.5) * 1.0;
    this.vy = (Math.random() - 0.5) * 1.0;
    this.r = Math.random() * 1.2 + 1.2;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  update(width, height, mouse) {
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dSq = dx * dx + dy * dy;
      const mouseRadius = 150;

      if (dSq < mouseRadius * mouseRadius) {
        const d = Math.sqrt(dSq);
        if (d > 0) {
          const force = (mouseRadius - d) / mouseRadius;
          this.x += (dx / d) * force * 2.2;
          this.y += (dy / d) * force * 2.2;
        }
      }
    }

    this.x += this.vx * CONFIG.speed;
    this.y += this.vy * CONFIG.speed;

    const margin = this.r;
    if (this.x < margin) {
      this.x = margin;
      this.vx *= -1;
    } else if (this.x > width - margin) {
      this.x = width - margin;
      this.vx *= -1;
    }

    if (this.y < margin) {
      this.y = margin;
      this.vy *= -1;
    } else if (this.y > height - margin) {
      this.y = height - margin;
      this.vy *= -1;
    }
  }

  draw(ctx, config) {
    const colors = config.colors;

    if (config.glow) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.glow}, ${this.opacity * 0.15})`;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${colors.particle}, ${this.opacity})`;
    ctx.fill();
  }
}

class NodeEngine {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
    this.particles = [];
    this.mouse = { x: null, y: null, active: false, radius: 150 };
    this.animationFrameId = null;
    this.dpr = 1;
    this.width = 0;
    this.height = 0;
    this.grid = new Map();

    this.init();
  }

  init() {
    this.bindEvents();
    this.resize();
    this.loop();
  }

  bindEvents() {
    window.addEventListener("resize", this.handleResize, { passive: true });
    window.addEventListener("mousemove", this.handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", this.handleMouseLeave, { passive: true });
    window.addEventListener("mouseenter", this.handleMouseEnter, { passive: true });
    window.addEventListener("touchmove", this.handleTouchMove, { passive: true });
    window.addEventListener("touchend", this.handleTouchEnd, { passive: true });
  }

  unbindEvents() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseleave", this.handleMouseLeave);
    window.removeEventListener("mouseenter", this.handleMouseEnter);
    window.removeEventListener("touchmove", this.handleTouchMove);
    window.removeEventListener("touchend", this.handleTouchEnd);
  }

  handleResize = () => {
    this.resize();
  };

  handleMouseMove = (e) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.mouse.active = true;
  };

  handleMouseLeave = () => {
    this.mouse.x = null;
    this.mouse.y = null;
    this.mouse.active = false;
  };

  handleMouseEnter = () => {
    this.mouse.active = true;
  };

  handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
      this.mouse.active = true;
    }
  };

  handleTouchEnd = () => {
    this.mouse.x = null;
    this.mouse.y = null;
    this.mouse.active = false;
  };

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;

    this.ctx.scale(this.dpr, this.dpr);

    const area = this.width * this.height;
    let targetCount = Math.floor(area / 4000);
    targetCount = Math.min(this.config.particleCount, Math.max(40, targetCount));

    this.adjustParticles(targetCount);
  }

  adjustParticles(targetCount) {
    if (this.particles.length < targetCount) {
      const needed = targetCount - this.particles.length;
      for (let i = 0; i < needed; i++) {
        this.particles.push(new Particle(
          Math.random() * this.width,
          Math.random() * this.height,
          this.particles.length
        ));
      }
    } else if (this.particles.length > targetCount) {
      this.particles.length = targetCount;
    }
  }

  loop = () => {
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  draw() {
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;

    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";

    for (const p of this.particles) {
      p.update(W, H, this.mouse);
      p.draw(ctx, this.config);
    }

    this.grid.clear();
    const cellSize = this.config.maxDistance;

    for (const p of this.particles) {
      const cx = Math.floor(p.x / cellSize);
      const cy = Math.floor(p.y / cellSize);
      const key = `${cx},${cy}`;
      if (!this.grid.has(key)) {
        this.grid.set(key, []);
      }
      this.grid.get(key).push(p);
    }

    const maxDist = this.config.maxDistance;
    const maxDistSq = maxDist * maxDist;
    const glow = this.config.glow;
    const lineWidth = this.config.lineWidth;
    const colors = this.config.colors;

    for (const p1 of this.particles) {
      const cx = Math.floor(p1.x / cellSize);
      const cy = Math.floor(p1.y / cellSize);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const key = `${cx + dx},${cy + dy}`;
          const neighbors = this.grid.get(key);
          if (!neighbors) continue;

          for (const p2 of neighbors) {
            if (p1.id >= p2.id) continue;

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dSq = dx * dx + dy * dy;

            if (dSq < maxDistSq) {
              const d = Math.sqrt(dSq);
              const baseAlpha = 1 - d / maxDist;

              let brightness = 1.0;
              if (this.mouse.x !== null) {
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                const mdx = midX - this.mouse.x;
                const mdy = midY - this.mouse.y;
                const mDistSq = mdx * mdx + mdy * mdy;
                const activeRadius = 120;
                if (mDistSq < activeRadius * activeRadius) {
                  const mDist = Math.sqrt(mDistSq);
                  brightness = 1.0 + (1.0 - mDist / activeRadius) * 2.0;
                }
              }

              const alpha = Math.min(1.0, baseAlpha * brightness) * 0.25;

              if (glow) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${colors.glow}, ${alpha * 0.2})`;
                ctx.lineWidth = lineWidth * 3.5;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }

              ctx.beginPath();
              ctx.strokeStyle = `rgba(${colors.line}, ${alpha})`;
              ctx.lineWidth = lineWidth;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
    }
  }

  destroy() {
    this.unbindEvents();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

let globalEngine = null;

const initNodeBackground = () => {
  const canvas = document.getElementById("node-canvas");
  if (!canvas) return;

  if (globalEngine) {
    globalEngine.destroy();
  }

  globalEngine = new NodeEngine(canvas, CONFIG);
};

// ── DOM Initialization Bootstrap ──
document.addEventListener("DOMContentLoaded", () => {
  injectStyles();
  initNavigation();
  initHeaderScroll();
  initTyping();
  initRotatingLog();
  initRevealAnimations();
  initCounters();
  initMetrics();
  initMouseGlow();
  initFormHandler();
  initNodeBackground();
});
