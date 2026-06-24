import { Link } from '@tanstack/react-router'
import { ArrowRight, Clock } from 'lucide-react'
import { useState } from 'react'
import { EventDetailSheet } from '#/components/EventDetailSheet'
import { EventLocationLink } from '#/components/EventLocationLink'
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
  onSelect,
}: {
  event: CalendarEvent
  compact?: boolean
  onSelect: (event: CalendarEvent) => void
}) {
  return (
    <article
      className="rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-accent/40"
      data-testid={`events-event-${event.id}-card`}
    >
      <button
        type="button"
        className="w-full text-left"
        data-testid={`events-event-${event.id}-button`}
        onClick={() => onSelect(event)}
      >
        <p
          className="font-medium text-card-foreground"
          data-testid={`events-event-${event.id}-title-text`}
        >
          {event.title}
        </p>
        <p
          className="mt-1 flex items-start gap-1 text-sm text-muted-foreground"
          data-testid={`events-event-${event.id}-time-text`}
        >
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span>{formatEventTime(event)}</span>
        </p>
      </button>
      {event.location ? (
        <div className="mt-2">
          <EventLocationLink location={event.location} eventId={event.id} />
        </div>
      ) : null}
      {!compact && event.description ? (
        <p
          className="mt-2 line-clamp-2 text-sm text-muted-foreground"
          data-testid={`events-event-${event.id}-description-text`}
        >
          {event.description}
        </p>
      ) : null}
    </article>
  )
}

export function EventList({
  events,
  emptyMessage = 'No upcoming events in the next 3 months.',
  compact = false,
}: EventListProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  if (events.length === 0) {
    return (
      <p
        className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground"
        data-testid="events-empty-text"
      >
        {emptyMessage}
      </p>
    )
  }

  const grouped = groupEventsByDay(events)

  return (
    <>
      <div className="space-y-5" data-testid="events-list-container">
        {grouped.map((group) => (
          <section key={group.dayKey} data-testid={`events-day-${group.dayKey}-section`}>
            <h2
              className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground"
              data-testid={`events-day-${group.dayKey}-header`}
            >
              <span
                className="h-4 w-1 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span className="text-primary">{group.label}</span>
            </h2>
            <div className="space-y-3">
              {group.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  compact={compact}
                  onSelect={setSelectedEvent}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <EventDetailSheet
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
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
      className="rounded-lg border border-border bg-card p-4 shadow-sm"
      data-testid="home-upcomingEvents-card"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className="text-lg font-semibold text-card-foreground"
          data-testid="home-upcomingEvents-header"
        >
          Upcoming events
        </h2>
        <Link
          to="/events"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          data-testid="home-upcomingEvents-viewAll-link"
        >
          View all
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground" data-testid="home-upcomingEvents-loading-text">
          Loading events…
        </p>
      ) : null}

      {!loading && error ? (
        <p
          className="text-sm text-destructive"
          data-testid="home-upcomingEvents-error-text"
        >
          {error}
        </p>
      ) : null}

      {!loading && !error ? (
        <EventList
          events={previewEvents}
          compact
          emptyMessage="No events coming up in the next 3 months."
        />
      ) : null}
    </section>
  )
}
