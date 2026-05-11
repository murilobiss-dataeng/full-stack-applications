{{ config(materialized="view") }}

SELECT
    case_id,
    lawyer_id,
    role
FROM {{ ref("case_lawyer_seed") }}
