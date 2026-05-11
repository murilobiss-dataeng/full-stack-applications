{{ config(materialized='table') }}

SELECT
    order_id,
    partner_id,
    role
FROM {{ ref("order_partner_seed") }}
