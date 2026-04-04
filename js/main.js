/* ============================================================
   NEXRAY — main.js
   Theme toggle · Scroll reveal · Progress bar · Nav · Copy
   ============================================================ */

(() => {
  'use strict';

  /* ── Theme: Light mode only — no toggle needed ─────────────── */
  // Single light theme — palette drives from CSS :root variables only.


  /* ── Navigation ───────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  /* ── Sidebar ─────────────────────────────────────────────── */
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarClose = document.getElementById('sidebar-close');

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    if (sidebarOverlay) sidebarOverlay.classList.add('open');
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    if (sidebarOverlay) sidebarOverlay.classList.remove('open');
  }

  if (sidebar) {
    // Hamburger toggles sidebar (primary trigger on all screens)
    if (hamburger) {
      hamburger.addEventListener('click', e => {
        e.stopPropagation();
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
      });
    }
    // Close button
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    // Overlay click closes
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    // Escape key closes
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
    // Left-edge hover trigger (desktop) — throttled to at most once per 200ms
    let edgeTriggerTimeout = null;
    document.addEventListener('mousemove', e => {
      if (e.clientX < 8 && !sidebar.classList.contains('open') && !edgeTriggerTimeout) {
        edgeTriggerTimeout = setTimeout(() => {
          if (!sidebar.classList.contains('open')) openSidebar();
          edgeTriggerTimeout = null;
        }, 200);
      }
    });
    // Sidebar group dropdowns
    sidebar.querySelectorAll('.sidebar-group-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.sidebar-group');
        const isOpen = group.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });
  } else if (hamburger && mobileNav) {
    // Fallback: legacy mobile nav toggle if no sidebar present
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(mobileNav.classList.contains('open')));
    });
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
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // run on load
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

  /* ── Custom Cursor — handled via CSS arrow cursor ─────────── */
  // CSS cursor defined in global.css — no JS needed

  /* ── Page Transition & Loader ─────────────────────────────── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 400);
    });
    setTimeout(() => {
      if(document.body.contains(loader)) {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 400);
      }
    }, 2500); 
  }

  // Intercept internal links to show animated fade-in loading state
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || !link.href) return;
    
    // Ignore blank targets, internal anchors, javascript links, and downloads
    const href = link.getAttribute('href');
    if (link.target === '_blank' || href.startsWith('#') || href.startsWith('javascript:') || link.hasAttribute('download')) return;
    
    try {
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
        e.preventDefault();
        
        let transLoader = document.getElementById('page-loader');
        if (!transLoader) {
          transLoader = document.createElement('div');
          transLoader.id = 'page-loader';
          transLoader.innerHTML = '<div class="loader-spinner"></div><p class="loader-text">Hang up… please wait, we\'re loading</p>';
          document.body.prepend(transLoader);
        }
        
        transLoader.style.display = 'flex';
        // Force reflow
        void transLoader.offsetWidth;
        transLoader.classList.remove('hidden');
        
        // Wait for fade animation before actually navigating
        setTimeout(() => {
          window.location.href = link.href;
        }, 350);
      }
    } catch(err) {}
  });

  /* ── Auth UI State Sync ───────────────────────────────────── */
  function syncAuthUI() {
    const userStr = localStorage.getItem('nexray_user');
    
    // If there's a dedicated nav-user-block (profile page or header), populate it
    const navUserBlock = document.getElementById('nav-user-block');
    if (navUserBlock) {
      if (userStr) {
        try {
          const u = JSON.parse(userStr);
          if (u && u.loggedIn) {
            navUserBlock.innerHTML = `
              <a href="profile.html" style="display:flex;align-items:center;gap:0.6rem;text-decoration:none;" aria-label="My Profile">
                <span style="font-weight:700;font-size:0.85rem;color:var(--text);" class="hide-mobile">${u.displayName}</span>
                <img src="${u.photoURL}" class="user-avatar" title="My Dashboard" alt="Profile" />
              </a>
            `;
          } else {
            navUserBlock.innerHTML = '';
          }
        } catch(e) {}
      } else {
        navUserBlock.innerHTML = '';
      }
    }

    if (!userStr) return;
    
    try {
      const u = JSON.parse(userStr);
      if (u && u.loggedIn) {
        // 1. Handle primary "Sign In" buttons (transform to Avatar)
        document.querySelectorAll('#nav-signin, .btn-signin').forEach(el => {
          if (el.closest('#nav-user-block')) return;
          
          if (document.getElementById('nav-user-block') && el.id === 'nav-signin') {
             el.style.display = 'none';
             el.classList.add('auth-processed');
             return;
          }

          let userLink = el.nextElementSibling;
          if (!userLink || !userLink.classList.contains('nav-user-profile')) {
             userLink = document.createElement('a');
             userLink.className = 'nav-user-profile auth-processed';
             el.insertAdjacentElement('afterend', userLink);
             el.style.display = 'none';
          }
          
          userLink.href = 'profile.html';
          userLink.style = 'display:flex;align-items:center;gap:0.6rem;text-decoration:none;';
          userLink.setAttribute('aria-label', 'My Profile');
          const defaultAvatarSvg = `data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='50' fill='%23f1f5f9'/><circle cx='50' cy='35' r='18' fill='%230038FF'/><path d='M50 58c-18.4 0-33.3 14.9-33.3 33.3h66.7C83.3 72.9 68.4 58 50 58z' fill='%230038FF'/></svg>`;
          userLink.innerHTML = `
            <span style="font-weight:700;font-size:0.85rem;color:var(--text);" class="hide-mobile">${u.displayName}</span>
            <img src="${u.photoURL || defaultAvatarSvg}" class="user-avatar" title="My Dashboard" alt="Profile"
                 onerror="this.src='${defaultAvatarSvg}';this.onerror=null;" />
          `;
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
           if (!btn.classList.contains('auth-processed') && !btn.closest('#nav-user-block')) {
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

  /* ── Service Worker Registration (PWA) ───────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Determine if we are in a subfolder based on pathname
      const swPath = window.location.pathname.includes('/guide/') || window.location.pathname.includes('/blog/')
        ? '../sw.js' 
        : '/sw.js';

      navigator.serviceWorker.register(swPath).then(registration => {
        console.log('[PWA] ServiceWorker registered with scope:', registration.scope);
      }).catch(err => {
        console.warn('[PWA] ServiceWorker registration failed:', err);
      });
    });
  }

})();
