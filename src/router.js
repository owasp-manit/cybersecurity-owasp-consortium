// ===== SPA ROUTER =====
import { gsap } from 'gsap';

export class Router {
  constructor(onRoute) {
    this.onRoute = onRoute;
    this.currentRoute = null;
    this.routes = {
      '/': 'home',
      '/about': 'about',
      '/events': 'events',
      '/gallery': 'gallery',
      '/sponsors': 'sponsors',
      '/team': 'team',
      '/contact': 'contact',
    };

    window.addEventListener('hashchange', () => this.handleRoute());
    // Handle link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const href = link.getAttribute('href');
        if (href.startsWith('#/') || href === '#/') {
          e.preventDefault();
          window.location.hash = href.slice(1);
        }
      }
    });
  }

  getRoute() {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  }

  getRouteName() {
    return this.routes[this.getRoute()] || 'home';
  }

  async handleRoute() {
    const route = this.getRoute();
    if (route === this.currentRoute) return;

    const previousRoute = this.currentRoute;
    this.currentRoute = route;
    const routeName = this.routes[route] || 'home';

    // Update navbar active state
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.classList.toggle('active', link.dataset.nav === routeName);
    });

    // Close mobile nav if open
    const mobileNav = document.getElementById('mobile-nav');
    const hamburger = document.querySelector('.navbar__hamburger');
    if (mobileNav?.classList.contains('open')) {
      mobileNav.classList.remove('open');
      hamburger?.classList.remove('open');
    }

    if (previousRoute !== null) {
      await this.transition(routeName);
    } else {
      this.onRoute(routeName);
    }
  }

  async transition(routeName) {
    const container = document.getElementById('page-container');

    // Exit animation
    await gsap.to(container, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in'
    });

    // Swap content
    this.onRoute(routeName);

    // Scroll to top
    window.scrollTo(0, 0);
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });

    // Enter animation
    gsap.fromTo(container,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }

  init() {
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    this.handleRoute();
  }
}
