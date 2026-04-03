import { useEffect, useMemo, useState } from 'react'
import { FileText, Search } from 'lucide-react'

import { DocumentViewerModal } from '@/components/DocumentViewerModal'
import { cn } from '@/lib/utils'
import {
  type MatterDocument,
  mockMatters,
  type MockMatterWithDocs,
} from '@/mocks/interactiveMattersResearch'
import { matterStatusLabel } from '@/mocks/workspace'

function kindLabel(k: MatterDocument['kind']) {
  switch (k) {
    case 'pleading':
      return 'Pleading'
    case 'evidence':
      return 'Evidence'
    case 'statute':
      return 'Statute'
    case 'correspondence':
      return 'Correspondence'
    case 'bundle':
      return 'Bundle'
    default:
      return k
  }
}

function docStatusBadge(status: MatterDocument['status']) {
  switch (status) {
    case 'indexed':
      return 'bg-primary/20 text-primary-bright'
    case 'review':
      return 'bg-gold/20 text-gold'
    case 'processing':
      return 'bg-mist/15 text-mist'
    default:
      return 'bg-mist/10 text-mist'
  }
}

export function Matters() {
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'advisory' | 'closed'>('all')
  const [selectedId, setSelectedId] = useState<string>(mockMatters[0]?.id ?? '')
  const [viewerDoc, setViewerDoc] = useState<MatterDocument | null>(null)

  const filtered = useMemo(() => {
    return mockMatters.filter((m) => {
      if (statusFilter !== 'all' && m.status !== statusFilter) return false
      if (!q.trim()) return true
      const s = q.toLowerCase()
      return (
        m.ref.toLowerCase().includes(s) ||
        m.title.toLowerCase().includes(s) ||
        m.jurisdiction.toLowerCase().includes(s) ||
        m.documents.some((d) => d.filename.toLowerCase().includes(s))
      )
    })
  }, [q, statusFilter])

  useEffect(() => {
    if (filtered.length === 0) return
    if (!filtered.some((m) => m.id === selectedId)) {
      setSelectedId(filtered[0]!.id)
    }
  }, [filtered, selectedId])

  const activeMatter: MockMatterWithDocs | null = useMemo(() => {
    if (filtered.length === 0) return null
    return filtered.find((m) => m.id === selectedId) ?? filtered[0]!
  }, [filtered, selectedId])

  if (!activeMatter) {
    return (
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl text-ink">Matter Workspace</h1>
        <p className="mt-6 rounded-2xl border border-border bg-elevated p-8 font-sans text-mist">
          No matters match your filters. Clear search or set status to &quot;All statuses&quot;.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <h1 className="font-display text-4xl text-ink">Matter Workspace</h1>
          <p className="mt-2 max-w-xl font-sans text-mist">
            Select a matter, then open any document in the dossier — full text opens in the viewer (demo MVP).
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist/50" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search matters or filenames…"
              className="w-full rounded-xl border border-border bg-elevated py-2.5 pl-10 pr-4 font-sans text-sm text-ink outline-none ring-primary/20 focus:ring-2"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="rounded-xl border border-border bg-elevated px-4 py-2.5 font-sans text-xs text-ink outline-none"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="advisory">Advisory</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
        <div className="flex max-h-[min(70vh,720px)] flex-col rounded-2xl border border-border bg-elevated/80 shadow-card">
          <p className="border-b border-line px-4 py-3 font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">
            Matters ({filtered.length})
          </p>
          <ul className="scroll-slim flex-1 overflow-y-auto p-2">
            {filtered.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(m.id)}
                  className={cn(
                    'mb-1 w-full rounded-xl px-3 py-3 text-left transition',
                    m.id === activeMatter.id
                      ? 'bg-primary/15 ring-1 ring-inset ring-primary/35'
                      : 'hover:bg-surface/60',
                  )}
                >
                  <p className="font-mono text-[10px] text-gold">{m.ref}</p>
                  <p className="mt-0.5 line-clamp-2 font-sans text-sm font-medium text-ink">{m.title}</p>
                  <p className="mt-1 font-label text-[9px] uppercase tracking-wider text-mist/55">
                    {m.documents.length} docs · {m.jurisdiction}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 rounded-2xl border border-border bg-surface/50 p-6 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-gold">{activeMatter.ref}</p>
              <h2 className="mt-1 font-display text-2xl text-ink">{activeMatter.title}</h2>
              <p className="mt-2 max-w-3xl font-sans text-sm leading-relaxed text-mist">{activeMatter.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/20 px-2.5 py-0.5 font-label text-[9px] font-bold uppercase tracking-wider text-primary-bright">
                  {activeMatter.court}
                </span>
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-label text-[9px] font-bold uppercase tracking-wider text-gold">
                  {matterStatusLabel(activeMatter.status)}
                </span>
                <span className="font-label text-[10px] text-mist/60">Updated {activeMatter.updatedAt}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-canvas/80 font-label text-[10px] font-bold uppercase tracking-wider text-mist/80">
                  <th className="px-4 py-3">Document</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Kind</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 md:table-cell">Pages</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {activeMatter.documents.map((d) => (
                  <tr key={d.id} className="bg-elevated/40 transition hover:bg-elevated/70">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setViewerDoc(d)}
                        className="text-left font-sans text-sm font-medium text-gold underline underline-offset-2 hover:text-primary-bright"
                      >
                        {d.filename}
                      </button>
                      <p className="mt-1 line-clamp-2 font-sans text-xs text-mist/90">{d.summary}</p>
                    </td>
                    <td className="hidden px-4 py-3 font-label text-[10px] text-mist/80 sm:table-cell">{kindLabel(d.kind)}</td>
                    <td className="px-4 py-3">
                      <span className={cn('rounded-full px-2 py-0.5 font-label text-[9px] font-bold uppercase', docStatusBadge(d.status))}>
                        {d.status}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 font-mono text-xs text-mist/70 md:table-cell">{d.pages}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setViewerDoc(d)}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 font-sans text-xs font-semibold text-ink transition hover:border-primary/40"
                      >
                        <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DocumentViewerModal
        open={viewerDoc !== null}
        title={viewerDoc?.filename ?? ''}
        subtitle={viewerDoc ? `${kindLabel(viewerDoc.kind)} · ${viewerDoc.pages} pp · added ${viewerDoc.addedAt}` : undefined}
        body={viewerDoc?.fullText ?? ''}
        onClose={() => setViewerDoc(null)}
      />
    </div>
  )
}
