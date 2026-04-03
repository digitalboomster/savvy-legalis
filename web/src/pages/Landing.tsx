import { Link } from 'react-router-dom'
import { ArrowRight, Shield } from 'lucide-react'

export function Landing() {
  return (
    <div className="min-h-screen bg-canvas bg-hero-mesh">
      <header className="flex items-center justify-between px-8 py-6 md:px-14">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl italic text-primary-bright">Savvy Legalis</span>
          <span className="hidden font-label text-[10px] uppercase tracking-[0.25em] text-mist/60 sm:inline">
            Legal Operating System
          </span>
        </div>
        <Link
          to="/dashboard"
          className="rounded-full border border-border bg-elevated/80 px-5 py-2.5 font-sans text-sm font-semibold text-ink backdrop-blur transition hover:border-primary/40 hover:bg-elevated"
        >
          Enter platform →
        </Link>
      </header>

      <section className="mx-auto max-w-4xl px-8 pb-16 pt-12 text-center md:px-14 md:pt-20">
        <p className="mb-6 font-label text-[11px] font-semibold uppercase tracking-[0.35em] text-mist/70">
          Nigerian legal intelligence
        </p>
        <h1 className="font-display text-5xl leading-[1.08] text-ink md:text-6xl lg:text-7xl">
          The institutional layer for African counsel
        </h1>
        <p className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-mist md:text-xl">
          Document intelligence, citation-backed research, tabular review, and drafting — with full audit trails.
          <span className="text-ink/90"> One workspace for every matter under your firm.</span>
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-sans text-sm font-bold tracking-wide text-white shadow-lift transition hover:bg-primary-bright"
          >
            Enter Savvy Legalis
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/platform"
            className="font-sans text-sm font-semibold text-gold underline-offset-4 hover:underline"
          >
            See all modules →
          </Link>
        </div>
        <p className="mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-label text-[11px] uppercase tracking-widest text-mist/50">
          <span>Citation-first</span>
          <span className="text-mist/30">·</span>
          <span>Firm-scoped</span>
          <span className="text-mist/30">·</span>
          <span>Audit trail</span>
          <span className="text-mist/30">·</span>
          <span>Multi-agent ready</span>
        </p>
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-8 py-16 md:px-14">
        <div className="flex items-center gap-3 text-mist">
          <Shield className="h-5 w-5 text-primary-bright" />
          <p className="font-sans text-sm">
            Built for common law, customary, and Sharia contexts across Nigerian court tiers — from High Court to Supreme Court.
          </p>
        </div>
      </section>

      <footer className="border-t border-line px-8 py-10 text-center md:px-14">
        <p className="font-label text-[11px] text-mist/45">
          © {new Date().getFullYear()} Savvy Legalis · Premium legal workspace MVP
        </p>
      </footer>
    </div>
  )
}
