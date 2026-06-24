import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Package } from 'lucide-react'
import { UpcomingEventsPreview } from '#/components/EventList'
import { PageShell } from '#/components/PageShell'
import { useCalendarEvents } from '#/hooks/useCalendarEvents'
import { usePackages } from '#/hooks/usePackages'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { events, loading, error } = useCalendarEvents()
  const { packages, loading: packagesLoading } = usePackages()

  return (
    <PageShell
      title="Family Hub"
      subtitle="Your shared home for packages and calendar."
      testId="home-page-container"
    >
      <div className="space-y-4">
        <section
          className="rounded-lg border border-border bg-card p-5 shadow-sm"
          data-testid="home-summary-card"
        >
          <p className="text-sm text-muted-foreground">This week</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-muted p-3">
              <p className="text-2xl font-bold text-foreground">{packages.length}</p>
              <p className="text-sm text-muted-foreground">Packages waiting</p>
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="text-2xl font-bold text-foreground">{events.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming events</p>
            </div>
          </div>
        </section>

        <UpcomingEventsPreview events={events} loading={loading} error={error} />

        <section
          className="rounded-lg border border-border bg-card p-4 shadow-sm"
          data-testid="home-packagesPreview-card"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-foreground" aria-hidden="true" />
              <h2
                className="text-lg font-semibold text-card-foreground"
                data-testid="home-packagesPreview-header"
              >
                Packages
              </h2>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              data-testid="home-packagesPreview-viewAll-link"
            >
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {packagesLoading ? (
            <p className="text-sm text-muted-foreground">Loading packages…</p>
          ) : packages.length === 0 ? (
            <p className="text-sm text-muted-foreground" data-testid="home-packagesPreview-empty-text">
              Nothing waiting in the package room right now.
            </p>
          ) : (
            <div className="space-y-2">
              {packages.slice(0, 2).map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-md bg-muted px-3 py-2"
                  data-testid={`home-packagesPreview-${pkg.id}-row`}
                >
                  <p className="font-medium text-foreground">
                    {pkg.code ? `Code ${pkg.code}` : pkg.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For {pkg.recipient === 'paul' ? 'Paul' : 'Sarah'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  )
}
