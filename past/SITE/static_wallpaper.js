/* ============================================================
   OWASP MANIT — Static Network Wallpaper Engine
   Renders a full-screen static network constellation graph and executive dark wallpaper for secondary pages.
   ============================================================ */

"use strict";

(function () {
  const drawStaticNetworkCanvas = () => {
    let canvas = document.getElementById("static-network-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "static-network-canvas";
      canvas.setAttribute("aria-hidden", "true");
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Seeded random generator for consistent aesthetic layout
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const nodeCount = Math.floor(Math.min(75, Math.max(35, (width * height) / 18000)));
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: random() * width,
        y: random() * height,
        r: random() * 1.5 + 1.2,
        isHub: i % 8 === 0
      });
    }

    const maxDist = 185;
    const maxDistSq = maxDist * maxDist;

    // 1. Draw interconnected network constellation lines with high contrast & crisp line width
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * 0.42;

          ctx.beginPath();
          if ((i + j) % 4 === 0) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 1.1})`;
          } else if ((i + j) % 5 === 0) {
            ctx.strokeStyle = `rgba(57, 255, 136, ${alpha * 0.95})`;
          } else {
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 1.25})`;
          }
          ctx.lineWidth = 1.1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // 2. Draw sharp node points and vibrant glowing hubs
    nodes.forEach((node) => {
      if (node.isHub) {
        // Outer glow halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 5.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.12)";
        ctx.fill();

        // Target ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 240, 255, 0.65)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = node.isHub ? "#ffffff" : "rgba(0, 240, 255, 0.95)";
      ctx.fill();
    });
  };

  const applyStaticWallpaper = () => {
    // 1. Prepare ambient background container
    let ambientContainer = document.querySelector(".ambient");

    if (!ambientContainer) {
      ambientContainer = document.createElement("div");
      ambientContainer.className = "ambient ambient--static";
      ambientContainer.setAttribute("aria-hidden", "true");
      ambientContainer.innerHTML = `
        <div class="ambient__orb ambient__orb--a"></div>
        <div class="ambient__orb ambient__orb--b"></div>
        <div class="ambient__orb ambient__orb--c"></div>
        <div class="ambient__grid"></div>
        <div class="ambient__noise"></div>
      `;
      document.body.prepend(ambientContainer);
    } else {
      ambientContainer.classList.add("ambient--static");
    }

    // 2. Hide dynamic node canvas if present
    const nodeCanvas = document.getElementById("node-canvas");
    if (nodeCanvas) {
      nodeCanvas.style.display = "none";
    }

    // 3. Draw full-screen static network constellation canvas
    drawStaticNetworkCanvas();

    window.addEventListener("resize", drawStaticNetworkCanvas, { passive: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyStaticWallpaper);
  } else {
    applyStaticWallpaper();
  }
})();
