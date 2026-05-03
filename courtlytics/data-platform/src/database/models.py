"""
PostgreSQL logical schema for the legal warehouse.

Indexing strategy (B-tree unless noted):
- lawyers(lawyer_id) PK — clustered surrogate from source systems.
- lawyers(resolved_entity_id) — partial index for golden record joins.
- cases(case_id) PK; cases(court_id, filed_at) — common filter for docket analytics.
- case_lawyer(case_id, lawyer_id) composite PK prevents duplicate role rows.
- courts(court_id) PK; courts(state_code, tier) for regional dashboards.

Foreign keys enforce referential integrity at load time; in a lakehouse pattern,
dbt tests assert the same constraints on curated tables.
"""

from __future__ import annotations

LAWYERS_DDL = """
CREATE TABLE IF NOT EXISTS lawyers (
    lawyer_id         TEXT PRIMARY KEY,
    full_name         TEXT NOT NULL,
    name_canonical    TEXT NOT NULL,
    resolved_entity_id TEXT NOT NULL,
    bar_state         TEXT,
    practice_area     TEXT,
    created_at        TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_lawyers_resolved_entity
    ON lawyers (resolved_entity_id);
CREATE INDEX IF NOT EXISTS idx_lawyers_canonical_name
    ON lawyers (name_canonical);
"""

COURTS_DDL = """
CREATE TABLE IF NOT EXISTS courts (
    court_id    TEXT PRIMARY KEY,
    court_name  TEXT NOT NULL,
    state_code  CHAR(2) NOT NULL,
    tier        TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_courts_state_tier
    ON courts (state_code, tier);
"""

CASES_DDL = """
CREATE TABLE IF NOT EXISTS cases (
    case_id      TEXT PRIMARY KEY,
    court_id     TEXT NOT NULL REFERENCES courts(court_id),
    case_title   TEXT,
    filed_at     DATE NOT NULL,
    closed_at    DATE,
    outcome      TEXT,
    duration_days INTEGER
);
CREATE INDEX IF NOT EXISTS idx_cases_court_filed
    ON cases (court_id, filed_at DESC);
"""

CASE_LAWYER_DDL = """
CREATE TABLE IF NOT EXISTS case_lawyer (
    case_id   TEXT NOT NULL REFERENCES cases(case_id) ON DELETE CASCADE,
    lawyer_id TEXT NOT NULL REFERENCES lawyers(lawyer_id) ON DELETE CASCADE,
    role      TEXT NOT NULL CHECK (role IN ('lead', 'co_counsel', 'local_counsel')),
    PRIMARY KEY (case_id, lawyer_id, role)
);
CREATE INDEX IF NOT EXISTS idx_case_lawyer_lawyer
    ON case_lawyer (lawyer_id);
"""

RESOLVED_ENTITIES_DDL = """
CREATE TABLE IF NOT EXISTS resolved_entities (
    resolved_entity_id TEXT PRIMARY KEY,
    display_name       TEXT NOT NULL,
    member_lawyer_count INTEGER NOT NULL DEFAULT 0,
    max_confidence     NUMERIC(6,4),
    updated_at         TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_resolved_entities_display
    ON resolved_entities (display_name);
"""

INGESTION_BATCH_DDL = """
CREATE TABLE IF NOT EXISTS ingestion_batch (
    batch_id      TEXT PRIMARY KEY,
    resource      TEXT NOT NULL,
    started_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    finished_at   TIMESTAMPTZ,
    rows_in       INTEGER,
    rows_staged   INTEGER,
    rows_curated  INTEGER,
    status        TEXT NOT NULL CHECK (status IN ('running', 'succeeded', 'failed', 'partial')),
    error_code    TEXT
);
CREATE INDEX IF NOT EXISTS idx_ingestion_batch_status
    ON ingestion_batch (status, started_at DESC);
"""

ALL_DDL = "\n".join(
    [LAWYERS_DDL, COURTS_DDL, CASES_DDL, CASE_LAWYER_DDL, RESOLVED_ENTITIES_DDL, INGESTION_BATCH_DDL],
)
