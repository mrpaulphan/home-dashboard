const SW_PATH = '/sw.js'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}

export function isStandalonePwa() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

export function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

export function canSubscribeToPush() {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    return false
  }

  if (isIosDevice() && !isStandalonePwa()) {
    return false
  }

  return true
}

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return null
  }

  return navigator.serviceWorker.register(SW_PATH, { scope: '/' })
}

export async function subscribeToPush(deviceLabel?: string) {
  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
  if (!publicKey) {
    throw new Error('Missing VITE_VAPID_PUBLIC_KEY')
  }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    throw new Error('Notification permission was not granted.')
  }

  const registration = await registerServiceWorker()
  if (!registration) {
    throw new Error('Service worker is not supported.')
  }

  await navigator.serviceWorker.ready

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  })

  const json = subscription.toJSON()
  if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) {
    throw new Error('Invalid push subscription.')
  }

  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: json.endpoint,
      keys: {
        p256dh: json.keys.p256dh,
        auth: json.keys.auth,
      },
      device_label: deviceLabel ?? null,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to save push subscription.')
  }

  return subscription
}

export async function ensurePushSubscription() {
  if (!canSubscribeToPush()) {
    return null
  }

  if (Notification.permission !== 'granted') {
    return null
  }

  const registration = await registerServiceWorker()
  if (!registration) {
    return null
  }

  await navigator.serviceWorker.ready

  let subscription = await registration.pushManager.getSubscription()
  if (!subscription) {
    return null
  }

  const json = subscription.toJSON()
  if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) {
    return null
  }

  await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: json.endpoint,
      keys: {
        p256dh: json.keys.p256dh,
        auth: json.keys.auth,
      },
    }),
  })

  return subscription
}
