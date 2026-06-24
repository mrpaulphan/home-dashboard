import webpush from 'web-push'

export type PushSubscriptionRecord = {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export type PushPayload = {
  title: string
  body: string
  url?: string
}

async function getAdminDb() {
  const { getAdminDb: loadAdminDb } = await import('#/lib/firebase-admin')
  return loadAdminDb()
}

function getVapidConfig() {
  const publicKey = process.env.VITE_VAPID_PUBLIC_KEY
  const privateKey = process.env.VAPID_PRIVATE_KEY
  const subject = process.env.VAPID_SUBJECT ?? 'mailto:family-hub@example.com'

  if (!publicKey || !privateKey) {
    throw new Error('VAPID keys are not configured.')
  }

  return { publicKey, privateKey, subject }
}

export function configureWebPush() {
  const { publicKey, privateKey, subject } = getVapidConfig()
  webpush.setVapidDetails(subject, publicKey, privateKey)
}

export function subscriptionDocId(endpoint: string) {
  return Buffer.from(endpoint).toString('base64url')
}

export async function savePushSubscription(
  subscription: PushSubscriptionRecord,
  deviceLabel?: string,
) {
  const db = await getAdminDb()
  const id = subscriptionDocId(subscription.endpoint)

  await db.collection('push_subscriptions').doc(id).set(
    {
      endpoint: subscription.endpoint,
      keys: subscription.keys,
      device_label: deviceLabel ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    { merge: true },
  )

  return id
}

export async function sendPushToAll(payload: PushPayload) {
  configureWebPush()

  const db = await getAdminDb()
  const snapshot = await db.collection('push_subscriptions').get()
  const body = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url ?? '/',
  })

  const results = await Promise.allSettled(
    snapshot.docs.map(async (doc) => {
      const data = doc.data() as PushSubscriptionRecord & {
        endpoint: string
        keys: { p256dh: string; auth: string }
      }

      try {
        await webpush.sendNotification(
          {
            endpoint: data.endpoint,
            keys: data.keys,
          },
          body,
        )
      } catch (error) {
        const statusCode =
          error && typeof error === 'object' && 'statusCode' in error
            ? (error as { statusCode?: number }).statusCode
            : undefined

        if (statusCode === 404 || statusCode === 410) {
          await doc.ref.delete()
        }

        throw error
      }
    }),
  )

  const sent = results.filter((result) => result.status === 'fulfilled').length
  const failed = results.length - sent

  return { sent, failed, total: results.length }
}
