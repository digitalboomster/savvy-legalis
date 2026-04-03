import { useCallback, useMemo, useState } from 'react'
import { BookOpen, Loader2, Search, Sparkles } from 'lucide-react'

import { DocumentViewerModal } from '@/components/DocumentViewerModal'
import { cn } from '@/lib/utils'
import {
  mockResearchCorpus,
  type ResearchCorpusItem,
  runMockResearch,
} from '@/mocks/interactiveMattersResearch'

const QUICK_QUERIES = [
  'When can the court grant an interlocutory injunction?',
  'What does fair hearing under section 36 require?',
  'CAMA minority squeeze-out notices and fair value',
  'How do indemnity clauses cascade in construction contracts?',
]

export function Research() {
  const [corpusQ, setCorpusQ] = useState('')
  const [selected, setSelected] = useState<Set<string>>(() => new Set(['rc1', 'rc2', 'rc3']))
  const [query, setQuery] = useState(QUICK_QUERIES[0]!)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof runMockResearch>>(null)
  const [highlight, setHighlight] = useState<number | null>(null)
  const [viewer, setViewer] = useState<ResearchCorpusItem | null>(null)

  const corpusFiltered = useMemo(() => {
    const s = corpusQ.trim().toLowerCase()
    if (!s) return mockResearchCorpus
    return mockResearchCorpus.filter(
      (c) =>
        c.title.toLowerCase().includes(s) ||
        c.citation.toLowerCase().includes(s) ||
        c.excerpt.toLowerCase().includes(s),
    )
  }, [corpusQ])

  const toggleCorpus = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const run = useCallback(() => {
    const ids = [...selected]
    setLoading(true)
    setHighlight(null)
    window.setTimeout(() => {
      setResult(runMockResearch(ids, query))
      setLoading(false)
    }, 520)
  }, [query, selected])

  const answerParts = useMemo(() => {
    if (!result?.answer) return null
    return result.answer.split(/(\[\d+\])/g)
  }, [result?.answer])

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-4xl text-ink">Research</h1>
      <p className="mt-2 max-w-2xl font-sans text-mist">
        Select corpus sources, enter a question, then run retrieval. Citations are clickable; sources open full text.
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <div className="flex max-h-[min(75vh,640px)] flex-col rounded-2xl border border-border bg-elevated p-4 shadow-card">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <BookOpen className="h-4 w-4 text-gold" strokeWidth={1.75} />
            <span className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/80">Corpus</span>
          </div>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-mist/45" />
            <input
              type="search"
              value={corpusQ}
              onChange={(e) => setCorpusQ(e.target.value)}
              placeholder="Filter sources…"
              className="w-full rounded-lg border border-border bg-canvas/50 py-2 pl-9 pr-3 font-sans text-xs text-ink outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <ul className="mt-3 flex-1 space-y-2 overflow-y-auto scroll-slim pr-1">
            {corpusFiltered.map((c) => {
              const on = selected.has(c.id)
              return (
                <li
                  key={c.id}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 transition',
                    on ? 'border-primary/45 bg-primary/10' : 'border-line bg-surface/40',
                  )}
                >
                  <label className="flex cursor-pointer gap-2.5">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleCorpus(c.id)}
                      className="mt-1 h-3.5 w-3.5 shrink-0 rounded border-border text-primary focus:ring-primary/40"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 font-sans text-xs font-medium text-ink">{c.title}</span>
                      <span className="mt-1 block font-mono text-[10px] text-mist/65">{c.citation}</span>
                    </span>
                  </label>
                  <button
                    type="button"
                    className="mt-2 font-sans text-[11px] font-semibold text-gold underline-offset-2 hover:underline"
                    onClick={() => setViewer(c)}
                  >
                    View full text
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-2 font-label text-[9px] uppercase tracking-wider text-mist/50">{selected.size} selected</p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-elevated p-6 shadow-card">
            <p className="font-label text-[10px] font-bold uppercase tracking-widest text-gold">Question</p>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="mt-3 w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 font-sans text-sm leading-relaxed text-ink outline-none ring-primary/20 focus:ring-2"
              placeholder="Ask a question about Nigerian law or your selected corpus…"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_QUERIES.map((qq) => (
                <button
                  key={qq}
                  type="button"
                  onClick={() => setQuery(qq)}
                  className="rounded-full border border-border bg-surface/60 px-3 py-1.5 font-sans text-[11px] text-mist transition hover:border-primary/35 hover:text-ink"
                >
                  {qq.slice(0, 42)}
                  {qq.length > 42 ? '…' : ''}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={loading || selected.size === 0 || !query.trim()}
              onClick={run}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-sans text-sm font-bold tracking-wide text-white shadow-lift transition hover:bg-primary-bright disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Run research
            </button>
            {selected.size === 0 ? (
              <p className="mt-2 font-sans text-xs text-gold">Select at least one corpus item.</p>
            ) : null}
          </div>

          {result ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <div className="rounded-2xl border border-border bg-surface/60 p-6 shadow-card">
                <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Answer</p>
                <div className="mt-3 rounded-xl border border-border bg-elevated/80 p-4 font-sans text-sm leading-relaxed text-ink/95">
                  {answerParts?.map((part, i) =>
                    /^\[\d+\]$/.test(part) ? (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setHighlight(Number(part.replace(/\[|\]/g, '')))}
                        className={cn(
                          'mx-0.5 rounded px-1 font-semibold transition',
                          highlight === Number(part.replace(/\[|\]/g, ''))
                            ? 'bg-gold text-canvas ring-2 ring-gold'
                            : 'bg-gold/20 text-gold hover:bg-gold/30',
                        )}
                      >
                        {part}
                      </button>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
                </div>
              </div>
              <aside className="rounded-2xl border border-border bg-elevated p-5">
                <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Sources</p>
                <ul className="mt-4 space-y-3">
                  {result.sources.map((s, idx) => {
                    const n = idx + 1
                    const active = highlight === n
                    return (
                      <li
                        key={s.id}
                        id={`research-source-${n}`}
                        className={cn(
                          'rounded-xl border px-3 py-2.5 transition',
                          active ? 'border-gold bg-gold/10 ring-1 ring-gold/40' : 'border-line bg-surface/50',
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => setHighlight(n)}
                          className="w-full text-left"
                        >
                          <span className="font-label text-[10px] font-bold text-gold">[{n}]</span>
                          <p className="mt-1 font-sans text-xs font-semibold leading-snug text-ink">{s.citation}</p>
                          <p className="mt-2 font-sans text-[11px] leading-relaxed text-mist/90">{s.excerpt}</p>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </aside>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-canvas/30 p-10 text-center font-sans text-sm text-mist">
              Run a query to see a citation-backed answer from your selected corpus.
            </div>
          )}
        </div>
      </div>

      <DocumentViewerModal
        open={viewer !== null}
        title={viewer?.title ?? ''}
        subtitle={viewer?.citation}
        body={viewer?.fullText ?? ''}
        onClose={() => setViewer(null)}
      />
    </div>
  )
}
