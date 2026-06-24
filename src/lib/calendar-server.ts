export type CalendarEvent = {
  id: string
  title: string
  description: string | null
  start: string
  end: string
  allDay: boolean
  location: string | null
}

type GoogleCalendarResponse = {
  items?: Array<{
    id: string
    summary?: string
    description?: string
    location?: string
    start?: { dateTime?: string; date?: string }
    end?: { dateTime?: string; date?: string }
  }>
  error?: {
    message?: string
  }
}

function getIcalUrl() {
  return (
    process.env.GOOGLE_CALENDAR_ICAL_URL ||
    process.env.VITE_GOOGLE_CALENDAR_ICAL_URL ||
    null
  )
}

function getCalendarConfig() {
  const calendarId = process.env.VITE_GOOGLE_CALENDAR_ID
  const apiKey =
    process.env.VITE_GOOGLE_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_FIREBASE_API_KEY

  if (!calendarId) {
    throw new Error('VITE_GOOGLE_CALENDAR_ID is not configured.')
  }

  if (!apiKey) {
    throw new Error(
      'Google Calendar API key is not configured. Set VITE_GOOGLE_API_KEY or GOOGLE_CALENDAR_ICAL_URL.',
    )
  }

  return { calendarId, apiKey }
}

function mapGoogleEvent(
  item: NonNullable<GoogleCalendarResponse['items']>[number],
): CalendarEvent | null {
  const startValue = item.start?.dateTime ?? item.start?.date
  const endValue = item.end?.dateTime ?? item.end?.date

  if (!startValue || !item.id) {
    return null
  }

  return {
    id: item.id,
    title: item.summary?.trim() || 'Untitled event',
    description: item.description?.trim() || null,
    start: startValue,
    end: endValue ?? startValue,
    allDay: Boolean(item.start?.date && !item.start.dateTime),
    location: item.location?.trim() || null,
  }
}

async function fetchFromGoogleApi(days: number) {
  const { calendarId, apiKey } = getCalendarConfig()
  const timeMin = new Date()
  const timeMax = new Date()
  timeMax.setDate(timeMax.getDate() + days)

  const params = new URLSearchParams({
    key: apiKey,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '100',
  })

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`

  const response = await fetch(url)
  const data = (await response.json()) as GoogleCalendarResponse

  if (!response.ok) {
    throw new Error(data.error?.message ?? 'Failed to load calendar events.')
  }

  return (data.items ?? [])
    .map(mapGoogleEvent)
    .filter((event): event is CalendarEvent => event !== null)
}

export async function fetchUpcomingCalendarEvents(days = 30) {
  const icalUrl = getIcalUrl()

  if (icalUrl) {
    const { fetchIcalEvents } = await import('#/lib/calendar-ical')
    return fetchIcalEvents(icalUrl, days)
  }

  return fetchFromGoogleApi(days)
}
