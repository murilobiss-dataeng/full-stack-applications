"""String normalization for legal entity fields."""

from __future__ import annotations

import re
import unicodedata


def normalize_whitespace(value: str) -> str:
    return re.sub(r"\s+", " ", value.strip())


def normalize_unicode(value: str) -> str:
    return unicodedata.normalize("NFKC", value)


def standardize_person_name(value: str) -> str:
    """Lowercase, trim, collapse spaces, and strip honorific noise for matching."""
    v = normalize_unicode(value)
    v = normalize_whitespace(v.lower())
    v = re.sub(r"^(mr|mrs|ms|dr|esq)\.\s+", "", v)
    return v


def normalize_record_fields(record: dict) -> dict:
    """Apply normalization to known string keys on a lawyer-like record."""
    out = dict(record)
    for key in ("full_name", "display_name", "court_name", "case_title"):
        if key in out and isinstance(out[key], str):
            out[key] = normalize_whitespace(normalize_unicode(out[key]))
    if "full_name" in out and isinstance(out["full_name"], str):
        out["name_canonical"] = standardize_person_name(out["full_name"])
    return out
