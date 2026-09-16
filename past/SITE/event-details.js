"use strict";

const detailRoot = document.getElementById("detail-root");
const titleEl = document.getElementById("detail-title");
const descriptionEl = document.getElementById("detail-description");

const getQueryParam = (name) => new URLSearchParams(window.location.search).get(name);
const safeArray = (value) => Array.isArray(value) ? value : [];

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const parseEventDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
};

const formatEventDate = (value) => {
  const parsed = parseEventDate(value);
  if (!parsed) return "Date TBD";
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getTimelineStatus = (event) => {
  if (event?.timelineStatus) return event.timelineStatus;
  const parsed = parseEventDate(event?.date);
  if (!parsed) return "TBD";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsed < today ? "Past" : "Upcoming";
};

const renderList = (items = []) => safeArray(items)
  .filter(Boolean)
  .map((item) => `<li>${escapeHtml(item)}</li>`)
  .join("");

const getStoryIcon = (title = "") => {
  const normalized = String(title).toLowerCase();

  if (normalized.includes("scenario") || normalized.includes("lab") || normalized.includes("challenge")) {
    return `
      <span class="event-story__timeline-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 18h16"></path>
          <path d="M7 15l4-4 3 3 4-6"></path>
          <path d="M18 8h0"></path>
        </svg>
      </span>
    `;
  }

  if (normalized.includes("detection") || normalized.includes("phishing") || normalized.includes("malware")) {
    return `
      <span class="event-story__timeline-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6"></circle>
          <path d="M20 20l-4.2-4.2"></path>
        </svg>
      </span>
    `;
  }

  return `
    <span class="event-story__timeline-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M8 12h8"></path>
        <path d="M12 8v8"></path>
        <circle cx="12" cy="12" r="9"></circle>
      </svg>
    </span>
  `;
};

const renderProofCard = (label, value) => {
  if (value == null) return "";

  if (Array.isArray(value)) {
    if (!value.length) return "";
    return `
      <article class="event-story__proof-card event-story__proof-card--glow">
        <span class="event-story__proof-label">${escapeHtml(label)}</span>
        <ul class="event-story__proof-list" style="margin-top: 0.5rem; padding-left: 1rem; color: #d4d4d4; font-size: 0.85rem; line-height: 1.6;">${renderList(value)}</ul>
      </article>
    `;
  }

  if (typeof value === "number") {
    return `
      <article class="event-story__proof-card event-story__proof-card--glow">
        <span class="event-story__proof-label">${escapeHtml(label)}</span>
        <span class="event-story__proof-value" style="display: block; margin-top: 0.5rem; font-size: 1.1rem; font-weight: 700; color: #ffffff;">${escapeHtml(String(value))}</span>
      </article>
    `;
  }

  if (String(value).trim() === "") return "";

  return `
    <article class="event-story__proof-card event-story__proof-card--glow">
      <span class="event-story__proof-label">${escapeHtml(label)}</span>
      <span class="event-story__proof-value" style="display: block; margin-top: 0.5rem; font-size: 0.9rem; color: #d4d4d4; line-height: 1.6;">${escapeHtml(String(value))}</span>
    </article>
  `;
};

const renderHighlights = (highlights = []) =>
  safeArray(highlights).map((item) => `
    <li class="event-glow-list-item">
      <svg class="event-glow-list-icon" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${escapeHtml(item)}</span>
    </li>
  `).join("");

const renderGallery = (images = [], title = "") =>
  safeArray(images).map((src, index) => `
    <button class="event-gallery__item${index === 0 ? " is-active" : ""}" type="button" data-slide-index="${index}" aria-label="Show ${escapeHtml(title)} image ${index + 1}">
      <img src="${escapeHtml(src)}" alt="${escapeHtml(title)} gallery image ${index + 1}" loading="lazy" onerror="this.onerror=null; this.src='../images/image_load_error.svg';">
    </button>
  `).join("");

const renderDetailPage = (event) => {
  if (!event) {
    titleEl.textContent = "Event not found";
    document.title = "Event Not Found | OWASP MANIT";
    descriptionEl.textContent = "The requested event could not be located.";
    return `
      <section class="event-detail-page">
        <a class="event-detail-page__back" href="./events.html">← Back to events</a>
        <div class="event-story__panel">
          <p class="event-story__eyebrow">Missing event</p>
          <h2 style="font-family: 'Syne', sans-serif;">This event entry does not exist.</h2>
          <p style="margin-top: 1rem; color: var(--text-muted);">Check the link or return to the archive to open a valid event page.</p>
        </div>
      </section>
    `;
  }

  titleEl.textContent = event.name || "Event details";
  document.title = `${event.name || "Event Details"} | OWASP MANIT`;
  descriptionEl.textContent = event.whyItMattered || event.tagline || "Explore the complete event story.";

  const hasImages = event.images && event.images.length > 0;
  const firstImage = event.coverImage || (hasImages ? event.images[0] : "") || "";
  const timelineStatus = getTimelineStatus(event);
  
  const proofCards = [
    renderProofCard("Speakers", event.speakers),
    renderProofCard("Attendance", event.attendance),
    renderProofCard("Winners", event.winners),
    renderProofCard("Takeaways", event.takeaways),
  ].filter(Boolean).join("");

  return `
    <section class="event-detail-page" style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="margin-bottom: 1.25rem;">
        <a class="event-detail-page__back" href="./events.html">← Back to events</a>
      </div>

      <!-- Redesigned Hero & Slideshow Side-by-Side (Images on Upper Side) -->
      <div class="event-story__hero" style="display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr); gap: 1.5rem; align-items: stretch;">
        <!-- Left: Text Core Info -->
        <div class="event-story__panel" style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="event-card__chips" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
              <span class="pill pill--purple">${escapeHtml(event.category || "Event")}</span>
              <span class="pill" style="border: 1px solid rgba(255,255,255,0.12);">${escapeHtml(event.status)}</span>
              <span class="pill" style="background: rgba(0, 229, 255, 0.12); color: var(--cyan); border-color: rgba(0,229,255,0.22);">${escapeHtml(timelineStatus)}</span>
            </div>
            
            <h2 class="event-detail__title-glow">
              ${escapeHtml(event.name)}
            </h2>
            
            ${event.tagline ? `<p style="color: var(--cyan); font-weight: 500; font-size: 0.95rem; margin-top: 0.5rem; font-family: 'JetBrains Mono', monospace; letter-spacing: -0.01em;">${escapeHtml(event.tagline)}</p>` : ""}
            
            <div class="event-story__meta" style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.25rem;">
              ${event.date ? `<span class="event-story__meta-item" style="font-size: 0.8rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 0.35rem 0.75rem; border-radius: var(--r-sm);">${escapeHtml(formatEventDate(event.date))}</span>` : ""}
              ${event.venue ? `<span class="event-story__meta-item" style="font-size: 0.8rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 0.35rem 0.75rem; border-radius: var(--r-sm);">${escapeHtml(event.venue)}</span>` : ""}
            </div>

            <div style="margin-top: 1.5rem; color: #d4d4d4; font-size: 0.95rem; line-height: 1.7;">
              <p>${escapeHtml(event.summary)}</p>
              ${event.context ? `<p style="margin-top: 1rem; color: #a4a4a4; font-size: 0.9rem; border-left: 2px solid var(--cyan); padding-left: 0.85rem; line-height: 1.6;">${escapeHtml(event.context)}</p>` : ""}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; border-top: 1px solid rgba(0,229,255,0.12); padding-top: 1.25rem;">
            <div>
              <span style="font-size: 0.68rem; text-transform: uppercase; color: rgba(221,238,255,0.5); letter-spacing: 0.08em; display: block;">Target Audience</span>
              <span style="font-size: 0.85rem; color: #ffffff; margin-top: 0.2rem; display: block; font-weight: 500;">${escapeHtml(event.targetAudience || "Not specified")}</span>
            </div>
            <div>
              <span style="font-size: 0.68rem; text-transform: uppercase; color: rgba(221,238,255,0.5); letter-spacing: 0.08em; display: block;">Event Format</span>
              <span style="font-size: 0.85rem; color: #ffffff; margin-top: 0.2rem; display: block; font-weight: 500;">${escapeHtml(event.format || "Not specified")}</span>
            </div>
          </div>
        </div>

        <!-- Right: Image Slideshow & Thumbnails directly on top -->
        <div class="event-story__panel" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; justify-content: flex-start; min-height: 400px;">
          <p class="event-story__eyebrow" style="margin-bottom: 0;">Event Visuals</p>
          
          ${hasImages ? `
            <div class="event-slideshow event-slideshow--glow" style="position: relative; width: 100%; height: 260px; overflow: hidden; border-radius: var(--r-md); border: 1px solid rgba(255,255,255,0.08);">
              <img class="event-slideshow__active" src="${escapeHtml(firstImage)}" alt="${escapeHtml(event.name)} slideshow" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='../images/image_load_error.svg';">
              ${event.images.length > 1 ? `
                <button class="event-slideshow__control event-slideshow__control--prev" type="button" aria-label="Show previous image">Prev</button>
                <button class="event-slideshow__control event-slideshow__control--next" type="button" aria-label="Show next image">Next</button>
              ` : ""}
              <div class="event-slideshow__dots" aria-label="${escapeHtml(event.name)} images dots" style="position: absolute; bottom: 0.75rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.4rem; z-index: 3;">
                ${event.images.map((_, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-slide-index="${index}" aria-label="Show slide ${index + 1}"></button>`).join("")}
              </div>
            </div>
            
            <div class="event-gallery" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 0.25rem;">
              ${renderGallery(event.images, event.name)}
            </div>
          ` : `
            <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; border: 1px dashed rgba(255,255,255,0.15); border-radius: var(--r-md); padding: 2rem; color: var(--text-muted); text-align: center;">
              <div>
                <svg style="width: 42px; height: 42px; stroke: currentColor; fill: none; margin: 0 auto 0.75rem;" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p style="font-size: 0.85rem;">No event visuals or slideshow are present for this event page.</p>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Bottom Layout Section: Chronological logs, Agenda, and verified outcomes -->
      <div class="event-story__grid" style="margin-top: 0.88rem;">
        <!-- Timeline Log & Agenda List -->
        <div class="event-story__timeline">
          <div>
            <p class="event-story__eyebrow">Timeline & Milestones</p>
            <div class="event-story__timeline-items" style="margin-top: 1rem;">
              ${safeArray(event.whatHappened).length ? safeArray(event.whatHappened).map((item) => `
                <article class="event-story__timeline-item">
                  <div class="event-story__timeline-heading">
                    ${getStoryIcon(item.title)}
                    <strong>${escapeHtml(item.title || "Milestone")}</strong>
                  </div>
                  ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
                </article>
              `).join("") : `<div class="event-story__empty">Detailed narrative logs are not recorded in this dataset yet.</div>`}
            </div>
          </div>

          ${safeArray(event.agenda).length ? `
            <div>
              <p class="event-story__eyebrow">Event Agenda</p>
              <ul class="event-story__agenda" style="margin-top: 0.75rem; padding-left: 1.2rem; color: #d4d4d4; line-height: 1.7;">
                ${renderList(event.agenda)}
              </ul>
            </div>
          ` : ""}
        </div>

        <!-- Sidebar outcomes cards -->
        <aside class="event-story__aside" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="event-story__proof" style="padding: 0;">
            <p class="event-story__eyebrow">Proof & Metrics</p>
            <div class="event-story__proof-grid" style="display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-top: 1.25rem;">
              ${proofCards || `<div class="event-story__empty">No speakers, attendance, or award metrics are present in the dataset.</div>`}
            </div>
          </div>
        </aside>
      </div>
    </section>
  `;
};

const initSlideshows = () => {
  document.querySelectorAll(".event-story__panel").forEach((eventCard) => {
    const images = Array.from(eventCard.querySelectorAll(".event-gallery img")).map((img) => img.src);
    const activeImage = eventCard.querySelector(".event-slideshow__active");
    const dots = Array.from(eventCard.querySelectorAll(".event-slideshow__dots button"));
    const galleryButtons = Array.from(eventCard.querySelectorAll(".event-gallery__item"));
    const prevButton = eventCard.querySelector(".event-slideshow__control--prev");
    const nextButton = eventCard.querySelector(".event-slideshow__control--next");

    if (!images.length || !activeImage) return;

    let currentIndex = 0;

    const updateSlide = (nextIndex) => {
      currentIndex = nextIndex;
      activeImage.src = images[currentIndex];
      activeImage.alt = `Event image ${currentIndex + 1}`;
      dots.forEach((dot, index) => dot.classList.toggle("is-active", index === currentIndex));
      galleryButtons.forEach((button, index) => button.classList.toggle("is-active", index === currentIndex));
    };

    const showPrevious = () => {
      updateSlide((currentIndex - 1 + images.length) % images.length);
    };

    const showNext = () => {
      updateSlide((currentIndex + 1) % images.length);
    };

    if (images.length > 1) {
      window.setInterval(() => {
        showNext();
      }, 2800);

      prevButton?.addEventListener("click", (e) => {
        e.stopPropagation();
        showPrevious();
      });
      nextButton?.addEventListener("click", (e) => {
        e.stopPropagation();
        showNext();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        updateSlide(Number(dot.dataset.slideIndex || 0));
      });
    });

    galleryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        updateSlide(Number(button.dataset.slideIndex || 0));
      });
    });
  });
};

const initDetailPage = async () => {
  const eventId = getQueryParam("id");
  if (!detailRoot) return;

  try {
    const response = await fetch("./events-data.json");
    if (!response.ok) throw new Error("Failed to load data");

    const data = await response.json();
    const events = Array.isArray(data.events) ? data.events : [];
    const event = events.find((item) => item.id === eventId);

    detailRoot.innerHTML = renderDetailPage(event);
    
    if (event && event.images && event.images.length) {
      initSlideshows();
    }
  } catch (error) {
    titleEl.textContent = "Could not load event";
    document.title = "Error Loading Event | OWASP MANIT";
    descriptionEl.textContent = "There was a problem loading this page.";
    detailRoot.innerHTML = `
      <section class="event-detail-page">
        <a class="event-detail-page__back" href="./events.html">← Back to events</a>
        <div class="event-story__panel" style="padding: 2rem; background: rgba(10, 18, 30, 0.72); border: 1px solid var(--border); border-radius: var(--r-xl);">
          <span class="pill pill--purple" style="margin-bottom: 1rem;">Error</span>
          <h2 style="font-family: 'Syne', sans-serif;">Could not load event</h2>
          <p style="margin-top: 1rem; color: var(--text-muted);">${escapeHtml(error.message)}</p>
        </div>
      </section>
    `;
  }
};

initDetailPage();
