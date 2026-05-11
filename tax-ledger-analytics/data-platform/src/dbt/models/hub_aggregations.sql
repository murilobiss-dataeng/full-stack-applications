-- dbt model: hub-level order aggregates (incremental pattern can use is_incremental() on placed_at)

{{ config(materialized='table') }}

SELECT
    o.hub_id,
    h.hub_name,
    COUNT(*) AS order_count,
    AVG(o.sla_days)::numeric(10, 2) AS avg_sla_days,
    SUM(CASE WHEN o.status IN ('delivered', 'refunded') THEN 1 ELSE 0 END)::float
        / NULLIF(SUM(CASE WHEN o.status IS NOT NULL THEN 1 ELSE 0 END), 0) AS terminal_status_rate
FROM {{ ref('orders') }} o
INNER JOIN {{ ref('hubs') }} h ON h.hub_id = o.hub_id
GROUP BY 1, 2
