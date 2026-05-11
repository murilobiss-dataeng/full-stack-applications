"""Ensure documented warehouse DDL stays internally consistent."""

from src.database.models import ALL_DDL


def test_all_ddl_includes_core_and_meta_tables():
    assert "CREATE TABLE IF NOT EXISTS lawyers" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS courts" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS cases" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS case_lawyer" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS resolved_entities" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS ingestion_batch" in ALL_DDL


def test_case_lawyer_role_check_lists_professional_roles():
    assert "local_counsel" in ALL_DDL
