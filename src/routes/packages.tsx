import { createFileRoute } from '@tanstack/react-router'
import { PackageList } from '#/components/PackageList'
import { PageShell } from '#/components/PageShell'
import { usePackages } from '#/hooks/usePackages'

export const Route = createFileRoute('/packages')({
  component: PackagesPage,
})

function PackagesPage() {
  const { packages, loading, error } = usePackages()

  return (
    <PageShell
      title="Packages"
      subtitle="Waiting pickups from the Luxor package room."
      testId="packages-page-container"
    >
      <PackageList
        packages={packages}
        loading={loading}
        error={error}
        emptyMessage="Nothing waiting right now. New Luxor alerts will show up here automatically."
      />
    </PageShell>
  )
}
