const fs = require('fs');

['stage2','stage3','stage4','stage5','stage6','stage7'].forEach(s => {
  const c = fs.readFileSync('guide/' + s + '.html', 'utf8');
  const ids = [];
  const re = /id="([^"]+)"/g;
  let m;
  while ((m = re.exec(c)) !== null) {
    const id = m[1];
    if (!id.startsWith('nav') && !id.startsWith('hamburger') && !id.startsWith('mobile') && !id.startsWith('progress') && !id.startsWith('stage') && !id.startsWith('pwa')) {
      ids.push(id);
    }
  }
  console.log(s + ': ' + ids.slice(0, 10).join(', '));
});
