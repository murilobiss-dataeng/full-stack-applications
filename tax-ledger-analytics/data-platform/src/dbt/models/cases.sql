{{ config(materialized="view") }}

SELECT
    case_id,
    court_id,
    case_title,
    NULLIF(TRIM(filed_at::text), "")::date AS filed_at,
    NULLIF(TRIM(closed_at::text), "")::date AS closed_at,
    NULLIF(TRIM(outcome::text), "") AS outcome,
    NULLIF(TRIM(duration_days::text), "")::integer AS duration_days
FROM {{ ref("cases_seed") }}
