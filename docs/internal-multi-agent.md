# Savvy Legalis — multi-agent architecture

This document aligns the LangGraph-oriented backend with the product plan (Hebbia-like inspectability, Legora-like workflows).

## Layers

1. **Orchestration** — Route intent to domain graphs; shared **hallucination guard** (citation + source presence) before returning to clients.
2. **Domain graphs** — `ResearchGraph`, `ReviewGraph`, `DraftGraph`, `IngestMetadataGraph` under `apps/api/app/services/ai/`.
3. **Tools** — Hybrid retrieval (`retrieve_chunks`, Typesense keyword), document parse/chunk access, **citation validator** (`citation_validator.py`), playbook engine (draft).

## Research path

- **API:** `POST /api/v1/research/sessions` → `run_research_session`.
- **Flow:** embed query → vector similarity over firm chunks → Typesense keyword → LLM synthesis with bracket citations → `verification_from_sources` → persist `ResearchCitation` rows + **audit log** entry.
- **Graph scaffold:** `research_graph.py` compiles a minimal LangGraph for LangSmith thread wiring; extend with explicit nodes: `retrieve_hybrid` → `synthesize` → `validate_citations`.

## Review path

- Celery `run_review_job_task`: per row/column LLM extraction with JSON value + confidence; results in `ReviewCell` for grid + XLSX export.

## Draft path

- `DraftSession` + messages; `complete_chat` for assistant turns; playbook list via `/api/v1/playbooks`.

## Observability

- Set `LANGCHAIN_TRACING_V2=true` and `LANGCHAIN_API_KEY` for LangSmith. Optionally store `langsmith_run_id` on `AuditLog` when graphs emit run IDs.

## Tenant safety

- All routers use `CurrentUser` with `firm_id`. For database-level isolation, enable PostgreSQL RLS on `documents`, `chunks`, `matters`, etc., with `firm_id = current_setting('app.current_firm_id')::uuid` set per request in middleware (production hardening).
