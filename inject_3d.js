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
let injectedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it's already there
    if (!content.includes('three-background.js')) {
        // Find correct relative path bridging (e.g., ../js/ vs js/)
        const depth = file.split(path.sep).length - 1;
        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        const scriptTag = `<script src="${prefix}js/three-background.js"></script>\n</body>`;
        
        content = content.replace('</body>', scriptTag);
        fs.writeFileSync(file, content);
        injectedFiles++;
    }
});
console.log('Injected Three.js 3D background into ' + injectedFiles + ' files');
