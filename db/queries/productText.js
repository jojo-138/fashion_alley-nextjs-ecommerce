export const productText = `with product as (
  select id
  from products
  where name = $1
), items as (
  select min(i.id) as item_id, vv.value, i.product_id
  from product p
  inner join product_items i on p.id = i.product_id
  inner join product_variants pv on pv.product_item_id = i.id
  inner join variation_values vv on vv.id = pv.variation_value_id
  where vv.variation_id = 1
  and i.inventory > 0
  group by vv.value, i.product_id
  order by item_id
), colors as (
  select product_id, string_agg(value,', ') colors
  from items
  group by product_id
), imgs as (
  select i.product_id, i.item_id, concat_ws(', ', img1.link, img2.link, img3.link, img4.link) imgs
  from items i
  inner join product_items pi on pi.id = i.item_id
  inner join product_images img1 on img1.id = pi.image1_id
  inner join product_images img2 on img2.id = pi.image2_id
  left join product_images img3 on img3.id = pi.image3_id
  left join product_images img4 on img4.id = pi.image4_id
)

select p.id, p.name, p.price, d.value as discount, p.description, p.details, c.colors, string_agg(img.imgs,', ' order by img.item_id) imgs
from products p
inner join colors c on c.product_id = p.id
inner join imgs img on img.product_id = p.id
left join discounts d on p.discount_id = d.id
group by p.id, p.name, p.price, d.value, p.description, p.details, c.colors`;
