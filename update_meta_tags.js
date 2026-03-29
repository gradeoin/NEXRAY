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
let replacedFiles = 0;

const oldLogoUrl = 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png';
const newLogoUrl = 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png';

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes(oldLogoUrl)) {
        // Simple global replacement
        content = content.replace(new RegExp(oldLogoUrl, 'g'), newLogoUrl);
        fs.writeFileSync(file, content, 'utf8');
        replacedFiles++;
    }
}

console.log('Successfully updated metadata (favicon, og:image) in ' + replacedFiles + ' HTML files.');
