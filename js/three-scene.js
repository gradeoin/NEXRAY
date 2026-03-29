import * as THREE from 'https://unpkg.com/three@0.161.0/build/three.module.js';

const canvas = document.getElementById('heroCanvas');
if (!canvas) {
  // Only runs on pages that have the canvas
  // (index.html).
} else {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.4, 5.4);

  // Lights (soft, “premium”)
  const key = new THREE.DirectionalLight(0xfff2ea, 1.15);
  key.position.set(2, 3, 4);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xff7a45, 0.55);
  fill.position.set(-3, 2, 2);
  scene.add(fill);

  const amb = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(amb);

  // Group for all objects
  const group = new THREE.Group();
  scene.add(group);

  // Materials
  const matMain = new THREE.MeshStandardMaterial({
    color: 0xff5a1f,
    roughness: 0.35,
    metalness: 0.18,
    emissive: 0x240b05,
    emissiveIntensity: 0.35
  });

  const matGlass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.17,
    roughness: 0.08,
    metalness: 0.0,
    transmission: 0.9,
    thickness: 0.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12
  });

  // Shapes: torus knot + floating pills + orb
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.85, 0.26, 170, 20), matMain);
  knot.position.set(-0.55, 0.12, 0);
  group.add(knot);

  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 48, 48), matGlass);
  orb.position.set(1.05, -0.05, 0.2);
  group.add(orb);

  const pillGeo = new THREE.CapsuleGeometry(0.18, 0.55, 10, 24);
  const pills = [];
  for (let i = 0; i < 10; i++) {
    const m = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0xff8a4c : 0xffffff,
      roughness: 0.5,
      metalness: 0.1,
      transparent: true,
      opacity: i % 2 === 0 ? 0.85 : 0.35
    });

    const pill = new THREE.Mesh(pillGeo, m);
    pill.position.set(
      (Math.random() - 0.5) * 3.3,
      (Math.random() - 0.5) * 1.6,
      (Math.random() - 0.5) * 1.4
    );
    pill.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    pill.userData = {
      base: pill.position.clone(),
      amp: 0.10 + Math.random() * 0.18,
      speed: 0.7 + Math.random() * 1.2
    };
    pills.push(pill);
    group.add(pill);
  }

  // Background particles (cheap, nice)
  const pointsCount = 220;
  const positions = new Float32Array(pointsCount * 3);
  for (let i = 0; i < pointsCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = -2.5 - Math.random() * 6;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const pts = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.42
    })
  );
  scene.add(pts);

  // Resize
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Pause when offscreen
  let running = true;
  const io = new IntersectionObserver((entries) => {
    running = entries.some(e => e.isIntersecting);
  }, { threshold: 0.12 });
  io.observe(canvas);

  // Subtle interaction
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('pointermove', (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    mouseX = nx;
    mouseY = ny;
  });

  const clock = new THREE.Clock();

  function tick() {
    requestAnimationFrame(tick);
    if (!running) return;

    const t = clock.getElapsedTime();

    // Reduce motion mode: render once and keep it calm
    const speed = prefersReduced ? 0.15 : 1.0;

    knot.rotation.x = t * 0.35 * speed;
    knot.rotation.y = t * 0.42 * speed;

    orb.position.y = -0.05 + Math.sin(t * 1.0 * speed) * 0.10;

    for (const p of pills) {
      const { base, amp, speed: s } = p.userData;
      p.position.y = base.y + Math.sin(t * s * speed) * amp;
      p.rotation.y += 0.003 * speed;
      p.rotation.x += 0.002 * speed;
    }

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouseX * 0.12, 0.05);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -mouseY * 0.08, 0.05);

    renderer.render(scene, camera);
  }

  tick();
}