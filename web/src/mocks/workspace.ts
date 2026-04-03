/**
 * Demo / boss-review dataset — swap for Supabase + API calls later.
 * Rich document intelligence mocks: parse stages, entities, insights, citations.
 */

export type DocumentPipelineStatus = 'indexed' | 'processing' | 'failed' | 'queued'

export type ParseStageId =
  | 'ingest'
  | 'ocr'
  | 'layout'
  | 'structure'
  | 'chunk'
  | 'embed'
  | 'index'
  | 'audit'

export type ParseStageState = 'done' | 'active' | 'pending' | 'error'

export type ParseStage = {
  id: ParseStageId
  label: string
  state: ParseStageState
  detail: string
  durationMs?: number
}

export type EntityKind = 'party' | 'date' | 'clause' | 'court' | 'statute' | 'obligation' | 'defined_term'

export type ExtractedEntity = {
  kind: EntityKind
  text: string
  span: string
}

export type InsightSeverity = 'info' | 'warning' | 'risk'

export type InsightItem = {
  id: string
  severity: InsightSeverity
  title: string
  body: string
  evidence: string
}

export type EvidenceSpan = {
  id: string
  page: number
  paragraph?: string
  quote: string
}

export type PrivilegeFlag = {
  label: string
  level: 'high' | 'medium' | 'low'
}

export type MockDocument = {
  id: string
  filename: string
  status: DocumentPipelineStatus
  matterRef: string
  uploadedAt: string
  pages: number
  /** One-line AI summary of what the system extracted */
  summary: string
  parseStages: ParseStage[]
  chunksIndexed: number
  embeddingModel: string
  vectorDims: number
  entities: ExtractedEntity[]
  insights: InsightItem[]
  evidence: EvidenceSpan[]
  tablesDetected: number
  privilegeFlags: PrivilegeFlag[]
  /** Shown for processing / queued / failed */
  pipelineNote?: string
}

export type MockIngestJob = {
  id: string
  documentName: string
  stage: string
  progress: number
  startedAt: string
}

export type MatterStatus = 'active' | 'advisory' | 'closed'

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

const stagesIndexed = (
  overrides: Partial<Record<ParseStageId, Partial<ParseStage>>> = {},
): ParseStage[] => {
  const base: ParseStage[] = [
    {
      id: 'ingest',
      label: 'Ingest',
      state: 'done',
      detail: 'Checksum, virus scan, PDF/A normalisation',
      durationMs: 420,
    },
    {
      id: 'ocr',
      label: 'OCR / text',
      state: 'done',
      detail: 'Text layer + confidence map (mean 0.97)',
      durationMs: 8200,
    },
    {
      id: 'layout',
      label: 'Layout',
      state: 'done',
      detail: 'Headings, lists, tables, reading order',
      durationMs: 3100,
    },
    {
      id: 'structure',
      label: 'Structure',
      state: 'done',
      detail: 'Sections, schedules, cross-references resolved',
      durationMs: 2100,
    },
    {
      id: 'chunk',
      label: 'Chunk',
      state: 'done',
      detail: 'Semantic windows + overlap 128 tok',
      durationMs: 4800,
    },
    {
      id: 'embed',
      label: 'Embed',
      state: 'done',
      detail: 'Dense vectors + lexical index',
      durationMs: 9600,
    },
    {
      id: 'index',
      label: 'Index',
      state: 'done',
      detail: 'ANN + BM25 hybrid graph',
      durationMs: 1200,
    },
    {
      id: 'audit',
      label: 'Audit',
      state: 'done',
      detail: 'Hash chain + firm scope stamp',
      durationMs: 80,
    },
  ]
  return base.map((s) => ({ ...s, ...(overrides[s.id] ?? {}) }))
}

export const mockDocuments: MockDocument[] = [
  {
    id: 'doc-1',
    filename: 'NDA_Lagos_Port_Authority_2024.pdf',
    status: 'indexed',
    matterRef: 'LAG-2024-112',
    uploadedAt: '2026-04-01T09:14:00.000Z',
    pages: 42,
    summary:
      'Mutual NDA: 5-year confidentiality, Lagos governing law, FHC jurisdiction, carve-outs for compelled disclosure and independent development.',
    parseStages: stagesIndexed(),
    chunksIndexed: 186,
    embeddingModel: 'text-embedding-3-large',
    vectorDims: 3072,
    tablesDetected: 2,
    entities: [
      { kind: 'party', text: 'Lagos Port Authority', span: 'p.1 · header' },
      { kind: 'party', text: 'Berth Contractors Ltd', span: 'p.1 · header' },
      { kind: 'court', text: 'Federal High Court, Lagos Division', span: 'p.3 §7.2' },
      { kind: 'defined_term', text: 'Confidential Information', span: 'p.4 Schedule A' },
      { kind: 'obligation', text: 'Return or destroy within 14 days of termination', span: 'p.9 §6.1' },
      { kind: 'date', text: 'Effective 12 March 2024', span: 'p.2' },
    ],
    insights: [
      {
        id: 'i1',
        severity: 'warning',
        title: 'Governing law vs venue',
        body:
          'Clause selects Nigerian law but also references “English common law principles” in Schedule B — flag for consistency with FHC practice direction.',
        evidence: 'Compare §7.1 vs Schedule B ¶2',
      },
      {
        id: 'i2',
        severity: 'info',
        title: 'Force majeure carve-out',
        body: 'Berth delay language ties force majeure to “government directive” — may exclude pure weather unless cross-read with concession deed.',
        evidence: 'p.11 §8.4 + Schedule C ref',
      },
      {
        id: 'i3',
        severity: 'risk',
        title: 'Injunctive relief',
        body: 'Irreparable harm + undertakings mirror your draft motion — system matched three affidavit hooks from indexed bundle.',
        evidence: 'Cross-doc: Motion_on_notice draft (ds1)',
      },
    ],
    evidence: [
      {
        id: 'e1',
        page: 7,
        paragraph: '§5.3',
        quote:
          '…each party shall use Confidential Information solely for the Purpose and shall not disclose… except as required by law…',
      },
      {
        id: 'e2',
        page: 12,
        paragraph: 'Schedule A',
        quote: 'Confidential Information includes: pricing models, berth throughput data, concession maps…',
      },
    ],
    privilegeFlags: [
      { label: 'Legally privileged strategy notes (embedded comment)', level: 'high' },
      { label: 'PII: witness phone in annex (redacted in view)', level: 'medium' },
    ],
  },
  {
    id: 'doc-2',
    filename: 'Witness_statement_Okonkwo.docx',
    status: 'processing',
    matterRef: 'ABJ-2025-044',
    uploadedAt: '2026-04-02T11:02:00.000Z',
    pages: 18,
    summary: 'Witness statement on land allocation timeline; OCR clean; embedding pass 2 of 3 running.',
    parseStages: [
      ...stagesIndexed({
        ingest: { state: 'done', detail: 'DOCX → canonical XML', durationMs: 110 },
        ocr: { state: 'done', detail: 'Native text (no OCR)', durationMs: 40 },
        layout: { state: 'done', detail: 'Paragraph + numbering map', durationMs: 900 },
        structure: { state: 'done', detail: 'Witness headings A–E', durationMs: 600 },
        chunk: { state: 'done', detail: '94 windows', durationMs: 2200 },
        embed: {
          state: 'active',
          detail: 'Vectorising batch 2/3 — ETA 42s',
          durationMs: undefined,
        },
        index: { state: 'pending', detail: 'Waiting on embeddings', durationMs: undefined },
        audit: { state: 'pending', detail: '—', durationMs: undefined },
      }).slice(0, 8),
    ],
    chunksIndexed: 0,
    embeddingModel: 'text-embedding-3-large',
    vectorDims: 3072,
    tablesDetected: 0,
    entities: [
      { kind: 'party', text: 'Chinedu Okonkwo', span: 'p.1' },
      { kind: 'date', text: '15 January 2025', span: 'p.2 ¶4' },
      { kind: 'court', text: 'FCT High Court (preview)', span: 'p.1 caption' },
    ],
    insights: [
      {
        id: 'w1',
        severity: 'info',
        title: 'Parsing in flight',
        body: 'Entity extraction re-runs after full embed — interim spans may shift ±1 paragraph.',
        evidence: 'Pipeline state: embed (active)',
      },
    ],
    evidence: [
      {
        id: 'we1',
        page: 3,
        paragraph: '¶12',
        quote: '…I was present when the agency officer stated allocation would follow ministerial approval…',
      },
    ],
    privilegeFlags: [{ label: 'Witness PII — masking rules applied', level: 'medium' }],
    pipelineNote: 'Embeddings at 66% — compare & cite locked until index completes.',
  },
  {
    id: 'doc-3',
    filename: 'CAMA_2020_Excerpt_Bundle.pdf',
    status: 'indexed',
    matterRef: 'CORP-ADV-009',
    uploadedAt: '2026-03-28T16:40:00.000Z',
    pages: 210,
    summary:
      'Curated CAMA 2020 excerpts: squeeze-out, fair value, minority protection — structured for statute retrieval + cross-links to SEC rules.',
    parseStages: stagesIndexed({
      structure: {
        state: 'done',
        detail: 'Statute hierarchy: Parts → Sections → subsections',
        durationMs: 12000,
      },
    }),
    chunksIndexed: 512,
    embeddingModel: 'text-embedding-3-large',
    vectorDims: 3072,
    tablesDetected: 6,
    entities: [
      { kind: 'statute', text: 'Companies and Allied Matters Act 2020', span: 'p.1' },
      { kind: 'statute', text: 's.353 — acquisition of shares of dissenting shareholders', span: 'p.118' },
      { kind: 'obligation', text: 'Fair value determination — independent valuer', span: 'p.121 §353(4)' },
      { kind: 'defined_term', text: 'squeeze-out', span: 'Index p.4' },
    ],
    insights: [
      {
        id: 'c1',
        severity: 'info',
        title: 'Crosswalk to SEC',
        body: 'Detected references to SEC Rules 2023 — mapping table generated for IC memo citations.',
        evidence: 'Auto-link table (demo)',
      },
    ],
    evidence: [
      {
        id: 'ce1',
        page: 121,
        paragraph: 's.353(3)',
        quote: '…the company may give notice to any dissenting shareholder that it intends to acquire the shares…',
      },
    ],
    privilegeFlags: [{ label: 'Public statute — no privilege', level: 'low' }],
  },
  {
    id: 'doc-4',
    filename: 'Court_of_Appeal_Judgment_Scan.tiff',
    status: 'failed',
    matterRef: 'SC-2023-901',
    uploadedAt: '2026-04-02T14:55:00.000Z',
    pages: 96,
    summary: 'Scanned judgment bundle — OCR confidence dropped below threshold on pages 14–18 (watermark bleed).',
    parseStages: [
      ...stagesIndexed({
        ingest: { state: 'done', detail: 'TIFF stack ingested', durationMs: 2100 },
        ocr: {
          state: 'error',
          detail: 'Mean confidence 0.71 < 0.85 — blocked for production index',
          durationMs: 45000,
        },
        layout: { state: 'pending', detail: '—', durationMs: undefined },
        structure: { state: 'pending', detail: '—', durationMs: undefined },
        chunk: { state: 'pending', detail: '—', durationMs: undefined },
        embed: { state: 'pending', detail: '—', durationMs: undefined },
        index: { state: 'pending', detail: '—', durationMs: undefined },
        audit: { state: 'pending', detail: '—', durationMs: undefined },
      }),
    ],
    chunksIndexed: 0,
    embeddingModel: '—',
    vectorDims: 0,
    tablesDetected: 0,
    entities: [
      { kind: 'court', text: 'Court of Appeal (header partial)', span: 'p.1 (low conf.)' },
    ],
    insights: [
      {
        id: 'f1',
        severity: 'risk',
        title: 'Remediation',
        body: 'Re-scan at 400 DPI grayscale or supply native PDF from registry — partial text retained for search preview only.',
        evidence: 'Ops playbook: OCR-REM-01',
      },
    ],
    evidence: [
      {
        id: 'fe1',
        page: 14,
        quote: '…[illegible]… injunction … [illegible]… balance of convenience…',
      },
    ],
    privilegeFlags: [{ label: 'Unverified text — do not cite in filings', level: 'high' }],
    pipelineNote: 'Failed gate at OCR — downstream stages skipped (chunk/embed/index).',
  },
  {
    id: 'doc-5',
    filename: 'Expert_report_geotech_redacted.pdf',
    status: 'queued',
    matterRef: 'PHC-2026-008',
    uploadedAt: '2026-04-03T07:30:00.000Z',
    pages: 55,
    summary: 'Queued behind two higher-priority bundles — estimated start in 6 minutes.',
    parseStages: [
      { id: 'ingest', label: 'Ingest', state: 'pending', detail: 'Waiting in queue (pos. 3)' },
      { id: 'ocr', label: 'OCR / text', state: 'pending', detail: '—' },
      { id: 'layout', label: 'Layout', state: 'pending', detail: '—' },
      { id: 'structure', label: 'Structure', state: 'pending', detail: '—' },
      { id: 'chunk', label: 'Chunk', state: 'pending', detail: '—' },
      { id: 'embed', label: 'Embed', state: 'pending', detail: '—' },
      { id: 'index', label: 'Index', state: 'pending', detail: '—' },
      { id: 'audit', label: 'Audit', state: 'pending', detail: '—' },
    ],
    chunksIndexed: 0,
    embeddingModel: 'text-embedding-3-large',
    vectorDims: 3072,
    tablesDetected: 0,
    entities: [],
    insights: [
      {
        id: 'q1',
        severity: 'info',
        title: 'Pre-scan',
        body: 'Detected 14 figure captions + 3 tables — layout model will prioritise table extraction when run starts.',
        evidence: 'Lightweight preflight (demo)',
      },
    ],
    evidence: [],
    privilegeFlags: [{ label: 'Expert — third-party confidential', level: 'high' }],
    pipelineNote: 'Job queued — no chunk or insight finalisation yet.',
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

/** Demo settings form (no auth / no API). */
export const mockSettingsDefaults = {
  firmName: 'My firm',
  fullName: 'Demo Counsel',
} as const

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

export function insightSeverityClass(sev: InsightSeverity) {
  switch (sev) {
    case 'risk':
      return 'border-red-500/35 bg-red-500/10 text-red-200/95'
    case 'warning':
      return 'border-gold/35 bg-gold/10 text-gold'
    case 'info':
      return 'border-primary/30 bg-primary/10 text-mist'
    default:
      return 'border-border bg-surface text-mist'
  }
}

export function entityKindLabel(k: EntityKind) {
  switch (k) {
    case 'party':
      return 'Party'
    case 'date':
      return 'Date'
    case 'clause':
      return 'Clause'
    case 'court':
      return 'Court'
    case 'statute':
      return 'Statute'
    case 'obligation':
      return 'Obligation'
    case 'defined_term':
      return 'Defined term'
    default:
      return k
  }
}
