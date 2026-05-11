{{ config(materialized='table') }}

SELECT
    order_id,
    hub_id,
    order_ref,
    placed_at,
    delivered_at,
    status,
    sla_days
FROM {{ ref("orders_seed") }}
