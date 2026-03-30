/**
 * NEXRAY — inject-motion.js
 * Injects the motion-svgs script into all HTML files 
 * with correct relative paths.
 */
const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (['node_modules', '.git', 'lib', 'emails', 'admin'].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) getAllHtmlFiles(full, files);
    else if (item.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const ROOT = __dirname;
const files = getAllHtmlFiles(ROOT);
let updated = 0;

files.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  if (html.includes('motion-svgs.js')) return; // Already injected
  
  const relPath = path.relative(path.dirname(filePath), path.join(ROOT, 'js/motion-svgs.js')).replace(/\\/g, '/');
  
  html = html.replace('</body>', `  <script src="${relPath}" defer></script>\n</body>`);
  
  fs.writeFileSync(filePath, html, 'utf8');
  updated++;
});

console.log(`🎉 Injected motion-svgs.js into ${updated} HTML files!`);
