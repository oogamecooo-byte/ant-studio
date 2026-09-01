// PWA 서비스워커 — 캐싱 없음(항상 온라인 최신) + 푸시 알림 수신
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data.json(); } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.title || '🐜 개미 대본실', {
    body: d.body || '새 대사가 도착했습니다',
    icon: 'assets/icon-192.png',
    badge: 'assets/icon-192.png',
    data: { url: d.url || './' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) {
      if ('focus' in c) { c.navigate(url); return c.focus(); }
    }
    return clients.openWindow(url);
  }));
});
