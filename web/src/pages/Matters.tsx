import { cn } from '@/lib/utils'
import { matterStatusLabel, mockMatters } from '@/mocks/workspace'

export function Matters() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-4xl text-ink">Matter Workspace</h1>
          <p className="mt-2 max-w-xl font-sans text-mist">
            Litigation, advisory, and jurisdictional matters — demo registry below; filters wire to your API later.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-xl border border-border bg-elevated px-4 py-2 font-sans text-xs text-mist">
            Practice area ▾
          </div>
          <div className="rounded-xl border border-border bg-elevated px-4 py-2 font-sans text-xs text-mist">
            Status ▾
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {mockMatters.map((m) => (
          <article
            key={m.id}
            className="rounded-2xl border border-border bg-gradient-to-br from-elevated to-surface p-8 shadow-card transition hover:border-primary/25"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gold/20 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-wider text-gold">
                {m.court}
              </span>
              <span className="rounded-full bg-primary/20 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-wider text-primary-bright">
                {m.jurisdiction}
              </span>
              <span
                className={cn(
                  'rounded-full px-3 py-1 font-label text-[10px] font-bold uppercase tracking-wider',
                  m.status === 'active' && 'bg-emerald-500/15 text-emerald-300',
                  m.status === 'advisory' && 'bg-mist/10 text-mist',
                  m.status === 'closed' && 'bg-line text-mist/70',
                )}
              >
                {matterStatusLabel(m.status)}
              </span>
            </div>
            <p className="mt-4 font-label text-[11px] uppercase tracking-widest text-mist/60">{m.ref}</p>
            <h2 className="mt-2 font-display text-xl text-ink md:text-2xl">{m.title}</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-mist">{m.summary}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 font-label text-[10px] uppercase tracking-wider text-mist/60">
              <span>Updated {m.updatedAt}</span>
              <span>{m.docCount} documents</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
