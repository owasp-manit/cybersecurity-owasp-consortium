# HTML Structure Report

Source file: `index.html`

## Overall Layout

The page is a single-page landing site for `OWASP MANIT`. It uses a top-level structure of:

- `head` with metadata, Google Fonts, and `style.css`
- `body` with ambient background layers
- `header` for branding and navigation
- four main content `section` blocks
- `footer`
- background `canvas`
- `script.js`

## Main Body Structure

### 1. Ambient Background

- Decorative wrapper: `.ambient`
- Includes three orb layers, one grid layer, and one noise layer

### 2. Header

- `header.header#top`
- Brand area with logo and chapter name
- Primary navigation links:
  - `#capabilities`
  - `#metrics`
  - `#programs`
  - `#contact`
- CTA link: `Join Network`
- Burger button for mobile menu

### 3. Hero Section

- `section.hero#hero`
- Left column:
  - status / location eyebrow
  - main headline
  - intro paragraph
  - two CTA buttons
  - tag list
- Right column:
  - terminal-style information card
  - two floating accent cards
- Bottom ticker with repeated cybersecurity topics

### 4. Capabilities Section

- `section.capabilities#capabilities`
- Section header with title and kicker
- `cap-grid` containing four `article.cap-card` items:
  - Hands-on Labs
  - Interactive Workshops
  - CTF Competitions
  - Peer Mentorship

### 5. Metrics Section

- `section.metrics#metrics`
- Section header with title and kicker
- `metrics-grid` with four metric cards
- Each card contains:
  - label
  - progress bar
  - animated counter
  - short description

### 6. Programs Section

- `section.programs#programs`
- Section header with training/news title
- `programs-grid` with three program cards:
  - CyberBasics 1.0
  - OWASP MANIT CTF
  - CyberHunter Ops
- Each card includes image, overlay, pill label, heading, text, and link

### 7. Contact Section
>> add message feild
- `section.contact#contact`
- Two-column contact card
- Left side:
  - heading and community intro text
  - social links for X/Twitter, LinkedIn, and Meetup
- Right side:
  - contact form with name field
  - email field
  - submit button
  - status message

### 8. Footer

- `footer.footer`
- Brand/location text
- repeated social links
- copyright line

## Supporting Assets

- Stylesheet: `./style.css`
- Script: `./script.js`
- Images referenced from parent folders:
  - `../logo_owasp.png`
  - `../images/...`

## Notes

- The page follows a clear landing-page pattern: hero, features, metrics, programs, contact, footer.
- Structure is semantic overall, using `header`, `section`, `article`, `nav`, `form`, and `footer`.
- Some text content contains minor spelling inconsistencies, but the structural organization is clear.
