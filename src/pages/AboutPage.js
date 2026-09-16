// ===== ABOUT PAGE — Open Breathable Layout =====
import { renderFooter } from './Home.js';

export function renderAboutPage() {
  const whatWeDo = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      title: 'Penetration Testing',
      desc: 'Ethical hacking workshops covering web, network, and mobile application security testing techniques.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`,
      title: 'CTF Competitions',
      desc: 'Capture The Flag events and training across web exploitation, crypto, forensics and reverse engineering.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      title: 'Security Research',
      desc: 'Open-source vulnerability research, CVE documentation, and responsible disclosure practice.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: 'Tool Development',
      desc: 'Building security automation tools, scripts and utilities that solve real-world problems.'
    },
  ];

  const timeline = [
    { year: '2019', event: 'OWASP Consortium chapter founded at MANIT Bhopal' },
    { year: '2020', event: 'First internal CTF competition with 80+ participants' },
    { year: '2021', event: 'Partnered with GDG Bhopal for security awareness events' },
    { year: '2022', event: 'Launched open-source security toolkit project' },
    { year: '2023', event: 'AWS Users Group collaboration — cloud security track' },
    { year: '2024', event: '200+ members, 15+ events, national CTF winners' },
  ];

  return `
    <div class="about-page">
      <div class="container">

        <!-- HERO -->
        <div class="about-page__hero">
          <div class="about-page__hero-left reveal-left">
            <span class="section-overline">ABOUT US</span>
            <h1 class="about-page__hero-heading">SECURING<br/>TOMORROW<br/><span>TOGETHER.</span></h1>
            <p class="about-page__hero-desc">
              OWASP Consortium, MANIT Bhopal is a student-driven community dedicated to promoting cybersecurity awareness, learning and innovation.
            </p>
            <div class="about-page__hero-ctas">
              <a href="#/team" class="btn btn--primary">Meet the Team <span class="btn-arrow">→</span></a>
              <a href="#/contact" class="btn">Get In Touch <span class="btn-arrow">→</span></a>
            </div>
          </div>
          <div class="about-page__hero-right reveal-right">
            <div class="about-page__image-wrap float-element">
              <img
                class="about-page__image"
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"
                alt="MANIT Bhopal"
                loading="lazy"
              />
              <span class="about-page__image-label">SYS // MANIT.AC.IN — BHOPAL, MP</span>
              <div class="about-page__image-reticle about-page__image-reticle--tl"></div>
              <div class="about-page__image-reticle about-page__image-reticle--tr"></div>
              <div class="about-page__image-reticle about-page__image-reticle--bl"></div>
              <div class="about-page__image-reticle about-page__image-reticle--br"></div>
            </div>
          </div>
        </div>

        <!-- STATS STRIP -->
        <div class="about-stats-strip reveal-up">
          <div class="about-stats-strip__item">
            <span class="about-stats-strip__num">200+</span>
            <span class="about-stats-strip__label">Active Members</span>
          </div>
          <div class="about-stats-strip__sep"></div>
          <div class="about-stats-strip__item">
            <span class="about-stats-strip__num">15+</span>
            <span class="about-stats-strip__label">Events Hosted</span>
          </div>
          <div class="about-stats-strip__sep"></div>
          <div class="about-stats-strip__item">
            <span class="about-stats-strip__num">5+</span>
            <span class="about-stats-strip__label">CTF Competitions</span>
          </div>
          <div class="about-stats-strip__sep"></div>
          <div class="about-stats-strip__item">
            <span class="about-stats-strip__num">3+</span>
            <span class="about-stats-strip__label">Open-Source Projects</span>
          </div>
          <div class="about-stats-strip__sep"></div>
          <div class="about-stats-strip__item">
            <span class="about-stats-strip__num">5+</span>
            <span class="about-stats-strip__label">Years of Impact</span>
          </div>
        </div>

        <!-- VISION / MISSION -->
        <!-- VISION / MISSION -->
        <div class="about-vm-section">
          <div class="about-vm-block reveal-left">
            <span class="about-vm-block__tag">// VISION</span>
            <h2 class="about-vm-block__heading">SHAPING THE FUTURE OF CYBERSECURITY.</h2>
            <p class="about-vm-block__desc">
              To build a safer digital world by empowering students with the right skills, knowledge and community. We envision a future where every developer thinks security-first.
            </p>
          </div>
          <div class="about-vm-block reveal-right" style="text-align: right;">
            <span class="about-vm-block__tag">// MISSION</span>
            <h2 class="about-vm-block__heading">EDUCATION, PRACTICE &amp; COLLABORATION.</h2>
            <p class="about-vm-block__desc" style="margin-left: auto;">
              To educate, enable and encourage the next generation of cybersecurity professionals through hands-on learning, events, research and collaboration with industry and academia.
            </p>
          </div>
        </div>

        <!-- WHAT WE DO -->
        <div class="about-whatwedo-section">
          <div class="about-whatwedo-header reveal-up">
            <span class="section-overline">PROGRAMS</span>
            <h2 class="section-title">WHAT WE <span>DO</span></h2>
          </div>
          <div class="about-whatwedo-stagger">
            ${whatWeDo.map((item, i) => `
              <div class="about-do-stagger-card border-draw reveal-up" style="--delay:${i * 0.1}s; margin-top: ${i % 2 === 1 ? '4rem' : '0'};">
                <div class="about-do-stagger-card__num">0${i + 1}</div>
                <div class="about-do-stagger-card__icon">${item.icon}</div>
                <h3 class="about-do-stagger-card__title">${item.title}</h3>
                <p class="about-do-stagger-card__desc">${item.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TIMELINE -->
        <div class="about-timeline-section">
          <div class="about-whatwedo-header reveal-up">
            <span class="section-overline">MILESTONES</span>
            <h2 class="section-title">OUR <span>JOURNEY</span></h2>
          </div>
          <div class="about-timeline">
            ${timeline.map((t, i) => `
              <div class="about-timeline-entry reveal-up" style="--delay:${i * 0.08}s">
                <div class="about-timeline-entry__year">${t.year}</div>
                <div class="about-timeline-entry__connector">
                  <div class="about-timeline-entry__dot"></div>
                  ${i < timeline.length - 1 ? '<div class="about-timeline-entry__line"></div>' : ''}
                </div>
                <div class="about-timeline-entry__text">${t.event}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
    ${renderFooter()}
  `;
}
