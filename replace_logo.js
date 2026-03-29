const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file.includes('node_modules') || file.includes('.git') || file.includes('.gemini')) return;
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
    const relPath = path.relative(process.cwd(), file);
    // Determine depth based on directory separators in the relative path
    const parts = relPath.split(/[\\/]/);
    const depth = parts.length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    const logoSrc = prefix + 'assets/logo.png';
    
    // We want to replace <div class="logo-icon"...>...</div><span>Nex<span class="logo-accent">ray</span></span>
    // with <img src="logoSrc" alt="NEXRAY.IN" class="nav-logo-img" />
    
    // Sometimes it's inside <a class="nav-logo">
    // Some lines have: <div class="logo-icon"><svg...</svg></div><span>Nex<span class="logo-accent">ray</span></span>
    const regexFull = /<div class="logo-icon"[^>]*>[\s\S]*?<\/div>\s*<span[^>]*>Nex<span class="logo-accent">ray<\/span>.*?<\/span>/g;
    const regexIconOnly = /<div class="logo-icon"[^>]*>[\s\S]*?<\/svg>\s*<\/div>/g;

    let newContent = content;
    newContent = newContent.replace(regexFull, `<img src="${logoSrc}" alt="NEXRAY.IN" class="nav-logo-img" />`);
    // Then target remaining logo icons
    newContent = newContent.replace(regexIconOnly, `<img src="${logoSrc}" alt="NEXRAY.IN" class="nav-logo-img" />`);
    
    // Remove standalone 'Nexray' text if it wasn't caught
    const regexTextOnly = /<span>Nex<span class="logo-accent">ray<\/span>\s*(?:<span[^>]*>.*?<\/span>)?<\/span>/g;
    newContent = newContent.replace(regexTextOnly, ``);

    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        replacedFiles++;
    }
});
console.log('Replaced logo in ' + replacedFiles + ' files');
