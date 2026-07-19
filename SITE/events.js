"use strict";

const eventsRoot = document.getElementById("events-list");
const overviewRoot = document.getElementById("events-overview");
const featuredTitle = document.getElementById("featured-event-heading");
const featuredCopy = document.getElementById("featured-event-copy");
const featuredMeta = document.getElementById("featured-event-meta");
const featuredLink = document.getElementById("featured-event-link");

const safeArray = (value) => Array.isArray(value) ? value : [];

const parseEventDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
};

const formatEventDate = (value) => {
  const parsed = parseEventDate(value);
  if (!parsed) return "Date TBD";
  return parsed.toLocaleDateString("en-US", {
    month: "short",
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

const sortEventsByDate = (events = []) =>
  [...events].sort((a, b) => {
    const left = parseEventDate(a?.date)?.valueOf() ?? 0;
    const right = parseEventDate(b?.date)?.valueOf() ?? 0;
    return right - left;
  });

const getFeaturedEvent = (events = []) => {
  const featured = events.find((event) => event?.featured === true);
  return featured || sortEventsByDate(events)[0] || null;
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const createChip = (label, variant = "") =>
  `<span class="event-chip${variant ? ` ${variant}` : ""}">${escapeHtml(label)}</span>`;

const getBentoVariant = (index = 0, total = 0) => {
  if (index === 0) return "event-card--hero";
  if (total <= 2) return "event-card--wide";

  const pattern = [
    "event-card--tall",
    "event-card--wide",
    "event-card--standard",
    "event-card--compact",
  ];

  return pattern[(index - 1) % pattern.length];
};

const renderFeaturedPanel = (event) => {
  if (!event || !featuredTitle || !featuredCopy || !featuredMeta || !featuredLink) return;

  featuredTitle.textContent = event.name || "Featured event";
  featuredCopy.textContent = event.whyItMattered || event.summary || "Explore the most important event from the archive.";

  const meta = [
    formatEventDate(event.date),
    event.category,
    getTimelineStatus(event),
    event.targetAudience,
  ].filter(Boolean);

  featuredMeta.innerHTML = meta.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  featuredLink.href = event.id ? `./event.html?id=${encodeURIComponent(event.id)}` : "#events-gallery";
  featuredLink.textContent = getTimelineStatus(event) === "Upcoming" ? "View event plan" : "View event recap";
};

const renderOverview = (events = []) => {
  if (!overviewRoot) return;

  const categories = [...new Set(events.map((event) => event.category).filter(Boolean))];
  const latest = sortEventsByDate(events)[0];
  const featured = getFeaturedEvent(events);

  const values = [
    String(events.length),
    categories.length ? categories.join(", ") : "—",
    latest?.name || "—",
    featured?.name || "—",
  ];

  const valueNodes = overviewRoot.querySelectorAll(".events-overview__value");
  valueNodes.forEach((node, index) => {
    node.textContent = values[index] || "—";
  });
};

const renderEventCard = (event, index = 0, total = 0) => {
  const images = safeArray(event.images);
  const firstImage = event.coverImage || images[0] || "";
  const galleryCount = Math.max(images.length - 1, 0);
  const timelineStatus = getTimelineStatus(event);
  const statusClass = timelineStatus.toLowerCase() === "upcoming"
    ? "event-chip--status-upcoming"
    : "event-chip--status-past";
  const detailCta = timelineStatus === "Upcoming" ? "View event plan" : "View full recap";
  const layoutClass = getBentoVariant(index, total);

  const chips = [
    createChip(timelineStatus, statusClass),
    event.category ? createChip(event.category, "event-chip--accent") : "",
    event.status ? createChip(event.status) : "",
  ].join("");

  const metaItems = [
    event.date ? `<span>${escapeHtml(formatEventDate(event.date))}</span>` : "",
    event.venue ? `<span>${escapeHtml(event.venue)}</span>` : "",
    event.targetAudience ? `<span>${escapeHtml(event.targetAudience)}</span>` : "",
  ].join("");

  return `
    <article class="event-card ${layoutClass} reveal" id="preview-${escapeHtml(event.id)}">
      <a class="event-card__media" href="./event.html?id=${encodeURIComponent(event.id)}" aria-label="Open ${escapeHtml(event.name)} details">
        ${firstImage ? `<img src="${escapeHtml(firstImage)}" alt="${escapeHtml(event.name)} poster or featured event image" loading="lazy">` : ""}
        <span class="event-card__gallery-count">${galleryCount > 0 ? `${galleryCount} gallery photos` : "Poster only"}</span>
      </a>
      <div class="event-card__body">
        <div class="event-card__chips">${chips}</div>
        <div>
          <h3 class="event-card__title">${escapeHtml(event.name)}</h3>
          ${event.tagline ? `<p class="event-card__tagline">${escapeHtml(event.tagline)}</p>` : ""}
        </div>
        ${event.summary ? `<p class="event-card__summary">${escapeHtml(event.summary)}</p>` : ""}
        <div class="event-card__meta">${metaItems}</div>
        <div class="event-card__footer">
          <a class="event-card__link" href="./event.html?id=${encodeURIComponent(event.id)}">${escapeHtml(detailCta)}</a>
        </div>
      </div>
    </article>
  `;
};

const renderEvents = (events = [], category = "All") => {
  const filtered = category === "All"
    ? events
    : events.filter((event) => String(event.category || "").toLowerCase() === String(category).toLowerCase());

  if (!filtered.length) {
    return `
      <article class="events-loading">
        <span class="pill">No results</span>
        <h3>No ${escapeHtml(category)} events found.</h3>
        <p>Try another category or come back when more verified event entries are added.</p>
      </article>
    `;
  }

  const sortedEvents = sortEventsByDate(filtered);
  return sortedEvents.map((event, index) => renderEventCard(event, index, sortedEvents.length)).join("");
};

const updateFilterState = (selectedCategory, events, buttons) => {
  buttons.forEach((button) => {
    const isActive = button.dataset.category === selectedCategory;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (!eventsRoot) return;
  eventsRoot.innerHTML = renderEvents(events, selectedCategory);

  if (typeof revealObs !== "undefined") {
    document.querySelectorAll(".event-card").forEach((item) => revealObs.observe(item));
  }
};

const initFilterControls = (events = []) => {
  const filterButtons = Array.from(document.querySelectorAll(".events-filter__item"));
  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextCategory = button.dataset.category || "All";
      updateFilterState(nextCategory, events, filterButtons);
    });
  });
};

const initEventPage = async () => {
  if (!eventsRoot) return;

  try {
    const response = await fetch("./events-data.json");
    if (!response.ok) throw new Error(`Failed to load event data: ${response.status}`);

    const data = await response.json();
    const events = Array.isArray(data.events) ? data.events : [];
    const filterButtons = Array.from(document.querySelectorAll(".events-filter__item"));

    renderOverview(events);
    renderFeaturedPanel(getFeaturedEvent(events));
    updateFilterState("All", events, filterButtons);
    initFilterControls(events);
  } catch (error) {
    eventsRoot.innerHTML = `
      <article class="events-loading">
        <span class="pill pill--purple">Error</span>
        <h3>Could not load events data.</h3>
        <p>${escapeHtml(error.message)}</p>
      </article>
    `;
  }
};

initEventPage();
