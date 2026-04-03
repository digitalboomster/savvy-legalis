import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  title: string
  subtitle?: string
  body: string
  onClose: () => void
}

export function DocumentViewerModal({ open, title, subtitle, body, onClose }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="doc-viewer-title">
      <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close document viewer" onClick={onClose} />
      <div
        className={cn(
          'relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-3xl flex-col rounded-t-2xl border border-border bg-elevated shadow-lift sm:rounded-2xl',
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 id="doc-viewer-title" className="font-display text-lg text-ink">
              {title}
            </h2>
            {subtitle ? <p className="mt-1 font-mono text-[11px] text-mist/80">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-border p-2 text-mist transition hover:border-primary/40 hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="scroll-slim flex-1 overflow-y-auto px-5 py-4">
          <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-mist/95">{body}</pre>
        </div>
        <div className="border-t border-line px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-border bg-surface py-2.5 font-sans text-sm font-semibold text-ink transition hover:border-primary/35"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
