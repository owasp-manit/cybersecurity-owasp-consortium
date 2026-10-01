import { faculty, finalYear, coreTeam, members, getAvatar } from '../data/team.js';
import { renderFooter } from './Home.js';
import { OutlineWord, SectionOverline, StatsTable } from '../components.js';

function socialIcon(type) {
  const icons = {
    linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  };
  return icons[type] || '';
}



function sectionHeader(label, count) {
  return `
    <div class="team-section-header reveal-up" style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:1px solid var(--color-border); padding-bottom:1rem; margin-bottom:3rem; margin-top:6rem;">
      <h2 class="team-section-header__title" style="font-family:var(--font-display); font-size:2rem; text-transform:uppercase; margin:0;">// ${label}</h2>
      <span class="team-section-header__count" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">${count}</span>
    </div>
  `;
}

export function renderTeamPage() {
  return `
    <div class="team-page">
      <div class="container">

        <!-- PAGE HERO -->
        <div class="team-hero reveal-up" style="margin-bottom:4rem;">
          ${SectionOverline('01', 'OUR PEOPLE', 'reveal-up')}
          <h1 class="hero-v2__title" style="margin-bottom: 2rem;">
            <span class="hero-v2__line1 scramble-text">THE HUMANS</span>
            <span class="hero-v2__line2 outline-word">BEHIND THE MISSION.</span>
          </h1>
          <p class="team-hero__desc" style="max-width:600px; color:var(--color-text-secondary); margin-bottom:4rem;">A diverse community of students, mentors, and cybersecurity enthusiasts working together to make the web safer.</p>
          
          <div class="team-stats-strip reveal-up">
            ${StatsTable([
              { value: `${faculty.length + finalYear.length + coreTeam.length + members.length}`, label: 'Total Members' },
              { value: `${coreTeam.length}`, label: 'Core Team' },
              { value: `${faculty.length}`, label: 'Faculty' }
            ])}
          </div>
        </div>

        <!-- STICKY NAV -->
        <div style="position:sticky; top:80px; z-index:50; background:transparent; backdrop-filter:blur(10px); padding:1rem 0; border-bottom:1px solid var(--color-border); margin-bottom:2rem; display:flex; gap:2rem; font-family:var(--font-mono); font-size:0.8rem; text-transform:uppercase; justify-content:center;">
          <a href="#faculty" style="color:var(--color-text-dim); text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--color-text-dim)'">Faculty</a>
          <a href="#leads" style="color:var(--color-text-dim); text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--color-text-dim)'">Leads</a>
          <a href="#core" style="color:var(--color-text-dim); text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--color-text-dim)'">Core</a>
          <a href="#members" style="color:var(--color-text-dim); text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--color-text-dim)'">Members</a>
        </div>

        <!-- FACULTY -->
        <div id="faculty">
          ${sectionHeader('FACULTY ADVISORS', `${faculty.length} members`)}
          <div class="team-grid--core" style="perspective:1000px;">
            ${faculty.map((m, i) => `
              <div class="core-card-wrap reveal-up" style="--delay:${i * 0.05}s; width:100%; height:280px; position:relative; transform-style:preserve-3d; transition:transform 0.6s; cursor:pointer;" onmouseover="this.style.transform='rotateY(180deg)'" onmouseout="this.style.transform='rotateY(0deg)'">
                <div style="position:absolute; inset:0; backface-visibility:hidden; border:1px solid var(--color-border); background:transparent; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;">
                  <img src="${m.image || getAvatar(m.name)}" alt="${m.name}" loading="lazy" onerror="this.onerror=null; this.src='${getAvatar(m.name)}';" style="width:120px; height:120px; object-fit:cover; filter:grayscale(1) brightness(0.8); margin-bottom:1.5rem;" />
                  <div style="font-family:var(--font-display); font-size:1.2rem; text-transform:uppercase; text-align:center;">${m.name}</div>
                </div>
                <div style="position:absolute; inset:0; backface-visibility:hidden; border:1px solid var(--color-border); background:transparent; transform:rotateY(180deg); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align:center;">
                  <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--color-text-dim); margin-bottom:1rem;">ROLE</div>
                  <div style="font-family:var(--font-display); font-size:1.5rem; color:var(--color-white); text-transform:uppercase; line-height:1.2;">${m.role}</div>
                  ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" style="margin-top:1.5rem; padding:0.5rem 1rem; border:1px solid var(--color-white); color:var(--color-white); text-decoration:none; font-family:var(--font-mono); font-size:0.75rem; transition:all 0.2s;" onmouseover="this.style.background='var(--color-white)'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='var(--color-white)';">LINKEDIN →</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- FINAL YEAR LEADS -->
        <div id="leads">
          ${sectionHeader('FINAL YEAR LEADS', `${finalYear.length} members`)}
          <div class="team-grid--core" style="perspective:1000px;">
            ${finalYear.map((m, i) => `
              <div class="core-card-wrap reveal-up" style="--delay:${i * 0.05}s; width:100%; height:280px; position:relative; transform-style:preserve-3d; transition:transform 0.6s; cursor:pointer;" onmouseover="this.style.transform='rotateY(180deg)'" onmouseout="this.style.transform='rotateY(0deg)'">
                <div style="position:absolute; inset:0; backface-visibility:hidden; border:1px solid var(--color-border); background:transparent; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;">
                  <img src="${m.image || getAvatar(m.name)}" alt="${m.name}" loading="lazy" onerror="this.onerror=null; this.src='${getAvatar(m.name)}';" style="width:120px; height:120px; object-fit:cover; filter:grayscale(1) brightness(0.8); margin-bottom:1.5rem;" />
                  <div style="font-family:var(--font-display); font-size:1.2rem; text-transform:uppercase; text-align:center;">${m.name}</div>
                </div>
                <div style="position:absolute; inset:0; backface-visibility:hidden; border:1px solid var(--color-border); background:transparent; transform:rotateY(180deg); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align:center;">
                  <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--color-text-dim); margin-bottom:1rem;">ROLE</div>
                  <div style="font-family:var(--font-display); font-size:1.5rem; color:var(--color-white); text-transform:uppercase; line-height:1.2;">${m.role}</div>
                  ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" style="margin-top:1.5rem; padding:0.5rem 1rem; border:1px solid var(--color-white); color:var(--color-white); text-decoration:none; font-family:var(--font-mono); font-size:0.75rem; transition:all 0.2s;" onmouseover="this.style.background='var(--color-white)'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='var(--color-white)';">LINKEDIN →</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- CORE TEAM -->
        <div id="core">
          ${sectionHeader('CORE TEAM', `${coreTeam.length} members`)}
          <div class="team-grid--core" style="perspective:1000px;">
            ${coreTeam.map((m, i) => `
              <div class="core-card-wrap reveal-up" style="--delay:${i * 0.05}s; width:100%; height:280px; position:relative; transform-style:preserve-3d; transition:transform 0.6s; cursor:pointer;" onmouseover="this.style.transform='rotateY(180deg)'" onmouseout="this.style.transform='rotateY(0deg)'">
                <div style="position:absolute; inset:0; backface-visibility:hidden; border:1px solid var(--color-border); background:transparent; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;">
                  <img src="${m.image || getAvatar(m.name)}" alt="${m.name}" loading="lazy" onerror="this.onerror=null; this.src='${getAvatar(m.name)}';" style="width:120px; height:120px; object-fit:cover; filter:grayscale(1) brightness(0.8); margin-bottom:1.5rem;" />
                  <div style="font-family:var(--font-display); font-size:1.2rem; text-transform:uppercase; text-align:center;">${m.name}</div>
                </div>
                <div style="position:absolute; inset:0; backface-visibility:hidden; border:1px solid var(--color-border); background:transparent; transform:rotateY(180deg); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align:center;">
                  <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--color-text-dim); margin-bottom:1rem;">ROLE</div>
                  <div style="font-family:var(--font-display); font-size:1.5rem; color:var(--color-white); text-transform:uppercase; line-height:1.2;">${m.role}</div>
                  ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" style="margin-top:1.5rem; padding:0.5rem 1rem; border:1px solid var(--color-white); color:var(--color-white); text-decoration:none; font-family:var(--font-mono); font-size:0.75rem; transition:all 0.2s;" onmouseover="this.style.background='var(--color-white)'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='var(--color-white)';">LINKEDIN →</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ALL MEMBERS -->
        <div id="members">
          ${sectionHeader('ALL MEMBERS', `${members.length} members`)}
          <div style="margin-bottom:2rem; display:flex; justify-content:flex-end;">
            <input type="text" placeholder="Search members..." style="background:transparent; border:1px solid var(--color-border); padding:0.5rem 1rem; color:var(--color-white); font-family:var(--font-mono); font-size:0.8rem; outline:none; width:250px;" oninput="
              const val = this.value.toLowerCase();
              document.querySelectorAll('.member-search-wrap').forEach(el => {
                if(el.dataset.name.toLowerCase().includes(val)) el.style.display = 'block';
                else el.style.display = 'none';
              });
            " />
          </div>
          <div class="team-grid--core" style="perspective:1000px;">
            ${members.map((m, i) => `
              <div class="core-card-wrap reveal-up member-search-wrap" data-name="${m.name}" style="--delay:${i * 0.05}s; width:100%; height:280px; position:relative; transform-style:preserve-3d; transition:transform 0.6s; cursor:pointer;" onmouseover="this.style.transform='rotateY(180deg)'" onmouseout="this.style.transform='rotateY(0deg)'">
                <div style="position:absolute; inset:0; backface-visibility:hidden; border:1px solid var(--color-border); background:transparent; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;">
                  <img src="${m.image || getAvatar(m.name)}" alt="${m.name}" loading="lazy" onerror="this.onerror=null; this.src='${getAvatar(m.name)}';" style="width:120px; height:120px; object-fit:cover; filter:grayscale(1) brightness(0.8); margin-bottom:1.5rem;" />
                  <div style="font-family:var(--font-display); font-size:1.2rem; text-transform:uppercase; text-align:center;">${m.name}</div>
                </div>
                <div style="position:absolute; inset:0; backface-visibility:hidden; border:1px solid var(--color-border); background:transparent; transform:rotateY(180deg); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align:center;">
                  <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--color-text-dim); margin-bottom:1rem;">ROLE</div>
                  <div style="font-family:var(--font-display); font-size:1.5rem; color:var(--color-white); text-transform:uppercase; line-height:1.2;">${m.role}</div>
                  ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" style="margin-top:1.5rem; padding:0.5rem 1rem; border:1px solid var(--color-white); color:var(--color-white); text-decoration:none; font-family:var(--font-mono); font-size:0.75rem; transition:all 0.2s;" onmouseover="this.style.background='var(--color-white)'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='var(--color-white)';">LINKEDIN →</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
    
    <!-- FIXED HUD PANEL -->
    <div id="team-stats-hud" class="team-stats-hud">
      <div class="os-window" style="background:transparent; backdrop-filter: blur(10px); margin:0;">
        <div class="os-window__header">
          <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
          <span class="os-window__title">TARGET_DATA</span>
        </div>
        <div style="padding:1rem; font-family:var(--font-mono); font-size:10px;">
          <div style="color:var(--color-text-dim); margin-bottom:0.5rem;">SYS // IDENTIFY</div>
          <div id="hud-name" style="font-family:var(--font-display); font-size:1.5rem; text-transform:uppercase; color:var(--color-white); line-height:1;"></div>
          <div id="hud-role" style="color:var(--color-text-secondary); margin-bottom:1rem;"></div>
          <div style="display:flex; justify-content:space-between; border-top:1px solid var(--color-border); padding-top:0.5rem;">
            <span>SEC_LEVEL</span><span id="hud-level" style="color:var(--color-white);"></span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:0.25rem;">
            <span>NODES</span><span id="hud-nodes" style="color:var(--color-white);"></span>
          </div>
        </div>
      </div>
    </div>
    
    ${renderFooter()}
  `;
}
