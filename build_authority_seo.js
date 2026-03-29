const fs = require('fs');
const path = require('path');

const aboutHtml = fs.readFileSync('about.html', 'utf8');

const startSplit = '<div class="page-wrapper">';
const endSplit = '  <footer class="footer">';

const headerPart = aboutHtml.substring(0, aboutHtml.indexOf(startSplit) + startSplit.length);
const footerPart = '\\n  </div>\\n' + aboutHtml.substring(aboutHtml.indexOf(endSplit));

function updateMeta(markup, title, desc, extraSchema) {
    let html = markup.replace(new RegExp('<title>.*?</title>'), '<title>' + title + '</title>');
    html = html.replace(new RegExp('<meta\\\\s+name="description"\\\\s+content="[^"]*"'), '<meta name="description" content="' + desc + '"');
    html = html.replace(new RegExp('<meta\\\\s+property="og:title"\\\\s+content="[^"]*"'), '<meta property="og:title" content="' + title + '"');
    html = html.replace(new RegExp('<meta\\\\s+property="og:description"\\\\s+content="[^"]*"'), '<meta property="og:description" content="' + desc + '"');
    html = html.replace(new RegExp('<meta\\\\s+name="twitter:title"\\\\s+content="[^"]*"'), '<meta name="twitter:title" content="' + title + '"');
    html = html.replace(new RegExp('<meta\\\\s+name="twitter:description"\\\\s+content="[^"]*"'), '<meta name="twitter:description" content="' + desc + '"');
    
    if (extraSchema) {
        html = html.replace('</head>', '  ' + extraSchema + '\\n</head>');
    }
    return html;
}

const howToSchema = '<script type="application/ld+json">\\n{\\n  "@context": "https://schema.org",\\n  "@type": "HowTo",\\n  "name": "How to Build a Website from Scratch in 2026",\\n  "description": "A complete 7-step guide to building a modern, responsive, and blazing fast website.",\\n  "step": [\\n    {\\n      "@type": "HowToStep",\\n      "name": "Learn HTML and Semantic Structure",\\n      "text": "Start by learning HTML5 tags to structure your content accessibly.",\\n      "url": "https://nexray.in/guide/stage1.html"\\n    },\\n    {\\n      "@type": "HowToStep",\\n      "name": "Style with CSS and Tailwind",\\n      "text": "Use CSS variables, Flexbox, and CSS Grid to layout your page. Enhance with Tailwind CSS for utility-first styling.",\\n      "url": "https://nexray.in/guide/stage2.html"\\n    },\\n    {\\n      "@type": "HowToStep",\\n      "name": "Add Interactivity with JavaScript",\\n      "text": "Use Vanilla JavaScript (ES6+) to manipulate the DOM, fetch data from APIs, and control state.",\\n      "url": "https://nexray.in/guide/stage2.html"\\n    },\\n    {\\n      "@type": "HowToStep",\\n      "name": "Connect a Backend Database",\\n      "text": "Use Firebase or Supabase to store user data and enable authentication securely without painful server setup.",\\n      "url": "https://nexray.in/guide/stage3.html"\\n    },\\n    {\\n      "@type": "HowToStep",\\n      "name": "Deploy Globally",\\n      "text": "Push your code to GitHub and auto-deploy to Vercel or Cloudflare Pages for a free, lightning-fast edge network setup.",\\n      "url": "https://nexray.in/guide/stage4.html"\\n    }\\n  ]\\n}\\n</script>';

const megaGuideContent = '<div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">' +
  '<div class="stage-badge" style="margin-bottom:1.5rem;display:inline-block;">Ultimate Guide</div>' +
  '<h1 style="font-family:&quot;Space Grotesk&quot;,sans-serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:900;margin-bottom:1.25rem;">How to <span style="color:var(--brand);">Build a Website</span> in 2026</h1>' +
  '<p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">You want to build a website, but tutorials from 2018 tell you to use WordPress and FTP. The web has moved on. Here is exactly how to build a website from scratch, for free, using the exact tools Silicon Valley engineers use today.</p>' +
  '<div class="step-card"><div class="step-number">1</div><div class="step-content"><h3>Master Semantic HTML</h3><p>HTML is the skeleton. Do not just use divs everywhere. Use main, article, section, and nav. Search engines love semantics.</p></div></div>' +
  '<div class="step-card"><div class="step-number">2</div><div class="step-content"><h3>Modern CSS & Design Systems</h3><p>Stop writing monolithic CSS files. Learn CSS Grid for layouts, Flexbox for alignment, and utility classes (like Tailwind) for speed. Implement a dark mode via CSS variables.</p></div></div>' +
  '<div class="step-card"><div class="step-number">3</div><div class="step-content"><h3>JavaScript & The DOM</h3><p>Learn how to select elements, listen for clicks, and manipulate the DOM using modern vanilla JS (ES6+). Forget jQuery.</p></div></div>' +
  '<div class="step-card"><div class="step-number">4</div><div class="step-content"><h3>Component Frameworks (React)</h3><p>Once you know JS, learn React. Extract your UI into reusable components. Manage state efficiently using Hooks.</p></div></div>' +
  '<div class="step-card"><div class="step-number">5</div><div class="step-content"><h3>Backend as a Service (Firebase)</h3><p>You do not need to rent a Linux server. Use Firebase or Supabase for instant database access and user authentication (Google Login) directly from your frontend.</p></div></div>' +
  '<div class="step-card"><div class="step-number">6</div><div class="step-content"><h3>Git & CI/CD Deployment</h3><p>Commit your code to GitHub. Connect your repository to Vercel or Cloudflare Pages. Now, every time you press push, your global website instantly updates online for free.</p></div></div>' +
  '<div style="margin-top:4rem;text-align:center;"><a href="guide/stage1.html" class="btn btn-primary" style="font-size:1.1rem;">Start Stage 1 Now</a></div>' +
'</div>';


const cheatSheets = [
    {
        filename: 'html-css-cheat-sheet.html',
        title: 'HTML5 & CSS3 Cheat Sheet (PDF Notes) | Nexray',
        desc: 'The ultimate HTML and CSS cheat sheet. Downloadable fast reference guide for Flexbox, Grid, and Semantic Tags.',
        content: '<div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">' +
                 '<h1 style="font-family:&quot;Space Grotesk&quot;,sans-serif;font-weight:900;margin-bottom:1.25rem;font-size:3.5rem;">HTML/CSS <span style="color:var(--brand);">Cheat Sheet</span></h1>' +
                 '<p style="color:var(--text-secondary);font-size:1.1rem;margin-bottom:3rem;">Bookmark this page. The only semantic HTML and modern CSS reference you need.</p>' +
                 '<div class="grid-2 text-left">' +
                 '<div class="glass-card"><h3>Flexbox Quick Ref</h3><pre style="background:#0f172a;color:#fff;padding:1rem;border-radius:8px;margin-top:1rem;overflow-x:auto;">.container {\\n  display: flex;\\n  justify-content: center; /* x-axis */\\n  align-items: center; /* y-axis */\\n  flex-direction: column;\\n  gap: 16px;\\n}</pre></div>' +
                 '<div class="glass-card"><h3>CSS Grid Quick Ref</h3><pre style="background:#0f172a;color:#fff;padding:1rem;border-radius:8px;margin-top:1rem;overflow-x:auto;">.grid {\\n  display: grid;\\n  grid-template-columns: repeat(3, 1fr);\\n  gap: 20px;\\n}</pre></div>' +
                 '<div class="glass-card"><h3>HTML Metadata</h3><pre style="background:#0f172a;color:#fff;padding:1rem;border-radius:8px;margin-top:1rem;overflow-x:auto;">&lt;meta name="viewport" \\n content="width=device-width, initial-scale=1"&gt;</pre></div>' +
                 '<div class="glass-card"><h3>Glassmorphism</h3><pre style="background:#0f172a;color:#fff;padding:1rem;border-radius:8px;margin-top:1rem;overflow-x:auto;">.glass {\\n  background: rgba(255, 255, 255, 0.1);\\n  backdrop-filter: blur(10px);\\n  border: 1px solid rgba(255, 255, 255, 0.2);\\n}</pre></div>' +
                 '</div>' +
                 '<div style="margin-top:3rem;"><a href="#" class="btn btn-primary" onclick="window.print()">🖨️ Print to PDF</a></div>' +
                 '</div>'
    },
    {
        filename: 'javascript-cheat-sheet-notes.html',
        title: 'JavaScript ES6+ Cheat Sheet & Notes (2026) | Nexray',
        desc: 'Advanced JavaScript cheat sheet covering Array Methods, Promises, Async/Await, and Destructuring. Perfect for interview prep.',
        content: '<div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">' +
                 '<h1 style="font-family:&quot;Space Grotesk&quot;,sans-serif;font-weight:900;margin-bottom:1.25rem;font-size:3.5rem;">JavaScript <span style="color:var(--brand);">Cheat Sheet</span></h1>' +
                 '<p style="color:var(--text-secondary);font-size:1.1rem;margin-bottom:3rem;">Your pocket guide to ES6+ Array methods, Objects, and Async logic. Perfect for studying or interview prep.</p>' +
                 '<div class="grid-2 text-left">' +
                 '<div class="glass-card"><h3>Array Methods</h3><pre style="background:#0f172a;color:#fff;padding:1rem;border-radius:8px;margin-top:1rem;overflow-x:auto;">const map = arr.map(x =&gt; x * 2);\\nconst filter = arr.filter(x =&gt; x &gt; 5);\\nconst sum = arr.reduce((a, b) =&gt; a + b, 0);</pre></div>' +
                 '<div class="glass-card"><h3>Destructuring</h3><pre style="background:#0f172a;color:#fff;padding:1rem;border-radius:8px;margin-top:1rem;overflow-x:auto;">const { name, age } = user;\\nconst [first, second, ...rest] = array;\\nconst newObj = { ...oldObj, updated: true };</pre></div>' +
                 '<div class="glass-card" style="grid-column: 1 / -1;"><h3>Async / Await (Fetch API)</h3><pre style="background:#0f172a;color:#fff;padding:1rem;border-radius:8px;margin-top:1rem;overflow-x:auto;">async function getData(url) {\\n  try {\\n    const response = await fetch(url);\\n    if (!response.ok) throw new Error("Failed");\\n    const data = await response.json();\\n    return data;\\n  } catch (error) {\\n    console.error(error);\\n  }\\n}</pre></div>' +
                 '</div>' +
                 '<div style="margin-top:3rem;"><a href="#" class="btn btn-primary" onclick="window.print()">🖨️ Print to PDF</a></div>' +
                 '</div>'
    }
];

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('404') && !f.includes('auth'));
let linkList = '';
htmlFiles.forEach(f => {
    let name = f.replace('.html', '').replace(/-/g, ' ').toUpperCase();
    linkList += '<a href="' + f + '" style="display:block;padding:1rem;border-bottom:1px solid var(--glass-b);color:var(--text);font-weight:600;text-decoration:none;">📄 ' + name + '</a>';
});

const learningHubContent = '<div style="padding:5rem 2rem 3rem;max-width:800px;margin:0 auto;">' +
   '<h1 style="font-family:&quot;Space Grotesk&quot;,sans-serif;font-weight:900;margin-bottom:1.25rem;font-size:3rem;text-align:center;">Nexray <span style="color:var(--brand);">Knowledge Hub</span></h1>' +
   '<p style="color:var(--text-secondary);font-size:1.1rem;margin-bottom:3rem;text-align:center;">Directory of all Nexray guides, tutorials, roadmaps, and cheat sheets to master web development.</p>' +
   '<div class="glass-card" style="padding:0;">' + linkList + '</div>' +
'</div>';

let finalMega = headerPart + megaGuideContent + footerPart;
finalMega = updateMeta(finalMega, "How to Build a Website from Scratch in 2026 | Nexray", "A complete, step-by-step masterclass on building a blazing fast website from scratch using HTML, React, Node, and Vercel. 100% Free.", howToSchema);
fs.writeFileSync('how-to-build-a-website.html', finalMega, 'utf8');
console.log('✅ Generated how-to-build-a-website.html (with HowTo Schema)');

cheatSheets.forEach(sheet => {
    let finalSheet = headerPart + sheet.content + footerPart;
    finalSheet = updateMeta(finalSheet, sheet.title, sheet.desc);
    fs.writeFileSync(sheet.filename, finalSheet, 'utf8');
    console.log('✅ Generated Cheat Sheet: ' + sheet.filename);
});

let finalHub = headerPart + learningHubContent + footerPart;
finalHub = updateMeta(finalHub, "All Web Development Guides, Tutorials & Cheat Sheets | Nexray", "Explore the complete directory of Nexray's free web development tutorials, React roadmaps, and HTML/CSS cheat sheets.");
fs.writeFileSync('learn-hub.html', finalHub, 'utf8');
console.log('✅ Generated learn-hub.html (Internal Link Building Engine)');

const { execSync } = require('child_process');
try {
    execSync('node build_seo_ai_layer.js');
    console.log('✅ Updated Sitemap & JSON-LD across all brand new pages automatically!');
} catch(e) {
    console.log('Warning: could not auto-rerun build_seo_ai_layer.js');
}
