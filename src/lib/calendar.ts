import type { CalendarEvent } from '#/lib/calendar-server'

export type { CalendarEvent }

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

export function formatSectionDate(dayKey: string) {
  const [year, month, day] = dayKey.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const todayKey = getLocalDayKey(new Date())
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowKey = getLocalDayKey(tomorrow)

  if (dayKey === todayKey) {
    return 'Today'
  }

  if (dayKey === tomorrowKey) {
    return 'Tomorrow'
  }

  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(date)
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
