import { Clock, MapPin, X } from 'lucide-react'
import { useEffect } from 'react'
import { EventLocationLink } from '#/components/EventLocationLink'
import type { CalendarEvent } from '#/lib/calendar'
import { formatEventSchedule } from '#/lib/calendar'

type EventDetailSheetProps = {
  event: CalendarEvent | null
  onClose: () => void
}

export function EventDetailSheet({ event, onClose }: EventDetailSheetProps) {
  useEffect(() => {
    if (!event) {
      return
    }

    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [event, onClose])

  if (!event) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4"
      data-testid="events-detail-overlay-container"
      onClick={onClose}
    >
      <section
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-background p-5 shadow-lg"
        data-testid="events-detail-sheet-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="events-detail-title"
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2
            id="events-detail-title"
            className="text-xl font-semibold text-foreground"
            data-testid="events-detail-title-text"
          >
            {event.title}
          </h2>
          <button
            type="button"
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            data-testid="events-detail-close-button"
            aria-label="Close event details"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <dl className="space-y-4">
          <div>
            <dt className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              When
            </dt>
            <dd
              className="text-sm text-foreground"
              data-testid="events-detail-schedule-text"
            >
              {formatEventSchedule(event)}
            </dd>
          </div>

          {event.location ? (
            <div>
              <dt className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Location
              </dt>
              <dd className="text-sm">
                <EventLocationLink location={event.location} eventId={event.id} />
              </dd>
            </div>
          ) : null}

          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Notes
            </dt>
            <dd
              className="whitespace-pre-wrap text-sm text-foreground"
              data-testid="events-detail-description-text"
            >
              {event.description ? event.description : 'No additional details.'}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
