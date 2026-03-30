/**
 * NEXRAY — seo-updater.js
 * Injects/updates canonical meta tags, OG tags, Twitter cards,
 * JSON-LD structured data, and social preview image tags across all pages.
 * Run: node seo-updater.js
 */

const fs = require('fs');
const path = require('path');

const OG_IMAGE = 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png';
const SITE_URL = 'https://nexray.in';
const SITE_NAME = 'Nexray';

const pages = [
  { file: 'index.html',            title: 'Nexray — Learn Web Development from Zero to Pro in 2026', desc: 'Free 7-stage web development guide for 2026. Learn HTML, CSS, JavaScript, backend, DevOps, Android apps. Go from zero to full-stack pro — completely free.' },
  { file: 'about.html',            title: 'About Nexray — Our Mission & Story', desc: 'Learn about Nexray — the free platform helping beginners master web development in 2026 through 7 structured stages.' },
  { file: 'resources.html',        title: 'Free Web Dev Resources 2026 — Nexray', desc: 'Curated free tools, courses, cheatsheets, and resources for web developers. Updated for 2026.' },
  { file: 'auth.html',             title: 'Sign In — Nexray', desc: 'Sign in to Nexray to track your progress through the 7-stage web development guide.' },
  { file: 'blog/index.html',       title: 'Nexray Blog — Web Dev Tutorials & Tips 2026', desc: 'Latest web development tutorials, tips, and guides from the Nexray team.' },
  { file: 'contact.html',          title: 'Contact Nexray', desc: 'Get in touch with the Nexray team. We\'d love to hear from you.' },
  { file: '404.html',              title: '404 — Page Not Found | Nexray', desc: 'Oops! This page doesn\'t exist. Return to Nexray to continue learning web development.' },
  { file: 'guide/stage1.html',     title: 'Stage 1: Web Dev Basics — HTML, DNS & Your First Website | Nexray', desc: 'Learn what a website is, how the internet works, buy a domain, and deploy your first live site for free. Stage 1 of the Nexray guide.' },
  { file: 'guide/stage2.html',     title: 'Stage 2: Frontend Development — CSS, JS & React | Nexray', desc: 'Master HTML, CSS, JavaScript and React. Build beautiful, interactive websites. Stage 2 of the Nexray web dev guide.' },
  { file: 'guide/stage3.html',     title: 'Stage 3: Backend Development & APIs | Nexray', desc: 'Build servers withnode.js, create REST APIs, and handle authentication. Stage 3 of the Nexray guide.' },
  { file: 'guide/stage4.html',     title: 'Stage 4: Databases — SQL, NoSQL & Firebase | Nexray', desc: 'Learn SQL, MongoDB, and Firebase. Store and query data for your web apps. Stage 4 of the Nexray guide.' },
  { file: 'guide/stage5.html',     title: 'Stage 5: DevOps, CI/CD & Cloud Deployment | Nexray', desc: 'Deploy with Docker, GitHub Actions, Vercel, and AWS. Learn DevOps fundamentals. Stage 5 of the Nexray guide.' },
  { file: 'guide/stage6.html',     title: 'Stage 6: Android & Mobile App Development | Nexray', desc: 'Build Android apps using React Native and Flutter. Stage 6 of the Nexray web dev guide.' },
  { file: 'guide/stage7.html',     title: 'Stage 7: Launch Your Project & Go Live | Nexray', desc: 'Ship your project to production. SEO, monetization, marketing, and going live. Stage 7 of the Nexray guide.' },
];

function buildMeta(page, filePath) {
  // compute canonical URL relative to file path
  const rel = filePath.replace(/\\/g, '/').replace(/.*spinning-universe\//, '');
  const canonical = `${SITE_URL}/${rel}`;

  // JSON-LD structured data
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": rel.startsWith('guide/') ? "Course" : "WebPage",
    "name": page.title,
    "description": page.desc,
    "url": canonical,
    "provider": { "@type": "Organization", "name": SITE_NAME, "url": SITE_URL },
    "image": OG_IMAGE
  });

  return `
  <!-- ═══ SEO (Nexray v2) ═══ -->
  <meta name="description" content="${page.desc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.desc}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${canonical}" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@nexray_in" />
  <meta name="twitter:title" content="${page.title}" />
  <meta name="twitter:description" content="${page.desc}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <!-- Structured Data -->
  <script type="application/ld+json">${jsonld}</script>
  <!-- ═══ /SEO ═══ -->
`;
}

let updated = 0;
pages.forEach(page => {
  const filePath = path.join(__dirname, page.file);
  if (!fs.existsSync(filePath)) { console.log('SKIP:', page.file); return; }

  let html = fs.readFileSync(filePath, 'utf8');

  // Update title tag
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);

  // Remove old SEO block if present (marked by Nexray v1 or duplicates)
  html = html.replace(/<!-- ═══ SEO \(Nexray v2\) ═══ -->[\s\S]*?<!-- ═══ \/SEO ═══ -->/g, '');
  // Also remove old isolated meta description/OG tags to prevent duplication
  html = html.replace(/<meta name="description"[^>]*>/g, '');
  html = html.replace(/<meta name="robots"[^>]*>/g, '');
  html = html.replace(/<link rel="canonical"[^>]*>/g, '');
  html = html.replace(/<meta property="og:[^"]*"[^>]*>/g, '');
  html = html.replace(/<meta name="twitter:[^"]*"[^>]*>/g, '');

  // Inject SEO block right after <head>
  html = html.replace(/<head>/, `<head>${buildMeta(page, filePath)}`);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ SEO updated: ${page.file}`);
  updated++;
});

console.log(`\n🎉 ${updated} pages updated with full SEO meta tags!`);
