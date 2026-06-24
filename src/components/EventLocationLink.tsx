import { MapPin } from 'lucide-react'
import { getGoogleMapsUrl } from '#/lib/calendar'

type EventLocationLinkProps = {
  location: string
  eventId: string
  className?: string
}

export function EventLocationLink({
  location,
  eventId,
  className = '',
}: EventLocationLinkProps) {
  return (
    <a
      href={getGoogleMapsUrl(location)}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-start gap-1 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline ${className}`}
      data-testid={`events-event-${eventId}-location-link`}
    >
      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
      <span className="whitespace-pre-line">{location}</span>
    </a>
  )
}
