// ===== EVENTS PAGE =====
import { events } from '../data/events.js';
import { renderFooter } from './Home.js';

export function renderEventsPage() {
  const categories = ['All', 'Workshop', 'CTF', 'Tech Talk', 'Hackathon'];
  const now = new Date();

  // Split events into upcoming and past based on date
  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const pastEvents = events.filter(e => new Date(e.date) < now);

  return `
    <div class="events-page">
      <div class="container">

        <!-- Page Hero -->
        <div class="events-page__hero reveal-up">
          <span class="section-overline">EVENTS DATABASE</span>
          <h1 class="events-page__heading">ALL <span>EVENTS</span></h1>
          <p class="section-desc">Workshops, CTFs, talks, hackathons and more — past and upcoming.</p>
          <div class="events-page__hero-stats">
            <div class="ephs">
              <span class="ephs__num">${events.length}</span>
              <span class="ephs__label">Total Events</span>
            </div>
            <div class="ephs__sep"></div>
            <div class="ephs">
              <span class="ephs__num" style="color:#27c93f;">${upcomingEvents.length}</span>
              <span class="ephs__label">Upcoming</span>
            </div>
            <div class="ephs__sep"></div>
            <div class="ephs">
              <span class="ephs__num" style="color:var(--color-text-dim);">${pastEvents.length}</span>
              <span class="ephs__label">Completed</span>
            </div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="events-filter reveal-up">
          <div class="events-filter__body">
            ${categories.map((cat, i) => `
              <button class="filter-pill ${i === 0 ? 'active' : ''}" data-event-filter="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- UPCOMING EVENTS -->
        ${upcomingEvents.length > 0 ? `
        <div class="events-section-block reveal-up">
          <div class="events-section-block__header">
            <div class="events-section-block__indicator events-section-block__indicator--upcoming"></div>
            <span class="events-section-block__label">UPCOMING</span>
            <span class="events-section-block__count">${upcomingEvents.length} scheduled</span>
          </div>

          <div class="events-page__grid events-page__grid--upcoming" id="upcoming-grid">
            ${upcomingEvents.map((event, i) => `
              <div class="event-card border-draw event-card--upcoming reveal-up" data-event-id="${event.id}" data-category="${event.category}" style="--card-delay:${i * 0.08}s">
                <div class="event-card__log-header">
                  <span class="event-card__log-idx">ENTRY_${String(i + 1).padStart(3, '0')}</span>
                  <span class="event-card__status event-card__status--upcoming">▸ UPCOMING</span>
                </div>

                <div class="event-card__top">
                  <div class="event-card__date-block">
                    <span class="event-card__date-month">${event.month}</span>
                    <span class="event-card__date-day">${event.day}</span>
                    <span class="event-card__date-year">${event.year}</span>
                  </div>
                  <span class="event-card__tag">${event.category}</span>
                </div>

                <div class="event-card__body">
                  <h4 class="event-card__title">${event.title}</h4>
                  <p class="event-card__desc">${event.description}</p>
                </div>

                ${event.speakers ? `
                <div class="event-card__speakers">
                  <span class="event-card__speakers-label">🎤</span>
                  <span class="event-card__speakers-name">${event.speakers[0]}</span>
                </div>` : ''}

                <div class="event-card__footer">
                  <span class="event-card__location">📍 ${event.location}</span>
                  <span class="event-card__cta" data-event-id="${event.id}">Register <span class="btn-arrow">→</span></span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- PAST EVENTS -->
        ${pastEvents.length > 0 ? `
        <div class="events-section-block events-section-block--past reveal-up">
          <div class="events-section-block__header">
            <div class="events-section-block__indicator events-section-block__indicator--past"></div>
            <span class="events-section-block__label">PAST EVENTS</span>
            <span class="events-section-block__count">${pastEvents.length} completed</span>
          </div>

          <div class="events-page__grid events-page__grid--past" id="past-grid">
            ${pastEvents.map((event, i) => `
              <div class="event-card border-draw event-card--past reveal-up" data-event-id="${event.id}" data-category="${event.category}" style="--card-delay:${i * 0.08}s">
                <div class="event-card__log-header">
                  <span class="event-card__log-idx">ARCHIVE_${String(i + 1).padStart(3, '0')}</span>
                  <span class="event-card__status event-card__status--past">✓ DONE</span>
                </div>

                <div class="event-card__top">
                  <div class="event-card__date-block event-card__date-block--past">
                    <span class="event-card__date-month">${event.month}</span>
                    <span class="event-card__date-day">${event.day}</span>
                    <span class="event-card__date-year">${event.year}</span>
                  </div>
                  <span class="event-card__tag event-card__tag--past">${event.category}</span>
                </div>

                <div class="event-card__body">
                  <h4 class="event-card__title">${event.title}</h4>
                  <p class="event-card__desc">${event.description}</p>
                </div>

                <div class="event-card__footer">
                  <span class="event-card__location">📍 ${event.location}</span>
                  <span class="event-card__cta" data-event-id="${event.id}">View Details <span class="btn-arrow">→</span></span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Empty state if no events at all -->
        ${events.length === 0 ? `
        <div class="events-page__empty">
          <span class="events-page__empty-icon">📭</span>
          <p>No events found. Check back soon.</p>
        </div>
        ` : ''}

      </div>
    </div>
    ${renderFooter()}
  `;
}
