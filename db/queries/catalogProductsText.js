export default function catalogProductsText(orderBy, descOrAsc, discountJoin) {
  return `with items as (
      select distinct on (product_id) product_id, id
      from product_items
      where inventory > 0
      order by product_id, ${orderBy} ${descOrAsc}
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
      select i.id, concat_ws(', ', img1.link, img2.link) thumbnails
      from items i
      inner join product_items pi on pi.id = i.id
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
    inner join product_items pi on pi.id = i.id
    inner join imgs imgs on imgs.id = i.id
    inner join product_color_variants pcv on pcv.product_id = i.product_id
    inner join product_color_slugs pcs on pcs.product_id = i.product_id
    inner join item_filters f on f.product_id = i.product_id
    ${discountJoin} join discounts d on d.id = p.discount_id 
    order by pi.${orderBy} ${descOrAsc}
    limit $1`;
}
