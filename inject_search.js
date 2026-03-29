const fs = require('fs');
const path = require('path');

// 1. Find all HTML files
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('emails')) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const allHtmlFiles = walk('.').filter(f => !f.includes('404.html') && !f.includes('auth.html') && !f.includes('admin') && !f.includes('google'));
let injectedCount = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('search.js')) {
        // Inject right before </body> to ensure all DOM is ready
        content = content.replace('</body>', `  <script src="/js/search.js" defer></script>\n</body>`);
        fs.writeFileSync(file, content, 'utf8');
        injectedCount++;
    }
});

console.log('✅ Injected Global Search Component into ' + injectedCount + ' HTML files.');
