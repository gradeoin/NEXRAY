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
    
    // Explicitly update og:image for massive click-through rates
    const ogImage = "https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png";
    if(!html.includes('property="og:image"')) {
        html = html.replace('</head>', '  <meta property="og:image" content="' + ogImage + '">\\n</head>');
    }

    if (extraSchema) {
        html = html.replace('</head>', '  ' + extraSchema + '\\n</head>');
    }
    return html;
}

// 1. Create Niche "How to build a website" Satellite Pages
const nichePages = [
    {
        filename: 'how-to-design-a-website.html',
        title: 'How to Design a Website Like a Pro in 2026 | Nexray',
        desc: 'Learn the exact UI/UX principles, glassmorphic trends, and CSS frameworks used by senior layout designers to build stunning websites.',
        content: '<div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;">' +
                 '<h1 style="font-family:&quot;Space Grotesk&quot;,sans-serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:900;margin-bottom:1.25rem;">How to <span style="color:var(--brand);">Design a Website</span></h1>' +
                 '<p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8;margin-bottom:3rem;">Before you write a single line of code, you need a blueprint. Designing a modern website requires an eye for whitespace, hierarchy, and color palettes.</p>' +
                 '<div class="grid-2 text-left">' +
                 '<div class="glass-card"><h3>1. The 60-30-10 Rule</h3><p>Use 60% for your background color, 30% for your secondary components, and 10% strictly for your high-contrast brand accent color (like our Lime action buttons).</p></div>' +
                 '<div class="glass-card"><h3>2. Figma Blueprints</h3><p>Never code blind. Build your wireframes inside Figma. It allows you to rapidly iterate on spacing without battling CSS margins.</p></div>' +
                 '<div class="glass-card"><h3>3. Negative Space</h3><p>Amateur designs are cramped. Professional websites breathe. Add 4rem of padding between your major sections to let the user digest information.</p></div>' +
                 '<div class="glass-card"><h3>4. Typography Scales</h3><p>Do not guess font sizes. Use a modular scale (1.25x). Pair a geometric Sans-Serif font for headers with a highly legible Sans font for paragraphs.</p></div>' +
                 '</div>' +
                 '<div style="background:var(--glass-m);padding:2rem;border-radius:12px;margin-top:3rem;text-align:center;">' +
                 '<h3>Ready to turn your design into code?</h3>' +
                 '<p style="color:var(--text-secondary);margin-bottom:1rem;">Continue to our ultimate masterclass on building it.</p>' +
                 '<a href="how-to-build-a-website.html" class="btn btn-primary">Read the Ultimate Build Guide</a>' +
                 '</div></div>'
    },
    {
        filename: 'free-website-hosting-2026.html',
        title: 'Best Free Website Hosting Platforms for 2026 | Nexray',
        desc: 'Compare Vercel, Netlify, Cloudflare Pages, and GitHub Pages. Find the best completely free host for your React or HTML website.',
        content: '<div style="padding:5rem 2rem 3rem;max-width:1000px;margin:0 auto;text-align:center;">' +
                 '<h1 style="font-family:&quot;Space Grotesk&quot;,sans-serif;font-weight:900;margin-bottom:1.25rem;font-size:3.5rem;">Best <span style="color:var(--brand);">Free</span> Hosting</h1>' +
                 '<p style="color:var(--text-secondary);font-size:1.1rem;margin-bottom:3rem;">Renting a shared server for $5 a month is extinct. If you are building modern jamstack applications, the best hosting in the world is completely 100% free.</p>' +
                 '<div class="glass-card mb-md text-left"><h2>1. Vercel</h2><p>The standard for front-end hosting. If you push code to GitHub, Vercel pulls it, builds it, and deploys it to a global edge network in seconds.</p></div>' +
                 '<div class="glass-card mb-md text-left"><h2>2. Cloudflare Pages</h2><p>Infinite bandwidth and unmatchable DNS security. Perfect for static sites and massive traffic spikes.</p></div>' +
                 '<div class="glass-card mb-md text-left"><h2>3. Netlify</h2><p>The pioneer of the modern JAMStack. Incredible built-in continuous deployment and serverless form management.</p></div>' +
                 '<div style="margin-top:3rem;"><a href="how-to-build-a-website.html" class="btn btn-primary">Learn How to Code and Deploy</a></div>' +
                 '</div>'
    }
];

nichePages.forEach(p => {
    let finalCode = headerPart + p.content + footerPart;
    finalCode = updateMeta(finalCode, p.title, p.desc);
    fs.writeFileSync(p.filename, finalCode, 'utf8');
    console.log('✅ Generated Niche SEO Page: ' + p.filename);
});

// 2. Generate Tracking Module (js/tracker.js)
const trackerJs = `// Nexray Universal Analytics & Progression Tracker
(function() {
    // Save current path to local storage so we can "resume" later
    const currentPath = window.location.pathname;
    
    // Only track actual guide/learning pages
    if (currentPath.includes('guide/') || currentPath.includes('how-to')) {
        localStorage.setItem('nexray_last_page', currentPath);
        localStorage.setItem('nexray_last_title', document.title.split('|')[0].trim());
    }

    // Inject "Continue Learning" floating pill if user has a history
    window.addEventListener('DOMContentLoaded', () => {
        const lastPage = localStorage.getItem('nexray_last_page');
        const lastTitle = localStorage.getItem('nexray_last_title');

        if (lastPage && lastTitle && currentPath !== lastPage && !currentPath.includes('auth.html')) {
            const pill = document.createElement('a');
            pill.href = lastPage;
            pill.className = 'continue-learning-pill';
            pill.innerHTML = \`<span style="font-size:0.8rem;color:var(--text-secondary);display:block;margin-bottom:2px;">Resume Learning</span><strong>\${lastTitle}</strong>\`;
            
            // Apply inline styles for robust rendering without needing CSS updates immediately
            Object.assign(pill.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'rgba(0, 56, 255, 0.15)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 56, 255, 0.3)',
                padding: '12px 20px',
                borderRadius: '12px',
                color: '#fff',
                textDecoration: 'none',
                zIndex: '9999',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease',
                fontFamily: '"Inter", sans-serif',
                display: 'block'
            });

            pill.onmouseenter = () => pill.style.background = 'rgba(0, 56, 255, 0.3)';
            pill.onmouseleave = () => pill.style.background = 'rgba(0, 56, 255, 0.15)';

            document.body.appendChild(pill);
        }
    });
})();
`;

const jsDir = path.join(__dirname, 'js');
if (!fs.existsSync(jsDir)) { fs.mkdirSync(jsDir); }
fs.writeFileSync(path.join(jsDir, 'tracker.js'), trackerJs, 'utf8');
console.log('✅ Generated User Tracking Module (tracker.js)');

// 3. Spider codebase to inject <script src="js/tracker.js"></script> globally into ALL HTML
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('emails')) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const allHtmlFiles = walk('.').filter(f => !f.includes('404.html') && !f.includes('auth.html') && !f.includes('admin') && !f.includes('google'));
let trackerInjectedCount = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('tracker.js')) {
        content = content.replace('</body>', '  <script src="/js/tracker.js" defer></script>\\n</body>');
        fs.writeFileSync(file, content, 'utf8');
        trackerInjectedCount++;
    }
});

console.log('✅ Injected Tracking Module into ' + trackerInjectedCount + ' HTML files.');

try {
    const { execSync } = require('child_process');
    execSync('node build_seo_ai_layer.js');
    console.log('✅ Rebuilt Sitemap successfully for Hyper-SEO additions.');
} catch (e) { }
