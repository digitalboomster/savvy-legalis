import { mockResearch } from '@/mocks/workspace'

export function Research() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-4xl text-ink">Research</h1>
      <p className="mt-2 max-w-2xl font-sans text-mist">
        Citation-first answers: hybrid vector + keyword retrieval, mandatory bracket references, verification badge.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-border bg-elevated p-6 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-gold">Query</p>
          <div className="mt-4 min-h-[120px] rounded-xl border border-line bg-canvas/50 p-4 font-sans text-sm leading-relaxed text-mist">
            {mockResearch.query}
          </div>
          <p className="mt-6 font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Answer</p>
          <div className="mt-3 rounded-xl border border-border bg-surface/80 p-4 font-sans text-sm leading-relaxed text-ink/95">
            {mockResearch.answer.split(/(\[\d+\])/g).map((part, i) =>
              /^\[\d+\]$/.test(part) ? (
                <span key={i} className="rounded bg-gold/20 px-1 font-semibold text-gold">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </div>
        </div>
        <aside className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Sources</p>
          <ul className="mt-4 space-y-4">
            {mockResearch.sources.map((s, idx) => (
              <li key={s.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
                <span className="font-label text-[10px] font-bold text-gold">[{idx + 1}]</span>
                <p className="mt-1 font-sans text-xs font-semibold leading-snug text-ink">{s.citation}</p>
                <p className="mt-2 font-sans text-xs leading-relaxed text-mist/90">{s.excerpt}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
