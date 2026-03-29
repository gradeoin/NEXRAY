const fs = require('fs');
const path = require('path');

// Map of: stageFile -> [ { anchorId, direction, svg, heading, body, bullets } ]
const INJECTIONS = {
  'stage2.html': [
    {
      anchorId: 'css-fundamentals',
      direction: '',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="180" height="140" rx="10" fill="rgba(249,115,22,0.05)" stroke="#f97316" stroke-width="1.5"/><rect x="10" y="10" width="180" height="22" rx="10" fill="rgba(249,115,22,0.1)"/><text x="20" y="25" font-size="8" fill="#f97316" font-family="monospace">style.css</text><text x="20" y="48" font-size="8" fill="#f97316" font-family="monospace">body {</text><text x="30" y="62" font-size="8" fill="#94a3b8" font-family="monospace">font-family: Inter;</text><text x="30" y="76" font-size="8" fill="#3b82f6" font-family="monospace">background: #09090f;</text><text x="30" y="90" font-size="8" fill="#eab308" font-family="monospace">color: #ffffff;</text><text x="20" y="104" font-size="8" fill="#f97316" font-family="monospace">}</text><rect x="140" y="98" width="2" height="10" rx="1" fill="#f97316" opacity="0.7"><animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/></rect></svg>`,
      heading: 'CSS Gives Your Site Its Look',
      body: 'CSS (Cascading Style Sheets) controls how HTML elements appear on screen — every color, font, spacing rule, and animation is powered by CSS.',
      bullets: ['Selectors target HTML elements', 'Properties define visual appearance', 'Responsive design adapts to any screen']
    },
    {
      anchorId: 'flexbox',
      direction: 'reverse',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="180" height="100" rx="8" fill="none" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/><rect x="20" y="42" width="45" height="76" rx="6" fill="rgba(249,115,22,0.15)" stroke="#f97316" stroke-width="1"><animate attributeName="width" values="45;50;45" dur="3s" repeatCount="indefinite"/></rect><rect x="75" y="42" width="50" height="76" rx="6" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"><animate attributeName="width" values="50;60;50" dur="3s" repeatCount="indefinite"/></rect><rect x="135" y="42" width="45" height="76" rx="6" fill="rgba(74,222,128,0.15)" stroke="#4ade80" stroke-width="1"><animate attributeName="width" values="45;40;45" dur="3s" repeatCount="indefinite"/></rect><text x="42" y="84" font-size="8" fill="#f97316" text-anchor="middle">flex:1</text><text x="100" y="84" font-size="8" fill="#3b82f6" text-anchor="middle">flex:2</text><text x="157" y="84" font-size="8" fill="#4ade80" text-anchor="middle">flex:1</text></svg>`,
      heading: 'Flexbox: 1D Flexible Layouts',
      body: 'Flexbox makes it effortless to align items in a row or column. Think of it as a smart container that automatically distributes space between elements.',
      bullets: ['justify-content aligns on main axis', 'align-items aligns on cross axis', 'flex-grow lets items share space']
    }
  ],

  'stage3.html': [
    {
      anchorId: 'what-is-backend',
      direction: '',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="20" width="80" height="120" rx="8" fill="rgba(249,115,22,0.05)" stroke="#f97316" stroke-width="2"/><rect x="65" y="30" width="70" height="14" rx="4" fill="rgba(249,115,22,0.15)" stroke="#f97316" stroke-width="1"/><circle cx="123" cy="37" r="3" fill="#4ade80"><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle><rect x="65" y="52" width="70" height="14" rx="4" fill="rgba(249,115,22,0.1)" stroke="#f97316" stroke-width="1" opacity="0.7"/><circle cx="123" cy="59" r="3" fill="#4ade80" opacity="0.6"/><line x1="10" y1="80" x2="55" y2="80" stroke="#f97316" stroke-width="1.5" stroke-dasharray="4,3"/><text x="10" y="70" font-size="8" fill="#94a3b8">GET /api</text><line x1="145" y1="80" x2="190" y2="80" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,3"/><text x="160" y="70" font-size="8" fill="#94a3b8">DB</text></svg>`,
      heading: 'What is Backend Development?',
      body: 'The backend is the engine room of your app — it processes requests, talks to databases, handles authentication, and sends data back to the browser.',
      bullets: ['Server receives HTTP requests', 'Logic processes data and auth', 'Database stores persistent data', 'Response sends JSON/HTML back']
    },
    {
      anchorId: 'firebase-auth',
      direction: 'reverse',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="50" y="25" width="100" height="110" rx="12" fill="rgba(249,115,22,0.05)" stroke="#f97316" stroke-width="1.5"/><circle cx="100" cy="60" r="20" fill="none" stroke="#f97316" stroke-width="2"/><rect x="90" y="50" width="20" height="14" rx="4" fill="rgba(249,115,22,0.3)"/><circle cx="100" cy="44" r="8" fill="none" stroke="#f97316" stroke-width="1.5"/><text x="100" y="100" font-size="9" fill="#f97316" text-anchor="middle" font-weight="bold">Firebase Auth</text><text x="100" y="115" font-size="7" fill="#94a3b8" text-anchor="middle">Google OAuth</text><circle cx="75" cy="130" r="3" fill="#4ade80"><animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="100" cy="130" r="3" fill="#4ade80"/><circle cx="125" cy="130" r="3" fill="#4ade80"/></svg>`,
      heading: 'Firebase Authentication',
      body: 'Firebase Auth lets you add secure sign-in to your app in minutes. Support Google, GitHub, email/password, and more — all with a few lines of code.',
      bullets: ['Google OAuth in 5 lines of JS', 'Email/password with verification', 'Persistent login across sessions']
    }
  ],

  'stage4.html': [
    {
      anchorId: 'git-basics',
      direction: '',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="80" r="12" fill="rgba(249,115,22,0.2)" stroke="#f97316" stroke-width="2"/><text x="40" y="84" font-size="7" fill="#f97316" text-anchor="middle">Init</text><line x1="52" y1="80" x2="75" y2="80" stroke="#f97316" stroke-width="2"/><circle cx="88" cy="80" r="12" fill="rgba(249,115,22,0.15)" stroke="#f97316" stroke-width="1.5"/><text x="88" y="84" font-size="6" fill="#f97316" text-anchor="middle">Commit</text><line x1="100" y1="80" x2="125" y2="80" stroke="#f97316" stroke-width="2"/><circle cx="138" cy="80" r="12" fill="rgba(74,222,128,0.2)" stroke="#4ade80" stroke-width="2"/><text x="138" y="84" font-size="7" fill="#4ade80" text-anchor="middle">Push</text><line x1="88" y1="68" x2="88" y2="45" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3,2"/><circle cx="88" cy="38" r="10" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1.5"/><text x="88" y="42" font-size="6" fill="#3b82f6" text-anchor="middle">Branch</text></svg>`,
      heading: 'Git: Tracking Every Change',
      body: 'Git is a version control system that records every change you make. Branch, commit, merge, and collaborate with teams — it is the backbone of modern software development.',
      bullets: ['git init starts a repository', 'git commit saves a snapshot', 'git push syncs to GitHub', 'Branches let you experiment safely']
    }
  ],

  'stage5.html': [
    {
      anchorId: 'custom-email',
      direction: '',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="30" width="160" height="100" rx="10" fill="rgba(249,115,22,0.05)" stroke="#f97316" stroke-width="1.5"/><polyline points="20,30 100,85 180,30" fill="none" stroke="#f97316" stroke-width="2"/><polyline points="20,130 70,90" fill="none" stroke="#f97316" stroke-width="1" opacity="0.3"/><polyline points="180,130 130,90" fill="none" stroke="#f97316" stroke-width="1" opacity="0.3"/><text x="100" y="115" font-size="8" fill="#f97316" text-anchor="middle">hello@nexray.in</text><circle cx="160" cy="50" r="8" fill="rgba(74,222,128,0.2)" stroke="#4ade80" stroke-width="1.5"><animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/></circle><text x="160" y="53" font-size="7" fill="#4ade80" text-anchor="middle">✓</text></svg>`,
      heading: 'Professional Email Setup',
      body: 'Setting up a custom email like hello@nexray.in gives your brand instant credibility. Connect your domain with Google Workspace, Zoho, or Cloudflare Email Routing.',
      bullets: ['MX records point mail to your provider', 'SPF/DKIM prevent spoofing', 'Forwarding rules route incoming email']
    }
  ],

  'stage6.html': [
    {
      anchorId: 'methods-overview',
      direction: '',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="65" y="10" width="70" height="140" rx="14" fill="none" stroke="#f97316" stroke-width="2"/><rect x="68" y="13" width="64" height="134" rx="12" fill="rgba(249,115,22,0.03)"/><circle cx="100" cy="145" r="5" fill="none" stroke="#f97316" stroke-width="1.5"/><rect x="88" y="16" width="24" height="5" rx="2.5" fill="#f97316" opacity="0.3"/><rect x="75" y="30" width="22" height="22" rx="6" fill="rgba(249,115,22,0.2)" stroke="#f97316" stroke-width="1"/><rect x="103" y="30" width="22" height="22" rx="6" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="1"/><rect x="75" y="58" width="22" height="22" rx="6" fill="rgba(74,222,128,0.2)" stroke="#4ade80" stroke-width="1"/><rect x="103" y="58" width="22" height="22" rx="6" fill="rgba(234,179,8,0.2)" stroke="#eab308" stroke-width="1"/><text x="100" y="108" font-size="7" fill="#f97316" text-anchor="middle">React Native</text><text x="100" y="120" font-size="7" fill="#94a3b8" text-anchor="middle">or Capacitor</text></svg>`,
      heading: 'Web to Android: The Methods',
      body: 'There are multiple paths from web to mobile app — Progressive Web Apps, TWA wrappers, Capacitor hybrid apps, and full React Native. Choose the right one for your project.',
      bullets: ['PWA: zero app store, instant install', 'TWA: Chrome wrapper on Play Store', 'Capacitor: web app with native APIs', 'React Native: full native experience']
    }
  ],

  'stage7.html': [
    {
      anchorId: 'seo-fundamentals',
      direction: '',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><path d="M 100 140 L 80 120 Q 80 70 100 30 Q 120 70 120 120 Z" fill="rgba(249,115,22,0.15)" stroke="#f97316" stroke-width="2"/><circle cx="100" cy="80" r="10" fill="none" stroke="#f97316" stroke-width="2"/><path d="M 80 120 L 65 135" stroke="#f97316" stroke-width="2" stroke-linecap="round"/><path d="M 120 120 L 135 135" stroke="#f97316" stroke-width="2" stroke-linecap="round"/><path d="M 90 140 Q 100 155 110 140" stroke="#f97316" stroke-width="2" fill="rgba(249,115,22,0.3)" stroke-linecap="round"><animate attributeName="d" values="M 90 140 Q 100 155 110 140;M 91 140 Q 100 162 109 140;M 90 140 Q 100 155 110 140" dur="0.8s" repeatCount="indefinite"/></path><circle cx="20" cy="30" r="2" fill="#f97316" opacity="0.5"/><circle cx="50" cy="15" r="1.5" fill="#f97316" opacity="0.4"/><circle cx="150" cy="20" r="2" fill="#f97316" opacity="0.5"/><circle cx="175" cy="50" r="1.5" fill="#f97316" opacity="0.3"/><text x="100" y="18" font-size="9" fill="#4ade80" text-anchor="middle" font-weight="bold">LAUNCH</text></svg>`,
      heading: 'Launch, Rank & Grow',
      body: 'SEO is how Google finds and ranks your site. From meta tags to structured data, performance scores to backlinks — every detail matters for organic traffic.',
      bullets: ['Title tags and meta descriptions', 'Structured data (JSON-LD)', 'Core Web Vitals for ranking', 'Content marketing drives traffic']
    }
  ]
};

// Build illustration HTML
function buildBlock(s) {
  const bHtml = (s.bullets || []).map(b => '<li>' + b + '</li>').join('');
  return `
<div class="illustration-block ${s.direction || ''}" id="illus-${s.anchorId}">
  <div class="illus-svg">${s.svg}</div>
  <div class="illus-text">
    <h3>${s.heading}</h3>
    <p>${s.body}</p>
    ${bHtml ? '<ul>' + bHtml + '</ul>' : ''}
  </div>
</div>`;
}

// Process each stage file
Object.entries(INJECTIONS).forEach(([filename, sections]) => {
  const filePath = path.join(__dirname, 'guide', filename);
  if (!fs.existsSync(filePath)) {
    console.log('  SKIP ' + filename + ' (not found)');
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  sections.forEach(section => {
    const marker = 'id="' + section.anchorId + '"';
    const alreadyMarker = 'id="illus-' + section.anchorId + '"';
    if (content.includes(alreadyMarker)) {
      console.log('  ⏭  ' + filename + ' #' + section.anchorId + ' already has illustration');
      return;
    }
    if (!content.includes(marker)) {
      console.log('  ⚠  ' + filename + ' missing anchor #' + section.anchorId);
      return;
    }

    // Find the h2 with this id and inject illustration after it
    const re = new RegExp('(<h2[^>]*id="' + section.anchorId + '"[^>]*>[\\s\\S]*?<\\/h2>)');
    const m = content.match(re);
    if (m) {
      content = content.replace(m[0], m[0] + '\n' + buildBlock(section));
      count++;
    }
  });

  // Fix broken img tags
  content = content.replace(/<img([^>]*?) \/ loading="lazy">/g, '<img$1 loading="lazy">');

  fs.writeFileSync(filePath, content);
  console.log('  ✅ ' + filename + ' — ' + count + ' illustrations injected');
});

console.log('\n🎉 All stages enhanced with contextual SVG illustrations!');
