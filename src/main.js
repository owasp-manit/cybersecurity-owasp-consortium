// ===== MAIN ENTRY — OWASP CONSORTIUM MANIT BHOPAL =====
import './styles/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Router } from './router.js';
import { renderHome, initMatrixHero } from './pages/Home.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderEventsPage } from './pages/EventsPage.js';
import { renderGalleryPage } from './pages/GalleryPage.js';
import { renderSponsorsPage } from './pages/SponsorsPage.js';
import { renderTeamPage } from './pages/TeamPage.js';
import { renderContactPage } from './pages/ContactPage.js';
import { events } from './data/events.js';
import { initGraphics } from './graphics.js';

gsap.registerPlugin(ScrollTrigger);

// ── State ──
let secureScene = null;
let lenis = null;
let cdInterval = null;
let eventModalListenersAdded = false;



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
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  let lastNavFocus = null;

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.currentRouteName === 'home') {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 80);
    } else {
      navbar.classList.add('navbar--scrolled');
    }
  });

  // Hamburger
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);

      if (isOpen) {
        lastNavFocus = document.activeElement;
        const links = mobileNav.querySelectorAll('.mobile-nav__link');
        gsap.fromTo(links,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
        );
        // Focus close button on open
        setTimeout(() => mobileNavClose?.focus(), 100);
      } else {
        if (lastNavFocus) lastNavFocus.focus();
      }
    });

    // Close on link click or close button
    const closeNav = () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      if (lastNavFocus) {
        lastNavFocus.focus();
        lastNavFocus = null;
      }
    };

    mobileNavClose?.addEventListener('click', closeNav);

    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Trap focus inside mobile nav when open
    mobileNav.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeNav();
      }
      if (e.key === 'Tab') {
        const focusable = mobileNav.querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }
}

// ============================================================
// HERO V2 ANIMATIONS
// ============================================================
function initHeroV2() {


  // IST Clock
  const clockEl = document.getElementById('hero-clock');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      const ist = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).format(now);
      clockEl.textContent = ist + ' IST';
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Hero entrance: staggered fade-up
  gsap.fromTo('.hero-v2__tagrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.05 });
  gsap.fromTo('.hero-v2__title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.18 });
  gsap.fromTo('.hero-v2__rule', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'none', delay: 0.28 });
  gsap.fromTo('.hero-v2__desc-row', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.36 });
  gsap.fromTo('.hero-v2__stage', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.50 });
  gsap.fromTo('.hero-v2__stats', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.65 });

  // Scramble text effect
  const scrambleEls = document.querySelectorAll('.scramble-text');
  scrambleEls.forEach(el => {
    const original = el.innerText;
    const chars = '!<>-_\\\\/[]{}—=+*^?#_0123456789X@$';
    let frame = 0;
    const totalFrames = 30;
    const update = () => {
      let result = '';
      for (let i = 0; i < original.length; i++) {
        if (original[i] === ' ') { result += ' '; continue; }
        if (frame > (totalFrames * (i / original.length))) {
          result += original[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.innerText = result;
      if (frame < totalFrames) {
        frame++;
        setTimeout(() => requestAnimationFrame(update), 30);
      } else {
        el.innerText = original;
      }
    };
    setTimeout(update, 200); // slight delay to sync with fade in
  });

  // Magnetic buttons
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    });
  });

  // Hero parallax tilt
  document.addEventListener('mousemove', (e) => {
    const tilts = document.querySelectorAll('.hero-tilt');
    tilts.forEach(tilt => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(tilt, { rotationY: x, rotationX: -y, duration: 1, ease: 'power2.out' });
    });
  });

  // Background parallax and spotlight
  const bgImage = document.getElementById('global-bg-image');
  const spotlight = document.getElementById('cursor-spotlight');

  if (bgImage) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(bgImage, { xPercent: x * -1.5, yPercent: y * -1.5, duration: 1, ease: 'power2.out' });

      if (spotlight) {
        spotlight.style.opacity = '1';
        spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.06), transparent 40%)`;
      }
    });
  }

  // Glitch effect on headline
  const headline = document.querySelector('.glitch-container');
  if (headline) {
    setInterval(() => {
      if (Math.random() > 0.8) {
        headline.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
          headline.style.transform = 'translate(0,0)';
        }, 50);
      }
    }, 2000);
  }

  // Typing effect for subtext
  const subtextEl = document.getElementById('hero-subtext');
  if (subtextEl) {
    const text = "MANIT Bhopal's official cybersecurity community. We learn, build and secure.";
    let i = 0;
    subtextEl.innerHTML = '<span class="cursor">_</span>';
    const typeWriter = () => {
      if (i < text.length) {
        subtextEl.innerHTML = text.substring(0, i + 1) + '<span class="cursor" style="animation:blink 1s infinite; color:#ff1a1a;">_</span>';
        i++;
        setTimeout(typeWriter, Math.random() * 50 + 30);
      }
    };
    setTimeout(typeWriter, 1000);
  }

  // Terminal looping session
  const termEl = document.getElementById('hero-terminal-typing');
  if (termEl) {
    const lines = [
      "$ nmap -sV manit.ac.in",
      "[+] 3 open ports",
      "$ ./ctf --start",
      "[+] flag captured"
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let currentHtml = "";

    const termTypeWriter = () => {
      if (lineIdx >= lines.length) {
        setTimeout(() => {
          lineIdx = 0;
          charIdx = 0;
          currentHtml = "";
          termEl.innerHTML = "";
          termTypeWriter();
        }, 3000);
        return;
      }

      const line = lines[lineIdx];
      if (charIdx < line.length) {
        termEl.innerHTML = currentHtml + line.substring(0, charIdx + 1) + '<span style="animation:blink 1s infinite; color:#fff;">_</span>';
        charIdx++;
        setTimeout(termTypeWriter, Math.random() * 50 + 30);
      } else {
        currentHtml += line + "\n";
        termEl.innerHTML = currentHtml + '<span style="animation:blink 1s infinite; color:#fff;">_</span>';
        lineIdx++;
        charIdx = 0;
        setTimeout(termTypeWriter, 500);
      }
    };
    setTimeout(termTypeWriter, 2000);
  }

  // Count-up stats on scroll
  const statNums = document.querySelectorAll('.hero-v2__stat-num[data-target]');
  if (statNums.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let current = 0;
          const step = target / 40;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current);
            if (current >= target) clearInterval(timer);
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => observer.observe(el));
  }


}

// ============================================================
// SCROLL ANIMATIONS (GSAP SCROLLTRIGGER)
// ============================================================
function initScrollAnimations() {
  // Kill existing triggers
  ScrollTrigger.getAll().forEach(t => t.kill());

  // Hero Parallax and Background dimming
  if (document.querySelector('#global-bg-image')) {
    gsap.to('#global-bg-image', {
      filter: 'brightness(0.35)',
      yPercent: 3,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }

  // Hero Socials to Sidebar animation
  const heroSocials = document.getElementById('hero-socials');
  const socialBar = document.getElementById('social-bar');

  if (heroSocials && socialBar) {
    // Initial state: hide social bar
    gsap.set(socialBar, { opacity: 0, x: 50 });

    // Animate hero socials away
    gsap.to(heroSocials, {
      x: 150, // Move to right side
      opacity: 0,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '35% top',
        scrub: true
      }
    });

    // Bring in the sidebar
    gsap.to(socialBar, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: '#hero',
        start: '15% top',
        end: '45% top',
        scrub: true
      }
    });
  }

  // Hide social bar when footer is in view
  if (document.querySelector('.footer')) {
    ScrollTrigger.create({
      trigger: '.footer',
      start: 'top 90%',
      onEnter: () => document.getElementById('social-bar')?.classList.add('social-bar--hidden'),
      onLeaveBack: () => document.getElementById('social-bar')?.classList.remove('social-bar--hidden')
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
  if (!modal) return;
  const backdrop = modal.querySelector('.event-modal__backdrop');
  const content = modal.querySelector('.event-modal__content');
  let lastFocusedElement = null;

  const closeModal = () => {
    gsap.to(content, {
      opacity: 0, scale: 0.95, y: 20,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (lastFocusedElement) {
          lastFocusedElement.focus();
        }
      }
    });
  };

  function openModal(eventId) {
    const event = events.find(e => e.id === parseInt(eventId));
    if (!event) return;

    lastFocusedElement = document.activeElement;

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'event-modal-title');

    content.innerHTML = `
      <button class="event-modal__close" aria-label="Close" style="cursor:pointer;">✕</button>
      <img class="event-modal__image" src="${event.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'}" alt="${event.title}" />
      <div class="event-modal__body">
        <span class="event-modal__tag">${event.category}</span>
        <h2 id="event-modal-title" class="event-modal__title">${event.title}</h2>
        <div class="event-modal__meta">
          <div class="event-modal__meta-item">📅 <span>${event.day} ${event.month} ${event.year}</span></div>
          <div class="event-modal__meta-item">📍 <span>${event.location}</span></div>
          ${event.venue ? `<div class="event-modal__meta-item">🏛 <span>${event.venue}</span></div>` : ''}
        </div>
        <div class="event-modal__divider"></div>
        <h3 class="event-modal__desc-title">About the Event</h3>
        <p class="event-modal__desc">${event.fullDescription || event.description}</p>
        ${event.speakers && event.speakers.length > 0 ? `
          <h3 class="event-modal__desc-title">Speakers</h3>
          <p class="event-modal__desc">${event.speakers.join(', ')}</p>
        ` : ''}
        <div class="event-modal__cta-row">
          ${event.registrationLink ? `<a href="${event.registrationLink}" target="_blank" rel="noopener" class="btn btn--primary">Register <span class="btn-arrow">→</span></a>` : `<button class="btn btn--primary" disabled style="opacity:0.5; cursor:not-allowed;">Registration Closed</button>`}
          <button class="btn event-modal__close-btn" style="cursor:pointer;">Close</button>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(content,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    const closeBtn = content.querySelector('.event-modal__close');
    const closeBtnAlt = content.querySelector('.event-modal__close-btn');

    closeBtn?.addEventListener('click', closeModal);
    closeBtnAlt?.addEventListener('click', closeModal);
    closeBtn?.focus();
  }

  if (!eventModalListenersAdded) {
    backdrop?.addEventListener('click', closeModal);

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
        closeModal();
      }

      // Focus trapping
      if (e.key === 'Tab' && modal.classList.contains('open')) {
        const focusable = content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
    eventModalListenersAdded = true;
  }
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

    const searchInput = document.getElementById('events-search');
    const term = searchInput ? searchInput.value.toLowerCase() : '';

    // Filter cards in all grids
    document.querySelectorAll('.event-card[data-category]').forEach(card => {
      const cat = card.dataset.category;
      const title = card.dataset.title || '';
      const matchesCat = filter === 'All' || cat.toUpperCase() === filter.toUpperCase();
      const matchesSearch = title.includes(term);
      card.style.display = (matchesCat && matchesSearch) ? '' : 'none';
    });

    // Hide section blocks if all their cards are hidden
    document.querySelectorAll('.events-section-block').forEach(block => {
      const hasVisible = Array.from(block.querySelectorAll('.event-card')).some(c => c.style.display !== 'none');
      block.style.display = hasVisible ? '' : 'none';
    });
  });
}

function initEventsPageScripts() {
  const cd = document.getElementById('countdown');
  if (cd) {
    const updateCD = () => {
      const target = new Date(cd.getAttribute('data-date')).getTime();
      const now = new Date().getTime();
      const diff = target - now;
      if (diff < 0) return;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      const cdD = document.getElementById('cd-d');
      const cdH = document.getElementById('cd-h');
      const cdM = document.getElementById('cd-m');
      const cdS = document.getElementById('cd-s');
      if (cdD) cdD.innerText = d.toString().padStart(2, '0');
      if (cdH) cdH.innerText = h.toString().padStart(2, '0');
      if (cdM) cdM.innerText = m.toString().padStart(2, '0');
      if (cdS) cdS.innerText = s.toString().padStart(2, '0');
    };
    if (cdInterval) clearInterval(cdInterval);
    cdInterval = setInterval(updateCD, 1000);
    updateCD();
  }

  document.querySelectorAll('.view-btn').forEach(btn => {
    // Need to clear old listeners if re-rendered, but they are newly created dom nodes
    btn.addEventListener('click', (e) => {
      const view = e.target.dataset.view;
      const viewGrid = document.getElementById('view-grid');
      const viewTimeline = document.getElementById('view-timeline');
      const viewTerminal = document.getElementById('view-terminal');
      if (viewGrid) viewGrid.style.display = view === 'grid' ? 'grid' : 'none';
      if (viewTimeline) viewTimeline.style.display = view === 'timeline' ? 'block' : 'none';
      if (viewTerminal) viewTerminal.style.display = view === 'terminal' ? 'block' : 'none';
    });
  });

  const searchInput = document.getElementById('events-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const activeFilterTab = document.querySelector('.events-filter__body .filter-pill.active');
      const currentFilter = activeFilterTab ? activeFilterTab.dataset.eventFilter : 'All';

      document.querySelectorAll('.event-card[data-category]').forEach(card => {
        const cat = card.dataset.category;
        const title = card.dataset.title || '';
        const matchesCat = currentFilter === 'All' || cat.toUpperCase() === currentFilter.toUpperCase();
        const matchesSearch = title.includes(term);
        card.style.display = (matchesCat && matchesSearch) ? '' : 'none';
      });

      document.querySelectorAll('.events-section-block').forEach(block => {
        const hasVisible = Array.from(block.querySelectorAll('.event-card')).some(c => c.style.display !== 'none');
        block.style.display = hasVisible ? '' : 'none';
      });
    });
  }
}

function initContactPageScripts() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('contact-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'SENDING...';
      btn.disabled = true;

      setTimeout(() => {
        const container = document.getElementById('contact-form-container');
        const original = container.innerHTML;
        container.innerHTML = '<div style="font-family:var(--font-mono); color:#ff4444; font-size:0.8rem; line-height:1.6;"><div>> init handshake...</div><div>> encrypting payload [256-bit AES]...</div><div>> establishing secure tunnel...</div><div style="margin-top:1rem;">[ERROR] Connection refused. No backend service configured to handle this request. Please contact us via email directly.</div></div>';

        setTimeout(() => {
          container.innerHTML = original;
          initContactPageScripts();
        }, 5000);
      }, 1500);
    });
  }
}

function initSponsorsPageScripts() {
  const form = document.getElementById('sponsor-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('sp-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'SUBMITTING...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        const note = form.querySelector('.cf-note');
        if (note) {
          const originalNote = note.innerText;
          note.innerText = '[ERROR] Submission failed: No backend configured.';
          note.style.color = '#ff4444';
          setTimeout(() => {
            note.innerText = originalNote;
            note.style.color = '';
          }, 5000);
        }
      }, 1500);
    });
  }
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
  if (cdInterval) {
    clearInterval(cdInterval);
    cdInterval = null;
  }

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

  window.currentRouteName = routeName;
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (routeName === 'home') {
      navbar.classList.remove('navbar--scrolled');
      if (window.scrollY > 80) navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.add('navbar--scrolled');
    }
  }

  if (routeName === 'home') {
    const startHero = () => requestAnimationFrame(() => initHeroV2());
    if (window.__preloaderDone) {
      startHero();
    } else {
      window.addEventListener('preloader:done', startHero, { once: true });
    }
  } else {
    if (!window.__appReady) {
      window.__appReady = true;
      window.dispatchEvent(new Event('app:ready'));
    }
    if (routeName === 'events') {
      requestAnimationFrame(() => {
        initEventsPageScripts();
      });
    } else if (routeName === 'contact') {
      requestAnimationFrame(() => {
        initContactPageScripts();
      });
    } else if (routeName === 'sponsors') {
      requestAnimationFrame(() => {
        initSponsorsPageScripts();
      });
    }
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
  // Initialize router (renders initial page, dispatches app:ready)
  const router = new Router(renderPage);
  router.init();

  // Initialize systems
  initLenis();
  initBackground();
  initNavbar();
  initEventModal();
  initEventsFilter();
  initGalleryFilter();

  // Initialize Team interactions
  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.team-member-card');
    const hud = document.getElementById('team-stats-hud');
    if (card && hud) {
      document.getElementById('hud-name').innerText = card.dataset.memberName;
      document.getElementById('hud-role').innerText = card.dataset.memberRole;
      document.getElementById('hud-level').innerText = card.dataset.memberLevel;
      document.getElementById('hud-nodes').innerText = card.dataset.memberNodes;
      hud.classList.add('visible');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.team-member-card');
    const hud = document.getElementById('team-stats-hud');
    if (card && hud) {
      hud.classList.remove('visible');
    }
  });

  // Hacking decrypt on Event click
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-event-id]');
    if (!btn) return;
    const title = document.querySelector('.event-modal__title');
    if (title) {
      const original = title.innerText;
      const chars = '!<>-_\\\\/[]{}—=+*^?#_0123456789X@$';
      let frame = 0;
      const totalFrames = 20;
      const update = () => {
        let result = '';
        for (let i = 0; i < original.length; i++) {
          if (frame > (totalFrames * (i / original.length))) {
            result += original[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        title.innerText = result;
        if (frame < totalFrames) {
          frame++;
          setTimeout(() => requestAnimationFrame(update), 30);
        } else {
          title.innerText = original;
        }
      };
      update();
    }
  });

  // Gallery cylinder rotation
  if (window.lenis) {
    window.lenis.on('scroll', (e) => {
      const cylinder = document.getElementById('gallery-cylinder');
      if (cylinder) {
        const angle = (e.animatedScroll / 2000) * 360;
        cylinder.style.transform = `rotateY(${angle}deg)`;
      }
    });
  }

  // Initial scroll animation setup
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    initScrollAnimations();
    const currentHash = window.location.hash || '#/';
    if (currentHash === '#/') {
      if (window.__preloaderDone) {
        initHeroV2();
      }
    }
  });

  // Footer clock
  const updateFooterClock = () => {
    const el = document.getElementById('footer-clock');
    if (!el) return;
    const now = new Date();
    const ist = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }).format(now);
    el.textContent = ist + ' IST';
  };
  setInterval(updateFooterClock, 1000);
  updateFooterClock();

  // Glass specular highlight on mouse move
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.glass-specular').forEach(el => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mouse-x', x + '%');
      el.style.setProperty('--mouse-y', y + '%');
    });
  });

  // Global image error fallback
  document.addEventListener('error', function (e) {
    if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
      if (!e.target.dataset.fallbackApplied) {
        e.target.dataset.fallbackApplied = "true";
        e.target.src = 'https://ui-avatars.com/api/?name=Image&background=000000&color=ffffff&font-size=0.33';
      }
    }
  }, true);

  // Initialize new 3D graphics & cursor
  initGraphics();
}
// Start
init();
