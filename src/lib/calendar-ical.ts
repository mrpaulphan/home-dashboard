import type { CalendarEvent } from '#/lib/calendar-server'

function unfoldIcs(text: string) {
  return text.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '')
}

function parseIcsDate(value: string, params = '') {
  const isUtc = params.includes('TZID=UTC') || value.endsWith('Z')
  const isDateOnly = value.length === 8

  if (isDateOnly) {
    const year = value.slice(0, 4)
    const month = value.slice(4, 6)
    const day = value.slice(6, 8)
    return {
      iso: `${year}-${month}-${day}`,
      allDay: true,
      date: new Date(Number(year), Number(month) - 1, Number(day)),
    }
  }

  const year = value.slice(0, 4)
  const month = value.slice(4, 6)
  const day = value.slice(6, 8)
  const hour = value.slice(9, 11)
  const minute = value.slice(11, 13)
  const second = value.slice(13, 15) || '00'

  const date = isUtc
    ? new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`)
    : new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)

  return {
    iso: date.toISOString(),
    allDay: false,
    date,
  }
}

function parseEventBlock(block: string): CalendarEvent | null {
  const lines = block.split('\n')
  const fields = new Map<string, string>()

  for (const line of lines) {
    const separator = line.indexOf(':')
    if (separator === -1) {
      continue
    }

    const rawKey = line.slice(0, separator)
    const value = line.slice(separator + 1).trim()
    const key = rawKey.split(';')[0]
    fields.set(key, value)
    fields.set(`${rawKey}`, value)
  }

  const uid = fields.get('UID')
  const summary = fields.get('SUMMARY')
  const dtStartLine = [...fields.entries()].find(([key]) => key.startsWith('DTSTART'))?.[0]
  const dtEndLine = [...fields.entries()].find(([key]) => key.startsWith('DTEND'))?.[0]

  if (!uid || !summary || !dtStartLine) {
    return null
  }

  const startParams = dtStartLine.includes(';')
    ? dtStartLine.slice(dtStartLine.indexOf(';'))
    : ''
  const endParams = dtEndLine?.includes(';')
    ? dtEndLine.slice(dtEndLine.indexOf(';'))
    : ''

  const start = parseIcsDate(fields.get(dtStartLine)!, startParams)
  const end = dtEndLine
    ? parseIcsDate(fields.get(dtEndLine)!, endParams)
    : start

  return {
    id: uid,
    title: summary,
    description: fields.get('DESCRIPTION') ?? null,
    start: start.allDay ? start.iso : start.iso,
    end: end.allDay ? end.iso : end.iso,
    allDay: start.allDay,
    location: fields.get('LOCATION') ?? null,
  }
}

export function parseIcsEvents(text: string, days = 30) {
  const unfolded = unfoldIcs(text)
  const blocks = unfolded.split('BEGIN:VEVENT').slice(1)
  const windowStart = new Date()
  windowStart.setHours(0, 0, 0, 0)
  const max = new Date()
  max.setDate(max.getDate() + days)

  return blocks
    .map((block) => parseEventBlock(block.split('END:VEVENT')[0] ?? block))
    .filter((event): event is CalendarEvent => event !== null)
    .filter((event) => {
      const start = event.allDay
        ? new Date(`${event.start}T00:00:00`)
        : new Date(event.start)
      return start >= windowStart && start <= max
    })
    .sort(
      (left, right) =>
        new Date(left.start).getTime() - new Date(right.start).getTime(),
    )
}

export async function fetchIcalEvents(url: string, days = 30) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to load calendar feed.')
  }

  const text = await response.text()
  return parseIcsEvents(text, days)
}
