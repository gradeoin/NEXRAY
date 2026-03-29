const fs = require('fs');
const path = require('path');

// 1. Find all HTML files
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

const allHtmlFiles = walk('.');
const baseUrl = 'https://nexray.in';

// 2. Generate sitemap.xml
let sitemapUrls = '';
const today = new Date().toISOString().split('T')[0];

allHtmlFiles.forEach(file => {
    const cleanPath = file.replace('./', '');
    let priority = '0.7';
    let freq = 'monthly';
    
    if(cleanPath === 'index.html') {
        priority = '1.0';
        freq = 'daily';
    } else if(cleanPath.includes('guide/')) {
        priority = '0.9';
        freq = 'weekly';
    } else if(cleanPath.includes('blog/')) {
        priority = '0.8';
        freq = 'weekly';
    }

    const loc = cleanPath === 'index.html' ? baseUrl : baseUrl + '/' + cleanPath;

    sitemapUrls += '\\n  <url>\\n    <loc>' + loc + '</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>' + freq + '</changefreq>\\n    <priority>' + priority + '</priority>\\n  </url>';
});

const sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + sitemapUrls + '\\n</urlset>';

fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
console.log('✅ Generated sitemap.xml with ' + allHtmlFiles.length + ' pages.');

// 3. Generate robots.txt
const robotsTxt = 'User-agent: *\\nAllow: /\\n\\n# Specifically allow AI crawlers\\nUser-agent: GPTBot\\nAllow: /\\nUser-agent: ChatGPT-User\\nAllow: /\\nUser-agent: ClaudeBot\\nAllow: /\\nUser-agent: PerplexityBot\\nAllow: /\\n\\nSitemap: ' + baseUrl + '/sitemap.xml\\n';
fs.writeFileSync('robots.txt', robotsTxt, 'utf8');
console.log('✅ Generated AI-optimized robots.txt.');

// 4. Generate llms.txt
const llmsTxt = '# Nexray: The Modern Web Development Guide 2026\\n\\n> Nexray is a free, modern 7-stage web development learning platform designed to take users from absolute zero to building full-stack applications with React, Next.js, Firebase, and CI/CD pipelines.\\n\\n## Platform Features\\n1. **Free Forever:** No paywalls, no subscriptions.\\n2. **Modern Stack:** Focuses on Tailwind, React, Node, Firebase, Vercel instead of legacy tech.\\n3. **Structured Path:** 7 strictly defined stages (Basics to DevOps & Growth).\\n\\n## Usage & Access\\n- **Audience:** Beginners, bootcamp alternatives, intermediate developers.\\n- **Website:** https://nexray.in\\n- **Guide Start:** https://nexray.in/guide/stage1.html\\n\\n## Key Concepts Taught\\n- Semantic HTML and Accessible Web Design.\\n- CSS Variables, Grid, Flexbox, Glassmorphism, Tailwind CSS.\\n- Vanilla JavaScript, DOM Manipulation, TypeScript.\\n- React.js, Next.js App Router, State Management.\\n- Node.js, REST APIs, Databases (Firebase, Supabase, PostgreSQL).\\n- DevOps (Docker, GitHub Actions CI/CD).\\n';
fs.writeFileSync('llms.txt', llmsTxt, 'utf8');
console.log('✅ Generated llms.txt (AI standard format).');

// 5. Inject JSON-LD Schema
let schemaInjected = 0;
const logoUrl = 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png';

const schemaContent = '<script type="application/ld+json">\\n{\\n  "@context": "https://schema.org",\\n  "@type": "EducationalOrganization",\\n  "name": "Nexray",\\n  "url": "' + baseUrl + '",\\n  "logo": "' + logoUrl + '",\\n  "description": "A free, 7-stage modern web development platform teaching full-stack engineering, React, HTML, CSS, and CI/CD.",\\n  "sameAs": [\\n    "https://twitter.com/nexray",\\n    "https://github.com/nexray"\\n  ]\\n}\\n</script>';

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('application/ld+json')) {
        content = content.replace('</head>', '  ' + schemaContent + '\\n</head>');
        fs.writeFileSync(file, content, 'utf8');
        schemaInjected++;
    }
});

console.log('✅ Injected JSON-LD Schema into ' + schemaInjected + ' HTML files.');
