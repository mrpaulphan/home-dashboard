import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { EventCalendar } from '#/components/EventCalendar'
import { EventList } from '#/components/EventList'
import { PageShell } from '#/components/PageShell'
import { useCalendarEvents } from '#/hooks/useCalendarEvents'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

type EventsView = 'list' | 'calendar'

function EventsPage() {
  const { events, loading, error } = useCalendarEvents()
  const [view, setView] = useState<EventsView>('list')

  return (
    <PageShell
      title="Events"
      subtitle="Shared calendar for the next 30 days."
      testId="events-page-container"
    >
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
        <button
          type="button"
          className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            view === 'list'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600'
          }`}
          data-testid="events-viewList-button"
          onClick={() => setView('list')}
        >
          Upcoming
        </button>
        <button
          type="button"
          className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            view === 'calendar'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600'
          }`}
          data-testid="events-viewCalendar-button"
          onClick={() => setView('calendar')}
        >
          Calendar
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500" data-testid="events-loading-text">
          Loading events…
        </p>
      ) : null}

      {!loading && error ? (
        <p className="mb-4 text-sm text-amber-700" data-testid="events-error-text">
          {error}
        </p>
      ) : null}

      {!loading && view === 'list' ? (
        <EventList events={events} />
      ) : null}

      {!loading && view === 'calendar' ? <EventCalendar events={events} /> : null}
    </PageShell>
  )
}
