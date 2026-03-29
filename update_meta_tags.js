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
const newLogoUrl = "https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png";

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    let newContent = content;

    // Update og:image 
    newContent = newContent.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:image" content="${newLogoUrl}" />`);
    
    // Update twitter:image
    newContent = newContent.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:image" content="${newLogoUrl}" />`);

    // Update favicon / icon
    newContent = newContent.replace(/<link\s+rel="icon"\s+href="[^"]*"\s*\/?>/gi, `<link rel="icon" href="${newLogoUrl}" />`);

    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        replacedFiles++;
    }
});
console.log('Successfully updated metadata (og:image, twitter:image, favicon) in ' + replacedFiles + ' HTML files.');
