// ===== LANDING PAGE (HOME) =====
import { events } from '../data/events.js';
import { collaborators } from '../data/collaborators.js';

export function renderHome() {
  const featuredEvent = events.find(e => e.featured) || events[0];
  const upcomingEvents = events.filter(e => !e.featured).slice(0, 3);

  return `
    <!-- HERO -->
    <section class="hero section" id="hero">
      <div class="hero__content">
        <div class="hero__identity">
          <div class="hero__identity-badge">
            <span class="hero__identity-dot"></span>
            <span class="hero__identity-label">OWASP CONSORTIUM&nbsp;&nbsp;/&nbsp;&nbsp;MANIT BHOPAL</span>
          </div>
        </div>

        <h1 class="hero__heading">
          <span>BUILD.</span>
          <span>BREAK.</span>
          <span class="accent">SECURE.</span>
        </h1>
        
        <hr class="hero__rule" />

        <p class="hero__desc">
          Building cybersecurity skills,<br/>
          solving real problems,<br/>
          and creating a safer digital future.
        </p>

        <!-- Live stats bar -->
        <div class="hero__live-stats">
          <div class="hero__live-stat">
            <span class="hero__live-stat-num" data-count="200">0+</span>
            <span class="hero__live-stat-label">Members</span>
          </div>
          <span class="hero__live-stat-sep">|</span>
          <div class="hero__live-stat">
            <span class="hero__live-stat-num" data-count="15">0+</span>
            <span class="hero__live-stat-label">Events</span>
          </div>
          <span class="hero__live-stat-sep">|</span>
          <div class="hero__live-stat">
            <span class="hero__live-stat-num" data-count="5">0+</span>
            <span class="hero__live-stat-label">Years</span>
          </div>
          <span class="hero__live-stat-sep">|</span>
          <div class="hero__live-stat">
            <span class="hero__live-stat-num" data-count="50">0+</span>
            <span class="hero__live-stat-label">Projects</span>
          </div>
        </div>

        <div class="hero__ctas">
          <a href="#/events" class="btn btn--primary">Explore Events <span class="btn-arrow">→</span></a>
          <a href="#/contact" class="btn">Join the Community</a>
        </div>
        
        <div class="hero__tagline">
          CYBERSECURITY <span class="dot">•</span> RESEARCH <span class="dot">•</span> CTF <span class="dot">•</span> COMMUNITY
        </div>
      </div>

      <!-- Hero 3D Tech Element Container -->
      <div class="hero__3d-container"></div>
      
      <div class="hero__scroll scroll-indicator">
        <span>SCROLL</span>
        <div class="scroll-indicator__line"></div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about section" id="about-section">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">about_us.exe</span>
            <span style="margin-left:auto;font-family:var(--font-mono);font-size:9px;color:#27c93f;">● RUNNING</span>
          </div>
          <div class="about__inner">
            <div class="about__image-wrap reveal-left">
              <img
                class="about__image"
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
                alt="MANIT Bhopal Campus"
                loading="lazy"
              />
              <div class="about__image-corner about__image-corner--tr"></div>
              <div class="about__image-corner about__image-corner--bl"></div>
              <span class="about__image-label">SYS // MANIT.BHOPAL.IN</span>
            </div>
            <div class="about__text">
              <span class="section-overline reveal-up">ABOUT OWASP CONSORTIUM</span>
              <h2 class="section-title reveal-up">MORE THAN A <span>CLUB.</span></h2>
              <p class="about__desc reveal-up">
                A community built around cybersecurity. OWASP Consortium at MANIT Bhopal focuses on
                cybersecurity education, practical security research, workshops, open-source
                projects and community building.
              </p>
              <div class="about__chips reveal-up">
                <div class="about__chip">
                  <span class="about__chip-num">200+</span>
                  <span class="about__chip-label">MEMBERS</span>
                </div>
                <div class="about__chip">
                  <span class="about__chip-num">15+</span>
                  <span class="about__chip-label">EVENTS</span>
                </div>
                <div class="about__chip">
                  <span class="about__chip-num">5+</span>
                  <span class="about__chip-label">YEARS</span>
                </div>
              </div>
              <a href="#/about" class="btn reveal-up">Learn More <span class="btn-arrow">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY WE EXIST -->
    <section class="why-section section" id="why-section">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">purpose.sh</span>
          </div>
          <div>
            <div class="why-section__header" style="padding: 2rem 2rem 0;">
              <span class="section-overline reveal-up">OUR PURPOSE</span>
              <h2 class="section-title reveal-up">WHY WE <span>EXIST</span></h2>
            </div>
            <div class="why-section__grid">
              <div class="why-card reveal-up" data-process="pid:1001">
                <div class="why-card__header">
                  <span class="why-card__num">PROC_01</span>
                  <span class="why-card__icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                </div>
                <h3 class="why-card__title">LEARN</h3>
                <p class="why-card__desc">Understand security beyond theory. Hands-on workshops, CTFs, and real-world vulnerability research.</p>
                <hr class="why-card__divider" />
              </div>
              <div class="why-card reveal-up" data-process="pid:1002">
                <div class="why-card__header">
                  <span class="why-card__num">PROC_02</span>
                  <span class="why-card__icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                  </span>
                </div>
                <h3 class="why-card__title">BUILD</h3>
                <p class="why-card__desc">Create tools that solve real problems. Open-source security projects, scripts, and automation.</p>
                <hr class="why-card__divider" />
              </div>
              <div class="why-card reveal-up" data-process="pid:1003">
                <div class="why-card__header">
                  <span class="why-card__num">PROC_03</span>
                  <span class="why-card__icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </span>
                </div>
                <h3 class="why-card__title">DEFEND</h3>
                <p class="why-card__desc">Develop the mindset to secure what we build. Think like an attacker, defend like a professional.</p>
                <hr class="why-card__divider" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section class="events-section section" id="events-section">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">events_log.txt</span>
            <span style="margin-left:auto;font-family:var(--font-mono);font-size:9px;color:var(--color-text-dim);">[ ${events.length} records ]</span>
          </div>
          <div style="padding: 2rem;">
            <div class="events-section__header">
              <div class="events-section__header-text">
                <span class="section-overline reveal-up">UPCOMING EVENTS</span>
                <h2 class="section-title reveal-up">EVENTS &amp; <span>EXPERIENCES</span></h2>
                <p class="section-desc reveal-up">Explore workshops, CTFs, technical sessions, hackathons and more.</p>
              </div>
              <a href="#/events" class="btn reveal-up">View All Events <span class="btn-arrow">→</span></a>
            </div>

            <!-- Featured Event -->
            <div class="events__featured reveal-up">
              <div class="event-featured" data-event-id="${featuredEvent.id}">
                <img
                  class="event-featured__image"
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
                  alt="${featuredEvent.title}"
                  loading="lazy"
                />
                <div class="event-featured__overlay">
                  <div class="event-featured__top-row">
                    <span class="event-featured__tag">${featuredEvent.category}</span>
                    <span class="event-featured__badge">[ FEATURED ]</span>
                  </div>
                  <span class="event-featured__date">${featuredEvent.day} ${featuredEvent.month} ${featuredEvent.year}</span>
                  <h3 class="event-featured__title">${featuredEvent.title}</h3>
                  <p class="event-featured__desc">${featuredEvent.description}</p>
                  <div class="event-featured__meta">
                    <span>📍 ${featuredEvent.location}</span>
                    ${featuredEvent.speakers ? `<span>🎤 ${featuredEvent.speakers[0]}</span>` : ''}
                  </div>
                  <div>
                    <span class="btn btn--primary" data-event-id="${featuredEvent.id}">Know More <span class="btn-arrow">→</span></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Other Events Grid — animated cards -->
            <div class="events__grid">
              ${upcomingEvents.map((event, i) => `
                <div class="event-card reveal-up" data-event-id="${event.id}" style="--card-delay:${i * 0.1}s">
                  <div class="event-card__log-header">
                    <span class="event-card__log-idx">[${String(i + 1).padStart(2, '0')}]</span>
                    <span class="event-card__tag">${event.category}</span>
                    <span class="event-card__status event-card__status--upcoming">● UPCOMING</span>
                  </div>
                  <div class="event-card__top">
                    <div class="event-card__date-block">
                      <span class="event-card__date-month">${event.month}</span>
                      <span class="event-card__date-day">${event.day}</span>
                    </div>
                    <div class="event-card__body">
                      <h4 class="event-card__title">${event.title}</h4>
                      <p class="event-card__desc">${event.description}</p>
                    </div>
                  </div>
                  <div class="event-card__footer">
                    <span class="event-card__location">📍 ${event.location}</span>
                    <span class="event-card__cta" data-event-id="${event.id}">Details <span class="btn-arrow">→</span></span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COLLABORATIONS -->
    <section class="collabs section" id="collabs-section">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">network.bat</span>
            <span style="margin-left:auto;font-family:var(--font-mono);font-size:9px;color:#27c93f;">● CONNECTED</span>
          </div>
          <div style="padding: 2rem;">
            <div class="collabs__header">
              <span class="section-overline reveal-up">CONNECTED BY SECURITY</span>
              <h2 class="section-title reveal-up"><span>COLLABORATIONS</span></h2>
              <p class="section-desc reveal-up" style="margin:0 auto;">Working together for a stronger cybersecurity ecosystem.</p>
            </div>

            <!-- Network topology hub -->
            <div class="collabs__hub reveal-up">
              <div class="collabs__hub-center">
                <div class="collabs__hub-ring"></div>
                <div class="collabs__hub-ring collabs__hub-ring--2"></div>
                <span class="collabs__hub-label">OWASP<br/>MANIT</span>
              </div>
              <div class="collabs__nodes">
                ${collaborators.map((c, i) => `
                  <a href="${c.url}" class="collab-node reveal-scale" style="--i:${i}">
                    <div class="collab-node__logo">
                      <img src="${c.logo}" alt="${c.abbr}" />
                    </div>
                    <span class="collab-node__name">${c.name}</span>
                    <span class="collab-node__status">NODE_${String(i + 1).padStart(2, '0')}</span>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    ${renderFooter()}
  `;
}

export function renderFooter() {
  return `
    <footer class="footer section">
      <div class="container">
        <div class="footer__inner">
          <div class="footer__brand">
            <div class="footer__logo-row">
              <img class="footer__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/OWASP_logo.svg/512px-OWASP_logo.svg.png" alt="OWASP Logo" style="filter: brightness(0) invert(1);" />
              <div>
                <span class="footer__brand-name">OWASP CONSORTIUM</span>
                <span class="footer__brand-sub">MANIT BHOPAL</span>
              </div>
            </div>
            <p class="footer__tagline">Learn. Build. Secure.</p>
          </div>
          <div>
            <h4 class="footer__col-title">Quick Links</h4>
            <div class="footer__links">
              <a href="#/" class="footer__link">Home</a>
              <a href="#/about" class="footer__link">About Us</a>
              <a href="#/events" class="footer__link">Events</a>
              <a href="#/sponsors" class="footer__link">Sponsors</a>
            </div>
          </div>
          <div>
            <h4 class="footer__col-title">More</h4>
            <div class="footer__links">
              <a href="#/team" class="footer__link">Team</a>
              <a href="#/contact" class="footer__link">Contact Us</a>
            </div>
          </div>
          <div>
            <h4 class="footer__col-title">Follow Us</h4>
            <div class="footer__social">
              <a href="https://instagram.com" target="_blank" rel="noopener" class="footer__social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" class="footer__social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener" class="footer__social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener" class="footer__social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span class="footer__copyright">© 2025 OWASP Consortium, MANIT Bhopal. All rights reserved.</span>
        </div>
      </div>
    </footer>
  `;
}
