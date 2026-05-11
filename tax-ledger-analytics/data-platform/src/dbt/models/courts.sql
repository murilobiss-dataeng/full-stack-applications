{{ config(materialized="view") }}

SELECT
    court_id,
    court_name,
    state_code,
    tier
FROM {{ ref("courts_seed") }}
