import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Scale,
  Search,
  Table2,
  FileEdit,
  Briefcase,
  Settings,
  HelpCircle,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/matters', label: 'Matters', icon: Briefcase },
  { to: '/research', label: 'Research', icon: Search },
  { to: '/review', label: 'Review', icon: Table2 },
  { to: '/draft', label: 'Draft', icon: FileEdit },
] as const

const bottom = [
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/support', label: 'Support', icon: HelpCircle },
] as const

export function Shell() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface/95 backdrop-blur-xl">
        <div className="border-b border-line px-6 py-8">
          <Link to="/" className="block">
            <span className="font-display text-2xl italic text-primary-bright">Savvy Legalis</span>
            <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.28em] text-mist/80">
              The Digital Jurist
            </p>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 font-sans text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-elevated text-gold shadow-card'
                    : 'text-mist hover:bg-elevated/60 hover:text-ink',
                )
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0 opacity-90" strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-line p-3">
          {bottom.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-2.5 font-sans text-sm transition-colors',
                  isActive ? 'bg-elevated text-gold' : 'text-mist hover:bg-elevated/50 hover:text-ink',
                )
              }
            >
              <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </div>
        <div className="border-t border-line px-5 py-4">
          <p className="font-label text-[10px] uppercase tracking-wider text-mist/50">Nigeria · Common · Customary · Sharia</p>
        </div>
      </aside>

      <div className="ml-64 flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-canvas/90 px-8 backdrop-blur-md">
          <div className="flex items-center gap-2 text-mist/70">
            <Scale className="h-4 w-4" />
            <span className="font-label text-[11px] uppercase tracking-widest">Workspace</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[200px] truncate font-sans text-sm text-mist sm:inline" title="Demo workspace">
              Demo workspace
            </span>
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-primary-dim font-label text-xs font-bold text-ink"
              title="Workspace"
            >
              SL
            </div>
          </div>
        </header>
        <main className="flex-1 scroll-slim overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
