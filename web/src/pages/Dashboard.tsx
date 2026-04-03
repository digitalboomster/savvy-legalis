import { Upload } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  docStatusClass,
  docStatusLabel,
  formatShortDate,
  mockDocuments,
  mockIngestJobs,
  mockPipelineCounts,
} from '@/mocks/workspace'

export function Dashboard() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-4xl text-ink">Document Intelligence</h1>
      <p className="mt-2 max-w-2xl font-sans text-mist">
        Live pipeline status: queued → parse → chunk → embed → index. Demo data below — wire your API when ready.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-elevated/80 p-6 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Indexed</p>
          <p className="mt-3 font-display text-3xl text-ink">{mockPipelineCounts.indexed.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-border bg-elevated/80 p-6 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Processing</p>
          <p className="mt-3 font-display text-3xl text-ink">{mockPipelineCounts.processing}</p>
        </div>
        <div className="rounded-2xl border border-border bg-elevated/80 p-6 shadow-card">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">Failed</p>
          <p className="mt-3 font-display text-3xl text-ink">{mockPipelineCounts.failed}</p>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-elevated shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-4">
          <h2 className="font-display text-lg text-ink">Documents</h2>
          <span className="font-label text-[10px] uppercase tracking-widest text-mist/60">
            {mockDocuments.length} in view
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface/80 font-label text-[10px] font-bold uppercase tracking-wider text-mist/80">
                <th className="px-6 py-3">File</th>
                <th className="px-6 py-3">Matter</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Pages</th>
                <th className="px-6 py-3">Uploaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {mockDocuments.map((d) => (
                <tr key={d.id} className="font-sans text-mist transition hover:bg-surface/40">
                  <td className="px-6 py-3.5 text-ink">{d.filename}</td>
                  <td className="px-6 py-3.5">{d.matterRef}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-0.5 font-label text-[10px] font-bold uppercase tracking-wide',
                        docStatusClass(d.status),
                      )}
                    >
                      {docStatusLabel(d.status)}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">{d.pages}</td>
                  <td className="px-6 py-3.5 text-mist/90">{formatShortDate(d.uploadedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
          <Upload className="mx-auto h-10 w-10 text-primary-bright/80" strokeWidth={1.25} />
          <p className="mt-4 font-sans text-sm text-mist">
            Drop PDF, DOCX, or TIFF — or <span className="text-gold">browse</span>. Jobs enqueue automatically (demo).
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface/60 p-6">
          <p className="font-label text-[10px] font-bold uppercase tracking-widest text-gold">Recent ingest jobs</p>
          <ul className="mt-4 space-y-4">
            {mockIngestJobs.map((j) => (
              <li key={j.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm text-ink">{j.documentName}</p>
                    <p className="mt-0.5 font-label text-[10px] uppercase tracking-wider text-mist/70">{j.stage}</p>
                  </div>
                  <span className="shrink-0 font-label text-[10px] text-mist/60">{formatShortDate(j.startedAt)}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${j.progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
