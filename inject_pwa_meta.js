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
    
    // Add meta theme-color and PWA manifest if not present
    if (!content.includes('name="theme-color"')) {
        content = content.replace('</head>', `  <meta name="theme-color" content="#f97316">\n</head>`);
    }
    
    if (!content.includes('manifest.json')) {
        const relPath = path.relative(process.cwd(), file);
        const depth = relPath.split(/[\\/]/).length - 1;
        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        content = content.replace('</head>', `  <link rel="manifest" href="${prefix}manifest.json">\n</head>`);
    }

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content);
        replacedFiles++;
    }
});
console.log('Injected PWA meta tags in ' + replacedFiles + ' files');
