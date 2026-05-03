from src.processing.normalization import normalize_record_fields, standardize_person_name


def test_standardize_person_name_trims_and_lowercases():
    assert standardize_person_name("  John   Smith  ") == "john smith"


def test_standardize_strips_dr_prefix():
    assert standardize_person_name("Dr. Jane Roe").startswith("jane")


def test_normalize_record_fields_sets_canonical():
    rec = {"lawyer_id": "x", "full_name": "Jonathan A Smith"}
    out = normalize_record_fields(rec)
    assert "name_canonical" in out
    assert "jonathan" in out["name_canonical"]
