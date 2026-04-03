import { mockReviewRows } from '@/mocks/workspace'

export function Review() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-4xl text-ink">Tabular Review</h1>
      <p className="mt-2 max-w-2xl font-sans text-mist">
        Matrix extraction: define columns, run batch jobs, inspect confidence per cell, export XLSX. Demo grid below.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-elevated shadow-card">
        <div className="grid grid-cols-[72px_1fr_1fr_100px] gap-px bg-line font-label text-[10px] font-bold uppercase tracking-wider text-mist/80 md:grid-cols-[96px_1fr_1fr_120px]">
          <div className="bg-surface px-3 py-3 md:px-4">Row</div>
          <div className="bg-surface px-3 py-3 md:px-4">Parties</div>
          <div className="bg-surface px-3 py-3 md:px-4">Governing law</div>
          <div className="bg-surface px-3 py-3 md:px-4">Conf.</div>
        </div>
        <div className="divide-y divide-line">
          {mockReviewRows.map((r) => (
            <div
              key={r.row}
              className="grid grid-cols-[72px_1fr_1fr_100px] items-center gap-px bg-line font-sans text-sm md:grid-cols-[96px_1fr_1fr_120px]"
            >
              <div className="bg-elevated px-3 py-3.5 text-mist md:px-4">{r.row}</div>
              <div className="bg-elevated px-3 py-3.5 text-ink md:px-4">{r.parties}</div>
              <div className="bg-elevated px-3 py-3.5 text-mist md:px-4">{r.governingLaw}</div>
              <div className="bg-elevated px-3 py-3.5 md:px-4">
                <span
                  className={
                    r.confidence >= 0.9
                      ? 'text-emerald-300'
                      : r.confidence >= 0.8
                        ? 'text-gold'
                        : 'text-mist'
                  }
                >
                  {(r.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
