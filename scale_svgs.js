const fs = require('fs');
const path = require('path');

// Library of abstract, scalable tech SVG templates
const svgLibrary = [
  // Template 1: Data Analytics / Dashboard
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
     <rect x="20" y="20" width="160" height="120" rx="8" fill="rgba(249,115,22,0.05)" stroke="#f97316" stroke-width="1.5"/>
     <line x1="20" y1="40" x2="180" y2="40" stroke="#f97316" stroke-width="1" opacity="0.5"/>
     <rect x="35" y="60" width="25" height="60" rx="3" fill="rgba(59,130,246,0.5)">
       <animate attributeName="height" values="60;40;60" dur="2s" repeatCount="indefinite"/>
       <animate attributeName="y" values="60;80;60" dur="2s" repeatCount="indefinite"/>
     </rect>
     <rect x="75" y="40" width="25" height="80" rx="3" fill="rgba(249,115,22,0.6)">
       <animate attributeName="height" values="80;60;80" dur="2.5s" repeatCount="indefinite"/>
       <animate attributeName="y" values="40;60;40" dur="2.5s" repeatCount="indefinite"/>
     </rect>
     <rect x="115" y="50" width="25" height="70" rx="3" fill="rgba(74,222,128,0.5)">
       <animate attributeName="height" values="70;90;70" dur="3s" repeatCount="indefinite"/>
       <animate attributeName="y" values="50;30;50" dur="3s" repeatCount="indefinite"/>
     </rect>
     <path d="M 35 120 L 140 120" stroke="#94a3b8" stroke-width="1.5"/>
     <text x="100" y="150" font-size="8" fill="#f97316" text-anchor="middle" font-weight="bold">{{TITLE}}</text>
   </svg>`,
   
  // Template 2: Code IDE / Terminal
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
     <rect x="15" y="25" width="170" height="110" rx="8" fill="#09090f" stroke="#3b82f6" stroke-width="1.5"/>
     <rect x="15" y="25" width="170" height="20" rx="8" fill="rgba(59,130,246,0.15)"/>
     <circle cx="28" cy="35" r="4" fill="#ef4444" opacity="0.8"/>
     <circle cx="42" cy="35" r="4" fill="#eab308" opacity="0.8"/>
     <circle cx="56" cy="35" r="4" fill="#4ade80" opacity="0.8"/>
     <text x="100" y="38" font-size="7" fill="#94a3b8" font-family="monospace" text-anchor="middle">workspace.sh</text>
     <text x="25" y="65" font-size="8" fill="#f97316" font-family="monospace">&gt; exec {{TITLE}}</text>
     <text x="25" y="85" font-size="8" fill="#4ade80" font-family="monospace">[ok] Compiling modules...</text>
     <text x="25" y="105" font-size="8" fill="#3b82f6" font-family="monospace">[ok] Deployment successful.</text>
     <rect x="25" y="115" width="4" height="10" fill="#f97316">
       <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
     </rect>
   </svg>`,

  // Template 3: Cloud Network / Nodes
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
     <path d="M 50 80 Q 100 20 150 80" stroke="rgba(249,115,22,0.3)" stroke-width="1.5" fill="none" stroke-dasharray="4,2"/>
     <path d="M 50 80 Q 100 140 150 80" stroke="rgba(59,130,246,0.3)" stroke-width="1.5" fill="none" stroke-dasharray="4,2"/>
     <path d="M 100 40 L 100 120" stroke="rgba(74,222,128,0.3)" stroke-width="1.5" fill="none"/>
     <circle cx="50" cy="80" r="14" fill="#09090f" stroke="#f97316" stroke-width="2"/>
     <circle cx="150" cy="80" r="14" fill="#09090f" stroke="#3b82f6" stroke-width="2"/>
     <circle cx="100" cy="40" r="12" fill="#09090f" stroke="#4ade80" stroke-width="2"/>
     <circle cx="100" cy="120" r="12" fill="#09090f" stroke="#eab308" stroke-width="2"/>
     <text x="100" y="85" font-size="9" fill="#ffffff" text-anchor="middle" font-weight="bold">API</text>
     <circle cx="100" cy="80" r="4" fill="#f97316">
       <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
       <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
     </circle>
   </svg>`,

  // Template 4: Structural Box Model / Layout
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
     <rect x="30" y="30" width="140" height="100" rx="6" fill="rgba(59,130,246,0.05)" stroke="#3b82f6" stroke-width="2" stroke-dasharray="8,4"/>
     <rect x="50" y="50" width="100" height="60" rx="4" fill="rgba(74,222,128,0.1)" stroke="#4ade80" stroke-width="2"/>
     <rect x="70" y="65" width="60" height="30" rx="2" fill="rgba(249,115,22,0.2)" stroke="#f97316" stroke-width="2"/>
     <text x="100" y="45" font-size="7" fill="#3b82f6" text-anchor="middle">Margin</text>
     <text x="100" y="62" font-size="7" fill="#4ade80" text-anchor="middle">Padding</text>
     <text x="100" y="83" font-size="8" fill="#ffffff" text-anchor="middle" font-weight="bold">Content</text>
   </svg>`,

  // Template 5: Deployment Flow / CI/CD
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
     <rect x="10" y="65" width="40" height="30" rx="6" fill="rgba(249,115,22,0.1)" stroke="#f97316" stroke-width="1.5"/>
     <line x1="50" y1="80" x2="80" y2="80" stroke="#f97316" stroke-width="2" stroke-dasharray="3,3"/>
     <rect x="80" y="65" width="40" height="30" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1.5"/>
     <line x1="120" y1="80" x2="150" y2="80" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3"/>
     <rect x="150" y="65" width="40" height="30" rx="6" fill="rgba(74,222,128,0.1)" stroke="#4ade80" stroke-width="1.5"/>
     <text x="30" y="83" font-size="8" fill="#f97316" text-anchor="middle">Build</text>
     <text x="100" y="83" font-size="8" fill="#3b82f6" text-anchor="middle">Test</text>
     <text x="170" y="83" font-size="8" fill="#4ade80" text-anchor="middle">Ship</text>
     <circle cx="100" cy="120" r="10" fill="none" stroke="#eab308" stroke-width="2"/>
     <path d="M 100 110 A 10 10 0 0 1 110 120" fill="none" stroke="#eab308" stroke-width="3">
       <animateTransform attributeName="transform" type="rotate" from="0 100 120" to="360 100 120" dur="1.5s" repeatCount="indefinite"/>
     </path>
  </svg>`
];

const STAGES = ['stage1.html', 'stage2.html', 'stage3.html', 'stage4.html', 'stage5.html', 'stage6.html', 'stage7.html'];

STAGES.forEach(filename => {
  const filePath = path.join(__dirname, 'guide', filename);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let injectedCount = 0;

  // We will find all <h2> and <h3> tags, extract their text, and inject a template if they don't have one right after it.
  const headerRegex = /(<h[23][^>]*>(.*?)<\/h[23]>)/gi;
  let matches = [];
  let match;
  while ((match = headerRegex.exec(content)) !== null) {
      matches.push({
          fullMatch: match[1],
          text: match[2].replace(/<[^>]+>/g, '').trim(),
          index: match.index
      });
  }

  // Count existing .illustration-blocks
  let existingCount = (content.match(/class="illustration-block/g) || []).length;
  if(existingCount >= 10) {
      console.log(`⏭️ ${filename} already has ${existingCount} SVGs. Skipping.`);
      return;
  }

  // Let's inject until we hit at least 10 total
  for (let i = 0; i < matches.length; i++) {
        if (existingCount >= 10) break;
        
        const m = matches[i];
        
        // Skip if there's already an illustration right after this heading
        const snippet = content.slice(m.index, m.index + 400);
        if (snippet.includes('class="illustration-block')) {
            continue;
        }

        // Generate a dynamic template block
        const templateSVG = svgLibrary[i % svgLibrary.length].replace(/\{\{TITLE\}\}/g, m.text.substring(0, 15).toUpperCase());
        const directionClass = i % 2 !== 0 ? 'reverse' : '';
        
        // Generic description based on heading text
        const bodyText = `Understanding ${m.text} is a crucial step in mastering full-stack capabilities and structuring your modern workflow. Learn to leverage these powerful concepts efficiently.`;
        
        const blockHTML = `
<div class="illustration-block ${directionClass} animate-float" style="margin: 3rem 0; padding: 2.5rem; background: var(--bg-card); border: 1px solid var(--glass-b); border-radius: var(--radius); display:flex; gap:2.5rem; align-items:center;" aria-hidden="true">
  <div class="illus-svg" style="flex-shrink:0; width:220px;">
    ${templateSVG}
  </div>
  <div class="illus-text" style="flex:1;">
    <h3 style="font-size: 1.4rem; font-weight:800; margin-bottom:0.75rem; color: var(--brand);">${m.text} Breakdown</h3>
    <p style="color: var(--text-2); line-height: 1.6;">${bodyText}</p>
    <ul style="list-style:none; padding:0; margin-top:1rem; display:flex; flex-direction:column; gap:0.5rem;">
       <li style="font-weight:600;"><span style="color:var(--brand);">→</span> Core architecture paradigm</li>
       <li style="font-weight:600;"><span style="color:var(--brand);">→</span> Seamless integration workflows</li>
       <li style="font-weight:600;"><span style="color:var(--brand);">→</span> High performance state-management</li>
    </ul>
  </div>
</div>`;

        // Inject precisely after the heading match
        content = content.replace(m.fullMatch, m.fullMatch + '\n' + blockHTML);
        existingCount++;
        injectedCount++;
  }

  if (injectedCount > 0) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${filename} - Injected ${injectedCount} dynamic SVGs (Total: ${existingCount})`);
  } else {
       console.log(`⏭️ ${filename} - Could not find enough headings.`);
  }

});

console.log('\n🎉 Successfully scaled SVGs across all pages!');
