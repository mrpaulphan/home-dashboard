import { Link } from '@tanstack/react-router'
import { ArrowRight, MapPin } from 'lucide-react'
import type { CalendarEvent } from '#/lib/calendar'
import {
  formatEventTime,
  groupEventsByDay,
} from '#/lib/calendar'

type EventListProps = {
  events: CalendarEvent[]
  emptyMessage?: string
  compact?: boolean
}

function EventCard({
  event,
  compact,
}: {
  event: CalendarEvent
  compact?: boolean
}) {
  return (
    <article
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      data-testid={`events-event-${event.id}-card`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="font-medium text-slate-900"
            data-testid={`events-event-${event.id}-title-text`}
          >
            {event.title}
          </p>
          <p
            className="mt-1 text-sm text-blue-700"
            data-testid={`events-event-${event.id}-time-text`}
          >
            {formatEventTime(event)}
          </p>
          {event.location ? (
            <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span data-testid={`events-event-${event.id}-location-text`}>
                {event.location}
              </span>
            </p>
          ) : null}
          {!compact && event.description ? (
            <p
              className="mt-2 text-sm text-slate-600"
              data-testid={`events-event-${event.id}-description-text`}
            >
              {event.description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function EventList({
  events,
  emptyMessage = 'No upcoming events in the next 30 days.',
  compact = false,
}: EventListProps) {
  if (events.length === 0) {
    return (
      <p
        className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600"
        data-testid="events-empty-text"
      >
        {emptyMessage}
      </p>
    )
  }

  const grouped = groupEventsByDay(events)

  return (
    <div className="space-y-5" data-testid="events-list-container">
      {grouped.map((group) => (
        <section key={group.dayKey} data-testid={`events-day-${group.dayKey}-section`}>
          <h2
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500"
            data-testid={`events-day-${group.dayKey}-header`}
          >
            {group.label}
          </h2>
          <div className="space-y-3">
            {group.events.map((event) => (
              <EventCard key={event.id} event={event} compact={compact} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

type UpcomingEventsPreviewProps = {
  events: CalendarEvent[]
  loading: boolean
  error: string | null
}

export function UpcomingEventsPreview({
  events,
  loading,
  error,
}: UpcomingEventsPreviewProps) {
  const previewEvents = events.slice(0, 3)

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      data-testid="home-upcomingEvents-card"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className="text-lg font-semibold text-slate-900"
          data-testid="home-upcomingEvents-header"
        >
          Upcoming events
        </h2>
        <Link
          to="/events"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700"
          data-testid="home-upcomingEvents-viewAll-link"
        >
          View all
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500" data-testid="home-upcomingEvents-loading-text">
          Loading events…
        </p>
      ) : null}

      {!loading && error ? (
        <p
          className="text-sm text-amber-700"
          data-testid="home-upcomingEvents-error-text"
        >
          {error}
        </p>
      ) : null}

      {!loading && !error ? (
        <EventList
          events={previewEvents}
          compact
          emptyMessage="No events coming up. Check that the calendar is public and the API key is set."
        />
      ) : null}
    </section>
  )
}
