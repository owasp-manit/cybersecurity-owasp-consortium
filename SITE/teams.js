"use strict";

const teamDirectoryRoot = document.getElementById("team-directory-root");

const renderSocialLinks = (socials = {}) => {
  const links = [
    { label: "Instagram", href: socials.instagram },
    { label: "LinkedIn", href: socials.linkedin },
    { label: "GitHub", href: socials.github }
  ].filter((item) => item.href);

  return links.map((item) => (
    `<a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.label}</a>`
  )).join("");
};

const renderMember = (member) => `
  <article class="team-card reveal">
    <div class="team-card__media">
      <span class="team-card__fallback">${member.fallback || "TM"}</span>
      <img src="${member.image}" alt="${member.name}" onerror="this.style.display='none'; this.parentElement.classList.add('team-card__media--fallback');">
      <div class="team-card__socials">
        ${renderSocialLinks(member.socials)}
      </div>
    </div>
    <div class="team-card__body">
      <span class="team-card__role">${member.role}</span>
      <h3>${member.name}</h3>
    </div>
  </article>
`;

const renderTeamCluster = (team) => `
  <div class="team-cluster" id="${team.id}">
    <div class="team-cluster__head">
      <div>
        <p class="section__kicker">${team.kicker}</p>
        <h2 class="section__title">${team.title}</h2>
      </div>
      <p>${team.description}</p>
    </div>
    <div class="team-grid">
      ${team.members.map(renderMember).join("")}
    </div>
  </div>
`;

const initTeamPage = async () => {
  if (!teamDirectoryRoot) return;

  try {
    const response = await fetch("./teams-data.json");
    if (!response.ok) throw new Error(`Failed to load team data: ${response.status}`);

    const data = await response.json();
    const teams = Array.isArray(data.teams) ? data.teams : [];

    teamDirectoryRoot.innerHTML = teams.map(renderTeamCluster).join("");

    if (typeof window.revealObs !== "undefined") {
      document.querySelectorAll(".team-card.reveal").forEach((el) => window.revealObs.observe(el));
    }
  } catch (error) {
    teamDirectoryRoot.innerHTML = `
      <article class="events-loading events-loading--error">
        <span class="pill pill--purple">Error</span>
        <h3>Could not load team data.</h3>
        <p>${error.message}</p>
      </article>
    `;
  }
};

const initSlideshow = () => {
  const slideshow = document.getElementById("ctf-slideshow");
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll(".team-slideshow__slide"));
  const indicators = Array.from(slideshow.querySelectorAll(".team-slideshow__indicators .indicator"));
  const prevBtn = slideshow.querySelector(".team-slideshow__btn--prev");
  const nextBtn = slideshow.querySelector(".team-slideshow__btn--next");

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 4000;

  const goToSlide = (index) => {
    slides[currentIndex].classList.remove("is-active");
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.remove("is-active");
    }

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add("is-active");
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.add("is-active");
    }
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
      startAutoplay();
    });
  });

  slideshow.addEventListener("mouseenter", stopAutoplay);
  slideshow.addEventListener("mouseleave", startAutoplay);

  startAutoplay();
};

initTeamPage();
initSlideshow();

