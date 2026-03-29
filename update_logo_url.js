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
const newLink = "https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png";

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace all occurrences of src="assets/logo.png" and src="../assets/logo.png" etc.
    let newContent = content.replace(/src="[^"]*assets\/logo\.png"/g, `src="${newLink}"`);
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        replacedFiles++;
    }
});
console.log('Successfully updated logo URL in ' + replacedFiles + ' HTML files.');
