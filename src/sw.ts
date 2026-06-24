/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

self.addEventListener('push', (event) => {
  const payload = event.data?.json() as
    | { title?: string; body?: string; url?: string }
    | undefined

  const title = payload?.title ?? 'Family Hub'
  const body = payload?.body ?? 'You have a new update.'
  const url = payload?.url ?? '/'

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/icons/icon-192.svg',
      badge: '/icons/icon-192.svg',
      data: { url },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = (event.notification.data?.url as string | undefined) ?? '/'

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if ('focus' in client) {
            client.navigate(url)
            return client.focus()
          }
        }

        return self.clients.openWindow(url)
      }),
  )
})

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

export {}
