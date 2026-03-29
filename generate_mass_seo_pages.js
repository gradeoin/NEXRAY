const fs = require('fs');
const path = require('path');

const aboutHtml = fs.readFileSync('about.html', 'utf8');

const startSplit = '<div class="page-wrapper">';
const endSplit = '  <footer class="footer">';

const headerPart = aboutHtml.substring(0, aboutHtml.indexOf(startSplit) + startSplit.length);
const footerPart = '\n  </div>\n' + aboutHtml.substring(aboutHtml.indexOf(endSplit));

function updateMeta(markup, title, desc) {
    let html = markup.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/, `<meta name="description" content="${desc}"`);
    html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"/, `<meta property="og:title" content="${title}"`);
    html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"/, `<meta property="og:description" content="${desc}"`);
    html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"/, `<meta name="twitter:title" content="${title}"`);
    html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"/, `<meta name="twitter:description" content="${desc}"`);
    return html;
}

const pages = [
  {
    filename: 'javascript-tutorial-for-beginners.html',
    title: 'JavaScript Tutorial for Beginners (2026) | Nexray',
    desc: 'The complete beginner guide to modern JavaScript (ES6+). Learn variables, functions, and the DOM with interactive examples.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Modern <span style="color:var(--brand);">JavaScript</span> Tutorial</h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">
            JavaScript powers 98% of the modern web. Bypass the outdated tutorials and learn ES6+ natively.
          </p>
          <div class="grid-3 text-left">
            <div class="glass-card"><h3>1. ES6 Syntax</h3><p style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-secondary);">Master <code>let</code>, <code>const</code>, arrow functions, and destructuring from day one.</p></div>
            <div class="glass-card"><h3>2. DOM Manipulation</h3><p style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-secondary);">Select and modify HTML elements dynamically without jQuery.</p></div>
            <div class="glass-card"><h3>3. Async / Await</h3><p style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-secondary);">Handle API requests and promises elegantly using modern async syntax.</p></div>
          </div>
          <div style="margin-top:4rem;"><a href="guide/stage2.html" class="btn btn-primary">Start Coding JS for Free</a></div>
      </div>
    `
  },
  {
    filename: 'learn-typescript-in-2026.html',
    title: 'Learn TypeScript in 2026: Why You Should Switch | Nexray',
    desc: 'Discover why TypeScript has become the industry standard for React and Node.js applications.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Learn <span style="color:var(--brand);">TypeScript</span> for Production</h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">
            If you know JavaScript, you need to learn TypeScript. It catches bugs before your code even runs.
          </p>
          <div class="step-card"><div class="step-number">I</div><div class="step-content"><h3>Static Typing</h3><p>Define interfaces and types. Replace runtime crashes with editor warnings.</p></div></div>
          <div class="step-card"><div class="step-number">II</div><div class="step-content"><h3>Generics</h3><p>Build reusable, flexible components that adapt to the data you pass them.</p></div></div>
          <div class="step-card"><div class="step-number">III</div><div class="step-content"><h3>TSConfig setup</h3><p>How to configure strict mode for complex enterprise applications.</p></div></div>
          <div style="margin-top:3rem;text-align:center;"><a href="guide/stage2.html" class="btn btn-primary">Master TypeScript Today</a></div>
      </div>
    `
  },
  {
    filename: 'best-code-editors.html',
    title: 'Top 5 Best Code Editors for Web Development | Nexray',
    desc: 'A comprehensive review of the best code editors and IDEs for web developers looking for speed, AI integration, and ease of use.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Best <span style="color:var(--brand);">Code Editors</span> Evaluated</h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">Your code editor is your primary weapon. Use the right one.</p>
          <div class="grid-2 text-left">
            <div class="glass-card"><h3>1. VS Code</h3><p style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-secondary);">The industry standard IDE from Microsoft. Massive extension ecosystem.</p></div>
            <div class="glass-card"><h3>2. Cursor</h3><p style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-secondary);">Built-in AI pairs. The new favorite among Silicon Valley startup devs.</p></div>
            <div class="glass-card"><h3>3. Zed</h3><p style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-secondary);">Ultra-fast, Rust-based code editor built for maximum performance and collaboration.</p></div>
            <div class="glass-card"><h3>4. WebStorm</h3><p style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-secondary);">JetBrains heavy-duty JavaScript IDE for colossal monorepos.</p></div>
          </div>
      </div>
    `
  },
  {
    filename: 'css-grid-vs-flexbox.html',
    title: 'CSS Grid vs Flexbox: When to Use Which | Nexray',
    desc: 'The definitive guide on choosing between CSS Grid and Flexbox for modern responsive layouts.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">CSS Grid <span style="color:var(--brand);">vs</span> Flexbox</h1>
          <div class="grid-2 mt-xl">
             <div class="glass-card"><h2>Flexbox (1D Layout)</h2><p>Designed for one-dimensional layouts (a row OR a column). Perfect for aligning items, distributing space inside a navbar, or centering content.</p></div>
             <div class="glass-card"><h2>CSS Grid (2D Layout)</h2><p>Designed for two-dimensional layouts (rows AND columns). Perfect for holistic page skeletons, complex galleries, and responsive macro-architectures.</p></div>
          </div>
          <div style="text-align:center;margin-top:4rem;"><a href="guide/stage2.html" class="btn btn-primary">Learn Advanced CSS Properties</a></div>
      </div>
    `
  },
  {
    filename: 'what-is-an-api.html',
    title: 'What is an API? A Simple Explanation for Beginners | Nexray',
    desc: 'An easy-to-understand breakdown of what an API is, how REST architectures work, and why they are essential to modern web development.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">What exactly is an <span style="color:var(--brand);">API</span>?</h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;text-align:left;">
            An API (Application Programming Interface) is a messenger that takes requests, tells a system what you want to do, and then returns the response back to you. Think of it like a waiter in a restaurant taking your order to the kitchen.
          </p>
          <div class="glass-card text-left mb-md">
            <h3>RESTful APIs</h3>
            <p>The most common architecture. Relies on stateless HTTP requests (GET, POST, PUT, DELETE) to manipulate data.</p>
          </div>
          <div class="glass-card text-left mb-md">
            <h3>JSON Payload</h3>
            <p>The universal language spoken between servers and clients. It looks exactly like JavaScript objects.</p>
          </div>
          <div style="margin-top:3rem;"><a href="guide/stage3.html" class="btn btn-primary">Build Your First API</a></div>
      </div>
    `
  },
  {
    filename: 'how-to-become-a-frontend-developer.html',
    title: 'How to Become a Frontend Developer in 2026 | Nexray',
    desc: 'The complete step-by-step roadmap to securing a high-paying job as a UI engineer and Frontend Developer.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Become a <span style="color:var(--brand);">Frontend Developer</span></h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">
            Frontend development handles everything the user sees and interacts with. It requires logic, design sense, and mastery over the document object model.
          </p>
          <div class="step-card"><div class="step-number">1</div><div class="step-content"><h3>Vanilla HTML/CSS/JS</h3><p>You cannot skip the fundamentals. Learn how the browser works natively first.</p></div></div>
          <div class="step-card"><div class="step-number">2</div><div class="step-content"><h3>Component Frameworks</h3><p>Master React and Vite. Understand state, props, and declarative rendering.</p></div></div>
          <div class="step-card"><div class="step-number">3</div><div class="step-content"><h3>CSS Architecture</h3><p>Learn Tailwind CSS, CSS Modules, and how to build scalable design systems.</p></div></div>
          <div class="step-card"><div class="step-number">4</div><div class="step-content"><h3>Deployment</h3><p>Host on Vercel, debug performance issues, write unit tests.</p></div></div>
          <div style="margin-top:3rem;text-align:center;"><a href="guide/stage1.html" class="btn btn-primary">Start the Free Curriculum</a></div>
      </div>
    `
  },
  {
    filename: 'backend-development-languages.html',
    title: 'Best Backend Development Languages for 2026 | Nexray',
    desc: 'Compare Node.js, Python, Go, and Rust. Find out which programming language you should learn for backend engineering.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Best <span style="color:var(--brand);">Backend</span> Languages</h1>
          <div class="grid-2 text-left mt-xl">
            <div class="glass-card"><h3>Node.js / TypeScript</h3><p>The undisputed king of the full-stack web. Write backend code in the same language as your frontend.</p></div>
            <div class="glass-card"><h3>Python</h3><p>Incredible for AI, data science, and quick startup prototyping via Django or FastAPI.</p></div>
            <div class="glass-card"><h3>Go (Golang)</h3><p>Incredible concurrency. Used to build high-performance microservices and cloud-native infrastructure.</p></div>
            <div class="glass-card"><h3>Rust</h3><p>The most loved language. Offers C-like performance with absolute memory safety. Rapidly eating up the backend stack.</p></div>
          </div>
      </div>
    `
  },
  {
    filename: 'deploy-react-app-free.html',
    title: 'How to Deploy a React App for Free | Nexray',
    desc: 'A step-by-step guide to hosting your React or Next.js applications absolutely free on Vercel, Netlify, or Cloudflare Pages.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Deploy React <span style="color:var(--brand);">For Free</span></h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">
            Stop paying for complex servers. Modern JAMstack apps can be hosted globally on highly optimized CDNs for $0/month.
          </p>
          <div class="glass-card mb-md">
            <h2>Vercel</h2>
            <p>The creators of Next.js. Absolute best-in-class developer experience. Connect your GitHub repository, and it automatically builds and deploys on every push.</p>
          </div>
          <div class="glass-card mb-md">
            <h2>Cloudflare Pages</h2>
            <p>Unmatched edge performance. Unlimited bandwidth for free. Integrates seamlessly with Cloudflare Workers for full-stack edge compute.</p>
          </div>
          <div class="glass-card mb-md">
            <h2>Netlify</h2>
            <p>The pioneer of the JAMstack. Incredibly easy to use, with great built-in serverless functions and form handling tools.</p>
          </div>
      </div>
    `
  },
  {
    filename: 'github-actions-cicd-guide.html',
    title: 'GitHub Actions & CI/CD Guide for Beginners | Nexray',
    desc: 'Learn Continuous Integration and Continuous Deployment (CI/CD) by mastering GitHub Actions workflows.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Master <span style="color:var(--brand);">GitHub Actions</span></h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;text-align:left;">
            CI/CD is how modern teams ship software safely. Every time you push code, GitHub Actions can automatically run your unit tests, lint your code, and deploy to your production servers.
          </p>
          <div class="grid-3 text-left">
            <div class="glass-card"><h3>1. Workflows .yml</h3><p>Define automated tasks explicitly in YAML files stored inside the <code>.github/workflows</code> directory.</p></div>
            <div class="glass-card"><h3>2. Automated Testing</h3><p>Catch failing tests on Pull Requests before merging broken code into the main branch.</p></div>
            <div class="glass-card"><h3>3. Secret Management</h3><p>Securely inject API keys via GitHub Environments without ever committing them to your repository.</p></div>
          </div>
          <div style="margin-top:3rem;"><a href="guide/stage4.html" class="btn btn-primary">Learn DevOps on Nexray</a></div>
      </div>
    `
  },
  {
    filename: 'firebase-vs-supabase.html',
    title: 'Firebase vs Supabase: Which Backend as a Service is Best? | Nexray',
    desc: 'A comprehensive comparison between Google Firebase (NoSQL) and Supabase (PostgreSQL) for modern web development.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Firebase vs <span style="color:var(--brand);">Supabase</span></h1>
          <div class="grid-2 mt-xl">
             <div class="glass-card"><h2>Google Firebase (NoSQL)</h2><p>Incredible real-time synchronization, massive scale out of the box, and a fully managed ecosystem. Driven by collections and documents. Still the industry titan.</p></div>
             <div class="glass-card"><h2>Supabase (SQL)</h2><p>The open-source alternative. Built entirely on standard PostgreSQL. Incredible performance, strictly typed data relations, and powerful Edge Functions.</p></div>
          </div>
          <div style="text-align:center;margin-top:4rem;"><a href="guide/stage3.html" class="btn btn-primary">Implement Firebase Now</a></div>
      </div>
    `
  },
  {
    filename: 'docker-for-web-developers.html',
    title: 'Docker Complete Guide for Web Developers | Nexray',
    desc: 'Understand containerization, Dockerfiles, and Docker Compose with our easy guide meant specifically for web developers.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Guide to <span style="color:var(--brand);">Docker</span></h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;text-align:left;">
            Docker solves the works-on-my-machine problem. It packages your application, environment, and dependencies into an immutable container.
          </p>
          <div class="glass-card text-left mb-md">
            <h3>Dockerfiles</h3>
            <p>A declarative list of instructions. Start from a base OS image, install node, copy your app files, and expose a port.</p>
          </div>
          <div class="glass-card text-left mb-md">
            <h3>Docker Compose</h3>
            <p>The orchestration layer for local development. Spin up a Postgres database alongside your Node API with one command.</p>
          </div>
      </div>
    `
  },
  {
    filename: 'web-accessibility-wcag-2026.html',
    title: 'Web Accessibility (A11Y) Best Practices 2026 | Nexray',
    desc: 'Ensure your websites pass WCAG 2.1 compliance. A guide to ARIA labels, semantic HTML, and high-contrast design.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Web <span style="color:var(--brand);">Accessibility</span> (A11Y)</h1>
          <div class="step-card"><div class="step-number">I</div><div class="step-content"><h3>Semantic Navigation</h3><p>Use correct HTML native tags. Buttons for actions, anchors for navigation links. Do not build buttons out of divs.</p></div></div>
          <div class="step-card"><div class="step-number">II</div><div class="step-content"><h3>Contrast Ratios</h3><p>Ensure your foreground text has at least a 4.5:1 contrast ratio against the background layer for visually impaired users.</p></div></div>
          <div class="step-card"><div class="step-number">III</div><div class="step-content"><h3>Keyboard Navigation</h3><p>Your entire website must be fully traversable and usable via the Tab key. Implement strict focus outlines.</p></div></div>
      </div>
    `
  },
  {
    filename: 'how-to-learn-coding.html',
    title: 'How to Learn Coding Fast and Efficiently | Nexray',
    desc: 'The science-backed roadmap to learning to code. Stop tutorial hell and start building production-ready projects.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">How to <span style="color:var(--brand);">Learn Coding</span></h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">Tutorial Hell is real. Watching 10-hour code alongs will not make you a developer.</p>
          <div class="grid-2 text-left">
            <div class="glass-card"><h3>1. Build While You Learn</h3><p>Typing code builds muscle memory. Reading code builds theory. You need both.</p></div>
            <div class="glass-card"><h3>2. RTFM (Read The Docs)</h3><p>Developers spend 60% of their time reading documentation. Get comfortable navigating official docs quickly.</p></div>
            <div class="glass-card"><h3>3. Break Things Intentionally</h3><p>To understand an error, you must cause it first. Tinker with working code until it snaps, then reverse engineer the error.</p></div>
            <div class="glass-card"><h3>4. Focused Guidance</h3><p>Use a single, highly structured curriculum like Nexray instead of bouncing between random tutorial snippets.</p></div>
          </div>
          <div style="text-align:center;margin-top:4rem;"><a href="guide/stage1.html" class="btn btn-primary">Start The Definitive Guide</a></div>
      </div>
    `
  },
  {
    filename: 'best-programming-languages-2026.html',
    title: 'Top Programming Languages to Learn in 2026 | Nexray',
    desc: 'The definitive ranking of the most in-demand programming languages by salary, job availability, and overall developer satisfaction.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Top <span style="color:var(--brand);">Languages</span> in 2026</h1>
          <div class="glass-card mb-md"><h2>#1 JavaScript / TypeScript</h2><p>It owns the web. Period. React, Next.js, and Node are immovable titans in the industry.</p></div>
          <div class="glass-card mb-md"><h2>#2 Python</h2><p>With AI dominating the globe, Python remains the inescapable king of machine learning, data engineering, and automation.</p></div>
          <div class="glass-card mb-md"><h2>#3 Rust</h2><p>Uncompromising speed and total memory safety. Rust has become the go-to for low-level systems and high-throughput web APIs.</p></div>
          <div class="glass-card mb-md"><h2>#4 Go (Golang)</h2><p>Simple, compiled, and built for immense cloud concurrency. The backend language of choice for massive companies like Uber and Google.</p></div>
      </div>
    `
  },
  {
    filename: 'web-development-bootcamp-alternatives.html',
    title: 'Free Web Development Bootcamp Alternatives | Nexray',
    desc: 'Why you should not pay for a coding bootcamp. Discover the best free, open-source pathways to a tech career.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Skip the <span style="color:var(--brand);">Bootcamp</span></h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;text-align:left;">
            In 2026, information is infinite and free. There is zero reason to go into harsh debt to learn web development. The best engineers are self-taught resource-scavengers.
          </p>
          <div class="grid-3 text-left">
            <div class="glass-card"><h3>Nexray Academy</h3><p>Our completely free, 7-stage zero-to-pro roadmap.</p></div>
            <div class="glass-card"><h3>The Odin Project</h3><p>An amazing text-heavy rigorous open source curriculum.</p></div>
            <div class="glass-card"><h3>FreeCodeCamp</h3><p>An interactive syllabus granting dozens of basic certifications for completely free.</p></div>
          </div>
          <div style="margin-top:3rem;"><a href="guide/stage1.html" class="btn btn-primary">Start Nexray Mastery</a></div>
      </div>
    `
  },
  {
    filename: 'nextjs-app-router-tutorial.html',
    title: 'Next.js App Router Tutorial and Migration Guide | Nexray',
    desc: 'Understand React Server Components, the new Next.js App Router, layout files, and data fetching techniques.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Next.js <span style="color:var(--brand);">App Router</span></h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">
            The paradigm has shifted. React is now a backend and frontend framework rolled into one.
          </p>
          <div class="step-card"><div class="step-number">I</div><div class="step-content"><h3>React Server Components</h3><p>Components render exclusively on the server by default. No JavaScript bundle is sent, leading to absurdly fast load times.</p></div></div>
          <div class="step-card"><div class="step-number">II</div><div class="step-content"><h3>Direct Data Fetching</h3><p>You can directly <code>await db.query()</code> inside your server component. No more complex API routes required for basic data reads.</p></div></div>
          <div class="step-card"><div class="step-number">III</div><div class="step-content"><h3>Layouts & Templates</h3><p>Nested folder structures automatically map to nested UI shells via <code>layout.tsx</code>.</p></div></div>
      </div>
    `
  }
];

// Generate files
pages.forEach(page => {
    let finalHtml = headerPart + page.content + footerPart;
    finalHtml = updateMeta(finalHtml, page.title, page.desc);
    fs.writeFileSync(path.join(__dirname, page.filename), finalHtml, 'utf8');
    console.log('Generated:', page.filename);
});

// Update sw.js to include these in STATIC_ASSETS
let swContent = fs.readFileSync('sw.js', 'utf8');
const assetsRegex = /const STATIC_ASSETS = \[([\s\S]*?)\];/;
const match = swContent.match(assetsRegex);
if(match) {
    let assets = match[1];
    pages.forEach(p => {
        if(!assets.includes(p.filename)) {
            assets += `\n  '/${p.filename}',`;
        }
    });
    swContent = swContent.replace(assetsRegex, `const STATIC_ASSETS = [${assets}\n];`);
    fs.writeFileSync('sw.js', swContent, 'utf8');
    console.log('Added 16 new mass SEO pages to sw.js cache.');
}
