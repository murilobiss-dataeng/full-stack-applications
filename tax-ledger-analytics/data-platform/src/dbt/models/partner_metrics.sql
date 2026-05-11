-- dbt model: golden-record partner metrics from warehouse tables
-- Ref: partners, order_partner, orders

{{ config(materialized='table') }}

WITH partner_orders AS (
    SELECT
        l.resolved_entity_id,
        l.partner_id,
        cl.role,
        o.order_id,
        o.status,
        o.sla_days
    FROM {{ ref('partners') }} l
    INNER JOIN {{ ref('order_partner') }} cl ON cl.partner_id = l.partner_id
    INNER JOIN {{ ref('orders') }} o ON o.order_id = cl.order_id
)

SELECT
    resolved_entity_id,
    COUNT(DISTINCT order_id) AS orders_touched,
    AVG(sla_days)::numeric(10, 2) AS avg_order_sla_days,
    SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END)::float
        / NULLIF(COUNT(CASE WHEN status IS NOT NULL THEN 1 END), 0) AS delivered_rate
FROM partner_orders
GROUP BY 1
