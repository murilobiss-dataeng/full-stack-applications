-- dbt model: court-level case aggregates (incremental pattern can use is_incremental() on filed_at)
-- In production, is_incremental() would filter on max(filed_at) from {{ this }}.

{{ config(materialized='table') }}

SELECT
    c.court_id,
    cr.court_name,
    COUNT(*) AS case_count,
    AVG(c.duration_days)::numeric(10, 2) AS avg_duration_days,
    SUM(CASE WHEN c.outcome IN ('plaintiff_win', 'defense_win') THEN 1 ELSE 0 END)::float
        / NULLIF(SUM(CASE WHEN c.outcome IS NOT NULL THEN 1 ELSE 0 END), 0) AS adjudicated_rate
FROM {{ ref('cases') }} c
INNER JOIN {{ ref('courts') }} cr ON cr.court_id = c.court_id
GROUP BY 1, 2
