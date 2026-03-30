const fs = require('fs');
const path = require('path');

// 1. Find all HTML files
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        let fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('emails')) { 
            results = results.concat(walk(fullPath));
        } else {
            if (file.endsWith('.html')) results.push(fullPath);
        }
    });
    return results;
}

const allHtmlFiles = walk('.').filter(f => !f.includes('404.html') && !f.includes('auth.html') && !f.includes('admin') && !f.includes('google'));
let fixedCount = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix the escaped newline corruption
    content = content.replace(/\\n\s+<script src="\/js\/search\.js"/g, '\n  <script src="/js/search.js"');
    
    // Ensure all 3 scripts are present and CLEAN
    const scripts = [
        '<script src="/js/tracker.js" defer></script>',
        '<script src="/js/search.js" defer></script>',
        '<script src="/js/mascot.js" defer></script>'
    ];

    // Remove duplicates or corrupted versions of these specifically
    scripts.forEach(s => {
        // Remove versions with \n
        content = content.replace(new RegExp('\\\\n\\s*' + s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), '');
    });

    // Final clean injection before </body>
    if (!content.includes('js/mascot.js')) {
        content = content.replace('</body>', `  <script src="/js/tracker.js" defer></script>\n  <script src="/js/search.js" defer></script>\n  <script src="/js/mascot.js" defer></script>\n</body>`);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
    }
});

console.log('✅ Cleaned and Fixed ' + fixedCount + ' HTML files.');
