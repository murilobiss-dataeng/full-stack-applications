"""Fuzzy entity resolution for counterparty / party identities (demo uses lawyer-shaped records)."""

from __future__ import annotations

from difflib import SequenceMatcher
from uuid import uuid4

from .normalization import standardize_person_name


def _score(a: str, b: str) -> float:
    return SequenceMatcher(None, a, b).ratio()


def resolve_lawyer_entities(
    records: list[dict],
    *,
    similarity_threshold: float = 0.78,
    token_subset_boost: bool = True,
) -> list[dict]:
    """
    Assign ``resolved_entity_id`` so variants like "John Smith", "J. Smith" collapse.

    Greedy clustering: each record joins the best existing cluster or starts a new one.
    """
    enriched: list[dict] = []
    clusters: list[dict] = []  # {id, canonical, members}

    def tokens(s: str) -> set[str]:
        return {t for t in s.split() if len(t) > 1}

    for raw in records:
        rec = dict(raw)
        name = rec.get("name_canonical") or standardize_person_name(
            str(rec.get("full_name", ""))
        )
        best_idx = -1
        best_score = 0.0
        for i, c in enumerate(clusters):
            s = _score(name, c["canonical"])
            if token_subset_boost:
                ta, tb = tokens(name), tokens(c["canonical"])
                if ta and tb and (ta <= tb or tb <= ta):
                    s = max(s, min(1.0, s + 0.12))
            if s > best_score:
                best_score = s
                best_idx = i

        if best_idx >= 0 and best_score >= similarity_threshold:
            cid = clusters[best_idx]["id"]
            clusters[best_idx]["members"].append(name)
        else:
            cid = str(uuid4())
            clusters.append({"id": cid, "canonical": name, "members": [name]})

        rec["resolved_entity_id"] = cid
        rec["resolution_confidence"] = round(best_score, 4) if best_idx >= 0 else 1.0
        enriched.append(rec)

    return enriched
