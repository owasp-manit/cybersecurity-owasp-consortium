// ===== THREE.JS BACKGROUND — CONTINUOUS STONE × CYBER ENVIRONMENT =====
import * as THREE from 'three';

export class BackgroundScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = { x: 0, y: 0 };
    this.scrollY = 0;
    this.clock = new THREE.Clock();
    this.isActive = true;
    this.onUpdate = null; // external update callback

    this.init();
    this.createParticles();
    this.createNetworkNodes();
    this.createCircuitTraces();
    this.createGeometricFragments();
    this.addLights();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050606, 0.0008);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 0, 500);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setClearColor(0x050606, 1);
  }

  createParticles() {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 2000;
      positions[i3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i3 + 2] = (Math.random() - 0.5) * 1000;

      sizes[i] = Math.random() * 2 + 0.5;

      // Mix of blue, green, and neutral tones
      const type = Math.random();
      if (type < 0.15) {
        // Blue energy
        colors[i3]     = 0;
        colors[i3 + 1] = 0.7;
        colors[i3 + 2] = 0.85;
      } else if (type < 0.2) {
        // Green signal
        colors[i3]     = 0;
        colors[i3 + 1] = 0.96;
        colors[i3 + 2] = 0.63;
      } else {
        // Stone dust (neutral grey)
        const g = 0.15 + Math.random() * 0.15;
        colors[i3]     = g;
        colors[i3 + 1] = g;
        colors[i3 + 2] = g + 0.02;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createNetworkNodes() {
    const nodeCount = 40;
    const nodePositions = [];
    const nodeGroup = new THREE.Group();

    // Create nodes
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.4
    });

    for (let i = 0; i < nodeCount; i++) {
      const geo = new THREE.SphereGeometry(1.5, 6, 6);
      const mesh = new THREE.Mesh(geo, nodeMaterial.clone());
      mesh.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 400
      );
      nodeGroup.add(mesh);
      nodePositions.push(mesh.position);
    }

    // Create connections between nearby nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.06
    });

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 250) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i], nodePositions[j]
          ]);
          const line = new THREE.Line(lineGeo, lineMaterial);
          nodeGroup.add(line);
        }
      }
    }

    this.networkGroup = nodeGroup;
    this.scene.add(nodeGroup);
  }

  createCircuitTraces() {
    const traceGroup = new THREE.Group();
    const traceMaterial = new THREE.LineBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.04
    });

    // Generate procedural circuit-like paths
    for (let t = 0; t < 15; t++) {
      const points = [];
      let x = (Math.random() - 0.5) * 600;
      let y = (Math.random() - 0.5) * 600;
      const z = (Math.random() - 0.5) * 200;

      points.push(new THREE.Vector3(x, y, z));

      for (let s = 0; s < 6; s++) {
        // Circuit traces move in orthogonal segments
        if (Math.random() > 0.5) {
          x += (Math.random() - 0.5) * 150;
        } else {
          y += (Math.random() - 0.5) * 150;
        }
        points.push(new THREE.Vector3(x, y, z));
      }

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, traceMaterial);
      traceGroup.add(line);
    }

    this.traceGroup = traceGroup;
    this.scene.add(traceGroup);
  }

  createGeometricFragments() {
    const fragGroup = new THREE.Group();
    const fragMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e2222,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });

    const geometries = [
      new THREE.IcosahedronGeometry(8, 0),
      new THREE.OctahedronGeometry(6, 0),
      new THREE.TetrahedronGeometry(7, 0),
    ];

    for (let i = 0; i < 12; i++) {
      const geo = geometries[i % geometries.length];
      const mesh = new THREE.Mesh(geo, fragMaterial.clone());
      mesh.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 300
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData.rotSpeed = {
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002
      };
      fragGroup.add(mesh);
    }

    this.fragGroup = fragGroup;
    this.scene.add(fragGroup);
  }

  addLights() {
    // Subtle blue ambient
    const ambient = new THREE.AmbientLight(0x0077b6, 0.2);
    this.scene.add(ambient);

    // Blue point light
    const blueLight = new THREE.PointLight(0x00b4d8, 0.5, 800);
    blueLight.position.set(200, 200, 300);
    this.scene.add(blueLight);

    // Green signal light (very subtle)
    const greenLight = new THREE.PointLight(0x00f5a0, 0.15, 500);
    greenLight.position.set(-300, -200, 200);
    this.scene.add(greenLight);
    this.greenLight = greenLight;
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  updateScroll(scrollY) {
    this.scrollY = scrollY;
  }

  animate() {
    if (!this.isActive) return;
    requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    // Camera parallax from mouse + scroll
    this.camera.position.x += (this.mouse.x * 30 - this.camera.position.x) * 0.02;
    this.camera.position.y += (-this.mouse.y * 20 + this.scrollY * 0.05 - this.camera.position.y) * 0.02;

    // Rotate particle field very slowly
    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.015;
      this.particles.rotation.x = elapsed * 0.008;
    }

    // Rotate network
    if (this.networkGroup) {
      this.networkGroup.rotation.y = elapsed * 0.02;
      this.networkGroup.rotation.x = Math.sin(elapsed * 0.01) * 0.1;
    }

    // Rotate geometric fragments
    if (this.fragGroup) {
      this.fragGroup.children.forEach(mesh => {
        if (mesh.userData.rotSpeed) {
          mesh.rotation.x += mesh.userData.rotSpeed.x;
          mesh.rotation.y += mesh.userData.rotSpeed.y;
          mesh.rotation.z += mesh.userData.rotSpeed.z;
        }
      });
    }

    // Pulse green light
    if (this.greenLight) {
      this.greenLight.intensity = 0.1 + Math.sin(elapsed * 0.5) * 0.08;
    }

    // External update callback (e.g. HeroScene)
    if (this.onUpdate) this.onUpdate(elapsed);

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.isActive = false;
    this.renderer.dispose();
  }
}
