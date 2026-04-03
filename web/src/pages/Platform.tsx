import { Link } from 'react-router-dom'

import { ModuleCard } from '@/components/ModuleCard'
import {
  LayoutDashboard,
  Search,
  Table2,
  FileEdit,
  Briefcase,
  Settings,
  HelpCircle,
} from 'lucide-react'

const modules = [
  {
    to: '/dashboard',
    title: 'Document Intelligence',
    description:
      'Ingest, parse, chunk, and index firm documents — live job stages from upload to vector + keyword search.',
    icon: LayoutDashboard,
  },
  {
    to: '/research',
    title: 'Research & RAG',
    description:
      'Hybrid retrieval with mandatory inline citations and verification against your corpus.',
    icon: Search,
  },
  {
    to: '/review',
    title: 'Tabular Review',
    description:
      'Define columns, run extraction jobs, inspect confidence, export to spreadsheet.',
    icon: Table2,
  },
  {
    to: '/draft',
    title: 'Draft & Playbooks',
    description:
      'Counsel chat synced to a working document; playbook checks for Nigerian practice patterns.',
    icon: FileEdit,
  },
  {
    to: '/matters',
    title: 'Matters & Dossier',
    description:
      'Matter registry, filters, and dossier views tied to uploaded bundles.',
    icon: Briefcase,
  },
  {
    to: '/settings',
    title: 'Firm & Billing',
    description: 'Firm profile, usage meters, and subscription hooks (Paystack / Stripe).',
    icon: Settings,
  },
  {
    to: '/support',
    title: 'Support',
    description: 'Tickets, SLAs, and compliance messaging — NDPR-aware handling.',
    icon: HelpCircle,
  },
] as const

export function Platform() {
  return (
    <div className="min-h-screen bg-canvas bg-hero-mesh px-8 py-10 md:px-14">
      <Link to="/" className="font-display text-lg italic text-primary-bright hover:text-gold">
        ← Savvy Legalis
      </Link>
      <div className="mx-auto mt-10 max-w-6xl">
      <h1 className="font-display text-4xl text-ink">All modules</h1>
      <p className="mt-2 max-w-2xl font-sans text-mist">
        Same structure as a wealth OS landing — every capability is a first-class surface with traceability.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {modules.map((m) => (
          <ModuleCard key={m.to} {...m} />
        ))}
      </div>
      </div>
    </div>
  )
}
