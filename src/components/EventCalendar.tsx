import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EventDetailSheet } from '#/components/EventDetailSheet'
import type { CalendarEvent } from '#/lib/calendar'
import {
  eventsForDay,
  formatEventTime,
  formatMonthLabel,
  formatSectionDate,
  getEventDayKey,
  getLocalDayKey,
  getMonthGrid,
  isSameDay,
} from '#/lib/calendar'

type EventCalendarProps = {
  events: CalendarEvent[]
  searchQuery?: string
}

export function EventCalendar({ events, searchQuery }: EventCalendarProps) {
  const [viewDate, setViewDate] = useState(() => new Date())
  const [selectedDayKey, setSelectedDayKey] = useState(() => getLocalDayKey(new Date()))
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const monthCells = useMemo(() => getMonthGrid(viewDate), [viewDate])
  const selectedEvents = useMemo(() => {
    const [year, month, day] = selectedDayKey.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day)
    return eventsForDay(events, selectedDate)
  }, [events, selectedDayKey])

  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <>
    <div className="space-y-4" data-testid="events-calendar-container">
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm">
        <button
          type="button"
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          data-testid="events-calendar-prevMonth-button"
          aria-label="Previous month"
          onClick={() => {
            setViewDate(
              (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
            )
          }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2
          className="text-base font-semibold text-primary"
          data-testid="events-calendar-month-header"
        >
          {formatMonthLabel(viewDate)}
        </h2>
        <button
          type="button"
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          data-testid="events-calendar-nextMonth-button"
          aria-label="Next month"
          onClick={() => {
            setViewDate(
              (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
            )
          }}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
        <div className="mb-2 grid grid-cols-7 gap-1">
          {weekdayLabels.map((label) => (
            <div
              key={label}
              className="py-1 text-center text-xs font-medium uppercase text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {monthCells.map((day) => {
            const dayKey = getEventDayKey(
              `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`,
            )
            const dayEvents = eventsForDay(events, day)
            const inCurrentMonth = day.getMonth() === viewDate.getMonth()
            const isSelected = dayKey === selectedDayKey
            const isToday = isSameDay(day, new Date())

            return (
              <button
                key={dayKey + day.getMonth()}
                type="button"
                className={`min-h-14 rounded-md border p-1 text-left transition-colors ${
                  isSelected
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-transparent hover:bg-muted'
                } ${inCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50'}`}
                data-testid={`events-calendar-day-${dayKey}-button`}
                onClick={() => setSelectedDayKey(dayKey)}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                    isToday ? 'bg-primary text-primary-foreground' : ''
                  }`}
                >
                  {day.getDate()}
                </span>
                {dayEvents.length > 0 ? (
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        role="button"
                        tabIndex={0}
                        className="truncate rounded bg-primary/15 px-1 text-[10px] font-medium text-primary"
                        data-testid={`events-calendar-day-${dayKey}-event-${event.id}-button`}
                        onClick={(clickEvent) => {
                          clickEvent.stopPropagation()
                          setSelectedEvent(event)
                        }}
                        onKeyDown={(keyboardEvent) => {
                          if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                            keyboardEvent.preventDefault()
                            keyboardEvent.stopPropagation()
                            setSelectedEvent(event)
                          }
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 ? (
                      <div className="text-[10px] font-medium text-muted-foreground">
                        +{dayEvents.length - 2} more
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      <section
        className="rounded-lg border border-border bg-card p-4 shadow-sm"
        data-testid="events-calendar-selectedDay-container"
      >
        <h3
          className="flex items-center gap-2 text-base font-semibold text-foreground"
          data-testid="events-calendar-selectedDay-header"
        >
          <span
            className="h-4 w-1 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span className="text-primary">{formatSectionDate(selectedDayKey)}</span>
        </h3>
        {selectedEvents.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground" data-testid="events-calendar-selectedDay-empty-text">
            {searchQuery
              ? `No matching events on this day for "${searchQuery}".`
              : 'No events on this day.'}
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {selectedEvents.map((event) => (
              <li key={event.id}>
                <button
                  type="button"
                  className="w-full rounded-md bg-muted px-3 py-2 text-left text-sm transition-colors hover:bg-accent/60"
                  data-testid={`events-calendar-selectedDay-${event.id}-button`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <p className="font-medium text-foreground">{event.title}</p>
                  <p className="mt-0.5 flex items-start gap-1 text-sm text-muted-foreground">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{formatEventTime(event)}</span>
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>

    <EventDetailSheet
      event={selectedEvent}
      onClose={() => setSelectedEvent(null)}
    />
    </>
  )
}
