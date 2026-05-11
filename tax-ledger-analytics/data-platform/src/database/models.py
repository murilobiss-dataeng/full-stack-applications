"""
PostgreSQL logical schema for the DoorRush marketplace warehouse (partners, hubs, orders).

Indexing strategy (B-tree unless noted):
- partners(partner_id) PK — clustered surrogate from source systems.
- partners(resolved_entity_id) — partial index for golden record joins.
- orders(order_id) PK; orders(hub_id, placed_at) — common filter for SLA / tax windows.
- order_partner(order_id, partner_id) composite PK prevents duplicate role rows per grain.
- hubs(hub_id) PK; hubs(region_code, tier) for regional dashboards.

Foreign keys enforce referential integrity at load time; in a lakehouse pattern,
dbt tests assert the same constraints on curated tables.
"""

from __future__ import annotations

PARTNERS_DDL = """
CREATE TABLE IF NOT EXISTS partners (
    partner_id         TEXT PRIMARY KEY,
    full_name          TEXT NOT NULL,
    name_canonical     TEXT NOT NULL,
    resolved_entity_id TEXT NOT NULL,
    hub_region          TEXT,
    partner_category    TEXT,
    created_at         TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_partners_resolved_entity
    ON partners (resolved_entity_id);
CREATE INDEX IF NOT EXISTS idx_partners_canonical_name
    ON partners (name_canonical);
"""

HUBS_DDL = """
CREATE TABLE IF NOT EXISTS hubs (
    hub_id     TEXT PRIMARY KEY,
    hub_name   TEXT NOT NULL,
    region_code CHAR(2) NOT NULL,
    tier       TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_hubs_region_tier
    ON hubs (region_code, tier);
"""

ORDERS_DDL = """
CREATE TABLE IF NOT EXISTS orders (
    order_id      TEXT PRIMARY KEY,
    hub_id        TEXT NOT NULL REFERENCES hubs(hub_id),
    order_ref     TEXT,
    placed_at     DATE NOT NULL,
    delivered_at  DATE,
    status        TEXT,
    sla_days      INTEGER
);
CREATE INDEX IF NOT EXISTS idx_orders_hub_placed
    ON orders (hub_id, placed_at DESC);
"""

ORDER_PARTNER_DDL = """
CREATE TABLE IF NOT EXISTS order_partner (
    order_id    TEXT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    partner_id  TEXT NOT NULL REFERENCES partners(partner_id) ON DELETE CASCADE,
    role        TEXT NOT NULL CHECK (role IN ('primary_merchant', 'co_partner', 'backup')),
    PRIMARY KEY (order_id, partner_id, role)
);
CREATE INDEX IF NOT EXISTS idx_order_partner_partner
    ON order_partner (partner_id);
"""

RESOLVED_ENTITIES_DDL = """
CREATE TABLE IF NOT EXISTS resolved_entities (
    resolved_entity_id   TEXT PRIMARY KEY,
    display_name         TEXT NOT NULL,
    member_partner_count INTEGER NOT NULL DEFAULT 0,
    max_confidence       NUMERIC(6,4),
    updated_at           TIMESTAMPTZ DEFAULT NOW()
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
    [PARTNERS_DDL, HUBS_DDL, ORDERS_DDL, ORDER_PARTNER_DDL, RESOLVED_ENTITIES_DDL, INGESTION_BATCH_DDL],
)
