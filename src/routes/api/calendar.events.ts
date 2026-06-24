import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/calendar/events')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { fetchUpcomingCalendarEvents } = await import(
            '#/lib/calendar-server'
          )
          const events = await fetchUpcomingCalendarEvents(30)

          return Response.json({ events })
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Failed to load calendar events.'
          return Response.json({ error: message, events: [] }, { status: 500 })
        }
      },
    },
  },
})
