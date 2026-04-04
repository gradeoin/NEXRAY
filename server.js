const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const server = http.createServer((req, res) => {
    const urlPath = req.url === '/' ? 'index.html' : req.url.split('?')[0];
    let filePath = path.normalize(path.join(ROOT, urlPath));

    // Prevent path traversal attacks
    if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    if (!path.extname(filePath)) filePath += '.html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, '404.html'), (err404, defaultContent) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(defaultContent || '404 Not Found', 'utf-8');
            });
        } else {
            const extname = String(path.extname(filePath)).toLowerCase();
            const mimeTypes = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpg',
                '.svg': 'image/svg+xml'
            };
            const contentType = mimeTypes[extname] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));
