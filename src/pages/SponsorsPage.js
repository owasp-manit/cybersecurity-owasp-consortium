// ===== SPONSORS PAGE — Tier Cards Layout =====
import { renderFooter } from './Home.js';

const tiers = [
  {
    id: 'platinum',
    label: 'PLATINUM',
    rank: '01',
    benefits: ['Logo on all event materials', 'Featured speaking slot', 'Premium banner placement', 'Social media spotlight'],
    partners: [
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original-wordmark.svg' },
    ]
  },
  {
    id: 'gold',
    label: 'GOLD',
    rank: '02',
    benefits: ['Logo on website', 'Event banner placement', 'Social media mention', 'Newsletter feature'],
    partners: [
      { name: 'Cloudflare', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original-wordmark.svg' },
      { name: 'DigitalOcean', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/digitalocean/digitalocean-original-wordmark.svg' },
    ]
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    rank: '03',
    benefits: ['Logo on website', 'Social media mention', 'Community thank-you'],
    partners: [
      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg' },
      { name: 'GitLab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original-wordmark.svg' },
      { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    ]
  },
];

export function renderSponsorsPage() {
  return `
    <div class="sponsors-page">
      <div class="container">

        <!-- HERO -->
        <div class="sponsors-hero reveal-up">
          <span class="section-overline">NETWORK PARTNERS</span>
          <h1 class="sponsors-hero__heading">OUR <span>SPONSORS</span></h1>
          <p class="sponsors-hero__desc">
            We thank our partners and sponsors for supporting the cybersecurity community at MANIT Bhopal. Their backing makes every event, workshop, and competition possible.
          </p>
        </div>

        <!-- TIER SECTIONS -->
        ${tiers.map(tier => `
          <div class="sponsors-tier-section reveal-up">
            <div class="sponsors-tier-section__header">
              <div class="sponsors-tier-section__rank">${tier.rank}</div>
              <div class="sponsors-tier-section__meta">
                <h2 class="sponsors-tier-section__label">TIER ${tier.rank} — ${tier.label}</h2>
                <div class="sponsors-tier-section__benefits">
                  ${tier.benefits.map(b => `<span class="sponsors-tier-benefit">${b}</span>`).join('')}
                </div>
              </div>
            </div>
            <div class="sponsors-logos-grid">
              ${tier.partners.map(p => `
                <div class="sponsors-logo-card border-draw">
                  <img src="${p.logo}" alt="${p.name}" class="sponsors-logo-card__img depth-layer-2" />
                  <span class="sponsors-logo-card__name depth-layer-1">${p.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <!-- BECOME A SPONSOR -->
        <div class="sponsors-cta-section reveal-up">
          <div class="sponsors-cta-section__header">
            <span class="section-overline">BECOME A SPONSOR</span>
            <h2 class="sponsors-cta-section__heading">PARTNER WITH <span>US</span></h2>
            <p class="sponsors-cta-section__desc">
              Interested in supporting OWASP Consortium events at MANIT Bhopal?<br/>Fill out the application — our team responds within 48 hours.
            </p>
          </div>

          <div class="sponsors-form-grid">
            <div class="cf-group">
              <label class="cf-label">COMPANY NAME</label>
              <input type="text" class="cf-input" placeholder="Acme Corp" id="sp-company" />
            </div>
            <div class="cf-group">
              <label class="cf-label">CONTACT EMAIL</label>
              <input type="email" class="cf-input" placeholder="contact@company.com" id="sp-email" />
            </div>
            <div class="cf-group">
              <label class="cf-label">CONTACT PERSON</label>
              <input type="text" class="cf-input" placeholder="Jane Smith" id="sp-contact" />
            </div>
            <div class="cf-group">
              <label class="cf-label">TIER INTEREST</label>
              <select class="cf-input cf-select" id="sp-tier">
                <option value="">— Select a tier —</option>
                <option value="platinum">Tier 01 // Platinum</option>
                <option value="gold">Tier 02 // Gold</option>
                <option value="community">Tier 03 // Community</option>
                <option value="custom">Custom Package</option>
              </select>
            </div>
            <div class="cf-group cf-group--full">
              <label class="cf-label">MESSAGE</label>
              <textarea class="cf-input cf-textarea" placeholder="Tell us about your company and what kind of collaboration you're looking for..." id="sp-message"></textarea>
            </div>
            <div class="cf-submit cf-group--full">
              <button class="btn btn--primary" type="button" id="sp-submit">
                Submit Application <span class="btn-arrow">→</span>
              </button>
              <span class="cf-note">Response within 48 hours</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    ${renderFooter()}
  `;
}
