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

    lawyers: dict[str, dict[str, Any]] = field(default_factory=dict)
    cases: dict[str, dict[str, Any]] = field(default_factory=dict)
    courts: dict[str, dict[str, Any]] = field(default_factory=dict)
    case_lawyer: list[dict[str, Any]] = field(default_factory=list)

    def insert_lawyers_batch(self, rows: list[dict[str, Any]]) -> int:
        for row in rows:
            self.lawyers[row["lawyer_id"]] = dict(row)
        logger.info("db_insert", extra={"stage": "warehouse", "record_count": len(rows)})
        return len(rows)

    def insert_courts_batch(self, rows: list[dict[str, Any]]) -> int:
        for row in rows:
            self.courts[row["court_id"]] = dict(row)
        return len(rows)

    def insert_cases_batch(self, rows: list[dict[str, Any]]) -> int:
        for row in rows:
            self.cases[row["case_id"]] = dict(row)
        return len(rows)

    def link_case_lawyer(self, case_id: str, lawyer_id: str, role: str) -> None:
        self.case_lawyer.append({"case_id": case_id, "lawyer_id": lawyer_id, "role": role})

    def query_cases_by_court(self, court_id: str) -> list[dict[str, Any]]:
        # Filter pushdown: in Postgres, idx_cases_court_filed supports this predicate.
        return [c for c in self.cases.values() if c["court_id"] == court_id]

    def query_lawyer_performance(self, resolved_entity_id: str) -> list[dict[str, Any]]:
        lawyer_ids = {
            lid for lid, l in self.lawyers.items() if l.get("resolved_entity_id") == resolved_entity_id
        }
        results: list[dict[str, Any]] = []
        for link in self.case_lawyer:
            if link["lawyer_id"] in lawyer_ids:
                case = self.cases.get(link["case_id"])
                if case:
                    results.append({**link, **case})
        return results


def create_client(_dsn: str | None = None) -> SimulatedPostgres:
    return SimulatedPostgres()
