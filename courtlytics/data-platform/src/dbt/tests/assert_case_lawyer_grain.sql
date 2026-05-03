-- Fails if duplicate (case_id, lawyer_id, role) rows exist in the bridge model.
select
    case_id,
    lawyer_id,
    role,
    count(*) as cnt
from {{ ref("case_lawyer") }}
group by 1, 2, 3
having count(*) > 1
