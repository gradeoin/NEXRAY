const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('components')) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const files = walk('.');

let replacedCount = 0;

const oldImgRegex = /<img src="https:\/\/res\.cloudinary\.com\/djy0vsvfg\/image\/upload\/v1774814733\/logo1_z2jumw\.png"[^>]*>/g;
const newSvgStr = `<svg class="nav-logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="height:36px; width:36px; border-radius:8px; box-shadow: 0 4px 12px rgba(0, 56, 255, 0.3);">
      <rect width="100" height="100" rx="22" fill="#0038FF"/>
      <path d="M 28 75 V 25" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <path d="M 72 75 V 25" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <path d="M 28 25 L 58 46 L 42 54 L 72 75" stroke="#CCFF00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

for (const file of files) {
    if (file.endsWith('index.html')) continue; 
    let content = fs.readFileSync(file, 'utf8');
    
    if (oldImgRegex.test(content)) {
        content = content.replace(oldImgRegex, newSvgStr);
        fs.writeFileSync(file, content, 'utf8');
        replacedCount++;
    }
}

console.log('SVG Logo Replaced in', replacedCount, 'files');
