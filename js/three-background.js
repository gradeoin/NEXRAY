/**
 * Nexray — Light Theme 3D Ambient Background
 * Subtle floating nodes using brand colors: #0038FF + #CCFF00
 */

(function initThreeJS() {
    // Avoid double-loading Three.js if already on page
    if (window.THREE) { setupScene(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => { setupScene(); };
    document.head.appendChild(script);
})();

function setupScene() {
    let canvas = document.getElementById('hero-canvas') || document.getElementById('stage-canvas');
    let isGlobal = false;

    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'global-3d-bg';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;opacity:0.4;';
        document.body.prepend(canvas);
        isGlobal = true;
    }

    const scene = new THREE.Scene();
    scene.background = null; // Transparent — white CSS background shows through

    const parentEl = canvas.parentElement === document.body ? window : canvas.parentElement;
    const width  = parentEl === window ? window.innerWidth  : parentEl.clientWidth;
    const height = parentEl === window ? window.innerHeight : parentEl.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // -- Particles: Brand Blue + Neon Green --
    const particleCount = isGlobal ? 600 : 300;
    const geometry  = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors    = new Float32Array(particleCount * 3);

    const colorBlue  = new THREE.Color('#0038FF');
    const colorGreen = new THREE.Color('#99CC00'); // slightly darker green for contrast on white

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i]   = (Math.random() - 0.5) * 40;
        positions[i+1] = (Math.random() - 0.5) * 40;
        positions[i+2] = (Math.random() - 0.5) * 40;
        const c = Math.random() > 0.55 ? colorBlue : colorGreen;
        colors[i] = c.r; colors[i+1] = c.g; colors[i+2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.14, vertexColors: true,
        transparent: true, opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.NormalBlending
    });

    scene.add(new THREE.Points(geometry, material));

    // -- Floating Wireframe Geometry (brand blue, very subtle) --
    const icosahedrons = [];
    const geoCount = isGlobal ? 8 : 4;
    const icoGeo = new THREE.IcosahedronGeometry(Math.random() * 1 + 0.5, 0);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x0038FF, wireframe: true, transparent: true, opacity: 0.07 });

    for (let i = 0; i < geoCount; i++) {
        const mesh = new THREE.Mesh(icoGeo, icoMat);
        mesh.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.userData = { rx: (Math.random() - 0.5) * 0.01, ry: (Math.random() - 0.5) * 0.01 };
        scene.add(mesh);
        icosahedrons.push(mesh);
    }

    camera.position.z = 15;
    let mouseX = 0, mouseY = 0;
    const halfW = window.innerWidth / 2, halfH = window.innerHeight / 2;

    document.addEventListener('mousemove', e => { mouseX = e.clientX - halfW; mouseY = e.clientY - halfH; });

    window.addEventListener('resize', () => {
        const nW = parentEl === window ? window.innerWidth  : parentEl.clientWidth;
        const nH = parentEl === window ? window.innerHeight : parentEl.clientHeight;
        camera.aspect = nW / nH; camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
    });

    const clock = new THREE.Clock();
    const pts = scene.children[0]; // the Points object

    (function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        pts.rotation.y = t * 0.04;
        pts.rotation.x = t * 0.015;

        camera.position.x += (mouseX * 0.003 - camera.position.x) * 0.015;
        camera.position.y += (-mouseY * 0.003 - camera.position.y) * 0.015;
        camera.lookAt(scene.position);

        icosahedrons.forEach(m => { m.rotation.x += m.userData.rx; m.rotation.y += m.userData.ry; });
        renderer.render(scene, camera);
    })();
}
