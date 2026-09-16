// ===== TEAM PAGE — Premium ISTE Style =====
import { faculty, finalYear, coreTeam, members, getAvatar } from '../data/team.js';
import { renderFooter } from './Home.js';

function socialIcon(type) {
  const icons = {
    linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  };
  return icons[type] || '';
}

function renderMemberCard(m, idx) {
  return `
    <div class="team-member-card border-draw reveal-up" style="--delay:${idx * 0.05}s">
      <div class="team-member-card__photo-wrap depth-layer-1">
        <img class="team-member-card__photo" src="${m.image || getAvatar(m.name)}" alt="${m.name}" loading="lazy" />
        <div class="team-member-card__hover-overlay">
          <div class="team-member-card__socials">
            ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener" class="team-social-btn" aria-label="LinkedIn">${socialIcon('linkedin')}</a>` : ''}
            ${m.github ? `<a href="${m.github}" target="_blank" rel="noopener" class="team-social-btn" aria-label="GitHub">${socialIcon('github')}</a>` : ''}
            ${m.instagram ? `<a href="${m.instagram}" target="_blank" rel="noopener" class="team-social-btn" aria-label="Instagram">${socialIcon('instagram')}</a>` : ''}
          </div>
        </div>
      </div>
      <div class="team-member-card__info depth-layer-2">
        <div class="team-member-card__name">${m.name}</div>
        <div class="team-member-card__role">${m.role}</div>
      </div>
    </div>
  `;
}

function renderFacultyCard(f, idx) {
  return `
    <div class="team-faculty-card border-draw reveal-up" style="--delay:${idx * 0.08}s">
      <img class="team-faculty-card__photo depth-layer-1" src="${f.image || getAvatar(f.name)}" alt="${f.name}" loading="lazy" />
      <div class="team-faculty-card__info depth-layer-2">
        <div class="team-faculty-card__badge">FACULTY ADVISOR</div>
        <div class="team-faculty-card__name">${f.name}</div>
        <div class="team-faculty-card__role">${f.role}</div>
        ${f.linkedin ? `<a href="${f.linkedin}" target="_blank" rel="noopener" class="team-faculty-card__social">${socialIcon('linkedin')} LinkedIn</a>` : ''}
      </div>
    </div>
  `;
}

function sectionHeader(label, count) {
  return `
    <div class="team-section-header reveal-up">
      <div class="team-section-header__left">
        <span class="team-section-header__slash">//</span>
        <h2 class="team-section-header__title">${label}</h2>
      </div>
      <span class="team-section-header__count">${count}</span>
    </div>
  `;
}

export function renderTeamPage() {
  return `
    <div class="team-page">
      <div class="container">

        <!-- PAGE HERO -->
        <div class="team-hero reveal-up">
          <span class="section-overline">OUR PEOPLE</span>
          <h1 class="team-hero__heading">THE HUMANS<br/>BEHIND THE <span>MISSION.</span></h1>
          <p class="team-hero__desc">A diverse community of students, mentors, and cybersecurity enthusiasts working together to make the web safer.</p>
          <div class="team-hero__stats">
            <div class="team-hero__stat">
              <span class="team-hero__stat-num">${faculty.length + finalYear.length + coreTeam.length + members.length}</span>
              <span class="team-hero__stat-label">Total Members</span>
            </div>
            <div class="team-hero__stat-sep"></div>
            <div class="team-hero__stat">
              <span class="team-hero__stat-num">${coreTeam.length}</span>
              <span class="team-hero__stat-label">Core Team</span>
            </div>
            <div class="team-hero__stat-sep"></div>
            <div class="team-hero__stat">
              <span class="team-hero__stat-num">${faculty.length}</span>
              <span class="team-hero__stat-label">Faculty</span>
            </div>
          </div>
        </div>

        <!-- FACULTY -->
        ${sectionHeader('FACULTY ADVISORS', `${faculty.length} members`)}
        <div class="team-faculty-grid">
          ${faculty.map((f, i) => renderFacultyCard(f, i)).join('')}
        </div>

        <!-- FINAL YEAR LEADS -->
        ${sectionHeader('FINAL YEAR LEADS', `${finalYear.length} members`)}
        <div class="team-grid team-grid--core">
          ${finalYear.map((m, i) => renderMemberCard(m, i)).join('')}
        </div>

        <!-- CORE TEAM -->
        ${sectionHeader('CORE TEAM', `${coreTeam.length} members`)}
        <div class="team-grid team-grid--core">
          ${coreTeam.map((m, i) => renderMemberCard(m, i)).join('')}
        </div>

        <!-- ALL MEMBERS -->
        ${sectionHeader('ALL MEMBERS', `${members.length} members`)}
        <div class="team-grid team-grid--members">
          ${members.map((m, i) => renderMemberCard(m, i)).join('')}
        </div>

      </div>
    </div>
    ${renderFooter()}
  `;
}
