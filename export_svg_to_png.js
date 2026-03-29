const http = require('http');
const fs = require('fs');

const htmlContent = `
<!DOCTYPE html>
<html>
<body>
<svg id="mysvg" width="1024" height="1024" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="22" fill="#0038FF"/>
  <path d="M 28 75 V 25" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
  <path d="M 72 75 V 25" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
  <path d="M 28 25 L 58 46 L 42 54 L 72 75" stroke="#CCFF00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<canvas id="c" style="display:none;"></canvas>
<script>
  window.onload = function() {
    const svg = document.getElementById('mysvg');
    const canvas = document.getElementById('c');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      ctx.drawImage(img, 0, 0, 1024, 1024);
      const pngStr = canvas.toDataURL('image/png');
      fetch('http://127.0.0.1:4005', {
        method: 'POST',
        body: pngStr
      }).then(() => console.log('sent'));
    };
    img.src = url;
  };
</script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(htmlContent);
    } else if (req. विधि === 'POST' || req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            if(body.startsWith('data:image/png;base64,')) {
                const base64Data = body.replace(/^data:image\/png;base64,/, "");
                fs.writeFileSync('assets/logo_highres.png', base64Data, 'base64');
                console.log('Successfully exported assets/logo_highres.png (1024x1024)');
                res.writeHead(200);
                res.end('saved');
                setTimeout(() => process.exit(0), 100);
            } else {
                res.writeHead(400);
                res.end('invalid format');
            }
        });
    }
});

server.listen(4005, () => console.log('Listening on 4005'));
