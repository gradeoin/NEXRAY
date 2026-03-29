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

// Regular expression to match the entire SVG logo tag we injected recently
const svgLogoRegex = /<svg class="nav-logo-icon"[\s\S]*?<\/svg>/g;

const newImgTag = `<img src="https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png" alt="Nexray Logo" class="nav-logo-img" style="height:36px; width:auto; border-radius:8px; box-shadow: 0 4px 12px rgba(0, 56, 255, 0.3);">`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (svgLogoRegex.test(content)) {
        content = content.replace(svgLogoRegex, newImgTag);
        fs.writeFileSync(file, content, 'utf8');
        replacedCount++;
    }
}

console.log('SVG Logo Replaced with Cloudinary PNG in', replacedCount, 'files');
