const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the misencoded trophy with the actual SVG trophy or emoji
html = html.replace(/<text x="830" y="41"[^>]*>.*?<\/text>/s, '<text x="830" y="52" text-anchor="middle" font-size="20">🏆</text>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Trophy fixed.');
