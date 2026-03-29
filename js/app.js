/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  NEXRAY APP.JS — Core Application Engine v3.0               ║
 * ║  Swipe Navigation, PWA Install, Animated Progress, Cache    ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     1. PWA INSTALL BANNER
     Shows a beautiful "Add to Home Screen" prompt
  ───────────────────────────────────────────────────────────── */
  let deferredInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallBanner();
  });

  function showInstallBanner() {
    if (document.getElementById('pwa-install-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.innerHTML = `
      <div class="pwa-banner-content">
        <img src="https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png" class="pwa-banner-logo" alt="Nexray" />
        <div class="pwa-banner-text">
          <strong>Install Nexray App</strong>
          <span>Free, fast & offline access</span>
        </div>
        <button id="pwa-install-btn" class="pwa-install-btn">Install</button>
        <button id="pwa-dismiss-btn" class="pwa-dismiss-btn" aria-label="Dismiss">✕</button>
      </div>
    `;
    document.body.appendChild(banner);

    requestAnimationFrame(() => banner.classList.add('visible'));

    document.getElementById('pwa-install-btn').addEventListener('click', () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then(choice => {
          if (choice.outcome === 'accepted') banner.remove();
          deferredInstallPrompt = null;
        });
      }
    });

    document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     2. ANIMATED PROGRESS BAR WITH MASCOT
  ───────────────────────────────────────────────────────────── */
  function initReadingProgressBar() {
    const bar = document.getElementById('progress-fill');
    if (!bar) return;

    // Create or reuse mascot
    let mascot = document.getElementById('progress-mascot');
    if (!mascot) {
      mascot = document.createElement('div');
      mascot.id = 'progress-mascot';
      mascot.innerHTML = `
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" class="mascot-svg">
          <!-- Body -->
          <circle cx="20" cy="14" r="8" fill="#0038FF"/>
          <!-- Face -->
          <circle cx="17.5" cy="13" r="1.5" fill="#fff"/>
          <circle cx="22.5" cy="13" r="1.5" fill="#fff"/>
          <circle cx="17.8" cy="13.3" r="0.7" fill="#09090f"/>
          <circle cx="22.8" cy="13.3" r="0.7" fill="#09090f"/>
          <!-- Smile -->
          <path d="M17 17 Q20 19.5 23 17" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"/>
          <!-- Legs (walking animation) -->
          <line id="leg-l" x1="17" y1="22" x2="14" y2="30" stroke="#0038FF" stroke-width="2.5" stroke-linecap="round" class="mascot-leg-l"/>
          <line id="leg-r" x1="23" y1="22" x2="26" y2="30" stroke="#0038FF" stroke-width="2.5" stroke-linecap="round" class="mascot-leg-r"/>
          <!-- Arms -->
          <line x1="12" y1="17" x2="17" y2="21" stroke="#0038FF" stroke-width="2" stroke-linecap="round" class="mascot-arm-l"/>
          <line x1="28" y1="17" x2="23" y2="21" stroke="#0038FF" stroke-width="2" stroke-linecap="round" class="mascot-arm-r"/>
        </svg>
      `;
      bar.parentElement.appendChild(mascot);
    }

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      bar.style.width = pct + '%';
      
      // Move mascot along the bar
      const barRect = bar.parentElement.getBoundingClientRect();
      const mascotX = (barRect.width * pct / 100) - 20;
      mascot.style.left = Math.max(0, mascotX) + 'px';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ─────────────────────────────────────────────────────────────
     3. MOBILE SWIPE NAVIGATION (Left/Right like Meta)
  ───────────────────────────────────────────────────────────── */
  const STAGE_ORDER = [
    '/guide/stage1.html',
    '/guide/stage2.html',
    '/guide/stage3.html',
    '/guide/stage4.html',
    '/guide/stage5.html',
    '/guide/stage6.html',
    '/guide/stage7.html',
  ];

  function initSwipeNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 80;
    const VERTICAL_THRESHOLD = 50;

    function getCurrentStageIndex() {
      const path = window.location.pathname;
      return STAGE_ORDER.findIndex(s => path.includes(s.replace('/', '')));
    }

    function navigateToStage(delta) {
      const idx = getCurrentStageIndex();
      if (idx === -1) return;
      const nextIdx = idx + delta;
      if (nextIdx < 0 || nextIdx >= STAGE_ORDER.length) return;

      // Determine relative path from current dir (guide/ folder)
      const target = STAGE_ORDER[nextIdx].split('/').pop();
      
      // Show swipe hint overlay
      const dir = delta > 0 ? 'right' : 'left';
      showSwipeTransition(dir, () => window.location.href = target);
    }

    function showSwipeTransition(direction, callback) {
      const overlay = document.createElement('div');
      overlay.className = `swipe-transition swipe-${direction}`;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.classList.add('active');
        setTimeout(() => {
          callback();
        }, 300);
      });
    }

    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);
      
      // Only handle horizontal swipes on stage pages
      if (Math.abs(diffX) < SWIPE_THRESHOLD || diffY > VERTICAL_THRESHOLD) return;
      if (getCurrentStageIndex() === -1) return;

      if (diffX < -SWIPE_THRESHOLD) {
        navigateToStage(1); // swipe left → next stage
      } else if (diffX > SWIPE_THRESHOLD) {
        navigateToStage(-1); // swipe right → previous stage
      }
    }, { passive: true });

    // Inject swipe arrow hints on mobile in stage pages
    if (getCurrentStageIndex() !== -1 && window.innerWidth < 1024) {
      injectSwipeArrows();
    }
  }

  function injectSwipeArrows() {
    const idx = STAGE_ORDER.findIndex(s => window.location.pathname.includes(s.replace('/', '')));
    if (idx === -1) return;

    const container = document.createElement('div');
    container.className = 'swipe-hint-arrows';
    container.innerHTML = `
      ${idx > 0 ? `<a href="${STAGE_ORDER[idx - 1].split('/').pop()}" class="swipe-arrow swipe-arrow-left" aria-label="Previous Stage">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        <span>Stage ${idx}</span>
      </a>` : ''}
      ${idx < STAGE_ORDER.length - 1 ? `<a href="${STAGE_ORDER[idx + 1].split('/').pop()}" class="swipe-arrow swipe-arrow-right" aria-label="Next Stage">
        <span>Stage ${idx + 2}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </a>` : ''}
    `;
    document.body.appendChild(container);
  }

  /* ─────────────────────────────────────────────────────────────
     4. IMAGE LAZY LOAD WITH ANIMATION
  ───────────────────────────────────────────────────────────── */
  function initLazyImages() {
    if (!('IntersectionObserver' in window)) return;
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('loaded');
          io.unobserve(e.target);
        }
      });
    });
    imgs.forEach(img => io.observe(img));
  }

  /* ─────────────────────────────────────────────────────────────
     5. SECTION REVEAL ON SCROLL
  ───────────────────────────────────────────────────────────── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    const elements = document.querySelectorAll('.glass-card, .stage-card, .feature-card, .step-card, .content-heading, .illustration-block');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => {
      el.classList.add('reveal-hidden');
      io.observe(el);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     6. INIT
  ───────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initReadingProgressBar();
    initSwipeNavigation();
    initLazyImages();
    initScrollReveal();
    initCertificatePopup();
  });

  /* ─────────────────────────────────────────────────────────────
     7. CERTIFICATE COMPLETION POPUP
  ───────────────────────────────────────────────────────────── */
  function initCertificatePopup() {
    if (!window.location.pathname.includes('stage7.html')) return;
    
    let popupShown = false;
    window.addEventListener('scroll', () => {
      if (popupShown) return;
      
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // If user reaches bottom 10% of the final stage
      if (docHeight > 0 && (scrollTop / docHeight) > 0.90) {
        popupShown = true;
        showCertificateModal();
      }
    });

    function showCertificateModal() {
      const modal = document.createElement('div');
      modal.id = 'cert-completion-modal';
      modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(9,9,15,0.8); backdrop-filter: blur(10px); z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s ease;">
          <div style="background: var(--bg-card); border: 2px solid var(--brand); border-radius: 24px; padding: 3rem; text-align: center; max-width: 480px; width: 90%; transform: scale(0.9); transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 20px 60px rgba(249,115,22,0.3);">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎓</div>
            <h2 style="font-size: 2rem; font-family: 'Space Grotesk', sans-serif; font-weight: 900; color: var(--text); margin-bottom: 1rem;">Journey Complete!</h2>
            <p style="color: var(--text-2); margin-bottom: 2rem; line-height: 1.6;">You've officially finished all 7 stages of the Nexray Web Development Masterclass. Claim your verified certificate now.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
              <button id="cert-close-btn" class="btn btn-secondary">Maybe Later</button>
              <button id="cert-claim-btn" class="btn btn-primary" style="animation: pulse-glow 2s infinite;">Download Certificate</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Slide/Fade in
      requestAnimationFrame(() => {
        modal.firstElementChild.style.opacity = '1';
        modal.firstElementChild.firstElementChild.style.transform = 'scale(1)';
      });

      document.getElementById('cert-close-btn').onclick = () => {
        modal.firstElementChild.style.opacity = '0';
        setTimeout(() => modal.remove(), 500);
      };

      document.getElementById('cert-claim-btn').onclick = () => {
        if (window.downloadMyCertificate) {
          window.downloadMyCertificate();
        } else if (window.generateCertificate) {
          window.generateCertificate('Nexray Graduate');
        }
        modal.firstElementChild.style.opacity = '0';
        setTimeout(() => modal.remove(), 500);
      };
    }
  }

})();
