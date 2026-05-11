-- dbt model: lawyer-level metrics from curated warehouse tables
-- Ref: lawyers, case_lawyer, cases

{{ config(materialized='table') }}

WITH lawyer_cases AS (
    SELECT
        l.resolved_entity_id,
        l.lawyer_id,
        cl.role,
        c.case_id,
        c.outcome,
        c.duration_days
    FROM {{ ref('lawyers') }} l
    INNER JOIN {{ ref('case_lawyer') }} cl ON cl.lawyer_id = l.lawyer_id
    INNER JOIN {{ ref('cases') }} c ON c.case_id = cl.case_id
)

SELECT
    resolved_entity_id,
    COUNT(DISTINCT case_id) AS cases_touched,
    AVG(duration_days)::numeric(10, 2) AS avg_case_duration_days,
    SUM(CASE WHEN outcome = 'plaintiff_win' THEN 1 ELSE 0 END)::float
        / NULLIF(COUNT(CASE WHEN outcome IS NOT NULL THEN 1 END), 0) AS plaintiff_win_rate
FROM lawyer_cases
GROUP BY 1
