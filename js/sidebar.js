/* ============================================================
   NEXRAY — sidebar.js
   Sidebar drawer · Dark mode · Breadcrumbs · Notifications · Profile
   ============================================================ */

(function () {
  'use strict';

  /* ── HTML escaping (prevent XSS from user data) ─────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ── Current page detection ──────────────────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const isHome = currentPage === 'index.html' || currentPage === '';

  /* Breakpoint at which the sidebar is always visible (matches CSS @media min-width: 1024px) */
  var DESKTOP_BREAKPOINT = 1024;

  /* ── Dark Mode ───────────────────────────────────────────── */
  (function initDarkMode() {
    const saved = localStorage.getItem('nexray_theme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
  })();

  function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('nexray_theme', isDark ? 'dark' : 'light');
    updateDarkModeButtons();
  }

  function updateDarkModeButtons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.nxr-dark-toggle').forEach(function (btn) {
      btn.innerHTML = isDark ? sunIcon() : moonIcon();
      if (btn.classList.contains('nxr-sb-dark-btn')) {
        btn.innerHTML += '<span>' + (isDark ? 'Light Mode' : 'Dark Mode') + '</span>';
      }
      btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  /* ── SVG Icons ───────────────────────────────────────────── */
  function moonIcon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  function sunIcon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  }
  function menuIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }
  function bellIcon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
  }
  function closeIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }
  function searchIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  }

  /* ── Navigation items ────────────────────────────────────── */
  var NAV_ITEMS = [
    { divider: true, label: 'Pages' },
    {
      href: 'terms.html', label: 'Terms of Service', id: 'terms.html',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
    },
    {
      href: 'Privacy-Policy.html', label: 'Privacy Policy', id: 'Privacy-Policy.html',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
    },
    {
      href: 'security.html', label: 'Security', id: 'security.html',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
    },
    {
      href: 'disclaimer.html', label: 'Disclaimer', id: 'disclaimer.html',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    },
    {
      href: 'guide/stage7.html', label: 'FAQ', id: 'faq',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    },
    {
      href: 'contact.html', label: 'Contact', id: 'contact.html',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
    }
  ];

  /* ── Sidebar HTML builder ─────────────────────────────────── */
  function buildSidebarHTML() {
    var isDark = document.documentElement.classList.contains('dark');

    var navItemsHTML = NAV_ITEMS.map(function (item) {
      if (item.divider) {
        return item.label
          ? '<div class="nxr-sb-divider"><span>' + item.label + '</span></div>'
          : '<div class="nxr-sb-divider"></div>';
      }
      var isActive = currentPage === item.id;
      return '<a href="' + item.href + '" class="nxr-sb-item' + (isActive ? ' active' : '') + '">'
        + '<span class="nxr-sb-item-icon">' + item.icon + '</span>'
        + '<span>' + item.label + '</span>'
        + (isActive ? '<span class="nxr-sb-active-dot"></span>' : '')
        + '</a>';
    }).join('');

    return '<div id="nxr-sidebar" class="nxr-sidebar" role="navigation" aria-label="Site navigation">'
      + '<button id="nxr-sb-handle" class="nxr-sb-handle" aria-label="Toggle sidebar" title="Toggle sidebar">'
      +   '<img src="https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png" alt="" loading="lazy">'
      + '</button>'
      + '<div class="nxr-sb-header">'
      +   '<a href="index.html" class="nxr-sb-logo" aria-label="Nexray Home">'
      +     '<img src="https://res.cloudinary.com/djy0vsvfg/image/upload/v1774822889/logo_highres_hdmcey.png" alt="" loading="lazy">'
      +     '<span>NEX<strong>RAY</strong></span>'
      +   '</a>'
      + '</div>'
      + '<div class="nxr-sb-search">'
      +   '<span class="nxr-sb-search-icon">' + searchIcon() + '</span>'
      +   '<input type="search" id="nxr-sb-search" class="nxr-sb-search-input" placeholder="Search pages\u2026" aria-label="Search navigation">'
      + '</div>'
      + '<nav class="nxr-sb-nav" aria-label="Main pages">' + navItemsHTML + '</nav>'
      + '<div class="nxr-sb-footer">'
      +   '<button class="nxr-dark-toggle nxr-sb-dark-btn" aria-label="' + (isDark ? 'Switch to light mode' : 'Switch to dark mode') + '">'
      +     (isDark ? sunIcon() : moonIcon())
      +     '<span>' + (isDark ? 'Light Mode' : 'Dark Mode') + '</span>'
      +   '</button>'
      + '</div>'
      + '</div>'
      + '<div id="nxr-overlay" class="nxr-overlay" aria-hidden="true"></div>';
  }

  /* ── Breadcrumbs ─────────────────────────────────────────── */
  var BREADCRUMB_MAP = {
    'auth.html':             [{ label: 'Home', href: 'index.html' }, { label: 'Sign In' }],
    'profile.html':          [{ label: 'Home', href: 'index.html' }, { label: 'Dashboard' }],
    'terms.html':            [{ label: 'Home', href: 'index.html' }, { label: 'Legal' }, { label: 'Terms of Service' }],
    'Privacy-Policy.html':   [{ label: 'Home', href: 'index.html' }, { label: 'Legal' }, { label: 'Privacy Policy' }],
    'privacy-policy.html':   [{ label: 'Home', href: 'index.html' }, { label: 'Legal' }, { label: 'Privacy Policy' }],
    'security.html':         [{ label: 'Home', href: 'index.html' }, { label: 'Legal' }, { label: 'Security' }],
    'disclaimer.html':       [{ label: 'Home', href: 'index.html' }, { label: 'Legal' }, { label: 'Disclaimer' }]
  };

  function buildBreadcrumbs() {
    var trail = BREADCRUMB_MAP[currentPage];
    if (!trail || isHome) return;

    var itemsHTML = trail.map(function (item, i) {
      var sep = '<span class="nxr-bc-sep" aria-hidden="true">/</span>';
      if (i === trail.length - 1) {
        return sep + '<span class="nxr-bc-current" aria-current="page">' + item.label + '</span>';
      }
      if (item.href) {
        return sep + '<a href="' + item.href + '" class="nxr-bc-link">' + item.label + '</a>';
      }
      return sep + '<span class="nxr-bc-text">' + item.label + '</span>';
    }).join('');

    var html = '<nav class="nxr-breadcrumbs" aria-label="Breadcrumb">'
      + '<a href="index.html" class="nxr-bc-home" aria-label="Home">'
      +   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
      + '</a>'
      + itemsHTML
      + '</nav>';

    /* Insert as first child of .page-wrapper if it exists */
    var pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper) {
      pageWrapper.insertAdjacentHTML('afterbegin', html);
      return;
    }
    /* Fallback: after progress bar */
    var progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.insertAdjacentHTML('afterend', html);
    }
  }

  /* ── Notifications data ──────────────────────────────────── */
  var NOTIFICATIONS = [
    { text: 'Stage 7: SEO & Growth module updated for 2026', time: '2 days ago', read: false },
    { text: 'New blog post: CSS Grid vs Flexbox \u2014 when to use each', time: '4 days ago', read: false },
    { text: 'Welcome to Nexray! Start with Stage 1.', time: '1 week ago', read: true }
  ];

  function buildNotifPanel() {
    var items = NOTIFICATIONS.map(function (n) {
      return '<div class="nxr-notif-item">'
        + '<div class="nxr-notif-dot' + (n.read ? ' read' : '') + '"></div>'
        + '<div><div class="nxr-notif-text">' + n.text + '</div>'
        + '<div class="nxr-notif-time">' + n.time + '</div></div>'
        + '</div>';
    }).join('');
    return '<div id="nxr-notif-panel" class="nxr-notif-panel" role="dialog" aria-label="Notifications" hidden>'
      + '<div class="nxr-notif-header">'
      +   '<span class="nxr-notif-title">Notifications</span>'
      +   '<button class="nxr-notif-mark-read" id="nxr-mark-read">Mark all read</button>'
      + '</div>'
      + items
      + '<div class="nxr-notif-footer"><a href="blog/index.html">View all updates \u2192</a></div>'
      + '</div>';
  }

  /* ── Profile dropdown ────────────────────────────────────── */
  function buildProfileDropdown(user) {
    var name = escHtml(user.displayName || 'User');
    var email = escHtml(user.email || '');
    var photo = escHtml(user.photoURL || '');
    return '<div id="nxr-profile-dropdown" class="nxr-profile-dropdown" role="menu" hidden>'
      + '<div class="nxr-pd-header">'
      +   '<img src="' + photo + '" alt="' + name + '" class="nxr-pd-avatar nxr-hide-on-error">'
      +   '<div><div class="nxr-pd-name">' + name + '</div><div class="nxr-pd-email">' + email + '</div></div>'
      + '</div>'
      + '<div class="nxr-pd-divider"></div>'
      + '<a href="profile.html" class="nxr-pd-item" role="menuitem">'
      +   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
      +   ' My Dashboard'
      + '</a>'
      + '<button class="nxr-pd-item danger" id="nxr-sign-out" role="menuitem">'
      +   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'
      +   ' Sign Out'
      + '</button>'
      + '</div>';
  }

  /* ── Add controls to existing nav ────────────────────────── */
  function addNavControls() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var controls = document.createElement('div');
    controls.className = 'nxr-nav-controls';
    controls.innerHTML =
      '<button class="nxr-nav-btn nxr-sb-toggle" id="nxr-sb-open" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nxr-sidebar">'
      +   menuIcon()
      + '</button>';

    var hamburger = nav.querySelector('.nav-hamburger');
    if (hamburger) {
      nav.insertBefore(controls, hamburger);
    } else {
      nav.appendChild(controls);
    }

    /* Attach error handlers for avatar images via addEventListener */
    controls.querySelectorAll('.nxr-hide-on-error').forEach(function (img) {
      img.addEventListener('error', function () {
        img.style.display = 'none';
      });
    });
  }

  /* ── Search filter ───────────────────────────────────────── */
  function initSearch() {
    var searchInput = document.getElementById('nxr-sb-search');
    if (!searchInput) return;
    searchInput.addEventListener('input', function (e) {
      var query = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.nxr-sb-item').forEach(function (item) {
        var label = item.textContent.toLowerCase();
        item.style.display = (!query || label.includes(query)) ? '' : 'none';
      });
    });
  }

  /* ── Event wiring ────────────────────────────────────────── */
  function setupEvents() {
    var sidebar = document.getElementById('nxr-sidebar');
    var overlay = document.getElementById('nxr-overlay');
    var handleBtn = document.getElementById('nxr-sb-handle');
    var openBtn = document.getElementById('nxr-sb-open');
    var closeTimer = null;

    function openSidebar() {
      if (!sidebar) return;
      sidebar.classList.add('open');
      if (overlay) overlay.classList.add('open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      /* Only lock body scroll on mobile (drawer mode) */
      if (window.innerWidth < DESKTOP_BREAKPOINT) document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      if (!sidebar) return;
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function toggleSidebar() {
      if (!sidebar) return;
      if (sidebar.classList.contains('open')) closeSidebar();
      else openSidebar();
    }

    if (openBtn) openBtn.addEventListener('click', openSidebar);
    if (handleBtn) handleBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    /* Dark mode */
    document.querySelectorAll('.nxr-dark-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleDarkMode);
    });

    /* Desktop: edge hover open + move-away close */
    document.addEventListener('mousemove', function (e) {
      if (!sidebar || window.innerWidth < DESKTOP_BREAKPOINT) return;
      var x = e.clientX;
      var overSidebar = x <= sidebar.offsetWidth + 24;
      if (x <= 10) {
        openSidebar();
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      } else if (!overSidebar) {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
          closeSidebar();
        }, 140);
      }
    }, { passive: true });

    /* Keyboard: Escape closes everything */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    });

    initSearch();
  }

  /* ── Init ────────────────────────────────────────────────── */
  /* ── Scroll-hide header ──────────────────────────────────── */
  function initScrollHide() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var lastY = window.scrollY;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var currentY = window.scrollY;
          if (currentY > lastY && currentY > 80) {
            nav.classList.add('nav-hidden');
          } else {
            nav.classList.remove('nav-hidden');
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function init() {
    document.body.insertAdjacentHTML('afterbegin', buildSidebarHTML());
    addNavControls();
    buildBreadcrumbs();
    setupEvents();
    updateDarkModeButtons();
    initScrollHide();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
