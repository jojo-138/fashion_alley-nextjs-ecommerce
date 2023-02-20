export const getCartItems = `select ci.id as cart_item_id, pi.id as item_id, p.name, img.link as img, pi.name as size_color, pi.slug, p.price, ((p.price::numeric) - (coalesce(d.value::numeric, 0) * p.price::numeric))::money as discount_price, ci.quantity, pi.inventory
from cart_items ci
inner join product_items pi on pi.id = ci.product_item_id
inner join products p on p.id = pi.product_id
inner join product_images img on img.id = pi.image1_id
left join discounts d on d.id = p.discount_id
where ci.cart_id = $1
order by ci.id`;

export const addProductToCart = `insert into cart_items (cart_id, product_item_id, quantity)
values ($1, (select id from product_items where product_id = $2 and name = $3), 1)
on conflict (cart_id, product_item_id)
do update set quantity = cart_items.quantity + 1`;
