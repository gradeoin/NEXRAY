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
    let newContent = content;

    // Add lazy loading to images
    newContent = newContent.replace(/<img(?!.*?loading=)[^>]*>/g, match => {
        if (!match.includes('loading=')) {
            return match.replace('>', ' loading="lazy">');
        }
        return match;
    });
    
    // Add lazy loading to iframes
    newContent = newContent.replace(/<iframe(?!.*?loading=)[^>]*>/g, match => {
        if (!match.includes('loading=')) {
            return match.replace('>', ' loading="lazy">');
        }
        return match;
    });
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        replacedFiles++;
    }
});
console.log('Added native lazy loading tags to ' + replacedFiles + ' files');
