/**
 * NEXRAY - Stage Enhancer Script
 * Injects app.js + contextual SVG illustrations into all stage pages
 */

const fs = require('fs');
const path = require('path');

// ── STAGE THEMED SVG ILLUSTRATIONS ──────────────────────────────────────────

const STAGE_ILLUSTRATIONS = {
  'stage1': {
    title: 'Web Basics',
    sections: [
      {
        id: 'what-is-a-website',
        direction: '',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Browser window -->
  <rect x="10" y="20" width="180" height="130" rx="10" fill="none" stroke="#f97316" stroke-width="2"/>
  <rect x="10" y="20" width="180" height="28" rx="10" fill="#f97316" opacity="0.15"/>
  <circle cx="30" cy="34" r="5" fill="#f97316" opacity="0.6"/><circle cx="47" cy="34" r="5" fill="#f97316" opacity="0.3"/><circle cx="64" cy="34" r="5" fill="#f97316" opacity="0.15"/>
  <!-- URL bar -->
  <rect x="80" y="27" width="90" height="14" rx="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <text x="88" y="38" font-size="7" fill="#94a3b8" font-family="monospace">nexray.in</text>
  <!-- Page content lines -->
  <rect x="25" y="62" width="100" height="8" rx="4" fill="#f97316" opacity="0.7"/>
  <rect x="25" y="78" width="150" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="25" y="90" width="130" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
  <rect x="25" y="102" width="120" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
  <!-- HTML/CSS/JS badges -->
  <rect x="25" y="118" width="35" height="18" rx="6" fill="#f97316" opacity="0.2" stroke="#f97316" stroke-width="1"/>
  <text x="36" y="130" font-size="7" fill="#f97316" font-weight="bold" text-anchor="middle">HTML</text>
  <rect x="67" y="118" width="30" height="18" rx="6" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" stroke-width="1"/>
  <text x="82" y="130" font-size="7" fill="#3b82f6" font-weight="bold" text-anchor="middle">CSS</text>
  <rect x="104" y="118" width="25" height="18" rx="6" fill="#eab308" opacity="0.2" stroke="#eab308" stroke-width="1"/>
  <text x="116" y="130" font-size="7" fill="#eab308" font-weight="bold" text-anchor="middle">JS</text>
</svg>`,
        heading: 'What Is a Website?',
        body: 'A website is a collection of files (HTML, CSS, JS) stored on a server and accessible via a URL. Think of HTML as the skeleton, CSS as the skin, and JS as the muscles that make everything move.',
        bullets: ['HTML gives structure and content', 'CSS styles colors, fonts, and layout', 'JavaScript adds interactivity and behavior']
      },
      {
        id: 'domains-and-dns',
        direction: 'reverse',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Globe -->
  <circle cx="100" cy="80" r="55" fill="none" stroke="#f97316" stroke-width="2" opacity="0.5"/>
  <ellipse cx="100" cy="80" rx="22" ry="55" fill="none" stroke="#f97316" stroke-width="1.5" opacity="0.3"/>
  <line x1="45" y1="80" x2="155" y2="80" stroke="#f97316" stroke-width="1.5" opacity="0.3"/>
  <line x1="100" y1="25" x2="100" y2="135" stroke="#f97316" stroke-width="1.5" opacity="0.3"/>
  <!-- DNS Arrow -->
  <text x="55" y="55" font-size="9" fill="#94a3b8" font-family="monospace">nexray.in</text>
  <line x1="80" y1="58" x2="108" y2="68" stroke="#f97316" stroke-width="1.5" stroke-dasharray="3,2"/>
  <!-- Server dot -->
  <circle cx="112" cy="72" r="6" fill="#f97316"/>
  <text x="95" y="100" font-size="8" fill="#f97316" font-weight="bold" text-anchor="middle">192.168.1.1</text>
</svg>`,
        heading: 'Domains & DNS Explained',
        body: 'When you type "nexray.in" in your browser, the DNS (Domain Name System) translates that human-readable name to a specific IP address like 192.168.1.1 — where the actual server lives.',
        bullets: ['Domain is your site\'s unique address', 'DNS is the internet\'s phonebook', 'IP address is the server\'s real location']
      }
    ]
  },

  'stage2': {
    title: 'HTML & CSS',
    sections: [
      {
        id: 'html-structure',
        direction: '',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Code Editor -->
  <rect x="10" y="10" width="180" height="140" rx="10" fill="rgba(249,115,22,0.05)" stroke="#f97316" stroke-width="1.5"/>
  <rect x="10" y="10" width="180" height="22" rx="10" fill="rgba(249,115,22,0.1)"/>
  <text x="20" y="25" font-size="8" fill="#f97316" font-family="monospace">style.css</text>
  <!-- CSS lines -->
  <text x="20" y="48" font-size="8" fill="#f97316" font-family="monospace">body {</text>
  <text x="30" y="62" font-size="8" fill="#94a3b8" font-family="monospace">font-family: Inter;</text>
  <text x="30" y="76" font-size="8" fill="#3b82f6" font-family="monospace">background: #09090f;</text>
  <text x="30" y="90" font-size="8" fill="#eab308" font-family="monospace">color: #ffffff;</text>
  <text x="20" y="104" font-size="8" fill="#f97316" font-family="monospace">}</text>
  <text x="20" y="120" font-size="8" fill="#f97316" font-family="monospace">h1 { color: orange; }</text>
  <!-- Cursor blink -->
  <rect x="140" y="114" width="2" height="10" rx="1" fill="#f97316" opacity="0.7">
    <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/>
  </rect>
</svg>`,
        heading: 'CSS Gives Your Site Its Look',
        body: 'CSS (Cascading Style Sheets) controls how HTML elements appear — colors, fonts, spacing, animations, and layout. Without CSS, the web would look like a plain text document.',
        bullets: ['Selectors target HTML elements', 'Properties define what to style', 'Values set what the style should be']
      }
    ]
  },

  'stage3': {
    title: 'JavaScript',
    sections: [
      {
        id: 'javascript-basics',
        direction: '',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- JS Logo Background -->
  <rect x="50" y="20" width="100" height="100" rx="12" fill="#eab308" opacity="0.1" stroke="#eab308" stroke-width="1.5"/>
  <text x="100" y="55" font-size="32" fill="#eab308" font-weight="bold" text-anchor="middle" font-family="monospace">JS</text>
  <!-- Interaction arrows -->
  <path d="M 25 80 Q 50 50 80 80" stroke="#f97316" stroke-width="2" fill="none" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <path d="M 175 80 Q 150 50 120 80" stroke="#f97316" stroke-width="2" fill="none" stroke-dasharray="4,3"/>
  <!-- Click, events -->
  <text x="20" y="120" font-size="8" fill="#94a3b8" font-family="monospace">click()</text>
  <text x="145" y="120" font-size="8" fill="#94a3b8" font-family="monospace">event()</text>
  <text x="65" y="150" font-size="8" fill="#94a3b8" font-family="monospace">console.log("Nexray!")</text>
</svg>`,
        heading: 'JavaScript Makes Pages Alive',
        body: 'JavaScript (JS) is the programming language of the web. It can respond to clicks, fetch data from APIs, validate forms, animate elements, and build entire applications that run in your browser.',
        bullets: ['Variables store information', 'Functions package reusable logic', 'Events respond to user actions', 'DOM lets you modify the page']
      }
    ]
  },

  'stage4': {
    title: 'Backend Development',
    sections: [
      {
        id: 'backend-basics',
        direction: '',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Server rack -->
  <rect x="60" y="20" width="80" height="120" rx="8" fill="rgba(249,115,22,0.05)" stroke="#f97316" stroke-width="2"/>
  <rect x="65" y="30" width="70" height="14" rx="4" fill="rgba(249,115,22,0.15)" stroke="#f97316" stroke-width="1"/>
  <circle cx="123" cy="37" r="3" fill="#4ade80">
    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
  </circle>
  <rect x="65" y="52" width="70" height="14" rx="4" fill="rgba(249,115,22,0.1)" stroke="#f97316" stroke-width="1" opacity="0.7"/>
  <circle cx="123" cy="59" r="3" fill="#4ade80" opacity="0.6"/>
  <rect x="65" y="74" width="70" height="14" rx="4" fill="rgba(249,115,22,0.07)" stroke="#f97316" stroke-width="1" opacity="0.5"/>
  <!-- API arrows -->
  <line x1="10" y1="80" x2="55" y2="80" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="5" y="75" font-size="7" fill="#94a3b8">API</text>
  <text x="5" y="88" font-size="7" fill="#94a3b8">GET</text>
  <line x1="145" y1="80" x2="185" y2="80" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="165" y="75" font-size="7" fill="#94a3b8">DB</text>
</svg>`,
        heading: 'Backend Powers the Data',
        body: 'The backend is the server-side of your application. It handles routing, database queries, authentication, and business logic. Languages like Node.js, Python, and Go power backends for millions of apps.',
        bullets: ['Server receives requests from browsers', 'Processes logic (auth, data, business rules)', 'Returns responses (JSON, HTML, files)', 'Connects to databases for storage']
      }
    ]
  },

  'stage5': {
    title: 'DevOps & Deployment',
    sections: [
      {
        id: 'deployment',
        direction: '',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- CI/CD Pipeline -->
  <circle cx="30" cy="80" r="18" fill="rgba(249,115,22,0.15)" stroke="#f97316" stroke-width="2"/>
  <text x="30" y="84" font-size="7" fill="#f97316" text-anchor="middle" font-weight="bold">Code</text>
  <line x1="50" y1="80" x2="75" y2="80" stroke="#f97316" stroke-width="2" stroke-dasharray="4,2"/>
  <circle cx="90" cy="80" r="18" fill="rgba(249,115,22,0.1)" stroke="#f97316" stroke-width="1.5"/>
  <text x="90" y="84" font-size="7" fill="#f97316" text-anchor="middle" font-weight="bold">Test</text>
  <line x1="110" y1="80" x2="132" y2="80" stroke="#f97316" stroke-width="2" stroke-dasharray="4,2"/>
  <circle cx="148" cy="80" r="18" fill="rgba(74,222,128,0.1)" stroke="#4ade80" stroke-width="2"/>
  <text x="148" y="84" font-size="7" fill="#4ade80" text-anchor="middle" font-weight="bold">Deploy</text>
  <!-- Server below -->
  <line x1="148" y1="100" x2="148" y2="120" stroke="#4ade80" stroke-width="1.5" stroke-dasharray="3,2"/>
  <rect x="120" y="120" width="56" height="22" rx="6" fill="rgba(74,222,128,0.1)" stroke="#4ade80" stroke-width="1"/>
  <text x="148" y="136" font-size="8" fill="#4ade80" text-anchor="middle">nexray.in ✓</text>
</svg>`,
        heading: 'CI/CD: Code → Live in Seconds',
        body: 'DevOps is about automating the journey from writing code to deploying it live. A CI/CD pipeline tests, builds, and ships your code to production every time you push to GitHub — zero manual steps.',
        bullets: ['Git push triggers automated tests', 'Build step compiles your code', 'GitHub Actions / Vercel deploys', 'CDN delivers globally in milliseconds']
      }
    ]
  },

  'stage6': {
    title: 'Android Apps',
    sections: [
      {
        id: 'android-basics',
        direction: '',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Phone frame -->
  <rect x="65" y="10" width="70" height="140" rx="14" fill="none" stroke="#f97316" stroke-width="2"/>
  <rect x="68" y="13" width="64" height="134" rx="12" fill="rgba(249,115,22,0.03)"/>
  <circle cx="100" cy="145" r="5" fill="none" stroke="#f97316" stroke-width="1.5"/>
  <rect x="88" y="16" width="24" height="5" rx="2.5" fill="#f97316" opacity="0.3"/>
  <!-- App icons -->
  <rect x="75" y="30" width="22" height="22" rx="6" fill="rgba(249,115,22,0.2)" stroke="#f97316" stroke-width="1"/>
  <rect x="103" y="30" width="22" height="22" rx="6" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="1"/>
  <rect x="75" y="58" width="22" height="22" rx="6" fill="rgba(74,222,128,0.2)" stroke="#4ade80" stroke-width="1"/>
  <rect x="103" y="58" width="22" height="22" rx="6" fill="rgba(234,179,8,0.2)" stroke="#eab308" stroke-width="1"/>
  <!-- Status bar -->
  <rect x="72" y="90" width="56" height="40" rx="6" fill="rgba(249,115,22,0.07)" stroke="#f97316" stroke-width="0.5"/>
  <text x="100" y="108" font-size="7" fill="#f97316" text-anchor="middle">React Native</text>
  <text x="100" y="120" font-size="7" fill="#94a3b8" text-anchor="middle">or Kotlin</text>
</svg>`,
        heading: 'Turning Your Web Skills into Mobile',
        body: 'Building an Android app no longer means learning a completely new skill. With React Native or Capacitor, your existing JavaScript skills let you build real mobile apps from the same codebase.',
        bullets: ['React Native: JS that compiles to native', 'Capacitor: wraps web apps as native', 'PWA: install web apps like native apps', 'Kotlin: the official Android language']
      }
    ]
  },

  'stage7': {
    title: 'Launch & Grow',
    sections: [
      {
        id: 'launch',
        direction: '',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Rocket -->
  <path d="M 100 140 L 80 120 Q 80 70 100 30 Q 120 70 120 120 Z" fill="rgba(249,115,22,0.15)" stroke="#f97316" stroke-width="2"/>
  <circle cx="100" cy="80" r="10" fill="none" stroke="#f97316" stroke-width="2"/>
  <path d="M 80 120 L 65 135" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
  <path d="M 120 120 L 135 135" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
  <!-- Exhaust flame -->
  <path d="M 90 140 Q 100 155 110 140" stroke="#f97316" stroke-width="2" fill="rgba(249,115,22,0.3)" stroke-linecap="round">
    <animate attributeName="d" values="M 90 140 Q 100 155 110 140;M 91 140 Q 100 162 109 140;M 90 140 Q 100 155 110 140" dur="0.8s" repeatCount="indefinite"/>
  </path>
  <!-- Stars -->
  <circle cx="20" cy="30" r="2" fill="#f97316" opacity="0.5"/>
  <circle cx="50" cy="15" r="1.5" fill="#f97316" opacity="0.4"/>
  <circle cx="150" cy="20" r="2" fill="#f97316" opacity="0.5"/>
  <circle cx="175" cy="50" r="1.5" fill="#f97316" opacity="0.3"/>
  <circle cx="35" cy="80" r="1" fill="#f97316" opacity="0.6"/>
  <text x="100" y="18" font-size="9" fill="#4ade80" text-anchor="middle" font-weight="bold">🚀 Live!</text>
</svg>`,
        heading: 'Launch, Market & Grow',
        body: 'Building is only half the journey. Getting users, growing a community, monetizing your product, and iterating based on feedback is what separates side projects from successful ones.',
        bullets: ['Deploy to Vercel, Netlify, or Cloudflare', 'Build your audience on social media', 'SEO & content marketing for organic growth', 'Monetize: SaaS, freelance, ads, courses']
      }
    ]
  }
};

// ── GENERATE ILLUSTRATION BLOCK HTML ────────────────────────────────────────
function buildIllustrationBlock(section) {
  const { direction, svg, heading, body, bullets } = section;
  const bulletHtml = (bullets || []).map(b => `<li>${b}</li>`).join('');
  return `
<div class="illustration-block ${direction}" id="illus-${section.id}">
  <div class="illus-svg">${svg}</div>
  <div class="illus-text">
    <h3>${heading}</h3>
    <p>${body}</p>
    ${bulletHtml ? `<ul>${bulletHtml}</ul>` : ''}
  </div>
</div>`;
}

// ── INJECT INTO STAGE PAGES ──────────────────────────────────────────────────
const guideDir = path.join(__dirname, 'guide');

Object.keys(STAGE_ILLUSTRATIONS).forEach(stageKey => {
  const filePath = path.join(guideDir, `${stageKey}.html`);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠ Skipping ${stageKey}.html (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const stageData = STAGE_ILLUSTRATIONS[stageKey];
  let injectedCount = 0;

  // 1. Inject app.js if not present
  if (!content.includes('app.js')) {
    content = content.replace('</body>', '  <script src="../js/app.js"></script>\n</body>');
  }

  // 2. Inject illustrations after their heading anchors
  stageData.sections.forEach(section => {
    const anchorTarget = `id="${section.id}"`;
    if (content.includes(anchorTarget)) {
      // Find the heading and inject the block AFTER it and any immediately following <p>
      const illustrationHtml = buildIllustrationBlock(section);
      const headingPattern = new RegExp(`(<h2[^>]*id="${section.id}"[^>]*>[^<]*<\\/h2>)`, 'i');
      if (headingPattern.test(content)) {
        content = content.replace(headingPattern, (match) => match + '\n' + illustrationHtml);
        injectedCount++;
      }
    }
  });

  // 3. Fix any malformed img tag (from earlier injections)
  content = content.replace(/<img([^>]*?) \/ loading="lazy">/g, '<img$1 loading="lazy">');

  fs.writeFileSync(filePath, content);
  console.log(`  ✅ ${stageKey}.html — injected app.js + ${injectedCount} illustrations`);
});

console.log('\n🎉 All stage pages enhanced!');
