/**
 * Clickable matters (dossier documents) + research corpus / runtime (demo MVP).
 */

import type { MatterStatus, MockResearchSource } from '@/mocks/workspace'

export type MatterDocKind = 'pleading' | 'evidence' | 'statute' | 'correspondence' | 'bundle'

export type MatterDocument = {
  id: string
  filename: string
  kind: MatterDocKind
  pages: number
  status: 'indexed' | 'review' | 'processing'
  addedAt: string
  summary: string
  /** Opens in viewer — synthetic legal-style text for demo */
  fullText: string
}

export type MockMatterWithDocs = {
  id: string
  ref: string
  title: string
  court: string
  jurisdiction: string
  status: MatterStatus
  summary: string
  updatedAt: string
  documents: MatterDocument[]
}

export const mockMatters: MockMatterWithDocs[] = [
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
    documents: [
      {
        id: 'm1-d1',
        filename: 'Mutual_NDA_2024_executed.pdf',
        kind: 'bundle',
        pages: 42,
        status: 'indexed',
        addedAt: '2026-03-15',
        summary: 'Executed mutual confidentiality; Schedules A–C; FHC Lagos jurisdiction clause.',
        fullText: `MUTUAL NON-DISCLOSURE AGREEMENT\n\nThis Agreement is made on 12 March 2024 between Lagos Port Authority (“LPA”) and Berth Contractors Ltd (“BCL”).\n\n1. DEFINITIONS\n“Confidential Information” means all technical, commercial, and operational information disclosed in connection with the berth concession review, whether marked confidential or not, including berth throughput data and concession maps referenced in Schedule A.\n\n2. OBLIGATIONS\nEach party shall use Confidential Information solely for the Purpose and shall not disclose it to any third party except as required by law or with prior written consent.\n\n3. GOVERNING LAW\nThis Agreement shall be governed by the laws of the Federal Republic of Nigeria. The parties submit to the exclusive jurisdiction of the Federal High Court, Lagos Division.\n\n4. FORCE MAJEURE\nNeither party shall be liable for delay caused by government directive or port closure where such event is beyond the reasonable control of the affected party and notice is given within five (5) business days.\n\n[End extract — demo text]`,
      },
      {
        id: 'm1-d2',
        filename: 'Motion_on_notice_injunction.docx',
        kind: 'pleading',
        pages: 8,
        status: 'indexed',
        addedAt: '2026-03-28',
        summary: 'Interlocutory injunction to restrain use/disclosure of Schedule A materials.',
        fullText: `IN THE FEDERAL HIGH COURT OF NIGERIA\nIN THE LAGOS JUDICIAL DIVISION\n\nMOTION ON NOTICE\n\nTAKE NOTICE that this Honourable Court will be moved for an order of interlocutory injunction restraining the Defendant from further use or disclosure of confidential information identified in the Claimant’s bundle pending trial.\n\nGROUNDS\n1. The Claimant has a serious issue to be tried on the construction of the NDA dated 12 March 2024.\n2. The Claimant will suffer irreparable harm absent injunctive relief; damages are inadequate.\n3. The balance of justice favours preserving the subject matter of the dispute.\n\nPRAYER\nAn order of interlocutory injunction in terms of the draft attached.\n\n[Demo extract]`,
      },
      {
        id: 'm1-d3',
        filename: 'Expert_note_berth_capacity.pdf',
        kind: 'evidence',
        pages: 24,
        status: 'review',
        addedAt: '2026-04-01',
        summary: 'Civil engineer opinion on berth throughput and delay attribution.',
        fullText: `EXPERT REPORT (REDACTED HEADER)\n\n1. INTRODUCTION\nI have been instructed to provide an opinion on berth capacity utilisation and whether operational delays in Q4 2023 are consistent with force majeure as pleaded by the Defendant.\n\n2. METHODOLOGY\nI reviewed berth logs (Bundle C), weather advisories, and LPA circulars dated September–November 2023.\n\n3. OPINION\nBerth idle time attributable to weather alone accounts for approximately 11% of lost throughput in the period; the remainder correlates with equipment redeployment following agency directives referenced in exhibit CE-4.\n\n4. CONCLUSION\nAttribution of delay solely to weather would, on the materials reviewed, require cross-examination of the Defendant’s factual witnesses.\n\n[Demo — not legal advice]`,
      },
      {
        id: 'm1-d4',
        filename: 'LPA_Internal_email_chain.msg',
        kind: 'correspondence',
        pages: 6,
        status: 'indexed',
        addedAt: '2026-03-20',
        summary: 'Internal coordination on privilege marking for strategy notes.',
        fullText: `From: General Counsel, LPA\nTo: External counsel\nSubject: Privilege review — concession bundle\n\nPlease confirm Schedule B commentary is circulated under legal advice privilege only. Board summaries in /Annex 2/ should not be uploaded to the shared diligence room until redacted.\n\nWe will align the IC pack with the FHC timetable once hearing dates are confirmed.\n\n[Demo correspondence]`,
      },
    ],
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
    documents: [
      {
        id: 'm2-d1',
        filename: 'Originating_summons_JR.pdf',
        kind: 'pleading',
        pages: 22,
        status: 'indexed',
        addedAt: '2026-02-10',
        summary: 'Judicial review of allocation decision; grounds of illegality and procedural unfairness.',
        fullText: `ORIGINATING SUMMONS\n\nThe Applicant seeks an order of certiorari to quash the decision of the Agency dated 18 December 2024 refusing the allocation application reference FCT/LA/8842.\n\nGROUND 1 — JURISDICTION\nThe decision-maker acted ultra vires the enabling regulations by applying criteria not published in the gazetted guidelines.\n\nGROUND 2 — FAIR HEARING\nThe Applicant was not afforded a reasonable opportunity to respond to adverse material relied upon in the panel recommendation.\n\nGROUND 3 — REASONS\nThe letter of rejection does not disclose identifiable reasons capable of review by this Honourable Court.\n\nRELIEFS SOUGHT\nSuch further or other relief as the Court may deem fit.\n\n[Demo extract]`,
      },
      {
        id: 'm2-d2',
        filename: 'Witness_statement_Okonkwo.docx',
        kind: 'evidence',
        pages: 18,
        status: 'processing',
        addedAt: '2026-03-30',
        summary: 'First-hand account of meetings with agency officers re: ministerial approval.',
        fullText: `WITNESS STATEMENT OF CHINEDU OKONKWO\n\n1. I am a director of the Applicant company and make this statement from personal knowledge.\n\n2. On 15 January 2025 I attended a meeting at the Agency offices where an officer stated that allocation would follow “ministerial approval in the ordinary course.”\n\n3. I understood that to mean our pending application would be determined under the published timetable; I was not informed of any undisclosed quota policy.\n\n4. The refusal letter dated 18 December 2024 did not refer to the panel minutes I later obtained under FOIA request ref. …\n\n[Demo — witness text]`,
      },
      {
        id: 'm2-d3',
        filename: 'Nigeria_Constitution_1999_s36_excerpt.pdf',
        kind: 'statute',
        pages: 4,
        status: 'indexed',
        addedAt: '2026-01-05',
        summary: 'Fair hearing — s.36(1) citation bundle.',
        fullText: `CONSTITUTION OF THE FEDERAL REPUBLIC OF NIGERIA 1999 (AS AMENDED)\n\nSection 36\n(1) In the determination of his civil rights and obligations, including any question or determination by or against any government or authority, a person shall be entitled to a fair hearing within a reasonable time by a court or other tribunal established by law and constituted in such manner as to secure its independence and impartiality.\n\n[Extract for demo research linkage]`,
      },
      {
        id: 'm2-d4',
        filename: 'Agency_panel_minutes_redacted.pdf',
        kind: 'evidence',
        pages: 31,
        status: 'review',
        addedAt: '2026-03-12',
        summary: 'Panel scoring matrix — partial redactions under ongoing disclosure dispute.',
        fullText: `CONFIDENTIAL — PANEL MINUTES (REDACTED)\n\nMeeting date: …\nAttendees: …\n\nThe panel noted comparator applications scored higher on “community impact” criteria. The Applicant’s score on criterion 4 was adjusted downward after oral submissions were closed.\n\nAction: Legal to confirm whether post-closure adjustment breaches the Agency’s published procedure.\n\n[Demo]`,
      },
    ],
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
    documents: [
      {
        id: 'm3-d1',
        filename: 'Board_memo_squeeze_out.pdf',
        kind: 'correspondence',
        pages: 9,
        status: 'indexed',
        addedAt: '2026-03-18',
        summary: 'Board summary of s.353 pathway and SEC filing timeline.',
        fullText: `BOARD MEMORANDUM — STRICTLY PRIVATE\n\nSubject: Minority squeeze-out — preliminary compliance map\n\nManagement proposes to proceed under CAMA 2020 sections 353–355 subject to independent valuation and SEC notifications as applicable to listed entities.\n\nCounsel to confirm: (i) 21-day notice period; (ii) dissenting shareholder rights; (iii) fair value mechanics where expert disagreement arises.\n\n[Demo]`,
      },
      {
        id: 'm3-d2',
        filename: 'CAMA_2020_s353-355.pdf',
        kind: 'statute',
        pages: 12,
        status: 'indexed',
        addedAt: '2026-02-01',
        summary: 'Statute extracts with internal margin notes.',
        fullText: `COMPANIES AND ALLIED MATTERS ACT 2020 — EXTRACT\n\nSection 353 — Power to acquire shares of dissenting shareholders\n…\nSection 354 — Application to Court for cancellation\n…\nSection 355 — Powers of Court to approve arrangement\n…\n\n[Demo statutory extract — not authoritative]`,
      },
      {
        id: 'm3-d3',
        filename: 'Valuation_instructions_to_expert.docx',
        kind: 'correspondence',
        pages: 5,
        status: 'indexed',
        addedAt: '2026-03-22',
        summary: 'Letter of instruction to independent valuer (redacted consideration range).',
        fullText: `We instruct you to opine on fair value of the minority shares as at the valuation date, assuming a willing buyer/willing seller and using methodologies acceptable to the Commission’s rules.\n\nPlease coordinate with auditors for non-public financials under NDA.\n\n[Demo]`,
      },
      {
        id: 'm3-d4',
        filename: 'SEC_rules_crosswalk.xlsx',
        kind: 'bundle',
        pages: 1,
        status: 'review',
        addedAt: '2026-03-25',
        summary: 'Tabular crosswalk CAMA notices vs SEC filing obligations.',
        fullText: `[Exported text representation]\n\nColumn A: Notice type | Column B: CAMA ref | Column C: SEC rule | Column D: Owner | Column E: Due date\nRow 2: Intention notice | s.353 | Rule … | Co Sec | T+5\n…\n\n[Demo spreadsheet export]`,
      },
    ],
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
    documents: [
      {
        id: 'm4-d1',
        filename: 'Statement_of_claim.pdf',
        kind: 'pleading',
        pages: 28,
        status: 'indexed',
        addedAt: '2026-03-01',
        summary: 'Pleadings on defective works and indemnity chain.',
        fullText: `STATEMENT OF CLAIM\n\nThe Claimant sues for breach of contract and negligence arising from civil works performed at the site.\n\nPARTICULARS OF BREACH\nThe Defendant failed to execute works in accordance with IFC drawings dated …\n\nThe Claimant will rely on the indemnity clause in the main contract at clause 18 and the sub-contractor back-to-back obligations at schedule 4.\n\n[Demo]`,
      },
      {
        id: 'm4-d2',
        filename: 'Subcontract_indemnity_clause_compare.pdf',
        kind: 'bundle',
        pages: 14,
        status: 'indexed',
        addedAt: '2026-03-10',
        summary: 'Side-by-side indemnity language across three tiers.',
        fullText: `COMPARISON MEMO\n\nTier 1 main contract: “The Contractor shall indemnify the Employer against all losses arising from the Contractor’s acts or omissions…”\n\nTier 2 sub-contract: “The Sub-Contractor shall indemnify the Contractor on a full indemnity basis…”\n\nTier 3 supplier: Limited indemnity capped at contract sum.\n\nIssue: Whether cascade failures expose the Employer beyond primary layer.\n\n[Demo]`,
      },
      {
        id: 'm4-d3',
        filename: 'Site_photo_log.zip',
        kind: 'evidence',
        pages: 40,
        status: 'review',
        addedAt: '2026-03-15',
        summary: 'Date-stamped photographs — OCR summary below.',
        fullText: `[OCR summary of exhibit bundle]\n\nImage set A: cracking pattern along beam B-17 (north elevation).\nImage set B: drainage trench backfill non-conformance with spec section 9.2.\n\nExpert linkage: cross-reference geotech report PHC-2026-008/EX-3.\n\n[Demo]`,
      },
      {
        id: 'm4-d4',
        filename: 'HSE_notice_to_contractor.eml',
        kind: 'correspondence',
        pages: 3,
        status: 'indexed',
        addedAt: '2026-03-18',
        summary: 'Regulator-style site notice (simulated) re: method statement.',
        fullText: `Subject: Method statement revision — crane lift Plan C\n\nPlease submit revised lift plan before 08:00 Monday. Work in sector 2 remains suspended until sign-off.\n\n[Demo correspondence]`,
      },
    ],
  },
]

/** Research corpus — selectable; full text opens in viewer */
export type ResearchCorpusItem = {
  id: string
  title: string
  citation: string
  excerpt: string
  fullText: string
}

export const mockResearchCorpus: ResearchCorpusItem[] = [
  {
    id: 'rc1',
    title: 'Kotoye v. Saraki — interlocutory injunction principles',
    citation: '(1994) NWLR (Pt. 351) 256',
    excerpt:
      'The essence of an interlocutory injunction is to preserve the res and maintain the status quo—not to determine final rights.',
    fullText: `KOTOYE v. SARAKI (1994) NWLR (Pt. 351) 256 — DEMO EXTRACT\n\nThe Supreme Court reiterated that interlocutory relief is discretionary and aimed at preventing irreparable mischief pending the determination of rights at trial.\n\nThe applicant must demonstrate a prima facie case, balance of convenience, and that damages would not be an adequate remedy.\n\nCourts are cautious not to use interlocutory orders to pre-empt final determination or to grant relief that effectively decides the substantive suit.\n\n[Paraphrased headnote-style text for product demo — not a substitute for authority]`,
  },
  {
    id: 'rc2',
    title: 'FBN v. Maiwada — balance of convenience',
    citation: '(2018) LPELR-44392(SC)',
    excerpt:
      'Balance of convenience is weighed alongside irreparable injury and the court’s discretion to prevent injustice.',
    fullText: `FBN v. MAIWADA — DEMO EXTRACT\n\nThe Court considered whether the lower court properly evaluated the balance of convenience where both parties alleged irreparable harm.\n\nThe judgment discusses the weight to be attached to preserving the subject matter of litigation and avoiding a fait accompli that could render the trial nugatory.\n\nPractitioners should particularise prejudice with reference to affidavit evidence and disclosed documents.\n\n[Demo]`,
  },
  {
    id: 'rc3',
    title: 'FHC Civil Procedure — Practice Direction 2023 (injunctions)',
    citation: 'FHC PD 2023 (extract)',
    excerpt: 'Affidavit evidence must particularise urgency, likelihood of success, and harm if relief is refused.',
    fullText: `FEDERAL HIGH COURT — PRACTICE DIRECTION (EXTRACT — DEMO)\n\nApplications for interlocutory injunctions shall be supported by affidacts verifying facts relied upon and exhibiting key documents.\n\nWhere urgency is claimed, the applicant shall depose to efforts made to give notice to the respondent unless a convincing case for ex parte relief is made.\n\n[Not an official reproduction]`,
  },
  {
    id: 'rc4',
    title: 'Constitution of Nigeria 1999 — fair hearing (s.36)',
    citation: '1999 Constitution s.36(1)',
    excerpt: 'Fair hearing within a reasonable time before an independent tribunal.',
    fullText: `SECTION 36 (EXTRACT)\n\n(1) In the determination of his civil rights and obligations… a person shall be entitled to a fair hearing within a reasonable time by a court or other tribunal established by law…\n\n[Demo — see official gazette for authoritative text]`,
  },
  {
    id: 'rc5',
    title: 'CAMA 2020 — minority squeeze-out (s.353 overview)',
    citation: 'CAMA 2020 s.353 (demo summary)',
    excerpt: 'Acquisition of shares of dissenting shareholders subject to statutory conditions.',
    fullText: `CAMA 2020 — DEMO SUMMARY NOTE\n\nSection 353 addresses scenarios where a company proposes to acquire shares of shareholders who dissent from a scheme or contract.\n\nIndependent valuation and court involvement may be required depending on the pathway chosen and whether the company is listed.\n\n[High-level demo text — instruct counsel for transaction-specific advice]`,
  },
  {
    id: 'rc6',
    title: 'Law of Contract (Nigeria) — consideration & privity (primer)',
    citation: 'General contract principles (demo primer)',
    excerpt: 'Basic building blocks for analysing contractual indemnities and third-party reliance.',
    fullText: `PRIMER (DEMO)\n\nConsideration, privity, and implied terms interact with express indemnity clauses in construction chains.\n\nWhere sub-contracts purport to mirror head-contract obligations, courts examine the intention of the parties and the precise wording of cascade clauses.\n\n[Educational demo content only]`,
  },
]

export type ResearchRunResult = {
  answer: string
  sources: MockResearchSource[]
}

function joinWithCitations(sentences: string[], max: number) {
  const n = Math.min(max, sentences.length)
  return sentences.slice(0, n).join(' ')
}

export function runMockResearch(selectedCorpusIds: string[], query: string): ResearchRunResult | null {
  const q = query.trim()
  if (selectedCorpusIds.length === 0 || !q) return null

  const corpus = mockResearchCorpus.filter((c) => selectedCorpusIds.includes(c.id))
  if (corpus.length === 0) return null

  const sources: MockResearchSource[] = corpus.slice(0, 4).map((c, i) => ({
    id: `sr-${i + 1}`,
    citation: `${c.title} — ${c.citation}`,
    excerpt: c.excerpt,
  }))

  const k = sources.length
  const low = q.toLowerCase()

  let pool: string[]
  if (low.includes('injunction') || low.includes('interlocutory') || low.includes('balance of convenience')) {
    pool = [
      'Nigerian courts grant interlocutory injunctions where there is a serious question to be tried and irreparable harm not compensable in damages [1].',
      'The balance of convenience is weighed with the risk of injustice if relief is refused [2].',
      'Affidavits should particularise urgency and tie harm to disclosed documents [3].',
      'Ex parte relief remains exceptional; notice to the respondent is expected unless urgency is strictly proven [4].',
    ]
  } else if (low.includes('fair hearing') || low.includes('section 36') || low.includes('natural justice')) {
    pool = [
      'Section 36(1) requires a fair hearing before an independent tribunal within a reasonable time [1].',
      'Procedural fairness in administrative decisions may require disclosure of adverse material [2].',
      'Compare agency minutes to published criteria the applicant relied upon [3].',
      'Remedies may include certiorari or declaratory relief depending on the record [4].',
    ]
  } else if (low.includes('cama') || low.includes('squeeze') || low.includes('minority')) {
    pool = [
      'CAMA squeeze-out paths require compliance with notice, valuation, and applicable SEC rules where relevant [1].',
      'Board documentation should show commercial rationale and fair value methodology [2].',
      'Dissenting shareholder rights and court applications under the Act must be tracked in parallel [3].',
      'Transaction indemnities should be checked against funding and MAC clauses [4].',
    ]
  } else if (low.includes('indemnity') || low.includes('contract') || low.includes('construction')) {
    pool = [
      'Indemnity scope turns on express wording, consideration, and parties covered [1].',
      'Multi-tier construction contracts need comparison of caps, carve-outs, and notices [2].',
      'Site evidence and regulator letters should map to pleaded breaches [3].',
      'Expert evidence may be needed on causation of defects [4].',
    ]
  } else {
    pool = [
      'Lead with the strongest authority in your selected corpus [1].',
      'Layer supporting principles and statutory hooks next [2].',
      'Tether each advice paragraph to a verifiable citation [3].',
      'Flag factual gaps and recommend disclosure or experts explicitly [4].',
    ]
  }

  const answer = joinWithCitations(pool, k)

  return { answer, sources }
}
