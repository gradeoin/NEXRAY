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

let replacedFooterCount = 0;
let replacedSitemapCount = 0;

const oldFooterRegex = /<div class="footer-col">\s*<div class="footer-col-title">Guide<\/div>[\s\S]*?<\/div>/g;
const oldFooterRegex2 = /<div class="footer-col">\s*<h4[^>]*>The Guide<\/h4>[\s\S]*?<\/div>/g;
const sitemapRegex = /<a[^>]*>Sitemap<\/a>\s*\|?\s*/gi;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    if (oldFooterRegex.test(content)) {
        content = content.replace(oldFooterRegex, '<!-- Guide footer block removed -->');
        replacedFooterCount++;
        modified = true;
    }

    if (oldFooterRegex2.test(content)) {
        content = content.replace(oldFooterRegex2, '<!-- Guide footer block removed -->');
        replacedFooterCount++;
        modified = true;
    }

    if (sitemapRegex.test(content)) {
        content = content.replace(sitemapRegex, '');
        replacedSitemapCount++;
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Footer Guide column removed in', replacedFooterCount, 'files');
console.log('Sitemap links removed in', replacedSitemapCount, 'files');
