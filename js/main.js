/* ============================================================
   NEXRAY — main.js
   Theme toggle · Scroll reveal · Progress bar · Nav · Copy
   ============================================================ */

(() => {
  'use strict';

  /* ── Theme System ─────────────────────────────────────────── */
  const THEMES = ['dark','light','neon'];
  const savedTheme = localStorage.getItem('nexray-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('nexray-theme', t);
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === t);
    });
  }

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
    btn.classList.toggle('active', btn.dataset.theme === savedTheme);
  });

  /* ── Navigation ───────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const open = mobileNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ── Scroll Progress Bar ──────────────────────────────────── */
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressFill.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /* ── Nav Scroll Style ─────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const updateNav = () => {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 4px 30px rgba(0,0,0,.3)'
        : 'none';
    };
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ── Scroll Reveal ────────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.stagger-children').forEach(el => {
    revealObs.observe(el);
  });

  /* ── Copy to Clipboard ────────────────────────────────────── */
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block')?.querySelector('pre');
      if (!pre) return;
      const text = pre.innerText || pre.textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.style.borderColor = 'var(--brand)';
        btn.style.color = 'var(--brand)';
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    });
  });

  /* ── Smooth anchor scroll ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Stage Progress Tracker ───────────────────────────────── */
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem('nexray-progress') || '{}'); } catch { return {}; }
  }
  function saveStageComplete(stage) {
    const p = loadProgress();
    p[`stage${stage}`] = true;
    p[`stage${stage}_date`] = new Date().toISOString();
    localStorage.setItem('nexray-progress', JSON.stringify(p));
    updateProgressUI();
  }
  function updateProgressUI() {
    const p = loadProgress();
    document.querySelectorAll('[data-stage]').forEach(el => {
      const s = el.dataset.stage;
      if (p[`stage${s}`]) {
        el.classList.add('done');
        el.setAttribute('aria-label', `Stage ${s} — Completed`);
      }
    });
    // Update progress dots
    const completed = Object.keys(p).filter(k => !k.includes('date')).length;
    document.querySelectorAll('.user-progress-text').forEach(el => {
      el.textContent = `${completed}/7 Stages Complete`;
    });
  }
  updateProgressUI();

  // Expose for stage pages
  window.NexrayProgress = { save: saveStageComplete, load: loadProgress };

  /* ── Mark Complete button ─────────────────────────────────── */
  document.querySelectorAll('.btn-complete').forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = btn.dataset.stage;
      if (stage) {
        saveStageComplete(stage);
        btn.textContent = '✓ Completed!';
        btn.classList.add('btn-secondary');
        btn.classList.remove('btn-primary');
        btn.disabled = true;
      }
    });
  });

  /* ── Initialize Lucide Icons ──────────────────────────────── */
  if (window.lucide) {
    window.lucide.createIcons();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) window.lucide.createIcons();
    });
  }

  /* ── Custom Cursor & Effects ──────────────────────────────── */
  let cursor = document.getElementById('custom-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);
  }

  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
    
    // Use event delegation for dynamic elements
    document.addEventListener('mouseover', e => {
      const target = e.target.closest('a, button, input, textarea, select, .stage-card, .pop-showcase');
      if (target) cursor.classList.add('hover');
    });
    document.addEventListener('mouseout', e => {
      const target = e.target.closest('a, button, input, textarea, select, .stage-card, .pop-showcase');
      if (target) cursor.classList.remove('hover');
    });
    document.addEventListener('click', e => {
      const target = e.target.closest('a, button, .stage-card, .pop-showcase');
      if (target) {
        target.classList.add('highlight-effect');
        setTimeout(() => target.classList.remove('highlight-effect'), 300);
      }
    });
  }

  /* ── Page Loader ──────────────────────────────────────────── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    });
    setTimeout(() => {
      if(document.body.contains(loader)) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }
    }, 3000); 
  }

  /* ── Auth UI State Sync ───────────────────────────────────── */
  function syncAuthUI() {
    const userStr = localStorage.getItem('nexray_user');
    if (!userStr) return;
    
    try {
      const u = JSON.parse(userStr);
      if (u && u.loggedIn) {
        // 1. Handle primary "Sign In" buttons (transform to Avatar)
        document.querySelectorAll('#nav-signin, .btn-signin').forEach(el => {
          if (el.classList.contains('auth-processed')) return;
          const userLink = document.createElement('a');
          userLink.href = 'profile.html';
          userLink.className = 'nav-user-profile auth-processed';
          userLink.style = 'display:flex; align-items:center; gap:0.75rem; text-decoration:none;';
          userLink.innerHTML = `
            <span style="font-weight:800; font-size:0.85rem; color:var(--text);" class="hide-mobile">${u.displayName}</span>
            <img src="${u.photoURL}" class="user-avatar" style="width:36px; height:36px; border-radius:50%; border:2px solid var(--brand); cursor:pointer;" title="View Dashboard" />
          `;
          el.replaceWith(userLink);
        });

        // 2. Handle CTA buttons (transform to Dashboard link)
        document.querySelectorAll('.nav-cta, .btn-save-progress').forEach(el => {
          if (el.classList.contains('auth-processed')) return;
          el.href = 'profile.html';
          el.innerHTML = 'Dashboard →';
          el.classList.add('auth-processed');
        });

        // 3. Catch-all for any other [href="auth.html"] links
        document.querySelectorAll('a[href="auth.html"], a[href$="/auth.html"]').forEach(btn => {
           if (!btn.classList.contains('auth-processed')) {
             btn.href = 'profile.html';
             btn.innerHTML = 'My Profile';
             btn.classList.add('auth-processed');
           }
        });
      }
    } catch(e) { console.warn('Auth sync failed', e); }
  }
  
  // Call on load and also on custom event
  syncAuthUI();
  window.addEventListener('auth-state-changed', syncAuthUI);

})();
