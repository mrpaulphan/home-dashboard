import { Check } from 'lucide-react'
import {
  formatRecipient,
  formatRelativeArrival,
  markPackagePickedUp,
  type PackageRecord,
} from '#/hooks/usePackages'

type PackageListProps = {
  packages: PackageRecord[]
  loading: boolean
  error: string | null
  emptyMessage?: string
}

export function PackageList({
  packages,
  loading,
  error,
  emptyMessage = 'Nothing waiting right now.',
}: PackageListProps) {
  if (loading) {
    return (
      <p className="text-sm text-slate-500" data-testid="packages-loading-text">
        Loading packages…
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-sm text-red-700" data-testid="packages-error-text">
        {error}
      </p>
    )
  }

  if (packages.length === 0) {
    return (
      <p
        className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600"
        data-testid="packages-empty-text"
      >
        {emptyMessage}
      </p>
    )
  }

  return (
    <div className="space-y-3" data-testid="packages-list-container">
      {packages.map((pkg) => (
        <article
          key={pkg.id}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          data-testid={`packages-row-${pkg.id}-card`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wide text-blue-700"
                data-testid={`packages-row-${pkg.id}-recipient-text`}
              >
                {formatRecipient(pkg.recipient)}
              </p>
              <h3
                className="mt-1 text-lg font-semibold text-slate-900"
                data-testid={`packages-row-${pkg.id}-title-text`}
              >
                {pkg.code ? `Code ${pkg.code}` : pkg.description}
              </h3>
              <p
                className="mt-1 text-sm text-slate-600"
                data-testid={`packages-row-${pkg.id}-meta-text`}
              >
                {pkg.carrier} · {formatRelativeArrival(pkg.last_seen_at ?? pkg.arrived_at)}
              </p>
              {pkg.code && pkg.description ? (
                <p className="mt-1 text-sm text-slate-500">{pkg.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
              data-testid={`packages-row-${pkg.id}-pickedUp-button`}
              onClick={() => {
                void markPackagePickedUp(pkg.id)
              }}
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Got it
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
