import { renderFooter } from './Home.js';
import { OutlineWord, SectionOverline } from '../components.js';

export function renderContactPage() {
  return `
    <div class="contact-page" style="padding-bottom: 3rem;">
      <div class="container">

        <!-- PAGE HERO -->
        <div class="contact-hero reveal-up" style="margin-bottom:4rem;">
          ${SectionOverline('01', 'CONTACT', 'reveal-up')}
          <h1 class="hero-v2__title" style="margin-bottom: 2rem;">
            <span class="hero-v2__line1 scramble-text">LET'S</span>
            <span class="hero-v2__line2 outline-word">CONNECT.</span>
          </h1>
          <p class="contact-hero__desc" style="max-width:600px; color:var(--color-text-secondary);">Have a question, collaboration idea, or want to conduct a workshop? We're all ears.</p>
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
                <a href="mailto:owasp.chap.manit@gmail.com" class="contact-info-card__link">owasp.chap.manit@gmail.com</a>
              </div>
            </div>

            <div class="contact-info-card reveal-left" style="--delay:0.2s">
              <div class="contact-info-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div class="contact-info-card__body">
                <span class="contact-info-card__label">SOCIAL CHANNELS</span>
                <div class="contact-socials">
                  <a href="https://instagram.com/owasp_nitb" target="_blank" rel="noopener" class="contact-social" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  </a>
                  <a href="https://linkedin.com/company/owaspnitb" target="_blank" rel="noopener" class="contact-social" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="https://github.com/owasp-manit" target="_blank" rel="noopener" class="contact-social" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </a>
                  <a href="https://youtube.com/@owasp_manit" target="_blank" rel="noopener" class="contact-social" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="contact-map reveal-left" style="--delay:0.3s; flex:1; display:flex; flex-direction:column; min-height:300px; border:1px solid var(--color-border); background:transparent; overflow:hidden;">
              <div class="contact-map__label" style="padding:1rem; border-bottom:1px solid var(--color-border); font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); display:flex; align-items:center; gap:0.5rem;">
                <span class="contact-map__dot" style="width:8px; height:8px; background:var(--color-white); display:inline-block;"></span>
                SYS // MANIT.AC.IN — CAMPUS MAP
              </div>
              <div class="contact-map__embed" style="flex:1; width:100%; position:relative; min-height:280px;">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.2163914945413!2d77.4045052758155!3d23.235235513076722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c42e439562601%3A0xc005742469a7c36a!2sMaulana%20Azad%20National%20Institute%20of%20Technology%2C%20Bhopal%20(MANIT)!5e0!3m2!1sen!2sin!4v1701198424269!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style="border:0; filter: grayscale(1) invert(0.92) contrast(1.1); position:absolute; inset:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
                <div style="position:absolute; bottom:0; left:0; padding:0.5rem 0.75rem; background:transparent; font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.15em; color:rgba(255,255,255,0.8); pointer-events:none;">MANIT BHOPAL</div>
              </div>
            </div>

          </div>

          <!-- RIGHT: Contact Form -->
          <div class="contact-form-col reveal-right" style="flex:1;">
            <div class="os-window" style="background:var(--color-black); border:1px solid var(--color-border); overflow:hidden;">
              <div class="os-window__header" style="background:transparent; border-bottom:1px solid var(--color-border); display:flex; align-items:center; padding:0 1rem; height:32px; gap:0.5rem;">
                <div class="os-window__dots" style="display:flex; gap:6px;">
                  <div class="os-window__dot"></div>
                  <div class="os-window__dot"></div>
                  <div class="os-window__dot"></div>
                </div>
                <div class="os-window__title">terminal // send-message.sh</div>
              </div>
              <div class="contact-form-panel__body" style="padding:2rem;" id="contact-form-container">
                <!-- Topic Chips -->
                <div style="margin-bottom: 1.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;" id="contact-topics">
                  <button class="topic-chip" style="background:transparent; border:1px solid var(--color-border); color:var(--color-text-dim); padding:0.25rem 0.75rem; font-family:var(--font-mono); font-size:0.7rem; cursor:pointer; transition:all 0.2s;" onclick="document.getElementById('contact-subject').value='Workshop';">Workshop</button>
                  <button class="topic-chip" style="background:transparent; border:1px solid var(--color-border); color:var(--color-text-dim); padding:0.25rem 0.75rem; font-family:var(--font-mono); font-size:0.7rem; cursor:pointer; transition:all 0.2s;" onclick="document.getElementById('contact-subject').value='Collaboration';">Collaboration</button>
                  <button class="topic-chip" style="background:transparent; border:1px solid var(--color-border); color:var(--color-text-dim); padding:0.25rem 0.75rem; font-family:var(--font-mono); font-size:0.7rem; cursor:pointer; transition:all 0.2s;" onclick="document.getElementById('contact-subject').value='Sponsorship';">Sponsorship</button>
                  <button class="topic-chip" style="background:transparent; border:1px solid var(--color-border); color:var(--color-text-dim); padding:0.25rem 0.75rem; font-family:var(--font-mono); font-size:0.7rem; cursor:pointer; transition:all 0.2s;" onclick="document.getElementById('contact-subject').value='Join us';">Join us</button>
                </div>

                <div id="contact-success" class="form-success-state">
                  MESSAGE SENT // WE WILL RESPOND SHORTLY.
                </div>
                <form id="contact-form" style="display:block;" onsubmit="event.preventDefault(); document.getElementById('contact-success').classList.add('active'); this.reset();">
                  <div class="cf-row" style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
                  <div class="cf-group" style="position:relative;">
                    <input type="text" class="cf-input" id="contact-name" placeholder=" " required style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--color-border); padding:1rem 0; color:var(--color-white); font-family:var(--font-sans); border-radius:0; outline:none;" />
                    <label class="cf-label" style="position:absolute; top:1rem; left:0; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); transition:all 0.3s; pointer-events:none;">YOUR NAME</label>
                    <span class="cf-validation">Required</span>
                  </div>
                  <div class="cf-group" style="position:relative;">
                    <input type="email" class="cf-input" id="contact-email" placeholder=" " required style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--color-border); padding:1rem 0; color:var(--color-white); font-family:var(--font-sans); border-radius:0; outline:none;" />
                    <label class="cf-label" style="position:absolute; top:1rem; left:0; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); transition:all 0.3s; pointer-events:none;">EMAIL ADDRESS</label>
                    <span class="cf-validation">Invalid Email</span>
                  </div>
                </div>
                <div class="cf-group" style="position:relative; margin-bottom:1.5rem;">
                  <input type="text" class="cf-input" id="contact-subject" placeholder=" " required style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--color-border); padding:1rem 0; color:var(--color-white); font-family:var(--font-sans); border-radius:0; outline:none;" />
                  <label class="cf-label" style="position:absolute; top:1rem; left:0; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); transition:all 0.3s; pointer-events:none;">SUBJECT</label>
                  <span class="cf-validation">Required</span>
                </div>
                <div class="cf-group" style="position:relative; margin-bottom:2rem;">
                  <textarea class="cf-input cf-textarea" id="contact-message" placeholder=" " required maxlength="500" style="width:100%; background:transparent; border:1px solid var(--color-border); padding:1rem; color:var(--color-white); font-family:var(--font-sans); border-radius:0; min-height:120px; outline:none; resize:vertical;" oninput="document.getElementById('char-count').textContent = this.value.length;"></textarea>
                  <label class="cf-label" style="position:absolute; top:1rem; left:1rem; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); transition:all 0.3s; pointer-events:none;">MESSAGE</label>
                  <span class="cf-validation" style="left:1rem; bottom:-1.25rem;">Required</span>
                  <div style="text-align:right; margin-top:0.25rem; font-family:var(--font-mono); font-size:0.65rem; color:var(--color-text-dim);"><span id="char-count">0</span>/500</div>
                </div>
                
                <style>
                  .topic-chip:hover, .topic-chip:focus {
                    background: var(--color-white) !important;
                    color: var(--color-black) !important;
                  }
                </style>

                <div class="cf-submit" style="display:flex; justify-content:space-between; align-items:center;">
                  <button class="btn btn--outline" type="submit" id="contact-submit">
                    SEND MESSAGE →
                  </button>
                  <span class="cf-note" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">Encrypted & secure</span>
                </div>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    ${renderFooter()}
  `;
}
