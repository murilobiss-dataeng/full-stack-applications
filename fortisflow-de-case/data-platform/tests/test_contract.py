from __future__ import annotations

import json
from pathlib import Path

import pytest

from src.pipeline.__main__ import resolve_mock_path, validate_contract


def test_mock_file_exists():
    p = resolve_mock_path()
    assert p.is_file(), f"expected mock at {p}"


def test_contract_validates():
    p = resolve_mock_path()
    data = json.loads(p.read_text(encoding="utf-8"))
    validate_contract(data)


def test_partial_mock_has_pipeline_core():
    """web/public/mock/pipeline-metrics.json may be a short sample; still require pipeline core."""
    p = resolve_mock_path()
    data = json.loads(p.read_text(encoding="utf-8"))
    assert "pipeline" in data
    assert data["pipeline"].get("validationPassRate") is not None
