const fs = require('fs');
const path = require('path');

const aboutHtml = fs.readFileSync('about.html', 'utf8');
const startSplit = '<div class="page-wrapper">';
const endSplit = '  <footer class="footer">';

const headerPart = aboutHtml.substring(0, aboutHtml.indexOf(startSplit) + startSplit.length);
const footerPart = '\n  </div>\n' + aboutHtml.substring(aboutHtml.indexOf(endSplit));

// 1. Get ALL project HTML files
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        let fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.git')) { 
            results = results.concat(walk(fullPath));
        } else {
            if (file.endsWith('.html')) results.push(fullPath);
        }
    });
    return results;
}

const allFiles = walk('.').filter(f => !f.includes('emails') && !f.includes('google'));

// 2. Build the Sitemap Page Content
let sections = {
    "Core Platform": [],
    "Ultimate Guides": [],
    "Mastery Stages": [],
    "Cheat Sheets & Notes": [],
    "Resources & SEO": [],
    "System": []
};

allFiles.forEach(file => {
    let relPath = file.replace(/\\/g, '/');
    if (relPath.startsWith('./')) relPath = relPath.substring(2);
    
    let name = path.basename(relPath, '.html').replace(/-/g, ' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    let link = { name, url: '/' + relPath };

    if (relPath === 'index.html' || relPath === 'about.html' || relPath === 'contact.html' || relPath === 'learn-hub.html') {
        sections["Core Platform"].push(link);
    } else if (relPath.includes('how-to')) {
        sections["Ultimate Guides"].push(link);
    } else if (relPath.includes('guide/stage')) {
        sections["Mastery Stages"].push(link);
    } else if (relPath.includes('cheat-sheet')) {
        sections["Cheat Sheets & Notes"].push(link);
    } else if (relPath.includes('404') || relPath.includes('auth') || relPath.includes('privacy') || relPath.includes('terms') || relPath.includes('disclaimer')) {
        sections["System"].push(link);
    } else {
        sections["Resources & SEO"].push(link);
    }
});

let htmlCards = '';
for (let sectionName in sections) {
    if (sections[sectionName].length === 0) continue;
    
    let links = sections[sectionName].map(l => 
        `<a href="${l.url}" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(0,0,0,0.05);color:var(--text);font-weight:600;transition:all 0.2s ease;text-decoration:none;">
            <span style="color:var(--brand);font-size:1.2rem;">⚡</span> ${l.name}
         </a>`
    ).join('');

    htmlCards += `
        <div style="margin-bottom:3rem;">
            <h2 style="font-size:1.5rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:10px;color:var(--brand);">
                <div style="width:30px;height:4px;background:var(--accent);border-radius:2px;"></div> ${sectionName}
            </h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:15px;">
                ${links}
            </div>
        </div>
    `;
}

const sitemapPageContent = `
<div style="padding:8rem 2rem 5rem;max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:5rem;">
        <h1 style="font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.1;margin-bottom:1.5rem;">The Nexray <span style="color:var(--brand);">Matrix</span></h1>
        <p style="color:var(--text-3);font-size:1.2rem;max-width:700px;margin:0 auto;">Every single resource, tutorial, and masterclass on the platform. All in one place for high-speed navigation.</p>
    </div>
    ${htmlCards}
</div>
<style>
    a:hover { background: rgba(0, 56, 255, 0.05) !important; border-color: var(--brand) !important; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,56,255,0.1); }
</style>
`;

const finalHtml = headerPart + sitemapPageContent + footerPart;
fs.writeFileSync('site-matrix.html', finalHtml, 'utf8');
console.log('✅ Generated site-matrix.html successfully.');
