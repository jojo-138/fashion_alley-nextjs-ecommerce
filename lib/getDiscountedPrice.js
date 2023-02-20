export default function getDiscountedPrice(price, discount) {
  const num = parseFloat(price.substring(1));
  return (num - discount * num).toFixed(2);
}
