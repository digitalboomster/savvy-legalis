import { Search } from 'lucide-react'

import { mockSupportTickets } from '@/mocks/workspace'

export function Support() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary-dim via-canvas to-canvas p-10 md:p-14">
        <h1 className="font-display text-3xl text-ink md:text-4xl">How can we assist your practice?</h1>
        <div className="relative mt-8">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-mist/50" />
          <div className="rounded-2xl border border-border bg-elevated/60 py-4 pl-14 pr-6 font-sans text-mist backdrop-blur">
            Search help articles, Sharia precedents, e-filing…
          </div>
        </div>
        <p className="mt-4 font-label text-[10px] uppercase tracking-widest text-mist/50">
          Trending: NDPR · Court hierarchy · Subscription
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {['Technical', 'Billing', 'Corpus requests', 'Privacy'].map((t) => (
          <div key={t} className="rounded-2xl border border-border bg-elevated p-6 shadow-card">
            <h3 className="font-display text-lg text-ink">{t}</h3>
            <p className="mt-2 font-sans text-sm text-mist">Ticket form + SLA — connect Zendesk / Intercom when ready.</p>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-card">
        <div className="border-b border-line px-6 py-4">
          <h2 className="font-display text-xl text-ink">Recent tickets (demo)</h2>
          <p className="mt-1 font-sans text-sm text-mist">Mock queue for stakeholder reviews.</p>
        </div>
        <ul className="divide-y divide-line">
          {mockSupportTickets.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 font-sans text-sm">
              <span className="text-ink">{t.subject}</span>
              <span className="rounded-full bg-primary/15 px-3 py-1 font-label text-[10px] uppercase tracking-wider text-primary-bright">
                {t.status}
              </span>
              <span className="font-label text-[10px] uppercase tracking-wider text-mist/60">SLA {t.sla}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
