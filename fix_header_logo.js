const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file.includes('node_modules') || file.includes('.git') || file.includes('.gemini') || file.includes('assets') || file.includes('css') || file.includes('js')) return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('.');
let replacedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let prev = content;

    // We want to replace the entire <a href="..." class="nav-logo"...> ... </a> block and its contents
    // with the precise structure requested.
    
    // Regex to match the nav-logo anchor and everything inside it
    const logoRegex = /<a[^>]*class="nav-logo"[^>]*>[\s\S]*?<\/a>/g;
    
    // Determine right path based on file depth
    const depth = file.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : './';
    const indexLink = depth > 0 ? prefix + 'index.html' : 'index.html';

    const newLogoHtml = `<a href="${indexLink}" class="nav-logo" aria-label="Nexray Home" style="display:flex; align-items:center; text-decoration:none;">
    <img src="https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png" alt="Nexray Logo" class="nav-logo-img" style="height:36px; width:auto; border-radius:8px; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);">
    <span style="font-weight: 900; font-size: 1.35rem; letter-spacing: 0.5px; margin-left: 10px; color: var(--text);">Nex<span class="logo-accent" style="color: var(--brand);">ray</span></span>
  </a>`;

    content = content.replace(logoRegex, newLogoHtml);

    if (content !== prev) {
        fs.writeFileSync(file, content);
        replacedFiles++;
    }
});
console.log('Restructured Header Logo perfectly in ' + replacedFiles + ' files');
