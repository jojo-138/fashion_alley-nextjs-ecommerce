export default function formatCartItems(cartItems) {
  const items = [];

  cartItems.forEach(
    (item) =>
      item.quantity > 0 &&
      items.push({
        item_id: item.item_id,
        name: item.name,
        img: item.img,
        price: (item.discount_price ? item.discount_price : item.price).substring(1),
        quantity: item.quantity,
        desc: `${item.size} / ${item.color}`,
        slug: item.slug,
      })
  );

  return items;
}
