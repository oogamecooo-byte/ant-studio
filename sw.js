// 설치형(PWA) 인식용 최소 서비스워커 — 캐싱 없음, 항상 온라인 최신
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
