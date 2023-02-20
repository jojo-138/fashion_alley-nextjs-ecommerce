export default function formatStripeItems(items) {
  return items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.img],
        description: item.desc,
        metadata: {
          id: item.item_id,
        },
      },
      unit_amount: parseInt(item.price * 100),
    },
    quantity: item.quantity,
  }));
}
