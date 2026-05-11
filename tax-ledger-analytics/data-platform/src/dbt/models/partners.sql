-- Core dimension: one row per source partner_id (FK target for order_partner).

{{ config(materialized='table') }}

SELECT
    partner_id,
    full_name,
    name_canonical,
    resolved_entity_id,
    hub_region,
    partner_category
FROM {{ ref("partners_seed") }}
