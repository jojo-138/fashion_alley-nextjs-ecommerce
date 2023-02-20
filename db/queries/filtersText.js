export const filterText = `with recursive
starting as (
  select id, parent_category_id
  from categories
  where name = $1
), descendants as (
  select id, parent_category_id
  from starting
  union all 
  select c.id, c.parent_category_id
  from categories c, descendants d
  where c.parent_category_id = d.id
), ascendants as (
  select c.id, c.parent_category_id
  from categories c, starting s
  where c.id = s.parent_category_id
  union all
  select c.id, c.parent_category_id
  from categories c, ascendants a
  where a.parent_category_id = c.id
)


select f.name, fv.value
from filter_values fv
inner join filters f on f.id = fv.filter_id
inner join (
table ascendants
union
table descendants
) c on c.id = f.category_id`;
