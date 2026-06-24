import { Search, X } from 'lucide-react'

type EventSearchProps = {
  value: string
  onChange: (value: string) => void
  resultCount?: number
}

export function EventSearch({ value, onChange, resultCount }: EventSearchProps) {
  return (
    <div className="space-y-2" data-testid="events-search-container">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          placeholder="Search events..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 pr-9 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20"
          data-testid="events-search-input"
          onChange={(event) => onChange(event.target.value)}
        />
        {value ? (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground"
            data-testid="events-search-clear-button"
            aria-label="Clear search"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      {value ? (
        <p className="text-xs text-muted-foreground" data-testid="events-search-resultCount-text">
          {resultCount ?? 0} {resultCount === 1 ? 'event' : 'events'} found
        </p>
      ) : null}
    </div>
  )
}
