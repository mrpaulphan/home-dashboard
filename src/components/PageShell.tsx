import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
  title: string
  subtitle?: string
  testId: string
}

export function PageShell({
  children,
  title,
  subtitle,
  testId,
}: PageShellProps) {
  return (
    <main
      className="mx-auto max-w-lg px-4 pb-28 pt-4"
      data-testid={testId}
    >
      <header className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </main>
  )
}
