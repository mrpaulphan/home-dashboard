import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CalendarEvent } from '#/lib/calendar'
import {
  eventsForDay,
  formatEventTime,
  formatMonthLabel,
  getEventDayKey,
  getLocalDayKey,
  getMonthGrid,
  isSameDay,
} from '#/lib/calendar'

type EventCalendarProps = {
  events: CalendarEvent[]
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [viewDate, setViewDate] = useState(() => new Date())
  const [selectedDayKey, setSelectedDayKey] = useState(() => getLocalDayKey(new Date()))

  const monthCells = useMemo(() => getMonthGrid(viewDate), [viewDate])
  const selectedEvents = useMemo(() => {
    const [year, month, day] = selectedDayKey.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day)
    return eventsForDay(events, selectedDate)
  }, [events, selectedDayKey])

  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-4" data-testid="events-calendar-container">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
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
          className="text-base font-semibold text-slate-900"
          data-testid="events-calendar-month-header"
        >
          {formatMonthLabel(viewDate)}
        </h2>
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
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

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="mb-2 grid grid-cols-7 gap-1">
          {weekdayLabels.map((label) => (
            <div
              key={label}
              className="py-1 text-center text-xs font-medium uppercase text-slate-400"
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
                className={`min-h-14 rounded-xl border p-1 text-left transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-transparent hover:bg-slate-50'
                } ${inCurrentMonth ? 'text-slate-900' : 'text-slate-300'}`}
                data-testid={`events-calendar-day-${dayKey}-button`}
                onClick={() => setSelectedDayKey(dayKey)}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                    isToday ? 'bg-blue-600 text-white' : ''
                  }`}
                >
                  {day.getDate()}
                </span>
                {dayEvents.length > 0 ? (
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="truncate rounded bg-blue-100 px-1 text-[10px] font-medium text-blue-800"
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 ? (
                      <div className="text-[10px] font-medium text-slate-500">
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
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        data-testid="events-calendar-selectedDay-container"
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wide text-slate-500"
          data-testid="events-calendar-selectedDay-header"
        >
          Selected day
        </h3>
        {selectedEvents.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600" data-testid="events-calendar-selectedDay-empty-text">
            No events on this day.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {selectedEvents.map((event) => (
              <li
                key={event.id}
                className="rounded-lg bg-slate-50 px-3 py-2 text-sm"
                data-testid={`events-calendar-selectedDay-${event.id}-listItem`}
              >
                <p className="font-medium text-slate-900">{event.title}</p>
                <p className="text-slate-500">{formatEventTime(event)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
