{{ config(materialized='table') }}

SELECT
    hub_id,
    hub_name,
    region_code,
    tier
FROM {{ ref("hubs_seed") }}
