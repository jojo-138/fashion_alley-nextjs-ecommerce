export default function formatCartItems(items) {
  items.forEach((item) => {
    item.size_color = item.size_color.split(' / ');
    item.size = item.size_color[0];
    item.color = item.size_color[1];

    delete item.size_color;

    if (item.price === item.discount_price) delete item.discount_price;
  });

  return items;
}
