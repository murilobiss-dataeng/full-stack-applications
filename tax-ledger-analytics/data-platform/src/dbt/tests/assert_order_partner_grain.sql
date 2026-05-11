-- Fails if duplicate (order_id, partner_id, role) rows exist in the bridge model.

select
    order_id,
    partner_id,
    role,
    count(*) as row_count
from {{ ref("order_partner") }}
group by 1, 2, 3
having count(*) > 1
