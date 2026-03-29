const fs = require('fs');
const path = require('path');

// 1. Find all HTML files
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
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
const baseUrl = 'https://nexray.in';

// 2. Generate sitemap.xml - CRITICAL FIX: No literal \n characters in the file content
let sitemapUrls = '';
const today = new Date().toISOString().split('T')[0];

allHtmlFiles.forEach(file => {
    let cleanPath = file.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^CurrentDir\//, '');
    if (cleanPath.startsWith('./')) cleanPath = cleanPath.substring(2);
    
    let priority = '0.7';
    let freq = 'monthly';
    
    if(cleanPath === 'index.html' || cleanPath === '') {
        priority = '1.0';
        freq = 'daily';
    } else if(cleanPath.includes('guide/')) {
        priority = '0.9';
        freq = 'weekly';
    } else if(cleanPath.includes('blog/')) {
        priority = '0.8';
        freq = 'weekly';
    }

    const loc = cleanPath === 'index.html' ? baseUrl : `${baseUrl}/${cleanPath}`;

    sitemapUrls += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapUrls}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent.trim(), 'utf8');
console.log('✅ Generated sitemap.xml with ' + allHtmlFiles.length + ' pages.');

// 3. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

# Specifically allow AI crawlers
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
fs.writeFileSync('robots.txt', robotsTxt, 'utf8');
console.log('✅ Generated AI-optimized robots.txt.');

// 4. Generate llms.txt
const llmsTxt = `# Nexray: The Modern Web Development Guide 2026

Nexray is a free, modern 7-stage web development learning platform.
Website: https://nexray.in
`;
fs.writeFileSync('llms.txt', llmsTxt, 'utf8');
console.log('✅ Generated llms.txt.');

// 5. Inject JSON-LD Schema
const logoUrl = 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png';
const schemaContent = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Nexray",
  "url": "${baseUrl}",
  "logo": "${logoUrl}",
  "description": "A free, 7-stage modern web development platform."
}
</script>`;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('application/ld+json')) {
        content = content.replace('</head>', `  ${schemaContent}\n</head>`);
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('✅ Injected JSON-LD Schema.');
