import { createFileRoute } from '@tanstack/react-router'

type WebhookBody = {
  message?: string
  recipient?: 'paul' | 'girlfriend'
}

function parsePackageMessage(message: string) {
  const trimmed = message.trim()
  const carrierMatch = trimmed.match(
    /\b(USPS|UPS|FedEx|Amazon|DHL|OnTrac)\b/i,
  )
  const carrier = carrierMatch?.[1] ?? 'Unknown'

  const description = trimmed
    .replace(/\b(USPS|UPS|FedEx|Amazon|DHL|OnTrac)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    carrier,
    description: description || trimmed,
  }
}

export const Route = createFileRoute('/api/webhook/packages')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const secret = request.headers.get('x-webhook-secret')
          if (!secret || secret !== process.env.WEBHOOK_SECRET) {
            return Response.json({ error: 'Unauthorized.' }, { status: 401 })
          }

          const body = (await request.json()) as WebhookBody
          if (!body.message || !body.recipient) {
            return Response.json(
              { error: 'message and recipient are required.' },
              { status: 400 },
            )
          }

          if (body.recipient !== 'paul' && body.recipient !== 'girlfriend') {
            return Response.json({ error: 'Invalid recipient.' }, { status: 400 })
          }

          const { carrier, description } = parsePackageMessage(body.message)
          const { FieldValue } = await import('firebase-admin/firestore')
          const { getAdminDb } = await import('#/lib/firebase-admin')
          const { sendPushToAll } = await import('#/lib/push')
          const db = getAdminDb()
          const docRef = await db.collection('packages').add({
            recipient: body.recipient,
            description,
            carrier,
            arrived_at: FieldValue.serverTimestamp(),
            status: 'pending',
            raw_message: body.message,
          })

          const pushResult = await sendPushToAll({
            title: `Package for ${body.recipient}`,
            body: `${carrier}: ${description}`,
            url: '/',
          })

          return Response.json({
            ok: true,
            id: docRef.id,
            push: pushResult,
          })
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Webhook failed.'
          return Response.json({ error: message }, { status: 500 })
        }
      },
    },
  },
})
