import * as THREE from 'three';

export class HeroScene {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.isActive = true;
    
    this.mouse = new THREE.Vector2();
    this.targetMouse = new THREE.Vector2();

    // Orbital data: angle per orbit
    this.orbitAngles = [];

    this.init();
    this.createCore();
    this.createSolarSystem();
    this.createParticles();
    this.setupInteractions();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 40, 130);
    this.camera.lookAt(0, 0, 0);
    this.initialCameraZ = 130;

    // Lighting - white only for B&W theme
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);

    const light1 = new THREE.PointLight(0xffffff, 2, 300);
    light1.position.set(60, 60, 60);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0xaaaaff, 1.5, 200);
    light2.position.set(-60, -40, 40);
    this.scene.add(light2);

    this.sceneGroup = new THREE.Group();
    this.scene.add(this.sceneGroup);

    window.addEventListener('resize', () => {
      if (!this.container) return;
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
  }

  createCore() {
    this.coreGroup = new THREE.Group();
    this.sceneGroup.add(this.coreGroup);

    // ── Animated Terminal Canvas Texture ──
    // This canvas is rendered every frame to simulate a live terminal on the sphere
    this.termCanvas = document.createElement('canvas');
    this.termCanvas.width = 512;
    this.termCanvas.height = 512;
    this.termCtx = this.termCanvas.getContext('2d');
    this.termTex = new THREE.CanvasTexture(this.termCanvas);
    this.termTex.minFilter = THREE.LinearFilter;

    // Hacking terminal lines content
    this.termLines = [
      '$ nmap -sV -O 192.168.1.1',
      '> PORT   STATE  SERVICE',
      '> 22/tcp open   ssh',
      '> 80/tcp open   http',
      '> 443/tcp open  https',
      '$ hydra -l admin -P wordlist.txt ssh://target',
      '> [22][ssh] host: 192.168.1.1',
      '$ sqlmap -u "http://target/id=1" --dbs',
      '> available databases:',
      '> [*] information_schema',
      '> [*] users_db',
      '$ python3 exploit.py --target 10.0.0.1',
      '> [*] Connecting...',
      '> [*] Shell obtained!',
      '$ cat /etc/shadow',
      '> root:$6$salt$hash...',
      '$ john --wordlist=rockyou.txt hash.txt',
      '> Loaded 1 password hash',
      '> Session completed',
      '$ netstat -tulnp',
      '> tcp 0.0.0.0:4444 LISTEN',
      '$ msfconsole',
      '> use exploit/multi/handler',
      '> set payload linux/x64/shell',
      '> exploit',
      '$ wireshark -i eth0 -k',
      '> Capturing on eth0...',
      '$ aircrack-ng capture.cap -w dict.txt',
      '> KEY FOUND! [ p4ssw0rd ]',
      '$ curl -s http://target/robots.txt',
      '> Disallow: /admin',
      '> Disallow: /backup',
      '$ gobuster dir -u http://target -w wordlist',
      '> /admin (Status: 200)',
      '> /.git  (Status: 403)',
      '$ git clone https://github.com/owasp/juice-shop',
      '$ python3 -m http.server 8080',
      '> 0x41414141 0xdeadbeef',
      '> EIP: 0x08049580',
      '$ gdb ./vulnerable_binary',
      '> break *main+42',
      '> run',
      '$ strings binary | grep flag',
      '> CTF{0wasp_manit_r0cks}',
      '$ nc -lvnp 4444',
      '> Connection from 10.0.0.5:52341',
      '$ whoami',
      '> root',
      '$ id',
      '> uid=0(root) gid=0(root)',
    ];

    this.termScrollOffset = 0;
    this.termLineHeight = 18;
    this.termVisibleLines = Math.floor(512 / this.termLineHeight);

    // Core sphere with terminal texture
    const coreGeo = new THREE.SphereGeometry(12, 48, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      map: this.termTex,
      roughness: 0.4,
      metalness: 0.3,
      emissive: 0x001100,
      emissiveIntensity: 0.3,
    });
    this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.coreGroup.add(this.coreMesh);

    // Outer tinted glass shell
    const glowGeo = new THREE.SphereGeometry(13.2, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
    });
    this.coreGroup.add(new THREE.Mesh(glowGeo, glowMat));

    // Equatorial latitude/longitude lines (globe look)
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: false,
      transparent: true,
      opacity: 0.12,
    });
    for (let i = 0; i < 6; i++) {
      const latGeo = new THREE.TorusGeometry(12, 0.05, 8, 64);
      const lat = new THREE.Mesh(latGeo, globeMat.clone());
      lat.rotation.x = (i / 6) * Math.PI;
      this.coreGroup.add(lat);
    }
    for (let i = 0; i < 8; i++) {
      const lonGeo = new THREE.TorusGeometry(12, 0.05, 8, 64);
      const lon = new THREE.Mesh(lonGeo, globeMat.clone());
      lon.rotation.y = (i / 8) * Math.PI;
      lon.rotation.x = Math.PI / 2;
      this.coreGroup.add(lon);
    }

    // Outer icosahedron wireframe
    const wireGeo = new THREE.IcosahedronGeometry(14.5, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    this.coreWire = new THREE.Mesh(wireGeo, wireMat);
    this.coreGroup.add(this.coreWire);
  }

  _drawTerminal(elapsed) {
    const ctx = this.termCtx;
    const W = 512, H = 512;

    // Dark background
    ctx.fillStyle = '#000a00';
    ctx.fillRect(0, 0, W, H);

    // Scanline overlay
    for (let y = 0; y < H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, y, W, 1);
    }

    // Scrolling offset
    const scrollSpeed = 0.6;
    const offset = Math.floor(elapsed * scrollSpeed) % this.termLines.length;

    ctx.font = '13px monospace';
    ctx.textBaseline = 'top';

    for (let i = 0; i < this.termVisibleLines + 2; i++) {
      const lineIdx = (offset + i) % this.termLines.length;
      const line = this.termLines[lineIdx];
      const y = i * this.termLineHeight;

      // Color based on line type
      if (line.startsWith('$')) {
        ctx.fillStyle = '#ffffff';
      } else if (line.startsWith('>')) {
        ctx.fillStyle = '#00ff88';
      } else {
        ctx.fillStyle = 'rgba(0, 255, 136, 0.6)';
      }

      // Add typing cursor effect on last visible line
      const displayLine = (i === this.termVisibleLines - 1)
        ? line + (Math.floor(elapsed * 2) % 2 === 0 ? '_' : '')
        : line;

      ctx.fillText(displayLine, 10, y);
    }

    // Vignette edges
    const vignette = ctx.createRadialGradient(W/2, H/2, W*0.3, W/2, H/2, W*0.8);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.8)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);

    this.termTex.needsUpdate = true;
  }

  createSolarSystem() {
    this.orbits = []; // { ring, planets, radius, speed, tilt }
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    // Define each orbit: radius, tilt (deg), speed, logos count, logo URLs
    const orbitDefs = [
      {
        radius: 25,
        tilt: 10, // degrees from equator
        speed: 0.6, // full rotations per minute feel
        logos: [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
        ],
        lineColor: 0xffffff,
        lineOpacity: 0.25,
        planetSize: 4.5,
      },
      {
        radius: 38,
        tilt: -15,
        speed: 0.4,
        logos: [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
        ],
        lineColor: 0xdddddd,
        lineOpacity: 0.2,
        planetSize: 5.0,
      },
      {
        radius: 52,
        tilt: 30,
        speed: 0.25,
        logos: [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        ],
        lineColor: 0xbbbbbb,
        lineOpacity: 0.15,
        planetSize: 5.5,
      },
      {
        radius: 66,
        tilt: -20,
        speed: 0.15,
        logos: [
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
        ],
        lineColor: 0xaaaaaa,
        lineOpacity: 0.12,
        planetSize: 6.0,
      },
    ];

    orbitDefs.forEach((def, orbitIndex) => {
      const orbitGroup = new THREE.Group();

      // Tilt the entire orbit group
      orbitGroup.rotation.x = THREE.MathUtils.degToRad(def.tilt);
      // Slight z tilt for depth
      orbitGroup.rotation.z = THREE.MathUtils.degToRad(orbitIndex * 8);

      // Draw the circular ring path
      const ringPoints = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(
          Math.cos(angle) * def.radius,
          Math.sin(angle) * def.radius,
          0
        ));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: def.lineColor,
        transparent: true,
        opacity: def.lineOpacity,
      });
      const ringLine = new THREE.LineLoop(ringGeo, ringMat);
      orbitGroup.add(ringLine);

      // Create a group that will rotate, holding all planets
      const planetGroup = new THREE.Group();
      orbitGroup.add(planetGroup);

      // Place logos evenly around the ring
      const planets = [];
      def.logos.forEach((logoUrl, j) => {
        const tex = textureLoader.load(logoUrl);
        const spriteMat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.95,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(def.planetSize, def.planetSize, 1);

        // Evenly distribute around the circle
        const angle = (j / def.logos.length) * Math.PI * 2;
        sprite.position.set(
          Math.cos(angle) * def.radius,
          Math.sin(angle) * def.radius,
          0
        );

        planetGroup.add(sprite);
        planets.push(sprite);
      });

      this.sceneGroup.add(orbitGroup);
      this.orbits.push({
        orbitGroup,
        planetGroup,
        speed: def.speed,
        initAngle: Math.random() * Math.PI * 2,
      });

      // Init angle offset so they don't all start at same position
      this.orbits[this.orbits.length - 1].currentAngle = Math.random() * Math.PI * 2;
      planetGroup.rotation.z = this.orbits[this.orbits.length - 1].currentAngle;
    });
  }

  createParticles() {
    const count = 600;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 350;
      pos[i*3+1] = (Math.random() - 0.5) * 350;
      pos[i*3+2] = (Math.random() - 0.5) * 350;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.25,
    });
    this.particles = new THREE.Points(geo, mat);
    this.sceneGroup.add(this.particles);
  }

  setupInteractions() {
    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  animate = () => {
    if (!this.isActive) return;
    requestAnimationFrame(this.animate);
    
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // Smooth mouse parallax
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.04;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.04;

    // Gentle scene tilt with mouse
    this.sceneGroup.rotation.y = this.mouse.x * 0.15;
    this.sceneGroup.rotation.x = -this.mouse.y * 0.1;

    // Update live terminal texture on the sphere
    if (this.termTex) {
      this._drawTerminal(elapsed);
    }

    // Core slow rotation
    if (this.coreMesh) {
      this.coreMesh.rotation.y += delta * 0.15;
    }
    if (this.coreWire) {
      this.coreWire.rotation.y -= delta * 0.08;
      this.coreWire.rotation.z += delta * 0.06;
    }

    // Orbits: each planetGroup rotates around its orbit
    if (this.orbits) {
      this.orbits.forEach((orbit, i) => {
        // Alternate CW/CCW for visual interest
        const dir = i % 2 === 0 ? 1 : -1;
        orbit.planetGroup.rotation.z += delta * orbit.speed * 0.4 * dir;
      });
    }

    // Slow particle drift
    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.015;
      this.particles.rotation.x = elapsed * 0.008;
    }

    this.renderer.render(this.scene, this.camera);
  };

  setVisibility(visible) {
    this.container.style.display = visible ? 'block' : 'none';
  }

  destroy() {
    this.isActive = false;
  }
}
