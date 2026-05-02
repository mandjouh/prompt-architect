const CACHE_NAME = 'prompt-architect-v2'
const STATIC_ASSETS = [
  '/',
  '/generate',
  '/library',
  '/pricing',
  '/blog',
]

// Vérifie que l'URL est bien HTTP/HTTPS et cacheable
function isCacheable(request) {
  const url = new URL(request.url)
  return (
    url.protocol === 'http:' ||
    url.protocol === 'https:'
  )
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // On ajoute les assets un par un pour éviter qu'un échec bloque tout
      return Promise.allSettled(
        STATIC_ASSETS.map(url => cache.add(url).catch(() => null))
      )
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  // Ignorer les requêtes non-GET et non-HTTP
  if (event.request.method !== 'GET') return
  if (!isCacheable(event.request)) return

  // Ignorer les appels API — toujours réseau
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/api/')) return
  if (url.pathname.startsWith('/_next/')) return

  // Stratégie : Network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Ne cacher que les réponses valides
        if (
          response &&
          response.status === 200 &&
          response.type !== 'opaque'
        ) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone).catch(() => null)
          })
        }
        return response
      })
      .catch(() => {
        // Fallback sur le cache si réseau indisponible
        return caches.match(event.request).then(cached => {
          if (cached) return cached
          // Fallback vers la page d'accueil si rien en cache
          if (event.request.destination === 'document') {
            return caches.match('/')
          }
        })
      })
  )
})
