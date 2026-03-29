/* ============================================================
   THREE.JS HERO SCENE — WebDev2026
   Floating geometric field + particles
   ============================================================ */

(function () {
  'use strict';

  function initHeroScene(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // ── Lighting ──────────────────────────────────────────── //
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pointLight = new THREE.PointLight(0xf97316, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xfb923c, 1, 30);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    // ── Floating Meshes ────────────────────────────────────── //
    const objects = [];
    const geos = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(0.7, 0),
      new THREE.TorusGeometry(0.5, 0.18, 8, 20),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.TetrahedronGeometry(0.85, 0),
    ];

    const matWire = new THREE.MeshBasicMaterial({ color: 0xf97316, wireframe: true, transparent: true, opacity: 0.35 });

    geos.forEach((geo, i) => {
      const mesh = new THREE.Mesh(geo, matWire.clone());
      const angle = (i / geos.length) * Math.PI * 2;
      const r = 4 + Math.random() * 2;
      mesh.position.set(Math.cos(angle) * r, Math.sin(angle) * r * 0.6, -2 + Math.random() * 4);
      mesh.rotation.set(Math.random(), Math.random(), Math.random());
      mesh.userData = { speed: 0.003 + Math.random() * 0.004, floatAmp: 0.3 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2 };
      scene.add(mesh);
      objects.push(mesh);
    });

    // ── Particle Field ─────────────────────────────────────── //
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const partMat = new THREE.PointsMaterial({
      color: 0xfb923c,
      size: 0.07,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // ── Mouse Parallax ─────────────────────────────────────── //
    const mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ── Resize ─────────────────────────────────────────────── //
    window.addEventListener('resize', () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    // ── Animate ────────────────────────────────────────────── //
    let clock = 0;
    function animate() {
      requestAnimationFrame(animate);
      clock += 0.016;

      objects.forEach((obj) => {
        obj.rotation.x += obj.userData.speed;
        obj.rotation.y += obj.userData.speed * 1.3;
        obj.position.y += Math.sin(clock + obj.userData.phase) * 0.003 * obj.userData.floatAmp;
      });

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Parallax
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      // Animate point light
      pointLight.position.x = Math.sin(clock * 0.5) * 6;
      pointLight.position.y = Math.cos(clock * 0.3) * 4;

      renderer.render(scene, camera);
    }

    animate();
  }

  // ── Stage mini scene (smaller, simpler) ─────────────────── //
  function initStageScene(canvasId, color = 0xf97316) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 6;

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pl = new THREE.PointLight(color, 3, 30);
    pl.position.set(3, 3, 3);
    scene.add(pl);

    const geo  = new THREE.IcosahedronGeometry(1.5, 1);
    const mat  = new THREE.MeshPhongMaterial({ color, wireframe: true, transparent: true, opacity: 0.3 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const geo2  = new THREE.TorusGeometry(2.5, 0.06, 6, 60);
    const mat2  = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2 });
    const ring  = new THREE.Mesh(geo2, mat2);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Particles
    const pCount = 300;
    const pPos   = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color, size: 0.06, transparent: true, opacity: 0.4 });
    scene.add(new THREE.Points(pGeo, pMat));

    window.addEventListener('resize', () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    });

    let t = 0;
    (function loop() {
      requestAnimationFrame(loop);
      t += 0.01;
      mesh.rotation.x = t * 0.4;
      mesh.rotation.y = t * 0.6;
      ring.rotation.z = t * 0.2;
      pl.position.x = Math.sin(t) * 4;
      pl.position.y = Math.cos(t * 0.7) * 3;
      renderer.render(scene, camera);
    })();
  }

  // Expose
  window.WebDevThree = { initHeroScene, initStageScene };
})();
