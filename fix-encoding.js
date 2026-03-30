const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!['node_modules', '.git', 'assets'].includes(file)) walk(filePath);
        } else if (filePath.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let original = content;

            // Common misencodings
            content = content.replace(/â€”/g, '—');
            content = content.replace(/â€“/g, '–');
            content = content.replace(/Â·/g, '·');
            content = content.replace(/Â€¢/g, '•');
            content = content.replace(/Â/g, ''); // residual
            content = content.replace(/START FOR FREE • ¢/g, 'START FOR FREE • '); // Specific to the image
            content = content.replace(/START FOR FREE Â€¢/g, 'START FOR FREE • '); // Specific to the image
            content = content.replace(/START FOR FREE •/g, 'START FOR FREE • ');

            if (content !== original) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed encoding in', filePath);
            }
        }
    }
}
walk('.');
console.log('Encoding script complete.');
