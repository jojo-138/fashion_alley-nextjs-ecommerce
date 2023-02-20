export const categoryProductsText = `with recursive categories_cte as (
  select id
  from categories
  where id = (select id from categories where name = $1)
  union all
  select c.id
  from categories as c, categories_cte as p
  where p.id = c.parent_category_id
), products_cte as (
  select p.id
  from products p, categories_cte as c
  where p.category_id = c.id
), item_color_variants as (
  select min(i.id) as item_id, vv.value, i.product_id
  from products_cte pc
  inner join product_items i on i.product_id = pc.id
  inner join product_variants pv on pv.product_item_id = i.id
  inner join variation_values vv on vv.id = pv.variation_value_id
  where vv.variation_id = 1
  and i.inventory > 0
  group by vv.value, i.product_id
  order by item_id
), product_color_variants as (
  select product_id, string_agg(value,', ') colors
  from item_color_variants
  group by product_id
), product_color_slugs as (
  select icv.product_id, string_agg(pi.slug,', ' order by icv.item_id) color_slugs
  from item_color_variants icv, product_items pi
  where icv.item_id = pi.id
  group by icv.product_id
), items as (
  select pc.id as product_id, min(i.id) as item_id
  from product_items i, products_cte pc
  where pc.id = i.product_id and i.inventory > 0
  group by pc.id
), imgs as (
  select i.item_id, concat_ws(', ', img1.link, img2.link) thumbnails
  from items i
  inner join product_items pi on pi.id = i.item_id
  inner join product_images img1 on img1.id = pi.image1_id
  inner join product_images img2 on img2.id = pi.image2_id
), item_filters as (
  select pc.id, string_agg(concat_ws(': ', f.name, fv.value), ', ') filters
  from products_cte pc
  inner join product_filters pf on pf.product_id = pc.id
  inner join filter_values fv on fv.id = pf.filter_value_id
  inner join filters f on f.id = fv.filter_id
  group by pc.id
)

select p.name, p.price, d.value as discount, f.filters, imgs.thumbnails, pcv.colors, pcs.color_slugs
from items i
inner join products p on p.id = i.product_id
inner join imgs imgs on imgs.item_id = i.item_id
inner join product_color_variants pcv on pcv.product_id = i.product_id
inner join product_color_slugs pcs on pcs.product_id = i.product_id
inner join item_filters f on f.id = i.product_id
left join discounts d on d.id = p.discount_id 
order by p.price`;
