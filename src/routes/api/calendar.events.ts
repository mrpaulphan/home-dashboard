import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/calendar/events')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const {
            fetchUpcomingCalendarEvents,
            UPCOMING_EVENTS_DAYS,
          } = await import('#/lib/calendar-server')
          const events = await fetchUpcomingCalendarEvents(UPCOMING_EVENTS_DAYS)

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
