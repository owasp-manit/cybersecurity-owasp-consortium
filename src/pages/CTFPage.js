// ===== CTF PAGE =====
import { challenges, leaderboard, pastCTFs, categories } from '../data/challenges.js';
import { renderFooter } from './Home.js';

export function renderCTFPage() {
  return `
    <div class="ctf-page">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">ctf_dashboard.exe</span>
          </div>
          <div style="padding: 2rem;">
            <div class="ctf-page__hero">
              <span class="sys-label reveal-up">CTF</span>
              <h1 class="ctf-page__hero-heading reveal-up">
                <span>THINK.</span>
                <span>EXPLOIT.</span>
                <span class="accent">DEFEND.</span>
              </h1>
              <p class="ctf-page__hero-desc reveal-up">
                Test your skills, solve real challenges. Be part of the cybersecurity community.
              </p>
          <div class="reveal-up" style="margin-top:1.5rem;">
            <a href="#/contact" class="btn btn--primary">View Leaderboard <span class="btn-arrow">↓</span></a>
          </div>
        </div>

        <!-- Active Challenges -->
        <div class="ctf-categories">
          <span class="section-overline reveal-up">ACTIVE CHALLENGES</span>
          <div class="ctf-categories__tabs reveal-up">
            ${categories.map((cat, i) => `
              <button class="ctf-tab ${i === 0 ? 'active' : ''}" data-ctf-filter="${cat}">${cat}</button>
            `).join('')}
          </div>

          <div class="ctf-challenges" id="ctf-challenges-grid">
            ${challenges.map(c => `
              <div class="challenge-card reveal-up" data-ctf-category="${c.category}">
                <div class="challenge-card__header">
                  <span class="challenge-card__category">${c.category}</span>
                  <span class="challenge-card__difficulty challenge-card__difficulty--${c.difficulty}">${c.difficulty}</span>
                </div>
                <h4 class="challenge-card__title">${c.title}</h4>
                <p class="challenge-card__desc">${c.description}</p>
                <div class="challenge-card__footer">
                  <span class="challenge-card__points">${c.points} pts</span>
                  <span class="challenge-card__solves">${c.solves} solves</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Leaderboard -->
        <div class="ctf-leaderboard">
          <span class="section-overline reveal-up">LEADERBOARD</span>
          <h2 class="section-title reveal-up" style="margin-bottom:1.5rem;">TOP <span>TEAMS</span></h2>

          <div class="reveal-up">
            <table class="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Members</th>
                  <th style="text-align:right;">Score</th>
                </tr>
              </thead>
              <tbody>
                ${leaderboard.map(row => {
                  const rankClass = row.rank === 1 ? 'leaderboard-rank--gold' :
                                    row.rank === 2 ? 'leaderboard-rank--silver' :
                                    row.rank === 3 ? 'leaderboard-rank--bronze' : '';
                  return `
                    <tr>
                      <td><span class="leaderboard-rank ${rankClass}">#${String(row.rank).padStart(2, '0')}</span></td>
                      <td>${row.team}</td>
                      <td>${row.members}</td>
                      <td style="text-align:right;"><span class="leaderboard-score">${row.score}</span></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Past CTFs -->
        <div class="ctf-past">
          <span class="section-overline reveal-up">ARCHIVE</span>
          <h2 class="section-title reveal-up" style="margin-bottom:1.5rem;">Past <span>CTFs</span></h2>
          <div class="ctf-past__grid">
            ${pastCTFs.map(ctf => `
              <a href="${ctf.link}" class="past-ctf-card reveal-up">
                <div class="past-ctf-card__year">${ctf.year}</div>
                <div class="past-ctf-card__label">${ctf.label}</div>
              </a>
            `).join('')}
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
    ${renderFooter()}
  `;
}
