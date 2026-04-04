(function () {
  'use strict';

  if (window.__NEXRAY_SIDEBAR_ACTIVE__) return;
  window.__NEXRAY_SIDEBAR_ACTIVE__ = true;

  var path = window.location.pathname;
  var currentPage = (path.split('/').pop() || 'index.html').toLowerCase();
  var isNested = path.includes('/guide/') || path.includes('/blog/');
  var root = isNested ? '../' : '';
  var isHome = (path === '/' || path.endsWith('/index.html')) && !path.includes('/guide/') && !path.includes('/blog/');

  document.body.classList.add(isHome ? 'nxr-home-page' : 'nxr-non-home');

  function iconMenu() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }

  function iconClose() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  function link(href, label, key, icon) {
    var active = currentPage === key;
    return '<a href="' + root + href + '" class="nxr-sb-item' + (active ? ' active' : '') + '"><span class="nxr-sb-item-icon">' + icon + '</span><span>' + label + '</span>' + (active ? '<span class="nxr-sb-active-dot"></span>' : '') + '</a>';
  }

  function stageLink(href, label, key) {
    var active = currentPage === key;
    return '<a href="' + root + href + '" class="nxr-sb-subitem' + (active ? ' active' : '') + '">' + label + '</a>';
  }

  function buildSidebarHTML() {
    var legalLinks = ''
      + link('terms.html', 'Terms', 'terms.html', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>')
      + link('Privacy-Policy.html', 'Privacy Policy', 'privacy-policy.html', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>')
      + link('security.html', 'Security', 'security.html', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>')
      + link('disclaimer.html', 'Disclaimer', 'disclaimer.html', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>')
      + link('guide/stage7.html', 'FAQ', 'stage7.html', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>')
      + link('contact.html', 'Contact', 'contact.html', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>');

    var stages = ''
      + '<details class="nxr-sb-group"' + (path.includes('/guide/') ? ' open' : '') + '>'
      + '<summary><span>Stages</span><span class="nxr-sb-caret">▾</span></summary>'
      + '<div class="nxr-sb-submenu">'
      + stageLink('guide/stage1.html', 'Stage 1 — Basics', 'stage1.html')
      + stageLink('guide/stage2.html', 'Stage 2 — Frontend', 'stage2.html')
      + stageLink('guide/stage3.html', 'Stage 3 — Backend', 'stage3.html')
      + stageLink('guide/stage4.html', 'Stage 4 — Databases', 'stage4.html')
      + stageLink('guide/stage5.html', 'Stage 5 — Pro Skills', 'stage5.html')
      + stageLink('guide/stage6.html', 'Stage 6 — Android', 'stage6.html')
      + stageLink('guide/stage7.html', 'Stage 7 — Launch', 'stage7.html')
      + '</div>'
      + '</details>';

    return ''
      + '<div id="nxr-sidebar" class="nxr-sidebar" role="navigation" aria-label="Sidebar navigation">'
      + '  <div class="nxr-sb-header">'
      + '    <a href="' + root + 'index.html" class="nxr-sb-logo" aria-label="Nexray Home">'
      + '      <img src="https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png" alt="">'
      + '      <span>NEX<strong>RAY</strong></span>'
      + '    </a>'
      + '    <button id="nxr-sb-close" class="nxr-sb-close" aria-label="Close sidebar">' + iconClose() + '</button>'
      + '  </div>'
      + '  <nav class="nxr-sb-nav" aria-label="Secondary navigation">'
      + '    <div class="nxr-sb-divider"><span>Guide</span></div>'
      + stages
      + '    <div class="nxr-sb-divider"><span>Legal & Support</span></div>'
      + legalLinks
      + '  </nav>'
      + '</div>'
      + '<button id="nxr-edge-logo" class="nxr-edge-logo" aria-label="Open sidebar"><img src="https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png" alt=""></button>'
      + '<div id="nxr-overlay" class="nxr-overlay" aria-hidden="true"></div>';
  }

  function normalizeHeader() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var navLinks = nav.querySelector('.nav-links');
    if (!navLinks) {
      navLinks = document.createElement('div');
      navLinks.className = 'nav-links';
      nav.appendChild(navLinks);
    }

    navLinks.innerHTML = ''
      + '<a href="' + root + 'index.html"' + (isHome ? ' class="active"' : '') + '>Home</a>'
      + '<a href="' + root + 'profile.html"' + (currentPage === 'profile.html' ? ' class="active"' : '') + '>Dashboard</a>'
      + '<a href="' + root + 'auth.html" class="btn-signin" id="nav-signin">Sign In</a>'
      + '<button type="button" class="btn-signin nxr-signout" id="nav-signout" hidden>Sign Out</button>';

    var controls = nav.querySelector('.nxr-nav-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'nxr-nav-controls';
      controls.innerHTML = '<button class="nxr-nav-btn nxr-sb-toggle" id="nxr-sb-open" aria-label="Open sidebar" aria-expanded="false" aria-controls="nxr-sidebar">' + iconMenu() + '</button>';
      nav.appendChild(controls);
    }
  }

  function syncAuthLinks() {
    var signIn = document.getElementById('nav-signin');
    var signOut = document.getElementById('nav-signout');
    if (!signIn || !signOut) return;

    var loggedIn = false;
    try {
      var user = JSON.parse(localStorage.getItem('nexray_user') || '{}');
      loggedIn = !!(user && user.loggedIn);
    } catch (_) {}

    signIn.hidden = loggedIn;
    signOut.hidden = !loggedIn;
  }

  function setupEvents() {
    var sidebar = document.getElementById('nxr-sidebar');
    var overlay = document.getElementById('nxr-overlay');
    var openBtn = document.getElementById('nxr-sb-open');
    var edgeLogo = document.getElementById('nxr-edge-logo');
    var closeBtn = document.getElementById('nxr-sb-close');
    var signOut = document.getElementById('nav-signout');

    var DESKTOP_BREAKPOINT = 1024;
    var EDGE_TRIGGER = 10;
    var HOVER_BUFFER = 30;
    var CLOSE_DELAY = 160;
    var closeTimer = null;

    function openSidebar() {
      if (!sidebar) return;
      sidebar.classList.add('open');
      overlay && overlay.classList.add('open');
      openBtn && openBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nxr-sidebar-open');
      if (window.innerWidth < DESKTOP_BREAKPOINT) document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      if (!sidebar) return;
      sidebar.classList.remove('open');
      overlay && overlay.classList.remove('open');
      openBtn && openBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nxr-sidebar-open');
      document.body.style.overflow = '';
    }

    openBtn && openBtn.addEventListener('click', openSidebar);
    edgeLogo && edgeLogo.addEventListener('click', openSidebar);
    closeBtn && closeBtn.addEventListener('click', closeSidebar);
    overlay && overlay.addEventListener('click', closeSidebar);

    document.addEventListener('mousemove', function (e) {
      if (!sidebar || window.innerWidth < DESKTOP_BREAKPOINT) return;
      var x = e.clientX;
      var overSidebar = x <= sidebar.offsetWidth + HOVER_BUFFER;

      if (x <= EDGE_TRIGGER) {
        openSidebar();
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      } else if (!overSidebar) {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(closeSidebar, CLOSE_DELAY);
      }
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });

    if (signOut) {
      signOut.addEventListener('click', function () {
        localStorage.removeItem('nexray_user');
        window.dispatchEvent(new Event('auth-state-changed'));
        syncAuthLinks();
      });
    }

    window.addEventListener('auth-state-changed', syncAuthLinks);
    window.addEventListener('storage', syncAuthLinks);
  }

  function initScrollHide() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var lastY = window.scrollY;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (ticking) return;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > lastY && y > 80) nav.classList.add('nav-hidden');
        else nav.classList.remove('nav-hidden');
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  function init() {
    normalizeHeader();
    document.body.insertAdjacentHTML('afterbegin', buildSidebarHTML());
    setupEvents();
    syncAuthLinks();
    initScrollHide();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
