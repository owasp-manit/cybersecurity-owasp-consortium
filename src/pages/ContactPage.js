// ===== CONTACT PAGE — Premium Split Layout =====
import { renderFooter } from './Home.js';

export function renderContactPage() {
  return `
    <div class="contact-page">
      <div class="container">

        <!-- PAGE HERO -->
        <div class="contact-hero reveal-up">
          <span class="section-overline">CONTACT</span>
          <h1 class="contact-hero__heading">LET'S <span>CONNECT.</span></h1>
          <p class="contact-hero__desc">Have a question, collaboration idea, or want to conduct a workshop? We're all ears.</p>
        </div>

        <!-- SPLIT LAYOUT -->
        <div class="contact-split">

          <!-- LEFT: Info Panels -->
          <div class="contact-info-col">

            <!-- Info Cards -->
            <div class="contact-info-card reveal-left" style="--delay:0s">
              <div class="contact-info-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="contact-info-card__body">
                <span class="contact-info-card__label">LOCATION</span>
                <p class="contact-info-card__text">MANIT Bhopal<br/>Bhopal, Madhya Pradesh — India</p>
              </div>
            </div>

            <div class="contact-info-card reveal-left" style="--delay:0.1s">
              <div class="contact-info-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div class="contact-info-card__body">
                <span class="contact-info-card__label">EMAIL</span>
                <a href="mailto:owasp@manit.ac.in" class="contact-info-card__link">owasp@manit.ac.in</a>
              </div>
            </div>

            <div class="contact-info-card reveal-left" style="--delay:0.2s">
              <div class="contact-info-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div class="contact-info-card__body">
                <span class="contact-info-card__label">SOCIAL CHANNELS</span>
                <div class="contact-socials">
                  <a href="https://instagram.com" target="_blank" rel="noopener" class="contact-social" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener" class="contact-social" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener" class="contact-social" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener" class="contact-social" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="contact-map reveal-left" style="--delay:0.3s">
              <div class="contact-map__label">
                <span class="contact-map__dot"></span>
                SYS // MANIT.AC.IN — CAMPUS MAP
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.2!2d77.41!3d23.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzM2LjAiTiA3N8KwMjQnMzYuMCJF!5e0!3m2!1sen!2sin!4v1"
                allowfullscreen=""
                loading="lazy"
                title="MANIT Bhopal Location"
              ></iframe>
            </div>

          </div>

          <!-- RIGHT: Contact Form -->
          <div class="contact-form-col reveal-right">
            <div class="contact-form-panel">
              <div class="contact-form-panel__header">
                <span class="contact-form-panel__title">Send a Message</span>
                <span class="contact-form-panel__note">We respond within 24 hours</span>
              </div>
              <div class="contact-form-panel__body">
                <div class="cf-row">
                  <div class="cf-group">
                    <label class="cf-label">YOUR NAME</label>
                    <input type="text" class="cf-input" placeholder="Full name" id="contact-name" />
                  </div>
                  <div class="cf-group">
                    <label class="cf-label">EMAIL ADDRESS</label>
                    <input type="email" class="cf-input" placeholder="your@email.com" id="contact-email" />
                  </div>
                </div>
                <div class="cf-group">
                  <label class="cf-label">SUBJECT</label>
                  <input type="text" class="cf-input" placeholder="What's this about?" id="contact-subject" />
                </div>
                <div class="cf-group">
                  <label class="cf-label">MESSAGE</label>
                  <textarea class="cf-input cf-textarea" placeholder="Tell us more..." id="contact-message"></textarea>
                </div>
                <div class="cf-submit">
                  <button class="btn btn--primary" type="button" id="contact-submit">
                    Send Message <span class="btn-arrow">→</span>
                  </button>
                  <span class="cf-note">Encrypted & secure</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    ${renderFooter()}
  `;
}
