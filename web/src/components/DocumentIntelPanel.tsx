import {
  AlertTriangle,
  BookMarked,
  CheckCircle2,
  Circle,
  Cpu,
  Database,
  Layers,
  Loader2,
  Scan,
  Shield,
  Sparkles,
  Table2,
  XCircle,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  entityKindLabel,
  formatShortDate,
  insightSeverityClass,
  type MockDocument,
} from '@/mocks/workspace'

function StageIcon({ state }: { state: MockDocument['parseStages'][0]['state'] }) {
  if (state === 'done') return <CheckCircle2 className="h-4 w-4 text-emerald-400/90" strokeWidth={2} />
  if (state === 'active') return <Loader2 className="h-4 w-4 animate-spin text-gold" strokeWidth={2} />
  if (state === 'error') return <XCircle className="h-4 w-4 text-red-400" strokeWidth={2} />
  return <Circle className="h-4 w-4 text-mist/35" strokeWidth={2} />
}

export function DocumentIntelPanel({ doc }: { doc: MockDocument }) {
  return (
    <div className="flex max-h-[min(85vh,calc(100vh-8rem))] flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-elevated/95 to-surface/90 shadow-card">
      <div className="border-b border-line px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-sans text-sm font-semibold text-ink">{doc.filename}</p>
            <p className="mt-1 font-label text-[10px] uppercase tracking-wider text-mist/60">
              {doc.matterRef} · {doc.pages} pp · uploaded {formatShortDate(doc.uploadedAt)}
            </p>
          </div>
        </div>
        <p className="mt-3 font-sans text-sm leading-relaxed text-mist">
          <Sparkles className="mr-1.5 inline-block h-3.5 w-3.5 text-gold" strokeWidth={2} />
          {doc.summary}
        </p>
        {doc.pipelineNote ? (
          <p className="mt-2 rounded-lg border border-gold/25 bg-gold/5 px-3 py-2 font-sans text-xs text-gold/95">{doc.pipelineNote}</p>
        ) : null}
      </div>

      <div className="scroll-slim flex-1 space-y-6 overflow-y-auto px-5 py-5">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Scan className="h-4 w-4 text-primary-bright" strokeWidth={1.75} />
            <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-mist/80">
              Parse & index pipeline
            </h3>
          </div>
          <ol className="space-y-2.5">
            {doc.parseStages.map((s) => (
              <li
                key={s.id}
                className={cn(
                  'flex gap-3 rounded-xl border px-3 py-2.5',
                  s.state === 'active' && 'border-gold/35 bg-gold/5',
                  s.state === 'error' && 'border-red-500/35 bg-red-500/5',
                  s.state === 'done' && 'border-line bg-surface/50',
                  s.state === 'pending' && 'border-line/60 bg-canvas/40 opacity-80',
                )}
              >
                <div className="pt-0.5">
                  <StageIcon state={s.state} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-sans text-xs font-semibold text-ink">{s.label}</span>
                    {s.durationMs != null && s.state === 'done' ? (
                      <span className="font-mono text-[10px] text-mist/55">{(s.durationMs / 1000).toFixed(2)}s</span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 font-sans text-[11px] leading-snug text-mist/90">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-line bg-surface/60 px-3 py-3">
            <div className="flex items-center gap-1.5 text-mist/70">
              <Layers className="h-3.5 w-3.5" />
              <span className="font-label text-[9px] uppercase tracking-wider">Chunks</span>
            </div>
            <p className="mt-1 font-display text-xl text-ink">{doc.chunksIndexed.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-line bg-surface/60 px-3 py-3">
            <div className="flex items-center gap-1.5 text-mist/70">
              <Table2 className="h-3.5 w-3.5" />
              <span className="font-label text-[9px] uppercase tracking-wider">Tables</span>
            </div>
            <p className="mt-1 font-display text-xl text-ink">{doc.tablesDetected}</p>
          </div>
          <div className="rounded-xl border border-line bg-surface/60 px-3 py-3">
            <div className="flex items-center gap-1.5 text-mist/70">
              <Cpu className="h-3.5 w-3.5" />
              <span className="font-label text-[9px] uppercase tracking-wider">Embed</span>
            </div>
            <p className="mt-1 truncate font-mono text-[10px] text-ink/90" title={doc.embeddingModel}>
              {doc.embeddingModel === '—' ? '—' : '3072d'}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface/60 px-3 py-3">
            <div className="flex items-center gap-1.5 text-mist/70">
              <Database className="h-3.5 w-3.5" />
              <span className="font-label text-[9px] uppercase tracking-wider">Vectors</span>
            </div>
            <p className="mt-1 font-display text-xl text-ink">{doc.vectorDims || '—'}</p>
          </div>
        </section>

        {doc.privilegeFlags.length > 0 ? (
          <section>
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-mist/70" strokeWidth={1.75} />
              <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-mist/80">
                Governance & privilege
              </h3>
            </div>
            <ul className="space-y-2">
              {doc.privilegeFlags.map((p, i) => (
                <li
                  key={i}
                  className={cn(
                    'flex items-start gap-2 rounded-lg border px-3 py-2 font-sans text-xs',
                    p.level === 'high' && 'border-red-500/30 bg-red-500/5 text-red-200/90',
                    p.level === 'medium' && 'border-gold/25 bg-gold/5 text-gold/95',
                    p.level === 'low' && 'border-line bg-surface/50 text-mist',
                  )}
                >
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80" />
                  <span>{p.label}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <div className="mb-2 flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-gold" strokeWidth={1.75} />
            <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-mist/80">
              Extracted entities
            </h3>
          </div>
          {doc.entities.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line px-3 py-4 text-center font-sans text-xs text-mist/70">
              No entities finalised yet — pipeline still running or blocked.
            </p>
          ) : (
            <ul className="space-y-2">
              {doc.entities.map((e, idx) => (
                <li key={idx} className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-line bg-surface/40 px-3 py-2">
                  <div className="min-w-0">
                    <span className="font-label text-[9px] font-bold uppercase tracking-wider text-primary-bright/90">
                      {entityKindLabel(e.kind)}
                    </span>
                    <p className="font-sans text-xs font-medium text-ink">{e.text}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-mist/60">{e.span}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary-bright" strokeWidth={1.75} />
            <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-mist/80">
              Insights (parse + cross-doc)
            </h3>
          </div>
          <ul className="space-y-2.5">
            {doc.insights.map((ins) => (
              <li key={ins.id} className={cn('rounded-xl border px-3 py-3', insightSeverityClass(ins.severity))}>
                <p className="font-sans text-xs font-semibold">{ins.title}</p>
                <p className="mt-1.5 font-sans text-[11px] leading-relaxed opacity-95">{ins.body}</p>
                <p className="mt-2 font-mono text-[10px] opacity-80">Evidence: {ins.evidence}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-mist/70" strokeWidth={1.75} />
            <h3 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-mist/80">
              Citation-ready spans
            </h3>
          </div>
          {doc.evidence.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line px-3 py-4 text-center font-sans text-xs text-mist/70">
              No verified spans yet for this document state.
            </p>
          ) : (
            <ul className="space-y-3">
              {doc.evidence.map((ev) => (
                <li key={ev.id} className="rounded-xl border border-line bg-canvas/40 p-3">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-mist/70">
                    <span>p.{ev.page}</span>
                    {ev.paragraph ? <span>· {ev.paragraph}</span> : null}
                  </div>
                  <blockquote className="mt-2 border-l-2 border-gold/40 pl-3 font-sans text-[11px] leading-relaxed italic text-mist/95">
                    {ev.quote}
                  </blockquote>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
