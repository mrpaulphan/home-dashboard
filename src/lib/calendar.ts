import type { CalendarEvent } from '#/lib/calendar-server'

export type { CalendarEvent }

/** Default upcoming window: ~3 months */
export const UPCOMING_EVENTS_DAYS = 90

export function parseEventDate(value: string) {
  if (value.length === 10) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  return new Date(value)
}

export function getLocalDayKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getGoogleMapsUrl(location: string) {
  const query = location.replace(/\s*\n+\s*/g, ', ').trim()
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function getEventDayKey(value: string) {
  const date = parseEventDate(value)
  return getLocalDayKey(date)
}

export function formatEventTime(event: CalendarEvent) {
  if (event.allDay) {
    return 'All day'
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(parseEventDate(event.start))
}

export function formatEventSchedule(event: CalendarEvent) {
  const start = parseEventDate(event.start)
  const end = parseEventDate(event.end)

  if (event.allDay) {
    const dateLabel = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(start)

    if (getEventDayKey(event.start) === getEventDayKey(event.end)) {
      return `${dateLabel} · All day`
    }

    const endLabel = new Intl.DateTimeFormat(undefined, {
      month: 'long',
      day: 'numeric',
    }).format(end)

    return `${dateLabel} – ${endLabel} · All day`
  }

  const startLabel = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(start)

  const endLabel = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(end)

  return `${startLabel} – ${endLabel}`
}

export function formatSectionDate(dayKey: string) {
  const [year, month, day] = dayKey.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const todayKey = getLocalDayKey(new Date())
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowKey = getLocalDayKey(tomorrow)

  const shortDate = new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)

  const fullDate = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)

  if (dayKey === todayKey) {
    return `Today, ${shortDate}`
  }

  if (dayKey === tomorrowKey) {
    return `Tomorrow, ${shortDate}`
  }

  return fullDate
}

export function groupEventsByDay(events: CalendarEvent[]) {
  const groups = new Map<string, CalendarEvent[]>()

  for (const event of events) {
    const dayKey = getEventDayKey(event.start)
    const existing = groups.get(dayKey) ?? []
    existing.push(event)
    groups.set(dayKey, existing)
  }

  return Array.from(groups.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([dayKey, dayEvents]) => ({
      dayKey,
      label: formatSectionDate(dayKey),
      events: dayEvents.sort(
        (left, right) =>
          parseEventDate(left.start).getTime() -
          parseEventDate(right.start).getTime(),
      ),
    }))
}

export function getMonthGrid(viewDate: Date) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay()
  const gridStart = new Date(year, month, 1 - startOffset)
  const cells: Date[] = []

  for (let index = 0; index < 42; index += 1) {
    const cell = new Date(gridStart)
    cell.setDate(gridStart.getDate() + index)
    cells.push(cell)
  }

  return cells
}

export function formatMonthLabel(viewDate: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  }).format(viewDate)
}

export function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export function eventsForDay(events: CalendarEvent[], day: Date) {
  const dayKey = getEventDayKey(
    `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`,
  )

  return events.filter((event) => getEventDayKey(event.start) === dayKey)
}

export function filterEvents(events: CalendarEvent[], query: string) {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return events
  }

  return events.filter((event) => {
    const haystack = [
      event.title,
      event.description ?? '',
      event.location ?? '',
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalized)
  })
}
