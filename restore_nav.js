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

    const restoredLogo = `
      <div class="logo-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
      <img src="https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png" alt="NEXRAY.IN" class="nav-logo-img" loading="lazy">
      <span style="font-weight: 800; letter-spacing: 0.5px;">Nex<span class="logo-accent" style="color: var(--brand);">ray</span></span>
    `;

    content = content.replace(/<img[^>]*nav-logo-img[^>]*>/g, restoredLogo);

    if (content !== prev) {
        fs.writeFileSync(file, content);
        replacedFiles++;
    }
});
console.log('Restored header icon and text in ' + replacedFiles + ' files');
