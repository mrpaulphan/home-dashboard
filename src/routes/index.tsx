import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="mx-auto max-w-lg p-4" data-testid="home-page-container">
      <header className="mb-6">
        <h1
          className="text-3xl font-bold tracking-tight"
          data-testid="home-page-header"
        >
          Family Hub
        </h1>
        <p className="mt-2 text-slate-600" data-testid="home-page-subtitle-text">
          Shared package tracking for both of you. Install the app and enable
          notifications to get alerts when a package arrives.
        </p>
      </header>

      <section
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        data-testid="home-packages-card"
      >
        <h2 className="text-lg font-semibold" data-testid="home-packages-header">
          Packages
        </h2>
        <p className="mt-2 text-sm text-slate-600" data-testid="home-packages-empty-text">
          No packages yet. When your iOS Shortcut posts to the webhook, they
          will show up here and trigger push notifications.
        </p>
      </section>
    </main>
  )
}
