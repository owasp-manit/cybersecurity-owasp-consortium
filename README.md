# OWASP Chapter MANIT — Cybersecurity Consortium

Official Web Application repository for **OWASP Student Chapter, Maulana Azad National Institute of Technology (MANIT), Bhopal**.

---

## Executive Overview
The OWASP MANIT website is a high-performance, modern cybersecurity platform designed to showcase chapter events, technical workshops, Capture The Flag (CTF) competitions, team rosters, and software security initiatives. Built using modern HTML5, Vanilla CSS3, and Modular JavaScript, it delivers a high-contrast dark cyberpunk aesthetic combined with 0% CPU static wallpaper optimization on content pages.

---

## Core Features & Architecture

### 1. Retro-Futuristic Terminal Boot Experience ([index.html](./index.html))
- Interactive terminal HUD boot screen with ASCII banner artwork.
- Animated glowing OWASP logo overlay (`.boot-logo`) with pulsing lighting effects.
- Dynamic typewriter system diagnostics, audio toggle, and skip sequence controller.

### 2. Dual Wallpaper Architecture
- **Dynamic Engine ([SITE/Wallpaper_engine.js](./SITE/Wallpaper_engine.js))**: Interactive 60fps particle node canvas and floating gradient orb animations on `index.html` and `SITE/home.html`.
- **Executive Static Engine ([SITE/static_wallpaper.js](./SITE/static_wallpaper.js))**: Screen-filling static network constellation canvas (`#static-network-canvas`) combined with an enlarged **80px x 80px** clean multi-color Cyber Grid Matrix (`.ambient--static`) for **0% CPU scrolling overhead** on secondary content pages.

### 3. Bento Grid Events & Photo Gallery System
- Interactive Bento Box grid layouts on [SITE/events.html](./SITE/events.html) with status timeline filters (Past vs. Upcoming) and category chips.
- Deep-dive event recaps on [SITE/event.html](./SITE/event.html) featuring modal image lightbox galleries.
- **Fallback Error Handling**: Automatic broken image protection rendering a dedicated SVG placeholder poster (`images/image_load_error.svg`).

### 4. JSON-Driven Data System
- Decoupled data stores ([SITE/events-data.json](./SITE/events-data.json) & [SITE/teams-data.json](./SITE/teams-data.json)) driving DOM updates via dynamic render engines ([SITE/events.js](./SITE/events.js) & [SITE/team.js](./SITE/team.js)).

### 5. Responsive Design & Ergonomics
- Fluid breakpoints supporting Desktop (4-col), Tablet (2-col), and Mobile (1-col) viewports.
- Symmetrically centered `.events-overview` stat cards (`text-align: center !important`).
- Unified tab branding with official OWASP logo favicons across all HTML pages.

---

## Repository Directory Structure

```text
.
├── index.html              # Terminal HUD Boot & Diagnostic Screen
├── logo_owasp.png          # Official OWASP Chapter Logo & Favicon Asset
├── 21_07_2026_updates.md   # Daily Release Notes & Commit Log
├── README.md               # Project Documentation
├── images/                 # Event Posters, Team Photos, & Error Fallback SVGs
│   └── image_load_error.svg # High-Tech Fallback Poster Asset
├── SITE/                   # Web Application Core
│   ├── home.html           # Main Chapter Homepage
│   ├── events.html         # Bento Grid Events Hub
│   ├── event.html          # Event Detail & Lightbox Photo Gallery
│   ├── teams.html          # Team Directory & Member Cards
│   ├── loading.html        # Router Transition & Page Loader
│   ├── style.css           # Global Tokens, Navigation, & Static Background CSS
│   ├── events.css          # Bento Grid, Chips, & Overview Component CSS
│   ├── script.js           # Modular UI Controller (Utils, Nav, Animation, Contact)
│   ├── events.js           # Event Bento Engine & Filter Controller
│   ├── team.js             # Team Directory Data Loader & Card Generator
│   ├── static_wallpaper.js # Static Network Constellation Canvas Engine
│   ├── Wallpaper_engine.js # Dynamic 60fps Particle Canvas Engine
│   ├── events-data.json    # Event Metadata Database
│   └── teams-data.json     # Team Directory Roster Database
└── OLD/                    # Archived Revisions & Historical Backups
```

---

## Navigation & Direct Page Routing

Navigation links route directly to target pages and section anchors for instant zero-delay page loading:
- **Direct Navigation Links**: `<a href="./teams.html">` or `<a href="./home.html#contact">`
- **Instant Page Response**: Eliminates loading screen animation delays across all pages.

---

## Contributing Protocol

1. **Branch Management**: Work on your designated feature branch (never push directly to `main`).
2. **Upstream Sync**: Always perform `git pull origin main` before pushing branch commits.
3. **Pull Requests**: Submit clear Pull Requests with summarized changes for code review before merging into `main`.
4. **Code Standards**: Maintain modular JavaScript design, clean CSS tokens, and document changes in release logs.

---

## Copyright & License

© 2026 **OWASP Chapter MANIT**. All rights reserved.  
Promoting software security principles, education, and innovation.
