/**
 * NEXRAY — inject-brand-stages.js
 * Run once with: node inject-brand-stages.js
 * Adds brand buddy elements + mascot script to all stage pages
 */

const fs = require('fs');
const path = require('path');

const stageData = [
  { file: 'guide/stage1.html', stage: 1, title: 'Stage 1: HTML & The Web Basics',       color: '#f97316', icon: 'globe',    buddy: 'Browser',   tip: 'Every website you visit loads HTML from a server.' },
  { file: 'guide/stage2.html', stage: 2, title: 'Stage 2: Frontend Dev',                 color: '#8b5cf6', icon: 'layout',   buddy: 'Inspector', tip: 'Open DevTools (F12) to inspect any website\'s HTML & CSS.' },
  { file: 'guide/stage3.html', stage: 3, title: 'Stage 3: Backend & APIs',               color: '#0ea5e9', icon: 'server',   buddy: 'Terminal',  tip: 'Backends live on servers — you talk to them via HTTP requests.' },
  { file: 'guide/stage4.html', stage: 4, title: 'Stage 4: Databases',                    color: '#10b981', icon: 'database', buddy: 'Database',  tip: 'Every app you use stores data — you\'ll learn how today.' },
  { file: 'guide/stage5.html', stage: 5, title: 'Stage 5: DevOps & CI/CD',               color: '#f59e0b', icon: 'git',      buddy: 'Pipeline',  tip: 'DevOps automates the path from code to live production.' },
  { file: 'guide/stage6.html', stage: 6, title: 'Stage 6: Android & Mobile Apps',        color: '#ec4899', icon: 'smartphone','buddy': 'Device',  tip: 'Web skills translate directly to mobile — same languages, new canvas.' },
  { file: 'guide/stage7.html', stage: 7, title: 'Stage 7: Launch & Go Live',             color: '#0038FF', icon: 'rocket',   buddy: 'Deploy',    tip: 'Ship it. Real projects in the real world — that\'s the goal.' },
];

const icons = {
  globe:      `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  layout:     `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  server:     `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  database:   `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  git:        `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`,
  smartphone: `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  rocket:     `<svg viewBox="0 0 24 24" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`,
};

const stageDots = (currentStage) => {
  let dots = '';
  for (let i = 1; i <= 7; i++) {
    const cls = i < currentStage ? 'done' : i === currentStage ? 'current' : '';
    dots += `<div class="nxr-stage-dot ${cls}" title="Stage ${i}"></div>`;
  }
  return `<div class="nxr-stage-ticker">${dots}</div>`;
};

const brandBlock = (d) => `
<!-- NEXRAY BRAND BUDDY (auto-injected) -->
<div class="nxr-brand-buddy reveal-left">
  <div class="nxr-brand-buddy-icon" style="background:linear-gradient(135deg,${d.color},#0038FF)">${icons[d.icon]}</div>
  <div class="nxr-brand-buddy-text">
    <strong>${d.buddy} Mode Active</strong>
    <span>Nexray ${d.title} — your interactive learning companion</span>
  </div>
</div>
${stageDots(d.stage)}
<div class="nxr-tip reveal">
  <div class="nxr-tip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/><circle cx="12" cy="12" r="10"/></svg></div>
  <div class="nxr-tip-body"><strong>Pro Tip</strong><p>${d.tip}</p></div>
</div>
<!-- END NEXRAY BRAND BUDDY -->
`;

const mascotScript = `
  <script src="../js/mascot.js" defer></script>
`;

stageData.forEach(d => {
  const filePath = path.join(__dirname, d.file);
  if (!fs.existsSync(filePath)) { console.log('SKIP (not found):', d.file); return; }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Add brand buddy after the first <div class="section">
  if (!html.includes('nxr-brand-buddy')) {
    html = html.replace(/<div class="section">/, `<div class="section">\n${brandBlock(d)}`);
  }

  // 2. Ensure mascot script is present
  if (!html.includes('js/mascot.js')) {
    html = html.replace('</body>', `${mascotScript}\n</body>`);
  }

  // 3. Ensure reveal observer snippet present (small inline fallback)
  if (!html.includes('revealObs') && !html.includes('IntersectionObserver')) {
    html = html.replace('</body>', `<script>
const _ro=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('revealed');_ro.unobserve(x.target);}}),{threshold:.1});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>_ro.observe(el));
</script>\n</body>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✅ Updated:', d.file);
});

console.log('\n🎉 All stage pages updated with brand buddy elements!');
