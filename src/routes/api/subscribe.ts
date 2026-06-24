import { createFileRoute } from '@tanstack/react-router'

type SubscribeBody = {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
  device_label?: string | null
}

export const Route = createFileRoute('/api/subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { savePushSubscription } = await import('#/lib/push')
          const body = (await request.json()) as SubscribeBody

          if (!body.endpoint || !body.keys?.p256dh || !body.keys?.auth) {
            return Response.json(
              { error: 'Invalid subscription payload.' },
              { status: 400 },
            )
          }

          const id = await savePushSubscription(
            {
              endpoint: body.endpoint,
              keys: body.keys,
            },
            body.device_label ?? undefined,
          )

          return Response.json({ ok: true, id })
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Failed to save subscription.'
          return Response.json({ error: message }, { status: 500 })
        }
      },
    },
  },
})
