"""Ensure documented warehouse DDL stays internally consistent."""

from src.database.models import ALL_DDL


def test_all_ddl_includes_core_and_meta_tables():
    assert "CREATE TABLE IF NOT EXISTS partners" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS hubs" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS orders" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS order_partner" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS resolved_entities" in ALL_DDL
    assert "CREATE TABLE IF NOT EXISTS ingestion_batch" in ALL_DDL


def test_order_partner_role_check_lists_marketplace_roles():
    assert "primary_merchant" in ALL_DDL
