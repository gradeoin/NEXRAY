/* ============================================================
   NEXRAY — Service Worker v2.0
   Offline support | Cache-first strategy | Background sync
   ============================================================ */

const CACHE_NAME = 'nexray-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/global.css',
  '/js/main.js',
  '/js/auth.js',
  '/js/dock-injector.js',
  '/manifest.json',
  '/guide/stage1.html',
  '/guide/stage2.html',
  '/guide/stage3.html',
  '/profile.html',
  '/auth.html',
  '/404.html'

  '/website-creation.html',
  '/react-development-tools.html',
  '/tailwind-css-best-practices.html',
  '/full-stack-roadmap-2026.html',

  '/javascript-tutorial-for-beginners.html',
  '/learn-typescript-in-2026.html',
  '/best-code-editors.html',
  '/css-grid-vs-flexbox.html',
  '/what-is-an-api.html',
  '/how-to-become-a-frontend-developer.html',
  '/backend-development-languages.html',
  '/deploy-react-app-free.html',
  '/github-actions-cicd-guide.html',
  '/firebase-vs-supabase.html',
  '/docker-for-web-developers.html',
  '/web-accessibility-wcag-2026.html',
  '/how-to-learn-coding.html',
  '/best-programming-languages-2026.html',
  '/web-development-bootcamp-alternatives.html',
  '/nextjs-app-router-tutorial.html',
];

const CDN_CACHE = 'nexray-cdn-v1';

// ── Install: cache static assets ──
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Some assets failed to cache:', err);
      });
    })
  );
});

// ── Activate: clean up old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CDN_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for HTML, cache-first for assets ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== 'GET') return;

  // Skip Chrome extensions
  if (url.protocol === 'chrome-extension:') return;

  // For HTML pages: network first, fallback to cache
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(resp => {
          if (!resp.ok && resp.status === 404) {
            throw new Error("Page not found");
          }
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return resp;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('/404.html')))
    );
    return;
  }

  // For Google Fonts and CDN: cache first
  if (url.hostname.includes('fonts.googleapis') || url.hostname.includes('cloudinary')) {
    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(resp => {
            cache.put(request, resp.clone());
            return resp;
          });
        })
      )
    );
    return;
  }

  // For CSS/JS: stale-while-revalidate
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(resp => {
        caches.open(CACHE_NAME).then(c => c.put(request, resp.clone()));
        return resp;
      });
      return cached || fetchPromise;
    })
  );
});

// ── Push notifications ──
self.addEventListener('push', event => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'Nexray Update';
  const options = {
    body: data.body || 'You have a new notification',
    icon: 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png',
    badge: 'https://res.cloudinary.com/djy0vsvfg/image/upload/v1774814733/logo1_z2jumw.png',
    data: { url: data.url || '/' },
    vibrate: [200, 100, 200],
    tag: 'nexray-notification',
    renotify: true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ── Notification click ──
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      const targetUrl = event.notification.data?.url || '/';
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
