import { Check, Circle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { mockDraftBody, mockDraftSessions, mockPlaybooks } from '@/mocks/workspace'

export function Draft() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-4xl text-ink">Draft</h1>
      <p className="mt-2 max-w-2xl font-sans text-mist">
        Counsel chat + working document body; playbook rail for CAMA / litigation checks. Demo content below.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr_260px]">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Sessions</p>
          <ul className="mt-3 space-y-2">
            {mockDraftSessions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="w-full rounded-xl border border-transparent bg-elevated/50 px-3 py-2.5 text-left transition hover:border-border hover:bg-elevated"
                >
                  <p className="font-sans text-xs font-semibold text-ink">{s.title}</p>
                  <p className="mt-0.5 font-label text-[10px] uppercase tracking-wider text-mist/60">
                    {s.matterRef} · {s.updatedAt}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-h-[320px] rounded-2xl border border-border bg-elevated p-6">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/50">Working document</p>
          <pre className="mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-mist/95">
            {mockDraftBody}
          </pre>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-gold">Playbooks</p>
          <ul className="mt-4 space-y-3">
            {mockPlaybooks.map((p) => (
              <li key={p.id} className="flex items-start gap-2">
                {p.ok ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2} />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-mist/40" strokeWidth={2} />
                )}
                <span className={cn('font-sans text-xs', p.ok ? 'text-mist' : 'text-mist/60')}>{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
