import { query } from '.';
import { categoryProductsText } from './queries/categoryProductsText';
import formatProducts from './lib/formatProducts';

export default async function getProductsByCategory(category) {
  const products = await query(categoryProductsText, [category]);

  products.forEach(formatProducts);

  return products;
}
