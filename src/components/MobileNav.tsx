import { Link, useRouterState } from '@tanstack/react-router'
import { CalendarDays, Home, Package } from 'lucide-react'

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: Home,
    testId: 'nav-home-link',
  },
  {
    to: '/packages',
    label: 'Packages',
    icon: Package,
    testId: 'nav-packages-link',
  },
  {
    to: '/events',
    label: 'Events',
    icon: CalendarDays,
    testId: 'nav-events-link',
  },
] as const

export function MobileNav() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur"
      data-testid="mobile-nav-container"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 px-2 pt-2">
        {navItems.map((item) => {
          const isActive =
            item.to === '/'
              ? pathname === '/'
              : pathname.startsWith(item.to)
          const Icon = item.icon

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              data-testid={item.testId}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
