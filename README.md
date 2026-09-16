# OWASP Consortium MANIT Bhopal

Welcome to the official website repository for the **OWASP Consortium** at MANIT Bhopal. This platform serves as a hub for our community, showcasing our events, collaborations, team members, and the essence of what we do in the cybersecurity domain.

## 🚀 Overview

The website is a modern, single-page application (SPA) built to be fast, responsive, and visually striking. It features a unique "OS Theme" with a sleek, dark UI, technical grid backgrounds, and a live 3D terminal hero section.

### Key Features
- **3D Hero Scene**: A custom Three.js visualization featuring tech stacks orbiting a live-rendered terminal sphere.
- **Smooth Scrolling**: Implemented via Lenis for a premium navigation experience.
- **GSAP Animations**: Scroll-triggered reveals, staggers, and parallax effects.
- **Custom SPA Router**: Hash-based routing (`#/about`, `#/events`, etc.) for seamless page transitions without reloads.
- **Responsive Design**: fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

- **Core**: Vanilla HTML, CSS, JavaScript (ES6 Modules)
- **3D Engine**: [Three.js](https://threejs.org/)
- **Animations**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Scrolling**: [Lenis](https://lenis.studiofreight.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📂 Project Structure

```text
├── index.html           # Main entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── src/                 # Source files
    ├── main.js          # Entry script, initialization
    ├── router.js        # Custom SPA router logic
    ├── data/            # Static data (events, team, collaborators)
    ├── pages/           # Page rendering logic (Home, About, Events, etc.)
    ├── styles/          # Modular CSS files
    ├── three/           # Three.js scene definitions (HeroScene)
    └── utils/           # Helper functions
```

## 💻 Local Development Setup

To run this project locally, you will need [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cybersecurity-owasp-consortium
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start Vite on `http://localhost:3000` (or another available port). The browser will open automatically.

## 🚢 Deployment

This project is optimized for deployment on platforms like [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or GitHub Pages.

### Deploying to Vercel
1. Push your code to a GitHub repository.
2. Log in to Vercel and click **Add New Project**.
3. Import your repository.
4. Vercel will automatically detect **Vite**.
5. Keep the default settings (Build command: `npm run build`, Output directory: `dist`).
6. Click **Deploy**.

## 🤝 Contributing

We welcome contributions! If you have ideas for improvements, new features, or bug fixes:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
