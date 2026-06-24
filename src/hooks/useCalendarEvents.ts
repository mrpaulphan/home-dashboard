import { useEffect, useState } from 'react'
import type { CalendarEvent } from '#/lib/calendar'

type CalendarResponse = {
  events?: CalendarEvent[]
  error?: string
}

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadEvents() {
      try {
        const response = await fetch('/api/calendar/events')
        const data = (await response.json()) as CalendarResponse

        if (!active) {
          return
        }

        if (!response.ok) {
          setError(data.error ?? 'Failed to load events.')
          setEvents([])
          return
        }

        setEvents(data.events ?? [])
        setError(null)
      } catch (nextError) {
        if (!active) {
          return
        }

        const message =
          nextError instanceof Error
            ? nextError.message
            : 'Failed to load events.'
        setError(message)
        setEvents([])
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadEvents()

    const handleFocus = () => {
      void loadEvents()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      active = false
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  return { events, loading, error }
}
