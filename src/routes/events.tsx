import { EventCalendar } from '#/components/EventCalendar'
import { EventList } from '#/components/EventList'
import { EventSearch } from '#/components/EventSearch'
import { PageShell } from '#/components/PageShell'
import { useCalendarEvents } from '#/hooks/useCalendarEvents'
import { filterEvents } from '#/lib/calendar'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

type EventsView = 'list' | 'calendar'

function EventsPage() {
  const { events, loading, error } = useCalendarEvents()
  const [view, setView] = useState<EventsView>('list')
  const [query, setQuery] = useState('')

  const filteredEvents = useMemo(
    () => filterEvents(events, query),
    [events, query],
  )

  return (
    <PageShell
      title="Events"
      testId="events-page-container"
    >
      <div className="mb-4">
        <EventSearch
          value={query}
          resultCount={filteredEvents.length}
          onChange={setQuery}
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
        <button
          type="button"
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            view === 'list'
              ? 'bg-background text-primary shadow-sm ring-1 ring-primary/25'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          data-testid="events-viewList-button"
          onClick={() => setView('list')}
        >
          Upcoming
        </button>
        <button
          type="button"
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            view === 'calendar'
              ? 'bg-background text-primary shadow-sm ring-1 ring-primary/25'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          data-testid="events-viewCalendar-button"
          onClick={() => setView('calendar')}
        >
          Calendar
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground" data-testid="events-loading-text">
          Loading events…
        </p>
      ) : null}

      {!loading && error ? (
        <p className="mb-4 text-sm text-destructive" data-testid="events-error-text">
          {error}
        </p>
      ) : null}

      {!loading && view === 'list' ? (
        <EventList
          events={filteredEvents}
          emptyMessage={
            query
              ? `No events match "${query}".`
              : 'No upcoming events in the next 3 months.'
          }
        />
      ) : null}

      {!loading && view === 'calendar' ? (
        <EventCalendar events={filteredEvents} searchQuery={query} />
      ) : null}
    </PageShell>
  )
}
