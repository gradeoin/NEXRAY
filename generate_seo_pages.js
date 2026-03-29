const fs = require('fs');
const path = require('path');

const aboutHtml = fs.readFileSync('about.html', 'utf8');

// The <div class="page-wrapper"> content
const startSplit = '<div class="page-wrapper">';
const endSplit = '  <footer class="footer">';

const headerPart = aboutHtml.substring(0, aboutHtml.indexOf(startSplit) + startSplit.length);
const footerPart = '\n  </div>\n' + aboutHtml.substring(aboutHtml.indexOf(endSplit));

// Title regex replacement helper
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
    filename: 'website-creation.html',
    title: 'Website Creation Guide 2026 — Nexray',
    desc: 'Learn the definitive modern approach to website creation. Build fast, scalable, and beautifully designed web applications from scratch.',
    content: `
      <div style="padding:5rem 2rem 3rem;">
        <div style="max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:900;margin-bottom:1.25rem;">Modern <span style="color:var(--brand);">Website Creation</span></h1>
          <p style="color:var(--text-2);font-size:1.1rem;max-width:700px;margin:0 auto 3rem;">In 2026, website creation has evolved beyond basic HTML files over FTP. Welcome to the era of frameworks, Edge Networks, and Glassmorphic UI.</p>
        </div>
        
        <div class="grid-3" style="max-width:1100px;margin:0 auto;">
          <div class="glass-card">
            <h3 style="margin-bottom:1rem;">1. Semantic Architecture</h3>
            <p style="color:var(--text-secondary);font-size:0.9rem;">Start with accessibility-first semantic HTML5. Your site must be understandable by screen readers and AI crawlers alike.</p>
          </div>
          <div class="glass-card">
            <h3 style="margin-bottom:1rem;">2. Performance Optimization</h3>
            <p style="color:var(--text-secondary);font-size:0.9rem;">Large images must be served via CDN in next-gen formats (WebP/AVIF). Minimize blocking JavaScript.</p>
          </div>
          <div class="glass-card">
            <h3 style="margin-bottom:1rem;">3. Hosting & Deployment</h3>
            <p style="color:var(--text-secondary);font-size:0.9rem;">Ditch cPanel. Deploy modern static and serverless applications directly from GitHub using Vercel or Netlify.</p>
          </div>
        </div>

        <div style="max-width:800px;margin:5rem auto 2rem;text-align:center;">
          <h2>Ready to build your first app?</h2>
          <a href="guide/stage1.html" class="btn btn-primary mt-md" style="font-size:1.1rem;padding:12px 30px;">Start the 7-Stage Course</a>
        </div>
      </div>
    `
  },
  {
    filename: 'react-development-tools.html',
    title: 'React Development Tools & Ecosystem — Nexray',
    desc: 'Discover the most powerful React development tools, libraries, and frameworks used by elite engineers in 2026.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <div class="stage-badge" style="margin-bottom:1.5rem;display:inline-block;">React Ecosystem</div>
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">The Ultimate <span style="color:var(--brand);">React</span> Setup</h1>
          <p style="color:var(--text-secondary);font-size:1rem;line-height:1.8;margin-bottom:3rem;">
            React is the undisputed king of UI libraries. But installing React isn't enough – you need the right tools. Here is the modern React stack.
          </p>

          <div class="glass-card mb-md">
            <h3>Next.js 15+</h3>
            <p style="color:var(--text-2);margin-top:0.5rem;font-size:0.95rem;">The React framework for production. Server Components, Edge rendering, and built-in image optimization.</p>
          </div>
          <div class="glass-card mb-md">
            <h3>Vite</h3>
            <p style="color:var(--text-2);margin-top:0.5rem;font-size:0.95rem;">If you don't need SSR, Vite is the lightning-fast build tool that replaced Create React App.</p>
          </div>
          <div class="glass-card mb-md">
            <h3>Zustand / Redux Toolkit</h3>
            <p style="color:var(--text-2);margin-top:0.5rem;font-size:0.95rem;">State management simplified. Zustand for simple global stores, Redux Toolkit for complex enterprise apps.</p>
          </div>
      </div>
    `
  },
  {
    filename: 'tailwind-css-best-practices.html',
    title: 'Tailwind CSS Best Practices — Nexray',
    desc: 'Master Tailwind CSS with our advanced guide on utility classes, responsive design, and component extraction.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">Mastering <span style="color:var(--brand);">Tailwind CSS</span></h1>
          <p style="color:var(--text-secondary);font-size:1rem;line-height:1.8;margin-bottom:3rem;">
            Tailwind CSS changed how we write styles. Stop naming classes like <code>.card-outer-wrapper</code> and start building rapidly with utility classes.
          </p>

          <div class="grid-2 mt-md text-left">
            <div class="glass-card">
              <h3>Avoid @apply Abuse</h3>
              <p style="color:var(--text-2);margin-top:0.5rem;font-size:0.95rem;">Don't use <code>@apply</code> just to create custom classes. It defeats the purpose of Tailwind. Keep styles directly in your HTML/JSX.</p>
            </div>
            <div class="glass-card">
              <h3>JIT Compilation</h3>
              <p style="color:var(--text-2);margin-top:0.5rem;font-size:0.95rem;">Leverage arbitrary values like <code>w-[325px]</code> or <code>bg-[#0038FF]</code> for exact pixel precision when the design system doesn't fit.</p>
            </div>
            <div class="glass-card" style="grid-column: 1 / -1;">
              <h3>Responsive Design Made Easy</h3>
              <p style="color:var(--text-2);margin-top:0.5rem;font-size:0.95rem;">Mobile-first approach: use <code>w-full md:w-1/2 lg:w-1/3</code> to easily scale layouts up across screen sizes.</p>
            </div>
          </div>
      </div>
    `
  },
  {
    filename: 'full-stack-roadmap-2026.html',
    title: 'Full Stack Developer Roadmap 2026 — Nexray',
    desc: 'The complete path to becoming a hired full-stack software engineer. From HTML/CSS to containerization and cloud deployments.',
    content: `
      <div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">
          <h1 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;margin-bottom:1.25rem;">2026 <span style="color:var(--brand);">Full-Stack</span> Roadmap</h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">
            The skills you need to learn today to get hired tomorrow. No fluff, just the high-impact technologies powering modern startups and enterprise companies.
          </p>

          <div class="step-card"><div class="step-number">I</div><div class="step-content"><h3>Frontend Foundations</h3><p>Semantic HTML, deeply understanding CSS (Flexbox, Grid, Variables), Vanilla JavaScript ES6+.</p></div></div>
          <div class="step-card"><div class="step-number">II</div><div class="step-content"><h3>Modern Frameworks</h3><p>React, Next.js, and state management. Tailwind CSS for rapid UI development.</p></div></div>
          <div class="step-card"><div class="step-number">III</div><div class="step-content"><h3>Backend & APIs</h3><p>Node.js, Express (or Hono/Elysia), RESTful APIs, GraphQL. Relational (PostgreSQL) and NoSQL (MongoDB, Firebase) databases.</p></div></div>
          <div class="step-card"><div class="step-number">IV</div><div class="step-content"><h3>DevOps & Cloud</h3><p>Docker containerization, CI/CD pipelines (GitHub Actions), AWS/Vercel deployments, and DNS configuration.</p></div></div>
          
          <div style="margin-top:3rem;text-align:center;">
             <a href="guide/stage1.html" class="btn btn-primary">Start Your Journey For Free</a>
          </div>
      </div>
    `
  }
];

// Generate files
pages.forEach(page => {
    let finalHtml = headerPart + page.content + footerPart;
    finalHtml = updateMeta(finalHtml, page.title, page.desc);
    
    // Add them to the SW caching array ? (optional, but good)
    
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
    console.log('Added new pages to sw.js cache.');
}
