export const inventoryText = `with size_variants as (
  select i.id, i.product_id, vv.value, i.inventory
  from product_items i
  inner join product_variants pv on pv.product_item_id = i.id
  inner join variation_values vv on vv.id = pv.variation_value_id
  where i.product_id = $1
  and vv.variation_id = 3
  order by i.id
), color_variants as (
  select i.id, i.product_id, vv.value
  from product_items i
  inner join product_variants pv on pv.product_item_id = i.id
  inner join variation_values vv on vv.id = pv.variation_value_id
  where i.product_id = $1
  and vv.variation_id = 1
  order by i.id
)

select c.value as color, s.value as size, s.inventory
from size_variants s
inner join color_variants c on c.id = s.id 
order by 
  case s.value
    when 'XS' then 1
    when 'S' then 2
    when 'M' then 3
    when 'L' then 4
    when 'XL' then 5
    else 6
  end`;
