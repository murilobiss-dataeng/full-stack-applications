from src.processing.deduplication import find_duplicate_groups, similarity_ratio


def test_similarity_ratio_identical():
    assert similarity_ratio("acme corp", "acme corp") == 1.0


def test_find_duplicate_groups_collapses_identical_canonical():
    records = [
        {"partner_id": "a", "name_canonical": "acme legal llc"},
        {"partner_id": "b", "name_canonical": "acme legal llc"},
    ]
    groups = find_duplicate_groups(records, threshold=0.99)
    assert [0, 1] in groups or groups == [[0, 1]]
