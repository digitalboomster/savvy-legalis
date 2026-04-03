/**
 * Demo / boss-review dataset — swap for Supabase + API calls later.
 * Single source of truth for workspace mock content.
 */

export type DocumentPipelineStatus = 'indexed' | 'processing' | 'failed' | 'queued'

export type MockDocument = {
  id: string
  filename: string
  status: DocumentPipelineStatus
  matterRef: string
  uploadedAt: string
  pages: number
}

export type MockIngestJob = {
  id: string
  documentName: string
  stage: string
  progress: number
  startedAt: string
}

export type MatterStatus = 'active' | 'advisory' | 'closed'

export type MockMatter = {
  id: string
  ref: string
  title: string
  court: string
  jurisdiction: string
  status: MatterStatus
  summary: string
  updatedAt: string
  docCount: number
}

export type MockResearchSource = {
  id: string
  citation: string
  excerpt: string
}

export type MockReviewRow = {
  row: number
  parties: string
  governingLaw: string
  confidence: number
}

export type MockDraftSession = {
  id: string
  title: string
  matterRef: string
  updatedAt: string
}

export type MockPlaybookItem = {
  id: string
  label: string
  ok: boolean
}

export const mockPipelineCounts = {
  indexed: 1284,
  processing: 7,
  failed: 2,
} as const

export const mockDocuments: MockDocument[] = [
  {
    id: 'doc-1',
    filename: 'NDA_Lagos_Port_Authority_2024.pdf',
    status: 'indexed',
    matterRef: 'LAG-2024-112',
    uploadedAt: '2026-04-01T09:14:00.000Z',
    pages: 42,
  },
  {
    id: 'doc-2',
    filename: 'Witness_statement_Okonkwo.docx',
    status: 'processing',
    matterRef: 'ABJ-2025-044',
    uploadedAt: '2026-04-02T11:02:00.000Z',
    pages: 18,
  },
  {
    id: 'doc-3',
    filename: 'CAMA_2020_Excerpt_Bundle.pdf',
    status: 'indexed',
    matterRef: 'CORP-ADV-009',
    uploadedAt: '2026-03-28T16:40:00.000Z',
    pages: 210,
  },
  {
    id: 'doc-4',
    filename: 'Court_of_Appeal_Judgment_Scan.tiff',
    status: 'failed',
    matterRef: 'SC-2023-901',
    uploadedAt: '2026-04-02T14:55:00.000Z',
    pages: 96,
  },
  {
    id: 'doc-5',
    filename: 'Expert_report_geotech_redacted.pdf',
    status: 'queued',
    matterRef: 'PHC-2026-008',
    uploadedAt: '2026-04-03T07:30:00.000Z',
    pages: 55,
  },
]

export const mockIngestJobs: MockIngestJob[] = [
  {
    id: 'job-1',
    documentName: 'Shareholders_agreement_series_B.pdf',
    stage: 'Embed → index',
    progress: 78,
    startedAt: '2026-04-03T08:12:00.000Z',
  },
  {
    id: 'job-2',
    documentName: 'FCT_High_Court_Rules_extract.pdf',
    stage: 'Parse → chunk',
    progress: 44,
    startedAt: '2026-04-03T08:05:00.000Z',
  },
  {
    id: 'job-3',
    documentName: 'Expert_report_geotech_redacted.pdf',
    stage: 'Queued',
    progress: 5,
    startedAt: '2026-04-03T07:30:00.000Z',
  },
]

export const mockMatters: MockMatter[] = [
  {
    id: 'm1',
    ref: 'LAG-2024-112',
    title: 'Lagos Port Authority — confidentiality & concession dispute',
    court: 'Federal High Court',
    jurisdiction: 'Lagos',
    status: 'active',
    summary:
      'NDA scope, force majeure on berth delays, and injunctive relief against disclosure. Bundle indexed; expert reports under privilege review.',
    updatedAt: '2026-04-02',
    docCount: 38,
  },
  {
    id: 'm2',
    ref: 'ABJ-2025-044',
    title: 'FCT land allocation — judicial review of agency decision',
    court: 'Federal High Court',
    jurisdiction: 'Abuja',
    status: 'active',
    summary:
      'Administrative law challenge; witness statements in processing; research memos cite SCN hierarchy and LFN compilations.',
    updatedAt: '2026-04-01',
    docCount: 22,
  },
  {
    id: 'm3',
    ref: 'CORP-ADV-009',
    title: 'CAMA restructuring — minority squeeze-out advisory',
    court: '—',
    jurisdiction: 'Nigeria (national)',
    status: 'advisory',
    summary:
      'Board memos, CAMA 2020 excerpts indexed; playbook checks on notices and fair value mechanics.',
    updatedAt: '2026-03-29',
    docCount: 14,
  },
  {
    id: 'm4',
    ref: 'PHC-2026-008',
    title: 'Rivers HSE — contractor liability & indemnities',
    court: 'High Court',
    jurisdiction: 'Port Harcourt',
    status: 'active',
    summary:
      'Construction defect claim; tabular review on indemnity clauses across sub-contracts; Sharia/customary not engaged.',
    updatedAt: '2026-03-27',
    docCount: 19,
  },
]

export const mockResearch = {
  query:
    'Under Nigerian law, what is the threshold for granting an interlocutory injunction where the balance of convenience favours the defendant but there is a serious question to be tried?',
  answer: `Where there is a serious question to be tried, courts may still grant an interlocutory injunction if the plaintiff would suffer irreparable harm that damages cannot adequately compensate [1]. The balance of convenience is not dispositive on its own; the Supreme Court has emphasised preserving the subject matter of litigation and preventing administrative fait accompli pending trial [2]. Practically, your draft should tie harm to specific disclosures or berth operations rather than generic commercial pressure.`,
  sources: [
    {
      id: 's1',
      citation: 'Kotoye v. Saraki (1994) NWLR (Pt. 351) 256',
      excerpt:
        '…the essence of an interlocutory injunction is to preserve the res and maintain the status quo—not to determine final rights…',
    },
    {
      id: 's2',
      citation: 'FBN v. Maiwada (2018) LPELR-44392(SC)',
      excerpt:
        'Balance of convenience is weighed alongside likelihood of irreparable injury and the court’s discretion to prevent injustice…',
    },
    {
      id: 's3',
      citation: 'FHC Practice Direction 2023 (Civil Procedure) — injunctive relief',
      excerpt:
        'Affidavit evidence must particularise urgency, likelihood of success, and the nature of harm if relief is refused…',
    },
  ] satisfies MockResearchSource[],
}

export const mockReviewRows: MockReviewRow[] = [
  { row: 1, parties: 'LPA v. Berth Contractors Ltd', governingLaw: 'Nigerian contract & tort', confidence: 0.94 },
  { row: 2, parties: 'Min. of Aviation v. Skyline Airways', governingLaw: 'Aviation + administrative law', confidence: 0.88 },
  { row: 3, parties: 'In re: Union Bank restructuring', governingLaw: 'CAMA 2020 + SEC rules', confidence: 0.91 },
  { row: 4, parties: 'NDDC v. Coastal Dev. Co.', governingLaw: 'Public procurement / FOI', confidence: 0.76 },
  { row: 5, parties: 'Oando v. SEC (regulatory)', governingLaw: 'ISA + administrative law', confidence: 0.82 },
]

export const mockDraftSessions: MockDraftSession[] = [
  { id: 'ds1', title: 'Motion on notice — injunction', matterRef: 'LAG-2024-112', updatedAt: '2026-04-03' },
  { id: 'ds2', title: 'Client memo — CAMA squeeze-out', matterRef: 'CORP-ADV-009', updatedAt: '2026-04-01' },
  { id: 'ds3', title: 'Witness outline — FCT land', matterRef: 'ABJ-2025-044', updatedAt: '2026-03-30' },
]

export const mockDraftBody = `IN THE FEDERAL HIGH COURT
IN THE LAGOS JUDICIAL DIVISION
HOLDEN AT LAGOS

BEFORE THE HONOURABLE JUSTICE …

SUIT NO: FHC/L/CS/2024/…

BETWEEN:
LAGOS PORT AUTHORITY …………………………… PLAINTIFF
AND
BERTH CONTRACTORS LTD ………………………… DEFENDANT

MOTION ON NOTICE

TAKE NOTICE that this Honourable Court will be moved on … day of April 2026 at 9 o’clock in the forenoon or so soon thereafter as counsel may be heard, for AN ORDER OF INTERLOCUTORY INJUNCTION restraining the Defendant, whether by itself, directors, servants, agents or privies, from further disclosure or use of confidential information marked Schedule A to the Claimant’s bundle pending the determination of the substantive suit.

GROUNDS
1. The Claimant has a serious question to be tried on the construction of the NDA dated …
2. The Claimant will suffer irreparable harm absent injunctive relief…
`

export const mockPlaybooks: MockPlaybookItem[] = [
  { id: 'p1', label: 'Affidavit particularises urgency & harm', ok: true },
  { id: 'p2', label: 'Balance of convenience addressed', ok: true },
  { id: 'p3', label: 'Undertaking as to damages offered', ok: false },
  { id: 'p4', label: 'Service / hearing date compliance', ok: true },
]

export const mockSupportTickets = [
  { id: 't1', subject: 'Bulk upload stalled at 400MB PDF', status: 'In progress', sla: '4h' },
  { id: 't2', subject: 'Add Sharia corpus to workspace', status: 'Queued', sla: '24h' },
  { id: 't3', subject: 'Invoice — Paystack receipt mismatch', status: 'Resolved', sla: '—' },
] as const

export function formatShortDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function docStatusLabel(s: DocumentPipelineStatus) {
  switch (s) {
    case 'indexed':
      return 'Indexed'
    case 'processing':
      return 'Processing'
    case 'failed':
      return 'Failed'
    case 'queued':
      return 'Queued'
    default:
      return s
  }
}

export function docStatusClass(s: DocumentPipelineStatus) {
  switch (s) {
    case 'indexed':
      return 'bg-primary/20 text-primary-bright'
    case 'processing':
      return 'bg-gold/20 text-gold'
    case 'failed':
      return 'bg-red-500/15 text-red-300'
    case 'queued':
      return 'bg-mist/10 text-mist'
    default:
      return 'bg-mist/10 text-mist'
  }
}

export function matterStatusLabel(s: MatterStatus) {
  switch (s) {
    case 'active':
      return 'Active'
    case 'advisory':
      return 'Advisory'
    case 'closed':
      return 'Closed'
    default:
      return s
  }
}
