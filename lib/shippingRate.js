export default function shippingRate(amount, name, min, max) {
  return {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount, currency: 'usd' },
      display_name: name,
      delivery_estimate: {
        minimum: { unit: 'business_day', value: min },
        maximum: { unit: 'business_day', value: max },
      },
    },
  };
}
