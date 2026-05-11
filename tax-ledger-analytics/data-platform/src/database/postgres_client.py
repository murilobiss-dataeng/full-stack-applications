"""
PostgreSQL client with an in-memory simulation for local demos.

Optimization notes:
- Batch inserts reduce round trips vs row-by-row ``executemany`` in tight loops.
- For read-heavy dashboards, materialized views (refreshed by dbt) avoid scanning fact tables.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from src.utils.logger import get_logger

logger = get_logger(__name__)


@dataclass
class SimulatedPostgres:
    """Minimal CRUD simulation; swap for ``psycopg`` when a real DSN is available."""

    partners: dict[str, dict[str, Any]] = field(default_factory=dict)
    orders: dict[str, dict[str, Any]] = field(default_factory=dict)
    hubs: dict[str, dict[str, Any]] = field(default_factory=dict)
    order_partner: list[dict[str, Any]] = field(default_factory=list)

    def insert_partners_batch(self, rows: list[dict[str, Any]]) -> int:
        for row in rows:
            self.partners[row["partner_id"]] = dict(row)
        logger.info("db_insert", extra={"stage": "warehouse", "record_count": len(rows)})
        return len(rows)

    def insert_hubs_batch(self, rows: list[dict[str, Any]]) -> int:
        for row in rows:
            self.hubs[row["hub_id"]] = dict(row)
        return len(rows)

    def insert_orders_batch(self, rows: list[dict[str, Any]]) -> int:
        for row in rows:
            self.orders[row["order_id"]] = dict(row)
        return len(rows)

    def link_order_partner(self, order_id: str, partner_id: str, role: str) -> None:
        self.order_partner.append({"order_id": order_id, "partner_id": partner_id, "role": role})

    def query_orders_by_hub(self, hub_id: str) -> list[dict[str, Any]]:
        # Filter pushdown: in Postgres, idx_orders_hub_placed supports this predicate.
        return [o for o in self.orders.values() if o["hub_id"] == hub_id]

    def query_partner_performance(self, resolved_entity_id: str) -> list[dict[str, Any]]:
        partner_ids = {
            pid for pid, p in self.partners.items() if p.get("resolved_entity_id") == resolved_entity_id
        }
        results: list[dict[str, Any]] = []
        for link in self.order_partner:
            if link["partner_id"] in partner_ids:
                order = self.orders.get(link["order_id"])
                if order:
                    results.append({**link, **order})
        return results


def create_client(_dsn: str | None = None) -> SimulatedPostgres:
    return SimulatedPostgres()
