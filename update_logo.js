const fs = require('fs');
const path = require('path');

const OLD_LOGO = 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png';
const NEW_LOGO = 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file.includes('node_modules') || file.includes('.git') || file.includes('.gemini') || file.includes('assets')) return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('.');
let replacedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(OLD_LOGO)) {
        content = content.replace(new RegExp(OLD_LOGO.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), NEW_LOGO);
        fs.writeFileSync(file, content);
        replacedFiles++;
    }
});
console.log('Logo updated in ' + replacedFiles + ' files');
