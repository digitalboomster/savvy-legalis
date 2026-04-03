import { useMemo, useState } from 'react'
import { FileStack, Upload } from 'lucide-react'

import { DocumentIntelPanel } from '@/components/DocumentIntelPanel'
import { cn } from '@/lib/utils'
import {
  docStatusClass,
  docStatusLabel,
  mockDocuments,
  mockIngestJobs,
  mockPipelineCounts,
} from '@/mocks/workspace'

export function Dashboard() {
  const defaultId = mockDocuments[0]?.id ?? ''
  const [selectedId, setSelectedId] = useState(defaultId)

  const selected = useMemo(() => mockDocuments.find((d) => d.id === selectedId) ?? mockDocuments[0]!, [selectedId])

  const totalChunks = mockDocuments.reduce((acc, d) => acc + d.chunksIndexed, 0)
  const totalEntities = mockDocuments.reduce((acc, d) => acc + d.entities.length, 0)

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink">Document Intelligence</h1>
          <p className="mt-2 max-w-2xl font-sans text-mist">
            Extract, structure, embed, and cite — full parse visibility on every mock document (Nautilus-style
            density). Swap mocks for your API when ready.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 font-label text-[10px] uppercase tracking-widest text-mist/70 sm:flex">
          <FileStack className="h-4 w-4 text-gold" strokeWidth={1.75} />
          Demo corpus
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-border bg-elevated/80 p-5 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Indexed</p>
          <p className="mt-2 font-display text-3xl text-ink">{mockPipelineCounts.indexed.toLocaleString()}</p>
          <p className="mt-1 font-sans text-[11px] text-mist/70">Pages in ANN+BM25</p>
        </div>
        <div className="rounded-2xl border border-border bg-elevated/80 p-5 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Processing</p>
          <p className="mt-2 font-display text-3xl text-ink">{mockPipelineCounts.processing}</p>
          <p className="mt-1 font-sans text-[11px] text-mist/70">Active pipelines</p>
        </div>
        <div className="rounded-2xl border border-border bg-elevated/80 p-5 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Failed</p>
          <p className="mt-2 font-display text-3xl text-ink">{mockPipelineCounts.failed}</p>
          <p className="mt-1 font-sans text-[11px] text-mist/70">OCR / QA gates</p>
        </div>
        <div className="rounded-2xl border border-border bg-elevated/80 p-5 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Chunks (demo)</p>
          <p className="mt-2 font-display text-3xl text-ink">{totalChunks.toLocaleString()}</p>
          <p className="mt-1 font-sans text-[11px] text-mist/70">Semantic windows</p>
        </div>
        <div className="rounded-2xl border border-border bg-elevated/80 p-5 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Entities</p>
          <p className="mt-2 font-display text-3xl text-ink">{totalEntities}</p>
          <p className="mt-1 font-sans text-[11px] text-mist/70">Across visible docs</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] xl:gap-8">
        <div className="flex min-h-0 flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-elevated shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
              <h2 className="font-display text-lg text-ink">Documents</h2>
              <span className="font-label text-[10px] uppercase tracking-widest text-mist/60">
                Select a row — inspect parse + insights
              </span>
            </div>
            <div className="max-h-[340px] overflow-y-auto scroll-slim lg:max-h-none">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 z-10 border-b border-line bg-surface/95 backdrop-blur">
                  <tr className="font-label text-[10px] font-bold uppercase tracking-wider text-mist/80">
                    <th className="px-4 py-2.5 sm:px-5">File</th>
                    <th className="hidden py-2.5 sm:table-cell">Matter</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {mockDocuments.map((d) => {
                    const active = d.id === selected.id
                    return (
                      <tr
                        key={d.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedId(d.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedId(d.id)
                          }
                        }}
                        className={cn(
                          'cursor-pointer font-sans text-mist transition',
                          active ? 'bg-primary/10 ring-1 ring-inset ring-primary/25' : 'hover:bg-surface/45',
                        )}
                      >
                        <td className="max-w-[200px] truncate px-4 py-3 text-xs font-medium text-ink sm:max-w-none sm:px-5">
                          {d.filename}
                        </td>
                        <td className="hidden py-3 font-mono text-[10px] text-mist/75 sm:table-cell">{d.matterRef}</td>
                        <td className="px-2 py-3 sm:px-5">
                          <span
                            className={cn(
                              'inline-flex rounded-full px-2 py-0.5 font-label text-[9px] font-bold uppercase tracking-wide',
                              docStatusClass(d.status),
                            )}
                          >
                            {docStatusLabel(d.status)}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-6 text-center">
              <Upload className="mx-auto h-9 w-9 text-primary-bright/80" strokeWidth={1.25} />
              <p className="mt-3 font-sans text-xs leading-relaxed text-mist">
                Drop PDF, DOCX, TIFF — ingest triggers the same pipeline (demo: static queue).
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/60 p-5">
              <p className="font-label text-[10px] font-bold uppercase tracking-widest text-gold">Live jobs</p>
              <ul className="mt-3 space-y-3">
                {mockIngestJobs.map((j) => (
                  <li key={j.id}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-sans text-xs text-ink">{j.documentName}</p>
                      <span className="shrink-0 font-mono text-[9px] text-mist/55">{j.progress}%</span>
                    </div>
                    <p className="font-mono text-[9px] text-mist/60">{j.stage}</p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${j.progress}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <DocumentIntelPanel doc={selected} />
      </div>
    </div>
  )
}
