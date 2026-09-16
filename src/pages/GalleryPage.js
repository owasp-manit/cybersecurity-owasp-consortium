import { renderFooter } from './Home.js';

const galleryEvents = [
  {
    id: 'evt-1',
    title: 'Security Hackathon 2026',
    date: 'Dec 2026',
    desc: '48 hours of intense coding and security challenges.',
    align: 'left',
    photos: [
      { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80', size: 'wide' },
      { url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80', size: 'tall' }
    ]
  },
  {
    id: 'evt-2',
    title: 'Network Defense Workshop',
    date: 'Oct 2026',
    desc: 'Hands-on training on securing enterprise networks.',
    align: 'right',
    photos: [
      { url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80', size: 'tall' },
      { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80', size: 'wide' }
    ]
  },
  {
    id: 'evt-3',
    title: 'CTF Nights & Finals',
    date: 'Nov 2026 - Mar 2027',
    desc: 'Our flagship Capture The Flag events and tournament finals.',
    align: 'left',
    photos: [
      { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80', size: 'wide' },
      { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80', size: 'wide' },
      { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80', size: 'tall' }
    ]
  }
];

export function renderGalleryPage() {
  return `
    <div class="gallery-page">
      <div class="container">

        <!-- Hero Header -->
        <div class="gallery-page__hero reveal-up">
          <div>
            <span class="section-overline">GALLERY</span>
            <h1 class="gallery-page__heading">EVENT <span>CUTOUTS</span></h1>
          </div>
          <div class="gallery-page__hero-meta">
            <span class="gallery-page__count">${galleryEvents.length} HIGHLIGHTS</span>
            <p style="font-size:var(--fs-small);color:var(--color-text-secondary);max-width:220px;text-align:right;line-height:1.5;">
              Scroll down to explore memories from our major events.
            </p>
          </div>
        </div>

        <!-- Spiral Timeline Container -->
        <div class="gallery-spiral-container">
          
          <!-- The SVG Spiral Line (drawn on scroll) -->
          <div class="gallery-spiral-line"></div>

          ${galleryEvents.map((evt, i) => `
            <div class="gallery-event-cutout gallery-event-cutout--${evt.align} reveal-up">
              <!-- Event Meta -->
              <div class="gallery-cutout-meta">
                <span class="gallery-cutout-date">${evt.date}</span>
                <h2 class="gallery-cutout-title">${evt.title}</h2>
                <p class="gallery-cutout-desc">${evt.desc}</p>
                <!-- Spiral Node Marker -->
                <div class="gallery-spiral-node"></div>
              </div>

              <!-- Photo Grid for this event -->
              <div class="gallery-cutout-photos">
                ${evt.photos.map((p, pIdx) => `
                  <div class="gallery-frame gallery-frame--${p.size} border-draw">
                    <img src="${p.url}" alt="${evt.title} photo" class="gallery-frame__img" loading="lazy" />
                    <div class="gallery-frame__corner gallery-frame__corner--tl"></div>
                    <div class="gallery-frame__corner gallery-frame__corner--tr"></div>
                    <div class="gallery-frame__corner gallery-frame__corner--bl"></div>
                    <div class="gallery-frame__corner gallery-frame__corner--br"></div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}

        </div>

      </div>
    </div>
    ${renderFooter()}
  `;
}
