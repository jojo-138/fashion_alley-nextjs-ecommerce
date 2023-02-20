export const searchProductsText = `with searched_results as (
  select id as product_id, ts_rank(searchable, websearch_to_tsquery('english', $1)) as rank
  from search_items_mview
  where searchable @@ websearch_to_tsquery('english', $1)
  order by ts_rank(searchable, websearch_to_tsquery('english', $1)) desc
), color_searched_results as (
  select min(pi.id) as item_id, pi.product_id
  from variation_values vv
  inner join product_variants pv on pv.variation_value_id = vv.id
  inner join product_items pi on pi.id = pv.product_item_id
  inner join searched_results sr on sr.product_id = pi.product_id
  where vv.variation_id = 1
  and $1 ilike '%' || vv.value || '%'
  and pi.inventory > 0
  group by pi.product_id
), min_item as (
  select sr.product_id, min(i.id) as item_id
  from product_items i, searched_results sr
  where sr.product_id = i.product_id 
  and i.inventory > 0
  group by sr.product_id
), items as (
  select sr.product_id, coalesce(csr.item_id, mi.item_id) as item_id, sr.rank
  from searched_results sr
  left join color_searched_results csr on csr.product_id = sr.product_id
  inner join min_item mi on mi.product_id = sr.product_id
), item_color_variants as (
  select min(pi.id) as item_id, vv.value, pi.product_id
  from product_items pi
  inner join items i on i.product_id = pi.product_id 
  inner join product_variants pv on pv.product_item_id = pi.id
  inner join variation_values vv on vv.id = pv.variation_value_id
  where vv.variation_id = 1
  and pi.inventory > 0
  group by vv.value, pi.product_id
  order by item_id
), product_color_variants as (
  select product_id, string_agg(value,', ') colors
  from item_color_variants
  group by product_id
), product_color_slugs as (
  select cv.product_id, string_agg(pi.slug,', ') color_slugs
  from item_color_variants cv, product_items pi
  where cv.item_id = pi.id
  group by cv.product_id
), imgs as (
  select i.product_id, concat_ws(', ', img1.link, img2.link) thumbnails
  from items i
  inner join product_items pi on pi.id = i.item_id
  inner join product_images img1 on img1.id = pi.image1_id
  inner join product_images img2 on img2.id = pi.image2_id
), item_filters as (
  select i.product_id, string_agg(concat_ws(': ', f.name, fv.value), ', ') filters
  from items i
  inner join product_filters pf on pf.product_id = i.product_id
  inner join filter_values fv on fv.id = pf.filter_value_id
  inner join filters f on f.id = fv.filter_id
  group by i.product_id
)

select p.name, p.price, d.value as discount, pi.slug, f.filters, imgs.thumbnails, pcv.colors, pcs.color_slugs
from items i
inner join products p on p.id = i.product_id
inner join product_items pi on pi.id = i.item_id
inner join imgs imgs on imgs.product_id = i.product_id
inner join product_color_variants pcv on pcv.product_id = i.product_id
inner join product_color_slugs pcs on pcs.product_id = i.product_id
inner join item_filters f on f.product_id = i.product_id
left join discounts d on d.id = p.discount_id 
order by i.rank desc
limit 12`;
