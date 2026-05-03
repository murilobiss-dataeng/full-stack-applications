-- Core dimension: one row per source lawyer_id (FK hub for case_lawyer).
{{ config(materialized="view") }}

SELECT
    lawyer_id,
    full_name,
    name_canonical,
    resolved_entity_id,
    bar_state,
    practice_area
FROM {{ ref("lawyers_seed") }}
