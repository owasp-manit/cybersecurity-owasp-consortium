// ===== MAIN ENTRY — OWASP CONSORTIUM MANIT BHOPAL =====
import './styles/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initMatrixBackground } from './three/MatrixBackground.js';
import { HeroScene } from './three/HeroScene.js';
import { Router } from './router.js';
import { renderHome } from './pages/Home.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderEventsPage } from './pages/EventsPage.js';
import { renderGalleryPage } from './pages/GalleryPage.js';
import { renderSponsorsPage } from './pages/SponsorsPage.js';
import { renderTeamPage } from './pages/TeamPage.js';
import { renderContactPage } from './pages/ContactPage.js';
import { events } from './data/events.js';

gsap.registerPlugin(ScrollTrigger);

// ── State ──
let bgScene = null;
let heroScene = null;
let lenis = null;

// ============================================================
// PRELOADER
// ============================================================
function runPreloader() {
  return new Promise(resolve => {
    const preloader = document.getElementById('preloader');
    const status = preloader.querySelector('.preloader__status');
    const barFill = preloader.querySelector('.preloader__bar-fill');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in',
          onComplete: () => {
            preloader.style.display = 'none';
            preloader.classList.add('done');
            resolve();
          }
        });
      }
    });

    // Show status
    tl.to(status, { opacity: 1, duration: 0.3 }, 0.5);

    // Animate progress bar
    tl.to(barFill, {
      width: '100%',
      duration: 1.5,
      ease: 'power1.inOut'
    }, 0.8);

    // Hold before fading out
    tl.to({}, { duration: 0.5 });
  });
}

// ============================================================
// SMOOTH SCROLLING (LENIS)
// ============================================================
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  window.lenis = lenis;

  lenis.on('scroll', (e) => {
    ScrollTrigger.update();
    if (bgScene) bgScene.updateScroll(e.animatedScroll);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ============================================================
// BACKGROUNDS & 3D
// ============================================================
function initBackground() {
  // Start matrix rain
  // initMatrixBackground(); // Disabled in favor of tech-grid-bg
}

// ============================================================
// CUSTOM CURSOR REMOVED
// ============================================================

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  });

  // Hamburger
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);

      if (isOpen) {
        const links = mobileNav.querySelectorAll('.mobile-nav__link');
        gsap.fromTo(links,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
        );
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }
}

// ============================================================
// HERO ANIMATIONS (ENTRANCE & TERMINAL)
// ============================================================
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.2 });

  // 1. Grid & Haze fade in
  tl.fromTo('.tech-grid-bg', { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 0);
  
  // 2. 3D canvas scale up (instead of container, to avoid scroll conflict)
  tl.fromTo('.hero__3d-container canvas', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, 0.5);

  // 3. Left content text stagger
  tl.fromTo('.hero__identity, .hero__heading span, .hero__desc, .hero__tagline, .hero__ctas',
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
    0.8
  );

  tl.fromTo('.hero__scroll', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.5);

  // Animate hero counter numbers
  document.querySelectorAll('.hero__live-stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    setTimeout(() => requestAnimationFrame(step), 900);
  });
}

// ============================================================
// SCROLL ANIMATIONS (GSAP SCROLLTRIGGER)
// ============================================================
function initScrollAnimations() {
  // Kill existing triggers
  ScrollTrigger.getAll().forEach(t => t.kill());

  // Hero Parallax
  if (document.querySelector('.hero__3d-container')) {
    gsap.to('.hero__3d-container', {
      scale: 0.7,
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Reveal animations
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

}

// ============================================================
// EVENT MODAL
// ============================================================
function initEventModal() {
  const modal = document.getElementById('event-modal');
  const backdrop = modal.querySelector('.event-modal__backdrop');
  const content = modal.querySelector('.event-modal__content');

  function openModal(eventId) {
    const event = events.find(e => e.id === parseInt(eventId));
    if (!event) return;

    content.innerHTML = `
      <button class="event-modal__close" aria-label="Close">✕</button>
      <img class="event-modal__image" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" alt="${event.title}" />
      <div class="event-modal__body">
        <span class="event-modal__tag">${event.category}</span>
        <h2 class="event-modal__title">${event.title}</h2>
        <div class="event-modal__meta">
          <div class="event-modal__meta-item">📅 <span>${event.day} ${event.month} ${event.year}</span></div>
          <div class="event-modal__meta-item">📍 <span>${event.location}</span></div>
          ${event.venue ? `<div class="event-modal__meta-item">🏛 <span>${event.venue}</span></div>` : ''}
        </div>
        <div class="event-modal__divider"></div>
        <h3 class="event-modal__desc-title">About the Event</h3>
        <p class="event-modal__desc">${event.fullDescription || event.description}</p>
        ${event.speakers ? `
          <h3 class="event-modal__desc-title">Speakers</h3>
          <p class="event-modal__desc">${event.speakers.join(', ')}</p>
        ` : ''}
        <div class="event-modal__cta-row">
          <a href="${event.registrationLink || '#'}" class="btn btn--primary">Register <span class="btn-arrow">→</span></a>
          <button class="btn event-modal__close-btn">Close</button>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(content,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    // Close handlers
    const closeBtn = content.querySelector('.event-modal__close');
    const closeBtnAlt = content.querySelector('.event-modal__close-btn');
    const closeModal = () => {
      gsap.to(content, {
        opacity: 0, scale: 0.95, y: 20,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    };

    closeBtn?.addEventListener('click', closeModal);
    closeBtnAlt?.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
  }

  // Delegate click for event cards
  document.addEventListener('click', (e) => {
    const eventTrigger = e.target.closest('[data-event-id]');
    if (eventTrigger) {
      openModal(eventTrigger.dataset.eventId);
    }
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// CTF FILTER
// ============================================================
function initCTFFilter() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-ctf-filter]');
    if (!tab) return;

    const filter = tab.dataset.ctfFilter;
    const grid = document.getElementById('ctf-challenges-grid');
    if (!grid) return;

    // Update active tab
    tab.closest('.ctf-categories__tabs')?.querySelectorAll('.ctf-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Filter cards
    grid.querySelectorAll('.challenge-card').forEach(card => {
      const cat = card.dataset.ctfCategory;
      card.style.display = (filter === 'All' || cat === filter) ? '' : 'none';
    });
  });
}

// ============================================================
// EVENTS PAGE FILTER
// ============================================================
function initEventsFilter() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-event-filter]');
    if (!tab) return;

    const filter = tab.dataset.eventFilter;

    // Update active tab
    tab.closest('.events-filter__body')?.querySelectorAll('.filter-pill').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Filter cards in all grids
    document.querySelectorAll('.event-card[data-category]').forEach(card => {
      const cat = card.dataset.category;
      const matches = filter === 'All' || cat.toUpperCase() === filter.toUpperCase();
      card.style.display = matches ? '' : 'none';
    });

    // Hide section blocks if all their cards are hidden
    document.querySelectorAll('.events-section-block').forEach(block => {
      const grid = block.querySelector('.events-page__grid');
      if (!grid) return;
      const visible = Array.from(grid.querySelectorAll('.event-card')).some(c => c.style.display !== 'none');
      block.style.display = visible ? '' : 'none';
    });
  });
}

// ============================================================
// GALLERY FILTER
// ============================================================
function initGalleryFilter() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-gallery-filter]');
    if (!tab) return;

    const filter = tab.dataset.galleryFilter;

    // Update active tab
    tab.closest('.gallery-filters__pills')?.querySelectorAll('.filter-pill').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Filter frames
    document.querySelectorAll('.gallery-frame').forEach(frame => {
      const cat = frame.dataset.category;
      const matches = filter === 'All' || cat.toUpperCase() === filter.toUpperCase();
      frame.style.display = matches ? '' : 'none';
    });
  });
}

// ============================================================
// ROUTER — PAGE RENDERING
// ============================================================
function renderPage(routeName) {
  const container = document.getElementById('page-container');

  const pages = {
    home: renderHome,
    about: renderAboutPage,
    events: renderEventsPage,
    gallery: renderGalleryPage,
    sponsors: renderSponsorsPage,
    team: renderTeamPage,
    contact: renderContactPage,
  };

  const renderFn = pages[routeName] || pages.home;
  container.innerHTML = renderFn();

  // Initialize HeroScene if not present
  if (routeName === 'home') {
    const heroContainer = document.querySelector('.hero__3d-container');
    if (heroContainer) {
      if (!heroScene) {
        heroScene = new HeroScene(heroContainer);
      } else {
        heroContainer.appendChild(heroScene.renderer.domElement);
        heroScene.container = heroContainer;
        heroScene.setVisibility(true);
      }
      // Trigger animations for the new DOM elements
      requestAnimationFrame(() => {
        initHeroAnimations();
      });
    }
  }

  // Toggle hero scene visibility
  if (heroScene) {
    heroScene.setVisibility(routeName === 'home');
  }

  // Re-initialize scroll animations after content change
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    initScrollAnimations();
  });
}

// ============================================================
// INIT
// ============================================================
async function init() {
  // Run preloader
  await runPreloader();

  // Initialize systems
  initLenis();
  initBackground();
  initNavbar();
  initEventModal();
  initEventsFilter();
  initGalleryFilter();

  // Initialize router (renders initial page)
  const router = new Router(renderPage);
  router.init();

  // Initial scroll animation setup
  requestAnimationFrame(() => {
    initScrollAnimations();
  });
}

// Start
init();
