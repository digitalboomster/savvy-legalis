import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type Props = {
  to: string
  title: string
  description: string
  icon: LucideIcon
  className?: string
}

export function ModuleCard({ to, title, description, icon: Icon, className }: Props) {
  return (
    <Link
      to={to}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-elevated to-surface p-6 shadow-card transition-all duration-300',
        'hover:border-primary/30 hover:shadow-lift',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-card-shine opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-bright ring-1 ring-primary/20">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl text-ink">{title}</h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-gold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </div>
          <p className="mt-2 font-sans text-sm leading-relaxed text-mist">{description}</p>
        </div>
      </div>
    </Link>
  )
}
