"""Duplicate detection using normalized keys and similarity."""

from __future__ import annotations

from difflib import SequenceMatcher
from typing import Iterable

from .normalization import standardize_person_name


def similarity_ratio(a: str, b: str) -> float:
    return SequenceMatcher(None, a, b).ratio()


def find_duplicate_groups(
    records: list[dict],
    *,
    key_field: str = "name_canonical",
    threshold: float = 0.92,
) -> list[list[int]]:
    """
    Group record indices that likely refer to the same entity.

    Uses transitive closure on pairs above ``threshold`` on the canonical name field.
    """
    n = len(records)
    parents = list(range(n))

    def find(x: int) -> int:
        while parents[x] != x:
            parents[x] = parents[parents[x]]
            x = parents[x]
        return x

    def union(a: int, b: int) -> None:
        ra, rb = find(a), find(b)
        if ra != rb:
            parents[rb] = ra

    keys: list[str] = []
    for r in records:
        raw = r.get(key_field) or standardize_person_name(str(r.get("full_name", "")))
        keys.append(raw)

    for i in range(n):
        for j in range(i + 1, n):
            if similarity_ratio(keys[i], keys[j]) >= threshold:
                union(i, j)

    buckets: dict[int, list[int]] = {}
    for i in range(n):
        root = find(i)
        buckets.setdefault(root, []).append(i)

    return [sorted(v) for v in buckets.values() if len(v) > 1]


def flag_duplicates(records: list[dict], **kwargs) -> list[dict]:
    """Attach duplicate_group_id to records based on detected groups."""
    groups = find_duplicate_groups(records, **kwargs)
    out = [dict(r) for r in records]
    for gid, idxs in enumerate(groups):
        for i in idxs:
            out[i]["duplicate_group_id"] = gid
    return out
